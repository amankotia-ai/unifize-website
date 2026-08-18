/* ==========================================================================
 * QMS - Quality Management System product page.
 * Mirrors the editorial composition and interaction system of the DMS page,
 * with every section driven by the existing QMS content and product mocks.
 * ========================================================================= */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsHeader } from "../dms/dms-header";
import { StylizedCoordinationTax } from "../dms/stylized/stylized-ctax";
import { QMS_CTAX_SCENES, QMS_CTAX_AFTER_NOTES, QMS_CTAX_COPY } from "./qms-ctax";
import { IntegrationLayer } from "../dms/dms-integrations";
import { PRODUCT_INTEGRATION_LOGOS } from "../_shared/integrations-catalog";
import { DmsIndustryIcon } from "../dms/dms-industry-icons";
import { CapGlyph } from "../dms/dms-linework";
import { Eyebrow } from "../dms/dms-primitives";
import { FaqAccordion, LifecycleExplorer, ModuleExplorer } from "../dms/dms-interactive";
import { HeroArcade } from "../_shared/arcade/hero-arcade";
import { QMS_AUDIENCE, QMS_DATA, QMS_MODULES, QMS_PROBLEMS, QMS_FLOWS } from "./qms-data";
import { qmsCopy } from "./qms-copy";
import { QMS_ARCADE_FLOW_CONFIGS, QMS_HERO_STEPS, QMS_MODULE_ARCADE_CONFIGS } from "./qms-arcade";
import { QMS_MODULE_MOCKS } from "./qms-mocks";
import { QmsProblemSpotlight } from "./qms-problem-visuals";
import { QmsProofFilms } from "./qms-proof";
import "../../industry-template-modern/itm.css";
import "../dms/dms.css";
import "../dms/dms-redesign.css";
import "../_shared/product-kit.css";
import "./qms.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: QMS_DATA.metaTitle,
  description: QMS_DATA.metaDescription,
};

const QMS_MODULE_POINT_ICONS: Record<string, string[]> = {
  "non-conformance": ["template", "roles", "evidence", "route"],
  capa: ["assessment", "assign", "review", "evidence"],
  "complaint-handling": ["template", "route", "review", "evidence"],
  "audit-management": ["review", "roles", "route", "assessment"],
  "supplier-quality": ["change", "assessment", "evidence", "report"],
  "quality-risk-management": ["report", "evidence", "assessment", "review"],
};

export default function QmsProductPage() {
  return (
    <main className="dms dms--redesign qms">
      <DmsHeader />

      <section className="dms-section dms-hero" aria-label="Quality Management System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/explorations/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M12 2.8 19 5.6v5.7c0 4.5-3 8.5-7 9.9-4-1.4-7-5.4-7-9.9V5.6L12 2.8Z" />
                    <path className="dms-hero__product-detail" d="m8.7 12 2.1 2.1 4.5-4.7" />
                  </svg>
                </span>
                <span>Quality Management System</span>
              </Link>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">A finding isn&rsquo;t closed</span>
                <span className="dms-hero__line dms-hero__turn">until the fix is proven.</span>
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

          {/* The establishing shot is the arcade itself: one app window
            * walking a finding from capture to proven fix, with a numbered
            * step rail under it. Same treatment as every product page hero. */}
          <div className="dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade">
            <HeroArcade steps={QMS_HERO_STEPS} />
          </div>
        </div>
      </section>

      <section className="dms-section dms-section--dark dms-trust" aria-label="Industries served">
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

      <section className="dms-section dms-problems" id="problem" aria-labelledby="qms-problems-title">
        <div className="dms-wrap dms-problems__inner">
          <header className="dms-problems__intro">
            <div className="dms-problems__head">
              <Eyebrow n={1}>The problem</Eyebrow>
              <h2 className="dms-h2" id="qms-problems-title">{QMS_DATA.positioning.heading}</h2>
            </div>
            <p className="dms-lede">{QMS_DATA.positioning.lede}</p>
          </header>

          <QmsProblemSpotlight items={QMS_PROBLEMS} />

          <div className="dms-problems__bridge">
            <p><strong>Four failure modes, one root cause.</strong> The quality work is not the bottleneck; the coordination around it is.</p>
          </div>
        </div>
      </section>

      <StylizedCoordinationTax
        problems={QMS_PROBLEMS}
        scenes={QMS_CTAX_SCENES}
        afterNotes={QMS_CTAX_AFTER_NOTES}
        copy={QMS_CTAX_COPY}
      />

      <section className="dms-section dms-section--dark dms-modx-section pk-modx-ink" id="modules">
        <ModuleExplorer
          arcadeConfigsByModule={QMS_MODULE_ARCADE_CONFIGS}
          modules={QMS_MODULES}
          mocks={QMS_MODULE_MOCKS}
          heading={QMS_DATA.modules.heading}
          lede={QMS_DATA.modules.lede}
          ariaLabel="QMS modules"
          urlBase="qms"
          pointIcons={QMS_MODULE_POINT_ICONS}
        />
      </section>

      <section className="dms-section dms-section--dark pk-caps-ink" id="capabilities">
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

      {/* Same treatment as the DMS page: sticky story layout, no map chip;
        * every flow chip is an arcade journey on the persistent camera. */}
      <section className="dms-section dms-lifex-section pk-lifex-ink" id="lifecycle">
        <LifecycleExplorer
          layout="sticky-visual"
          mapChip={false}
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

      <IntegrationLayer
        data={QMS_DATA.integrations}
        variant="minimal"
        minimalLede="Connect the quality record to the tools already holding your lots, suppliers, and complaints."
        logos={PRODUCT_INTEGRATION_LOGOS.qms}
      />

      {/* ============================ 05 · WHO IT IS FOR =================
       * Same treatment as the DMS stylized page: one card per persona on the
       * QMS row (UPD-1) in Notion, portrait + lifecycle span + three daily
       * lines. Membership follows the Target Personas relation on sync. */}
      <section className="dms-section dms-audience" id="who" aria-labelledby="qms-audience-title">
        <div className="dms-wrap">
          <header className="dms-audience__head" data-reveal>
            <Eyebrow n={5}>Who it is for</Eyebrow>
            <h2 className="dms-h2" id="qms-audience-title">{qmsCopy("audience.heading", QMS_AUDIENCE.heading)}</h2>
            <p className="dms-lede">{qmsCopy("audience.lede", QMS_AUDIENCE.lede)}</p>
          </header>

          <div className="dms-audience__personas">
            {QMS_AUDIENCE.personas.map((persona) => (
              <article className="dms-owner" key={persona.role} data-reveal>
                <header className="dms-owner__identity">
                  <div className="dms-owner__portrait" aria-hidden="true">
                    <img className="dms-owner__photo" src={persona.img} alt="" loading="lazy" />
                  </div>
                  <div className="dms-owner__identity-copy">
                    <h3 className="dms-owner__role">
                      {persona.href ? (
                        <Link href={persona.href}>
                          {persona.role}<span aria-hidden="true">↗</span>
                        </Link>
                      ) : persona.role}
                    </h3>
                  </div>
                </header>

                {persona.owns && (
                  <dl className="dms-owner__scope">
                    <dt>Lifecycle ownership</dt>
                    <dd>{persona.owns}</dd>
                  </dl>
                )}

                <div className="dms-owner__work">
                  <p className="dms-owner__work-label">Day to day</p>
                  <ul className="dms-owner__daily" aria-label={`${persona.role} responsibilities`}>
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

      <QmsProofFilms />

      <section className="dms-section dms-section--alt dms-compliance" id="compliance" aria-labelledby="qms-compliance-title">
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

      <section className="dms-section dms-section--alt" id="faq">
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

      <section className="dms-section dms-section--dark dms-close" id="demo" aria-labelledby="qms-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__convergence" aria-hidden="true">
              <svg className="dms-close__flow" viewBox="0 0 1200 320" fill="none">
                <defs>
                  <path id="qms-flow-outer-left" d="M120 0C120 130 190 224 330 270C420 300 498 296 554 280" />
                  <path id="qms-flow-inner-left" d="M360 0C360 126 380 206 438 244C480 272 520 268 554 252" />
                  <path id="qms-flow-top-left" d="M520 0C520 120 520 186 564 228" />
                  <path id="qms-flow-top-center" d="M600 0V228" />
                  <path id="qms-flow-top-right" d="M680 0C680 120 680 186 636 228" />
                  <path id="qms-flow-inner-right" d="M840 0C840 126 820 206 762 244C720 272 680 268 646 252" />
                  <path id="qms-flow-outer-right" d="M1080 0C1080 130 1010 224 870 270C780 300 702 296 646 280" />
                </defs>
                <g className="dms-close__flow-lines">
                  <use href="#qms-flow-outer-left" /><use href="#qms-flow-inner-left" /><use href="#qms-flow-top-left" />
                  <use href="#qms-flow-top-center" /><use href="#qms-flow-top-right" /><use href="#qms-flow-inner-right" /><use href="#qms-flow-outer-right" />
                </g>
                <g className="dms-close__flow-signals">
                  <use className="dms-close__flow-signal dms-close__flow-signal--1" href="#qms-flow-outer-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--2" href="#qms-flow-inner-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--3" href="#qms-flow-top-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--4" href="#qms-flow-top-center" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--5" href="#qms-flow-top-right" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--6" href="#qms-flow-inner-right" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--7" href="#qms-flow-outer-right" />
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
              <span className="dms-close__eyebrow">{QMS_DATA.close.eyebrow}</span>
              <h2 className="dms-close__h" id="qms-close-h">{QMS_DATA.close.heading}</h2>
              <p className="dms-lede">{QMS_DATA.close.lede}</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">{QMS_DATA.close.ctaPrimary}</BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline={QMS_DATA.footer.tagline} note={QMS_DATA.footer.baseRight} />
    </main>
  );
}
