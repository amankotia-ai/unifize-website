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
import { StylizedCoordinationTax } from "../dms/stylized/stylized-ctax";
import { PLM_CTAX_SCENES, PLM_CTAX_AFTER_NOTES, PLM_CTAX_COPY } from "./plm-ctax";
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
import { PlmProblemSpotlight } from "./plm-problem-visuals";
import { PlmProofReel } from "./plm-proof";
import "../../industry-template-modern/itm.css";
import "../dms/dms.css";
import "../dms/dms-redesign.css";
import "../_shared/product-kit.css";
import "../dms/stylized/stylized.css";
import "../../_shared/page-rails.css";
import "../dms/dms-rails.css";
import "./plm.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: PLM_DATA.metaTitle,
  description: PLM_DATA.metaDescription,
};

/* one staged prototype per lifecycle step (spec → trace → FMEA → trace → spec) */
const PLM_STAGE_MOCKS = [<PlmSpecRecord key="0" />, <PlmTraceMatrix key="1" />, <PlmFmea key="2" />, <PlmTraceMatrix key="3" />, <PlmSpecRecord key="4" />];

export default function PlmProductPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--stylized dms--rails dms-page plm">
      <DmsHeader />

      {/* ============================ HERO =============================
        * Charcoal ground, centred head, then the arcade window on the sky
        * wash running rail to rail with the step rail above it. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed" aria-label="Product Lifecycle Management">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/explorations/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M12 2.2 20.5 7v10L12 21.8 3.5 17V7L12 2.2Z" />
                    <path className="dms-hero__product-detail" d="M12 21.5V12M12 12 3.8 7.3M12 12l8.2-4.7" />
                  </svg>
                </span>
                <span>Product Lifecycle Management</span>
              </Link>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">The trace from requirement to result</span>
                <span className="dms-hero__line dms-hero__turn">shouldn&rsquo;t have gaps.</span>
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

      {/* ============================ THE PROBLEM ======================= */}
      <section className="dms-section dms-problems hm-railed" id="problem" aria-labelledby="plm-problems-title">
        <div className="dms-wrap dms-problems__inner">
          <header className="dms-problems__intro">
            <div className="dms-problems__head">
              <Eyebrow n={1}>The problem</Eyebrow>
              <h2 className="dms-h2" id="plm-problems-title">{PLM_DATA.positioning.heading}</h2>
            </div>
            <p className="dms-lede">{PLM_DATA.positioning.lede}</p>
          </header>

          {/* Spotlight: index rail left, one failure mode on stage at a time. */}
          <PlmProblemSpotlight items={PLM_PROBLEMS} />

          <div className="dms-problems__bridge">
            <p><strong>Four failure modes, one root cause.</strong> The design work is not the bottleneck; the coordination around it is.</p>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ==================== THE COORDINATION TAX =====================
       * The four failure modes roll up into one measurable root cause. */}
      <StylizedCoordinationTax
        className="hm-railed"
        problems={PLM_PROBLEMS}
        scenes={PLM_CTAX_SCENES}
        afterNotes={PLM_CTAX_AFTER_NOTES}
        copy={PLM_CTAX_COPY}
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
        variant="minimal"
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
      <section className="dms-section dms-section--dark dms-close hm-close--rails hm-railed" id="demo" aria-labelledby="plm-close-h">
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
              <Eyebrow>{PLM_DATA.close.eyebrow}</Eyebrow>
              <h2 className="dms-close__h" id="plm-close-h">{PLM_DATA.close.heading}</h2>
              <p className="dms-lede">{PLM_DATA.close.lede}</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">{PLM_DATA.close.ctaPrimary}</BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline={PLM_DATA.footer.tagline} note={PLM_DATA.footer.baseRight} />
    </main>
  );
}
