/* ============================================================================
 * fda-483-data.tsx - content for the FDA Form 483 TRIGGER page.
 *
 * Grounded in the canonical Notion source-of-truth (mirrored, with provenance,
 * in the industry-template industry-data.ts TRIGGERS + medical-devices-
 * canonical.ts):
 *   - Trigger Events -> "FDA Form 483 observation issued": clock (15 working
 *     days to respond), severity (Urgent), routesTo (CAPA & Effectiveness),
 *     owner (Quality). The related list is the other Medical-Devices triggers,
 *     verbatim from the same source.
 *   - MD_WORKFLOW_VARIANTS (CAPA + Audit evidence): "FDA expects CAPAs closed
 *     within 30-90 days; overdue CAPAs are a common 483 finding" and "evidence
 *     assembled across five systems and three threads" - the stakes and the
 *     failure modes.
 *   - The response reuses the canonical CAPA ChatShell (CAPA-2148) - a 483
 *     observation routes into exactly this CAPA decision trace.
 *   - External Standards: the frame the 483 is written against.
 * Only framing is authored; every factual claim traces to a canonical record.
 * ========================================================================== */
import type { TriggerPageData } from "../_shared/TriggerPage";
import { Fda483Form } from "./fda-483-mocks";

const STANDARDS: TriggerPageData["compliance"]["standards"] = [
  { name: "21 CFR 820", geo: "FDA · US", body: "Quality System Regulation: the frame a 483 is written against, CAPA at 820.100." },
  { name: "21 CFR Part 11", geo: "FDA · US", body: "Electronic records and signatures. Every approval in the response, compliant by default." },
  { name: "ISO 13485", geo: "ISO · Global", body: "Medical-device QMS: corrective action and its evidence across the lifecycle." },
  { name: "21 CFR 803", geo: "FDA · US", body: "Medical Device Reporting: the adjacent clock if the observation touches an adverse event." },
];

/* the other Medical-Devices triggers (verbatim from the Trigger Events source).
 * No trigger pages exist yet besides this one, so every row is honestly badged
 * "Soon" rather than pointed at a dead link. */
const RELATED: TriggerPageData["related"]["items"] = [
  { name: "MDR / vigilance reporting deadline", clock: "30 days FDA · 15 days EU", severity: "Urgent", owner: "Regulatory Affairs" },
  { name: "Recall scope to be defined", clock: "10 working days · 21 CFR 806", severity: "Urgent", owner: "Quality / RA" },
  { name: "DHF gap found at audit", clock: "remediation under audit clock", severity: "Urgent", owner: "Quality / R&D" },
  { name: "Production hold pending disposition", clock: "every hour compounds", severity: "Urgent", owner: "Operations" },
  { name: "Supplier-caused line stop", clock: "line down · hourly cost", severity: "Urgent", owner: "Supplier Quality" },
  { name: "Engineering change rejected at cut-in", clock: "launch date at risk", severity: "High", owner: "Engineering" },
  { name: "Data integrity finding", clock: "enterprise ALCOA+ review", severity: "High", owner: "Compliance & Validation" },
];

export const FDA_483_DATA: TriggerPageData = {
  slug: "fda-483",
  crumb: { industry: { label: "Medical Devices", href: "/explorations/industry-template-modern" }, section: "Triggers", trigger: "Form 483" },
  metaTitle: "FDA Form 483 issued · Trigger · Unifize",
  metaDescription:
    "A Form 483 just landed and the clock is 15 working days. Unifize runs the response on one governed thread - root cause, corrective action, and a Part 11 sign-off - so the trace is the audit trail, not a scramble across five systems.",

  clock: { severity: "Urgent", label: "Statutory clock", value: "15 working days to respond" },

  hero: {
    headline: (
      <>
        A Form 483 just landed. The clock is already <span className="dms-hero__turn">running.</span>
      </>
    ),
    lede: "Every observation's response on one governed thread, so the trace is the audit trail.",
    ctaPrimary: "Book a demo",
    ctaSecondary: { label: "See the response thread", href: "#response" },
    mock: <Fda483Form />,
    mockUrl: "app.unifize.com / quality / fda-483",
  },

  escalation: {
    eyebrowN: 1,
    heading: "Fifteen working days, and only two ways it ends.",
    lede: "The FDA expects a written response to every observation. Respond well and the 483 closes; miss the window or send a thin response, and it escalates.",
    steps: [
      { time: "Day 0", title: "The inspection closes", note: "The investigator leaves and issues the Form 483, one line per observation." },
      { time: "Day 0", title: "Form 483 issued", note: "Every observation now needs a documented, evidence-backed response.", tone: "trigger" },
      { time: "15 working days", title: "The response window", note: "The FDA works to a 15-working-day window for your written response." },
      { time: "If it holds", title: "The 483 closes here", note: "A documented, on-time response with corrective actions, owners, and dates ends it.", tone: "ok" },
      { time: "If it doesn't", title: "It escalates toward a Warning Letter", note: "A late or thin response is how a 483 becomes a Warning Letter; overdue CAPAs are a common repeat finding.", tone: "bad" },
    ],
  },

  breaks: {
    eyebrowN: 2,
    heading: "What breaks when the response is assembled by hand.",
    items: [
      { title: "Evidence across five systems", body: "The work was done; proving it means assembling evidence from five systems and three threads while the clock runs.", severity: "Critical" },
      { title: "No single owner per observation", body: "Observations get split across email and meetings, so no one owns a given response end to end.", severity: "High" },
      { title: "Corrective actions that don't close", body: "A CAPA promised in the response but never proven effective is exactly the finding that comes back next time.", severity: "High" },
      { title: "A trace that can't be replayed", body: "The record says what was decided, not why - so the response can't show the investigator decision-time reality.", severity: "Medium" },
    ],
  },

  response: {
    eyebrowN: 3,
    heading: "The response, run on one accountable thread.",
    trailLabel: "How the response closes",
    steps: [
      { state: "Observation logged", gate: "Signal opened, hold issued", detail: "The 483 observation is opened as a CAPA with the affected units held. Required fields and a named owner are captured at intake, so the response has an accountable start." },
      { state: "Evidence bound", gate: "Inspection, logs, lot trace", detail: "Inspection results, torque logs, photos, and incoming-lot traceability are bound to the record, so the response works from evidence, not a scramble." },
      { state: "Investigation", gate: "Cross-functional review, RCA", detail: "Cross-functional review completes and a root-cause method is run and approved. The trace points at the contributing factor - here, a secondary supplier." },
      { state: "Corrective action", gate: "Committed with Part 11", detail: "Disposition is committed with a 21 CFR Part 11 e-signature: scrap the affected units, retrain the line, and open a supplier SCAR." },
      { state: "CAPA + effectiveness", gate: "Actions owned, effectiveness set", detail: "Corrective and preventive actions are owned with due dates, the supplier SCAR is raised, and an effectiveness check is scheduled - the part a 483 response has to promise and prove." },
      { state: "Response sealed", gate: "Effectiveness proven, trail sealed", detail: "Once the effectiveness check passes, the CAPA closes and the audit trail is sealed - the response the investigator can follow, end to end." },
    ],
    chat: { variant: "capa", points: [0.17, 0.42, 0.6, 0.86, 0.95, 1] },
    mobileNote: { label: "483 response trace", id: "CAPA-2148 · observation → evidence → RCA → action → CAPA → seal" },
  },

  record: {
    eyebrowN: 4,
    heading: "What the investigator gets back.",
    items: [
      { title: "A response they can follow", body: "One thread from observation to close - the decision trace, not a binder assembled after the request.", glyph: "trace" },
      { title: "Part 11 on every approval", body: "Each sign-off is a 21 CFR Part 11 e-signature: attributable, time-stamped, part of the trail.", glyph: "shield" },
      { title: "Effectiveness proven to close", body: "The corrective action carries an effectiveness check that has to pass before the record can close.", glyph: "review" },
      { title: "The audit trail is the response", body: "No separate report to write - the governed thread is the evidence the response rests on.", glyph: "watermark" },
      { title: "One owner per observation", body: "Every observation has a named owner and a date, so nothing in the response is unaccountable.", glyph: "access" },
      { title: "Nothing reconstructed after the fact", body: "The context and evidence state are captured at decision time, not rebuilt from memory later.", glyph: "search" },
    ],
  },

  owner: {
    eyebrowN: 5,
    heading: "Quality owns the clock on this one.",
    item: {
      name: "Quality leadership",
      tag: "Owner · VP Quality · QA Manager · RAQA",
      owns: "Owns release confidence, and reconstructs the trace when the investigator is in the room - which is exactly the seat a 483 response is run from.",
      href: "/explorations/personas/quality-manager",
    },
  },

  related: {
    eyebrowN: 6,
    heading: "The other moments that start a clock.",
    lede: "A 483 is one of the recognizable events in a medical-device quality system. Each one routes into a governed response on the same thread.",
    items: RELATED,
  },

  compliance: {
    eyebrowN: 7,
    heading: "The frame the 483 is written against.",
    standards: STANDARDS,
    industries: ["Medical Devices", "Pharmaceuticals", "Automotive", "Aerospace"],
  },

  faq: {
    eyebrowN: 8,
    heading: "The questions the response raises first.",
    lede: (
      <>
        Anything else, <a href="#fda-483-close-h">bring it to the walkthrough</a>.
      </>
    ),
    items: [
      {
        q: "What's the deadline on a 483?",
        a: "The FDA expects a written response within 15 working days of the inspection close. A response inside that window, with corrective actions and timelines, is what keeps a 483 from escalating to a Warning Letter.",
      },
      {
        q: "Does Unifize replace my QMS?",
        a: "No. Unifize sits alongside the QMS, ERP, PLM, and LIMS you have already validated. It replaces the ungoverned channels - email, meetings, spreadsheets - where the response evidence usually gets assembled.",
      },
      {
        q: "How are the approvals signed?",
        a: "Every approval in the response is captured as a 21 CFR Part 11 electronic signature: attributable and time-stamped, so the decision trace is the audit trail.",
      },
      {
        q: "Can I show the response as one thread?",
        a: "Yes. Each observation runs as a CAPA on a single governed thread - signal, evidence, root cause, corrective action, and a sealed close the investigator can follow end to end.",
      },
      {
        q: "Which standards does it map to?",
        a: "21 CFR 820 (with CAPA at 820.100), 21 CFR Part 11, ISO 13485, and 21 CFR 803 where the observation touches an adverse event.",
      },
    ],
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Bring the 483 you're staring at.",
    lede: "We'll run one observation from signal to a sealed, 21 CFR Part 11 response - the trace the investigator can follow.",
    ctaPrimary: "Book a 30-minute walkthrough",
    ctaSecondary: { label: "See the response thread", href: "#response" },
  },

  footer: {
    tagline: "Every trigger routes into a governed response on one thread.",
    baseRight: "Trigger · Form 483 · Medical Devices",
    nav: [
      {
        label: "This trigger",
        links: [
          { label: "What the clock counts down to", href: "#stakes" },
          { label: "The response", href: "#response" },
          { label: "Who owns it", href: "#owner" },
        ],
      },
      {
        label: "More",
        links: [
          { label: "Related moments", href: "#related" },
          { label: "Compliance", href: "#compliance" },
          { label: "FAQ", href: "#faq" },
          { label: "Medical Devices", href: "/explorations/industry-template-modern" },
        ],
      },
    ],
  },
};
