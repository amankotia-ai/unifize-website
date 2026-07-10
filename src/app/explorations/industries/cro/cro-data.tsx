/* ============================================================================
 * Contract Research Organizations (CROs) — industry page data. All values trace
 * to Notion.
 *
 * source: Industries DB -> "Contract Research Organizations (CROs)". Economics
 *   (Companies 18, Employees 216K, Est Annual Tax Low/High), Competitive
 *   Landscape, Primary Fear Anchor, Opportunity, Proof Requirement, Proof
 *   Maturity, and Regulatory Vocabulary are canonical fields on that row. This is
 *   a clinical-trial services segment, not a manufacturer; the manufacturing
 *   template is adapted to clinical operations / clinical quality (same method as
 *   the Laboratories instance, a non-manufacturing services segment).
 * source: Domains DB -> the coordination-domain taxonomy, renamed to clinical
 *   function names; module rosters are canonical-derived from the Domain
 *   descriptions + the industry's Regulatory Vocabulary. No per-event dollar
 *   figure is stated (Notion has none for this segment); framing / headlines are
 *   authored.
 * source: Primary Fear Anchor + Opportunity -> the "what's breaking" moments
 *   (FDA BIMO inspection / Form 483, sponsor audit terminating an MSA, a clinical
 *   hold delaying a sponsor's IND/NDA, important protocol deviation, the
 *   SAE/SUSAR expedited-reporting clock, an eTMF inspection-readiness gap).
 * Proof Maturity is "Hypothesis" — the earliest stage. We do not yet have a named
 *   reference in this segment, and the proof section says so plainly.
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const CRO: IndustryData = {
  slug: "cro",
  name: "Contract research organizations",

  meta: {
    title: "Contract research organizations · Unifize",
    description:
      "Your eTMF records that the study closed. It cannot reconstruct why. Unifize rebuilds the decision trace across clinical quality, operations, and each sponsor, so it holds up at an FDA BIMO inspection and every sponsor audit, per study and per sponsor. The industry template, instanced on CROs.",
  },

  hero: {
    crumb: "Contract research organizations",
    titleLead: "Your eTMF says the study closed.",
    titleTurn: "Not why.",
    sub: "Built for CROs running simultaneous studies for multiple sponsors, where each sponsor audits your quality system independently, and every protocol deviation, CAPA closure, and trial master file has to stay inspection-ready per study and per sponsor at any time.",
    chips: ["ICH E6(R2) GCP", "21 CFR Part 11", "21 CFR 50 / 56", "eTMF", "ALCOA+"],
    trustLabel: "Built for GCP-regulated clinical research teams",
  },

  difference: {
    heading: "The decision lives in the thread, not the eTMF entry.",
    lede: "Incumbents track deviation and document status. Unifize reconstructs the decision trace across every function a protocol deviation touched, segregated by study and by sponsor: the reasoning an inspector or a sponsor auditor actually asks for.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Protocol deviation raised", who: "Clinical Ops", when: "T+0" },
      { t: "Investigation & impact bound", who: "Unifize", when: "T+0" },
      { t: "CAPA cross-functional review", who: "Clinical Quality", when: "T+7d" },
      { t: "Sponsor-ready review", who: "Sponsor Liaison", when: "T+14d" },
      { t: "Record sealed · ICH E6(R2)", who: "Unifize", when: "T+14d" },
    ],
    trailFoot: "The same protocol deviation, sealed with root cause and effectiveness attached, presentable to the sponsor whose study it belongs to. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / capa / DEV-2087",
    mobileLabel: "CAPA decision trace",
    mobileId: "DEV-2087 · protocol deviation → investigation → CAPA → sponsor-ready review → seal",
  },

  ingress: { role: "Quality, Clinical Ops, Regulatory, CSV", modules: "Protocol deviation, CAPA, eTMF, training", breaking: "483s, sponsor audits, clinical holds" },

  personas: {
    heading: "When the inspector or the sponsor auditor is in the room, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at an FDA BIMO inspection and every sponsor audit.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Clinical Quality",
        stake: "Inspection & audit confidence",
        titles: ["VP Quality", "Head of Clinical Quality", "GCP QA Lead", "Quality Manager"],
        value: "Every protocol deviation and CAPA decision stays reconstructable and segregated by study and by sponsor, so the trace is already there when the inspector or a sponsor auditor arrives, not rebuilt under a 483 clock.",
        cares: "Inspection outcomes · sponsor audit response · CAPA effectiveness · deviation closure",
        worries: "Overdue CAPAs · important protocol deviations · cross-study contamination · 483 observations",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Clinical Operations",
        stake: "Study delivery velocity",
        titles: ["Clinical Operations Director", "CTM", "Clinical Trial Manager", "Head of Clinical Operations"],
        value: "Deviations, queries, and dispositions move on one accountable thread across simultaneous studies, so a study stops waiting on an email to close a monitoring finding or resolve a query.",
        cares: "Study timelines · monitoring visit throughput · query resolution · data lock",
        worries: "Held queries · firefighting · slow dispositions · schedule slippage across studies",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Sponsor & Regulatory Liaison",
        stake: "The sponsor and regulatory clock",
        titles: ["Regulatory Affairs", "Sponsor Liaison", "Head of Regulatory Affairs", "RA Director"],
        value: "The audit response, safety report, and sponsor oversight trail stays current and traceable per sponsor, so an expedited safety report or a sponsor audit response never misses its clock.",
        cares: "Sponsor oversight · expedited safety reporting · audit response time · MSA quality obligations",
        worries: "Missed reporting windows · sponsor audit findings · MSA termination risk · pipeline pull",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "CSV & Data Integrity",
        stake: "Validated state",
        titles: ["CSV Lead", "Data Integrity Lead", "Computer System Validation Manager", "Compliance Manager"],
        value: "Audit trails and electronic signatures are held to ALCOA+ and the system ships with a 21 CFR Part 11 validation package, so the data-integrity evidence sponsors demand is a record, not a reconstruction.",
        cares: "21 CFR Part 11 · ALCOA+ · audit-trail integrity · IQ / OQ / PQ validation",
        worries: "Data-integrity findings · audit-trail gaps · a validation package a sponsor will not accept",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Study & Project Management",
        stake: "Multi-study coordination",
        titles: ["Project Director", "Study Manager", "Head of Project Management", "Program Lead"],
        value: "Study startup, monitoring, and close-out decisions move with their rationale sealed to the record per study, so evidence survives the handoff between visits, sites, and the data lock.",
        cares: "Study startup · monitoring cadence · site coordination · close-out and data lock",
        worries: "Uncoordinated simultaneous studies · long review loops · evidence lost between visits · slipped locks",
      },
    ],
  },

  coverage: {
    heading: "Seven domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are inspected and audited against to see which controls evidence it.",
    standardFilters: ["ICH E6(R2)", "21 CFR Part 11", "21 CFR 50 / 56", "ALCOA+", "GxP"],
    domains: [
      {
        slug: "quality",
        name: "Clinical Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your most visible inspection surface, where the protocol-deviation-to-effectiveness trace either exists or has to be rebuilt for the FDA and for each sponsor auditing independently.",
        modules: [
          { name: "Protocol Deviation Management", blurb: "Protocol deviations captured where they happen, classified as deviation or important protocol deviation, with the investigation and impact attached and segregated by study.", standards: ["ICH E6(R2)", "21 CFR 50 / 56"] },
          { name: "CAPA & Effectiveness", blurb: "Root cause to verified effectiveness on one accountable thread, closed before it ages into a 483 finding, presentable per sponsor.", standards: ["ICH E6(R2)"] },
          { name: "Audit Finding Response", blurb: "Findings, responses, and closures on a durable trail, ready for the FDA BIMO inspection and the sponsor audit.", standards: ["ICH E6(R2)"] },
          { name: "Internal Audit", blurb: "Internal GCP audits with responses and closures on a durable trail instead of a spreadsheet and an inbox.", standards: ["ICH E6(R2)"] },
        ],
      },
      {
        slug: "pharmacovigilance-safety",
        name: "Pharmacovigilance & Safety Reporting",
        tier: "Primary",
        promise: "Serious adverse event and expedited safety reporting run under hard reporting clocks; a missed window is a direct regulatory and sponsor-oversight exposure.",
        modules: [
          { name: "SAE / SUSAR Reporting", blurb: "Serious adverse events and suspected unexpected serious adverse reactions triaged and reported against their expedited-reporting clock, with the trail attached.", standards: ["ICH E6(R2)", "21 CFR Part 11"] },
          { name: "Pharmacovigilance Case Management", blurb: "Safety cases investigated and linked to CAPA on one trail, per study and per sponsor.", standards: ["ICH E6(R2)"] },
        ],
      },
      {
        slug: "etmf-document-control",
        name: "eTMF & Document Control",
        tier: "Primary",
        promise: "The electronic trial master file must sit at inspection-ready standard at any time; trial master file completeness is a top inspection and monitoring-visit finding.",
        modules: [
          { name: "eTMF Completeness & Inspection Readiness", blurb: "Trial master file completeness maintained at inspection-ready standard, with the reason and approver recorded, ready before a monitoring visit or a data lock.", standards: ["ICH E6(R2)", "21 CFR Part 11"] },
          { name: "Document Control", blurb: "SOPs, protocols, and forms in active use tied to an auditable approval record and the current revision.", standards: ["ICH E6(R2)", "21 CFR Part 11"] },
          { name: "Clinical Study Report Governance", blurb: "CSR authoring, review, and approval held on the thread that produced the evidence, with version integrity.", standards: ["ICH E6(R2)"] },
        ],
      },
      {
        slug: "training-competency",
        name: "Training & Competency",
        tier: "Secondary",
        promise: "GCP training and delegation currency are an inspection target; the window between a procedure change and training completion is an open compliance gap.",
        modules: [
          { name: "GCP Training", blurb: "GCP and protocol-specific training assigned, completed, and evidenced before the effective date, ready as an inspection target.", standards: ["ICH E6(R2)"] },
          { name: "Delegation & Authorization", blurb: "Delegation of authority and study-role authorization maintained current per study, so an unauthorized-role finding does not surface at audit.", standards: ["ICH E6(R2)"] },
        ],
      },
      {
        slug: "data-integrity-validation",
        name: "Data Integrity & Validation",
        tier: "Primary",
        promise: "ALCOA+ data integrity and 21 CFR Part 11 electronic records govern the audit trail and the database lock; sponsors will not accept system output without a validation package.",
        modules: [
          { name: "Data Integrity Governance", blurb: "Access controls, audit-trail integrity, and electronic-signature compliance held to ALCOA+.", standards: ["21 CFR Part 11", "ALCOA+"] },
          { name: "Computer System Validation (CSV)", blurb: "Validated-state evidence (IQ / OQ / PQ) and the GxP system-validation lifecycle held on a governed record, so the 21 CFR Part 11 validation package is ready for procurement.", standards: ["21 CFR Part 11", "GxP"] },
          { name: "Data / Database Lock", blurb: "Data lock and database lock decisions recorded with the query resolution and approver in place at the moment the call is made.", standards: ["ICH E6(R2)", "ALCOA+"] },
        ],
      },
      {
        slug: "vendor-site-qualification",
        name: "Vendor & Site Qualification",
        tier: "Secondary",
        promise: "The coordination tax across organisational boundaries: vendor qualification and site qualification visits assembled and approved with a durable record.",
        modules: [
          { name: "Vendor Qualification", blurb: "Vendor and subcontractor qualification assembled and approved across the boundary, with a durable record.", standards: ["ICH E6(R2)"] },
          { name: "Site Qualification Visits", blurb: "Site qualification, pre-study, and close-out visit reports held on one record with the findings and follow-up attached.", standards: ["ICH E6(R2)"] },
        ],
      },
      {
        slug: "sponsor-audit-management",
        name: "Sponsor & Audit Management",
        tier: "Primary",
        promise: "Every sponsor can audit the quality system independently and each has different expectations; per-sponsor audit response and MSA quality obligations must be traceable and client-presentable at any time.",
        modules: [
          { name: "Sponsor Audit Response", blurb: "Per-sponsor audit responses assembled on one trail, segregated so one sponsor never sees another's study, presentable at any time.", standards: ["ICH E6(R2)"] },
          { name: "Sponsor Oversight", blurb: "Sponsor oversight activities and MSA quality obligations governed with active lifecycle tracking, not a folder of stale PDFs.", standards: ["ICH E6(R2)"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Statutory and sponsor deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "FDA Form 483 after a BIMO inspection", clock: "days to respond · deviation docs, CAPA closure, eTMF", severity: "Urgent", routesTo: "CAPA & Effectiveness", owner: "Clinical Quality" },
      { name: "Sponsor audit failure risking MSA termination", clock: "MSA termination risk · pipeline pull", severity: "Urgent", routesTo: "Sponsor Audit Response", owner: "Clinical Quality" },
      { name: "Clinical hold delaying a sponsor IND / NDA", clock: "immediate · sponsor timeline penalty", severity: "Urgent", routesTo: "Protocol Deviation Management", owner: "Clinical Quality / Sponsor Liaison" },
      { name: "SAE / SUSAR expedited-reporting clock", clock: "expedited safety-reporting window", severity: "Urgent", routesTo: "SAE / SUSAR Reporting", owner: "Sponsor & Regulatory Liaison" },
      { name: "Important protocol deviation", clock: "under sponsor oversight clock", severity: "High", routesTo: "Protocol Deviation Management", owner: "Clinical Operations" },
      { name: "eTMF inspection-readiness gap before a monitoring visit or data lock", clock: "under inspection-readiness clock", severity: "High", routesTo: "eTMF Completeness & Inspection Readiness", owner: "Study & Project Management" },
    ],
  },

  coexistence: {
    heading: "It sits on the eTMF and CTMS you already run, not on top of them.",
    systemsOfRecord: ["eTMF", "CTMS", "QMS", "EDC"],
    approval: "a 21 CFR Part 11 e-signature",
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing. It does not displace Veeva Vault eTMF, Vault CTMS, or TrackWise, and approvals are captured as a 21 CFR Part 11 e-signature. The thread-based structure segregates evidence per study and per sponsor, so coexistence is the point: no rip-and-replace of a sponsor-mandated Vault, and no cross-study contamination.",
    diagramCaption: "Unifize as the coordination layer over your eTMF, CTMS, QMS and EDC.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Protocol deviation → CAPA", coordination: "Clinical operations, quality, and the sponsor liaison reconstruct the investigation across systems", owner: "Clinical Quality", atRisk: "weeks of cycle time; a 483 if it ages" },
      { name: "Sponsor audit response", coordination: "Every sponsor audits independently; evidence is assembled and segregated per sponsor under a response clock", owner: "Clinical Quality", atRisk: "MSA termination; adjacent sponsors pulling pipeline" },
      { name: "SAE / SUSAR expedited report", coordination: "Safety, clinical, and regulatory triage the case against a hard reporting window", owner: "Sponsor & Regulatory Liaison", atRisk: "a missed expedited-reporting clock" },
      { name: "eTMF inspection readiness", coordination: "Study and quality reconcile trial master file completeness before a monitoring visit or data lock", owner: "Study & Project Management", atRisk: "an inspection-readiness gap; a monitoring finding" },
      { name: "Data / database lock", coordination: "Clinical operations and data management reconcile query resolution across simultaneous studies", owner: "Clinical Operations", atRisk: "a slipped lock; a delayed clinical study report" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long protocol-deviation and CAPA cycle times", "Delayed query resolution and data lock across studies"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in cost per study"] },
      { type: "Compliance drag", items: ["Persistent overdue CAPAs and open protocol deviations", "Slow BIMO-inspection and sponsor-audit proof", "Lagging data-integrity and audit-trail evidence"] },
      { type: "Revenue risk", items: ["Sponsor audit failure and MSA termination", "A clinical hold delaying a sponsor's IND or NDA", "A single public 483 causing adjacent sponsors to pull pipeline"] },
      { type: "Working capital", items: ["Rework and idle study capacity across simultaneous studies"] },
    ],
    economics: { companies: 18, employees: 216_000, annualTaxLow: 3_245_043, annualTaxHigh: 33_539_012 },
    stakesMeta: "Modeled across 18 companies and 216K employees in the segment",
  },

  validated: {
    eyebrow: "For your CSV and data-integrity teams",
    headline: "Built to sit beside your eTMF, and to survive the FDA inspection and every sponsor audit that assesses it.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the eTMF, CTMS, QMS, and EDC you already run, including a sponsor-mandated Veeva Vault. It replaces the ungoverned channels where the decision trace goes missing, and the thread structure segregates evidence per study and per sponsor.",
      },
      {
        icon: "shield",
        label: "Part 11 and ALCOA+ by default",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is the audit trail: ALCOA+ by construction, and the 21 CFR Part 11 validation package (IQ / OQ / PQ) that sponsors require is ready for procurement, not reconstructed after the fact.",
      },
      {
        icon: "chat",
        label: "Your sponsor's and inspector's questions, answered directly",
        body: "Protocol-deviation and CAPA closure, per-sponsor data segregation, audit-trail integrity, and eTMF inspection readiness are walked through with your team, and built to survive the FDA BIMO inspection and every independent sponsor audit.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "CRO buyers judge references against their own GCP and validation discipline, and are highly sensitive to per-sponsor confidentiality. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a CRO of similar therapeutic focus and operating model: full-service versus functional service provider, early phase versus late phase, US versus global, sponsor-dedicated versus multi-sponsor.",
      "Demonstration that the system maintains per-sponsor data segregation and confidentiality, with per-study audit-ready presentation that one sponsor never sees another's study.",
      "A 21 CFR Part 11 validation package (IQ / OQ / PQ), a hard procurement requirement, plus a vendor capability assessment that addresses ALCOA+ data integrity.",
      "Quantified improvement in deviation closure cycle time, CAPA effectiveness rate, sponsor audit observation response time, or trial master file completeness at the inspection-ready threshold.",
    ],
    maturityNote: "Proof maturity for CROs is at the Hypothesis stage, the earliest we have: we do not yet have a named reference customer in this segment, and we will not attach a reference or a metric to this page until a CRO customer has signed off on it. We are candid about that. What we will do on a call is reconstruct one of your own protocol-deviation or CAPA decisions live, segregated the way a sponsor audit demands.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the eTMF entry. Unifize reconstructs the decision, per study and per sponsor.",
    lede: "Pick a protocol deviation or CAPA you could not replay at the last BIMO inspection or sponsor audit. We will reconstruct it live.",
  },
};
