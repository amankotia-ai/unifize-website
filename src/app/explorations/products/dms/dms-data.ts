/* ============================================================================
 * dms-data.ts - content for the DMS (Document Management System) product page.
 * Sourced from the Unifize Products database in Notion: DMS (UPD-2),
 * Primary Domain Document and Records Control. Modules: Document Control
 * (MDL-9), Change Control (MDL-10), Training Management (MDL-11). Personas:
 * Document Controller (PPS-5), Training Coordinator (PPS-6).
 * Copy is kept deliberately short: every string earns its place on screen.
 * ========================================================================== */
import type { IntegrationData } from "./dms-integrations";
import type { DmsProblemIllustrationKind } from "./dms-problem-visuals";
import productsMirror from "@/content/notion/products.json";
import personasMirror from "@/content/notion/personas.json";
import industriesMirror from "@/content/notion/industries.json";
import standardsMirror from "@/content/notion/standards.json";
import { dmsCopy } from "./dms-copy";
import {
  buildProductFlows,
  type FlowPresentation,
  type ProductFlow,
  type ProductFlowStep,
} from "../_shared/product-flows";

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

export type DmsCoordinationProblem = {
  visual: DmsProblemIllustrationKind;
  category: string;
  /* rail one-liner in the problem spotlight */
  title: string;
  quote: string;
  /* one supporting sentence on the spotlight stage */
  detail: string;
  metric: string;
  metricLabel: string;
  work: string;
  tax: [string, string];
  outcome: string;
};

/* One source for the Problem spotlight and Coordination Tax timeline. Each
 * card traces to a Pain Points DB row (PP id) and quotes its attached
 * Symptom row verbatim; one card per module story so section 02 answers
 * every wound this section opens. */
export const DMS_PROBLEMS: DmsCoordinationProblem[] = [
  {
    /* PP-5 · Critical · Document Control */
    visual: "audit",
    category: "Evidence assembly",
    title: dmsCopy("problem.card1.title", "Days to assemble one audit record"),
    quote: dmsCopy("problem.card1.quote", "When auditors ask for the full record we spend days pulling it together."),
    detail: dmsCopy("problem.card1.detail", "Evidence is stitched from exports, screenshots, and email forwards. The audit passes; passing costs days of senior time each cycle."),
    metric: "Days",
    metricLabel: "Senior time per audit cycle",
    work: "Answer the audit",
    tax: ["Collect scattered exports", "Reconcile the signatures"],
    outcome: "Evidence already bound",
  },
  {
    /* PP-37 · Critical · Document Control */
    visual: "versions",
    category: "Version control",
    title: dmsCopy("problem.card2.title", "Three versions of one SOP"),
    quote: dmsCopy("problem.card2.quote", "SOPs are written once and never updated even when the process changes."),
    detail: dmsCopy("problem.card2.detail", "The controlled system says v3.2, a file share holds a local v3.1, and the workstation runs a laminated v2.8. The current version is a function of where you look."),
    metric: "3",
    metricLabel: "Copies claiming to be current",
    work: "Use the procedure",
    tax: ["Compare competing copies", "Confirm the effective date"],
    outcome: "One effective version",
  },
  {
    /* PP-33 · Critical · Change Control + Document Control */
    visual: "change",
    category: "Change effectivity",
    title: dmsCopy("problem.card3.title", "The floor hears about the change last"),
    quote: dmsCopy("problem.card3.quote", "A change was approved months ago but has not been fully implemented anywhere."),
    detail: dmsCopy("problem.card3.detail", "The line builds to the old version because the notification, the training, or the parts on hand lag the effective date. The first sign is a rejected part."),
    metric: "Months",
    metricLabel: "From approval to the floor",
    work: "Release the change",
    tax: ["Notify every endpoint", "Chase the effective date"],
    outcome: "Effectivity reaches the line",
  },
  {
    /* PP-36 · High · Change Control + Training Management */
    visual: "training",
    category: "Training cascade",
    title: dmsCopy("problem.card4.title", "Retraining lands weeks after the change"),
    quote: dmsCopy("problem.card4.quote", "Retraining after a change is always late because nobody tracks who needs it."),
    detail: dmsCopy("problem.card4.detail", "People work to the new version without verified training, and the trace between the change and the training is partial when the auditor asks."),
    metric: "Weeks",
    metricLabel: "Untrained on the effective version",
    work: "Train the people",
    tax: ["Track who needs retraining", "Chase the completions"],
    outcome: "Training assigned on release",
  },
];

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

/* the three bundled modules - the core of the product. points feed the
 * interactive explorer; visual captions label the screenshot placeholders. */
export const MODULES: {
  key: string; name: string; promise: string; blurb: string;
  points: string[]; visual: string; standards: string[];
}[] = [
  {
    key: "document-control",
    name: "Document Control",
    promise: dmsCopy("modules.card1.promise", "One true copy."),
    blurb: dmsCopy("modules.card1.blurb", "Author, review, approve, distribute, and periodically review controlled documents with full version history."),
    points: [
      dmsCopy("modules.card1.point1", "Controlled templates and numbering"),
      dmsCopy("modules.card1.point2", "Review and approval routing"),
      dmsCopy("modules.card1.point3", "Watermarked, distributed renders"),
      dmsCopy("modules.card1.point4", "Periodic review with an owner"),
    ],
    visual: "Document library with lifecycle states",
    standards: ["ISO 9001", "21 CFR Part 11", "ISO 13485", "21 CFR Part 820"],
  },
  {
    key: "change-control",
    name: "Change Control",
    promise: dmsCopy("modules.card2.promise", "Every revision carries its evidence."),
    blurb: dmsCopy("modules.card2.blurb", "Change orders and revisions routed through configurable approvals, with impact assessment on the record."),
    points: [
      dmsCopy("modules.card2.point1", "Change orders with impact assessment"),
      dmsCopy("modules.card2.point2", "Configurable approval matrices"),
      dmsCopy("modules.card2.point3", "Evidence attached to the revision"),
      dmsCopy("modules.card2.point4", "Cascades into training on release"),
    ],
    visual: "Change order routed for approval",
    standards: ["ISO 9001", "21 CFR Part 820", "ISO 13485"],
  },
  {
    key: "training-management",
    name: "Training Management",
    promise: dmsCopy("modules.card3.promise", "The change reaches the people."),
    blurb: dmsCopy("modules.card3.blurb", "A revision cascades into the training obligation, so people are always current on the version they use."),
    points: [
      dmsCopy("modules.card3.point1", "Role-to-document training matrix"),
      dmsCopy("modules.card3.point2", "Auto-assignment on new revisions"),
      dmsCopy("modules.card3.point3", "AI-generated quizzes from the SOP"),
      dmsCopy("modules.card3.point4", "Completion reporting for audits"),
    ],
    visual: "Training matrix by role and revision",
    standards: ["ISO 9001", "21 CFR Part 820", "ISO 13485"],
  },
];

/* the controlled-document lifecycle - the spine. gates are 3 to 5 words.
 * details and visual captions feed the interactive lifecycle explorer. */
export const LIFECYCLE: { state: string; gate: string; detail: string; visual: string }[] = [
  {
    state: "Draft", gate: dmsCopy("lifecycle.state1.gate", "From a controlled template"),
    detail: dmsCopy("lifecycle.state1.detail", "Authored from a controlled template with automatic numbering. Nothing reaches the floor from here: the render is watermarked DRAFT and cannot be distributed."),
    visual: "Authoring view with DRAFT watermark",
  },
  {
    state: "In Review", gate: dmsCopy("lifecycle.state2.gate", "Technical accuracy checked"),
    detail: dmsCopy("lifecycle.state2.detail", "Routed to reviewers for technical accuracy. Comments and redlines stay on the record, so the review is part of the document's history, not an email thread."),
    visual: "Review thread with redlines on the record",
  },
  {
    state: "In Approval", gate: dmsCopy("lifecycle.state3.gate", "QA signs, Part 11"),
    detail: dmsCopy("lifecycle.state3.detail", "QA signs with 21 CFR Part 11 meaning where the record requires it: signer, meaning of signature, and timestamp, permanently attached to the revision."),
    visual: "Part 11 signature dialog",
  },
  {
    state: "Effective", gate: dmsCopy("lifecycle.state4.gate", "Watermarked, training assigned"),
    detail: dmsCopy("lifecycle.state4.detail", "Watermarked EFFECTIVE and distributed. Training assignments open the moment it goes live, so people are current on the version they actually use."),
    visual: "Effective document with training status",
  },
  {
    state: "Superseded", gate: dmsCopy("lifecycle.state5.gate", "Prior revision retained"),
    detail: dmsCopy("lifecycle.state5.detail", "The prior revision is retained read-only under the edition it shipped. Every historical version stays retrievable for the auditor who asks."),
    visual: "Version history with retained revisions",
  },
  {
    state: "Obsolete", gate: dmsCopy("lifecycle.state6.gate", "Copies retrieved, records archived"),
    detail: dmsCopy("lifecycle.state6.detail", "Distributed copies are retrieved and the record is archived per your retention policy. The watermark flips to OBSOLETE on every render."),
    visual: "Obsolete record with retrieval log",
  },
];

/* ---- Product Flows: persona journeys across the lifecycle ---------------
 * Built by the shared adapter in ../_shared/product-flows.ts from Ben's
 * Product Flows + Flow Steps mirrors. Presentation below is page-owned. */
export type DmsFlowStep = ProductFlowStep;
export type DmsFlow = ProductFlow;

/* Modules Bundled on the UPD-2 row is not yet populated in the Products
 * mirror; fall back to the three known DMS module page ids until it is. */
const DMS_MODULE_IDS: string[] = (() => {
  const fromProduct = (productsMirror.find((p) => p.id === PRODUCT.id)?.modules ?? []) as string[];
  return fromProduct.length > 0 ? fromProduct : [
    "360860e6-b45e-819a-b47d-d65659287f7a" /* Document Control */,
    "360860e6-b45e-81f9-b902-df2000f4441e" /* Change Control */,
    "360860e6-b45e-81ec-8a8f-c7fb0880a781" /* Training Management */,
  ];
})();

const FLOW_PRESENTATION: FlowPresentation = {
  "29": {
    order: 0,
    title: "Find the current version",
    actor: "Shop Floor Operator",
    description: "Open the current SOP in under two minutes and get back to work.",
    stations: [3],
  },
  "4": {
    order: 1,
    title: "Approve a revision",
    actor: "Document Approver",
    description: "Review the revision, sign it, or return it with clear changes.",
    stations: [1, 2, 3],
  },
  "30": {
    order: 2,
    title: "Run the periodic review",
    actor: "Quality Manager",
    description: "Check the document against current practice and set the next review.",
    stations: [3, 0],
  },
  "18": {
    order: 3,
    title: "Revise through change control",
    actor: "Document Controller",
    description: "Create the next controlled version and route it through approval.",
    stations: [0, 1, 2, 3, 4],
  },
  "28": {
    order: 4,
    title: "Run a controlled change",
    actor: "Change Sponsor",
    description: "Open, coordinate, verify, and close a controlled change.",
    stations: [0, 3],
  },
};

export const DMS_FLOWS: DmsFlow[] = buildProductFlows({
  page: "dms",
  moduleIds: DMS_MODULE_IDS,
  presentation: FLOW_PRESENTATION,
});

/* integrations - the connector section after the lifecycle. Unifize as the
 * coordination layer over the systems of record a document library lives
 * against: ERP (part masters), PLM (specs it controls), identity (who is
 * trained), and content sources it consolidates.
 * NOTE: hubSystems name tools from the Notion "Website Integrations" DB
 * (mirrored in _shared/integrations-catalog.ts, Live rows only), so this is
 * the real connector catalogue rather than a representative stack. */
export const INTEGRATIONS: IntegrationData = {
  heading: dmsCopy("integrations.diagram.heading", "A controlled document is filed against the record it governs."),
  lede: dmsCopy("integrations.diagram.lede", "A document never lives alone. Unifize sits over the ERP, PLM, and identity systems you already run, so a controlled document is filed against the real part, distributed to the real people, and never becomes a fourth copy."),
  record: "the controlled document",
  hubSystems: ["SAP", "Oracle NetSuite", "Dynamics 365", "SharePoint", "Solidworks", "Slack", "Email", "SSO/SAML"],
};

/* capabilities - six, one short line each. glyph keys map to the line-work
 * pictograms in dms-linework.tsx. */
export const CAPABILITIES: { title: string; body: string; glyph: string }[] = [
  { title: dmsCopy("capabilities.card1.title", "Version history"), body: dmsCopy("capabilities.card1.body", "Every revision retained under the edition it shipped."), glyph: "versions" },
  { title: dmsCopy("capabilities.card2.title", "Periodic review"), body: dmsCopy("capabilities.card2.body", "Review dates that route to an owner and expect an attestation."), glyph: "review" },
  { title: dmsCopy("capabilities.card3.title", "State watermarking"), body: dmsCopy("capabilities.card3.body", "DRAFT, EFFECTIVE, OBSOLETE stamped on the render."), glyph: "watermark" },
  { title: dmsCopy("capabilities.card4.title", "Part 11 e-signature"), body: dmsCopy("capabilities.card4.body", "Signer, meaning, and timestamp where the record requires it."), glyph: "signature" },
  { title: dmsCopy("capabilities.card5.title", "Where-used lookup"), body: dmsCopy("capabilities.card5.body", "Reverse-trace a document to everything that references it."), glyph: "trace" },
  { title: dmsCopy("capabilities.card6.title", "Scoped auditor access"), body: dmsCopy("capabilities.card6.body", "Read-only, watermarked, without handing over the library."), glyph: "access" },
];

/* who it is for - section 05. Derived from the Notion mirrors, not
 * hand-typed. Membership = the persona relation on the DMS row (UPD-2) in
 * src/content/notion/products.json; facts (role name, daily activities) come
 * from the personas mirror. Adding or removing a persona on the DMS row in
 * Notion adds or removes the card here on the next sync. Presentation
 * (lifecycle span, portrait, route, copy-tightened daily lines) stays
 * page-owned below, keyed by persona ID; a persona without an entry still
 * renders from mirror facts with a fallback portrait. Personas missing name
 * or daily activities are held back rather than rendered broken. */
type PersonaMirrorRow = {
  pageId: string;
  id: string;
  name: string;
  daily: string[];
};

const PERSONA_PRESENTATION: Record<
  string,
  { owns?: string; img?: string; href?: string; daily?: string[] }
> = {
  "PPS-5": {
    owns: "Draft → Effective",
    img: "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png",
    daily: ["Issue revisions, chase approvers", "Pull document trees for audits", "Close out periodic reviews"],
  },
  "PPS-6": {
    owns: "Effective → Trained",
    img: "/Gemini_Generated_Image_r84h7yr84h7yr84h.png",
    daily: ["Assign training from new revisions", "Chase incomplete training", "Report completion for audits"],
  },
  "PPS-2": {
    owns: "Approval → Release",
    // Reuse a representative portrait from the two primary persona cards.
    img: "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png",
    href: "/explorations/personas/quality-manager",
    daily: ["Approve changes of consequence", "Own the audit programme", "Chair management review"],
  },
};

const FALLBACK_PORTRAIT = "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png";

const dmsProductRow = productsMirror.find((product) => product.id === PRODUCT.id);

/* trust strip + compliance "validated across" chips. Derived from the
 * Industries relation on the DMS row (UPD-2), joined to the industries
 * mirror; rows with Website Status "Hidden" are excluded. Add or remove an
 * industry on the product row in Notion and the chips follow on the next
 * sync - same cascade contract as the persona cards. */
export const TRUST_INDUSTRIES: string[] = (dmsProductRow?.industries ?? [])
  .map((relId) => industriesMirror.find((row) => row.pageId === relId))
  .filter(
    (row): row is (typeof industriesMirror)[number] =>
      Boolean(row?.name) && row?.websiteStatus !== "Hidden",
  )
  .map((row) => row.name);

const dmsPersonaCards = (dmsProductRow?.personas ?? [])
  .map((pageId) => (personasMirror as PersonaMirrorRow[]).find((p) => p.pageId === pageId))
  .filter((p): p is PersonaMirrorRow => Boolean(p && p.name && p.daily.length > 0))
  .map((p) => {
    const presentation = PERSONA_PRESENTATION[p.id] ?? {};
    return {
      role: p.name,
      owns: presentation.owns ?? "",
      daily: (presentation.daily ?? p.daily).slice(0, 3),
      img: presentation.img ?? FALLBACK_PORTRAIT,
      href: presentation.href,
    };
  });

export const AUDIENCE: {
  lede: string;
  personas: {
    role: string;
    owns: string;
    daily: string[];
    img: string;
    href?: string;
  }[];
} = {
  lede: "From first draft to audit evidence, every role works from the same current record.",
  personas: dmsPersonaCards,
};

/* the failure modes DMS is built to close. one line each. */
export const PAINS: { title: string; body: string; severity: "Critical" | "High" | "Medium" }[] = [
  { title: "Version drift across system, file share, and floor", body: "The current version becomes a function of where you look.", severity: "Critical" },
  { title: "Effective dates ambiguous at point of use", body: "Between approval and effective date, no one knows which version applies.", severity: "High" },
  { title: "Approval queues invisible until the SLA breaks", body: "The breach alert is the first sign anything stalled.", severity: "Medium" },
  { title: "Periodic reviews stall without an owner", body: "The date passes, the document stays in use, the finding is predictable.", severity: "Medium" },
];

/* the standards frame. short bodies. */
/* compliance standards - section 07. Membership and order come from the
 * External Standards relation on the DMS row (UPD-2), joined to the
 * standards mirror; add or remove a standard on the product row in Notion
 * and the card follows on the next sync. Presentation (short display name,
 * geo label, card body, logo) stays page-owned below, keyed by standard
 * pageId; an unmapped standard still renders from mirror facts. */
const STANDARD_PRESENTATION: Record<
  string,
  { display?: string; geo?: string; body?: string; logo?: string }
> = {
  /* ISO 9001 */
  "e6dfdb52-f86a-463b-941d-dde4d96397ad": { geo: "ISO · Global", body: "Quality management system requirements.", logo: "/standards/iso.png" },
  /* FDA 21 CFR Part 11 */
  "e11ef55d-7667-44dd-bc9d-2e08d0368ba5": { display: "21 CFR Part 11", geo: "FDA · US", body: "Trustworthy electronic records and signatures.", logo: "/standards/fda.png" },
  /* ISO 13485 */
  "173ab229-ed9c-4f08-a64c-bd25dea753b2": { geo: "ISO · Global", body: "QMS for medical devices.", logo: "/standards/iso.png" },
  /* FDA 21 CFR Part 820 */
  "cd6042e4-d95f-45f5-b387-5ac408a09d15": { display: "21 CFR Part 820", geo: "FDA · US", body: "Quality System Regulation for device cGMP.", logo: "/standards/fda.png" },
  /* EU GMP / EudraLex Vol. 4 */
  "31b860e6-b45e-8136-a302-c009790a9dbb": { display: "EU GMP", geo: "EC · EU", body: "GMP for medicinal products." },
  /* GMP (WHO) */
  "92a9e0bc-dea1-4e5b-94c8-310992d47afa": { geo: "WHO · Global", body: "Consistent, controlled production." },
};

export const STANDARDS: { name: string; geo: string; body: string; issuer: string; logo?: string }[] =
  (dmsProductRow?.standards ?? [])
    .map((relId) => {
      const row = standardsMirror.find((standard) => standard.pageId === relId);
      if (!row?.name) return null;
      const presentation = STANDARD_PRESENTATION[row.pageId];
      return {
        name: presentation?.display ?? row.name,
        issuer: row.issuer || "",
        geo: presentation?.geo ?? [row.issuer, row.geography?.[0]].filter(Boolean).join(" · "),
        body: presentation?.body ?? "Mapped to the controlled document lifecycle.",
        ...(presentation?.logo ? { logo: presentation.logo } : {}),
      };
    })
    .filter((standard): standard is NonNullable<typeof standard> => standard !== null);

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
  no: string; title: string; rev: string; state: "Effective" | "In Approval" | "Draft" | "Obsolete" | "Review Due";
  next: string; key?: boolean;
}[] = [
  { no: "SOP-118", title: "Cleaning validation of process equipment", rev: "D", state: "In Approval", next: "2027-03-01", key: true },
  { no: "SOP-104", title: "Supplier qualification and monitoring", rev: "F", state: "Effective", next: "2026-11-14" },
  { no: "WI-092", title: "Line clearance, packaging area", rev: "B", state: "Effective", next: "2026-09-02" },
  { no: "SOP-093", title: "Supplier audit checklist, periodic review", rev: "C", state: "Review Due", next: "2026-07-01" },
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

/* customer proof films - REAL customer videos from the Webflow CMS Content
 * collection (inventory: dms-testimonial-videos.html, 2026-07-15). Top 10 of
 * 34 customer-attributed DMS-tagged films, picked for page relevance: the
 * revision->training thesis, migration off a legacy eQMS, approvals/sign-off
 * chasing, audits, and the engineering seat the page under-serves. Posters
 * are the Webflow CMS thumbnails (cdn.prod.website-files.com); links go to
 * the live unifize.com content page; wistia kept for future inline embeds. */
export type ProofFilm = {
  url: string;
  title: string;
  person: string;
  role?: string;
  company: string;
  industry: string;
  modules: ("Document Control" | "Change Control" | "Training")[];
  duration: string;
  wistia: string;
  poster: string;
};

const WF = "https://cdn.prod.website-files.com/6475b503eba1a8c129c44339/";
const CONTENT = "https://www.unifize.com/content/";

export const PROOF_FILMS: ProofFilm[] = [
  {
    url: `${CONTENT}how-unifize-ensures-everyone-is-trained-on-the-right-version-of-documents-and-sops`,
    title: "How Unifize ensures everyone is trained on the right version of documents and SOPs",
    person: "Jesse Kolstad",
    role: "Director of Quality",
    company: "Biovation Labs",
    industry: "Nutritional Supplements",
    modules: ["Document Control", "Change Control"],
    duration: "02:27",
    wistia: "qayx823k6h",
    poster: `${WF}657aa71727b24f9d0cb1c49a_BL-JK-13%20Training%20on%20right%20documents%20and%20SOPs.webp`,
  },
  {
    url: `${CONTENT}why-biovation-moved-from-mastercontrol-to-unifize`,
    title: "Why Biovation moved from MasterControl to Unifize",
    person: "Jesse Kolstad",
    role: "Director of Quality",
    company: "Biovation Labs",
    industry: "Nutritional Supplements",
    modules: ["Document Control"],
    duration: "05:21",
    wistia: "r8sesxmui9",
    poster: `${WF}657aa7b7bb4aa8b07a62ea84_BL-JK-03%20Why%20Biovation%20moved%20from%20MasterControl%20to%20Unifize.webp`,
  },
  {
    url: `${CONTENT}streamlining-change-control-on-unifize`,
    title: "Streamlining Change Control on Unifize",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    industry: "Medical Devices",
    modules: ["Change Control"],
    duration: "05:37",
    wistia: "juwzkpk7sw",
    poster: `${WF}657aa52c4b198b064ebbdcd7_HB-CA-13%20Streamlining%20change%20control.webp`,
  },
  {
    url: `${CONTENT}handling-audits-made-simple-with-unifize`,
    title: "Handling audits made simple with Unifize",
    person: "Wilson Lin",
    company: "Applechem",
    industry: "Cosmetics",
    modules: ["Change Control", "Document Control"],
    duration: "00:48",
    wistia: "f1hnfv4qc6",
    poster: `${WF}65cca2c42eedfec5a5d1dea8_AC-WL-N03%20-%20Handling%20audits%20made%20simple%20with%20Unifize.webp`,
  },
  {
    url: `${CONTENT}unifize-as-an-engineering-system-of-record`,
    title: "How we use Unifize as an engineering system of record",
    person: "Michael Hogan",
    role: "Mechanical Engineer",
    company: "Harmonic Bionics",
    industry: "Medical Devices",
    modules: ["Change Control", "Document Control"],
    duration: "01:23",
    wistia: "xwv3jvzgzv",
    poster: `${WF}657aab4cd685df933c53ffe0_HB-MH-08%20-%20How%20we%20use%20Unifize%20as%20an%20engineering%20system%20of%20record.webp`,
  },
  {
    url: `${CONTENT}how-unifize-helped-reduce-our-training-time-and-costs`,
    title: "How Unifize helped reduce our training time and costs",
    person: "Jesse Kolstad",
    role: "Director of Quality",
    company: "Biovation Labs",
    industry: "Nutritional Supplements",
    modules: ["Training"],
    duration: "01:43",
    wistia: "7sk4uqb9d3",
    poster: `${WF}657aa704727faaa188ffb1dc_BL-JK-14%20Reducing%20training%20time%20and%20costs.webp`,
  },
  {
    url: `${CONTENT}using-unifize-to-simplify-approval-processes`,
    title: "Using Unifize to simplify approval processes",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    industry: "Medical Devices",
    modules: ["Change Control"],
    duration: "02:55",
    wistia: "vfemm3b81u",
    poster: `${WF}657aa4b71633a02988282512_HB-CA-18%20Simplifying%20approval%20processes.webp`,
  },
  {
    url: `${CONTENT}getting-engineering-to-adopt-a-new-eqms`,
    title: "Getting engineering to adopt a new eQMS",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    industry: "Medical Devices",
    modules: ["Document Control"],
    duration: "02:33",
    wistia: "imfmnb7pjo",
    poster: `${WF}657aabc5eeb9f695a7629933_HB-CA-09%20Getting%20engineers%20to%20adopt%20a%20new%20eQMS.webp`,
  },
  {
    url: `${CONTENT}problems-with-managing-quality-using-excel-and-word`,
    title: "Problems with managing quality using Excel and Word",
    person: "Wilson Lin",
    company: "Applechem",
    industry: "Cosmetics",
    modules: ["Document Control"],
    duration: "01:08",
    wistia: "jtnswkzidv",
    poster: `${WF}65cc9b48d39fc00a44906715_AC-WL-E04%20-%20Problems%20with%20managing%20using%20Excel%20and%20Word.webp`,
  },
  {
    url: `${CONTENT}what-attracted-us-the-most-about-unifize`,
    title: "What attracted us the most about Unifize",
    person: "Tedd Carr",
    role: "Director of Quality Control",
    company: "The Will-Burt Company",
    industry: "Manufacturing",
    modules: ["Training"],
    duration: "03:00",
    wistia: "i43nixcmyj",
    poster: `${WF}657aa41761d3b23b6023750a_WB-TC-05-%20What%20attracted%20us%20the%20most%20about%20Unifize.webp`,
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
    q: dmsCopy("faq.q1.question", "What exactly is bundled in DMS?"),
    a: dmsCopy("faq.q1.answer", "Three modules on one record: Document Control, Change Control, and Training Management. A change order drives the revision, and the revision drives the training assignment, without re-entry between tools."),
  },
  {
    q: dmsCopy("faq.q2.question", "Does it support 21 CFR Part 11 electronic signatures?"),
    a: dmsCopy("faq.q2.answer", "Yes, where the record requires it. Approvals capture the signer, the meaning of the signature, and a timestamp, and the signature travels with the revision it approved."),
  },
  {
    q: dmsCopy("faq.q3.question", "What happens to superseded and obsolete revisions?"),
    a: dmsCopy("faq.q3.answer", "Superseded revisions are retained read-only under the edition they shipped. When a document goes obsolete, distributed copies are retrieved and the record is archived per your retention policy."),
  },
  {
    q: dmsCopy("faq.q4.question", "How do auditors access the library?"),
    a: dmsCopy("faq.q4.answer", "Through scoped, read-only, watermarked access. You share the document trees the audit needs without handing over the whole library."),
  },
  {
    q: dmsCopy("faq.q5.question", "How does training stay current with revisions?"),
    a: dmsCopy("faq.q5.answer", "A new effective revision cascades into a training obligation for every role mapped to the document, so people are always trained on the version they actually use."),
  },
  {
    q: dmsCopy("faq.q6.question", "Which standards does the lifecycle map to?"),
    a: dmsCopy("faq.q6.answer", "ISO 9001, ISO 13485, 21 CFR Part 11, 21 CFR Part 820, EU GMP, and WHO GMP. One controlled lifecycle, whatever you are audited against."),
  },
];
