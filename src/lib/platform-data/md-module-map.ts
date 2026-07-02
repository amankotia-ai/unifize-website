/* ============================================================================
 * Medical Devices, the Domains × Modules map (section C of the industry page).
 *
 * This is the "where Unifize comes in" breadth layer. Per the industry-page
 * template (2026-06-25): the industry page is built from DOMAINS (grouping) and
 * MODULES (the doors), and each module funnels DOWN to a module page. JTBDs are
 * NOT the organizing unit, they are persona-owned and module-served.
 *
 * PROVENANCE
 *   Domains      → Domains DB (collection b835b86d…). Tier + owner + promise are
 *                  taken verbatim/condensed from the canonical Domain rows.
 *   Modules      → 💽 Modules DB (collection 46717a91…) is the canonical module
 *                  entity, but its `Industries` relation is not yet populated, so
 *                  the per-domain module rosters below are CANONICAL-DERIVED from
 *                  the Domain descriptions + Industries→Medical Devices Regulatory
 *                  Vocabulary. Wire `href`/`moduleUrl` to real 💽 Module rows when
 *                  the Industries relation is filled. (Do NOT use the archived
 *                  ⏲️ Modules DB.)
 *
 * The 9 featured domains == the "9 of 12 coordination tax domains" the Medical
 * Devices Opportunity field claims coverage of.
 * ========================================================================== */

export interface MapModule {
  /** Module name, a door into the platform (e.g. Change Control). */
  name: string;
  /** One line, buyer-voice, what the module governs. */
  blurb: string;
  /** Standards the module helps evidence (subset, for chips). */
  standards?: string[];
  /** Live module page, if one exists yet. */
  href?: string;
}

export interface MapDomain {
  slug: string;
  name: string;
  tier: "Primary" | "Secondary";
  /** Budget owner, canonical Domain field. */
  owner: string;
  /** One line on why this domain carries coordination tax in devices. */
  promise: string;
  modules: MapModule[];
}

/* Primary pillars first (the four-Pillar tier), then the MD-critical secondary
 * doors. Order is the reading order of the map. */
export const MD_DOMAIN_MAP: MapDomain[] = [
  {
    slug: "quality",
    name: "Quality",
    tier: "Primary",
    owner: "VP Quality / QA Director",
    promise:
      "The largest accumulator of coordination tax and your most visible audit surface, where the decision trace either exists or has to be rebuilt.",
    modules: [
      { name: "CAPA & Effectiveness", blurb: "Investigation to verified effectiveness on one accountable thread, closed before it ages past its window.", standards: ["21 CFR 820", "ISO 13485"] },
      { name: "Nonconformance / NCR", blurb: "Every nonconformance owned, evidenced, and dispositioned without the parallel Excel tracker.", standards: ["21 CFR 820"] },
      { name: "MRB Disposition", blurb: "Material review decisions bound to the part, lot, or product they apply to, so audit asks resolve in minutes.", standards: ["ISO 13485"] },
      { name: "Deviation Management", blurb: "Planned and unplanned deviations captured where the decision happens, with the evidence attached.", standards: ["21 CFR 820"] },
      { name: "Internal Audit", blurb: "Findings, responses, and closures held on a durable trail instead of a spreadsheet and an inbox.", standards: ["ISO 13485"] },
    ],
  },
  {
    slug: "product-development",
    name: "Product Development",
    tier: "Primary",
    owner: "VP R&D / VP Engineering",
    promise:
      "Idea to commercial product and every change after, stage-gated decisions that lose their rationale when approvals live in email and design reviews.",
    modules: [
      { name: "Change Control (ECO)", blurb: "One change propagated to documents, approvals, training, and the device record, the single highest coordination-density event in devices.", standards: ["21 CFR 820", "ISO 14971"], href: "/industries/medical-devices/change-control" },
      { name: "Design Controls / DHF", blurb: "Design inputs to outputs kept traceable as the file is built, not reconstructed under audit pressure.", standards: ["21 CFR 820", "ISO 13485"] },
      { name: "Design Transfer / NPI", blurb: "Simultaneous qualification, validation, training, and DHF completeness across R&D, manufacturing, QA, and supply chain.", standards: ["ISO 13485"] },
      { name: "Risk Management File", blurb: "Every change assessed against the risk file, with the rationale captured where the decision is made.", standards: ["ISO 14971"] },
    ],
  },
  {
    slug: "supplier-management",
    name: "Supplier Management",
    tier: "Primary",
    owner: "CPO / Supplier Quality Director",
    promise:
      "The coordination tax that accumulates across organisational boundaries, qualification, evidence exchange, and approval chains with suppliers.",
    modules: [
      { name: "Supplier Qualification / PPAP", blurb: "Qualification and PPAP/APQP packages assembled and approved across the boundary, with a durable record.", standards: ["ISO 13485"] },
      { name: "SCAR / Supplier CAPA", blurb: "Supplier corrective actions that reach effectiveness instead of stalling in a vendor's inbox.", standards: ["21 CFR 820"] },
      { name: "Incoming Inspection / MRB", blurb: "Receipt, inspection, and disposition tied together so quarantined material doesn't go dark.", standards: ["21 CFR 820"] },
      { name: "Quality Agreements", blurb: "GxP contract relationships with active lifecycle governance, not a folder of stale PDFs.", standards: ["ISO 13485"] },
    ],
  },
  {
    slug: "operations",
    name: "Operations",
    tier: "Primary",
    owner: "VP Operations / Plant Manager",
    promise:
      "WIP aging, production holds, and MRB backlog, cross-functional commit points made in escalation calls with no durable decision trace.",
    modules: [
      { name: "Production Hold Disposition", blurb: "Holds released with the evidence and approver chain recorded at the moment the call is made.", standards: ["21 CFR 820"] },
      { name: "WIP / MRB Backlog", blurb: "Aging work-in-process surfaced before it becomes a write-off or a schedule miss.", standards: ["ISO 13485"] },
      { name: "Batch / DHR Review", blurb: "Device history record review held on the thread that produced it, ready for release.", standards: ["21 CFR 820"] },
    ],
  },
  {
    slug: "change-control",
    name: "Change Control",
    tier: "Secondary",
    owner: "VP Engineering / Head of R&D",
    promise:
      "ECO and ECR workflows that require multi-function sign-off, evidence packaging, and version-controlled distribution to suppliers and sites.",
    modules: [
      { name: "Engineering Change (ECO/ECR)", blurb: "Multi-function sign-off with a durable record of what evidence was reviewed and what changed between revisions.", standards: ["21 CFR 820"], href: "/industries/medical-devices/change-control" },
      { name: "Controlled Distribution", blurb: "Version-controlled distribution to manufacturing sites and suppliers, with confirmation of receipt.", standards: ["ISO 13485"] },
    ],
  },
  {
    slug: "document-records-control",
    name: "Document & Records Control",
    tier: "Secondary",
    owner: "VP Quality / Document Control",
    promise:
      "Authoring, review, approval, and obsolescence with version integrity across sites, the version-mismatch failure mode is a top-5 FDA finding.",
    modules: [
      { name: "Document Control", blurb: "Documents in active use tied to an auditable approval record and a controlled distribution log.", standards: ["21 CFR Part 11", "ISO 13485"] },
      { name: "Periodic Review", blurb: "Review cycles that don't stall, surfaced when due, with the training linkage intact.", standards: ["ISO 13485"] },
    ],
  },
  {
    slug: "training-competency",
    name: "Training & Competency",
    tier: "Secondary",
    owner: "VP Quality / Head of Training",
    promise:
      "Every document change triggers a training cascade; the window between procedure effectivity and training completion is an open compliance gap.",
    modules: [
      { name: "Training Cascades", blurb: "The same workflow that releases a new SOP creates the training cascade, assignment, completion, and proof.", standards: ["21 CFR 820", "ISO 13485"] },
      { name: "Competency / Re-qualification", blurb: "Re-qualification proof maintained across sites and partners, ready as an audit target.", standards: ["ISO 13485"] },
    ],
  },
  {
    slug: "post-market-recall",
    name: "Post-Market & Recall",
    tier: "Secondary",
    owner: "VP Quality / CMO",
    promise:
      "The highest-coordination-tax event profile, complaint, MDR/vigilance, and recall workflows running in parallel under hard statutory deadlines.",
    modules: [
      { name: "Complaint / MDR Reporting", blurb: "Awareness date, reportability rationale, and the 30-day FDA / 15-day EU clock governed on one trail.", standards: ["21 CFR 803"] },
      { name: "Recall Execution", blurb: "Scope, customer notifications, returns, and multi-authority filings coordinated as one event.", standards: ["21 CFR 820"] },
    ],
  },
  {
    slug: "regulatory-affairs",
    name: "Regulatory Affairs",
    tier: "Secondary",
    owner: "Head of Regulatory Affairs",
    promise:
      "MDR clocks, multi-market label currency, and submission dossiers assembled under time pressure against hard statutory deadlines.",
    modules: [
      { name: "Label Governance", blurb: "Market-specific label version currency governed instead of tracked in 20-country spreadsheets.", standards: ["EU MDR"] },
      { name: "510(k) / PMA Submission", blurb: "Dossier assembly with the decision rationale and evidence chain held together.", standards: ["21 CFR 820"] },
    ],
  },
];

/** The handful of jobs the Quality leader actually owns day-to-day, surfaced
 *  under the persona (section E), not as an industry axis.
 *  source: Buyer Personas → Quality governance (BP-3) caseload. */
export const MD_PERSONA_JOBS: string[] = [
  "Close CAPAs to verified effectiveness",
  "Approve engineering changes without stalling the launch",
  "Keep the DHF and DHR audit-ready",
  "Disposition deviations and nonconformances",
  "Drive supplier corrective actions to closure",
  "Keep training current with every procedure change",
];
