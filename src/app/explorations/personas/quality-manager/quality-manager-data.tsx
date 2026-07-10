/* ============================================================================
 * quality-manager-data.tsx - content for the Quality Manager PERSONA page.
 *
 * Grounded in the canonical Notion source-of-truth (mirrored, with provenance,
 * in src/lib/platform-data/medical-devices-canonical.ts and the industry-
 * template industry-data.ts):
 *   - Product Personas -> Quality Manager (PPS-2) + Buyer Personas -> Quality
 *     governance (BP-3): titles, cares-about, worries-about, caseload, "owns".
 *   - Root Causes (RC-2 "Missing decision trace"): the reconstruct-the-trace
 *     thesis that the whole page turns on.
 *   - External Standards (19 linked to Medical Devices): the frame audited
 *     against.
 *   - MD_WORKFLOW_VARIANTS (CAPA): the decision-trace flow, which reuses the
 *     canonical CAPA ChatShell (CAPA-2148) - the same trace QMS/PLM show.
 *   - MD_PRODUCTS: the workflows this role owns map onto QMS/DMS/MES.
 *   - PERSONAS[operations|regulatory|compliance-validation|engineering]: the
 *     adjacent roles this seat works the problem with.
 * Only framing is authored; every factual claim traces to a canonical record.
 * ========================================================================== */
import type { PersonaPageData } from "../_shared/PersonaPage";
import { QmAsks } from "./quality-manager-mocks";

/* the role's title variants (Product Personas -> Quality Manager, PPS-2) */
const ROSTER = ["VP Quality", "Quality Director", "QA Manager", "RAQA Director"];

export const QUALITY_MANAGER_DATA: PersonaPageData = {
  slug: "quality-manager",
  crumb: { industry: { label: "Medical Devices", href: "/explorations/industry-template-modern" }, role: "Quality leadership" },
  metaTitle: "Quality leadership · Medical Devices · Unifize",
  metaDescription:
    "You own release confidence across dozens of open CAPAs, change controls, and approvals. Unifize keeps the decision - context, evidence, and sign-off - on one governed thread, so the trace is ready before the audit is.",

  hero: {
    tier: "Primary buyer",
    headline: (
      <>
        When the investigator asks, the trace is already <span className="dms-hero__turn">there.</span>
      </>
    ),
    lede: "Every decision you own on one governed thread, ready before the audit is.",
    ctaPrimary: "Book a demo",
    ctaSecondary: { label: "See a live CAPA trace", href: "#trace" },
    roster: ROSTER,
    mock: <QmAsks />,
    mockUrl: "app.unifize.com / quality / my-queue",
  },

  gap: {
    eyebrowN: 1,
    heading: "Your system of record tells you a CAPA is open. It can't tell you why.",
    lede: "The record captures what was decided. It doesn't hold the context, the evidence, and the reasoning at the time, so when the investigator asks how you knew, you reconstruct it from memory and five systems.",
    recordId: "CAPA-2148",
    record: { lab: "The system of record", badge: "Open" },
    resolved: { lab: "The decision trace", badge: "Effective" },
    fields: [
      { k: "Why it opened", trace: "Assembly defect · NC-25" },
      { k: "Evidence weighed", evidence: ["Torque logs", "Photos", "Lot LOT-271"] },
      { k: "Who decided, and why", trace: "VP Quality · Part 11", sig: true },
      { k: "Ready for the auditor", record: "Reconstruct it", trace: "Already assembled", key: true },
    ],
  },

  breaks: {
    eyebrowN: 2,
    heading: "The four things that turn a release into a finding.",
    items: [
      { title: "Missing evidence at decision time", body: "The record says what was decided, but the context and evidence state at the time are gone. Not being able to replay decision-time reality is the compliance liability.", severity: "Critical" },
      { title: "Unclear approvals", body: "Who signed, in what order, and what it meant - spread across email and meetings instead of on the record.", severity: "High" },
      { title: "Repeat issues", body: "A corrective action closed on paper but never proven effective, so the nonconformance comes back.", severity: "High" },
      { title: "Audit findings", body: "Overdue controls and unresolved holds surface at the audit instead of before it.", severity: "Medium" },
    ],
  },

  trace: {
    eyebrowN: 3,
    heading: "The trace you reconstruct when the investigator is in the room.",
    trailLabel: "How a CAPA closes",
    steps: [
      { state: "Event raised", gate: "Signal opened, hold issued", detail: "A nonconformance is opened with the affected units held. Required fields and a named owner are captured at intake, so nothing enters your queue unaccountable." },
      { state: "Evidence bound", gate: "Inspection, logs, lot trace", detail: "Inspection results, torque logs, photos, and incoming-lot traceability are bound to the record, so the investigation works from evidence, not memory." },
      { state: "Investigation", gate: "Cross-functional review, RCA", detail: "Cross-functional review completes and a root-cause method is run and approved. The trace points at the contributing factor - here, a secondary supplier." },
      { state: "Disposition", gate: "Committed with Part 11", detail: "Disposition is committed with a 21 CFR Part 11 e-signature: scrap the affected units, retrain the line, and open a supplier SCAR." },
      { state: "CAPA + SCAR", gate: "Actions owned, effectiveness set", detail: "Corrective and preventive actions are owned with due dates, the supplier SCAR is raised, and an effectiveness check is scheduled for the assigned window." },
      { state: "Closed, sealed", gate: "Effectiveness proven, trail sealed", detail: "Once the effectiveness check passes, the CAPA closes and the audit trail is sealed - linked to the QMS record and the design change it drove." },
    ],
    chat: { variant: "capa", points: [0.17, 0.42, 0.6, 0.86, 0.95, 1] },
    mobileNote: { label: "CAPA decision trace", id: "CAPA-2148 · raise → evidence → review → disposition → CAPA → seal" },
  },

  gets: {
    eyebrowN: 4,
    heading: "What you get when the decision lives on one thread.",
    items: [
      { title: "Sign for release with confidence", body: "Release knowing the evidence and the approvals that cleared it are bound to the record.", glyph: "signature" },
      { title: "One thread per decision", body: "Context, evidence, and sign-off on a single governed thread - not reconstructed across five systems.", glyph: "trace" },
      { title: "Part 11 on every approval", body: "Each approval is a 21 CFR Part 11 e-signature: attributable, time-stamped, and part of the trail.", glyph: "shield" },
      { title: "Effectiveness proven, not promised", body: "Corrective actions carry an effectiveness check that has to pass before the record can close.", glyph: "review" },
      { title: "Audit-ready by default", body: "The audit trail is the decision trace - not a report you assemble after the request comes in.", glyph: "watermark" },
      { title: "Recurrence made visible", body: "Repeat issues and overdue controls surface early in your queue, not at the audit.", glyph: "search" },
    ],
  },

  owns: {
    eyebrowN: 5,
    heading: "The workflows you own, on one system.",
    lede: "The decisions in your queue live in modules you already know. Each opens in the product that runs it.",
    items: [
      { name: "CAPA & Nonconformance", product: "QMS", body: "Raise, investigate, disposition, and prove effective - with the trace intact.", href: "/explorations/products/qms" },
      { name: "Change & Document Control", product: "DMS", body: "Controlled documents and change control with 21 CFR Part 11 e-signature and the training cascade.", href: "/explorations/products/dms" },
      { name: "Audit & Supplier Quality", product: "QMS", body: "Audit evidence and supplier corrective actions assembled on the record, not across five systems.", href: "/explorations/products/qms" },
      { name: "Manufacturing quality holds", product: "MES", body: "Quality holds raised on the line the moment an inspection fails, not at final inspection.", href: "/explorations/products/mes" },
    ],
  },

  people: {
    eyebrowN: 6,
    heading: "The people you work the problem with.",
    items: [
      { name: "Operations leadership", tag: "Economic buyer", owns: "Owns whether decisions move at all, and signs for the cost when they don't." },
      { name: "Regulatory Affairs", tag: "Owns the clock", owns: "Owns the submission and label trail under hard statutory deadlines." },
      { name: "Compliance & Validation", tag: "Procurement gatekeeper", owns: "Decides whether a new system clears validation before it ever touches an audit." },
      { name: "Engineering & NPI", tag: "Owns the change", owns: "Owns change velocity with control, and the rationale that must survive the next revision." },
    ],
  },

  faq: {
    eyebrowN: 7,
    heading: "The questions a quality leader asks first.",
    lede: (
      <>
        Anything else, <a href="#quality-manager-close-h">bring it to the walkthrough</a>.
      </>
    ),
    items: [
      {
        q: "Is this a QMS, or does it replace mine?",
        a: "Unifize sits alongside the QMS, ERP, PLM, and LIMS you have already validated. It replaces the ungoverned channels - email, meetings, spreadsheets - where the decision trace goes missing, not your systems of record.",
      },
      {
        q: "How are approvals handled?",
        a: "Every approval is captured as a 21 CFR Part 11 electronic signature: attributable and time-stamped, so the decision trace is the audit trail, not a reconstruction after the fact.",
      },
      {
        q: "What happens to my existing evidence and records?",
        a: "They stay in their systems of record. Unifize binds the evidence, context, and sign-offs to one thread per decision, so the trace can be replayed without assembling it from five places.",
      },
      {
        q: "How fast can I see a real trace?",
        a: "In a walkthrough we take one open CAPA and reconstruct its decision trace end to end - signal, evidence, disposition, and a sealed, Part 11 close.",
      },
      {
        q: "Which standards does it map to?",
        a: "21 CFR 820, 21 CFR Part 11, ISO 13485, ISO 14971, EU MDR, and 21 CFR 803 - the frame a medical-device quality system is audited against.",
      },
    ],
  },

  close: {
    eyebrow: "Ready when you are",
    heading: "Bring your hardest open CAPA.",
    lede: "We'll reconstruct its decision trace end to end - signal, evidence, disposition, and a sealed, 21 CFR Part 11 close.",
    ctaPrimary: "Book a 30-minute walkthrough",
    ctaSecondary: { label: "See a live CAPA trace", href: "#trace" },
  },

  footer: {
    tagline: "One governed thread for every decision you sign for.",
    baseRight: "Quality leadership · Medical Devices",
    nav: [
      {
        label: "This role",
        links: [
          { label: "The gap", href: "#gap" },
          { label: "The trace", href: "#trace" },
          { label: "What you get", href: "#capabilities" },
        ],
      },
      {
        label: "More",
        links: [
          { label: "Workflows you own", href: "#workflows" },
          { label: "Who you work with", href: "#people" },
          { label: "FAQ", href: "#faq" },
          { label: "Medical Devices", href: "/explorations/industry-template-modern" },
        ],
      },
    ],
  },
};
