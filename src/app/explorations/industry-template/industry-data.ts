/* ============================================================================
 * Industry-template (Medical Devices instance) — page-local data.
 *
 * The bulk of the page's content comes from the existing canonical modules:
 *   - medical-devices-canonical.ts  (economics, standards, root cause,
 *     consequences, competitors, proof, coexistence, workflow variants)
 *   - md-module-map.ts              (the Domains × Modules ingress)
 *
 * This file adds only the THREE structures the canonical modules don't yet
 * express in the shape this page needs, each provenance-tagged:
 *   1. TRIGGERS  — Trigger Events with their statutory clock + routing
 *   2. PERSONAS  — the five first-class buyer roles (Buyer Personas via MD ICP)
 *   3. VALIDATED — the "for your validation team" answer block (coexistence +
 *                  Part 11, stated only to canonical limits — no invented certs)
 *
 * STATUS: only Change Control (module) and the Quality Manager (persona) have
 * live pages today. Everything else is honestly badged "Coming soon" and is NOT
 * a clickable dead end. This is deliberate (the panel's #2 objection).
 * ========================================================================== */

export const LIVE_CHANGE_CONTROL = "/industries/medical-devices/change-control";
export const LIVE_QUALITY_MANAGER = "/explorations/medical-devices/quality-manager";

/* --- 1. TRIGGERS — the "what's breaking" ingress surface (Door B) ----------
 * source: Trigger Events DB (33 linked to Medical Devices). Name + Severity +
 * Time Sensitivity + Regulatory Framework are canonical; `clock` condenses the
 * statutory deadline verbatim from the framework field. `routesTo`/`owner` map
 * each trigger to its module + owning persona. Goal Zero = Pending on all → we
 * present these as recognizable moments, never as validated case evidence. */
export interface TriggerRow {
  name: string;
  /** the statutory / operational clock, condensed from Regulatory Framework. */
  clock: string;
  severity: "Urgent" | "High";
  /** the module this routes into. */
  routesTo: string;
  /** the persona who owns the response. */
  owner: string;
  /** live module destination, if one exists. */
  href?: string;
}

export const TRIGGERS: TriggerRow[] = [
  {
    name: "FDA Form 483 observation issued",
    clock: "15 working days to respond",
    severity: "Urgent",
    routesTo: "CAPA & Effectiveness",
    owner: "Quality",
  },
  {
    name: "MDR / vigilance reporting deadline",
    clock: "30 days FDA · 15 days EU",
    severity: "Urgent",
    routesTo: "Complaint / MDR Reporting",
    owner: "Regulatory Affairs",
  },
  {
    name: "Recall scope to be defined",
    clock: "10 working days · 21 CFR 806",
    severity: "Urgent",
    routesTo: "Recall Execution",
    owner: "Quality / RA",
  },
  {
    name: "Engineering change rejected at cut-in",
    clock: "launch date at risk",
    severity: "High",
    routesTo: "Change Control (ECO)",
    owner: "Engineering",
    href: LIVE_CHANGE_CONTROL,
  },
  {
    name: "DHF gap found at audit",
    clock: "remediation under audit clock",
    severity: "Urgent",
    routesTo: "Design Controls / DHF",
    owner: "Quality / R&D",
  },
  {
    name: "Production hold pending disposition",
    clock: "every hour compounds",
    severity: "Urgent",
    routesTo: "Production Hold Disposition",
    owner: "Operations",
  },
  {
    name: "Supplier-caused line stop",
    clock: "line down · hourly cost",
    severity: "Urgent",
    routesTo: "SCAR / Supplier CAPA",
    owner: "Supplier Quality",
  },
  {
    name: "Data integrity finding",
    clock: "enterprise ALCOA+ review",
    severity: "High",
    routesTo: "Document Control",
    owner: "Compliance & Validation",
  },
];

/* --- 2. PERSONAS — the "by your role" ingress surface (Door A) --------------
 * source: Buyer Personas DB (reached via the single MD ICP). Titles / cares /
 * worries are canonical. `owns` is the thesis framing (who reconstructs the
 * trace from this seat). Only Quality leadership has a live persona page; the
 * Compliance & Validation card routes to the in-page validated-state block
 * (#validated) — a real, live destination, resolving the gatekeeper objection. */
export interface PersonaCard {
  key: string;
  tag: string;
  name: string;
  titles: string[];
  /** one-line thesis framing — who reconstructs the trace here. */
  owns: string;
  cares: string;
  worries: string;
  /** live destination, if any. */
  href?: string;
  /** in-page anchor destination (always live). */
  anchor?: string;
  primary?: boolean;
}

export const PERSONAS: PersonaCard[] = [
  {
    key: "quality",
    tag: "Primary buyer",
    name: "Quality leadership",
    titles: ["VP Quality", "Head of Quality", "Quality Director", "Quality Manager", "QA Manager", "RAQA Director"],
    owns: "Owns release confidence, and reconstructs the trace when the investigator is in the room.",
    cares: "Release confidence · audit outcomes · traceability · recurrence",
    worries: "Missing evidence · unclear approvals · repeat issues · audit findings",
    href: LIVE_QUALITY_MANAGER,
    primary: true,
  },
  {
    key: "operations",
    tag: "Economic buyer",
    name: "Operations leadership",
    titles: ["COO", "VP Operations", "Plant Manager", "GM", "Site Director"],
    owns: "Owns whether decisions move at all, and signs for the cost when they don't.",
    cares: "Output · schedule stability · delivery · cross-functional execution",
    worries: "Missed shipments · firefighting · slow decisions · trapped cash",
  },
  {
    key: "regulatory",
    tag: "Owns the clock",
    name: "Regulatory Affairs",
    titles: ["Head of Regulatory Affairs", "VP Regulatory", "RA Director", "Director of Regulatory Strategy"],
    owns: "Owns the submission and label trail under hard statutory deadlines.",
    cares: "Submission timelines · multi-market label currency · MDR/vigilance clocks",
    worries: "Missed deadlines · label version errors · incomplete dossiers",
  },
  {
    key: "compliance-validation",
    tag: "Procurement gatekeeper",
    name: "Compliance & Validation",
    titles: ["Validation Manager", "CSV Lead", "QA Validation Lead", "Quality Compliance Manager"],
    owns: "Decides whether a new system clears validation before it ever touches an audit.",
    cares: "Validated state · 21 CFR Part 11 · audit-trail integrity · audit readiness by default",
    worries: "Uncontrolled changes · revalidation triggers · incomplete audit trail",
    anchor: "#validated",
  },
  {
    key: "engineering",
    tag: "Owns the change",
    name: "Engineering & NPI",
    titles: ["VP Engineering", "Head of R&D", "NPI Manager", "Design Transfer Lead"],
    owns: "Owns change velocity with control, and the rationale that must survive the next revision.",
    cares: "Change velocity with control · cut-in discipline · launch readiness",
    worries: "Uncontrolled changes · long review loops · launch slips · mixed-revision execution",
  },
];

/* --- 3. VALIDATED — the "for your validation team" answer block -------------
 * source: MD_COEXISTENCE (systems of record, Part 11 e-signature) + the
 * decision-trace thesis. STRICTLY canonical: states coexistence and Part 11
 * e-signature (both canonical), and frames deeper validation artifacts (IQ/OQ/PQ,
 * audit-trail integrity, security) as what a validation review covers — it does
 * NOT assert certifications (SOC 2, etc.) as shipped fact (none are canonical). */
export const VALIDATED = {
  eyebrow: "For your validation team",
  headline: "Built to live inside a validated environment, not one you have to re-validate.",
  points: [
    {
      icon: "stack",
      label: "Coexistence, not replacement",
      body: "Unifize sits alongside the QMS, ERP, PLM, and LIMS you have already validated. It replaces the ungoverned channels (email, meetings, spreadsheets) where the decision trace goes missing, not your systems of record.",
    },
    {
      icon: "shield",
      label: "21 CFR Part 11 e-signatures",
      body: "Every approval is captured as a Part 11 electronic signature, attributable and time-stamped, so the decision trace is the audit trail, not a reconstruction after the fact.",
    },
    {
      icon: "chat",
      label: "Your validation questions, answered directly",
      body: "IQ/OQ/PQ, audit-trail integrity and ALCOA+ posture, and security review are walked through with your CSV team in a validation review, before anything touches a regulated record.",
    },
  ],
  cta: "Talk to our validation team",
} as const;

/* The regulatory standards used as the module-index filter facet.
 * source: union of MapModule.standards across MD_DOMAIN_MAP. */
export const STANDARD_FILTERS = [
  "21 CFR 820",
  "21 CFR Part 11",
  "ISO 13485",
  "ISO 14971",
  "EU MDR",
  "21 CFR 803",
] as const;
