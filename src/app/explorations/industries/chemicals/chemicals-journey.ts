/* 01 · the chemicals journey (24 Sep 2026): the hero's raw material
 * substitution (one component to a new supplier), as change ECN-2210.
 * Poses: the change request → Unifize AI's "What else does this change
 * affect?" answering with the SDS, the REACH dossier and the customer
 * notice, a person adding them (the product's real flow, Beta) → the
 * Quality and EHS review → the e-signature → the sealed trace. Vocabulary
 * from the Notion row (REACH, SDS, GHS, MOC, customer change notification). */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const IMPACTED = [
  { id: "SDS", title: "Safety data sheet", why: "Hazards to re-check" },
  { id: "REACH", title: "REACH dossier", why: "Registration to check" },
  { id: "Notice", title: "Customer notice", why: "Pharma customers" },
];

const WORLD: ArcadeFlowWorld = {
  team: "Process Engineering",
  recordNoun: "Change",
  owner: "K. Watanabe",
  ownerInitials: "KW",
  participants: ["NP", "OH", "+1"],
  participantsLabel: "Nadia Petrova, Omar Haddad and Regulatory",
  recordKicker: "FORMULATION CHANGE",
  context: {
    initials: "KW",
    name: "K. Watanabe",
    time: "09:30",
    message: "Supplier change notification on the solvent.",
    detail: "Raw material substitution · new supplier",
  },
  inboxNeighbors: [
    { title: "Management of change", time: "10:02", detail: "OSHA PSM · 29 CFR 1910.119", kind: "Process safety" },
    { title: "SDS controlled distribution", time: "Yesterday", detail: "Confirmation of receipt · sites", kind: "Document" },
    { title: "Supplier qualification", time: "Mon", detail: "New solvent supplier", kind: "Supplier" },
  ],
  checklistTitle: "Change",
  checklistSections: [
    {
      title: "CHANGE REQUEST",
      items: [
        { label: "Reason for change", kind: "field", value: "Solvent moves to a new supplier" },
        { label: "Component", kind: "revision", from: "Current supplier", to: "New supplier" },
        { label: "Formulation", note: "Composition unchanged" },
      ],
    },
    {
      title: "IMPACT ASSESSMENT",
      items: [
        { label: "Affected records", kind: "linked", links: [] },
        { label: "Assess what this touches", kind: "ask", value: "What else does this change affect?", note: "Beta" },
      ],
    },
    {
      title: "APPROVAL",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "N. Petrova", state: "Approved" },
        { label: "Change approval", kind: "approval", signer: "O. Haddad", state: "Signed" },
        { label: "Audit trail", note: "Sealed · change control" },
      ],
    },
  ],
};

const step = onRecord({ type: "Change", id: "ECN-2210", title: "Raw material substitution", world: WORLD });

export const CHEMICALS_JOURNEY = cast(
  ["Process Engineering", "Unifize", "EHS", "Quality", "Unifize"],
  [
  step(1.45, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the change from the supplier notification",
    eventDetail: "The component, the old and new supplier, and the reason on one record",
    focus: "print",
    focusTitle: "Change request",
    focusRows: [],
    focusAction: "Submit for assessment",
    ownershipNote: "One record from the first notice",
    checklistOpen: "CHANGE REQUEST",
    checklistProgress: { "CHANGE REQUEST": 3, "IMPACT ASSESSMENT": 0, APPROVAL: 0 },
    checklistFootnote: "Raised from the supplier notice",
  }),
  step(1.2, {
    ghost: "Impact",
    status: "Open",
    actor: "Unifize Assistant",
    event: "Three records still depend on the old supplier",
    eventDetail: "Ticked and added by K. Watanabe · linked to this change as records",
    focus: "assist",
    poseVariant: "linked",
    focusTitle: "Impact assessment",
    focusRows: IMPACTED.map((r) => `${r.id} · ${r.title}`),
    ownershipNote: "Suggested by AI, added by a person",
    checklistOpen: "IMPACT ASSESSMENT",
    checklistReads: { section: "CHANGE REQUEST", items: ["Reason for change"] },
    checklistLinks: {
      section: "IMPACT ASSESSMENT",
      item: "Affected records",
      links: IMPACTED.map((r) => r.id),
      records: IMPACTED.map((r) => ({ id: r.id, title: r.title, state: "Open" })),
    },
    checklistProgress: { "IMPACT ASSESSMENT": 2, APPROVAL: 0 },
    related: 3,
    assist: {
      kicker: "UNIFIZE AI · BETA",
      prompt: "What else does this change affect?",
      read: ["Reason for change", "Component"],
      suggested: IMPACTED.map((r) => ({ ...r, picked: true })),
      action: "Add to checklist",
      alt: "Dismiss",
      pressed: true,
    },
  }),
  step(1.3, {
    ghost: "Review",
    status: "In Review",
    actor: "Unifize Assistant",
    event: "Assembled the Quality and EHS review",
    eventDetail: "Hazards re-checked against the new supplier's data · one thread",
    focus: "review",
    focusTitle: "Cross-functional review",
    focusRows: ["Quality · Approved", "EHS · SDS hazards re-checked", "Regulatory · REACH registration current"],
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
    event: "Re-authenticated to approve the change",
    eventDetail: "Signer, meaning and time seal to ECN-2210",
    focus: "signature",
    focusTitle: "Apply your signature",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified",
    signKicker: "E-SIGNATURE · CHANGE CONTROL",
    world: { ...WORLD, viewer: "O. Haddad", viewerInitials: "OH" },
    checklistOpen: "APPROVAL",
    checklistProgress: { APPROVAL: 1 },
    signedItems: [{ name: "N. Petrova", initials: "NP", role: "Cross-functional review", approvalId: "4D66B2210A15", time: "Sep 14" }],
  }),
  step(1, {
    ghost: "Seal",
    status: "Approved",
    actor: "automator",
    event: "Released the change and sealed the trace",
    eventDetail: "New SDS to sites and customers · REACH dossier current · customers notified",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["ECN-2210 · Approved · trace sealed", "SDS revised · distribution confirmed", "REACH dossier · current with the change"],
    ownershipNote: "Reconstructable at audit",
    checklistOpen: "APPROVAL",
    signedItems: [{ name: "O. Haddad", initials: "OH", role: "Change approval", approvalId: "9A40C2210E72", time: "Now" }],
    related: 3,
  }),
],
);
