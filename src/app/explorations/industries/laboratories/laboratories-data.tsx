/* ============================================================================
 * Laboratories — industry page data. All values trace to Notion.
 *
 * source: Industries DB -> "Laboratories" (id ff3db19b..., ID-8). Economics
 *   (Companies 3, Employees 24K, Est Annual Tax Low/High), Competitive
 *   Landscape, Primary Fear Anchor, Opportunity, Proof Requirement, Proof
 *   Maturity, and Regulatory Vocabulary are canonical fields on that row.
 * source: Trigger Events DB (3 linked to Laboratories) -> Data integrity finding,
 *   Audit finding on document control, Regulatory change notification. The other
 *   "what's breaking" moments come from the canonical Primary Fear Anchor (the
 *   90-day scope-suspension clock; removal from an approved testing list; method
 *   validation traceability finding).
 * source: Domains DB -> the coordination-domain taxonomy, adapted to lab function
 *   names; module rosters are canonical-derived from the Domain descriptions +
 *   the industry's Regulatory Vocabulary. No per-event dollar figure is stated
 *   (Notion has none for this segment); framing / headlines are authored.
 * ========================================================================== */

import type { IndustryData } from "../_shared/types";

export const LABORATORIES: IndustryData = {
  slug: "laboratories",
  name: "Laboratories",

  meta: {
    title: "Laboratories · Unifize",
    description:
      "Your LIMS records the result. It cannot reconstruct why. Unifize rebuilds the decision trace around it: the nonconformance, the corrective action, and the effectiveness check that survives the ISO/IEC 17025 surveillance audit. The industry template, instanced on Laboratories.",
  },

  hero: {
    crumb: "Laboratories",
    titleLead: "Your LIMS has the result.",
    titleTurn: "Not why.",
    sub: "Built for ISO/IEC 17025-accredited testing and calibration labs, where every nonconformance, method deviation, and analyst competency record has to stay traceable, and survive the accreditation surveillance audit.",
    chips: ["ISO/IEC 17025", "21 CFR Part 11", "GLP · 21 CFR 58", "ALCOA+", "CLIA / CAP"],
    trustLabel: "Built for ISO/IEC 17025-accredited labs",
  },

  difference: {
    heading: "The decision lives in the thread, not the LIMS result.",
    lede: "Your LIMS records the result. Unifize reconstructs the decision trace around it: the nonconformance, the root cause, the corrective action, and the effectiveness check the assessor asks for.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Nonconformance raised", who: "Analyst", when: "T+0" },
      { t: "Investigation & root cause bound", who: "Unifize", when: "T+0" },
      { t: "Corrective action review", who: "Technical Signatory", when: "T+7d" },
      { t: "Effectiveness check approved", who: "Quality Manager", when: "T+14d" },
      { t: "Record sealed · ISO/IEC 17025", who: "Unifize", when: "T+14d" },
    ],
    trailFoot: "The same nonconformance, sealed with root cause and effectiveness attached. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / capa / NC-3092",
    mobileLabel: "Corrective-action decision trace",
    mobileId: "NC-3092 · nonconformance → root cause → corrective action → effectiveness → seal",
  },

  ingress: { role: "Quality, Ops, Technical, Data", modules: "NC, method deviation, competency", breaking: "Data integrity, doc-control findings" },

  personas: {
    heading: "When the assessor is in the lab, someone reconstructs it.",
    lede: "The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at the accreditation surveillance audit.",
    cards: [
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Accreditation confidence",
        titles: ["Quality Manager", "QA Manager", "Quality Systems Manager", "Lab Director"],
        value: "Every nonconformance and corrective action stays reconstructable, so the trace is already there when the assessor arrives, not rebuilt against a 90-day scope-suspension clock.",
        cares: "Accreditation outcomes · NC closure · corrective-action effectiveness · audit readiness",
        worries: "Open nonconformances · overdue corrective actions · surveillance findings · scope suspension",
        primary: true,
      },
      {
        key: "operations",
        iconKey: "operations",
        name: "Lab Operations",
        stake: "Turnaround",
        titles: ["Lab Operations Manager", "Section Head", "Lab Supervisor"],
        value: "Method deviations and dispositions move on one accountable thread, so testing turnaround stops waiting on an email to release or repeat a result.",
        cares: "Turnaround time · sample throughput · disposition speed · capacity",
        worries: "Held results · firefighting · slow dispositions · repeat testing",
      },
      {
        key: "regulatory",
        iconKey: "regulatory",
        name: "Technical & Method",
        stake: "Method integrity",
        titles: ["Technical Signatory", "Method Validation Lead", "Metrology Lead"],
        value: "Method validation, measurement uncertainty, and calibration traceability stay current and linked, so a method change never outruns its validation evidence.",
        cares: "Method validation · measurement uncertainty · calibration traceability · proficiency testing",
        worries: "Unvalidated method changes · calibration gaps · uncertainty errors · PT failures",
      },
      {
        key: "compliance-validation",
        iconKey: "compliance-validation",
        name: "Data Integrity & Compliance",
        stake: "Data integrity",
        titles: ["Data Integrity Lead", "CSV Lead", "Compliance Manager"],
        value: "Raw data, audit trails, and electronic signatures are held to ALCOA+, so data-integrity evidence for FDA-regulated work is a record, not a reconstruction.",
        cares: "ALCOA+ · 21 CFR Part 11 · audit-trail integrity · raw-data control",
        worries: "Data-integrity findings · audit-trail gaps · uncontrolled raw data · GLP exposure",
        anchor: "#validated",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Training & Competency",
        stake: "Competency currency",
        titles: ["Training Coordinator", "Competency Lead", "Section Trainer"],
        value: "Analyst competency and re-qualification stay current with every method change, so training completeness is proof on the record, not a scramble before the audit.",
        cares: "Analyst competency · re-qualification · training currency · authorization",
        worries: "Overdue competency records · unauthorized analysts · training gaps at audit",
      },
    ],
  },

  coverage: {
    heading: "Seven domains. In each one, the same question: can you replay the decision?",
    lede: "Filter by the framework you are assessed against to see which controls evidence it.",
    standardFilters: ["ISO/IEC 17025", "21 CFR Part 11", "GLP · 21 CFR 58", "ALCOA+", "CAP / CLIA"],
    domains: [
      {
        slug: "quality",
        name: "Quality",
        tier: "Primary",
        promise: "The largest accumulator of coordination tax and your accreditation surface, where the nonconformance-to-effectiveness trace either exists or is rebuilt for the assessor.",
        modules: [
          { name: "Nonconformance (NC) Management", blurb: "Nonconforming test results and OFIs owned, evidenced, and dispositioned on one thread, not a spreadsheet and an inbox.", standards: ["ISO/IEC 17025"] },
          { name: "Corrective Action & Effectiveness", blurb: "Root cause to verified effectiveness on one trail, closed before the 90-day scope clock.", standards: ["ISO/IEC 17025"] },
          { name: "Method Deviation Management", blurb: "Method deviations captured where they happen, with the investigation and impact attached.", standards: ["ISO/IEC 17025"] },
          { name: "Internal Audit", blurb: "Findings, responses, and closures on a durable trail, ready for the surveillance assessment.", standards: ["ISO/IEC 17025"] },
        ],
      },
      {
        slug: "method-development",
        name: "Method Development & Validation",
        tier: "Primary",
        promise: "Method development, validation, and verification: technical decisions that lose their rationale when approvals live in email and the notebook.",
        modules: [
          { name: "Method Validation", blurb: "Validation and verification evidence, measurement uncertainty, and traceability assembled as it is generated, linked to the scope it supports.", standards: ["ISO/IEC 17025"] },
          { name: "Proficiency Testing / Inter-lab", blurb: "PT and inter-laboratory comparison results held on one record, with the corrective action when a result is out.", standards: ["ISO/IEC 17025"] },
        ],
      },
      {
        slug: "document-records-control",
        name: "Document & Records Control",
        tier: "Secondary",
        promise: "Procedures, technical records, and the quality manual with version integrity; a document-control finding is a common surveillance observation.",
        modules: [
          { name: "Document Control", blurb: "Procedures and forms in active use tied to an auditable approval record and the current revision.", standards: ["ISO/IEC 17025", "21 CFR Part 11"] },
          { name: "Technical Record Integrity", blurb: "Technical records and raw data retained, attributable, and traceable to the test and the analyst.", standards: ["ALCOA+", "21 CFR Part 11"] },
        ],
      },
      {
        slug: "training-competency",
        name: "Training & Competency",
        tier: "Secondary",
        promise: "Analyst competency and authorization are an assessment target; a competency gap on a method suspends the analyst, not just the record.",
        modules: [
          { name: "Competency & Authorization", blurb: "Analyst competency, authorization, and re-qualification maintained current per method, ready as an assessment target.", standards: ["ISO/IEC 17025"] },
          { name: "Training Cascades", blurb: "Method and procedure changes create the training cascade, assignment, completion, and proof, before the effective date.", standards: ["ISO/IEC 17025"] },
        ],
      },
      {
        slug: "equipment-calibration",
        name: "Equipment & Calibration",
        tier: "Primary",
        promise: "Equipment calibration and maintenance records, and result dispositions made without a durable decision trace.",
        modules: [
          { name: "Equipment Calibration & Maintenance", blurb: "Calibration history, maintenance, and out-of-tolerance dispositions held on one record, ready for the assessor.", standards: ["ISO/IEC 17025"] },
          { name: "Result Disposition", blurb: "Held and repeat results dispositioned with the evidence and approver recorded at the moment the call is made.", standards: ["ISO/IEC 17025"] },
        ],
      },
      {
        slug: "data-integrity",
        name: "Data Integrity & Compliance",
        tier: "Secondary",
        promise: "Data integrity for FDA-regulated lab work, governed as a layer beside accreditation.",
        modules: [
          { name: "Data Integrity Governance", blurb: "Access controls, audit-trail integrity, and electronic-signature compliance held to ALCOA+.", standards: ["21 CFR Part 11", "ALCOA+"] },
          { name: "GLP / Regulated Work", blurb: "IQ / OQ / PQ and audit-trail evidence for GLP and FDA-regulated testing held on a governed record.", standards: ["GLP · 21 CFR 58", "21 CFR Part 11"] },
        ],
      },
      {
        slug: "report-governance",
        name: "Customer & Report Governance",
        tier: "Secondary",
        promise: "Test report issuance, amendments, and customer complaints handled with a durable decision trace.",
        modules: [
          { name: "Report Amendment Control", blurb: "Amended and corrected reports issued with the reason and approver recorded, tied to the original.", standards: ["ISO/IEC 17025"] },
          { name: "Customer Complaint Handling", blurb: "Client complaints triaged, investigated, and linked to corrective action on one trail.", standards: ["ISO/IEC 17025"] },
        ],
      },
    ],
  },

  triggers: {
    heading: "The moments that start a clock you don't control.",
    lede: "Accreditation and statutory deadlines, not internal outcomes. Each one routes to the process that answers it and the team that owns the response.",
    rows: [
      { name: "Data integrity finding", clock: "ALCOA+ review · 21 CFR Part 11", severity: "Urgent", routesTo: "Data Integrity Governance", owner: "Data Integrity & Compliance" },
      { name: "ISO/IEC 17025 nonconformance at surveillance", clock: "90 days to close or scope suspends", severity: "Urgent", routesTo: "Corrective Action & Effectiveness", owner: "Quality" },
      { name: "Customer audit removes lab from an approved list", clock: "supplier-list removal risk", severity: "Urgent", routesTo: "Corrective Action & Effectiveness", owner: "Quality" },
      { name: "Audit finding on document control", clock: "under accreditation clock", severity: "High", routesTo: "Document Control", owner: "Quality" },
      { name: "Method validation traceability gap at audit", clock: "under assessment clock", severity: "High", routesTo: "Method Validation", owner: "Technical & Method" },
      { name: "Regulatory or standard change notification", clock: "standards revision cycle", severity: "High", routesTo: "Document Control", owner: "Quality / Technical" },
    ],
  },

  coexistence: {
    heading: "It sits on the LIMS you already run, not on top of it.",
    systemsOfRecord: ["LIMS", "ELN", "QMS", "Calibration"],
    approval: "an attributable e-signature",
    body: "Unifize replaces the ungoverned channels (email, SharePoint, spreadsheets) where the decision trace goes missing. It does not displace LabWare, LabVantage, or STARLIMS, and the corrective-action workflow lands value without a LIMS integration. Approvals are captured as an attributable e-signature, 21 CFR Part 11 where the work is FDA-regulated.",
    diagramCaption: "Unifize as the coordination layer over your LIMS, ELN, QMS and calibration system.",
  },

  cost: {
    heading: "The cost is real. It just never lands on a line you can see.",
    events: [
      { name: "Nonconformance → corrective action", coordination: "Analyst, technical signatory, and quality reconstruct root cause across records", owner: "Quality", atRisk: "weeks of cycle time; scope suspension if it ages" },
      { name: "Method deviation & validation", coordination: "Technical and quality assemble validation evidence and uncertainty", owner: "Technical & Method", atRisk: "a traceability gap at assessment" },
      { name: "Analyst competency on method change", coordination: "Every method change fans out to authorization, training, and proof", owner: "Training & Competency", atRisk: "an unauthorized-analyst finding at audit" },
      { name: "Equipment calibration disposition", coordination: "Quality and operations reconcile out-of-tolerance impact across affected results", owner: "Quality / Ops", atRisk: "recall of affected results; held reports" },
      { name: "Data integrity review", coordination: "Compliance reconstructs audit trails and raw-data lineage for regulated work", owner: "Data Integrity & Compliance", atRisk: "an ALCOA+ finding; lost client work" },
    ],
    consequences: [
      { type: "Cycle time", items: ["Long nonconformance and corrective-action cycle times", "Delayed report release and turnaround"] },
      { type: "Cost of poor quality", items: ["Coordination headcount embedded in cost per test"] },
      { type: "Compliance drag", items: ["Persistent open nonconformances and overdue corrective actions", "Slow surveillance-audit and client-audit proof", "Lagging data-integrity and trend detection"] },
      { type: "Revenue risk", items: ["Removal from an approved testing supplier list", "Suspended accreditation scope", "Lost client work"] },
      { type: "Working capital", items: ["Repeat testing and idle capacity"] },
    ],
    economics: { companies: 3, employees: 24_000, annualTaxLow: 1_847_711, annualTaxHigh: 18_065_131 },
    stakesMeta: "Modeled across the accredited-lab reference segment (3 companies, 24K employees)",
  },

  validated: {
    eyebrow: "For your quality and data-integrity teams",
    headline: "Built to sit beside your LIMS, and to survive the accreditation audit that assesses it.",
    points: [
      {
        icon: "stack",
        label: "Coexistence, not replacement",
        body: "Unifize sits alongside the LIMS, ELN, QMS, and calibration systems you already run. The corrective-action workflow lands value without a LIMS integration, and replaces the ungoverned channels where the decision trace goes missing.",
      },
      {
        icon: "shield",
        label: "ALCOA+ and Part 11 by default",
        body: "Raw data, audit trails, and electronic signatures are attributable and time-stamped, so the technical record holds to ALCOA+ and, for FDA-regulated work, 21 CFR Part 11, not a reconstruction after the fact.",
      },
      {
        icon: "chat",
        label: "Your assessor's questions, answered directly",
        body: "Nonconformance and corrective-action closure, analyst competency, calibration history, and method-validation traceability are walked through with your team, and built to survive the biennial surveillance audit.",
      },
    ],
    cta: "Talk to our team",
  },

  proof: {
    heading: "Proof, held to the standard your assessors demand.",
    lede: "Laboratory buyers are scientifically sophisticated and judge references against their own method-validation discipline. Here is the evidence standard this segment holds, and the honest state of ours.",
    points: [
      "Proof from an ISO/IEC 17025-accredited organization at a similar scope, testing, calibration, or both, and a similar end-market profile.",
      "Quantified improvement in nonconformance closure cycle time, method deviation response time, analyst competency tracking completeness, or audit observation closure rate.",
      "Demonstration that the system survives the biennial accreditation surveillance audit.",
      "For labs serving FDA-regulated clients, a documented validation package (IQ / OQ / PQ) and audit-trail evidence to the ALCOA+ standard.",
    ],
    maturityNote: "Proof maturity for laboratories is at the advocacy stage: references exist but none are attached to this page yet, and we will not attach a metric until a customer has signed off on it. What we will do on a call is reconstruct one of your own nonconformance or corrective-action decisions live.",
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Incumbents track the result. Unifize reconstructs the decision.",
    lede: "Pick a nonconformance or corrective action you could not replay at the last surveillance audit. We will reconstruct it live.",
  },
};
