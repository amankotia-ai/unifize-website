/* ------------------------------------------------------------
 * NC/CAPA Value Stream — the work-side decomposition.
 *
 * Where a Journey describes what the persona experiences, the
 * Value Stream describes what the work demands. Coordination tax
 * lives in the WAIT between steps the persona feels as one thread.
 *
 * Source of truth (verbatim figures): Notion "AI Feature Roadmap:
 * NC/CAPA Value Stream Reduction Layers" (page 33d860e6…), which
 * quotes the Value Stream Steps DB. Step descriptions + Unifize
 * minutes are real; per-step VA/NVA classification is not published
 * per step, so steps are only marked WAIT (explicit in Notion) vs
 * active. Macro reduction (1,523 → 858 min/NCR) and the AI-layer
 * dollar waterfall are verbatim. Full step inventory is 75 steps;
 * the steps shown are those published in the roadmap.
 * ------------------------------------------------------------ */

export interface VSStep {
  /** Hierarchical step number, e.g. "3.10". */
  num: string;
  desc: string;
  /** Unifize-baseline minutes per NCR. */
  min: number;
  /** Idle time between handoffs (Notion marks these "Wait for…"). */
  wait?: boolean;
}

export interface VSStage {
  index: number;
  name: string;
  steps: VSStep[];
}

export interface VSAiLayer {
  code: string;
  name: string;
  /** Annual saving already defined in Notion (USD). */
  defined: number;
  /** Estimated additional if fully populated (USD), low–high. */
  potential: [number, number];
  complexity: "Low" | "Medium" | "Medium-high" | "High" | "Very high";
  status: "Defined" | "Not yet defined";
}

export interface ValueStream {
  id: string;
  title: string;
  standard: string;
  /** Current-state minutes per NCR (as-is). */
  currentMin: number;
  /** Unifize structural minutes per NCR. */
  unifizeMin: number;
  /** WAIT minutes still present at the Unifize baseline. */
  waitMinUnifize: number;
  ncrPerYear: number;
  /** Annual saving from the Unifize structural reduction (USD). */
  unifizeAnnual: number;
  /** Combined Unifize + all AI potential (USD), low–high. */
  fullPotential: [number, number];
  stages: VSStage[];
  aiLayers: VSAiLayer[];
  /** True until the Value Stream is officially wired to the Journey in Notion. */
  sample?: boolean;
}

export const NC_CAPA_VALUE_STREAM: ValueStream = {
  id: "VS-NC-CAPA",
  title: "Non-conformance → corrective action",
  standard: "ISO 13485 · 21 CFR 820",
  currentMin: 1523,
  unifizeMin: 858,
  waitMinUnifize: 300,
  ncrPerYear: 200,
  unifizeAnnual: 121867,
  fullPotential: [172152, 192318],
  stages: [
    {
      index: 1,
      name: "Intake & capture",
      steps: [
        { num: "1.11", desc: "Write problem description & attach evidence", min: 8 },
      ],
    },
    {
      index: 2,
      name: "Problem & severity",
      steps: [
        { num: "2.1", desc: "Review previous NCRs for recurrence", min: 6 },
        { num: "2.2", desc: "Define formal problem statement", min: 10 },
        { num: "2.4", desc: "Isolated event or systemic issue?", min: 8 },
      ],
    },
    {
      index: 3,
      name: "Root cause",
      steps: [
        { num: "3.1", desc: "Find a time all participants are free", min: 1 },
        { num: "3.3", desc: "Prepare agenda & gather QMS data", min: 5 },
        { num: "3.6", desc: "Conduct RCA (5-Why, fishbone, 8D)", min: 35 },
        { num: "3.10", desc: "Wait for participants to confirm / challenge root cause", min: 60, wait: true },
        { num: "3.11", desc: "Follow up with non-respondents", min: 3 },
        { num: "3.12", desc: "Document root cause findings", min: 5 },
      ],
    },
    {
      index: 4,
      name: "Disposition",
      steps: [
        { num: "4.1", desc: "Determine disposition options", min: 10 },
        { num: "4.3", desc: "Wait for engineering to complete review", min: 60, wait: true },
        { num: "4.5", desc: "Prepare disposition recommendation", min: 5 },
        { num: "4.7", desc: "Wait for quality manager approval", min: 30, wait: true },
        { num: "4.8", desc: "Quality manager approves disposition", min: 5 },
      ],
    },
    {
      index: 5,
      name: "Corrective action",
      steps: [
        { num: "5.1", desc: "Review root cause to define corrective actions", min: 15 },
        { num: "5.3", desc: "Document CAs with owners & deadlines", min: 10 },
        { num: "5.4", desc: "Send CA assignments to owners", min: 1 },
        { num: "5.5", desc: "Wait for acknowledgment from CA owners", min: 30, wait: true },
        { num: "5.7", desc: "Quality manager reviews & approves CA plan", min: 30 },
      ],
    },
    {
      index: 6,
      name: "Implementation",
      steps: [
        { num: "6.2", desc: "Follow up on CA progress at intervals", min: 10 },
        { num: "6.3", desc: "Weekly quality meeting on open CAPAs", min: 10 },
        { num: "6.6", desc: "Review implementation evidence", min: 15 },
        { num: "6.8", desc: "Document implementation status", min: 2 },
      ],
    },
    {
      index: 7,
      name: "Effectiveness",
      steps: [
        { num: "7.3", desc: "Collect effectiveness data", min: 10 },
        { num: "7.4", desc: "Evaluate whether recurrence was prevented", min: 20 },
        { num: "7.6", desc: "Document effectiveness verification", min: 3 },
      ],
    },
    {
      index: 8,
      name: "Closure & review",
      steps: [
        { num: "8.1", desc: "Review entire NCR/CAPA for completeness", min: 8 },
        { num: "8.3", desc: "Wait for quality manager closure approval", min: 30, wait: true },
        { num: "8.4", desc: "Quality manager reviews & approves closure", min: 10 },
        { num: "8.5", desc: "Close NCR & CAPA in QMS", min: 0.5 },
        { num: "8.8", desc: "Present NC trends & CAPA status at management review", min: 20 },
      ],
    },
  ],
  aiLayers: [
    { code: "AC", name: "Assisted Capture", defined: 2017, potential: [2750, 3667], complexity: "Low", status: "Defined" },
    { code: "EA", name: "Execution Assist", defined: 4584, potential: [3667, 5500], complexity: "Medium", status: "Defined" },
    { code: "CD", name: "Contradiction Detection", defined: 2983, potential: [4583, 7333], complexity: "High", status: "Defined" },
    { code: "MA", name: "Measurement Assist", defined: 4034, potential: [2750, 4583], complexity: "Medium", status: "Defined" },
    { code: "AI", name: "Autonomous Investigation", defined: 0, potential: [5500, 9167], complexity: "Very high", status: "Not yet defined" },
    { code: "ACoord", name: "Autonomous Coordination", defined: 0, potential: [14667, 22000], complexity: "High", status: "Not yet defined" },
    { code: "IC", name: "Intelligent Completion", defined: 0, potential: [2750, 4583], complexity: "Medium-high", status: "Not yet defined" },
  ],
  sample: true,
};
