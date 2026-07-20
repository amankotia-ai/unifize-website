/* ==========================================================================
 * PLM - Product Lifecycle Management product page.
 * Mirrors the editorial composition and interaction system of the DMS page
 * (numbered chapters, problem spotlight, coordination tax, ink block for
 * modules → capabilities → lifecycle → integrations, owner register, proof
 * rail), with every section driven by the existing PLM content and product
 * mocks. Content is sourced from the Unifize Products database (Notion):
 * PLM (UPD-4).
 * ========================================================================= */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsHeader } from "../dms/dms-header";
import { CoordinationTax } from "../dms/dms-coordination";
import { IntegrationLayer } from "../dms/dms-integrations";
import { DmsIndustryIcon } from "../dms/dms-industry-icons";
import { CapGlyph } from "../dms/dms-linework";
import { Eyebrow, ShellFrame } from "../dms/dms-primitives";
import { FaqAccordion, LifecycleExplorer, ModuleExplorer } from "../dms/dms-interactive";
import { PLM_DATA, PLM_MODULES, PLM_PROBLEMS } from "./plm-data";
import { PLM_MODULE_MOCKS, PlmSpecRecord, PlmTraceMatrix, PlmFmea } from "./plm-mocks";
import { PlmProblemSpotlight } from "./plm-problem-visuals";
import { PlmProofStories } from "./plm-proof";
import "../../industry-template-modern/itm.css";
import "../dms/dms.css";
import "../dms/dms-redesign.css";
import "../_shared/product-kit.css";
import "./plm.css";

export const metadata: Metadata = {
  title: PLM_DATA.metaTitle,
  description: PLM_DATA.metaDescription,
};

const PLM_MODULE_POINT_ICONS: Record<string, string[]> = {
  "product-specifications": ["template", "change", "route", "matrix"],
  "product-risk-management": ["matrix", "route", "assessment", "review"],
  "design-controls-traceability": ["template", "route", "assessment", "evidence"],
  "inspection-process-parameters": ["evidence", "matrix", "route", "template"],
  "fmea-control-plan": ["matrix", "report", "route", "assign"],
};

/* the lifecycle span each persona owns (distilled from their Notion Daily
 * Activities; the daily lists live in PLM_DATA.owners) */
const PLM_OWNER_SCOPES: Record<string, string> = {
  "Design Engineer": "Design input → Verification",
  "Engineering Manager": "Review → Release",
};

/* one staged prototype per lifecycle step (spec → trace → FMEA → trace → spec) */
const PLM_STAGE_MOCKS = [<PlmSpecRecord key="0" />, <PlmTraceMatrix key="1" />, <PlmFmea key="2" />, <PlmTraceMatrix key="3" />, <PlmSpecRecord key="4" />];

export default function PlmProductPage() {
  return (
    <main className="dms dms--redesign plm">
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label="Product Lifecycle Management">
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
                <button type="button" className="dms-btn">{PLM_DATA.hero.ctaPrimary} &rarr;</button>
                <Link href={PLM_DATA.hero.ctaSecondary.href} className="dms-btn dms-btn-ghost">
                  {PLM_DATA.hero.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>

          <div className="dms-hero__frame dms-hero__product-demo">
            <div className="dms-hero__stage">
              <ShellFrame url="app.unifize.com / plm / design-controls">
                <PlmTraceMatrix />
              </ShellFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-section--dark dms-trust" aria-label="Industries served">
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

      {/* ============================ THE PROBLEM ======================= */}
      <section className="dms-section dms-problems" id="problem" aria-labelledby="plm-problems-title">
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

      {/* ==================== THE COORDINATION TAX =====================
       * The four failure modes roll up into one measurable root cause. */}
      <CoordinationTax variant="revision" problems={PLM_PROBLEMS} />

      {/* ============================ 02 · MODULES BUNDLED =============== */}
      <section className="dms-section dms-section--dark dms-modx-section pk-modx-ink" id="modules">
        <ModuleExplorer
          modules={PLM_MODULES}
          mocks={PLM_MODULE_MOCKS}
          heading={PLM_DATA.modules.heading}
          lede={PLM_DATA.modules.lede}
          ariaLabel="PLM modules"
          urlBase="plm"
          pointIcons={PLM_MODULE_POINT_ICONS}
        />
      </section>

      {/* ============================ 03 · CAPABILITIES ================== */}
      <section className="dms-section dms-section--dark pk-caps-ink" id="capabilities">
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
      <section className="dms-section dms-lifex-section pk-lifex-ink" id="lifecycle">
        <LifecycleExplorer
          steps={PLM_DATA.flow.steps}
          heading={PLM_DATA.flow.heading}
          trailLabel={PLM_DATA.flow.trailLabel}
          ariaLabel="Design release lifecycle"
          liveLabel="Design record staged by lifecycle state"
          stageMocks={PLM_STAGE_MOCKS}
          stageUrl="app.unifize.com / plm"
          mobileLabel={PLM_DATA.flow.mobileNote?.label}
          mobileId={PLM_DATA.flow.mobileNote?.id}
          idPrefix="plm-life"
        />
      </section>

      {/* ==================== INTEGRATIONS (connector layer) =========== */}
      <IntegrationLayer
        data={PLM_DATA.integrations}
        variant="minimal"
        minimalLede="Connect the product record to the tools already holding your parts, drawings, and process data."
      />

      {/* ============================ 05 · WHO IT IS FOR =================
       * The two owning personas in one compact register. Each card shows the
       * lifecycle span that role owns and three day-to-day responsibilities. */}
      <section className="dms-section dms-audience" id="who" aria-labelledby="plm-audience-title">
        <div className="dms-wrap">
          <header className="dms-audience__head" data-reveal>
            <Eyebrow n={5}>Who it is for</Eyebrow>
            <h2 className="dms-h2" id="plm-audience-title">{PLM_DATA.owners.heading}</h2>
            <p className="dms-lede">From design input to release, every role works from the same controlled record.</p>
          </header>

          <div className="dms-audience__personas">
            {PLM_DATA.owners.items.map((persona, index) => (
              <article className="dms-owner" key={persona.name} data-reveal>
                <header className="dms-owner__identity">
                  <div className="dms-owner__portrait" aria-hidden="true">
                    <img className="dms-owner__photo" src={persona.img} alt="" loading="lazy" />
                  </div>
                  <div className="dms-owner__identity-copy">
                    <span className="dms-owner__idx">
                      Persona {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="dms-owner__role">{persona.name}</h3>
                  </div>
                </header>

                <dl className="dms-owner__scope">
                  <dt>Lifecycle ownership</dt>
                  <dd>{PLM_OWNER_SCOPES[persona.name]}</dd>
                </dl>

                <div className="dms-owner__work">
                  <p className="dms-owner__work-label">Day to day</p>
                  <ul className="dms-owner__daily" aria-label={`${persona.name} responsibilities`}>
                    {persona.daily.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 06 · PROOF ========================= */}
      <PlmProofStories stories={PLM_DATA.proof.testimonials} />

      {/* ============================ 07 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-section--alt dms-compliance" id="compliance" aria-labelledby="plm-compliance-title">
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

      {/* ============================ 08 · FAQ =========================== */}
      <section className="dms-section dms-section--alt" id="faq">
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

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close" id="demo" aria-labelledby="plm-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__convergence" aria-hidden="true">
              <svg className="dms-close__flow" viewBox="0 0 1200 320" fill="none">
                <defs>
                  <path id="plm-flow-outer-left" d="M120 0C120 130 190 224 330 270C420 300 498 296 554 280" />
                  <path id="plm-flow-inner-left" d="M360 0C360 126 380 206 438 244C480 272 520 268 554 252" />
                  <path id="plm-flow-top-left" d="M520 0C520 120 520 186 564 228" />
                  <path id="plm-flow-top-center" d="M600 0V228" />
                  <path id="plm-flow-top-right" d="M680 0C680 120 680 186 636 228" />
                  <path id="plm-flow-inner-right" d="M840 0C840 126 820 206 762 244C720 272 680 268 646 252" />
                  <path id="plm-flow-outer-right" d="M1080 0C1080 130 1010 224 870 270C780 300 702 296 646 280" />
                </defs>
                <g className="dms-close__flow-lines">
                  <use href="#plm-flow-outer-left" /><use href="#plm-flow-inner-left" /><use href="#plm-flow-top-left" />
                  <use href="#plm-flow-top-center" /><use href="#plm-flow-top-right" /><use href="#plm-flow-inner-right" /><use href="#plm-flow-outer-right" />
                </g>
                <g className="dms-close__flow-signals">
                  <use className="dms-close__flow-signal dms-close__flow-signal--1" href="#plm-flow-outer-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--2" href="#plm-flow-inner-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--3" href="#plm-flow-top-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--4" href="#plm-flow-top-center" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--5" href="#plm-flow-top-right" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--6" href="#plm-flow-inner-right" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--7" href="#plm-flow-outer-right" />
                </g>
              </svg>
              <div className="dms-close__mark">
                <svg viewBox="0 2.2 21 22" fill="none">
                  <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                  <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                </svg>
              </div>
            </div>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">{PLM_DATA.close.eyebrow}</span>
              <h2 className="dms-close__h" id="plm-close-h">{PLM_DATA.close.heading}</h2>
              <p className="dms-lede">{PLM_DATA.close.lede}</p>
              <div className="dms-close__cta">
                <button type="button" className="dms-btn">{PLM_DATA.close.ctaPrimary}</button>
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
