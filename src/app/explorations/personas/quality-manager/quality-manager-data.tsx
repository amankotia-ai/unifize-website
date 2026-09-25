/* ============================================================================
 * quality-manager-data.tsx - the Quality Manager page (PPS-2) on the rails.
 *
 * Notion decides what renders (persona-source.ts): the titles strip from the
 * persona row, 01 from the Product Roles that name PPS-2, 02 from the Pain
 * Points that name PPS-2, the hero and 03 from PPS-2's own Product Flows
 * (PF-8 and PF-2), 04 from approved Website Customer Videos. This file only
 * picks ids and says them in the page's voice; each pick cites its source.
 *
 * Deliberately not the Quality solution page's story: that page leads with
 * the evidence behind one CAPA (PNT-2, PNT-5, PNT-3, PNT-1) and an inbox.
 * This page is the seat: the decisions that converge on one person, the
 * programme they answer for, and the findings that come back.
 * ========================================================================== */
import type { PersonaRailsData } from "../_shared/types";
import { QM_AUDIT_CONFIGS, QM_HERO_STEPS } from "./qm-arcade";

export const QUALITY_MANAGER_DATA: PersonaRailsData = {
  personaId: "PPS-2",
  path: "/personas/quality-manager",

  /* source: PPS-2 Description, "Typical caseload at any given moment:
   * dozens of pending decisions across CAPAs, change controls, document
   * approvals, deviations, supplier corrective actions, training overdue
   * alerts, audit findings"; the turn is PF-8 s2, "Open the record and
   * review evidence in context" */
  hero: {
    titleLead: "Dozens of decisions wait on you.",
    titleTurn: "Each one arrives with its evidence.",
    sub: "CAPAs, change controls, deviations and audit findings reach you in one queue, each with its evidence and the thread behind it. You decide from the record and sign under 21 CFR Part 11.",
    secondary: { label: "Watch an audit run", href: "#difference" },
    flowId: "8",
    steps: QM_HERO_STEPS,
  },

  titlesLabel: "The same seat, by other titles",

  /* source: Product Roles holding PPS-2 (PRL-1..7). Each line restates the
   * role row's own scope for the Quality Manager: "higher-risk
   * dispositions", "SOPs and quality procedures", "corrective actions of
   * strategic impact", "the Quality Manager (in smaller organizations)",
   * "ISO and internal audits", "product-quality risks". */
  seat: {
    heading: "You hold six roles on the record.",
    lede: "The disposition and the SOP carry your signature. You sponsor the strategic change, run the CAPA when there is no one else to, lead the audit and own the product-quality risk.",
    groups: [
      {
        name: "Approve",
        line: "Sign the higher-risk disposition and the SOP that goes live, with the evidence in view.",
        roles: ["Disposition Approver", "Document Approver"],
        /* the SOP-214 revision CAPA-612 raised, waiting on the QM as its
         * Document Approver (the hero already shows the disposition) */
        viz: {
          kind: "redline",
          wash: "sky",
          cursor: { name: "D. Fontaine", tone: "#0f8f7e" },
          doc: "SOP-214 · Sealing",
          from: "Rev B",
          to: "Rev C",
          lines: [
            { text: "5.1 Verify seal torque at the start of each shift." },
            { text: "5.2 Inspect one seal per lot.", mark: "del" },
            { text: "5.2 Inspect three seals per lot; record the supplier lot.", mark: "ins" },
          ],
          approvers: [
            { name: "R. Mehta", done: true },
            { name: "D. Fontaine", done: false },
          ],
        },
      },
      {
        name: "Drive",
        line: "Carry a change or a corrective action from the day it opens to the day it is proven.",
        roles: ["Change Sponsor", "CAPA Investigator"],
        /* CAPA-612 as the QMS page's PF-3 world holds it: from complaint
         * CMP-341, SOP-214 revised as an action, a 90-day review window */
        viz: {
          kind: "chain",
          wash: "blue",
          kicker: "CAPA-612 · Recurring seal failure",
          links: [
            { id: "CMP-341", label: "Complaint escalated" },
            { id: "CAPA-612", label: "Root cause agreed" },
            { id: "SOP-214", label: "Procedure revised" },
            { id: "90d", label: "Effectiveness check", open: true },
          ],
        },
      },
      {
        name: "Assure",
        line: "Run the audit programme and answer for the product-quality risks on the register.",
        roles: ["Audit Lead", "Risk Owner"],
        viz: {
          kind: "heat",
          wash: "warm",
          cursor: { name: "D. Fontaine", tone: "#0f8f7e" },
          kicker: "Risk register · Line 2",
          title: "Coating thickness drift",
          from: [1, 2],
          to: [1, 0],
          others: [[0, 1], [2, 0], [1, 1]],
        },
      },
    ],
    /* where each role's work runs: the product page's module rail ids */
    links: {
      "Disposition Approver": { product: "QMS", module: "Non-conformance", href: "/products/qms#module-non-conformance" },
      "Document Approver": { product: "DMS", module: "Document Control", href: "/products/dms#module-document-control" },
      "Change Sponsor": { product: "DMS", module: "Change Control", href: "/products/dms#module-change-control" },
      "CAPA Investigator": { product: "QMS", module: "CAPA", href: "/products/qms#module-capa" },
      "Audit Lead": { product: "QMS", module: "Audit Management", href: "/products/qms#module-audit-management" },
      "Risk Owner": { product: "QMS", module: "Quality Risk Management", href: "/products/qms#module-quality-risk-management" },
    },
  },

  /* source: Buyer Personas "Quality governance" worries "repeat issues,
   * audit findings"; the four picks are Pain Points naming PPS-2 alone */
  breaks: {
    heading: "You answer for the programme. The same findings keep coming back.",
    lede: "Each case closes on its own. The pattern across cases, the slipped effectiveness check and the finding nobody owns never reach a queue, so the next audit finds them again.",
    picks: [
      /* PNT-4: "The same defect type closes again three months later with a
       * different CAPA number." */
      { id: "PNT-4", title: "The same defect, a new CAPA number", short: "The pattern across cases is in the data, never in the workflow." },
      /* PNT-6: "a target date but no enforced gate ... The CAPA is closed;
       * the problem is unaddressed." */
      { id: "PNT-6", title: "Effectiveness checks slip", short: "A target date with no gate, so the CAPA closes and the problem stays." },
      /* PNT-8: "The finding sits in the audit report; the action sits in
       * nobody's queue; the next audit re-finds it." */
      { id: "PNT-8", title: "Audit findings stall at the owner", short: "The finding sits in the report and the action in nobody's queue." },
      /* PNT-9: "Senior quality time goes into the build instead of the
       * question." */
      { id: "PNT-9", title: "Management review, built by hand", short: "Every quarter the time goes into the report, not the question." },
    ],
    /* PNT-4 staged on the QMS page's own defect: NC-204, coating thickness
     * on line 2, as the legacy system's search for it would show */
    scene: {
      kicker: "Quality records",
      meta: "3 results",
      query: "coating thickness · line 2",
      rows: [
        { id: "NC-118", when: "Feb", title: "Coating thickness out of spec", capa: "CAPA-540", state: "Closed", note: "Effectiveness not verified", warn: true },
        { id: "NC-161", when: "May", title: "Coating thickness out of spec", capa: "CAPA-571", state: "Closed", note: "Effectiveness check overdue", warn: true },
        { id: "NC-204", when: "Aug", title: "Coating thickness out of spec", capa: "No CAPA yet", state: "Open", note: "Investigated as a new case" },
      ],
      float: { kicker: "Surveillance audit", note: "Show the effectiveness check behind CAPA-540." },
      caption: "Closed twice, back a third time. The pattern was in the data, never in anyone's queue.",
    },
    tail: "Every repeat investigation is paid for twice. That is the coordination tax.",
  },

  /* source: PF-2, "Quality Manager runs an annual ISO 13485 audit on the QMS
   * Module" (Primary Persona PPS-2), steps 1, 2 and 5-8; the poses are the QMS
   * page's AUD-12 journey */
  journey: {
    heading: "Every finding leaves the audit with an owner and its evidence.",
    lede: "The annual ISO 13485 audit, from your queue to your sign-off: each finding recorded against its clause, routed to CAPA with its context, and tracked to closure where you can see it.",
    flowId: "2",
    steps: [
      /* s1 "Receive audit schedule notification two weeks before the due date" */
      { index: 1, icon: "clock", title: "In your queue, two weeks out", body: "The audit waits on your home screen with its record, prior-year findings linked." },
      /* s2 "Open the audit record and review scope" */
      { index: 2, icon: "scope", title: "Scoped from the standard", body: "The checklist drafts from ISO 13485 and your procedures; you confirm the scope." },
      /* s3 (notify) and s4 (the floor walk) run in the thread between these */
      /* s5 "Record findings with severity and clause linkage" */
      { index: 5, icon: "finding", title: "Findings with the clause", body: "Severity, evidence and the linked clause on each finding; the report assembles from them." },
      /* s6 "Route major findings to Corrective Actions" */
      { index: 6, icon: "assign", title: "Routed with its context", body: "The CAPA carries the audit reference, the finding and the clause to its owner. Nothing is reconstructed." },
      /* s7 "Track responses through closure" */
      { index: 7, icon: "verify", title: "Tracked to closure", body: "Due and overdue responses notify on their own; closure ages on your dashboard." },
      /* s8 "Sign off and lock the audit record" */
      { index: 8, icon: "seal", title: "Signed and locked", body: "Once every finding is addressed, your Part 11 sign-off locks the audit record for the year." },
    ],
    configs: QM_AUDIT_CONFIGS,
  },

  /* source: Website Customer Videos, Status Live + Web Use Approved; the
   * two quality leaders on film (Role: Director of Quality Control, Director
   * of Quality). Each fact restates the film's own title. */
  proof: {
    heading: "Quality leaders, in their own words.",
    lede: "Directors of Quality on what changed when their decisions, audits and approvals moved onto one record.",
    /* qp7129voyy: "How Unifize improved our Non-conformances closure time by
     * 75% within the first month" (Tedd Carr, The Will-Burt Company) */
    lead: { wistia: "qp7129voyy", stat: "75%", statLabel: "improvement in non-conformance closure time in the first month" },
    stills: [
      { wistia: "6lp5j555dy", fact: "95% of internal audits run remotely" },
      { wistia: "uashgnl3ie", fact: "Clear accountability, faster decisions" },
      { wistia: "x98prmmwgc", fact: "Faster approvals on product specifications" },
      { wistia: "bnv5xz2fdn", fact: "Moved off an existing eQMS" },
      { wistia: "2r86zqiwdf", fact: "The problem with several quality systems" },
    ],
  },

  close: {
    eyebrow: "Quality on Unifize",
    heading: "Bring the decision that has waited longest.",
    lede: "In thirty minutes we run it on one record: the evidence, the thread and your Part 11 signature, end to end.",
    secondary: { label: "See the QMS", href: "/products/qms" },
  },

  footer: {
    tagline: "The decision trace for regulated operations.",
    note: "Roles · Quality Manager",
  },
};
