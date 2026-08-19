/* ============================================================================
 * DMS · STYLIZED - duplicate of the DMS product page with the Asana-idiom
 * product visuals agreed on the Jul 23 Website Rebuild call: deliberately
 * stylized component fragments (no full screens, no app sidebar, no window
 * chrome), background arcs linking records, oversized stylized headers, and
 * the AI acting from outside the frame. The hero's establishing shot is the
 * shared arcade engine walking six key moments of SOP-118, bookended by the
 * no-code process builder and the live document-control dashboard (both
 * lifted from the DMS demo video, Aug 2026).
 * Copy, data, and every non-product-visual section are identical to ../page.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  PRODUCT,
  DMS_PROBLEMS,
  DMS_FLOWS,
  INTEGRATIONS,
  CAPABILITIES,
  AUDIENCE,
  STANDARDS,
  TRUST_INDUSTRIES,
} from "../dms-data";
import { dmsCopy } from "../dms-copy";
import { DmsHeader } from "../dms-header";
import { SiteFooter } from "../../../_shared/site-footer";
import { IntegrationLayer } from "../dms-integrations";
import { PRODUCT_INTEGRATION_LOGOS } from "../../_shared/integrations-catalog";
import { Eyebrow } from "../dms-primitives";
import { CapGlyph } from "../dms-linework";
import { DmsProblemSpotlight } from "../dms-problem-visuals";
import { DmsIndustryIcon } from "../dms-industry-icons";
import { DmsProofFilms } from "../dms-proof";
import {
  ModuleExplorer,
  LifecycleExplorer,
  FaqAccordion,
} from "../dms-interactive";
import {
  STYLIZED_ARCADE_FLOW_CONFIGS,
  STYLIZED_HERO_STEPS,
  STYLIZED_LIFECYCLE_MOCKS,
  STYLIZED_MODULE_ARCADE_CONFIGS,
} from "./stylized-mocks";
import { HeroArcade } from "../../_shared/arcade/hero-arcade";
import { StylizedCoordinationTax } from "./stylized-ctax";
import "../../../industry-template-modern/itm.css";
import "../dms.css";
import "../dms-redesign.css";
import "./stylized.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "Document Management System · Stylized · Unifize",
  description:
    "DMS bundles Document Control, Change Control, and Training into one governed record. Controlled documents from draft to obsolete, with 21 CFR Part 11 e-signature where required.",
  robots: { index: false },
};

export default function DmsStylizedPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--stylized">
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label="Document Management System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/explorations/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M7 3.75h7.4L18 7.35v12.9H7V3.75Z" />
                    <path className="dms-hero__product-detail" d="M14 3.75v4h4M9.75 12h5.5M9.75 15.5h5.5" />
                  </svg>
                </span>
                <span>Document Management System</span>
              </Link>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">{dmsCopy("hero.line1", "One current version.")}</span>
                <span className="dms-hero__line dms-hero__turn">{dmsCopy("hero.line2", "Everywhere you look.")}</span>
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

          {/* The establishing shot is the arcade itself: one app window walking
            * six moments of SOP-118 (build → find → trust → sign → release →
            * measure), with a numbered step rail under it. */}
          <div className="dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade">
            <HeroArcade steps={STYLIZED_HERO_STEPS} />
          </div>

        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-section--dark dms-trust" aria-label="Industries served">
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

      {/* ============================ THE PROBLEM ======================= */}
      <section className="dms-section dms-problems" id="problem" aria-labelledby="dms-problems-title">
        <div className="dms-wrap dms-problems__inner">
          <header className="dms-problems__intro">
            <div className="dms-problems__head">
              <Eyebrow n={1}>The problem</Eyebrow>
              <h2 className="dms-h2" id="dms-problems-title">
                {dmsCopy("problem.heading", "You have the document. Nobody can find it when it matters.")}
              </h2>
            </div>
            <p className="dms-lede">
              {dmsCopy(
                "problem.lede",
                "Quality teams spend up to a third of their week hunting for controlled documents across shared drives, QMS folders, and email threads.",
              )}
            </p>
          </header>

          {/* Spotlight: index rail left, one symptom on stage at a time. */}
          <DmsProblemSpotlight items={DMS_PROBLEMS} />

          <div className="dms-problems__bridge">
            <p><strong>Four symptoms, one root cause.</strong> The work isn’t the bottleneck; the coordination around it is.</p>
          </div>
        </div>
      </section>

      {/* ==================== THE COORDINATION TAX =====================
       * The four daily symptoms roll up into one measurable root cause, read
       * as a BEFORE / AFTER ledger with a drawn scene per stage. */}
      <StylizedCoordinationTax problems={DMS_PROBLEMS} />

      {/* ============================ 02 · MODULES BUNDLED ===============
       * Stylized: fragment scenes replace the framed workspace mocks. */}
      <section className="dms-section dms-section--dark dms-modx-section pk-modx-ink" id="modules">
        <ModuleExplorer
          heading={dmsCopy("modules.heading", "Three modules. One continuous record.")}
          lede={dmsCopy("modules.lede", "The change, the controlled revision, and the training obligation stay connected from the first decision to the final signature.")}
          arcadeConfigsByModule={STYLIZED_MODULE_ARCADE_CONFIGS}
          frame={false}
        />
      </section>

      {/* ============================ 03 · CAPABILITIES ==================
       * Composition: sticky header rail left, indexed ledger right. On ink. */}
      <section className="dms-section dms-section--dark pk-caps-ink" id="capabilities">
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

      {/* ============================ 04 · LIFECYCLE =====================
       * Stylized: one fragment scene per lifecycle station in the sticky
       * live panel, indexed by station so persona flows land right too.
       * mapChip=false: only the Notion-backed flows render as journeys;
       * the page-owned lifecycle map chip is held back. */}
      <section className="dms-section dms-lifex-section pk-lifex-ink" id="lifecycle">
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

      {/* ==================== INTEGRATIONS (connector layer) =========== */}
      <IntegrationLayer
        data={INTEGRATIONS}
        variant="minimal"
        minimalEyebrow="Integrations"
        minimalHeading={dmsCopy("integrations.heading", "Works with the systems you already run.")}
        minimalLede={dmsCopy("integrations.lede", "Connect document control to the tools already holding your product, people, and process data.")}
        logos={PRODUCT_INTEGRATION_LOGOS.dms}
        ctaHeading={dmsCopy("integrations.cta.heading", "Don’t see your system?")}
        ctaBody={dmsCopy("integrations.cta.body", "We are always adding connectors. Bring us the stack you need to keep in step.")}
        ctaLabel={dmsCopy("integrations.cta.label", "Talk to us")}
      />

      {/* ============================ 05 · WHO IT IS FOR ================= */}
      <section className="dms-section dms-audience" id="who" aria-labelledby="dms-audience-title">
        <div className="dms-wrap">
          <header className="dms-audience__head" data-reveal>
            <Eyebrow n={5}>Who it is for</Eyebrow>
            <h2 className="dms-h2" id="dms-audience-title">{dmsCopy("audience.heading", "For the teams that keep every document current.")}</h2>
            <p className="dms-lede">{dmsCopy("audience.lede", AUDIENCE.lede)}</p>
          </header>

          <div className="dms-audience__personas">
            {AUDIENCE.personas.map((persona) => (
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

      {/* ============================ 06 · PROOF ========================= */}
      <div className="itm dms-proof-reference">
        <DmsProofFilms />
      </div>

      {/* ============================ 07 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-section--alt dms-compliance" id="compliance" aria-labelledby="dms-compliance-title">
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

      {/* ============================ 08 · FAQ =========================== */}
      <section className="dms-section dms-section--alt" id="faq">
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

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close" id="demo" aria-labelledby="dms-close-h">
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
              <Eyebrow>{dmsCopy("close.eyebrow", "Ready when you are")}</Eyebrow>
              <h2 className="dms-close__h" id="dms-close-h">{dmsCopy("close.heading", "Bring the SOP you could not find the current version of.")}</h2>
              <p className="dms-lede">{dmsCopy("close.lede", "We will run it through the lifecycle live, from draft to Part 11 approval.")}</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">{dmsCopy("close.cta", "Book a 30-minute walkthrough")}</BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline={dmsCopy("footer.tagline", "One governed home for every controlled document.")} note="Document Management System · UPD-2 · stylized visuals" />
    </main>
  );
}
