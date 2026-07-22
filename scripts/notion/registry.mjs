/* ============================================================================
 * registry.mjs - the single map of what syncs from Notion and where it lands.
 * Adding a page or a source DB to the pipeline means adding an entry here.
 * ========================================================================== */

/* ---- Page copy ------------------------------------------------------------
 * The Content Blocks database on the Website 3.0 page is the single source
 * of truth for page prose (Ben's decision, Jul 20). One row per page section
 * (Section ID like DMS-S01); each row's body carries a "## Copy" heading
 * followed by "**Label:** value" lines. CONTENT_BLOCKS.sections maps a
 * Section ID and field label to the namespaced copy key the page renders.
 * Only rows whose Copy Status is Approved or Live sync; everything else is
 * reported as HELD, so drafts in a block never reach the site. */
export const COPY_TARGETS = {
  dms: "src/app/explorations/products/dms/dms-copy.json",
  // qms: "src/app/explorations/products/qms/qms-copy.json",
  // plm: "src/app/explorations/products/plm/plm-copy.json",
  // mes: "src/app/explorations/products/mes/mes-copy.json",
  // home: "src/app/explorations/home/home-copy.json",
};

export const CONTENT_BLOCKS = {
  database_id: "0abf824396d14805848539473eb336b4",
  approved_statuses: ["Approved", "Live"],
  sections: {
    "DMS-S01": { "Headline line 1": "dms/hero.line1", "Headline line 2": "dms/hero.line2" },
    "DMS-S02": { Label: "dms/trust.label" },
    "DMS-S03": { Subhead: "dms/problem.heading", Lede: "dms/problem.lede" },
    "DMS-S06": { Heading: "dms/capabilities.heading" },
    "DMS-S09": { Heading: "dms/audience.heading" },
    "DMS-S11": { Heading: "dms/compliance.heading", Subhead: "dms/compliance.lede" },
    "DMS-S12": { Heading: "dms/faq.heading" },
    "DMS-S13": { Subhead: "dms/close.heading", Body: "dms/close.lede" },
    "DMS-S14": { Tagline: "dms/footer.tagline" },
  },
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
