/* ============================================================================
 * Quality — domain (Solutions) page data. All values trace to Notion.
 *
 * source: Domains DB -> "Quality" (31d860e6b45e812e8ea6ddb2f1f49bfd, Domain 10,
 *   Tier Primary). The hero problem framing and the leak thesis are the row's
 *   Description field: coordination tax accumulates when deviation management,
 *   CAPA execution, MRB disposition and audit findings require cross-functional
 *   evidence assembly without a structured decision trace; the event clock
 *   lives in email and side channels. Budget owner: VP Quality / QA Director.
 * source: Themes DB (18 linked) -> the work ledger. One line distilled from
 *   each Theme's Description.
 * source: Pain Points DB (10 linked) -> the leak register, Name / Description /
 *   Severity verbatim-condensed. The cost band carries the qualitative cost
 *   from "Audit-day evidence pull collapses to a manual rebuild" (days of
 *   senior time per audit cycle) — Notion has no per-domain dollar figure, so
 *   none is stated.
 * source: Customer JTBDs DB (16 linked) -> the CAPA flow (Primary-land JTBD
 *   "CAPA root cause investigation and effectiveness check") and the release /
 *   deviation vocabulary.
 * source: Modules DB (18 with Primary Domain = Quality) + Products DB (QMS ID-1,
 *   LIMS ID-8, CI ID-10, all Primary Domain = Quality) -> the coverage map.
 *   Module blurbs distilled from their Notion Descriptions; standards from the
 *   QMS External Standards short-names already resolved in qms-data.tsx.
 * source: Product Personas DB -> "Quality Manager" (PPS-2, Tier Primary, Goal
 *   Zero Pass) for the primary persona card; supporting role cards use the
 *   role vocabulary named in the Themes descriptions (Quality Engineers, CAPA
 *   Owners, QA Reviewers, Production Supervisors, MRB members).
 * source: Trigger Events DB (18 linked) -> the trigger board. Clocks condensed
 *   from each event's Description / Regulatory Framework.
 * source: resources/_shared/resources-data.ts TESTIMONIALS (QMS-tagged) -> the
 *   proof quotes. Placeholder companies, same status as the rest of the
 *   exploration site.
 * Framing / headlines are authored on top of the canonical facts; nothing
 * factual is invented.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";

export const QUALITY_DATA: DomainPageData = {
  slug: "quality",
  name: "Quality",
  tier: "Primary",

  meta: {
    // The root layout template appends "· Unifize".
    title: "Quality · Solutions",
    description:
      "Deviations, CAPAs, MRB dispositions and audit findings close on cross-functional decisions that never reach the record. Unifize keeps the decision trace: the full map of quality work, in your industry's regulatory frame.",
  },

  hero: {
    crumb: "Quality",
    titleLead: "Your quality system closes the event.",
    titleTurn: "It loses the decision.",
    sub: "The judgement behind every deviation, CAPA and audit response lives in email and side channels. Unifize makes the decision part of the record.",
    // Parity chips — the flagship Themes, not standards.
    chips: ["CAPA", "Deviations", "Non-conformance", "Audits", "Batch release", "Complaints"],
    // Floating evidence cards over the hero stage: the sealed CAPA from the
    // flow section and the 483 statutory clock from the trigger board.
    floats: [
      { kind: "seal", title: "Effectiveness verified", meta: "CAPA-1284 · sealed by Head of Quality" },
      { kind: "clock", title: "483 response clock", meta: "15 working days · answered on the record" },
    ],
    // The trust-strip slot: industries with live pages where the QMS/LIMS/CI
    // products run (Products DB Industries relations), linking into the site.
    runsIn: {
      label: "Runs wherever quality is regulated",
      links: [
        { name: "Medical devices", href: "/explorations/industry-template-modern" },
        { name: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
        { name: "Automotive", href: "/explorations/industries/automotive" },
        { name: "Aerospace", href: "/explorations/industries/aerospace" },
        { name: "Food processing", href: "/explorations/industries/food-processing" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: Themes DB, all 18 rows linked to Quality; one line per Theme,
   * distilled from its Description. Grouped into buyer-vocabulary clusters
   * (grouping is editorial; membership traces to each Theme's Description).
   * Copy rule: no internal system words on the page (canonical, pain map,
   * register). Group runsIn links = journey ingress into live product pages. */
  work: {
    heading: "If quality owns it, it has a home here.",
    lede: "The work quality teams actually run, as governed workflows: named owners, evidence attached where the decision happens, a close that stands up in an audit. Start with one; they link as you grow.",
    groups: [
      {
        glyph: "loop",
        name: "The event loop",
        line: "Something goes wrong, gets investigated, gets closed for good.",
        runsIn: { label: "Runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Deviation Management", line: "Capture, classify and close departures from procedure before the batch ages out." },
          { name: "Non-conformance and Disposition", line: "Segregate, investigate and disposition material with the reasoning kept on the record." },
          { name: "Corrective and Preventive Action", line: "Root cause, committed actions and effectiveness checks that close before the auditor returns." },
          { name: "Customer Complaint Investigation", line: "Intake to closure inside the regulatory clock, with the learning captured back into the system." },
          { name: "Complaint and Event Trending", line: "Signals separated from noise across complaints, deviations and field events." },
        ],
      },
      {
        glyph: "doc",
        name: "Release and the lab",
        line: "Everything between the last test result and product out the door.",
        runsIn: { label: "Batch records run in the MES product →", href: "/explorations/products/mes" },
        items: [
          { name: "Batch Record Review and Release", line: "Line-by-line review to release, with deviations, checks and signatures reconciled." },
          { name: "Environmental Monitoring and Facility Control", line: "Excursions classified consistently, affected lots identified, control provable with current data." },
          { name: "Stability and Shelf-Life Management", line: "Pulls on schedule across lots and conditions, trends surfaced, outcomes linked to claims." },
          { name: "Equipment Qualification and Calibration", line: "Out-of-tolerance events dispositioned with the affected product identified." },
          { name: "Cleaning Validation and Changeover", line: "Residues sampled, tested and dispositioned in time to release the line." },
        ],
      },
      {
        glyph: "scale",
        name: "Risk and validation",
        line: "Prove it works, and keep it proven as things change.",
        runsIn: { label: "Runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Quality Risk Management", line: "Risk registers that stay current as the operation evolves, not as of the last gate." },
          { name: "FMEA and Design/Process Risk Analysis", line: "Failure modes converted into control plans and validations the floor actually uses." },
          { name: "Validation and Qualification", line: "IQ, OQ and PQ runs scheduled around production and synchronised with change control." },
        ],
      },
      {
        glyph: "box",
        name: "Suppliers and the field",
        line: "Quality at the edges: incoming parts, external partners, installed product.",
        items: [
          { name: "New Part Approval and First Article Inspection", line: "Production gated on clean FAI evidence against the latest drawing revision." },
          { name: "Emergency Supplier Authorization", line: "A months-long qualification compressed to days without undisclosed risk." },
          { name: "Contract Manufacturing and CMO Governance", line: "Joint deviations, batch review and change governed across two quality systems." },
          { name: "Product Returns and RMA Processing", line: "Authorise, receive and disposition returns, with trends fed back into CAPA and design." },
          { name: "Installation Qualification and Field Commissioning", line: "Commissioning records at customer sites that meet regulatory expectations." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, all 10 rows linked to Quality. Names verbatim;
   * bodies condensed from the Description field; Severity verbatim. */
  leaks: {
    heading: "The work gets done. The record can't prove it.",
    lede: "The failure modes we see inside quality teams. None of them is a missing feature. All of them are decisions that happened off the record.",
    // `surface` = where the decision leaks to, condensed from each pain's
    // Description (the DMS coordination-tax surface-tag pattern).
    pains: [
      { severity: "Critical", surface: "Audit day", name: "Audit-day evidence pull collapses to a manual rebuild", body: "When an auditor asks for the full record of a deviation, change or CAPA, the team spends hours stitching together exports, screenshots and email forwards. The audit passes; the cost of passing is days of senior time." },
      { severity: "Critical", surface: "Drives & threads", name: "Evidence not bound to commit points", body: "Disposition, root-cause acceptance, effectiveness verification, closure: the decisions happen at definable commit points, but the supporting evidence lives in attachments and threads that are not bound to them." },
      { severity: "Critical", surface: "The floor", name: "Quality system drift between paper and floor", body: "The QMS as documented passes external audits. The QMS as practised on the floor differs in places operators treat as 'how it really works'. The drift is invisible until a serious finding forces it open." },
      { severity: "High", surface: "Floor walks & email", name: "Disposition decisions live in side channels", body: "Release, rework, scrap or deviate gets argued in floor walks, huddles and emails to QA. The disposition lands in the record; the reasoning, alternatives and who agreed do not." },
      { severity: "High", surface: "Inbox & meetings", name: "Status-chasing across CAPA threads", body: "Investigators and quality managers spend daily cycles asking the next owner where a CAPA stands, because the record does not surface its own state." },
      { severity: "High", surface: "The data", name: "Repeat non-conformance pattern recognition fails", body: "Each event is investigated as a fresh case. The pattern across cases (same root cause, same supplier, same line) is visible in the data but never surfaces in the workflow." },
      { severity: "High", surface: "The audit report", name: "Internal audit findings stall at owner assignment", body: "The finding sits in the audit report; the action sits in nobody's queue; the next audit re-finds it." },
      { severity: "Medium", surface: "The calendar", name: "Effectiveness verification routinely slips", body: "Verification has a target date but no enforced gate. It slips by weeks, closes on paperwork, and the recurrence test is rarely a real one." },
      { severity: "Medium", surface: "The register", name: "Risk register reflects gate-day state", body: "Risk assessments are produced for reviews, validations and audits, then not refreshed when the process, supplier or failure modes change." },
      { severity: "Medium", surface: "Spreadsheets", name: "KPI dashboards need a manual build each quarter", body: "CAPA cycle time, defect rate, supplier quality and audit findings cannot be answered without a custom report. Senior time goes into the build instead of the question." },
    ],
    note: "Severity as rated in our field research with quality teams, current as of the last review.",
    // Qualitative by design: Notion carries no per-domain dollar figure, so the
    // band states the canonical cost from the audit-evidence pain instead.
    tax: {
      label: "The recurring bill",
      value: "Days of senior time, every audit cycle.",
      meta: "The audit passes. The cost of passing is the manual rebuild of evidence that was never bound to the record it belongs to.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: Customer JTBDs -> "CAPA root cause investigation and effectiveness
   * check" (S15, Primary land); step vocabulary from the CAPA module's Notion
   * Description (root cause acceptance, action plan, effectiveness
   * verification, closure, relation back to the originating event). */
  flow: {
    heading: "Run the CAPA where the decisions happen.",
    lede: "Most systems track CAPA status. Unifize holds the investigation itself, so root-cause acceptance, committed actions and the effectiveness check seal into a trace an auditor can replay.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Non-conformance escalates to CAPA", who: "Quality Engineer", when: "Day 0" },
      { t: "Root cause accepted", who: "QA Reviewer", when: "Day 6" },
      { t: "Actions committed with owners", who: "Ops · Engineering", when: "Day 9" },
      { t: "Effectiveness verified in window", who: "CAPA Owner", when: "Day 34" },
      { t: "Closed · trace sealed", who: "Head of Quality", when: "Day 35" },
    ],
    trailFoot: "The relation runs back to the event that raised it, and forward into the change and training it triggers. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / capa / CAPA-1284",
    mobileLabel: "CAPA decision trace",
    mobileId: "CAPA-1284 · event → root cause → actions → verified close",
  },

  /* ------------------------------------------------ 04 · for your industry
   * The L1 fan-out (2026-07-09 call: "quality for medical devices"). Rows link
   * to the live industry pages; each line instances Quality in that industry's
   * regulatory vocabulary (frameworks from the Trigger Events' Regulatory
   * Framework fields and the industry pages' own canonical chips). */
  industries: {
    heading: "Quality, in your regulatory frame.",
    lede: "The same work, translated to the standards you are inspected against. Every industry page carries quality in its own vocabulary.",
    rows: [
      { name: "Medical devices", line: "CAPA, complaints and MDR reporting.", chips: ["21 CFR 820", "ISO 13485", "EU MDR"], href: "/explorations/industry-template-modern" },
      { name: "Pharmaceuticals", line: "Deviations, OOS investigations and batch release.", chips: ["21 CFR 211", "ICH Q10"], href: "/explorations/industries/pharmaceuticals" },
      { name: "Automotive", line: "NCRs, 8D and supplier quality.", chips: ["IATF 16949"], href: "/explorations/industries/automotive" },
      { name: "Aerospace", line: "Nonconformance, MRB and first-article inspection.", chips: ["AS9100", "NADCAP"], href: "/explorations/industries/aerospace" },
      { name: "Chemicals", line: "Batch deviations, CoA control and supplier quality.", chips: ["ISO 9001"], href: "/explorations/industries/chemicals" },
      { name: "Food processing", line: "Holds, HACCP verification and supplier approval.", chips: ["FSMA", "GFSI"], href: "/explorations/industries/food-processing" },
      { name: "Laboratories", line: "OOS handling, calibration and result integrity.", chips: ["ISO/IEC 17025"], href: "/explorations/industries/laboratories" },
      { name: "Cosmetics", line: "Complaints, adverse events and batch traceability.", chips: ["MoCRA"], href: "/explorations/industries/cosmetics" },
      { name: "Nutritional supplements", line: "Specifications, batch records and complaint files.", chips: ["21 CFR 111"], href: "/explorations/industries/nutritional-supplements" },
      { name: "Industrial machinery", line: "NCRs and FAI on build-to-order programs.", chips: ["ISO 9001"], href: "/explorations/industries/industrial-machinery" },
      { name: "Contract research orgs", line: "GCP quality events, audit findings and CAPA.", chips: ["ICH E6"], href: "/explorations/industries/cro" },
    ],
    foot: "Each page carries the full map for that industry: personas, modules and trigger moments in its own vocabulary. Yours not listed? The workstreams are industry-agnostic by design.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB (Primary Domain = Quality) grouped by Primary Product
   * (Products DB: QMS ID-1, LIMS ID-8, CI ID-10). Blurbs distilled from each
   * module's Notion Description. Standards short-names as resolved in
   * qms-data.tsx (QMS External Standards) and the LIMS module descriptions.
   * QMS modules link to the live product page; LIMS and CI have no page yet. */
  coverage: {
    heading: "The products that do the quality work.",
    lede: "The modules below serve this domain, bundled into the Quality Management System, LIMS and Continuous Improvement products. Filter by the standard you are audited against.",
    standardFilters: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR 211", "IATF 16949", "AS 9100", "ISO/IEC 17025"],
    groups: [
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Primary",
        promise: "The event backbone: capture, disposition, escalation and verified close on one governed record.",
        modules: [
          { name: "Non-conformance", blurb: "Capture, disposition and closure with required fields, named ownership and evidence binding. Escalates into CAPA when warranted.", standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "IATF 16949", "AS 9100"], href: "/explorations/products/qms" },
          { name: "Corrective & Preventive Actions", blurb: "Root-cause acceptance, action plan, effectiveness verification and closure, related back to the originating event.", standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR 211"], href: "/explorations/products/qms" },
          { name: "Quality Events", blurb: "Non-conformances, defects and observations dispositioned with reopen governance.", standards: ["ISO 9001", "21 CFR 820"], href: "/explorations/products/qms" },
          { name: "Audit Management", blurb: "Scheduling, finding tracking, response routing and effectiveness verification across internal, external and customer audits.", standards: ["ISO 9001", "ISO 13485", "IATF 16949", "AS 9100"], href: "/explorations/products/qms" },
          { name: "Quality Risk Management", blurb: "Risk register, assessment workflows, control verification and periodic review, aligned to ISO 14971 and ICH Q9.", standards: ["ISO 13485", "21 CFR 820"], href: "/explorations/products/qms" },
        ],
      },
      {
        slug: "lims",
        name: "Laboratory Information Management",
        tier: "Secondary",
        promise: "The lab leg of quality, in development. Until it ships, Unifize coordinates over the LIMS you already run.",
        // Honest status: LIMS ships as an Enhancement (Products DB, Goal Zero
        // Pending); label the cards instead of leaving them silently unlinked.
        modules: [
          { name: "Sample Tracking & Management", blurb: "Registration, chain of custody and status tracking from receipt to disposal.", standards: ["ISO/IEC 17025"], soon: "In development" },
          { name: "Test Scheduling & Management", blurb: "Queue management, analyst assignment, prioritisation and turnaround tracking.", standards: ["ISO/IEC 17025"], soon: "In development" },
          { name: "Results Management", blurb: "Result capture, review, approval and out-of-specification handling.", standards: ["ISO/IEC 17025", "21 CFR 211"], soon: "In development" },
          { name: "Lab Compliance & Reporting", blurb: "GLP, ISO 17025 and pharmacopoeial reporting for laboratory operations.", standards: ["ISO/IEC 17025"], soon: "In development" },
          { name: "Instrument Calibration", blurb: "Calibration schedules, records and certificate management for lab instruments.", standards: ["ISO/IEC 17025"], soon: "In development" },
        ],
      },
      {
        slug: "ci",
        name: "Continuous Improvement",
        tier: "Secondary",
        promise: "The loop after the close: projects, Kaizen and standard work that hold the gain.",
        modules: [
          { name: "Improvement Project Tracking", blurb: "A project register with stage gates, owners and outcome tracking.", soon: "In development" },
          { name: "Kaizen Event Management", blurb: "Event planning, execution and outcome capture.", soon: "In development" },
          { name: "Process Improvement Plans", blurb: "Plans tied to specific processes with baseline, target and result.", soon: "In development" },
          { name: "Change Implementation Records", blurb: "Implemented changes with before-and-after metrics and lessons learned.", soon: "In development" },
          { name: "Lessons Learned Documentation", blurb: "A searchable archive of lessons across projects and events.", soon: "In development" },
          { name: "CI Risk Assessment & Mitigation", blurb: "Risk assessment specific to continuous-improvement initiatives.", soon: "In development" },
          { name: "Standard Work Documentation", blurb: "Standard work with version control and training linkage.", soon: "In development" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: Product Personas DB -> Quality Manager (PPS-2, Primary, Goal Zero
   * Pass; titles and caseload from its Description). Supporting cards carry the
   * role vocabulary named across the Themes descriptions. */
  personas: {
    heading: "The decision always lands on a desk.",
    lede: "Every workstream above closes on a named role's judgement. Find your seat and see what changes when the decision stays on the record.",
    cards: [
      {
        key: "quality-leadership",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Owns the QMS",
        titles: ["Quality Manager", "QA Manager", "Director of Quality", "Head of Quality"],
        value: "Dozens of pending decisions arrive with their evidence already bound: CAPAs, deviations, approvals and audit findings on one queue instead of five inboxes.",
        cares: "Audit readiness · CAPA cycle time · Release confidence",
        worries: "Repeat findings · Effectiveness slips · Side-channel decisions",
        href: "/explorations/personas/quality-manager",
        primary: true,
      },
      {
        key: "quality-engineering",
        iconKey: "engineering",
        name: "Quality engineering",
        stake: "Runs the investigations",
        titles: ["Quality Engineer", "CAPA Owner", "Investigator"],
        value: "Investigations route across functions on the record. Evidence attaches to the step it belongs to, and status is visible without chasing.",
        cares: "Root-cause quality · Evidence binding · On-time closure",
        worries: "Status chasing · Recurring defects",
      },
      {
        key: "qa-release",
        iconKey: "compliance-validation",
        name: "QA review & release",
        stake: "Signs the release",
        titles: ["QA Reviewer", "Batch Record Reviewer", "QA Release"],
        value: "Review-by-exception: clean records release themselves, and reviewer time goes to the deviations that need judgement.",
        cares: "Complete records · Deviation closure · Right-first-time",
        worries: "Missing signatures · Batches aging on hold",
      },
      {
        // Reframed with agency after the panel read "lives with the holds" as
        // a passive victim; cares/worries now verbatim from BP-20.
        key: "operations",
        iconKey: "operations",
        name: "Operations",
        stake: "Runs the plant",
        titles: ["Plant Manager", "VP Operations", "Production Supervisor"],
        value: "Holds, MRB queues and dispositions move with owners and clocks visible, so the line gets its answer without waiting on a meeting.",
        cares: "Output · Stability · Delivery performance",
        worries: "Missed shipments · Firefighting · Slow decisions",
      },
      {
        // The lab seat the panel's QC persona (BP-12) found missing; all
        // fields from that row's Goals/Cares/Worries.
        key: "lab-release",
        iconKey: "regulatory",
        name: "Lab & release testing",
        stake: "Owns the turnaround",
        titles: ["Lab Manager", "QC Manager", "LIMS Owner", "Quality Control Director"],
        value: "OOS investigations and release decisions move on the same governed thread as the deviations that raised them, coordinated over the LIMS you already run.",
        cares: "Release cycle time · Test turnaround · Data completeness",
        worries: "Retest loops · Missing data · Release bottlenecks",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, 9 of the 18 linked to Quality (all Urgent rows
   * plus the highest-pressure High rows). Clocks condensed from Description /
   * Regulatory Framework. The FDA 483 card opens the live trigger page. */
  triggers: {
    heading: "When quality becomes the headline.",
    lede: "Every one of these moments starts a clock, and each routes into a governed workflow, so the response is coordinated on the record it will be judged by.",
    rows: [
      { name: "FDA Form 483 observation issued", clock: "15 working days to respond", severity: "Urgent", routesTo: "CAPA · Audit Management", owner: "VP Quality", href: "/explorations/triggers/fda-483" },
      { name: "FDA Warning Letter received", clock: "15 working days · follow-on inspection", severity: "Urgent", routesTo: "CAPA", owner: "VP Quality · Executive team" },
      { name: "Failed FDA inspection", clock: "OAI posture · import-alert risk", severity: "Urgent", routesTo: "Audit Management", owner: "Executive team" },
      { name: "Recall scope definition required", clock: "Regulator's stated timeline", severity: "Urgent", routesTo: "Quality Events", owner: "VP Quality · CMO" },
      { name: "MDR / vigilance reporting deadline", clock: "5–30 days by classification", severity: "Urgent", routesTo: "Complaint Investigation", owner: "Quality · Regulatory" },
      { name: "Data integrity finding", clock: "Treated as systemic", severity: "Urgent", routesTo: "Quality Events · Audit", owner: "Quality Compliance" },
      { name: "Production hold pending disposition", clock: "Every hour compounds", severity: "Urgent", routesTo: "Non-conformance", owner: "Plant Manager · QA" },
      { name: "MRB backlog", clock: "Disposition cadence in days", severity: "High", routesTo: "Non-conformance", owner: "Quality Engineering" },
      { name: "Customer audit notification", clock: "Fixed external date", severity: "High", routesTo: "Audit Management", owner: "Quality Manager" },
    ],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: MD_COEXISTENCE canonical context (systems of record, Part 11
   * e-signature approval) + the pharma industry page's shipped coexistence
   * copy. Panel finding: the integration story was absent from this page. */
  coexistence: {
    heading: "It sits on the stack you already run.",
    systemsOfRecord: ["QMS", "ERP", "LIMS", "MES"],
    body: "Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing, not the systems of record that already passed your audits. Approvals are captured as a 21 CFR Part 11 e-signature. No rip-and-replace, and no revalidation of a system that already passed.",
    diagramCaption: "Unifize as the coordination layer over your QMS, ERP, LIMS and MES.",
  },

  /* ------------------------------------------------ 09 · proof
   * source: MD_PROOF canonical data (medical-devices-canonical.ts): the
   * customer-attested signed baseline and the named references already public
   * on the Medical devices page. REAL evidence only; the panel killed the
   * placeholder-testimonial treatment. */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, not a brochure stat, plus the named teams that run quality on Unifize.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline. The figure is anonymized; named references are shown separately.",
    },
    references: [
      {
        tag: "Named reference",
        name: MD_PROOF.customers[0].name,
        desc: MD_PROOF.customers[0].desc,
        // The document-control and training workstreams named in this
        // reference are live in the DMS product (panel flagged the mismatch
        // with this page's quality-module list).
        link: { label: "Document control & training run in the DMS product →", href: "/explorations/products/dms" },
      },
      { tag: "Named reference", name: MD_PROOF.customers[1].name, desc: MD_PROOF.customers[1].desc },
    ],
    foot: { label: "All customer stories", href: "/explorations/resources/testimonials" },
  },

  /* ------------------------------------------------ compliance & trust
   * FACT-GATED: the panel's validation persona called this section's absence
   * demo-blocking (Part 11/Annex 11 posture, audit-trail integrity,
   * e-signature manifestation, SOC 2/ISO 27001, vendor validation package,
   * SaaS release/change-control policy). It renders the moment real facts
   * arrive from engineering/compliance — never author it as marketing copy.
   * The one canonical claim already available (Part 11 e-signature capture)
   * is carried by the coexistence section above. */
  trust: null,

  /* ------------------------------------------------ build the case
   * FACT-GATED champion kit: 4 of 5 panel personas forward this page rather
   * than book. Fill when the artifacts are real: pilot structure with exit
   * criteria, implementation footprint ("first workstream live in N weeks"),
   * per-trigger one-pagers (hold/MRB cost-of-delay), ROI inputs, pricing
   * shape. Needs numbers from Ben / the implementation team. */
  caseKit: null,

  /* ------------------------------------------------ where teams go next
   * The land-and-expand journey: adjacency from the Domains DB relations and
   * the product catalog. Live pages get links; the rest carry honest status
   * notes (their solution pages are on the build roster). */
  growth: {
    heading: "Start with quality. Don't stop there.",
    lede: "The same governed record runs the rest of the operation, so the system you land this quarter is the platform your next function joins.",
    steps: [
      { name: "Quality", note: "You are here" },
      { name: "Document & records control", note: "Live · the DMS product", href: "/explorations/products/dms" },
      { name: "Change control", note: "Live · the PLM product", href: "/explorations/products/plm" },
      { name: "Production records", note: "Live · the MES product", href: "/explorations/products/mes" },
      { name: "Training & competency", note: "Solution page coming" },
      { name: "Supplier management", note: "Solution page coming" },
    ],
  },

  close: {
    eyebrow: "Quality on Unifize",
    heading: "Close the event. Keep the decision.",
    lede: "Bring one workstream, a CAPA backlog, an audit response or a deviation queue, and see the decision trace on your own work in a 30-minute walkthrough.",
  },
};
