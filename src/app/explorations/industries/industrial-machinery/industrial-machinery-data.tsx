/* ============================================================================
 * Industrial machinery — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Industrial Machinery" (Vertical: Manufacturing).
 *   Economics (Companies 76, Employees not populated, Est Annual Tax Low
 *   $9,499,062 / High $97,597,111, Wage $60-150/hr, DocF 1.0, PRF 1.0),
 *   Competitive Landscape, Primary Fear Anchor, Opportunity, Proof Requirement,
 *   Proof Maturity ("Advocacy"), and Regulatory Vocabulary are canonical fields
 *   on that row.
 * source: Trigger Events -> the "what's breaking" moments come from the canonical
 *   Primary Fear Anchor (customer rejection at FAT/SAT; post-installation audit
 *   finding on validation records; CE marking / technical construction file
 *   challenge) crossed with the Opportunity (engineering change management, field
 *   modification, customer-specific qualification packages) and the Regulatory
 *   Vocabulary. Clocks condense those deadlines.
 * source: Domains DB -> the coordination-domain taxonomy, adapted to build-to-order
 *   machinery function names; module rosters are canonical-derived from the Domain
 *   descriptions + the industry's Regulatory Vocabulary. No per-event dollar figure
 *   is stated (Notion has none for this segment); the canonical per-company
 *   coordination tax carries it. Framing / headlines are authored on top of the
 *   canonical facts; nothing factual is invented.
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const INDUSTRIAL_MACHINERY: IndustryData = {
  slug: "industrial-machinery",
  name: "Industrial machinery",

  meta: {
    title: "Industrial machinery · Unifize",
    description:
      "Your PLM records that the machine shipped. It cannot reconstruct why the design choices were made. Unifize rebuilds the decision trace across engineering, quality, and commissioning, so it holds up at FAT, SAT, and the customer's qualification audit. The industry template, instanced on Industrial machinery.",
  },

  hero: {
    crumb: "Industrial machinery",
    titleLead: "Your FAT accepted the machine.",
    titleTurn: "Not why.",
    sub: "Built for build-to-order machinery OEMs serving regulated end markets, where every engineering change, safety-critical design choice, and qualification record has to stay traceable across engineering, quality, and commissioning, and survive FAT, SAT, and the customer's audit.",
    chips: ["CE marking", "Machinery Directive", "ISO 12100", "IQ / OQ / PQ", "FAT / SAT"],
    trustLabel: "Built for build-to-order machinery OEMs",
  },

  difference: {
    heading: "The decision lives in the thread, not the PLM change record.",
    lede: "Incumbents track the engineering change and the document status. Unifize reconstructs the decision trace across every function a change touched: the reasoning the customer's auditor and the technical construction file actually ask for.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Engineering change raised", who: "Engineering", when: "T+0" },
      { t: "Qualification impact bound", who: "Unifize", when: "T+0" },
      { t: "Cross-functional review", who: "Quality · Compliance", when: "T+7d" },
      { t: "Approved · auditable e-signature", who: "Program Owner", when: "T+12d" },
      { t: "Sealed · technical construction file", who: "Unifize", when: "T+12d" },
    ],
    trailFoot: "The same engineering change, sealed under the technical construction file and CE declaration. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / change-control / ECR-4417",
    mobileLabel: "Change-control decision trace",
    mobileId: "ECR-4417 · engineering change → qualification impact → review → approval → seal",
  },

  ingress: { role: "Quality, Ops, Compliance, Qualification", modules: "ECR, design FMEA, FAT/SAT, IQ/OQ/PQ", breaking: "FAT/SAT rejection, CE / TCF gaps" },

  personas: {
    heading: "When the customer's auditor is on the floor, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at FAT, SAT, and the customer's qualification audit.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Delivery confidence",
        titles: ["VP Quality", "Head of Quality", "Quality Manager", "QA Director"],
        value: "Every NCR, corrective action, and punch-list decision stays reconstructable, so the trace is already there when the customer's auditor arrives, not rebuilt after a FAT rejection.",
        cares: "FAT/SAT acceptance · NCR closure · corrective-action effectiveness · punch-list burn-down",
        worries: "Open NCRs · overdue corrective actions · post-delivery punch list · customer audit findings",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Project & Build Operations",
        stake: "Delivery velocity",
        titles: ["VP Operations", "Program Manager", "Project Manager", "Commissioning Manager"],
        value: "FAT, SAT, and commissioning decisions move on one accountable thread, so a build stops sitting on hold waiting for an email to release a milestone or sign off a punch-list item.",
        cares: "Project delivery time · milestone stability · commissioning speed · punch-list closure",
        worries: "Builds on hold · slippage · slow FAT/SAT sign-off · rework on the floor",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Compliance & CE Marking",
        stake: "Conformity",
        titles: ["Compliance Manager", "CE Marking Lead", "Product Safety Engineer", "Regulatory Affairs"],
        value: "The technical construction file and declaration of conformity stay current and traceable to every safety-critical design choice, so a CE marking challenge never finds a gap in the decision trace.",
        cares: "CE marking · Machinery Directive obligations · technical construction file currency · declaration of conformity",
        worries: "TCF gaps · missing risk-assessment rationale · product liability exposure · conformity challenge",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Qualification & Validation",
        stake: "Qualified state",
        titles: ["Validation Manager", "Qualification Lead", "CSV Lead", "Commissioning Engineer"],
        value: "IQ / OQ / PQ evidence and the customer-specific qualification package are assembled as they are generated and captured with an auditable e-signature, so the package is a record, not a reconstruction before the audit.",
        cares: "IQ / OQ / PQ · 21 CFR Part 11 · customer qualification packages · audit-trail integrity",
        worries: "Incomplete qualification docs · post-installation audit findings · validation records that miss the customer's standard",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Engineering & Design",
        stake: "Change velocity",
        titles: ["VP Engineering", "Engineering Manager", "Design Lead", "Controls Engineer"],
        value: "Machine design changes and design FMEA decisions move fast with their rationale sealed to the record, so the reasoning survives the program cut-in, the field modification, and the next revision.",
        cares: "Machine design · design FMEA · URS / FDS · engineering change velocity with control",
        worries: "Uncontrolled changes · lost design rationale · change rejected at cut-in · mixed-revision as-builts",
      },
    ],
  },

  coverage: {
    heading: "Seven domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are certified or qualified against to see which controls evidence it.",
    standardFilters: ["CE marking", "Machinery Directive", "ISO 12100", "IQ / OQ / PQ", "FAT / SAT", "21 CFR Part 11"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your most visible acceptance surface, where the NCR-to-effectiveness trace either exists or is rebuilt after a FAT rejection.",
        modules: [
          { name: "Nonconformance (NCR) Management", blurb: "Nonconforming parts and build issues captured where they happen, classified, and dispositioned on one thread, not a spreadsheet and an inbox.", standards: ["FAT / SAT", "ISO 12100"] },
          { name: "Corrective Action & Effectiveness", blurb: "Root cause to verified effectiveness on one accountable trail, closed before it re-opens at the next acceptance test.", standards: ["FAT / SAT"] },
          { name: "Punch-List Management", blurb: "Post-delivery punch-list items owned, evidenced, and burned down against the acceptance milestone that gates payment.", standards: ["FAT / SAT"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "Machine design, design FMEA, and requirements: technical decisions that lose their rationale when approvals live in email and the review meeting, and cannot be replayed for the technical construction file.",
        modules: [
          { name: "Machine Design & Design FMEA", blurb: "Design decisions and failure-mode analysis captured with the rationale attached, linked to the safety-critical choices the TCF has to defend.", standards: ["ISO 12100", "Machinery Directive"] },
          { name: "URS / FDS & Risk Assessment", blurb: "User requirement and functional design specifications held on one record with the risk assessment they drive, traceable to the customer's acceptance criteria.", standards: ["ISO 12100"] },
          { name: "Requirements Traceability", blurb: "Customer requirements traced to design, verification, and qualification, so nothing is claimed at FAT that was not evidenced in design.", standards: ["IQ / OQ / PQ"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Primary",
        promise: "Engineering change management is where the coordination tax concentrates in build-to-order machinery: a change classified, impact-assessed across qualification, and signed off before the cut-in.",
        modules: [
          { name: "Engineering Change (ECR / ECN)", blurb: "Engineering change requests and notices with multi-function sign-off and a durable record of what evidence was reviewed and what changed between revisions.", standards: ["Machinery Directive", "21 CFR Part 11"] },
          { name: "Change Impact on Qualification", blurb: "Every design change evaluated for its impact on IQ / OQ / PQ and the customer's qualification before it reaches the build.", standards: ["IQ / OQ / PQ"] },
          { name: "Field Modification Control", blurb: "In-field design changes and retrofits governed with the same rigor as the original build, tied to the as-built record.", standards: ["FAT / SAT"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "The technical construction file, declaration of conformity, and as-built records with version integrity: a TCF that cannot show the decision trace is a product-liability exposure.",
        modules: [
          { name: "Technical Construction File", blurb: "The TCF assembled and kept current as design decisions are made, with each safety-critical choice traceable to its rationale.", standards: ["CE marking", "Machinery Directive"] },
          { name: "Declaration of Conformity", blurb: "The declaration of conformity tied to an auditable approval record and the exact revision of the file it certifies.", standards: ["CE marking"] },
          { name: "As-Built Records", blurb: "As-built and as-shipped documentation held on the thread that produced it, so the record matches the machine that left the floor.", standards: ["FAT / SAT"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "The coordination tax across organisational boundaries: component supplier quality, incoming inspection, and the aftermarket and spare-parts NCR workflows that run for the life of the machine.",
        modules: [
          { name: "Component Supplier Quality", blurb: "Supplier qualification, deviations, and supplier corrective actions assembled and approved across the boundary, with a durable record.", standards: ["ISO 12100"] },
          { name: "Incoming Inspection", blurb: "Incoming inspection results and rejections held on one trail, linked to the NCR when a part is out.", standards: ["FAT / SAT"] },
        ],
      },
      {
        slug: "operations",
        name: "Operations",
        tier: "Primary",
        promise: "FAT, SAT, and commissioning execution and field modification: acceptance decisions made under the customer's clock without a durable decision trace.",
        modules: [
          { name: "FAT / SAT Execution", blurb: "Factory and site acceptance test protocols run, exceptions captured, and sign-off recorded in place, ready for the customer's witness.", standards: ["FAT / SAT", "IQ / OQ / PQ"] },
          { name: "Commissioning", blurb: "Commissioning steps, sign-offs, and open items held on one record, so handover proof is assembled as the work happens.", standards: ["IQ / OQ / PQ"] },
          { name: "Field Modification & Service", blurb: "In-service modifications and spare-parts issues dispositioned with the evidence and approver recorded at the moment the call is made.", standards: ["FAT / SAT"] },
        ],
      },
      {
        slug: "compliance",
        name: "Compliance",
        tier: "Primary",
        promise: "CE marking and Machinery Directive obligations, and the customer's IQ / OQ / PQ qualification packages for machines used in regulated end markets.",
        modules: [
          { name: "CE Marking / Machinery Directive", blurb: "Conformity evidence against the Machinery Directive and ISO 12100 assembled and approved on a governed record, ready for a conformity challenge.", standards: ["CE marking", "Machinery Directive", "ISO 12100"] },
          { name: "Customer Qualification (IQ / OQ / PQ)", blurb: "Installation, operational, and performance qualification packages for regulated end customers assembled as they are generated, held to 21 CFR Part 11 where required.", standards: ["IQ / OQ / PQ", "21 CFR Part 11"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Customer acceptance and conformity deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "Customer rejection at FAT / SAT for incomplete qualification docs", clock: "milestone held · acceptance clock", severity: "Urgent", routesTo: "FAT / SAT Execution", owner: "Project & Build Operations" },
      { name: "Post-installation audit finds validation records miss the customer's standard", clock: "under customer audit clock", severity: "Urgent", routesTo: "Customer Qualification (IQ / OQ / PQ)", owner: "Qualification & Validation" },
      { name: "CE marking challenge · technical construction file gap", clock: "conformity challenge · liability risk", severity: "Urgent", routesTo: "Technical Construction File", owner: "Compliance & CE Marking" },
      { name: "Engineering change rejected at a program cut-in", clock: "before cut-in · schedule risk", severity: "High", routesTo: "Engineering Change (ECR / ECN)", owner: "Engineering & Design" },
      { name: "Field modification or spare-parts NCR", clock: "in-service · warranty exposure", severity: "High", routesTo: "Field Modification & Service", owner: "Quality" },
      { name: "Customer-specific qualification package overdue", clock: "delivery-milestone deadline", severity: "High", routesTo: "Customer Qualification (IQ / OQ / PQ)", owner: "Qualification & Validation" },
    ],
  },

  coexistence: {
    heading: "It sits on the PLM and ERP you already run, not on top of them.",
    systemsOfRecord: ["PLM", "ERP", "CAD Vault", "QMS"],
    approval: "an auditable e-signature",
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing. It does not displace PTC Windchill, Arena, or Omnify PLM, your SAP or Epicor ERP, or Autodesk Vault. It lands on engineering change management without an ERP or PLM displacement, and approvals are captured as an auditable e-signature, 21 CFR Part 11 where the equipment serves a regulated environment.",
    diagramCaption: "Unifize as the coordination layer over your PLM, ERP, CAD vault and QMS.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Engineering change → cut-in", coordination: "Engineering, quality, and compliance reconstruct the change impact across systems", owner: "Engineering & Design", atRisk: "weeks of change-order cycle time; a rejected cut-in" },
      { name: "FAT / SAT documentation", coordination: "Quality, operations, and qualification chase exceptions before the customer's witness sign-off", owner: "Project & Build Operations", atRisk: "days per milestone; a held delivery" },
      { name: "Customer qualification package", coordination: "Qualification and quality assemble IQ / OQ / PQ evidence to the customer's standard", owner: "Qualification & Validation", atRisk: "a post-installation audit finding; a stalled milestone" },
      { name: "Technical construction file", coordination: "Compliance and engineering trace every safety-critical choice back to its rationale", owner: "Compliance & CE Marking", atRisk: "a conformity challenge; product-liability exposure" },
      { name: "Field modification & spare parts", coordination: "Service and quality reconcile in-field change impact across affected units", owner: "Quality / Service", atRisk: "warranty exposure; an NCR that ages into a punch list" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long engineering-change and change-order cycle times", "Delayed FAT/SAT sign-off and project delivery"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in project cost", "Rework and post-delivery punch-list items"] },
      { type: "Compliance drag", items: ["Persistent open NCRs and overdue corrective actions", "Slow customer-audit and qualification proof", "Technical construction file that lags the as-built machine"] },
      { type: "Revenue risk", items: ["Customer rejection at FAT or SAT", "CE marking or conformity challenge", "Product-liability exposure on safety-critical design"] },
      { type: "Working capital", items: ["Milestones held and payment delayed", "Rework and idle capacity on the floor"] },
    ],
    economics: { companies: 76, employees: null, annualTaxLow: 9_499_062, annualTaxHigh: 97_597_111 },
    stakesMeta: "Modeled across 76 companies in the segment",
  },

  validated: {
    eyebrow: "For your qualification and compliance teams",
    headline: "Built to sit beside your PLM and ERP, and to survive the customer's qualification audit and a CE marking challenge.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the PLM, ERP, CAD vault, and QMS you already run. It lands on engineering change management without an ERP or PLM displacement, and replaces the ungoverned channels where the decision trace goes missing.",
      },
      {
        icon: "shield",
        label: "Auditable e-signatures, Part 11 where required",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is the audit trail: 21 CFR Part 11 where the equipment serves a regulated environment, and traceable to the technical construction file by construction.",
      },
      {
        icon: "chat",
        label: "Your customer's questions, answered directly",
        body: "IQ / OQ / PQ evidence, FAT/SAT documentation, engineering-change traceability, and the technical construction file are walked through with your team, and built to survive the customer's post-installation qualification audit.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Industrial machinery buyers are pragmatic and cost-focused, and judge references against their own delivery discipline. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a company building equipment for regulated end-use industries: pharma packaging, food processing, or medical device assembly, at a similar build-to-order profile.",
      "Quantified improvement in project delivery time, engineering-change-order cycle time, or reduction in post-delivery punch-list items.",
      "Demonstrated reduction in the time and rework to assemble FAT/SAT documentation and customer-specific qualification packages.",
      "For equipment used in regulated environments, a documented 21 CFR Part 11 posture and audit-trail evidence to the customer's qualification standard.",
    ],
    maturityNote: "Proof maturity for industrial machinery is at the advocacy stage: references exist but none are attached to this page yet, and we will not attach a metric until a customer has signed off on it. What we will do on a call is reconstruct one of your own engineering-change or qualification decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the change record. Unifize reconstructs the decision.",
    lede: "Pick an engineering change or a qualification package you could not replay at the last FAT, SAT, or customer audit. We will reconstruct it live.",
  },
};
