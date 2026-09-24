/* ============================================================================
 * Automotive — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Automotive". Economics (Companies 87, Employees
 *   1.566M, Est Annual Tax Low/High), Competitive Landscape, Primary Fear
 *   Anchor, Opportunity, Proof Requirement, Proof Maturity, and Regulatory
 *   Vocabulary are canonical fields on that row.
 * source: Domains DB -> the coordination-domain taxonomy; module rosters are
 *   canonical-derived from the Domain descriptions + the industry's Regulatory
 *   Vocabulary (APQP / PPAP / FMEA / Control Plan / 8D map onto Quality,
 *   Product Development, and Supplier Management). No named Trigger Events are
 *   attached in Notion for this segment, so the "what's breaking" moments are
 *   drawn from the canonical Primary Fear Anchor, Opportunity, and Regulatory
 *   Vocabulary (recognizable moments, not case evidence).
 * Framing / headlines are authored; nothing factual is invented, and no
 * per-event dollar figure is stated (Notion has none for this segment) — the
 * canonical per-company coordination tax carries it.
 * ========================================================================== */

import type { IndustryData, IndustryRails } from "../_shared/types";
import { AUTOMOTIVE_JOURNEY } from "./automotive-journey";

export const AUTOMOTIVE: IndustryData = {
  slug: "automotive",
  name: "Automotive",


  hero: {
    crumb: "Automotive",
    titleLead: "Your PPAP proves the part conforms.",
    titleTurn: "Not why.",
    sub: "Built for Tier 1 and Tier 2 suppliers running IATF 16949, where every PPAP, every engineering change, and every 8D has to stay traceable across quality, engineering, and the supply base, and survive a customer audit and a warranty return.",
    chips: ["IATF 16949", "PPAP", "APQP", "FMEA", "8D"],
    trustLabel: "Built for IATF 16949 automotive suppliers",
  },

  difference: {
    heading: "The decision lives in the thread, not the change log.",
    lede: "Incumbents track a change-log entry and a PPAP folder. Unifize reconstructs the decision trace across every function an engineering change touched, and every customer submission it triggered.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Engineering change raised (ECR)", who: "Engineering", when: "T+0" },
      { t: "FMEA & control plan impact bound", who: "Unifize", when: "T+0" },
      { t: "APQP cross-functional review", who: "Quality · Program", when: "T+7d" },
      { t: "PPAP approved · e-signature", who: "Customer Quality", when: "T+12d" },
      { t: "Record sealed · IATF 16949", who: "Unifize", when: "T+12d" },
    ],
    trailFoot: "The same change, sealed with its FMEA, control plan, and PPAP impact attached. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / change-control / ECR-3180",
    mobileLabel: "Change-control decision trace",
    mobileId: "ECR-3180 · raise → impact → APQP review → PPAP approval → seal",
  },

  ingress: { role: "Quality, Ops, Program, Engineering", modules: "PPAP, change, 8D, supplier", breaking: "Quality holds, PPAP, warranty 8Ds" },

  personas: {
    heading: "When the customer auditor is on site, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up on an IATF 16949 audit or a warranty return.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Scorecard confidence",
        titles: ["VP Quality", "Quality Director", "Quality Manager", "Plant Quality Lead", "IATF Management Representative"],
        value: "Every change, deviation, and 8D decision stays reconstructable, so the trace is already there for the customer audit and the scorecard review, not rebuilt under a controlled-shipping clock.",
        cares: "Customer scorecard · PPM · PPAP first-pass yield · audit outcomes",
        worries: "Controlled shipping (CS-1/CS-2) · overdue 8Ds · repeat defects · surveillance findings",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Operations leadership",
        stake: "Decision velocity",
        titles: ["Plant Manager", "VP Operations", "Production Manager", "Value Stream Manager"],
        value: "Cross-functional disposition, hold, and run-at-rate decisions move on one accountable thread, so the line stops waiting on email to release or contain material.",
        cares: "Run-at-rate · safe launch · disposition speed · on-spec yield",
        worries: "Production holds · firefighting · slow dispositions · scrap and rework",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Customer Quality & Program",
        stake: "The customer clock",
        titles: ["Customer Quality Manager", "Program Quality Manager", "APQP / Launch Manager"],
        value: "Customer-specific requirements, PPAP submissions, and 8D responses flow on one governed trail, so a change never outruns the customer paperwork it depends on.",
        cares: "Customer-specific requirements (CSR) · PPAP submission · 8D response · Ford Q1 / GM BIQS",
        worries: "PPAP rejection at cut-in · missed CSR obligations · overdue 8Ds · program business at risk",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Quality Systems & Audit",
        stake: "Certified state",
        titles: ["Quality Systems Manager", "IATF Lead Auditor", "Document Control Lead", "Layered Process Audit Owner"],
        value: "Layered process audits, internal audits, and management-of-change decisions are captured where they happen, so IATF 16949 surveillance evidence is a record, not a reconstruction.",
        cares: "IATF 16949 · layered process audit · document version integrity · audit findings",
        worries: "Version-mismatch findings · uncontrolled changes · open nonconformities · surveillance downgrade",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Engineering & APQP",
        stake: "Change velocity",
        titles: ["Engineering Manager", "APQP Lead", "Product / Process Engineer", "Launch Engineer"],
        value: "Engineering and process changes move fast with their FMEA and control-plan rationale sealed to the record, so the reasoning survives launch, the next revision, and the next program.",
        cares: "Change velocity with control · APQP · FMEA and control-plan discipline · safe launch",
        worries: "Uncontrolled changes · long review loops · failed launches · mixed-revision builds",
      },
    ],
  },

  coverage: {
    heading: "Eight domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are audited against to see which controls evidence it.",
    standardFilters: ["IATF 16949", "PPAP", "APQP", "FMEA", "Control Plan", "8D"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your most visible customer-audit surface, where the decision trace either exists or is rebuilt under a controlled-shipping clock.",
        modules: [
          { name: "8D / Corrective Action", blurb: "Warranty returns and customer complaints driven through the 8D disciplines on one thread, containment to verified effectiveness, closed before the response ages.", standards: ["8D", "IATF 16949"] },
          { name: "Nonconformance / MRB", blurb: "Nonconforming material owned, evidenced, and dispositioned so quarantined lots do not go dark between the line and the review board.", standards: ["IATF 16949"] },
          { name: "Deviation / Deviation Request", blurb: "Deviation requests captured where they happen, with the customer-notification impact attached, not tracked in a parallel spreadsheet.", standards: ["IATF 16949", "Control Plan"] },
          { name: "Internal & Layered Process Audit", blurb: "Findings, responses, and closures on a durable trail, with the layered-process-audit cadence held instead of chased.", standards: ["IATF 16949"] },
        ],
      },
      {
        slug: "product-development",
        name: "Product Development",
        tier: "Primary",
        promise: "APQP is a stage-gated program: FMEA, control plan, and run-at-rate decisions that lose their rationale when sign-off lives in email and review meetings.",
        modules: [
          { name: "APQP Program Governance", blurb: "The advanced product quality planning gates run on one record across engineering, quality, and the program, each phase sign-off held in place.", standards: ["APQP", "IATF 16949"] },
          { name: "FMEA & Control Plan", blurb: "Design and process FMEAs linked to the control plan they drive, so a change to one propagates to the other instead of drifting apart.", standards: ["FMEA", "Control Plan"] },
          { name: "Safe Launch / Run-at-Rate", blurb: "Safe-launch containment and run-at-rate evidence assembled and approved as it is generated, not reconstructed for the review.", standards: ["APQP", "IATF 16949"] },
        ],
      },
      {
        slug: "change-control",
        name: "Change Control",
        tier: "Primary",
        promise: "Engineering change with multi-function sign-off, evidence packaging, and version-controlled propagation to plants and to the customer PPAP, where change across multiple OEM programs goes untracked.",
        modules: [
          { name: "Engineering Change Request (ECR)", blurb: "Engineering and process changes with a durable record of what evidence was reviewed and what changed between revisions, across every program it touches.", standards: ["IATF 16949", "APQP"] },
          { name: "Controlled Distribution", blurb: "Version-controlled distribution of drawings, control plans, and work instructions to plants, with confirmation of receipt.", standards: ["IATF 16949", "Control Plan"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "Drawings, control plans, and work instructions with version integrity across sites; a version-mismatch in active use is a top IATF surveillance finding.",
        modules: [
          { name: "Document Control", blurb: "Documents in active use tied to an auditable approval record and the current revision, across plants and shifts.", standards: ["IATF 16949"] },
          { name: "Control Plan Governance", blurb: "Control plans tied to their FMEA and the drawing revision, so the version on the line matches the version that was approved.", standards: ["Control Plan", "IATF 16949"] },
        ],
      },
      {
        slug: "supplier-management",
        name: "Supplier Management",
        tier: "Primary",
        promise: "The coordination tax across the sub-tier boundary: PPAP and APQP from suppliers, supplier CAPA, and incoming inspection, where sub-tier evidence often arrives late and by email.",
        modules: [
          { name: "Sub-Tier PPAP / APQP", blurb: "PPAP and APQP evidence collected and approved across the sub-tier boundary, with a durable record instead of an inbox.", standards: ["PPAP", "APQP"] },
          { name: "Supplier CAPA / 8D", blurb: "Supplier corrective actions driven through 8D to verified effectiveness, linked to the incoming defect that started them.", standards: ["8D", "IATF 16949"] },
          { name: "Incoming Inspection / MRB", blurb: "Receipt, inspection, and disposition tied together so quarantined sub-tier material does not go dark.", standards: ["IATF 16949"] },
        ],
      },
      {
        slug: "operations",
        name: "Operations",
        tier: "Primary",
        promise: "Production holds, run-at-rate, safe launch, and MRB decisions made in escalation calls with no durable decision trace.",
        modules: [
          { name: "Production Hold Disposition", blurb: "Holds released with the evidence and approver chain recorded at the moment the call is made, not reconstructed after.", standards: ["IATF 16949"] },
          { name: "Layered Process Audit Execution", blurb: "The layered-process-audit cadence run on a governed trail, findings routed to owners and closed on the record.", standards: ["IATF 16949"] },
        ],
      },
      {
        slug: "customer-management",
        name: "Customer Management",
        tier: "Secondary",
        promise: "Customer-specific requirements, RFQ commitments, and scorecard response assembled under OEM deadlines that cannot slip.",
        modules: [
          { name: "Customer-Specific Requirements (CSR)", blurb: "OEM-specific obligations (Ford Q1, GM BIQS) tracked against the base standard, so the layer on top of IATF 16949 is governed, not remembered.", standards: ["IATF 16949"] },
          { name: "Scorecard Response", blurb: "Customer scorecard and complaint responses assembled on the thread that owns the defect, so a derating gets an answer with evidence.", standards: ["8D", "IATF 16949"] },
        ],
      },
      {
        slug: "training-competency",
        name: "Training & Competency",
        tier: "Secondary",
        promise: "Every control-plan or work-instruction change triggers a training cascade; the window between change effectivity and training completion is a direct audit finding.",
        modules: [
          { name: "Change-Driven Training Cascades", blurb: "The same workflow that releases a new work instruction creates the training cascade, assignment, completion, and proof, before the effective date.", standards: ["IATF 16949"] },
          { name: "Layered Audit Competency", blurb: "Layered-process-audit and inspection competency maintained across shifts and sites, ready as an audit target.", standards: ["IATF 16949"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Customer and certification deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "OEM quality hold · controlled shipping (CS-1/CS-2)", clock: "immediate containment · program business at risk", severity: "Urgent", routesTo: "8D / Corrective Action", owner: "Quality" },
      { name: "8D overdue on a warranty return", clock: "customer response window", severity: "Urgent", routesTo: "8D / Corrective Action", owner: "Quality" },
      { name: "PPAP rejected at cut-in", clock: "launch date at risk · no approved submission", severity: "Urgent", routesTo: "Engineering Change Request (ECR)", owner: "Customer Quality & Program" },
      { name: "Supplier derating / removal from approved list", clock: "scorecard clock · sourcing exposure", severity: "High", routesTo: "Scorecard Response", owner: "Customer Quality & Program" },
      { name: "IATF 16949 surveillance finding", clock: "corrective action under certification clock", severity: "High", routesTo: "Internal & Layered Process Audit", owner: "Quality Systems & Audit" },
      { name: "Safety / recall traceability gap", clock: "field investigation · certification-to-shipment trace at risk", severity: "High", routesTo: "Nonconformance / MRB", owner: "Quality" },
    ],
  },

  coexistence: {
    heading: "It sits on the ERP, MES, and quality stack you already run.",
    systemsOfRecord: ["ERP", "MES", "QMS", "PLM"],
    approval: "an auditable e-signature",
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing. It does not displace QAD, Plex (Rockwell), InfinityQS, or your PLM, and approvals are captured as an auditable e-signature. No rip-and-replace of the ERP and MES that already run the plant, and no disruption to the SPC data QAD and InfinityQS already hold.",
    diagramCaption: "Unifize as the coordination layer over your ERP, MES, QMS and PLM.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Engineering change → PPAP", coordination: "Propagates to FMEA, control plan, work instructions, training, and the customer submission", owner: "Engineering / Quality", atRisk: "cycle time; a PPAP rejection at cut-in" },
      { name: "Warranty return → 8D", coordination: "Quality, engineering, and the supply base reconstruct the investigation across systems", owner: "Quality", atRisk: "an overdue response; a customer scorecard hit" },
      { name: "Supplier PPAP / 8D", coordination: "Quality and procurement assemble sub-tier evidence across the boundary", owner: "Supplier Quality", atRisk: "material on hold; a sub-tier defect at the line" },
      { name: "Production hold / run-at-rate", coordination: "Operations, quality, and engineering sign off on disposition and launch evidence", owner: "Operations", atRisk: "line downtime; a failed safe launch" },
      { name: "Layered process audit cascade", coordination: "Every control-plan change fans out to audit cadence, training, and proof across shifts", owner: "Quality Systems", atRisk: "an open gap between effectivity and completion" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long change and 8D cycle times", "Delayed PPAP and program launch"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in COGS", "Scrap and rework"] },
      { type: "Compliance drag", items: ["Persistent overdue 8Ds and open changes", "Slow customer-audit and PPAP proof", "Lagging PPM and trend detection"] },
      { type: "Revenue risk", items: ["Controlled shipping and quality escapes", "Supplier derating or removal from the approved list", "Recall exposure from a traceability gap"] },
      { type: "Working capital", items: ["Quarantined inventory and high working capital"] },
    ],
    economics: { companies: 87, employees: 1_566_000, annualTaxLow: 150_538_496, annualTaxHigh: 1_639_609_300 },
    stakesMeta: "Modeled across 87 companies and 1.57M employees in the segment",
  },

  validated: {
    eyebrow: "For your quality systems team",
    headline: "Built to sit beside the ERP, MES, and SPC systems that already run your plant, not to replace them.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the ERP, MES, QMS, and PLM you already run. It replaces the ungoverned channels where the decision trace goes missing, not the QAD, Plex, or InfinityQS systems that hold your production and SPC data.",
      },
      {
        icon: "shield",
        label: "Auditable e-signatures",
        body: "Every approval is captured as an attributable, time-stamped electronic signature, so the decision trace is the audit trail your customer auditor asks for, not a reconstruction under a controlled-shipping clock.",
      },
      {
        icon: "chat",
        label: "IATF 16949 and PPAP questions, answered directly",
        body: "PPAP assembly, engineering-change impact, FMEA and control-plan linkage, and layered-process-audit posture are walked through with your team before anything touches a controlled record.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your buyers demand.",
    lede: "Automotive buyers judge references against their own tier position and process. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from a company in the same tier position (Tier 1 or Tier 2) and a similar manufacturing process: stamping, casting, or injection molding.",
      "A named case study from an IATF 16949 certified company, the minimum bar this segment sets.",
      "Metric-driven improvement in PPM reduction, 8D response time, PPAP first-pass yield, or scrap reduction, the proof points that resonate here.",
      "Customer scorecard improvement, the highest-value proof point an automotive buyer weighs.",
    ],
    maturityNote: "Proof maturity for automotive is In Development: we will not attach a named reference or a metric to this page until a customer has signed off on it. What we will do on a call is reconstruct one of your own change or 8D decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the change log. Unifize reconstructs the decision.",
    lede: "Pick a change, an 8D, or a PPAP you could not replay at the last customer audit. We will reconstruct it live.",
  },
};

/* ============================================================================
 * The rails layer (24 Sep 2026), for IndustryRailsPage.
 * source: Industries DB row "Automotive" (Primary Fear Anchor: an OEM quality
 *   hold or controlled shipping, overdue 8Ds on warranty returns, PPAP
 *   rejected at cut-in; supplier derating. Opportunity: engineering change
 *   across multiple OEM programs, sub-tier PPAP and supplier CAPA, layered
 *   process audits. Regulatory Vocabulary: IATF 16949, APQP, PPAP, FMEA,
 *   Control Plan, 8D, CSR, CS-1 / CS-2).
 * source: the data above (trail, persona titles, modules, trigger clocks).
 * The return, the locations and the lines are illustrative, not a
 * customer's; cursors carry persona titles, not people.
 * ========================================================================== */
const QM = { name: "Quality Manager", tone: "#d97706" };
const PLANT = { name: "Plant Manager", tone: "#2563eb" };
const LPA = { name: "Layered Process Audit Owner", tone: "#0f8f7e" };

export const AUTOMOTIVE_RAILS: IndustryRails = {
  /* the key element: the 8D in motion. A warranty return opens the eight
   * disciplines, containment runs across every place the suspect stock
   * sits, the control plan is updated to prevent recurrence, and the 8D
   * goes back to the OEM (the fear anchor: controlled shipping, overdue 8Ds) */
  hero: {
    kind: "eightd",
    id: "Warranty return",
    title: "Customer 8D · field return",
    from: "OEM warranty claim · IATF 16949",
    stages: { opened: "8D opened", contain: "Containing", solve: "Root cause & correction", released: "Closed · accepted by OEM" },
    disciplines: [
      { code: "D1", label: "Team formed" },
      { code: "D2", label: "Problem described" },
      { code: "D3", label: "Interim containment" },
      { code: "D4", label: "Root cause" },
      { code: "D5", label: "Corrective action chosen" },
      { code: "D6", label: "Implemented and validated" },
      { code: "D7", label: "Recurrence prevented" },
      { code: "D8", label: "Closed and recognised" },
    ],
    containment: {
      at: 2,
      cap: "Suspect stock",
      sites: [
        { name: "OEM assembly plant", off: "Suspect", on: "Sorted" },
        { name: "In transit", off: "Suspect", on: "Held" },
        { name: "Our plant · WIP & FG", off: "Suspect", on: "Quarantined" },
      ],
    },
    cascadeAt: 6,
    response: { label: "8D report to the OEM", idle: "In the response window", done: "Submitted" },
    sign: { idle: "Close · e-signature", done: "Closed" },
    approvers: { label: "Quality · Engineering · Customer Quality" },
    frame: { cap: "Checked against", items: ["IATF 16949", "8D", "PFMEA", "Control Plan"] },
    cascade: {
      cap: "PFMEA & control plan",
      off: "Update pending",
      on: "Updated · LPA cascaded",
      note: "To every shift that runs the part",
    },
    clock: { cap: "Controlled shipping", line: "Contained until the OEM lifts it" },
    seal: { cap: "Customer scorecard", off: "8D open", on: "8D closed, accepted" },
    aria:
      "A customer 8D in Unifize: a warranty return opens the eight disciplines, suspect stock is contained at the OEM plant, in transit and in the plant, the root cause is found and corrected, the PFMEA and control plan are updated, and the 8D report goes back to the OEM and is closed.",
  },

  journey: AUTOMOTIVE_JOURNEY,

  trust: {
    label: "Built for IATF 16949 automotive suppliers",
    marks: ["IATF 16949", "APQP", "PPAP", "FMEA", "8D"],
  },

  roles: {
    quality: {
      viz: {
        wash: "sky",
        kicker: "Customer 8D",
        state: "D4 · root cause",
        title: "Warranty return",
        rows: [
          { label: "D3 · containment, sorted", meta: "Quality" },
          { label: "D4 · root cause", meta: "Engineering", open: true },
          { label: "D5 · corrective action", meta: "Production" },
        ],
        cursor: QM,
      },
      go: { label: "See the quality solution →", href: "/domains/quality" },
    },
    operations: {
      viz: {
        kind: "tag",
        wash: "warm",
        stamp: "HOLD",
        lines: [
          { k: "Parts", v: "Suspect lot" },
          { k: "Waiting on", v: "MRB disposition" },
          { k: "Released by", v: "Quality" },
        ],
        note: "Released with the approver chain recorded",
        cursor: PLANT,
      },
    },
    regulatory: {
      viz: {
        kind: "signoff",
        wash: "blue",
        kicker: "PPAP",
        title: "Part submission warrant",
        signers: [
          { org: "Supplier", name: "Customer Quality Manager", meaning: "Submitted", time: "Signed" },
          { org: "OEM", name: "Customer supplier quality", meaning: "Approve" },
        ],
      },
    },
    "compliance-validation": {
      viz: {
        kind: "matrix",
        wash: "paper",
        kicker: "Layered process audit",
        cols: ["Shift 1", "Shift 2", "Shift 3"],
        rows: [
          { name: "Stamping", cells: ["ok", "ok", "ok"] },
          { name: "Welding", cells: ["ok", "due", "ok"] },
          { name: "Assembly", cells: ["ok", "ok", "gap"] },
        ],
        cursor: LPA,
      },
    },
    engineering: {
      viz: {
        kind: "impact",
        wash: "sky",
        source: { kicker: "ECR", title: "Material change" },
        items: [
          { id: "FMEA", label: "PFMEA" },
          { id: "CP", label: "Control plan" },
          { id: "PSW", label: "PPAP resubmission", open: true },
        ],
      },
      go: { label: "See the change control solution →", href: "/domains/change-control" },
    },
  },

  coverage: {
    title: "8Ds, change, the sub-tier, training. One trace.",
    lede: "Each runs with IATF 16949 and your customers' CSRs built in. Start with the one that costs you most.",
    cells: [
      {
        domain: "quality",
        line: "From the suspect lot at the line to an 8D the OEM accepts, inside the response window.",
        viz: {
          kind: "form",
          wash: "sky",
          kicker: "Nonconformance / MRB",
          title: "Suspect lot at the line",
          fields: [
            { label: "Defect", value: "Out of tolerance", select: true },
            { label: "Containment", value: "Sorted" },
            { label: "Disposition", value: "MRB review", focus: true },
          ],
          cursor: QM,
        },
        go: { label: "See the quality solution →", href: "/domains/quality" },
      },
      {
        domain: "change-control",
        line: "Engineering change carried to the FMEA, the control plan and the customer PPAP.",
        viz: {
          kind: "tiles",
          wash: "blue",
          kicker: "PPAP",
          title: "Submission elements",
          total: 18,
          open: [9, 14],
          foot: "Two elements open before cut-in",
        },
        go: { label: "See the change control solution →", href: "/domains/change-control" },
      },
      {
        domain: "supplier-management",
        line: "Sub-tier PPAP and supplier 8Ds across the boundary, not by email.",
        viz: {
          kind: "thread",
          wash: "paper",
          kicker: "Sub-tier PPAP",
          messages: [
            { org: "Tier 2 supplier", text: "PPAP package and control plan for the change", ext: true },
            { org: "Supplier Quality", text: "Reviewed, one element returned" },
          ],
        },
        go: { label: "See the supplier solution →", href: "/domains/supplier-management" },
      },
      {
        domain: "training-competency",
        line: "Every control-plan change cascades to training and the layered audit.",
        viz: {
          kind: "lanes",
          wash: "warm",
          kicker: "Training cascade",
          lanes: [
            { name: "Control plan revision", owner: "Quality Systems", pct: 100 },
            { name: "Operator training", owner: "Production", pct: 68 },
            { name: "LPA checklist", owner: "Quality", pct: 45 },
          ],
        },
      },
    ],
  },

  lead: [
    { name: "OEM quality hold · controlled shipping (CS-1/CS-2)", viz: "bins", detail: ["Finished goods"] },
    { name: "8D overdue on a warranty return", viz: "calendar", clock: "Customer response window" },
    { name: "PPAP rejected at cut-in", viz: "letter", detail: ["Customer supplier portal", "PPAP REJECTED"], clock: "before cut-in" },
  ],
};
