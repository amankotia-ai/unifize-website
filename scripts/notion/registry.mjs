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

/* Which canonical Products row drives each page's Relation rows (industry
 * chips, persona cards, standards cards). writeback-copy.mjs computes what
 * those rows currently render, from the mirrors, and writes it into the
 * Renders column so the canonical data is visible where it is used. */
export const WRITEBACK_PRODUCTS = {
  dms: "UPD-2",
  // qms: "UPD-1", plm: "UPD-3", mes: "UPD-4" when those pages onboard
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
  /* Product Flows + Steps are authored by Ben's controlled loop: mirror them
   * read-only, never write back. The DMS lifecycle section renders the flows
   * whose Module(s) intersect the page's modules and whose steps exist. */
  flows: {
    database_id: "5dce25e06e874ecfae06814f4d733c27",
    mirror: "src/content/notion/flows.json",
    properties: {
      id: { property: "ID" },
      name: { property: "Name" },
      description: { property: "Description" },
      status: { property: "Status" },
      goalZero: { property: "Goal Zero Status" },
      modules: { property: "Module(s)" },
      persona: { property: "Primary Persona" },
      steps: { property: "🚶‍♀️ Product Flow Steps" },
      outcomes: { property: "Platform Outcomes" },
    },
  },
  /* the outcomes a flow moves: closes each flow's value story on the page */
  outcomes: {
    database_id: "a6fe6cb75a1e4b98aadad78b5cab71b7",
    mirror: "src/content/notion/outcomes.json",
    properties: {
      id: { property: "ID" },
      name: { property: "Name" },
      type: { property: "Type" },
    },
  },
  flowSteps: {
    database_id: "4847c63872db4831b66ef8b976d4f4e6",
    mirror: "src/content/notion/flow-steps.json",
    properties: {
      id: { property: "ID" },
      name: { property: "Name" },
      index: { property: "Step Index" },
      what: { property: "What Happens" },
      decision: { property: "User Decision" },
      role: { property: "Role-in-the-moment" },
      primitives: { property: "CT Primitives at Risk" },
      journey: { property: "Parent Journey" },
    },
  },
};
