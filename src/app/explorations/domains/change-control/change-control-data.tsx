/* ============================================================================
 * Change Control, domain (Solutions) page data. All values trace to Notion.
 *
 * source: Domains DB -> "Change Control" (31d860e6b45e816f83a5d5b945352394,
 *   Domain 3, Tier Secondary). The hero framing and the leak thesis are the
 *   row's Description: ECO and ECR workflows need multi-function sign-off,
 *   design history evidence packaging and version-controlled distribution to
 *   suppliers and manufacturing sites; the decision trace is lost when
 *   approvals happen in email threads and design reviews leave no durable
 *   record of what evidence was reviewed, which conditions were accepted, or
 *   what changed between revisions. Named trigger moments on the row: failed
 *   launch, customer ECO rejection, DHF gap at audit.
 * source: Themes DB (6 linked: TH-105 Change Control, TH-127 Engineering
 *   Change Order Governance, TH-123 Customer Specification and Contract
 *   Change, TH-149 Raw Material and Component Specification Management,
 *   TH-168 Packaging Specification Management, TH-158 Product Lifecycle and
 *   Obsolescence Management) -> section 01. One line per Theme, distilled from
 *   its Description; the three clusters are editorial.
 * source: Pain Points DB (4 linked: PP-33, PP-34, PP-35, PP-36) -> section 02,
 *   Name verbatim, body condensed from Description, Severity verbatim. The
 *   cost band carries the qualitative cost from PP-33 (Critical). Notion has
 *   no per-domain dollar figure, so none is stated.
 * source: Customer JTBDs DB (7 linked) -> the decision trace in section 03,
 *   built on S97 "Change control initiation and scope definition (ECR)" and
 *   S60 "Impact assessment and cross-functional change review" (both Primary
 *   land) closing into S76 "Change implementation, verification, and
 *   effectivity date governance".
 * source: Modules DB -> MDL-10 "Change Control" is the only module whose
 *   Primary Domain is this row; its Primary Product is DMS. The rest of the
 *   coverage map is the modules this domain's Pain Points name in "Modules
 *   Addressing" (MDL-9 Document Control, MDL-11 Training Management, both
 *   DMS) plus the product-record modules its Themes run on (MDL-18 Product
 *   Specifications, MDL-19 Product Risk Management, MDL-20 Design Controls &
 *   Traceability, MDL-22 FMEA & Control Plan Definition, all PLM). Standards
 *   short names resolved from each module's External Standards relation.
 * source: Product Personas DB -> the domain links PPS-2 "Quality Manager".
 *   The engineering, document-control, manufacturing and supplier seats are
 *   grounded in the personas this domain's Pain Points name: PPS-8
 *   "Engineering Manager", PPS-5 "Document Controller", PPS-6 "Training
 *   Coordinator", PPS-9 "Production Supervisor".
 * source: Trigger Events DB -> 3 linked (EV-15 Change-driven training cascade
 *   gap, EV-28 Customer ECO rejection, EV-32 DHF gap at audit). Only three are
 *   related, so EV-30 "Failed design transfer", EV-14 "Version mismatch at
 *   site discovered" and EV-29 "Delayed product launch" are SELECTED BY
 *   SUBJECT rather than by relation; all three are named on the Domains row's
 *   own Description as this domain's trigger moments. Clocks condensed from
 *   Description / Time Sensitivity / Regulatory Framework.
 * source: MD_PROOF (medical-devices-canonical) -> section 09. Harmonic
 *   Bionics is the named reference that runs change control on Unifize.
 * Framing / headlines are authored on top of the canonical facts; nothing
 * factual is invented.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: CC-2148 as its owner lives it, one pose per
 * flow.trail step. Same canonical story as the hero float and the flow
 * section (the sterilization SOP change, SOP-118 Rev C → D, PLM ECO-441);
 * names and facts mirror the Medical Devices flagship, retimed to this
 * page's Day 0 → Day 16 trail. Sections and items never change mid-journey;
 * steps only open sections and advance counts. */
const CHANGE_WORLD: ArcadeFlowWorld = {
  team: "Device Engineering",
  recordNoun: "Change Control",
  owner: "L. Martin",
  ownerInitials: "LM",
  participants: ["LM", "RK", "+3"],
  participantsLabel: "L. Martin, R. Kapoor, and three others",
  recordKicker: "CHANGE CONTROL",
  context: {
    initials: "LM",
    name: "L. Martin",
    time: "09:06",
    message: "Opened CC-2148 for the sterilization hold time.",
    detail: "Linked to SOP-118 Rev C · PLM ECO-441",
  },
  inboxNeighbors: [
    { title: "Sterilization of packaged sets", time: "10:40", detail: "SOP-118 · affected document", kind: "Document" },
    { title: "Risk file RA-067", time: "09:12", detail: "ISO 14971 · review in scope", kind: "Review" },
    { title: "Supplier notice · Apex Sterile", time: "Yesterday", detail: "Rev D distribution · acknowledgement due", kind: "Supplier" },
  ],
  checklistTitle: "Change Control",
  checklistSections: [
    {
      title: "CHANGE REQUEST",
      items: [
        { label: "Reason for change", kind: "field", value: "Supplier material change · update sterilization hold time", note: "Entered on the request" },
        { label: "Affected document", note: "SOP-118 · Sterilization · Rev C" },
        { label: "Engineering change", note: "PLM ECO-441 · linked" },
      ],
    },
    {
      title: "IMPACT ASSESSMENT",
      items: [
        { label: "Risk file reviewed", note: "RA-067 · ISO 14971" },
        { label: "Document redline", kind: "revision", from: "Rev C · effective", to: "Rev D · draft" },
        { label: "Training impact", note: "Line 2 · 2 roles" },
      ],
    },
    {
      title: "APPROVAL & EFFECTIVITY",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "R. Kapoor", state: "Approved" },
        { label: "VP Quality · Part 11", kind: "approval", signer: "P. Ramesh", state: "Signed" },
        { label: "Effective at the site", note: "Rev D live · Rev C retired · line 2 trained" },
      ],
    },
  ],
};

/* the same record as its approver sees it: rail avatar, "You" initials and
 * the Part 11 dialog all follow the viewer */
const CHANGE_APPROVER_WORLD: ArcadeFlowWorld = {
  ...CHANGE_WORLD,
  viewer: "P. Ramesh",
  viewerInitials: "PR",
};

/* the constants every pose of the journey shares */
const CHANGE_REC = {
  type: "Change Control",
  id: "CC-2148",
  title: "Sterilization SOP change",
  world: CHANGE_WORLD,
} as const;

export const CHANGE_CONTROL_DATA: DomainPageData = {
  slug: "change-control",
  name: "Change Control",
  tier: "Secondary",

  meta: {
    // The root layout template appends "· Unifize".
    title: "Change Control · Solutions",
    description:
      "Engineering changes close on cross-functional judgement that never reaches the record. Unifize keeps the decision trace: impact, evidence, approval and effective date on one governed change, in your industry's regulatory frame.",
  },

  hero: {
    crumb: "Change Control",
    titleLead: "The change gets approved.",
    titleTurn: "Nobody can replay why.",
    sub: "Sign-off happens in email threads and design reviews, so the evidence that was seen and the conditions that were accepted never reach the record. Unifize holds the change itself, from the request to the effective date.",
    // Parity chips: the flagship Themes, not standards.
    chips: [
      "ECO governance",
      "Change control",
      "Customer spec change",
      "Material specifications",
      "Packaging specs",
      "Obsolescence",
    ],
    // Floating evidence cards: the sealed approval from the flow section and
    // the customer-rejection clock from the trigger board.
    floats: [
      { kind: "seal", title: "Approved on the record", meta: "CC-2148 · 21 CFR Part 11 e-signature" },
      // No statutory clock exists for an ECO rejection, so this card carries the
      // consequence rather than a fabricated duration.
      { kind: "clock", title: "Customer ECO rejection", meta: "The change stays blocked until the evidence is assembled" },
    ],
    // Industries with live pages where this domain runs, per the Themes and
    // Trigger Events industry relations.
    runsIn: {
      label: "Runs wherever a revision has to be proven",
      links: [
        { name: "Medical devices", href: "/explorations/industry-template-modern" },
        { name: "Automotive", href: "/explorations/industries/automotive" },
        { name: "Aerospace", href: "/explorations/industries/aerospace" },
        { name: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
        { name: "Industrial machinery", href: "/explorations/industries/industrial-machinery" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: Themes DB, all 6 rows linked to Change Control; one line per
   * Theme, distilled from its Description. Clusters are editorial; membership
   * traces to each Theme's Description. Group runsIn links are journey ingress
   * into live product pages only. */
  work: {
    heading: "If it changes a released product, it has a home here.",
    lede: "The change work engineering and quality actually run, as governed workflows: named approvers, evidence bound to the revision, an effective date the floor and the supplier both see.",
    groups: [
      {
        glyph: "loop",
        name: "The change itself",
        line: "Somebody asks for a change, the right functions weigh in, it goes live for good.",
        runsIn: { label: "Runs in the DMS product →", href: "/explorations/products/dms" },
        items: [
          {
            name: "Change Control",
            line: "Evaluate, approve and execute a change to a product, process, supplier, document or specification, with each owner verifying it inside their own scope.",
          },
          {
            name: "Engineering Change Order Governance",
            line: "ECOs walked across the BoM, routings, work instructions, supplier documents, training and inventory burn-down to a cut-over date that holds.",
          },
        ],
      },
      {
        glyph: "doc",
        name: "What a revision touches",
        line: "The specifications a change rewrites, and everything downstream that has to move with them.",
        runsIn: { label: "Specifications run in the PLM product →", href: "/explorations/products/plm" },
        items: [
          {
            name: "Raw Material and Component Specification Management",
            line: "Author, version and approve the spec for every material and component, and prove the supplier acknowledged the current one.",
          },
          {
            name: "Packaging Specification Management",
            line: "Primary, secondary and shipping packaging approved and transitioned without stranding stock or missing a labelling rule.",
          },
        ],
      },
      {
        glyph: "chat",
        name: "Change you did not start",
        line: "The revisions that arrive from a customer or a supplier, on their schedule.",
        items: [
          {
            name: "Customer Specification and Contract Change",
            line: "A customer-driven spec or contract change assessed across functions, implemented, and proven back to the customer with traceable evidence.",
          },
          {
            name: "Product Lifecycle and Obsolescence Management",
            line: "Introduction, mature run, end of life and obsolescence planned, with last-time buys placed and alternates qualified before supply runs out.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, all 4 rows linked to Change Control. Names
   * verbatim; bodies condensed from the Description field; Severity verbatim.
   * `surface` = where the decision leaks to, condensed from each Description. */
  leaks: {
    heading: "The change is approved. The record cannot replay why.",
    lede: "The failure modes we see inside change control. None of them is a missing feature. All of them are decisions that happened off the record.",
    /* the old world, staged (section 02's evidence artifact): the approved
     * change that never quite lands at the site. Furniture is illustrative,
     * not a claim. */
    scene: {
      kicker: "ECO-441 packet",
      chip: "Rev C still live",
      title: "The change, waiting to land",
      rows: [
        { state: "done", label: "Redline approved", age: "by email" },
        { state: "wait", label: "Training cascade", age: "list out of date", warn: true },
        { state: "wait", label: "Supplier notice", age: "unacknowledged" },
        { state: "idle", label: "Effective date", age: "Slipped twice" },
      ],
      float: { kicker: "Line 2", note: "We built 40 units to Rev C this morning." },
      caption: "Approved upstream, invisible downstream. The line finds out last.",
    },
    pains: [
      {
        severity: "Critical",
        surface: "The shop floor",
        name: "Change effectivity not propagated to the production line before parts ship",
        body: "A change is approved with an effective date. The line still builds to the old version because the notification never landed, the training did not happen, or the parts on hand are old-version. The first the operator hears about it is a finished part being rejected.",
      },
      {
        severity: "High",
        surface: "Adjacent functions",
        name: "Change impact assessment skips the affected persona set",
        body: "The assessor names the obvious functions (Engineering, Quality) and misses the adjacent ones (Training, Supplier Quality, Field Service). The change lands, and the missed function discovers the consequence after the fact.",
      },
      {
        severity: "High",
        surface: "The training queue",
        name: "Late training cascade after change closure",
        body: "Closure includes a training cascade: who needs retraining, by when. The assignment goes out late, the deadline slips, and people work to the new version for weeks without verified training. The traceability between change and training is partial.",
      },
      {
        severity: "Medium",
        surface: "The approval queue",
        name: "Low-risk changes inherit high-risk approval depth",
        body: "The workflow is designed for high-risk change: a design revision, a process change, a critical-material supplier swap. The same approval depth applies to a typo in an SOP. Low-risk records fill the queue, and the high-risk change waits behind them.",
      },
    ],
    note: "Severity as rated in our field research with engineering and quality teams, current as of the last review.",
    // Qualitative by design: Notion carries no per-domain dollar figure, so the
    // band states the canonical cost from the Critical pain instead.
    tax: {
      label: "The recurring bill",
      value: "Parts built to a revision that was already superseded.",
      meta: "The change was approved on time. The line never heard, so the first signal is a finished part failing inspection, and the rework lands on a schedule that had no room for it.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: Customer JTBDs -> S97 "Change control initiation and scope
   * definition (ECR)" and S60 "Impact assessment and cross-functional change
   * review" (both Primary land), closing into S76 "Change implementation,
   * verification, and effectivity date governance". Step vocabulary from the
   * Change Control module's Notion Description (impact assessment, evidence,
   * downstream propagation to training and document distribution). Days are
   * narrative, matching the shared change-control record shell. */
  flow: {
    heading: "Run the change where the sign-off happens.",
    lede: "Most systems record that a change was approved. Unifize holds the review itself, so the evidence seen, the conditions accepted and the effective date seal into a trace an auditor can replay.",
    trailLabel: "How the decision moves",
    trail: [
      { t: "Change raised with scope and rationale", who: "Change Initiator", when: "Day 0" },
      { t: "Impact assessment bound to the record", who: "Engineering · Quality", when: "Day 2" },
      { t: "Cross-functional review closed", who: "Change Control Board", when: "Day 5" },
      { t: "Approved with e-signature", who: "VP Quality", when: "Day 9" },
      { t: "Effective at the site · trace sealed", who: "Manufacturing Engineering", when: "Day 16" },
    ],
    trailFoot: "The relation runs back to the request that raised it and forward into the documents, training and supplier notices it changes. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / change-control / CC-2148",
    mobileLabel: "Change decision trace",
    mobileId: "CC-2148 · request → impact → review → approval → effective",
    /* one pose per trail step; the trail drives the camera (domain-arcade) */
    arcade: {
      steps: [
        {
          ...CHANGE_REC,
          source: "DK · CC-2148 · raise",
          ghost: "Raise",
          status: "Draft",
          actor: "You",
          event: "Raised the change from SOP-118",
          eventDetail: "Rationale captured on the record · affected documents scoped",
          checklist: "CHANGE REQUEST",
          checklistItems: ["Reason for change", "Affected document", "Engineering change"],
          focus: "print",
          focusTitle: "Change request",
          focusRows: ["Supplier material change", "SOP-118 · Rev C", "PLM ECO-441"],
          focusAction: "Submit for assessment",
          ownershipNote: "One record from the first decision",
          checklistOpen: "CHANGE REQUEST",
          checklistEntry: { section: "CHANGE REQUEST", item: "Reason for change" },
          checklistProgress: { "CHANGE REQUEST": 2, "IMPACT ASSESSMENT": 0, "APPROVAL & EFFECTIVITY": 0 },
          checklistFootnote: "Affected documents scoped from SOP-118",
        },
        {
          ...CHANGE_REC,
          source: "DK · CC-2148 · bind",
          ghost: "Bind",
          status: "Open",
          actor: "automator",
          event: "Bound the impact assessment to the record",
          eventDetail: "Documents, risk and training scoped in one pass",
          checklist: "IMPACT ASSESSMENT",
          checklistItems: ["SOP-118 · Sterilization · Rev C → D", "Risk file RA-067 · ISO 14971", "Training impact · Line 2 · 2 roles"],
          focus: "trace",
          focusTitle: "Impact assessment bound",
          focusRows: ["Everything the change touches", "3 records linked"],
          focusAction: "Open evidence chain",
          ownershipNote: "Scoped by rule, not by memory",
          checklistOpen: "IMPACT ASSESSMENT",
          checklistProgress: { "IMPACT ASSESSMENT": 2, "APPROVAL & EFFECTIVITY": 0 },
          related: 3,
        },
        {
          ...CHANGE_REC,
          source: "DK · CC-2148 · review",
          ghost: "Review",
          status: "In Review",
          actor: "Unifize Assistant",
          event: "Assembled the cross-functional review",
          eventDetail: "Engineering and Manufacturing on one thread · comment resolved inline",
          checklist: "APPROVAL & EFFECTIVITY",
          checklistItems: ["Cross-functional review", "VP Quality · Part 11", "Effective at the site"],
          focus: "review",
          focusTitle: "Cross-functional review",
          focusRows: ["Engineering · Approved", "Manufacturing · Approved", "Hold-time comment · Resolved inline"],
          focusAction: "Approve redline",
          focusAlts: ["Return with comment"],
          ownershipNote: "The redline stays on the record",
          checklistOpen: "APPROVAL & EFFECTIVITY",
          checklistProgress: { "APPROVAL & EFFECTIVITY": 1 },
        },
        {
          ...CHANGE_REC,
          source: "DK · CC-2148 · sign",
          ghost: "Sign",
          status: "Needs Approval",
          actor: "You",
          event: "Re-authenticated for regulated approval",
          eventDetail: "Signer, meaning and time seal to CC-2148",
          checklist: "APPROVAL & EFFECTIVITY",
          checklistItems: ["Cross-functional review", "VP Quality · Part 11", "Effective at the site"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "Identity re-verified · 21 CFR Part 11",
          world: CHANGE_APPROVER_WORLD,
          checklistOpen: "APPROVAL & EFFECTIVITY",
          checklistProgress: { "APPROVAL & EFFECTIVITY": 1 },
          signedItems: [
            { name: "R. Kapoor", initials: "RK", role: "Cross-functional review", approvalId: "4C21B2148A90", time: "Day 5" },
          ],
        },
        {
          ...CHANGE_REC,
          source: "DK · CC-2148 · effective",
          ghost: "Effective",
          status: "Effective",
          actor: "automator",
          event: "Published Rev D, effective at the site",
          eventDetail: "Rev C retired · training cascade complete · supplier acknowledged",
          checklist: "APPROVAL & EFFECTIVITY",
          checklistItems: ["Cross-functional review", "VP Quality · Part 11", "Effective at the site"],
          focus: "history",
          focusKicker: "DECISION TRACE",
          focusTitle: "One sealed decision trace",
          focusRows: ["CC-2148 · Effective · trace sealed", "SOP-118 Rev D live · Rev C retired", "Training cascade · Line 2 · 14 of 14"],
          ownershipNote: "Reconstructable at audit",
          checklistOpen: "APPROVAL & EFFECTIVITY",
          signedItems: [
            { name: "P. Ramesh", initials: "PR", role: "VP Quality", approvalId: "9E77C2148D41", time: "Day 9" },
          ],
          related: 3,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry
   * The L1 fan-out. Rows link to the live industry pages only; each line
   * instances change control in that industry's vocabulary, and chips are that
   * industry page's own canonical regulatory frame. */
  industries: {
    heading: "Change control, in your regulatory frame.",
    lede: "The same work, translated to the standards you are inspected against. Every industry page carries change in its own vocabulary.",
    rows: [
      { name: "Medical devices", line: "Design changes, DHF impact and ECOs on released product.", chips: ["21 CFR 820", "ISO 13485", "EU MDR"], href: "/explorations/industry-template-modern" },
      { name: "Automotive", line: "ECOs, customer change approval and PPAP re-submission.", chips: ["IATF 16949", "PPAP"], href: "/explorations/industries/automotive" },
      { name: "Aerospace", line: "Drawing revisions, configuration control and first-article requalification.", chips: ["AS9100", "FAI · AS9102"], href: "/explorations/industries/aerospace" },
      { name: "Pharmaceuticals", line: "Process and specification changes with regulatory impact assessed first.", chips: ["21 CFR 210/211", "ICH Q10"], href: "/explorations/industries/pharmaceuticals" },
      { name: "Chemicals", line: "Formulation and raw-material substitutions with safety documents kept in step.", chips: ["REACH", "GHS / CLP"], href: "/explorations/industries/chemicals" },
      { name: "Industrial machinery", line: "Engineering changes on build-to-order machines, drawings and manuals together.", chips: ["CE marking", "ISO 12100"], href: "/explorations/industries/industrial-machinery" },
      { name: "Food processing", line: "Recipe, packaging and supplier changes with allergen and label impact assessed.", chips: ["FSMA · 21 CFR 117", "BRCGS"], href: "/explorations/industries/food-processing" },
      { name: "Cosmetics", line: "Formulation and packaging changes with label claims kept current.", chips: ["MoCRA", "ISO 22716"], href: "/explorations/industries/cosmetics" },
      { name: "Nutritional supplements", line: "Formulation, label and supplier changes against the master manufacturing record.", chips: ["21 CFR Part 111", "cGMP"], href: "/explorations/industries/nutritional-supplements" },
      { name: "Laboratories", line: "Method and SOP revisions with version control across sites.", chips: ["ISO/IEC 17025", "GLP · 21 CFR 58"], href: "/explorations/industries/laboratories" },
      { name: "Contract research orgs", line: "Protocol amendments and SOP revisions controlled across studies.", chips: ["ICH E6(R2) GCP", "eTMF"], href: "/explorations/industries/cro" },
    ],
    foot: "Each page carries the full map for that industry: personas, modules and trigger moments in its own vocabulary. Yours not listed? The workstreams are industry-agnostic by design.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB. MDL-10 Change Control is the only module with Primary
   * Domain = Change Control; it is bundled into DMS, alongside the two modules
   * this domain's Pain Points name (MDL-9 Document Control, MDL-11 Training
   * Management). The PLM group carries the product-record modules the Themes
   * run on. Blurbs distilled from each module's Notion Description; standards
   * are the External Standards relation resolved to short names. Both products
   * have live pages, so every card links. Group tier reflects where this domain
   * is anchored (DMS) versus where it reaches (PLM). */
  coverage: {
    heading: "The modules that run the change.",
    lede: "Change Control ships inside the Document Management System, next to the documents and training every revision moves. The product record it rewrites lives in Product Lifecycle Management.",
    standardFilters: [
      "ISO 9001",
      "ISO 13485",
      "21 CFR 820",
      "21 CFR Part 11",
      "IATF 16949",
      "AS 9100",
      "ICH Q10",
      "ICH Q9",
      "ISO 14971",
      "EU GMP",
      "ISO 62304",
    ],
    groups: [
      {
        slug: "dms",
        name: "Document Management System",
        tier: "Primary",
        promise: "The change backbone: request, impact, approval and the revision it publishes, on one governed record.",
        modules: [
          {
            name: "Change Control",
            blurb: "Engineering change orders, change requests and document revisions routed through configurable approvals, with impact assessment, evidence and downstream propagation on the record.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "ICH Q10"],
            href: "/explorations/products/dms",
          },
          {
            name: "Document Control",
            blurb: "Controlled authoring, review, approval, distribution and periodic review, with version history and effective-date governance so the site is never on a superseded copy.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR Part 11", "EU GMP"],
            href: "/explorations/products/dms",
          },
          {
            name: "Training Management",
            blurb: "Competency assignment and completion tracking, with retraining triggered by the document revision itself, so a change reaches the people who work to it.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820"],
            href: "/explorations/products/dms",
          },
        ],
      },
      {
        slug: "plm",
        name: "Product Lifecycle Management",
        tier: "Secondary",
        promise: "The product record a change rewrites: specifications, design traceability, risk and control plans.",
        modules: [
          {
            name: "Product Specifications",
            blurb: "Specification records for raw materials, finished goods, assemblies and parts, with version history and approval routing.",
            standards: ["ISO 13485", "IATF 16949", "AS 9100"],
            href: "/explorations/products/plm",
          },
          {
            name: "Design Controls & Traceability",
            blurb: "Design input, output, verification and validation records with traceability from requirement to test result, which is what a Design History File review asks for.",
            standards: ["21 CFR 820", "ISO 13485", "ISO 62304"],
            href: "/explorations/products/plm",
          },
          {
            name: "Product Risk Management",
            blurb: "Hazards, controls and verification held against the product itself, so a change is reviewed against the risk file rather than around it.",
            standards: ["ISO 14971", "ICH Q9"],
            href: "/explorations/products/plm",
          },
          {
            name: "FMEA & Control Plan Definition",
            blurb: "Design and process FMEAs with the control plans they drive, surfaced when a change touches the characteristic they protect.",
            standards: ["IATF 16949", "AS 9100"],
            href: "/explorations/products/plm",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: Product Personas DB. The engineering seat is primary here (the
   * change decision is made on the engineering side); PPS-8 Engineering
   * Manager supplies the titles and caseload vocabulary. PPS-2 Quality Manager
   * is the persona this domain relates and has the one live persona page.
   * PPS-5 Document Controller and PPS-6 Training Coordinator carry the
   * document seat; PPS-9 Production Supervisor the site that receives the
   * change. The supplier and customer seat comes from the Themes' role
   * vocabulary (Supplier Quality, Customer Quality, Procurement). */
  personas: {
    heading: "A change is a chain of sign-offs.",
    lede: "Every workstream above closes on a named role's judgement. Find your seat and see what changes when the reasoning stays on the record.",
    cards: [
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Engineering",
        stake: "Owns the change decision",
        titles: ["Engineering Manager", "Design Engineer", "VP Engineering", "Head of R&D"],
        value: "Open change orders arrive with their impact assessment, affected specifications and reviewers already bound, so a design review ends in a decision instead of an action item.",
        cares: "Change cycle time · Design intent · Cost versus schedule",
        worries: "ECOs in limbo · Rework · Slipped launch dates",
        primary: true,
      },
      {
        key: "quality-leadership",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Approves the change",
        titles: ["Quality Manager", "QA Manager", "Director of Quality", "Head of Quality"],
        value: "Change controls arrive with impact, risk and evidence on the same record, so approval is a judgement rather than a search across inboxes.",
        cares: "Audit readiness · Effectivity control · Risk review",
        worries: "Repeat findings · Approval backlogs · Side-channel sign-off",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "document-control",
        iconKey: "compliance-validation",
        name: "Document control & training",
        stake: "Publishes the revision",
        titles: ["Document Controller", "Training Coordinator", "Records Manager"],
        value: "An approved change publishes the new revision, retires the old one and hands the training obligation to the roles that use it, without a parallel spreadsheet.",
        cares: "Version integrity · Distribution · Training completion",
        worries: "Superseded copies in use · Late cascades · Stalled signature loops",
      },
      {
        key: "manufacturing-site",
        iconKey: "operations",
        name: "Manufacturing & the site",
        stake: "Builds to the new revision",
        titles: ["Production Supervisor", "Manufacturing Engineer", "Plant Manager"],
        value: "The effective date arrives with the work instruction, the training and the old-version stock accounted for, so the line changes over on the day it is supposed to.",
        cares: "Cut-over readiness · Inventory burn-down · Line stability",
        worries: "Building to the old version · Rejected parts · Unplanned downtime",
      },
      {
        key: "supplier-customer-quality",
        iconKey: "regulatory",
        name: "Supplier & customer quality",
        stake: "Carries the change outside",
        titles: ["Supplier Quality Engineer", "Customer Quality Manager", "Procurement Lead"],
        value: "Suppliers and customers receive the current revision and acknowledge it on the record, so a change is not treated as live until the people building to it have it.",
        cares: "Supplier acknowledgement · Requalification · Customer approval",
        worries: "Old drawings at the supplier · ECO rejection · Late notification",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB. Three rows are related to this domain (EV-15,
   * EV-28, EV-32). EV-30, EV-14 and EV-29 are SELECTED BY SUBJECT rather than
   * by relation: all three are named on the Domains row's own Description as
   * this domain's trigger moments (failed launch, customer ECO rejection, DHF
   * gap at audit) or turn on a superseded revision reaching a site. Clocks
   * condensed from each row's Description, Time Sensitivity and Regulatory
   * Framework. None of these is the FDA 483 row, so no trigger page links. */
  triggers: {
    heading: "When a revision becomes the finding.",
    lede: "Each of these starts a clock, and each routes into a governed workflow, so the response is coordinated on the record it will be judged by.",
    rows: [
      { name: "DHF gap at audit", clock: "Days to respond · treated as systemic", severity: "Urgent", routesTo: "Design Controls & Traceability", owner: "Engineering · Regulatory · Quality" },
      { name: "Customer ECO rejection", clock: "Days · the change is blocked until the evidence is assembled", severity: "High", routesTo: "Change Control", owner: "Engineering Manager · Customer Quality" },
      { name: "Version mismatch at site discovered", clock: "Days · downstream production records under review", severity: "High", routesTo: "Document Control", owner: "Document Control · Quality" },
      { name: "Change-driven training cascade gap", clock: "Days · exposure compounds with every unit produced", severity: "High", routesTo: "Training Management", owner: "Training Coordinator · Quality" },
      { name: "Failed design transfer", clock: "Weeks · the launch date slips while the failing dimensions close", severity: "High", routesTo: "Design Controls & Traceability", owner: "Engineering · Operations" },
      { name: "Delayed product launch", clock: "Weeks · commitments, filings and supplier ramp move with it", severity: "High", routesTo: "Change Control · Product Specifications", owner: "VP Engineering · Product Management" },
    ],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: the Themes descriptions, which name the systems a change has to be
   * reconciled across (PLM, ERP, QMS, label and MES systems), plus the
   * canonical Part 11 e-signature claim carried by MD_COEXISTENCE. */
  coexistence: {
    heading: "It sits on the stack you already run.",
    systemsOfRecord: ["PLM", "ERP", "QMS", "MES"],
    body: "Unifize replaces the ungoverned channels (email threads, design review meetings, spreadsheets) where the reasoning behind a change goes missing, not the systems that hold your BoMs, routings and released documents. Approvals are captured as a 21 CFR Part 11 e-signature. No rip-and-replace, and no revalidation of a system that already passed.",
    diagramCaption: "Unifize as the coordination layer over your PLM, ERP, QMS and MES.",
  },

  /* ------------------------------------------------ 09 · proof
   * source: MD_PROOF canonical data (medical-devices-canonical.ts). Harmonic
   * Bionics is the named reference whose change control runs on Unifize, so it
   * leads. The attested baseline measures non-conformance coordination at a
   * medical-device manufacturer; the note says so plainly rather than letting
   * it read as a change-control figure. REAL evidence only. */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, not a brochure stat, plus the named teams that hold change on an accountable thread.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized; named references are shown separately.",
    },
    /* real films from the Website Customer Videos mirror whose Module tags
     * intersect this domain's work (governance in customer-films.ts) */
    filmTags: ["Change Control", "Change Requests & Orders", "Document Management", "Training"],
    references: [
      {
        tag: "Named reference",
        name: MD_PROOF.customers[1].name,
        desc: MD_PROOF.customers[1].desc,
        link: { label: "Change control runs in the DMS product →", href: "/explorations/products/dms" },
      },
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/explorations/resources/testimonials" },
  },

  /* ------------------------------------------------ compliance & trust
   * FACT-GATED: Part 11 / Annex 11 posture, audit-trail integrity, e-signature
   * manifestation, SOC 2 / ISO 27001, vendor validation package, SaaS
   * release/change-control policy. It renders the moment real facts arrive
   * from engineering/compliance, never authored as marketing copy. The one
   * canonical claim already available (Part 11 e-signature capture) is carried
   * by the coexistence section above. */
  trust: null,

  /* ------------------------------------------------ build the case
   * FACT-GATED champion kit. Fill when the artifacts are real: pilot structure
   * with exit criteria, implementation footprint, per-trigger one-pagers,
   * ROI inputs, pricing shape. Needs numbers from Ben / the implementation
   * team. */
  caseKit: null,

  /* ------------------------------------------------ where teams go next
   * The land-and-expand journey. Change control is one thread inside the wider
   * product-development journey (Domains DB adjacency), so the path runs out
   * through the documents and training a revision moves and on into the
   * product record. Live pages get links; the rest carry honest notes. */
  growth: {
    heading: "Land the change. Then the record it moves.",
    lede: "Change control is one thread of a wider product-development journey, and it runs on the same governed record as the documents, training and specifications it rewrites.",
    steps: [
      { name: "Change control", note: "You are here" },
      { name: "Document & records control", note: "Live · the DMS product", href: "/explorations/products/dms" },
      { name: "Training & competency", note: "Live · the DMS product", href: "/explorations/products/dms" },
      { name: "Product development", note: "Live · the PLM product", href: "/explorations/products/plm" },
      { name: "Quality", note: "Solution page live", href: "/explorations/domains/quality" },
      { name: "Supplier management", note: "Solution page", href: "/explorations/domains/supplier-management" },
    ],
  },

  close: {
    eyebrow: "Change control on Unifize",
    heading: "Approve the change. Keep the reasoning.",
    lede: "Bring one real change, a stalled ECO or a launch-blocking spec revision, and see the decision trace on your own work in a 30-minute walkthrough.",
  },
};
