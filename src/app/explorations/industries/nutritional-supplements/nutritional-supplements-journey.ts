/* 01 · the supplements journey (24 Sep 2026): the botanical lot whose FTIR
 * fingerprint fails identity in the hero, as nonconformance CA-3120.
 * Poses: the failed identity result as the record's status → the
 * investigation bound (lot rejected, supplier notified, adulteration check)
 * → the CAPA's approval route across QC, Quality and Supplier Quality →
 * the e-signature → the sealed trace. Vocabulary from the Notion row
 * (identity testing, adulteration, 21 CFR Part 111, supplier qualification).
 * 24 Sep 2026, the page's one story: every section below plays CA-3120 (the
 * COA that passed, the FTIR that didn't, the supplier re-qualification, the
 * tightened identity spec, the batch record waiting on the replacement
 * lot's result). Cast, one role per name:
 *   J. Park     Operations, raised CA-3120 at receipt
 *   W. Zhang    QC Lab, the identity method
 *   N. Quinn    Supplier Quality, the supplier corrective action
 *   L. Romero   Quality, CAPA review
 *   G. Holt     Quality leadership, approves and releases
 *   R. Castillo Plant, the held lot
 *   S. Patel    Label compliance
 *   K. Moore    NSF / GMP audit */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Supplement Quality",
  recordNoun: "Nonconformance",
  owner: "J. Park",
  ownerInitials: "JP",
  participants: ["LR", "GH", "+2"],
  participantsLabel: "Luis Romero, Grace Holt and two others",
  recordKicker: "INCOMING IDENTITY TEST",
  context: {
    initials: "JP",
    name: "J. Park",
    time: "10:05",
    message: "Botanical lot held at receipt: identity does not match.",
    detail: "FTIR fingerprint · supplier COA attached",
  },
  inboxNeighbors: [
    { title: "Replacement lot", time: "10:40", detail: "Identity retest · QC Lab", kind: "Incoming material" },
    { title: "Supplier qualification", time: "Yesterday", detail: "Botanical supplier · re-evaluation due", kind: "Supplier" },
    { title: "Batch production record", time: "Mon", detail: "Identity result pending", kind: "Batch record" },
  ],
  checklistTitle: "Nonconformance",
  checklistSections: [
    {
      title: "NONCONFORMANCE",
      items: [
        { label: "Description", kind: "field", input: "rich", value: "Identity test does not match the reference" },
        { label: "Method", note: "FTIR fingerprint · unmatched band" },
        { label: "Lot status", note: "Held at receipt" },
      ],
    },
    {
      title: "INVESTIGATION",
      items: [
        { label: "Lot rejected · supplier notified", note: "Supplier Quality" },
        { label: "Adulteration check", note: "Quality" },
        { label: "Supplier COA", note: "Checked against the result" },
      ],
    },
    {
      title: "CAPA",
      items: [
        { label: "Supplier corrective action", note: "Requested across the supplier boundary" },
        { label: "CAPA review", kind: "approval", signer: "L. Romero", state: "Approved" },
        { label: "CAPA approval", kind: "approval", signer: "G. Holt", state: "Signed" },
      ],
    },
  ],
};

const step = onRecord({ type: "Nonconformance", id: "CA-3120", title: "Botanical lot · identity fail", world: WORLD });

export const NUTRITIONAL_SUPPLEMENTS_JOURNEY = cast(
  ["Operations", "Unifize", "Quality", "Quality Leadership", "Unifize"],
  [
  step(1.35, {
    ghost: "Raise",
    status: "On Hold",
    actor: "You",
    event: "Raised the nonconformance on the incoming lot",
    eventDetail: "The lot is held until identity is confirmed",
    focus: "record",
    focusTitle: "Identity test",
    focusRows: ["FTIR fingerprint · does not match", "Unmatched band against the reference"],
    ownershipNote: "Held at receipt, not after release",
    checklistOpen: "NONCONFORMANCE",
    checklistProgress: { NONCONFORMANCE: 3, INVESTIGATION: 0, CAPA: 0 },
  }),
  step(1.25, {
    ghost: "Bind",
    status: "Open",
    actor: "automator",
    event: "Bound the investigation to the nonconformance",
    eventDetail: "The lot, the supplier and the adulteration check on one thread",
    focus: "trace",
    checklistItems: [
      "Lot rejected · supplier notified",
      "Adulteration check · Quality",
      "Supplier COA · checked against the result",
    ],
    focusTitle: "Investigation bound",
    focusRows: ["Everything the lot touches", "3 records linked"],
    ownershipNote: "Scoped by rule, not by memory",
    checklistOpen: "INVESTIGATION",
    checklistProgress: { INVESTIGATION: 2, CAPA: 0 },
    related: 3,
  }),
  step(1.3, {
    ghost: "Route",
    status: "In Review",
    actor: "Unifize Assistant",
    event: "Routed the CAPA for cross-functional review",
    eventDetail: "Each function signs on the record · the supplier request travels with it",
    focus: "queue",
    poseVariant: "route",
    focusKicker: "APPROVAL ROUTE",
    focusTitle: "CAPA review",
    focusRows: ["Wei Zhang · QC Lab · identity method", "Nora Quinn · Supplier Quality · supplier corrective action", "Luis Romero · Quality · CAPA review"],
    focusAction: "Send for review",
    ownershipNote: "One route, one record",
    checklistOpen: "CAPA",
    checklistProgress: { CAPA: 1 },
  }),
  step(1.15, {
    ghost: "Sign",
    status: "Needs Approval",
    actor: "You",
    event: "Re-authenticated to approve the CAPA",
    eventDetail: "Signer, meaning and time seal to CA-3120",
    focus: "signature",
    focusTitle: "Apply your signature",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified",
    signKicker: "21 CFR PART 111 · E-SIGNATURE",
    world: { ...WORLD, viewer: "G. Holt", viewerInitials: "GH" },
    checklistOpen: "CAPA",
    checklistProgress: { CAPA: 2 },
    signedItems: [{ name: "L. Romero", initials: "LR", role: "CAPA review", approvalId: "8C52D3120F09", time: "Sep 15" }],
  }),
  step(1, {
    ghost: "Seal",
    status: "Approved",
    actor: "automator",
    event: "Closed the CAPA and sealed the trace",
    eventDetail: "Identity result, rejection and supplier action on one record · 21 CFR Part 111",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["CA-3120 · Closed · trace sealed", "Replacement lot · identity confirmed", "Batch record · identity result attached"],
    ownershipNote: "Reconstructable at inspection",
    checklistOpen: "CAPA",
    signedItems: [{ name: "G. Holt", initials: "GH", role: "CAPA approval", approvalId: "1F77A3120C38", time: "Now" }],
    related: 3,
  }),
],
);
