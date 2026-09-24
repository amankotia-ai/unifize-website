/* 01 · the automotive journey (24 Sep 2026): an engineering change request,
 * ECR-3180, through to the PPAP the customer approves. Poses: the change
 * request → the PFMEA, control plan and PSW linked to it → the APQP route
 * across Quality, Program and Manufacturing → Customer Quality's
 * e-signature on the PPAP → the sealed trace. Vocabulary from the Notion
 * row (APQP, PPAP, PSW, PFMEA, control plan, IATF 16949). */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Product Engineering",
  recordNoun: "ECR",
  owner: "M. Hoffmann",
  ownerInitials: "MH",
  participants: ["SL", "DB", "+2"],
  participantsLabel: "Sara Lindqvist, David Brooks and two others",
  recordKicker: "ENGINEERING CHANGE",
  context: {
    initials: "MH",
    name: "M. Hoffmann",
    time: "08:25",
    message: "Design change needed on a production part.",
    detail: "Design change · PPAP resubmission likely",
  },
  inboxNeighbors: [
    { title: "Customer 8D", time: "09:10", detail: "Field return · in the response window", kind: "Quality event" },
    { title: "Layered process audit", time: "Yesterday", detail: "Shift 2 · control plan check", kind: "Audit" },
    { title: "Supplier PPAP", time: "Mon", detail: "Sub-tier part · PSW pending", kind: "Supplier" },
  ],
  checklistTitle: "Engineering change",
  checklistSections: [
    {
      title: "CHANGE REQUEST",
      items: [
        { label: "Reason for change", kind: "field", value: "Design change on a production part" },
        { label: "Part", note: "Production part · current PPAP" },
        { label: "Customer notification", note: "Required under IATF 16949" },
      ],
    },
    {
      title: "IMPACT",
      items: [
        { label: "Linked records", kind: "linked", links: [] },
        { label: "Validation", note: "Dimensional and material results" },
      ],
    },
    {
      title: "APQP & PPAP",
      items: [
        { label: "APQP review", kind: "approval", signer: "S. Lindqvist", state: "Approved" },
        { label: "PPAP · PSW", kind: "approval", signer: "D. Brooks", state: "Approved" },
        { label: "Audit trail", note: "Sealed · IATF 16949" },
      ],
    },
  ],
};

const step = onRecord({ type: "ECR", id: "ECR-3180", title: "Engineering change · production part", world: WORLD });

export const AUTOMOTIVE_JOURNEY = cast(
  ["Engineering", "Unifize", "Quality", "Customer Quality", "Unifize"],
  [
  step(1.45, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the engineering change request",
    eventDetail: "Reason, part and customer notification captured on the record",
    focus: "print",
    focusTitle: "Change request",
    focusRows: [],
    focusAction: "Submit for impact",
    ownershipNote: "One record from the first request",
    checklistOpen: "CHANGE REQUEST",
    checklistProgress: { "CHANGE REQUEST": 2, IMPACT: 0, "APQP & PPAP": 0 },
    checklistFootnote: "Customer notification flagged",
  }),
  step(1.3, {
    ghost: "Bind",
    status: "Open",
    actor: "automator",
    event: "Linked the PFMEA, control plan and PSW to the change",
    eventDetail: "Every document the change touches, as records on the ECR",
    focus: "checklist",
    focusTitle: "Impact",
    focusRows: [],
    ownershipNote: "Scoped by rule, not by memory",
    checklistOpen: "IMPACT",
    checklistLinks: {
      section: "IMPACT",
      item: "Linked records",
      links: ["PFMEA", "Control plan", "PSW"],
      records: [
        { id: "PFMEA", title: "Failure modes to re-rate", state: "Open" },
        { id: "Control plan", title: "Characteristics to update", state: "Open" },
        { id: "PSW", title: "Part submission warrant", state: "Draft" },
      ],
    },
    checklistProgress: { IMPACT: 1, "APQP & PPAP": 0 },
    related: 3,
  }),
  step(1.3, {
    ghost: "Route",
    status: "In Review",
    actor: "Unifize Assistant",
    event: "Routed the change for APQP review",
    eventDetail: "Each function signs on the ECR · the PPAP goes with it",
    focus: "queue",
    poseVariant: "route",
    focusKicker: "APQP REVIEW",
    focusTitle: "Cross-functional review",
    focusRows: ["Sara Lindqvist · Quality · PFMEA and control plan", "Tom Reyes · Program · launch timing", "Jana Novak · Manufacturing · process change"],
    focusAction: "Send for review",
    ownershipNote: "One route, one record",
    checklistOpen: "APQP & PPAP",
    checklistProgress: { "APQP & PPAP": 0 },
  }),
  step(1.15, {
    ghost: "PPAP",
    status: "Needs Approval",
    actor: "You",
    event: "Re-authenticated to approve the PPAP",
    eventDetail: "Signer, meaning and time seal to ECR-3180",
    focus: "signature",
    focusTitle: "Approve the PSW",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified",
    signKicker: "E-SIGNATURE · IATF 16949",
    world: { ...WORLD, viewer: "D. Brooks", viewerInitials: "DB" },
    checklistOpen: "APQP & PPAP",
    checklistProgress: { "APQP & PPAP": 1 },
    signedItems: [{ name: "S. Lindqvist", initials: "SL", role: "APQP review", approvalId: "5F02E3180A83", time: "Sep 15" }],
  }),
  step(1, {
    ghost: "Seal",
    status: "Approved",
    actor: "automator",
    event: "Released the change and sealed the trace",
    eventDetail: "PFMEA, control plan and PPAP on one record · IATF 16949",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["ECR-3180 · Approved · trace sealed", "PPAP · approved by the customer", "Control plan · updated for every shift"],
    ownershipNote: "Reconstructable at the customer audit",
    checklistOpen: "APQP & PPAP",
    signedItems: [{ name: "D. Brooks", initials: "DB", role: "PPAP approval", approvalId: "0D58B3180F21", time: "Now" }],
    related: 3,
  }),
],
);
