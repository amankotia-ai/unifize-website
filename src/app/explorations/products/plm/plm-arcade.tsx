/* ----------------------------------------------------------------------------
 * plm-arcade.tsx - persistent-camera arcade journeys for the PLM page's
 * Notion-backed Product Flows (PF-34, PF-35, PF-36: the design record's arc
 * from a specification change through the control plan to a release with
 * the trace closed). Same staging recipe as the DMS and QMS journeys: one
 * app window, one world per record, the camera moves between poses and each
 * step's copy is the Notion Flow Step truth restaged, never invented
 * capability.
 * Fictional dataset: Engineering Industries, specification SPC-310 (seal
 * housing tolerance) revised after complaint CMP-341 - the same complaint
 * that drives CAPA-612 on the QMS page, so the pages tell one story.
 * People: E. Marsh (Design Engineer), A. Chen (Quality), T. Brandt (APQP
 * Engineer), S. Okafor (Engineering Manager), D. Fontaine (Quality Manager).
 * Server module, no state.
 * -------------------------------------------------------------------------- */

import {
  type ArcadeFlowWorld,
  type ArcadeStepConfig,
} from "../_shared/arcade/arcade";
import { type HeroArcadeStep } from "../_shared/arcade/hero-arcade";

/* ============================================================ PF-34 world
 * The specification under a controlled change: the trace, the risk, and the
 * cross-functional review live on the record. */
const SPEC_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Specification",
  owner: "E. Marsh",
  ownerInitials: "EM",
  participants: ["EM", "AC", "+3"],
  participantsLabel: "E. Marsh, A. Chen, and three others",
  recordKicker: "PRODUCT SPECIFICATION",
  context: {
    initials: "AC",
    name: "A. Chen",
    time: "09:03",
    message: "Change sponsor here; the complaint points at the seal fit.",
    detail: "CMP-341 linked · tolerance review requested",
  },
  inboxNeighbors: [
    { title: "FMEA review", time: "10:20", detail: "FMEA-88 · seal interface", kind: "Risk" },
    { title: "Design review", time: "09:40", detail: "DR-77 · scheduled window", kind: "Review" },
    { title: "Verification protocol", time: "Yesterday", detail: "VER-112 · seal fit test", kind: "Document" },
  ],
  checklistTitle: "Design Control",
  checklistSections: [
    {
      title: "REQUIREMENT TRACE",
      items: [
        { label: "Requirements linked", note: "REQ-041 · REQ-063" },
        { label: "Verification coverage", note: "VER-112 · VER-131" },
        { label: "Trace gaps", note: "None" },
      ],
    },
    {
      title: "RISK · FMEA",
      items: [
        { label: "Severity 6 · Occurrence 3", note: "Detection 4" },
        { label: "Current controls", note: "Linked from FMEA-88" },
        {
          label: "Residual risk",
          kind: "field",
          value: "Acceptable with mitigation · seal fit test added",
          note: "Entered on the assessment",
        },
      ],
    },
    {
      title: "CHANGE & RELEASE",
      items: [
        {
          label: "Tolerance revision",
          kind: "revision",
          from: "±0.10 mm · Rev B",
          to: "±0.05 mm · Rev C",
          note: "Rationale attached",
        },
        { label: "Design review", kind: "approval", signer: "S. Okafor", state: "3 of 3 signed", note: "Engineering · Quality · Regulatory" },
        { label: "Design history file", note: "Entry writes from the record" },
      ],
    },
  ],
};

/* ============================================================ PF-35 world
 * The process FMEA and its control plan as one record: the rescored risk,
 * the tightened plan, and the parameters that flow to the floor. */
const FMEA_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "FMEA",
  owner: "T. Brandt",
  ownerInitials: "TB",
  participants: ["TB", "EM", "SO"],
  participantsLabel: "T. Brandt, E. Marsh, and S. Okafor",
  recordKicker: "PROCESS FMEA",
  context: {
    initials: "EM",
    name: "E. Marsh",
    time: "10:20",
    message: "SPC-310 Rev C approved; the seal tolerance moved.",
    detail: "FMEA-88 · seal interface · rescore requested",
  },
  inboxNeighbors: [
    { title: "Specification", time: "09:58", detail: "SPC-310 · Rev C · approved", kind: "Specification" },
    { title: "Control plan", time: "Yesterday", detail: "CP-31 · coating step", kind: "Document" },
    { title: "Design review", time: "Yesterday", detail: "DR-77 · closed", kind: "Review" },
  ],
  checklistTitle: "FMEA & Control Plan",
  checklistSections: [
    {
      title: "RISK SCORING",
      items: [
        { label: "Failure mode · seal leak at fit", note: "Severity 6 · Occurrence 3 · Detection 4" },
        {
          label: "RPN",
          kind: "field",
          value: "144 · above the action threshold 120",
          note: "Rescored after SPC-310 Rev C",
        },
        { label: "Current controls", note: "Linked from CP-31, not remembered" },
      ],
    },
    {
      title: "CONTROL PLAN",
      items: [
        {
          label: "Detection point",
          kind: "revision",
          from: "Final leak test · per lot",
          to: "Seal fit check · per shift",
          note: "Moved upstream · rationale attached",
        },
        { label: "Failure mode link", note: "Each control carries the mode it mitigates" },
        { label: "Threshold review", note: "Escalated on the record" },
      ],
    },
    {
      title: "PARAMETERS & FLOW-DOWN",
      items: [
        { label: "Seal fit force · 12-18 N", note: "3 samples per lot · fixture 2" },
        { label: "Coating thickness · 45-55 µm", note: "Per shift" },
        { label: "Plan approval", kind: "approval", signer: "E. Marsh", state: "Signed", note: "Publishes to the traveller" },
      ],
    },
  ],
};

/* ============================================================ PF-36 world
 * Release readiness on the design record: coverage as it stands, the gap,
 * the assigned verification, and the release with the trace unbroken. */
const RELEASE_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Design Release",
  owner: "S. Okafor",
  ownerInitials: "SO",
  participants: ["SO", "EM", "AC"],
  participantsLabel: "S. Okafor, E. Marsh, and A. Chen",
  recordKicker: "DESIGN RELEASE",
  context: {
    initials: "AC",
    name: "A. Chen",
    time: "08:41",
    message: "Release review confirmed for Friday.",
    detail: "SPC-310 Rev C · DR-77 window · agenda on the record",
  },
  inboxNeighbors: [
    { title: "Specification", time: "09:58", detail: "SPC-310 · Rev C · approved", kind: "Specification" },
    { title: "Verification protocol", time: "Yesterday", detail: "VER-131 · seal fit test", kind: "Document" },
    { title: "FMEA review", time: "Yesterday", detail: "FMEA-88 · rescored", kind: "Risk" },
  ],
  reports: {
    title: "Release readiness · SPC-310 Rev C",
    kpis: [
      { label: "Requirements covered", value: "23 of 24" },
      { label: "Open verifications", value: "1", note: "VER-131" },
      { label: "Days to gate", value: "4" },
    ],
    panels: [
      { label: "Requirement coverage", kind: "bars" },
      { label: "Verification status", kind: "donut" },
      { label: "Coverage trend", kind: "lines" },
    ],
  },
  checklistTitle: "Release Readiness",
  checklistSections: [
    {
      title: "COVERAGE",
      items: [
        { label: "Requirements · 24 linked", note: "REQ-041 … REQ-064" },
        {
          label: "Uncovered requirement",
          kind: "field",
          value: "REQ-058 · no linked verification",
          note: "Surfaced by the trace, not by the review",
        },
        { label: "Outputs", note: "Each linked to the input it satisfies" },
      ],
    },
    {
      title: "VERIFICATION",
      items: [
        { label: "VER-131 · seal fit test", note: "E. Marsh · due Friday" },
        { label: "Protocol", note: "Attached to the task" },
        { label: "Result", note: "Links to REQ-058 on completion" },
      ],
    },
    {
      title: "RELEASE",
      items: [
        { label: "Release approval", kind: "approval", signer: "S. Okafor", state: "Signed", note: "Engineering · Quality · Regulatory" },
        { label: "Design history file", note: "Entry writes from the record" },
        { label: "Effective definition", note: "The floor builds to Rev C" },
      ],
    },
  ],
};

/* ============================================================ modules
 * The modules section as camera work: five module tabs, five poses on the
 * SAME specification record SPC-310 - the spec, its risk, its trace, its
 * parameters, and its control plan are one design record. One scene
 * instance; tab changes pan the camera. */
export const PLM_MODULE_ARCADE_CONFIGS: Record<string, ArcadeStepConfig> = {
  "product-specifications": {
    source: "PLM modules · the live trace",
    ghost: "Specify",
    type: "Specification",
    id: "#310",
    title: "Seal housing tolerance",
    status: "In Review",
    actor: "You",
    event: "Opened the specification with its trace linked",
    eventDetail: "Requirements and covering verifications on the record · no spreadsheet matrix",
    checklist: "REQUIREMENT TRACE",
    checklistItems: ["Requirements linked", "Verification coverage"],
    focus: "record",
    focusTitle: "The spec carries its trace",
    focusRows: ["Requirements · REQ-041, REQ-063", "Coverage · VER-112, VER-131 in view"],
    focusAction: "Scope the change",
    ownershipNote: "The change starts from the live trace",
    world: SPEC_WORLD,
    checklistOpen: "REQUIREMENT TRACE",
  },
  "product-risk-management": {
    source: "PLM modules · risk against controls",
    ghost: "Assess",
    type: "Specification",
    id: "#310",
    title: "Seal housing tolerance",
    status: "In Review",
    actor: "You",
    event: "Ran the risk assessment with FMEA-88 linked",
    eventDetail: "Judged against the current controls, not a copy on someone's drive",
    checklist: "RISK · FMEA",
    checklistItems: ["Severity · Occurrence", "Current controls"],
    focus: "review",
    focusTitle: "Risk evaluation · FMEA-88",
    focusRows: [
      "Severity 6 · Occurrence 3 · Detection 4",
      "Current controls · linked and in view",
      "Residual risk · acceptable with mitigation",
    ],
    focusAction: "Accept mitigation",
    focusAlts: ["Escalate risk"],
    ownershipNote: "ISO 14971 lives on the record",
    world: SPEC_WORLD,
    checklistOpen: "RISK · FMEA",
  },
  "design-controls-traceability": {
    source: "PLM modules · the trace closes itself",
    ghost: "Trace",
    type: "Specification",
    id: "#310",
    title: "Seal housing tolerance",
    status: "Approved",
    actor: "automator",
    event: "Verified the requirement-to-verification trace",
    eventDetail: "The design history file entry writes itself from the record",
    checklist: "REQUIREMENT TRACE",
    checklistItems: ["REQ-041 → SPC-310 Rev C → VER-112", "No orphaned requirement", "Design history file entry written"],
    focus: "trace",
    focusTitle: "Trace verified",
    focusRows: ["Where the auditor will look", "Release revision C"],
    focusAction: "Release revision C",
    ownershipNote: "No uncovered change ships",
    world: SPEC_WORLD,
    checklistOpen: "REQUIREMENT TRACE",
  },
  "inspection-process-parameters": {
    source: "PLM modules · parameters as structure",
    ghost: "Parameter",
    type: "Specification",
    id: "#310",
    title: "Seal housing tolerance",
    status: "In Review",
    actor: "You",
    event: "Defined the inspection and process parameters",
    eventDetail: "Structured fields with acceptance criteria · they flow to the traveller downstream",
    checklist: "REQUIREMENT TRACE",
    checklistItems: ["Parameters defined"],
    focus: "tasks",
    focusTitle: "Parameters, owned and bounded",
    focusRows: [
      "Coating thickness · 45-55 µm",
      "Seal fit force · 12-18 N",
      "Sampling · 3 per lot · fixture 2",
    ],
    focusAction: "Define parameters",
    ownershipNote: "What production measures is set here",
    world: SPEC_WORLD,
    checklistOpen: "REQUIREMENT TRACE",
  },
  "fmea-control-plan": {
    source: "PLM modules · plan from the FMEA",
    ghost: "Control",
    type: "Specification",
    id: "#310",
    title: "Seal housing tolerance",
    status: "In Review",
    actor: "You",
    event: "Tightened the control plan from the FMEA line items",
    eventDetail: "Detection moved upstream · the plan carries its rationale",
    checklist: "RISK · FMEA",
    checklistItems: ["Current controls"],
    focus: "diff",
    focusKicker: "CONTROL PLAN",
    focusTitle: "Detection, moved upstream",
    focusRows: [
      "Visual check · per shift",
      "Dimensional check · per lot · fixture 2",
      "Defined from FMEA-88 line items",
    ],
    focusAction: "Update control plan",
    ownershipNote: "The FMEA and the plan stay one record",
    world: SPEC_WORLD,
    checklistOpen: "RISK · FMEA",
  },
};

/* ============================================================ scenes
 * One entry per Notion flow id; one scene per Flow Step, in step order. */
export const PLM_ARCADE_FLOW_CONFIGS: Record<string, ArcadeStepConfig[]> = {
  /* -------- PF-34 · Design Engineer carries the spec change ------------- */
  "34": [
    {
      source: "PF-34 s1 · the live trace",
      ghost: "Trace",
      type: "Specification",
      id: "#310",
      title: "Seal housing tolerance",
      status: "In Review",
      actor: "You",
      event: "Opened the specification with its trace linked",
      eventDetail: "Requirements and covering verifications on the record · no spreadsheet matrix",
      checklist: "REQUIREMENT TRACE",
      checklistItems: ["Requirements linked", "Verification coverage"],
      focus: "record",
      focusTitle: "The change starts from the trace",
      focusRows: ["Requirements · REQ-041, REQ-063", "Coverage · VER-112, VER-131 in view"],
      focusAction: "Scope the change",
      ownershipNote: "Which requirements the change touches",
      world: SPEC_WORLD,
      checklistOpen: "REQUIREMENT TRACE",
      checklistProgress: { "REQUIREMENT TRACE": 2, "RISK · FMEA": 0, "CHANGE & RELEASE": 0 },
    },
    {
      source: "PF-34 s2 · risk against current controls",
      ghost: "Assess",
      type: "Specification",
      id: "#310",
      title: "Seal housing tolerance",
      status: "In Review",
      actor: "You",
      event: "Ran the risk assessment with FMEA-88 linked",
      eventDetail: "Judged against the current controls, not a copy on someone's drive",
      checklist: "RISK · FMEA",
      checklistItems: ["Severity · Occurrence", "Current controls"],
      focus: "review",
      focusTitle: "Risk evaluation · FMEA-88",
      focusRows: [
        "Severity 6 · Occurrence 3 · Detection 4",
        "Current controls · linked and in view",
        "Residual risk · acceptable with mitigation",
      ],
      focusAction: "Accept mitigation",
      focusAlts: ["Escalate risk"],
      ownershipNote: "A new mitigation would route back to FMEA",
      world: SPEC_WORLD,
      checklistOpen: "RISK · FMEA",
      checklistProgress: { "REQUIREMENT TRACE": 3, "RISK · FMEA": 2, "CHANGE & RELEASE": 0 },
    },
    {
      source: "PF-34 s3 · controlled revision",
      ghost: "Revise",
      type: "Specification",
      id: "#310",
      title: "Seal housing tolerance",
      status: "In Review",
      actor: "You",
      event: "Revised the tolerance as a controlled change",
      eventDetail: "Old and new side by side with the rationale · affected documents surfaced",
      checklist: "CHANGE & RELEASE",
      checklistItems: ["Tolerance revision"],
      focus: "diff",
      focusKicker: "SPECIFICATION CHANGE",
      focusTitle: "Revision C",
      focusRows: [
        "Tolerance ±0.10 mm · Rev B",
        "Tolerance ±0.05 mm · Rev C · rationale attached",
        "Affected documents surfaced automatically",
      ],
      focusAction: "Rev B → Rev C",
      ownershipNote: "The rationale carries the design review",
      world: SPEC_WORLD,
      checklistOpen: "CHANGE & RELEASE",
      checklistProgress: { "REQUIREMENT TRACE": 3, "RISK · FMEA": 3, "CHANGE & RELEASE": 1 },
    },
    {
      source: "PF-34 s4 · one structured review",
      ghost: "Route",
      type: "Specification",
      id: "#310",
      title: "Seal housing tolerance",
      status: "Needs Approval",
      actor: "You",
      event: "Routed the design review across functions",
      eventDetail: "Change, risk assessment, and trace in one package · no packet re-assembly per reviewer",
      checklist: "CHANGE & RELEASE",
      checklistItems: ["Design review"],
      focus: "queue",
      poseVariant: "route",
      focusKicker: "DESIGN REVIEW",
      focusTitle: "Signatures by classification",
      focusRows: [
        "S. Okafor · Engineering · required",
        "D. Fontaine · Quality · required",
        "N. Varga · Regulatory · classification-based",
      ],
      focusAction: "Route design review",
      ownershipNote: "Who signs is set by the change class",
      world: SPEC_WORLD,
      checklistProgress: { "REQUIREMENT TRACE": 3, "RISK · FMEA": 3, "CHANGE & RELEASE": 2 },
    },
    {
      source: "PF-34 s5 · the trace closes itself",
      ghost: "Verify",
      type: "Specification",
      id: "#310",
      title: "Seal housing tolerance",
      status: "Approved",
      actor: "automator",
      event: "Updated the trace and the design history file",
      eventDetail: "Verification evidence links where an auditor will look for it",
      checklist: "REQUIREMENT TRACE",
      checklistItems: ["REQ-041 → SPC-310 Rev C → VER-112", "No orphaned requirement", "Design history file entry written"],
      focus: "trace",
      focusTitle: "Trace verified",
      focusRows: ["Where the auditor will look", "Release revision C"],
      focusAction: "Release revision C",
      ownershipNote: "No uncovered change ships",
      world: SPEC_WORLD,
      checklistOpen: "REQUIREMENT TRACE",
      checklistProgress: { "REQUIREMENT TRACE": 3, "RISK · FMEA": 3, "CHANGE & RELEASE": 3 },
      related: 3,
    },
  ],

  /* -------- PF-35 · APQP Engineer builds the control plan --------------- */
  "35": [
    {
      source: "PF-35 s1 · the FMEA at the changed interface",
      ghost: "Open",
      type: "FMEA",
      id: "#88",
      title: "Seal interface · process FMEA",
      status: "In Review",
      actor: "You",
      event: "Opened FMEA-88 filtered to the SPC-310 line items",
      eventDetail: "Current controls linked on the record, not remembered",
      checklist: "RISK SCORING",
      checklistItems: ["Failure mode · seal leak at fit", "Current controls"],
      focus: "record",
      focusTitle: "The FMEA opens at the change",
      focusRows: ["Seal leak at fit · S6 · O3 · D4", "Controls linked from CP-31"],
      focusAction: "Rescore the change",
      ownershipNote: "Which failure modes the change moves",
      world: FMEA_WORLD,
      checklistOpen: "RISK SCORING",
      checklistProgress: { "RISK SCORING": 1, "CONTROL PLAN": 0, "PARAMETERS & FLOW-DOWN": 0 },
    },
    {
      source: "PF-35 s2 · over the action threshold",
      ghost: "Score",
      type: "FMEA",
      id: "#88",
      title: "Seal interface · process FMEA",
      status: "In Review",
      actor: "You",
      event: "Rescored the risk; one mode crossed the threshold",
      eventDetail: "Escalated to review on the record · not the next FMEA workshop",
      checklist: "RISK SCORING",
      checklistItems: ["Failure mode · seal leak at fit", "RPN", "Current controls"],
      focus: "review",
      focusTitle: "Risk evaluation · seal leak at fit",
      focusRows: [
        "Severity 6 · Occurrence 3 · Detection 4",
        "RPN · 144 · threshold 120",
        "Escalated to review on the record",
      ],
      focusAction: "Add a control",
      focusAlts: ["Accept current controls"],
      ownershipNote: "The threshold makes the call visible",
      world: FMEA_WORLD,
      checklistOpen: "RISK SCORING",
      checklistProgress: { "RISK SCORING": 3, "CONTROL PLAN": 0, "PARAMETERS & FLOW-DOWN": 0 },
    },
    {
      source: "PF-35 s3 · detection moved upstream",
      ghost: "Tighten",
      type: "FMEA",
      id: "#88",
      title: "Seal interface · process FMEA",
      status: "In Review",
      actor: "You",
      event: "Tightened the control plan from the FMEA line items",
      eventDetail: "Each control carries its rationale and the mode it mitigates",
      checklist: "CONTROL PLAN",
      checklistItems: ["Detection point", "Failure mode link"],
      focus: "diff",
      focusKicker: "CONTROL PLAN",
      focusTitle: "Detection, moved upstream",
      focusRows: [
        "Final leak test · per lot",
        "Seal fit check · per shift · fixture 2",
        "The FMEA and the plan stay one record",
      ],
      focusAction: "Update control plan",
      ownershipNote: "Detects the mode earliest at acceptable cost",
      world: FMEA_WORLD,
      checklistOpen: "CONTROL PLAN",
      checklistProgress: { "RISK SCORING": 3, "CONTROL PLAN": 2, "PARAMETERS & FLOW-DOWN": 0 },
    },
    {
      source: "PF-35 s4 · parameters as structure",
      ghost: "Define",
      type: "FMEA",
      id: "#88",
      title: "Seal interface · process FMEA",
      status: "In Review",
      actor: "You",
      event: "Defined the inspection and process parameters",
      eventDetail: "Limits and sampling rules tied to the characteristic they control",
      checklist: "PARAMETERS & FLOW-DOWN",
      checklistItems: ["Seal fit force · 12-18 N", "Coating thickness · 45-55 µm"],
      focus: "tasks",
      poseVariant: "plan",
      focusTitle: "Parameters, owned and bounded",
      focusRows: [
        "Seal fit force · 12-18 N · 3 per lot",
        "Coating thickness · 45-55 µm · per shift",
      ],
      focusAction: "Define parameters",
      ownershipNote: "Which characteristics need checks, at what frequency",
      world: FMEA_WORLD,
      checklistOpen: "PARAMETERS & FLOW-DOWN",
      checklistProgress: { "RISK SCORING": 3, "CONTROL PLAN": 3, "PARAMETERS & FLOW-DOWN": 2 },
    },
    {
      source: "PF-35 s5 · published to the floor",
      ghost: "Publish",
      type: "FMEA",
      id: "#88",
      title: "Seal interface · process FMEA",
      status: "Approved",
      actor: "automator",
      event: "Published the parameters to the traveller",
      eventDetail: "What production measures is exactly what the plan defines",
      checklist: "PARAMETERS & FLOW-DOWN",
      checklistItems: ["Seal fit force · 12-18 N · 3 per lot", "Coating thickness · 45-55 µm · per shift", "Flows to the traveller · station checklists"],
      focus: "trace",
      focusTitle: "Plan on the floor",
      focusRows: ["No re-keying between systems", "Governs the next run"],
      focusAction: "Publish to the floor",
      ownershipNote: "No re-keying between systems",
      world: FMEA_WORLD,
      checklistOpen: "PARAMETERS & FLOW-DOWN",
      checklistProgress: { "RISK SCORING": 3, "CONTROL PLAN": 3, "PARAMETERS & FLOW-DOWN": 3 },
      related: 2,
    },
  ],

  /* -------- PF-36 · Engineering Manager releases with the trace closed -- */
  "36": [
    {
      source: "PF-36 s1 · coverage as it stands",
      ghost: "Open",
      type: "Design Release",
      id: "#310",
      title: "SPC-310 · seal housing · Rev C",
      status: "In Review",
      actor: "automator",
      event: "Release readiness assembled from the record",
      eventDetail: "Not a spreadsheet built the week before the gate",
      checklist: "COVERAGE",
      checklistItems: ["Requirements · 24 linked", "Outputs"],
      focus: "dashboard",
      focusTitle: "Requirement coverage",
      focusRows: ["Covered · 23", "Uncovered · 1 · REQ-058"],
      focusAction: "Open the gap",
      ownershipNote: "Close enough to schedule the review",
      world: RELEASE_WORLD,
      checklistProgress: { COVERAGE: 1, VERIFICATION: 0, RELEASE: 0 },
    },
    {
      source: "PF-36 s2 · the gap surfaces itself",
      ghost: "Find",
      type: "Design Release",
      id: "#310",
      title: "SPC-310 · seal housing · Rev C",
      status: "In Review",
      actor: "You",
      event: "Found the requirement with no linked result",
      eventDetail: "Surfaced on the record · not a silent pass and a predictable audit finding",
      checklist: "COVERAGE",
      checklistItems: ["Requirements · 24 linked", "Uncovered requirement"],
      focus: "record",
      focusTitle: "REQ-058 · no covering verification",
      focusRows: ["REQ-058 · seal retention under load", "No linked verification · gap on the record"],
      focusAction: "Resolve the gap",
      ownershipNote: "Block the release, or document the deviation",
      world: RELEASE_WORLD,
      checklistOpen: "COVERAGE",
      checklistProgress: { COVERAGE: 2, VERIFICATION: 0, RELEASE: 0 },
    },
    {
      source: "PF-36 s3 · assigned with its context",
      ghost: "Assign",
      type: "Design Release",
      id: "#310",
      title: "SPC-310 · seal housing · Rev C",
      status: "In Review",
      actor: "You",
      event: "Assigned VER-131 with the requirement and protocol linked",
      eventDetail: "The assignee starts from the record, not a forwarded email chain",
      checklist: "VERIFICATION",
      checklistItems: ["VER-131 · seal fit test", "Protocol"],
      focus: "queue",
      poseVariant: "route",
      focusKicker: "VERIFICATION ASSIGNMENT",
      focusTitle: "Owner and due date, on the record",
      focusRows: [
        "E. Marsh · Design Engineer · VER-131 · due Friday",
        "A. Chen · Quality · informed",
        "S. Okafor · Engineering · gate owner",
      ],
      focusAction: "Assign verification",
      ownershipNote: "Who owns it, and by when",
      world: RELEASE_WORLD,
      checklistProgress: { COVERAGE: 2, VERIFICATION: 2, RELEASE: 0 },
    },
    {
      source: "PF-36 s4 · the chain closes live",
      ghost: "Link",
      type: "Design Release",
      id: "#310",
      title: "SPC-310 · seal housing · Rev C",
      status: "In Review",
      actor: "automator",
      event: "VER-131 result linked to the requirement it closes",
      eventDetail: "Coverage updates live · the gap leaves the release view",
      checklist: "VERIFICATION",
      checklistItems: ["VER-131 · seal fit test", "Result"],
      focus: "comment",
      focusRows: ["VER-131 · seal fit test · passed → REQ-058"],
      focusTitle: "Result linked",
      focusAction: "Open the result",
      ownershipNote: "Does the result satisfy the criteria",
      world: RELEASE_WORLD,
      checklistOpen: "VERIFICATION",
      checklistProgress: { COVERAGE: 3, VERIFICATION: 3, RELEASE: 0 },
    },
    {
      source: "PF-36 s5 · released with the trace unbroken",
      ghost: "Release",
      type: "Design Release",
      id: "#310",
      title: "SPC-310 · seal housing · Rev C",
      status: "Approved",
      actor: "automator",
      event: "Released Rev C with an unbroken requirement-to-result chain",
      eventDetail: "The design history file entry writes from the record",
      checklist: "RELEASE",
      checklistItems: ["REQ-041 … REQ-064 · every requirement covered", "Design history file · written from the record", "Rev C effective · the floor builds to it"],
      focus: "trace",
      focusTitle: "Released on evidence",
      focusRows: ["Unbroken chain, requirement to result", "Release Rev C"],
      focusAction: "Release Rev C",
      ownershipNote: "Approve, or return with the gaps named",
      world: RELEASE_WORLD,
      checklistOpen: "RELEASE",
      checklistProgress: { COVERAGE: 3, VERIFICATION: 3, RELEASE: 3 },
      signedItems: [
        {
          name: "S. Okafor",
          initials: "SO",
          role: "Engineering · Release approval",
          approvalId: "REL-310-C",
          time: "16:12",
        },
      ],
      related: 3,
    },
  ],
};

/* ===================================================== hero journey (arcade)
 * The hero product shot is the arcade itself, same treatment as every
 * product page (shared HeroArcade): the five poses of SPC-310's controlled
 * change (PF-34), carrying the headline's claim - the trace from requirement
 * to result has no gaps. The hero and the lifecycle section tell the same
 * story with the same facts: the spec opens ON its trace, the risk is judged
 * against live controls, the revision routes as one package, and the trace
 * closes itself into the design history file. Labels are the reader's
 * handle on the step.
 *
 * Two hero-only bookends are lifted from the PLM combined customer video
 * (Wistia, 4cw8gd4hn1k39x8), same recipe as the DMS and QMS heroes: the
 * no-code process builder that CONFIGURES the lifecycle the middle steps
 * ride (demo 0:28-0:40 and 2:42-3:06, the product-development stage list
 * Product Details through Generate Signed PDF), and the live dashboard the
 * release rolls into (demo 0:00 poster, the KPI-donut dashboard, restaged
 * on PF-36's Notion-backed release-readiness reports so the close stays
 * the SPC-310 story). Both extend PF-34's spec world so the hero stays one
 * record: the builder opens it (why the record is governed), the dashboard
 * closes it (what the governance proves). */
const PLM_HERO_WORLD: ArcadeFlowWorld = {
  ...SPEC_WORLD,
  builder: {
    title: "Product development process",
    note: "The lifecycle every design record walks, configured, not coded.",
    tabs: ["Checklist", "Team", "Statuses", "Reminders", "Layout"],
    fields: [
      { kind: "Selection", tone: "selection", label: "Product details" },
      { kind: "Text", tone: "text", label: "Design input(s)" },
      { kind: "Linked field", tone: "linked", label: "FMEA & control plan" },
      { kind: "Approval", tone: "approval", label: "Design approval" },
      { kind: "Revision", tone: "revision", label: "Specification revision(s)" },
      { kind: "File upload", tone: "upload", label: "Verification & validation" },
      { kind: "Generate PDF", tone: "pdf", label: "Signed design file" },
    ],
    palette: [
      { label: "Approval", note: "Digital signatures on the record", tone: "approval" },
      { label: "Linked field", note: "Link to another process", tone: "linked" },
      { label: "Revision", note: "Managed revisions of the record", tone: "revision" },
      { label: "Generate PDF", note: "Printable render of the checklist", tone: "pdf" },
      { label: "Picklist", note: "Drop-down selection of items", tone: "picklist" },
      { label: "File upload", note: "Attach documents or images", tone: "upload" },
    ],
  },
  reports: {
    title: "Release readiness · SPC-310 Rev C",
    kpis: [
      { label: "Requirements covered", value: "24 of 24", note: "REQ-041 … REQ-064" },
      { label: "Open verifications", value: "0", note: "VER-131 closed Friday" },
      { label: "Avg. design review", value: "3.1d", note: "Routed, not chased" },
    ],
    panels: [
      { label: "Requirement coverage", kind: "bars" },
      { label: "Verification status", kind: "donut" },
      { label: "Release cycle times", kind: "lines" },
    ],
  },
};

const PLM_HERO_BUILD_STEP: ArcadeStepConfig = {
  source: "PLM demo 0:28-0:40, 2:42-3:06 · product-development stage list + builder",
  ghost: "Build",
  type: "Specification",
  id: "#310",
  title: "Seal housing tolerance",
  status: "In Review",
  actor: "You",
  event: "Configured the product development process in the builder",
  eventDetail: "Stages, approval routing and automations · no code",
  checklist: "REQUIREMENT TRACE",
  checklistItems: ["Field list", "Approval routing", "Automations"],
  focus: "builder",
  focusTitle: "Design approval",
  focusRows: [
    "Signatures set by change classification",
    "Contingent on risk assessment complete",
    "On approval · trace and DHF update",
  ],
  focusAction: "Add field",
  ownershipNote: "Process owner · S. Okafor",
  world: PLM_HERO_WORLD,
  checklistProgress: { "REQUIREMENT TRACE": 0, "RISK · FMEA": 0, "CHANGE & RELEASE": 0 },
};

const PLM_HERO_MEASURE_STEP: ArcadeStepConfig = {
  source: "PLM demo 0:00 · KPI dashboard, restaged on PF-36 release readiness",
  ghost: "Measure",
  type: "Specification",
  id: "#310",
  title: "Seal housing tolerance",
  status: "Approved",
  actor: "automator",
  event: "Rolled the release into the live dashboards",
  eventDetail: "Coverage, verification status and cycle times · live from every record",
  checklist: "CHANGE & RELEASE",
  checklistItems: ["Requirement coverage", "Verification status", "Release cycle times"],
  focus: "dashboard",
  focusTitle: "Requirement coverage",
  focusRows: [
    "Covered · 24 of 24 · no orphans",
    "VER-131 seal fit test · passed",
    "No export · no reconciliation",
  ],
  focusAction: "Open report",
  ownershipNote: "Live from every record",
  world: PLM_HERO_WORLD,
};

/* The hero rail: configuration opens, analytics closes, and the SPC-310
 * journey (PF-34's five poses) stays intact in the middle - same shape as
 * the QMS hero's seven steps. */
export const PLM_HERO_STEPS: HeroArcadeStep[] = [
  {
    label: "Build it",
    config: PLM_HERO_BUILD_STEP,
  },
  {
    label: "Open the trace",
    config: PLM_ARCADE_FLOW_CONFIGS["34"][0],
  },
  {
    label: "Assess the risk",
    config: PLM_ARCADE_FLOW_CONFIGS["34"][1],
  },
  {
    label: "Revise the spec",
    config: PLM_ARCADE_FLOW_CONFIGS["34"][2],
  },
  {
    label: "Route the review",
    config: PLM_ARCADE_FLOW_CONFIGS["34"][3],
  },
  {
    label: "Close the trace",
    config: PLM_ARCADE_FLOW_CONFIGS["34"][4],
  },
  {
    label: "Measure it",
    config: PLM_HERO_MEASURE_STEP,
  },
];
