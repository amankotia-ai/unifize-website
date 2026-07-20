/* ============================================================================
 * sync-sources.mjs - mirrors the structured Notion databases (Products,
 * Personas, ...) registered in SOURCES into committed JSON files under
 * src/content/notion/. Pages derive their sections from these mirrors, so a
 * relation change in Notion (add or remove a persona on a product row)
 * cascades to every page that renders from it on the next sync.
 *
 * Safety rules:
 *   - A source returning ZERO rows is treated as an error (bad share or
 *     token): the existing mirror is kept and the run is marked failed.
 *   - Relation ids that point outside the mirrored set are warned about
 *     (row not shared with the integration, or archived).
 *   - Rows missing their id or name are warned about; pages hold back cards
 *     with incomplete facts rather than rendering broken ones.
 * Files are only rewritten when content actually changed.
 *
 * Usage:
 *   NOTION_TOKEN=secret_xxx node scripts/notion/sync-sources.mjs
 * ========================================================================== */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { requireToken, queryAllRows, extractProperty } from "./lib.mjs";
import { SOURCES } from "./registry.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");

const token = requireToken();
let failed = false;
const mirrors = {};

for (const [name, source] of Object.entries(SOURCES)) {
  const path = join(ROOT, source.mirror);
  let rows;
  try {
    rows = await queryAllRows(token, source.database_id);
  } catch (err) {
    console.error(`FAIL   ${name}: ${err.message}. Mirror kept as-is.`);
    failed = true;
    continue;
  }
  if (rows.length === 0) {
    console.error(`FAIL   ${name}: Notion returned 0 rows. Is the DB shared with the integration? Mirror kept as-is.`);
    failed = true;
    continue;
  }

  const mirror = rows.map((row) => {
    const out = { pageId: row.id };
    for (const [field, spec] of Object.entries(source.properties)) {
      out[field] = extractProperty(row.properties?.[spec.property], spec.kind);
    }
    return out;
  });

  for (const row of mirror) {
    if (!row.id || !row.name) {
      console.warn(`GAP    ${name}: row ${row.pageId} missing ${!row.id ? "ID" : "name"}. Pages will hold it back.`);
    }
  }

  mirrors[name] = mirror;
  const next = JSON.stringify(mirror, null, 2) + "\n";
  const prev = existsSync(path) ? readFileSync(path, "utf8") : "";
  if (next !== prev) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, next);
    console.log(`Wrote ${source.mirror} (${mirror.length} rows).`);
  } else {
    console.log(`OK     ${name}: no changes (${mirror.length} rows).`);
  }
}

/* Cross-mirror gap check: product persona relations must resolve. */
if (mirrors.products && mirrors.personas) {
  const known = new Set(mirrors.personas.map((p) => p.pageId));
  for (const product of mirrors.products) {
    for (const rel of product.personas ?? []) {
      if (!known.has(rel)) {
        console.warn(`GAP    products/${product.id || product.pageId}: persona relation ${rel} not in personas mirror (not shared, or archived). Card held back.`);
      }
    }
  }
}

process.exit(failed ? 1 : 0);
