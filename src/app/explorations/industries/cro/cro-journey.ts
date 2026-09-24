/* 01 · the CRO journey (24 Sep 2026): the important protocol deviation the
 * hero's multi-sponsor board lands in Sponsor B's Study 03, as DEV-2087,
 * segregated to that study from the first entry. Poses: the deviation as a
 * study-scoped record → the investigation's links bound → the CAPA's
 * protocol retraining (the hero's GCP cascade) → the sponsor-ready review
 * that releases this study only → the sealed trace. Sponsor and study names
 * are the hero's placeholders, not customers. */
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";
import { cast, onRecord } from "../_shared/industry-journey";

const WORLD: ArcadeFlowWorld = {
  team: "Clinical Quality",
  recordNoun: "Protocol deviation",
  owner: "M. Chen",
  ownerInitials: "MC",
  participants: ["DO", "SM", "+2"],
  participantsLabel: "Daniel Okafor, Sofia Marino and two others",
  recordKicker: "IMPORTANT PROTOCOL DEVIATION",
  context: {
    initials: "MC",
    name: "M. Chen",
    time: "09:20",
    message: "Monitoring visit: a protocol-required procedure was not performed.",
    detail: "Sponsor B · segregated to this study",
  },
  inboxNeighbors: [
    { title: "Sponsor B · Study 04", time: "11:02", detail: "Monitoring visit report filed", kind: "Study" },
    { title: "Sponsor A · Study 01", time: "Yesterday", detail: "eTMF completeness check", kind: "Study" },
    { title: "SAE follow-up", time: "Mon", detail: "Expedited safety-reporting window", kind: "Safety" },
  ],
  checklistTitle: "Protocol deviation",
  checklistSections: [
    {
      title: "DEVIATION",
      items: [
        { label: "Description", kind: "field", value: "Protocol-required procedure not performed" },
        { label: "Study", note: "Study 03 · Sponsor B" },
        { label: "Classification", kind: "field", value: "Important" },
      ],
    },
    {
      title: "INVESTIGATION",
      items: [
        { label: "Root cause analysis", note: "Clinical QA" },
        { label: "Evidence", kind: "linked", links: ["Study 03"] },
      ],
    },
    {
      title: "CAPA",
      items: [
        { label: "Protocol retraining", note: "Site staff · before the effective date" },
        { label: "Effectiveness check", note: "Clinical QA" },
        { label: "CAPA review", kind: "approval", signer: "D. Okafor", state: "Approved" },
      ],
    },
    {
      title: "SPONSOR REVIEW",
      items: [
        { label: "Sponsor-ready review", kind: "approval", signer: "S. Marino", state: "Released" },
        { label: "Filed to the eTMF", note: "Study 03 only · ICH E6(R2)" },
      ],
    },
  ],
};

const step = onRecord({ type: "Protocol deviation", id: "DEV-2087", title: "Study 03 · protocol deviation", world: WORLD });

export const CRO_JOURNEY = cast(
  ["Clinical Operations", "Unifize", "Clinical Quality", "Sponsor Relations", "Unifize"],
  [
  step(1.35, {
    ghost: "Raise",
    status: "Open",
    actor: "You",
    event: "Logged the deviation against Study 03",
    eventDetail: "Scoped to Sponsor B's study from the first entry · no other sponsor sees it",
    focus: "record",
    focusTitle: "Protocol deviation",
    focusRows: ["Study 03 · Sponsor B", "Classified important · ICH E6(R2)"],
    ownershipNote: "One study, one sponsor, one record",
    checklistOpen: "DEVIATION",
    checklistProgress: { DEVIATION: 3, INVESTIGATION: 0, CAPA: 0, "SPONSOR REVIEW": 0 },
  }),
  step(1.3, {
    ghost: "Bind",
    status: "Open",
    actor: "automator",
    event: "Bound the investigation's evidence to the deviation",
    eventDetail: "Monitoring report and site training record, from Study 03 only",
    focus: "checklist",
    focusTitle: "Investigation",
    focusRows: [],
    ownershipNote: "Evidence stays inside the study",
    checklistOpen: "INVESTIGATION",
    checklistLinks: {
      section: "INVESTIGATION",
      item: "Evidence",
      links: ["Study 03", "Monitoring report", "Site training"],
      records: [
        { id: "Monitoring report", title: "Study 03 · site visit", state: "Filed" },
        { id: "Site training", title: "Study 03 · protocol training", state: "Open" },
      ],
    },
    checklistProgress: { INVESTIGATION: 2, CAPA: 0, "SPONSOR REVIEW": 0 },
    related: 3,
  }),
  step(1.3, {
    ghost: "CAPA",
    status: "Implementation",
    actor: "Unifize Assistant",
    event: "D. Okafor approved the CAPA: protocol retraining",
    eventDetail: "Evidenced before the effective date · effectiveness check follows",
    focus: "training",
    focusKicker: "GCP RETRAINING",
    focusAction: "Protocol retraining assigned",
    focusTitle: "Protocol retraining",
    focusRows: ["Leah Grant · Site coordinator, Study 03", "Omar Siddiqui · Sub-investigator, Study 03", "Hana Sato · Clinical research associate, Study 03"],
    ownershipNote: "The CAPA stays on the deviation",
    checklistOpen: "CAPA",
    checklistProgress: { CAPA: 1, "SPONSOR REVIEW": 0 },
  }),
  step(1.3, {
    ghost: "Sponsor",
    status: "In Review",
    actor: "You",
    event: "Prepared the evidence for Sponsor B",
    eventDetail: "Root cause and effectiveness attached · the other sponsors' studies stay locked",
    focus: "review",
    focusTitle: "Sponsor-ready review",
    focusRows: [
      "Scope · Study 03, Sponsor B only",
      "Root cause · on the record",
      "CAPA · retraining evidenced",
    ],
    focusAction: "Release to Sponsor B",
    focusAlts: ["Return to D. Okafor"],
    ownershipNote: "Presentable to the sponsor whose study it is",
    world: { ...WORLD, viewer: "S. Marino", viewerInitials: "SM" },
    checklistOpen: "SPONSOR REVIEW",
    checklistProgress: { "SPONSOR REVIEW": 0 },
  }),
  step(1, {
    ghost: "Seal",
    status: "Completed",
    actor: "automator",
    event: "Filed to the eTMF and sealed the trace",
    eventDetail: "Deviation, root cause, CAPA and the sponsor release on one record · ICH E6(R2)",
    focus: "history",
    focusKicker: "DECISION TRACE",
    focusTitle: "One sealed decision trace",
    focusRows: ["DEV-2087 · Closed · trace sealed", "Sponsor B · evidence released", "eTMF · Study 03 current"],
    ownershipNote: "Reconstructable at a sponsor audit",
    checklistOpen: "SPONSOR REVIEW",
    signedItems: [{ name: "S. Marino", initials: "SM", role: "Sponsor-ready review", approvalId: "5A31C2087B44", time: "Now" }],
    related: 3,
  }),
],
);
