/* ============================================================================
 * Medical Devices — canonical content, pulled from the Notion source-of-truth.
 *
 * Per the 2026-06-24 call with Ben: every value a page surfaces must trace to a
 * canonical Notion database — nothing typed by hand into a page. This module is
 * that wiring for the Medical Devices industry exploration pages. Each block
 * carries a `// source:` provenance comment (Notion DB → record / field).
 *
 * Three exploration pages import from here (symptoms / cost / proof) plus the
 * Quality Manager persona page, so the same canonical facts drive every angle.
 *
 * STATUS LEGEND used in comments:
 *   POPULATED   — real, queryable value in Notion today (safe to publish)
 *   QUALITATIVE — real record, but no number attached (publish as words only)
 *   NEEDS-BEN   — NOT in Notion; placeholder/flag only, do not publish as fact
 *
 * Primary records:
 *   Industries → "Medical Devices" (IND-28)  185860e6-b45e-8023-a7d3-e6053bad2a2b
 *   Industry Variants (3 med-device rows, CT primitives + $ per instance)
 *   External Standards (19 linked) · Trigger Events (33 linked)
 *   Root Causes (2 canonical + amplifiers) · Consequences (28)
 *   Buyer Personas → "Quality governance" (BP-3) · Product Personas → QM (PPS-2)
 * ========================================================================== */

export interface SourcedFact {
  /** the value to render */
  value: string;
  /** Notion provenance — DB → record/field. Shown only in the provenance
   *  appendix on the index page, never on the marketing pages themselves. */
  source: string;
}

/* --- Segment economics ---------------------------------------------------- */
// source: Industries DB → Medical Devices (IND-28) → numeric fields. POPULATED.
export const MD_ECONOMICS = {
  companies: 81,
  employees: 1_215_000,
  tamLow: 7_609_072_013, // Low TAM ($)
  annualTaxLow: 75_151_329, // Est Annual Tax Low ($/yr, segment)
  annualTaxHigh: 808_130_435, // Est Annual Tax High ($/yr, segment)
  docFactor: 1.25, // Documentation Factor
  processRigour: 1.2, // Process Rigour Factor
  wageLow: 80, // $/hr
  wageHigh: 200, // $/hr
} as const;

/* --- The three med-device workflow variants (the quantified core) --------- */
// source: Industry Variants DB → rows 1/2/3 (NCR-CAPA, Engineering Change,
// Audit Evidence). Cost Low/High and CT primitives are real fields. POPULATED.
// `touchpoints` is the sum of the CT primitives (T+H+M+G+E) for that variant —
// rendered as "coordination touchpoints per instance".
export interface WorkflowVariant {
  key: string;
  name: string;
  costLow: number; // $ per instance
  costHigh: number; // $ per instance
  cycle: string; // cycle time at risk
  decisions: number;
  touchpoints: number; // T+H+M+G+E
  intensity?: string; // Tax Intensity (where set)
  note: string; // regulatory / operational framing (canonical detail)
}
export const MD_WORKFLOW_VARIANTS: WorkflowVariant[] = [
  {
    key: "capa",
    name: "Nonconformance → CAPA",
    costLow: 285,
    costHigh: 907,
    cycle: "weeks",
    decisions: 6,
    touchpoints: 35, // T8 H8 M3 G6 E10
    note:
      "FDA expects CAPAs closed within 30–90 days; overdue CAPAs are a common 483 finding.",
  },
  {
    key: "change-control",
    name: "Engineering change",
    costLow: 420,
    costHigh: 1_400,
    cycle: "months",
    decisions: 8,
    touchpoints: 48, // T12 H10 M4 G8 E14
    intensity: "Critical",
    note:
      "One change propagates to documents, approvals, training, and the device record — the single highest coordination-density event in the segment.",
  },
  {
    key: "audit",
    name: "Audit evidence",
    costLow: 310,
    costHigh: 1_040,
    cycle: "days",
    decisions: 4,
    touchpoints: 35, // T10 H6 M3 G4 E12
    note:
      "Evidence assembled across five systems and three threads; the work was done — proving it takes weeks.",
  },
];

/* --- Regulatory frame ----------------------------------------------------- */
// source: External Standards DB (19 linked to Medical Devices) + Industries →
// Regulatory Vocabulary. Notes are the approved copy already live on the
// /industries/medical-devices page. POPULATED. Count is real: 19.
export const MD_STANDARDS_COUNT = 19;
export interface StandardRef {
  id: string;
  issuer: string;
  note: string;
}
export const MD_STANDARDS: StandardRef[] = [
  { id: "21 CFR 820", issuer: "FDA", note: "Quality System Regulation: the frame your QMS is audited against." },
  { id: "21 CFR Part 11", issuer: "FDA", note: "Electronic records and signatures. Every approval you sign, compliant by default." },
  { id: "ISO 13485", issuer: "ISO", note: "Medical device QMS across design, production, and post-market." },
  { id: "ISO 14971", issuer: "ISO", note: "Risk management across the device lifecycle. Every change assessed against it." },
  { id: "EU MDR", issuer: "EU", note: "Regulation 2017/745. Technical documentation kept current as changes land." },
  { id: "21 CFR 803", issuer: "FDA", note: "Medical Device Reporting: hard 30-day clocks on adverse events; EU vigilance runs 15." },
];

/* --- Why now: the buying moment ------------------------------------------- */
// source: Trigger Events DB (33 linked to Medical Devices; the urgent /
// immediate severity rows). POPULATED records. NB: Goal Zero = Pending on all
// 33 (validated proof not yet attached) — safe as triggers, not as proof.
export const MD_TRIGGERS: string[] = [
  "FDA Warning Letter received",
  "Form 483 observation issued",
  "MDR / vigilance reporting deadline",
  "Recall scope to be defined",
  "DHF gap found at audit",
  "Production hold pending disposition",
  "Supplier-caused line stop",
  "Data integrity finding",
];

/* --- The structural root cause -------------------------------------------- */
// source: Root Causes DB → 2 canonical causes (RC-8, RC-2) + 5 amplifiers.
// POPULATED. "No shared operational truth" is the gap every symptom traces to.
export const MD_ROOT_CAUSE = {
  primary: {
    name: "No shared operational truth",
    body:
      "The system of record is separate from the system of coordination, so cross-functional work runs on ungoverned channels — email, meetings, spreadsheets. Every symptom traces here.",
  },
  secondary: {
    name: "Missing decision trace",
    body:
      "Records capture what was decided, but not the context, reasoning, and evidence state at the time. The inability to replay decision-time reality is a compliance liability.",
  },
} as const;

/* --- The persona (for the Quality Manager sub-page) ----------------------- */
// source: Buyer Personas DB → "Quality governance" (BP-3) + Product Personas →
// "Quality Manager" (PPS-2, Goal Zero = Pass). POPULATED (function-grouped: no
// med-device-specific persona row exists yet — see NEEDS-BEN).
export const MD_PERSONA = {
  titles: [
    "VP Quality",
    "Head of Quality",
    "Quality Director",
    "Quality Manager",
    "Quality Systems Manager",
    "QA Manager",
    "RAQA Director",
  ],
  caresAbout: ["Release confidence", "Audit outcomes", "Traceability", "Recurrence reduction"],
  worriesAbout: ["Missing evidence", "Unclear approvals", "Repeat issues", "Audit findings", "Release risk"],
  caseload:
    "Dozens of pending decisions at once — CAPAs, change controls, document approvals, deviations, supplier corrective actions, training-overdue alerts, audit findings.",
} as const;

/* --- The cost of inaction, in words --------------------------------------- */
// source: Consequences DB (28 rows) grouped by Consequence Type. QUALITATIVE —
// these carry NO dollar figures in Notion (valued via the counting agreement),
// so they publish as named consequences only, never with invented numbers.
export interface ConsequenceGroup {
  type: string;
  items: string[];
}
export const MD_CONSEQUENCES: ConsequenceGroup[] = [
  { type: "Cycle time", items: ["Long cycle times", "Delayed time to market"] },
  { type: "Cost of poor quality", items: ["Coordination headcount embedded in COGS"] },
  { type: "Compliance drag", items: ["Persistent overdue controls and unresolved holds", "Slow audit and customer proof", "Lagging post-market signal detection"] },
  { type: "Revenue risk", items: ["Quality escapes and warranty cost", "Expanded recall scope", "Lost market access"] },
  { type: "Working capital", items: ["Trapped cash and high working capital"] },
];

/* --- Competitive contrast ------------------------------------------------- */
// source: Industries → Medical Devices → Competitive Landscape (verbatim).
// POPULATED.
export const MD_COMPETITORS = {
  incumbents: [
    { name: "MasterControl", note: "Primary incumbent. Strong document control; weak on cross-functional coordination and real-time decision trace." },
    { name: "Veeva Vault Quality", note: "Primarily pharma-focused." },
    { name: "ETQ Reliance", note: "Mid-market QMS." },
    { name: "Greenlight Guru", note: "Device-specific, but limited to smaller companies." },
  ],
  differentiator:
    "Unifize reconstructs the decision trace across functions, rather than tracking document status.",
} as const;

/* --- Packaging ------------------------------------------------------------ */
// source: Products DB → Description (pricing verbatim). POPULATED. Goal Zero =
// Pending on all (3-customer/3-industry validation not yet done).
export const MD_PRODUCTS = [
  { name: "QMS", note: "Nonconformance, CAPA, Audit, Supplier Quality." },
  { name: "DMS", note: "Document & Change Control, Training; 21 CFR Part 11 e-signature." },
  { name: "PLM", note: "from $1,650 / org / mo" },
  { name: "MES", note: "from $1,950 / org / mo" },
] as const;

/* --- Coexistence context (shared by the workflow components) -------------- */
// source: Concept Map (PLT-2) + Products + Standards. Mirrors the Coexistence
// context the live change-control page passes, retargeted to the CAPA record.
export const MD_COEXISTENCE = {
  recordLabel: "CAPA",
  recordNoun: "corrective action",
  industryLabel: "medical-device",
  standards: ["ISO 13485", "21 CFR 820"],
  approval: "21 CFR Part 11 e-signature",
  systemsOfRecord: ["QMS", "ERP", "PLM", "LIMS"],
  evidence: ["Root-cause analysis", "Effectiveness check", "Training sign-off"],
  aiAssist: [
    "Pre-fills the investigation",
    "Flags missing evidence",
    "Surfaces what's blocking close-out",
  ],
} as const;

/* ============================================================================
 * NEEDS-BEN — values the pages WANT but Notion does not have today. These are
 * rendered as visible placeholders / flags, never as fact. Surfaced so the
 * dependency is explicit (Ben owns the canonical source; Sachin owns screens).
 * ========================================================================== */
export const MD_NEEDS_BEN = {
  headlineMetrics:
    "“80% coordination tax”, “65% cycle-time reduction”, “4× faster to market” — NOT in Notion. Copy only; do not publish as fact until a canonical field exists.",
  namedCustomer:
    "No named med-device customer story is wired to IND-28 (Cook / Merit are not in Notion). Proof maturity = Advocacy (testimonials usable, none attached).",
  symptomsByIndustry:
    "Symptoms DB (61 rows) is universal — none wired to a Medical-Devices variant. Day-in-the-life uses persona ‘worries’ + trigger events instead.",
  personaBenefits:
    "Per-persona Benefit records are empty; benefit copy is derived, flag for canonical wiring.",
  productScreens:
    "Product screens & dashboards do not exist yet (months out, per 2026-06-23). Pages use labelled screen slots where Sachin's packaged prototype plugs in.",
} as const;
