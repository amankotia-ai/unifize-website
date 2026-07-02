/* ============================================================================
 * dms-data.ts - content for the DMS (Document Management System) product page.
 * Sourced from the Unifize Products database in Notion: DMS (UPD-2),
 * Primary Domain Document and Records Control. Modules: Document Control
 * (MDL-9), Change Control (MDL-10), Training Management (MDL-11). Personas:
 * Document Controller (PPS-5), Training Coordinator (PPS-6).
 * Copy is kept deliberately short: every string earns its place on screen.
 * ========================================================================== */

export const PRODUCT = {
  id: "UPD-2",
  name: "DMS",
  full: "Document Management System",
  domain: "Document and Records Control",
  goalZero: "Pending",
  /* one line. the rest of the page proves it. */
  description:
    "Document Control, Change Control, and Training on one governed record, from draft to obsolete.",
};

/* short chips for the hero */
export const HERO_STANDARDS = ["ISO 9001", "21 CFR Part 11", "ISO 13485", "21 CFR Part 820", "EU GMP"];

/* the three bundled modules - the core of the product. points feed the
 * interactive explorer; visual captions label the screenshot placeholders. */
export const MODULES: {
  key: string; name: string; promise: string; blurb: string;
  points: string[]; visual: string; standards: string[];
}[] = [
  {
    key: "document-control",
    name: "Document Control",
    promise: "One true copy.",
    blurb: "Author, review, approve, distribute, and periodically review controlled documents with full version history.",
    points: [
      "Controlled templates and numbering",
      "Review and approval routing",
      "Watermarked, distributed renders",
      "Periodic review with an owner",
    ],
    visual: "Document library with lifecycle states",
    standards: ["ISO 9001", "21 CFR Part 11", "ISO 13485", "21 CFR Part 820"],
  },
  {
    key: "change-control",
    name: "Change Control",
    promise: "Every revision carries its evidence.",
    blurb: "Change orders and revisions routed through configurable approvals, with impact assessment on the record.",
    points: [
      "Change orders with impact assessment",
      "Configurable approval matrices",
      "Evidence attached to the revision",
      "Cascades into training on release",
    ],
    visual: "Change order routed for approval",
    standards: ["ISO 9001", "21 CFR Part 820", "ISO 13485"],
  },
  {
    key: "training-management",
    name: "Training Management",
    promise: "The change reaches the people.",
    blurb: "A revision cascades into the training obligation, so people are always current on the version they use.",
    points: [
      "Role-to-document training matrix",
      "Auto-assignment on new revisions",
      "Read-and-understood or assessed",
      "Completion reporting for audits",
    ],
    visual: "Training matrix by role and revision",
    standards: ["ISO 9001", "21 CFR Part 820", "ISO 13485"],
  },
];

/* the controlled-document lifecycle - the spine. gates are 3 to 5 words.
 * details and visual captions feed the interactive lifecycle explorer. */
export const LIFECYCLE: { state: string; gate: string; detail: string; visual: string }[] = [
  {
    state: "Draft", gate: "From a controlled template",
    detail: "Authored from a controlled template with automatic numbering. Nothing reaches the floor from here: the render is watermarked DRAFT and cannot be distributed.",
    visual: "Authoring view with DRAFT watermark",
  },
  {
    state: "In Review", gate: "Technical accuracy checked",
    detail: "Routed to reviewers for technical accuracy. Comments and redlines stay on the record, so the review is part of the document's history, not an email thread.",
    visual: "Review thread with redlines on the record",
  },
  {
    state: "In Approval", gate: "QA signs, Part 11",
    detail: "QA signs with 21 CFR Part 11 meaning where the record requires it: signer, meaning of signature, and timestamp, permanently attached to the revision.",
    visual: "Part 11 signature dialog",
  },
  {
    state: "Effective", gate: "Watermarked, training assigned",
    detail: "Watermarked EFFECTIVE and distributed. Training assignments open the moment it goes live, so people are current on the version they actually use.",
    visual: "Effective document with training status",
  },
  {
    state: "Superseded", gate: "Prior revision retained",
    detail: "The prior revision is retained read-only under the edition it shipped. Every historical version stays retrievable for the auditor who asks.",
    visual: "Version history with retained revisions",
  },
  {
    state: "Obsolete", gate: "Copies retrieved, records archived",
    detail: "Distributed copies are retrieved and the record is archived per your retention policy. The watermark flips to OBSOLETE on every render.",
    visual: "Obsolete record with retrieval log",
  },
];

/* capabilities - six, one short line each. */
export const CAPABILITIES: { title: string; body: string }[] = [
  { title: "Version history", body: "Every revision retained under the edition it shipped." },
  { title: "Periodic review", body: "Review dates that route to an owner and expect an attestation." },
  { title: "State watermarking", body: "DRAFT, EFFECTIVE, OBSOLETE stamped on the render." },
  { title: "Part 11 e-signature", body: "Signer, meaning, and timestamp where the record requires it." },
  { title: "Where-used lookup", body: "Reverse-trace a document to everything that references it." },
  { title: "Scoped auditor access", body: "Read-only, watermarked, without handing over the library." },
];

/* who owns this product day to day. short. */
export const PERSONAS: { name: string; tier: string; summary: string; daily: string[]; variants: string }[] = [
  {
    name: "Document Controller",
    tier: "Primary owner",
    summary: "Owns the controlled document lifecycle and answers the one question every auditor asks: is this the latest?",
    daily: ["Issue revisions, chase approvers", "Pull document trees for audits", "Close out periodic reviews"],
    variants: "DC · QMS Administrator · Records Manager",
  },
  {
    name: "Training Coordinator",
    tier: "Primary owner",
    summary: "Owns “people are trained on the current revision”, mapping SOPs to roles and closing the loop for audits.",
    daily: ["Assign training off new revisions", "Chase incomplete training", "Report completion for audits"],
    variants: "Training Lead · QA Training Specialist",
  },
];

/* the failure modes DMS is built to close. one line each. */
export const PAINS: { title: string; body: string; severity: "Critical" | "High" | "Medium" }[] = [
  { title: "Version drift across system, file share, and floor", body: "The current version becomes a function of where you look.", severity: "Critical" },
  { title: "Effective dates ambiguous at point of use", body: "Between approval and effective date, no one knows which version applies.", severity: "High" },
  { title: "Approval queues invisible until the SLA breaks", body: "The breach alert is the first sign anything stalled.", severity: "Medium" },
  { title: "Periodic reviews stall without an owner", body: "The date passes, the document stays in use, the finding is predictable.", severity: "Medium" },
];

/* the standards frame. short bodies. */
export const STANDARDS: { name: string; geo: string; body: string }[] = [
  { name: "ISO 9001", geo: "ISO · Global", body: "Quality management system requirements." },
  { name: "21 CFR Part 11", geo: "FDA · US", body: "Trustworthy electronic records and signatures." },
  { name: "ISO 13485", geo: "ISO · Global", body: "QMS for medical devices." },
  { name: "21 CFR Part 820", geo: "FDA · US", body: "Quality System Regulation for device cGMP." },
  { name: "EU GMP", geo: "EC · EU", body: "GMP for medicinal products." },
  { name: "GMP", geo: "WHO · Global", body: "Consistent, controlled production." },
];

/* validated across regulated manufacturing */
export const INDUSTRIES = [
  "Medical Devices",
  "Pharmaceuticals",
  "In Vitro Diagnostics",
  "Cosmetics",
  "Food Processing",
  "Aerospace",
  "Automotive",
];

/* FAQ - answers grounded in the canonical product copy above. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What exactly is bundled in DMS?",
    a: "Three modules on one record: Document Control, Change Control, and Training Management. A change order drives the revision, and the revision drives the training assignment, without re-entry between tools.",
  },
  {
    q: "Does it support 21 CFR Part 11 electronic signatures?",
    a: "Yes, where the record requires it. Approvals capture the signer, the meaning of the signature, and a timestamp, and the signature travels with the revision it approved.",
  },
  {
    q: "What happens to superseded and obsolete revisions?",
    a: "Superseded revisions are retained read-only under the edition they shipped. When a document goes obsolete, distributed copies are retrieved and the record is archived per your retention policy.",
  },
  {
    q: "How do auditors access the library?",
    a: "Through scoped, read-only, watermarked access. You share the document trees the audit needs without handing over the whole library.",
  },
  {
    q: "How does training stay current with revisions?",
    a: "A new effective revision cascades into a training obligation for every role mapped to the document, so people are always trained on the version they actually use.",
  },
  {
    q: "Which standards does the lifecycle map to?",
    a: "ISO 9001, ISO 13485, 21 CFR Part 11, 21 CFR Part 820, EU GMP, and WHO GMP. One controlled lifecycle, whatever you are audited against.",
  },
];
