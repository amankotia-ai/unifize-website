#!/usr/bin/env node
/* ============================================================================
 * redirects.mjs - generate the 301 map from the migrated records themselves,
 * so the redirects cannot drift from what actually shipped.
 *
 * Webflow serves blogs at /blogs/:slug and case studies at /case-study/:slug.
 * Decide the new paths here in one place; everything else reads from this.
 *
 *   node scripts/webflow/redirects.mjs > src/content/webflow/redirects.json
 * ========================================================================== */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = join(process.cwd(), "src/content/webflow/strapi");
const read = async (f) => JSON.parse(await readFile(join(DIR, f), "utf8"));

/* Old Webflow route -> new route on the Next site. */
const ROUTES = [
  { file: "blog-posts.json", from: "/blogs", to: "/resources/blog" },
  { file: "case-studies.json", from: "/case-study", to: "/resources/case-studies" },
];

const redirects = [];
for (const { file, from, to } of ROUTES) {
  for (const record of await read(file)) {
    redirects.push({
      source: `${from}/${record.webflowSlug}`,
      destination: `${to}/${record.slug}`,
      permanent: true,
    });
  }
  /* The collection landing pages move too. */
  redirects.push({ source: from, destination: to, permanent: true });
}

process.stdout.write(JSON.stringify(redirects, null, 2) + "\n");
