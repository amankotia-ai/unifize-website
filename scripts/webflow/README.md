# Webflow -> Strapi migration

Moves the two collections the new site actually renders, **Blogs (18)** and
**Case Studies (7 live)**, out of Webflow and into Strapi Cloud. The Notion
pipeline in `../notion/` is untouched and keeps running as it does today.

## Why it scrapes instead of calling the API

There is no Webflow API token for this site. There does not need to be: Webflow
renders each rich-text field straight into a `.w-richtext` container, so the
published DOM carries the same markup the CMS holds. This is the same approach
that produced `src/content/webflow/video-transcripts.json`.

The one real tradeoff: **only live content is visible.** The CMS holds 9 case
studies, the sitemap lists 7. The two missing ones are draft or archived and
must be re-authored by hand if they are wanted. One of them, the Adaptive Health
draft, is superseded by a live study about the same customer.

## Pipeline

```
scrape.mjs      published pages      -> src/content/webflow/export/
transform.mjs   sanitize + normalise -> src/content/webflow/strapi/
load.mjs        upsert into Strapi   (assets uploaded, URLs rewritten)
redirects.mjs   301 map from the same records
```

Run in that order:

```bash
node scripts/webflow/scrape.mjs
node scripts/webflow/transform.mjs
node scripts/webflow/load.mjs --dry-run
STRAPI_URL=https://xxx.strapiapp.com STRAPI_TOKEN=... node scripts/webflow/load.mjs
node scripts/webflow/redirects.mjs > src/content/webflow/redirects.json
```

`load.mjs` is idempotent. Every record carries `webflowSlug`, so a re-run
updates the existing entry instead of duplicating it. Re-run freely while the
parsers are still being tuned. Uploaded assets are cached in
`src/content/webflow/strapi/asset-map.json` so they are not re-uploaded.

## What the sanitizer does and why

Webflow bodies carry markup we will not ship. `lib/sanitize.mjs` reduces every
body to a small semantic subset:

```
a blockquote br em figcaption figure h2 h3 h4 img li ol p
strong sup table tbody td th thead tr ul
```

- **Dropped with contents:** `script`, `style`, `input`, `head`, `meta`, `link`,
  `iframe`. Four posts embed pasted HTML whose `<style>` blocks define global
  `.custom-table` and `:root` rules that would collide across posts and override
  our design tokens: `cfr-part-11`, `the-role-of-data-analytics-in-quality`,
  `why-quality-5-0-starts-with-people-not-platforms`, and
  `collaboration-the-missing-ingredient-in-your-quality-management-system`.
- **Unwrapped:** `html`, `body`, `div`, `span`, `section`, `details`, and the
  other structural wrappers. Children are kept.
- **Attributes:** everything stripped except `href`/`target`/`rel` on links,
  `src`/`alt`/`width`/`height` on images, and colspan/rowspan on cells. Webflow
  writes `id=""` on nearly every element.
- **Links:** internal `unifize.com` URLs become relative and shed `utm_*`
  params; external links get `target="_blank" rel="noopener noreferrer"`.
- **Headings:** case-study authors are inconsistent about starting at h2 or h3.
  A body with no h2 gets every level promoted once, so styles have a stable top.

`transform-audit.json` records exactly what was dropped or unwrapped per item.
Read it after any re-scrape rather than trusting the transform blindly.

## Known gaps

- **Cross-links point at collections we are not migrating.** Bodies link to
  `/content` (5 distinct), `/guide` (2) and `/customer` (1). Those routes do not
  exist on the new site yet and will 404 unless they are built or redirected.
- **`category` on blog-post is unpopulated.** Webflow categorises posts through
  a 108-item Tags relation, which does not survive scraping. Someone has to map
  18 posts onto the five enum values by hand.
- **Case-study `company`, `industry`, `location` are unpopulated.** They exist as
  flat fields in the CMS but are not reliably rendered on the page.
- **77 Webflow-hosted assets** are referenced by these 25 items and are uploaded
  by `load.mjs`. A further ~273 hotlinks elsewhere in `src/` (customer videos,
  integration logos) are out of scope here but die on the same day Webflow is
  cancelled.
