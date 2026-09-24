/* ==========================================================================
 * PLM - Product Lifecycle Management product page.
 * Mirrors the editorial composition and interaction system of the DMS page
 * (numbered chapters, problem spotlight, coordination tax, ink block for
 * modules → capabilities → lifecycle → integrations, owner register, proof
 * rail), with every section driven by the existing PLM content and product
 * mocks. Content is sourced from the Unifize Products database (Notion):
 * PLM (UPD-4).
 *
 * 23 Sep 2026, the rails port: same template as the DMS page. Two hairline
 * rails down the content column, hatched divider bands between sections,
 * blue-square eyebrows, split heads, cell grids rail to rail, every product
 * artifact on a soft wash. Opens and closes on one charcoal (hero + trust,
 * proof, close + footer); the middle goes light. Modules moved from the
 * click-to-swap explorer to the DMS sticky rail ledger, and proof from the
 * film rail to the homepage reel. The shared grammar is
 * _shared/page-rails.css; dms-rails.css carries the DMS page composition
 * (scoped .dms-page) and plm.css only what PLM does differently.
 * ========================================================================= */
import type { Metadata } from "next";
import Link from "next/link";
import { ProductAudience } from "../_shared/ProductAudience";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsHeader } from "../dms/dms-header";
import { PLM_CTAX_AFTER_NOTES } from "./plm-ctax";
import { ProblemBoard } from "../_shared/problem-board";
import { PLM_BOARD_ARTIFACTS } from "./plm-problem-board";
import { IntegrationLayer } from "../dms/dms-integrations";
import { PRODUCT_INTEGRATION_LOGOS } from "../_shared/integrations-catalog";
import { DmsIndustryIcon } from "../dms/dms-industry-icons";
import { CapGlyph } from "../dms/dms-linework";
import { Eyebrow } from "../dms/dms-primitives";
import { HeroArcade } from "../_shared/arcade/hero-arcade";
import { FaqAccordion, LifecycleExplorer } from "../dms/dms-interactive";
import { ModuleRail } from "../dms/dms-modules-rail";
import { HatchBand } from "../../_shared/page-rails";
import { PLM_AUDIENCE, PLM_DATA, PLM_MODULES, PLM_PROBLEMS, PLM_FLOWS } from "./plm-data";
import { plmCopy } from "./plm-copy";
import { PLM_ARCADE_FLOW_CONFIGS, PLM_HERO_STEPS, PLM_MODULE_ARCADE_CONFIGS } from "./plm-arcade";
import { PlmSpecRecord, PlmTraceMatrix, PlmFmea } from "./plm-mocks";
import { PlmProofReel } from "./plm-proof";
import "../../industry-template-modern/itm.css";
import "../dms/dms.css";
import "../dms/dms-redesign.css";
import "../_shared/product-kit.css";
import "../dms/stylized/stylized.css";
import "../../_shared/page-rails.css";
import "../dms/dms-rails.css";
import "./plm.css";
import { DmsMotion } from "../dms/dms-motion";
import { Words } from "../../_shared/split-words";
import { PM_REVEAL } from "../../_shared/page-motion-reveal";
import "../_shared/problem-board.css";
/* 24 Sep 2026: the page-in timeline and scroll choreography, loaded last */
import "../../_shared/page-motion.css";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { RailsClose } from "../../_shared/rails-close";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/products/plm");

/* one staged prototype per lifecycle step (spec → trace → FMEA → trace → spec) */
const PLM_STAGE_MOCKS = [<PlmSpecRecord key="0" />, <PlmTraceMatrix key="1" />, <PlmFmea key="2" />, <PlmTraceMatrix key="3" />, <PlmSpecRecord key="4" />];

export default function PlmProductPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--stylized dms--rails dms-page plm pm">
      <DmsHeader />
      {/* scroll choreography: blocks, hatch bands and each section head's parts (page-motion.css) */}
      <DmsMotion selector={PM_REVEAL} />

      {/* ============================ HERO =============================
        * Charcoal ground, centred head, then the arcade window on the sky
        * wash running rail to rail with the step rail above it. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed" aria-label="Product Lifecycle Management">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M12 2.2 20.5 7v10L12 21.8 3.5 17V7L12 2.2Z" />
                    <path className="dms-hero__product-detail" d="M12 21.5V12M12 12 3.8 7.3M12 12l8.2-4.7" />
                  </svg>
                </span>
                <span>Product Lifecycle Management</span>
              </Link>
              <h1 className="dms-hero__title">
                {/* split into words for the page-in stagger (page-motion.css) */}
                <span className="dms-hero__line"><Words text="The trace from requirement to result" /></span>
                <span className="dms-hero__line dms-hero__turn"><Words text="shouldn’t have gaps." from={6} /></span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{PLM_DATA.hero.lede}</p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">{PLM_DATA.hero.ctaPrimary} &rarr;</BookDemoButton>
                <Link href={PLM_DATA.hero.ctaSecondary.href} className="dms-btn dms-btn-ghost">
                  {PLM_DATA.hero.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The establishing shot is the arcade itself: one app window
          * walking SPC-310's controlled change from live trace to closed
          * trace. The wrap bleeds so the wash runs rail to rail. */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade hm-bleed">
          <HeroArcade steps={PLM_HERO_STEPS} rail="top" />
        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label="Industries served">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">One controlled product record across regulated operations</p>
          <ul className="dms-trust__logos" aria-label="Representative industries">
            {PLM_DATA.compliance.industries.map((industry) => (
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
       * the same four stories twice. Shared: _shared/problem-board. */}
      <ProblemBoard
        heading={PLM_DATA.positioning.heading}
        lede={PLM_DATA.positioning.lede}
        problems={PLM_PROBLEMS}
        artifacts={PLM_BOARD_ARTIFACTS}
        afterNotes={PLM_CTAX_AFTER_NOTES}
      />

      <HatchBand />

      {/* ============================ 02 · MODULES BUNDLED ===============
       * The DMS sticky rail ledger: module names pin on the left while the
       * five rows pass, each with its arcade scene on a wash. */}
      <section className="dms-section dms-modx-section hm-railed" id="modules">
        <ModuleRail
          modules={PLM_MODULES}
          heading={PLM_DATA.modules.heading}
          lede={PLM_DATA.modules.lede ?? ""}
          arcadeConfigsByModule={PLM_MODULE_ARCADE_CONFIGS}
          ariaLabel="PLM modules"
        />
      </section>

      <HatchBand />

      {/* ============================ 03 · CAPABILITIES ================== */}
      <section className="dms-section dms-caps-section hm-railed" id="capabilities">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={3}>Capabilities</Eyebrow>
            <h2 className="dms-h2">{PLM_DATA.capabilities.heading}</h2>
          </header>
          <ol className="dms-caps">
            {PLM_DATA.capabilities.items.map((capability) => (
              <li className="dms-cap" key={capability.title} data-reveal>
                <CapGlyph name={capability.glyph} />
                <h3 className="dms-cap__title">{capability.title}</h3>
                <p className="dms-cap__body">{capability.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 04 · LIFECYCLE =====================
       * The design-release spine. The live panel stages the product mock for
       * the active step (spec record, trace matrix, FMEA) instead of a chat
       * script, since a design release is record-led, not thread-led. */}
      <HatchBand />

      <section className="dms-section dms-lifex-section--rails hm-railed" id="lifecycle">
        {/* Same treatment as the DMS page: sticky story layout, no map chip;
          * the flow chips are arcade journeys on the persistent camera. */}
        <LifecycleExplorer
          layout="sticky-visual"
          mapChip={false}
          stageByStation
          steps={PLM_DATA.flow.steps}
          heading={PLM_DATA.flow.heading}
          trailLabel={PLM_DATA.flow.trailLabel}
          ariaLabel="Design release lifecycle"
          liveLabel="Design record staged by lifecycle state"
          stageMocks={PLM_STAGE_MOCKS}
          stageUrl="app.unifize.com / plm"
          stageFrame={false}
          mobileLabel={PLM_DATA.flow.mobileNote?.label}
          mobileId={PLM_DATA.flow.mobileNote?.id}
          idPrefix="plm-life"
          flows={PLM_FLOWS}
          arcadeConfigsByFlow={PLM_ARCADE_FLOW_CONFIGS}
          flowsLabel="Follow the work through the lifecycle."
          showFlowOutcomes={false}
        />
      </section>

      <HatchBand />

      {/* ==================== INTEGRATIONS (connector layer) =========== */}
      <IntegrationLayer
        data={PLM_DATA.integrations}
        variant="iso"
        tone="light"
        className="hm-railed"
        minimalEyebrow="Integrations"
        minimalLede="Connect the product record to the tools already holding your parts, drawings, and process data."
        logos={PRODUCT_INTEGRATION_LOGOS.plm}
      />

      <HatchBand />

      {/* ============================ 05 · WHO IT IS FOR =================
       * Same treatment as the DMS stylized page: one card per persona on the
       * PLM row (UPD-4) in Notion, portrait + lifecycle span + three daily
       * lines. Membership follows the Target Personas relation on sync. */}
      <ProductAudience
        idPrefix="plm"
        heading={plmCopy("audience.heading", PLM_AUDIENCE.heading)}
        lede={plmCopy("audience.lede", PLM_AUDIENCE.lede)}
        personas={PLM_AUDIENCE.personas}
      />

      <HatchBand />

      {/* ============================ 06 · PROOF =========================
        * The homepage's reel of customer stills, on the bookends' charcoal,
        * with the PLM roster (plm-proof.tsx). */}
      <PlmProofReel />

      <HatchBand />

      {/* ============================ 07 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-compliance hm-railed" id="compliance" aria-labelledby="plm-compliance-title">
        <div className="dms-wrap">
          <header className="dms-compliance__head" data-reveal>
            <div className="dms-head">
              <Eyebrow n={7}>Compliance frame</Eyebrow>
              <h2 className="dms-h2" id="plm-compliance-title">{PLM_DATA.compliance.heading}</h2>
            </div>
            <p className="dms-lede">Control the product record once, then prove it against whatever governs your operation.</p>
          </header>

          <div className="dms-compliance__body" data-reveal>
            <ul className="dms-compliance__standards">
              {PLM_DATA.compliance.standards.map((standard) => (
                <li className="dms-compliance__standard" key={standard.name}>
                  <div className="dms-std__top">
                    <span className="dms-std__issuer">{standard.geo.split(" · ")[0]}</span>
                    <span className="dms-std__geo">{standard.geo}</span>
                  </div>
                  <div className="dms-std__details">
                    <h3 className="dms-std__name">{standard.name}</h3>
                    <p className="dms-std__body">{standard.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="dms-compliance__industries" data-reveal>
            <span className="dms-persona__lab">Validated across</span>
            <ul className="dms-inds" aria-label="Validated industries">
              {PLM_DATA.compliance.industries.map((industry) => (
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
            <h2 className="dms-h2">{PLM_DATA.faq.heading}</h2>
            <p className="dms-lede">Anything else, <a href="#plm-close-h">bring it to the walkthrough</a>.</p>
          </div>
          <div data-reveal>
            <FaqAccordion faqs={PLM_DATA.faq.items} idPrefix="plm-faq" />
          </div>
        </div>
      </section>

      {/* the last light-to-dark break: the FAQ hands to the close block */}
      <HatchBand />

      {/* ============================ CLOSE =============================
        * On the hero's charcoal so the page opens and closes on the same
        * ground; the rails run through it and on through the footer. */}
      <RailsClose
        id="plm-close-h"
        eyebrow={PLM_DATA.close.eyebrow}
        heading={PLM_DATA.close.heading}
        lede={PLM_DATA.close.lede}
        primaryLabel={PLM_DATA.close.ctaPrimary}
        secondary={PLM_DATA.close.ctaSecondary}
      />

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline={PLM_DATA.footer.tagline} note={PLM_DATA.footer.baseRight} />
    </main>
  );
}
