#!/usr/bin/env node
/* ============================================================================
 * transform.mjs - turn the raw scrape into records shaped for Strapi.
 *
 *   src/content/webflow/export/*.json   (raw, from scrape.mjs)
 *        -> src/content/webflow/strapi/*.json   (clean, ready to load)
 *
 * Every record keeps `webflowSlug` as its stable key so loads are idempotent
 * and redirects can be generated from the same data.
 *
 *   node scripts/webflow/transform.mjs
 * ========================================================================== */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "node-html-parser";
import { sanitize, tagsOf } from "./lib/sanitize.mjs";

const IN = join(process.cwd(), "src/content/webflow/export");
const OUT = join(process.cwd(), "src/content/webflow/strapi");

const read = async (f) => JSON.parse(await readFile(join(IN, f), "utf8"));

/* Roughly what a reader spends, at 220wpm. Webflow's own reading-time field is
 * null on every post we saw, so we compute it rather than carry the gap over. */
function readMinutes(html) {
  const words = parse(html).structuredText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function excerptOf(html, limit = 200) {
  const text = parse(html).structuredText.replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  return text.slice(0, text.lastIndexOf(" ", limit)).trim() + "…";
}

await mkdir(OUT, { recursive: true });
const audit = { blogs: [], caseStudies: [] };

/* ---------------------------------------------------------------- blog posts */

const rawBlogs = await read("blogs.json");
const blogPosts = rawBlogs.map((b) => {
  const { html, report } = sanitize(b.bodyHtml);
  audit.blogs.push({ slug: b.slug, ...report, tagsAfter: tagsOf(html) });
  return {
    webflowSlug: b.slug,
    slug: b.slug,
    title: b.title ?? b.slug,
    description: b.description ?? excerptOf(html),
    coverImage: b.ogImage ?? null,
    body: html,
    readMinutes: readMinutes(html),
    sourceUrl: b.url,
  };
});

/* --------------------------------------------------------------- case studies */

const rawCases = await read("case-studies.json");
const caseStudies = rawCases.map((c) => {
  /* Two rich-text blocks per page: the short one is the intro, the long one is
   * the body. Order in the DOM is not guaranteed, so pick by length. */
  const blocks = [...c.blocks].sort((a, b) => (a.html?.length ?? 0) - (b.html?.length ?? 0));
  const intro = sanitize(blocks[0]?.html ?? "");
  const body = sanitize(blocks[blocks.length - 1]?.html ?? "");
  audit.caseStudies.push({
    slug: c.slug,
    intro: intro.report,
    body: body.report,
    tagsAfter: tagsOf(body.html),
  });
  return {
    webflowSlug: c.slug,
    slug: c.slug,
    title: c.title ?? c.slug,
    description: c.description ?? excerptOf(body.html),
    coverImage: c.ogImage ?? null,
    intro: intro.html,
    body: body.html,
    readMinutes: readMinutes(body.html),
    sourceUrl: c.url,
  };
});

await writeFile(join(OUT, "blog-posts.json"), JSON.stringify(blogPosts, null, 2));
await writeFile(join(OUT, "case-studies.json"), JSON.stringify(caseStudies, null, 2));
await writeFile(join(OUT, "transform-audit.json"), JSON.stringify(audit, null, 2));

/* ------------------------------------------------------------------- report */

const allTags = new Set();
for (const a of [...audit.blogs, ...audit.caseStudies]) a.tagsAfter.forEach((t) => allTags.add(t));

console.log(`blog posts   ${blogPosts.length}`);
console.log(`case studies ${caseStudies.length}`);
console.log(`\nsurviving tag vocabulary:\n  ${[...allTags].sort().join(" ")}`);

const dropped = {};
for (const a of audit.blogs) for (const [t, n] of Object.entries(a.dropped)) dropped[t] = (dropped[t] ?? 0) + n;
for (const a of audit.caseStudies)
  for (const r of [a.intro, a.body]) for (const [t, n] of Object.entries(r.dropped)) dropped[t] = (dropped[t] ?? 0) + n;
console.log(`\ndropped outright: ${Object.entries(dropped).map(([t, n]) => `${t}×${n}`).join(" ") || "nothing"}`);
console.log(`written to src/content/webflow/strapi/`);
