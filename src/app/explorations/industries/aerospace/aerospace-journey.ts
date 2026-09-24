/* 01 · the aerospace journey (24 Sep 2026): an engineering change on the
 * hero's machined bracket, ECO-3180, and the first-article work it
 * reopens. Poses: the change typed on the record → the configuration and
 * AS9102 impact bound (delta FAI, special-process flow-down) → the Quality
 * and Program review → the Design Authority's e-signature → the sealed
 * trace. Vocabulary from the Notion row (configuration management, AS9102
 * FAI, NADCAP, flow-down, AS9100). */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Engineering",
  recordNoun: "Engineering change",
  owner: "E. Walsh",
  ownerInitials: "EW",
  participants: ["RK", "PF", "+1"],
  participantsLabel: "Rachel Kim, Paul Fischer and Program",
  recordKicker: "ENGINEERING CHANGE",
  context: {
    initials: "EW",
    name: "E. Walsh",
    time: "08:05",
    message: "Drawing revision proposed on the machined bracket.",
    detail: "Configuration baseline · first article on file",
  },
  inboxNeighbors: [
    { title: "Customer source inspection", time: "09:30", detail: "Production held until the FAI closes", kind: "Inspection" },
    { title: "NADCAP certificate", time: "Yesterday", detail: "Special process · heat treat", kind: "Supplier" },
    { title: "MRB disposition", time: "Mon", detail: "Key characteristic · rework", kind: "Nonconformance" },
  ],
  checklistTitle: "Engineering change",
  checklistSections: [
    {
      title: "CHANGE",
      items: [
        { label: "Reason for change", kind: "field", value: "Drawing revision on a key characteristic" },
        { label: "Part", note: "Machined bracket · current configuration" },
        { label: "Drawing", kind: "revision", from: "Current revision", to: "New revision" },
      ],
    },
    {
      title: "CONFIGURATION & FAI",
      items: [
        { label: "Configuration baseline", note: "Updated on approval" },
        { label: "Delta FAI · AS9102", note: "Form 3 characteristics" },
        { label: "Special process flow-down", note: "Heat treat supplier" },
      ],
    },
    {
      title: "APPROVAL",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "R. Kim", state: "Approved" },
        { label: "Design approval", kind: "approval", signer: "P. Fischer", state: "Signed" },
        { label: "Audit trail", note: "Sealed · AS9100" },
      ],
    },
  ],
};

const step = onRecord({ type: "Engineering change", id: "ECO-3180", title: "Machined bracket · drawing change", world: WORLD });

export const AEROSPACE_JOURNEY = cast(
  ["Engineering", "Unifize", "Quality", "Design Engineering", "Unifize"],
  [
  step(1.4, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the engineering change",
    eventDetail: "The drawing, the part and the reason on one record",
    focus: "checklist",
    focusTitle: "Change",
    focusRows: [],
    ownershipNote: "One record from the first redline",
    checklistOpen: "CHANGE",
    checklistEntry: { section: "CHANGE", item: "Reason for change" },
    checklistProgress: { CHANGE: 2, "CONFIGURATION & FAI": 0, APPROVAL: 0 },
  }),
  step(1.25, {
    ghost: "Bind",
    status: "Open",
    actor: "automator",
    event: "Bound the configuration and first-article impact",
    eventDetail: "What the new revision reopens, from baseline to supplier",
    focus: "trace",
    checklistItems: [
      "Configuration baseline · machined bracket",
      "Delta FAI · AS9102 Form 3",
      "Heat treat · flowed down to the supplier",
    ],
    focusTitle: "Configuration & FAI bound",
    focusRows: ["Everything the change touches", "3 records linked"],
    ownershipNote: "Scoped by rule, not by memory",
    checklistOpen: "CONFIGURATION & FAI",
    checklistProgress: { "CONFIGURATION & FAI": 2, APPROVAL: 0 },
    related: 3,
  }),
  step(1.3, {
    ghost: "Review",
    status: "In Review",
    actor: "Unifize Assistant",
    event: "Assembled the Quality and Program review",
    eventDetail: "Delta FAI plan and delivery impact on one thread",
    focus: "review",
    focusTitle: "Cross-functional review",
    focusRows: ["Quality · delta FAI planned", "Program · delivery impact assessed", "Supplier · flow-down confirmed"],
    focusAction: "Approve change",
    focusAlts: ["Return with comment"],
    ownershipNote: "Each function's call stays on the record",
    checklistOpen: "APPROVAL",
    checklistProgress: { APPROVAL: 1 },
  }),
  step(1.15, {
    ghost: "Sign",
    status: "Needs Approval",
    actor: "You",
    event: "Re-authenticated to approve the design change",
    eventDetail: "Signer, meaning and time seal to ECO-3180",
    focus: "signature",
    focusTitle: "Apply your signature",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified",
    signKicker: "E-SIGNATURE · AS9100",
    world: { ...WORLD, viewer: "P. Fischer", viewerInitials: "PF" },
    checklistOpen: "APPROVAL",
    checklistProgress: { APPROVAL: 1 },
    signedItems: [{ name: "R. Kim", initials: "RK", role: "Cross-functional review", approvalId: "3B71C3180E46", time: "Sep 15" }],
  }),
  step(1, {
    ghost: "Seal",
    status: "Approved",
    actor: "automator",
    event: "Released the change and sealed the trace",
    eventDetail: "Configuration and first-article impact attached · AS9100",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["ECO-3180 · Approved · trace sealed", "Configuration baseline · new revision", "Delta FAI · open for the next build"],
    ownershipNote: "Reconstructable at the customer audit",
    checklistOpen: "APPROVAL",
    signedItems: [{ name: "P. Fischer", initials: "PF", role: "Change approval", approvalId: "8E14A3180D95", time: "Now" }],
    related: 3,
  }),
],
);
