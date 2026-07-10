/* ============================================================================
 * mes-data.tsx - content for the MES (Manufacturing Execution System) page.
 * Sourced from the Unifize Products database in Notion: MES (ID 5). Modules:
 * Work Order Management, eTravellers, FAI & Control Plan Execution,
 * Inspections/Forms & Checklists, Electronic Batch/Lot Records with QR Codes.
 * Personas: Production Supervisor, Shop Floor Operator, Quality Inspector.
 * Module and persona copy is distilled from their Notion Description / Daily
 * Activities; record IDs in the mocks are illustrative.
 * ========================================================================== */
import type { ProductPageData } from "../_shared/ProductPage";
import { MES_MODULE_MOCKS, MesWorkOrder, MesTraveller, MesBatchRecord } from "./mes-mocks";

const HERO_STANDARDS = ["21 CFR Part 11", "21 CFR Part 211", "21 CFR 820", "ISO 13485", "IATF 16949", "EU GMP"];

const MODULES = [
  {
    key: "work-order-management",
    name: "Work Order Management",
    blurb: "Open, schedule, execute, and close work orders on the shop floor, with their operations on the record.",
  },
  {
    key: "etravellers",
    name: "eTravellers",
    blurb: "Electronic travellers that replace paper batch and route sheets, capturing step completion, evidence, and signatures at each operation.",
  },
  {
    key: "fai-control-plan-execution",
    name: "FAI & Control Plan Execution",
    blurb: "First Article Inspection and ongoing control-plan execution on the floor, with results capture, disposition, and escalation.",
  },
  {
    key: "inspections-forms-checklists",
    name: "Inspections, Forms & Checklists",
    blurb: "Configurable inspection forms and checklists executed at defined points in the workflow.",
  },
  {
    key: "electronic-batch-lot-records",
    name: "Electronic Batch/Lot Records",
    blurb: "Electronic batch and lot records with QR-code generation for traceability through manufacturing and distribution.",
  },
];

/* the MES external standards (Notion External Standards relation) */
const STANDARDS: ProductPageData["compliance"]["standards"] = [
  { name: "21 CFR Part 11", geo: "FDA · US", body: "Trustworthy electronic records and signatures." },
  { name: "21 CFR Part 211", geo: "FDA · US", body: "cGMP for finished pharmaceuticals." },
  { name: "21 CFR 820", geo: "FDA · US", body: "Quality System Regulation for device cGMP." },
  { name: "ISO 13485", geo: "ISO · Global", body: "QMS for medical devices." },
  { name: "IATF 16949", geo: "IATF · Global", body: "QMS for automotive production." },
  { name: "EU GMP", geo: "EC · EU", body: "GMP for medicinal products (EudraLex Vol. 4)." },
];
/* Notion Industries relation. Verified names below; a few more relations
 * remain to resolve once the Notion API is reachable again. */
const INDUSTRIES: string[] = ["Medical Devices", "Pharmaceuticals"];

export const MES_DATA: ProductPageData = {
  slug: "mes",
  crumbLabel: "Manufacturing Execution System",
  metaTitle: "Manufacturing Execution System · Unifize",
  metaDescription:
    "MES runs work orders, electronic travellers, inspection, and batch records on one system, so every operation is signed, evidenced, and traceable by lot.",

  hero: {
    headline: (
      <>
        What happened on the floor should be a record, not a <span className="dms-hero__turn">memory.</span>
      </>
    ),
    lede: "Work orders, electronic travellers, inspection, and batch records on one system, so every operation is signed, evidenced, and traceable by lot.",
    ctaPrimary: "Book a demo",
    ctaSecondary: { label: "See what is bundled", href: "#modules" },
    standards: HERO_STANDARDS,
    mock: <MesWorkOrder />,
  },

  coordinationTax: {
    leaks: [
      { surface: "Paper", name: "The traveller", note: "Step completion and signatures live on a paper traveller, off any system." },
      { surface: "Sheet", name: "The shift log", note: "What happened on the line is captured in a logbook, then keyed in later." },
      { surface: "Re-key", name: "The batch record", note: "The record is reconstructed after the run instead of built as the work is done." },
      { surface: "Radio", name: "The hold call", note: "A failed check is relayed by phone or in person, not raised on the line in real time." },
      { surface: "Audit", name: "The lot trace", note: "Tracing a lot means chasing paper travellers across the floor." },
    ],
    summary: (
      <>
        <b>The line answers itself.</b> The work instruction, the deviation, and the sign-off happen at the point
        of use, so the floor never waits on the office.
      </>
    ),
  },

  positioning: {
    eyebrowN: 1,
    heading: "Paper travellers can't prove what happened on the line.",
    lede: "When step completion, evidence, and signatures live on paper, the batch record is reconstructed after the fact. MES captures them at each operation, so the record is built as the work is done.",
    features: [
      { title: "The record builds itself", body: "Step completion, evidence, and signatures captured at each operation, not reconstructed at the end of the run.", glyph: "shield" },
      { title: "Traceable by lot", body: "Electronic batch and lot records carry QR codes that follow the product through manufacturing and distribution.", glyph: "search" },
      { title: "Quality holds in real time", body: "An inspection failure raises a hold on the line the moment it happens, not at final inspection.", glyph: "sync" },
    ],
  },

  modules: {
    mode: "scroll",
    tone: "dark",
    eyebrowN: 2,
    heading: "Five disciplines, one shop floor.",
    items: MODULES,
    mocks: MES_MODULE_MOCKS,
    urlBase: "mes",
  },

  capabilities: {
    eyebrowN: 3,
    tone: "dark",
    heading: "The controls a shop floor runs on.",
    items: [
      { title: "Step-level signatures", body: "Every operation carries the operator, the evidence, and the signature that completed it.", glyph: "signature" },
      { title: "Lot traceability", body: "QR-coded batch and lot records follow the product through manufacturing and distribution.", glyph: "trace" },
      { title: "Control-plan execution", body: "First article and ongoing control-plan checks run on the floor, with disposition and escalation.", glyph: "review" },
      { title: "Configurable inspections", body: "Inspection forms and checklists fire at defined points in the workflow, not off to the side.", glyph: "watermark" },
      { title: "Work order to close", body: "Work orders are scheduled, executed, and closed with their operations on the record.", glyph: "versions" },
      { title: "Deviations at the point of use", body: "An operator raises a deviation or quality issue from the operation, and it holds the work.", glyph: "access" },
    ],
  },

  flow: {
    eyebrowN: 4,
    tone: "dark",
    heading: "From a released work order to a sealed batch record.",
    trailLabel: "How a lot moves",
    steps: [
      { state: "Released", gate: "Work order scheduled", detail: "The work order is opened, scheduled, and released to the floor with its operations and quantity on the record." },
      { state: "In process", gate: "Traveller signed per step", detail: "The electronic traveller captures step completion, evidence, and a signature at each operation, so the record builds as the work is done." },
      { state: "In-process inspection", gate: "Checks at defined points", detail: "Configurable inspection forms and checklists fire at defined points in the workflow, and a failure raises a hold on the line in real time." },
      { state: "FAI & control plan", gate: "First article, disposition", detail: "First Article Inspection and ongoing control-plan checks run on the floor, with results captured, disposition recorded, and escalation where needed." },
      { state: "Sealed & released", gate: "eBR sealed, lot traceable", detail: "The electronic batch record is reconciled and sealed, and QR codes carry the lot's traceability downstream through distribution." },
    ],
    stageMocks: [<MesWorkOrder key="0" />, <MesTraveller key="1" />, <MesTraveller key="2" />, <MesTraveller key="3" />, <MesBatchRecord key="4" />],
    mobileNote: { label: "Batch record", id: "released → executed → inspected → FAI → sealed" },
  },

  // NOTE: hubSystems below are REPRESENTATIVE of the stack Unifize coexists with
  // (grounded in the industry coexistence copy), not a certified connector list.
  // Verify against the real connector catalogue before shipping.
  integrations: {
    heading: "The floor runs the order the ERP released, and answers back.",
    lede: "The shop floor is where the plan meets the machine. Unifize sits over the ERP and equipment you already run, so the batch record captures the work order the ERP released and what the line actually did with it.",
    record: "the batch record",
    hubSystems: ["SAP", "Oracle", "NetSuite", "PLC / SCADA", "Historian", "OPC UA", "QMS", "LIMS"],
  },

  owners: {
    eyebrowN: 5,
    heading: "Built for the people who run the shift.",
    items: [
      {
        name: "Production Supervisor",
        tier: "Primary owner",
        aka: "Shift Supervisor · Line Lead · Operations Supervisor",
        summary: "Owns that today's shift makes good product for one line or area. Assigns work, signs batch and lot records, handles deviations in real time, and escalates equipment issues.",
        daily: ["Hold start-of-shift, assign work", "Sign batch and lot records", "Investigate deviations, coordinate holds and downtime"],
      },
      {
        name: "Shop Floor Operator",
        tier: "Primary owner",
        aka: "Operator · Machine Operator · Process Technician",
        summary: "The person doing the work. Pulls work orders, executes operations, logs results, raises deviations and quality issues, and completes electronic batch and lot records.",
        daily: ["Execute production steps, record results electronically", "Flag deviations, respond to quality holds", "Record downtime at the equipment"],
      },
      {
        name: "Quality Inspector",
        tier: "Primary owner",
        aka: "QC / QA Inspector · Incoming · IPQA · Final Inspector",
        summary: "Owns whether a batch, lot, or shipment meets specification. Runs incoming, in-process, and final inspections against the plan, and releases or holds product on the line.",
        daily: ["Perform inspections to plan, sample against AQL", "Raise non-conformances, segregate failing material", "Release passing material, hold the rest"],
      },
    ],
  },

  // NOTE: sample stories in the industry-template-modern fiction (fictional
  // brands, stock portraits); replace with real, verified stories before
  // shipping. Landscape portraits, faces-cropped, mirror the DMS proof band.
  proof: {
    eyebrowN: 6,
    kicker: "What operations teams say",
    testimonials: [
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
    ],
  },

  pains: {
    eyebrowN: 7,
    heading: "The four failure modes that become audit findings.",
    items: [
      { title: "A batch record rebuilt after the fact", body: "Paper travellers get transcribed at the end, so gaps surface at review, not at the operation.", severity: "Critical" },
      { title: "No lot traceability downstream", body: "Without a lot record that follows the product, a recall becomes guesswork.", severity: "High" },
      { title: "Quality holds that arrive at final", body: "An inspection failure isn't caught until the end of the line, after the value is added.", severity: "Medium" },
      { title: "Deviations raised on paper", body: "An operator's deviation never reaches the record, so the signal is lost.", severity: "Medium" },
    ],
  },

  compliance: {
    eyebrowN: 8,
    heading: "One governed shop floor, whatever you are audited against.",
    standards: STANDARDS,
    industries: INDUSTRIES,
  },

  faq: {
    eyebrowN: 9,
    heading: "The questions operations and quality ask first.",
    lede: (
      <>
        Anything else, <a href="#mes-close-h">bring it to the walkthrough</a>.
      </>
    ),
    items: [
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
    ],
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Bring the batch record you rebuild by hand.",
    lede: "We will run a lot from a released work order to a sealed, traceable record, signed at every step.",
    ctaPrimary: "Book a 30-minute walkthrough",
    ctaSecondary: { label: "See what is bundled", href: "#modules" },
  },

  footer: {
    tagline: "One governed record for every lot on the floor.",
    baseRight: "Manufacturing Execution System · UPD-5",
    nav: [
      {
        label: "Manufacturing Execution System",
        links: [
          { label: "What is bundled", href: "#modules" },
          { label: "The lifecycle", href: "#lifecycle" },
          { label: "Capabilities", href: "#capabilities" },
          { label: "Integrations", href: "#integrations" },
        ],
      },
      {
        label: "More",
        links: [
          { label: "Who owns it", href: "#who" },
          { label: "Compliance", href: "#compliance" },
          { label: "FAQ", href: "#faq" },
          { label: "All products", href: "/platform" },
        ],
      },
    ],
  },
};
