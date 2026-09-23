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
 *   - 2026-09-18, after the 9 Sep review with Raj + Lakshman: quiet ribbon
 *     container; assessment CTA out of the hero and into 02, where the tax
 *     is named with a modelled figure per example; router back to three
 *     cards; eyebrow numbers gone; ex-customer logos out; clock metaphor
 *     retired; the five-step mechanism journey replaced by a slim platform
 *     band (its vocabulary was unsourced).
 *   - 2026-09-22: that slim platform band removed too ("this is empty");
 *     the suite now hands straight to industries, and the platform page is
 *     reached from the nav and the hero.
 * Flow still follows the third-scroll rule from the 2026-07-09 call: hook,
 * parity, THEN the coordination tax named at scroll three.
 * ========================================================================== */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { Eyebrow } from "../products/dms/dms-primitives";
import { HeroArcadeSwitcher, ProductSuiteShowcase } from "./home-interactive";
import { HeroHeadline, HeroHeadlineProvider } from "./home-headline";
import { SymptomVisual } from "./home-symptom-scenes";
import { SolutionsGrid } from "./home-solutions";
import {
  HOME_HERO_QUALITY_CONFIG,
  HOME_HERO_CHANGE_CONFIG,
  HOME_HERO_OPS_CONFIG,
  HOME_HERO_DOCUMENT_CONFIG,
  HOME_SUITE_DMS_CONFIG,
} from "./home-arcade";
import { QMS_MODULE_ARCADE_CONFIGS } from "../products/qms/qms-arcade";
import { MES_MODULE_ARCADE_CONFIGS } from "../products/mes/mes-arcade";
import { PLM_MODULE_ARCADE_CONFIGS } from "../products/plm/plm-arcade";
import { CASE_STUDIES, POSTS } from "../resources/_shared/resources-data";
import { CUSTOMER_VIDEOS } from "../resources/_shared/customer-videos";
import { HomeProofFilms } from "./home-proof";
import { ProcessTiles } from "./home-process-tiles";
import { HomeIndustries } from "./home-industries";
import { HomeStackMark } from "./home-stack-mark";
import { ENTRY_VIZ } from "./home-entry-viz";
import { NavGlyph } from "../_shared/nav-data";
import { PrefetchHeroFilm } from "../_shared/prefetch-hero-film";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "../products/dms/dms-redesign.css";
import "./home-kit.css";
/* 22 Sep 2026 rails wave: page rails, hatched divider bands, dark-grey hero on a
 * wash, way-in cells. The grammar every page shares is _shared/page-rails.css
 * (opted in with `dms--rails` on <main>); home-rails.css loads last so the
 * homepage's own overrides win by order. */
import { HatchBand } from "./home-rails";
import "../_shared/page-rails.css";
import "./home-rails.css";
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
    icon: "seal" as const,
    label: "Quality event",
    config: HOME_HERO_QUALITY_CONFIG,
  },
  {
    key: "change",
    icon: "compass" as const,
    label: "Change order",
    config: HOME_HERO_CHANGE_CONFIG,
  },
  {
    key: "ops",
    icon: "pallet" as const,
    label: "Holds & release",
    config: HOME_HERO_OPS_CONFIG,
  },
  {
    key: "document",
    icon: "dms" as const,
    label: "Controlled document",
    config: HOME_HERO_DOCUMENT_CONFIG,
  },
];

/* Solution doors. The homepage recognizes the symptom; the L2 solution page
 * carries the full problem architecture and proof. The first four render;
 * the rest sit behind "See more solutions" (2026-09-02 sync, H6: more than
 * four reachable, never a carousel). Keep this a data array: Lakshman's
 * wording pass lands 9 Sep. Every entry past the first four points at a
 * domain page that exists; Training & Competency waits on its route. */
/* `tax` (9 Sep 2026 review: name the coordination tax here, with a figure per
 * example) is the TYPICAL modelled active-coordination time per record from
 * the Notion reference value streams (The Value Model / Reference Value
 * Streams: non-conformance 1,163 min, supplier quality 856 min, change
 * control 29.8 h; document control's 40-minute audit retrieval). All four
 * streams are Draft / unvalidated, so the section footnotes them as modelled.
 * Domains without a reference stream carry no figure: never invent one. */
const SYMPTOMS: {
  domain: string;
  visual: string;
  claim: string;
  note: string;
  href: string;
  tax?: { value: string; label: string };
}[] = [
  /* the four in front are Raj's pick (2 Sep 2026): quality, documents,
   * suppliers, change control; "Operations" read as a product, not a
   * problem, and moved behind the fold */
  {
    domain: "Quality",
    visual: "cycle",
    claim: "CAPAs take 90+ days to close.",
    note: "The investigation is a week of work. The other eleven are spent chasing sign-offs, evidence, and owners.",
    href: "/explorations/domains/quality",
    tax: { value: "≈19 hrs", label: "of coordination per non-conformance, detection to CAPA closure" },
  },
  {
    domain: "Document & Records Control",
    visual: "versions",
    claim: "Three copies of one SOP claim to be current.",
    note: "The controlled system says v3.2, a file share holds v3.1, and the line runs a laminated v2.8. The current version depends on where you look.",
    href: "/explorations/domains/document-and-records-control",
    tax: { value: "40 min", label: "to pull one controlled document under audit pressure" },
  },
  {
    domain: "Supplier Management",
    visual: "handoffs",
    claim: "Supplier approvals live in email threads.",
    note: "Qualification evidence, PPAP reviews, and SCARs scatter across mailboxes at the organisational boundary.",
    href: "/explorations/domains/supplier-management",
    tax: { value: "≈14 hrs", label: "of coordination per supplier quality issue, incoming to resolved" },
  },
  {
    domain: "Change Control",
    visual: "approval",
    claim: "The change gets approved. Nobody can replay why.",
    note: "Sign-off happens in email threads and design reviews, so the evidence that was seen and the conditions that were accepted never reach the record.",
    href: "/explorations/domains/change-control",
    tax: { value: "≈30 hrs", label: "of coordination per change order, initiation to implementation" },
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
    claim: "A recall is four workflows, each with its own owner.",
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

/* each row carries a solid glyph from the nav set (nav-data NAV_ICONS) */
const PRIMARY_SOLUTIONS = [
  { name: "Quality", meta: "CAPA · NC · Audits", href: "/explorations/domains/quality", icon: "seal" as const },
  { name: "Supplier Management", meta: "PPAP · SCARs", href: "/explorations/domains/supplier-management", icon: "truck" as const },
  { name: "Operations", meta: "Holds · Dispositions", href: "/explorations/domains/operations", icon: "pallet" as const },
  { name: "Product Development", meta: "ECOs · Design history", href: "/explorations/domains/product-development", icon: "compass" as const },
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
    icon: "qms" as const,
    name: "Quality management",
    body: "CAPA, audits, nonconformances, and change control on one governed quality record.",
    outcome: "Close the finding. Keep the decision.",
    href: "/explorations/products/qms",
    config: QMS_MODULE_ARCADE_CONFIGS["capa"],
  },
  {
    code: "DMS",
    icon: "dms" as const,
    name: "Document management",
    body: "Controlled documents, versioning, and e-signatures from draft to obsolete. A revision going effective assigns the retraining itself.",
    outcome: "One current version, everywhere.",
    href: "/explorations/products/dms",
    config: HOME_SUITE_DMS_CONFIG,
  },
  {
    code: "MES",
    icon: "mes" as const,
    name: "Manufacturing execution",
    body: "Electronic batch records and shop-floor execution with evidence captured as work happens.",
    outcome: "The record builds with the shift.",
    href: "/explorations/products/mes",
    config: MES_MODULE_ARCADE_CONFIGS["electronic-batch-lot-records"],
  },
  {
    code: "PLM",
    icon: "plm" as const,
    name: "Product lifecycle",
    body: "Requirements, design controls, BOMs, and change orders on one traceable product record.",
    outcome: "Keep the trace from input to release.",
    href: "/explorations/products/plm",
    config: PLM_MODULE_ARCADE_CONFIGS["design-controls-traceability"],
  },
];

/* `claim` + `turn` are the tile headline (23 Sep 2026, from the Notion
 * Industries DB Primary Fear Anchor); `standards` are each industry page's
 * first three chips; `example` is the tile's longer "where it bites" line,
 * and `moment` stays short because the way-in industry rows use it as meta. `customer` appears only where the Website Customer Videos mirror
 * attests a current customer in that industry (two so far; the rest of the
 * logo-per-industry mapping is owed by Raj / Lakshman, never guessed). */
const INDUSTRY_GROUPS = [
  {
    name: "Life sciences",
    body: "Decision trails that stand up to inspectors, sponsors, and assessors.",
    industries: [
      { name: "Medical Devices", moment: "A complaint turns reportable", example: "A complaint turns reportable and the 30-day MDR clock starts", href: "/explorations/industry-template-modern", icon: "medical-devices", claim: "A design change that misses one record", turn: "is a recall.", standards: ["21 CFR 820", "ISO 13485", "EU MDR 2017/745"] },
      { name: "Pharmaceuticals", moment: "A deviation lands on a batch", example: "A deviation on a batch, with a root cause that holds at inspection", href: "/explorations/industries/pharmaceuticals", icon: "pharmaceuticals", claim: "A change approved on a call", turn: "never reaches change control.", standards: ["21 CFR 210/211", "21 CFR Part 11", "ICH Q10"] },
      { name: "Contract Research Orgs", moment: "A protocol deviation at a site", example: "A protocol deviation, ready to show whichever sponsor asks", href: "/explorations/industries/cro", icon: "cro", claim: "Every sponsor can audit you,", turn: "one study at a time.", standards: ["ICH E6(R2) GCP", "21 CFR Part 11", "ALCOA+"] },
      { name: "Laboratories", moment: "An out-of-spec result", example: "An out-of-spec result, closed with an effectiveness check", href: "/explorations/industries/laboratories", icon: "laboratories", claim: "One open nonconformance", turn: "can suspend your scope in 90 days.", standards: ["ISO/IEC 17025", "21 CFR Part 11", "GLP · 21 CFR 58"] },
    ],
  },
  {
    name: "Process & consumer",
    body: "Controlled changes and evidence across formulation, production, and release.",
    industries: [
      { name: "Chemicals", moment: "A formulation change", example: "A process change, traced to REACH and customer notifications", href: "/explorations/industries/chemicals", icon: "chemicals", claim: "A formulation change", turn: "moves your customers' dossiers too.", standards: ["REACH", "TSCA", "OSHA PSM"] },
      { name: "Cosmetics", moment: "A safety substantiation", example: "MoCRA listings, supplier COAs, and adverse events in one file", href: "/explorations/industries/cosmetics", icon: "cosmetics", claim: "The retailer audit asks for the substantiation file.", turn: "All of it.", standards: ["MoCRA", "ISO 22716", "EU 1223/2009"], customer: { name: "Applechem", src: "/customers/applechem.png" } },
      { name: "Food Processing", moment: "A hold on a lot", example: "A hold on a lot, closed against the food safety plan", href: "/explorations/industries/food-processing", icon: "food-processing", claim: "An allergen deviation left open", turn: "becomes a recall.", standards: ["FSMA · 21 CFR 117", "HACCP", "SQF"] },
      { name: "Nutritional Supplements", moment: "A rejected raw material", example: "A rejected raw material, with the ID test and supplier file attached", href: "/explorations/industries/nutritional-supplements", icon: "nutritional-supplements", claim: "Identity testing is", turn: "where the 483 starts.", standards: ["21 CFR Part 111", "cGMP", "NSF"], customer: { name: "Biovation Labs", src: "/customers/biovation-labs.svg" } },
    ],
  },
  {
    name: "Discrete manufacturing",
    body: "Configuration, supplier, and production decisions with the rationale intact.",
    industries: [
      { name: "Automotive", moment: "A PPAP resubmission", example: "A PPAP resubmission, assembled once instead of chased", href: "/explorations/industries/automotive", icon: "automotive", claim: "One late 8D", turn: "puts you on controlled shipping.", standards: ["IATF 16949", "PPAP", "APQP"] },
      { name: "Aerospace", moment: "A nonconformance on a flight part", example: "A nonconformance on a flight part, with the objective evidence", href: "/explorations/industries/aerospace", icon: "aerospace", claim: "A NADCAP finding", turn: "gives you 90 days.", standards: ["AS9100", "NADCAP", "FAI · AS9102"] },
      { name: "Industrial Machinery", moment: "A design change after CE marking", example: "A design change after CE marking, traced into the technical file", href: "/explorations/industries/industrial-machinery", icon: "industrial-machinery", claim: "The FAT fails on paperwork,", turn: "not on the machine.", standards: ["CE marking", "Machinery Directive", "ISO 12100"] },
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

/* 01 - the three ways in, rendered as three cards side by side */
const ENTRY_PATHS = [
  {
    key: "solution",
    label: "By solution",
    title: "I need to improve a process.",
    body: "Start with the cross-functional work that is slow, unclear, or difficult to prove.",
    links: PRIMARY_SOLUTIONS.map((solution) => ({ ...solution, icon: <NavGlyph name={solution.icon} /> })),
    href: "#solutions",
    cta: "Explore solutions",
  },
  {
    key: "product",
    label: "By product",
    title: "I am evaluating a system.",
    body: "Start with the governed record your team needs to run and keep current.",
    links: PRODUCTS.map((product) => ({ name: product.name, meta: product.code, href: product.href, icon: <NavGlyph name={product.icon} /> })),
    href: "#products",
    cta: "Explore products",
  },
  {
    key: "industry",
    label: "By industry",
    title: "Show me my regulated world.",
    body: "Start with your industry: the systems it runs on and the problems it keeps running into.",
    links: [
      INDUSTRY_GROUPS[0].industries[0],
      INDUSTRY_GROUPS[0].industries[1],
      INDUSTRY_GROUPS[1].industries[0],
      INDUSTRY_GROUPS[2].industries[1],
    ].map((industry) => ({ name: industry.name, meta: industry.moment, href: industry.href, icon: <IndustryIcon type={industry.icon} /> })),
    href: "#industries",
    cta: "Explore industries",
  },
];

/* the resources band is a typographic index: one row per collection, with
 * the live count pulled from the same canonical records the Resources pages
 * render. */
const RESOURCE_ROWS = [
  {
    key: "stories",
    icon: "stories" as const,
    label: "Customer stories",
    body: "Hear the change in the words of the people who ran it.",
    href: "/explorations/resources/testimonials",
    cta: `Watch all ${CUSTOMER_VIDEOS.length} stories`,
  },
  {
    key: "case",
    icon: "case" as const,
    label: "Case studies",
    body: "See the backlog, the intervention, and the measured result.",
    href: "/explorations/resources/case-studies",
    cta: `See all ${CASE_STUDIES.length} case studies`,
  },
  {
    key: "blog",
    icon: "blog" as const,
    label: "Blog",
    body: "Field notes for quality, operations, and product leaders.",
    href: "/explorations/resources/blog",
    cta: `Read all ${POSTS.length} field notes`,
  },
];

/* trust strip: current customers only, checked against the Notion Companies
 * DB (collection 1ac860e6) */
/* the customer logo set the live site carries (public/customers, pulled
 * from unifize.com on 7 Sep 2026); rendered as a moving strip (Raj, 2 Sep:
 * "a moving list of icons of all the customers"). Monochromed by CSS. */
/* 9 Sep 2026 (Lakshman): Harmonic Bionics, Rastelli, Laundrytec and Maia
 * Estates are no longer customers and left the strip. */
const CUSTOMER_LOGOS: { name: string; src: string; h?: number }[] = [
  { name: "Biovation Labs", src: "/customers/biovation-labs.svg" },
  { name: "Applechem", src: "/customers/applechem.png" },
  /* EFCO's globe-behind-wordmark lockup collapses to a blob once monochromed;
   * back in when a flat wordmark file exists */
  { name: "Adaptive Health", src: "/customers/adaptive-health.png", h: 44 },
  { name: "Dynamic Blending", src: "/customers/dynamic-blending.svg", h: 46 },
  { name: "Jamco", src: "/customers/jamco.png" },
  { name: "ATS", src: "/customers/ats.png" },
  { name: "Yanuvia", src: "/customers/yanuvia.png" },
  { name: "LeaderBrand Produce", src: "/customers/leaderbrand-produce.png" },
  /* 23 Sep 2026: current customers from the Notion Companies DB (ARR + a
   * health signal, Churn Risk rows left out) whose logos the live site
   * already hosts */
  { name: "Construction Forms", src: "/customers/conforms.png" },
  { name: "Gilat Wavestream", src: "/customers/wavestream.png", h: 38 },
  { name: "PhoMedics", src: "/customers/phomedics.png", h: 40 },
  { name: "The Will-Burt Company", src: "/customers/will-burt.png", h: 40 },
  { name: "Engineering Industries", src: "/customers/engineering-industries.png", h: 36 },
  { name: "TTK Prestige", src: "/customers/ttk-prestige.png", h: 32 },
];

/* 01 - the three ways in, drawn: converging process lanes, the product mark's
 * module squares, a certificate. One stroke, one weight. */
export default function HomePage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--home dms--rails">
      <DmsHeader />
      {/* warm the cache with the platform hero film once this page is idle */}
      <PrefetchHeroFilm />

      {/* ============================ HERO =============================
       * Regulated-industry outcome headline (variant D, see home-headline.tsx);
       * the concrete nouns carry the sub. The coordination tax is NOT named
       * here (third-scroll rule). */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed" aria-label="Unifize">
        <div className="dms-wrap dms-hero__inner">
          <HeroHeadlineProvider>
            <div className="dms-hero__grid">
              <div className="dms-hero__left">
                {/* variant D by default; `?hl=A..E` previews the others
                  * (home-headline.tsx) */}
                <HeroHeadline />
              </div>
              <div className="dms-hero__right">
                <p className="dms-lede dms-hero__sub">
                  Unifize closes the gap between your systems and your teams, so <strong>CAPAs</strong>,{" "}
                  <strong>change orders</strong>, and <strong>design reviews</strong> close faster, and close proven.
                </p>
                <div className="dms-hero__ctas">
                  <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                  {/* 9 Sep 2026 review: the assessment CTA left the hero (the
                    * tax is not introduced yet); it lives in 02, where it is */}
                  <Link href="/explorations/platform" className="dms-btn dms-btn-ghost">
                    See how it works
                  </Link>
                </div>
              </div>
            </div>
          </HeroHeadlineProvider>
        </div>

        {/* the hero visual: one arcade window, four worlds - pick yours */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo hm-hero-demo hm-bleed">
          <HeroArcadeSwitcher views={HERO_VIEWS} />
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
       * Current customers only (Notion Companies DB); see CUSTOMER_LOGOS. */}
      <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label="Customers">
        <div className="dms-wrap dms-trust__inner hm-bleed">
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

      {/* the first hatched divider: closes the hero block, opens the router */}
      <HatchBand />

      {/* ============================ 01 · PRIMARY ROUTER ===============
       * The homepage is L1. This section hands visitors directly to the L2
       * taxonomy that matches the way they arrived. */}
      <section className="dms-section hm-entry-section hm-railed" id="doors">
        <div className="dms-wrap">
          <div className="hm-entry__head" data-reveal>
            <Eyebrow>Choose your way in</Eyebrow>
            <h2 className="dms-h2">Find the fit for your work.</h2>
            <p className="dms-lede">
              Improve a process, evaluate a system, or see Unifize in your regulated world. Pick the one that
              sounds like you.
            </p>
          </div>

          {/* 9 Sep 2026 review: back to three cards side by side (one glance,
            * no pinned scroll), no index numbers, and an explicit arrow on
            * every row and every card so the whole thing reads as clickable */}
          <div className="hm-entry-grid" data-reveal>
            {ENTRY_PATHS.map((path) => (
              <article className="hm-entry" key={path.label}>
                {/* 22 Sep 2026: the card leads with a wash panel (one soft
                  * gradient per way in) holding a mini product artifact with a
                  * "You" cursor on it (home-entry-viz.tsx); the isometric
                  * drawings that sat here first were rejected the same night */}
                <div className={"hm-entry__wash hm-entry__wash--" + path.key} aria-hidden="true">
                  {ENTRY_VIZ[path.key as keyof typeof ENTRY_VIZ]}
                </div>
                <div className="hm-entry__intro">
                  <span className="hm-entry__label">{path.label}</span>
                  <h3>{path.title}</h3>
                  <p>{path.body}</p>
                </div>
                <ul className="hm-entry__links">
                  {path.links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        {item.icon ? <span className="hm-entry__glyph" aria-hidden="true">{item.icon}</span> : null}
                        <span className="hm-entry__name">{item.name}</span>
                        <small>{item.meta}</small>
                        <i className="hm-entry__go" aria-hidden="true">&rarr;</i>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="hm-entry__all" href={path.href}>
                  {path.cta} <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* the router's closing band; the tax section's dashed trace starts under it */}
      <HatchBand />

      {/* ============================ 02 · RECOGNITION ==================
       * Solutions framed in the buyer's words: four visible, the rest one
       * click away, in place. */}
      {/* no `dms-section--alt`: the section is white, and the class made the
        * sticky bar frost grey over it (Abhishek, 22 Sep) */}
      <section className="dms-section hm-recognition hm-recognition--reframed hm-railed" id="solutions">
        <div className="dms-wrap">
          <div className="hm-recognition__head" data-reveal>
            <div>
              <Eyebrow>The coordination tax</Eyebrow>
              <h2 className="dms-h2">Why regulated work slows down.</h2>
            </div>
            <p className="dms-lede">
              The investigation, the review, the decision: that is the work. The chasing, the waiting, and the
              rebuilding of context around it is the coordination tax, and nothing on your stack measures it.
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
                    {symptom.tax ? (
                      <span className="hm-symptom__tax">
                        <strong className="dms-data">{symptom.tax.value}</strong>
                        <span>{symptom.tax.label}</span>
                      </span>
                    ) : null}
                    <span className="hm-symptom__cta">
                      Explore solution <span aria-hidden="true">&rarr;</span>
                    </span>
                  </span>
                </Link>
              ),
            }))}
          />

          {/* the tax, named where it has just been shown; the assessment CTA
            * lives here, not in the hero (9 Sep 2026 review) */}
          <div className="hm-taxcta" data-reveal>
            <div className="hm-taxcta__lead">
              <Eyebrow>The assessment</Eyebrow>
              <p className="hm-taxcta__claim">
                Coordination tax is why regulated work slows down. <span>Find out what yours costs.</span>
              </p>
              <Link href="/coordination-tax-calculator" className="dms-btn hm-taxcta__btn">
                Take the Coordination Tax Assessment &rarr;
              </Link>
            </div>
            {/* the tax as one picture, on the platform page's explainer idiom
              * (platform-evidence.tsx, TaxLead): the 75 steps of closing ONE
              * non-conformance as a block of cells, the work in grey and the
              * coordination in blue. Source: Notion reference value stream
              * VS-2, non-conformance to CAPA closure, typical case, modelled. */}
            <figure
              className="hm-taxviz"
              aria-label="Closing one non-conformance takes 75 steps. 54 of them are coordination, not quality work."
            >
              <div className="hm-taxviz__head">
                <span>One non-conformance, detection to CAPA closure</span>
                <span className="hm-taxviz__total">75 steps</span>
              </div>
              <p className="hm-taxviz__v">
                <span className="dms-data">54</span> of 75 steps are coordination, not quality work.
              </p>
              <div className="hm-taxviz__cells" aria-hidden="true">
                {Array.from({ length: 75 }, (_, i) => (
                  <i
                    key={i}
                    className={i < 21 ? "is-work" : "is-tax"}
                    style={{ "--i": i } as React.CSSProperties}
                  />
                ))}
              </div>
              {/* the legend as two ledger rows: the name carries the colour
                * and the weight, the verbs stay muted, the count sits apart */}
              <div className="hm-taxviz__legend" aria-hidden="true">
                <span className="hm-taxviz__key is-work">
                  <b>The work</b>
                  <em>investigate, decide, verify</em>
                  <i>21</i>
                </span>
                <span className="hm-taxviz__key is-tax">
                  <b>The coordination tax</b>
                  <em>notify, chase, re-key, rebuild</em>
                  <i>54</i>
                </span>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* the tax hands to the suite across a hatched band */}
      <HatchBand />

      {/* ============================ 03 · PRODUCTS ===================== */}
      <section className="dms-section hm-products-section hm-railed" id="products">
        <div className="dms-wrap">
          {/* 22 Sep 2026 rails wave: split head (mark, eyebrow, claim left;
            * lede right) instead of the centred stack */}
          <div className="hm-split-head" data-reveal>
            <div>
              <HomeStackMark />
              <Eyebrow>The product suite</Eyebrow>
              <h2 className="dms-h2">
                One platform.
                <br />
                Four governed records.
              </h2>
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

      {/* closes the suite; industries follow (not yet on the rails) */}
      <HatchBand />

      {/* ============================ 05 · INDUSTRIES =================== */}
      <section className="dms-section dms-section--alt hm-industries-section hm-railed" id="industries">
        <div className="dms-wrap">
          <div className="hm-split-head" data-reveal>
            <div>
              <Eyebrow>Industries</Eyebrow>
              <h2 className="dms-h2">We know your industry, and where its work gets stuck.</h2>
            </div>
            <p className="dms-lede">
              Every industry page starts from the systems you run, the standards you are audited under, and
              the decisions your teams have to be able to replay.
            </p>
          </div>
          {/* 9 Sep 2026 review: groups became tabs, industries became large
            * tiles that lead with the industry's own challenge. 22 Sep: the
            * tiles are drawn on the way-in card grammar (home-industries.css). */}
          <div data-reveal>
            <HomeIndustries
              groups={INDUSTRY_GROUPS.map((group) => ({
                name: group.name,
                body: group.body,
                industries: group.industries.map((industry) => ({
                  name: industry.name,
                  href: industry.href,
                  icon: <IndustryIcon type={industry.icon} />,
                  claim: industry.claim,
                  turn: industry.turn,
                  example: industry.example,
                  standards: industry.standards,
                  /* 22 Sep 2026 (Abhishek): no company logos on the tiles;
                   * the attested customers stay in the data for the pages */
                })),
              }))}
            />
          </div>
          <div className="hm-section-tail" data-reveal>
            <p>Whichever standard governs you, from 21 CFR Part 11 and ISO 13485 to IATF 16949 and AS9100, the record you show an auditor is the record the work created.</p>
            <Link href="/explorations/platform#compliance">Every standard we work under &rarr;</Link>
          </div>
        </div>
      </section>

      {/* industries hand to proof across a hatched band */}
      <HatchBand />

      {/* ============================ 06 · PROOF (reel of stills) ======= */}
      <HomeProofFilms />

      {/* proof, resources and the close are one dark run (Abhishek, 22 Sep:
        * "make the Resources section and the divider rails above it dark to
        * match the testimonial section"); the bands stay on the charcoal */}
      <HatchBand className="hm-hatch--dark" />

      {/* ============================ RESOURCES ========================= */}
      <section className="dms-section dms-section--dark hm-resources-section hm-resources--dark hm-railed" aria-labelledby="hm-resources-h">
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
                  {/* 22 Sep 2026: a wash panel with the content type's glyph,
                    * the way-in card grammar */}
                  <span className={"hm-resrow__wash hm-resrow__wash--" + row.key} aria-hidden="true">
                    <NavGlyph name={row.icon} />
                  </span>
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

      {/* resources hand to the close block, dark to dark */}
      <HatchBand className="hm-hatch--dark" />

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close hm-close hm-close--rails hm-railed" id="demo" aria-labelledby="hm-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            {/* 2026-09-09: the lone convergence mark became a pyramid of the
              * processes people bring (home-process-tiles.tsx), tapering to
              * the mark. Same convergence idea, now with the nouns on it. */}
            <ProcessTiles />
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
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer
        * 22 Sep 2026 rails wave: the footer closes the page on the same
        * charcoal as the close above (giant wordmark removed 23 Sep) */}
      <SiteFooter />
    </main>
  );
}
