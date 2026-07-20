/* ============================================================================
 * introspect-db.mjs - prints a Notion database's schema (property name ->
 * type) and a few sample rows, so registry.mjs property mappings can be
 * verified in one minute instead of guessed.
 *
 * Usage:
 *   NOTION_TOKEN=secret_xxx node scripts/notion/introspect-db.mjs <database_id>
 * If the id 404s, open the DB in the browser and copy the 32-char id from
 * the URL (the MCP "collection://" id is not always the API database id).
 * ========================================================================== */
import { requireToken, notionRequest, extractProperty } from "./lib.mjs";

const token = requireToken();
const databaseId = process.argv[2];
if (!databaseId) {
  console.error("Usage: node scripts/notion/introspect-db.mjs <database_id>");
  process.exit(1);
}

const db = await notionRequest(token, "GET", `databases/${databaseId}`);
console.log(`Database: ${(db.title ?? []).map((t) => t.plain_text).join("") || "(untitled)"}`);
console.log("Properties:");
for (const [name, prop] of Object.entries(db.properties)) {
  console.log(`  ${name.padEnd(28)} ${prop.type}`);
}

const sample = await notionRequest(token, "POST", `databases/${databaseId}/query`, { page_size: 3 });
console.log(`\nSample rows (${sample.results.length}):`);
for (const row of sample.results) {
  const values = Object.fromEntries(
    Object.entries(row.properties).map(([name, prop]) => [name, extractProperty(prop)]),
  );
  console.log(`  ${row.id}`);
  for (const [name, value] of Object.entries(values)) {
    const shown = Array.isArray(value) ? JSON.stringify(value) : String(value);
    console.log(`    ${name.padEnd(26)} ${shown.slice(0, 90)}`);
  }
}
