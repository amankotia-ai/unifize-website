/* ============================================================================
 * Training & Competency: domain (Solutions) page data. All values trace to
 * Notion.
 *
 * source: Domains DB -> "Training and Competency"
 *   (31d860e6b45e812e9cd4f0615a9a6ca7, Domain 5, Tier Secondary). The hero
 *   framing and the leak thesis are the row's Description: training cascades
 *   triggered by change control, new procedures or audit findings need
 *   assignment tracking, completion evidence and re-qualification proof across
 *   sites, functions and partners; training records are FDA and ISO 13485
 *   audit targets; gaps accumulate on every change when completion lags the
 *   effective date; the workflow that creates a new SOP should create the
 *   training cascade, but does not. Named triggers: audit finding on training
 *   records, change-driven compliance gap. Internal fields (budget owner, play
 *   coverage) are used for understanding only, never published.
 * source: Themes DB, the 2 rows linked (PH0-113 Training and Competency
 *   Management, PH0-135 Competency Assessment and Role Qualification) ->
 *   section 01. PH0-113 is split into two clusters (training that follows the
 *   change; assignment and follow-through) along its own trigger list; items
 *   are the domain's 4 Customer JTBDs (PWO-82, PWO-58, PWO-69, PWO-75) plus the
 *   workstreams the Theme Descriptions name.
 * source: Pain Points DB -> section 02. The 4 rows linked to this domain are
 *   PNT-41 (High), PNT-42 (High), PNT-43 (Medium), PNT-44 (Low). PNT-44
 *   ("Training due-date alerts notify the wrong audience") is rated Low and
 *   the page's severity scale starts at Medium, so it is answered in the
 *   journey (assigned to the named trainee, supervisor copied) instead of
 *   listed. The fourth row shown is PP-35 "Late training cascade after change
 *   closure" (High): its Domain is Change Control, but MDL-11 Training
 *   Management lists it under Pain Points Addressed, both of this domain's
 *   training triggers (TE-10, TE-15) link it, and it IS the thesis of this
 *   domain's Description. Names verbatim; bodies condensed; Severity verbatim.
 * source: Trigger Events DB, the 3 rows linked (TE-10 Audit finding on
 *   training records, TE-15 Change-driven training cascade gap, TE-14 Version
 *   mismatch at site discovered) -> section 07. Clocks from Time Sensitivity +
 *   Description; frames from Regulatory Framework (21 CFR 820.25, ISO 13485
 *   6.2, 21 CFR 211.25).
 * source: Modules DB -> MDL-11 "Training Management" (Primary Domain = this
 *   row, Primary Product = DMS). Its Description (records, competency
 *   assignment, completion tracking, retraining triggered by document revision
 *   or audit finding, linked to controlled documents) and its Module Features
 *   drive the journey: MF-70 Retraining on Document Change (full or delta),
 *   MF-73 Read and Understood Acknowledgment, MF-72 On-The-Job Training
 *   Sign-Off by a qualified trainer, MF-71 Training Records with a competency
 *   matrix. NOTE: those feature rows are Status "Identified" in Notion; confirm
 *   they ship before this page goes live (no in-development mentions rule).
 * source: Website Customer Videos mirror -> the rails proof reel. Only three
 *   unused films are about training people (the rest tagged near it are about
 *   adopting Unifize itself), so the reel runs three, not seven.
 * The arcade record (SOP-231 Rev 4 -> 5, line clearance) and every cell
 *   artifact are illustrative furniture, never claims.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeChart, ArcadeFlowWorld, ArcadeStepConfig } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: the training record SOP-231 Rev 5 creates,
 * from the revision that triggers it to the qualified operator. */
const TRAIN_WORLD: ArcadeFlowWorld = {
  team: "Site Quality",
  recordNoun: "Training",
  owner: "L. Grant",
  ownerInitials: "LG",
  participants: ["LG", "RA", "+3"],
  participantsLabel: "L. Grant, R. Adeyemi, and three others",
  recordKicker: "TRAINING",
  context: {
    initials: "LG",
    name: "L. Grant",
    time: "07:40",
    message: "SOP-231 Rev 5 is effective Monday.",
    detail: "Line clearance, filling · retraining created from the revision",
  },
  inboxNeighbors: [
    { title: "New hire plan · P. Nair", time: "10:05", detail: "Week 2 · on-the-job sign-off due", kind: "Onboarding" },
    { title: "Retraining after DEV-0662", time: "09:30", detail: "Label check step · 4 operators", kind: "Retraining" },
    { title: "Annual GMP refresher", time: "Yesterday", detail: "Packaging · due this month", kind: "Refresher" },
  ],
  checklistTitle: "Training",
  checklistSections: [
    {
      title: "SCOPE",
      items: [
        { label: "Triggering revision", kind: "revision", from: "SOP-231 Rev 4", to: "Rev 5 · effective Monday" },
        { label: "Changed sections", note: "§3 line clearance checks" },
        { label: "Roles in scope", note: "Filling operators · line leads" },
      ],
    },
    {
      title: "ASSIGNMENT",
      items: [
        { label: "Assigned to named trainees", note: "3 operators" },
        { label: "Supervisors copied", note: "Shift leads A, B, C" },
        { label: "Read and understood", note: "Before first shift on Rev 5" },
      ],
    },
    {
      title: "COMPETENCY",
      items: [
        { label: "Demonstrated on the line", note: "Observed by a qualified trainer" },
        { label: "Trainer sign-off", kind: "approval", signer: "R. Adeyemi", state: "Signed" },
        { label: "Training matrix", note: "Updated from the record" },
      ],
    },
  ],
};

/* the same record as the qualified trainer sees it at sign-off */
const TRAINER_WORLD: ArcadeFlowWorld = { ...TRAIN_WORLD, viewer: "R. Adeyemi", viewerInitials: "RA" };

const TRAIN_REC = {
  type: "Training",
  id: "TR-2317",
  title: "Line clearance, filling · Rev 5",
  world: TRAIN_WORLD,
} as const;

/* ------------------------------------------------------------------------
 * The hero: training from the coordinator's seat, as the Sep 16 2026
 * recording shows it: "a question an auditor always asks is everyone
 * trained on the current version": the completion chart, the training
 * group's records by the accountable person, and the overdue one opened and
 * its trainee tagged. The 03 journey walks TR-2317 itself. */
const COMPLETION: ArcadeChart = {
  title: "Training completion % by group",
  unit: "Completion %",
  bars: [
    { label: "Line leads", values: [98] },
    { label: "QC lab", values: [95] },
    { label: "Packaging", values: [89] },
    { label: "Warehouse", values: [87] },
    { label: "Filling operators", values: [70] },
  ],
  max: 100,
  ticks: [0, 20, 40, 60, 80, 100],
};
const TRAINING_RECORDS = [
  { id: "#2317", title: "Line clearance, filling (SOP-231 Rev 5) - M. Osei", state: "Completed", tone: "done" as const, owner: "M. Osei", due: "25 Sep" },
  { id: "#2318", title: "Line clearance, filling (SOP-231 Rev 5) - P. Nair", state: "Pending", tone: "pending" as const, reminder: true, owner: "P. Nair", due: "22 Sep", late: true },
  { id: "#2319", title: "Line clearance, filling (SOP-231 Rev 5) - J. Silva", state: "Pending", tone: "pending" as const, reminder: true, owner: "J. Silva", due: "30 Sep" },
];
const GROUP_WORLD: ArcadeFlowWorld = {
  ...TRAIN_WORLD,
  recordNoun: "Training Group",
  viewer: "L. Grant",
  viewerInitials: "LG",
  recordKicker: "TRAINING GROUP",
  context: {
    initials: "A",
    name: "automator",
    time: "Sep 19",
    message: "Created the training records for SOP-231 Rev 5.",
    detail: "One per operator · reminders on until each is complete",
  },
  dashboards: {
    list: [
      { name: "1. [CXO] Non-Conformances and CARs", by: "S. Ferreira" },
      { name: "2. [CXO] Documents, Change and Training", by: "S. Ferreira" },
      { name: "4. [Quality Manager] Documents, Change and Training", by: "S. Ferreira" },
      { name: "6. [Shop Floor] Documents, Change and Training", by: "R. Adeyemi" },
      { name: "Training", by: "L. Grant" },
    ],
    active: "Training",
    by: "L. Grant",
    cards: [
      COMPLETION,
      {
        title: "Pending training by owner and status",
        series: [{ label: "Pending", tone: "teal" }],
        bars: [
          { label: "P. Nair", values: [4] },
          { label: "J. Silva", values: [3] },
          { label: "K. Otto", values: [2] },
          { label: "A. Lee", values: [1] },
        ],
        max: 5,
        ticks: [0, 1, 2, 3, 4, 5],
      },
      {
        title: "Upcoming training due by month",
        series: [
          { label: "Filling operators", tone: "indigo" },
          { label: "Packaging", tone: "teal" },
          { label: "QC lab", tone: "amber" },
        ],
        bars: [
          { label: "October", values: [4, 2, 1] },
          { label: "November", values: [2, 3, 0] },
          { label: "December", values: [1, 1, 2] },
          { label: "January", values: [0, 2, 1] },
        ],
        max: 8,
        ticks: [0, 2, 4, 6, 8],
      },
      {
        title: "Overdue Training by Owner",
        kind: "donut",
        slices: [
          { label: "P. Nair", value: 2, tone: "rose" },
          { label: "J. Silva", value: 1, tone: "amber" },
          { label: "K. Otto", value: 1, tone: "indigo" },
        ],
      },
    ],
  },
  checklistTitle: "Training Group",
  checklistSections: [
    { title: "GROUP DETAILS", items: [{ label: "Group", kind: "field", value: "Filling operators" }, { label: "Group owner", kind: "field", input: "user", value: "L. Grant" }] },
    { title: "EMPLOYEE(S)", items: [{ label: "Employees", note: "12 · filling line, three shifts" }] },
    { title: "DOCUMENT(S) TO BE TRAINED ON", items: [{ label: "Documents", kind: "linked", links: ["SOP-231 Rev 5"] }] },
    { title: "TRAINING RECORD(S)", items: [{ label: "Training record(s)", kind: "records", records: TRAINING_RECORDS }] },
  ],
};
const HERO_BASE = {
  type: "Training Group",
  id: "Filling operators",
  title: "Filling operators",
  world: GROUP_WORLD,
  status: "Pending",
  checklist: "TRAINING RECORD(S)",
  checklistItems: ["Training record(s)"] as string[],
  focusRows: ["#2318 · P. Nair · overdue"],
  ownershipNote: "The training coordinator's view",
};
const HERO: { label: string; caption: string; config: ArcadeStepConfig }[] = [
  {
    label: "Dashboard",
    caption: "Is everyone trained on the current version? Read it off one chart",
    config: {
      ...HERO_BASE,
      source: "Training dashboard · 16 Sep 2026 recording",
      ghost: "Dashboard",
      actor: "automator",
      event: "Training completion, by group",
      eventDetail: "Every bar opens the records behind it",
      focus: "dashboards",
      focusTitle: "Training",
      chartHover: { card: "Training completion % by group", bar: "Filling operators", lines: ["Completion %, Filling operators, 70"] },
    },
  },
  {
    label: "Group",
    caption: "The training group: every record by the person accountable for it",
    config: {
      ...HERO_BASE,
      source: "Training group records · 16 Sep 2026 recording",
      ghost: "Group",
      reminder: true,
      actor: "automator",
      event: "Created the training records for SOP-231 Rev 5",
      eventDetail: "One per operator · reminders on until each is complete",
      focus: "checklist",
      focusTitle: "Training record(s)",
      checklistOpen: "TRAINING RECORD(S)",
    },
  },
  {
    label: "Chase",
    caption: "Open the overdue record and tag the trainee, right there",
    config: {
      ...HERO_BASE,
      source: "Training record opened · 16 Sep 2026 recording",
      ghost: "Chase",
      reminder: true,
      actor: "You",
      event: "Tagged the trainee on the training record",
      eventDetail: "Opened from the training group",
      focus: "modal",
      focusTitle: "Training Record #2318",
      checklistOpen: "TRAINING RECORD(S)",
      modal: {
        over: "record",
        noun: "Training Record",
        id: "#2318",
        title: "Line clearance, filling (SOP-231 Rev 5)",
        state: "Pending",
        tone: "pending",
        reminder: true,
        owner: "P. Nair",
        participants: 3,
        due: "22 Sep",
        late: true,
        thread: [
          { kind: "date", text: "Sep 19" },
          { kind: "event", who: "automator", text: "started this conversation" },
          { kind: "updates", count: 5 },
          { kind: "date", text: "Today" },
          { kind: "message", who: "You", time: "09:12", mention: "P. Nair", text: "this training is mandatory and overdue by 4 days. Please complete at the earliest" },
        ],
        composer: { mention: "P. Nair", text: "Please complete your training" },
      },
    },
  },
];

export const TRAINING_AND_COMPETENCY_DATA: DomainPageData = {
  slug: "training-and-competency",
  name: "Training & Competency",
  tier: "Secondary",

  hero: {
    crumb: "Training & Competency",
    titleLead: "The SOP went live.",
    titleTurn: "The training didn't.",
    sub: "The workflow that releases a procedure should create the training that goes with it. It doesn't, so completion lags the effective date on every change. Unifize ties the training to the revision, the person and the proof they can do the work.",
    chips: ["Retraining on revision", "Assignment and tracking", "Read and understood", "On-the-job sign-off", "Competency matrix"],
    floats: [
      { kind: "seal", title: "Qualified on the record", meta: "SOP-231 Rev 5 · trainer sign-off" },
      { kind: "clock", title: "Training lags the effective date", meta: "Exposure compounds with every unit built" },
    ],
    // industries named on TE-10 / TE-15 with live pages
    runsIn: {
      label: "Runs wherever training records are inspected",
      links: [
        { name: "Medical devices", href: "/industries/medical-devices" },
        { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
        { name: "Automotive", href: "/industries/automotive" },
        { name: "Aerospace", href: "/industries/aerospace" },
        { name: "Laboratories", href: "/industries/laboratories" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside */
  work: {
    heading: "Every role qualified for the version it works to.",
    lede: "The training work quality and operations actually run, as governed workflows: created by the change, owned by a named trainee and supervisor, closed on proof of competence.",
    groups: [
      {
        glyph: "loop",
        name: "Training that follows the change",
        line: "A revised procedure, a deviation or an audit finding creates the training it implies.",
        runsIn: { label: "Runs in the DMS product →", href: "/products/dms" },
        viz: {
          kind: "delta",
          wash: "sky",
          cursor: { name: "L. Grant", tone: "#7c3aed" },
          doc: "SOP-231 · Line clearance",
          from: "Rev 4",
          to: "Rev 5",
          sections: [
            { name: "Scope and purpose" },
            { name: "Equipment" },
            { name: "Line clearance checks", changed: true },
            { name: "Records" },
          ],
          choice: "Retrain on the changed section only",
        },
        items: [
          { name: "Training needs from document and process changes", line: "Every revision and process change decides who needs retraining, and on what." },
          { name: "Retraining after a deviation or audit finding", line: "The finding closes on retrained people, not on a memo." },
        ],
      },
      {
        glyph: "pulse",
        name: "Assignment and follow-through",
        line: "Named trainees, their supervisors copied, and escalation before overdue training blocks the line.",
        viz: {
          kind: "onboard",
          wash: "warm",
          cursor: { name: "R. Adeyemi", tone: "#0f8f7e" },
          name: "P. Nair",
          role: "Filling operator · new hire",
          weeks: [
            { wk: "Wk 1", step: "GMP basics · read and understood", state: "done" },
            { wk: "Wk 2", step: "Line clearance · on-the-job", state: "now" },
            { wk: "Wk 3", step: "Filling set-up · on-the-job", state: "next" },
            { wk: "Wk 4", step: "Qualified to work alone", state: "next" },
          ],
        },
        items: [
          { name: "Assignment, completion tracking and escalation", line: "Due dates owned by the trainee and their supervisor, escalated before they slip." },
          { name: "New-hire and role-change plans", line: "A ramp written down, so it does not depend on who happens to be training." },
          { name: "Periodic refreshers", line: "Refresh cadences that assign themselves." },
        ],
      },
      {
        glyph: "scale",
        name: "Competency and qualification",
        line: "What each role must be able to do, who can do it, and the evidence behind it.",
        viz: {
          kind: "levels",
          wash: "blue",
          cursor: { name: "R. Adeyemi", tone: "#d97706" },
          name: "S. Kim",
          role: "Filling operator · shift B",
          skills: [
            { name: "Line clearance", level: 3, pending: "Rev 5 sign-off pending" },
            { name: "Filling set-up", level: 4 },
            { name: "In-process checks", level: 3 },
            { name: "Label reconciliation", level: 2 },
          ],
        },
        items: [
          { name: "Competency assessment and qualification records", line: "Each person's level per competency, with the demonstration behind it." },
          { name: "Role qualification matrix", line: "The matrix built from the records, not kept beside them." },
          { name: "Reassessment", line: "Reassessments triggered by the change, the finding or the calendar." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks */
  leaks: {
    heading: "The training happened. The record never heard.",
    lede: "The failure modes we see inside training and competency. None of them is a missing feature. All of them are training that happened off the record.",
    scene: {
      kicker: "Training attendance",
      chip: "Not in the matrix",
      title: "The sign-in sheet",
      rows: [
        { state: "done", label: "P. Nair", age: "Signed" },
        { state: "done", label: "S. Kim", age: "Signed" },
        { state: "idle", label: "E. Lind", age: "Absent", warn: true },
      ],
      float: { kicker: "Auditor · 09:05", note: "Show me your training matrix." },
      caption: "Signed in the classroom. Still not in the matrix.",
      /* the rails window: the classroom sheet (PNT-41 + PNT-42, staged) */
      signin: {
        title: "Training attendance",
        doc: "SOP-231 Rev 5",
        date: "Thu, shift A",
        rows: [
          { name: "P. Nair", signed: true },
          { name: "S. Kim", signed: true },
          { name: "E. Lind", signed: false },
          { name: "J. Ortiz", signed: true },
        ],
        foot: "To be entered into the training matrix",
      },
    },
    pains: [
      {
        severity: "High",
        surface: "The training queue",
        name: "Late training cascade after change closure",
        short: "The procedure goes live. The training catches up weeks later.",
        body: "Closure includes a training cascade: who needs retraining, by when. The assignment goes out late, the deadline slips, and people work to the new version for weeks without verified training.",
      },
      {
        severity: "High",
        surface: "Audit day",
        name: "Training matrix is the first audit pull and the last system updated",
        short: "No daily work depends on it, so it is never current.",
        body: "External auditors open with 'show me your training matrix'. No daily workflow depends on it being current, so it is among the last things maintained, and the mismatch produces findings every cycle.",
      },
      {
        severity: "High",
        surface: "The shop floor",
        name: "Training completion ticks the box without competency evidence",
        short: "The record says trained. The floor says it depends.",
        body: "An operator reads a deck and signs an acknowledgement. The system records completion. Whether they can actually perform the task is not on the record.",
      },
      {
        severity: "Medium",
        surface: "Tribal knowledge",
        name: "New hire ramp is a tribal-knowledge process",
        short: "When the trainer is out, the new hire stalls.",
        body: "A new hire shadows, picks up the rhythm by watching and gradually takes on work. When the trainer is out, progress stalls; when the trainer leaves, the next hire learns differently.",
      },
    ],
    note: "Severity as rated in our field research with quality and training teams, current as of the last review.",
    // qualitative by design, from TE-10's remediation language
    tax: {
      label: "The recurring bill",
      value: "Every effective date reconciled against every training record, by hand.",
      meta: "An audit finding on training starts an enterprise-wide reconciliation between procedure dates and verified completion, with a remediation plan due on the audit clock.",
      tail: "That reconciliation is the coordination tax.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: MDL-11 Description + Module Features MF-70, MF-73, MF-72, MF-71;
   * JTBDs PWO-82 (needs from document changes), PWO-69 (assignment, tracking,
   * escalation), PWO-75 (competency records). Days are narrative. */
  flow: {
    heading: "Train on the change, before the change goes live.",
    lede: "Most training systems record a completion. Unifize creates the training from the revision, owns it with the named person and their supervisor, and closes it on a qualified trainer's sign-off, so the matrix is current because the work made it current.",
    trailLabel: "How the training moves",
    trail: [
      { t: "Retraining created from the revision", who: "Training Coordinator", when: "Day 0" },
      { t: "Assigned to named trainees, supervisors copied", who: "Training Coordinator", when: "Day 0" },
      { t: "Read and understood before the first shift", who: "Operators", when: "Day 2" },
      { t: "Demonstrated on the line, trainer signs", who: "Qualified Trainer", when: "Day 4" },
      { t: "Matrix current · qualification sealed", who: "Quality", when: "Day 4" },
    ],
    steps: [
      { title: "Create it from the change", body: "Rev 5 changed section 3. The retraining covers only that.", icon: "cascade" },
      { title: "Assign it to people", body: "Three named operators, each with their shift lead copied.", icon: "assign" },
      { title: "Read and understood", body: "Acknowledged on the record before the first shift on Rev 5.", icon: "ack" },
      { title: "Prove it on the line", body: "R. Adeyemi observes the clearance and signs as qualified trainer.", icon: "observe" },
      { title: "The matrix, current", body: "Updated by the record itself, before anyone asks for it.", icon: "matrix" },
    ],
    trailFoot: "The training runs back to the revision that created it and forward into the matrix an auditor pulls first. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / training / TR-2317",
    mobileLabel: "Training trace",
    mobileId: "TR-2317 · revision → assigned → acknowledged → demonstrated → qualified",
    arcade: {
      steps: [
        {
          ...TRAIN_REC,
          source: "TC · TR-2317 · create",
          ghost: "Create",
          status: "Open",
          actor: "automator",
          event: "Created retraining from SOP-231 Rev 5",
          eventDetail: "Changed sections compared · roles in scope pulled from the matrix",
          checklist: "SCOPE",
          checklistItems: ["Triggering revision", "Changed sections", "Roles in scope"],
          focus: "trace",
          focusTitle: "Retraining scoped from the revision",
          focusRows: ["Changed · §3 line clearance checks", "Delta retraining · §3 only", "3 operators in scope"],
          focusAction: "Open the revision",
          ownershipNote: "Created by the change, not remembered",
          checklistOpen: "SCOPE",
          checklistProgress: { SCOPE: 3, ASSIGNMENT: 0, COMPETENCY: 0 },
          related: 2,
        },
        {
          ...TRAIN_REC,
          source: "TC · TR-2317 · assign",
          ghost: "Assign",
          status: "Open",
          actor: "automator",
          event: "Assigned to three named trainees",
          eventDetail: "Due before the first shift on Rev 5 · shift leads copied",
          checklist: "ASSIGNMENT",
          checklistItems: ["Assigned to named trainees", "Supervisors copied", "Read and understood"],
          focus: "training",
          focusKicker: "TRAINING RECORD(S)",
          focusTitle: "Assigned",
          focusRows: ["P. Nair · Operator, shift A", "S. Kim · Operator, shift B", "E. Lind · Operator, shift C"],
          focusAction: "SOP-231 Rev 5 · §3",
          ownershipNote: "Owned by a person, not a distribution list",
          checklistOpen: "ASSIGNMENT",
          checklistProgress: { ASSIGNMENT: 2, COMPETENCY: 0 },
        },
        {
          ...TRAIN_REC,
          source: "TC · TR-2317 · acknowledge",
          ghost: "Acknowledge",
          status: "Open",
          actor: "Unifize Assistant",
          event: "Read and understood, before the first shift",
          eventDetail: "Two acknowledged · one reminder sent to E. Lind and shift lead C",
          checklist: "ASSIGNMENT",
          checklistItems: ["Assigned to named trainees", "Supervisors copied", "Read and understood"],
          focus: "review",
          focusTitle: "Read and understood",
          focusRows: ["P. Nair · Acknowledged", "S. Kim · Acknowledged", "E. Lind · Reminder sent"],
          focusAction: "Acknowledge",
          ownershipNote: "The reminder goes to the person and their lead",
          checklistOpen: "ASSIGNMENT",
          checklistProgress: { ASSIGNMENT: 3, COMPETENCY: 0 },
        },
        {
          ...TRAIN_REC,
          source: "TC · TR-2317 · demonstrate",
          ghost: "Demonstrate",
          status: "Needs Approval",
          actor: "You",
          event: "Observed on line 3 · signing as qualified trainer",
          eventDetail: "Signer, meaning and time seal to TR-2317",
          checklist: "COMPETENCY",
          checklistItems: ["Demonstrated on the line", "Trainer sign-off", "Training matrix"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "Competence, not just completion",
          world: TRAINER_WORLD,
          checklistOpen: "COMPETENCY",
          checklistProgress: { COMPETENCY: 1 },
        },
        {
          ...TRAIN_REC,
          source: "TC · TR-2317 · qualified",
          ghost: "Qualified",
          status: "Completed",
          actor: "automator",
          event: "Qualification sealed · matrix updated",
          eventDetail: "Filling operators qualified on SOP-231 Rev 5",
          checklist: "COMPETENCY",
          checklistItems: ["Demonstrated on the line", "Trainer sign-off", "Training matrix"],
          focus: "history",
          focusKicker: "TRAINING HISTORY",
          focusTitle: "Qualified on the current version",
          focusRows: ["SOP-231 Rev 5 · 3 of 3 qualified", "Observed on line 3 · R. Adeyemi", "Matrix current before the audit pull"],
          ownershipNote: "Reconstructable at audit",
          checklistOpen: "COMPETENCY",
          signedItems: [
            { name: "R. Adeyemi", initials: "RA", role: "Qualified trainer", approvalId: "3C71T2317A08", time: "Day 4" },
          ],
          related: 2,
        },
      ],
      hero: HERO,
    },
  },

  /* ------------------------------------------------ 04 · for your industry
   * source: TE-10 / TE-15 Regulatory Framework and Industries relations. */
  industries: {
    heading: "Training and competency, in your regulatory frame.",
    lede: "The same work, translated to the standards you are inspected against.",
    rows: [
      { name: "Medical devices", line: "Personnel competence and training records an inspector pulls first.", chips: ["21 CFR 820.25", "ISO 13485 6.2"], href: "/industries/medical-devices" },
      { name: "Pharmaceuticals", line: "GMP training for every person in manufacture, current to the procedure.", chips: ["21 CFR 211.25"], href: "/industries/pharmaceuticals" },
      { name: "Automotive", line: "Competence and on-the-job training for work affecting quality.", chips: ["IATF 16949"], href: "/industries/automotive" },
      { name: "Aerospace", line: "Competence and awareness, evidenced per person.", chips: ["AS9100"], href: "/industries/aerospace" },
      { name: "Laboratories", line: "Analyst competence authorised per method.", chips: ["ISO/IEC 17025"], href: "/industries/laboratories" },
    ],
    foot: "Yours not listed? Competence is controlled the same way under ISO 9001.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: MDL-11 Training Management (Primary Domain = this row) with MDL-9
   * Document Control, whose revisions it links to (MDL-11 Description); both
   * in DMS. */
  coverage: {
    heading: "One product runs the training work.",
    lede: "Training Management ships inside the Document Management System, linked to the controlled documents whose revisions create the training.",
    standardFilters: ["ISO 9001", "ISO 13485", "21 CFR 820"],
    groups: [
      {
        slug: "dms",
        name: "Document Management System",
        tier: "Primary",
        promise: "Training created by the revision, owned by the person, closed on proof of competence.",
        modules: [
          {
            name: "Training Management",
            blurb: "Training records, competency assignment, completion tracking, and retraining triggered by document revision or audit finding.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820"],
            href: "/products/dms",
          },
          {
            name: "Document Control",
            blurb: "The controlled documents whose revisions cascade into training obligations.",
            standards: ["ISO 9001", "ISO 13485", "21 CFR 820", "21 CFR Part 11"],
            href: "/products/dms",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role
   * source: the Theme Descriptions' role lists; PPS-2. */
  personas: {
    heading: "Training runs through every seat.",
    lede: "Find yours.",
    cards: [
      {
        key: "training",
        iconKey: "compliance-validation",
        name: "Training coordination",
        stake: "Owns the matrix",
        titles: ["Training Coordinator", "Head of Training", "L&D Manager"],
        value: "Training is created by the change and closed by the trainer, so the matrix is current without chasing.",
        cares: "Completion · Matrix accuracy · Audit evidence",
        worries: "Overdue training · Spreadsheet matrices",
        primary: true,
      },
      {
        key: "quality-leadership",
        iconKey: "quality",
        name: "Quality leadership",
        stake: "Answers the auditor",
        titles: ["VP Quality", "Quality Manager", "QA Manager"],
        value: "Training records are tied to the effective revision, so the audit pull is a report, not a reconciliation.",
        cares: "Audit readiness · Change compliance",
        worries: "Training findings · Untrained operators on new procedures",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "supervisors",
        iconKey: "operations",
        name: "Supervisors and trainers",
        stake: "Sign off competence",
        titles: ["Production Supervisor", "Line Lead", "Qualified Trainer"],
        value: "Due dates arrive with the supervisor copied, and on-the-job sign-off is one step on the record.",
        cares: "Who can run the line · Ramp time",
        worries: "Blocked shifts · Tribal knowledge",
      },
      {
        key: "hr",
        iconKey: "engineering",
        name: "HR and department heads",
        stake: "Define the roles",
        titles: ["HR Manager", "Department Head"],
        value: "Role requirements and qualification levels live next to the training that proves them.",
        cares: "Role definitions · Onboarding",
        worries: "Role changes nobody retrained",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, the 3 rows linked. */
  triggers: {
    heading: "When training becomes the finding.",
    lede: "Each of these starts a clock, and each routes into training management, so the answer comes from the record instead of a reconciliation.",
    rows: [
      {
        name: "Audit finding on training records",
        clock: "Weeks · audit-response clock",
        severity: "High",
        routesTo: "Training Management",
        owner: "VP Quality · Training",
        viz: "lag",
        detail: ["SOP-231|02 Jun|100%|0 d", "!WI-0417|16 Jun|40%|+34 d", "SOP-118|30 Jun|75%|+12 d"],
      },
      {
        name: "Change-driven training cascade gap",
        clock: "Days · exposure compounds with every unit built",
        severity: "High",
        routesTo: "Training Management · Change Control",
        owner: "Training · Quality · Operations",
        viz: "shifts",
        detail: ["SOP-231 Rev 5", "A|P. Nair|120|", "B|S. Kim|96|!", "C|E. Lind|104|!"],
      },
      {
        name: "Version mismatch at site discovered",
        clock: "Days · retraining where required",
        severity: "High",
        routesTo: "Training Management · Document Control",
        owner: "Training · Document Control · Manufacturing",
        viz: "cert",
        detail: ["J. Ortiz", "Filling operator · shift A", "WI-0417 v2.8", "v3.2"],
      },
    ],
    featured: ["Audit finding on training records", "Change-driven training cascade gap", "Version mismatch at site discovered"],
  },

  /* ------------------------------------------------ 08 · coexistence */
  coexistence: {
    heading: "It sits beside the systems you already run.",
    systemsOfRecord: ["HRIS", "LMS", "ERP", "MES"],
    body: "Your HR system keeps people and roles, your LMS can keep its courses; the training a procedure change creates runs on Unifize, tied to the revision.",
    diagramCaption: "Unifize as the training layer tied to controlled documents, beside your HRIS, LMS, ERP and MES.",
    bands: {
      lede: "Keep the HR system that holds people and roles, and the learning system that holds courses. The training a revision creates runs on Unifize, tied to the controlled document, signed off with a 21 CFR Part 11 signature.",
      note: "No training system yet? Training Management ships in the Document Management System above.",
      tools: {
        title: "Sheets and sign-in forms",
        sub: "Stop being the record",
        names: ["Sheets", "Email", "Binders", "Meetings"],
        label: "Where training used to go unrecorded",
        body: "The matrix spreadsheet, the reminder to a distribution list and the classroom sign-in sheet stop being where competence lives.",
      },
      back: "One training record per revision and person, closed on a qualified trainer's signature, with the matrix built from it.",
    },
  },

  /* ------------------------------------------------ 09 · proof */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, plus the teams who run their training on Unifize, in their own words.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized.",
    },
    filmTags: ["Training"],
    stills: [
      { wistia: "7sk4uqb9d3", fact: "Training time and costs reduced" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "i43nixcmyj", fact: "What drew Will-Burt to Unifize" }, /* Tedd Carr, The Will-Burt Company */
      { wistia: "ishf3ekzxe", fact: "A shop floor that ran on institutional knowledge" }, /* Dave Anderson */
    ],
    references: [
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/resources/testimonials" },
  },

  trust: null,
  caseKit: null,

  growth: {
    heading: "Train on the change. Then control the change.",
    lede: "Training runs on the same governed record as the documents and changes that create it.",
    steps: [
      { name: "Training & competency", note: "You are here" },
      { name: "Document & records control", note: "Solution page", href: "/solution/document-and-records-control" },
      { name: "Change control", note: "Solution page", href: "/solution/change-control" },
      { name: "Quality", note: "Solution page", href: "/solution/quality" },
    ],
  },

  close: {
    eyebrow: "Training on Unifize",
    heading: "Trained on the version in use.",
    lede: "Bring one real procedure change and its training cascade, and see it run on your own work in a 30-minute walkthrough.",
  },
};
