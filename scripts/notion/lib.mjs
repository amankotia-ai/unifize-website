/* ============================================================================
 * lib.mjs - shared helpers for the Notion sync scripts.
 * Plain fetch against the Notion REST API. No dependencies. Node 18+.
 * ========================================================================== */

export const NOTION_VERSION = "2022-06-28";

export function requireToken() {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    console.error("Set NOTION_TOKEN (internal integration secret from notion.so/my-integrations).");
    process.exit(1);
  }
  return token;
}

export async function notionRequest(token, method, path, body) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status}: ${json.message ?? JSON.stringify(json)}`);
  }
  return json;
}

export async function queryAllRows(token, databaseId) {
  const rows = [];
  let cursor;
  do {
    const json = await notionRequest(token, "POST", `databases/${databaseId}/query`, {
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    rows.push(...json.results);
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);
  return rows.filter((row) => !row.archived);
}

export async function listBlockChildren(token, blockId) {
  const blocks = [];
  let cursor;
  do {
    const qs = `?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`;
    const json = await notionRequest(token, "GET", `blocks/${blockId}/children${qs}`);
    blocks.push(...json.results);
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

export const richText = (content) => [{ type: "text", text: { content } }];

export const plainText = (richTextArray) =>
  (richTextArray ?? []).map((t) => t.plain_text ?? "").join("").trim();

/* Extract a plain JS value from a Notion property, whatever its type.
 * "list" coerces multi_select names or newline-separated rich_text into an
 * array of strings, so the config does not need to know which one the DB
 * actually uses. */
export function extractProperty(prop, kind) {
  if (!prop) return kind === "list" ? [] : "";
  switch (prop.type) {
    case "title":
      return plainText(prop.title);
    case "rich_text":
      return kind === "list"
        ? plainText(prop.rich_text).split("\n").map((s) => s.replace(/^[-•]\s*/, "").trim()).filter(Boolean)
        : plainText(prop.rich_text);
    case "unique_id":
      return prop.unique_id ? `${prop.unique_id.prefix ?? ""}${prop.unique_id.prefix ? "-" : ""}${prop.unique_id.number}` : "";
    case "relation":
      return (prop.relation ?? []).map((r) => r.id);
    case "multi_select":
      return (prop.multi_select ?? []).map((s) => s.name);
    case "select":
      return prop.select?.name ?? "";
    case "status":
      return prop.status?.name ?? "";
    case "number":
      return prop.number ?? null;
    case "url":
      return prop.url ?? "";
    case "checkbox":
      return prop.checkbox ?? false;
    case "files":
      return (prop.files ?? []).map((f) => f.file?.url ?? f.external?.url ?? "").filter(Boolean);
    default:
      return kind === "list" ? [] : "";
  }
}
