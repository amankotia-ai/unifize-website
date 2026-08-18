/* ============================================================================
 * Regulatory Affairs: domain (Solutions) page data. All values trace to Notion.
 *
 * source: Domains DB -> "Regulatory Affairs" (31d860e6b45e81e1958de250a2cc3330,
 *   Domain 1, Tier Secondary). The hero framing and the leak thesis are the
 *   row's Description: vigilance reporting, submission preparation, multi-market
 *   label approval and requirements intake all need multi-function coordination
 *   against statutory deadlines that cannot slip, with decision rationale and
 *   evidence chains assembled under time pressure. The statutory clocks named in
 *   that field (30-day FDA MDR, 15-day EU serious-incident, multi-year dossier
 *   assembly) are regulatory facts and are published; the internal lines in the
 *   same field (budget owner, play coverage) are not.
 * source: Themes DB (13 linked) -> the work section. One line per Theme,
 *   distilled from its Description. Clustering into five buyer-vocabulary groups
 *   is editorial; membership traces to each Theme's Description.
 * source: Pain Points DB (4 linked: PP-49, PP-50, PP-51, PP-52) -> the leak
 *   section. Names verbatim, bodies condensed from Description, Severity
 *   verbatim. The cost band is qualitative: Notion carries no per-domain dollar
 *   figure for this domain, so none is stated.
 * source: Customer JTBDs DB (8 linked) -> the flow vocabulary and the work
 *   section (submission preparation S80, post-approval change notification S81,
 *   label generation and market-variant control S91, audit package assembly S73,
 *   requirements intake S46). The reportability decision trace is built on those
 *   plus Themes 169 / 177 and Trigger Event 4.
 * source: Trigger Events DB (7 linked) -> the trigger board. Clocks condensed
 *   from each event's Description / Regulatory Framework. Only the four rows
 *   Notion rates Urgent are shown: the shared TriggerRow type carries
 *   Urgent | High only, and the remaining three rows are rated Medium, so
 *   showing them would overstate the Notion field.
 * source: Modules DB -> this domain has no Modules relation, so coverage is
 *   derived from the Modules named by its Pain Points' "Modules Addressing"
 *   (Change Control M-10, Document Control M-9, Complaint Handling M-16, Audit
 *   Management M-14) plus the adjacent modules in the same products (Training
 *   Management M-11, CAPA M-6) and the EH&S modules that carry the two
 *   environmental Themes (M-38, M-39, M-40, M-44). Grouped by Primary Product;
 *   blurbs distilled from each module's Notion Description; standards resolved
 *   to short names from each module's External Standards relation. No module in
 *   the Modules DB covers submission assembly, registration management or label
 *   governance today, and the coverage lede says so.
 * source: Product Personas DB -> "Regulatory Affairs Manager" (PPS-29, Tier
 *   Secondary) for the primary card; "Quality Manager" (PPS-2), "Document
 *   Controller" (PPS-5) and "Production Supervisor" (PPS-9) are the personas
 *   this domain's Pain Points list as affected. The vigilance and labelling
 *   cards carry the role vocabulary named in Themes 169, 177 and 117.
 * source: External Standards DB -> short names for the module standards and the
 *   per-industry chips (ISO 9001, ISO 13485, FDA 21 CFR Part 820, FDA 21 CFR
 *   Part 11, EU GMP / EudraLex Vol. 4, ICH Q10, MDR EU 2017:745, MDSAP,
 *   ISO 14001, ISO 45001, REACH, FSMA, ISO 17025, ICH E6(R2) / GCP,
 *   FDA 21 CFR Part 111, FDA 21 CFR Part 211).
 * source: MD_PROOF (medical-devices-canonical) -> the proof section. Real,
 *   customer-attested evidence only.
 * Framing and headlines are authored on top of the canonical facts; nothing
 * factual is invented.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";

export const REGULATORY_AFFAIRS_DATA: DomainPageData = {
  slug: "regulatory-affairs",
  name: "Regulatory Affairs",
  tier: "Secondary",

  meta: {
    // The root layout template appends "· Unifize".
    title: "Regulatory Affairs · Solutions",
    description:
      "Vigilance reports, submissions and multi-market label approvals run on statutory clocks that cannot slip, while the evidence sits with functions you do not control. Unifize keeps the decision and its evidence on one record, inside the clock.",
  },

  hero: {
    crumb: "Regulatory Affairs",
    titleLead: "The clock starts the moment the event lands.",
    titleTurn: "The evidence is still in five inboxes.",
    sub: "Reportability, submissions and label approvals close on deadlines someone else set. Unifize holds the decision and its evidence on one record, inside the clock.",
    // Parity chips: the flagship Themes, not standards.
    chips: [
      "Vigilance reporting",
      "Submissions",
      "Label control",
      "Registrations",
      "Regulatory change",
      "Audit readiness",
    ],
    // Floating evidence cards: the sealed report from the flow section and the
    // MDR clock from the trigger board (Domains DB Description, Trigger Event 4).
    floats: [
      { kind: "seal", title: "Report submitted", meta: "MDR-0912 · sealed by Head of Regulatory Affairs" },
      { kind: "clock", title: "MDR reporting clock", meta: "30 days FDA · 15 days EU serious incident" },
    ],
    // The trust-strip slot: industries with live pages where a regulatory
    // affairs function actually owns the filing.
    runsIn: {
      label: "Runs wherever a regulator sets the deadline",
      links: [
        { name: "Medical devices", href: "/explorations/industry-template-modern" },
        { name: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
        { name: "Cosmetics", href: "/explorations/industries/cosmetics" },
        { name: "Nutritional supplements", href: "/explorations/industries/nutritional-supplements" },
        { name: "Laboratories", href: "/explorations/industries/laboratories" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: Themes DB, all 13 rows linked to Regulatory Affairs. One line per
   * Theme, distilled from its Description. Group runsIn links point only at
   * live product pages that really run that work today. */
  work: {
    heading: "If a regulator asks for it, it has a home here.",
    lede: "The work regulatory teams actually run, as governed workflows: named owners, evidence bound to the decision, a close that survives an inspection. Start with one, they link as you grow.",
    groups: [
      {
        glyph: "doc",
        name: "Submissions and registrations",
        line: "Getting the product approved, and keeping it approved in every market you sell in.",
        items: [
          { name: "Product Registration and Market Authorization Maintenance", line: "Dossiers tailored per jurisdiction, renewals and commitments tracked, the registration picture current as the portfolio moves." },
          { name: "Regulatory Variation and Submission Change Management", line: "Post-approval changes classified correctly per market, affiliate submissions coordinated, commitments tracked to closure." },
          { name: "Clinical and Pre-Market Evidence Management", line: "Clinical and non-clinical evidence held across years and partner sites, current at every submission and label update." },
        ],
      },
      {
        glyph: "pulse",
        name: "Safety reporting",
        line: "What the field tells you, classified and reported inside the clock.",
        runsIn: { label: "Complaint intake runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Adverse Event Reporting and Regulatory Notification", line: "Events logged with complete detail, classified for reportability across jurisdictions, submitted against the tightest clock that applies." },
          { name: "Post-Market Surveillance and Vigilance Reporting", line: "Field performance monitored, signals separated from noise, signal management provable to regulators and notified bodies." },
        ],
      },
      {
        glyph: "box",
        name: "Labels, lots and borders",
        line: "What is printed on the product, and what you can prove about the unit in the box.",
        runsIn: { label: "Lot records run in the MES product →", href: "/explorations/products/mes" },
        items: [
          { name: "Label and Artwork Control", line: "Labels, inserts, instructions for use and carton artwork authored, versioned and released with the print run and the stock burn-down in view." },
          { name: "Lot Traceability and Serialization Governance", line: "Lot, serial, UDI and DSCSA identifiers reconciled across systems, so any unit traces end to end." },
          { name: "Cross-Border Regulatory Compliance", line: "Import, export and intercompany movement classified and licensed, with customs holds dispositioned against the batch record." },
        ],
      },
      {
        glyph: "loop",
        name: "Rule changes and audits",
        line: "The regulations move. The proof that you moved with them has to move too.",
        runsIn: { label: "Change control runs in the DMS product →", href: "/explorations/products/dms" },
        items: [
          { name: "Regulatory Intelligence and Impact Assessment", line: "Sources monitored across jurisdictions, guidance separated from binding requirement, impact routed to a named owner." },
          { name: "Regulatory Change Management", line: "External change walked through every dependent procedure, validation and training obligation it touches." },
          { name: "Audit Readiness and Response", line: "Evidence current for every controlled procedure, responses drafted on the clock, commitments tracked to auditable closure." },
        ],
      },
      {
        glyph: "scale",
        name: "Site and environmental obligations",
        line: "The permits, waste streams and safety duties the regulator also holds you to.",
        items: [
          { name: "Environmental Health and Safety Compliance", line: "Incidents captured on the floor, classified consistently, reported across sites and shifts on tight regulatory clocks." },
          { name: "Waste Management and Controlled Destruction", line: "Regulated waste tracked from generation to certified destruction, with chain of custody provable for controlled material." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, all 4 rows linked to Regulatory Affairs. Names
   * verbatim; bodies condensed from Description; Severity verbatim. `surface` =
   * where the decision leaks to, condensed from each pain's Description. */
  leaks: {
    heading: "The filing was true the day you sent it.",
    lede: "The failure modes we see inside regulatory teams. Each one is a document or a decision that moved after the record stopped watching.",
    pains: [
      {
        severity: "Critical",
        surface: "The document register",
        name: "Submission cross-references chase outdated controlled documents",
        body: "A submission cites procedures, validation reports and risk assessments by number and revision. The cited document is revised afterwards and the cross-reference quietly stales: the filing says v3, the register is already at v5.",
      },
      {
        severity: "Critical",
        surface: "Inbox & meeting notes",
        name: "Field-action timeline rebuilt from email and meeting notes",
        body: "When a field safety notice or a recall is required, what we knew and when we knew it has to be reconstructed from emails, meeting notes and a scattered set of system records. Regulators expect that timeline as a clean record.",
      },
      {
        severity: "High",
        surface: "Packaging & artwork",
        name: "Labeling changes propagate inconsistently to packaging and inserts",
        body: "One approved labeling change has to reach the artwork, the package insert, the secondary packaging, the instructions for use and the website copy. It is approved centrally and propagated by different functions on different schedules, so at least one endpoint lags for weeks.",
      },
      {
        severity: "High",
        surface: "The handoff",
        name: "Post-submission commitments fall between Regulatory and Operations",
        body: "Submissions carry post-market commitments: annual reporting, ongoing validation, periodic update. Regulatory tracks them, Operations or Quality executes them, and a commitment lost in that handoff has regulatory consequences.",
      },
    ],
    note: "Severity as rated in our field research with regulatory teams, current as of the last review.",
    // Qualitative by design: Notion carries no per-domain dollar figure, so the
    // band states the canonical cost from the worst pain instead.
    tax: {
      label: "The recurring bill",
      value: "Every filing ages quietly.",
      meta: "Nothing tells you when the document a submission cites has moved on. The gap surfaces at inspection, or in the field-action timeline you are rebuilding from email.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: Trigger Events -> "MDR or vigilance reporting deadline" (Event 4)
   * for the clock; Themes 177 (Adverse Event Reporting and Regulatory
   * Notification) and 169 (Post-Market Surveillance and Vigilance Reporting)
   * for the step and role vocabulary (intake logs, vigilance classifies,
   * medical affairs evaluates causality, regulatory submits). The relative days
   * are a narrative instance inside the 30-day FDA clock. */
  flow: {
    heading: "Decide reportability where the evidence already is.",
    lede: "Most systems file the report. Unifize holds the reportability decision itself, so the classification, the causality view and who agreed seal into a trace the authority can replay.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Field event lands at intake", who: "Complaint Intake", when: "Day 0" },
      { t: "Reportability classified per market", who: "Vigilance Officer", when: "Day 4" },
      { t: "Causality assessed on the record", who: "Medical Affairs", when: "Day 11" },
      { t: "Report submitted to the authority", who: "Regulatory Affairs", when: "Day 26" },
      { t: "Closed · trace sealed", who: "Head of Regulatory Affairs", when: "Day 28" },
    ],
    trailFoot: "The relation runs back to the complaint that raised it, and forward into the corrective action and the label change it triggers. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / vigilance / MDR-0912",
    mobileLabel: "MDR reportability trace",
    mobileId: "MDR-0912 · intake → reportability → causality → submitted",
  },

  /* ------------------------------------------------ 04 · for your industry
   * The L1 fan-out. Rows link to live industry pages only; each line instances
   * regulatory affairs in that industry's own vocabulary, and the chips are that
   * industry's real frameworks (External Standards DB short names). */
  industries: {
    heading: "Regulatory affairs, in your regulatory frame.",
    lede: "The same work, translated to the authority you answer to. Every industry page carries it in its own vocabulary.",
    rows: [
      { name: "Medical devices", line: "MDR reporting, 510(k) and PMA files, EU technical documentation.", chips: ["21 CFR 803", "EU MDR", "ISO 13485"], href: "/explorations/industry-template-modern" },
      { name: "Pharmaceuticals", line: "Variations, annual reports and multi-market label control.", chips: ["21 CFR 211", "ICH Q10", "EU GMP"], href: "/explorations/industries/pharmaceuticals" },
      { name: "Cosmetics", line: "Product listings, adverse event reports and claims substantiation.", chips: ["MoCRA"], href: "/explorations/industries/cosmetics" },
      { name: "Nutritional supplements", line: "Label claims, specifications and serious adverse event reports.", chips: ["21 CFR 111"], href: "/explorations/industries/nutritional-supplements" },
      { name: "Food processing", line: "Facility registration, label declarations and reportable food events.", chips: ["FSMA"], href: "/explorations/industries/food-processing" },
      { name: "Chemicals", line: "Substance registration, safety data sheets and export licensing.", chips: ["REACH"], href: "/explorations/industries/chemicals" },
      { name: "Laboratories", line: "Accredited scope changes, method validation and regulated reporting.", chips: ["ISO 17025"], href: "/explorations/industries/laboratories" },
      { name: "Contract research orgs", line: "Sponsor commitments, GCP inspections and study submissions.", chips: ["ICH E6"], href: "/explorations/industries/cro" },
    ],
    foot: "Each page carries the full map for that industry: roles, modules and the moments that start a clock. Yours not listed? The workstreams are industry-agnostic by design.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB, grouped by Primary Product (DMS, QMS, EH&S). This domain
   * has no Modules relation of its own, so the set is the modules its Pain
   * Points name under "Modules Addressing" plus the adjacent modules in the same
   * products and the EH&S modules carrying its two environmental Themes. Blurbs
   * distilled from each module's Notion Description; standards resolved from
   * each module's External Standards relation. DMS and QMS modules link to the
   * live product pages; EH&S has no page, so every card carries a status label.
   * Honest gap: nothing in the Modules DB covers submission assembly,
   * registration management or label governance today. */
  coverage: {
    heading: "The products that do the regulatory work today.",
    lede: "The modules below carry the document, change, complaint and audit legs of regulatory work, filterable by the standard you are audited against. Submission assembly, registration management and label governance are not modules yet, and this page does not claim them.",
    standardFilters: [
      "ISO 9001",
      "ISO 13485",
      "21 CFR 820",
      "21 CFR Part 11",
      "EU MDR",
      "EU GMP",
      "ICH Q10",
      "MDSAP",
      "ISO 14001",
      "ISO 45001",
    ],
    groups: [
      {
        slug: "dms",
        name: "Document Management System",
        tier: "Primary",
        promise: "The controlled record a filing cites: what a submission points at, what a change touches, and who has to be retrained when it moves.",
        modules: [
          { name: "Document Control", blurb: "Controlled authoring, review, approval, distribution and periodic review, with version history, training linkage on revision and effective-date governance.", standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR Part 11", "EU GMP"], href: "/explorations/products/dms" },
          { name: "Change Control", blurb: "Change requests and document revisions through configurable approvals, carrying impact assessment, evidence and propagation into training and distribution.", standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "ICH Q10"], href: "/explorations/products/dms" },
          { name: "Training Management", blurb: "Competency assignment and completion tracking, with retraining triggered by a document revision or an audit finding.", standards: ["ISO 9001", "ISO 13485", "21 CFR 820"], href: "/explorations/products/dms" },
        ],
      },
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Primary",
        promise: "The event side of regulatory work: what the field reports, what the auditor finds, and what you committed to do about it.",
        modules: [
          { name: "Complaint Handling", blurb: "Intake, triage, investigation and closure, carrying the regulatory reportability assessment and the link into downstream investigation.", standards: ["ISO 13485", "21 CFR 820", "EU MDR"], href: "/explorations/products/qms" },
          { name: "Audit Management", blurb: "Scheduling, finding tracking, response routing and effectiveness verification across internal, external and authority audits.", standards: ["ISO 9001", "ISO 13485", "MDSAP"], href: "/explorations/products/qms" },
          { name: "Corrective & Preventive Actions", blurb: "Root-cause acceptance, action plan, effectiveness verification and closure, related back to the event that raised it.", href: "/explorations/products/qms" },
        ],
      },
      {
        slug: "ehs",
        name: "Environment, Health and Safety",
        tier: "Secondary",
        promise: "The site-level obligations a regulator also holds you to: permits, waste streams and safety findings. In development, so Unifize coordinates over the systems you run today.",
        modules: [
          { name: "Regulatory Compliance Tracking", blurb: "Regulatory obligations, due dates and evidence of compliance across health, safety and environmental rules.", standards: ["ISO 14001", "ISO 45001"], soon: "In development" },
          { name: "Permit Management", blurb: "A permit registry with renewal scheduling and obligation tracking, from air permits to hot work.", standards: ["ISO 14001"], soon: "In development" },
          { name: "Waste Management and Disposal Tracking", blurb: "Waste generation, classification, manifest tracking and disposal record keeping.", standards: ["ISO 14001"], soon: "In development" },
          { name: "EHS Audit Management", blurb: "Scheduling, finding tracking and response routing for environment, health and safety audits.", standards: ["ISO 45001", "ISO 14001"], soon: "In development" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: Product Personas DB -> Regulatory Affairs Manager (PPS-29, titles
   * and daily reality from its Description) for the primary card; Quality
   * Manager (PPS-2), Document Controller (PPS-5) and Production Supervisor
   * (PPS-9) are the personas this domain's Pain Points list as affected. The
   * vigilance and labelling cards carry the role vocabulary named in Themes 177,
   * 169 and 117. */
  personas: {
    heading: "The deadline always lands on a desk.",
    lede: "Every workstream above closes on a named role's judgement, usually against a clock someone else set. Find your seat.",
    cards: [
      {
        key: "regulatory-affairs",
        iconKey: "regulatory",
        name: "Regulatory affairs",
        stake: "Owns the standing with regulators",
        titles: ["Regulatory Affairs Manager", "Regulatory Affairs Officer", "Director of Regulatory Affairs", "Head of Regulatory Affairs"],
        value: "Commitments, submissions and inspection evidence arrive already bound to the work that produced them, instead of being chased across functions you do not control.",
        cares: "Commitment tracking · Inspection readiness · Submission currency",
        worries: "Stale cross-references · Missed clocks · Evidence owned elsewhere",
        primary: true,
      },
      {
        key: "vigilance",
        iconKey: "compliance-validation",
        name: "Post-market safety & vigilance",
        stake: "Owns the reporting clock",
        titles: ["Vigilance Officer", "Post-Market Surveillance Manager", "Complaint Handling Lead", "Medical Affairs"],
        value: "Reportability is decided on the record, with the event chronology assembled as the event moves rather than rebuilt from email afterwards.",
        cares: "Reportability accuracy · Clock adherence · Signal management",
        worries: "Late reports · Inconsistent classification · Rebuilt timelines",
      },
      {
        key: "quality-leadership",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Owns the system the filing rests on",
        titles: ["Quality Manager", "QA Manager", "Director of Quality", "Head of Quality"],
        value: "The procedures, changes and corrective actions a submission cites stay current, and the inspection response draws on a record assembled as the work happened.",
        cares: "Audit readiness · Document currency · Commitment closure",
        worries: "Repeat findings · Side-channel decisions · Evidence rebuilds",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "document-control",
        iconKey: "engineering",
        name: "Document control & records",
        stake: "Keeps the register true",
        titles: ["Document Controller", "QA Document Coordinator", "Records Manager", "QMS Administrator"],
        value: "Revisions cascade into the training and distribution they trigger, and any filing that cites a document can be answered without a manual pull.",
        cares: "Revision accuracy · Periodic reviews · Audit pulls",
        worries: "Stalled approval loops · Superseded copies in use · Missed reviews",
      },
      {
        key: "labelling",
        iconKey: "operations",
        name: "Labelling & packaging",
        stake: "Ships the approved words",
        titles: ["Packaging Engineer", "Labelling Specialist", "Artwork Coordinator", "Production Supervisor"],
        value: "One approved change propagates to artwork, inserts, instructions for use and cartons on a single thread, with the print run and stock burn-down visible against the effective date.",
        cares: "Effective dates · Version reconciliation · Market variants",
        worries: "Endpoints lagging · Multilingual proofreading · Relabel holds",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, the 4 of 7 rows linked to this domain that Notion
   * rates Urgent (Events 4, 1, 8, 32). Clocks condensed from Description /
   * Regulatory Framework, using the statutory clocks named on the Domains row.
   * The three remaining rows (label approval backlog, regulatory change
   * notification, requirements intake spike) are rated Medium in Notion and the
   * shared TriggerRow type carries Urgent | High only, so they are not shown
   * rather than promoted. Their work appears in sections 01 and 02. */
  triggers: {
    heading: "When the regulator sets the deadline.",
    lede: "Each of these starts a clock you do not control. Each routes into a governed workflow, so the response is coordinated on the record it will be judged by.",
    rows: [
      { name: "MDR or vigilance reporting deadline", clock: "30 days FDA · 15 days EU serious incident", severity: "Urgent", routesTo: "Complaint Handling", owner: "Vigilance · Regulatory Affairs" },
      { name: "FDA Warning Letter received", clock: "15 working days to respond", severity: "Urgent", routesTo: "Audit Management · CAPA", owner: "Regulatory Affairs · Executive team" },
      { name: "Recall scope definition required", clock: "The regulator's stated timeline", severity: "Urgent", routesTo: "Complaint Handling · CAPA", owner: "Regulatory Affairs · VP Quality" },
      { name: "Design history file gap at audit", clock: "Treated as systemic", severity: "Urgent", routesTo: "Document Control · Audit Management", owner: "Regulatory Affairs · Engineering" },
    ],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: MD_COEXISTENCE canonical context (Part 11 e-signature approval) plus
   * the systems this domain's Themes actually name: Theme 144 reconciles
   * identifiers across MES, ERP and packaging lines; the coverage modules sit
   * over the QMS and the PLM record. */
  coexistence: {
    heading: "It sits on the stack you already run.",
    systemsOfRecord: ["QMS", "ERP", "MES", "PLM"],
    body: "Unifize replaces the ungoverned channels (email, meetings, shared drives) where the reasoning behind a regulatory decision goes missing, not the systems of record that already passed your inspections. Approvals are captured as a 21 CFR Part 11 e-signature. No rip-and-replace, and no revalidation of a system that already passed.",
    diagramCaption: "Unifize as the coordination layer over your QMS, ERP, MES and PLM.",
  },

  /* ------------------------------------------------ 09 · proof
   * source: MD_PROOF canonical data (medical-devices-canonical.ts). REAL
   * evidence only. The signed baseline measures non-conformance coordination
   * cost rather than submission work, and the note on the panel says so; both
   * named references run the document control, change control and complaint
   * workstreams this page's coverage rests on. */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, not a brochure stat, plus named medical-device teams running the document, change and complaint work this page rests on.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline. It measures non-conformance coordination cost, not submission work, and is shown because the same governed record carries both.",
    },
    references: [
      {
        tag: "Named reference",
        name: MD_PROOF.customers[0].name,
        desc: MD_PROOF.customers[0].desc,
        link: { label: "Document control & training run in the DMS product →", href: "/explorations/products/dms" },
      },
      { tag: "Named reference", name: MD_PROOF.customers[1].name, desc: MD_PROOF.customers[1].desc },
    ],
    foot: { label: "All customer stories", href: "/explorations/resources/testimonials" },
  },

  /* ------------------------------------------------ compliance & trust
   * FACT-GATED, same as the other Solutions pages: Part 11 / Annex 11 posture,
   * audit-trail integrity, e-signature manifestation, SOC 2 / ISO 27001, vendor
   * validation package and the SaaS release policy must come from engineering
   * and compliance, never be authored as marketing copy. The one canonical claim
   * available today (Part 11 e-signature capture) is carried by the coexistence
   * section above. */
  trust: null,

  /* ------------------------------------------------ build the case
   * FACT-GATED champion kit: pilot structure with exit criteria, implementation
   * footprint, per-trigger one-pagers and ROI inputs. Fill when the artifacts
   * are real; the numbers do not exist yet. */
  caseKit: null,

  /* ------------------------------------------------ where teams go next
   * Adjacency from the Domains DB relations and the product catalog. Live pages
   * get links; anything unbuilt carries an honest note rather than a link. */
  growth: {
    heading: "Start with regulatory. Don't stop there.",
    lede: "The same governed record runs the functions that feed your filings, so the system you land this quarter is the platform the next function joins.",
    steps: [
      { name: "Regulatory affairs", note: "You are here" },
      { name: "Post-market & recall", note: "Solution page", href: "/explorations/domains/post-market-and-recall" },
      { name: "Quality", note: "Solution page", href: "/explorations/domains/quality" },
      { name: "Change control", note: "Solution page", href: "/explorations/domains/change-control" },
      { name: "Document & records control", note: "Live · the DMS product", href: "/explorations/products/dms" },
      { name: "Compliance", note: "Solution page", href: "/explorations/domains/compliance" },
    ],
  },

  close: {
    eyebrow: "Regulatory affairs on Unifize",
    heading: "Meet the deadline. Keep the reasoning.",
    lede: "Bring one workstream, a vigilance queue, a label approval backlog or an inspection response, and see the decision trace on your own work in a 30-minute walkthrough.",
  },
};
