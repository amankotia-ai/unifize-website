# Handoff: Notion management system + content sync (2026-07-20)

For a fresh Claude session with the Notion connector active. Everything repo-side
is DONE and verified; this session's job is the Notion restructure. The full plan
also lives in memory (`notion-management-plan`, `ben-dms-release-contract`,
`notion-sync-pipeline`) - read those first if anything here seems stale.

## Context in three sentences

Ben (founder) demands, per the 2026-07-15 call (Fireflies `01KX2WJQA8RRMK098KTDMA6MR2`):
release the DMS page complete by **July 31** with editing built in, demo only
things that work NOW (never future tense), and ONE agreed system on Notion (his
databases, IDs on everything, no duplicates). The repo now has a working
Notion→website sync; Notion itself still needs consolidation and the management
layer. User amendments since: ID prefixes max 3 chars; template sections shown
on each template's page; FAQ/INT/CLM/VID databases NOT created yet, raised as
tasks instead.

## Already done (do not redo)

- `scripts/notion/` - zero-dep sync pipeline: `seed-copy.mjs` (creates ONE
  "Website Copy" DB, CPY-##, keys namespaced `dms/hero.line1`),
  `sync-copy.mjs`, `sync-sources.mjs` (mirrors Products/Personas to
  `src/content/notion/*.json`), `introspect-db.mjs`, `registry.mjs` (the map),
  `lib.mjs`, `README.md` (runbook).
- `.github/workflows/notion-sync.yml` - hourly + manual sync, commits to main,
  Vercel redeploys.
- DMS page reads 13 strings via `dmsCopy()` from `dms-copy.json`; audience
  section derives personas from the mirrors (add/remove persona on the product
  row cascades). Verified in browser both directions. Typecheck clean.
- NOT yet committed to git; NOT yet seeded to Notion (needs integration token).

## The Notion work, in order

**IDs:** Website 3.0 teamspace `32c860e6-b45e-8111-8f3c-e0e6b459bb7f` · Tracker
page `390860e6-b45e-81e1-a848-d65ff26d3bfc` · tracker's duplicate Site Pages DB
`39d8319a-b751-49d6-b30e-18e5b03f586e` · Templates DB
`d20c5e10-d25d-44d9-8c9a-89ed8b1b9b43` (canonical page
`11ce166b46314717b2c94ab14b09069a`, Product Page row
`396860e6-b45e-81a9-ba05-de1afd26f9bb`) · Website Tasks DB
`3ae56db7-87d3-4fa2-b2d9-87872b64d1a0` · DMS row in tracker DB
`390860e6-b45e-8163-8cf0-c0486000cc60` (SP-32) · DMS Review Hub
`39d860e6-b45e-8174-8f1b-fc209c0d7237` · Products DB
`c52ba86c-86a4-4687-a4aa-12d05887af76` · Personas DB
`640d9b55-a7f0-482a-b577-901cf7913bcc` · Industries
`4d1fd81b-ba8b-4359-9981-bdbe2d797d6e` · Domains
`b835b86d-e5e0-4e7e-8625-e239fbf9c196` · External Standards
`c6d2d4fd-ce75-4909-a2bd-f7209f798717`.

1. **Audit first, change nothing:** locate Ben's ORIGINAL Site Pages DB
   (search "Site Pages" in Website 3.0; it has IDs, phases, URLs, and is NOT
   the tracker one above). Read its exact schema. Also audit for duplicate
   Website Tasks DBs / old trackers (Mission Control page
   `389860e6-b45e-81c4-aeb9-ec94bd04195b` is the likely offender). Report
   findings to the user before step 2.
2. **Merge** tracker Site Pages → Ben's original: add only missing columns
   (Template relation → Templates DB, Build Stage select, Staging URL url,
   Open Decisions relation → Website Tasks). Copy values property-by-property;
   create rows that exist only in the tracker (Quality Manager persona page,
   FDA-483 trigger page). NEVER use Notion "move row" across DBs (schema
   mismatch spawns stray columns - see memory `website-tracker-notion-map`
   gotchas; also `notion-query-data-sources` rate-limits hard, prefer
   fetch/create/update).
3. **Re-parent** the DMS Review Hub under the DMS row in Ben's DB. **Re-point**
   two relations to Ben's DB (relations bind per-database, so create new
   columns, re-link ~10 rows each, delete old): Templates→Site Pages and
   Website Tasks→Blocks Pages.
4. **Archive** the tracker's duplicate Site Pages (rename "Site Pages
   (superseded - see canonical Site Pages)", link callout) and any duplicate
   task trackers found in step 1. Only deletions in the whole plan.
5. **Create "Data Sources" (SRC)** under the Tracker page. Columns: Name
   (title), ID (unique_id SRC), Link (url), Kind (select: Notion DB / Code /
   External), Status (select: Live / To be created), Owner (person). ~10 rows:
   Products, Personas, Industries, Domains, External Standards, Website Copy
   (Live once seeded) + FAQs, Integrations, Claims/Stats, Customer Videos all
   "To be created".
6. **Create "Template Sections" (SEC)** as child of the Templates canonical
   page. Columns: Section (title), ID (unique_id SEC), Template (relation →
   Templates), Order (number), Pulls From (relation → Data Sources), Fields
   Used (text), Default State (select: Grounded / Hardcoded / Mock), Notes.
   Seed ~14 rows for Product Page template from the DMS build: Hero →
   Website Copy + Products (Grounded) · Trust strip → Industries (Hardcoded) ·
   Problem → Website Copy + Claims/Stats (headings Grounded, numbers
   Hardcoded) · Modules → Products module relation (Hardcoded) · Coordination
   Tax → Website Copy/code · Capabilities → code (Hardcoded) · Lifecycle →
   code · Integrations → Integrations DB (Hardcoded) · Who it is for →
   Products persona relation + Personas (Grounded) · Proof → Customer Videos
   (Hardcoded, Webflow inventory) · Compliance → External Standards · FAQ →
   FAQs DB (Hardcoded) · Close → Website Copy · Footer → Website Copy.
7. **Do NOT create FAQ/INT/CLM/VID databases.** Add four Website Tasks rows
   instead: "Create + seed FAQs DB from existing site content" (rule: real
   questions, never autogenerated, source noted per row), "Create + seed
   Integrations DB" (each row gets Status Live/Planned/Decision pending -
   this answers Ben's Google Drive challenge), "Create + seed Claims/Stats
   DB" (every number needs a source), "Create + seed Customer Videos DB"
   (seed from Webflow inventory already in `dms-data.ts` TESTIMONIALS +
   PROOF_FILMS). Each task: Type Dependency, Owner Abhishek, Needed By before
   Jul 31, Blocks Templates → Product Page.
8. **Website Copy DB**: run `NOTION_TOKEN=... NOTION_PARENT_PAGE_ID=<Tracker
   page id> node scripts/notion/seed-copy.mjs` (needs the API integration
   token, separate from the Claude connector; user creates it at
   notion.so/my-integrations and shares it with the Tracker page + Products +
   Personas DBs). Commit the config file it writes. Then run
   `introspect-db.mjs` on Products and Personas and fix property-name guesses
   in `registry.mjs` ("Target Personas", "Daily Activities" are unverified).
9. **Relations:** Site Pages → Template (if not created in step 2); Website
   Tasks → Blocks Templates (relation → Templates); Templates → Sources
   (relation → Data Sources, next to the old "Pulls From" text; delete text
   only after values match).
10. **Dossier views:** on each template row page embed a linked view of SEC
    filtered to itself (filtered views auto-tag new rows). On the DMS row in
    Ben's DB embed: Website Copy view (filter Page=dms) + Website Tasks view
    (blocking this page). Review Hub child sits below.
11. **Task hygiene:** every open Website Tasks row gets Owner + Needed By.
12. **Rename TMPL prefix → TPL** (3-char rule; Notion relabels rows in place,
    numbers preserved). Then one message to Ben, present tense only: "One
    Site Pages database, yours. Open any page row: what it's made of, what
    feeds it, what's blocking it, who approved it. Here's DMS." Include the
    stable staging URL.

## Also pending (repo/deploy side, any session)

- Commit the sync pipeline + DMS changes (currently uncommitted alongside
  other WIP in the working tree - commit deliberately, the tree is dirty).
- Vercel: promote a stable production URL (repo is linked,
  `amankotia-ai/unifize-website`), put it in the Staging URL column of the
  DMS row and the Review Hub. Turn off deployment protection on it.
- GitHub: add `NOTION_TOKEN` as an Actions secret; workflow starts hourly
  once merged to main.
- Demo dry run before Ben sees it: edit copy in Notion → Run workflow →
  stable URL updates; then add/remove Quality Manager on the DMS product row
  → audience card appears/disappears.

## Rules that must survive the handoff

- Max 3-character ID prefixes on all databases.
- Never demo future tense to Ben; anything shown is working or labeled
  Grounded/Hardcoded/Mock.
- Never create a new DB when an agreed one exists; propose once, numbered.
- Anything hardcoded on a page must have a matching Website Tasks row.
- No colored single-edge borders in UI work (standing design rule).
