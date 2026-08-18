/* ============================================================================
 * mes-data.tsx - content for the MES (Manufacturing Execution System) page.
 * Sourced from the Unifize Products database in Notion: MES (UPD-5). Modules:
 * Work Order Management, eTravellers, FAI & Control Plan Execution,
 * Inspections/Forms & Checklists, Electronic Batch/Lot Records with QR Codes.
 * Personas: Production Supervisor, Shop Floor Operator, Quality Inspector.
 * Module and persona copy is distilled from their Notion Description / Daily
 * Activities; record IDs in the mocks are illustrative.
 * Structure mirrors dms-data.ts: this feeds the bespoke MES page (page.tsx),
 * built in the DMS redesign system.
 * ========================================================================== */
import type { DmsCoordinationProblem } from "../dms/dms-data";
import type { IntegrationData } from "../dms/dms-integrations";
import { buildProductFlows } from "../_shared/product-flows";
import { MES_DRAFT_FLOWS } from "./mes-arcade";

export const PRODUCT = {
  id: "UPD-5",
  name: "MES",
  full: "Manufacturing Execution System",
  domain: "Manufacturing Execution",
  /* one line. the rest of the page proves it. */
  description:
    "Work orders, electronic travellers, inspection, and batch records on one system, so every operation is signed, evidenced, and traceable by lot.",
};

/* One source for the Problem spotlight and Coordination Tax timeline. Each
 * card traces to a Pain Points DB row (PP id) and quotes its attached Symptom
 * row verbatim, same discipline as the DMS page. The `visual` keys reuse the
 * four generic spotlight slots; the MES graphics map them in
 * mes-problem-visuals. */
export const MES_PROBLEMS: DmsCoordinationProblem[] = [
  {
    /* PP-13 · High · eTravellers + Electronic Batch Records */
    visual: "retrieval",
    category: "Batch record assembly",
    title: "One batch, four records, no truth",
    quote: "We have data in five systems but no single view of what is actually happening.",
    detail: "Paper travellers on the floor, step completion in MES, consumption in ERP, inspection in QMS. Deviations between them surface at reconciliation, after the run.",
    metric: "4",
    metricLabel: "Parallel records of one batch",
    work: "Run the lot",
    tax: ["Reconcile paper against systems", "Rebuild the record after the run"],
    outcome: "One record, built at the operation",
  },
  {
    /* PP-14 · Medium · Inspections, Forms & Checklists + Work Orders */
    visual: "versions",
    category: "Inspection binding",
    title: "The wrong revision inspects the lot",
    quote: "We have the document but nobody can find it when it matters.",
    detail: "Forms live in a library, work orders in the planning system, and matching this order to the right checklist at the right revision is operator memory.",
    metric: "Memory",
    metricLabel: "What binds the check to the order",
    work: "Inspect the order",
    tax: ["Find the right checklist", "Confirm the revision"],
    outcome: "Checklist bound to the order",
  },
  {
    /* PP-55 · Critical · Electronic Batch Records */
    visual: "drift",
    category: "Lot traceability",
    title: "The recall runs on spreadsheets",
    quote: "Material traceability breaks down at the supplier handoff.",
    detail: "Which lots shipped where, what inputs, what parameters, what dispositions: assembled in spreadsheets and emailed exports while the regulator waits.",
    metric: "By hand",
    metricLabel: "Genealogy assembled under pressure",
    work: "Trace the lot",
    tax: ["Assemble spreadsheets and exports", "Chase the supplier handoff"],
    outcome: "Genealogy already linked",
  },
  {
    /* PP-12 · High · eTravellers + Electronic Batch Records */
    visual: "audit",
    category: "Shift handoff",
    title: "The rationale leaves with the shift",
    quote: "We cannot reconstruct what we knew and who decided what at the time.",
    detail: "A deviation accepted or a parameter adjusted on one shift arrives at the next as a consequence without a reason. The decision lived in the handoff conversation.",
    metric: "Lost",
    metricLabel: "Decision rationale between shifts",
    work: "Hand over the shift",
    tax: ["Rebuild the last shift's context", "Chase who decided what"],
    outcome: "Rationale on the record",
  },
];

/* ---- Product Flows: persona journeys for the MES modules -----------------
 * No flow in the Product Flows DB has steps for the MES modules yet; the
 * Notion wiring below activates the moment Ben's team adds one. Until then
 * the page carries the page-owned DRAFT journey from mes-arcade.tsx,
 * labeled as such, whose step rows are proposed for the DB. */
export const MES_FLOWS = [
  ...buildProductFlows({
    page: "mes",
    moduleIds: [
      "360860e6-b45e-81f9-ae92-cd8156553076" /* Work Order Management */,
      "360860e6-b45e-8140-b854-db4f40b603fa" /* eTravellers */,
      "360860e6-b45e-81cf-926b-da0e47ebac59" /* FAI & Control Plan Execution */,
      "360860e6-b45e-819c-9ee6-e561035a55ba" /* Inspections, Forms & Checklists */,
      "360860e6-b45e-8174-9963-ec1d6d753a56" /* Electronic Batch/Lot Records */,
    ],
    presentation: {},
  }),
  ...MES_DRAFT_FLOWS,
];

/* the five bundled modules - the core of the product. points feed the module
 * explorer; blurbs are distilled from each module's Notion Description. */
export const MODULES: {
  key: string; name: string; promise: string; blurb: string;
  points: string[]; standards: string[];
}[] = [
  {
    key: "work-order-management",
    name: "Work Order Management",
    promise: "The floor runs to plan.",
    blurb: "Open, schedule, execute, and close work orders on the shop floor, with their operations on the record.",
    points: [
      "Opened, scheduled, released to the floor",
      "Operations and quantity on the record",
      "Live status per operation and station",
      "Closed with its full history",
    ],
    standards: ["ISO 13485", "21 CFR 820", "IATF 16949"],
  },
  {
    key: "etravellers",
    name: "eTravellers",
    promise: "The record builds itself.",
    blurb: "Electronic travellers that replace paper batch and route sheets, capturing step completion, evidence, and signatures at each operation.",
    points: [
      "Replaces paper batch and route sheets",
      "Step completion captured at the operation",
      "Evidence bound to each step",
      "A signature on every operation",
    ],
    standards: ["21 CFR Part 11", "21 CFR Part 211", "EU GMP"],
  },
  {
    key: "fai-control-plan-execution",
    name: "FAI & Control Plan Execution",
    promise: "First article, proven.",
    blurb: "First Article Inspection and ongoing control-plan execution on the floor, with results capture, disposition, and escalation.",
    points: [
      "First Article Inspection on the floor",
      "Control-plan checks at frequency",
      "Results captured with disposition",
      "Escalation when a check fails",
    ],
    standards: ["IATF 16949", "ISO 13485", "21 CFR 820"],
  },
  {
    key: "inspections-forms-checklists",
    name: "Inspections, Forms & Checklists",
    promise: "Checks where the work is.",
    blurb: "Configurable inspection forms and checklists executed at defined points in the workflow.",
    points: [
      "Configurable forms and checklists",
      "Fire at defined workflow points",
      "Results land on the record",
      "A failure holds the line",
    ],
    standards: ["ISO 13485", "21 CFR 820", "EU GMP"],
  },
  {
    key: "electronic-batch-lot-records",
    name: "Electronic Batch/Lot Records",
    promise: "Traceable by lot.",
    blurb: "Electronic batch and lot records with QR-code generation for traceability through manufacturing and distribution.",
    points: [
      "Built as the work is done",
      "QR codes per batch and lot",
      "Reconciled, then sealed",
      "Traceability through distribution",
    ],
    standards: ["21 CFR Part 211", "EU GMP", "21 CFR Part 11"],
  },
];

/* glyph keys per module for the explorer's point list (see POINT_GLYPHS in
 * dms-interactive.tsx). */
export const MODULE_POINT_ICONS: Record<string, string[]> = {
  "work-order-management": ["route", "matrix", "report", "assessment"],
  "etravellers": ["template", "assessment", "evidence", "review"],
  "fai-control-plan-execution": ["assessment", "matrix", "evidence", "assign"],
  "inspections-forms-checklists": ["matrix", "route", "report", "assign"],
  "electronic-batch-lot-records": ["template", "matrix", "review", "distribute"],
};

/* the lot lifecycle - the spine. gates are 3 to 5 words. details feed the
 * lifecycle explorer; each step stages its own product prototype. */
export const LIFECYCLE: { state: string; gate: string; detail: string }[] = [
  {
    state: "Released", gate: "Work order scheduled",
    detail: "The work order is opened, scheduled, and released to the floor with its operations and quantity on the record.",
  },
  {
    state: "In process", gate: "Traveller signed per step",
    detail: "The electronic traveller captures step completion, evidence, and a signature at each operation, so the record builds as the work is done.",
  },
  {
    state: "In-process inspection", gate: "Checks at defined points",
    detail: "Configurable inspection forms and checklists fire at defined points in the workflow, and a failure raises a hold on the line in real time.",
  },
  {
    state: "FAI & control plan", gate: "First article, disposition",
    detail: "First Article Inspection and ongoing control-plan checks run on the floor, with results captured, disposition recorded, and escalation where needed.",
  },
  {
    state: "Sealed & released", gate: "eBR sealed, lot traceable",
    detail: "The electronic batch record is reconciled and sealed, and QR codes carry the lot's traceability downstream through distribution.",
  },
];

/* integrations - the connector section after the lifecycle.
 * NOTE: representative of the stack Unifize coexists with (grounded in the
 * industry coexistence copy), not a certified connector list. Verify against
 * the real connector catalogue before shipping. */
export const INTEGRATIONS: IntegrationData = {
  heading: "The floor runs the order the ERP released, and answers back.",
  lede: "The shop floor is where the plan meets the machine. Unifize sits over the ERP and equipment you already run, so the batch record captures the work order the ERP released and what the line actually did with it.",
  record: "the batch record",
  hubSystems: ["SAP", "Oracle", "NetSuite", "PLC / SCADA", "Historian", "OPC UA", "QMS", "LIMS"],
};

/* the one product-specific line of the minimal integrations beat */
export const INTEGRATIONS_MINIMAL_LEDE =
  "Connect the shop floor to the systems already holding your orders, lots, and specs.";

/* capabilities - six, one short line each. glyph keys map to the line-work
 * pictograms in dms-linework.tsx. */
export const CAPABILITIES: { title: string; body: string; glyph: string }[] = [
  { title: "Step-level signatures", body: "Every operation carries the operator, the evidence, and the signature that completed it.", glyph: "signature" },
  { title: "Lot traceability", body: "QR-coded batch and lot records follow the product through manufacturing and distribution.", glyph: "trace" },
  { title: "Control-plan execution", body: "First article and ongoing control-plan checks run on the floor, with disposition and escalation.", glyph: "review" },
  { title: "Configurable inspections", body: "Inspection forms and checklists fire at defined points in the workflow, not off to the side.", glyph: "watermark" },
  { title: "Work order to close", body: "Work orders are scheduled, executed, and closed with their operations on the record.", glyph: "versions" },
  { title: "Deviations at the point of use", body: "An operator raises a deviation or quality issue from the operation, and it holds the work.", glyph: "access" },
];

/* who it is for - section 05. The two floor operators and the inspector who
 * releases their work share one visual tier. Each card shows lifecycle
 * ownership and three daily responsibilities.
 * NOTE: `img` values are PLACEHOLDERS: the two existing DMS persona portraits,
 * reused so the photo layout is visible now. Swap each for an art-directed
 * portrait of the actual role (see persona-image-art-direction: low-key film
 * look, fg+bg ghost motion blur, 3:2, sourced >=1800x1200). */
export const AUDIENCE: {
  lede: string;
  personas: { role: string; owns: string; daily: string[]; img: string; href?: string }[];
} = {
  lede: "From the released order to the sealed record, every role signs the same lot.",
  personas: [
    {
      role: "Production Supervisor",
      owns: "Released → Closed",
      // source: Personas DB, Daily Activities
      daily: ["Hold start-of-shift, assign work", "Sign batch and lot records", "Coordinate holds, downtime, and deviations"],
      img: "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png",
    },
    {
      role: "Shop Floor Operator",
      owns: "In process → Signed",
      daily: ["Execute steps, record results electronically", "Flag deviations, respond to quality holds", "Record downtime at the equipment"],
      img: "/Gemini_Generated_Image_r84h7yr84h7yr84h.png",
    },
    {
      role: "Quality Inspector",
      owns: "Inspection → Release",
      daily: ["Perform inspections to plan, sample against AQL", "Raise non-conformances, segregate failing material", "Release passing material, hold the rest"],
      img: "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png",
    },
  ],
};

/* the standards frame. short bodies. (Notion External Standards relation) */
export const STANDARDS: { name: string; geo: string; body: string; issuer: string }[] = [
  { name: "21 CFR Part 11", geo: "FDA · US", body: "Trustworthy electronic records and signatures.", issuer: "FDA" },
  { name: "21 CFR Part 211", geo: "FDA · US", body: "cGMP for finished pharmaceuticals.", issuer: "FDA" },
  { name: "21 CFR 820", geo: "FDA · US", body: "Quality System Regulation for device cGMP.", issuer: "FDA" },
  { name: "ISO 13485", geo: "ISO · Global", body: "QMS for medical devices.", issuer: "ISO" },
  { name: "IATF 16949", geo: "IATF · Global", body: "QMS for automotive production.", issuer: "IATF" },
  { name: "EU GMP", geo: "EC · EU", body: "GMP for medicinal products (EudraLex Vol. 4).", issuer: "EU" },
];

/* Notion Industries relation. Verified names only; more relations remain to
 * resolve once the Notion API is reachable again. The trust strip shows a
 * broader REPRESENTATIVE set; this list is the honest "validated across". */
export const INDUSTRIES: string[] = ["Medical Devices", "Pharmaceuticals"];

/* customer proof stories - sample stories in the industry-template-modern
 * fiction (fictional brands, stock portraits); replace with real, verified
 * MES customer films before shipping (mirror dms-data PROOF_FILMS). */
export const PROOF_STORIES: { quote: string; name: string; title: string; img: string }[] = [
  {
    quote: "The batch record is built as the line runs, not rebuilt at review. Our release cycle dropped by days.",
    name: "Grace Adeyemi",
    title: "Plant Quality Manager · Steriva Labs",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
  },
  {
    quote: "A failed check now holds the line the moment it happens. We stopped finding problems at final inspection.",
    name: "Viktor Novak",
    title: "Production Manager · Lindqvist Pharma",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
  },
  {
    quote: "When a recall question came, we traced the lot by QR in minutes instead of chasing paper travellers.",
    name: "Mei Tan",
    title: "Operations Director · Corevance Manufacturing",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
  },
];

/* FAQ - answers grounded in the canonical product copy above. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What exactly is bundled in MES?",
    a: "Five modules on one system: Work Order Management, eTravellers, FAI & Control Plan Execution, Inspections/Forms & Checklists, and Electronic Batch/Lot Records with QR Codes.",
  },
  {
    q: "Do travellers replace paper batch sheets?",
    a: "Yes. eTravellers capture step completion, evidence, and a signature at each operation, so the batch record is built as the work happens instead of transcribed afterward.",
  },
  {
    q: "How does lot traceability work?",
    a: "Electronic batch and lot records generate QR codes that follow the product through manufacturing and distribution, so a lot can be traced downstream without guesswork.",
  },
  {
    q: "Can operators raise issues from the floor?",
    a: "Yes. An operator can raise a deviation or quality issue directly from the operation, and it holds the work until it is resolved.",
  },
  {
    q: "How is MES licensed?",
    a: "MES starts at $1,950 per organization per month standalone, and is included in the Ultimate plan.",
  },
  {
    q: "Which standards does it map to?",
    a: "21 CFR Part 11, 21 CFR Part 211, 21 CFR 820, ISO 13485, IATF 16949, and EU GMP. One governed shop floor, whatever you are audited against.",
  },
];
