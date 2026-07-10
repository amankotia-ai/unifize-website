/* ============================================================================
 * Cosmetics — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Cosmetics" (id fcb2a808..., ID-5). Economics
 *   (Companies 23, Employees not populated, Est Annual Tax Low/High), Competitive
 *   Landscape, Primary Fear Anchor, Opportunity, Proof Requirement, Proof
 *   Maturity, and Regulatory Vocabulary are canonical fields on that row.
 * source: Domains DB -> the coordination-domain taxonomy; module rosters are
 *   canonical-derived from the Domain descriptions + the industry's Regulatory
 *   Vocabulary. No Trigger Events are linked to Cosmetics in Notion, so the
 *   "what's breaking" moments are drawn from the canonical Primary Fear Anchor,
 *   Opportunity, and Regulatory Vocabulary (recognizable moments).
 * Framing / headlines are authored; nothing factual is invented, and no
 * per-event dollar figure is stated (Notion has none for this segment).
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const COSMETICS: IndustryData = {
  slug: "cosmetics",
  name: "Cosmetics",

  meta: {
    title: "Cosmetics · Unifize",
    description:
      "Your records show the product shipped. They cannot reconstruct why. Unifize rebuilds the decision trace across quality, safety, and regulatory, so it holds up in a retailer audit or an FDA inquiry under MoCRA. The industry template, instanced on Cosmetics.",
  },

  hero: {
    crumb: "Cosmetics",
    titleLead: "Your substantiation file says the product is safe.",
    titleTurn: "Not why.",
    sub: "Built for cosmetic and personal-care manufacturers under MoCRA, where safety substantiation, supplier COAs, and every formula change have to stay traceable, and hold up in a retailer audit or an FDA inquiry.",
    chips: ["MoCRA", "ISO 22716", "21 CFR 700 / 740", "21 CFR 330", "EU 1223/2009"],
    trustLabel: "Built for cosmetic and personal-care manufacturers",
  },

  difference: {
    heading: "The decision lives in the thread, not the substantiation folder.",
    lede: "Incumbents track a folder of PDFs. Unifize reconstructs the decision trace across every function a formula or supplier change touched, and every safety claim it rests on.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Formula change raised", who: "R&D", when: "T+0" },
      { t: "Safety substantiation impact bound", who: "Unifize", when: "T+0" },
      { t: "Cross-functional review", who: "Quality · Reg", when: "T+5d" },
      { t: "Approved · e-signature", who: "Responsible Person", when: "T+9d" },
      { t: "Record sealed · ISO 22716", who: "Unifize", when: "T+9d" },
    ],
    trailFoot: "The same change, sealed with its safety substantiation attached. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / change-control / FRM-1180",
    mobileLabel: "Change-control decision trace",
    mobileId: "FRM-1180 · raise → substantiation → review → approval → seal",
  },

  ingress: { role: "Quality, Reg, Ops, R&D", modules: "Substantiation, COA, formula, AER", breaking: "MoCRA, AERs, retailer audits" },

  personas: {
    heading: "When the retailer's auditor asks for the file, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at a retailer audit or an FDA inquiry.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality & Regulatory leadership",
        stake: "Release confidence",
        titles: ["VP Quality", "Quality & Regulatory Director", "QA Manager", "Regulatory Affairs Manager"],
        value: "Every formula and supplier decision stays reconstructable, so the safety substantiation file is complete before the retailer audit or FDA inquiry, not assembled under a delisting threat.",
        cares: "Safety substantiation · MoCRA readiness · retailer audits · claim support",
        worries: "Incomplete substantiation files · missing COAs · adverse event exposure · delisting",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Operations leadership",
        stake: "Decision velocity",
        titles: ["VP Operations", "Plant Manager", "Production Manager"],
        value: "Formula changes and material dispositions move on one accountable thread, so filling and release stop waiting on email.",
        cares: "On-time fill · schedule stability · disposition speed · batch release",
        worries: "Batches on hold · firefighting · slow dispositions · rework",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Regulatory Affairs",
        stake: "The regulatory clock",
        titles: ["Regulatory Affairs Manager", "Responsible Person (EU)", "Product Compliance Lead"],
        value: "Facility registration, product listing, and the EU Product Information File stay current per SKU, so market access never turns on a document that was never finished.",
        cares: "MoCRA facility registration & listing · EU PIF · claim substantiation",
        worries: "Listing rejection · stale PIF · unsupported claims · market-access loss",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Safety & Compliance",
        stake: "Safety substantiation",
        titles: ["Safety Assessor", "Toxicology / CIR Lead", "Compliance Manager"],
        value: "Safety substantiation, adverse event reports, and hazard analyses are captured where they happen, so the evidence is a record, not a reconstruction after a consumer complaint.",
        cares: "Safety substantiation · adverse event reporting · CIR / hazard analysis",
        worries: "Undocumented hazard analysis · unlogged AERs · substantiation gaps",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Formulation & NPD",
        stake: "Change velocity",
        titles: ["Head of R&D", "Formulation Lead", "NPD Manager", "Stability Lead"],
        value: "Formula and packaging changes move fast with their rationale and stability data sealed to the record, so the reasoning survives the next launch and the next reformulation.",
        cares: "Change velocity with control · stability · formulation discipline",
        worries: "Uncontrolled changes · long review loops · failed stability · mixed-revision batches",
      },
    ],
  },

  coverage: {
    heading: "Eight domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are audited against to see which controls evidence it.",
    standardFilters: ["MoCRA", "ISO 22716", "21 CFR 700 / 740", "21 CFR 330", "EU 1223/2009"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "Your audit surface for retailers and the FDA, where the safety substantiation and batch record either hold together or are rebuilt.",
        modules: [
          { name: "Safety Substantiation File", blurb: "Substantiation evidence, hazard analysis, and CIR support assembled per product, complete before the audit asks.", standards: ["MoCRA", "ISO 22716"] },
          { name: "CAPA & Effectiveness", blurb: "Corrective actions driven to verified effectiveness on one thread.", standards: ["ISO 22716"] },
          { name: "Batch Record Review", blurb: "Executed batch records reviewed on the thread that produced them, with microbiological and stability results attached.", standards: ["ISO 22716", "21 CFR 700 / 740"] },
          { name: "Nonconformance / Disposition", blurb: "Nonconforming batches owned, evidenced, and dispositioned without the parallel spreadsheet.", standards: ["ISO 22716"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "Formulation, stability, and claim development: decisions that lose their rationale when approvals live in email and the lab notebook.",
        modules: [
          { name: "Formula Change Control", blurb: "Formulation and packaging changes classified and propagated, with safety substantiation and stability impact assessed.", standards: ["ISO 22716", "MoCRA"] },
          { name: "Stability & Challenge Testing", blurb: "Stability, preservative challenge, and microbiological limit results held on one record, linked to the formula they clear.", standards: ["ISO 22716"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Secondary",
        promise: "Formula and supplier change with multi-function sign-off, substantiation packaging, and controlled distribution to fillers and retailers.",
        modules: [
          { name: "Change Control", blurb: "Multi-function sign-off with a durable record of what evidence was reviewed and what changed between revisions.", standards: ["ISO 22716"] },
          { name: "Controlled Distribution", blurb: "Version-controlled distribution of specs and safety data to contract fillers, with confirmation of receipt.", standards: ["ISO 22716"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "Specifications, SOPs, and the EU PIF with version integrity per SKU; an incomplete file is a delisting and market-access exposure.",
        modules: [
          { name: "Product Information File (PIF)", blurb: "The EU Product Information File and Responsible Person documentation maintained current per SKU.", standards: ["EU 1223/2009"] },
          { name: "Document Control", blurb: "Procedures and specifications in active use tied to an auditable approval record and the current revision.", standards: ["ISO 22716"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "Ingredient supplier qualification and certificate-of-analysis management across the boundary, largely manual today.",
        modules: [
          { name: "Supplier COA Management", blurb: "Ingredient certificates of analysis captured, checked, and tied to the lots they clear, not chased at receipt.", standards: ["ISO 22716"] },
          { name: "Supplier Qualification", blurb: "Ingredient and contract-manufacturer qualification assembled and approved across the boundary.", standards: ["ISO 22716", "MoCRA"] },
        ],
      },
      {
        slug: "post-market-recall",
        name: "Post-Market & Recall",
        tier: "Secondary",
        promise: "Adverse event reporting and recall coordination under MoCRA and FDA visibility.",
        modules: [
          { name: "Adverse Event Reporting (AER / SAER)", blurb: "Consumer adverse events triaged, investigated, and reported against the MoCRA clock, with the hazard analysis attached.", standards: ["MoCRA", "21 CFR 700 / 740"] },
          { name: "Recall Coordination", blurb: "Scope, retailer notifications, and returns coordinated as one event.", standards: ["MoCRA"] },
        ],
      },
      {
        slug: "regulatory-affairs",
        name: "Regulatory Affairs",
        tier: "Secondary",
        promise: "MoCRA facility registration and product listing, plus EU market documentation, maintained under enforcement pressure.",
        modules: [
          { name: "Facility Registration & Listing", blurb: "MoCRA facility registration and product listing maintained as products and formulas change.", standards: ["MoCRA"] },
          { name: "Claim Substantiation", blurb: "Marketing claims tied to the substantiation and testing that supports them.", standards: ["21 CFR 700 / 740", "MoCRA"] },
        ],
      },
      {
        slug: "compliance",
        name: "Compliance",
        tier: "Secondary",
        promise: "OTC-drug overlap compliance for sunscreens, antiperspirants, and anti-acne, governed beside cosmetic GMP.",
        modules: [
          { name: "OTC Drug GMP (21 CFR 330)", blurb: "OTC monograph compliance for drug-overlap products held on a governed record.", standards: ["21 CFR 330"] },
          { name: "Cosmetic GMP (ISO 22716)", blurb: "ISO 22716 GMP evidence maintained as a record, not a binder.", standards: ["ISO 22716"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Enforcement and retailer deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "MoCRA product listing or registration rejected", clock: "FDA enforcement · MoCRA", severity: "Urgent", routesTo: "Facility Registration & Listing", owner: "Regulatory" },
      { name: "Serious adverse event report (SAER)", clock: "15 business days to FDA · MoCRA", severity: "Urgent", routesTo: "Adverse Event Reporting", owner: "Quality / Reg" },
      { name: "Retailer audit exposes a substantiation gap", clock: "delisting risk · retailer clock", severity: "Urgent", routesTo: "Safety Substantiation File", owner: "Quality" },
      { name: "Supplier COA missing at receipt", clock: "batch hold", severity: "High", routesTo: "Supplier COA Management", owner: "Supplier Quality" },
      { name: "EU PIF or Responsible Person gap", clock: "market-access risk · EC 1223/2009", severity: "High", routesTo: "Product Information File", owner: "Regulatory" },
      { name: "Formula or stability record gap at audit", clock: "under audit clock · ISO 22716", severity: "High", routesTo: "Formula Change Control", owner: "Quality" },
    ],
  },

  coexistence: {
    heading: "It sits on the PLM and ERP stack you already run.",
    systemsOfRecord: ["PLM", "ERP", "QMS", "LIMS"],
    approval: "an auditable e-signature",
    body: "Unifize replaces the ungoverned channels (email, Asana, spreadsheets) where the decision trace goes missing. It does not displace your formula PLM, your ERP, or your ingredient-compliance tool, and approvals are captured as an auditable e-signature. No rip-and-replace, and no disruption to the systems that already run the line.",
    diagramCaption: "Unifize as the coordination layer over your PLM, ERP, QMS and LIMS.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Formula change", coordination: "Propagates to substantiation, stability, specs, and claims", owner: "R&D / Quality", atRisk: "cycle time; a substantiation gap at audit" },
      { name: "Safety substantiation assembly", coordination: "Quality, safety, and regulatory assemble evidence per SKU across tools", owner: "Quality / Safety", atRisk: "a delisting if the file is incomplete" },
      { name: "Supplier COA management", coordination: "Quality and procurement chase and check COAs at receipt", owner: "Supplier Quality", atRisk: "material on hold; a missing certificate" },
      { name: "Adverse event report", coordination: "Quality and regulatory reconstruct the hazard analysis under an FDA clock", owner: "Quality / Reg", atRisk: "the MoCRA reporting window; an FDA inquiry" },
      { name: "MoCRA registration & listing", coordination: "Regulatory maintains facility registration and product listing as SKUs change", owner: "Regulatory", atRisk: "listing rejection; market access" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long formula-change and substantiation cycle times", "Delayed launches and time to market"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in COGS"] },
      { type: "Compliance drag", items: ["Incomplete safety substantiation files", "Slow retailer-audit and FDA proof", "Stale PIFs and lagging listing maintenance"] },
      { type: "Revenue risk", items: ["Delisting from a key retail channel", "Adverse event and recall exposure", "Lost market access"] },
      { type: "Working capital", items: ["Held inventory and high working capital"] },
    ],
    economics: { companies: 23, employees: null, annualTaxLow: 36_366_905, annualTaxHigh: 388_128_806 },
    stakesMeta: "Modeled across 23 companies in the US cosmetics segment",
  },

  validated: {
    eyebrow: "For your quality and regulatory teams",
    headline: "Built to sit beside the systems you already run, not to replace them.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the formula PLM, ERP, QMS, and ingredient-compliance tools you already run. It replaces the ungoverned channels where the decision trace goes missing, not your systems of record.",
      },
      {
        icon: "shield",
        label: "Auditable e-signatures",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the safety substantiation trail is a record a retailer or the FDA can follow, not a reconstruction.",
      },
      {
        icon: "chat",
        label: "Your MoCRA questions, answered directly",
        body: "Facility registration and product-listing maintenance, adverse event reporting, and safety substantiation completeness are walked through with your team before anything touches a controlled record.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Cosmetic buyers judge references against their own position in the market. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a similarly positioned manufacturer: mass versus prestige versus indie, OTC-drug overlap versus cosmetic only, contract manufacturer versus brand owner.",
      "A clear account of how the system handles MoCRA facility registration and product-listing maintenance.",
      "Quantified improvement in safety substantiation file completion, supplier COA management, adverse event report processing time, or retailer audit pass rate.",
      "A reference that reflects your regulatory reality, from cosmetic GMP to the OTC-drug overlap.",
    ],
    maturityNote: "Proof maturity for cosmetics is at the advocacy stage: references exist but none are attached to this page yet, and we will not attach a metric until a customer has signed off on it. What we will do on a call is reconstruct one of your own substantiation or formula decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the substantiation folder. Unifize reconstructs the decision.",
    lede: "Pick a formula or supplier change you could not replay at the last retailer audit. We will reconstruct it live.",
  },
};
