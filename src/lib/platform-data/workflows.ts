/* ------------------------------------------------------------
 * Workflow / journey model for the process visual language.
 *
 * A workflow is a directed graph (not a line): steps run in
 * sequence, decisions fork the path, rework edges curve back
 * when a check fails, and the flow hands off to other modules.
 *
 * Source of truth: Notion "🛄 Journeys" DB + the inline
 * "🚶‍♀️ Journey Steps" DB on each journey page. Step content
 * (Name, What Happens, Role-in-the-moment, User Decision, Mediums,
 * CT Primitives at Risk, Goal Zero Status) is VERBATIM from Notion
 * as of 2026-05-27. Three journeys are Validated; every step is
 * Goal Zero "Pending" (journey rolls up to Pass on the sample set).
 *
 * Synthetic-only (not in Notion, added for the flow visual):
 *   - decision nodes (d*) — the User Decision is a per-step column
 *     in Notion; the diamonds mark where the path forks.
 *   - rework / branch / handoff edges and their labels.
 * ------------------------------------------------------------ */

/** Delivery surface a step happens on (Notion: Platform Mediums). */
export type Medium = "notification" | "web" | "mobile" | "email" | "voice";

/**
 * Existing system of record a step's work lives in today — the customer's own
 * stack, NOT Unifize. Rendered as a neutral chip on the node (next to the
 * medium dots) to answer Ben's 2026-06-08 ask: "show how we integrate with
 * existing systems … make existing systems work." Acronyms only — issuer logos
 * belong in the standards / integrations strip, not in the flow.
 */
export type System =
  | "eQMS"
  | "DMS"
  | "ERP"
  | "PLM"
  | "MES"
  | "LMS"
  | "Email"
  | "Teams"
  | "Calendar";

/**
 * Coordination-tax primitive at risk in a step (Notion: CT Primitives).
 * Opt-in overlay layer — off by default on the website.
 *   RC reconciliation · SC status-chasing · DR decision-rebuilding
 *   TR translation · ER errors · MT meetings
 */
export type CTPrimitive = "RC" | "SC" | "DR" | "TR" | "ER" | "MT";

/** Per-step (and per-journey) Goal Zero validation status. */
export type GoalZero = "Pass" | "Pending" | "Fail" | "Phase 0 only";

/**
 * Value Stream Step classification (Notion: Value Stream Steps DB).
 * The work-side decomposition of a Journey Step. Coordination tax lives in
 * the NVA + WAIT between these — the swarm the persona experiences as one step.
 *   VA-irreducible — real value that can't be removed
 *   VA-reducible   — real value that can be sped up
 *   NVA            — non-value-add (reconciliation, chasing, translation)
 *   WAIT           — idle time between handoffs
 */
export type VSClassification = "VA-irreducible" | "VA-reducible" | "NVA" | "WAIT";

/** One work-side step that decomposes a Journey Step (Notion: Value Stream Steps). */
export interface ValueStreamStep {
  name: string;
  classification: VSClassification;
  /** Current Typical minutes (as-is). */
  currentMin: number;
  /** Unifize Typical minutes (governed). */
  unifizeMin: number;
  /** Autonomous AI-tier minutes (roadmap). */
  aiMin?: number;
}

/** Module family — drives the node accent colour. */
export type ModuleKind =
  | "spec" // DMS / documents — blue
  | "qevent" // QMS / audit — amber
  | "improve" // CAPA / corrective — red
  | "train"; // Training — violet

export type WorkflowNodeKind = "terminal" | "step" | "decision" | "handoff";

interface NodeBase {
  kind: WorkflowNodeKind;
  id: string;
}

/** A unit of user interaction (Notion: Journey Step). */
export interface StepNodeData extends NodeBase {
  kind: "step";
  /** Step Index → rendered as S{index}. */
  index: number;
  /** Notion step Name (verbatim). */
  name: string;
  /** Role-in-the-moment. */
  role: string;
  /** What Happens — plain-language behaviour at this step (verbatim). */
  whatHappens: string;
  /** User Decision the persona makes at this step (verbatim). */
  userDecision: string;
  mediums: Medium[];
  /**
   * Existing systems of record this step's work lives in today (the customer's
   * stack). Rendered as neutral chips next to the medium dots — the "works with
   * your existing systems" layer (Ben 2026-06-08).
   * FIRST PASS, derived from each step's `whatHappens`; VALIDATE with product
   * (Raj) before customer use. Undefined / empty = no chips.
   */
  systems?: System[];
  /** CT primitives at risk — shown only when the CT layer is on. */
  ct?: CTPrimitive[];
  /** Per-step Goal Zero Status. */
  goalZero: GoalZero;
  /**
   * Work-side decomposition (Notion: Value Stream Steps relation).
   * Shown only when the Work layer is on. Empty = not yet wired in Notion.
   */
  valueStream?: ValueStreamStep[];
}

/** A branch point. Synthetic node marking where a step's User Decision forks. */
export interface DecisionNodeData extends NodeBase {
  kind: "decision";
  question: string;
}

/** Start / end cap of a journey. */
export interface TerminalNodeData extends NodeBase {
  kind: "terminal";
  label: string;
  /** Success terminal (governed close) — styled green. */
  end?: boolean;
}

/** Routes out to another module's workflow. */
export interface HandoffNodeData extends NodeBase {
  kind: "handoff";
  label: string;
  module: ModuleKind;
}

export type WorkflowNode =
  | StepNodeData
  | DecisionNodeData
  | TerminalNodeData
  | HandoffNodeData;

/**
 * Edge semantics drive routing + styling:
 *   flow     forward path along the spine
 *   branch   alternate forward path out of a decision
 *   rework   loops back when a check fails (dashed, red)
 *   handoff  routes out to another module (dashed, grey)
 */
export type EdgeKind = "flow" | "branch" | "rework" | "handoff";

export interface WorkflowEdge {
  from: string;
  to: string;
  kind: EdgeKind;
  label?: string;
}

export interface Workflow {
  /** Journey id, e.g. "JRN-3". */
  id: string;
  /** Module + standard line, e.g. "CAPA Module · ISO 13485". */
  module: string;
  accent: ModuleKind;
  /** Relative complexity for the simple→complex teaching order. */
  complexity?: "Simple" | "Balanced" | "Complex";
  /** Journey Name (verbatim from Notion). */
  title: string;
  /** One-line non-linear summary (agency-authored framing). */
  summary: string;
  /** Journey Description (verbatim from Notion). */
  description?: string;
  /** Journey Status, e.g. "Validated". */
  status?: string;
  /** Journey-level Goal Zero Status. */
  goalZero?: GoalZero;
  /** True when step value streams are agency-authored samples (not yet wired in Notion). */
  valueStreamSample?: boolean;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

/* ============================================================
 * JRN-3 — CAPA Investigator closes a corrective action
 * ============================================================ */
const CAPA: Workflow = {
  id: "JRN-3",
  module: "CAPA Module · ISO 13485",
  accent: "improve",
  complexity: "Complex",
  title: "CAPA Investigator closes a corrective action triggered by a customer complaint",
  summary:
    "8 steps · forks at root cause, approval and effectiveness · loops back until effectiveness is proven · hands off to Change Control.",
  description:
    "Triggered by a CAPA assignment notification, usually within hours of the originating complaint or non-conformance being escalated. Session spans two to six weeks. Ends when the CAPA is closed and effectiveness is verified.",
  status: "Validated",
  goalZero: "Pass",
  valueStreamSample: true,
  nodes: [
    { kind: "terminal", id: "start", label: "CAPA assigned" },
    {
      kind: "step", id: "s1", index: 1, name: "Receive CAPA assignment notification",
      role: "Recipient", mediums: ["notification"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "Receives a notification that a CAPA has been assigned. The notification carries the originating complaint or non-conformance reference and the proposed scope, so the Investigator can decide whether to accept without opening the record.",
      userDecision: "Accept the assignment or request reassignment if the scope is wrong for them.",
    },
    {
      kind: "step", id: "s2", index: 2, name: "Open CAPA and review the originating non-conformance or complaint",
      role: "Investigator", mediums: ["web"], ct: ["RC", "DR"], goalZero: "Pending",
      whatHappens: "Opens the CAPA record. Reviews the linked non-conformance or complaint, including evidence, history, and prior related events. Sees the full context without bouncing across systems.",
      userDecision: "Accept the scope as defined, or push back to the originator before starting investigation.",
      valueStream: [
        { name: "Locate originating NC across systems", classification: "NVA", currentMin: 30, unifizeMin: 3, aiMin: 1 },
        { name: "Read history, evidence & prior events", classification: "VA-irreducible", currentMin: 45, unifizeMin: 35, aiMin: 25 },
        { name: "Reconcile duplicate / partial records", classification: "NVA", currentMin: 25, unifizeMin: 2, aiMin: 0 },
        { name: "Wait: missing evidence from originator", classification: "WAIT", currentMin: 480, unifizeMin: 60, aiMin: 15 },
      ],
    },
    {
      kind: "step", id: "s3", index: 3, name: "Conduct root cause analysis",
      role: "Analyst", mediums: ["web", "voice"], ct: ["DR", "ER"], goalZero: "Pending",
      whatHappens: "Conducts a root cause analysis (5-Whys, fishbone, or similar). May interview people via voice or asynchronous comment. Records intermediate findings and the final root cause statement directly on the CAPA.",
      userDecision: "When to stop digging and call the root cause identified.",
      valueStream: [
        { name: "Schedule RCA with cross-functional team", classification: "NVA", currentMin: 60, unifizeMin: 10, aiMin: 2 },
        { name: "Wait: align calendars across functions", classification: "WAIT", currentMin: 2880, unifizeMin: 240, aiMin: 30 },
        { name: "Run 5-Whys / fishbone", classification: "VA-irreducible", currentMin: 120, unifizeMin: 100, aiMin: 60 },
        { name: "Chase interview inputs", classification: "NVA", currentMin: 90, unifizeMin: 10, aiMin: 2 },
        { name: "Document root cause statement", classification: "VA-reducible", currentMin: 45, unifizeMin: 20, aiMin: 8 },
      ],
    },
    { kind: "decision", id: "d3", question: "root cause found?" },
    {
      kind: "step", id: "s4", index: 4, name: "Define the corrective action plan",
      role: "Planner", mediums: ["web"], ct: ["TR"], goalZero: "Pending",
      whatHappens: "Drafts the action plan: containment, corrective action, preventive action. Each step has a named owner, a target completion date, and a definition of done.",
      userDecision: "Which actions to include and which to defer or drop.",
    },
    {
      kind: "step", id: "s5", index: 5, name: "Route plan for approval",
      role: "Coordinator", mediums: ["web", "notification"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "Routes the plan to the Quality Manager for approval. The Manager receives a notification and opens the record directly to approve, reject, or request changes.",
      userDecision: "Who needs to approve given the risk level.",
      valueStream: [
        { name: "Assemble approval packet", classification: "NVA", currentMin: 30, unifizeMin: 2, aiMin: 1 },
        { name: "Wait: Quality Manager approval queue", classification: "WAIT", currentMin: 1440, unifizeMin: 120, aiMin: 15 },
        { name: "Answer approver questions", classification: "VA-reducible", currentMin: 30, unifizeMin: 15, aiMin: 5 },
      ],
    },
    { kind: "decision", id: "d5", question: "approved?" },
    {
      kind: "step", id: "s6", index: 6, name: "Implement actions with evidence capture",
      role: "Coordinator", mediums: ["web", "email"], ct: ["RC", "SC"], goalZero: "Pending",
      whatHappens: "Coordinates with action owners (often cross-functional, often across sites). Captures evidence as each action completes: training records, updated SOPs, validated process changes, supplier qualification updates.",
      userDecision: "Whether the evidence each owner provides is sufficient.",
      valueStream: [
        { name: "Coordinate owners across sites", classification: "NVA", currentMin: 120, unifizeMin: 20, aiMin: 5 },
        { name: "Wait: actions execute (training, SOP, validation)", classification: "WAIT", currentMin: 7200, unifizeMin: 2880, aiMin: 1440 },
        { name: "Collect & verify evidence", classification: "VA-irreducible", currentMin: 90, unifizeMin: 60, aiMin: 30 },
        { name: "Reconcile evidence across owners", classification: "NVA", currentMin: 60, unifizeMin: 5, aiMin: 1 },
      ],
    },
    {
      kind: "step", id: "s7", index: 7, name: "Schedule effectiveness review",
      role: "Owner", mediums: ["notification", "web"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "Sets the effectiveness review date (typically 30 to 90 days after action completion). The system schedules a notification and an obligation on the Investigator's queue for that date.",
      userDecision: "How far out to set the effectiveness review window.",
    },
    {
      kind: "step", id: "s8", index: 8, name: "Verify effectiveness and close",
      role: "Approver", mediums: ["web"], ct: ["DR"], goalZero: "Pending",
      whatHappens: "At the effectiveness review date, reviews evidence that the corrective action actually worked (no recurrence, metrics improved). Signs off effectiveness with regulated electronic signature. The CAPA closes and links to the originating complaint update.",
      userDecision: "Effective, partially effective (extend monitoring), or not effective (reopen with new plan).",
      valueStream: [
        { name: "Gather recurrence metrics", classification: "VA-irreducible", currentMin: 60, unifizeMin: 30, aiMin: 15 },
        { name: "Reconcile data sources", classification: "NVA", currentMin: 45, unifizeMin: 3, aiMin: 1 },
        { name: "Wait: data availability", classification: "WAIT", currentMin: 480, unifizeMin: 60, aiMin: 15 },
        { name: "Review, decide & e-sign close", classification: "VA-irreducible", currentMin: 60, unifizeMin: 45, aiMin: 30 },
      ],
    },
    { kind: "decision", id: "d8", question: "effective?" },
    { kind: "terminal", id: "end", label: "Closed · provable", end: true },
    { kind: "handoff", id: "hoC", label: "Change Control", module: "improve" },
  ],
  edges: [
    { from: "start", to: "s1", kind: "flow" },
    { from: "s1", to: "s2", kind: "flow" },
    { from: "s2", to: "s3", kind: "flow" },
    { from: "s3", to: "d3", kind: "flow" },
    { from: "d3", to: "s4", kind: "flow", label: "yes → plan" },
    { from: "s4", to: "s5", kind: "flow" },
    { from: "s5", to: "d5", kind: "flow" },
    { from: "d5", to: "s6", kind: "flow", label: "approved" },
    { from: "s6", to: "s7", kind: "flow" },
    { from: "s7", to: "s8", kind: "flow" },
    { from: "s8", to: "d8", kind: "flow" },
    { from: "d8", to: "end", kind: "flow", label: "effective → close" },
    { from: "d3", to: "s3", kind: "rework", label: "keep digging" },
    { from: "d5", to: "s4", kind: "rework", label: "reject → revise" },
    { from: "d8", to: "s7", kind: "rework", label: "partial → extend" },
    { from: "d8", to: "s4", kind: "rework", label: "not effective → reopen" },
    { from: "end", to: "hoC", kind: "handoff", label: "raises" },
  ],
};

/* ============================================================
 * JRN-2 — Quality Manager runs an annual ISO 13485 audit
 * ============================================================ */
const AUDIT: Workflow = {
  id: "JRN-2",
  module: "QMS Module · ISO 13485",
  accent: "qevent",
  complexity: "Balanced",
  title: "Quality Manager runs an annual ISO 13485 audit on the QMS Module",
  summary:
    "8 steps · branches on findings · loops while tracking closure · routes major findings into CAPA.",
  description:
    "Triggered by the audit calendar two weeks before the due date. Session spans several days across the audit window. Ends when the audit is signed off, findings are routed to Corrective Actions, and effectiveness reviews are scheduled.",
  status: "Validated",
  goalZero: "Pass",
  nodes: [
    { kind: "terminal", id: "start", label: "Audit scheduled" },
    {
      kind: "step", id: "s1", index: 1, name: "Receive audit schedule notification two weeks before the due date",
      role: "Recipient", mediums: ["notification"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "The Quality Manager receives a notification that the annual ISO 13485 audit is scheduled in two weeks. The notification links directly to the audit record so she can open it from the message rather than navigate.",
      userDecision: "Acknowledge and begin preparation now, or defer if there is a scheduling conflict.",
    },
    {
      kind: "step", id: "s2", index: 2, name: "Open the audit record and review scope",
      role: "Audit owner", mediums: ["web"], ct: ["RC"], goalZero: "Pending",
      whatHappens: "Opens the audit record. Reviews scope (ISO 13485 full QMS), assigned auditors, and prior-year findings. Sees the audit checklist auto-populated from the standard and from internal procedure references.",
      userDecision: "Confirm scope as drafted or adjust before notifying stakeholders.",
    },
    {
      kind: "step", id: "s3", index: 3, name: "Notify audit lead and stakeholders",
      role: "Coordinator", mediums: ["email", "notification"], ct: ["TR"], goalZero: "Pending",
      whatHappens: "Sends pre-audit notification to the audit lead, department heads, and document owners. Each recipient's notification includes the audit checklist sections they need to be ready for.",
      userDecision: "Confirm the recipient list and any additional stakeholders to copy.",
    },
    {
      kind: "step", id: "s4", index: 4, name: "Conduct the audit on site",
      role: "Auditor", mediums: ["mobile", "web"], ct: ["RC", "ER"], goalZero: "Pending",
      whatHappens: "Walks the floor, interviews staff, and reviews documents on mobile. Captures observations against the checklist. Takes photos as evidence and attaches them to the audit record in real time.",
      userDecision: "For each observation, record it as a finding or as a note without a finding.",
    },
    { kind: "decision", id: "d4", question: "finding?" },
    {
      kind: "step", id: "s5", index: 5, name: "Record findings with severity and clause linkage",
      role: "Auditor", mediums: ["web"], ct: ["DR"], goalZero: "Pending",
      whatHappens: "Records each finding with severity (major, minor, observation), evidence reference, and recommended action. Findings are linked to the relevant ISO 13485 clause so the audit report writes itself.",
      userDecision: "What severity to assign to each finding.",
    },
    {
      kind: "step", id: "s6", index: 6, name: "Route major findings to Corrective Actions",
      role: "Auditor", mediums: ["web"], ct: ["SC", "TR"], goalZero: "Pending",
      whatHappens: "Selects major findings and routes them into Corrective Actions with the audit context preserved. The CAPA record carries the audit reference, the finding text, and the linked clause so the investigator does not have to reconstruct context.",
      userDecision: "Which findings warrant a full CAPA versus a simple action item.",
    },
    {
      kind: "step", id: "s7", index: 7, name: "Track responses through closure",
      role: "Audit owner", mediums: ["web", "notification"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "Watches the linked Corrective Actions and lighter action items move toward closure over the weeks that follow. Notifications fire when responses are due or overdue.",
      userDecision: "Escalate overdue items, or extend the deadline with rationale.",
    },
    { kind: "decision", id: "d7", question: "all closed?" },
    {
      kind: "step", id: "s8", index: 8, name: "Sign off and lock the audit record",
      role: "Approver", mediums: ["web"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "Once all findings are addressed and effectiveness is verified, signs off the audit with regulated electronic signature satisfying 21 CFR Part 11 expectations. The audit record locks for the year and becomes part of the audit history file.",
      userDecision: "Sign off now, or hold for an outstanding effectiveness review.",
    },
    { kind: "terminal", id: "end", label: "Locked for the year", end: true },
    { kind: "handoff", id: "hoA", label: "Corrective Actions", module: "improve" },
  ],
  edges: [
    { from: "start", to: "s1", kind: "flow" },
    { from: "s1", to: "s2", kind: "flow" },
    { from: "s2", to: "s3", kind: "flow" },
    { from: "s3", to: "s4", kind: "flow" },
    { from: "s4", to: "d4", kind: "flow" },
    { from: "d4", to: "s5", kind: "flow", label: "finding → record" },
    { from: "s5", to: "s6", kind: "flow" },
    { from: "s6", to: "s7", kind: "flow" },
    { from: "s7", to: "d7", kind: "flow" },
    { from: "d7", to: "s8", kind: "flow", label: "yes → sign off" },
    { from: "s8", to: "end", kind: "flow" },
    { from: "d4", to: "s7", kind: "rework", label: "note only → skip" },
    { from: "d7", to: "s7", kind: "rework", label: "not yet → keep tracking" },
    { from: "s6", to: "hoA", kind: "handoff", label: "routes major" },
  ],
};

/* ============================================================
 * JRN-4 — Document Approver approves a controlled SOP revision
 * ============================================================ */
const SOP: Workflow = {
  id: "JRN-4",
  module: "DMS Module · 21 CFR Part 11",
  accent: "spec",
  complexity: "Simple",
  title: "Document Approver approves a controlled SOP revision on the DMS Module",
  summary:
    "Short and tight — one branch decides sign vs revise; a rework loop sends it back to the author; publish propagates to training.",
  description:
    "Triggered by an approval request notification mid-task. Session is short (5 to 30 minutes per document). Ends when the document is signed and published, or when changes are requested and it routes back to the author.",
  status: "Validated",
  goalZero: "Pass",
  nodes: [
    { kind: "terminal", id: "start", label: "Approval requested" },
    {
      kind: "step", id: "s1", index: 1, name: "Receive approval request notification",
      role: "Recipient", mediums: ["notification"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "Receives a notification that a controlled document needs approval. Notification includes document title, revision number, originator, and a one-line summary of the change so triage is possible without opening.",
      userDecision: "Open now or batch with other approvals later.",
    },
    {
      kind: "step", id: "s2", index: 2, name: "Open document and review the revision",
      role: "Reviewer", mediums: ["web"], ct: ["RC"], goalZero: "Pending",
      whatHappens: "Opens the document. Reviews content in full, including any inline comments from authors and prior reviewers. Sees who else has approved and who is still pending.",
      userDecision: "How thorough a review the document needs given its risk class and change scope.",
    },
    {
      kind: "step", id: "s3", index: 3, name: "View diff against the prior approved version",
      role: "Reviewer", mediums: ["web"], ct: ["RC", "DR"], goalZero: "Pending",
      whatHappens: "Toggles the diff view to see exactly what changed since the prior approved revision. Reads the change rationale that the originator was required to provide.",
      userDecision: "Is the change justified by the rationale, and is the wording precise enough.",
    },
    { kind: "decision", id: "d3", question: "changes needed?" },
    {
      kind: "step", id: "s4", index: 4, name: "Add comments or request changes",
      role: "Reviewer", mediums: ["web"], ct: ["TR"], goalZero: "Pending",
      whatHappens: "If revisions are needed, adds inline comments and routes the document back to the author. The document stays in pending approval status with the comments visible to the author and prior reviewers.",
      userDecision: "Comment in line for the author to address, or reject the revision wholesale.",
    },
    {
      kind: "step", id: "s5", index: 5, name: "Apply regulated electronic signature",
      role: "Approver", mediums: ["web"], ct: ["ER"], goalZero: "Pending",
      whatHappens: "When ready to approve, re-authenticates and applies a 21 CFR Part 11 compliant signature. The signature carries identity, timestamp, and the meaning 'approved for publication', permanently linked to this revision.",
      userDecision: "Final go or no-go on this revision.",
    },
    {
      kind: "step", id: "s6", index: 6, name: "Document publishes and propagates to training",
      role: "Observer", mediums: ["notification", "web"], ct: ["SC"], goalZero: "Pending",
      whatHappens: "On signature, the system publishes the document, supersedes the prior revision, identifies users who had training on the prior version, and creates retraining obligations linked to the new revision. The Approver sees a confirmation of the cascade.",
      userDecision: "None at this step; automated cascade. Approver may scan the cascade summary for sanity.",
    },
    { kind: "terminal", id: "end", label: "Published", end: true },
    { kind: "handoff", id: "hoT", label: "Training (retraining)", module: "train" },
  ],
  edges: [
    { from: "start", to: "s1", kind: "flow" },
    { from: "s1", to: "s2", kind: "flow" },
    { from: "s2", to: "s3", kind: "flow" },
    { from: "s3", to: "d3", kind: "flow" },
    { from: "d3", to: "s5", kind: "flow", label: "no → sign" },
    { from: "s5", to: "s6", kind: "flow" },
    { from: "s6", to: "end", kind: "flow" },
    { from: "d3", to: "s4", kind: "branch", label: "changes needed" },
    { from: "s4", to: "s2", kind: "rework", label: "author revises → re-review" },
    { from: "s6", to: "hoT", kind: "handoff", label: "propagates" },
  ],
};

/* ============================================================
 * JRN-5 — Change Control cycle on the DMS Module
 * 8 steps, weighted average across all CC types. Numbers track
 * the per-cycle workshop baseline: 39.5 active hrs + 84 wait hrs
 * = 123.5 calendar hours, ~$2,400 per cycle at a $60/hr loaded
 * blended rate. ProVerum baseline numbers; we use them, not the
 * name.
 * ============================================================ */
const CHANGE_CONTROL: Workflow = {
  id: "JRN-5",
  module: "DMS Module · 21 CFR Part 11",
  accent: "spec",
  complexity: "Balanced",
  title: "Quality runs a change control from initiation through training cascade and close-out",
  summary:
    "8 steps · review fork loops back when revisions land · trigger fans out to a training cascade · sign-off closes the controlled record.",
  description:
    "Triggered when a change request is raised. Session spans days to weeks depending on training breadth. Ends when the change is signed off, the prior revision is retired, and all affected roles complete training.",
  status: "Validated",
  goalZero: "Pass",
  valueStreamSample: true,
  nodes: [
    { kind: "terminal", id: "start", label: "Change raised" },
    {
      kind: "step", id: "s1", index: 1, name: "Initiate change control",
      role: "Owner", mediums: ["web", "email"], ct: ["SC", "TR"], goalZero: "Pending",
      systems: ["eQMS", "Email", "Calendar"],
      whatHappens: "The Owner raises the change request — the person accountable for driving it through to close. Captures rationale, scope, and the controlled document being changed, then routes to the document owner. Initiation usually moves between email, the QMS form, and a calendar invite.",
      userDecision: "Approve scope as drafted, or revise before routing.",
      valueStream: [
        { name: "Capture rationale & scope", classification: "VA-irreducible", currentMin: 60, unifizeMin: 50, aiMin: 30 },
        { name: "Reconcile across systems & inbox", classification: "NVA", currentMin: 105, unifizeMin: 10, aiMin: 3 },
        { name: "Wait — routing to document owner", classification: "WAIT", currentMin: 960, unifizeMin: 60, aiMin: 15 },
      ],
    },
    {
      kind: "step", id: "s2", index: 2, name: "Re-author the document",
      role: "Document owner", mediums: ["web"], ct: ["TR"], goalZero: "Pending",
      systems: ["eQMS"],
      whatHappens: "The document owner edits the controlled document to reflect the change. They draft the diff, the change rationale, and the proposed effective date in the document record itself.",
      userDecision: "Finalise wording and submit for cross-functional review.",
      valueStream: [
        { name: "Edit document content", classification: "VA-irreducible", currentMin: 65, unifizeMin: 60, aiMin: 35 },
      ],
    },
    {
      kind: "step", id: "s3", index: 3, name: "Cross-functional review",
      role: "Reviewers / Quality", mediums: ["web", "email"], ct: ["SC", "DR", "RC"], goalZero: "Pending",
      systems: ["Email", "Teams", "Calendar"],
      whatHappens: "Quality, Engineering, Manufacturing and other affected functions review the revision. Comments accumulate inline. Review usually drifts across email threads, calendar holds, Teams huddles and DMs to chase reviewer responses.",
      userDecision: "Accept comments and move to approval, or request revisions.",
      valueStream: [
        { name: "Run cross-functional review", classification: "VA-irreducible", currentMin: 90, unifizeMin: 75, aiMin: 45 },
        { name: "Reconcile comments across channels", classification: "NVA", currentMin: 75, unifizeMin: 5, aiMin: 1 },
        { name: "Wait — reviewers respond", classification: "WAIT", currentMin: 1440, unifizeMin: 180, aiMin: 30 },
      ],
    },
    { kind: "decision", id: "d3", question: "changes needed?" },
    {
      kind: "step", id: "s4", index: 4, name: "Approval",
      role: "Approver", mediums: ["web"], ct: ["SC", "ER"], goalZero: "Pending",
      systems: ["eQMS"],
      whatHappens: "Approvers — defined by the Change Control Approval Matrix, not chosen ad hoc — re-authenticate and apply 21 CFR Part 11 compliant electronic signatures. Each signature carries identity, timestamp, and the meaning 'approved for publication', permanently linked to the revision.",
      userDecision: "Sign, hold for clarification, or reject and route back to re-author.",
      valueStream: [
        { name: "Apply electronic signature", classification: "VA-irreducible", currentMin: 30, unifizeMin: 25, aiMin: 20 },
        { name: "Re-assemble approval packet", classification: "NVA", currentMin: 45, unifizeMin: 5, aiMin: 1 },
        { name: "Wait — signer queue", classification: "WAIT", currentMin: 1440, unifizeMin: 120, aiMin: 15 },
      ],
    },
    { kind: "decision", id: "d4", question: "approved?" },
    {
      kind: "step", id: "s5", index: 5, name: "Publish and retire the old version",
      role: "Document control", mediums: ["web"], ct: ["RC"], goalZero: "Pending",
      systems: ["eQMS"],
      whatHappens: "On signature, the system publishes the new revision and supersedes the prior one. Document control verifies the cascade and confirms the prior version is locked.",
      userDecision: "None — automated cascade with verification.",
      valueStream: [
        { name: "Publish + retire prior version", classification: "VA-irreducible", currentMin: 35, unifizeMin: 5, aiMin: 2 },
      ],
    },
    {
      kind: "step", id: "s6", index: 6, name: "Trigger training",
      role: "Training admin", mediums: ["notification", "web"], ct: ["SC", "TR"], goalZero: "Pending",
      systems: ["LMS"],
      whatHappens: "Identifies roles affected by the revision and creates retraining obligations. Notifications fan out to role groups. Each affected user lands on their queue with a deadline.",
      userDecision: "Confirm the role groups and the training deadline.",
      valueStream: [
        { name: "Set up training obligations", classification: "VA-irreducible", currentMin: 60, unifizeMin: 30, aiMin: 10 },
        { name: "Identify affected users", classification: "NVA", currentMin: 95, unifizeMin: 5, aiMin: 1 },
        { name: "Wait — propagation", classification: "WAIT", currentMin: 240, unifizeMin: 30, aiMin: 5 },
      ],
    },
    {
      kind: "step", id: "s7", index: 7, name: "Training completion",
      role: "Role groups (blended)", mediums: ["web", "mobile"], ct: ["SC"], goalZero: "Pending",
      systems: ["LMS"],
      whatHappens: "Affected users complete the retraining: quizzes, signed acknowledgement, evidence captured against the new revision. Coverage status is visible to Quality on a single view.",
      userDecision: "Each user: complete training, or escalate if blocked.",
      valueStream: [
        { name: "Take + complete training", classification: "VA-irreducible", currentMin: 1680, unifizeMin: 1680, aiMin: 1680 },
        { name: "Wait — role groups complete", classification: "WAIT", currentMin: 960, unifizeMin: 240, aiMin: 60 },
      ],
    },
    {
      kind: "step", id: "s8", index: 8, name: "Close out",
      role: "Owner", mediums: ["web"], ct: ["DR"], goalZero: "Pending",
      systems: ["eQMS"],
      whatHappens: "The Owner verifies the change is fully propagated: revision live, prior version retired, training cleared, evidence linked. The change control record is signed off and locked.",
      userDecision: "Sign off and lock, or hold for an outstanding training gap.",
      valueStream: [
        { name: "Verify and close", classification: "VA-irreducible", currentMin: 30, unifizeMin: 20, aiMin: 10 },
      ],
    },
    { kind: "terminal", id: "end", label: "Closed · provable", end: true },
    { kind: "handoff", id: "hoT", label: "Training cascade", module: "train" },
  ],
  edges: [
    { from: "start", to: "s1", kind: "flow" },
    { from: "s1", to: "s2", kind: "flow" },
    { from: "s2", to: "s3", kind: "flow" },
    { from: "s3", to: "d3", kind: "flow" },
    { from: "d3", to: "s4", kind: "flow", label: "no → approve" },
    { from: "s4", to: "d4", kind: "flow" },
    { from: "d4", to: "s5", kind: "flow", label: "approved" },
    { from: "s5", to: "s6", kind: "flow" },
    { from: "s6", to: "s7", kind: "flow" },
    { from: "s7", to: "s8", kind: "flow" },
    { from: "s8", to: "end", kind: "flow" },
    { from: "d3", to: "s2", kind: "rework", label: "changes needed → re-author" },
    { from: "d4", to: "s2", kind: "rework", label: "rejected → re-author" },
    { from: "s6", to: "hoT", kind: "handoff", label: "fans out" },
  ],
};

export const WORKFLOWS: Record<string, Workflow> = {
  capa: CAPA,
  audit: AUDIT,
  sop: SOP,
  "change-control": CHANGE_CONTROL,
};

/** All workflows in display order (CAPA = recommended lead instance). */
export const WORKFLOW_LIST: Workflow[] = [CAPA, AUDIT, SOP, CHANGE_CONTROL];

/** Teaching order: simple → complex, ending with Change Control as the protagonist of the compression story below. */
export const WORKFLOW_SHOWCASE: Workflow[] = [SOP, AUDIT, CAPA, CHANGE_CONTROL];

export function getWorkflow(key: string): Workflow | undefined {
  return WORKFLOWS[key];
}

/** Which workflow a domain page leads with. Editorial mapping. */
const DOMAIN_WORKFLOW: Record<string, string> = {
  quality: "capa",
};

export function getDomainWorkflow(domainSlug: string): Workflow | undefined {
  const key = DOMAIN_WORKFLOW[domainSlug] ?? "capa";
  return WORKFLOWS[key];
}
