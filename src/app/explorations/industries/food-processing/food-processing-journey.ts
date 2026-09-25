/* 01 · the food journey (24 Sep 2026): the supplier's undeclared-allergen
 * notice the hero traces forward, as corrective action CA-3180. Poses: the
 * deviation typed from the notice → the trace's runs and finished lots
 * linked to it (root cause at the allergen control) → the corrective
 * actions running across Food Safety and Ops → the verification signature
 * → the sealed trace. Vocabulary from the Notion row (HACCP, CCP, allergen
 * control, Reportable Food Registry, FSMA 21 CFR 117).
 * 24 Sep 2026, the page's one story: every section below plays CA-3180
 * (the held lots, the letter of guarantee accepted alone at receiving, the
 * allergen statement and hazard analysis the ingredient change reopens,
 * the line 2 swabs, the recall scope). Cast, one role per name:
 *   M. Silva    Production, raised CA-3180
 *   A. Khan     Food Safety (PCQI), owns the corrective actions
 *   B. Carter   Quality, signs the verification
 *   J. Ortiz    Operations, the held lots
 *   T. Nguyen   Label compliance
 *   E. Brooks   GFSI audit */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Food Safety",
  recordNoun: "Corrective action",
  owner: "M. Silva",
  ownerInitials: "MS",
  participants: ["AK", "BC", "+1"],
  participantsLabel: "Aisha Khan, Ben Carter and operations",
  recordKicker: "CORRECTIVE ACTION",
  context: {
    initials: "MS",
    name: "M. Silva",
    time: "06:50",
    message: "Supplier notice: undeclared allergen in one ingredient lot.",
    detail: "Ingredient lot in use · runs on line 1 and line 2",
  },
  inboxNeighbors: [
    { title: "Reportable Food Registry", time: "07:15", detail: "Decision pending scope", kind: "Regulatory" },
    { title: "Mock recall", time: "Yesterday", detail: "Traceback evidence due", kind: "Audit" },
    { title: "Allergen changeover · line 2", time: "Mon", detail: "Verification record", kind: "HACCP" },
  ],
  checklistTitle: "Corrective action",
  checklistSections: [
    {
      title: "DEVIATION",
      items: [
        { label: "Description", kind: "field", input: "rich", value: "Undeclared allergen in a received ingredient lot" },
        { label: "Source", note: "Supplier notice" },
        { label: "Hazard", kind: "field", input: "select", value: "Allergen · CCP" },
      ],
    },
    {
      title: "ROOT CAUSE",
      items: [
        { label: "Traced lots", kind: "linked", links: ["Ingredient lot"] },
        { label: "Root cause", note: "Letter of guarantee accepted alone at receiving" },
      ],
    },
    {
      title: "CORRECTIVE ACTION",
      items: [
        { label: "Finished lots on hold", note: "Warehouse and customer DC" },
        { label: "Supplier corrective action", note: "Requested" },
        { label: "Receiving check updated", note: "Food safety plan" },
      ],
    },
    {
      title: "VERIFICATION",
      items: [
        { label: "Verification", kind: "approval", signer: "B. Carter", state: "Signed" },
        { label: "Audit trail", note: "Sealed · FSMA 21 CFR 117" },
      ],
    },
  ],
};

const step = onRecord({ type: "Corrective action", id: "CA-3180", title: "Undeclared allergen · ingredient lot", world: WORLD });

export const FOOD_PROCESSING_JOURNEY = cast(
  ["Production", "Unifize", "Food Safety", "Quality", "Unifize"],
  [
  step(1.4, {
    ghost: "Raise",
    status: "Draft",
    actor: "You",
    event: "Raised the deviation from the supplier notice",
    eventDetail: "The ingredient lot, its hazard and its source on one record",
    focus: "checklist",
    focusTitle: "Deviation",
    focusRows: [],
    ownershipNote: "Raised the hour the notice landed",
    checklistOpen: "DEVIATION",
    checklistEntry: { section: "DEVIATION", item: "Description" },
    checklistProgress: { DEVIATION: 2, "ROOT CAUSE": 0, "CORRECTIVE ACTION": 0, VERIFICATION: 0 },
  }),
  step(1.3, {
    ghost: "Trace",
    status: "Open",
    actor: "automator",
    event: "Linked every lot the ingredient reached",
    eventDetail: "Two production runs, three finished lots · root cause at the allergen control",
    focus: "checklist",
    focusTitle: "Root cause",
    focusRows: [],
    ownershipNote: "Traced forward, not rebuilt by hand",
    checklistOpen: "ROOT CAUSE",
    checklistLinks: {
      section: "ROOT CAUSE",
      item: "Traced lots",
      links: ["Ingredient lot", "Run · Line 1", "Run · Line 2"],
      records: [
        { id: "Run · Line 1", title: "Two finished lots · in warehouse", state: "On Hold" },
        { id: "Run · Line 2", title: "One finished lot · at customer DC", state: "On Hold" },
      ],
    },
    checklistProgress: { "ROOT CAUSE": 2, "CORRECTIVE ACTION": 0, VERIFICATION: 0 },
    related: 3,
  }),
  step(1.3, {
    ghost: "Correct",
    status: "Implementation",
    actor: "Unifize Assistant",
    event: "Assigned the corrective actions across Food Safety and Ops",
    eventDetail: "Each action with an owner and a due date, tracked on the record",
    focus: "tasks",
    focusTitle: "Corrective actions",
    focusRows: ["Finished lots on hold · J. Ortiz", "Supplier corrective action · A. Khan", "Receiving check updated · A. Khan"],
    ownershipNote: "The actions stay on the record",
    checklistOpen: "CORRECTIVE ACTION",
    checklistProgress: { "CORRECTIVE ACTION": 2, VERIFICATION: 0 },
  }),
  step(1.15, {
    ghost: "Verify",
    status: "Needs Approval",
    actor: "You",
    event: "Re-authenticated to verify the corrective action",
    eventDetail: "Signer, meaning and time seal to CA-3180",
    focus: "signature",
    focusTitle: "Verify and approve",
    focusRows: [],
    focusAction: "Confirm and sign",
    ownershipNote: "Identity re-verified",
    signKicker: "E-SIGNATURE · FSMA 21 CFR 117",
    world: { ...WORLD, viewer: "B. Carter", viewerInitials: "BC" },
    checklistOpen: "VERIFICATION",
    checklistProgress: { VERIFICATION: 0 },
  }),
  step(1, {
    ghost: "Seal",
    status: "Completed",
    actor: "automator",
    event: "Verified the corrective action and sealed the trace",
    eventDetail: "Notice, trace, holds and verification on one record · FSMA 21 CFR 117",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["CA-3180 · Verified · trace sealed", "Finished lots · contained", "Traceback · on record for the auditor"],
    ownershipNote: "Reconstructable at audit",
    checklistOpen: "VERIFICATION",
    signedItems: [{ name: "B. Carter", initials: "BC", role: "Verification", approvalId: "6B23E3180D57", time: "Now" }],
    related: 3,
  }),
],
);
