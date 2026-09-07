/* ============================================================================
 * HOMEPAGE - recognition and routing, revised after the synthetic-audience
 * panel test (2026-07-13, marketing/audiences/*). Panel-driven changes:
 *   - Hero: short tension headline + one-sentence sub (the old descriptor
 *     headline was flagged by the whole panel; the concrete nouns that DID
 *     the retention work moved into the sub). Scroll cue drives to 01.
 *   - Hero mock is a 4-view switcher (quality event / change order / holds /
 *     controlled document): the single quality-events mock polarized by role.
 *     2026-08-09: the bespoke mocks were replaced by the shared stylized-
 *     arcade system (home-arcade.ts) so the homepage, product pages, and
 *     platform page stage one continuous product world.
 *   - Intent chips under the CTAs route search-intent visitors on screen 1.
 *   - Trust strip shows REAL customer companies from the Website Customer
 *     Videos mirror (Notion-governed) instead of placeholder bars.
 *   - 02 swaps the macro-stat wall (dismissed by 6/6 as "industry numbers")
 *     for the per-thread measurement mock: the mechanism, in your numbers.
 *     2026-08-09: 03's bespoke governed-thread mock became the platform
 *     page's persistent-camera journey (PlatformJourney + home-arcade.ts):
 *     NC-204 followed capture -> coordinate -> prove -> write back.
 *   - 04 carries the layer-vs-suite line (provisional wording pending Ben)
 *     and a Product Development door (panel-caught gap).
 *   - Proof is the shared customer film rail (products/_shared/proof-films
 *     .tsx, the product pages' carousel): one attested lead card, then REAL
 *     customer films from the Website Customer Videos mirror; 2026-09-02,
 *     replacing the three-row film ledger. Quality + operations +
 *     engineering voices preserved per the panel's role-coverage finding.
 *   - 06 is the compliance certificate wall (canonical standards copy shared
 *     with the platform page): first-touch reassurance, late in the page,
 *     that the standard governing the visitor is already handled.
 *   - 2026-09-01 panel polish wave (marketing/audiences/simulations/
 *     home-page-2026-09-01.md): hero tabs carry doors to their L2 pages; 03
 *     opens payoff-first with the tax defined second and states the
 *     accountable-AI claim the metadata title makes; the journey is runnable
 *     on NC-204 OR CC-2148 (same five claims, record toggle); chase + floor
 *     lines in the step copy; DMS suite cell carries the retraining trigger.
 * Flow still follows the third-scroll rule from the 2026-07-09 call: hook,
 * parity, THEN the coordination tax named at scroll three.
 * ========================================================================== */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { Eyebrow } from "../products/dms/dms-primitives";
import { HeroArcadeSwitcher, MechanismJourney, ProductSuiteShowcase } from "./home-interactive";
import { HeroHeadline, HeroHeadlineProvider, HeroHeadlineReview } from "./home-headline";
import { SymptomVisual } from "./home-symptom-scenes";
import { SolutionsGrid } from "./home-solutions";
import {
  HOME_HERO_QUALITY_CONFIG,
  HOME_HERO_CHANGE_CONFIG,
  HOME_HERO_OPS_CONFIG,
  HOME_HERO_DOCUMENT_CONFIG,
  HOME_SUITE_DMS_CONFIG,
  HOME_JOURNEY_CONFIGS,
  HOME_JOURNEY_CHANGE_CONFIGS,
} from "./home-arcade";
import { QMS_MODULE_ARCADE_CONFIGS } from "../products/qms/qms-arcade";
import { MES_MODULE_ARCADE_CONFIGS } from "../products/mes/mes-arcade";
import { PLM_MODULE_ARCADE_CONFIGS } from "../products/plm/plm-arcade";
import { CASE_STUDIES, POSTS } from "../resources/_shared/resources-data";
import { CUSTOMER_VIDEOS } from "../resources/_shared/customer-videos";
import { HomeProofFilms } from "./home-proof";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "../products/dms/dms-redesign.css";
import "./home-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "The AI-powered platform for cross-functional work in regulated industries",
  description:
    "Unifize connects the decisions, evidence, and completion your teams scatter across email, meetings, and spreadsheets, so every CAPA, change order, design review, and supplier approval closes faster and closes proven.",
};

/* the hero visual: one arcade app window, four worlds - pick yours. One
 * artifact per audience, per the panel's role-coverage finding. Each tab
 * carries a door to the L2 page that owns its record's world (2026-09-01
 * panel: the doc controller should not need two scrolls and a platform
 * thesis to reach the thing they searched for). */
const HERO_VIEWS = [
  {
    key: "quality",
    label: "Quality event",
    config: HOME_HERO_QUALITY_CONFIG,
  },
  {
    key: "change",
    label: "Change order",
    config: HOME_HERO_CHANGE_CONFIG,
  },
  {
    key: "ops",
    label: "Holds & release",
    config: HOME_HERO_OPS_CONFIG,
  },
  {
    key: "document",
    label: "Controlled document",
    config: HOME_HERO_DOCUMENT_CONFIG,
  },
];

/* 04 - the mechanism journey rail: one claim per pose, the scene proves it.
 * Each step carries a stroke glyph on the same 24 grid as the industry set
 * (7 Sep 2026: the five-claim band that briefly sat above the rail repeated
 * these headings; the glyphs moved onto the rail and the band went). */
const MECHANISM_GLYPHS: Record<string, ReactNode> = {
  capture: <path d="M4 14v5h16v-5M4 14h4l1.5 2.5h5L16 14h4M12 3v9m0 0-3-3m3 3 3-3" />,
  coordinate: <path d="M3 12h6m6 0h6M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0M12 10.6V12l1 1M5 6.5h3M16 17.5h3" />,
  prove: <path d="M12 3 5 5.6v6c0 4 2.9 7.4 7 8.4 4.1-1 7-4.4 7-8.4v-6L12 3Zm-3 9 2.2 2.2L15.5 10" />,
  writeback: <path d="M4 6.5c0-1.4 3.6-2.5 8-2.5s8 1.1 8 2.5S16.4 9 12 9 4 7.9 4 6.5Zm0 0v11C4 18.9 7.6 20 12 20s8-1.1 8-2.5v-11M4 12c0 1.4 3.6 2.5 8 2.5M16 14.5l3-2.5-3-2.5M13 12h6" />,
  measure: <path d="M4 20h16M6 16V9M11 16v-5M16 16v-2M21 16V4M6 6l5 3 5-4 5-2" />,
};

/* the journey rail's per-record copy: same five claims, either record */
const MECHANISM_STEPS_EVENT = [
  { title: "Capture", glyph: MECHANISM_GLYPHS["capture"], body: "The event opens one governed thread with its context attached: the reading, the part, the work order. Logged once, at the station; nothing is re-keyed." },
  { title: "Coordinate", glyph: MECHANISM_GLYPHS["coordinate"], body: "Every handoff gets an owner and a clock everyone can see. Reminders and escalations chase the overdue ones, so you don't." },
  { title: "Prove", glyph: MECHANISM_GLYPHS["prove"], body: "Evidence and approvals close with the work, so the record is complete at sign-off, not at audit prep." },
  { title: "Write back", glyph: MECHANISM_GLYPHS["writeback"], body: "The approved outcome writes back. Unifize keeps the cross-functional trail; your systems of record stay authoritative." },
  { title: "Measure", glyph: MECHANISM_GLYPHS["measure"], body: "Every thread carries its own clock. You watch the coordination tax fall, week by week, against your own baseline." },
];
const MECHANISM_STEPS_CHANGE = [
  { title: "Capture", glyph: MECHANISM_GLYPHS["capture"], body: "The change opens one governed thread with its context attached: the drawing, the risk file, the affected documents. Raised straight from the finding; nothing is re-keyed." },
  { title: "Coordinate", glyph: MECHANISM_GLYPHS["coordinate"], body: "Quality, engineering, and production see one route: an owner on every approval, one clock. Reminders and escalations chase the overdue ones, so you don't." },
  { title: "Prove", glyph: MECHANISM_GLYPHS["prove"], body: "Approvals are Part 11 signatures with their meaning attached, so the change is defensible at sign-off, not reconstructed at audit prep." },
  { title: "Write back", glyph: MECHANISM_GLYPHS["writeback"], body: "The released revision writes back. Your PLM keeps the BOM and the revision; Unifize keeps the decision trail and the effectivity." },
  { title: "Measure", glyph: MECHANISM_GLYPHS["measure"], body: "Every change carries its own clock. You watch review and approval time fall against your own baseline." },
];
const MECHANISM_RECORDS = [
  { key: "event", label: "Quality event", meta: "NC-204", steps: MECHANISM_STEPS_EVENT, configs: HOME_JOURNEY_CONFIGS },
  { key: "change", label: "Change order", meta: "CC-2148", steps: MECHANISM_STEPS_CHANGE, configs: HOME_JOURNEY_CHANGE_CONFIGS },
];


/* Solution doors. The homepage recognizes the symptom; the L2 solution page
 * carries the full problem architecture and proof. The first four render;
 * the rest sit behind "See more solutions" (2026-09-02 sync, H6: more than
 * four reachable, never a carousel). Keep this a data array: Lakshman's
 * wording pass lands 9 Sep. Every entry past the first four points at a
 * domain page that exists; Training & Competency waits on its route. */
const SYMPTOMS = [
  /* the four in front are Raj's pick (2 Sep 2026): quality, documents,
   * suppliers, change control; "Operations" read as a product, not a
   * problem, and moved behind the fold */
  {
    domain: "Quality",
    visual: "cycle",
    claim: "CAPAs take 90+ days to close.",
    note: "The investigation is a week of work. The other eleven are spent chasing sign-offs, evidence, and owners.",
    href: "/explorations/domains/quality",
  },
  {
    domain: "Document & Records Control",
    visual: "versions",
    claim: "Three copies of one SOP claim to be current.",
    note: "The controlled system says v3.2, a file share holds v3.1, and the line runs a laminated v2.8. The current version depends on where you look.",
    href: "/explorations/domains/document-and-records-control",
  },
  {
    domain: "Supplier Management",
    visual: "handoffs",
    claim: "Supplier approvals live in email threads.",
    note: "Qualification evidence, PPAP reviews, and SCARs scatter across mailboxes at the organisational boundary.",
    href: "/explorations/domains/supplier-management",
  },
  {
    domain: "Change Control",
    visual: "approval",
    claim: "The change gets approved. Nobody can replay why.",
    note: "Sign-off happens in email threads and design reviews, so the evidence that was seen and the conditions that were accepted never reach the record.",
    href: "/explorations/domains/change-control",
  },
  /* behind "See more solutions"; claims mirror each domain page's hero */
  {
    domain: "Product Development",
    visual: "trace",
    claim: "The design history is assembled after the fact.",
    note: "Decisions made in reviews and threads get reconstructed into the DHF weeks later, under deadline.",
    href: "/explorations/domains/product-development",
  },
  {
    domain: "Operations",
    visual: "wip",
    claim: "WIP ages while dispositions wait in inboxes.",
    note: "QA calls, engineering decisions, and lab results arrive by escalation, with no trail of who committed to what.",
    href: "/explorations/domains/operations",
  },
  {
    domain: "Regulatory Affairs",
    visual: "deadline",
    claim: "The reporting clock starts before the evidence is gathered.",
    note: "Reportability, submissions, and label approvals close on deadlines someone else set, with the evidence still in five inboxes.",
    href: "/explorations/domains/regulatory-affairs",
  },
  {
    domain: "Post-Market & Recall",
    visual: "tracks",
    claim: "A recall is four workflows, each on its own clock.",
    note: "Hold, notification, returns, and the submission run under different owners. The decisions holding them together happen on calls nobody records.",
    href: "/explorations/domains/post-market-and-recall",
  },
  {
    domain: "Compliance",
    visual: "matrix",
    claim: "You can prove compliance today. Ask again tomorrow.",
    note: "Validation, data integrity, and regulatory change are governed in briefs and spreadsheets beside the quality system, so the answer has to be rebuilt each time.",
    href: "/explorations/domains/compliance",
  },
];

const PRIMARY_SOLUTIONS = [
  { name: "Quality", meta: "CAPA · NC · Audits", href: "/explorations/domains/quality" },
  { name: "Supplier Management", meta: "PPAP · SCARs", href: "/explorations/domains/supplier-management" },
  { name: "Operations", meta: "Holds · Dispositions", href: "/explorations/domains/operations" },
  { name: "Product Development", meta: "ECOs · Design history", href: "/explorations/domains/product-development" },
];

/* 04 - each product poses the arcade window on its ESSENCE artifact, the one
 * moment only that product owns (2026-09-01 repose: the QMS capture pose and
 * the hero-duplicated DMS viewer read as the same chat window four times):
 *   QMS - the CAPA action plan mid-implementation; the differentiator is the
 *         closure discipline, not the capture. Fresh record too: NC-204
 *         already appears in the hero and the 03 journey.
 *   DMS - the revision chain (D effective, C superseded, the change record
 *         between); the hero's fourth tab keeps point of use.
 *   MES - the batch record building itself at the station, live entry caret.
 *   PLM - the requirement-to-verification trace, closed.
 * Four poses, four camera positions, four artifacts - not four chat threads. */
const PRODUCTS = [
  {
    code: "QMS",
    name: "Quality management",
    body: "CAPA, audits, nonconformances, and change control on one governed quality record.",
    outcome: "Close the finding. Keep the decision.",
    href: "/explorations/products/qms",
    config: QMS_MODULE_ARCADE_CONFIGS["capa"],
  },
  {
    code: "DMS",
    name: "Document management",
    body: "Controlled documents, versioning, and e-signatures from draft to obsolete. A revision going effective assigns the retraining itself.",
    outcome: "One current version, everywhere.",
    href: "/explorations/products/dms",
    config: HOME_SUITE_DMS_CONFIG,
  },
  {
    code: "MES",
    name: "Manufacturing execution",
    body: "Electronic batch records and shop-floor execution with evidence captured as work happens.",
    outcome: "The record builds with the shift.",
    href: "/explorations/products/mes",
    config: MES_MODULE_ARCADE_CONFIGS["electronic-batch-lot-records"],
  },
  {
    code: "PLM",
    name: "Product lifecycle",
    body: "Requirements, design controls, BOMs, and change orders on one traceable product record.",
    outcome: "Keep the trace from input to release.",
    href: "/explorations/products/plm",
    config: PLM_MODULE_ARCADE_CONFIGS["design-controls-traceability"],
  },
];

const INDUSTRY_GROUPS = [
  {
    name: "Life sciences",
    body: "Decision trails that stand up to inspectors, sponsors, and assessors.",
    industries: [
      { name: "Medical Devices", moment: "A complaint turns reportable", href: "/explorations/industry-template-modern", icon: "medical-devices" },
      { name: "Pharmaceuticals", moment: "A deviation lands on a batch", href: "/explorations/industries/pharmaceuticals", icon: "pharmaceuticals" },
      { name: "Contract Research Orgs", moment: "A protocol deviation at a site", href: "/explorations/industries/cro", icon: "cro" },
      { name: "Laboratories", moment: "An out-of-spec result", href: "/explorations/industries/laboratories", icon: "laboratories" },
    ],
  },
  {
    name: "Process & consumer",
    body: "Controlled changes and evidence across formulation, production, and release.",
    industries: [
      { name: "Chemicals", moment: "A formulation change", href: "/explorations/industries/chemicals", icon: "chemicals" },
      { name: "Cosmetics", moment: "A safety substantiation", href: "/explorations/industries/cosmetics", icon: "cosmetics" },
      { name: "Food Processing", moment: "A hold on a lot", href: "/explorations/industries/food-processing", icon: "food-processing" },
      { name: "Nutritional Supplements", moment: "A rejected raw material", href: "/explorations/industries/nutritional-supplements", icon: "nutritional-supplements" },
    ],
  },
  {
    name: "Discrete manufacturing",
    body: "Configuration, supplier, and production decisions with the rationale intact.",
    industries: [
      { name: "Automotive", moment: "A PPAP resubmission", href: "/explorations/industries/automotive", icon: "automotive" },
      { name: "Aerospace", moment: "A nonconformance on a flight part", href: "/explorations/industries/aerospace", icon: "aerospace" },
      { name: "Industrial Machinery", moment: "A design change after CE marking", href: "/explorations/industries/industrial-machinery", icon: "industrial-machinery" },
    ],
  },
];

/* 05 - one solid pictogram per industry: filled geometric silhouettes with
 * negative-space cutouts, all on the same 24 grid so the registry rows read
 * as one drawn set. */
const INDUSTRY_ICON_PATHS: Record<string, ReactNode> = {
  "medical-devices": (
    <path
      fillRule="evenodd"
      d="M12 20.8C7.1 16.7 3.4 13.4 3.4 9.3 3.4 6.1 5.7 3.9 8.4 3.9c1.4 0 2.8.7 3.6 1.8.8-1.1 2.2-1.8 3.6-1.8 2.7 0 5 2.2 5 5.4 0 4.1-3.7 7.4-8.6 11.5zM10.9 7.9h2.2v2h2v2.2h-2v2h-2.2v-2h-2V9.9h2z"
    />
  ),
  pharmaceuticals: (
    <g transform="rotate(45 12 12)">
      <path
        fillRule="evenodd"
        d="M7.2 8.6h9.6a3.4 3.4 0 0 1 0 6.8H7.2a3.4 3.4 0 0 1 0-6.8zM11.2 8.6h1.6v6.8h-1.6z"
      />
    </g>
  ),
  cro: (
    <path
      fillRule="evenodd"
      d="M9 2.8h6v1.7h4.2v16.7H4.8V4.5H9zm1.95 13.5L7.8 13.15l1.5-1.5 1.65 1.65 3.75-3.75 1.5 1.5z"
    />
  ),
  laboratories: (
    <path
      fillRule="evenodd"
      d="M9.6 2.8h4.8v1.8h-1v4.2l5 9.6c.65 1.25-.25 2.8-1.65 2.8H7.25c-1.4 0-2.3-1.55-1.65-2.8l5-9.6V4.6h-1zM12 15.4a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zm-1.8-2.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
    />
  ),
  chemicals: (
    <path
      fillRule="evenodd"
      d="M12 2.6l8.2 4.7v9.4L12 21.4l-8.2-4.7V7.3zm0 6.3a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2z"
    />
  ),
  cosmetics: (
    <path d="M9.2 3.4l5.6 2.6v4.6H9.2zM8.2 10.6h7.6v3H8.2zM6.6 13.6h10.8v7.4H6.6z" />
  ),
  "food-processing": (
    <path d="M13.1 6.1c.3-2.1 2-3.5 4.2-3.5-.1 2.2-1.6 3.8-4.2 3.5zM11.3 3.9h1.4c-.1 1.4 0 2.5.3 3.6h-2c.3-1.1.4-2.2.3-3.6zM8.6 6.6c1.2 0 2.4.5 3.4 1.5 1-1 2.2-1.5 3.4-1.5 2.8 0 4.7 2.3 4.7 5.2 0 3.9-2.8 8.9-5.2 8.9-.9 0-1.5-.5-2.9-.5s-2 .5-2.9.5c-2.4 0-5.2-5-5.2-8.9 0-2.9 1.9-5.2 4.7-5.2z" />
  ),
  "nutritional-supplements": (
    <path
      fillRule="evenodd"
      d="M8 2.8h8v2.9h1.6v15.5H6.4V5.7H8zm1.3 9.7h5.4a1.5 1.5 0 0 1 0 3H9.3a1.5 1.5 0 0 1 0-3z"
    />
  ),
  automotive: (
    <path
      fillRule="evenodd"
      d="M2.6 17.2v-4.6c0-.7.5-1.3 1.1-1.5l1.7-.5 1.6-3.5c.4-.9 1.3-1.5 2.3-1.5h5.4c1 0 1.9.6 2.3 1.5l1.6 3.5 1.7.5c.7.2 1.1.8 1.1 1.5v4.6zM7.7 13.1a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zm8.6 0a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8z"
    />
  ),
  aerospace: (
    <path d="M11.2 2.9c.2-.8 1.4-.8 1.6 0l1.4 4.8 7 4.2v2.7l-6.7-2-.5 4.6 2.5 1.9v2.2L12 19.9l-4.5 1.4v-2.2l2.5-1.9-.5-4.6-6.7 2v-2.7l7-4.2z" />
  ),
  "industrial-machinery": (
    <path
      fillRule="evenodd"
      d="M10.7 2.5h2.6l.5 2.2c.6.2 1.2.4 1.7.8l2.1-.9 1.8 1.8-.9 2.1c.3.5.6 1.1.8 1.7l2.2.5v2.6l-2.2.5c-.2.6-.4 1.2-.8 1.7l.9 2.1-1.8 1.8-2.1-.9c-.5.3-1.1.6-1.7.8l-.5 2.2h-2.6l-.5-2.2c-.6-.2-1.2-.4-1.7-.8l-2.1.9-1.8-1.8.9-2.1c-.3-.5-.6-1.1-.8-1.7l-2.2-.5v-2.6l2.2-.5c.2-.6.4-1.2.8-1.7l-.9-2.1 1.8-1.8 2.1.9c.5-.3 1.1-.6 1.7-.8zM12 9.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2z"
    />
  ),
};

function IndustryIcon({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {INDUSTRY_ICON_PATHS[type]}
    </svg>
  );
}

const ENTRY_PATHS = [
  {
    label: "By solution",
    glyph: "solution",
    title: "I need to improve a process.",
    body: "Start with the cross-functional work that is slow, unclear, or difficult to prove.",
    links: PRIMARY_SOLUTIONS,
    href: "#solutions",
    cta: "Explore solutions",
  },
  {
    label: "By product",
    glyph: "product",
    title: "I am evaluating a system.",
    body: "Start with the governed record your team needs to run and keep current.",
    links: PRODUCTS.map((product) => ({ name: product.name, meta: product.code, href: product.href })),
    href: "#products",
    cta: "Explore products",
  },
  {
    label: "By industry",
    glyph: "industry",
    title: "Show me my regulated world.",
    body: "Start with your industry: the systems it runs on and the moments that begin the clock.",
    links: [
      INDUSTRY_GROUPS[0].industries[0],
      INDUSTRY_GROUPS[0].industries[1],
      INDUSTRY_GROUPS[1].industries[0],
      INDUSTRY_GROUPS[2].industries[1],
    ].map((industry) => ({ name: industry.name, meta: industry.moment, href: industry.href })),
    href: "#industries",
    cta: "Explore industries",
  },
];

/* the resources band is a typographic index: one row per collection, with
 * the live count pulled from the same canonical records the Resources pages
 * render. */
const RESOURCE_ROWS = [
  {
    label: "Customer stories",
    body: "Hear the change in the words of the people who ran it.",
    href: "/explorations/resources/testimonials",
    cta: `Watch all ${CUSTOMER_VIDEOS.length} stories`,
  },
  {
    label: "Case studies",
    body: "See the backlog, the intervention, and the measured result.",
    href: "/explorations/resources/case-studies",
    cta: `See all ${CASE_STUDIES.length} case studies`,
  },
  {
    label: "Blog",
    body: "Field notes for quality, operations, and product leaders.",
    href: "/explorations/resources/blog",
    cta: `Read all ${POSTS.length} field notes`,
  },
];

/* trust strip: real companies from the Website Customer Videos mirror - only
 * names a customer attested on the record render here */
/* the customer logo set the live site carries (public/customers, pulled
 * from unifize.com on 7 Sep 2026); rendered as a moving strip (Raj, 2 Sep:
 * "a moving list of icons of all the customers"). Monochromed by CSS. */
const CUSTOMER_LOGOS: { name: string; src: string; h?: number }[] = [
  { name: "Biovation Labs", src: "/customers/biovation-labs.svg" },
  { name: "Harmonic Bionics", src: "/customers/harmonic-bionics.png" },
  { name: "Applechem", src: "/customers/applechem.png" },
  /* EFCO's globe-behind-wordmark lockup collapses to a blob once monochromed;
   * back in when a flat wordmark file exists */
  { name: "Adaptive Health", src: "/customers/adaptive-health.png", h: 44 },
  { name: "Dynamic Blending", src: "/customers/dynamic-blending.svg", h: 46 },
  { name: "Rastelli", src: "/customers/rastelli.svg" },
  { name: "Jamco", src: "/customers/jamco.png" },
  { name: "ATS", src: "/customers/ats.png" },
  { name: "Yanuvia", src: "/customers/yanuvia.png" },
  { name: "LeaderBrand Produce", src: "/customers/leaderbrand-produce.png" },
  { name: "Laundrytec", src: "/customers/laundrytec.png" },
  { name: "Maia Estates", src: "/customers/maia-estates.svg" },
];

/* 01 - the three ways in, drawn: converging process lanes, the product mark's
 * module squares, a certificate. One stroke, one weight. */
function EntryGlyph({ type }: { type: string }) {
  if (type === "solution") {
    return (
      <svg className="hm-entry__glyph" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 5.5h5M3.5 12h5.5M3.5 18.5h5M8.5 5.5c4.5 0 3.5 6.5 8 6.5M8.5 18.5c4.5 0 3.5-6.5 8-6.5M14 12h6.5M17.5 9l3 3-3 3" />
      </svg>
    );
  }
  if (type === "product") {
    return (
      <svg className="hm-entry__glyph" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" />
        <rect x="13.5" y="3.5" width="7" height="7" />
        <rect x="8.5" y="13.5" width="7" height="7" />
      </svg>
    );
  }
  return (
    <svg className="hm-entry__glyph" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="3" width="16" height="13.5" />
      <path d="M7.5 7h9M7.5 10h9M7.5 13h5" />
      <circle cx="15.5" cy="16.5" r="2.6" />
      <path d="M14.2 18.8L13.4 22l2.1-1.3 2.1 1.3-.8-3.2" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--home">
      <DmsHeader />

      {/* ============================ HERO =============================
       * Regulated-industry outcome headline (variants under review, see
       * home-headline.tsx); the concrete nouns carry the sub. The
       * coordination tax is NOT named here (third-scroll rule). */}
      <section className="dms-section dms-hero" aria-label="Unifize">
        <div className="dms-wrap dms-hero__inner">
          <HeroHeadlineProvider>
            <div className="dms-hero__grid">
              <div className="dms-hero__left">
                {/* five review variants, A revolves the record noun; see
                  * home-headline.tsx (2026-09-02 sync with Raj) */}
                <HeroHeadline />
              </div>
              <div className="dms-hero__right">
                <p className="dms-lede dms-hero__sub">
                  Unifize closes the gap between your systems and your teams, so CAPAs, change orders, and design
                  reviews close faster, and close proven.
                </p>
                <div className="dms-hero__ctas">
                  <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                  <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                    Take Coordination Tax Assessment
                  </Link>
                </div>
                {/* review strip for the 5 Sep pick; delete with the unused variants */}
                <HeroHeadlineReview />
              </div>
            </div>
          </HeroHeadlineProvider>
        </div>

        {/* the hero visual: one arcade window, four worlds - pick yours */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo hm-hero-demo">
          <HeroArcadeSwitcher views={HERO_VIEWS} />
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
       * Real companies from the Website Customer Videos mirror; each name
       * is attested on film by its own people. */}
      <section className="dms-section dms-section--dark dms-trust" aria-label="Customers">
        <div className="dms-wrap dms-trust__inner">
          <div className="hm-logos">
            {/* two identical tracks; the second is decorative and makes the loop seamless */}
            {[0, 1].map((copy) => (
              <ul className="hm-logos__track" key={copy} aria-label={copy === 0 ? "Customer companies" : undefined} aria-hidden={copy === 1}>
                {CUSTOMER_LOGOS.map((logo) => (
                  <li key={logo.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={copy === 0 ? logo.name : ""}
                      style={logo.h ? { height: logo.h } : undefined}
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 01 · PRIMARY ROUTER ===============
       * The homepage is L1. This section hands visitors directly to the L2
       * taxonomy that matches the way they arrived. */}
      <section className="dms-section hm-entry-section" id="doors">
        <div className="dms-wrap">
          <div className="hm-entry__head" data-reveal>
            <Eyebrow n={1}>Choose your way in</Eyebrow>
            <h2 className="dms-h2">Start with what brought you here.</h2>
            <p className="dms-lede">
              Improve the work, evaluate the system, or see Unifize in your regulated world. Every path leads to
              the same governed decision trail.
            </p>
          </div>

          <div className="hm-entry-grid" data-reveal>
            {ENTRY_PATHS.map((path, index) => (
              <article className="hm-entry" key={path.label}>
                <div className="hm-entry__intro">
                  <EntryGlyph type={path.glyph} />
                  <span className="hm-entry__index dms-data">{String(index + 1).padStart(2, "0")}</span>
                  <span className="hm-entry__label">{path.label}</span>
                  <h3>{path.title}</h3>
                  <p>{path.body}</p>
                </div>
                <ul className="hm-entry__links">
                  {path.links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <span>{item.name}</span>
                        <small>{item.meta}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="hm-entry__all" href={path.href}>
                  {path.cta} <span aria-hidden="true">&darr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 02 · RECOGNITION ==================
       * Solutions framed in the buyer's words: four visible, the rest one
       * click away, in place. */}
      <section className="dms-section dms-section--alt hm-recognition hm-recognition--reframed" id="solutions">
        <div className="dms-wrap">
          <div className="hm-recognition__head" data-reveal>
            <div>
              <Eyebrow n={2}>Where the day goes</Eyebrow>
              <h2 className="dms-h2">Where regulated work slows down.</h2>
            </div>
            <p className="dms-lede">
              The symptoms look different across teams. The pattern underneath is the same: work waits wherever
              ownership, evidence, and decisions cross a system boundary.
            </p>
          </div>

          <SolutionsGrid
            initial={4}
            cards={SYMPTOMS.map((symptom) => ({
              key: symptom.domain,
              node: (
                <Link className="hm-symptom__link" href={symptom.href}>
                  <SymptomVisual type={symptom.visual} />
                  <span className="hm-symptom__body">
                    <span className="hm-symptom__domain">{symptom.domain}</span>
                    <span className="hm-symptom__claim">{symptom.claim}</span>
                    <span className="hm-symptom__note">{symptom.note}</span>
                    <span className="hm-symptom__cta">
                      Explore solution <span aria-hidden="true">&rarr;</span>
                    </span>
                  </span>
                </Link>
              ),
            }))}
            tail={<p>Quality, governance, operations, and supply chain all run on the same decision model.</p>}
          />
        </div>
      </section>

      {/* ============================ 03 · PRODUCTS ===================== */}
      <section className="dms-section hm-products-section" id="products">
        <div className="dms-wrap">
          <div className="hm-split-head" data-reveal>
            <div>
              <Eyebrow n={3}>The product suite</Eyebrow>
              <h2 className="dms-h2">One platform. Four governed records.</h2>
            </div>
            <p className="dms-lede">
              Start with the system your team needs. Every product runs on the same layer, alongside the systems
              you already trust.
            </p>
          </div>
          {/* the suite, led by the product: one window, four governed
            * records, each posed in its own product's world */}
          <div data-reveal>
            <ProductSuiteShowcase items={PRODUCTS} />
          </div>
        </div>
      </section>

      {/* ============================ 04 · ONE MECHANISM ================ */}
      <section className="dms-section dms-section--dark hm-mechanism" id="platform">
        <div className="dms-wrap">
          <div className="hm-mechanism__head hm-mechanism__head--center" data-reveal>
            <div>
              <Eyebrow n={4}>One problem, one mechanism</Eyebrow>
              <h2 className="dms-h2">Turn hidden waiting into a governed decision trail.</h2>
            </div>
            <div className="hm-mechanism__copy">
              {/* payoff first; the tax named and defined second (2026-09-01
                * panel: the concept-first opener is where operators stop) */}
              {/* one sentence (7 Sep 2026): the tax named, the mechanism implied;
                * the AI and Part 11 lines live on the platform page */}
              <p className="dms-lede">
                One owner, one deadline, and evidence that closes with the work: the coordination tax stops
                hiding and starts falling.
              </p>
              <div className="hm-mechanism__ctas">
                <Link href="/explorations/platform" className="dms-btn">Explore the platform &rarr;</Link>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  Measure your coordination tax
                </Link>
              </div>
            </div>
          </div>
          {/* the argument, shown: one record followed end to end on the same
            * persistent camera the platform and product pages journey on -
            * runnable on NC-204 or CC-2148, same five claims */}
          <div className="pf-page hm-journey" data-reveal>
            <MechanismJourney records={MECHANISM_RECORDS} />
          </div>
        </div>
      </section>

      {/* ============================ 05 · INDUSTRIES =================== */}
      <section className="dms-section dms-section--alt hm-industries-section" id="industries">
        <div className="dms-wrap">
          <div className="hm-split-head" data-reveal>
            <div>
              <Eyebrow n={5}>Your regulated world</Eyebrow>
              <h2 className="dms-h2">Start from your industry, and the moment that starts the clock.</h2>
            </div>
            <p className="dms-lede">
              Each industry page is grounded in the systems you run, the frame you are inspected under, and the
              decisions your teams must be able to replay.
            </p>
          </div>
          <div className="hm-industry-groups" data-reveal>
            {INDUSTRY_GROUPS.map((group) => (
              <article className="hm-industry-group" key={group.name}>
                <div className="hm-industry-group__head">
                  <h3>{group.name}</h3>
                  <p>{group.body}</p>
                </div>
                <ul>
                  {group.industries.map((industry) => (
                    <li key={industry.name}>
                      <Link href={industry.href}>
                        <span className="hm-industry__tile" aria-hidden="true">
                          <IndustryIcon type={industry.icon} />
                        </span>
                        <span className="hm-industry__name">{industry.name}</span>
                        <small>{industry.moment}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="hm-section-tail" data-reveal>
            <p>Whichever standard governs you, from 21 CFR Part 11 and ISO 13485 to IATF 16949 and AS9100, the record you show an auditor is the record the work created.</p>
            <Link href="/explorations/platform#compliance">Every standard we work under &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ============================ 06 · PROOF (film rail) ============ */}
      <HomeProofFilms />

      {/* ============================ RESOURCES ========================= */}
      <section className="dms-section hm-resources-section" aria-labelledby="hm-resources-h">
        <div className="dms-wrap">
          <div className="hm-resources" data-reveal>
            <div className="hm-resources__intro">
              <span>Keep exploring</span>
              <h3 id="hm-resources-h">Evidence for the next conversation.</h3>
              <p>The voices, the numbers, and the field notes behind the claims on this page.</p>
              <Link className="hm-resources__all" href="/explorations/resources">
                Browse all resources <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="hm-resources__rows">
              {RESOURCE_ROWS.map((row) => (
                <Link className="hm-resrow" href={row.href} key={row.label}>
                  <span className="hm-resrow__col">
                    <strong>{row.label}</strong>
                    <small>{row.body}</small>
                  </span>
                  <span className="hm-resrow__go">
                    {row.cta} <i aria-hidden="true">&rarr;</i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close hm-close" id="demo" aria-labelledby="hm-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__convergence" aria-hidden="true">
              <div className="dms-close__mark">
                <svg viewBox="0 2.2 21 22" fill="none">
                  <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                  <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                </svg>
              </div>
            </div>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="hm-close-h">Bring the process that hurts most.</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">
                We will run it end to end on Unifize, live, and show you where the time is going.
              </p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">Take the assessment</Link>
              </div>
              <Link className="hm-it-link" href="/explorations/platform#platform">
                For IT: how it fits your architecture &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter />
    </main>
  );
}
