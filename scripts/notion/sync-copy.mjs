/* ============================================================================
 * sync-copy.mjs - pulls approved page prose out of the Content Blocks
 * database (the single source of truth, on the Website 3.0 page) and
 * regenerates every page copy file registered in COPY_TARGETS.
 *
 * Contract: each section row (Section ID like DMS-S01) carries a "## Copy"
 * heading in its body followed by "**Label:** value" lines. The
 * CONTENT_BLOCKS.sections map in registry.mjs translates Section ID + label
 * into the namespaced copy key the page renders.
 *
 * Merge rules (deletion-safe, approval-gated):
 *   - Only rows whose Copy Status is in approved_statuses sync; a differing
 *     value on any other row is reported as HELD and the site keeps the
 *     current string. This is what makes "approved edits flow to the site"
 *     literally true.
 *   - An empty field or a missing block keeps the current string (warning).
 *   - Mapped fields with no wired key on any page are reported (SKIP).
 * Files are only rewritten when something changed, so CI can use a plain
 * `git status` check to decide whether to commit.
 *
 * Usage:
 *   NOTION_TOKEN=secret_xxx node scripts/notion/sync-copy.mjs
 * ========================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { requireToken, queryAllRows, listBlockChildren, extractProperty, plainText } from "./lib.mjs";
import { COPY_TARGETS, CONTENT_BLOCKS } from "./registry.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");

const token = requireToken();
const { database_id, approved_statuses, sections } = CONTENT_BLOCKS;

/* "**Label:** value" -> [label, value]. The label is the leading run of bold
 * text; the colon may sit inside or just after the bold span. */
function parseField(richTextArray) {
  if (!richTextArray?.length) return null;
  let i = 0;
  let label = "";
  while (i < richTextArray.length && richTextArray[i].annotations?.bold) {
    label += richTextArray[i].plain_text ?? "";
    i += 1;
  }
  label = label.trim();
  if (!label) return null;
  let value = richTextArray.slice(i).map((t) => t.plain_text ?? "").join("");
  if (label.endsWith(":")) label = label.slice(0, -1).trim();
  else if (value.startsWith(":")) value = value.slice(1);
  return [label, value.trim()];
}

/* All "**Label:** value" fields between the "## Copy" heading and the next
 * heading of the same or higher level. */
function copyFields(blocks) {
  const fields = new Map();
  let inCopy = false;
  for (const block of blocks) {
    const heading = block.type?.startsWith("heading") ? plainText(block[block.type]?.rich_text) : null;
    if (heading !== null) {
      inCopy = heading.toLowerCase() === "copy";
      continue;
    }
    if (!inCopy) continue;
    const rich = block[block.type]?.rich_text;
    const parsed = parseField(rich);
    if (parsed) fields.set(parsed[0], parsed[1]);
  }
  return fields;
}

const fromNotion = new Map(); // namespaced key -> { text, status, section }
for (const row of await queryAllRows(token, database_id)) {
  const sectionId = extractProperty(row.properties?.["Section ID"]);
  const fieldMap = sections[sectionId];
  if (!fieldMap) continue;
  const status = extractProperty(row.properties?.["Copy Status"]);
  const fields = copyFields(await listBlockChildren(token, row.id));
  for (const [label, key] of Object.entries(fieldMap)) {
    if (!fields.has(label)) {
      console.warn(`KEPT   ${key}: no "${label}" field under ## Copy in ${sectionId}.`);
      continue;
    }
    fromNotion.set(key, { text: fields.get(label), status, section: sectionId });
  }
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
      console.warn(`KEPT   ${namespaced}: not mapped to any Content Block field, keeping current text.`);
      continue;
    }
    if (!entry.text) {
      console.warn(`KEPT   ${namespaced}: Content Block field is empty, keeping current text.`);
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
  if (!wired.has(key)) console.warn(`SKIP   ${key}: mapped in registry but not wired on any page.`);
}

if (held.length) {
  console.warn(`HELD   ${held.length} edit(s) awaiting approval (Copy Status must be one of: ${approved_statuses.join(", ")}):`);
  for (const h of held) console.warn(`       ${h}`);
}
if (totalChanged === 0) console.log("No copy changes.");
