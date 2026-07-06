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

/* the drift comparison - both worlds shown at once, no toggle.
 * without: three competing answers, fading with staleness (tone drives the
 * marker + the version fade); with: the one effective revision. */
export const DRIFT = {
  without: [
    { loc: "Controlled system", ver: "v3.2", note: "Approved, current", tone: "live" as const },
    { loc: "Working file share", ver: "v3.1", note: "A local edit", tone: "warn" as const },
    { loc: "Laminated at the station", ver: "v2.8", note: "Last reprint", tone: "old" as const },
  ],
  withDms: { ver: "v3.2", note: "Effective, watermarked, everywhere you look. Stray copies retrieved." },
};

/* the three payoffs, shown as a hairline register beneath the problem.
 * Distilled from the core value props; glyph keys map to the line-work
 * pictograms in dms-linework.tsx. */
export const PROBLEM_FEATURES: { title: string; body: string; glyph: string }[] = [
  { title: "One source of truth", body: "Single governed record, always current, always controlled.", glyph: "shield" },
  { title: "Easy to find, easy to trust", body: "Watermarked and effective, so teams know what's real.", glyph: "search" },
  { title: "Compliant by design", body: "Stray copies identified and retrieved. Audit ready, every time.", glyph: "sync" },
];

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

/* capabilities - six, one short line each. glyph keys map to the line-work
 * pictograms in dms-linework.tsx. */
export const CAPABILITIES: { title: string; body: string; glyph: string }[] = [
  { title: "Version history", body: "Every revision retained under the edition it shipped.", glyph: "versions" },
  { title: "Periodic review", body: "Review dates that route to an owner and expect an attestation.", glyph: "review" },
  { title: "State watermarking", body: "DRAFT, EFFECTIVE, OBSOLETE stamped on the render.", glyph: "watermark" },
  { title: "Part 11 e-signature", body: "Signer, meaning, and timestamp where the record requires it.", glyph: "signature" },
  { title: "Where-used lookup", body: "Reverse-trace a document to everything that references it.", glyph: "trace" },
  { title: "Scoped auditor access", body: "Read-only, watermarked, without handing over the library.", glyph: "access" },
];

/* who owns this product day to day. short. Portraits are generated
 * representative imagery, not real customers. */
export const PERSONAS: { name: string; tier: string; summary: string; daily: string[]; variants: string; img: string }[] = [
  {
    name: "Document Controller",
    img: "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png",
    tier: "Primary owner",
    summary: "Owns the controlled document lifecycle and answers the one question every auditor asks: is this the latest?",
    daily: ["Issue revisions, chase approvers", "Pull document trees for audits", "Close out periodic reviews"],
    variants: "DC · QMS Administrator · Records Manager",
  },
  {
    name: "Training Coordinator",
    img: "/Gemini_Generated_Image_r84h7yr84h7yr84h.png",
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

/* prototype mock content - illustrative rows for the coded product
 * prototypes. Grounded in the same fiction as the rest of the page
 * (SOP-118 Rev C to D, change CC-2148). */
export const MOCK_REGISTER: {
  no: string; title: string; rev: string; state: "Effective" | "In Approval" | "Draft" | "Obsolete";
  next: string; key?: boolean;
}[] = [
  { no: "SOP-118", title: "Cleaning validation of process equipment", rev: "D", state: "In Approval", next: "2027-03-01", key: true },
  { no: "SOP-104", title: "Supplier qualification and monitoring", rev: "F", state: "Effective", next: "2026-11-14" },
  { no: "WI-092", title: "Line clearance, packaging area", rev: "B", state: "Effective", next: "2026-09-02" },
  { no: "SOP-121", title: "Deviation and CAPA intake", rev: "A", state: "Draft", next: "Pending" },
  { no: "FRM-201", title: "Training record, read and understood", rev: "C", state: "Effective", next: "2027-01-20" },
  { no: "SOP-077", title: "Labeling control and reconciliation", rev: "E", state: "Obsolete", next: "Retired" },
];

/* change order CC-2148 approval route (change-control module mock) */
export const MOCK_CHANGE = {
  id: "CC-2148",
  title: "Update cleaning validation per new equipment",
  state: "In Approval" as const,
  route: [
    { who: "R. Mehta", role: "Quality Assurance", meaning: "Approved, Part 11", date: "2026-06-28" },
    { who: "S. Okafor", role: "Process Engineering", meaning: "Approved, Part 11", date: "2026-06-30" },
    { who: "J. Lindqvist", role: "Operations", meaning: "Pending signature", date: "", key: true },
  ],
  impact: "SOP-118 Rev C to D · training cascade on release",
};

/* role-to-document training matrix (training module mock).
 * done = trained on current rev; assigned = new obligation from Rev D. */
export const MOCK_TRAINING = {
  docs: ["SOP-118 D", "WI-092 B", "FRM-201 C"],
  keyDoc: 0,
  rows: [
    { role: "Line Operator", cells: ["assigned", "done", "done"] },
    { role: "QA Analyst", cells: ["assigned", "done", "done"] },
    { role: "Maintenance", cells: ["assigned", "assigned", "done"] },
  ] as { role: string; cells: ("done" | "assigned")[] }[],
};

/* customer proof carousel - humans, not skeletons. Sample stories in the
 * industry-template-modern fiction (fictional brands, stock portraits);
 * replace with real, verified stories before shipping. */
export const TESTIMONIALS: { quote: string; name: string; title: string; img: string }[] = [
  {
    quote: "Audit prep stopped being a fire drill. Everything the investigator asked for was already on the record.",
    name: "James Okafor",
    title: "Quality Director · Steriva",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
  },
  {
    quote: "Nine days from change request to sealed record. That used to be a quarter.",
    name: "Marco Reyes",
    title: "Head of Regulatory Affairs · Aveline Devices",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
  },
  {
    quote: "Every question the auditor asked had exactly one answer. Our findings list has never been shorter.",
    name: "Priya Nair",
    title: "Chief Operating Officer · Corevance",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=2000&h=1000&q=70",
  },
];

/* outcomes data - NOT RENDERED. The outcomes band was cut from the page
 * until canonical customer numbers exist; the SteppedGrowth primitive and
 * this shape stay ready for that day. */
export const OUTCOMES: { label: string; value: number; display: string }[] = [
  { label: "Q3 2025", value: 240, display: "240" },
  { label: "Q4 2025", value: 610, display: "610" },
  { label: "Q1 2026", value: 980, display: "980" },
  { label: "Q2 2026", value: 1284, display: "1,284" },
];

/* revision trail for SOP-118 (document-control module mock) */
export const MOCK_TRAIL = [
  { rev: "Rev D", state: "Effective 2026-07-02", note: "Signed QA · Part 11", key: true },
  { rev: "Rev C", state: "Superseded", note: "Retained read-only" },
  { rev: "Rev B", state: "Superseded", note: "Retained read-only" },
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
