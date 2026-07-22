/* ============================================================================
 * sync-copy.mjs - pulls approved page prose out of Notion and regenerates
 * every page copy file registered in COPY_TARGETS.
 *
 * Two databases cooperate (see registry.mjs CONTENT_BLOCKS):
 *   - Copy Fields: one row per rendered string (Key, Text, Block relation).
 *     Each Content Block page embeds a filtered table of its own rows, so
 *     editors change table cells, never markdown.
 *   - Content Blocks: one row per page section; its Copy Status is the
 *     approval gate for every field related to it.
 *
 * Merge rules (deletion-safe, approval-gated):
 *   - A field only syncs when its parent block's Copy Status is in
 *     approved_statuses; a differing value on any other block is reported
 *     as HELD and the site keeps the current string.
 *   - Empty Text, a missing row, or a row with no Block relation keeps the
 *     current string (warning).
 *   - Rows whose Key is not wired on any page are reported (SKIP).
 * Files are only rewritten when something changed, so CI can use a plain
 * `git status` check to decide whether to commit.
 *
 * Usage:
 *   NOTION_TOKEN=secret_xxx node scripts/notion/sync-copy.mjs
 * ========================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { requireToken, queryAllRows, extractProperty } from "./lib.mjs";
import { COPY_TARGETS, CONTENT_BLOCKS } from "./registry.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");

const token = requireToken();
const { database_id, fields_database_id, approved_statuses } = CONTENT_BLOCKS;

/* block pageId -> { status, section } */
const blocks = new Map();
for (const row of await queryAllRows(token, database_id)) {
  blocks.set(row.id, {
    status: extractProperty(row.properties?.["Copy Status"]),
    section: extractProperty(row.properties?.["Section ID"]),
  });
}

/* namespaced key -> { text, status, section } */
const fromNotion = new Map();
for (const row of await queryAllRows(token, fields_database_id)) {
  const key = extractProperty(row.properties?.Key);
  if (!key) continue;
  const text = extractProperty(row.properties?.Text);
  const blockId = extractProperty(row.properties?.Block)[0];
  const block = blockId ? blocks.get(blockId) : undefined;
  if (!block) {
    console.warn(`KEPT   ${key}: field row has no Block relation, keeping current text.`);
    continue;
  }
  fromNotion.set(key, { text, status: block.status, section: block.section });
}

let totalChanged = 0;
const held = [];
for (const [prefix, target] of Object.entries(COPY_TARGETS)) {
  const path = join(ROOT, target);
  const copy = JSON.parse(readFileSync(path, "utf8"));
  let changed = 0;
  for (const [key, slot] of Object.entries(copy)) {
    const namespaced = `${prefix}/${key}`;
    const entry = fromNotion.get(namespaced);
    if (!entry) {
      console.warn(`KEPT   ${namespaced}: no Copy Fields row, keeping current text.`);
      continue;
    }
    if (!entry.text) {
      console.warn(`KEPT   ${namespaced}: Text is empty, keeping current text.`);
      continue;
    }
    if (entry.text === slot.text) continue;
    if (!approved_statuses.includes(entry.status)) {
      held.push(`${namespaced}: ${entry.section} edit pending (Copy Status "${entry.status}")`);
      continue;
    }
    console.log(`UPDATE ${namespaced}: "${slot.text}" -> "${entry.text}"`);
    slot.text = entry.text;
    changed += 1;
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
  if (!wired.has(key)) console.warn(`SKIP   ${key}: in Copy Fields but not wired on any page.`);
}

if (held.length) {
  console.warn(`HELD   ${held.length} edit(s) awaiting approval (Copy Status must be one of: ${approved_statuses.join(", ")}):`);
  for (const h of held) console.warn(`       ${h}`);
}
if (totalChanged === 0) console.log("No copy changes.");
