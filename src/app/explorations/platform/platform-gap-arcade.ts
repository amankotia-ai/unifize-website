/* ----------------------------------------------------------------------------
 * platform-gap-arcade.ts - the gap section's product visual: NC-204 on the
 * persistent camera, one pose per moment of the six-step defect story that
 * platform-gap.tsx tells side by side with "today". Same universe as the
 * QMS page (Engineering Industries, coating thickness on PRT-4412, line 2)
 * so the record the rest of the page follows is the record shown here.
 *
 * Restaged 22 Sep 2026 from the 16 Sep product recordings: the ERP context
 * arrives with the record, notification carries the record, each Why is
 * generated from the last and an investigator picks one (Beta), the
 * disposition is sealed with a Part 11 signature, the procedure revision is
 * raised from the record as a linked change control, and closure is the
 * record's own history. Server module, no state.
 * -------------------------------------------------------------------------- */

import {
  type ArcadeFlowWorld,
  type ArcadeStepConfig,
} from "../products/_shared/arcade/arcade";

/* ============================================================ the world
 * NC-204 as one record, start to finish. Checklist sections are the
 * record's stable anatomy; each moment opens one and advances completion. */
const GAP_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Non-conformance",
  owner: "J. Rivera",
  ownerInitials: "JR",
  participants: ["JR", "MO", "SO", "+2"],
  participantsLabel: "J. Rivera, M. Osei, S. Okafor, and two others",
  recordKicker: "NON-CONFORMANCE",
  context: {
    initials: "MO",
    name: "M. Osei",
    time: "07:58",
    message: "Coating thickness reading out of spec on line 2.",
    detail: "PRT-4412 housing · WO-8817 · caught at in-process check",
  },
  inboxNeighbors: [
    { title: "Incoming inspection", time: "09:12", detail: "Lot 224-A · sampling due", kind: "Quality event" },
    { title: "Supplier corrective action", time: "Yesterday", detail: "SCAR-31 · evidence requested", kind: "Quality event" },
    { title: "Cleaning validation", time: "Yesterday", detail: "SOP-118 · Rev D effective", kind: "Document" },
  ],
  checklistTitle: "Non-conformance",
  checklistSections: [
    {
      title: "CAPTURE & EVIDENCE",
      items: [
        { label: "Photos and measurements", note: "4 photos · 3 readings · from the line" },
        { label: "Part and order context", note: "PRT-4412 · WO-8817 · from the ERP" },
        {
          label: "Problem description",
          kind: "field",
          value: "Coating 38.1 µm on housing face, spec 45-55. Photos 1-4, readings attached.",
          note: "References attached evidence",
        },
      ],
    },
    {
      title: "INVESTIGATION",
      items: [
        { label: "Investigation team", note: "S. Okafor · M. Osei · L. Danes · in the thread" },
        { label: "Generate the next Why", kind: "ask", value: "Generate Why 3", note: "Beta" },
        { label: "Why chain (one pick per level)", kind: "linked", links: ["WHY-1", "WHY-2", "WHY-3"] },
        {
          label: "Root cause",
          kind: "field",
          value: "Nozzle wear past service interval; the line 2 rebuild did not carry the interval onto the maintenance plan.",
          note: "Drafted from Why 1 to Why 5 · accepted by J. Rivera",
        },
      ],
    },
    {
      title: "DISPOSITION",
      items: [
        {
          label: "Recommendation",
          kind: "field",
          value: "Rework lot 118-B to spec. Nozzle serviced; re-inspect 100% before release.",
          note: "Entered on the record",
        },
        { label: "Engineering concession", kind: "approval", signer: "S. Okafor", state: "Granted" },
        { label: "Disposition approval", kind: "approval", signer: "D. Fontaine", state: "Signed" },
      ],
    },
    {
      title: "ACTIONS & CLOSURE",
      items: [
        { label: "Procedure revision", kind: "linked", links: [] },
        { label: "Corrective actions", kind: "linked", links: ["CA-1072", "CA-1073"] },
        { label: "Effectiveness check", note: "30-day review scheduled" },
      ],
    },
  ],
};

const RECORD = {
  type: "Non-conformance",
  id: "NC-204",
  title: "Coating thickness out of spec · line 2",
  world: GAP_WORLD,
} as const;

const REVISION = { id: "CC-2151", title: "Add nozzle service interval · line 2 maintenance plan", state: "In Review" };

/* ============================================================ the poses
 * One per moment, in the section's order. Each camera move lands on the
 * part of the record where that moment actually happens. */

/* 1 · defect logged: raised from the line; the ERP context and the photos
 * come with it, confirmed rather than re-keyed */
export const GAP_LOGGED_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM gap s1 · defect logged",
  ghost: "Log",
  ...RECORD,
  status: "Open",
  actor: "automator",
  event: "Attached part and order context from the ERP",
  eventDetail: "Raised from line 2 by M. Osei · 4 photos and 3 readings came with it · nothing re-keyed",
  checklist: "CAPTURE & EVIDENCE",
  checklistItems: ["Part PRT-4412 · confirmed", "Work order WO-8817 · linked", "Photos 1-4 · attached"],
  focus: "trace",
  focusTitle: "Context pulled from the ERP",
  focusRows: ["Confirmed by J. Rivera", "Confirm context"],
  focusAction: "Confirm context",
  ownershipNote: "Raised from the line, not re-keyed",
  checklistOpen: "CAPTURE & EVIDENCE",
  checklistProgress: { "CAPTURE & EVIDENCE": 2, INVESTIGATION: 0, DISPOSITION: 0, "ACTIONS & CLOSURE": 0 },
};

/* 2 · quality notified: every notification carries the record, so quality,
 * production, and engineering start on the same page */
export const GAP_NOTIFIED_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM gap s2 · quality notified",
  ghost: "Notify",
  ...RECORD,
  status: "Open",
  actor: "automator",
  event: "Notified quality, production, and engineering with the record attached",
  eventDetail: "Each notification carries the record, the evidence, and the owner · no reply-all to fork",
  checklist: "CAPTURE & EVIDENCE",
  checklistItems: ["Photos and measurements", "Part and order context", "Problem description"],
  focus: "queue",
  poseVariant: "route",
  focusKicker: "ON THE RECORD FROM MINUTE ONE",
  focusTitle: "Structured notification",
  focusRows: ["J. Rivera · Quality · owner", "M. Osei · Production · line 2", "S. Okafor · Process Engineering"],
  focusAction: "Open record",
  ownershipNote: "Everyone the defect needs, on the record",
  checklistOpen: "CAPTURE & EVIDENCE",
  checklistProgress: { "CAPTURE & EVIDENCE": 3, INVESTIGATION: 0, DISPOSITION: 0, "ACTIONS & CLOSURE": 0 },
  related: 1,
};

/* 3 · root cause: the Why chain builds in the thread. Unifize AI proposes
 * the next Why from the last one and the evidence; only the investigator
 * picks the one that fits (Beta in product). */
export const GAP_ROOT_CAUSE_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM gap s3 · root cause in the thread",
  ghost: "Why",
  ...RECORD,
  status: "Investigation",
  actor: "Unifize Assistant",
  event: "Why 3, asked from Why 2",
  eventDetail: "Three candidates against the evidence in this thread · only an investigator picks the one that fits",
  checklist: "INVESTIGATION",
  checklistItems: ["Why chain (one pick per level)"],
  focus: "assist",
  focusTitle: "Why 3",
  focusRows: ["WHY-3 · Nozzle wear past its service interval"],
  ownershipNote: "Worked in the thread, evidence inline",
  checklistOpen: "INVESTIGATION",
  checklistAsk: { section: "INVESTIGATION", item: "Generate the next Why" },
  checklistProgress: { "CAPTURE & EVIDENCE": 3, INVESTIGATION: 2, DISPOSITION: 0, "ACTIONS & CLOSURE": 0 },
  assist: {
    kicker: "UNIFIZE AI · BETA",
    prompt: "Why did the nozzle deliver low flow?",
    note: "Asked from Why 2 · answered against the maintenance log S. Okafor attached and the thickness trend",
    pick: "one",
    suggested: [
      { id: "A", title: "Nozzle wear past its service interval", why: "Log confirms", picked: true },
      { id: "B", title: "Coating viscosity drifted between batches", why: "No batch change" },
      { id: "C", title: "Operator ran a shortened spray pass", why: "Unsupported" },
    ],
    action: "Add to checklist",
    alt: "Ask again",
    pressed: true,
  },
};

/* 4 · disposition: engineering's concession is already sealed in the thread;
 * the quality manager signs the disposition on the record */
export const GAP_DISPOSITION_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM gap s4 · disposition signed",
  ghost: "Sign",
  ...RECORD,
  world: { ...GAP_WORLD, viewer: "D. Fontaine", viewerInitials: "DF" },
  status: "Disposition",
  actor: "You",
  event: "Approving the disposition with a Part 11 signature",
  eventDetail: "Rework lot 118-B to spec · identity verified, meaning attached, sealed on the record",
  checklist: "DISPOSITION",
  checklistItems: ["Disposition approval"],
  focus: "signature",
  focusTitle: "Sign the disposition",
  focusRows: ["Approval · D. Fontaine · Quality Manager"],
  focusAction: "Sign and approve",
  ownershipNote: "A decision anyone can find at audit",
  signedItems: [
    { name: "S. Okafor", initials: "SO", role: "Process Engineering · concession CON-88", approvalId: "AP-0866", time: "09:26" },
  ],
  checklistOpen: "DISPOSITION",
  checklistProgress: { "CAPTURE & EVIDENCE": 3, INVESTIGATION: 4, DISPOSITION: 2, "ACTIONS & CLOSURE": 0 },
};

/* 5 · procedure updated: the revision is raised from this record as a change
 * control and lands in the checklist as a linked RECORD, not a file name */
export const GAP_PROCEDURE_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM gap s5 · procedure revision raised from the record",
  ghost: "Revise",
  ...RECORD,
  status: "Actions",
  actor: "You",
  event: "Raised the change control for the maintenance plan from this record",
  eventDetail: "CC-2151 · linked both ways, so the revision carries the defect that caused it",
  checklist: "ACTIONS & CLOSURE",
  checklistItems: ["Procedure revision"],
  focus: "comment",
  focusTitle: "Raised from the record",
  focusRows: [`${REVISION.id} · ${REVISION.title}`],
  focusAction: "Open change control",
  ownershipNote: "The why travels with the revision",
  checklistOpen: "ACTIONS & CLOSURE",
  checklistLinks: {
    section: "ACTIONS & CLOSURE",
    item: "Procedure revision",
    links: [REVISION.id],
    records: [REVISION],
  },
  checklistProgress: { "CAPTURE & EVIDENCE": 3, INVESTIGATION: 4, DISPOSITION: 3, "ACTIONS & CLOSURE": 1 },
  related: 2,
};

/* 6 · closure: the record's own history is the tracker; nothing to update
 * by hand, nothing living in six places */
export const GAP_CLOSURE_CONFIG: ArcadeStepConfig = {
  source: "PLATFORM gap s6 · closed on the record",
  ghost: "Close",
  ...RECORD,
  status: "Closed",
  actor: "You",
  event: "Closed the non-conformance",
  eventDetail: "Owners, decisions, signatures, and evidence on one record · the tracker is the record",
  checklist: "ACTIONS & CLOSURE",
  checklistItems: ["Effectiveness check"],
  focus: "history",
  focusKicker: "RECORD HISTORY · NC-204",
  focusTitle: "One record, start to finish",
  focusRows: [
    "Closed · J. Rivera · today",
    "Procedure revised · CC-2151 · linked",
    "Disposition signed · D. Fontaine · Part 11",
    "Root cause · Why 5 · picked in the thread",
    "Notified · quality, production, engineering",
    "Raised from line 2 · evidence attached",
  ],
  ownershipNote: "The why lives in one place",
  checklistOpen: "ACTIONS & CLOSURE",
  related: 4,
};

/* the six moments, in the order the section tells them */
export const GAP_CONFIGS: ArcadeStepConfig[] = [
  GAP_LOGGED_CONFIG,
  GAP_NOTIFIED_CONFIG,
  GAP_ROOT_CAUSE_CONFIG,
  GAP_DISPOSITION_CONFIG,
  GAP_PROCEDURE_CONFIG,
  GAP_CLOSURE_CONFIG,
];
