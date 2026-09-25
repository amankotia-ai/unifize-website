/* ----------------------------------------------------------------------------
 * qm-arcade.tsx - the Quality Manager page's product window poses.
 *
 * Two of PPS-2's own Product Flows, each staged as one continuous record:
 * every pose carries the thread as it stands by then (thread.ts), so a step
 * always follows from the screen before it.
 *
 * Hero, PF-8 "Quality Manager approves a disposition on the Non-conformance
 * Module": the QM's home screen, then NC-204's evidence, the Part 11
 * signature, and the handoff to production. It is the other side of the QMS
 * page's PF-7: J. Rivera submits NC-204's disposition there and the Unifize
 * Assistant tags D. Fontaine, the Quality Manager; here D. Fontaine picks it
 * up. Same fictional dataset as qms-arcade.tsx (NC-204, lot 118-B,
 * concession CON-88, CAPA-612, SOP-214, AUD-12), so the pages tell one story.
 *
 * Section 03, PF-2 "Quality Manager runs an annual ISO 13485 audit": the
 * QMS page's AUD-12 poses, opened on the same home screen and threaded from
 * the schedule notification to the sign-off.
 * Server module, no state.
 * -------------------------------------------------------------------------- */
import type { ArcadeFlowWorld, ArcadeStepConfig } from "../../products/_shared/arcade/arcade";
import type { PersonaHeroStep } from "../_shared/types";
import { threadFlow } from "../_shared/thread";
import {
  AUDIT_WORLD,
  NC_DISPO_WORLD,
  QM_CAPA_MODAL,
  QM_FINDINGS_REPORT,
  QMS_ARCADE_FLOW_CONFIGS,
} from "../../products/qms/qms-arcade";

/* ================================================= the QM's home screen
 * One home for the seat, on both flows: the approvals waiting on it, the
 * quality events and audits it answers for, and, in the overview, the two
 * things the page's 02 says slip: effectiveness checks and training. */
const QM_HOME_TILES: NonNullable<ArcadeFlowWorld["homeTiles"]> = [
  { label: "Pending approvals", count: 4, rows: ["NC-204 · disposition · rework lot 118-B", "CAPA-612 · effectiveness sign-off"] },
  { label: "Quality events", count: 6, rows: ["NC-211 · burr on housing edge · line 1", "DEV-31 · oven temperature excursion"] },
  { label: "My audits", count: 2, rows: ["AUD-12 · annual ISO 13485 · in two weeks", "AUD-14 · seal supplier · October"] },
];

const QM_HOME_SIDE: NonNullable<ArcadeFlowWorld["homeSide"]> = [
  {
    title: "Effectiveness checks due",
    kind: "rows",
    tone: "rose",
    rows: ["CAPA-612 · window closes in 12 days", "CAPA-590 · 3 days overdue"],
    action: "Review",
  },
  { title: "Training overdue", kind: "rows", rows: ["WI-31 · 4 operators · line 2", "SOP-118 rev D · 2 technicians"] },
];

/* ================================================== hero · PF-8, NC-204
 * NC-204 at disposition, logged in as the Quality Manager. The thread opens
 * on S. Okafor's concession (the world's context, 09:26), as on the QMS
 * page; the Assistant's request, the review and the signature follow. */
const QM_DISPO_WORLD: ArcadeFlowWorld = {
  ...NC_DISPO_WORLD,
  viewer: "D. Fontaine",
  viewerInitials: "DF",
  homeTiles: QM_HOME_TILES,
  homeSide: QM_HOME_SIDE,
  inboxNeighbors: [
    { title: "Corrective action", time: "10:44", detail: "CAPA-612 · effectiveness sign-off", kind: "Quality event" },
    { title: "Periodic review", time: "Yesterday", detail: "SOP-214 · due Friday", kind: "Review" },
    { title: "Internal audit", time: "Monday", detail: "AUD-12 · ISO 13485", kind: "Audit" },
  ],
};

const NC204 = {
  type: "Non-conformance",
  id: "#204",
  title: "Coating thickness out of spec",
  world: QM_DISPO_WORLD,
};

/* one pose per PF-8 Flow Step, in step order */
const PF8: ArcadeStepConfig[] = [
  {
    ...NC204,
    source: "PF-8 s1 · the request waits on the home screen",
    ghost: "Queue",
    status: "Needs Approval",
    /* PF-7 s4 on the QMS page: posted when J. Rivera requested approval */
    actor: "Unifize Assistant",
    event: "@D. Fontaine the disposition is ready. Need your approval to proceed.",
    eventDetail: "Posted when J. Rivera requested approval · recommendation, evidence and concession CON-88 on the record",
    checklist: "DISPOSITION DECISION",
    checklistItems: ["Recommendation"],
    focus: "queue",
    queueTile: "Pending approvals",
    focusTitle: "Pending approvals",
    focusRows: [
      "NC-204 · disposition · rework lot 118-B",
      "CAPA-612 · effectiveness sign-off",
      "SOP-214 · revision C approval",
    ],
    focusAction: "Open NC-204",
    ownershipNote: "Triage from the notification itself",
    checklistProgress: { "DISPOSITION DECISION": 3, "ENGINEERING CONCESSION": 3, EXECUTION: 0 },
  },
  {
    ...NC204,
    source: "PF-8 s2 · evidence reviewed in context",
    ghost: "Review",
    status: "Needs Approval",
    actor: "You",
    event: "Reviewed the evidence behind the recommendation",
    eventDetail: "Root cause, severity, photos and readings on the record, the concession beside them",
    checklist: "DISPOSITION DECISION",
    checklistItems: ["Recommendation", "Justification"],
    focus: "review",
    focusTitle: "Before you sign",
    focusRows: [
      "Recommendation · rework lot 118-B to spec",
      "Evidence · 4 photos · 3 readings",
      "Concession CON-88 · granted by S. Okafor",
    ],
    focusAction: "Approve",
    focusAlts: ["Route back with comments"],
    ownershipNote: "Every input to the decision, in one place",
    checklistOpen: "DISPOSITION DECISION",
    checklistProgress: { "DISPOSITION DECISION": 3, "ENGINEERING CONCESSION": 3, EXECUTION: 0 },
  },
  {
    ...NC204,
    source: "PF-8 s3 · regulated signature, or routed back",
    ghost: "Sign",
    status: "Needs Approval",
    actor: "You",
    event: "Approved the disposition under Part 11",
    eventDetail: "Rework to spec, re-inspect 100% before release",
    checklist: "DISPOSITION DECISION",
    checklistItems: ["Recommendation"],
    focus: "signature",
    focusTitle: "Approve the disposition",
    focusRows: ["NC-204 · rework lot 118-B to spec", "Re-inspect 100% before release"],
    focusAction: "Apply your signature",
    ownershipNote: "Or route it back with your comments",
    checklistProgress: { "DISPOSITION DECISION": 3, "ENGINEERING CONCESSION": 3, EXECUTION: 0 },
  },
  {
    ...NC204,
    source: "PF-8 s4 · the record advances, stakeholders told",
    ghost: "Cascade",
    status: "Approved",
    actor: "automator",
    event: "Routed the disposition instruction to production",
    eventDetail: "Record link attached · J. Rivera and line 2 notified, no relay by email",
    checklist: "EXECUTION",
    checklistItems: ["Production instruction"],
    focus: "record",
    poseVariant: "handoff",
    focusTitle: "Approved and moving",
    focusRows: ["Instruction · rework lot 118-B to spec", "Line 2 notified with the record attached"],
    focusAction: "Watch the handoff confirm",
    ownershipNote: "Nothing left for you to chase",
    signedItems: [
      { name: "D. Fontaine", initials: "DF", role: "Quality Manager", approvalId: "NC-204-D1", time: "14:05" },
    ],
    checklistOpen: "EXECUTION",
    checklistProgress: { "DISPOSITION DECISION": 3, "ENGINEERING CONCESSION": 3, EXECUTION: 1 },
  },
];

/* the thread along PF-8: the request at 13:52, the review at 14:02, the
 * signature sealed at 14:05 (its card), then the handoff */
const PF8_THREADED = threadFlow([
  { config: PF8[0], time: "13:52" },
  { config: PF8[1], time: "14:02" },
  { config: PF8[2], time: "14:05" },
  { config: PF8[3], time: "14:05" },
]);

/* the hero: each PF-8 step as a tab over the window, the home screen first */
export const QM_HERO_STEPS: PersonaHeroStep[] = [
  { label: "Your queue", icon: "ledger", config: PF8_THREADED[0] },
  { label: "The evidence", icon: "dms", config: PF8_THREADED[1] },
  { label: "Your signature", icon: "blog", config: PF8_THREADED[2] },
  { label: "Moves to production", icon: "mes", config: PF8_THREADED[3] },
];

/* ============================================== 03 · PF-2, the AUD-12 audit
 * The QMS page's audit world, logged in as the same QM with the same home
 * screen. The thread opens where the flow does, on the schedule
 * notification two weeks out; L. Navarro's drafted checklist follows it. */
const QM_AUDIT_WORLD: ArcadeFlowWorld = {
  ...AUDIT_WORLD,
  homeTiles: QM_HOME_TILES,
  homeSide: QM_HOME_SIDE,
  /* s7's page: the Open Audit Findings chart drilled to AUD-12's majors
   * (the QMS page's report), with CAPA-618 opened over it */
  report: QM_FINDINGS_REPORT,
  context: {
    initials: "A",
    name: "automator",
    time: "Sep 8",
    message: "Scheduled the annual audit, two weeks out",
    detail: "AUD-12 · ISO 13485 full QMS · the notification links straight to the record",
  },
};

const PF2 = (QMS_ARCADE_FLOW_CONFIGS["2"] ?? []).map((config) => ({ ...config, world: QM_AUDIT_WORLD }));

/* s1 on the QM's own home: the audit waiting in My audits */
if (PF2[0]) {
  PF2[0] = {
    ...PF2[0],
    queueTile: "My audits",
    focusTitle: "My audits",
    focusRows: ["AUD-12 · annual ISO 13485 · in two weeks", "AUD-14 · seal supplier · October"],
    focusAction: "Open AUD-12",
  };
}

/* s7 on the QM's page: the manager's side of the same moment (16 Sep
 * recording): CAPA-618 opened from the drilled chart, the assistant's
 * reminder already in its thread, and M. Osei tagged from the record */
if (PF2[6]) {
  PF2[6] = {
    ...PF2[6],
    focus: "modal",
    modal: QM_CAPA_MODAL,
    chartHover: { bar: "Major", lines: [] },
    focusTitle: "CAPA-618",
    ownershipNote: "From the chart to the record, and the owner tagged",
  };
}

/* s8 while its dialog is open: the audit is still tracking and the Part 11
 * item still pending; the signature is what closes them */
if (PF2[7]) {
  PF2[7] = {
    ...PF2[7],
    status: "Tracking",
    checklistProgress: { ...PF2[7].checklistProgress, CLOSURE: 2 },
  };
}

/* the thread along PF-2 (step 1 is the world's opening message) */
const PF2_THREADED = threadFlow(
  [
    { config: PF2[0], time: "Sep 8", inThread: false },
    { config: PF2[1], time: "Sep 9" },
    { config: PF2[2], time: "Sep 9" },
    { config: PF2[3], time: "Sep 22" },
    { config: PF2[4], time: "Sep 22" },
    { config: PF2[5], time: "Sep 22" },
    { config: PF2[6], time: "Oct 3" },
    { config: PF2[7], time: "Oct 6" },
  ].filter((s) => Boolean(s.config)),
  {
    1: [
      {
        actor: "Person",
        name: "L. Navarro",
        time: "Sep 8",
        message: "Checklist drafted from the standard and our procedures.",
        detail: "ISO 13485 full QMS · prior-year findings linked",
      },
    ],
  },
);

/* 03 · PF-2's poses by Flow Step index */
export const QM_AUDIT_CONFIGS: Record<number, ArcadeStepConfig> = Object.fromEntries(
  PF2_THREADED.map((config, i) => [i + 1, config]),
);
