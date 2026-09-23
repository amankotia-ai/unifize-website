#!/usr/bin/env node
/* ============================================================================
 * load.mjs - push the transformed records into Strapi.
 *
 * Idempotent: every record carries `webflowSlug`, so a re-run updates the
 * existing entry rather than creating a duplicate. Safe to run repeatedly
 * while the parsers are still being tuned.
 *
 * Assets are handled first: each Webflow-hosted image is downloaded, uploaded
 * to the Strapi media library once, and its old URL rewritten inside the body
 * HTML. The map is cached on disk so re-runs do not re-upload.
 *
 *   STRAPI_URL=https://xxx.strapiapp.com STRAPI_TOKEN=... \
 *     node scripts/webflow/load.mjs [--dry-run]
 * ========================================================================== */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const DRY = process.argv.includes("--dry-run");
const URL_BASE = process.env.STRAPI_URL?.replace(/\/$/, "");
const TOKEN = process.env.STRAPI_TOKEN;

if (!DRY && (!URL_BASE || !TOKEN)) {
  console.error("Set STRAPI_URL and STRAPI_TOKEN, or pass --dry-run.");
  console.error("Token: Strapi admin > Settings > API Tokens, type Full access.");
  process.exit(1);
}

const DIR = join(process.cwd(), "src/content/webflow/strapi");
const MAP = join(DIR, "asset-map.json");
const read = async (f) => JSON.parse(await readFile(join(DIR, f), "utf8"));

const ASSET_RE =
  /https:\/\/(?:uploads-ssl\.webflow\.com|cdn\.prod\.website-files\.com|assets\.website-files\.com)\/[^\s"'<>)\\]+/g;

async function api(path, init = {}) {
  const res = await fetch(`${URL_BASE}/api${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...init.headers,
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${path}\n${await res.text()}`);
  return res.json();
}

/* ------------------------------------------------------------------ assets */

const assetMap = existsSync(MAP) ? JSON.parse(await readFile(MAP, "utf8")) : {};

/* Returns { id, url } for a Webflow asset, uploading it once and caching the
 * result. The id is what media fields need; the url is what body HTML needs. */
async function uploadAsset(url) {
  if (assetMap[url]) return assetMap[url];
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! could not fetch ${url} (${res.status}) - leaving URL as is`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const name = decodeURIComponent(url.split("/").pop().split("?")[0]);
  const form = new FormData();
  form.append("files", new Blob([buffer], { type: res.headers.get("content-type") ?? "image/png" }), name);
  const [file] = await api("/upload", { method: "POST", body: form });
  assetMap[url] = { id: file.id, url: file.url.startsWith("http") ? file.url : `${URL_BASE}${file.url}` };
  console.log(`  uploaded ${name}`);
  return assetMap[url];
}

async function rehost(html) {
  if (!html) return html;
  let out = html;
  for (const url of [...new Set(html.match(ASSET_RE) ?? [])]) {
    const fresh = DRY ? null : await uploadAsset(url);
    if (fresh) out = out.split(url).join(fresh.url);
  }
  return out;
}

/* ------------------------------------------------------------------ records */

async function upsert(endpoint, record) {
  const q = `?filters[webflowSlug][$eq]=${encodeURIComponent(record.webflowSlug)}`;
  const existing = await api(`/${endpoint}${q}`);
  const id = existing.data?.[0]?.documentId ?? existing.data?.[0]?.id;
  if (id) {
    await api(`/${endpoint}/${id}`, { method: "PUT", body: JSON.stringify({ data: record }) });
    return "updated";
  }
  await api(`/${endpoint}`, { method: "POST", body: JSON.stringify({ data: record }) });
  return "created";
}

async function run(file, endpoint, richFields) {
  const records = await read(file);
  console.log(`\n${endpoint}: ${records.length} records`);
  const counts = { created: 0, updated: 0, skipped: 0 };
  for (const record of records) {
    const payload = { ...record };
    delete payload.sourceUrl;
    for (const field of richFields) payload[field] = await rehost(payload[field]);
    /* coverImage needs a media id, not a URL. Uploaded separately below. */
    const cover = payload.coverImage;
    delete payload.coverImage;
    if (DRY) {
      counts.skipped += 1;
      console.log(`  would upsert ${record.webflowSlug} (${payload.body.length} chars)`);
      continue;
    }
    if (cover) {
      const fresh = await uploadAsset(cover);
      if (fresh) payload.coverImage = fresh.id;
    }
    counts[await upsert(endpoint, payload)] += 1;
    console.log(`  ${record.webflowSlug}`);
  }
  console.log(`  -> ${JSON.stringify(counts)}`);
}

await run("blog-posts.json", "blog-posts", ["body"]);
await run("case-studies.json", "case-studies", ["intro", "body"]);

if (!DRY) await writeFile(MAP, JSON.stringify(assetMap, null, 2));
console.log(DRY ? "\ndry run, nothing written" : "\ndone");
