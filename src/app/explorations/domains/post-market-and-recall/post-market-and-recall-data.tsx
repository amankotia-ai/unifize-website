/* ============================================================================
 * Post-Market & Recall: domain (Solutions) page data. All values trace to Notion.
 *
 * source: Domains DB -> "Post-Market and Recall" (31d860e6b45e81d4ae37e1ad4077bdb1,
 *   Domain 11, Tier Secondary). The page's organising idea is the row's own
 *   framing: complaint investigation, MDR/vigilance reporting, recall scope
 *   definition and FSCA execution carry the highest coordination load in
 *   regulated manufacturing, because a field action runs manufacturing hold,
 *   customer notification, returns logistics and the regulatory submission in
 *   parallel, each with its own clock and its own decision authority. Budget
 *   owners named on the row: VP Quality / Chief Medical Officer.
 * source: Themes DB (18 rows linked). Six of those rows are flagged in Notion as
 *   DUPLICATE CANDIDATE (IDs 110, 164 or 174, 165 or 176, 175); the page carries
 *   one instance of each distinct workstream, so 14 named workstreams appear.
 *   One line per Theme, distilled from its Description.
 * source: Pain Points DB (3 linked: ID-55 Critical, ID-53 High, ID-54 Medium) ->
 *   the leak section. Names verbatim-ish, bodies condensed from Description,
 *   Severity verbatim. The cost band carries the qualitative cost from ID-55
 *   (recall traceability rebuilt in spreadsheets); Notion has no per-domain
 *   dollar figure, so none is stated.
 * source: Customer JTBDs DB (4 linked): "Field safety corrective action (FSCA)
 *   and recall execution" (ID-71, Primary land), "Complaint intake, triage, and
 *   investigation" (ID-83, Primary land), "MDR / vigilance reporting" (ID-93,
 *   Primary land, Notes: FDA MDR 30 days, 5 days for malfunction; EU IVDR 15
 *   days serious incident), "Post-market surveillance signal detection and trend
 *   analysis" (ID-63). These four are the flow section's decision trace.
 * source: Modules DB -> "Complaint Handling" (ID-16, Primary Domain = this
 *   domain, Primary Product QMS) plus the modules this domain's Pain Points name
 *   in Modules Addressing: "Electronic Batch/Lot Records with QR Codes" (ID-27,
 *   MES), "Corrective and Preventive Actions" (ID-6, QMS), "Field Service Work
 *   Order Management" (ID-51, FSM), "Feedback Tracking" (ID-75, CRM). Standards
 *   resolved from each module's External Standards relation (External Standards
 *   DB short names). Notion records recall execution and MDR/vigilance as having
 *   no module today, so those two cards are labelled in development rather than
 *   shown as shipping product.
 * source: Trigger Events DB -> the two rows linked to this domain, "Recall scope
 *   definition required" (Event 8) and "MDR or vigilance reporting deadline"
 *   (Event 4), plus one row selected by subject rather than by the domain
 *   relation (Event 17, "Production hold pending disposition"), because the hold
 *   is one of the four parallel tracks a field action runs. Clocks condensed
 *   from each event's Description / Regulatory Framework.
 * source: Product Personas DB -> this domain links none, so the role cards carry
 *   the role vocabulary named across the Themes and Pain Points Descriptions
 *   (Vigilance Officers, Post-Market Surveillance Specialists, Medical Affairs,
 *   Recall Coordinators, Customer Service, Logistics, Field Service) and the
 *   budget owners named on the Domains row.
 * source: MD_PROOF canonical data (medical-devices-canonical.ts) -> the signed
 *   baseline and the two named references. Recovery Force runs complaints on
 *   Unifize, which is this domain's own workstream.
 * Framing / headlines are authored on top of the canonical facts; nothing
 * factual is invented.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";

export const POST_MARKET_DATA: DomainPageData = {
  slug: "post-market-and-recall",
  name: "Post-Market & Recall",
  tier: "Secondary",

  meta: {
    // The root layout template appends "· Unifize".
    title: "Post-Market & Recall · Solutions",
    description:
      "A field action runs the manufacturing hold, the customer notification, the returns and the regulatory submission at the same time, each on its own clock. Unifize holds all four against one record, from the complaint that raised it to the verified close.",
  },

  hero: {
    crumb: "Post-Market & Recall",
    titleLead: "A recall is four workflows at once.",
    titleTurn: "Each one runs its own clock.",
    sub: "Manufacturing hold, customer notification, returns logistics and the regulatory submission move in parallel, under different owners. The decisions that hold them together happen on calls nobody records.",
    // Parity chips: the flagship Themes, not standards.
    chips: [
      "Complaints",
      "Vigilance reporting",
      "Recall execution",
      "Field actions",
      "Returns & RMA",
      "Warranty",
    ],
    // Floating evidence cards: the sealed field action from the flow section and
    // the MDR clock from the trigger board (Trigger Event 4).
    floats: [
      { kind: "seal", title: "Field action closed", meta: "FSCA-0417 · effectiveness verified on the record" },
      { kind: "clock", title: "MDR reporting clock", meta: "30 days routine · 5 working days when urgent" },
    ],
    // Industries with live pages where marketed product reaches the field.
    runsIn: {
      label: "Runs wherever product is already in customers' hands",
      links: [
        { name: "Medical devices", href: "/explorations/industry-template-modern" },
        { name: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
        { name: "Food processing", href: "/explorations/industries/food-processing" },
        { name: "Automotive", href: "/explorations/industries/automotive" },
        { name: "Cosmetics", href: "/explorations/industries/cosmetics" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: Themes DB, the rows linked to this domain, deduplicated against the
   * rows Notion itself flags as DUPLICATE CANDIDATE. One line per Theme,
   * distilled from its Description. Clusters are editorial; membership traces to
   * each Theme's Description. Group runsIn links point only at live pages where
   * the work really runs today. */
  work: {
    heading: "Everything that happens after the product ships.",
    lede: "The work post-market teams run, as governed workflows: named owners, evidence bound to the decision that used it, a close an authority can review. Start with one; they link as you grow.",
    groups: [
      {
        glyph: "chat",
        name: "Complaints and the signal underneath",
        line: "What customers report, and what the pattern across reports is telling you.",
        runsIn: { label: "Complaint handling runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Customer Complaint Investigation and Resolution", line: "Intake normalised across channels, then triaged, investigated and closed back with the customer." },
          { name: "Complaint and Event Trending and Signal Detection", line: "Complaints, deviations and field events read together, so a real signal separates from noise." },
          { name: "Customer Feedback and Voice of Customer Governance", line: "Feedback that belongs to product kept apart from complaints that belong to the quality system." },
        ],
      },
      {
        glyph: "pulse",
        name: "Reportability and the authority's clock",
        line: "Deciding what has to be reported, to whom, and filing it before the clock runs out.",
        runsIn: { label: "Reportability assessment runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Adverse Event Reporting and Regulatory Notification", line: "Causality evaluated and reportability classified per jurisdiction, then filed against the tightest clock that applies." },
          { name: "Post-Market Surveillance and Vigilance Reporting", line: "Field performance monitored on a cadence, with signal management provable to a notified body." },
        ],
      },
      {
        glyph: "loop",
        name: "Field action, start to close",
        line: "Getting product corrected or back, and proving to the regulator that it worked.",
        items: [
          { name: "Field Safety Corrective Action and Recall Execution", line: "Severity classified, every affected lot and customer identified, field communication executed on the regulator's timeline." },
          { name: "Field Action Effectiveness Monitoring and Close-Out", line: "Non-responding customers chased, returns reconciled against the affected population, close-out evidenced." },
          { name: "Product Returns and RMA Processing", line: "Authorise, receive and disposition returned material before it ages out, with the return reason captured every time." },
          { name: "Warranty Claims Management", line: "Claims decided consistently across geographies and linked back to supplier and design corrective action." },
        ],
      },
      {
        glyph: "box",
        name: "The installed base",
        line: "Product already in the field: serviced, supplied and eventually retired.",
        items: [
          { name: "Field Service and Maintenance", line: "Technicians, parts and customer access coordinated, with service records that meet regulatory expectations." },
          { name: "Installation Qualification and Field Commissioning", line: "Equipment qualified in the customer's environment and handed into a compliant service program." },
          { name: "Service Parts and Replacement Supply Chain", line: "Low-volume and obsolete parts planned, sourced and held so the installed base stays serviceable." },
          { name: "Installed Base and Product Discontinuation Management", line: "Service, parts and field risk sustained through the support window as a product retires." },
          { name: "End-of-Life and Product Discontinuation Notification", line: "Every affected customer and registration identified, notified on a timed plan, with last-time-buy tracked against supply." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, the rows linked to this domain (ID-55, ID-53,
   * ID-54). Names verbatim-ish; bodies condensed from Description; Severity
   * verbatim. `surface` = where the decision leaks to, condensed from each
   * pain's Description. */
  leaks: {
    heading: "The action gets executed. The chain can't be shown.",
    lede: "The failure modes we see in post-market teams. None of them is a missing feature. All of them are decisions and evidence that sat outside the record when the clock started.",
    pains: [
      {
        severity: "Critical",
        surface: "Spreadsheets & exports",
        name: "Recall traceability assembled in spreadsheets under regulator pressure",
        body: "Which lots shipped to which customers, what supplier inputs went in, what processing parameters applied, what was dispositioned: no single system holds the full chain, so it is rebuilt from exports and emailed workbooks while the field action waits. The recall is executed. The traceability cost is enormous.",
      },
      {
        severity: "High",
        surface: "Off-workflow analysis",
        name: "Complaint trend signals lost in case-by-case triage",
        body: "Every complaint is triaged on its own merits. The same product code accumulating complaints, the same failure mode across sites, a cluster that starts right after a process change: those become visible only when somebody runs an analysis that is not part of the standard workflow.",
      },
      {
        severity: "Medium",
        surface: "Service reports",
        name: "Field service feedback never reaches the design loop",
        body: "Field service knows exactly how products fail and how customers really use them. Engineering does not see most of it, so the next revision repeats failure modes the technicians have been working around for years.",
      },
    ],
    note: "Severity as rated in our field research with post-market and quality teams, current as of the last review.",
    // Qualitative by design: Notion carries no per-domain dollar figure, so the
    // band states the canonical cost from the recall-traceability pain instead.
    tax: {
      label: "The recurring bill",
      value: "The traceability rebuild, done again under the regulator's clock.",
      meta: "The field action goes out. What it costs is a chain no single system held, reassembled from exports while the hold, the notifications and the submission all wait on the answer.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: Customer JTBDs -> "Complaint intake, triage, and investigation"
   * (ID-83), "MDR / vigilance reporting" (ID-93, Notes: FDA MDR 30 days, 5 days
   * for malfunction; EU IVDR 15 days serious incident) and "Field safety
   * corrective action (FSCA) and recall execution" (ID-71, Notes: recall scope
   * decisions made in side-channel escalation calls carry legal, financial and
   * regulatory consequence). Step vocabulary from those rows and from Trigger
   * Event 8 (lot range, market scope, hazard classification, customer
   * notification timing, returns logistics, decided in parallel). */
  flow: {
    heading: "Run the field action where the four clocks meet.",
    lede: "Most systems file the complaint, the report and the recall in three different places. Unifize keeps one thread from intake through reportability into the field action, so the hold, the notification, the returns and the submission move against the same record.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Complaint intake, product and lot referenced", who: "Customer Service", when: "Day 0" },
      { t: "Reportability classified and filed", who: "Vigilance Officer · Medical Affairs", when: "Day 4" },
      { t: "Recall scope and hazard class set", who: "VP Quality · Regulatory", when: "Day 6" },
      { t: "Hold, notifications, returns and submission run in parallel", who: "Operations · Customer Service · Regulatory", when: "Day 7" },
      { t: "Effectiveness verified · trace sealed", who: "Recall Coordinator", when: "Day 62" },
    ],
    trailFoot: "The relation runs back to the complaint that raised it and forward into the corrective action and design change it triggers. Four parallel tracks, one thread, one trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / field-action / FSCA-0417",
    mobileLabel: "Field action decision trace",
    mobileId: "FSCA-0417 · complaint → reportability → scope → verified close",
  },

  /* ------------------------------------------------ 04 · for your industry
   * The L1 fan-out. Rows link to the live industry pages only; each line
   * instances post-market work in that industry's vocabulary, with frameworks
   * from the Trigger Events' Regulatory Framework fields (21 CFR Part 7,
   * 21 CFR Part 806, 21 CFR Part 803, EU MDR 2017/745) and the industry pages'
   * own canonical chips. */
  industries: {
    heading: "Post-market work, in your regulatory frame.",
    lede: "The same field action, translated to the authority that will review it. Every industry page carries this work in its own vocabulary.",
    rows: [
      { name: "Medical devices", line: "Complaints, MDR reporting and field corrections.", chips: ["21 CFR 803", "21 CFR 806", "EU MDR"], href: "/explorations/industry-template-modern" },
      { name: "Pharmaceuticals", line: "Product complaints, adverse events and market withdrawal.", chips: ["21 CFR 7", "21 CFR 211"], href: "/explorations/industries/pharmaceuticals" },
      { name: "Food processing", line: "Holds, traceability to the affected lot and public notice.", chips: ["FSMA", "21 CFR 7"], href: "/explorations/industries/food-processing" },
      { name: "Cosmetics", line: "Adverse event records and batch-level traceability.", chips: ["MoCRA"], href: "/explorations/industries/cosmetics" },
      { name: "Nutritional supplements", line: "Serious adverse event reports and complaint files.", chips: ["21 CFR 111"], href: "/explorations/industries/nutritional-supplements" },
      { name: "Automotive", line: "Field campaigns, warranty claims and 8D back to the supplier.", chips: ["IATF 16949"], href: "/explorations/industries/automotive" },
      { name: "Aerospace", line: "Field escapes, service bulletins and returned-material investigation.", chips: ["AS9100"], href: "/explorations/industries/aerospace" },
      { name: "Chemicals", line: "Customer complaints, lot traceability and product withdrawal.", chips: ["ISO 9001"], href: "/explorations/industries/chemicals" },
      { name: "Industrial machinery", line: "Field service, warranty and safety notices to the installed base.", chips: ["ISO 9001"], href: "/explorations/industries/industrial-machinery" },
    ],
    foot: "Each page carries the full map for that industry: personas, modules and trigger moments in its own vocabulary. Yours not listed? A field action coordinates the same way wherever product has left the building.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB. "Complaint Handling" (ID-16) is the one module whose
   * Primary Domain is this domain; the rest are the modules this domain's Pain
   * Points name under Modules Addressing, grouped by their Primary Product.
   * Blurbs distilled from each module's Notion Description; standards are the
   * short names of each module's External Standards relation. QMS and MES
   * modules link to their live product pages; FSM and CRM have no page.
   * HONEST GAP: Notion records recall execution and MDR/vigilance as having no
   * module today. Those two cards are named from this domain's own Themes and
   * Customer JTBDs and carry an in-development label rather than a standards
   * list they cannot yet evidence. */
  coverage: {
    heading: "The products that do the post-market work.",
    lede: "Complaint handling and lot traceability ship today inside the Quality Management System and the Manufacturing Execution System. Recall execution and vigilance reporting are in development, and labelled as such below.",
    standardFilters: ["ISO 13485", "21 CFR 820", "EU MDR", "21 CFR 11", "21 CFR 211", "EU GMP"],
    groups: [
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Primary",
        promise: "The complaint backbone: intake, reportability assessment, investigation and the corrective action it raises, on one governed record.",
        modules: [
          { name: "Complaint Handling", blurb: "Intake, triage, investigation and closure of customer complaints, with complainant detail, product or batch reference and the regulatory reportability assessment held on the record.", standards: ["ISO 13485", "21 CFR 820", "EU MDR"], href: "/explorations/products/qms" },
          { name: "Corrective & Preventive Actions", blurb: "Root-cause acceptance, action plan, effectiveness verification and closure, related back to the complaint or field event that raised it.", standards: ["ISO 13485", "21 CFR 820"], href: "/explorations/products/qms" },
        ],
      },
      {
        slug: "mes",
        name: "Manufacturing Execution System",
        tier: "Primary",
        promise: "The traceability leg: which lot, which inputs, which shipment, answered from the record instead of a spreadsheet rebuild.",
        modules: [
          { name: "Electronic Batch/Lot Records with QR Codes", blurb: "Electronic batch and lot records with QR code generation, so traceability runs through manufacturing and out into distribution.", standards: ["21 CFR 11", "21 CFR 211", "EU GMP"], href: "/explorations/products/mes" },
        ],
      },
      {
        slug: "field-action",
        name: "Field action & vigilance",
        tier: "Secondary",
        promise: "Recall execution and vigilance reporting, in development. Until they ship, both run as coordinated work over the complaint and traceability records above.",
        modules: [
          { name: "Recall & field safety corrective action", blurb: "Scope definition, hazard classification, customer notification, returns reconciliation and effectiveness close-out on one record.", soon: "In development" },
          { name: "MDR & vigilance reporting", blurb: "Reportability classification by jurisdiction, event chronology and submission tracked against the reporting clock.", soon: "In development" },
        ],
      },
      {
        slug: "fsm",
        name: "Field Service Management",
        tier: "Secondary",
        promise: "The installed-base leg: service work that feeds the complaint record instead of ending in a technician's report.",
        modules: [
          { name: "Field Service Work Order Management", blurb: "Work order creation, assignment and tracking through completion in the field.", soon: "In development" },
        ],
      },
      {
        slug: "crm",
        name: "Customer Requirements Management",
        tier: "Secondary",
        promise: "The intake edge: customer input captured once, then sorted to the system that owns it.",
        modules: [
          { name: "Feedback Tracking", blurb: "Customer feedback intake and tracking, linked through to product improvement rather than mixed into the complaint file.", soon: "In development" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: this domain links no Product Personas, so the cards carry the role
   * vocabulary named across its Themes and Pain Points Descriptions (Vigilance
   * Officers, Post-Market Surveillance Specialists, Medical Affairs, Recall
   * Coordinators, Customer Service, Logistics, Field Service) and the budget
   * owners named on the Domains row (VP Quality / Chief Medical Officer). Only
   * the quality-leadership card has a live persona page. */
  personas: {
    heading: "A field action has no single owner. It has four.",
    lede: "Every track above closes on a different desk, and they have to agree in hours. Find your seat and see what changes when all four run against one record.",
    cards: [
      {
        key: "quality-leadership",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Owns the field action",
        titles: ["VP Quality", "Head of Quality", "Quality Director", "QA Manager"],
        value: "The complaint, the reportability call and the recall scope sit on one record, so the scope decision is taken with the evidence in view instead of on an escalation call nobody minuted.",
        cares: "Scope confidence · Complaint cycle time · Audit readiness",
        worries: "Side-channel scope calls · Repeat field failures · Traceability rebuilds",
        href: "/explorations/personas/quality-manager",
        primary: true,
      },
      {
        key: "medical-safety",
        iconKey: "compliance-validation",
        name: "Medical & product safety",
        stake: "Owns the causality call",
        titles: ["Chief Medical Officer", "Medical Affairs Lead", "Product Safety Officer"],
        value: "Event detail, causality assessment and the signal history behind it arrive together, so the safety judgement is made once and stays reviewable afterwards.",
        cares: "Signal strength · Patient and user safety · Defensible judgement",
        worries: "Weak event detail · Late signals · Judgement without a record",
      },
      {
        key: "vigilance-regulatory",
        iconKey: "regulatory",
        name: "Vigilance & regulatory reporting",
        stake: "Files inside the clock",
        titles: ["Vigilance Officer", "Regulatory Affairs Manager", "Post-Market Surveillance Specialist"],
        value: "The event chronology is reconstructed from the thread rather than from inboxes, and each jurisdiction's clock is visible against the same event.",
        cares: "Reportability accuracy · On-time submission · Jurisdiction coverage",
        worries: "Missed reporting deadlines · Inconsistent classification · Cumulative trends that do not reconcile",
      },
      {
        key: "operations-logistics",
        iconKey: "operations",
        name: "Operations & logistics",
        stake: "Runs the hold and the returns",
        titles: ["Plant Manager", "Supply Chain Manager", "Recall Coordinator", "Logistics Lead"],
        value: "The hold, the affected lot list and the returns reconciliation move with owners and clocks visible, so the line and the warehouse get their answer without waiting on the next call.",
        cares: "Hold release · Affected lot accuracy · Return disposition",
        worries: "Holds with no decision date · Material ageing on the dock · Reconciliation gaps",
      },
      {
        key: "field-customer-service",
        iconKey: "engineering",
        name: "Field & customer service",
        stake: "Reaches the customer",
        titles: ["Field Service Manager", "Service Operations Lead", "Customer Service Manager"],
        value: "What technicians and agents see in the field lands on the complaint record the first time, and notification chasing runs from one list instead of a shared mailbox.",
        cares: "Response rates · Service record quality · Customer transition",
        worries: "Non-responding customers · Findings that stop at the service report · Repeat failures in the field",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB. Events 8 and 4 are the rows Notion links to this
   * domain. Event 17 is selected by subject rather than by the domain relation:
   * the manufacturing hold is one of the four tracks a field action runs, and
   * its Notion Domains relation sits on Manufacturing and Quality. Clocks
   * condensed from each row's Description / Regulatory Framework. Notion links
   * no FDA Form 483 row to this domain, so the live trigger page is not
   * cross-linked here. */
  triggers: {
    heading: "When the field becomes the headline.",
    lede: "Each of these starts a clock the authority is counting, and each routes into a governed workflow, so the response is coordinated on the record it will be judged by.",
    rows: [
      { name: "Recall scope definition required", clock: "Regulator's stated timeline · scope decided in parallel", severity: "Urgent", routesTo: "Complaint Handling · Field action", owner: "VP Quality · Chief Medical Officer" },
      { name: "MDR or vigilance reporting deadline", clock: "30 days routine · 5 working days when urgent action is needed", severity: "Urgent", routesTo: "Complaint Handling", owner: "Vigilance · Regulatory Affairs" },
      { name: "Production hold pending disposition", clock: "Every hour compounds", severity: "Urgent", routesTo: "Non-conformance", owner: "Plant Manager · QA" },
    ],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: MD_COEXISTENCE canonical context (systems of record, Part 11
   * e-signature approval), retargeted to the systems a field action actually
   * touches: the complaint file in the QMS, shipment and customer data in ERP
   * and CRM, lot genealogy in MES. */
  coexistence: {
    heading: "It sits on the stack you already run.",
    systemsOfRecord: ["QMS", "ERP", "CRM", "MES"],
    body: "A field action already reads from four systems: the complaint file, the shipment and customer records, the lot genealogy. Unifize replaces the ungoverned channels between them (email, escalation calls, shared workbooks), not the systems of record that already passed your audits. Approvals are captured as a 21 CFR Part 11 e-signature. No rip-and-replace, and no revalidation of a system that already passed.",
    diagramCaption: "Unifize as the coordination layer over your QMS, ERP, CRM and MES.",
  },

  /* ------------------------------------------------ 09 · proof
   * source: MD_PROOF canonical data (medical-devices-canonical.ts). Recovery
   * Force runs complaints on Unifize, which is this domain's own workstream, so
   * the reference is honest here. REAL evidence only. */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, not a brochure stat, plus the named teams already running complaint work on Unifize.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline. The figure is anonymized and covers non-conformance coordination, the work a complaint escalates into; named references are shown separately.",
    },
    references: [
      {
        tag: "Named reference",
        name: MD_PROOF.customers[0].name,
        desc: MD_PROOF.customers[0].desc,
        link: { label: "Complaint handling runs in the QMS product →", href: "/explorations/products/qms" },
      },
      { tag: "Named reference", name: MD_PROOF.customers[1].name, desc: MD_PROOF.customers[1].desc },
    ],
    foot: { label: "All customer stories", href: "/explorations/resources/testimonials" },
  },

  /* ------------------------------------------------ compliance & trust
   * FACT-GATED: Part 11 / Annex 11 posture, audit-trail integrity, e-signature
   * manifestation, SOC 2 / ISO 27001, vendor validation package and the SaaS
   * release policy must come from engineering and compliance, never be authored
   * as marketing copy. The one canonical claim available today (Part 11
   * e-signature capture) is carried by the coexistence section above. */
  trust: null,

  /* ------------------------------------------------ build the case
   * FACT-GATED champion kit: pilot structure with exit criteria, implementation
   * footprint, per-trigger one-pagers (cost of a day of unresolved recall
   * scope), ROI inputs, pricing shape. Needs numbers from Ben and the
   * implementation team. */
  caseKit: null,

  /* ------------------------------------------------ where teams go next
   * The land-and-expand journey. Live pages get links; anything without a page
   * carries an honest note. */
  growth: {
    heading: "Start where the clock is loudest.",
    lede: "Post-market is where the deadlines are external and the coordination is worst, which makes it the sharpest place to land. The same governed record then runs the functions it already pulls on.",
    steps: [
      { name: "Post-market & recall", note: "You are here" },
      { name: "Quality", note: "Live · the Quality solution page", href: "/explorations/domains/quality" },
      { name: "Change control", note: "Live · the Change control solution page", href: "/explorations/domains/change-control" },
      { name: "Regulatory affairs", note: "Live · the Regulatory affairs solution page", href: "/explorations/domains/regulatory-affairs" },
      { name: "Supplier management", note: "Live · the Supplier management solution page", href: "/explorations/domains/supplier-management" },
      { name: "Production records", note: "Live · the MES product", href: "/explorations/products/mes" },
    ],
  },

  close: {
    eyebrow: "Post-market on Unifize",
    heading: "Four clocks. One thread.",
    lede: "Bring a live complaint backlog or your last field action, and see the hold, the notification, the returns and the submission on one record in a 30-minute walkthrough.",
  },
};
