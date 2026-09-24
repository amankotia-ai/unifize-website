/* ============================================================================
 * Document & Records Control: domain (Solutions) page data. All values trace
 * to Notion.
 *
 * source: Domains DB -> "Document and Records Control"
 *   (31d860e6b45e81eabe66f39f9cd762be, Domain 4, Tier Secondary). The hero
 *   framing and the leak thesis are the row's Description: authoring, review,
 *   approval, controlled distribution and obsolescence need multi-owner
 *   workflows with version integrity across sites, laboratories and external
 *   partners; audit findings result when documents in active use cannot be
 *   tied to an approval record and a controlled distribution log (the
 *   version-mismatch failure mode). Named triggers: audit finding on document
 *   control, version mismatch at site. Internal fields (budget owner, play
 *   coverage) are used for understanding only, never published.
 * source: Themes DB, the 3 rows linked (PH0-112 Document and Specification
 *   Control, PH0-117 Label and Artwork Control, PH0-132 Data Integrity, Access
 *   Control and E-Signature Governance) -> section 01, one cluster per Theme.
 *   The items under each are the workstreams that Theme's own Description
 *   names; under Document and Specification Control they are the domain's 4
 *   Customer JTBDs (PWO-56, PWO-44, PWO-68, PWO-86).
 * source: Pain Points DB, the 4 rows linked (PNT-37 Critical, PNT-40 High,
 *   PNT-38 Medium, PNT-39 Medium) -> section 02. Names verbatim EXCEPT PNT-37,
 *   whose Notion name says "Notion" (the tool one customer kept SOPs in); the
 *   page says "the wiki" so the site does not name a third-party product as
 *   the problem. Bodies condensed from Description; Severity verbatim.
 * source: Trigger Events DB, the 3 rows linked (TE-11 Audit finding on
 *   document control, TE-14 Version mismatch at site discovered, TE-13
 *   Customer audit notification) -> section 07. Clocks from Time Sensitivity
 *   + Description; regulatory frames from Regulatory Framework.
 * source: Modules DB -> MDL-9 "Document Control" is the only module whose
 *   Primary Domain is this row (Primary Product: Document Management System).
 *   Its Processes Included (lifecycle states, watermarking by state,
 *   controlled copy issuance and retrieval, periodic review, where-used) and
 *   Completion Contracts (author, reviewer, document controller and QA
 *   signatures; training setup; effective date) drive the journey. Training
 *   Management (MDL-11) and Change Control (MDL-10) sit beside it in the same
 *   product and are named by the module's own contracts (training setup,
 *   linked change control).
 * source: Product Personas DB -> the domain links PPS-2 Quality Manager; the
 *   module's Roles model names the document controller, author, reviewer,
 *   QA manager and training coordinator seats.
 * source: Website Customer Videos mirror -> the rails proof reel, seven
 *   document films none of the other Solutions pages use; each fact is taken
 *   from the film's own title.
 * The arcade record (WI-0417, filling line set-up, v3.1 -> v3.2) and every
 *   cell artifact are illustrative furniture built from the pain map's own
 *   example (v3.2 in the system, v3.1 on the share, v2.8 laminated at the
 *   workstation), never claims.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: WI-0417 revised from v3.1 to v3.2, walked through
 * the Document Control module's own lifecycle (draft -> review -> approval ->
 * effective with training -> superseded with copies retrieved). */
const DOC_WORLD: ArcadeFlowWorld = {
  team: "Quality Systems",
  recordNoun: "Document",
  owner: "A. Ruiz",
  ownerInitials: "AR",
  participants: ["AR", "JP", "+2"],
  participantsLabel: "A. Ruiz, J. Park, and two others",
  recordKicker: "WORK INSTRUCTION",
  context: {
    initials: "AR",
    name: "A. Ruiz",
    time: "08:52",
    message: "Started v3.2 of WI-0417 from the controlled template.",
    detail: "Filling line set-up · v3.1 effective",
  },
  inboxNeighbors: [
    { title: "Line clearance, filling", time: "10:12", detail: "SOP-231 · periodic review due", kind: "Review" },
    { title: "Label artwork, 50 ml carton", time: "09:40", detail: "ART-088 · DE proof returned", kind: "Artwork" },
    { title: "Quarterly access review", time: "Yesterday", detail: "Document system · 1 account flagged", kind: "Access review" },
  ],
  checklistTitle: "Document Control",
  checklistSections: [
    {
      title: "DRAFT & REVIEW",
      items: [
        { label: "Revision", kind: "revision", from: "v3.1 · effective", to: "v3.2 · draft" },
        { label: "Department review", note: "Production · J. Park" },
        { label: "Format and numbering", note: "Document control check" },
      ],
    },
    {
      title: "APPROVAL",
      items: [
        { label: "Author", kind: "approval", signer: "A. Ruiz", state: "Signed" },
        { label: "Department reviewer", kind: "approval", signer: "J. Park", state: "Signed" },
        { label: "QA Manager · Part 11", kind: "approval", signer: "N. Haddad", state: "Signed" },
      ],
    },
    {
      title: "EFFECTIVE & DISTRIBUTION",
      items: [
        { label: "Effective date", note: "Set on approval" },
        { label: "Training assigned", note: "Filling line · 3 roles" },
        { label: "Controlled copies", note: "v3.1 retrieved from point of use" },
      ],
    },
  ],
};

/* the same record as the QA Manager sees it at signature */
const DOC_APPROVER_WORLD: ArcadeFlowWorld = { ...DOC_WORLD, viewer: "N. Haddad", viewerInitials: "NH" };

const DOC_REC = {
  type: "Document",
  id: "WI-0417",
  title: "Filling line set-up",
  world: DOC_WORLD,
} as const;

export const DOCUMENT_AND_RECORDS_CONTROL_DATA: DomainPageData = {
  slug: "document-and-records-control",
  name: "Document & Records Control",
  tier: "Secondary",

  hero: {
    crumb: "Document & Records Control",
    titleLead: "The system says v3.2.",
    titleTurn: "The workstation says v2.8.",
    sub: "Documents are approved in one place, copied to a share and printed for the floor, so the version in use drifts from the one approved. Unifize keeps one controlled version, its approval and where it went on the same record.",
    chips: ["Document control", "Specifications", "Label and artwork", "Periodic review", "Access and e-signatures"],
    floats: [
      { kind: "seal", title: "Effective on the record", meta: "WI-0417 v3.2 · 21 CFR Part 11 e-signature" },
      { kind: "clock", title: "Periodic review overdue", meta: "In active use while the review waits" },
    ],
    // industries with live pages, per the Trigger Events industry relations
    // and the module's industry notes
    runsIn: {
      label: "Runs wherever the current version has to be provable",
      links: [
        { name: "Medical devices", href: "/industries/medical-devices" },
        { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
        { name: "Automotive", href: "/industries/automotive" },
        { name: "Aerospace", href: "/industries/aerospace" },
        { name: "Food processing", href: "/industries/food-processing" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: the 3 Themes, one cluster each; items are the workstreams each
   * Theme's Description names (the JTBDs under document control). */
  work: {
    heading: "Every controlled page, from draft to retired.",
    lede: "The document work quality and operations actually run, as governed workflows: named authors and approvers, an effective date the floor can see, and the old version pulled back when the new one goes live.",
    groups: [
      {
        glyph: "doc",
        name: "Controlled documents",
        line: "SOPs, work instructions, specifications and forms, authored, approved, distributed and retired under control.",
        runsIn: { label: "Runs in the DMS product →", href: "/products/dms" },
        viz: {
          kind: "watermark",
          wash: "sky",
          cursor: { name: "A. Ruiz", tone: "#7c3aed" },
          doc: "WI-0417",
          title: "Filling line set-up",
          version: "v3.2",
          mark: "EFFECTIVE",
          meta: [
            { k: "Approved", v: "Part 11 signed" },
            { k: "Training", v: "3 roles" },
            { k: "Supersedes", v: "v3.1" },
          ],
        },
        items: [
          { name: "Document authoring, review and approval routing", line: "Authors draft, reviewers comment, QA and department heads approve, on one routed record." },
          { name: "Work instructions linked to training", line: "A new work instruction reaches the people who follow it, with training attached." },
          { name: "Distribution, acknowledgement and obsolescence", line: "The effective version distributed and acknowledged, the old one retired from point of use." },
          { name: "Periodic review and re-approval", line: "Review dates that end in a re-approval or a revision, not another reminder." },
        ],
      },
      {
        glyph: "box",
        name: "Labels and artwork",
        line: "Labels, inserts, instructions for use and carton artwork, released under regulatory and brand control.",
        viz: {
          kind: "artwork",
          wash: "warm",
          cursor: { name: "J. Park", tone: "#0f8f7e" },
          file: "ART-088 · 50 ml carton",
          langs: ["EN", "DE", "FR"],
          lang: 1,
          pins: [
            { n: 1, note: "Claim text · Regulatory to confirm", open: true },
            { n: 2, note: "Storage line · approved" },
            { n: 3, note: "Barcode · verified" },
          ],
        },
        items: [
          { name: "Label and artwork control", line: "Claims, brand and artwork approved by Regulatory, Marketing and Quality before print." },
          { name: "Multilingual proofing", line: "Every language and pack size proofed against the approved master." },
          { name: "Artwork release against production and stock", line: "Artwork released in step with production and the stock it replaces." },
        ],
      },
      {
        glyph: "scale",
        name: "The record behind the record",
        line: "Who can sign, what the audit trail shows, and proof that every electronic signature holds.",
        runsIn: { label: "See the compliance solution →", href: "/domains/compliance" },
        viz: {
          kind: "access",
          wash: "blue",
          cursor: { name: "N. Haddad", tone: "#d97706" },
          kicker: "Quarterly access review",
          system: "Document system",
          users: [
            { name: "J. Park", role: "Reviewer · Production" },
            { name: "N. Haddad", role: "Approver · QA" },
            { name: "T. Brooks", role: "Approver · QA", flag: "Left the company · still active" },
          ],
        },
        items: [
          { name: "Periodic access reviews", line: "Who can author, review and sign, reviewed and evidenced on schedule." },
          { name: "Audit trail reports on demand", line: "The audit trail behind a record, produced when an inspector asks." },
          { name: "E-signature governance · Part 11 and Annex 11", line: "Every signature attributable, with its meaning and time, across systems." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, the 4 rows linked. */
  leaks: {
    heading: "The document is controlled. The copy in use is not.",
    lede: "The failure modes we see inside document control. None of them is a missing feature. All of them are versions that left the record.",
    scene: {
      kicker: "WI-0417",
      chip: "Three versions",
      title: "One procedure, three places",
      rows: [
        { state: "done", label: "Document system", age: "v3.2" },
        { state: "wait", label: "File share", age: "v3.1 · local edit", warn: true },
        { state: "wait", label: "Workstation 3", age: "v2.8 · laminated", warn: true },
      ],
      float: { kicker: "Auditor · day 1", note: "Show me the copy in use at workstation 3." },
      caption: "Three copies, three versions. The floor works to the oldest.",
      /* the rails window: the pain map's own example, staged */
      copies: {
        doc: "Filling line set-up",
        items: [
          { where: "Document system", version: "v3.2", note: "Approved and effective", state: "current" },
          { where: "File share", version: "v3.1", note: "Someone's local edit", state: "stale" },
          { where: "Workstation 3", version: "v2.8", note: "Laminated at the last reprint. In use.", state: "used" },
        ],
      },
    },
    pains: [
      {
        severity: "Critical",
        surface: "The shop floor",
        name: "SOP version drift between the wiki, file share, and shop floor",
        short: "The current version depends on where you look.",
        body: "The same SOP exists in the controlled system at v3.2, on a working file share at v3.1 and laminated at the workstation at v2.8. The operator uses what is in front of them.",
      },
      {
        severity: "High",
        surface: "Point of use",
        name: "Effective-date governance ambiguous at point of use",
        short: "Between approval and the effective date, the floor guesses.",
        body: "A document is approved on one date and effective on another. In between, the operator may be on either version depending on local interpretation. The rule exists; nothing shows it at point of use.",
      },
      {
        severity: "Medium",
        surface: "The approval queue",
        name: "Document approval queue invisible until SLA breach",
        short: "Nobody sees the queue until the breach alert does.",
        body: "Documents waiting for approval are visible only to those who think to look. The approver does not know what is waiting and the author does not know whether to chase.",
      },
      {
        severity: "Medium",
        surface: "Audit day",
        name: "Periodic review of controlled documents stalls without owner accountability",
        short: "The reminder goes out again. The review still does not happen.",
        body: "The review owner is notified, the review does not happen, the next notification arrives. The document is overdue and in active use, and the audit finding is predictable.",
      },
    ],
    note: "Severity as rated in our field research with quality and document control teams, current as of the last review.",
    // qualitative by design: Notion carries no per-domain dollar figure
    tax: {
      label: "The recurring bill",
      value: "Site-by-site reconciliation under an audit clock.",
      meta: "Approval records rebuilt, distribution logs refreshed and every site's copies checked, because the document in use could not be tied to the one approved.",
      tail: "That scramble is the coordination tax.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: MDL-9 Document Control Processes Included + Completion Contracts;
   * JTBDs PWO-56 (authoring, review, approval routing) and PWO-68
   * (distribution, acknowledgement, obsolescence). Days are narrative. */
  flow: {
    heading: "Control the version where it is used.",
    lede: "Most document systems record the approval. Unifize carries the revision through review, sign-off, the effective date, the training it triggers and the copies it retires, so the version on the floor is the version on the record.",
    trailLabel: "How the revision moves",
    trail: [
      { t: "Revision drafted from the controlled template", who: "Document Author", when: "Day 0" },
      { t: "Review comments resolved on the record", who: "Department Reviewer", when: "Day 3" },
      { t: "Approved with e-signature", who: "QA Manager", when: "Day 6" },
      { t: "Effective · training assigned", who: "Document Controller", when: "Day 10" },
      { t: "Old version retired · copies retrieved", who: "Document Controller", when: "Day 11" },
    ],
    steps: [
      { title: "Draft the revision", body: "v3.2 of WI-0417 from the template, v3.1 beside it.", icon: "draft" },
      { title: "Resolve the review", body: "J. Park's torque comment answered in the thread, not a markup PDF.", icon: "comments" },
      { title: "Approve it", body: "N. Haddad re-authenticates. Every approval seals to the revision.", icon: "approve" },
      { title: "Make it effective", body: "The date is reached and three filling-line roles are assigned training.", icon: "publish" },
      { title: "Retire the old one", body: "v3.1 superseded, the printed copies retrieved and logged.", icon: "retire" },
    ],
    trailFoot: "The revision runs back to the change that raised it and forward into the training and copies it moves. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / documents / WI-0417",
    mobileLabel: "Document revision trace",
    mobileId: "WI-0417 · draft → review → approval → effective → retired",
    arcade: {
      steps: [
        {
          ...DOC_REC,
          source: "DR · WI-0417 · draft",
          ghost: "Draft",
          status: "Draft",
          actor: "You",
          event: "Drafted v3.2 from the controlled template",
          eventDetail: "Numbering and format applied · v3.1 stays effective until release",
          checklist: "DRAFT & REVIEW",
          checklistItems: ["Revision", "Department review", "Format and numbering"],
          focus: "diff",
          focusKicker: "REVISION",
          focusTitle: "v3.2 · draft",
          focusRows: ["Step 4 · torque 2.0 Nm · v3.1", "Step 4 · torque 2.4 Nm · v3.2 · reason attached", "Where used · 2 documents surfaced"],
          focusAction: "v3.1 → v3.2",
          ownershipNote: "One controlled version from the first draft",
          checklistOpen: "DRAFT & REVIEW",
          checklistProgress: { "DRAFT & REVIEW": 1, APPROVAL: 0, "EFFECTIVE & DISTRIBUTION": 0 },
        },
        {
          ...DOC_REC,
          source: "DR · WI-0417 · review",
          ghost: "Review",
          status: "In Review",
          actor: "automator",
          event: "J. Park's comment resolved on the revision",
          eventDetail: "Torque value confirmed against the fixture spec",
          checklist: "DRAFT & REVIEW",
          checklistItems: ["Revision", "Department review", "Format and numbering"],
          focus: "comment",
          focusRows: ["Step 4 · torque 2.4 Nm · resolved"],
          focusTitle: "Comment resolved",
          focusAction: "Open the comment",
          ownershipNote: "The review stays on the record",
          checklistOpen: "DRAFT & REVIEW",
          checklistProgress: { "DRAFT & REVIEW": 3, APPROVAL: 0, "EFFECTIVE & DISTRIBUTION": 0 },
        },
        {
          ...DOC_REC,
          source: "DR · WI-0417 · approve",
          ghost: "Approve",
          status: "Needs Approval",
          actor: "You",
          event: "Re-authenticated for regulated approval",
          eventDetail: "Signer, meaning and time seal to WI-0417 v3.2",
          checklist: "APPROVAL",
          checklistItems: ["Author", "Department reviewer", "QA Manager · Part 11"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "Identity re-verified · 21 CFR Part 11",
          world: DOC_APPROVER_WORLD,
          checklistOpen: "APPROVAL",
          checklistProgress: { APPROVAL: 2, "EFFECTIVE & DISTRIBUTION": 0 },
          signedItems: [
            { name: "A. Ruiz", initials: "AR", role: "Author", approvalId: "7B10A0417C22", time: "Day 3" },
            { name: "J. Park", initials: "JP", role: "Department reviewer", approvalId: "7B10A0417D35", time: "Day 4" },
          ],
        },
        {
          ...DOC_REC,
          source: "DR · WI-0417 · effective",
          ghost: "Effective",
          status: "Approved",
          actor: "automator",
          event: "v3.2 effective · training assigned",
          eventDetail: "Read-and-understand due before the next shift",
          checklist: "EFFECTIVE & DISTRIBUTION",
          checklistItems: ["Effective date", "Training assigned", "Controlled copies"],
          focus: "training",
          focusKicker: "TRAINING RECORD(S)",
          focusTitle: "Training assigned",
          focusRows: ["J. Park · Line lead", "M. Soto · Operator, shift A", "D. Wen · Operator, shift B"],
          focusAction: "WI-0417 v3.2",
          ownershipNote: "The revision reaches the people who use it",
          checklistOpen: "EFFECTIVE & DISTRIBUTION",
          checklistProgress: { "EFFECTIVE & DISTRIBUTION": 2 },
        },
        {
          ...DOC_REC,
          source: "DR · WI-0417 · retire",
          ghost: "Retire",
          status: "Effective",
          actor: "automator",
          event: "v3.1 superseded · controlled copies retrieved",
          eventDetail: "Workstation copies returned and logged · archive retained",
          checklist: "EFFECTIVE & DISTRIBUTION",
          checklistItems: ["Effective date", "Training assigned", "Controlled copies"],
          focus: "history",
          focusKicker: "DOCUMENT HISTORY",
          focusTitle: "One version in use",
          focusRows: ["WI-0417 v3.2 · Effective", "v3.1 · Superseded · copies retrieved", "Training · filling line · 3 of 3"],
          ownershipNote: "Reconstructable at audit",
          checklistOpen: "EFFECTIVE & DISTRIBUTION",
          signedItems: [
            { name: "N. Haddad", initials: "NH", role: "QA Manager", approvalId: "7B10A0417E48", time: "Day 6" },
          ],
          related: 2,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry
   * source: MDL-9 Industry-Specific Notes, one line per industry. */
  industries: {
    heading: "Document control, in your regulatory frame.",
    lede: "The same work, translated to the standards you are inspected against.",
    rows: [
      { name: "Medical devices", line: "Controlled distribution logs, DHF and DHR linkage.", chips: ["21 CFR 820", "ISO 13485"], href: "/industries/medical-devices" },
      { name: "Pharmaceuticals", line: "Master production and batch records, obsolete copies withdrawn at once.", chips: ["21 CFR 211", "ICH Q10"], href: "/industries/pharmaceuticals" },
      { name: "Automotive", line: "Customer-specific documents, changes that reopen PPAP.", chips: ["IATF 16949"], href: "/industries/automotive" },
      { name: "Aerospace", line: "Configuration management and export-controlled content.", chips: ["AS9100"], href: "/industries/aerospace" },
      { name: "Food processing", line: "HACCP plans, prerequisite programs and allergen labelling.", chips: ["FSSC 22000"], href: "/industries/food-processing" },
    ],
    foot: "Yours not listed? Documented information is controlled the same way under ISO 9001.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: MDL-9 Document Control (Primary Domain = this row), with MDL-11
   * Training Management and MDL-10 Change Control named by its Completion
   * Contracts; all three ship in the DMS product. */
  coverage: {
    heading: "One product runs the document work.",
    lede: "Document Control ships inside the Document Management System, next to the training and change control every revision touches.",
    standardFilters: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR Part 11", "EU GMP"],
    groups: [
      {
        slug: "dms",
        name: "Document Management System",
        tier: "Primary",
        promise: "One controlled version of every document, its approval, its training and where every copy went.",
        modules: [
          {
            name: "Document Control",
            blurb: "Authoring, review, approval, distribution and periodic review, with version history, watermarking by state and effective-date governance.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR Part 11", "EU GMP"],
            href: "/products/dms",
          },
          {
            name: "Training Management",
            blurb: "Retraining assigned by the revision itself, with read-and-understand acknowledgement before the document is used.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820"],
            href: "/products/dms",
          },
          {
            name: "Change Control",
            blurb: "The change behind a revision, approved before the document it rewrites can go effective.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820"],
            href: "/products/dms",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: MDL-9 Default Roles and Responsibility Model; PPS-2. */
  personas: {
    heading: "A document passes through many hands.",
    lede: "Each seat signs something. Find yours.",
    cards: [
      {
        key: "document-control",
        iconKey: "compliance-validation",
        name: "Document control",
        stake: "Owns the controlled copy",
        titles: ["Document Controller", "Document Control Manager", "Records Manager"],
        value: "Numbering, format, distribution and retrieval run on the record, so the register and the floor agree.",
        cares: "Version integrity · Distribution · Retrieval",
        worries: "Superseded copies in use · Overdue reviews · Audit reconstruction",
        primary: true,
      },
      {
        key: "quality-leadership",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Approves effective",
        titles: ["QA Manager", "Quality Manager", "Head of Quality"],
        value: "Approvals arrive with the review resolved and the training set up, and the periodic review backlog is visible before the auditor sees it.",
        cares: "Audit readiness · Review cycle time · Compliance rate",
        worries: "Document findings · Invisible approval queues",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "authors",
        iconKey: "engineering",
        name: "Authors and reviewers",
        stake: "Write and check the content",
        titles: ["Process Owner", "Engineer", "Department Head"],
        value: "Comments resolve in the thread, so nobody reconciles marked-up copies.",
        cares: "Technical accuracy · Turnaround",
        worries: "Review loops · Chasing approvers",
      },
      {
        key: "site",
        iconKey: "operations",
        name: "The site",
        stake: "Works to the document",
        titles: ["Production Supervisor", "Operator", "Line Lead"],
        value: "The version at point of use is the effective one, and the training arrives with it.",
        cares: "Clear instructions · Changeover readiness",
        worries: "Which version is current · Rework",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, the 3 rows linked. */
  triggers: {
    heading: "When the document becomes the finding.",
    lede: "Each of these starts a clock, and each routes into document control, so the response is assembled from the record instead of rebuilt by hand.",
    rows: [
      {
        name: "Audit finding on document control",
        clock: "Weeks · audit-response clock",
        severity: "High",
        routesTo: "Document Control",
        owner: "VP Quality · Document Control",
        viz: "findings",
        detail: ["Audit report · ISO 13485", "7.5|Records retention", "!4.2.4|Obsolete copy in use", "8.2|Internal audit schedule"],
      },
      {
        name: "Version mismatch at site discovered",
        clock: "Days · downstream records under review",
        severity: "High",
        routesTo: "Document Control · Training Management",
        owner: "Document Control · Quality · Manufacturing",
        viz: "affected",
        detail: ["WI-0417 v2.8", "Batch 24-118", "Batch 24-121", "Batch 24-126"],
      },
      {
        name: "Customer audit notification",
        clock: "Weeks · a fixed external date",
        severity: "High",
        routesTo: "Document Control",
        owner: "Quality · Customer Quality",
        viz: "agenda",
        detail: ["Customer audit · day 1", "09:00|Opening meeting", "!10:00|Document control walk-through", "13:00|Floor walk"],
      },
    ],
    featured: ["Audit finding on document control", "Version mismatch at site discovered", "Customer audit notification"],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: MD_COEXISTENCE canonical context (systems of record stay, Part 11
   * e-signature approval). The right-hand band names where documents leak:
   * shares, printouts, email. */
  coexistence: {
    heading: "It sits beside the systems you already run.",
    systemsOfRecord: ["ERP", "PLM", "MES", "LIMS"],
    body: "Controlled documents run on Unifize; the systems that hold your BoMs, batches and results keep them and link to the effective revision.",
    diagramCaption: "Unifize as the controlled document layer beside your ERP, PLM, MES and LIMS.",
    bands: {
      lede: "Keep the ERP, PLM, MES and LIMS that hold your products, batches and results. The controlled document runs on Unifize, linked to the records that use it, approved with a 21 CFR Part 11 signature.",
      note: "Already have a document system? Unifize runs the review, distribution and retrieval around it on the same layer.",
      tools: {
        title: "Shares and printouts",
        sub: "Stop being the record",
        names: ["SharePoint", "Drives", "Email", "Binders"],
        label: "Where the versions used to drift",
        body: "The working copy on the share, the PDF in the email and the laminated sheet at the workstation stop being where the current version lives.",
      },
      flows: { contextIn: "WHERE IT IS USED", back: "THE EFFECTIVE REVISION", captured: "COPIES RETRIEVED", linked: "ONE CURRENT VERSION" },
      back: "One controlled version per document, approved with a 21 CFR Part 11 signature and linked to every record that uses it.",
    },
  },

  /* ------------------------------------------------ 09 · proof */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, plus the teams who run their documents on Unifize, in their own words.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized.",
    },
    filmTags: ["Document Management", "Training", "Approval Workflows"],
    stills: [
      { wistia: "kwavngw95a", fact: "Document control on Unifize" }, /* Wilson Lin, Applechem */
      { wistia: "256shr0qzr", fact: "Documentation reviewed in half the time" }, /* Erica Bennerman */
      { wistia: "w1bp865sj1", fact: "Records moved from paper to the cloud" }, /* Dave Anderson */
      { wistia: "tevxf3n2h1", fact: "Why chat can't replace a collaborative eQMS" }, /* Natalie Jones */
      { wistia: "pyhr051l3i", fact: "$60,000 of material cost saved on one product" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "9l1ie4750r", fact: "A QMS managed actively, not filed away" }, /* Wilson Lin, Applechem */
      { wistia: "usfwtp9v9l", fact: "Scaling without a complex QMS" }, /* Denis Machoka */
    ],
    references: [
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/resources/testimonials" },
  },

  trust: null,
  caseKit: null,

  growth: {
    heading: "Control the document. Then what it moves.",
    lede: "Document control runs on the same governed record as the training and change every revision touches.",
    steps: [
      { name: "Document & records control", note: "You are here" },
      { name: "Change control", note: "Solution page", href: "/domains/change-control" },
      { name: "Training & competency", note: "Live · the DMS product", href: "/products/dms" },
      { name: "Quality", note: "Solution page", href: "/domains/quality" },
    ],
  },

  close: {
    eyebrow: "Document control on Unifize",
    heading: "One version. The one in use.",
    lede: "Bring one real document, an overdue review or a revision stuck in approval, and see it run on your own work in a 30-minute walkthrough.",
  },
};
