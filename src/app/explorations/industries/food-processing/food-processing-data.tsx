/* ============================================================================
 * Food processing — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Food Processing" (Vertical: Food Production).
 *   Economics (Companies 129, Employees not populated, Est Annual Tax Low/High),
 *   Competitive Landscape, Primary Fear Anchor, Opportunity, Proof Requirement,
 *   Proof Maturity ("Advocacy"), and Regulatory Vocabulary are canonical fields
 *   on that row.
 * source: Domains DB -> the coordination-domain taxonomy; module rosters are
 *   canonical-derived from the Domain descriptions + the industry's Regulatory
 *   Vocabulary (FSMA / HACCP / GFSI vocabulary). No Trigger Events are linked to
 *   Food Processing in Notion, so the "what's breaking" moments are drawn from
 *   the canonical Primary Fear Anchor + Opportunity + Regulatory Vocabulary
 *   (recognizable moments, not case evidence).
 * Framing / headlines are authored; nothing factual is invented, and no
 * per-event dollar figure is stated (Notion has none for this segment) — the
 * canonical per-company coordination tax carries it. Proof maturity is
 * "Advocacy": references exist in the reference base but none is attached to
 * this page, and no metric is stated until a customer signs off on it.
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const FOOD_PROCESSING: IndustryData = {
  slug: "food-processing",
  name: "Food processing",

  meta: {
    title: "Food processing · Unifize",
    description:
      "Your records show the lot shipped. They cannot reconstruct why it was released. Unifize rebuilds the decision trace across food safety, operations, and supplier quality, so it holds up at a GFSI surveillance audit or an FDA recall. The industry template, instanced on Food processing.",
  },

  hero: {
    crumb: "Food processing",
    titleLead: "Your HACCP plan cleared the lot.",
    titleTurn: "Not why.",
    sub: "Built for mid-market food manufacturers, co-packers, and contract manufacturers under FSMA preventive controls and a GFSI scheme, where every deviation, allergen-control record, and hold decision has to stay traceable across food safety, operations, and supplier quality, and survive a surveillance audit or a recall.",
    chips: ["FSMA · 21 CFR 117", "HACCP", "SQF", "BRCGS", "FSSC 22000"],
    trustLabel: "Built for FSMA-regulated, GFSI-certified food makers",
  },

  difference: {
    heading: "The decision lives in the thread, not the food safety plan.",
    lede: "Incumbents track a status field. Unifize reconstructs the decision trace across every function a deviation touched: the corrective action, the verification, and the reasoning an auditor actually asks for.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Deviation / nonconformance raised", who: "Production", when: "T+0" },
      { t: "Root cause bound (allergen · CCP)", who: "Unifize", when: "T+0" },
      { t: "Corrective action cross-functional review", who: "Food Safety · Ops", when: "T+5d" },
      { t: "Verification & approval · e-signature", who: "Quality Head", when: "T+9d" },
      { t: "Record sealed · FSMA 21 CFR 117", who: "Unifize", when: "T+9d" },
    ],
    trailFoot: "The same deviation, sealed as a corrective-action record under the food safety plan. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / capa / CA-3180",
    mobileLabel: "Corrective-action decision trace",
    mobileId: "CA-3180 · deviation → root cause → corrective action → verification → seal",
  },

  ingress: { role: "Food safety, Ops, RA, Audit", modules: "Deviation, corrective action, holds, COA", breaking: "Recalls, RFR, GFSI audits" },

  personas: {
    heading: "When the auditor is on the floor, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at a GFSI surveillance audit or an FDA recall.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Food Safety & Quality",
        stake: "Release confidence",
        titles: ["VP Quality", "Director of Food Safety & Quality", "QA Manager", "PCQI", "HACCP Coordinator"],
        value: "Every deviation, corrective action, and release decision stays reconstructable, so the trace is already there when the auditor walks the floor, not rebuilt under a recall clock.",
        cares: "Food safety plan integrity · corrective action closure · allergen control · audit outcomes",
        worries: "Open deviations · overdue corrective actions · allergen-control gaps · GFSI nonconformances",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Plant Operations",
        stake: "Decision velocity",
        titles: ["Plant Manager", "VP Operations", "Production Manager", "Site Director"],
        value: "Cross-functional hold and disposition decisions move on one accountable thread, so product stops sitting on hold waiting for an email to release or reject it.",
        cares: "Throughput · schedule stability · disposition speed · on-spec yield",
        worries: "Product on hold · firefighting · slow dispositions · rework and scrap",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Regulatory & Label Compliance",
        stake: "The regulatory clock",
        titles: ["Regulatory Affairs Manager", "Label Compliance Lead", "Food Safety Regulatory Manager"],
        value: "Allergen statements, label claims, and Reportable Food Registry obligations stay current and traceable, so a labeling or reporting deadline never outruns its paperwork.",
        cares: "Allergen labeling · Reportable Food Registry · customer-specific specifications · claim substantiation",
        worries: "Undeclared allergens · stale specifications · missed RFR submissions · enforcement exposure",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Food Safety & Audit",
        stake: "Audit readiness",
        titles: ["SQF Practitioner", "BRCGS / FSSC Lead", "Audit & Compliance Manager", "Food Safety Systems Lead"],
        value: "HACCP validation, environmental monitoring, and audit findings are captured where they happen, so GFSI surveillance evidence is a standing record, not a reconstruction assembled the week before the audit.",
        cares: "GFSI · SQF / BRCGS / FSSC 22000 · environmental monitoring · retailer audit programs",
        worries: "Surveillance nonconformances · certification loss · retailer scorecard downgrades · finding recurrence",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "R&D / Product Development",
        stake: "Change velocity",
        titles: ["R&D Manager", "Product Development Lead", "Formulation Scientist", "Process Authority"],
        value: "Recipe and formulation changes move fast with their hazard analysis and validation sealed to the record, so the reasoning survives the reformulation, the new line, and the next production run.",
        cares: "Change velocity with control · recipe / formulation · hazard analysis · validation and verification",
        worries: "Uncontrolled recipe changes · unvalidated formulations · long review loops · mixed-revision runs",
      },
    ],
  },

  coverage: {
    heading: "Eight domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are audited against to see which controls evidence it.",
    standardFilters: ["FSMA · 21 CFR 117", "HACCP", "SQF", "BRCGS", "FSSC 22000", "GFSI"],
    domains: [
      {
        slug: "quality",
        name: "Food Safety & Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your audit surface for retailers and certification bodies, where the corrective-action trace either exists or is rebuilt.",
        modules: [
          { name: "Deviation / Nonconformance", blurb: "Deviations from the food safety plan captured where they happen, classified, with the investigation and product impact attached, not tracked in a parallel spreadsheet.", standards: ["FSMA · 21 CFR 117", "HACCP"] },
          { name: "Corrective Action", blurb: "Corrective action driven from root cause to verified effectiveness on one accountable thread, closed before the next surveillance audit.", standards: ["FSMA · 21 CFR 117", "SQF"] },
          { name: "Hold & Disposition", blurb: "Product holds owned, evidenced, and dispositioned so quarantined lots do not go dark between production and release.", standards: ["FSMA · 21 CFR 117"] },
          { name: "Audit Findings", blurb: "Findings, responses, and closures on a durable trail instead of a spreadsheet and an inbox, ready for the next visit.", standards: ["GFSI", "SQF"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "Recipe and formulation development with hazard analysis, validation, and verification: gate decisions that lose their rationale when approvals live in email and the R&D notebook.",
        modules: [
          { name: "Recipe / Formulation Change", blurb: "Recipe and formulation changes classified and propagated, with allergen and label impact assessed before the run.", standards: ["FSMA · 21 CFR 117", "HACCP"] },
          { name: "Hazard Analysis Validation", blurb: "Validation and verification of the hazard analysis assembled and approved as it is generated, not reconstructed for the audit.", standards: ["HACCP", "FSSC 22000"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Secondary",
        promise: "Process, ingredient, and supplier change with multi-function sign-off, evidence packaging, and downstream label and customer notification.",
        modules: [
          { name: "Process / Ingredient Change", blurb: "Process, ingredient, and packaging changes with a durable record of what evidence was reviewed and what changed between revisions.", standards: ["FSMA · 21 CFR 117", "SQF"] },
          { name: "Controlled Distribution", blurb: "Version-controlled distribution of specifications and label artwork to sites and co-packers, with confirmation of receipt.", standards: ["BRCGS"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "Food safety plan, SSOPs, and specifications with version integrity across sites; a stale spec or SSOP in active use is a direct audit finding.",
        modules: [
          { name: "Food Safety Plan & SSOP Control", blurb: "The food safety plan, SSOPs, and GMP procedures tied to an auditable approval record and the current revision, across sites.", standards: ["FSMA · 21 CFR 117", "SQF"] },
          { name: "Specification Control", blurb: "Ingredient, finished-good, and customer-specific specifications tied to an approval record and a controlled distribution log.", standards: ["BRCGS", "FSSC 22000"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "The coordination tax across the boundary: supplier verification, certificate of analysis management, and letters of guarantee for an approved supplier list.",
        modules: [
          { name: "Supplier Verification Program", blurb: "Supplier verification assembled and approved across the boundary for the approved supplier list, with a durable record.", standards: ["FSMA · 21 CFR 117"] },
          { name: "COA & Letter of Guarantee", blurb: "Certificates of analysis and letters of guarantee collected, checked against spec, and tied to the lot they cleared, not chased by email.", standards: ["FSMA · 21 CFR 117", "SQF"] },
          { name: "Supplier Corrective Action", blurb: "Supplier nonconformances driven to corrective action across the boundary, evidence to closure.", standards: ["SQF"] },
        ],
      },
      {
        slug: "operations",
        name: "Operations",
        tier: "Primary",
        promise: "Environmental monitoring, production holds, and disposition decisions made in escalation calls with no durable decision trace.",
        modules: [
          { name: "Environmental Monitoring", blurb: "Environmental monitoring results, positives, and the investigation and corrective action they trigger held on one governed trail.", standards: ["FSMA · 21 CFR 117", "FSSC 22000"] },
          { name: "Production Hold Disposition", blurb: "Holds released with the evidence and approver chain recorded at the moment the call is made, not reconstructed later.", standards: ["FSMA · 21 CFR 117"] },
        ],
      },
      {
        slug: "post-market-recall",
        name: "Post-Market & Recall",
        tier: "Secondary",
        promise: "Recall plan, mock recall, and Reportable Food Registry workflows running under hard statutory deadlines: the highest-coordination-tax event profile.",
        modules: [
          { name: "Recall Plan & Mock Recall", blurb: "Recall plan execution and the annual mock recall coordinated as one event, with traceback timing recorded as evidence.", standards: ["FSMA · 21 CFR 117", "SQF"] },
          { name: "Reportable Food Registry", blurb: "Reportable Food Registry submissions governed against their FDA clock, with the decision to report on the record.", standards: ["FSMA · 21 CFR 117"] },
        ],
      },
      {
        slug: "compliance",
        name: "Compliance",
        tier: "Secondary",
        promise: "GFSI surveillance-audit readiness and retailer audit programs governed as a standing layer, owned by a distinct food safety and audit buyer.",
        modules: [
          { name: "GFSI Surveillance Readiness", blurb: "SQF, BRCGS, and FSSC 22000 evidence kept current so the annual surveillance audit does not become a documentation scramble.", standards: ["GFSI", "SQF", "BRCGS", "FSSC 22000"] },
          { name: "Retailer Audit Programs", blurb: "Walmart, Costco, and Kroger supplier-audit corrective actions and scorecard responses tracked to closure on their own timelines.", standards: ["GFSI"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Statutory and customer deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "FDA recall classification (Class I / II / III)", clock: "21 CFR Part 7 recall clock", severity: "Urgent", routesTo: "Recall Plan & Mock Recall", owner: "Food Safety / RA" },
      { name: "Reportable Food Registry submission required", clock: "FDA reporting clock · allergen control failure", severity: "Urgent", routesTo: "Reportable Food Registry", owner: "Regulatory" },
      { name: "Allergen control deviation", clock: "immediate · undeclared-allergen exposure", severity: "Urgent", routesTo: "Corrective Action", owner: "Food Safety" },
      { name: "GFSI surveillance-audit nonconformance", clock: "corrective-action window · certification at risk", severity: "High", routesTo: "GFSI Surveillance Readiness", owner: "Food Safety / Audit" },
      { name: "Retailer audit corrective action (Walmart / Costco)", clock: "retailer scorecard deadline", severity: "High", routesTo: "Retailer Audit Programs", owner: "Food Safety / Quality" },
      { name: "Supplier verification gap / missing COA", clock: "lot cleared without documented verification", severity: "High", routesTo: "COA & Letter of Guarantee", owner: "Supplier Quality" },
    ],
  },

  coexistence: {
    heading: "It sits on the ERP and QMS stack you already run.",
    systemsOfRecord: ["ERP", "QMS", "LIMS", "EHS"],
    approval: "an auditable e-signature",
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the corrective-action trace goes missing. It does not displace SafetyChain, Alchemy, Trustwell, Intelex, or NSF, and approvals are captured as an auditable e-signature. Many mid-market manufacturers below $100M still run these processes on SharePoint, Excel, and Google Sheets; Unifize lands on corrective action and deviation without a full system displacement. No rip-and-replace.",
    diagramCaption: "Unifize as the coordination layer over your ERP, QMS, LIMS and EHS.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Deviation → corrective action", coordination: "Food safety, production, and quality reconstruct the investigation across systems", owner: "Food Safety", atRisk: "weeks of cycle time; a finding if it ages" },
      { name: "Recipe / formulation change", coordination: "Propagates to specs, labels, allergen statements, and training", owner: "R&D / Quality", atRisk: "cycle time; an allergen or label exposure" },
      { name: "Supplier verification & COA", coordination: "Quality and procurement assemble verification and certificates across the boundary", owner: "Supplier Quality", atRisk: "product on hold; a lot cleared without documented verification" },
      { name: "Environmental monitoring positive", coordination: "Investigation, corrective action, and disposition chased across food safety and operations", owner: "Food Safety / Ops", atRisk: "a hold; a reportable event if it spreads" },
      { name: "Recall / mock recall", coordination: "Traceback, notifications, and RFR decision coordinated across the plant under a clock", owner: "Food Safety / RA", atRisk: "a fixed statutory deadline that cannot slip" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long deviation and corrective-action cycle times", "Delayed release and slow dispositions"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in COGS"] },
      { type: "Compliance drag", items: ["Persistent overdue corrective actions and open deviations", "Slow audit and retailer-qualification proof", "Lagging allergen-control and environmental-monitoring trend detection"] },
      { type: "Revenue risk", items: ["Quality escapes and off-spec lots", "Loss of GFSI certification and retailer supply access", "Expanded recall scope and enforcement exposure"] },
      { type: "Working capital", items: ["Quarantined inventory and high working capital"] },
    ],
    economics: { companies: 129, employees: null, annualTaxLow: 47_538_019, annualTaxHigh: 530_669_612 },
    stakesMeta: "Modeled across 129 companies in the segment",
  },

  validated: {
    eyebrow: "For your food safety and audit teams",
    headline: "Built to sit beside the systems that already run your plant, not to replace them.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the ERP, QMS, LIMS, and EHS you already run, and replaces the ungoverned channels where the corrective-action trace goes missing. Many manufacturers still run these processes on spreadsheets today; Unifize lands there without a full system displacement.",
      },
      {
        icon: "shield",
        label: "Auditable e-signatures",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is the audit trail a GFSI surveillance audit or a retailer program asks for, not a reconstruction assembled the week before.",
      },
      {
        icon: "chat",
        label: "FSMA and GFSI questions, answered directly",
        body: "Food safety plan control, corrective-action rigor, supplier verification depth, and environmental-monitoring posture are walked through with your team before anything touches a controlled record.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Food buyers judge references against their own certification and retailer profile. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a similarly certified manufacturer (SQF, BRCGS, or FSSC 22000) at similar plant scale and product category.",
      "References that include retailer-mandated audit outcomes, from Walmart Supplier Quality to Costco and Kroger supplier scorecards.",
      "Quantified improvement in corrective-action closure cycle time, supplier COA management completeness, allergen-control deviation closure, mock-recall cycle time, or audit-observation closure rate.",
      "Demonstration that the system supports the annual GFSI surveillance audit without adding documentation burden.",
    ],
    maturityNote: "Proof maturity for food processing is Advocacy: references exist in our reference base, but none is attached to this page yet, and we will not attach a named reference or a metric here until a customer has signed off on it. What we will do on a call is reconstruct one of your own deviation or corrective-action decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the status field. Unifize reconstructs the decision.",
    lede: "Pick a deviation or corrective action you could not replay at the last audit. We will reconstruct it live.",
  },
};
