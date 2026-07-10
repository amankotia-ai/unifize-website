/* ============================================================================
 * Pharmaceuticals — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Pharmaceuticals" (id 34f58e4f..., ID-6). Economics
 *   (Companies 74, Employees 1.332M, Est Annual Tax Low/High), Competitive
 *   Landscape, Primary Fear Anchor, Opportunity, Proof Requirement, Proof
 *   Maturity, and Regulatory Vocabulary are canonical fields on that row.
 * source: Trigger Events DB (19 linked to Pharmaceuticals) -> Name / Severity /
 *   Time Sensitivity / Regulatory Framework. The clocks condense those fields.
 * source: Domains DB -> the coordination-domain taxonomy; per-domain module
 *   rosters are canonical-derived from the Domain descriptions + the industry's
 *   Regulatory Vocabulary (same method as the Medical Devices module map).
 * Framing / headlines are authored on top of the canonical facts; nothing
 * factual is invented, and no per-event dollar figure is stated (Notion has none
 * for this segment) — the canonical per-company coordination tax carries it.
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const PHARMACEUTICALS: IndustryData = {
  slug: "pharmaceuticals",
  name: "Pharmaceuticals",

  meta: {
    title: "Pharmaceuticals · Unifize",
    description:
      "Your QMS records that a batch was released. It cannot reconstruct why. Unifize rebuilds the decision trace across quality, regulatory, and operations, so it holds up at an FDA inspection. The industry template, instanced on Pharmaceuticals.",
  },

  hero: {
    crumb: "Pharmaceuticals",
    titleLead: "Your batch record shows the lot was released.",
    titleTurn: "Not why.",
    sub: "Built for commercial pharma sponsors and CDMOs, where every deviation, every change, and every batch decision has to stay traceable across quality, regulatory, and operations, and survive an FDA inspection.",
    chips: ["21 CFR 210/211", "21 CFR Part 11", "ICH Q10", "EU GMP Annex 11", "EU Annex 1"],
    trustLabel: "Built for GxP-regulated pharma teams",
  },

  difference: {
    heading: "The decision lives in the thread, not the batch record.",
    lede: "Incumbents track deviation and document status. Unifize reconstructs the decision trace across every function a change touched: the reasoning an inspector actually asks for.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Deviation raised", who: "Manufacturing", when: "T+0" },
      { t: "Investigation & impact bound", who: "Unifize", when: "T+0" },
      { t: "CAPA cross-functional review", who: "Quality · RA", when: "T+8d" },
      { t: "Approved · Part 11 e-signature", who: "Qualified Person", when: "T+14d" },
      { t: "Record sealed · EU Annex 11", who: "Unifize", when: "T+14d" },
    ],
    trailFoot: "The same deviation, sealed as a 21 CFR Part 11 audit trail. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / capa / DEV-4471",
    mobileLabel: "CAPA decision trace",
    mobileId: "DEV-4471 · deviation → investigation → CAPA → Part 11 approval → seal",
  },

  ingress: { role: "Quality, Ops, RA, CSV", modules: "Deviation, CAPA, APR, training", breaking: "483s, recalls, data integrity" },

  personas: {
    heading: "When the inspector is in the room, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at inspection.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Release confidence",
        titles: ["VP Quality", "Head of Quality", "QA Director", "Quality Manager", "Qualified Person"],
        value: "Every release and deviation decision stays reconstructable, so the trace is already there when the inspector walks in, not rebuilt under a 483 clock.",
        cares: "Release confidence · inspection outcomes · deviation closure · CAPA effectiveness",
        worries: "Overdue CAPAs · repeat deviations · data-integrity findings · 483 observations",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Operations leadership",
        stake: "Decision velocity",
        titles: ["COO", "VP Operations", "Site Head", "Plant Manager"],
        value: "Cross-functional release and disposition decisions move on one accountable thread, so batches stop sitting on hold waiting for an email.",
        cares: "Batch release · schedule stability · disposition speed · right-first-time",
        worries: "Batches on hold · firefighting · slow dispositions · trapped inventory",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Regulatory Affairs",
        stake: "The regulatory clock",
        titles: ["Head of Regulatory Affairs", "VP Regulatory", "RA Director"],
        value: "The submission, CMC change, and label trail stays current and traceable, so post-approval notifications and multi-market labels never miss their clock.",
        cares: "CMC change notifications · multi-market label currency · submission timelines",
        worries: "Missed notification windows · label version errors · incomplete dossiers",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Compliance & Validation",
        stake: "Validated state",
        titles: ["Validation Manager", "CSV Lead", "QA Compliance Manager", "Data Integrity Lead"],
        value: "Approvals are captured as Part 11 and Annex 11 e-signatures and the audit trail is the record itself, so it clears CSV and holds ALCOA+ by default.",
        cares: "CSV / GAMP 5 · 21 CFR Part 11 · audit-trail integrity · ALCOA+",
        worries: "Uncontrolled changes · revalidation triggers · data-integrity gaps",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Tech Transfer & NPI",
        stake: "Change velocity",
        titles: ["VP Technical Operations", "Head of MSAT", "Tech Transfer Lead", "Process Development"],
        value: "Process and formulation changes move fast with their rationale sealed to the record, so the reasoning survives scale-up, tech transfer, and the next revision.",
        cares: "Change velocity with control · tech transfer · scale-up discipline",
        worries: "Uncontrolled changes · long review loops · failed transfers · mixed-revision batches",
      },
    ],
  },

  coverage: {
    heading: "Ten domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are inspected against to see which controls evidence it.",
    standardFilters: ["21 CFR 210/211", "21 CFR Part 11", "ICH Q7", "ICH Q10", "EU Annex 11", "EU Annex 1"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your most visible inspection surface, where the decision trace either exists or has to be rebuilt.",
        modules: [
          { name: "Deviation Management", blurb: "Planned and unplanned deviations captured where they happen, classified minor / major / critical, with the investigation and impact attached.", standards: ["21 CFR 210/211", "ICH Q10"] },
          { name: "CAPA & Effectiveness", blurb: "Investigation to verified effectiveness on one accountable thread, closed before it ages into a 483 finding.", standards: ["21 CFR 210/211", "ICH Q10"] },
          { name: "OOS / OOT Investigation", blurb: "Out-of-specification and out-of-trend results investigated on a governed trail, root cause to disposition.", standards: ["21 CFR 210/211"] },
          { name: "Batch Record Review & Release", blurb: "Executed batch record review held on the thread that produced it, exceptions and QP release recorded in place.", standards: ["21 CFR 210/211", "EU Annex 1"] },
          { name: "Internal Audit", blurb: "Findings, responses, and closures on a durable trail instead of a spreadsheet and an inbox.", standards: ["ICH Q10"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "CMC, formulation, process development, and tech transfer: stage-gated decisions that lose their rationale when approvals live in email and review meetings.",
        modules: [
          { name: "CMC Change Control", blurb: "Formulation, process, and specification changes classified and propagated, with post-approval notification impact assessed.", standards: ["ICH Q7", "21 CFR 210/211"] },
          { name: "Tech Transfer / Scale-up", blurb: "Simultaneous qualification, validation, and documentation across R&D, MSAT, and manufacturing on one record.", standards: ["ICH Q10"] },
          { name: "Process Validation (PPQ)", blurb: "Process performance qualification evidence assembled and approved as it is generated, not reconstructed for the filing.", standards: ["21 CFR 210/211", "EU Annex 1"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Secondary",
        promise: "Change classification and multi-function sign-off, evidence packaging, and version-controlled distribution to sites and CMOs.",
        modules: [
          { name: "Change Control (Major / Minor)", blurb: "Multi-function sign-off with a durable record of what evidence was reviewed and what changed between revisions.", standards: ["21 CFR 210/211", "ICH Q10"] },
          { name: "Controlled Distribution", blurb: "Version-controlled distribution to manufacturing sites and CMOs, with confirmation of receipt.", standards: ["EU Annex 11"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "Authoring, review, approval, and obsolescence with version integrity across sites: the version-mismatch failure mode is a top FDA finding.",
        modules: [
          { name: "Document Control", blurb: "Documents in active use tied to an auditable approval record and a controlled distribution log.", standards: ["21 CFR Part 11", "21 CFR 210/211"] },
          { name: "Periodic Review", blurb: "Review cycles that surface when due, with the training linkage intact.", standards: ["ICH Q10"] },
        ],
      },
      {
        slug: "training-competency",
        name: "Training & Competency",
        tier: "Secondary",
        promise: "Every SOP change triggers a training cascade; the window between procedure effectivity and training completion is an open compliance gap and a direct 483 finding.",
        modules: [
          { name: "Training Cascades", blurb: "The same workflow that releases a new SOP creates the training cascade, assignment, completion, and proof, before the effective date.", standards: ["21 CFR 210/211"] },
          { name: "Competency / Re-qualification", blurb: "Re-qualification proof maintained across shifts and sites, ready as an inspection target.", standards: ["ICH Q10"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "The coordination tax across organisational boundaries: API and excipient qualification, quality agreements, and supplier change notification.",
        modules: [
          { name: "Supplier Qualification", blurb: "API and excipient supplier qualification assembled and approved across the boundary, with a durable record.", standards: ["ICH Q7"] },
          { name: "Supplier Change Notification (SCN)", blurb: "Supplier and CMO changes evaluated for post-approval change impact before they reach the batch.", standards: ["ICH Q7", "21 CFR 210/211"] },
          { name: "Quality Agreements", blurb: "GxP contract relationships with active lifecycle governance, not a folder of stale PDFs.", standards: ["ICH Q10"] },
        ],
      },
      {
        slug: "post-market-recall",
        name: "Post-Market & Recall",
        tier: "Secondary",
        promise: "Complaint, field alert, and recall workflows running in parallel under hard statutory deadlines: the highest-coordination-tax event profile.",
        modules: [
          { name: "Complaint Management", blurb: "Complaints triaged, investigated, and linked to CAPA on one trail.", standards: ["21 CFR 210/211"] },
          { name: "Field Alert / BPDR", blurb: "Field alert and biological product deviation reports governed against their FDA clock.", standards: ["21 CFR 210/211"] },
          { name: "Recall Execution", blurb: "Scope, notifications, returns, and multi-authority filings coordinated as one event.", standards: ["21 CFR 210/211"] },
        ],
      },
      {
        slug: "regulatory-affairs",
        name: "Regulatory Affairs",
        tier: "Secondary",
        promise: "Post-approval change notifications and multi-market label currency assembled under hard statutory deadlines that cannot slip.",
        modules: [
          { name: "Label Governance", blurb: "Market-specific label version currency governed instead of tracked in 20-country spreadsheets.", standards: ["EU Annex 11"] },
          { name: "Post-Approval Change Notification", blurb: "CMC change notifications to FDA and EMA that depend on accurate internal change tracking.", standards: ["ICH Q7"] },
        ],
      },
      {
        slug: "periodic-review",
        name: "Periodic Review & Data Governance",
        tier: "Secondary",
        promise: "APR / PQR is a fixed-calendar obligation that cannot be deferred, and data-integrity findings are a separate, related gap.",
        modules: [
          { name: "Annual Product Review (APR / PQR)", blurb: "The fixed-calendar assembly of production, QA, stability, complaints, and supplier data, from one place, not five.", standards: ["21 CFR 210/211", "ICH Q7"] },
          { name: "Data Integrity Governance", blurb: "Access controls, audit-trail integrity, and electronic-signature compliance held to ALCOA+.", standards: ["21 CFR Part 11", "EU Annex 11"] },
        ],
      },
      {
        slug: "compliance",
        name: "Compliance",
        tier: "Secondary",
        promise: "CSV validation and computerised-system compliance, often governed as a layer beside the QMS and owned by a distinct buyer.",
        modules: [
          { name: "Computer System Validation (CSV)", blurb: "Validated-state evidence (IQ / OQ / PQ) and the GAMP 5 lifecycle held on a governed record.", standards: ["21 CFR Part 11", "EU Annex 11"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Statutory deadlines, not customer outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "FDA Warning Letter received", clock: "15 working days to respond", severity: "Urgent", routesTo: "CAPA & Effectiveness", owner: "Quality" },
      { name: "FDA Form 483 observation issued", clock: "days to respond · 21 CFR 210/211", severity: "Urgent", routesTo: "CAPA & Effectiveness", owner: "Quality" },
      { name: "Failed FDA inspection", clock: "immediate · import-alert risk", severity: "Urgent", routesTo: "Deviation / CAPA", owner: "Quality / RA" },
      { name: "Data integrity finding", clock: "enterprise ALCOA+ review", severity: "Urgent", routesTo: "Data Integrity Governance", owner: "Compliance & Validation" },
      { name: "Recall scope definition required", clock: "21 CFR Part 7 clock", severity: "Urgent", routesTo: "Recall Execution", owner: "Quality / RA" },
      { name: "APR / PQR deadline", clock: "fixed annual deadline · 211.180(e)", severity: "High", routesTo: "Annual Product Review", owner: "Quality" },
      { name: "Change-driven training cascade gap", clock: "days · effectivity vs completion", severity: "High", routesTo: "Training Cascades", owner: "Quality / Training" },
      { name: "CSV audit finding", clock: "under audit clock · EU Annex 11", severity: "High", routesTo: "Computer System Validation", owner: "Compliance & Validation" },
    ],
  },

  coexistence: {
    heading: "It sits on the GxP stack you have already validated.",
    systemsOfRecord: ["QMS", "ERP", "LIMS", "MES"],
    approval: "a 21 CFR Part 11 e-signature",
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing. It does not displace Veeva, MasterControl, or TrackWise, and approvals are captured as a 21 CFR Part 11 e-signature. No rip-and-replace, and no revalidation of a system that already passed.",
    diagramCaption: "Unifize as the coordination layer over your QMS, ERP, LIMS and MES.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Deviation → CAPA", coordination: "Quality, manufacturing, and RA reconstruct the investigation across systems", owner: "Quality", atRisk: "weeks of cycle time; a 483 if it ages" },
      { name: "CMC / process change", coordination: "Propagates to documents, validation, training, and the batch record", owner: "Tech Ops / Quality", atRisk: "months to implement; notification exposure" },
      { name: "Batch record review & release", coordination: "Exceptions chased across QA, production, and the lab before QP release", owner: "Quality", atRisk: "days per lot; trapped inventory" },
      { name: "APR / PQR assembly", coordination: "Production, QA, stability, complaints, and supplier data pulled from 5 to 7 systems", owner: "Quality / RA", atRisk: "a fixed annual deadline that cannot slip" },
      { name: "Training cascade on change", coordination: "Every SOP change fans out to assignment, completion, and proof across sites", owner: "Quality / Training", atRisk: "an open gap between effectivity and completion" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long deviation and change cycle times", "Delayed batch release and time to market"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in COGS"] },
      { type: "Compliance drag", items: ["Persistent overdue CAPAs and open deviations", "Slow inspection and customer-audit proof", "Lagging data-integrity and trend detection"] },
      { type: "Revenue risk", items: ["Quality escapes and rejected batches", "Expanded recall scope", "Import alert or lost market access"] },
      { type: "Working capital", items: ["Trapped inventory and high working capital"] },
    ],
    economics: { companies: 74, employees: 1_332_000, annualTaxLow: 80_660_006, annualTaxHigh: 853_742_364 },
    stakesMeta: "Modeled across 74 companies and 1.33M employees in the segment",
  },

  validated: {
    eyebrow: "For your validation team",
    headline: "Built to live inside a GxP-validated environment, not one you have to re-validate.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the QMS, ERP, LIMS, and MES you have already validated. It replaces the ungoverned channels where the decision trace goes missing, not your systems of record.",
      },
      {
        icon: "shield",
        label: "Part 11 and Annex 11 e-signatures",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is the audit trail: ALCOA+ by construction, not reconstructed after the fact.",
      },
      {
        icon: "chat",
        label: "Your CSV questions, answered directly",
        body: "IQ / OQ / PQ, the GAMP 5 lifecycle, audit-trail integrity, and data-integrity posture are walked through with your validation team before anything touches a GxP record.",
      },
    ],
    cta: "Talk to our validation team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Pharmaceutical buyers judge references against their own validation discipline. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a similarly regulated manufacturer at a similar profile: commercial sponsor versus CDMO, sterile versus solid dose, small molecule versus biologic, US versus EU markets.",
      "A documented 21 CFR Part 11 validation package and a current FDA inspection history with no critical observations on electronic records or audit trail.",
      "Quantified improvement in deviation closure cycle time, CAPA effectiveness rate, change-control implementation time, or batch-record review and release time.",
      "Demonstration that the system survives an unannounced FDA Pre-Approval Inspection or a routine GMP inspection.",
    ],
    maturityNote: "Proof maturity for pharma is In Development: we will not attach a named reference or a metric to this page until a customer has signed off on it. What we will do on a call is reconstruct one of your own decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track batch records. Unifize reconstructs the decision.",
    lede: "Pick a deviation or change you could not replay at the last inspection. We will reconstruct it live.",
  },
};
