/* 01 · the cosmetics journey (24 Sep 2026): a formula change on the hero's
 * leave-on face cream, as FRM-1180. Poses: the formula revision itself →
 * the safety substantiation it reopens, bound (the hero's file tiles) →
 * the retests running across R&D and QC → the Responsible Person's
 * e-signature → the sealed trace with the PIF current. Vocabulary from the
 * Notion row (safety substantiation, PIF, Responsible Person, MoCRA,
 * ISO 22716).
 * 24 Sep 2026, the page's one story: FRM-1180 brings in the revised
 * preservative, and the hero's missing COA is that preservative's lot, so
 * the retailer audit, the held batch, the PIF and the adverse-event check
 * below all play the same face cream. Cast, one role per name:
 *   C. Laurent  Formulation R&D, raised FRM-1180
 *   P. Nair     Regulatory, PIF and MoCRA listing
 *   J. Weber    Product Safety, signs the formula (safety assessor)
 *   I. Rossi    QC, microbiological limits
 *   A. Ferreira Quality, the retailer audit file
 *   G. Alvarez  Plant operations, the held batch */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Formulation R&D",
  recordNoun: "Formula change",
  owner: "C. Laurent",
  ownerInitials: "CL",
  participants: ["PN", "JW", "+1"],
  participantsLabel: "Priyanka Nair, Julia Weber and QC",
  recordKicker: "FORMULA CHANGE",
  context: {
    initials: "CL",
    name: "C. Laurent",
    time: "11:10",
    message: "Preservative system revision proposed for the face cream.",
    detail: "Leave-on · one SKU · substantiation to reopen",
  },
  inboxNeighbors: [
    { title: "Retailer audit request", time: "11:45", detail: "Safety substantiation file", kind: "Audit" },
    { title: "Preservative COA", time: "Yesterday", detail: "Supplier QA · first lot of the revised system", kind: "Supplier" },
    { title: "Serious adverse event", time: "Mon", detail: "15 business days to FDA · MoCRA", kind: "Safety" },
  ],
  checklistTitle: "Formula change",
  checklistSections: [
    {
      title: "CHANGE",
      items: [
        { label: "Formula", kind: "revision", from: "Current preservative system", to: "Revised preservative system" },
        { label: "Reason for change", kind: "field", input: "rich", value: "Preservative system revised" },
        { label: "SKU", note: "Leave-on face cream" },
      ],
    },
    {
      title: "SUBSTANTIATION",
      items: [
        { label: "Stability", note: "R&D" },
        { label: "Preservative challenge", note: "R&D" },
        { label: "Microbiological limits", note: "QC" },
        { label: "Hazard analysis · CIR", note: "Safety" },
      ],
    },
    {
      title: "APPROVAL",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "P. Nair", state: "Approved" },
        { label: "Formula approval", kind: "approval", signer: "J. Weber", state: "Signed" },
        { label: "Product Information File", note: "Current for this SKU" },
      ],
    },
  ],
};

const step = onRecord({ type: "Formula change", id: "FRM-1180", title: "Face cream · preservative system", world: WORLD });

export const COSMETICS_JOURNEY = cast(
  ["R&D", "Unifize", "Regulatory", "Product Safety", "Unifize"],
  [
  step(1.35, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the formula change",
    eventDetail: "The revision, the reason and the SKU on one record",
    focus: "diff",
    focusKicker: "FORMULA REVISION",
    focusAction: "Preservative system",
    focusTitle: "Formula revision",
    focusRows: ["Current preservative system", "Revised preservative system", "Leave-on face cream · substantiation to reopen"],
    ownershipNote: "The change is the record",
    checklistOpen: "CHANGE",
    checklistProgress: { CHANGE: 2, SUBSTANTIATION: 0, APPROVAL: 0 },
  }),
  step(1.25, {
    ghost: "Bind",
    status: "Open",
    actor: "automator",
    event: "Bound the safety substantiation to the change",
    eventDetail: "Every piece of evidence the revision reopens, on one record",
    focus: "trace",
    checklistItems: ["Stability · R&D", "Preservative challenge · R&D", "Microbiological limits · QC", "Hazard analysis · CIR · Safety"],
    focusTitle: "Substantiation bound",
    focusRows: ["What the claim rests on", "4 pieces of evidence"],
    ownershipNote: "Scoped by rule, not by memory",
    checklistOpen: "SUBSTANTIATION",
    checklistProgress: { SUBSTANTIATION: 1, APPROVAL: 0 },
    related: 4,
  }),
  step(1.3, {
    ghost: "Retest",
    status: "Implementation",
    actor: "Unifize Assistant",
    event: "Assigned the retests across R&D and QC",
    eventDetail: "Each with an owner and a due date · results land on the change",
    focus: "tasks",
    focusTitle: "Substantiation retests",
    focusRows: ["Stability · C. Laurent", "Preservative challenge · C. Laurent", "Microbiological limits · I. Rossi"],
    ownershipNote: "Evidence arrives where the decision is",
    checklistOpen: "SUBSTANTIATION",
    checklistProgress: { SUBSTANTIATION: 2, APPROVAL: 0 },
  }),
  step(1.15, {
    ghost: "Sign",
    status: "Needs Approval",
    actor: "You",
    event: "Re-authenticated to approve the formula change",
    eventDetail: "Signer, meaning and time seal to FRM-1180",
    focus: "signature",
    focusTitle: "Apply your signature",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified",
    signKicker: "E-SIGNATURE · ISO 22716",
    world: { ...WORLD, viewer: "J. Weber", viewerInitials: "JW" },
    checklistOpen: "APPROVAL",
    checklistProgress: { APPROVAL: 1 },
    signedItems: [{ name: "P. Nair", initials: "PN", role: "Cross-functional review", approvalId: "2C85A1180B36", time: "Sep 13" }],
  }),
  step(1, {
    ghost: "Seal",
    status: "Approved",
    actor: "automator",
    event: "Released the formula and sealed the trace",
    eventDetail: "Revision, substantiation and J. Weber's approval on one record",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["FRM-1180 · Approved · trace sealed", "Safety substantiation · complete", "PIF · current for this SKU"],
    ownershipNote: "Ready for the retailer audit",
    checklistOpen: "APPROVAL",
    signedItems: [{ name: "J. Weber", initials: "JW", role: "Formula approval", approvalId: "7E19D1180C04", time: "Now" }],
    related: 4,
  }),
],
);
