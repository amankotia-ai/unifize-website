/* ============================================================================
 * PLATFORM - revised flow (2026-09-01 panel audit, then the 2026-09-02 sync
 * with Raj). The coordination tax is still the protagonist, but the page
 * earns the name before it uses it, and the product now opens the page:
 * "you come to the platform, you see how it functions, and you scroll down
 * and see all the other value" (Raj). Composition:
 *   hero      - the claim + the platform journey, live: six screens in the
 *                demo order (home built for the persona, inbox thread,
 *                checklist, Part 11 seal, process builder, dashboard) on the
 *                persistent arcade camera, with a step rail under the stage
 *   01 problem - the gap and the tax in one breath, three sourced numbers
 *                on small linework charts (the evidence band)
 *   02 coexistence - the three-zone placement diagram: systems of record,
 *                Unifize, the tools where work happens; five labeled flows
 *   03 stack   - the three customer-facing bands, touchable
 *   04 ai      - Unifize AI on the same persistent camera (Raj, 7 Sep 2026):
 *                what it reads today (this record), what vectorisation lets
 *                it read next (every record and document, by meaning), and
 *                the finding auto-linked on the checklist; a person approves.
 *                Roadmap steps are tagged so nothing reads as shipped early.
 *   05 measured - the fall vs your own baseline (linework, in ink) + a
 *                customer-attested number on film
 *   06 proof   - the customer film rail (real films, real people)
 *   07 compliance - posture statements, then the standards strip
 *   08 faq     - six platform-level questions (23 Sep 2026)
 *   close     - one ask + the product doors
 * Anchors preserved for inbound links: #platform (now the hero), #stack,
 * #ai, #compliance. Design system: shared Product-page redesign tokens + pf-*
 * compositions.
 *
 * 2026-09-22 (late): the homepage's rails wave carried over, section by
 * section: page rails, hatched divider bands, blue-square eyebrows, the
 * dark-grey hero with the product window on a light wash, split heads,
 * rail-to-rail cell grids (_shared/page-rails.css + platform-rails.css).
 * First pass = hero, 01 the tax, 02 the gap; second = 03 coexistence, 03
 * the stack (turned light), 04 Unifize AI; third = 05 measured (turned
 * light), 06 proof, 07 compliance, the close and the footer. Whole page.
 *
 * 2026-09-18, after the 9 Sep review with Raj + Lakshman:
 *   - hero journey: home, inbox, builder and dashboard poses step closer
 *     (platform-kit.css, hero-scoped camera values); the ghost CTA goes to
 *     the gap section
 *   - 01 leads with the coordination tax itself on one record (54 of 75
 *     steps, Notion VS-2), then the three sourced numbers as what it turns
 *     into, under uniform labels with a tie-back line each
 *   - the coexistence diagram split in two: 02 THE GAP (platform-gap.tsx,
 *     one quality defect today vs on Unifize) and 03 YOUR SYSTEMS STAY
 *     (slim tiles + notes)
 *   - the stack's left column is a drawn, clickable stack on a foundation
 *   - Unifize AI reframed (workflow-built, one brain, proactive) with live /
 *     roadmap tags and a human-in-the-loop trace band (Notion PLT-8)
 *   - eyebrow numbers and the clock metaphor removed
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { Eyebrow } from "../products/dms/dms-primitives";
import { DmsMotion } from "../products/dms/dms-motion";
import { PlatformJourney, PlatformStack } from "./platform-interactive";
import { PlatformHeroFilm } from "./platform-hero-film";
import { HERO_FILM as HERO_FILM_ASSETS } from "./hero-film-assets";
import { PlatformCoexistence } from "./platform-coexistence";
import { PlatformGap } from "./platform-gap";
import { PlatformEvidence } from "./platform-evidence";
import { PlatformProofFilms } from "./platform-proof";
import { PlatformMeasured } from "./platform-measured";
import { filmByWistia } from "../products/_shared/customer-films";
import { PLATFORM_JOURNEY_CONFIGS, PLATFORM_AI_CONFIGS } from "./platform-arcade";
import { HatchBand } from "../_shared/page-rails";
import "../products/dms/dms.css";
import "../products/dms/dms-redesign.css";
import "./platform-kit.css";
/* 22 Sep 2026 rails wave: the shared grammar, then this page's own overrides
 * (loads last so it wins by order) */
import "../_shared/page-rails.css";
import "./platform-rails.css";
/* 24 Sep 2026: the page-in timeline and scroll choreography, loaded last */
import "../_shared/page-motion.css";
import { Words } from "../_shared/split-words";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { RailsClose } from "../_shared/rails-close";
import { FaqAccordion } from "../products/dms/dms-interactive";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/platform");

/* hero - the journey rail: six screens in the demo order, one claim per
 * pose, the scene proves it. Screens per Raj (2 Sep 2026): home built for
 * the persona, the inbox where the work is done, the checklist up close, the
 * seal, the process builder, and dashboards to close. Seal moved ahead of
 * the builder on the 7 Sep 2026 sync.
 * 22 Sep 2026 (rails wave): solid 20-grid icons stand where the index
 * stood (the AI rail's idiom) and each body is one line of about eleven
 * words, every claim already on the record the scene shows (owner and
 * participants on the thread, checklist data captured as work happens, the
 * Part 11 seal, builder fields / approval order / reminders, the dashboard's
 * three clocks from CHANGE_WORLD.reports). */
const JOURNEY_ICONS = {
  home: "M10 2.5 2.5 9v8.5h5.5v-5h4v5h5.5V9L10 2.5Z",
  inbox: "M3 3h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-7l-4 3.5V14H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2.5 3.5v1.5h9V6.5h-9Zm0 3.5v1.5h6V10h-6Z",
  checklist: "M5 2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1.5 4.5v2h2v-2h-2Zm3.5.5v1h4V7h-4Zm-3.5 4v2h2v-2h-2Zm3.5.5v1h4v-1h-4Z",
  seal: "M10 1.5 3 4.2v5c0 4.3 3 7.9 7 9.3 4-1.4 7-5 7-9.3v-5L10 1.5Zm-1.2 11.6L5.7 10l1.4-1.4 1.7 1.7 4.1-4.1 1.4 1.4-5.5 5.5Z",
  builder: "M3 5h9v2H3V5Zm11 0h3v2h-3V5Zm-1.5-1.5h-2v5h2v-5ZM3 13h3v2H3v-2Zm5 0h9v2H8v-2Zm-1.5-1.5h-2v5h2v-5Z",
  dashboard: "M3 11h3.5v6H3v-6Zm5.25-5h3.5v11h-3.5V6Zm5.25-3H17v14h-3.5V3Z",
};

/* the hero: the pre-rendered film (true) or the live arcade journey (false) */
const HERO_FILM = true;

const JOURNEY_STEPS = [
  { title: "The home screen", icon: JOURNEY_ICONS.home, body: "Built for the role. Quality managers and approvers land on different work." },
  { title: "The inbox", icon: JOURNEY_ICONS.inbox, body: "One owner, every function, decisions and evidence in a single thread." },
  { title: "The checklist", icon: JOURNEY_ICONS.checklist, body: "The record is a checklist. Data lands on it as the work happens." },
  { title: "The seal", icon: JOURNEY_ICONS.seal, body: "Sign-off is a Part 11 signature, with its meaning attached." },
  { title: "The process builder", icon: JOURNEY_ICONS.builder, body: "Fields, approval order and reminders, set by your team. No code." },
  { title: "The dashboard", icon: JOURNEY_ICONS.dashboard, body: "Median closure, time waiting, evidence complete, straight off the records." },
];

/* 04 - Unifize AI. 9 Sep 2026 review (Lakshman): "AI that reads the record"
 * is underwhelming; say what AI does for them. Three things, plus human in
 * the loop: built for your workflow, the whole company's data as one brain,
 * proactive. Grounded in Ben's Intelligence Posture (Notion PLT-8): "AI
 * belongs inside the thread", and the governing principle "AI outputs are
 * proposals, not decisions".
 * 21 Sep 2026: the four moments are restaged from the product recording of
 * cross-record impact ("What else does this change affect? (Beta)"), so each
 * claim is a beat the product shows and the copy uses the recording's own
 * words. The feature is labelled Beta in the product; the rail's "In beta"
 * and "Live today" tags said so until 22 Sep 2026 (Abhishek: "remove the
 * beta and live status labels"); the roadmap honesty now rests on the
 * product window's own BETA chip and the copy. */
/* solid 20-grid glyphs for the rail, one per moment (no numbers) */
const AI_ICONS = {
  checklist: "M5 2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1.5 4.5v2h2v-2h-2Zm3.5.5v1h4V7h-4Zm-3.5 4v2h2v-2h-2Zm3.5.5v1h4v-1h-4Z",
  spark: "M10 2l1.8 5.2L17 9l-5.2 1.8L10 16l-1.8-5.2L3 9l5.2-1.8L10 2Zm5.5 9.5.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z",
  person: "M8 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 8.5c0-3.3 2.7-5.5 6-5.5 1 0 2 .2 2.8.6A4.5 4.5 0 0 0 12.6 18H2v-.5ZM15 19l-2.5-2.5 1.2-1.2L15 16.6l3.3-3.3 1.2 1.2L15 19Z",
  bell: "M10 2a5 5 0 0 0-5 5v3.2L3.5 13v1h13v-1L15 10.2V7a5 5 0 0 0-5-5Zm-2 13.5a2 2 0 0 0 4 0H8Z",
  clock: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-2a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm.75-10.5h-1.5v5.2l3.65 2.2.75-1.3-2.9-1.7V5.5Z",
};

const AI_STEPS = [
  {
    title: "Built for your workflow",
    icon: AI_ICONS.checklist,
    body: "One button, in the checklist, at the step that needs it.",
  },
  {
    title: "One brain for the whole company",
    icon: AI_ICONS.spark,
    body: "It reads the record and finds the documents the change puts at risk.",
  },
  {
    title: "Your people keep the decision",
    icon: AI_ICONS.person,
    body: "A person ticks the rows. Records link, not a list.",
  },
  {
    title: "It chases, so nobody has to",
    icon: AI_ICONS.bell,
    body: "Approval requested, approver tagged. Nobody writes the chaser.",
  },
  {
    title: "Kept on the record",
    icon: AI_ICONS.clock,
    body: "Who asked, what it read, who decided. An auditor can replay it.",
  },
];

/* 07 - the standards strip: the names carry the credibility */
/* Every standard an industry in the nav dropdown is governed by, grouped the
 * way the dropdown groups the industries. Keep this in step with nav-data. */
/* FAQ (23 Sep 2026): platform-level questions, each answer grounded in copy
 * this page already carries (coexistence, the stack, Unifize AI, the Part 11
 * seal in the hero journey, compliance). Platform-wide framing, not one
 * function; AI answers stay in the tense the product ships in. */
const PLATFORM_FAQS: { q: string; a: string }[] = [
  {
    q: "Do we have to replace our ERP, PLM, or eQMS?",
    a: "No. Your systems of record stay authoritative and keep their records. Unifize runs alongside them and links to them, so nothing is re-keyed and nothing is ripped out.",
  },
  {
    q: "What flows back into our systems of record?",
    a: "Only what you explicitly agree: outcomes, statuses, and references. Each one is an accountable, signed action on the record, not a silent sync.",
  },
  {
    q: "How does Unifize connect to the tools we already run?",
    a: "Through single sign-on, open APIs, webhooks, and connectors into the stack you already run. Email, Teams, SharePoint, and spreadsheets keep being used; the decisions made in them are captured on the record.",
  },
  {
    q: "Do we have to adopt the whole platform at once?",
    a: "No. Start with one product, QMS, DMS, PLM, or MES, and the platform underneath arrives with it on day one. Where a process has no system today, a Unifize product becomes its home on the same layer.",
  },
  {
    q: "What does Unifize AI do, and who makes the decisions?",
    a: "It takes the coordination work: drafting, chasing, and looking things up inside each process. It suggests; a person reviews and decides, and the record keeps the trail of both. Some capabilities are in beta, and we label them that way.",
  },
  {
    q: "Does it support 21 CFR Part 11 electronic signatures?",
    a: "Yes, where the record requires it. Approvals capture the signer, the meaning of the signature, and a timestamp, and the signature stays with the record it approved. The record you show an auditor is the record the work created.",
  },
];

const STANDARD_GROUPS = [
  {
    label: "Electronic records and quality systems",
    industries: "Every industry we serve",
    items: [
      { name: "21 CFR Part 11", geo: "FDA · US" },
      { name: "EU Annex 11", geo: "EC · EU" },
      { name: "GAMP 5", geo: "ISPE · Global" },
      { name: "ISO 9001", geo: "ISO · Global" },
      { name: "ISO 14001", geo: "ISO · Global" },
      { name: "ISO 45001", geo: "ISO · Global" },
    ],
  },
  {
    label: "Life sciences",
    industries: "Medical devices · Pharmaceuticals · Contract research · Laboratories",
    items: [
      { name: "ISO 13485", geo: "ISO · Global" },
      { name: "21 CFR Part 820 (QMSR)", geo: "FDA · US" },
      { name: "EU MDR 2017/745", geo: "EC · EU" },
      { name: "EU IVDR 2017/746", geo: "EC · EU" },
      { name: "ISO 14971", geo: "ISO · Global" },
      { name: "21 CFR Parts 210 & 211", geo: "FDA · US" },
      { name: "EU GMP", geo: "EC · EU" },
      { name: "ICH Q7", geo: "ICH · Global" },
      { name: "ICH Q10", geo: "ICH · Global" },
      { name: "ICH E6 (GCP)", geo: "ICH · Global" },
      { name: "21 CFR Part 58 (GLP)", geo: "FDA · US" },
      { name: "ISO/IEC 17025", geo: "ISO · Global" },
      { name: "ISO 15189", geo: "ISO · Global" },
      { name: "CLIA", geo: "CMS · US" },
    ],
  },
  {
    label: "Process and consumer",
    industries: "Chemicals · Cosmetics · Food processing · Nutritional supplements",
    items: [
      { name: "REACH", geo: "ECHA · EU" },
      { name: "GHS", geo: "UN · Global" },
      { name: "OSHA PSM", geo: "OSHA · US" },
      { name: "MoCRA", geo: "FDA · US" },
      { name: "ISO 22716", geo: "ISO · Global" },
      { name: "EU Cosmetics Reg. 1223/2009", geo: "EC · EU" },
      { name: "FSMA", geo: "FDA · US" },
      { name: "HACCP", geo: "Codex · Global" },
      { name: "ISO 22000", geo: "ISO · Global" },
      { name: "FSSC 22000", geo: "GFSI · Global" },
      { name: "BRCGS", geo: "GFSI · Global" },
      { name: "SQF", geo: "GFSI · Global" },
      { name: "21 CFR Part 111", geo: "FDA · US" },
      { name: "NSF/ANSI 173", geo: "NSF · US" },
    ],
  },
  {
    label: "Discrete manufacturing",
    industries: "Automotive · Aerospace · Industrial machinery",
    items: [
      { name: "IATF 16949", geo: "IATF · Global" },
      { name: "VDA 6.3", geo: "VDA · EU" },
      { name: "APQP / PPAP", geo: "AIAG · Global" },
      { name: "AS9100", geo: "IAQG · Global" },
      { name: "AS9110", geo: "IAQG · Global" },
      { name: "AS9120", geo: "IAQG · Global" },
      { name: "NADCAP", geo: "PRI · Global" },
      { name: "CE marking · Machinery Reg. 2023/1230", geo: "EC · EU" },
      { name: "ISO 12100", geo: "ISO · Global" },
    ],
  },
];

/* 05 measured is parked, not deleted (22 Sep 2026) */
const SHOW_MEASURED = false;

export default async function PlatformPage({
  searchParams,
}: {
  searchParams: Promise<{ hero?: string }>;
}) {
  /* ?hero=arcade shows the live arcade journey (the film's source screens,
   * captured by scripts/platform-render/capture.mjs) */
  const heroFilm = HERO_FILM && (await searchParams).hero !== "arcade";
  /* customer-attested figures; each card disappears if its film is ever
   * unapproved or unpublished in Notion (governance lives in the adapter) */
  const measuredFilm = filmByWistia("qp7129voyy"); /* Tedd Carr · Will-Burt · NC closure down 75% */

  return (
    <main className="dms dms--redesign pf-page dms--rails pm">
      <DmsHeader />
      {/* scroll choreography: the blocks and the hatch bands (page-motion.css) */}
      <DmsMotion selector="[data-reveal], .hm-hatch" />

      {/* ============================ HERO =============================
       * #platform lives here now: the journey is the hero object, so every
       * "watch one change close" link lands on it. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed" id="platform" aria-label="The Unifize platform">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/home">
                <span className="dms-hero__product-mark pf-hero__mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect className="dms-hero__product-sheet" x="3.25" y="3.25" width="7.5" height="7.5" />
                    <rect className="dms-hero__product-sheet" x="13.25" y="3.25" width="7.5" height="7.5" />
                    <rect className="dms-hero__product-sheet" x="8.25" y="13.25" width="7.5" height="7.5" />
                  </svg>
                </span>
                <span>The Unifize platform</span>
              </Link>
              <h1 className="dms-hero__title">
                {/* split into words for the page-in stagger (page-motion.css) */}
                <span className="dms-hero__line"><Words text="Your work crosses teams." /></span>
                <span className="dms-hero__line dms-hero__turn"><Words text="Your systems don’t." from={4} /></span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">
                Approvals, changes, and investigations close in email and meetings your systems never see.
                Unifize makes that work <strong>visible</strong>, <strong>measurable</strong>, and <strong>faster</strong>.
              </p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                <a href="#gap" className="dms-btn dms-btn-ghost">Follow one defect through your stack</a>
              </div>
            </div>
          </div>
        </div>

        {/* the hero object: the platform, end to end. Since 23 Sep 2026 a
          * pre-rendered film (one change, one take; scripts/platform-render)
          * flush on the charcoal, the rail under it seeking its six
          * chapters. 25 Sep 2026: v3, each step performed, not lifted, and
          * each chapter its own length (hero-film-assets.ts; v2 restorable).
          * HERO_FILM = false restores the live arcade journey on the wash. */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo pf-hero-demo hm-bleed">
          {heroFilm ? (
            <PlatformHeroFilm
              steps={JOURNEY_STEPS}
              label="The platform, screen by screen"
              poster={HERO_FILM_ASSETS.poster}
              chapterStarts={HERO_FILM_ASSETS.chapterStarts}
              keyBeats={HERO_FILM_ASSETS.keyBeats}
              sources={[{ src: HERO_FILM_ASSETS.src, type: HERO_FILM_ASSETS.type }]}
              description="One change control, CC-2148, worked through six Unifize screens: it lands in D. Fontaine's home queue with its context and she opens it; in the inbox production, document control and supplier quality answer in one thread and she replies; on the checklist she enters the impact assessment and production's readiness lands; she signs the quality approval with a Part 11 signature; in the process builder she adds a regulatory approval with a reminder and publishes it without code; and the dashboard shows median closure, time waiting and evidence complete, with CC-2148's signature in its row."
            />
          ) : (
            <PlatformJourney
              steps={JOURNEY_STEPS}
              configs={PLATFORM_JOURNEY_CONFIGS}
              label="The platform, screen by screen"
              ribbon="twin"
            />
          )}
        </div>
      </section>

      {/* the first hatched divider: closes the dark hero, opens the light page */}
      <HatchBand />

      {/* ============================ 01 · THE PROBLEM ==================
       * The gap and the tax in one breath, then three sourced numbers -
       * each carried by a small linework chart of its own evidence. */}
      <section className="dms-section pf-tax-section hm-railed" id="tax" aria-labelledby="pf-tax-title">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>The coordination tax</Eyebrow>
              <h2 className="dms-h2" id="pf-tax-title">The coordination tax: the work your systems never see.</h2>
            </div>
            <p className="dms-lede">
              Chasing sign-offs, rebuilding context, waiting on an inbox. Nothing on your stack measures it.
            </p>
          </header>
          <PlatformEvidence />
        </div>
      </section>

      {/* the tax hands to the gap across a hatched band */}
      <HatchBand />

      {/* ============================ 02 · THE GAP ======================
       * 9 Sep 2026 review: one message per section. This one is the gap
       * between the system of record and where the work happens, shown on a
       * single quality defect, today and on Unifize. */}
      <section className="dms-section pf-gap-section hm-railed" id="gap" aria-labelledby="pf-gap-title">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>The gap</Eyebrow>
              <h2 className="dms-h2" id="pf-gap-title">Your system of record is detached from where the work happens.</h2>
            </div>
            <p className="dms-lede">
              Follow one quality defect. Today it crosses six tools. On Unifize it stays on one record.
            </p>
          </header>
          <PlatformGap />
        </div>
      </section>

      {/* the gap hands to the stack across a hatched band */}
      <HatchBand />

      {/* ============================ 03 · THE STACK ====================
       * 22 Sep 2026 rails pass: the graphite ground goes; the exploded stack
       * is drawn in the coexistence diagram's light palette on the alt grey,
       * cells rail to rail. */}
      <section className="dms-section pf-stack-section hm-railed" id="stack" aria-labelledby="pf-stack-title">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>The stack</Eyebrow>
              <h2 className="dms-h2" id="pf-stack-title">You come for a product. The platform comes with it.</h2>
            </div>
            <p className="dms-lede">
              Three bands on one governed foundation. Start with any product and the rest of the platform
              arrives on day one.
            </p>
          </header>
          <PlatformStack />
        </div>
      </section>

      {/* the stack hands to coexistence across a hatched band */}
      <HatchBand />

      {/* ============================ 03 · YOUR SYSTEMS STAY ============
       * The second message, on its own and small: nothing is ripped out. */}
      <section className="dms-section pf-coex-section hm-railed" id="coexistence" aria-labelledby="pf-coex-title">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Coexistence</Eyebrow>
              <h2 className="dms-h2" id="pf-coex-title">Your systems stay.</h2>
            </div>
            <p className="dms-lede">
              Unifize runs alongside the systems of record and the tools your teams already use. Nothing is
              ripped out, and only what you agree flows back.
            </p>
          </header>
          <PlatformCoexistence />
        </div>
      </section>

      {/* the light-to-dark break before Unifize AI, on the coexistence white */}
      <HatchBand />

      {/* ============================ 04 · UNIFIZE AI ===================
       * The same app window the hero journeys on. Five moments on the
       * change, from the product recording: ask from the checklist, the
       * suggestion in the thread, a person adds the records, the assistant
       * tags the approver, and the trail the record kept of it all (the
       * human-in-the-loop claim as a beat, not a block; 22 Sep 2026). */}
      <section className="dms-section dms-section--dark pf-ai-section hm-railed" id="ai" aria-labelledby="pf-ai-title">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Unifize AI</Eyebrow>
              <h2 className="dms-h2" id="pf-ai-title">AI that does the coordination work. Your people keep the decisions.</h2>
            </div>
            <p className="dms-lede">
              The drafting, the chasing, the looking-up: that is where the coordination tax lives, and that is
              the work Unifize AI takes first. It is built into each process, not bolted on beside it.
            </p>
          </header>
          {/* the journey: one app window, five numbered moments on one line */}
          <div className="pf-journey-host pf-ai-journey" data-reveal>
            <PlatformJourney
              steps={AI_STEPS}
              configs={PLATFORM_AI_CONFIGS}
              label="Unifize AI, moment by moment"
              ribbon="twin"
              layout="side"
              cut
            />
          </div>
        </div>
      </section>

      {/* ============================ 05 · MEASURED =====================
       * The comparison, drawn: closure time falling away from your own
       * baseline, week by week, in the linework idiom turned to ink -
       * then the first number on the page a customer states on film. */}
      {/* ============================ 05 · MEASURED =====================
       * Hidden for now (Abhishek, 22 Sep 2026: "hide the measured section for
       * now"); the section, its fall figure and the attested step stay in
       * the code behind SHOW_MEASURED. One hatch band carries Unifize AI
       * straight into the proof reel while it is off. */}
      {SHOW_MEASURED ? (
        <>
          {/* the dark-to-light break after Unifize AI */}
          <HatchBand />

          {/* 22 Sep 2026 rails pass: the section turned light (the fall and its
            * ledgers keep their ink rules; the section re-points the dark tokens
            * to the light ones in platform-rails.css), so Unifize AI is the one
            * dark island between the hero and the close. */}
          <section className="dms-section pf-measured-section hm-railed" id="measured" aria-labelledby="pf-measured-title">
            <div className="dms-wrap">
              <header className="pf-split-head" data-reveal>
                <div>
                  <Eyebrow>Measured</Eyebrow>
                  <h2 className="dms-h2" id="pf-measured-title">You watch the tax fall, week by week.</h2>
                </div>
                <p className="dms-lede">
                  Every thread is timed as it runs: time open, time waiting, evidence complete. This is what
                  your first quarter looks like.
                </p>
              </header>
              <PlatformMeasured />
              <div className="pf-proofsteps">
                <div className="pf-proofstep">
                  <span className="pf-proofstep__lab">First</span>
                  <span className="pf-proofstep__name">You get your hours back.</span>
                  <p className="pf-proofstep__note">
                    Less waiting, fewer chases, faster closure, measured on your own work against your own baseline.
                  </p>
                </div>
                <div className="pf-proofstep">
                  <span className="pf-proofstep__lab">Then</span>
                  <span className="pf-proofstep__name">The savings show up in money.</span>
                  <p className="pf-proofstep__note">
                    Less scrap, rework, and premium freight. Every dollar claim is tied to work you can point at,
                    or we do not claim it.
                  </p>
                </div>
                {measuredFilm ? (
                  <a className="pf-proofstep pf-proofstep--film" href={measuredFilm.url} target="_blank" rel="noreferrer">
                    <span className="pf-proofstep__lab">On film</span>
                    <span className="pf-proofstep__name">&ldquo;Closure time down 75% in the first month.&rdquo;</span>
                    <p className="pf-proofstep__note">
                      Non-conformance closure, said on camera by {measuredFilm.person}, {measuredFilm.role},{" "}
                      {measuredFilm.company}.
                    </p>
                    <span className="pf-proofstep__go">Watch the customer say it
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* dark to dark: the band stays on the charcoal (Abhishek, 22 Sep) */}
      <HatchBand className="hm-hatch--dark" />

      {/* ============================ 06 · CUSTOMER PROOF =============== */}
      <PlatformProofFilms />

      {/* dark to grey: the band takes compliance's grey (Abhishek, 22 Sep) */}
      <HatchBand className="hm-hatch--alt" />

      {/* ============================ 07 · COMPLIANCE =================== */}
      <section className="dms-section dms-section--alt pf-compliance-section hm-railed" id="compliance" aria-labelledby="pf-compliance-title">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Compliance</Eyebrow>
              <h2 className="dms-h2" id="pf-compliance-title">Audit-ready, whichever standard governs you.</h2>
            </div>
            <p className="dms-lede">
              The record you show an auditor is the record the work created.
            </p>
          </header>

          <div className="pf-stds-ledger" data-reveal>
            {STANDARD_GROUPS.map((group) => (
              <section className="pf-stds-group" key={group.label} aria-label={`${group.label} standards`}>
                <header className="pf-stds-group__head">
                  <h3 className="pf-stds-group__lab">{group.label}</h3>
                  <p className="pf-stds-group__ind">{group.industries}</p>
                </header>
                <ul className="pf-stds">
                  {group.items.map((standard) => (
                    <li className="pf-std" key={standard.name}>
                      <span className="pf-std__name">{standard.name}</span>
                      <span className="pf-std__geo">{standard.geo}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* compliance hands to the FAQ across a hatched band, both on the grey */}
      <HatchBand className="hm-hatch--alt" />

      {/* ============================ 08 · FAQ ========================== */}
      <section className="dms-section dms-section--alt pf-faq-section hm-railed" id="faq" aria-labelledby="pf-faq-title">
        <div className="dms-wrap dms-faq-grid">
          <div className="dms-head" data-reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="dms-h2" id="pf-faq-title">The questions teams ask before they start.</h2>
            <p className="dms-lede">
              Anything else, <a href="#pf-close-h">bring it to the walkthrough</a>.
            </p>
          </div>
          <div data-reveal>
            <FaqAccordion faqs={PLATFORM_FAQS} idPrefix="pf-faq" />
          </div>
        </div>
      </section>

      {/* the last light-to-dark break, on the FAQ's grey: the close and the footer share the hero's charcoal */}
      <HatchBand className="hm-hatch--alt" />

      {/* ============================ CLOSE =============================
       * 23 Sep 2026 (Abhishek: "too much padding and it looks boring"):
       * the centred convergence mark goes. The close is now a cell grid on
       * the rails: the claim and the ask on the left, what the walkthrough
       * actually is on the right (three steps on one thread). The product
       * doors under it were removed the same day (Abhishek: "remove these"). */}
      <RailsClose
        id="pf-close-h"
        eyebrow="The Unifize platform"
        heading="One thread. Every decision kept."
        lede="Bring the process that costs the most coordination and watch it run end to end on one thread in a 30-minute walkthrough."
        secondary={{ label: "Watch one change close", href: "#platform" }}
      />

      {/* ------------------------------------------------------- footer */}
      <SiteFooter note="The Unifize Platform" />
    </main>
  );
}
