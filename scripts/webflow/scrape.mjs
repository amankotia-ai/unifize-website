#!/usr/bin/env node
/* ============================================================================
 * scrape.mjs - snapshot the Blogs and Case Studies we are moving into Strapi,
 * taken from the PUBLISHED pages on unifize.com rather than the Data API.
 *
 * We have no Webflow API token, and we do not need one: Webflow renders each
 * rich-text field straight into a .w-richtext container, so the published DOM
 * carries the same markup the CMS holds. Same trick as the existing
 * src/content/webflow/video-transcripts.json.
 *
 * The tradeoff, stated plainly: this sees only what is LIVE. The CMS holds 9
 * case studies but the sitemap lists 7, so 2 draft/archived ones are invisible
 * here and must be re-authored by hand if they are wanted.
 *
 * Writes to src/content/webflow/export/:
 *   blogs.json         one record per post, body HTML preserved verbatim
 *   case-studies.json  one record per study
 *   assets.json        every Webflow-hosted asset referenced, with usage
 *   summary.json       counts, field fill rates, embed and style-leak flags
 *
 *   node scripts/webflow/scrape.mjs
 * ========================================================================== */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "node-html-parser";

const SITEMAP = "https://unifize.com/sitemap.xml";
const OUT = join(process.cwd(), "src/content/webflow/export");
const ASSET_HOSTS =
  /https:\/\/(?:uploads-ssl\.webflow\.com|cdn\.prod\.website-files\.com|assets\.website-files\.com)\/[^\s"'<>)\\]+/g;

/* Be a polite scraper: identify ourselves and leave a gap between requests. */
const UA = "unifize-migration-snapshot (internal content export)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": UA } });
      if (res.ok) return res.text();
      if (res.status === 404) return null;
      throw new Error(`${res.status} ${res.statusText}`);
    } catch (err) {
      if (i === tries) throw err;
      await sleep(1000 * i);
    }
  }
}

function meta(root, selector, attr = "content") {
  return root.querySelector(selector)?.getAttribute(attr)?.trim() ?? null;
}

/* Every Webflow-hosted URL in a blob of markup, media fields and inline alike. */
function assetsIn(...blobs) {
  const found = new Set();
  for (const blob of blobs) {
    if (typeof blob !== "string") continue;
    for (const m of blob.matchAll(ASSET_HOSTS)) found.add(m[0]);
  }
  return [...found];
}

/* Flags that tell us how much work the body will need on the way into Strapi. */
function bodyRisks(html) {
  if (!html) return null;
  const root = parse(html);
  const styles = root.querySelectorAll("style");
  return {
    chars: html.length,
    headings: root.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
    links: root.querySelectorAll("a").length,
    images: root.querySelectorAll("img").length,
    tables: root.querySelectorAll("table").length,
    /* Raw embeds are where Webflow hides pasted HTML documents. */
    embeds: root.querySelectorAll("[data-rt-embed-type], .w-embed").length,
    /* A <style> in the body will leak into the whole site. Must be stripped. */
    styleTags: styles.length,
    /* These are the specific leaks that would clobber our design tokens. */
    leaksRootVars: styles.some((s) => s.innerHTML.includes(":root")),
    leaksBodyRule: styles.some((s) => /(^|\})\s*body\s*\{/.test(s.innerHTML)),
    isFullDocument: /<!DOCTYPE|<html[\s>]/i.test(html),
  };
}

async function scrapeBlog(url) {
  const html = await get(url);
  if (!html) return null;
  const root = parse(html);
  const body = root.querySelector(".w-richtext");
  return {
    slug: url.split("/").pop(),
    url,
    title: meta(root, 'meta[property="og:title"]') ?? root.querySelector("title")?.text?.trim(),
    description: meta(root, 'meta[name="description"]') ?? meta(root, 'meta[property="og:description"]'),
    ogImage: meta(root, 'meta[property="og:image"]'),
    bodyHtml: body?.innerHTML ?? null,
    risks: bodyRisks(body?.innerHTML),
  };
}

async function scrapeCaseStudy(url) {
  const html = await get(url);
  if (!html) return null;
  const root = parse(html);
  /* Case study pages carry two rich-text blocks; keep both, labelled by class. */
  const blocks = root.querySelectorAll(".w-richtext").map((el) => ({
    className: el.getAttribute("class"),
    html: el.innerHTML,
    risks: bodyRisks(el.innerHTML),
  }));
  return {
    slug: url.split("/").pop(),
    url,
    title: meta(root, 'meta[property="og:title"]') ?? root.querySelector("title")?.text?.trim(),
    description: meta(root, 'meta[name="description"]') ?? meta(root, 'meta[property="og:description"]'),
    ogImage: meta(root, 'meta[property="og:image"]'),
    blocks,
  };
}

/* -------------------------------------------------------------------------- */

console.log("fetching sitemap");
const sitemap = await get(SITEMAP);
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const blogUrls = urls.filter((u) => u.includes("/blogs/"));
const caseUrls = urls.filter((u) => u.includes("/case-study/"));
console.log(`  ${blogUrls.length} blogs, ${caseUrls.length} case studies live\n`);

await mkdir(OUT, { recursive: true });

const blogs = [];
for (const url of blogUrls) {
  process.stdout.write(`blog  ${url.split("/").pop().slice(0, 52)}\n`);
  const rec = await scrapeBlog(url);
  if (rec) blogs.push(rec);
  await sleep(400);
}

const cases = [];
for (const url of caseUrls) {
  process.stdout.write(`case  ${url.split("/").pop().slice(0, 52)}\n`);
  const rec = await scrapeCaseStudy(url);
  if (rec) cases.push(rec);
  await sleep(400);
}

/* Collect every Webflow-hosted asset and remember who references it. */
const assets = new Map();
const note = (url, who) => {
  if (!assets.has(url)) assets.set(url, []);
  assets.get(url).push(who);
};
for (const b of blogs) for (const a of assetsIn(b.bodyHtml, b.ogImage)) note(a, `blogs/${b.slug}`);
for (const c of cases)
  for (const a of assetsIn(...c.blocks.map((x) => x.html), c.ogImage)) note(a, `case-studies/${c.slug}`);

await writeFile(join(OUT, "blogs.json"), JSON.stringify(blogs, null, 2));
await writeFile(join(OUT, "case-studies.json"), JSON.stringify(cases, null, 2));
await writeFile(
  join(OUT, "assets.json"),
  JSON.stringify([...assets].map(([url, usedBy]) => ({ url, usedBy })), null, 2),
);

const summary = {
  scrapedAt: new Date().toISOString(),
  source: "published pages on unifize.com (no API token available)",
  blogs: {
    count: blogs.length,
    missingBody: blogs.filter((b) => !b.bodyHtml).map((b) => b.slug),
    withEmbeds: blogs.filter((b) => b.risks?.embeds).map((b) => b.slug),
    withStyleTags: blogs.filter((b) => b.risks?.styleTags).map((b) => b.slug),
    withTables: blogs.filter((b) => b.risks?.tables).map((b) => b.slug),
  },
  caseStudies: {
    count: cases.length,
    notLive: "CMS holds 9; only live ones are visible here",
    fullHtmlDocuments: cases.filter((c) => c.blocks.some((b) => b.risks?.isFullDocument)).map((c) => c.slug),
    leakRootVars: cases.filter((c) => c.blocks.some((b) => b.risks?.leaksRootVars)).map((c) => c.slug),
    leakBodyRule: cases.filter((c) => c.blocks.some((b) => b.risks?.leaksBodyRule)).map((c) => c.slug),
  },
  assets: { distinct: assets.size },
};
await writeFile(join(OUT, "summary.json"), JSON.stringify(summary, null, 2));

console.log(`\n${assets.size} distinct Webflow-hosted assets`);
console.log("written to src/content/webflow/export/");
