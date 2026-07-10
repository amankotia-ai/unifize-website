/* ============================================================================
 * Nutritional Supplements — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Nutritional Supplements". Economics (Companies 2,
 *   a small reference set; Employees 10,000; Est Annual Tax NOT populated, so
 *   Low/High are null and the stakes figure auto-omits), Competitive Landscape,
 *   Primary Fear Anchor, Opportunity, Proof Requirement, Proof Maturity, and
 *   Regulatory Vocabulary are canonical fields on that row.
 * source: Domains DB -> the coordination-domain taxonomy; module rosters are
 *   canonical-derived from the Domain descriptions + the industry's Regulatory
 *   Vocabulary (identity testing HPTLC / HPLC / FTIR, MMR, BPR, spec setting and
 *   verification, botanical adulteration). No Trigger Events are linked to
 *   Nutritional Supplements in Notion, so the "what's breaking" moments are drawn
 *   from the canonical Primary Fear Anchor, Opportunity, and Regulatory
 *   Vocabulary (recognizable moments).
 * Framing / headlines are authored on top of the canonical facts; nothing
 * factual is invented, and no per-event dollar figure is stated (Notion has none
 * for this segment). This segment has no segment tax figure at all, so the cost
 * section leads with the events and consequences, which is the honest treatment.
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const NUTRITIONAL_SUPPLEMENTS: IndustryData = {
  slug: "nutritional-supplements",
  name: "Nutritional supplements",

  meta: {
    title: "Nutritional supplements · Unifize",
    description:
      "Your records show the batch released. They cannot reconstruct why. Unifize rebuilds the decision trace across quality, operations, and regulatory, so it holds up in a 21 CFR Part 111 inspection or an NSF surveillance audit. The industry template, instanced on Nutritional supplements.",
  },

  hero: {
    crumb: "Nutritional supplements",
    titleLead: "Your COA cleared the ingredient.",
    titleTurn: "Not why.",
    sub: "Built for dietary-supplement brand owners and contract manufacturers under 21 CFR Part 111, where incoming identity testing, batch record completeness, and specification setting have to stay traceable, and hold up in an FDA inspection or an NSF surveillance audit.",
    chips: ["21 CFR Part 111", "cGMP", "NSF", "USP Verified", "DSHEA"],
    trustLabel: "Built for dietary-supplement GMP teams",
  },

  difference: {
    heading: "The decision lives in the thread, not the batch record.",
    lede: "Incumbents track batch and document status. Unifize reconstructs the decision trace across every function a deviation or release touched: the identity testing, the spec verification, and the reasoning an inspector actually asks for.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Nonconformance raised", who: "Operations", when: "T+0" },
      { t: "Investigation & impact bound", who: "Unifize", when: "T+0" },
      { t: "CAPA cross-functional review", who: "Quality · Reg", when: "T+7d" },
      { t: "Approved · e-signature", who: "Quality leadership", when: "T+12d" },
      { t: "Record sealed · 21 CFR Part 111", who: "Unifize", when: "T+12d" },
    ],
    trailFoot: "The same nonconformance, sealed as a 21 CFR Part 111 audit trail. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / capa / CA-3120",
    mobileLabel: "CAPA decision trace",
    mobileId: "CA-3120 · nonconformance → investigation → CAPA → verification → seal",
  },

  ingress: { role: "Quality, Ops, Reg, R&D", modules: "Identity testing, CAPA, MMR / BPR, spec", breaking: "483s, recalls, listing pauses" },

  personas: {
    heading: "When the inspector is in the room, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at a Part 111 inspection or an NSF surveillance audit.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Release confidence",
        titles: ["VP Quality", "Head of Quality", "QA Director", "Quality Manager"],
        value: "Every release and deviation decision stays reconstructable, so the batch record and its identity testing are complete before the inspector walks in, not rebuilt under a 483 clock.",
        cares: "Release confidence · batch record completeness · deviation closure · CAPA effectiveness",
        worries: "Incomplete batch records · overdue CAPAs · identity-testing gaps · 483 observations",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Manufacturing Operations",
        stake: "Decision velocity",
        titles: ["VP Operations", "Plant Manager", "Production Manager", "Site Head"],
        value: "Incoming material release and in-process holds move on one accountable thread, so lots stop sitting on hold waiting for an identity result or an email.",
        cares: "Incoming release · in-process holds · schedule stability · disposition speed",
        worries: "Material on hold · firefighting · slow dispositions · trapped inventory",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Regulatory & Label Compliance",
        stake: "The regulatory clock",
        titles: ["Regulatory Affairs Manager", "Label Compliance Lead", "Product Compliance Manager"],
        value: "Label claims, structure-function substantiation, and NDI notification stay tied to the evidence that supports them, so a claim never rests on a document that was never finished.",
        cares: "Label claim substantiation · structure-function claims · NDI notification · DSHEA",
        worries: "Unsupported claims · missing substantiation · warning-letter exposure · listing pause",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Quality Systems & Audit",
        stake: "Audit readiness",
        titles: ["Compliance Manager", "GMP Audit Lead", "Quality Systems Manager", "Certification Coordinator"],
        value: "Part 111 GMP evidence and NSF, USP, and Informed Sport certification records are captured where they happen, so audit readiness is a standing state, not a scramble before the surveillance visit.",
        cares: "21 CFR Part 111 GMP · NSF / USP / Informed Sport · audit readiness · observation closure",
        worries: "Audit findings · stale certification records · repeat observations · surveillance gaps",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "R&D / Product Development",
        stake: "Change velocity",
        titles: ["Head of R&D", "Formulation Lead", "Product Development Manager", "Specification Owner"],
        value: "Blend and formulation changes move fast with their specifications and identity methods sealed to the record, so the reasoning survives the next reformulation and the next spec revision.",
        cares: "Change velocity with control · formulation / blend · specification setting · method fit",
        worries: "Uncontrolled changes · long review loops · specs out of sync · mixed-revision batches",
      },
    ],
  },

  coverage: {
    heading: "Eight domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are inspected or audited against to see which controls evidence it.",
    standardFilters: ["21 CFR Part 111", "cGMP", "NSF", "USP Verified", "DSHEA", "Informed Sport"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your most visible inspection surface, where the batch record review and the decision trace either exist or have to be rebuilt.",
        modules: [
          { name: "Batch Record Review & Release", blurb: "Executed batch production record reviewed on the thread that produced it, with identity results and exceptions recorded in place before release.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "Deviation / Nonconformance", blurb: "Deviations and nonconformances captured where they happen, with the investigation and impact attached, not chased across a spreadsheet.", standards: ["21 CFR Part 111"] },
          { name: "CAPA & Effectiveness", blurb: "Investigation to verified effectiveness on one accountable thread, closed before it ages into a 483 finding.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "Audit Finding Management", blurb: "FDA, NSF, and USP findings, responses, and closures on a durable trail instead of an inbox.", standards: ["NSF", "USP Verified"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "Formulation and blend development plus specification setting and verification: decisions that lose their rationale when approvals live in email and the lab notebook.",
        modules: [
          { name: "Formulation / Blend Development", blurb: "Blend and formulation decisions captured with the rationale that produced them, linked to the specifications they clear.", standards: ["21 CFR Part 111"] },
          { name: "Specification Setting & Verification", blurb: "Raw-material, in-process, and finished-product specifications set, verified, and version-controlled, with the identity method tied to the spec.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "Label Claim Substantiation", blurb: "Structure-function and label claims linked to the testing and evidence that supports them.", standards: ["DSHEA", "21 CFR Part 111"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Secondary",
        promise: "Formulation, spec, and supplier change with multi-function sign-off, evidence packaging, and version-controlled distribution to contract manufacturers.",
        modules: [
          { name: "Change Control", blurb: "Multi-function sign-off with a durable record of what evidence was reviewed and what changed between revisions.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "Controlled Distribution", blurb: "Version-controlled distribution of specs and methods to contract manufacturers, with confirmation of receipt.", standards: ["21 CFR Part 111"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "The master manufacturing record, batch production records, and specifications with version integrity: a batch-record completeness gap is a top Part 111 finding.",
        modules: [
          { name: "Master Manufacturing Record (MMR)", blurb: "The MMR maintained as the controlled source, with each batch production record traceable back to the revision it was made from.", standards: ["21 CFR Part 111"] },
          { name: "Specification Control", blurb: "Raw-material, in-process, and finished-product specifications held with version integrity and an auditable approval record.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "Document Control", blurb: "SOPs and procedures in active use tied to an auditable approval record and the current revision.", standards: ["cGMP"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "The coordination tax across the boundary: ingredient supplier qualification, certificate-of-analysis management, and botanical identity and adulteration control.",
        modules: [
          { name: "Ingredient Supplier Qualification", blurb: "Ingredient supplier qualification assembled and approved across the boundary, with a durable record, deeper for botanicals with an adulteration history.", standards: ["21 CFR Part 111"] },
          { name: "Certificate of Analysis (COA)", blurb: "Supplier COAs captured, checked against the spec, and tied to the lots they clear, not chased at receipt.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "Botanical Identity & Adulteration Control", blurb: "Botanical identity and adulteration controls evidenced against the ABC-AHP-NCNPR program, with the identity method attached.", standards: ["21 CFR Part 111"] },
        ],
      },
      {
        slug: "operations",
        name: "Operations",
        tier: "Primary",
        promise: "Incoming raw-material identity testing and release, in-process testing, and holds: the identity-testing workflow (HPTLC, HPLC, FTIR) is unique to this segment and a frequent 483 target.",
        modules: [
          { name: "Incoming Identity Testing & Release", blurb: "Incoming raw-material identity testing (HPTLC, HPLC, FTIR fingerprinting) and release held on one thread, from receipt to disposition.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "In-Process Testing & Holds", blurb: "In-process testing results and holds owned and dispositioned on the thread, without the parallel spreadsheet.", standards: ["21 CFR Part 111"] },
        ],
      },
      {
        slug: "post-market-recall",
        name: "Post-Market & Recall",
        tier: "Secondary",
        promise: "Complaint handling and recall coordination under FDA visibility, where a contract-manufacturer failure and an e-commerce listing pause both land on the brand.",
        modules: [
          { name: "Complaint Management", blurb: "Consumer complaints triaged, investigated, and linked to CAPA on one trail.", standards: ["21 CFR Part 111"] },
          { name: "Recall Coordination", blurb: "Scope, retailer and e-commerce notifications, and returns coordinated as one event under a hard clock.", standards: ["21 CFR Part 111"] },
        ],
      },
      {
        slug: "compliance",
        name: "Compliance",
        tier: "Secondary",
        promise: "21 CFR Part 111 GMP audit readiness plus NSF, USP, and Informed Sport certification, maintained as a standing state under surveillance pressure.",
        modules: [
          { name: "GMP Audit Readiness (Part 111)", blurb: "21 CFR Part 111 GMP evidence maintained as a record, ready as an inspection target rather than assembled before the visit.", standards: ["21 CFR Part 111", "cGMP"] },
          { name: "Certification Management (NSF / USP)", blurb: "NSF supplement certification, the USP Verified Mark, and Informed Sport documentation kept current through surveillance audits.", standards: ["NSF", "USP Verified", "Informed Sport"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Enforcement, retailer, and audit deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "FDA Form 483 or warning letter citing 21 CFR Part 111", clock: "days to respond · identity testing, batch records, specs", severity: "Urgent", routesTo: "CAPA & Effectiveness", owner: "Quality" },
      { name: "Contract-manufacturer audit failure triggers a brand recall", clock: "immediate · recall clock", severity: "Urgent", routesTo: "Recall Coordination", owner: "Quality / Reg" },
      { name: "E-commerce listing pause after a published FDA warning letter", clock: "within 24 hours · retailer action", severity: "Urgent", routesTo: "Recall Coordination", owner: "Regulatory" },
      { name: "Botanical raw-material identity or adulteration finding at receipt", clock: "batch hold", severity: "Urgent", routesTo: "Incoming Identity Testing & Release", owner: "Operations / Quality" },
      { name: "Batch record completeness gap found at release", clock: "release hold · 21 CFR Part 111", severity: "High", routesTo: "Batch Record Review & Release", owner: "Quality" },
      { name: "NSF or USP surveillance-audit finding", clock: "under audit clock · certification at risk", severity: "High", routesTo: "Certification Management (NSF / USP)", owner: "Quality Systems & Audit" },
    ],
  },

  coexistence: {
    heading: "It sits on the stack you already run.",
    systemsOfRecord: ["ERP", "QMS", "LIMS", "Identity Testing"],
    approval: "an auditable e-signature",
    body: "Unifize replaces the ungoverned channels (email, SharePoint, custom Excel) where the decision trace goes missing. It does not displace Adaptive Compliance Engine, SafetyChain, or MasterControl and ETQ where a larger contract manufacturer runs them, and it does not touch your identity-testing software (Thermo Fisher Chromeleon, Thermo Fisher TraceFinder). Approvals are captured as an auditable e-signature. No rip-and-replace, and no disruption to the systems that already run the line.",
    diagramCaption: "Unifize as the coordination layer over your ERP, QMS, LIMS and identity-testing software.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Incoming identity testing & release", coordination: "Operations, quality, and the lab move material from receipt to release across systems", owner: "Operations / Quality", atRisk: "material on hold; an identity gap at inspection" },
      { name: "Deviation → CAPA", coordination: "Quality and operations reconstruct the investigation across tools", owner: "Quality", atRisk: "cycle time; a 483 if it ages" },
      { name: "Batch record review & release", coordination: "Exceptions and identity results chased across QA, production, and the lab before release", owner: "Quality", atRisk: "days per lot; a completeness gap at release" },
      { name: "Supplier qualification & COA", coordination: "Quality and procurement qualify suppliers and check COAs at the boundary, deeper for botanicals", owner: "Supplier Quality", atRisk: "documentation completeness; a missing certificate" },
      { name: "Spec setting & verification", coordination: "R&D and quality set and verify specs and propagate them to the MMR and methods", owner: "R&D / Quality", atRisk: "specs out of sync; a spec-setting finding" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long incoming-release and deviation cycle times", "Slow batch review and release"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in COGS"] },
      { type: "Compliance drag", items: ["Incomplete batch records and identity-testing gaps", "Slow inspection and surveillance-audit proof", "Stale certification and lagging observation closure"] },
      { type: "Revenue risk", items: ["Brand recall from a contract-manufacturer failure", "E-commerce listing pause after a warning letter", "Class-action and retailer-chargeback exposure"] },
      { type: "Working capital", items: ["Material on hold and high working capital"] },
    ],
    economics: { companies: 2, employees: 10_000, annualTaxLow: null, annualTaxHigh: null },
    stakesMeta: "Modeled across the US dietary-supplement segment",
  },

  validated: {
    eyebrow: "For your quality and compliance teams",
    headline: "Built to sit beside the systems you already run, not to replace them.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the ERP, QMS, LIMS, and identity-testing software you already run. It replaces the ungoverned channels where the decision trace goes missing, not your systems of record.",
      },
      {
        icon: "shield",
        label: "Auditable e-signatures",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is a record an FDA inspector or an NSF auditor can follow, not a reconstruction after the fact.",
      },
      {
        icon: "chat",
        label: "Your Part 111 questions, answered directly",
        body: "Incoming identity testing (HPTLC, HPLC, FTIR), batch record completeness, specification setting and verification, and NSF or USP audit readiness are walked through with your team before anything touches a controlled record.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Supplement buyers judge references against their own operating model and identity-testing rigor. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a similar operating model: brand owner versus contract manufacturer, single-ingredient versus multi-blend, gummy versus powder versus softgel.",
      "Evidence of supplier qualification depth and identity-testing rigor, especially for botanical ingredients with an adulteration history.",
      "Quantified improvement in incoming raw-material release cycle time, supplier qualification documentation completeness, batch record review and release time, or audit observation closure rate.",
      "Demonstration that the system handles the supplement-specific identity-testing workflow: HPTLC, HPLC, and FTIR fingerprinting.",
    ],
    maturityNote: "Proof maturity for nutritional supplements is at the advocacy stage: references exist but none are attached to this page yet, and we will not attach a metric until a customer has signed off on it. What we will do on a call is reconstruct one of your own release or identity-testing decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the batch record. Unifize reconstructs the decision.",
    lede: "Pick a release or identity-testing decision you could not replay at the last inspection. We will reconstruct it live.",
  },
};
