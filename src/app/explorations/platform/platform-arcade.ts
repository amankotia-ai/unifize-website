/* ----------------------------------------------------------------------------
 * platform-arcade.ts - the Platform page's stylized-arcade journey: one
 * cross-functional change control (CC-2148) followed end to end on the
 * persistent camera. Same staging recipe as the product pages (one app
 * window, one world, the camera moves between poses), but the story here is
 * the PLATFORM's, in the order Raj set on the 2 Sep 2026 sync (the demo
 * flow, so a visitor sees how the platform functions before anything else):
 * the home screen built for the signed-in persona, the inbox thread, the
 * checklist up close, the no-code process builder, the Part 11 seal, and
 * the dashboard the record rolls into. The approval-route pose stays
 * exported for the homepage's mechanism journey.
 * Fictional dataset shared with the product pages: Engineering Industries;
 * the change is raised from NC-204 (the QMS page's non-conformance), so the
 * universe stays one continuous story. Server module, no state.
 * -------------------------------------------------------------------------- */

import {
  type ArcadeFlowWorld,
  type ArcadeStepConfig,
} from "../products/_shared/arcade/arcade";

/* ============================================================ the world
 * CC-2148 as the whole company sees it: quality owns it, engineering and
 * production sit in the same thread, and the reports page reads straight off
 * the record. Checklist sections are the record's stable anatomy; steps only
 * open sections and advance completion. */
const CHANGE_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Change Control",
  owner: "D. Fontaine",
  ownerInitials: "DF",
  participants: ["DF", "SO", "+3"],
  participantsLabel: "D. Fontaine, S. Okafor, and three others",
  recordKicker: "CHANGE CONTROL",
  context: {
    initials: "SO",
    name: "S. Okafor",
    time: "09:12",
    message: "Torque spec change is ready for cross-functional review.",
    detail: "Drawing and risk assessment attached · raised from NC-204",
  },
  inboxNeighbors: [
    { title: "Coating thickness out of spec", time: "08:41", detail: "NC-204 · root cause confirmed", kind: "Quality event" },
    { title: "Cleaning validation", time: "Yesterday", detail: "SOP-118 · Rev D effective", kind: "Document" },
    { title: "Supplier corrective action", time: "Yesterday", detail: "SCAR-31 · closing", kind: "Quality event" },
  ],
  homeTiles: [
    { label: "Change controls", count: 5 },
    { label: "Pending approvals", count: 3 },
    { label: "My tasks", count: 4 },
  ],
  /* the process builder page (the "builder" pose): the change control's own
   * field list, the approval route configured where quality can see it */
  builder: {
    title: "Change control process",
    note: "The route every change walks, configured by quality, not coded by IT.",
    tabs: ["Checklist", "Privacy", "Reminders", "Layout", "Notifications"],
    fields: [
      { kind: "Linked field", tone: "linked", label: "Reason for change" },
      { kind: "Linked field", tone: "linked", label: "Affected documents" },
      { kind: "Text", tone: "text", label: "Impact assessment" },
      { kind: "Approval", tone: "approval", label: "Quality approval" },
      { kind: "Approval", tone: "approval", label: "Engineering approval" },
      { kind: "Revision", tone: "revision", label: "Revision" },
      { kind: "Linked field", tone: "linked", label: "Training assigned" },
    ],
    palette: [
      { label: "Approval", note: "Digital signatures on the record", tone: "approval" },
      { label: "Linked field", note: "Link to another process", tone: "linked" },
      { label: "Revision", note: "Managed revisions of the record", tone: "revision" },
      { label: "Generate PDF", note: "Printable render of the checklist", tone: "pdf" },
      { label: "Picklist", note: "Drop-down selection of items", tone: "picklist" },
      { label: "File upload", note: "Attach documents or images", tone: "upload" },
    ],
  },
  reports: {
    title: "Cross-functional work, measured",
    kpis: [
      { label: "Open threads", value: "24", note: "across 6 teams" },
      { label: "Median closure", value: "11d", note: "was 34d at baseline" },
      { label: "Time spent waiting", value: "9%", note: "of open time" },
      { label: "Evidence complete", value: "98%", note: "at sign-off" },
    ],
    panels: [
      { label: "Closure time, month by month", kind: "bars" },
      { label: "Where the time goes", kind: "donut" },
      { label: "Threads by state", kind: "lines" },
    ],
  },
  checklistTitle: "Change Control",
  checklistSections: [
    {
      title: "CHANGE & IMPACT",
      items: [
        { label: "Reason for change", note: "Raised from NC-204 · root cause linked" },
        { label: "Affected documents", note: "SOP-118 · DWG-2201" },
        {
          label: "Impact assessment",
          kind: "field", input: "rich",
          value: "No form or fit change. Torque spec only; risk low.",
          note: "Reviewed with S. Okafor",
        },
      ],
    },
    {
      title: "APPROVALS",
      items: [
        { label: "Quality approval", kind: "approval", signer: "D. Fontaine", state: "Signed" },
        { label: "Engineering approval", kind: "approval", signer: "S. Okafor", state: "Signed" },
        { label: "Production readiness", note: "Line 2 briefed" },
      ],
    },
    {
      title: "CLOSURE",
      items: [
        { label: "Revision", kind: "revision", from: "Rev C · superseded", to: "Rev D · approved" },
        { label: "Training assigned", note: "12 operators · due in 7 days" },
        { label: "Effectiveness check", note: "30-day review scheduled" },
      ],
    },
  ],
};

const RECORD = {
  type: "Change Control",
  id: "CC-2148",
  title: "Torque spec update · housing assembly",
} as const;

/* ============================================================ the poses
 * One record, one camera. Each pose is a claim the scene proves. Named so
 * other pages can borrow a pose without depending on this page's order. */

/* the home screen, whole: the queue the change lands in (the homepage's
 * "capture" claim borrows this pose as is) */
export const PLATFORM_QUEUE_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s1 · the queue",
  ghost: "Queue",
  ...RECORD,
  status: "Open",
  actor: "automator",
  event: "Raised the change control from NC-204",
  eventDetail: "Root cause, drawing, and risk assessment attached · nothing re-keyed",
  checklist: "CHANGE & IMPACT",
  checklistItems: ["Reason for change", "Affected documents"],
  focus: "queue",
  queueTile: "Change controls",
  focusTitle: "Change controls",
  focusRows: [
    "CC-2148 · Torque spec update · housing",
    "Context attached · raised from NC-204",
    "Owner assigned · D. Fontaine",
  ],
  focusAction: "Open record",
  ownershipNote: "Everything arrives with its context",
  world: CHANGE_WORLD,
  checklistProgress: { "CHANGE & IMPACT": 1, APPROVALS: 0, CLOSURE: 0 },
};

/* the same home screen, read as the persona's: the camera closes on the
 * welcome header and the first tile, then s2 opens the record. The
 * per-persona claim lives in the rail step's copy, not on the visual. */
export const PLATFORM_HOME_CONFIG: ArcadeStepConfig = {
  ...PLATFORM_QUEUE_CONFIG,
  source: "PLATFORM s1 · home, built for the role",
  ghost: "Home",
  poseVariant: "persona",
  ownershipNote: "Home shows the role's work, nothing else",
};

export const PLATFORM_THREAD_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s2 · the thread",
  ghost: "Thread",
  ...RECORD,
  status: "In Review",
  actor: "You",
  event: "Opened the change to cross-functional review",
  eventDetail: "Quality, engineering, and production in one thread · no forwarded chains",
  checklist: "CHANGE & IMPACT",
  checklistItems: ["Reason for change", "Affected documents"],
  focus: "record",
  focusTitle: "One accountable thread",
  focusRows: ["One owner · every function present", "Decisions and evidence stay attached"],
  focusAction: "Open live record",
  ownershipNote: "The record and the conversation are the same place",
  world: CHANGE_WORLD,
  checklistOpen: "CHANGE & IMPACT",
  checklistProgress: { "CHANGE & IMPACT": 2, APPROVALS: 0, CLOSURE: 0 },
};

export const PLATFORM_EVIDENCE_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s3 · evidence on the record",
  ghost: "Evidence",
  ...RECORD,
  status: "In Review",
  actor: "You",
  event: "Entering the impact assessment on the record",
  eventDetail: "Assessed against the linked drawing and risk file, not from memory",
  checklist: "CHANGE & IMPACT",
  checklistItems: ["Impact assessment"],
  focus: "checklist",
  focusTitle: "Data entry, on the record",
  focusRows: ["Drawing DWG-2201 · linked", "Risk assessment · attached"],
  focusAction: "Save assessment",
  ownershipNote: "Written where the next reader will look",
  world: CHANGE_WORLD,
  checklistOpen: "CHANGE & IMPACT",
  checklistEntry: { section: "CHANGE & IMPACT", item: "Impact assessment" },
  checklistProgress: { "CHANGE & IMPACT": 2, APPROVALS: 0, CLOSURE: 0 },
};

/* the process builder: where the route the seal just followed is configured.
 * Sits after the seal in the journey (Raj, 7 Sep 2026), so the record keeps
 * the Quality signature it collected there. Carries the route's facts (who
 * signs, in what order) so folding the old approval-matrix step into it
 * loses nothing. */
export const PLATFORM_BUILDER_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s5 · the process builder",
  ghost: "Build",
  ...RECORD,
  status: "In Review",
  actor: "You",
  event: "Configured the approval route in the process builder",
  eventDetail: "Fields, approval order, and reminders · no code, no ticket to IT",
  checklist: "APPROVALS",
  checklistItems: ["Quality approval", "Engineering approval"],
  focus: "builder",
  focusTitle: "Quality approval",
  focusRows: [
    "D. Fontaine · Quality · signs first",
    "S. Okafor · Engineering · then",
    "Reminder after 2 days · escalate after 5",
  ],
  focusAction: "Add field",
  ownershipNote: "The process is configured, not coded",
  world: CHANGE_WORLD,
  checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 1, CLOSURE: 0 },
};

/* approval in the open: the route as every approver sees it (the homepage's
 * "coordinate" claim and its change-order hero tab ride this pose) */
export const PLATFORM_ROUTE_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s4 · approval in the open",
  ghost: "Route",
  ...RECORD,
  status: "Needs Approval",
  actor: "automator",
  event: "Routed for approval in role order",
  eventDetail: "Every approver sees the same sequence and the same due date",
  checklist: "APPROVALS",
  checklistItems: ["Quality approval", "Engineering approval"],
  focus: "queue",
  poseVariant: "route",
  focusKicker: "APPROVAL MATRIX",
  focusTitle: "Approval, in the open",
  focusRows: [
    "D. Fontaine · Quality · signs first",
    "S. Okafor · Engineering · then",
    "M. Osei · Production · readiness",
  ],
  focusAction: "Request approvals",
  ownershipNote: "An order everyone can see, with a due date someone owns",
  world: CHANGE_WORLD,
  checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 0, CLOSURE: 0 },
};

export const PLATFORM_SEAL_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s4 · the seal",
  ghost: "Sign",
  ...RECORD,
  status: "Approved",
  actor: "You",
  event: "Approved with a Part 11 signature",
  eventDetail: "Identity verified · meaning attached · sealed on the record",
  checklist: "APPROVALS",
  checklistItems: ["Quality approval"],
  focus: "signature",
  focusTitle: "Sign this approval",
  focusRows: ["Approval · D. Fontaine · Quality"],
  focusAction: "Sign and approve",
  ownershipNote: "The signature carries its meaning",
  world: CHANGE_WORLD,
  signedItems: [
    { name: "D. Fontaine", initials: "DF", role: "Quality Manager", approvalId: "AP-0871", time: "16:02" },
  ],
  checklistOpen: "APPROVALS",
  checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 1, CLOSURE: 0 },
};

/* the dashboard the record rolls into: every number read straight off the
 * records, none of them reconstructed */
export const PLATFORM_DASHBOARD_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s6 · the dashboard",
  ghost: "Measure",
  ...RECORD,
  status: "Approved",
  actor: "automator",
  event: "Updated the closure metrics from the record",
  eventDetail: "Every thread is timed open to close · no export, no reconciliation",
  checklist: "CLOSURE",
  checklistItems: ["Effectiveness check"],
  focus: "dashboard",
  focusTitle: "Closure time, month by month",
  focusRows: ["Median closure · 11 days", "Baseline · 34 days", "Waiting share · 9%"],
  focusAction: "Open the threads behind this number",
  ownershipNote: "Measured on your work, against your baseline",
  world: CHANGE_WORLD,
  checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 3, CLOSURE: 1 },
};

/* ============================================================ the journey
 * Six screens in the demo order: home, inbox, checklist, seal, builder,
 * dashboard (seal before builder per Raj, 7 Sep 2026). Rendered by the
 * platform hero's PlatformJourney. */
export const PLATFORM_JOURNEY_CONFIGS: ArcadeStepConfig[] = [
  PLATFORM_HOME_CONFIG,
  PLATFORM_THREAD_CONFIG,
  PLATFORM_EVIDENCE_CONFIG,
  PLATFORM_SEAL_CONFIG,
  PLATFORM_BUILDER_CONFIG,
  PLATFORM_DASHBOARD_CONFIG,
];

/* ===================================================== the AI journey
 * Platform section 04, restaged 21 Sep 2026 from the product recording of
 * cross-record impact ("What else does this change affect? (Beta)", shared
 * 16 Sep) and re-cut 26 Sep 2026 to the product's own fields and message,
 * frame by frame. Same change, same universe. The recording's beats:
 *   ask     - under "Assess impacted documents" in the checklist, the
 *             button "What else does this change affect? (Beta)"
 *   suggest - the asker's message in the thread: "asked AI suggestion for
 *             Assess impacted documents", one row (AI impact summary) with
 *             the procedures the change puts at risk, "Add to Checklist"
 *             greyed until the box is ticked
 *   confirm - the box ticked, Add to Checklist pressed: the AI impact
 *             summary is written and the impacted procedures sit on the
 *             record as linked document records
 *   nudge   - approval requested, the assistant tags the approver
 *   trail   - what the record kept: the thread holds all of it */
const AI_SUGGESTED = [
  { id: "WI-092", title: "Line clearance, packaging · Rev B" },
  { id: "FRM-201", title: "Assembly torque check form · Rev A" },
];
const AI_SUMMARY = AI_SUGGESTED.map((row) => row.title.split(" · ")[0]);

const AI_WORLD: ArcadeFlowWorld = {
  ...CHANGE_WORLD,
  viewer: "D. Fontaine",
  viewerInitials: "DF",
  context: {
    initials: "SO",
    name: "S. Okafor",
    time: "09:12",
    message: "Uploaded DWG-2201 Rev D with the torque called out at 4.8 N·m.",
    detail: "Was 4.2 N·m on Rev C · drawing linked to this change",
  },
  checklistSections: [
    {
      title: "CHANGE & IMPACT",
      items: [
        {
          label: "Reason for change",
          kind: "field",
          input: "rich",
          value: "Housing fastener torque raised from 4.2 to 4.8 N·m. Raised from NC-204.",
        },
        {
          label: "Impact assessment",
          kind: "field",
          input: "rich",
          value: "No policy or system change. Line 2 operators need retraining.",
        },
        { label: "Affected documents", kind: "linked", links: ["SOP-118", "DWG-2201"] },
        { label: "Assess impacted documents", kind: "ask", value: "What else does this change affect?", note: "Beta" },
        { label: "AI impact summary", kind: "field", input: "rich" },
        { label: "Impacted document records", kind: "linked", links: [], placeholder: "+ Add Document" },
      ],
    },
    CHANGE_WORLD.checklistSections[1],
    CHANGE_WORLD.checklistSections[2],
  ],
};

/* the record once a person has added the suggestion: the summary written,
 * the impacted procedures linked as records */
const AI_WORLD_ADDED: ArcadeFlowWorld = {
  ...AI_WORLD,
  checklistSections: AI_WORLD.checklistSections.map((section) =>
    section.title === "CHANGE & IMPACT"
      ? {
          ...section,
          items: section.items.map((item) =>
            item.label === "AI impact summary"
              ? { ...item, value: AI_SUMMARY.map((line, i) => `${i + 1}.${line}`).join(" ") }
              : item.label === "Impacted document records"
                ? { ...item, links: AI_SUGGESTED.map((row) => row.id) }
                : item,
          ),
        }
      : section,
  ),
};

const AI_BASE = {
  ...RECORD,
  status: "In Review",
  checklist: "CHANGE & IMPACT",
  world: AI_WORLD,
  checklistOpen: "CHANGE & IMPACT",
} as const;

/* the asker's message, as it stays in the thread after the suggestion */
const AI_ASKED = {
  actor: "You" as const,
  name: "D. Fontaine",
  time: "15:48",
  message: "Asked AI suggestion for Assess impacted documents",
  detail: "AI impact summary · WI-092, FRM-201 added to the checklist",
};

/* ask: the button sits under "Assess impacted documents", at the stage
 * where impact gets assessed, after the reason and the impact answers */
export const PLATFORM_AI_ASK_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM AI s1 · the button in the checklist",
  ghost: "Ask",
  ...AI_BASE,
  actor: "You",
  event: "Answered the impact questions and linked the affected documents",
  eventDetail: "Reason for change and impact assessment on the record",
  checklistItems: ["Assess impacted documents"],
  focus: "checklist",
  poseVariant: "ask",
  focusTitle: "Assess impacted documents",
  focusRows: ["Reason for change", "Impact assessment"],
  ownershipNote: "Asked by a person, on the record",
  checklistAsk: { section: "CHANGE & IMPACT", item: "Assess impacted documents" },
  checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 0, CLOSURE: 0 },
};

/* suggest: the asker's message with the suggestion table, box unticked:
 * a proposal, nothing on the record yet */
export const PLATFORM_AI_SUGGEST_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM AI s2 · the suggestion in the thread",
  ghost: "Suggest",
  ...AI_BASE,
  actor: "You",
  event: "Asked AI suggestion for Assess impacted documents",
  eventDetail: "A suggestion · nothing lands until a person adds it",
  checklistItems: ["AI impact summary"],
  focus: "assist",
  poseVariant: "suggest",
  focusTitle: "AI impact summary",
  focusRows: AI_SUGGESTED.map((row) => `${row.id} · ${row.title}`),
  ownershipNote: "Suggested by AI",
  checklistProgress: { "CHANGE & IMPACT": 4, APPROVALS: 0, CLOSURE: 0 },
  assist: {
    field: "Assess impacted documents",
    rows: [{ label: "AI impact summary", list: AI_SUMMARY }],
  },
};

/* confirm: the box ticked and "Add to Checklist" pressed; the summary is
 * written and the impacted procedures land as linked document records */
export const PLATFORM_AI_CONFIRM_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM AI s3 · a person adds it",
  ghost: "Confirm",
  ...AI_BASE,
  /* the summary written; the impacted records land fresh this step */
  world: {
    ...AI_WORLD_ADDED,
    checklistSections: AI_WORLD_ADDED.checklistSections.map((section) => ({
      ...section,
      items: section.items.map((item) => (item.label === "Impacted document records" ? { ...item, links: [] } : item)),
    })),
  },
  actor: "You",
  event: "Asked AI suggestion for Assess impacted documents",
  eventDetail: "Ticked and added by D. Fontaine",
  checklistItems: ["Impacted document records"],
  focus: "assist",
  poseVariant: "linked",
  focusTitle: "AI impact summary",
  focusRows: AI_SUGGESTED.map((row) => `${row.id} · ${row.title}`),
  ownershipNote: "Suggested by AI, added by a person",
  checklistFilled: { section: "CHANGE & IMPACT", items: ["AI impact summary", "Impacted document records"] },
  checklistLinks: {
    section: "CHANGE & IMPACT",
    item: "Impacted document records",
    links: AI_SUGGESTED.map((row) => row.id),
    records: AI_SUGGESTED.map((row) => ({ id: row.id, title: row.title })),
  },
  checklistScroll: 150,
  checklistProgress: { "CHANGE & IMPACT": 6, APPROVALS: 0, CLOSURE: 0 },
  assist: {
    field: "Assess impacted documents",
    rows: [{ label: "AI impact summary", list: AI_SUMMARY, picked: true }],
    pressed: true,
  },
};

/* nudge: approval requested, and the assistant tags the approver on the
 * record. The owner never writes the chasing message. */
export const PLATFORM_AI_NUDGE_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM AI s4 · the assistant tags the approver",
  ghost: "Nudge",
  ...AI_BASE,
  world: AI_WORLD_ADDED,
  status: "Needs Approval",
  actor: "Unifize Assistant",
  event: "@S. Okafor this is ready for approval",
  eventDetail: "Posted when D. Fontaine requested approval",
  checklist: "APPROVALS",
  checklistItems: ["Engineering approval"],
  focus: "comment",
  focusTitle: "Approval requested",
  focusRows: ["Engineering approval · waiting on S. Okafor"],
  ownershipNote: "Nobody chased",
  history: [AI_ASKED],
  checklistOpen: "APPROVALS",
  checklistProgress: { "CHANGE & IMPACT": 6, APPROVALS: 1, CLOSURE: 0 },
};

/* trail: what the record kept of the AI step. Nothing extra is logged
 * for it: the thread holds who asked, the suggestion, and who added it,
 * next to the approval request, in order. */
export const PLATFORM_AI_TRAIL_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM AI s5 · the trail on the record",
  ghost: "Trail",
  ...AI_BASE,
  world: AI_WORLD_ADDED,
  status: "Needs Approval",
  actor: "You",
  event: "Opened the record history",
  eventDetail: "The suggestion, who asked, and who added it, in the thread",
  checklist: "CHANGE & IMPACT",
  checklistItems: ["Impacted document records"],
  focus: "history",
  focusKicker: "RECORD HISTORY",
  focusTitle: "In the thread, in order",
  focusRows: [
    "Unifize Assistant · @S. Okafor this is ready for approval · 16:04",
    "D. Fontaine · added AI impact summary, WI-092, FRM-201 · 16:02",
    "D. Fontaine · asked AI suggestion for Assess impacted documents · 15:48",
  ],
  ownershipNote: "Who asked, what was added, who approves",
  history: [AI_ASKED],
  checklistOpen: "CHANGE & IMPACT",
  checklistProgress: { "CHANGE & IMPACT": 6, APPROVALS: 1, CLOSURE: 0 },
};

/* the five moments, in the order the section tells them */
export const PLATFORM_AI_CONFIGS: ArcadeStepConfig[] = [
  PLATFORM_AI_ASK_CONFIG,
  PLATFORM_AI_SUGGEST_CONFIG,
  PLATFORM_AI_CONFIRM_CONFIG,
  PLATFORM_AI_NUDGE_CONFIG,
  PLATFORM_AI_TRAIL_CONFIG,
];
