/* 01 · the pharma journey (24 Sep 2026): the OOS result the hero's batch
 * record review turns up, as deviation DEV-4471, from raise to QP release.
 * Poses: the deviation typed where it was found → the investigation bound
 * → the CAPA running across Quality and RA → the QP's Part 11 signature →
 * the sealed trace. Vocabulary from the Notion row (executed batch record,
 * OOS, deviation classification, CAPA, QP release, EU Annex 11).
 * 24 Sep 2026, the page's one story: the root cause is an excipient
 * supplier's process change that never reached change control (the Notion
 * Primary Fear Anchor), so the CAPA is that change control, RA's registered
 * specification check and the retraining. Every section below 01 plays the
 * same deviation. Cast, one role per name:
 *   A. Mehta   Manufacturing, raised DEV-4471
 *   C. Dubois  Quality, owns the investigation and the CAPA
 *   N. Osei    Regulatory Affairs
 *   H. Larsen  signs the batch release (Part 11)
 *   P. Varga   Site operations, the batch on hold */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Manufacturing Quality",
  recordNoun: "Deviation",
  owner: "A. Mehta",
  ownerInitials: "AM",
  participants: ["CD", "HL", "+1"],
  participantsLabel: "Claire Dubois, Henrik Larsen and one other",
  recordKicker: "DEVIATION",
  context: {
    initials: "AM",
    name: "A. Mehta",
    time: "08:40",
    message: "Batch record review flagged an OOS result.",
    detail: "In-process controls · OOS result · batch on hold",
  },
  inboxNeighbors: [
    { title: "Executed batch record review", time: "08:12", detail: "Exception open · in-process controls", kind: "Review" },
    { title: "CAPA effectiveness check", time: "Yesterday", detail: "Due before the APR / PQR", kind: "Quality event" },
    { title: "Line clearance", time: "Mon", detail: "Equipment and area verified", kind: "Batch record" },
  ],
  checklistTitle: "Deviation",
  checklistSections: [
    {
      title: "DEVIATION",
      items: [
        { label: "Description", kind: "field", input: "rich", value: "In-process control result outside specification" },
        { label: "Source", note: "Executed batch record · in-process controls" },
        { label: "Classification", kind: "field", input: "select", value: "Major" },
      ],
    },
    {
      title: "INVESTIGATION",
      items: [
        { label: "OOS investigation", note: "Laboratory phase · Quality" },
        { label: "Batch disposition", note: "On hold until the investigation closes" },
        { label: "Root cause", note: "Excipient supplier change, never assessed" },
      ],
    },
    {
      title: "CAPA",
      items: [
        { label: "Corrective action", note: "Supplier change through change control" },
        { label: "Regulatory impact", note: "Registered specification · RA" },
        { label: "Effectiveness check", note: "Scheduled" },
      ],
    },
    {
      title: "RELEASE",
      items: [
        { label: "CAPA review", kind: "approval", signer: "C. Dubois", state: "Approved" },
        { label: "Batch release · Part 11", kind: "approval", signer: "H. Larsen", state: "Signed" },
        { label: "Audit trail", note: "Sealed · EU Annex 11" },
      ],
    },
  ],
};

const step = onRecord({ type: "Deviation", id: "DEV-4471", title: "OOS result · in-process controls", world: WORLD });

export const PHARMACEUTICALS_JOURNEY = cast(
  ["Manufacturing", "Unifize", "Quality Operations", "Quality Assurance", "Unifize"],
  [
  step(1.4, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the deviation from the batch record",
    eventDetail: "OOS in the in-process controls · batch placed on hold",
    focus: "checklist",
    focusTitle: "Deviation",
    focusRows: [],
    ownershipNote: "Raised where the exception was found",
    checklistOpen: "DEVIATION",
    checklistEntry: { section: "DEVIATION", item: "Description" },
    checklistProgress: { DEVIATION: 2, INVESTIGATION: 0, CAPA: 0, RELEASE: 0 },
  }),
  step(1.25, {
    ghost: "Bind",
    status: "Open",
    actor: "automator",
    event: "Bound the investigation to the deviation",
    eventDetail: "The OOS result, the batch and its master record on one thread",
    focus: "trace",
    checklistItems: [
      "OOS investigation · laboratory phase",
      "Batch on hold · disposition pending",
      "Master batch record · in-process limits",
    ],
    focusTitle: "Investigation bound",
    focusRows: ["Everything the deviation touches", "3 records linked"],
    ownershipNote: "Scoped by rule, not by memory",
    checklistOpen: "INVESTIGATION",
    checklistProgress: { INVESTIGATION: 2, CAPA: 0, RELEASE: 0 },
    related: 3,
  }),
  step(1.3, {
    ghost: "CAPA",
    status: "Implementation",
    actor: "Unifize Assistant",
    event: "Assigned the CAPA across Quality and RA",
    eventDetail: "Each action with an owner and a due date, tracked on the deviation",
    focus: "tasks",
    focusTitle: "CAPA actions",
    focusRows: ["Supplier change control · C. Dubois", "Registered spec impact · N. Osei", "Effectiveness check scheduled · C. Dubois"],
    ownershipNote: "The CAPA stays on the deviation",
    checklistOpen: "CAPA",
    checklistProgress: { CAPA: 2, RELEASE: 0 },
  }),
  step(1.15, {
    ghost: "Sign",
    status: "Needs Approval",
    actor: "You",
    event: "Re-authenticated to release the batch",
    eventDetail: "Signer, meaning and time seal to DEV-4471",
    focus: "signature",
    focusTitle: "Apply your signature",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified · 21 CFR Part 11",
    world: { ...WORLD, viewer: "H. Larsen", viewerInitials: "HL" },
    checklistOpen: "RELEASE",
    checklistProgress: { RELEASE: 1 },
    signedItems: [{ name: "C. Dubois", initials: "CD", role: "CAPA review", approvalId: "7D14A4471C02", time: "Sep 16" }],
  }),
  step(1, {
    ghost: "Seal",
    status: "Approved",
    actor: "automator",
    event: "Released the batch and sealed the trace",
    eventDetail: "Investigation, CAPA and the release decision on one record · EU Annex 11",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["DEV-4471 · Closed · trace sealed", "Batch released · reason on record", "Effectiveness check · scheduled"],
    ownershipNote: "Reconstructable at inspection",
    checklistOpen: "RELEASE",
    signedItems: [{ name: "H. Larsen", initials: "HL", role: "Batch release", approvalId: "2B90F4471E17", time: "Now" }],
    related: 3,
  }),
],
);
