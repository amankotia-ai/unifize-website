/* ============================================================================
 * writeback-copy.mjs - reports the shipped state back into Notion, so the
 * Copy Fields DB always shows what is actually live on the site.
 *
 * Runs LAST in the sync workflow, after the commit/push step: whatever is in
 * the repo's copy JSONs and mirrors at that point is (or is about to be) the
 * deployed site. Three write-backs, all delta-only (a row already up to date
 * is never touched, so a normal run makes a handful of writes, not fifty):
 *
 *   - Text rows (Kind Text, has a Key): Live Text = the shipped string from
 *     the page's copy JSON. Ben sees Text vs Live Text side by side; the
 *     Ships? formula turns green when they match.
 *   - Relation rows (Kind Relation): Renders = the canonical values the row
 *     currently produces (industry chips, persona cards, standards cards),
 *     computed from the same mirrors + filters the page adapters use. Seeing
 *     happens here; editing stays at the canonical row (Edit at).
 *   - Blocks whose rows changed get Last Pushed stamped.
 *
 * Every touched row also gets Last Synced. The webhook endpoint drops events
 * authored by this integration's bot, so these writes do not re-trigger the
 * workflow (and even if one slipped through, the second run would find no
 * deltas and write nothing - the loop starves either way).
 *
 * Usage: NOTION_TOKEN=secret_xxx node scripts/notion/writeback-copy.mjs
 * ========================================================================== */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { requireToken, notionRequest, queryAllRows, extractProperty, richText } from "./lib.mjs";
import { COPY_TARGETS, CONTENT_BLOCKS, WRITEBACK_PRODUCTS } from "./registry.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");
const token = requireToken();
const now = new Date().toISOString();

const readJson = (path) => JSON.parse(readFileSync(join(ROOT, path), "utf8"));

/* ---- what shipped: namespaced key -> text ------------------------------- */
const shipped = new Map();
for (const [prefix, target] of Object.entries(COPY_TARGETS)) {
  for (const [key, slot] of Object.entries(readJson(target))) {
    shipped.set(`${prefix}/${key}`, slot.text ?? "");
  }
}

/* ---- what the Relation rows render: `${prefix}:${field}` -> string ------ */
const products = readJson("src/content/notion/products.json");
const industries = readJson("src/content/notion/industries.json");
const personas = readJson("src/content/notion/personas.json");
const standards = readJson("src/content/notion/standards.json");
const flows = readJson("src/content/notion/flows.json");
const flowSteps = readJson("src/content/notion/flow-steps.json");

/* Modules Bundled is not yet populated on the product rows; until it is, the
 * page adapters fall back to these known module page ids (see dms-data.ts). */
const MODULE_FALLBACK = {
  dms: [
    "360860e6-b45e-819a-b47d-d65659287f7a" /* Document Control */,
    "360860e6-b45e-81f9-b902-df2000f4441e" /* Change Control */,
    "360860e6-b45e-81ec-8a8f-c7fb0880a781" /* Training Management */,
  ],
};

const journeysWithSteps = new Set();
for (const step of flowSteps) for (const j of step.journey ?? []) journeysWithSteps.add(j);

const renders = new Map();
for (const [prefix, productId] of Object.entries(WRITEBACK_PRODUCTS)) {
  const product = products.find((p) => p.id === productId);
  if (!product) continue;
  /* same joins + filters as the page adapters (dms-data.ts) */
  const industryNames = (product.industries ?? [])
    .map((relId) => industries.find((row) => row.pageId === relId))
    .filter((row) => row?.name && row.websiteStatus !== "Hidden")
    .map((row) => row.name);
  const personaNames = (product.personas ?? [])
    .map((relId) => personas.find((row) => row.pageId === relId))
    .filter((row) => row?.name && (row.daily ?? []).length > 0)
    .map((row) => row.name);
  const standardNames = (product.standards ?? [])
    .map((relId) => standards.find((row) => row.pageId === relId))
    .filter((row) => row?.name)
    .map((row) => row.name);
  renders.set(`${prefix}:Industry chips`, industryNames.join(" · "));
  renders.set(`${prefix}:Validated-across chips`, industryNames.join(" · "));
  renders.set(`${prefix}:Persona cards`, personaNames.join(" · "));
  renders.set(`${prefix}:Standards cards`, standardNames.join(" · "));
  /* same filter as the flow adapter in dms-data.ts */
  const moduleIds = (product.modules ?? []).length > 0 ? product.modules : (MODULE_FALLBACK[prefix] ?? []);
  const flowNames = flows
    .filter((flow) =>
      flow.status !== "Deprecated" &&
      journeysWithSteps.has(flow.pageId) &&
      (flow.modules ?? []).some((m) => moduleIds.includes(m)))
    .map((flow) => flow.name);
  renders.set(`${prefix}:Flow cards`, flowNames.join(" · "));
}

/* ---- current Notion state ----------------------------------------------- */
const fieldRows = await queryAllRows(token, CONTENT_BLOCKS.fields_database_id);

let updated = 0;
const touchedBlocks = new Set();

for (const row of fieldRows) {
  const props = row.properties ?? {};
  const key = extractProperty(props.Key);
  const kind = extractProperty(props.Kind);
  const field = extractProperty(props.Field);
  const page = extractProperty(props.Page); /* "DMS" -> prefix "dms" */
  const prefix = (page || key.split("/")[0] || "").toLowerCase();

  const patch = {};
  if (key && shipped.has(key)) {
    const live = shipped.get(key);
    if (live && live !== extractProperty(props["Live Text"])) {
      patch["Live Text"] = { rich_text: richText(live) };
    }
  }
  if (kind === "Relation" && renders.has(`${prefix}:${field}`)) {
    const rendered = renders.get(`${prefix}:${field}`);
    if (rendered && rendered !== extractProperty(props.Renders)) {
      patch.Renders = { rich_text: richText(rendered) };
    }
  }
  if (Object.keys(patch).length === 0) continue;

  patch["Last Synced"] = { date: { start: now } };
  await notionRequest(token, "PATCH", `pages/${row.id}`, { properties: patch });
  updated += 1;
  for (const blockId of extractProperty(props.Block)) touchedBlocks.add(blockId);
  console.log(`WROTE  ${field || key}: ${Object.keys(patch).join(", ")}`);
}

for (const blockId of touchedBlocks) {
  await notionRequest(token, "PATCH", `pages/${blockId}`, {
    properties: { "Last Pushed": { date: { start: now } } },
  });
}

console.log(
  updated === 0
    ? "Write-back: everything already up to date."
    : `Write-back: ${updated} row(s) updated, ${touchedBlocks.size} block(s) stamped.`,
);
