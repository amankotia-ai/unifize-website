/* ============================================================================
 * registry.mjs - the single map of what syncs from Notion and where it lands.
 * Adding a page or a source DB to the pipeline means adding an entry here.
 * ========================================================================== */

/* ---- Page copy ------------------------------------------------------------
 * ONE Notion database ("Website Copy", CPY-##) holds editorial strings for
 * every page. Keys are namespaced "prefix/key" in Notion; the prefix picks
 * the target file below and is stripped when writing it. Each page's Site
 * Pages row embeds a linked view of the DB filtered to its prefix, so
 * reviewers still see per-page copy in one place without DB sprawl. */
export const COPY_TARGETS = {
  dms: "src/app/explorations/products/dms/dms-copy.json",
  // qms: "src/app/explorations/products/qms/qms-copy.json",
  // plm: "src/app/explorations/products/plm/plm-copy.json",
  // mes: "src/app/explorations/products/mes/mes-copy.json",
  // home: "src/app/explorations/home/home-copy.json",
};

/* ---- Structured sources ---------------------------------------------------
 * Ben's real databases, mirrored one JSON file per DB under
 * src/content/notion/. Pages join these mirrors (e.g. the DMS audience
 * section renders the personas related to UPD-2), so adding or removing a
 * relation in Notion adds or removes it on every page that derives from it.
 *
 * database_id and property names are best-effort until verified: run
 *   NOTION_TOKEN=... node scripts/notion/introspect-db.mjs <database_id>
 * and correct the entries below. A property listed here but missing in the
 * DB extracts as empty and is warned about, it never throws.
 * kind "list" coerces multi_select or newline rich_text into string arrays.
 * ========================================================================== */
export const SOURCES = {
  products: {
    database_id: "c52ba86c-86a4-4687-a4aa-12d05887af76",
    mirror: "src/content/notion/products.json",
    properties: {
      id: { property: "ID" },
      name: { property: "Name" },
      description: { property: "Description" },
      personas: { property: "Target Personas" },
      modules: { property: "Modules" },
    },
  },
  personas: {
    database_id: "640d9b55-a7f0-482a-b577-901cf7913bcc",
    mirror: "src/content/notion/personas.json",
    properties: {
      id: { property: "ID" },
      name: { property: "Name" },
      description: { property: "Description" },
      daily: { property: "Daily Activities", kind: "list" },
    },
  },
};
