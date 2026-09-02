/* ----------------------------------------------------------------------------
 * home-arcade.ts - the homepage's stylized-arcade scenes: the same persistent
 * app window the product and platform pages journey on, staged twice here.
 *
 *   HERO - one shell, four worlds, one per audience (the panel's role-coverage
 *   finding kept intact): a quality event thread, CC-2148's approval route
 *   (borrowed verbatim from the platform journey so the universe stays one
 *   continuous story), a WIP hold queue, and SOP-118 at point of use.
 *
 *   MECHANISM - the homepage's four-claim journey (capture, coordinate,
 *   prove, write back) followed on ONE record: NC-204, the same coating
 *   non-conformance the QMS page investigates and the platform page raises
 *   CC-2148 from. Fictional dataset: Engineering Industries.
 *   Server module, no state.
 * -------------------------------------------------------------------------- */

import {
  type ArcadeFlowWorld,
  type ArcadeStepConfig,
} from "../products/_shared/arcade/arcade";
import { PLATFORM_JOURNEY_CONFIGS } from "../platform/platform-arcade";

/* ============================================================ the event world
 * NC-204 at platform altitude: not the QMS page's deep investigation, but the
 * cross-functional arc every record shares. Checklist sections are the
 * record's stable anatomy; steps only open sections and advance completion. */
const QUALITY_EVENT_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Quality Event",
  owner: "J. Rivera",
  ownerInitials: "JR",
  participants: ["JR", "MO", "+3"],
  participantsLabel: "J. Rivera, M. Osei, and three others",
  recordKicker: "QUALITY EVENT",
  context: {
    initials: "MO",
    name: "M. Osei",
    time: "07:58",
    message: "Coating thickness reading out of spec on line 2.",
    detail: "PRT-4412 housing · WO-8817 · caught at in-process check",
  },
  inboxNeighbors: [
    { title: "Torque spec change", time: "09:12", detail: "CC-2148 · cross-functional review", kind: "Change control" },
    { title: "Supplier corrective action", time: "Yesterday", detail: "SCAR-31 · evidence requested", kind: "Quality event" },
    { title: "Cleaning validation", time: "Yesterday", detail: "SOP-118 · Rev D effective", kind: "Document" },
  ],
  homeTiles: [
    { label: "Quality events", count: 6 },
    { label: "My tasks", count: 4 },
    { label: "Pending approvals", count: 2 },
  ],
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
  checklistTitle: "Quality Event",
  checklistSections: [
    {
      title: "CAPTURE & EVIDENCE",
      items: [
        { label: "Photos and measurements", note: "4 photos · 3 readings" },
        { label: "Part and order context", note: "PRT-4412 · WO-8817 · ERP" },
        {
          label: "Problem description",
          kind: "field",
          value: "Coating 38.1 µm on housing face, spec 45-55. Photos 1-4 attached.",
          note: "References attached evidence",
        },
      ],
    },
    {
      title: "OWNERS & CONTAINMENT",
      items: [
        { label: "Quarantine lot 118-B", note: "Owner · M. Osei · today" },
        { label: "Sort remaining WIP", note: "Owner · Line 2 · today" },
        { label: "Customer impact check", note: "Owner · J. Rivera" },
      ],
    },
    {
      title: "DISPOSITION & WRITE-BACK",
      items: [
        { label: "Disposition", note: "Rework to spec · line 2" },
        { label: "Quality approval", kind: "approval", signer: "D. Fontaine", state: "Signed" },
        { label: "ERP write-back", note: "Stock status · synced on close" },
      ],
    },
  ],
};

const EVENT_RECORD = {
  type: "Quality Event",
  id: "NC-204",
  title: "Coating thickness out of spec · line 2",
} as const;

/* ========================================================== mechanism journey
 * Four poses, one record: each of the homepage's four claims, proven on the
 * scene. The camera pans; the record never changes hands. */
export const HOME_JOURNEY_CONFIGS: ArcadeStepConfig[] = [
  {
    source: "HOME s1 · capture",
    ghost: "Capture",
    ...EVENT_RECORD,
    status: "Open",
    actor: "automator",
    event: "Raised the quality event from the line",
    eventDetail: "Reading, part, and work order attached · nothing re-keyed",
    checklist: "CAPTURE & EVIDENCE",
    checklistItems: ["Photos and measurements", "Part and order context"],
    focus: "queue",
    queueTile: "Quality events",
    focusTitle: "Quality events",
    focusRows: [
      "NC-204 · Coating thickness · line 2",
      "Context attached · PRT-4412 · WO-8817",
      "Owner assigned · J. Rivera",
    ],
    focusAction: "Open record",
    ownershipNote: "The event arrives with its context",
    world: QUALITY_EVENT_WORLD,
    checklistProgress: { "CAPTURE & EVIDENCE": 2, "OWNERS & CONTAINMENT": 0, "DISPOSITION & WRITE-BACK": 0 },
  },
  {
    source: "HOME s2 · coordinate",
    ghost: "Thread",
    ...EVENT_RECORD,
    status: "In Progress",
    actor: "You",
    event: "Assigned containment with owners and due dates",
    eventDetail: "Quality, production, and engineering in one thread · one visible clock",
    checklist: "OWNERS & CONTAINMENT",
    checklistItems: ["Quarantine lot 118-B", "Sort remaining WIP"],
    focus: "record",
    focusTitle: "One accountable thread",
    focusRows: ["One owner · every handoff on a clock", "Decisions and evidence stay attached"],
    focusAction: "Open live record",
    ownershipNote: "The record and the conversation are the same place",
    world: QUALITY_EVENT_WORLD,
    checklistOpen: "OWNERS & CONTAINMENT",
    checklistProgress: { "CAPTURE & EVIDENCE": 3, "OWNERS & CONTAINMENT": 1, "DISPOSITION & WRITE-BACK": 0 },
  },
  {
    source: "HOME s3 · prove",
    ghost: "Sign",
    ...EVENT_RECORD,
    status: "Approved",
    actor: "You",
    event: "Approved the disposition with a Part 11 signature",
    eventDetail: "Evidence checked complete before the record can close",
    checklist: "DISPOSITION & WRITE-BACK",
    checklistItems: ["Quality approval"],
    focus: "signature",
    focusTitle: "Sign this approval",
    focusRows: ["Disposition · D. Fontaine · Quality"],
    focusAction: "Sign and approve",
    ownershipNote: "The signature carries its meaning",
    world: QUALITY_EVENT_WORLD,
    signedItems: [
      { name: "D. Fontaine", initials: "DF", role: "Quality Manager", approvalId: "AP-0864", time: "15:47" },
    ],
    checklistOpen: "DISPOSITION & WRITE-BACK",
    checklistProgress: { "CAPTURE & EVIDENCE": 3, "OWNERS & CONTAINMENT": 3, "DISPOSITION & WRITE-BACK": 1 },
  },
  {
    source: "HOME s4 · write back",
    ghost: "Sync",
    ...EVENT_RECORD,
    status: "Closed",
    actor: "automator",
    event: "Wrote the approved outcome back to your systems",
    eventDetail: "Unifize keeps the trail · your systems of record keep the final state",
    checklist: "DISPOSITION & WRITE-BACK",
    checklistItems: ["ERP write-back"],
    focus: "history",
    focusKicker: "SYSTEMS OF RECORD",
    focusTitle: "The outcome, written back",
    focusRows: [
      "ERP · stock disposition posted",
      "PLM · part record updated",
      "Audit trail · sealed on the thread",
    ],
    focusAction: "Open audit trail",
    ownershipNote: "Your systems of record stay authoritative",
    world: QUALITY_EVENT_WORLD,
    checklistOpen: "DISPOSITION & WRITE-BACK",
    checklistProgress: { "CAPTURE & EVIDENCE": 3, "OWNERS & CONTAINMENT": 3 },
  },
  {
    source: "HOME s5 · measure",
    ghost: "Measure",
    ...EVENT_RECORD,
    status: "Closed",
    actor: "automator",
    event: "Updated the closure metrics from the record",
    eventDetail: "Every thread carries its own clock · no export, no reconciliation",
    checklist: "DISPOSITION & WRITE-BACK",
    checklistItems: ["ERP write-back"],
    focus: "dashboard",
    focusTitle: "Closure time, month by month",
    focusRows: ["Median closure · 11 days", "Baseline · 34 days", "Waiting share · 9%"],
    focusAction: "Open the threads behind this number",
    ownershipNote: "Measured on your work, against your baseline",
    world: QUALITY_EVENT_WORLD,
    checklistProgress: { "CAPTURE & EVIDENCE": 3, "OWNERS & CONTAINMENT": 3 },
  },
];

/* ================================================== mechanism journey · change
 * The same five claims, followed on CC-2148 (2026-09-01 panel: the journey
 * shown only on a quality event pattern-matched to "quality's tool" for the
 * engineering and ops readers; the mechanism has to be provable on a record
 * they own). Poses 1-3 ride the platform journey verbatim so the universe
 * stays one continuous story; write-back and measure are posed here. */
const CHANGE_RECORD = {
  type: "Change Control",
  id: "CC-2148",
  title: "Torque spec update · housing assembly",
} as const;
const CHANGE_WORLD = PLATFORM_JOURNEY_CONFIGS[0].world;

export const HOME_JOURNEY_CHANGE_CONFIGS: ArcadeStepConfig[] = [
  PLATFORM_JOURNEY_CONFIGS[0], // capture: the queue, context attached
  PLATFORM_JOURNEY_CONFIGS[3], // coordinate: the route, owners and one clock
  PLATFORM_JOURNEY_CONFIGS[4], // prove: the Part 11 seal
  {
    source: "HOME s4-cc · write back",
    ghost: "Sync",
    ...CHANGE_RECORD,
    status: "Closed",
    actor: "automator",
    event: "Released revision D to your systems",
    eventDetail: "Unifize keeps the trail and the effectivity · your systems of record keep the final state",
    checklist: "CLOSURE",
    checklistItems: ["Revision", "Training assigned"],
    focus: "history",
    focusKicker: "SYSTEMS OF RECORD",
    focusTitle: "The change, written back",
    focusRows: [
      "PLM · Rev D effective · BOM updated",
      "ERP · routing and spec synced",
      "Training assigned · 12 operators",
    ],
    focusAction: "Open audit trail",
    ownershipNote: "Your systems of record stay authoritative",
    world: CHANGE_WORLD,
    checklistOpen: "CLOSURE",
    checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 3, CLOSURE: 2 },
  },
  {
    source: "HOME s5-cc · measure",
    ghost: "Measure",
    ...CHANGE_RECORD,
    status: "Closed",
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
    checklistProgress: { "CHANGE & IMPACT": 3, APPROVALS: 3, CLOSURE: 2 },
  },
];

/* ================================================================= hero views
 * Tab 1 rides the mechanism journey mid-flight (the accountable thread);
 * tab 2 borrows CC-2148's approval route from the platform page. */
export const HOME_HERO_QUALITY_CONFIG: ArcadeStepConfig = HOME_JOURNEY_CONFIGS[1];
export const HOME_HERO_CHANGE_CONFIG: ArcadeStepConfig = PLATFORM_JOURNEY_CONFIGS[3];

/* the ops world: WIP hold 118-B, raised by NC-204's containment, waiting on
 * disposition - the queue pose shows aging in the open */
const OPS_HOLD_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Hold",
  owner: "M. Osei",
  ownerInitials: "MO",
  participants: ["MO", "JR", "+2"],
  participantsLabel: "M. Osei, J. Rivera, and two others",
  recordKicker: "WIP HOLD",
  context: {
    initials: "JR",
    name: "J. Rivera",
    time: "08:10",
    message: "Lot 118-B held pending disposition of NC-204.",
    detail: "Quarantined at line 2 · disposition due today",
  },
  inboxNeighbors: [
    { title: "Incoming lot 5541", time: "07:20", detail: "Receiving inspection · sampling", kind: "Inspection" },
    { title: "Line 2 containment", time: "Yesterday", detail: "NC-204 · sort complete", kind: "Quality event" },
    { title: "Batch record exception", time: "Yesterday", detail: "WO-9021 · resolved", kind: "Exception" },
  ],
  homeTiles: [
    { label: "WIP holds", count: 3 },
    { label: "Dispositions due", count: 2 },
    { label: "Releases today", count: 4 },
  ],
  checklistTitle: "Hold & Release",
  checklistSections: [
    {
      title: "HOLD",
      items: [
        { label: "Reason", note: "NC-204 · coating thickness" },
        { label: "Scope", note: "Lot 118-B · 240 units" },
        { label: "Placed by", note: "M. Osei · line 2" },
      ],
    },
    {
      title: "DISPOSITION",
      items: [
        {
          label: "Decision",
          kind: "field",
          value: "Rework to spec on line 2, re-inspect before release.",
          note: "Entered on the record",
        },
        { label: "Quality concurrence", kind: "approval", signer: "J. Rivera", state: "Signed" },
        { label: "Rework order", note: "WO-8901 · linked" },
      ],
    },
    {
      title: "RELEASE",
      items: [
        { label: "Re-inspection", note: "3 samples · pending" },
        { label: "Release signature", kind: "approval", signer: "M. Osei", state: "Pending" },
        { label: "ERP stock status", note: "Updates on release" },
      ],
    },
  ],
};

export const HOME_HERO_OPS_CONFIG: ArcadeStepConfig = {
  source: "HOME hero · holds & release",
  ghost: "Holds",
  type: "Hold",
  id: "HLD-118",
  title: "Lot 118-B · quarantine hold",
  status: "On Hold",
  actor: "automator",
  event: "Held lot 118-B pending disposition",
  eventDetail: "Hold, scope, and owner visible to every function · nothing waits in an inbox",
  checklist: "HOLD",
  checklistItems: ["Reason", "Scope"],
  focus: "queue",
  queueTile: "WIP holds",
  focusTitle: "WIP holds",
  focusRows: [
    "Lot 118-B · 240 units · line 2",
    "Disposition due today · M. Osei",
    "Release blocked until signed",
  ],
  focusAction: "Open hold",
  ownershipNote: "Aging is visible, not discovered",
  world: OPS_HOLD_WORLD,
  checklistProgress: { HOLD: 3, DISPOSITION: 1, RELEASE: 0 },
};

/* SOP-118 at point of use: no world, so the scene rides the shared document
 * world (PF-29) the DMS journeys stage - the same record, verbatim */
export const HOME_HERO_DOCUMENT_CONFIG: ArcadeStepConfig = {
  source: "HOME hero · controlled document",
  ghost: "Use",
  type: "Document",
  id: "#118",
  title: "Cleaning validation",
  status: "Effective",
  actor: "You",
  event: "Opened the controlled document at point of use",
  eventDetail: "The screen shows the master record, not a downloaded copy",
  checklist: "SIGNED DOCUMENT",
  checklistItems: ["Document-118-Cleaning_Validation.pdf", "Revision D", "Effective date"],
  focus: "viewer",
  focusTitle: "Controlled document",
  focusRows: ["SOP-118 · Rev D · Effective"],
  focusAction: "Live record",
  ownershipNote: "One current version, everywhere",
  checklistOpen: "SIGNED DOCUMENT",
  checklistProgress: { "CONTROLLED COPY": 0 },
};

/* The suite's DMS pose (section 04): the revision chain, NOT the viewer the
 * hero's fourth tab already stages - the suite shouldn't repeat the hero's
 * artifact. Versioning is the product's essence claim: "one current version"
 * is proven BY the chain (D effective, C superseded and retained, the change
 * record between them). Facts mirror the DMS page's change-control module
 * scene, restaged on the shared document world. */
export const HOME_SUITE_DMS_CONFIG: ArcadeStepConfig = {
  source: "HOME suite · revision chain",
  ghost: "Version",
  type: "Document",
  id: "#118",
  title: "Cleaning validation",
  status: "Effective",
  actor: "automator",
  event: "Carried change #77 through to revision D",
  eventDetail: "Impact assessed · approvals routed · the superseded revision retained",
  checklist: "SIGNED DOCUMENT",
  checklistItems: ["Revision", "Effective date"],
  focus: "history",
  focusKicker: "REVISION HISTORY",
  focusTitle: "One continuous chain",
  focusRows: [
    "Rev D · Effective · current",
    "Change Control #77 · Verified & Approved",
    "Rev C · Superseded · retained",
  ],
  focusAction: "Open change record",
  ownershipNote: "One current version, everywhere",
  checklistOpen: "SIGNED DOCUMENT",
  checklistProgress: { "CONTROLLED COPY": 0 },
  related: 3,
};

