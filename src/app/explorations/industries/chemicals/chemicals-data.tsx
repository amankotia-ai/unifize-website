/* ============================================================================
 * Chemicals — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Chemicals" (id f3f5cfef..., ID-12). Economics
 *   (Companies 117, Employees 936K, Est Annual Tax Low/High), Competitive
 *   Landscape, Primary Fear Anchor, Opportunity, Proof Requirement, Proof
 *   Maturity, and Regulatory Vocabulary are canonical fields on that row.
 * source: Domains DB -> the coordination-domain taxonomy; module rosters are
 *   canonical-derived from the Domain descriptions + the industry's Regulatory
 *   Vocabulary. No Trigger Events are linked to Chemicals in Notion, so the
 *   "what's breaking" moments are drawn from the canonical Primary Fear Anchor
 *   and Regulatory Vocabulary (recognizable moments, not case evidence).
 * Framing / headlines are authored; nothing factual is invented, and no
 * per-event dollar figure is stated (Notion has none for this segment).
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const CHEMICALS: IndustryData = {
  slug: "chemicals",
  name: "Chemicals",

  meta: {
    title: "Chemicals · Unifize",
    description:
      "Your ERP records that a change shipped. It cannot reconstruct why. Unifize rebuilds the decision trace across quality, EHS, and the regulatory dossier, so it holds up in a GMP or REACH audit. The industry template, instanced on Chemicals.",
  },

  hero: {
    crumb: "Chemicals",
    titleLead: "Your change log shows what changed.",
    titleTurn: "Not why.",
    sub: "Built for specialty chemical manufacturers supplying pharma, food, and industrial markets, where a formulation or process change has to stay traceable across quality, EHS, and the regulatory dossier, and hold up in a GMP or REACH audit.",
    chips: ["REACH", "TSCA", "OSHA PSM", "GHS / CLP", "ICH Q7"],
    trustLabel: "Built for specialty and pharma-supply chemical makers",
  },

  difference: {
    heading: "The decision lives in the thread, not the change log.",
    lede: "Incumbents track a change-log entry. Unifize reconstructs the decision trace across every function a process or formulation change touched, and every regulatory notification it triggered.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Formulation change raised", who: "Process Eng", when: "T+0" },
      { t: "Impact assessment bound (REACH · SDS)", who: "Unifize", when: "T+0" },
      { t: "Cross-functional review", who: "Quality · EHS", when: "T+6d" },
      { t: "Approved · e-signature", who: "Quality Head", when: "T+10d" },
      { t: "Record sealed · change control", who: "Unifize", when: "T+10d" },
    ],
    trailFoot: "The same change, sealed with its REACH and SDS impact attached. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / change-control / ECN-2210",
    mobileLabel: "Change-control decision trace",
    mobileId: "ECN-2210 · raise → impact → review → approval → seal",
  },

  ingress: { role: "Quality, Ops, EHS, RA", modules: "Change, deviation, supplier, SDS", breaking: "483s, REACH, PSM incidents" },

  personas: {
    heading: "When the auditor is on site, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at a GMP or REACH audit.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Release confidence",
        titles: ["VP Quality", "Quality Manager", "QA/QC Manager", "Site Quality Lead"],
        value: "Every change and deviation decision stays reconstructable, so the trace is already there for the pharma-customer audit or the FDA inspection, not rebuilt under pressure.",
        cares: "Batch quality · change control · supplier qualification · audit outcomes",
        worries: "Batch record gaps · uncontrolled changes · overdue deviations · 483 observations",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Operations leadership",
        stake: "Decision velocity",
        titles: ["Plant Manager", "VP Operations", "Production Manager", "Site Director"],
        value: "Cross-functional disposition and change decisions move on one accountable thread, so production stops waiting on email to release or hold material.",
        cares: "Throughput · schedule stability · disposition speed · on-spec yield",
        worries: "Material on hold · firefighting · slow dispositions · rework",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Regulatory & Product Stewardship",
        stake: "The regulatory clock",
        titles: ["Regulatory Affairs Manager", "Product Stewardship Lead", "REACH / TSCA Manager"],
        value: "Substance changes flow into the REACH, TSCA, and SDS dossier and into customer notifications, so a change never outruns its regulatory paperwork.",
        cares: "REACH / TSCA currency · SDS / GHS accuracy · customer change notifications",
        worries: "Untracked substance changes · stale SDS · missed notifications · enforcement exposure",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "EHS & Compliance",
        stake: "Process safety",
        titles: ["EHS Director", "Process Safety Manager", "Compliance Manager"],
        value: "Process safety reviews, incident investigations, and management-of-change decisions are captured where they happen, so PSM and RMP evidence is a record, not a reconstruction.",
        cares: "OSHA PSM · EPA RMP · incident investigation · management of change",
        worries: "PSM gaps · unresolved incidents · Tier 1 reportable events · enforcement",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Process Development & Scale-up",
        stake: "Change velocity",
        titles: ["Process Development Lead", "R&D Manager", "Scale-up Engineer", "Formulation Lead"],
        value: "Formulation and process changes move fast with their rationale sealed to the record, so the reasoning survives scale-up and the next campaign.",
        cares: "Change velocity with control · scale-up · formulation discipline",
        worries: "Uncontrolled changes · long review loops · failed scale-up · mixed-revision runs",
      },
    ],
  },

  coverage: {
    heading: "Eight domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are audited against to see which controls evidence it.",
    standardFilters: ["REACH", "TSCA", "OSHA PSM", "ICH Q7", "21 CFR 211", "GHS / CLP"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your audit surface for pharma and food customers, where the decision trace either exists or is rebuilt.",
        modules: [
          { name: "Deviation Management", blurb: "Deviations captured where they happen, with the investigation and impact attached, not tracked in a parallel spreadsheet.", standards: ["ICH Q7", "21 CFR 211"] },
          { name: "CAPA & Effectiveness", blurb: "Corrective actions driven to verified effectiveness on one thread, closed before the next audit.", standards: ["ICH Q7"] },
          { name: "Batch Record & CoA Review", blurb: "Executed batch records and certificates of analysis reviewed on the thread that produced them, exceptions recorded in place.", standards: ["ICH Q7", "21 CFR 211"] },
          { name: "Nonconformance / MRB", blurb: "Nonconforming material owned, evidenced, and dispositioned so quarantined lots do not go dark.", standards: ["ICH Q7"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "Formulation, scale-up, and process development: gate decisions that lose their rationale when approvals live in email and the lab notebook.",
        modules: [
          { name: "Formulation Change Control", blurb: "Formulation and specification changes classified and propagated, with customer-notification impact assessed.", standards: ["ICH Q7", "REACH"] },
          { name: "Scale-up / Process Development", blurb: "Pilot-to-commercial qualification and validation held on one record across R&D, process, and operations.", standards: ["ICH Q7"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Secondary",
        promise: "Process and equipment change with multi-function sign-off, evidence packaging, and downstream customer and regulatory notification.",
        modules: [
          { name: "Management of Change (MOC)", blurb: "Process, equipment, and material changes with a durable record of what evidence was reviewed and what changed.", standards: ["OSHA PSM", "ICH Q7"] },
          { name: "Controlled Distribution", blurb: "Version-controlled distribution of specs and SDS to sites and customers, with confirmation of receipt.", standards: ["GHS / CLP"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "SDS, specifications, and procedures with version integrity across sites; a stale SDS in active use is an audit and enforcement exposure.",
        modules: [
          { name: "SDS & Specification Control", blurb: "Safety data sheets and specifications tied to an auditable approval record and a controlled distribution log.", standards: ["GHS / CLP", "REACH"] },
          { name: "Document Control", blurb: "Procedures in active use tied to an approval record and the current revision, across sites.", standards: ["ICH Q7", "21 CFR 211"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "Supplier qualification, approved-vendor-list management, and supplier change notification across the boundary.",
        modules: [
          { name: "Supplier Qualification", blurb: "Raw-material supplier qualification assembled and approved across the boundary, with a durable record.", standards: ["ICH Q7", "REACH"] },
          { name: "Supplier Change Notification", blurb: "Supplier and raw-material changes evaluated for spec, SDS, and customer-notification impact before they reach the batch.", standards: ["REACH", "ICH Q7"] },
          { name: "Incoming Inspection / MRB", blurb: "Receipt, inspection, and disposition tied together so quarantined material does not go dark.", standards: ["ICH Q7"] },
        ],
      },
      {
        slug: "operations",
        name: "Operations",
        tier: "Primary",
        promise: "Production holds, MRB backlog, and disposition decisions made in escalation calls with no durable decision trace.",
        modules: [
          { name: "Production Hold Disposition", blurb: "Holds released with the evidence and approver chain recorded at the moment the call is made.", standards: ["ICH Q7"] },
          { name: "Batch / Campaign Review", blurb: "Campaign records reviewed on the thread that produced them, ready for release.", standards: ["21 CFR 211"] },
        ],
      },
      {
        slug: "compliance",
        name: "Compliance",
        tier: "Secondary",
        promise: "Process safety and environmental compliance governed as a layer beside quality, owned by a distinct EHS buyer.",
        modules: [
          { name: "Process Safety Management (PSM)", blurb: "PSM elements, process hazard analyses, and MOC evidence held on a governed record.", standards: ["OSHA PSM"] },
          { name: "Incident Investigation", blurb: "Environmental and process-safety incidents investigated to corrective action, evidence to closure.", standards: ["OSHA PSM"] },
          { name: "Regulatory Dossier (REACH / TSCA)", blurb: "Substance registrations and materials documentation kept current as formulations change.", standards: ["REACH", "TSCA"] },
        ],
      },
      {
        slug: "regulatory-affairs",
        name: "Regulatory Affairs",
        tier: "Secondary",
        promise: "Customer change notifications and materials-compliance documentation assembled under end-customer and statutory pressure.",
        modules: [
          { name: "Customer Change Notification", blurb: "Change notifications to pharma and food customers that depend on accurate internal change tracking.", standards: ["ICH Q7"] },
          { name: "Materials Compliance (RoHS / REACH)", blurb: "RoHS, REACH, and food-contact documentation governed instead of managed by hand.", standards: ["REACH", "TSCA"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Statutory and customer deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "GMP Form 483 at a pharma-supply site", clock: "15 working days to respond · 21 CFR 211", severity: "Urgent", routesTo: "CAPA & Effectiveness", owner: "Quality" },
      { name: "OSHA PSM / process safety incident", clock: "OSHA enforcement clock · 29 CFR 1910.119", severity: "Urgent", routesTo: "Process Safety Management", owner: "EHS" },
      { name: "REACH / TSCA finding on an untracked change", clock: "dossier currency at risk", severity: "High", routesTo: "Regulatory Dossier", owner: "Regulatory" },
      { name: "Tier 1 SARA / environmental report due", clock: "statutory reporting clock", severity: "High", routesTo: "Incident Investigation", owner: "EHS" },
      { name: "Supplier change notification to a pharma customer", clock: "customer notification window", severity: "High", routesTo: "Supplier Change Notification", owner: "Supplier Quality" },
      { name: "Food Contact Notification / GRAS question", clock: "FDA inquiry · no documented hazard analysis", severity: "High", routesTo: "Regulatory Dossier", owner: "Regulatory" },
    ],
  },

  coexistence: {
    heading: "It sits on the ERP and EHS stack you already run.",
    systemsOfRecord: ["ERP", "EHS", "QMS", "LIMS"],
    approval: "an auditable e-signature",
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing. It does not displace SAP, your EHS platform, or your LIMS, and approvals are captured as an auditable e-signature. No rip-and-replace, and no disruption to the systems that already run the plant.",
    diagramCaption: "Unifize as the coordination layer over your ERP, EHS, QMS and LIMS.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Formulation / process change", coordination: "Propagates to specs, SDS, training, and customer notifications", owner: "Process / Quality", atRisk: "cycle time; a customer or regulatory notification missed" },
      { name: "Deviation → CAPA", coordination: "Quality, production, and EHS reconstruct the investigation across systems", owner: "Quality", atRisk: "weeks of cycle time; an audit finding if it ages" },
      { name: "Supplier qualification & change", coordination: "Quality and procurement assemble evidence across the boundary", owner: "Supplier Quality", atRisk: "material on hold; a spec or SDS gap" },
      { name: "Process safety / MOC review", coordination: "EHS, engineering, and operations sign off on change evidence", owner: "EHS", atRisk: "a reportable incident; PSM enforcement" },
      { name: "Batch record & CoA review", coordination: "Exceptions chased across QC, production, and the lab before release", owner: "Quality", atRisk: "material on hold; delayed shipment" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long change and deviation cycle times", "Delayed release and time to market"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in COGS"] },
      { type: "Compliance drag", items: ["Persistent overdue deviations and open changes", "Slow audit and customer-qualification proof", "Stale SDS and lagging dossier currency"] },
      { type: "Revenue risk", items: ["Quality escapes and off-spec lots", "Lost pharma or food customer qualification", "Enforcement action or import exposure"] },
      { type: "Working capital", items: ["Quarantined inventory and high working capital"] },
    ],
    economics: { companies: 117, employees: 936_000, annualTaxLow: 27_643_854, annualTaxHigh: 304_241_023 },
    stakesMeta: "Modeled across 117 companies and 0.94M employees in the segment",
  },

  validated: {
    eyebrow: "For your quality and EHS teams",
    headline: "Built to sit beside the systems that already run your plant, not to replace them.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the ERP, EHS platform, QMS, and LIMS you already run. It replaces the ungoverned channels where the decision trace goes missing, not your systems of record.",
      },
      {
        icon: "shield",
        label: "Auditable e-signatures",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is the audit trail your pharma and food customers ask for, not a reconstruction.",
      },
      {
        icon: "chat",
        label: "GMP and REACH questions, answered directly",
        body: "Batch record control, change-management impact, supplier qualification depth, and materials-compliance posture are walked through with your team before anything touches a controlled record.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Chemical buyers judge references against their own end-market profile. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a similar end-market profile: pharma supply versus food supply versus industrial commodity versus specialty performance.",
      "For pharma-supplying manufacturers, demonstrated GMP-grade traceability and audit-trail rigor.",
      "Quantified improvement in change-control cycle time, supplier-quality documentation completeness, deviation closure, or environmental incident-to-corrective-action cycle time.",
      "A reference that reflects your regulatory exposure, from REACH and TSCA to OSHA process safety.",
    ],
    maturityNote: "Proof maturity for chemicals is In Development: we will not attach a named reference or a metric to this page until a customer has signed off on it. What we will do on a call is reconstruct one of your own change or deviation decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the change log. Unifize reconstructs the decision.",
    lede: "Pick a change or deviation you could not replay at the last audit. We will reconstruct it live.",
  },
};
