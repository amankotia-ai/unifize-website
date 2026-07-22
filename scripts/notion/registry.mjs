/* ============================================================================
 * registry.mjs - the single map of what syncs from Notion and where it lands.
 * Adding a page or a source DB to the pipeline means adding an entry here.
 * ========================================================================== */

/* ---- Page copy ------------------------------------------------------------
 * The Content Blocks database on the Website 3.0 page is the single source
 * of truth for page prose (Ben's decision, Jul 20). One row per page section
 * (Section ID like DMS-S01) carries the approval workflow; the rendered
 * strings themselves live as rows of the Copy Fields database, one row per
 * string (Key like dms/hero.line1, Text, Block relation), surfaced on each
 * block page as a filtered table. Only fields whose parent block has Copy
 * Status Approved or Live sync; everything else is reported as HELD, so a
 * draft in a block never reaches the site. */
export const COPY_TARGETS = {
  dms: "src/app/explorations/products/dms/dms-copy.json",
  // qms: "src/app/explorations/products/qms/qms-copy.json",
  // plm: "src/app/explorations/products/plm/plm-copy.json",
  // mes: "src/app/explorations/products/mes/mes-copy.json",
  // home: "src/app/explorations/home/home-copy.json",
};

export const CONTENT_BLOCKS = {
  /* the approval unit: Section ID + Copy Status live here */
  database_id: "0abf824396d14805848539473eb336b4",
  /* the strings: one row per key, related to its block */
  fields_database_id: "ffd514b26fc64dea9edb85602f216aaa",
  approved_statuses: ["Approved", "Live"],
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
      modules: { property: "Modules Bundled" },
      industries: { property: "Industries" },
      standards: { property: "External Standards" },
    },
  },
  standards: {
    database_id: "d9cd526a868e48b0a939c5e4d3934345",
    mirror: "src/content/notion/standards.json",
    properties: {
      id: { property: "ID" },
      name: { property: "Standard" },
      issuer: { property: "Governing Body" },
      geography: { property: "Geography", kind: "list" },
    },
  },
  industries: {
    database_id: "390b252c39bd44169c1ea907c4279732",
    mirror: "src/content/notion/industries.json",
    properties: {
      id: { property: "ID" },
      name: { property: "Name" },
      websiteStatus: { property: "Website Status" },
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
