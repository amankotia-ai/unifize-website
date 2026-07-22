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

 Both: GitHub Action (webhook-fired + 10-min cron + Run workflow button)
 commits diffs to main, Vercel redeploys the same stable URL. A final
 write-back step (writeback-copy.mjs) then reports the shipped state INTO
 Notion: Live Text + Last Synced on every Copy Fields row, Renders on the
 Relation rows (the canonical values they currently produce), Last Pushed
 on the blocks. The /api/notion-sync endpoint drops webhook events authored
 by the integration's own bot so the write-back cannot re-trigger the run.
```

## The editing surface (one table)

Ben edits ONE view: **"DMS · Page editor"** on the Copy Fields DB (also
embedded on the DMS row in Site Pages). The whole page reads top to bottom,
grouped by section, one row per rendered element:

- **Text** - what Ben wants the site to say. Edit in place.
- **Live Text** - what the site currently says (written by the sync).
- **Ships?** - the row's state at a glance: 🟢 live, ✏️ edited and pending,
  ⏸/status via the Status rollup, 🔗 canonical, 🔒 code.
- **Renders** - for Relation rows, the actual canonical values in use
  (industry chips, persona cards, standards cards). Editing those happens at
  the canonical row (the Edit at relation); seeing happens here.
- **Kind** - Text (editable here) / Relation (edit at source) / Code (repo).

The Page select on every row scopes the per-page views (view-DSL cannot
filter on relations or rollups - the select is the documented workaround).

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

1. Create `<page>-copy.json` + a `dmsCopy`-style helper, wire call sites
   (card copy included - wrap the strings in the page's data module, see
   dms-data.ts).
2. Uncomment/add the page in `COPY_TARGETS`; add the page's product row to
   `WRITEBACK_PRODUCTS` in `registry.mjs`.
3. Author the page's Copy Fields rows: Key, Text, Kind Text, Page select,
   Block relation + Block Key (the blocks already exist for QMS/PLM/MES).
   Then a "<PAGE> · Page editor" view filtered on the Page select.
4. For structured sections, add the source DB to `SOURCES` (verify with
   introspect-db.mjs) and derive the section from the mirror like the DMS
   audience adapter in `dms-data.ts`.

## Day-to-day

- Copy edit: change the Text cell in the Copy table on the section's Content
  Block page (all rows live in the one Copy Fields DB), set the block's Copy
  Status to Approved. Relation change: edit the real DB row. Both land within
  ten minutes, or immediately via Run workflow on the "Sync website content
  from Notion" action.
- Local check before a demo:
  `NOTION_TOKEN=... node scripts/notion/sync-copy.mjs && NOTION_TOKEN=... node scripts/notion/sync-sources.mjs`
  then reload localhost.
