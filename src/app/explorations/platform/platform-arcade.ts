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
          kind: "field",
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

/* the process builder: where the route the seal will follow is configured.
 * Carries the route's facts (who signs, in what order) so folding the old
 * approval-matrix step into it loses nothing. */
export const PLATFORM_BUILDER_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s4 · the process builder",
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
  checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 0, CLOSURE: 0 },
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
  eventDetail: "Every approver sees the same sequence and the same clock",
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
  ownershipNote: "An order everyone can see, on a clock someone owns",
  world: CHANGE_WORLD,
  checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 0, CLOSURE: 0 },
};

export const PLATFORM_SEAL_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM s5 · the seal",
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
  eventDetail: "Every thread carries its own clock · no export, no reconciliation",
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
 * Six screens in the demo order: home, inbox, checklist, builder, seal,
 * dashboard. Rendered by the platform hero's PlatformJourney. */
export const PLATFORM_JOURNEY_CONFIGS: ArcadeStepConfig[] = [
  PLATFORM_HOME_CONFIG,
  PLATFORM_THREAD_CONFIG,
  PLATFORM_EVIDENCE_CONFIG,
  PLATFORM_BUILDER_CONFIG,
  PLATFORM_SEAL_CONFIG,
  PLATFORM_DASHBOARD_CONFIG,
];
