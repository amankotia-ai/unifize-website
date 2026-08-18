/* ============================================================================
 * qms-data.ts - content for the QMS (Quality Management System) product page.
 * Sourced from the Unifize Products database in Notion: QMS (ID 1), Primary
 * Domain "Quality". Modules: Non-conformance, Corrective & Preventive Actions,
 * Complaint Handling, Audit Management, Supplier Quality, Quality Risk
 * Management. Personas: Quality Inspector, Continuous Improvement Lead,
 * Engineering Manager, Production Supervisor. Module and persona copy is
 * distilled from their Notion Description / Completion Contract / Daily
 * Activities fields; record IDs in the mocks are illustrative.
 * ========================================================================== */
import type { ProductPageData } from "../_shared/ProductPage";
import type { DmsCoordinationProblem } from "../dms/dms-data";
import { buildProductFlows } from "../_shared/product-flows";
import { QMS_MODULE_MOCKS, QmsCapaTrace } from "./qms-mocks";

/* real short-names of the QMS external standards (Notion External Standards) */
const HERO_STANDARDS = ["ISO 9001", "ISO 13485", "21 CFR 820", "IATF 16949", "AS 9100", "ICH Q10"];

/* the six featured QMS modules (blurbs distilled from each module's Notion
 * Description). Non-conformance and CAPA are the flagship intake + closure. */
export const QMS_MODULES = [
  {
    key: "non-conformance",
    name: "Non-conformance",
    promise: "Every event starts accountable.",
    blurb: "Capture, disposition, and closure of non-conformances with required fields, named ownership, and evidence binding. Escalates into CAPA when it is warranted.",
    points: ["Required intake fields", "Named owner and due date", "Disposition evidence bound in", "Escalation into CAPA"],
    standards: ["ISO 9001", "ISO 13485", "21 CFR 820"],
  },
  {
    key: "capa",
    name: "Corrective & Preventive Actions",
    promise: "Nothing closes unproven.",
    blurb: "Root-cause acceptance, action plan, effectiveness verification, and closure, with the relation back to the event that raised it.",
    points: ["Approved root-cause method", "Owned action plan", "Effectiveness window", "Automatic reopen if ineffective"],
    standards: ["ISO 9001", "ISO 13485", "ICH Q10"],
  },
  {
    key: "complaint-handling",
    name: "Complaint Handling",
    promise: "One trace from intake to close.",
    blurb: "Intake, triage, investigation, and closure of customer complaints, with regulatory reportability assessed on the record.",
    points: ["Structured complaint intake", "Triage and investigation", "Reportability assessment", "Evidence-backed closure"],
    standards: ["ISO 13485", "21 CFR 820", "MDSAP"],
  },
  {
    key: "audit-management",
    name: "Audit Management",
    promise: "Every finding stays on the record.",
    blurb: "Scheduling, finding tracking, response routing, and effectiveness verification across internal, external, and customer audits.",
    points: ["Audit scheduling", "Finding ownership", "Response routing", "Effectiveness verification"],
    standards: ["ISO 9001", "AS 9100", "MDSAP"],
  },
  {
    key: "supplier-quality",
    name: "Supplier Quality",
    promise: "Supplier signals become action.",
    blurb: "SCAR lifecycle, supplier qualification, incoming-inspection alignment, and scorecard maintenance on one supplier record.",
    points: ["SCAR lifecycle", "Supplier qualification", "Incoming-inspection alignment", "Composite scorecards"],
    standards: ["IATF 16949", "AS 9100", "ISO 13485"],
  },
  {
    key: "quality-risk-management",
    name: "Quality Risk Management",
    promise: "Risk controls stay current.",
    blurb: "Risk register, assessment workflows, control verification, and periodic review, aligned to ISO 14971 and ICH Q9.",
    points: ["Governed risk register", "Assessment workflows", "Control verification", "Periodic review"],
    standards: ["ISO 14971", "ICH Q9", "ISO 13485"],
  },
];

/* The same four QMS failure modes drive both the problem spotlight and the
 * coordination comparison, keeping the page's diagnosis and remedy aligned.
 * Each card traces to a Pain Points DB row (PP id) and quotes its attached
 * Symptom row verbatim, same discipline as the DMS page. */
export const QMS_PROBLEMS: DmsCoordinationProblem[] = [
  {
    /* PP-8 · High · Audit Management */
    visual: "retrieval",
    category: "Finding ownership",
    title: "The finding stalls at owner assignment",
    quote: "Internal audits find things but nothing changes because nobody owns the follow-up.",
    detail: "The finding sits in the audit report and the action sits in nobody's queue, so converting it into an owned, dated plan routinely stalls.",
    metric: "Unowned",
    metricLabel: "The finding has no accountable clock",
    work: "Close the finding",
    tax: ["Find the accountable owner", "Chase the action into a queue"],
    outcome: "Named owner and due date",
  },
  {
    /* PP-6 · Medium · Corrective and Preventive Actions */
    visual: "versions",
    category: "CAPA effectiveness",
    title: "The CAPA closes before the fix is proven",
    quote: "We cannot tell whether a CAPA actually fixed the problem or just addressed the symptom.",
    detail: "Effectiveness verification has a target date but no enforced gate, so it slips by weeks and often closes on paperwork instead of a real recurrence test.",
    metric: "Weeks",
    metricLabel: "Verification slips past its target",
    work: "Close the CAPA",
    tax: ["Chase the verification date", "Debate whether the fix worked"],
    outcome: "Effectiveness verified on a date",
  },
  {
    /* PP-27 · High · Supplier Quality */
    visual: "drift",
    category: "Supplier quality",
    title: "The SCAR closes, the supplier doesn't change",
    quote: "Supplier corrective actions get opened but rarely get verified as effective.",
    detail: "Closure rests on supplier-submitted paperwork rather than verified behaviour change, so the same failure returns with the next lot.",
    metric: "Repeat",
    metricLabel: "Same failure, next delivery",
    work: "Correct the supplier",
    tax: ["Chase the supplier response", "Verify change beyond paperwork"],
    outcome: "Closure on verified change",
  },
  {
    /* PP-5 · Critical · Audit Management + Document Control */
    visual: "audit",
    category: "Audit evidence",
    title: "Passing the audit costs days of rebuild",
    quote: "We pass audits but the day-to-day reality does not match what we showed the auditor.",
    detail: "The full record of a deviation, change, or CAPA is stitched from exports, screenshots, and email forwards. The cost of passing is days of senior time per cycle.",
    metric: "Days",
    metricLabel: "Senior time per audit cycle",
    work: "Answer the audit",
    tax: ["Collect scattered exports", "Reconcile closure evidence"],
    outcome: "Evidence already bound",
  },
];

/* ---- Product Flows: persona journeys for the QMS modules -----------------
 * Curated slate from the Product Flows DB: intake to closure on one event,
 * plus the supplier SCAR loop and the annual audit. Stations index into
 * QMS_DATA.flow.steps (Event raised .. Closed, sealed). */
export const QMS_FLOWS = buildProductFlows({
  page: "qms",
  moduleIds: [
    "360860e6-b45e-8148-a0a4-de3e0fd91891" /* Non-conformance */,
    "360860e6-b45e-81f9-b780-eed760e72d52" /* Corrective and Preventive Actions */,
    "360860e6-b45e-8190-93dd-c339472bd5e8" /* Corrective Actions */,
    "360860e6-b45e-816f-b15b-cfdc470fd359" /* Complaint Handling */,
    "360860e6-b45e-8169-a2af-dd81b8e10128" /* Audit Management */,
    "360860e6-b45e-817b-a763-c1d362e2de2d" /* Supplier Quality */,
    "360860e6-b45e-8176-a514-d0c34e2bf0cd" /* Quality Risk Management */,
  ],
  curate: true,
  presentation: {
    "5": {
      order: 0,
      title: "Capture a non-conformance",
      actor: "Quality Engineer",
      description: "Capture, contain, and assess the event the same day it is found.",
      stations: [0, 1],
    },
    "6": {
      order: 1,
      title: "Run root cause in the record",
      actor: "Quality Engineer",
      description: "Convene the analysis in the record's thread instead of a meeting room.",
      stations: [2],
    },
    "7": {
      order: 2,
      title: "Disposition and route for approval",
      actor: "Quality Engineer",
      description: "Decide the disposition and route it with the rationale attached.",
      stations: [3],
    },
    "3": {
      order: 3,
      title: "Close the CAPA with proof",
      actor: "CAPA Investigator",
      description: "Carry the corrective action to verified effectiveness and closure.",
      stations: [4, 5],
    },
    "11": {
      order: 4,
      title: "Run a supplier SCAR",
      actor: "Supplier Quality Engineer",
      description: "Exchange notification, investigation, and corrective action across the company boundary.",
      stations: [4],
    },
    "2": {
      order: 5,
      title: "Run the annual audit",
      actor: "Quality Manager",
      description: "Plan, conduct, and sign off the audit with findings routed to CAPA.",
      stations: [5],
    },
  },
});

/* the QMS external standards (Notion External Standards relation) */
const STANDARDS: ProductPageData["compliance"]["standards"] = [
  { name: "ISO 9001", geo: "ISO · Global", body: "Quality management system requirements." },
  { name: "ISO 13485", geo: "ISO · Global", body: "QMS for medical devices." },
  { name: "21 CFR 820", geo: "FDA · US", body: "Quality System Regulation for device cGMP." },
  { name: "IATF 16949", geo: "IATF · Global", body: "QMS for automotive production." },
  { name: "AS 9100", geo: "IAQG · Global", body: "QMS for aviation, space, and defense." },
  { name: "EU GMP", geo: "EC · EU", body: "GMP for medicinal products (EudraLex Vol. 4)." },
  { name: "ICH Q10", geo: "ICH · Global", body: "Pharmaceutical quality system across the lifecycle." },
  { name: "MDSAP", geo: "IMDRF · Global", body: "One device audit across US, Canada, Australia, Brazil, and Japan." },
];
/* Notion Industries relation. Verified names below; a few more relations
 * remain to resolve once the Notion API is reachable again. */
const INDUSTRIES: string[] = ["Medical Devices", "Pharmaceuticals", "Automotive", "Aerospace"];

export const QMS_DATA: ProductPageData = {
  slug: "qms",
  crumbLabel: "Quality Management System",
  metaTitle: "Quality Management System · Unifize",
  metaDescription:
    "QMS bundles Non-conformance, CAPA, Complaint Handling, Audit, Supplier Quality, and Quality Risk Management on one governed record. A finding always has an owner, an action, and a verified close.",

  hero: {
    headline: (
      <>
        A finding isn&rsquo;t closed until the fix is <span className="dms-hero__turn">proven.</span>
      </>
    ),
    lede: "Non-conformance, CAPA, Audit, and Supplier Quality on one governed record, so every finding carries an owner, an action, and a verified close.",
    ctaPrimary: "Book a demo",
    ctaSecondary: { label: "See what is bundled", href: "#modules" },
    standards: HERO_STANDARDS,
    mock: <QmsCapaTrace />,
  },

  coordinationTax: {
    leaks: [
      { surface: "Inbox", name: "The unowned finding", note: "A non-conformance sits open because the next owner was never named." },
      { surface: "Sheet", name: "The CAPA tracker", note: "Actions and due dates live in a spreadsheet, off the record they belong to." },
      { surface: "Re-key", name: "The complaint re-entry", note: "The same complaint is typed into a form, a log, and an email that now disagree." },
      { surface: "Meeting", name: "The effectiveness debate", note: "Whether a CAPA worked is argued in a review instead of checked on a date." },
      { surface: "Audit", name: "The supplier surprise", note: "A recurring supplier issue surfaces at the audit, with no SCAR trail behind it." },
    ],
    summary: (
      <>
        <b>The finding carries its own proof.</b> Owner, action, and effectiveness check sit on one governed
        record, so a CAPA never bounces between an inbox, a spreadsheet, and a meeting.
      </>
    ),
  },

  positioning: {
    eyebrowN: 1,
    heading: "Most systems close a CAPA when the paperwork is signed.",
    lede: "Unifize closes it when the effectiveness check passes inside its window, with the trace held all the way back to the event that raised it. A quality system is only as good as the record that proves the fix worked.",
    features: [
      { title: "One governed record", body: "Every event, CAPA, audit finding, and SCAR on one record, with named ownership and evidence bound in.", glyph: "shield" },
      { title: "Nothing closes unproven", body: "Root cause approved, actions verified, effectiveness checked, before a record is allowed to close.", glyph: "search" },
      { title: "The trace is end to end", body: "A CAPA carries the relation back to the non-conformance that raised it, and forward into the change and training it triggers.", glyph: "sync" },
    ],
  },

  modules: {
    mode: "ledger",
    tone: "dark",
    eyebrowN: 2,
    heading: "The quality system, bundled.",
    lede: "Six disciplines on one governed deployment, so an event that starts on the floor ends in a defensible, closed record.",
    items: QMS_MODULES,
    mocks: QMS_MODULE_MOCKS,
    urlBase: "qms",
  },

  capabilities: {
    eyebrowN: 3,
    tone: "dark",
    heading: "The controls a quality system runs on.",
    items: [
      { title: "Root-cause governance", body: "The RCA method is named and approved by the QA Manager before a CAPA can leave investigation.", glyph: "trace" },
      { title: "Effectiveness verification", body: "A CAPA closes only after its effectiveness check passes inside the assigned window: 30, 90, or 180 days by severity.", glyph: "review" },
      { title: "Evidence binding", body: "Every event, action item, and audit finding carries the evidence that makes it defensible under audit.", glyph: "versions" },
      { title: "Reopen governance", body: "An ineffective outcome reopens the record to investigation automatically, instead of quietly ending it.", glyph: "signature" },
      { title: "Bounded auditor access", body: "Internal, external, and customer audits run with scoped participation, not the run of the whole system.", glyph: "access" },
      { title: "SCAR to scorecard", body: "A supplier corrective action feeds the supplier's composite scorecard and approved-supplier tier.", glyph: "sync" },
    ],
  },

  flow: {
    eyebrowN: 4,
    tone: "dark",
    heading: "Every quality event has an owner, an action, and a proven close.",
    trailLabel: "How an event closes",
    steps: [
      { state: "Event raised", gate: "Signal opened, hold issued", detail: "A non-conformance is opened with the affected units held. Required fields and a named owner are captured at intake, so nothing enters the system unaccountable." },
      { state: "Evidence bound", gate: "Inspection, logs, lot trace", detail: "Inspection results, torque logs, photos, and incoming-lot traceability are bound to the record, so the investigation works from evidence, not memory." },
      { state: "Investigation", gate: "Cross-functional review, RCA", detail: "Cross-functional review completes and a root-cause method is run and approved. The trace points at the contributing factor, here a secondary supplier." },
      { state: "Disposition", gate: "Committed with Part 11", detail: "Disposition is committed with a Part 11 e-signature: scrap the affected units, retrain the line, and open a supplier SCAR." },
      { state: "CAPA + SCAR", gate: "Actions owned, effectiveness set", detail: "Corrective and preventive actions are owned with due dates, the supplier SCAR is raised, and an effectiveness check is scheduled for the assigned window." },
      { state: "Closed, sealed", gate: "Effectiveness proven, trail sealed", detail: "Once the effectiveness check passes, the CAPA closes and the audit trail is sealed, linked to the QMS record and the design change it drove." },
    ],
    chat: { variant: "capa", points: [0.17, 0.42, 0.6, 0.86, 0.95, 1] },
    mobileNote: { label: "CAPA decision trace", id: "CAPA-2148 · raise → evidence → review → disposition → CAPA → seal" },
  },

  // NOTE: hubSystems below are REPRESENTATIVE of the stack Unifize coexists with
  // (grounded in the industry coexistence copy), not a certified connector list.
  // Verify against the real connector catalogue before shipping.
  integrations: {
    heading: "The finding lands against the record your systems already hold.",
    lede: "A quality event rarely starts in the quality system. Unifize sits over the ERP, floor, and customer tools you already run, so a non-conformance opens against the real lot, supplier, and complaint, not a re-keyed copy.",
    record: "the quality record",
    hubSystems: ["SAP", "Oracle", "NetSuite", "MES", "LIMS", "Salesforce", "Zendesk", "Okta"],
  },

  owners: {
    eyebrowN: 5,
    heading: "Built for the people a quality finding lands on first.",
    // NOTE: `img` values are PLACEHOLDERS — the two existing DMS persona
    // portraits, reused (alternating) so the photo layout is visible now. Swap
    // each for an art-directed portrait of the actual role (see
    // persona-image-art-direction: low-key film look, fg+bg ghost motion blur,
    // 3:2, sourced >=1800x1200).
    items: [
      {
        name: "Quality Inspector",
        tier: "Primary owner",
        aka: "QC / QA Inspector · Incoming · IPQA · Final Inspector",
        summary: "Owns whether a batch, lot, or shipment meets specification. Runs incoming, in-process, and final inspections, raises non-conformances, and releases or rejects product.",
        daily: ["Perform inspections to plan, sample against AQL", "Raise non-conformances, segregate failing material", "Release passing material, escalate the rest"],
        img: "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png",
      },
      {
        name: "Continuous Improvement Lead",
        tier: "Primary owner",
        aka: "CI Manager · Lean Lead · Six Sigma Black Belt",
        summary: "Owns that the organization gets better quarter over quarter. Facilitates improvement projects, runs 8Ds and DMAIC, and measures the benefit of every corrective action.",
        daily: ["Facilitate kaizens, run 8Ds, coach DMAIC teams", "Track benefits against the effectiveness window", "Report progress to the steering committee"],
        img: "/Gemini_Generated_Image_r84h7yr84h7yr84h.png",
      },
      {
        name: "Engineering Manager",
        tier: "Primary owner",
        aka: "Director of Engineering · R&D Manager · Engineering Lead",
        summary: "Approves the engineering side of quality decisions. Signs off CAPAs and deviations that touch design, and joins the Quality Manager on findings that cross the design line.",
        daily: ["Sign off CAPAs and deviations affecting engineering", "Chair design reviews, review FMEAs", "Report engineering quality to management review"],
        img: "/Gemini_Generated_Image_r84h7yr84h7yr84h.png",
      },
      {
        name: "Production Supervisor",
        tier: "Primary owner",
        aka: "Shift Supervisor · Line Lead · Operations Supervisor",
        summary: "Owns that today's shift makes good product. Handles deviations in real time on the line, coordinates with quality on holds and releases, and closes shift handovers.",
        daily: ["Investigate deviations at the point of use", "Coordinate with quality on holds and releases", "Close handovers between shifts"],
        img: "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png",
      },
    ],
  },

  // NOTE: sample stories in the industry-template-modern fiction (fictional
  // brands, stock portraits); replace with real, verified stories before
  // shipping. Landscape portraits, faces-cropped, mirror the DMS proof band.
  proof: {
    eyebrowN: 6,
    kicker: "What quality teams say",
    testimonials: [
      {
        quote: "The auditor asked for our CAPA effectiveness history and it was already on the record. No scramble, no spreadsheet.",
        name: "Elena Vasquez",
        title: "VP Quality · Nordhaus Medical",
        img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
      },
      {
        quote: "A recurring supplier issue finally showed up on a scorecard instead of in a complaint. We caught it a quarter early.",
        name: "Daniel Osei",
        title: "Supplier Quality Manager · Caldera Devices",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
      },
      {
        quote: "A CAPA can't close here until the effectiveness check passes. Repeat findings dropped to almost none.",
        name: "Sarah Lindqvist",
        title: "Head of Quality · Meridian Bio",
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
      },
    ],
  },

  pains: {
    eyebrowN: 7,
    heading: "The four failure modes that become audit findings.",
    items: [
      { title: "A non-conformance with no owner and no clock", body: "The record sits open because nothing forces an owner, a due date, or a close.", severity: "Critical" },
      { title: "A CAPA closed on paperwork, not proof", body: "Signed off before any effectiveness check, so the same failure returns next quarter.", severity: "High" },
      { title: "Supplier issues invisible until the audit", body: "No SCAR trail and no scorecard, so a recurring supplier problem surfaces late.", severity: "Medium" },
      { title: "Audit findings tracked in a spreadsheet", body: "Responses and effectiveness live off the record, and the next audit reopens them.", severity: "Medium" },
    ],
  },

  compliance: {
    eyebrowN: 8,
    heading: "One governed quality system, whatever you are audited against.",
    standards: STANDARDS,
    industries: INDUSTRIES,
  },

  faq: {
    eyebrowN: 9,
    heading: "The questions quality and procurement ask first.",
    lede: (
      <>
        Anything else, <a href="#qms-close-h">bring it to the walkthrough</a>.
      </>
    ),
    items: [
      {
        q: "What exactly is bundled in QMS?",
        a: "Six modules on one governed record: Non-conformance, Corrective and Preventive Actions, Complaint Handling, Audit Management, Supplier Quality, and Quality Risk Management. An event that starts as a non-conformance escalates into a CAPA without re-entry.",
      },
      {
        q: "How is a CAPA actually closed?",
        a: "Only when the root cause is documented and approved, every action item is implemented with evidence, an independent verifier signs off, and the effectiveness check passes inside the assigned window (30 days for Minor, 90 for Major, 180 for Critical or Regulatory). An ineffective outcome reopens it automatically.",
      },
      {
        q: "Does it handle supplier quality?",
        a: "Yes. The Supplier Quality module runs the SCAR lifecycle, supplier qualification and PPAP tracking (AIAG levels 1 to 5), incoming-inspection alignment, and composite scorecards, with SCAR effectiveness checked at 30 or 90 days.",
      },
      {
        q: "How do auditors participate?",
        a: "Audit Management supports internal, external, and customer audits with bounded external-participant access, so an auditor can work the findings they need without the run of the whole system.",
      },
      {
        q: "Does a non-conformance link to its CAPA?",
        a: "Yes. A CAPA carries a relation back to the originating quality event, so the trace runs end to end, from the signal on the floor to the verified, effectiveness-checked close.",
      },
      {
        q: "Which standards does it map to?",
        a: "ISO 9001, ISO 13485, 21 CFR 820, IATF 16949, AS 9100, EU GMP, ICH Q10, and MDSAP. One governed lifecycle, whatever you are audited against.",
      },
    ],
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Bring the finding that has been open too long.",
    lede: "We will run it through the system live, from the event to root cause to a verified, effectiveness-checked close.",
    ctaPrimary: "Book a 30-minute walkthrough",
    ctaSecondary: { label: "See what is bundled", href: "#modules" },
  },

  footer: {
    tagline: "One governed record for every quality event.",
    baseRight: "Quality Management System · UPD-1",
    nav: [
      {
        label: "Quality Management System",
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
          { label: "All products", href: "/explorations/platform" },
        ],
      },
    ],
  },
};
