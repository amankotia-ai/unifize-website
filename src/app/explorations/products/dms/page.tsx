/* ============================================================================
 * DMS - Document Management System. PRIMARY product page.
 * Promoted from ./stylized (Sep 2026): the Asana-idiom product visuals agreed
 * on the Jul 23 Website Rebuild call are now the page - deliberately stylized
 * component fragments (no full screens, no app sidebar, no window chrome),
 * background arcs linking records, oversized stylized headers, and the AI
 * acting from outside the frame. The hero's establishing shot is the shared
 * arcade engine walking six key moments of SOP-118, bookended by the no-code
 * process builder and the live document-control dashboard (both lifted from
 * the DMS demo video, Aug 2026). The previous primary lives on at ./classic.
 * Content is sourced from the Unifize Products database (Notion): DMS (UPD-2).
 *
 * 22 Sep 2026, the rails wave: the page moved onto the homepage's reference
 * grammar (PaperStack / meinGPT / Klea / Respan): two hairline rails down the
 * content column, hatched divider bands between sections, blue-square
 * eyebrows, split heads, cell grids drawn rail to rail, and every product
 * artifact on a soft wash with grain. The page opens and closes on one
 * charcoal (hero + trust, proof, close + footer); the middle goes light. The
 * shared grammar is _shared/page-rails.css (`dms--rails` on <main>,
 * `hm-railed` per section, <HatchBand /> between); dms-rails.css loads last
 * with what this page composes differently. Section content, data and the
 * arcade journeys are untouched.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { ProductAudience } from "../_shared/ProductAudience";
import {
  PRODUCT,
  DMS_PROBLEMS,
  DMS_FLOWS,
  CAPABILITIES,
  AUDIENCE,
  STANDARDS,
  TRUST_INDUSTRIES,
} from "./dms-data";
import { dmsCopy } from "./dms-copy";
import { DmsHeader } from "./dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { IntegrationIso } from "./dms-integrations-iso";
import { PRODUCT_INTEGRATION_LOGOS } from "../_shared/integrations-catalog";
import { Eyebrow } from "./dms-primitives";
import { CapGlyph } from "./dms-linework";
import { ProblemBoard } from "../_shared/problem-board";
import { DMS_BOARD_AFTER_NOTES, DMS_BOARD_ARTIFACTS } from "./dms-problem-board";
import { DmsIndustryIcon } from "./dms-industry-icons";
import { DmsProofReel } from "./dms-proof";
import {
  LifecycleExplorer,
  FaqAccordion,
} from "./dms-interactive";
import { ModuleRail } from "./dms-modules-rail";
import {
  STYLIZED_ARCADE_FLOW_CONFIGS,
  STYLIZED_HERO_STEPS,
  STYLIZED_LIFECYCLE_MOCKS,
  STYLIZED_MODULE_RAIL_CONFIGS,
} from "./stylized/stylized-mocks";
import { HeroArcade } from "../_shared/arcade/hero-arcade";
import { HatchBand } from "../../_shared/page-rails";
import "../../industry-template-modern/itm.css";
import "./dms.css";
import "./dms-redesign.css";
import "./stylized/stylized.css";
import "../../_shared/page-rails.css";
import "./dms-rails.css";
import { DmsMotion } from "../dms/dms-motion";
import { Words } from "../../_shared/split-words";
import { PM_REVEAL } from "../../_shared/page-motion-reveal";
import "../_shared/problem-board.css";
/* 24 Sep 2026: the page-in timeline and scroll choreography, loaded last */
import "../../_shared/page-motion.css";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { RailsClose } from "../../_shared/rails-close";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/products/dms");

/* line 2's words carry on the stagger from line 1 (page-motion.css) */
const HERO_LINE1_WORDS = dmsCopy("hero.line1", "One current version.").split(" ").length;

export default function DmsProductPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--stylized dms--rails dms-page pm">
      <DmsHeader />
      {/* scroll choreography: blocks, hatch bands and each section head's parts (page-motion.css) */}
      <DmsMotion selector={PM_REVEAL} />

      {/* ============================ HERO =============================
        * Dark grey ground: headline left, sub + CTAs right on one baseline,
        * then the arcade window on the sky wash running rail to rail with
        * the six-step rail under it. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed" aria-label="Document Management System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M7 3.75h7.4L18 7.35v12.9H7V3.75Z" />
                    <path className="dms-hero__product-detail" d="M14 3.75v4h4M9.75 12h5.5M9.75 15.5h5.5" />
                  </svg>
                </span>
                <span>Document Management System</span>
              </Link>
              <h1 className="dms-hero__title">
                {/* split into words for the page-in stagger (page-motion.css) */}
                <span className="dms-hero__line"><Words text={dmsCopy("hero.line1", "One current version.")} /></span>
                <span className="dms-hero__line dms-hero__turn"><Words text={dmsCopy("hero.line2", "Everywhere you look.")} from={HERO_LINE1_WORDS} /></span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{dmsCopy("hero.sub", PRODUCT.description)}</p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">{dmsCopy("hero.cta1", "Book a demo")} &rarr;</BookDemoButton>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  {dmsCopy("hero.cta2", "Take Coordination Tax Assessment")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The establishing shot is the arcade itself: one app window walking
          * six moments of SOP-118 (build → find → trust → sign → release →
          * measure), with a numbered step rail under it. The wrap bleeds so
          * the wash runs rail to rail. */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade hm-bleed">
          <HeroArcade steps={STYLIZED_HERO_STEPS} rail="top" />
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
        * Same charcoal, inside the rails, straight under the step rail. */}
      <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label="Industries served">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">{dmsCopy("trust.label", "One controlled record across regulated operations")}</p>
          <ul className="dms-trust__logos" aria-label="Representative industries">
            {TRUST_INDUSTRIES.map((industry) => (
              <li key={industry} className="dms-trust__mark">
                <DmsIndustryIcon industry={industry} />
                <span>{industry}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* the first hatched divider: the dark-to-light break */}
      <HatchBand />

      {/* ============================ THE PROBLEM =======================
       * The problem and the coordination tax, said once (24 Sep 2026): four
       * loops as cells, each with its object on a wash, one line that the
       * Today / With Unifize switch swaps, the customer film on the floor.
       * Replaced the tabbed spotlight + the BEFORE/AFTER ledger, which told
       * the same four stories twice. Shared with QMS: _shared/problem-board. */}
      <ProblemBoard
        heading={dmsCopy("problem.heading", "You have the document. Nobody can find it when it matters.")}
        lede={dmsCopy(
          "problem.lede",
          "Quality teams spend up to a third of their week hunting for controlled documents across shared drives, QMS folders, and email threads.",
        )}
        problems={DMS_PROBLEMS}
        artifacts={DMS_BOARD_ARTIFACTS}
        afterNotes={DMS_BOARD_AFTER_NOTES}
      />

      <HatchBand />

      {/* ============================ 02 · MODULES BUNDLED ===============
       * Sticky rail ledger: module names pin on the left while three rows
       * pass, each with its arcade scene on a wash between the rails. */}
      <section className="dms-section dms-modx-section hm-railed" id="modules">
        <ModuleRail
          heading={dmsCopy("modules.heading", "Three modules. One continuous record.")}
          lede={dmsCopy("modules.lede", "The change, the controlled revision, and the training obligation stay connected from the first decision to the final signature.")}
          arcadeConfigsByModule={STYLIZED_MODULE_RAIL_CONFIGS}
        />
      </section>

      <HatchBand />

      {/* ============================ 03 · CAPABILITIES ==================
       * Composition: header rail left, hairline cell ledger right. */}
      <section className="dms-section dms-caps-section hm-railed" id="capabilities">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={3}>Capabilities</Eyebrow>
            <h2 className="dms-h2">{dmsCopy("capabilities.heading", "The controls a regulated library runs on.")}</h2>
          </header>
          <ol className="dms-caps">
            {CAPABILITIES.map((c) => (
              <li className="dms-cap" key={c.title} data-reveal>
                <CapGlyph name={c.glyph} />
                <h3 className="dms-cap__title">{c.title}</h3>
                <p className="dms-cap__body">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <HatchBand />

      {/* ============================ 04 · LIFECYCLE =====================
       * Stylized: one fragment scene per lifecycle station in the sticky
       * live panel, indexed by station so persona flows land right too.
       * mapChip=false: only the Notion-backed flows render as journeys;
       * the page-owned lifecycle map chip is held back. On the rails the
       * section is light (the dms-lifex-section dark class is dropped so
       * the header samples it as light). */}
      <section className="dms-section dms-lifex-section--rails hm-railed" id="lifecycle">
        <LifecycleExplorer
          layout="sticky-visual"
          heading={dmsCopy("lifecycle.heading", "Every state has a gate. Every gate has an owner.")}
          flows={DMS_FLOWS}
          flowsLabel={dmsCopy("flows.heading", "Follow the work through the lifecycle.")}
          stageMocks={STYLIZED_LIFECYCLE_MOCKS}
          arcadeConfigsByFlow={STYLIZED_ARCADE_FLOW_CONFIGS}
          stageFrame={false}
          stageByStation
          mapChip={false}
          showFlowOutcomes={false}
        />
      </section>

      <HatchBand />

      {/* ==================== INTEGRATIONS (connector layer) =========== */}
      <IntegrationIso
        className="hm-railed"
        eyebrow="Integrations"
        heading={dmsCopy("integrations.heading", "Works with the systems you already run.")}
        lede={dmsCopy("integrations.lede", "Connect document control to the tools already holding your product, people, and process data.")}
        logos={PRODUCT_INTEGRATION_LOGOS.dms}
      />

      <HatchBand />

      {/* ============================ 05 · WHO IT IS FOR ================= */}
      <ProductAudience
        idPrefix="dms"
        heading={dmsCopy("audience.heading", "For the teams that keep every document current.")}
        lede={dmsCopy("audience.lede", AUDIENCE.lede)}
        personas={AUDIENCE.personas}
      />

      <HatchBand />

      {/* ============================ 06 · PROOF =========================
        * The homepage's reel of customer stills, on the bookends' charcoal,
        * with the DMS roster (dms-proof.tsx). */}
      <DmsProofReel />

      <HatchBand />

      {/* ============================ 07 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-compliance hm-railed" id="compliance" aria-labelledby="dms-compliance-title">
        <div className="dms-wrap">
          <header className="dms-compliance__head" data-reveal>
            <div className="dms-head">
              <Eyebrow n={7}>Compliance frame</Eyebrow>
              <h2 className="dms-h2" id="dms-compliance-title">{dmsCopy("compliance.heading", "One lifecycle. Every standard.")}</h2>
            </div>
            <p className="dms-lede">{dmsCopy("compliance.lede", "Control the record once, then prove it against whatever governs your operation.")}</p>
          </header>

          <div className="dms-compliance__body" data-reveal>
            <ul className="dms-compliance__standards">
              {STANDARDS.map((s) => (
                <li className="dms-compliance__standard" key={s.name}>
                  <div className="dms-std__top">
                    <span className="dms-std__issuer">{s.issuer}</span>
                    <span className="dms-std__geo">{s.geo}</span>
                  </div>
                  <div className="dms-std__details">
                    <h3 className="dms-std__name">{s.name}</h3>
                    <p className="dms-std__body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="dms-compliance__industries" data-reveal>
            <span className="dms-persona__lab">Validated across</span>
            <ul className="dms-inds" aria-label="Validated industries">
              {TRUST_INDUSTRIES.map((industry) => (
                <li key={industry} className="dms-ind">
                  <DmsIndustryIcon industry={industry} />
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ============================ 08 · FAQ =========================== */}
      <section className="dms-section dms-section--alt dms-faq-section hm-railed" id="faq">
        <div className="dms-wrap dms-faq-grid">
          <div className="dms-head" data-reveal>
            <Eyebrow n={8}>FAQ</Eyebrow>
            <h2 className="dms-h2">{dmsCopy("faq.heading", "The questions procurement and QA ask first.")}</h2>
            <p className="dms-lede">
              Anything else, <a href="#dms-close-h">bring it to the walkthrough</a>.
            </p>
          </div>
          <div data-reveal>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* the last light-to-dark break: the FAQ hands to the close block */}
      <HatchBand />

      {/* ============================ CLOSE =============================
        * On the hero's charcoal so the page opens and closes on the same
        * ground; the rails run through it and on through the footer. */}
      <RailsClose
        id="dms-close-h"
        eyebrow="Document control on Unifize"
        heading={dmsCopy("close.heading", "Bring the SOP you could not find the current version of.")}
        lede={dmsCopy("close.lede", "We will run it through the lifecycle live, from draft to Part 11 approval.")}
        primaryLabel={dmsCopy("close.cta", "Book a 30-minute walkthrough")}
        secondary={{ label: "See what is bundled", href: "#modules" }}
      />

      {/* ------------------------------------------------------- footer
        * the footer closes the page on the same charcoal as the close */}
      <SiteFooter tagline={dmsCopy("footer.tagline", "One governed home for every controlled document.")} note="Document Management System · UPD-2" />
    </main>
  );
}
