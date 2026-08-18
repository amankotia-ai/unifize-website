/* ============================================================================
 * Supplier Management: domain (Solutions) page data. All values trace to Notion.
 *
 * source: Domains DB -> "Supplier Management" (31d860e6b45e81cfbc91dacd5d9755dc,
 *   Domain 7, Tier Primary; renamed from "Supplier Quality" on 2026-05-14). The
 *   hero framing and the leak thesis are the row's Description field: the
 *   coordination tax accumulates AT and ACROSS the organisational boundary with
 *   suppliers, because qualification, PPAP and APQP review, quality agreement
 *   governance, incoming disposition, supplier CAPA and supplier audit all need
 *   evidence exchange and approval chains that cross that boundary. The rename
 *   widened the buyer door: at large enterprises this function reports to the
 *   CPO or Head of Procurement as often as to VP Quality, so the page carries
 *   both seats. Budget owners named on the row: CPO / Head of Procurement /
 *   Supplier Quality Director / VP Procurement. Internal-only content on that
 *   row (budget-owner lines, the "subsumes the historical Procurement and
 *   Sourcing Domain" note) is never published verbatim.
 * source: Themes DB (10 linked) -> the work section. One line per Theme,
 *   distilled from its Description. Theme IDs: 146, 111, 172, 108, 173, 149,
 *   121, 106, 138, 156.
 * source: Pain Points DB (7 linked) -> the leak section. Names verbatim-ish,
 *   bodies condensed from Description, Severity verbatim. Pain IDs: 26, 27, 28,
 *   29, 30, 31, 32. The cost band carries the qualitative cost from the one
 *   Critical row (lot genealogy rebuilt by hand at the supplier handoff);
 *   Notion has no per-domain dollar figure, so none is stated.
 * source: Customer JTBDs DB (24 linked, stages S1 to S15) -> the SCAR decision
 *   trace. The trail follows the Primary-land jobs: "Supplier notification and
 *   SCAR initiation" (JTBD 4), "MRB disposition" (JTBD 34), plus
 *   "Re-inspection after supplier corrective action" (JTBD 32) and "Supplier
 *   audit execution and CAPA follow-up" (JTBD 77).
 * source: Modules DB -> "Supplier Quality" (Module 15, Primary Domain =
 *   Supplier Management, Primary Product = QMS) plus every module the domain's
 *   Pain Points name in Modules Addressing (CAPA 6 in QMS, Change Control 10 in
 *   DMS, Inspections/Forms/Checklists 26 and Electronic Batch/Lot Records 27 in
 *   MES, Vendor Portal 70 in APQP & PPAP), plus the rest of the APQP & PPAP
 *   product's modules (66, 67, 68, 69, 71). Grouped by Primary Product.
 *   Standards resolved through each module's External Standards relation.
 * source: Buyer Personas DB -> "Supplier quality governance" (BP-19, Primary
 *   Domain = Supplier Management) and "Procurement decisioning" (BP-9, Primary
 *   Domain = Supplier Management) for the two doors the domain row insists on,
 *   plus "Quality governance" (BP-3) and "Supply chain execution" (BP-4).
 *   Product Personas DB -> "Supplier Quality Engineer" and "Quality Inspector"
 *   for the working seats. Titles, cares and worries are those rows' fields.
 * source: Trigger Events DB (7 linked) -> the trigger board. Clocks condensed
 *   from Description / Regulatory Framework. Two of the seven are rated Medium
 *   in Notion (quality agreement negotiation bottleneck, alternate supplier
 *   qualification delay) and the shared TriggerRow type renders only Urgent and
 *   High, so those two are carried in the work and leak sections instead of
 *   being re-graded upward.
 * source: MD_PROOF (medical-devices-canonical.ts) -> the proof section. The
 *   signed baseline is a non-conformance coordination-cost figure, and
 *   supplier-caused non-conformance is this domain's own work, so it applies
 *   honestly here. REAL evidence only.
 * Framing and headlines are authored on top of the canonical facts; nothing
 * factual is invented.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";

export const SUPPLIER_MANAGEMENT_DATA: DomainPageData = {
  slug: "supplier-management",
  name: "Supplier Management",
  tier: "Primary",

  meta: {
    // The root layout template appends "· Unifize".
    title: "Supplier Management · Solutions",
    description:
      "Qualification, PPAP, incoming disposition and supplier corrective action all close across an organisational boundary, and the reasoning stays in email on both sides. Unifize runs the supplier thread as the record, in your industry's regulatory frame.",
  },

  hero: {
    crumb: "Supplier Management",
    titleLead: "You qualified the supplier.",
    titleTurn: "A year on, nobody can prove it.",
    sub: "Qualification, part approval, incoming disposition and supplier corrective action all close across an org boundary. Unifize keeps the decision on the record, on both sides of it.",
    // Parity chips: the flagship Themes (the work inside), not standards.
    chips: [
      "Supplier qualification",
      "PPAP & APQP",
      "First article inspection",
      "Incoming inspection",
      "Supplier CAPA",
      "CMO governance",
    ],
    // Floating evidence cards: the sealed SCAR from the flow section and the
    // line-stop clock from the trigger board (Notion: "every hour of line-stop
    // has a measurable cost impact"). No statutory clock exists in this domain,
    // so the operational one is used rather than inventing a deadline.
    floats: [
      { kind: "seal", title: "Supplier action verified", meta: "CAPA-2148 · sealed by Supplier Quality Director" },
      { kind: "clock", title: "Supplier line stop", meta: "Every hour counts · decided on the record" },
    ],
    // Trust-strip slot: the industries the domain's trigger events name, limited
    // to those with live pages.
    runsIn: {
      label: "Runs wherever the supply base is regulated",
      links: [
        { name: "Medical devices", href: "/explorations/industry-template-modern" },
        { name: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
        { name: "Automotive", href: "/explorations/industries/automotive" },
        { name: "Aerospace", href: "/explorations/industries/aerospace" },
        { name: "Industrial machinery", href: "/explorations/industries/industrial-machinery" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: Themes DB, all 10 rows linked to Supplier Management; one line per
   * Theme, distilled from its Description. Grouped into buyer-vocabulary
   * clusters (the grouping is editorial; membership traces to each Theme's
   * Description). Cluster runsIn links point only at live product pages. */
  work: {
    heading: "If it crosses the supplier boundary, it has a home here.",
    lede: "The supplier work you already run, as governed workflows: named owners on both sides, evidence attached where the decision happens. Start with one; they link as you grow.",
    groups: [
      {
        glyph: "scale",
        name: "Bringing a supplier on",
        line: "Everything between a shortlist and a supplier you are allowed to buy from.",
        runsIn: { label: "Runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Supplier selection and qualification", line: "Certificates, financials, on-site audits and sample evaluation gathered into one approval, with the approved supplier list and every dependent record aligned behind it." },
          { name: "Supplier quality management", line: "Audits, scorecards and quality agreements kept current as regulations and the supply base move, instead of refreshed at renewal." },
          { name: "Emergency authorisation and alternate sourcing", line: "A months-long qualification compressed to days when supply is at risk, without introducing undisclosed risk to product or process." },
        ],
      },
      {
        glyph: "doc",
        name: "Proving the part",
        line: "The evidence that says this component can be made to spec, at volume, by this supplier.",
        runsIn: { label: "Specifications and revisions run in the DMS product →", href: "/explorations/products/dms" },
        items: [
          { name: "PPAP and APQP", line: "The full submission package assembled across program managers, engineering, manufacturing and the supplier, with FMEAs and control plans synchronised to the current drawing revision." },
          { name: "New part approval and first article inspection", line: "Production gated on clean FAI evidence, with inspection plans and measurement methods reconciled across two companies." },
          { name: "Raw material and component specifications", line: "Specs authored, versioned and approved once, then acknowledged by the supplier and enforced on the purchase order." },
        ],
      },
      {
        glyph: "box",
        name: "At the receiving dock",
        line: "What happens between the truck arriving and the lot being available to production.",
        runsIn: { label: "Runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Inbound inspection and quarantine", line: "Sampling to plan, material held correctly while disposition is decided, and accepted lots released in time to feed the line." },
          { name: "Non-conformance and disposition", line: "Segregate, investigate and decide rework, scrap, use-as-is or return to vendor, with the reasoning kept on the record." },
        ],
      },
      {
        glyph: "loop",
        name: "When the supplier is the root cause",
        line: "The loop that has to change behaviour at another company, not just collect a document.",
        runsIn: { label: "Runs in the QMS product →", href: "/explorations/products/qms" },
        items: [
          { name: "Supplier corrective action and SCAR", line: "Clear requirements out, supplier investigation back, effectiveness verified at incoming material, and closure linked to the scorecard and the approved supplier list." },
          { name: "Contract manufacturing and CMO governance", line: "Batch review, change and joint investigations governed across two quality systems, provable to a regulator who sees one legal manufacturer." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, all 7 rows linked to Supplier Management. Names
   * verbatim-ish; bodies condensed from Description; Severity verbatim.
   * `surface` = where the decision leaks to, condensed from each Description. */
  leaks: {
    heading: "The work gets done. The boundary eats the record.",
    lede: "The failure modes we see across the supplier boundary. Every one of them is a decision that landed in somebody's inbox, on one side of the relationship or the other.",
    pains: [
      { severity: "Critical", surface: "POs & shipping records", name: "Lot genealogy breaks at the supplier handoff", body: "Internal lot genealogy is clean. The genealogy back into the supplier's lots is partial, so when a recall, complaint or supplier issue forces traceability, the supplier side is rebuilt by hand from purchase orders, shipping records and whatever batch data the supplier can send." },
      { severity: "High", surface: "Inbox handoffs", name: "Supplier change notifications drop between supplier, sourcing and quality", body: "The supplier notifies sourcing of a process, sub-supplier or material change. Sourcing acknowledges. Quality and engineering hear about it weeks later, often after parts arrive carrying the change. The notification crossed the boundary and lost its addressee." },
      { severity: "High", surface: "Supplier paperwork", name: "SCAR loops close on paperwork, not on behaviour", body: "Supplier corrective actions get raised, accepted and closed on supplier-submitted documentation rather than verified change at the supplier's process. The same defect type returns from the same supplier two months later." },
      { severity: "High", surface: "The qualification folder", name: "Qualification evidence cannot be reconstructed at requalification", body: "When a supplier comes up for requalification, the original audit findings, capability data, samples and certifications are hard to assemble. The folder is partial and the rest left with the people who ran the qualification. Requalification becomes a paperwork exercise." },
      { severity: "High", surface: "The receiving dock", name: "Incoming inspection acts as the supplier's process control", body: "Inspection is meant to verify what the supplier already controls. In practice it catches defects that supplier's process should never have shipped, so inspection becomes the filter and real process capability stays masked." },
      { severity: "Medium", surface: "Scorecards & spreadsheets", name: "Scorecard data does not reach the sourcing decision", body: "Quality maintains scorecards on defect rate, on-time delivery and SCAR responsiveness. Sourcing decides on unit price and lead time. The scorecard is informational rather than consequential." },
      { severity: "Medium", surface: "The vendor portal", name: "The vendor portal is read-only where the work is collaborative", body: "Portals expose scorecards, purchase orders and inspection reports for the supplier to view. They do not support joint root cause, joint corrective action or joint capability planning, so that work happens in email and the portal only holds the artefacts." },
    ],
    note: "Severity as rated in our field research with supplier quality and procurement teams, current as of the last review.",
    // Qualitative by design: Notion carries no per-domain dollar figure, so the
    // band states the canonical cost from the one Critical pain instead.
    tax: {
      label: "The recurring bill",
      value: "A manual rebuild of the supplier side, in the middle of a traceability event.",
      meta: "Your own genealogy holds. The supplier's half gets reconstructed from purchase orders and shipping records while the clock on the recall or complaint is already running.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: Customer JTBDs -> "Supplier notification and SCAR initiation"
   * (JTBD 4, Primary land) and "MRB disposition (use-as-is, rework, return,
   * scrap)" (JTBD 34, Primary land), continued through "Re-inspection after
   * supplier corrective action" (JTBD 32) and "Supplier audit execution and
   * CAPA follow-up" (JTBD 77). Step vocabulary from the Supplier Quality
   * module's Notion Description (SCAR lifecycle, incoming inspection alignment,
   * scorecard maintenance) and the SCAR Theme (Theme 138). Days are narrative.
   * The shell reuses the canonical CAPA ChatShell mock (CAPA-2148), the same
   * record the QMS product, the Quality Manager persona and the 483 trigger
   * pages show, so the record ID here matches what renders. */
  flow: {
    heading: "Run the SCAR where both companies can see it.",
    lede: "Most systems track a supplier corrective action as a status field. Unifize holds the investigation across the boundary, so the requirement, the supplier's root cause and the verification at re-inspection seal into one trace.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Incoming lot fails inspection", who: "Quality Inspector", when: "Day 0" },
      { t: "Lot dispositioned, material held", who: "Material Review Board", when: "Day 2" },
      { t: "SCAR issued with stated requirements", who: "Supplier Quality Engineer", when: "Day 4" },
      { t: "Supplier root cause accepted", who: "Supplier Quality · Engineering", when: "Day 21" },
      { t: "Verified at re-inspection · trace sealed", who: "Supplier Quality Director", when: "Day 47" },
    ],
    trailFoot: "The relation runs back to the receipt and the non-conformance that raised it, and forward into the scorecard and the approved supplier list. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / supplier-capa / CAPA-2148",
    mobileLabel: "Supplier corrective action trace",
    mobileId: "CAPA-2148 · receipt → disposition → request → verified close",
  },

  /* ------------------------------------------------ 04 · for your industry
   * The L1 fan-out. Rows link to the live industry pages. The pharma, chemicals,
   * food and discrete-manufacturing lines use the naming variants stated
   * verbatim in the Domains row Description ("pharma calls it Vendor Management
   * and Quality Agreements; chemicals calls it Supplier Qualification and
   * Approved Vendor List management; food calls it Approved Supplier List and
   * Material Approval; discrete calls it Supplier Quality Engineering and
   * PPAP"). The remaining lines instance the domain's own Theme vocabulary in
   * that segment. Chips are each industry page's canonical regulatory chips. */
  industries: {
    heading: "Supplier management, under the name your industry gives it.",
    lede: "Same coordination structure everywhere: evidence and approvals crossing an org boundary. Only the vocabulary and the standard you are inspected against change.",
    rows: [
      { name: "Medical devices", line: "Purchasing controls, supplier qualification and incoming acceptance.", chips: ["21 CFR 820", "ISO 13485"], href: "/explorations/industry-template-modern" },
      { name: "Pharmaceuticals", line: "Vendor management and quality agreements.", chips: ["21 CFR 210/211", "EU GMP", "ICH Q10"], href: "/explorations/industries/pharmaceuticals" },
      { name: "Automotive", line: "Supplier quality engineering, PPAP and supplier corrective action.", chips: ["IATF 16949", "PPAP", "APQP"], href: "/explorations/industries/automotive" },
      { name: "Aerospace", line: "Supplier approval, first article inspection and requirement flow-down.", chips: ["AS9100", "FAI · AS9102", "NADCAP"], href: "/explorations/industries/aerospace" },
      { name: "Chemicals", line: "Supplier qualification and approved vendor list management.", chips: ["ISO 9001", "ICH Q7", "REACH"], href: "/explorations/industries/chemicals" },
      { name: "Food processing", line: "Approved supplier list and material approval.", chips: ["FSMA · 21 CFR 117", "SQF", "BRCGS"], href: "/explorations/industries/food-processing" },
      { name: "Laboratories", line: "Reagent and consumable supplier approval, certificate control.", chips: ["ISO/IEC 17025", "GLP · 21 CFR 58"], href: "/explorations/industries/laboratories" },
      { name: "Cosmetics", line: "Ingredient supplier approval and certificate verification.", chips: ["MoCRA", "ISO 22716"], href: "/explorations/industries/cosmetics" },
      { name: "Nutritional supplements", line: "Ingredient identity, supplier qualification and incoming testing.", chips: ["21 CFR Part 111", "cGMP"], href: "/explorations/industries/nutritional-supplements" },
      { name: "Industrial machinery", line: "Build-to-order supplier approval and first article on long-lead parts.", chips: ["ISO 9001", "FAT / SAT"], href: "/explorations/industries/industrial-machinery" },
      { name: "Contract research orgs", line: "Vendor oversight and qualification of service providers.", chips: ["ICH E6(R2) GCP"], href: "/explorations/industries/cro" },
    ],
    foot: "Each page carries the full map for that industry: roles, modules and trigger moments in its own vocabulary. Yours not listed? The coordination structure is the same across all of them.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB, grouped by Primary Product. "Supplier Quality" is the
   * one module whose Primary Domain is this domain; the rest are the modules
   * this domain's Pain Points name in Modules Addressing, plus the APQP & PPAP
   * product (the supplier-facing part approval product). Blurbs distilled from
   * each module's Notion Description; standards resolved from each module's
   * External Standards relation to short names. QMS, DMS and MES modules link
   * to their live product pages; APQP & PPAP has no page yet, so every card
   * there is labelled rather than left silently unlinked. */
  coverage: {
    heading: "The products that do the supplier work.",
    lede: "The modules below serve this domain across the Quality Management System, the Document Management System, the Manufacturing Execution System and the APQP & PPAP product. Filter by the standard you are audited against.",
    standardFilters: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR 211", "21 CFR Part 11", "IATF 16949", "AS 9100", "EU GMP", "ICH Q10"],
    groups: [
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Primary",
        promise: "The supplier backbone: qualification, incoming alignment, corrective action and the scorecard on one governed record.",
        modules: [
          { name: "Supplier Quality", blurb: "Supplier corrective action lifecycle, supplier qualification, incoming inspection alignment and scorecard maintenance.", standards: ["ISO 13485", "IATF 16949", "AS 9100", "EU GMP"], href: "/explorations/products/qms" },
          { name: "Corrective & Preventive Actions", blurb: "Root-cause acceptance, action plan, effectiveness verification and closure, related back to the originating non-conformance so the supplier trace is end to end.", href: "/explorations/products/qms" },
        ],
      },
      {
        slug: "dms",
        name: "Document Management System",
        tier: "Primary",
        promise: "Specifications, quality agreements and change: authored once, distributed to the supplier, acknowledged on the record.",
        modules: [
          { name: "Change Control", blurb: "Change requests, change orders and document revisions on configurable approval workflows, with impact assessment and downstream propagation to training and distribution.", standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "ICH Q10"], href: "/explorations/products/dms" },
        ],
      },
      {
        slug: "mes",
        name: "Manufacturing Execution System",
        tier: "Primary",
        promise: "The receiving and traceability leg: inspection at the dock, lot genealogy that survives the supplier handoff.",
        modules: [
          { name: "Inspections, Forms & Checklists", blurb: "Configurable inspection forms and checklists executed at defined points in the workflow, including receiving.", standards: ["ISO 9001", "21 CFR 820"], href: "/explorations/products/mes" },
          { name: "Electronic Batch/Lot Records", blurb: "Electronic batch and lot records with QR code generation, carrying traceability through manufacturing and distribution.", standards: ["21 CFR Part 11", "21 CFR 211", "EU GMP"], href: "/explorations/products/mes" },
        ],
      },
      {
        slug: "apqp-ppap",
        name: "APQP & PPAP",
        tier: "Secondary",
        promise: "Part approval with the supplier inside the workflow rather than emailing into it. In development.",
        // Honest status: the APQP & PPAP product has no live page yet, so every
        // card carries a label instead of reading as shipped.
        modules: [
          { name: "Vendor Portal", blurb: "Bounded supplier access so the supplier participates in the APQP and PPAP submission itself.", soon: "In development" },
          { name: "Customer Requirements Tracking", blurb: "Customer requirement intake, decomposition and traceability through advanced product quality planning.", standards: ["IATF 16949", "AS 9100"], soon: "In development" },
          { name: "Control Plans", blurb: "Control plan definition and version control tied to product, process and supplier.", standards: ["IATF 16949", "AS 9100"], soon: "In development" },
          { name: "APQP FMEA", blurb: "Failure modes and effects analysis scoped to the program under planning.", standards: ["IATF 16949"], soon: "In development" },
          { name: "Product & Process Validation", blurb: "Validation protocols, execution and reports for product and process validation.", standards: ["IATF 16949"], soon: "In development" },
          { name: "Readiness Checklists", blurb: "Phase-by-phase readiness checklists across advanced product quality planning and part approval.", soon: "In development" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: Buyer Personas DB. Both doors the Domains row insists on are here:
   * "Supplier quality governance" (BP-19) and "Procurement decisioning" (BP-9),
   * both carrying Primary Domain = Supplier Management. Supporting cards from
   * "Quality governance" (BP-3, the one live persona page), "Supply chain
   * execution" (BP-4) and the Product Personas rows "Supplier Quality Engineer"
   * and "Quality Inspector". Titles, cares and worries are those rows' fields. */
  personas: {
    heading: "This domain has two front doors.",
    lede: "Supplier work is owned by quality at some companies and by procurement at others, and the coordination tax is the same either way. Find your seat.",
    cards: [
      {
        key: "supplier-quality-leadership",
        iconKey: "quality",
        name: "Supplier quality leadership",
        stake: "Owns the supply base's quality",
        titles: ["Supplier Quality Director", "VP Supplier Quality", "Supplier Quality Manager", "Lead Supplier Quality Engineer"],
        value: "Qualification packages, supplier corrective actions and audit findings arrive with their evidence already attached, and the approved supplier list reflects what was actually verified.",
        cares: "Incoming quality · Supplier CAPA closure · Approved supplier list integrity",
        worries: "Supplier-caused line stops · Inspection backlogs · Findings on supplier oversight",
        primary: true,
      },
      {
        key: "procurement",
        iconKey: "operations",
        name: "Procurement & sourcing",
        stake: "Owns the commercial relationship",
        titles: ["CPO", "Head of Procurement", "Procurement Director", "Category Manager", "Strategic Sourcing Manager"],
        value: "Award decisions carry the quality history with them, and an alternate qualification runs on a visible clock instead of a chain of forwarded approvals.",
        cares: "Award speed · Alternate qualification · Supplier capacity",
        worries: "Slow approvals · Compliance risk on alternates · Supplier failure",
      },
      {
        key: "supplier-quality-engineering",
        iconKey: "engineering",
        name: "Supplier quality engineering",
        stake: "Works the supplier boundary daily",
        titles: ["Supplier Quality Engineer", "Vendor Quality Engineer", "APQP Engineer", "Supplier Quality Specialist"],
        value: "Corrective actions, concessions and part approvals run on one thread with the supplier, so the judgement about whether an issue is systemic or one-off is on the record when the scorecard is reviewed.",
        cares: "Root-cause quality · Requalification evidence · Effectiveness at incoming",
        worries: "Chasing supplier responses · Repeat defects · Stale qualification files",
      },
      {
        key: "incoming-inspection",
        iconKey: "compliance-validation",
        name: "Incoming inspection & receiving",
        stake: "Decides what gets into the plant",
        titles: ["Quality Inspector", "Incoming Inspector", "QC Inspector", "Receiving Inspector"],
        value: "Inspection plans arrive with the current drawing revision attached, holds and releases move with owners visible, and a failed receipt raises the supplier request without a separate email.",
        cares: "Sampling to plan · Correct segregation · Turnaround on holds",
        worries: "Held material aging · Missing inspection plans · Rework on the record",
      },
      {
        key: "quality-leadership",
        iconKey: "regulatory",
        name: "Quality leadership",
        stake: "Signs the quality agreement",
        titles: ["VP Quality", "Head of Quality", "Quality Manager", "QA Manager"],
        value: "Supplier qualification, quality agreements and supplier corrective action sit inside the same governed system as the rest of the QMS, so an audit of supplier controls is answered from the record.",
        cares: "Audit outcomes · Traceability · Recurrence reduction",
        worries: "Missing evidence · Unclear approvals · Repeat issues",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "supply-chain",
        iconKey: "operations",
        name: "Supply chain & materials",
        stake: "Keeps material flowing",
        titles: ["VP Supply Chain", "Supply Chain Director", "Materials Manager", "Planning Manager"],
        value: "When a supplier shock hits, mitigation gets argued once, on one thread, with procurement, supplier quality and manufacturing engineering in the same place as the decision.",
        cares: "Flow of materials · Service levels · Recovery speed",
        worries: "Shortages · Supplier disruptions · Late decisions",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, the 5 of 7 rated Urgent or High. Clocks condensed
   * from Description / Regulatory Framework. The two Medium rows (quality
   * agreement negotiation bottleneck, alternate supplier qualification delay)
   * are deliberately not re-graded to fit this board. No FDA Form 483 row is
   * linked to this domain, so there is no trigger-page link here. */
  triggers: {
    heading: "When the supply base becomes the emergency.",
    lede: "Each of these starts a clock on the far side of an org boundary, and each routes into a governed workflow so the response is coordinated on the record it will be judged by.",
    rows: [
      { name: "Supplier-caused line stop", clock: "Immediate · every hour of line stop has a cost", severity: "Urgent", routesTo: "Supplier Quality · Non-conformance", owner: "Supplier Quality Director · Procurement" },
      { name: "Incoming inspection backlog", clock: "Days · production downstream is starving", severity: "High", routesTo: "Supplier Quality · Inspections", owner: "Supplier Quality Manager · Materials" },
      { name: "Audit finding on supplier controls", clock: "The auditor's stated remediation window", severity: "High", routesTo: "Supplier Quality · Corrective Actions", owner: "VP Quality · Supplier Quality Director" },
      { name: "Customer audit notification", clock: "Fixed external date", severity: "High", routesTo: "Supplier Quality · Change Control", owner: "Quality Manager" },
      { name: "Supplier capacity crisis", clock: "The supplier's stated recovery window", severity: "High", routesTo: "Supplier Quality", owner: "CPO · VP Supply Chain" },
    ],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: MD_COEXISTENCE canonical context (systems of record, Part 11
   * e-signature approval), retargeted to the systems this domain actually
   * touches: purchase orders and receipts in ERP, the approved supplier list
   * and supplier corrective actions in QMS, specifications and BoMs in PLM, lot
   * records in MES. The read-only vendor portal is named from the Pain Points
   * row of the same name. */
  coexistence: {
    heading: "It sits on the stack you already run.",
    systemsOfRecord: ["ERP", "QMS", "PLM", "MES"],
    body: "Purchase orders stay in the ERP, the approved supplier list stays in the QMS, specifications stay in the PLM and lot records stay in the MES. What Unifize replaces is the ungoverned traffic between them and the supplier: the email chains, the meetings and the read-only vendor portal that holds artefacts but not the work. Approvals are captured as a 21 CFR Part 11 e-signature. No rip-and-replace, and no revalidation of a system that already passed.",
    diagramCaption: "Unifize as the coordination layer over your ERP, QMS, PLM and MES, and across the supplier boundary.",
  },

  /* ------------------------------------------------ 09 · proof
   * source: MD_PROOF canonical data (medical-devices-canonical.ts). The signed
   * baseline measures non-conformance coordination cost, and supplier-caused
   * non-conformance is this domain's own work (Themes 106 and 121), so the
   * figure applies here honestly. REAL evidence only; no placeholder people. */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, not a brochure stat, plus named teams running this work on Unifize.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination. The figure is anonymized; named references are shown separately.",
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
   * FACT-GATED, same as every domain page: Part 11 / Annex 11 posture,
   * audit-trail integrity, e-signature manifestation, SOC 2 / ISO 27001, vendor
   * validation package, SaaS release and change-control policy. Renders the
   * moment real facts arrive from engineering and compliance, never authored as
   * marketing copy. The one canonical claim available today (Part 11 e-signature
   * capture) is carried by the coexistence section above. */
  trust: null,

  /* ------------------------------------------------ build the case
   * FACT-GATED champion kit: pilot structure with exit criteria, implementation
   * footprint, per-trigger one-pagers (line-stop and inspection-backlog cost of
   * delay), ROI inputs, pricing shape. Needs numbers from Ben and the
   * implementation team. */
  caseKit: null,

  /* ------------------------------------------------ where teams go next
   * The land-and-expand journey: adjacency from the Domains DB relations (the
   * domains this domain's Themes and Trigger Events also touch) and the product
   * catalog. Live pages get links; the rest carry honest status notes. */
  growth: {
    heading: "Start at the supplier boundary. Don't stop there.",
    lede: "The same governed record runs the rest of the operation, so the system you land this quarter is the platform your next function joins.",
    steps: [
      { name: "Supplier management", note: "You are here" },
      { name: "Quality", note: "Live · the Quality solution", href: "/explorations/domains/quality" },
      { name: "Change control", note: "Live · the Change control solution", href: "/explorations/domains/change-control" },
      { name: "Document & records control", note: "Live · the DMS product", href: "/explorations/products/dms" },
      { name: "Production records", note: "Live · the MES product", href: "/explorations/products/mes" },
      { name: "Part approval (APQP & PPAP)", note: "Product in development" },
    ],
  },

  close: {
    eyebrow: "Supplier management on Unifize",
    heading: "Cross the boundary. Keep the record.",
    lede: "Bring one supplier problem, a corrective action backlog, an inspection queue or a qualification package, and see the decision trace on your own work in a 30-minute walkthrough.",
  },
};
