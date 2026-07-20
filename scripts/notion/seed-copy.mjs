/* ============================================================================
 * seed-copy.mjs - one-time setup for the sitewide copy pipeline.
 * Creates ONE "Website Copy" database (CPY-##) as a child of the given Notion
 * page and seeds a row per string from every page file in COPY_TARGETS,
 * with keys namespaced "prefix/key" and a Page select for filtered views.
 * Writes the database id to scripts/notion/copy-db.config.json.
 *
 * Usage:
 *   NOTION_TOKEN=secret_xxx NOTION_PARENT_PAGE_ID=xxxx node scripts/notion/seed-copy.mjs
 * Re-running with new pages in COPY_TARGETS seeds only missing keys.
 * ========================================================================== */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { requireToken, notionRequest, queryAllRows, richText, plainText } from "./lib.mjs";
import { COPY_TARGETS } from "./registry.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");
const CONFIG_PATH = join(HERE, "copy-db.config.json");

const token = requireToken();

const baseProperties = {
  Element: { title: {} },
  Key: { rich_text: {} },
  Text: { rich_text: {} },
  Notes: { rich_text: {} },
  Page: { select: {} },
  Order: { number: { format: "number" } },
};

async function ensureDatabase() {
  if (existsSync(CONFIG_PATH)) {
    const { database_id } = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
    console.log(`Using existing Website Copy database ${database_id}.`);
    return database_id;
  }
  const parentPageId = process.env.NOTION_PARENT_PAGE_ID;
  if (!parentPageId) {
    console.error("First run: set NOTION_PARENT_PAGE_ID (the page the DB should live under).");
    process.exit(1);
  }
  const payload = {
    parent: { type: "page_id", page_id: parentPageId },
    title: richText("Website Copy"),
    is_inline: false,
    properties: { ...baseProperties, ID: { unique_id: { prefix: "CPY" } } },
  };
  let db;
  try {
    db = await notionRequest(token, "POST", "databases", payload);
  } catch (err) {
    console.warn(`Could not create the CPY unique-ID property via API (${err.message}).`);
    console.warn("Creating without it. Add an ID property (prefix CPY) manually in Notion.");
    db = await notionRequest(token, "POST", "databases", { ...payload, properties: baseProperties });
  }
  console.log(`Created database "Website Copy": ${db.id}`);
  console.log(`URL: ${db.url ?? "(open the parent page in Notion)"}`);
  writeFileSync(CONFIG_PATH, JSON.stringify({ database_id: db.id }, null, 2) + "\n");
  console.log(`Wrote ${CONFIG_PATH}. Commit it.`);
  return db.id;
}

const databaseId = await ensureDatabase();

const existing = new Set(
  (await queryAllRows(token, databaseId)).map((row) => plainText(row.properties?.Key?.rich_text)),
);

let order = existing.size;
let seeded = 0;
for (const [prefix, target] of Object.entries(COPY_TARGETS)) {
  const copy = JSON.parse(readFileSync(join(ROOT, target), "utf8"));
  for (const [key, slot] of Object.entries(copy)) {
    const namespaced = `${prefix}/${key}`;
    if (existing.has(namespaced)) continue;
    order += 1;
    await notionRequest(token, "POST", "pages", {
      parent: { database_id: databaseId },
      properties: {
        Element: { title: richText(slot.element) },
        Key: { rich_text: richText(namespaced) },
        Text: { rich_text: richText(slot.text) },
        Page: { select: { name: prefix } },
        Order: { number: order },
      },
    });
    seeded += 1;
    console.log(`  seeded ${namespaced}`);
  }
}
console.log(seeded ? `Seeded ${seeded} rows.` : "Nothing to seed, all keys already present.");
