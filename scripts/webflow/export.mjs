#!/usr/bin/env node
/* ============================================================================
 * export.mjs - read-only snapshot of the Webflow collections we are moving
 * into Strapi: Blogs and Case Studies, plus the Tags collection as a lookup
 * (tags are stored on a blog as item IDs, so we need names to resolve them
 * even though Tags is NOT becoming a Strapi content type).
 *
 * Writes to src/content/webflow/export/:
 *   blogs.json          raw items, exactly as the Data API returns them
 *   case-studies.json   raw items
 *   tags.json           id -> name lookup
 *   assets.json         every Webflow-hosted asset referenced by those items,
 *                       from media fields AND from inline rich-text markup
 *   summary.json        counts, draft/archived breakdown, field fill rates
 *
 * Nothing here writes to Webflow. Run it as often as you like.
 *
 *   WEBFLOW_API_TOKEN=... node scripts/webflow/export.mjs
 * ========================================================================== */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const TOKEN = process.env.WEBFLOW_API_TOKEN;
if (!TOKEN) {
  console.error("WEBFLOW_API_TOKEN is not set.");
  console.error("Create a site API token in Webflow (Site settings > Apps &");
  console.error("integrations > API access) with CMS read scope, then re-run.");
  process.exit(1);
}

const SITE_ID = "6473a18f1599f3a16be86f38"; // Unifize
const API = "https://api.webflow.com/v2";
const OUT = join(process.cwd(), "src/content/webflow/export");

/* The two collections we are migrating, plus the tag lookup they depend on. */
const COLLECTIONS = {
  blogs: "65127c823031a6889a242641",
  "case-studies": "688c65d4fa2b0ac71e6d2b86",
  tags: "651ad6092dd51f0bd2f5e9a3",
};

/* Webflow serves assets from these hosts. Both die when the site is cancelled. */
const ASSET_HOSTS = /https:\/\/(?:uploads-ssl\.webflow\.com|cdn\.prod\.website-files\.com|assets\.website-files\.com)\/[^\s"'<>)\\]+/g;

async function api(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, accept: "application/json" },
  });
  if (res.status === 429) {
    const wait = Number(res.headers.get("retry-after") || 5) * 1000;
    console.log(`  rate limited, waiting ${wait / 1000}s`);
    await new Promise((r) => setTimeout(r, wait));
    return api(path);
  }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${path}`);
  return res.json();
}

async function allItems(collectionId) {
  const items = [];
  let offset = 0;
  for (;;) {
    const page = await api(`/collections/${collectionId}/items?limit=100&offset=${offset}`);
    items.push(...(page.items ?? []));
    const total = page.pagination?.total ?? items.length;
    if (items.length >= total || !page.items?.length) break;
    offset += 100;
  }
  return items;
}

/* Every Webflow-hosted URL an item references, media fields and inline alike. */
function assetsOf(item) {
  const found = new Set();
  for (const value of Object.values(item.fieldData ?? {})) {
    if (!value) continue;
    if (typeof value === "object" && typeof value.url === "string") {
      found.add(value.url);
    } else if (typeof value === "string") {
      for (const m of value.matchAll(ASSET_HOSTS)) found.add(m[0]);
    }
  }
  return [...found];
}

/* How often each field is actually populated. Tells us what is safe to rely on. */
function fillRates(items) {
  const counts = {};
  for (const item of items) {
    for (const [key, value] of Object.entries(item.fieldData ?? {})) {
      const filled = Array.isArray(value) ? value.length > 0 : value !== null && value !== "";
      counts[key] ??= { filled: 0, of: 0 };
      counts[key].of += 1;
      if (filled) counts[key].filled += 1;
    }
  }
  return Object.fromEntries(
    Object.entries(counts)
      .sort((a, b) => a[1].filled - b[1].filled)
      .map(([k, v]) => [k, `${v.filled}/${v.of}`]),
  );
}

await mkdir(OUT, { recursive: true });

const summary = {};
const assets = new Map(); // url -> which items reference it
const pulled = {};

for (const [name, id] of Object.entries(COLLECTIONS)) {
  console.log(`pulling ${name}`);
  const items = await allItems(id);
  pulled[name] = items;

  if (name !== "tags") {
    for (const item of items) {
      for (const url of assetsOf(item)) {
        if (!assets.has(url)) assets.set(url, []);
        assets.get(url).push(`${name}/${item.fieldData?.slug ?? item.id}`);
      }
    }
  }

  summary[name] = {
    total: items.length,
    live: items.filter((i) => !i.isDraft && !i.isArchived).length,
    draft: items.filter((i) => i.isDraft).length,
    archived: items.filter((i) => i.isArchived).length,
    neverPublished: items.filter((i) => !i.lastPublished).length,
    fieldFillRates: fillRates(items),
  };
  console.log(`  ${items.length} items (${summary[name].live} live)`);
}

await writeFile(join(OUT, "blogs.json"), JSON.stringify(pulled.blogs, null, 2));
await writeFile(join(OUT, "case-studies.json"), JSON.stringify(pulled["case-studies"], null, 2));

/* A flat id -> name map so the blog tag relations can be resolved offline. */
await writeFile(
  join(OUT, "tags.json"),
  JSON.stringify(Object.fromEntries(pulled.tags.map((t) => [t.id, t.fieldData?.name ?? null])), null, 2),
);

await writeFile(
  join(OUT, "assets.json"),
  JSON.stringify(
    [...assets.entries()].map(([url, usedBy]) => ({ url, usedBy })),
    null,
    2,
  ),
);
summary.assets = { distinct: assets.size };

await writeFile(join(OUT, "summary.json"), JSON.stringify(summary, null, 2));

console.log(`\n${assets.size} distinct Webflow-hosted assets referenced`);
console.log(`written to src/content/webflow/export/`);
