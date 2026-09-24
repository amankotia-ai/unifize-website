/* ==========================================================================
 * QMS - Quality Management System product page.
 * Mirrors the editorial composition and interaction system of the DMS page,
 * with every section driven by the existing QMS content and product mocks.
 *
 * 23 Sep 2026, the rails port: the page takes the DMS page's template
 * one for one (products/dms/page.tsx). Two hairline rails down the content
 * column, hatched divider bands between sections, the charcoal bookends
 * (hero + trust, proof, close + footer) around a light middle, the hero head
 * centred over the glyph step rail, the modules as the sticky rail ledger
 * (ModuleRail) instead of the click-to-swap explorer, and proof as the
 * homepage reel. Shared grammar: _shared/page-rails.css + dms/dms-rails.css
 * (scoped .dms--redesign.dms-page); qms-rails.css adds only what QMS has
 * that DMS does not (six module washes). Content and journeys unchanged.
 * ========================================================================= */
import type { Metadata } from "next";
import Link from "next/link";
import { ProductAudience } from "../_shared/ProductAudience";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsHeader } from "../dms/dms-header";
import { QMS_CTAX_AFTER_NOTES } from "./qms-ctax";
import { ProblemBoard } from "../_shared/problem-board";
import { QMS_BOARD_ARTIFACTS } from "./qms-problem-board";
import { IntegrationLayer } from "../dms/dms-integrations";
import { PRODUCT_INTEGRATION_LOGOS } from "../_shared/integrations-catalog";
import { DmsIndustryIcon } from "../dms/dms-industry-icons";
import { CapGlyph } from "../dms/dms-linework";
import { Eyebrow } from "../dms/dms-primitives";
import { FaqAccordion, LifecycleExplorer } from "../dms/dms-interactive";
import { ModuleRail } from "../dms/dms-modules-rail";
import { HatchBand } from "../../_shared/page-rails";
import { HeroArcade } from "../_shared/arcade/hero-arcade";
import { QMS_AUDIENCE, QMS_DATA, QMS_MODULES, QMS_PROBLEMS, QMS_FLOWS } from "./qms-data";
import { qmsCopy } from "./qms-copy";
import { QMS_ARCADE_FLOW_CONFIGS, QMS_HERO_STEPS, QMS_MODULE_ARCADE_CONFIGS } from "./qms-arcade";
import { QmsProofReel } from "./qms-proof";
import "../../industry-template-modern/itm.css";
import "../dms/dms.css";
import "../dms/dms-redesign.css";
import "../_shared/product-kit.css";
import "../dms/stylized/stylized.css";
import "./qms.css";
import "../../_shared/page-rails.css";
import "../dms/dms-rails.css";
import "./qms-rails.css";
import { DmsMotion } from "../dms/dms-motion";
import { Words } from "../../_shared/split-words";
import { PM_REVEAL } from "../../_shared/page-motion-reveal";
import "../_shared/problem-board.css";
/* 24 Sep 2026: the page-in timeline and scroll choreography, loaded last */
import "../../_shared/page-motion.css";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { RailsClose } from "../../_shared/rails-close";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/products/qms");

/* rail glyphs for the six QMS modules (16-grid line paths, the ModuleRail
 * idiom; its built-in set covers only the DMS modules) */
const QMS_RAIL_ICONS: Record<string, string> = {
  "non-conformance": "M3.5 14.5v-13M3.5 2h9l-2 3 2 3h-9",
  capa: "M13 5.5A5.5 5.5 0 1 0 13.5 9M13.5 2v3.5H10M5.8 8.2l1.7 1.7 3-3.2",
  "complaint-handling": "M2 3h12v8H7l-3 3v-3H2zM8 5.2v2.6M8 9.6v.1",
  "audit-management": "M7 2.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM10.3 10.3l3.7 3.7M5 7l1.4 1.4L9 5.8",
  "supplier-quality": "M1.5 5h8v6.5h-8zM9.5 7.5h3l2 2.2v1.8h-5M4.5 13.5a1.3 1.3 0 1 0 0-.1M11.5 13.5a1.3 1.3 0 1 0 0-.1",
  "quality-risk-management": "M8 1.8l6.4 11.4H1.6zM8 6.2v3.3M8 11.4v.1",
};

export default function QmsProductPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--stylized qms dms--rails dms-page pm">
      <DmsHeader />
      {/* scroll choreography: blocks, hatch bands and each section head's parts (page-motion.css) */}
      <DmsMotion selector={PM_REVEAL} />

      <section className="dms-section dms-hero dms-hero--rails hm-railed" aria-label="Quality Management System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M12 2.8 19 5.6v5.7c0 4.5-3 8.5-7 9.9-4-1.4-7-5.4-7-9.9V5.6L12 2.8Z" />
                    <path className="dms-hero__product-detail" d="m8.7 12 2.1 2.1 4.5-4.7" />
                  </svg>
                </span>
                <span>Quality Management System</span>
              </Link>
              <h1 className="dms-hero__title">
                {/* split into words for the page-in stagger (page-motion.css) */}
                <span className="dms-hero__line"><Words text="A finding isn’t closed" /></span>
                <span className="dms-hero__line dms-hero__turn"><Words text="until the fix is proven." from={4} /></span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{QMS_DATA.hero.lede}</p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">{QMS_DATA.hero.ctaPrimary} &rarr;</BookDemoButton>
                <Link href={QMS_DATA.hero.ctaSecondary.href} className="dms-btn dms-btn-ghost">
                  {QMS_DATA.hero.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The establishing shot is the arcade itself: one app window walking
          * a finding from build to measured fix, the glyph step rail above
          * it. The wrap bleeds so the wash runs rail to rail. */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade hm-bleed">
          <HeroArcade steps={QMS_HERO_STEPS} rail="top" />
        </div>
      </section>

      <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label="Industries served">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">One governed quality record across regulated operations</p>
          <ul className="dms-trust__logos" aria-label="Representative industries">
            {QMS_DATA.compliance.industries.map((industry) => (
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

      {/* The problem and the coordination tax, said once (24 Sep 2026): four
        * loops as cells, each with its record artifact on a wash, the tax and
        * the outcome as a two-row ledger, and a Today / With Unifize switch
        * that flips every artifact. Replaced the tabbed spotlight + the
        * BEFORE/AFTER ledger, which told the same four stories twice. */}
      <ProblemBoard
        heading={QMS_DATA.positioning.heading}
        lede={QMS_DATA.positioning.lede}
        problems={QMS_PROBLEMS}
        artifacts={QMS_BOARD_ARTIFACTS}
        afterNotes={QMS_CTAX_AFTER_NOTES}
      />

      <HatchBand />

      {/* ============================ 02 · MODULES =======================
       * The DMS sticky rail ledger: module names pin on the left while the
       * six rows pass, each with its arcade scene on a wash between the
       * rails. */}
      <section className="dms-section dms-modx-section hm-railed" id="modules">
        <ModuleRail
          modules={QMS_MODULES}
          heading={QMS_DATA.modules.heading}
          lede={QMS_DATA.modules.lede ?? ""}
          arcadeConfigsByModule={QMS_MODULE_ARCADE_CONFIGS}
          ariaLabel="QMS modules"
          iconPaths={QMS_RAIL_ICONS}
        />
      </section>

      <HatchBand />

      <section className="dms-section dms-caps-section hm-railed" id="capabilities">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={3}>Capabilities</Eyebrow>
            <h2 className="dms-h2">{QMS_DATA.capabilities.heading}</h2>
          </header>
          <ol className="dms-caps">
            {QMS_DATA.capabilities.items.map((capability) => (
              <li className="dms-cap" key={capability.title} data-reveal>
                <CapGlyph name={capability.glyph} />
                <h3 className="dms-cap__title">{capability.title}</h3>
                <p className="dms-cap__body">{capability.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <HatchBand />

      {/* Same treatment as the DMS page: sticky story layout, no map chip;
        * every flow chip is an arcade journey on the persistent camera. On
        * the rails the section is light. */}
      <section className="dms-section dms-lifex-section--rails hm-railed" id="lifecycle">
        <LifecycleExplorer
          layout="sticky-visual"
          mapChip={false}
          stageFrame={false}
          steps={QMS_DATA.flow.steps}
          heading={QMS_DATA.flow.heading}
          trailLabel={QMS_DATA.flow.trailLabel}
          ariaLabel="Quality event lifecycle"
          liveLabel="CAPA-2148 decision trace, updated by lifecycle state"
          chatVariant="capa"
          progressPoints={QMS_DATA.flow.chat?.points}
          mobileLabel={QMS_DATA.flow.mobileNote?.label}
          mobileId={QMS_DATA.flow.mobileNote?.id}
          idPrefix="qms-life"
          flows={QMS_FLOWS}
          arcadeConfigsByFlow={QMS_ARCADE_FLOW_CONFIGS}
          flowsLabel="Follow the work through the lifecycle."
          showFlowOutcomes={false}
        />
      </section>

      <HatchBand />

      <IntegrationLayer
        data={QMS_DATA.integrations}
        variant="iso"
        tone="light"
        className="hm-railed"
        minimalEyebrow="Integrations"
        minimalLede="Connect the quality record to the tools already holding your lots, suppliers, and complaints."
        logos={PRODUCT_INTEGRATION_LOGOS.qms}
      />

      {/* ============================ 05 · WHO IT IS FOR =================
       * Same treatment as the DMS stylized page: one card per persona on the
       * QMS row (UPD-1) in Notion, portrait + lifecycle span + three daily
       * lines. Membership follows the Target Personas relation on sync. */}
      <HatchBand />

      <ProductAudience
        idPrefix="qms"
        heading={qmsCopy("audience.heading", QMS_AUDIENCE.heading)}
        lede={qmsCopy("audience.lede", QMS_AUDIENCE.lede)}
        personas={QMS_AUDIENCE.personas}
      />

      <HatchBand />

      {/* ============================ 06 · PROOF =========================
        * The homepage's reel of customer stills, on the bookends' charcoal,
        * with the QMS roster (qms-proof.tsx). */}
      <QmsProofReel />

      <HatchBand />

      <section className="dms-section dms-compliance hm-railed" id="compliance" aria-labelledby="qms-compliance-title">
        <div className="dms-wrap">
          <header className="dms-compliance__head" data-reveal>
            <div className="dms-head">
              <Eyebrow n={7}>Compliance frame</Eyebrow>
              <h2 className="dms-h2" id="qms-compliance-title">{QMS_DATA.compliance.heading}</h2>
            </div>
            <p className="dms-lede">Control the quality record once, then prove it against whatever governs your operation.</p>
          </header>

          <div className="dms-compliance__body" data-reveal>
            <ul className="dms-compliance__standards">
              {QMS_DATA.compliance.standards.map((standard) => (
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
              {QMS_DATA.compliance.industries.map((industry) => (
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

      <section className="dms-section dms-section--alt dms-faq-section hm-railed" id="faq">
        <div className="dms-wrap dms-faq-grid">
          <div className="dms-head" data-reveal>
            <Eyebrow n={8}>FAQ</Eyebrow>
            <h2 className="dms-h2">{QMS_DATA.faq.heading}</h2>
            <p className="dms-lede">Anything else, <a href="#qms-close-h">bring it to the walkthrough</a>.</p>
          </div>
          <div data-reveal>
            <FaqAccordion faqs={QMS_DATA.faq.items} idPrefix="qms-faq" />
          </div>
        </div>
      </section>

      {/* the last light-to-dark break: the FAQ hands to the close block */}
      <HatchBand />

      {/* On the hero's charcoal so the page opens and closes on the same
        * ground; the rails run through it and on through the footer. */}
      <RailsClose
        id="qms-close-h"
        eyebrow={QMS_DATA.close.eyebrow}
        heading={QMS_DATA.close.heading}
        lede={QMS_DATA.close.lede}
        primaryLabel={QMS_DATA.close.ctaPrimary}
        secondary={QMS_DATA.close.ctaSecondary}
      />

      <SiteFooter tagline={QMS_DATA.footer.tagline} note={QMS_DATA.footer.baseRight} />
    </main>
  );
}
