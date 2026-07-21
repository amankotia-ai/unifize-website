# Notion → website content sync

Two pipes, one principle: Notion is the source of truth for content, git is
the audit trail, the page can never render broken from a Notion edit.

```
                       ┌─ PIPE 1: page copy (approved prose) ────────────────┐
 Notion Content Blocks │ ONE DB, one row per page section (DMS-S01...), the  │
 DB on Website 3.0     │ body's "## Copy" fields are the canonical prose;    │
 (single source of     │ registry.mjs maps Section ID + field label to the   │
 truth for prose)      │ copy key. Only Copy Status Approved/Live syncs.     │
        │  sync-copy.mjs
        ▼
 src/app/explorations/**/<page>-copy.json     read via dmsCopy(key, fallback)

                       ┌─ PIPE 2: structured facts (Ben's real DBs) ─────────┐
 Products, Personas,   │ relations decide WHAT renders: the DMS audience     │
 (FAQs, Integrations…) │ section = personas related to UPD-2, joined to the  │
        │              │ Personas mirror                                     │
        │  sync-sources.mjs
        ▼
 src/content/notion/{products,personas}.json  joined by page adapters

 Both: GitHub Action (hourly + Run workflow button) commits diffs to main,
 Vercel redeploys the same stable URL.
```

## How a relation change cascades

Ben adds Quality Manager to the DMS row's persona relation in the Products DB
→ next sync updates `products.json` → the audience adapter in `dms-data.ts`
finds the persona in `personas.json`, joins name + daily activities, applies
page-owned presentation (portrait, lifecycle span) → the card appears.
Removing the relation removes the card. A persona that is related but has no
content in the Personas DB (the "Auditor" case) is held back with a GAP
warning in the sync log instead of rendering a broken card.

Safety rules:
- Copy pipe: only blocks with Copy Status Approved or Live sync; a differing
  draft is reported as HELD. Deleted or blanked fields keep the last shipped
  string.
- Sources pipe: relations are authoritative (removals cascade), but a source
  returning zero rows is treated as an error and the mirror is kept.
- Every change is a readable git commit; a build-breaking commit only fails
  the new deploy, Vercel keeps serving the last good one.

## One-time setup

1. Create an internal integration at notion.so/my-integrations.
2. In Notion, connect it to: the Website 3.0 page (holds the Content Blocks
   DB), the Products DB, and the Personas DB (⋯ menu → Connections on each).
3. Verify the source schemas, then correct `registry.mjs` if needed:
   `NOTION_TOKEN=... node scripts/notion/introspect-db.mjs <database_id>`
   (If an id 404s, copy the 32-char id from the DB's URL in the browser.)
4. First mirror pull: `NOTION_TOKEN=... node scripts/notion/sync-sources.mjs`
   Review the diff (real Notion values replace the seeded baseline), commit.
5. Add `NOTION_TOKEN` as a GitHub Actions secret.

## Onboarding another page (QMS, PLM, MES, home, ...)

1. Create `<page>-copy.json` + a `dmsCopy`-style helper, wire call sites.
2. Uncomment/add the page in `COPY_TARGETS` in `registry.mjs`.
3. Author the page's Content Blocks rows (Section ID QMS-S01..., a "## Copy"
   section per row) and add their field-to-key map under
   `CONTENT_BLOCKS.sections`.
4. For structured sections, add the source DB to `SOURCES` (verify with
   introspect-db.mjs) and derive the section from the mirror like the DMS
   audience adapter in `dms-data.ts`.

## Day-to-day

- Copy edit: change the "## Copy" fields in the section's Content Block, set
  Copy Status to Approved. Relation change: edit the real DB row. Both land
  within the hour, or immediately via Run workflow on the "Sync website
  content from Notion" action.
- Local check before a demo:
  `NOTION_TOKEN=... node scripts/notion/sync-copy.mjs && NOTION_TOKEN=... node scripts/notion/sync-sources.mjs`
  then reload localhost.
