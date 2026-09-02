/* ============================================================================
 * Compliance: domain (Solutions) page data. All values trace to Notion.
 *
 * source: Domains DB -> "Compliance" (327860e6b45e814e9274cab4e707d8e3, Domain
 *   15, Tier Secondary). The hero framing and the leak thesis are the row's
 *   Description: coordination tax accumulates when compliance obligations (CSV
 *   validation, data integrity governance, EHS compliance, regulatory change
 *   management, cross-border alignment) need multi-function coordination with
 *   no structured decision trace, and compliance frameworks are run as a
 *   governance layer beside the QMS. The row also states that the compliance
 *   and validation buyer (Validation Manager, CSV Lead, Quality Compliance
 *   Manager) is a distinct buyer from the VP Quality; that drives the primary
 *   persona card. Internal fields (budget owner, play coverage) are used for
 *   understanding only, never published.
 * source: Themes DB, all 13 rows linked to this domain -> section 01. One line
 *   per Theme, distilled from its Description; the clusters are editorial, the
 *   membership traces to each Theme's Description.
 * source: Pain Points DB, the 4 rows linked to this domain (ID 45, 46, 47, 48)
 *   -> section 02. Names verbatim, bodies condensed from Description, Severity
 *   verbatim. ID-48 (PPE issuance and fit-test history split across HR and
 *   EHS) is rated Low in Notion and the page's severity scale starts at Medium,
 *   so it is not carried as a card; it is the reason the PPE module appears in
 *   the coverage map below.
 * source: Trigger Events DB, the 7 rows linked to this domain (Event ID 1, 2,
 *   3, 5, 6, 7, 9) -> section 07. Clocks condensed from Description /
 *   Regulatory Framework. Event ID-5 (Regulatory change notification) is rated
 *   Medium in Notion and the trigger board renders Urgent / High only, so it is
 *   carried in section 01 (Regulatory Change Management) instead.
 * source: Modules DB. No module carries Primary Domain = Compliance, so the
 *   coverage map is derived two ways, both from Notion: the modules named in
 *   this domain's Pain Points via `Modules Addressing` (Document Control ID-9,
 *   Audit Management ID-14, EHS Audit Management ID-39, PPE Management ID-42)
 *   and the modules whose Descriptions cover validation, audit, document
 *   control and regulatory obligation tracking. Grouped by Primary Product
 *   (Products DB: DMS, QMS, EH&S, APQP & PPAP). Standards resolved from each
 *   module's External Standards relation to its short name.
 * source: Product Personas DB -> Quality Manager (PPS-2, Tier Primary),
 *   EHS Manager (PPS-14, titles from Title Variants), Document Controller
 *   (PPS-5, Part 11 e-signature configuration). The compliance and validation
 *   card and the systems card carry the role vocabulary named in the Themes
 *   (Validation Leads, System Owners, IT, Compliance) and in the CSV audit
 *   finding trigger.
 * source: MD_PROOF canonical data for section 09. The signed baseline is a
 *   medical-device customer's non-conformance coordination cost, labelled as
 *   exactly that; the named references run document control, training and
 *   change control, which are the governed records this page is about.
 * Framing / headlines are authored on top of the canonical facts; nothing
 * factual is invented. Notion carries no per-domain cost figure, so the cost
 * band is qualitative.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: CSV-0912 as its owner lives it, one pose per
 * flow.trail step. The record vocabulary comes from this page's own
 * canonical story (the data-integrity finding in section 03: audit-trail
 * gap on a GxP system, remediated and revalidated). Sections and items
 * never change mid-journey; steps only open sections and advance counts. */
const COMPLIANCE_WORLD: ArcadeFlowWorld = {
  team: "Quality Compliance",
  recordNoun: "Finding",
  owner: "A. Novak",
  ownerInitials: "AN",
  participants: ["AN", "RI", "+3"],
  participantsLabel: "A. Novak, R. Iyer, and three others",
  recordKicker: "DATA INTEGRITY FINDING",
  context: {
    initials: "AN",
    name: "A. Novak",
    time: "09:24",
    message: "Cited the audit-trail gap on the LIMS from the internal audit.",
    detail: "Linked to IA-2026-04 · LIMS v7.2",
  },
  inboxNeighbors: [
    { title: "LIMS v7.2 periodic review", time: "10:05", detail: "Validated state · review in scope", kind: "Validation" },
    { title: "User access review · Q3", time: "Yesterday", detail: "3 admin roles flagged", kind: "Access review" },
    { title: "E-signature governance SOP", time: "Yesterday", detail: "SOP-201 · periodic review due", kind: "Document" },
  ],
  checklistTitle: "Finding",
  checklistSections: [
    {
      title: "FINDING & IMPACT",
      items: [
        { label: "Finding description", kind: "field", value: "Audit trail disabled on result amendments · LIMS v7.2", note: "Entered from the audit" },
        { label: "Affected system", note: "LIMS v7.2 · GxP critical" },
        { label: "Records exposure", note: "214 amended results in scope" },
      ],
    },
    {
      title: "REMEDIATION",
      items: [
        { label: "Access rights corrected", note: "3 admin roles narrowed" },
        { label: "Audit trail enabled", kind: "revision", from: "Amendments · trail off", to: "Amendments · trail on" },
        { label: "Interim control", note: "Manual second check · QA" },
      ],
    },
    {
      title: "REVALIDATION & CLOSURE",
      items: [
        { label: "Revalidation executed", note: "IQ/OQ on v7.2.1" },
        { label: "QA review", kind: "approval", signer: "T. Osei", state: "Approved" },
        { label: "Closure", kind: "approval", signer: "L. Duarte", state: "Signed" },
      ],
    },
  ],
};

/* the constants every pose of the journey shares */
const COMPLIANCE_REC = {
  type: "Finding",
  id: "CSV-0912",
  title: "Audit-trail gap · LIMS",
  world: COMPLIANCE_WORLD,
} as const;

export const COMPLIANCE_DATA: DomainPageData = {
  slug: "compliance",
  name: "Compliance",
  tier: "Secondary",

  meta: {
    // The root layout template appends "· Unifize".
    title: "Compliance · Solutions",
    description:
      "Validation, data integrity, EHS and regulatory change get governed beside the quality system, and the reasoning behind each decision goes missing. Unifize keeps the decision trace, in your industry's regulatory frame.",
  },

  hero: {
    crumb: "Compliance",
    titleLead: "You can prove compliance today.",
    titleTurn: "Ask again tomorrow.",
    sub: "Validation, data integrity, safety and regulatory change are governed in briefs and spreadsheets beside the quality system. Unifize keeps the decision trace, so the answer holds the next time someone asks.",
    // Parity chips: the flagship Themes, not standards.
    chips: [
      "Validation & qualification",
      "Data integrity",
      "Audit readiness",
      "Regulatory change",
      "EHS compliance",
      "Cross-border trade",
    ],
    // Floating evidence cards: the sealed record from the flow section and the
    // statutory clock from the trigger board.
    floats: [
      { kind: "seal", title: "Validated state restored", meta: "CSV-0912 · sealed by Quality Compliance" },
      { kind: "clock", title: "483 response clock", meta: "15 working days · answered on the record" },
    ],
    // The trust-strip slot: the live industry pages where validation, data
    // integrity and EHS obligations bite hardest.
    runsIn: {
      label: "Runs wherever compliance is inspected",
      links: [
        { name: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
        { name: "Medical devices", href: "/explorations/industry-template-modern" },
        { name: "Chemicals", href: "/explorations/industries/chemicals" },
        { name: "Laboratories", href: "/explorations/industries/laboratories" },
        { name: "Contract research orgs", href: "/explorations/industries/cro" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: Themes DB, all 13 rows linked to Compliance; one line per Theme,
   * distilled from its Description. Grouped into buyer-vocabulary clusters.
   * Group runsIn links point only where a live product page really runs the
   * work. */
  work: {
    heading: "If compliance signs it, it has a home here.",
    lede: "The obligations a compliance function actually carries, as governed workflows: named owners, evidence bound to the decision, a close that survives an inspection.",
    groups: [
      {
        glyph: "scale",
        name: "Systems, data and the validated state",
        line: "Prove the systems and the data behind every record you sign.",
        items: [
          {
            name: "Validation and Qualification",
            line: "IQ, OQ and PQ runs scheduled around production, with the validated state held through every change that touches it.",
          },
          {
            name: "Data Integrity, Access Control and E-Signature Governance",
            line: "Identity, audit trails and electronic signatures governed to ALCOA+ across GxP systems, with periodic access reviews evidenced rather than asserted.",
          },
        ],
      },
      {
        glyph: "doc",
        name: "Inspections and changing rules",
        line: "Getting inspected, answering findings, and keeping up as the rules move.",
        runsIn: { label: "Audits run in the QMS product →", href: "/explorations/products/qms" },
        items: [
          {
            name: "Audit Readiness and Response",
            line: "Current evidence for every controlled procedure, responses drafted on the clock, commitments tracked to auditable closure.",
          },
          {
            name: "Regulatory Change Management",
            line: "A new rule or guidance assessed against your footprint, then walked through every dependent document, training and validation.",
          },
          {
            name: "Cross-Border Regulatory Compliance",
            line: "Import, export and intercompany movement classified, licensed and documented in step with the manufacturing record.",
          },
          {
            name: "Contract Review",
            line: "Quality agreements and customer commitments cleared by quality and regulatory before they become obligations you have to meet.",
          },
        ],
      },
      {
        glyph: "pulse",
        name: "Safety, environment and waste",
        line: "Keeping people safe and the site inside its permits.",
        items: [
          {
            name: "Environmental Health and Safety Compliance",
            line: "Incidents and near-misses captured on the floor, classified consistently, and closed across every site and shift.",
          },
          {
            name: "Environmental Monitoring and Facility Control",
            line: "Alarm and sampling data pulled together, excursions classified, affected lots identified while the evidence is still current.",
          },
          {
            name: "Waste Management and Controlled Destruction",
            line: "Regulated waste tracked from generation to certified destruction, with manifests and chain of custody provable on demand.",
          },
        ],
      },
      {
        glyph: "box",
        name: "Once product leaves the site",
        line: "Obligations that follow the product past your own walls.",
        runsIn: { label: "Batch records run in the MES product →", href: "/explorations/products/mes" },
        items: [
          {
            name: "Batch Record Review and Release",
            line: "Line-by-line review to release, with deviations, in-process checks and signatures reconciled across MES, ERP and the quality system.",
          },
          {
            name: "Contract Manufacturing and CMO/CDMO Governance",
            line: "Change, deviations and batch review governed across two quality systems, because the regulator sees one manufacturer.",
          },
          {
            name: "Adverse Event Reporting and Regulatory Notification",
            line: "Events classified for reportability across jurisdictions and filed inside the tightest applicable clock.",
          },
          {
            name: "Field Action Effectiveness Monitoring and Close-Out",
            line: "Customer responses reconciled against the affected population, and effectiveness proved before the authority questions the closure.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, the rows linked to Compliance. Names verbatim,
   * bodies condensed from Description, Severity verbatim. The Low-rated PPE
   * row is not carried here (see the header note). */
  leaks: {
    heading: "The obligation gets met. The record can't answer for it.",
    lede: "The failure modes we see inside compliance and EHS functions. None of them is a missing feature. All of them are obligations governed outside the record.",
    // `surface` = where the answer actually lives today, condensed from each
    // pain's Description.
    /* the old world, staged (section 02's evidence artifact): the paper
     * validated state, aging quietly between audits. Furniture is
     * illustrative, not a claim. */
    scene: {
      kicker: "Validation binder · LIMS",
      chip: "Review overdue",
      title: "Validated state, on paper",
      rows: [
        { state: "done", label: "IQ/OQ executed", age: "2023" },
        { state: "wait", label: "Periodic review", age: "9mo late", warn: true },
        { state: "wait", label: "User access review", age: "3 roles flagged" },
        { state: "idle", label: "Audit-trail verification", age: "Not scheduled" },
      ],
      float: { kicker: "Inspector", note: "Show me who amended this result, and when." },
      caption: "Provable at the last audit. Nobody can say whether it still is.",
    },
    pains: [
      {
        severity: "High",
        surface: "Documents & spreadsheets",
        name: "Compliance posture answer assembled per question, never queryable",
        body: "Asked for the status of computer system validation, the change controls in scope for financial reporting, the data flows behind a privacy request or a control mapping, the team assembles the answer from documents, spreadsheets and email. It is correct for that question and stale for the next.",
      },
      {
        severity: "High",
        surface: "The scanning brief",
        name: "Regulatory change horizon scanning not linked to operating documents",
        body: "Teams scan for what is coming: a new standard revision, a new agency guidance, a new ruling. The scan output lives in a separate brief, and the link from the rule that changed to the procedures and forms that need review is drawn by hand every time.",
      },
      {
        severity: "Medium",
        surface: "Parallel spreadsheets",
        name: "EHS audit findings tracked in spreadsheets parallel to QMS",
        body: "EHS audits produce findings, action plans and closure evidence, tracked by the EHS function in its own spreadsheets, separate from the quality system's audit records. Asking whether an EHS finding repeats a quality finding takes a manual reconciliation nobody has time for.",
      },
    ],
    note: "Severity as rated in our field research with compliance, validation and EHS teams, current as of the last review.",
    // Qualitative by design: Notion carries no per-domain cost figure, so the
    // band states the canonical cost from the worst-rated pain instead.
    tax: {
      label: "The recurring bill",
      value: "The posture gets rebuilt for every question asked.",
      meta: "Each answer is assembled by hand from documents, spreadsheets and email. It is right for the question that prompted it, and out of date by the next one.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: Trigger Events "CSV audit finding" (ID-6) and "Data integrity
   * finding" (ID-7) for the scenario and its role vocabulary (IT, quality,
   * validation and process owners under an audit-response clock); step
   * vocabulary from the Data Integrity, Access Control and E-Signature
   * Governance Theme and from the Corrective Actions module Description
   * (root cause acceptance, action plan, effectiveness verification, closure).
   * Compliance links no Customer Workflows directly, so the trace is built
   * from those rows. */
  flow: {
    heading: "Run the finding where the decisions happen.",
    lede: "Most systems record that a data integrity gap was closed. Unifize holds the remediation itself, so the impact call, the access decisions and the revalidation seal into a trace an inspector can replay.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Audit-trail gap cited in the finding", who: "Validation Manager", when: "Day 0" },
      { t: "Impact assessed across GxP systems", who: "System Owner · IT", when: "Day 4" },
      { t: "Access remediation committed", who: "Quality Compliance", when: "Day 11" },
      { t: "Revalidation executed and reviewed", who: "Validation Lead · QA", when: "Day 29" },
      { t: "Closed · trace sealed", who: "Director of Quality Compliance", when: "Day 30" },
    ],
    trailFoot: "The relation runs back to the system that raised the finding, and forward into the documents, training and revalidation it changes. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / capa / CSV-0912",
    mobileLabel: "Data integrity decision trace",
    mobileId: "CSV-0912 · finding → impact → remediation → verified close",
    /* one pose per trail step; the trail drives the camera (domain-arcade) */
    arcade: {
      steps: [
        {
          ...COMPLIANCE_REC,
          source: "DK · CSV-0912 · cite",
          ghost: "Cite",
          status: "Draft",
          actor: "You",
          event: "Cited the audit-trail gap from the internal audit",
          eventDetail: "IA-2026-04 · finding captured where it will be answered",
          checklist: "FINDING & IMPACT",
          checklistItems: ["Finding description", "Affected system", "Records exposure"],
          focus: "print",
          focusTitle: "Audit finding",
          focusRows: ["Audit trail disabled", "LIMS v7.2 · GxP critical", "214 results in scope"],
          focusAction: "Open the impact assessment",
          ownershipNote: "One record from the first decision",
          checklistOpen: "FINDING & IMPACT",
          checklistEntry: { section: "FINDING & IMPACT", item: "Finding description" },
          checklistProgress: { "FINDING & IMPACT": 2, "REMEDIATION": 0, "REVALIDATION & CLOSURE": 0 },
          checklistFootnote: "Cited against the validated state of LIMS v7.2",
        },
        {
          ...COMPLIANCE_REC,
          source: "DK · CSV-0912 · impact",
          ghost: "Assess",
          status: "Open",
          actor: "automator",
          event: "Bound the impact assessment across the GxP systems",
          eventDetail: "Exposure listed, adjacent systems checked, in one pass",
          checklist: "FINDING & IMPACT",
          checklistItems: ["LIMS v7.2 · audit-trail scope confirmed", "214 amended results · exposure listed", "Adjacent GxP systems · MES, eDMS clear"],
          focus: "trace",
          focusTitle: "Impact across the GxP estate",
          focusRows: ["Everything the gap touches", "3 records linked"],
          focusAction: "Open evidence chain",
          ownershipNote: "Scoped by rule, not by memory",
          checklistOpen: "FINDING & IMPACT",
          checklistProgress: { "REMEDIATION": 0, "REVALIDATION & CLOSURE": 0 },
          related: 3,
        },
        {
          ...COMPLIANCE_REC,
          source: "DK · CSV-0912 · remediate",
          ghost: "Commit",
          status: "Open",
          actor: "You",
          event: "Committed the access remediation with owners",
          eventDetail: "Access, audit trail and the interim control · owners and dates named",
          checklist: "REMEDIATION",
          checklistItems: ["Access rights corrected", "Audit trail enabled", "Interim control"],
          focus: "tasks",
          focusTitle: "Remediation actions",
          focusRows: ["Narrow admin roles · R. Iyer", "Enable amendment audit trail · IT", "Interim second check · QA"],
          ownershipNote: "Owners answer on the record",
          checklistOpen: "REMEDIATION",
          checklistProgress: { "REMEDIATION": 1, "REVALIDATION & CLOSURE": 0 },
        },
        {
          ...COMPLIANCE_REC,
          source: "DK · CSV-0912 · revalidate",
          ghost: "Revalidate",
          status: "In Review",
          actor: "Unifize Assistant",
          event: "Assembled the revalidation review",
          eventDetail: "IQ/OQ evidence on the thread · QA decision pending",
          checklist: "REVALIDATION & CLOSURE",
          checklistItems: ["Revalidation executed", "QA review", "Closure"],
          focus: "review",
          focusTitle: "Revalidation review",
          focusRows: ["IQ/OQ · v7.2.1 passed", "Amendment trail · verified on", "Reviewer · T. Osei, QA"],
          focusAction: "Approve revalidation",
          focusAlts: ["Return with comment"],
          ownershipNote: "The validated state, restored on the record",
          checklistOpen: "REVALIDATION & CLOSURE",
          checklistProgress: { "REVALIDATION & CLOSURE": 1 },
        },
        {
          ...COMPLIANCE_REC,
          source: "DK · CSV-0912 · seal",
          ghost: "Seal",
          status: "Completed",
          actor: "automator",
          event: "Closed CSV-0912 and sealed the trace",
          eventDetail: "Finding → impact → remediation → revalidation, on one thread",
          checklist: "REVALIDATION & CLOSURE",
          checklistItems: ["Revalidation executed", "QA review", "Closure"],
          focus: "history",
          focusKicker: "DECISION TRACE",
          focusTitle: "One sealed decision trace",
          focusRows: ["CSV-0912 · Closed · trace sealed", "LIMS v7.2.1 · validated state restored", "214 results reviewed · disposition logged"],
          ownershipNote: "Provable again tomorrow",
          checklistOpen: "REVALIDATION & CLOSURE",
          signedItems: [
            { name: "L. Duarte", initials: "LD", role: "Director of Quality Compliance", approvalId: "5A19C0912E88", time: "Day 30" },
          ],
          related: 3,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry
   * The L1 fan-out. Rows link to the live industry pages; each line instances
   * Compliance in that industry's own obligations, and the chips are that
   * industry's canonical regulatory frameworks as already shipped on its page
   * (and, for medical devices, the MDSAP standard on Audit Management). */
  industries: {
    heading: "Compliance, in your regulatory frame.",
    lede: "The same obligations, translated to the frameworks you are inspected against. Every industry page carries compliance in its own vocabulary.",
    rows: [
      { name: "Pharmaceuticals", line: "Computer system validation, data integrity and batch record review.", chips: ["21 CFR Part 11", "EU GMP Annex 11", "ICH Q10"], href: "/explorations/industries/pharmaceuticals" },
      { name: "Medical devices", line: "Process validation, complaint reportability and inspection response.", chips: ["21 CFR 820", "ISO 13485", "MDSAP"], href: "/explorations/industry-template-modern" },
      { name: "Chemicals", line: "Process safety management, permits and hazardous waste manifests.", chips: ["OSHA PSM", "REACH", "ISO 14001"], href: "/explorations/industries/chemicals" },
      { name: "Laboratories", line: "Data integrity, instrument qualification and result traceability.", chips: ["ISO/IEC 17025", "21 CFR Part 11", "ALCOA+"], href: "/explorations/industries/laboratories" },
      { name: "Contract research orgs", line: "Trial master file integrity, access control and inspection readiness.", chips: ["ICH E6(R2) GCP", "21 CFR Part 11", "ALCOA+"], href: "/explorations/industries/cro" },
      { name: "Food processing", line: "Preventive-control verification, environmental monitoring and permits.", chips: ["FSMA · 21 CFR 117", "HACCP"], href: "/explorations/industries/food-processing" },
      { name: "Cosmetics", line: "Adverse event reporting, GMP evidence and label substantiation.", chips: ["MoCRA", "ISO 22716"], href: "/explorations/industries/cosmetics" },
      { name: "Nutritional supplements", line: "Specification files, batch records and cGMP evidence on demand.", chips: ["21 CFR Part 111", "cGMP"], href: "/explorations/industries/nutritional-supplements" },
      { name: "Aerospace", line: "Special-process approvals, audit findings and export control.", chips: ["AS9100", "NADCAP"], href: "/explorations/industries/aerospace" },
      { name: "Automotive", line: "Process validation evidence and audit findings across the supply base.", chips: ["IATF 16949", "PPAP"], href: "/explorations/industries/automotive" },
      { name: "Industrial machinery", line: "Commissioning qualification and conformity evidence at customer sites.", chips: ["CE marking", "IQ / OQ / PQ"], href: "/explorations/industries/industrial-machinery" },
    ],
    foot: "Each page carries the full map for that industry: roles, modules and trigger moments in its own vocabulary. Yours not listed? The obligations are industry-agnostic by design.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB, derived (Compliance anchors no module as Primary
   * Domain). The modules named by this domain's Pain Points via `Modules
   * Addressing`, plus the modules whose Descriptions cover validation, audit,
   * document control and regulatory obligation tracking. Grouped by Primary
   * Product; standards resolved from each module's External Standards
   * relation. DMS and QMS modules link to their live product pages; EH&S and
   * APQP & PPAP ship as Enhancements with no page yet, so their cards carry an
   * honest status label. */
  coverage: {
    heading: "The products that carry the compliance record.",
    lede: "The modules below serve this domain across the document, quality and safety products. Filter by the standard you are audited against.",
    standardFilters: [
      "ISO 9001",
      "ISO 13485",
      "21 CFR 820",
      "21 CFR Part 11",
      "EU GMP",
      "ICH Q10",
      "MDSAP",
      "ISO 45001",
      "ISO 14001",
      "IATF 16949",
    ],
    groups: [
      {
        slug: "dms",
        name: "Document Management System",
        tier: "Primary",
        promise: "The controlled record: procedures, revisions and the training each revision triggers, with Part 11 signature where it is required.",
        modules: [
          { name: "Document Control", blurb: "Controlled authoring, review, approval, distribution and periodic review, with version history, training linkage on revision and effective-date governance.", standards: ["ISO 9001", "21 CFR Part 11", "ISO 13485", "21 CFR 820", "EU GMP"], href: "/explorations/products/dms" },
          { name: "Change Control", blurb: "Change requests and document revisions routed through approval, with impact assessment, evidence and downstream propagation to training and distribution.", standards: ["ISO 9001", "21 CFR 820", "ICH Q10", "ISO 13485"], href: "/explorations/products/dms" },
          { name: "Training Management", blurb: "Competency assignment and completion tracking, with retraining triggered by a document revision or an audit finding.", standards: ["ISO 9001", "21 CFR 820", "ISO 13485"], href: "/explorations/products/dms" },
        ],
      },
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Primary",
        promise: "Where findings land: audits scheduled and answered, corrective actions verified before anything closes.",
        modules: [
          { name: "Audit Management", blurb: "Scheduling, finding tracking, response routing and effectiveness verification across internal, external and customer audits, with bounded access for outside participants.", standards: ["ISO 9001", "ISO 13485", "MDSAP"], href: "/explorations/products/qms" },
          { name: "Corrective Actions", blurb: "Root-cause acceptance, action plan, effectiveness verification and closure, related back to the event that raised it.", standards: ["ISO 13485", "21 CFR 820", "ICH Q10"], href: "/explorations/products/qms" },
        ],
      },
      {
        slug: "ehs",
        name: "Environment, Health and Safety",
        tier: "Secondary",
        promise: "The safety, permit and environmental leg, in development. Until it ships, Unifize coordinates over the EHS system you already run.",
        // Honest status: EH&S ships as an Enhancement (Products DB, Goal Zero
        // Pending) with no live page; label the cards rather than leave them
        // silently unlinked.
        modules: [
          { name: "EHS Audit Management", blurb: "Audit scheduling, finding tracking and response routing for environment, health and safety audits.", standards: ["ISO 45001", "ISO 14001"], soon: "In development" },
          { name: "Regulatory Compliance Tracking", blurb: "Regulatory obligations, due dates and evidence of compliance across health, safety and environmental rules.", standards: ["ISO 14001", "ISO 45001"], soon: "In development" },
          { name: "Permit Management", blurb: "A permit registry with renewal scheduling and obligation tracking, from air permits to hot work.", standards: ["ISO 14001"], soon: "In development" },
          { name: "Waste Management and Disposal Tracking", blurb: "Waste generation, classification, manifest tracking and disposal records.", standards: ["ISO 14001"], soon: "In development" },
          { name: "Environmental Monitoring", blurb: "Monitoring records for air, water and soil emissions and discharges, with threshold alerts and reporting.", standards: ["ISO 14001"], soon: "In development" },
          { name: "Incident Reporting and Management", blurb: "The incident lifecycle end to end: reporting, triage, investigation, corrective action, closure.", standards: ["ISO 45001"], soon: "In development" },
          { name: "Personal Protective Equipment Management", blurb: "Catalog, assignment, fit testing, inspection and replacement tracking on one record.", standards: ["ISO 45001"], soon: "In development" },
        ],
      },
      {
        slug: "apqp-ppap",
        name: "APQP & PPAP",
        tier: "Secondary",
        promise: "Protocols and reports for product and process qualification, in development.",
        modules: [
          { name: "Product & Process Validation", blurb: "Validation protocols, execution and reports for product and process validation.", standards: ["IATF 16949"], soon: "In development" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: the Domains row (the compliance and validation buyer is a distinct
   * buyer from the VP Quality) for the primary card; Product Personas DB for
   * Quality Manager (PPS-2) and EHS Manager (PPS-14, titles from its Title
   * Variants and daily activities); the Themes descriptions for the regulatory
   * affairs and systems-owner seats (Regulatory monitors and translates; IT
   * manages identities and audit trails; System Owners configure access). */
  personas: {
    heading: "Compliance is its own desk.",
    lede: "These decisions do not all land on the head of quality. Find your seat and see what changes when the reasoning stays on the record.",
    cards: [
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Compliance & validation",
        stake: "Owns the validated state",
        titles: ["Validation Manager", "CSV Lead", "Quality Compliance Manager", "Director of Quality Compliance"],
        value: "Validation status, access reviews and audit-trail evidence sit on the same governed thread as the change that disturbed them, so the posture is current instead of reassembled.",
        cares: "Validated state · Audit-trail integrity · Inspection readiness",
        worries: "Data integrity findings · Silent drift after a change · Answers that expire",
        primary: true,
      },
      {
        key: "quality-leadership",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Commits the dates on findings",
        titles: ["Quality Manager", "QA Manager", "Director of Quality", "Head of Quality"],
        value: "Findings, commitments and closure evidence arrive on one queue with their evidence already bound, instead of being chased across functions before an inspection.",
        cares: "Audit readiness · Commitment closure · Release confidence",
        worries: "Repeat findings · Side-channel decisions · Evidence rebuilds",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "regulatory-affairs",
        iconKey: "regulatory",
        name: "Regulatory affairs & trade",
        stake: "Translates the rules",
        titles: ["Regulatory Affairs Manager", "RA Director", "Trade Compliance Manager"],
        value: "A published change is assessed once against the footprint, then routed to the documents, validations and training it touches, with owners and dates on the record.",
        cares: "Impact assessment · Implementation windows · Licensing accuracy",
        worries: "Changes that land late · Customs holds · Untraceable scoping calls",
      },
      {
        key: "ehs",
        iconKey: "operations",
        name: "Environment, health & safety",
        stake: "Keeps the site compliant",
        titles: ["EHS Manager", "HSE Manager", "Safety Manager", "Environmental Manager", "EHS Director"],
        value: "Incidents, permits, findings and corrective actions run on the same governed record as quality, so a repeat pattern across the two is visible without a reconciliation.",
        cares: "Incident closure · Permit renewals · Regulatory reporting",
        worries: "Parallel trackers · Findings that stall · Reporting deadlines",
      },
      {
        key: "systems-owners",
        iconKey: "engineering",
        name: "IT & system owners",
        stake: "Owns the electronic record",
        titles: ["System Owner", "IT Compliance Lead", "GxP Systems Administrator"],
        value: "Access decisions, periodic reviews and audit-trail evidence are captured as they are made, so the review is a query rather than an extract-and-reconcile project.",
        cares: "Identity across systems · Audit-trail completeness · Access reviews",
        worries: "Shared accounts · Hybrid paper records · On-demand report pulls",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, the Urgent and High rows linked to Compliance.
   * Clocks condensed from Description / Regulatory Framework; owners from the
   * roles each Description names. The FDA 483 card opens the live trigger
   * page. */
  triggers: {
    heading: "When compliance becomes the headline.",
    lede: "Each of these starts a clock, and each routes into a governed workflow, so the response is coordinated on the record it will be judged by.",
    rows: [
      { name: "FDA Form 483 observation issued", clock: "15 working days to respond", severity: "Urgent", routesTo: "Audit Management · Corrective Actions", owner: "Director of Quality Compliance", href: "/explorations/triggers/fda-483" },
      { name: "Data integrity finding", clock: "Treated as systemic · ALCOA+ review", severity: "Urgent", routesTo: "Document Control · Corrective Actions", owner: "Quality Compliance · IT", },
      { name: "FDA Warning Letter received", clock: "15 working days · follow-on inspection", severity: "Urgent", routesTo: "Corrective Actions", owner: "VP Quality · Executive team" },
      { name: "Failed FDA inspection", clock: "Official Action Indicated · import-alert risk", severity: "Urgent", routesTo: "Audit Management", owner: "Executive team" },
      { name: "CSV audit finding", clock: "Audit-response clock · weeks", severity: "High", routesTo: "Change Control · Audit Management", owner: "Validation Manager · CSV Lead" },
      { name: "OSHA Process Safety Management gap", clock: "29 CFR 1910.119 · remediate before escalation", severity: "High", routesTo: "EHS Audit Management", owner: "EHS Director · Engineering" },
    ],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: MD_COEXISTENCE canonical context (systems of record, 21 CFR Part
   * 11 e-signature approval), adapted to the systems a compliance function
   * touches. The revalidation point matters most here: this is the buyer who
   * would have to run it. */
  coexistence: {
    heading: "It sits on the stack you already validated.",
    systemsOfRecord: ["QMS", "ERP", "PLM", "LIMS"],
    body: "Unifize replaces the ungoverned channels (email, spreadsheets, the compliance tracker kept beside the QMS) where the decision trace goes missing, not the validated systems that already passed inspection. Approvals are captured as a 21 CFR Part 11 e-signature. No rip-and-replace, and no revalidation of a system that already passed.",
    diagramCaption: "Unifize as the coordination layer over your QMS, ERP, PLM and LIMS.",
  },

  /* ------------------------------------------------ 09 · proof
   * source: MD_PROOF canonical data (medical-devices-canonical.ts). Real
   * evidence only: one signed customer baseline, labelled as the metric it
   * actually measures, plus two named references whose workstreams (document
   * control, training, change control) are the governed records this page is
   * about. No compliance-specific figure exists in Notion, and none is
   * implied. */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, labelled as what it measures, plus the named regulated manufacturers running these records on Unifize.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on coordination cost. The figure is anonymized; named references are shown separately.",
    },
    /* real films from the Website Customer Videos mirror whose Module tags
     * intersect this domain's work (governance in customer-films.ts) */
    filmTags: ["Audit Management", "Approval Workflows", "Document Management", "Training"],
    references: [
      {
        tag: "Named reference",
        name: MD_PROOF.customers[0].name,
        desc: MD_PROOF.customers[0].desc,
        link: { label: "Document control & training run in the DMS product →", href: "/explorations/products/dms" },
      },
      { tag: "Named reference", name: MD_PROOF.customers[1].name, desc: MD_PROOF.customers[1].desc },
    ],
    foot: { label: "All customer stories", href: "/explorations/resources/testimonials" },
  },

  /* ------------------------------------------------ compliance & trust
   * FACT-GATED, and this is the domain whose buyer asks for it first: Part 11
   * and Annex 11 posture, audit-trail integrity properties, e-signature
   * manifestation, SOC 2 / ISO 27001, the vendor validation package, and the
   * SaaS release and change-control policy. It renders the moment those facts
   * arrive from engineering and compliance, and never as authored marketing
   * copy. The one canonical claim available today (Part 11 e-signature
   * capture) is carried by the coexistence section above. */
  trust: null,

  /* ------------------------------------------------ build the case
   * FACT-GATED champion kit: pilot structure with exit criteria, the
   * implementation footprint, per-trigger one-pagers, the vendor audit packet
   * and ROI inputs. Fill when the artifacts are real; the numbers belong to
   * Ben and the implementation team. */
  caseKit: null,

  /* ------------------------------------------------ where teams go next
   * The land-and-expand journey: adjacency from this domain's Themes (audit,
   * change, field action) and the product catalog. Live pages get links; the
   * rest carry honest status notes. */
  growth: {
    heading: "Start with compliance. Don't stop there.",
    lede: "The same governed record runs the rest of the operation, so the system you land this quarter is the platform your next function joins.",
    steps: [
      { name: "Compliance", note: "You are here" },
      { name: "Quality", note: "Live · the quality solution", href: "/explorations/domains/quality" },
      { name: "Change control", note: "Live · the change control solution", href: "/explorations/domains/change-control" },
      { name: "Regulatory affairs", note: "Live · the regulatory affairs solution", href: "/explorations/domains/regulatory-affairs" },
      { name: "Document & records control", note: "Live · the DMS product", href: "/explorations/products/dms" },
      { name: "Environment, health & safety", note: "Product in development" },
    ],
  },

  close: {
    eyebrow: "Compliance on Unifize",
    heading: "Answer once. Keep the answer.",
    lede: "Bring one obligation, a validation finding, an audit response or a regulatory change, and see the decision trace on your own work in a 30-minute walkthrough.",
  },
};
