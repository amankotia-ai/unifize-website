/* ============================================================================
 * sync-copy.mjs - pulls the "Website Copy" database and regenerates every
 * page copy file registered in COPY_TARGETS.
 *
 * Merge rules (deletion-safe by design):
 *   - A Notion row with a known "prefix/key" and non-empty Text updates it.
 *   - Empty Text or a missing row keeps the current string (warning).
 *   - Keys not wired on any page are skipped (warning). Wiring a new string
 *     means adding it to the page's copy JSON and a call site first.
 * Files are only rewritten when something changed, so CI can use a plain
 * `git status` check to decide whether to commit.
 *
 * Usage:
 *   NOTION_TOKEN=secret_xxx node scripts/notion/sync-copy.mjs
 * ========================================================================== */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { requireToken, queryAllRows, plainText } from "./lib.mjs";
import { COPY_TARGETS } from "./registry.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");
const CONFIG_PATH = join(HERE, "copy-db.config.json");

const token = requireToken();

const databaseId =
  process.env.NOTION_COPY_DB_ID ??
  (existsSync(CONFIG_PATH) ? JSON.parse(readFileSync(CONFIG_PATH, "utf8")).database_id : undefined);
if (!databaseId) {
  console.error("No database id. Run seed-copy.mjs first or set NOTION_COPY_DB_ID.");
  process.exit(1);
}

const fromNotion = new Map();
for (const row of await queryAllRows(token, databaseId)) {
  const key = plainText(row.properties?.Key?.rich_text);
  const text = plainText(row.properties?.Text?.rich_text);
  if (key) fromNotion.set(key, text);
}

let totalChanged = 0;
for (const [prefix, target] of Object.entries(COPY_TARGETS)) {
  const path = join(ROOT, target);
  const copy = JSON.parse(readFileSync(path, "utf8"));
  let changed = 0;
  for (const [key, slot] of Object.entries(copy)) {
    const namespaced = `${prefix}/${key}`;
    if (!fromNotion.has(namespaced)) {
      console.warn(`KEPT   ${namespaced}: no Notion row found, keeping current text.`);
      continue;
    }
    const text = fromNotion.get(namespaced);
    if (!text) {
      console.warn(`KEPT   ${namespaced}: Notion Text is empty, keeping current text.`);
      continue;
    }
    if (text !== slot.text) {
      console.log(`UPDATE ${namespaced}: "${slot.text}" -> "${text}"`);
      slot.text = text;
      changed += 1;
    }
  }
  if (changed > 0) {
    writeFileSync(path, JSON.stringify(copy, null, 2) + "\n");
    console.log(`Wrote ${target} (${changed} updated).`);
    totalChanged += changed;
  }
}

const wired = new Set(
  Object.entries(COPY_TARGETS).flatMap(([prefix, target]) =>
    Object.keys(JSON.parse(readFileSync(join(ROOT, target), "utf8"))).map((k) => `${prefix}/${k}`),
  ),
);
for (const key of fromNotion.keys()) {
  if (!wired.has(key)) console.warn(`SKIP   ${key}: not wired on any page yet.`);
}

if (totalChanged === 0) console.log("No copy changes.");
