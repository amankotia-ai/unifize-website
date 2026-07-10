/* ============================================================================
 * plm-data.tsx - content for the PLM (Product Lifecycle Management) page.
 * Sourced from the Unifize Products database in Notion: PLM (ID 4). Modules:
 * Product Specifications, Product Risk Management, Design Controls &
 * Traceability, Inspection & Process Parameters, FMEA & Control Plan
 * Definition. Personas: Design Engineer, Engineering Manager. Module and
 * persona copy is distilled from their Notion Description / Daily Activities;
 * record IDs in the mocks are illustrative.
 * ========================================================================== */
import type { ProductPageData } from "../_shared/ProductPage";
import { PLM_MODULE_MOCKS, PlmSpecRecord, PlmTraceMatrix, PlmFmea } from "./plm-mocks";

const HERO_STANDARDS = ["ISO 13485", "21 CFR 820", "ISO 14971", "IATF 16949", "AS 9100", "IEC 62304"];

const MODULES = [
  {
    key: "product-specifications",
    name: "Product Specifications",
    blurb: "Specification records for raw materials, finished goods, assemblies, and parts, carried with version history and an approval workflow.",
  },
  {
    key: "product-risk-management",
    name: "Product Risk Management",
    blurb: "A risk register and assessment for the product itself: hazards, controls, and verification tracked through the product lifecycle.",
  },
  {
    key: "design-controls-traceability",
    name: "Design Controls & Traceability",
    blurb: "Design input, output, verification, and validation records with full traceability from requirement to test result, per 21 CFR 820.",
  },
  {
    key: "inspection-process-parameters",
    name: "Inspection & Process Parameters",
    blurb: "Inspection plans, process parameters, sampling rules, and characteristic specifications tied to the product definition.",
  },
  {
    key: "fmea-control-plan",
    name: "FMEA & Control Plan Definition",
    blurb: "Design FMEA and process FMEA, plus control-plan definition at the product or process level.",
  },
];

/* the PLM external standards (Notion External Standards relation) */
const STANDARDS: ProductPageData["compliance"]["standards"] = [
  { name: "ISO 13485", geo: "ISO · Global", body: "QMS for medical devices." },
  { name: "ISO 14971", geo: "ISO · Global", body: "Risk management through the medical-device lifecycle." },
  { name: "21 CFR 820", geo: "FDA · US", body: "Quality System Regulation, including design controls." },
  { name: "IATF 16949", geo: "IATF · Global", body: "QMS for automotive production." },
  { name: "AS 9100", geo: "IAQG · Global", body: "QMS for aviation, space, and defense." },
  { name: "IEC 62304", geo: "IEC · Global", body: "Lifecycle processes for medical-device software." },
];
/* Notion Industries relation. Verified names below; a few more relations
 * remain to resolve once the Notion API is reachable again. */
const INDUSTRIES: string[] = ["Medical Devices", "Pharmaceuticals", "Automotive", "Aerospace"];

export const PLM_DATA: ProductPageData = {
  slug: "plm",
  crumbLabel: "Product Lifecycle Management",
  metaTitle: "Product Lifecycle Management · Unifize",
  metaDescription:
    "PLM manages product specifications, design controls, risk, and FMEA on one record, so every requirement ends in a verification you can point to.",

  hero: {
    headline: (
      <>
        The trace from requirement to result shouldn&rsquo;t have <span className="dms-hero__turn">gaps.</span>
      </>
    ),
    lede: "Product specifications, design controls, risk, and FMEA on one record, so every requirement ends in a verification you can point to.",
    ctaPrimary: "Book a demo",
    ctaSecondary: { label: "See what is bundled", href: "#modules" },
    standards: HERO_STANDARDS,
    mock: <PlmTraceMatrix />,
  },

  coordinationTax: {
    leaks: [
      { surface: "Inbox", name: "The ECO in limbo", note: "An engineering change waits on approvals scattered across email threads." },
      { surface: "Sheet", name: "The requirements matrix", note: "Inputs, outputs, and verification live in a spreadsheet that drifts from what shipped." },
      { surface: "Re-key", name: "The spec copy", note: "A specification is duplicated into an FMEA and a control plan, each free to fall behind." },
      { surface: "Meeting", name: "The design review", note: "A change waits for the next review to learn what it might break." },
      { surface: "Audit", name: "The DHF assembly", note: "The design history file is reconstructed at release from a dozen sources." },
    ],
    summary: (
      <>
        <b>The change resolves in one place.</b> Its impact, its reviewers, and its approvals live on a single
        record, so an engineering change stops living in email threads.
      </>
    ),
  },

  positioning: {
    eyebrowN: 1,
    heading: "A design isn't controlled until the trace is unbroken.",
    lede: "Requirements drift from what shipped when inputs, outputs, verification, and validation live in different tools. PLM holds them on one record, so a change to a requirement shows every test it touches.",
    features: [
      { title: "One product record", body: "Specifications, risk, design controls, and control plans on one versioned, approved record.", glyph: "shield" },
      { title: "A trace with no gaps", body: "Every design input links forward to an output, a verification, and a validation, from requirement to result.", glyph: "search" },
      { title: "Change shows its blast radius", body: "An engineering change surfaces every specification, FMEA, and control plan it touches before it is approved.", glyph: "sync" },
    ],
  },

  modules: {
    mode: "scroll",
    tone: "dark",
    eyebrowN: 2,
    heading: "Five disciplines, one product record.",
    items: MODULES,
    mocks: PLM_MODULE_MOCKS,
    urlBase: "plm",
  },

  capabilities: {
    eyebrowN: 3,
    tone: "dark",
    heading: "The controls a product record runs on.",
    items: [
      { title: "Versioned specifications", body: "Every specification revision is retained with its approval, so the effective definition is never in doubt.", glyph: "versions" },
      { title: "Requirement-to-result trace", body: "Design inputs link forward to outputs, verification, and validation, with no gap in the chain.", glyph: "trace" },
      { title: "Risk through the lifecycle", body: "Hazards, controls, and verification are tracked on the product record, not in a one-time document.", glyph: "review" },
      { title: "FMEA drives the control plan", body: "RPN from design and process FMEA feeds the control plan and escalates the highest-risk modes to review.", glyph: "watermark" },
      { title: "Characteristic-level specs", body: "Sampling rules and characteristic specifications tie inspection back to the product definition.", glyph: "access" },
      { title: "Change orders on the record", body: "Engineering change orders carry the specifications, FMEAs, and control plans they affect.", glyph: "signature" },
    ],
  },

  flow: {
    eyebrowN: 4,
    tone: "dark",
    heading: "From design input to a released, traceable product.",
    trailLabel: "How a design is released",
    steps: [
      { state: "Draft specification", gate: "From a controlled template", detail: "The product specification is authored with version history and routed for approval, so the effective definition is controlled from the first draft." },
      { state: "Design inputs & outputs", gate: "Outputs linked to inputs", detail: "Design inputs are captured as requirements, and each output is linked back to the input it satisfies, so the chain is traceable end to end." },
      { state: "Risk & FMEA", gate: "Hazards, RPN, controls", detail: "Product risk and design/process FMEA are worked on the record. RPN feeds the control plan, and the highest-risk modes escalate to design review." },
      { state: "Verification & validation", gate: "Every requirement tested", detail: "Verification and validation results are linked to the requirements they close, so a requirement with no linked result cannot slip through." },
      { state: "Released", gate: "Traced, approved, effective", detail: "The product is released with an unbroken trace from requirement to result, its specifications versioned and its control plan defined." },
    ],
    stageMocks: [<PlmSpecRecord key="0" />, <PlmTraceMatrix key="1" />, <PlmFmea key="2" />, <PlmTraceMatrix key="3" />, <PlmSpecRecord key="4" />],
    mobileNote: { label: "Design controls trace", id: "requirement → output → verification → validation → release" },
  },

  // NOTE: hubSystems below are REPRESENTATIVE of the stack Unifize coexists with
  // (grounded in the industry coexistence copy), not a certified connector list.
  // Verify against the real connector catalogue before shipping.
  integrations: {
    heading: "The released design and the systems downstream never diverge.",
    lede: "A product record is only useful if the ERP, CAD, and floor agree with it. Unifize sits over the tools that already hold your parts and drawings, so a change to a requirement reaches every system it touches without a re-keyed BOM.",
    record: "the product record",
    hubSystems: ["SAP", "Oracle", "NetSuite", "SolidWorks", "Onshape", "Autodesk", "Arena", "MES"],
  },

  owners: {
    eyebrowN: 5,
    heading: "Built for the people who own the product definition.",
    items: [
      {
        name: "Design Engineer",
        tier: "Primary owner",
        aka: "R&D Engineer · Mechanical · Electrical · NPD Engineer",
        summary: "Owns that the product can be made, used, and supported. Drafts design inputs, runs design reviews, completes FMEAs, and releases drawings and specifications to manufacturing.",
        daily: ["Author design documents, run design reviews", "Complete FMEAs and risk assessments", "Raise and process engineering change orders", "Close design verification and validation"],
      },
      {
        name: "Engineering Manager",
        tier: "Primary owner",
        aka: "Director of Engineering · R&D Manager · Engineering Lead",
        summary: "Approves design and change decisions for the engineering function. Chairs design reviews, signs off engineering change orders, and balances cost against quality against schedule.",
        daily: ["Approve ECOs, chair design reviews", "Review FMEAs, allocate engineering resource", "Report engineering metrics to management review"],
      },
    ],
  },

  // NOTE: sample stories in the industry-template-modern fiction (fictional
  // brands, stock portraits); replace with real, verified stories before
  // shipping. Landscape portraits, faces-cropped, mirror the DMS proof band.
  proof: {
    eyebrowN: 6,
    kicker: "What engineering teams say",
    testimonials: [
      {
        quote: "Every requirement now points to the test that closed it. Design review stopped being an archaeology project.",
        name: "Rahul Menon",
        title: "Director of Engineering · Vantage Instruments",
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
      },
      {
        quote: "A spec change shows every FMEA and control plan it touches before anyone approves it. We stopped breaking things downstream.",
        name: "Clara Boden",
        title: "Principal Design Engineer · Helix Surgical",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
      },
      {
        quote: "Our design history file used to take weeks to assemble. Now the trace is intact the day we release.",
        name: "Tomas Herrera",
        title: "R&D Manager · Aerinox",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
      },
    ],
  },

  pains: {
    eyebrowN: 7,
    heading: "The four failure modes that become audit findings.",
    items: [
      { title: "Requirements that drift from what shipped", body: "Inputs, outputs, and tests live in different tools, so the trace can't be reconstructed.", severity: "Critical" },
      { title: "A change with an unknown blast radius", body: "No link from a spec to the FMEAs and control plans it feeds, so a change breaks something downstream.", severity: "High" },
      { title: "Verification you can't point to", body: "A requirement with no linked test result is a finding waiting for the audit.", severity: "Medium" },
      { title: "FMEA that lives in a spreadsheet", body: "RPN never reaches the control plan, so the highest-risk failure mode isn't the most controlled.", severity: "Medium" },
    ],
  },

  compliance: {
    eyebrowN: 8,
    heading: "One controlled product record, whatever you are audited against.",
    standards: STANDARDS,
    industries: INDUSTRIES,
  },

  faq: {
    eyebrowN: 9,
    heading: "The questions engineering and quality ask first.",
    lede: (
      <>
        Anything else, <a href="#plm-close-h">bring it to the walkthrough</a>.
      </>
    ),
    items: [
      {
        q: "What exactly is bundled in PLM?",
        a: "Five modules on one product record: Product Specifications, Product Risk Management, Design Controls & Traceability, Inspection & Process Parameters, and FMEA & Control Plan Definition.",
      },
      {
        q: "Does it support design controls?",
        a: "Yes. Design Controls & Traceability keeps design input, output, verification, and validation records with full traceability from requirement to test result, aligned to 21 CFR 820 design controls.",
      },
      {
        q: "How does it handle FMEA and control plans?",
        a: "Design FMEA and process FMEA are worked on the product record, and RPN feeds the control-plan definition, so the highest-risk failure modes become the most controlled.",
      },
      {
        q: "Are specifications versioned?",
        a: "Yes. Product specifications for raw materials, finished goods, assemblies, and parts carry version history and an approval workflow, so the effective definition is never ambiguous.",
      },
      {
        q: "How is PLM licensed?",
        a: "PLM starts at $1,650 per organization per month standalone, and is included in the Growth and Ultimate plans.",
      },
      {
        q: "Which standards does it map to?",
        a: "ISO 13485, ISO 14971, 21 CFR 820, IATF 16949, AS 9100, and IEC 62304. One controlled product record, whatever you are audited against.",
      },
    ],
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Bring the requirement you can't trace to a test.",
    lede: "We will walk it from design input to a released, verifiable record, with the trace intact.",
    ctaPrimary: "Book a 30-minute walkthrough",
    ctaSecondary: { label: "See what is bundled", href: "#modules" },
  },

  footer: {
    tagline: "One controlled record for the whole product lifecycle.",
    baseRight: "Product Lifecycle Management · UPD-4",
    nav: [
      {
        label: "Product Lifecycle Management",
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
