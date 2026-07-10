/* ============================================================================
 * Aerospace — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Aerospace". Economics (Companies 63, Employees
 *   1.386M, Est Annual Tax Low/High), Competitive Landscape, Primary Fear
 *   Anchor, Opportunity, Proof Requirement, Proof Maturity ("Advocacy"), and
 *   Regulatory Vocabulary are canonical fields on that row.
 * source: Domains DB -> the coordination-domain taxonomy; module rosters are
 *   canonical-derived from the Domain descriptions + the industry's Regulatory
 *   Vocabulary (same method as the Medical Devices module map). No Trigger
 *   Events are linked to Aerospace in Notion, so the "what's breaking" moments
 *   are drawn from the canonical Primary Fear Anchor + Opportunity + Regulatory
 *   Vocabulary (recognizable moments, not case evidence).
 * Framing / headlines are authored; nothing factual is invented, and no
 * per-event dollar figure is stated (Notion has none for this segment) — the
 * canonical per-company coordination tax carries it.
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const AEROSPACE: IndustryData = {
  slug: "aerospace",
  name: "Aerospace",

  meta: {
    title: "Aerospace · Unifize",
    description:
      "Your PLM remembers the part shipped. It cannot reconstruct why. Unifize rebuilds the decision trace across engineering, quality, and the customer program, so it holds up at an AS9100 or NADCAP audit. The industry template, instanced on Aerospace.",
  },

  hero: {
    crumb: "Aerospace",
    titleLead: "Your FAI signed off the first article.",
    titleTurn: "Not why.",
    sub: "Built for aerospace and defense suppliers, where every engineering change, first article, and special-process decision has to stay traceable across engineering, quality, and the customer program, and survive an AS9100 audit, a NADCAP assessment, or a customer source inspection.",
    chips: ["AS9100", "NADCAP", "FAA Part 21", "FAI · AS9102", "AS6081"],
    trustLabel: "Built for AS9100-certified aerospace and defense suppliers",
  },

  difference: {
    heading: "The decision lives in the thread, not the change record.",
    lede: "Incumbents track a configuration state and a change-record entry. Unifize reconstructs the decision trace across every function an engineering change touched, from design authority to first article to the shop floor.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Engineering change raised", who: "Engineering", when: "T+0" },
      { t: "Configuration & FAI impact bound (AS9102)", who: "Unifize", when: "T+0" },
      { t: "Cross-functional review", who: "Quality · Program", when: "T+7d" },
      { t: "Approved · e-signature", who: "Design Authority", when: "T+12d" },
      { t: "Record sealed · AS9100", who: "Unifize", when: "T+12d" },
    ],
    trailFoot: "The same change, sealed with its configuration and first-article impact attached. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / change-control / ECO-3180",
    mobileLabel: "Change-control decision trace",
    mobileId: "ECO-3180 · raise → configuration/FAI → review → approval → seal",
  },

  ingress: { role: "Quality, Ops, Program, Engineering", modules: "ECO, FAI, supplier, MRB", breaking: "NADCAP findings, source inspection, ADs" },

  personas: {
    heading: "When the assessor is on site, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at an AS9100 audit, a NADCAP assessment, or a customer source inspection.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Airworthy release confidence",
        titles: ["VP Quality", "Head of Quality", "Quality Director", "Quality Manager", "Chief Inspector"],
        value: "Every change, nonconformance, and MRB decision stays reconstructable, so the trace is already there for the AS9100 audit or the NADCAP assessment, not rebuilt under a 90-day accreditation clock.",
        cares: "Audit outcomes · NADCAP accreditation · nonconformance closure · MRB disposition",
        worries: "NADCAP special-process findings · overdue CAPAs · repeat nonconformances · approved-supplier-list removal",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Operations & Production",
        stake: "Decision velocity",
        titles: ["COO", "VP Operations", "Plant Manager", "Production Manager"],
        value: "Cross-functional disposition and MRB decisions move on one accountable thread, so production stops waiting on email to release, hold, or rework parts before a source inspection.",
        cares: "Throughput · schedule stability · MRB disposition speed · source-inspection readiness",
        worries: "Parts on hold · firefighting · slow dispositions · production stopped at source inspection",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Program & Customer Quality",
        stake: "The program clock",
        titles: ["Program Quality Manager", "Customer Quality Lead", "CDRL / Deliverables Manager"],
        value: "Change control, first article inspection, CDRL deliverables, and program quality plans stay synchronized across engineering, quality, and the customer, so a long-cycle program never falls out of currency before a source inspection.",
        cares: "Program quality plans · CDRL currency · FAI deliverables · customer notifications",
        worries: "Out-of-currency documentation · missed CDRL · failed source inspection · approved-supplier-list removal",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Quality Systems & Audit",
        stake: "Audit readiness",
        titles: ["Quality Systems Manager", "AS9100 Management Representative", "Internal Audit Lead", "Compliance Manager"],
        value: "AS9100, NADCAP special-process, and government-audit evidence is captured where the decision happens, so objective evidence is a record, not a reconstruction assembled against an assessment deadline.",
        cares: "AS9100 · NADCAP · FAA Part 21 · DCSA / QAR oversight · objective evidence",
        worries: "Documentation gaps · special-process findings · production-approval suspension · government audit findings",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Engineering & Configuration",
        stake: "Change velocity",
        titles: ["Chief Engineer", "Configuration Manager", "Design Authority", "ECO / Change Lead"],
        value: "Engineering changes and configuration decisions move fast with their rationale sealed to the record, so design authority intent survives to the shop floor, the first article, and the next revision.",
        cares: "Change velocity with control · configuration management · key characteristics · design authority",
        worries: "Uncontrolled changes · long review loops · configuration drift · mixed-revision builds",
      },
    ],
  },

  coverage: {
    heading: "Eight domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are audited against to see which controls evidence it.",
    standardFilters: ["AS9100", "NADCAP", "FAA Part 21", "FAI · AS9102", "AS6081"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your audit surface for AS9100 and NADCAP, where the decision trace either exists or is rebuilt against an accreditation clock.",
        modules: [
          { name: "Nonconformance / MRB", blurb: "Nonconformances captured where they happen and driven through material review board disposition, with the investigation and objective evidence attached.", standards: ["AS9100"] },
          { name: "CAPA & Effectiveness", blurb: "Corrective actions driven to verified effectiveness on one thread, closed before the next assessment finding ages.", standards: ["AS9100", "NADCAP"] },
          { name: "Audit Finding Closure", blurb: "AS9100, NADCAP, and customer-audit findings tracked from objective evidence to verified closure on a durable trail.", standards: ["AS9100", "NADCAP"] },
          { name: "Key Characteristics Control", blurb: "Key characteristics identified, flowed to inspection, and evidenced against the drawing, not tracked in a parallel spreadsheet.", standards: ["AS9100"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "Design and every change: first article and key-characteristic decisions that lose their rationale when approvals live in email and the review meeting.",
        modules: [
          { name: "First Article Inspection (FAI / AS9102)", blurb: "First article inspection assembled and approved as the AS9102 record is generated, drawing to characteristic to result, not reconstructed for the customer.", standards: ["FAI · AS9102", "AS9100"] },
          { name: "Design & Configuration Review", blurb: "Design reviews and key-characteristic decisions held on the thread that produced them, with the rationale sealed to the revision.", standards: ["AS9100"] },
          { name: "CDRL Deliverables", blurb: "Contract data requirements list deliverables tracked to their program clock, assembled from the record instead of chased across inboxes.", standards: ["AS9100"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Primary",
        promise: "Engineering change order plus configuration management, the aerospace core: where design authority decisions and shop-floor execution fall out of sync and most coordination tax accumulates.",
        modules: [
          { name: "Engineering Change Order (ECO)", blurb: "Multi-function sign-off with a durable record of what evidence was reviewed and what changed between revisions, from design authority to production.", standards: ["AS9100"] },
          { name: "Configuration Management", blurb: "Effectivity, revision, and as-built configuration held on one record so the shipped part traces to the decision that released it.", standards: ["AS9100"] },
          { name: "Process Change Notification (PCN)", blurb: "Special-process and process changes evaluated for FAI, key-characteristic, and customer-notification impact before they reach the part.", standards: ["NADCAP", "AS9100"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "Drawings, specifications, and program records with configuration and version integrity across long-cycle programs; a mixed-revision build is a top audit finding.",
        modules: [
          { name: "Document & Drawing Control", blurb: "Drawings and specifications in active use tied to an auditable approval record and the current revision, across programs and sites.", standards: ["AS9100"] },
          { name: "Program Records Retention", blurb: "Program records held to their retention obligation with the configuration linkage intact, ready as a source-inspection target.", standards: ["AS9100", "FAA Part 21"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "The coordination tax across organisational boundaries: supplier qualification, special-process / NADCAP flow-down, supplier CAPA, counterfeit-parts control, and OASIS.",
        modules: [
          { name: "Supplier Qualification", blurb: "Supplier qualification and approved-supplier-list status assembled and approved across the boundary, with a durable record.", standards: ["AS9100"] },
          { name: "Special-Process Flow-down", blurb: "NADCAP special-process accreditation and requirement flow-down tracked to the supplier, so a lapsed accreditation surfaces before the part does.", standards: ["NADCAP", "AS9100"] },
          { name: "Counterfeit Parts Prevention (AS6081)", blurb: "Counterfeit-parts controls, authenticity evidence, and escape response held on a governed record before an airworthiness exposure forms.", standards: ["AS6081", "AS9100"] },
          { name: "Supplier CAPA", blurb: "Supplier nonconformances driven to corrective action across the boundary, evidence to closure, not chased over email.", standards: ["AS9100"] },
        ],
      },
      {
        slug: "operations",
        name: "Operations",
        tier: "Primary",
        promise: "Production holds, MRB backlog, and source-inspection readiness decided in escalation calls with no durable decision trace.",
        modules: [
          { name: "Production Hold Disposition", blurb: "Holds released with the objective evidence and approver chain recorded at the moment the call is made, not reconstructed afterward.", standards: ["AS9100"] },
          { name: "Source Inspection Readiness", blurb: "Documentation currency and objective evidence assembled ahead of a customer or government source-inspection visit, on one record.", standards: ["AS9100", "FAA Part 21"] },
        ],
      },
      {
        slug: "post-market-recall",
        name: "Post-Market & Recall",
        tier: "Secondary",
        promise: "Airworthiness: field escapes, airworthiness directives, and MRO running under hard airworthiness deadlines, the highest-coordination event profile.",
        modules: [
          { name: "Escape & Field Investigation", blurb: "Field escapes and quality escapes investigated on one trail and linked to CAPA, root cause to disposition.", standards: ["AS9100", "FAA Part 21"] },
          { name: "Airworthiness Directive Response", blurb: "Airworthiness directive impact, affected effectivity, and customer notification coordinated as one event against the airworthiness clock.", standards: ["FAA Part 21"] },
        ],
      },
      {
        slug: "compliance",
        name: "Compliance",
        tier: "Secondary",
        promise: "DCSA and government QAR oversight and special-process accreditation, a second external audit layer largely independent of AS9100 and owned by a distinct buyer.",
        modules: [
          { name: "Government Audit Evidence (DCSA / QAR)", blurb: "DCSA and government quality assurance representative oversight evidence held on a governed record, ready for a finding.", standards: ["FAA Part 21"] },
          { name: "Special-Process Accreditation (NADCAP)", blurb: "NADCAP special-process accreditation evidence and objective-evidence packages maintained on a durable trail against the accreditation cycle.", standards: ["NADCAP"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Statutory, accreditation, and customer deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "NADCAP special-process finding", clock: "90 days to resolve or lose accreditation", severity: "Urgent", routesTo: "Special-Process Accreditation (NADCAP)", owner: "Quality Systems" },
      { name: "FAA production approval suspension", clock: "immediate · production halt risk", severity: "Urgent", routesTo: "Government Audit Evidence (DCSA / QAR)", owner: "Quality Systems" },
      { name: "Counterfeit part → airworthiness directive", clock: "airworthiness clock · AS6081 escape", severity: "Urgent", routesTo: "Airworthiness Directive Response", owner: "Quality / Program" },
      { name: "Customer audit removal from approved supplier list", clock: "customer-audit clock · ASL exposure", severity: "Urgent", routesTo: "Audit Finding Closure", owner: "Program Quality" },
      { name: "First article inspection failure at source inspection", clock: "source-inspection visit · production held", severity: "High", routesTo: "First Article Inspection (FAI / AS9102)", owner: "Quality" },
      { name: "DCSA / QAR government audit finding", clock: "government-audit clock · independent of AS9100", severity: "High", routesTo: "Government Audit Evidence (DCSA / QAR)", owner: "Quality Systems" },
    ],
  },

  coexistence: {
    heading: "It sits on the PLM and ERP stack you already run.",
    systemsOfRecord: ["PLM", "ERP", "MES", "QMS"],
    approval: "an auditable e-signature",
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing between design authority and the shop floor. It does not displace Siemens Teamcenter, Arena PLM, SAP QM, your MES, or Net-Inspect, and approvals are captured as an auditable e-signature. No rip-and-replace, and no disruption to the systems that already run the program.",
    diagramCaption: "Unifize as the coordination layer over your PLM, ERP, MES and QMS.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Engineering change → configuration", coordination: "Propagates to configuration, FAI, key characteristics, and the shop floor", owner: "Engineering / Quality", atRisk: "cycle time; a mixed-revision build or configuration drift" },
      { name: "First article inspection (FAI)", coordination: "Engineering, quality, and the customer assemble the AS9102 package across systems", owner: "Quality", atRisk: "FAI cycle time; a failure at source inspection" },
      { name: "Nonconformance → MRB → CAPA", coordination: "Quality, engineering, and production reconstruct the disposition and objective evidence", owner: "Quality", atRisk: "weeks of cycle time; an audit finding if it ages" },
      { name: "Special-process / supplier qualification", coordination: "Quality and procurement flow down NADCAP requirements and assemble evidence across the boundary", owner: "Supplier Quality", atRisk: "parts on hold; a lapsed accreditation reaching a part" },
      { name: "Source inspection readiness", coordination: "Documentation currency chased across engineering, quality, and program before a visit", owner: "Program Quality", atRisk: "production held; a failed source inspection" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long engineering-change and FAI cycle times", "Delayed release and program milestone slip"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in program cost"] },
      { type: "Compliance drag", items: ["Persistent overdue CAPAs and open nonconformances", "Slow audit and source-inspection proof", "Configuration drift and documentation-currency gaps"] },
      { type: "Revenue risk", items: ["Quality escapes and scrapped parts", "Removal from the approved supplier list", "NADCAP accreditation loss or production-approval suspension"] },
      { type: "Working capital", items: ["Quarantined inventory and high working capital"] },
    ],
    economics: { companies: 63, employees: 1_386_000, annualTaxLow: 28_012_210, annualTaxHigh: 272_214_790 },
    stakesMeta: "Modeled across 63 companies and 1.39M employees in the segment",
  },

  validated: {
    eyebrow: "For your quality systems team",
    headline: "Built to sit beside the systems that already run your program, not to replace them.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the PLM, ERP, MES, and QMS you already run. It replaces the ungoverned channels where the decision trace goes missing between design authority and the shop floor, not your systems of record.",
      },
      {
        icon: "shield",
        label: "Auditable e-signatures",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is the objective evidence an AS9100 or NADCAP assessor asks for, not a reconstruction.",
      },
      {
        icon: "chat",
        label: "AS9100 and NADCAP questions, answered directly",
        body: "Change control, configuration management, first article inspection, special-process flow-down, and counterfeit-parts posture are walked through with your team before anything touches a controlled record.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Aerospace buyers judge references against their own audit discipline. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from an AS9100-certified organization, ideally one with NADCAP special-process accreditation or FAA production approval.",
      "Demonstrated audit readiness and documentation completeness, with the objective evidence an assessor expects already in place.",
      "Quantified improvement in first article inspection cycle time, engineering change processing time, or audit finding closure rate.",
      "Demonstration that the system can reconstruct the decision trace for any part at any point in its lifecycle.",
    ],
    maturityNote: "Proof maturity for aerospace is Advocacy: references exist, but none are attached to this page yet, and no metric is attached until a customer has signed off on it. What we will do on a call is reconstruct one of your own change or first-article decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the configuration state. Unifize reconstructs the decision.",
    lede: "Pick a change or first article you could not replay at the last audit. We will reconstruct it live.",
  },
};
