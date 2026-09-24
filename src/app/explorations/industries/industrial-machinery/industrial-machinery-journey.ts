/* 01 · the machinery journey (24 Sep 2026): an engineering change on the
 * hero's packaging line, ECR-4417, and the qualification it reopens.
 * Poses: the change request → the qualification impact bound (risk
 * assessment, IQ / OQ, the TCF) → the updates running across Quality and
 * Compliance → the program owner's e-signature → the sealed TCF record.
 * Vocabulary from the Notion row (ISO 12100, IQ / OQ / PQ, FAT, technical
 * construction file, CE declaration). */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Engineering",
  recordNoun: "ECR",
  owner: "L. Brandt",
  ownerInitials: "LB",
  participants: ["AC", "ME", "+1"],
  participantsLabel: "Ana Costa, Michael Evans and Quality",
  recordKicker: "ENGINEERING CHANGE",
  context: {
    initials: "LB",
    name: "L. Brandt",
    time: "13:20",
    message: "Guarding revision needed on the infeed before FAT.",
    detail: "Build-to-order · before FAT",
  },
  inboxNeighbors: [
    { title: "Factory acceptance test", time: "14:00", detail: "Customer witness on site", kind: "Milestone" },
    { title: "IQ protocol", time: "Yesterday", detail: "Qualification package · punch item", kind: "Document" },
    { title: "Site acceptance test", time: "Mon", detail: "Next on the customer's clock", kind: "Milestone" },
  ],
  checklistTitle: "Engineering change",
  checklistSections: [
    {
      title: "CHANGE REQUEST",
      items: [
        { label: "Reason for change", kind: "field", value: "Guarding revised on the infeed" },
        { label: "Machine", note: "Packaging line · this build" },
        { label: "Customer", note: "Notified before FAT" },
      ],
    },
    {
      title: "QUALIFICATION IMPACT",
      items: [
        { label: "Risk assessment", note: "ISO 12100 · Compliance" },
        { label: "IQ / OQ protocol", note: "Qualification" },
        { label: "Technical construction file", note: "CE declaration" },
      ],
    },
    {
      title: "APPROVAL",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "A. Costa", state: "Approved" },
        { label: "Change approval", kind: "approval", signer: "M. Evans", state: "Signed" },
        { label: "Audit trail", note: "Sealed · technical construction file" },
      ],
    },
  ],
};

const step = onRecord({ type: "ECR", id: "ECR-4417", title: "Packaging line · guarding change", world: WORLD });

export const INDUSTRIAL_MACHINERY_JOURNEY = cast(
  ["Engineering", "Unifize", "Compliance", "Program Management", "Unifize"],
  [
  step(1.45, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the engineering change",
    eventDetail: "Reason, machine and customer on one record",
    focus: "print",
    focusTitle: "Change request",
    focusRows: [],
    focusAction: "Submit for impact",
    ownershipNote: "One record from the first request",
    checklistOpen: "CHANGE REQUEST",
    checklistProgress: { "CHANGE REQUEST": 3, "QUALIFICATION IMPACT": 0, APPROVAL: 0 },
    checklistFootnote: "Raised before FAT",
  }),
  step(1.25, {
    ghost: "Bind",
    status: "Open",
    actor: "automator",
    event: "Bound the qualification impact to the change",
    eventDetail: "What the customer's auditor and the TCF will ask for",
    focus: "trace",
    checklistItems: [
      "Risk assessment · ISO 12100",
      "IQ / OQ protocol · qualification package",
      "Technical construction file · CE declaration",
    ],
    focusTitle: "Qualification impact bound",
    focusRows: ["Everything the change touches", "3 records linked"],
    ownershipNote: "Scoped by rule, not by memory",
    checklistOpen: "QUALIFICATION IMPACT",
    checklistProgress: { "QUALIFICATION IMPACT": 1, APPROVAL: 0 },
    related: 3,
  }),
  step(1.3, {
    ghost: "Update",
    status: "Implementation",
    actor: "Unifize Assistant",
    event: "Assigned the updates across Quality and Compliance",
    eventDetail: "Each with an owner and a due date · done before the customer witnesses FAT",
    focus: "tasks",
    focusTitle: "Qualification updates",
    focusRows: ["Risk assessment updated · A. Costa", "IQ / OQ protocol revised · R. Singh", "TCF section updated · A. Costa"],
    ownershipNote: "No punch item at FAT",
    checklistOpen: "QUALIFICATION IMPACT",
    checklistProgress: { "QUALIFICATION IMPACT": 2, APPROVAL: 0 },
  }),
  step(1.15, {
    ghost: "Sign",
    status: "Needs Approval",
    actor: "You",
    event: "Re-authenticated to approve the change",
    eventDetail: "Signer, meaning and time seal to ECR-4417",
    focus: "signature",
    focusTitle: "Apply your signature",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified",
    signKicker: "AUDITABLE E-SIGNATURE",
    world: { ...WORLD, viewer: "M. Evans", viewerInitials: "ME" },
    checklistOpen: "APPROVAL",
    checklistProgress: { APPROVAL: 1 },
    signedItems: [{ name: "A. Costa", initials: "AC", role: "Cross-functional review", approvalId: "6A93F4417B20", time: "Sep 15" }],
  }),
  step(1, {
    ghost: "Seal",
    status: "Approved",
    actor: "automator",
    event: "Released the change and sealed it to the TCF",
    eventDetail: "Risk assessment, qualification and approval on one record · CE declaration",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["ECR-4417 · Approved · trace sealed", "Technical construction file · current", "IQ / OQ package · complete for FAT"],
    ownershipNote: "Reconstructable for the customer's auditor",
    checklistOpen: "APPROVAL",
    signedItems: [{ name: "M. Evans", initials: "ME", role: "Change approval", approvalId: "1C47D4417E68", time: "Now" }],
    related: 3,
  }),
],
);
