/* 01 · the labs journey (24 Sep 2026): the 1-3s Westgard breach on the
 * hero's control chart, as nonconformance NC-3092. Poses: the NC typed at
 * the bench → the 5-Why in Unifize AI, one cause picked by the analyst
 * (the product's real flow; the hero's root cause is calibration) → the
 * technical signatory's corrective-action review → the effectiveness runs
 * → the sealed trace. Vocabulary from the Notion row (control limits,
 * Westgard rules, non-conformance, corrective action, effectiveness check). */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Laboratory Quality",
  recordNoun: "Nonconformance",
  owner: "R. Iyer",
  ownerInitials: "RI",
  participants: ["EN", "TB", "+1"],
  participantsLabel: "Emma Novak, Tom Becker and metrology",
  recordKicker: "NONCONFORMANCE",
  context: {
    initials: "RI",
    name: "R. Iyer",
    time: "07:55",
    message: "Daily QC broke the 1-3s rule on the method.",
    detail: "Control chart · affected results held",
  },
  inboxNeighbors: [
    { title: "Issued reports check", time: "08:10", detail: "What already went out on this method", kind: "Review" },
    { title: "Balance calibration", time: "Yesterday", detail: "Metrology · due this week", kind: "Equipment" },
    { title: "Proficiency test round", time: "Mon", detail: "Results due to the provider", kind: "Quality event" },
  ],
  checklistTitle: "Nonconformance",
  checklistSections: [
    {
      title: "NONCONFORMANCE",
      items: [
        { label: "Description", kind: "field", value: "QC result outside the 3s control limit" },
        { label: "Rule violated", kind: "field", value: "Westgard 1-3s" },
        { label: "Affected results", note: "Held · Lab ops" },
      ],
    },
    {
      title: "ROOT CAUSE · 5-WHY",
      items: [
        { label: "Why 1 (choose only one)", kind: "linked", links: [] },
        { label: "Root cause", note: "Bound to the NC" },
      ],
    },
    {
      title: "CORRECTIVE ACTION",
      items: [
        { label: "Corrective action", note: "Owner and due date" },
        { label: "Issued reports", note: "Amendments tied to the NC" },
        { label: "Technical review", kind: "approval", signer: "E. Novak", state: "Approved" },
      ],
    },
    {
      title: "EFFECTIVENESS",
      items: [
        { label: "Effectiveness check", note: "Next QC runs in control" },
        { label: "Effectiveness sign-off", kind: "approval", signer: "T. Becker", state: "Approved" },
      ],
    },
  ],
};

const step = onRecord({ type: "Nonconformance", id: "NC-3092", title: "QC breach · 1-3s rule", world: WORLD });

export const LABORATORIES_JOURNEY = cast(
  ["QC Laboratory", "Unifize", "Technical Review", "Quality", "Unifize"],
  [
  step(1.4, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the nonconformance from the control chart",
    eventDetail: "Rule and run captured · affected results held",
    focus: "checklist",
    focusTitle: "Nonconformance",
    focusRows: [],
    ownershipNote: "Raised at the bench, not in a spreadsheet",
    checklistOpen: "NONCONFORMANCE",
    checklistEntry: { section: "NONCONFORMANCE", item: "Description" },
    checklistProgress: { NONCONFORMANCE: 2, "ROOT CAUSE · 5-WHY": 0, "CORRECTIVE ACTION": 0, EFFECTIVENESS: 0 },
  }),
  step(1.25, {
    ghost: "Analyse",
    status: "Open",
    actor: "Unifize Assistant",
    event: "Why 1, asked from the nonconformance",
    eventDetail: "Three candidates against the evidence · only R. Iyer picks the one that fits",
    focus: "assist",
    poseVariant: "linked",
    focusTitle: "Why 1",
    focusRows: [],
    ownershipNote: "The chain builds from the record",
    checklistOpen: "ROOT CAUSE · 5-WHY",
    checklistLinks: {
      section: "ROOT CAUSE · 5-WHY",
      item: "Why 1 (choose only one)",
      links: ["WHY-1"],
      records: [{ id: "WHY-1", title: "Instrument out of calibration", state: "Picked" }],
    },
    checklistProgress: { "ROOT CAUSE · 5-WHY": 1, "CORRECTIVE ACTION": 0, EFFECTIVENESS: 0 },
    assist: {
      kicker: "UNIFIZE AI · BETA",
      prompt: "Why did the QC result break the 1-3s rule?",
      note: "Answered against the control chart and the equipment record · a suggestion until picked",
      pick: "one",
      suggested: [
        { id: "A", title: "Instrument out of calibration", why: "Equipment record", picked: true },
        { id: "B", title: "Control material degraded", why: "Lot in date" },
        { id: "C", title: "Random error on one run", why: "Unsupported" },
      ],
      action: "Add to checklist",
      alt: "Ask again",
      pressed: true,
    },
  }),
  step(1.3, {
    ghost: "Review",
    status: "In Review",
    actor: "You",
    event: "Put the corrective action to E. Novak",
    eventDetail: "Root cause, recalibration and the issued-report check on one thread",
    focus: "review",
    focusTitle: "Corrective action review",
    focusRows: [
      "Root cause · calibration",
      "Correction · recalibrated, results re-run",
      "Issued reports · amendments tied to the NC",
    ],
    focusAction: "Approve corrective action",
    focusAlts: ["Return with comment"],
    ownershipNote: "The reasoning stays on the NC",
    world: { ...WORLD, viewer: "E. Novak", viewerInitials: "EN" },
    checklistOpen: "CORRECTIVE ACTION",
    checklistProgress: { "ROOT CAUSE · 5-WHY": 2, "CORRECTIVE ACTION": 2, EFFECTIVENESS: 0 },
  }),
  step(1.3, {
    ghost: "Verify",
    status: "Implementation",
    actor: "automator",
    event: "Tracked the effectiveness check to the next QC runs",
    eventDetail: "Each run plotted back on the chart · T. Becker approves on the record",
    focus: "tasks",
    focusTitle: "Effectiveness check",
    focusRows: ["QC run 1 in control · R. Iyer", "QC run 2 in control · R. Iyer", "Effectiveness approved · T. Becker"],
    ownershipNote: "Closed inside the 90 days",
    checklistOpen: "EFFECTIVENESS",
    checklistProgress: { EFFECTIVENESS: 2 },
  }),
  step(1, {
    ghost: "Seal",
    status: "Completed",
    actor: "automator",
    event: "Closed the nonconformance and sealed the trace",
    eventDetail: "Root cause, corrective action and effectiveness on one record · ISO/IEC 17025",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["NC-3092 · Closed · trace sealed", "Method back in control", "Accreditation file · surveillance ready"],
    ownershipNote: "Reconstructable for the assessor",
    checklistOpen: "EFFECTIVENESS",
    signedItems: [{ name: "T. Becker", initials: "TB", role: "Effectiveness check", approvalId: "3E08B3092A61", time: "Now" }],
    related: 2,
  }),
],
);
