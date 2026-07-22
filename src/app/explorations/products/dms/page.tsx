/* ============================================================================
 * DMS - Document Management System. PRODUCT page.
 * Design language borrowed from the industry-template-modern exploration
 * (Geist display, Inter body, Unifize blue, dark hero/close, dashed dividers,
 * restrained reveal motion). Editorial system: numbered chapters, hairline
 * ledgers and registers instead of card grids, mono indices, big display type.
 * Product visuals are explicit placeholders (DmsPlaceholder) awaiting real
 * screenshots. Content is sourced from the Unifize Products database (Notion):
 * DMS (UPD-2).
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  PRODUCT,
  DMS_PROBLEMS,
  INTEGRATIONS,
  CAPABILITIES,
  AUDIENCE,
  STANDARDS,
  TRUST_INDUSTRIES,
} from "./dms-data";
import { dmsCopy } from "./dms-copy";
import { DmsHeader } from "./dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { CoordinationTax } from "./dms-coordination";
import { IntegrationLayer } from "./dms-integrations";
import { Eyebrow, ShellFrame } from "./dms-primitives";
import { CapGlyph } from "./dms-linework";
import { MockDocRegister } from "./dms-mocks";
import { DmsProblemSpotlight } from "./dms-problem-visuals";
import { DmsHeroVideo } from "./dms-hero-video";
import { DmsIndustryIcon } from "./dms-industry-icons";
import { DmsProofFilms } from "./dms-proof";
import {
  ModuleExplorer,
  LifecycleExplorer,
  FaqAccordion,
} from "./dms-interactive";
import "../../industry-template-modern/itm.css";
import "./dms.css";
import "./dms-redesign.css";

export const metadata: Metadata = {
  title: "Document Management System · Unifize",
  description:
    "DMS bundles Document Control, Change Control, and Training into one governed record. Controlled documents from draft to obsolete, with 21 CFR Part 11 e-signature where required.",
};

export default function DmsProductPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows">
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
                <button type="button" className="dms-btn">{dmsCopy("hero.cta1", "Book a demo")} &rarr;</button>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  {dmsCopy("hero.cta2", "Take Coordination Tax Assessment")}
                </Link>
              </div>
            </div>
          </div>

          <div className="dms-hero__frame dms-hero__product-demo">
            <div className="dms-hero__stage">
              <DmsHeroVideo>
                <ShellFrame url="app.unifize.com / documents">
                  <MockDocRegister />
                </ShellFrame>
              </DmsHeroVideo>
            </div>
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
       * The four daily symptoms roll up into one measurable root cause. */}
      <CoordinationTax variant="revision" problems={DMS_PROBLEMS} />

      {/* ============================ 02 · MODULES BUNDLED ===============
       * The Unifize product story begins after the problem is fully framed. */}
      <section className="dms-section dms-section--dark dms-modx-section pk-modx-ink" id="modules">
        <ModuleExplorer
          heading={dmsCopy("modules.heading", "Three modules. One continuous record.")}
          lede={dmsCopy("modules.lede", "The change, the controlled revision, and the training obligation stay connected from the first decision to the final signature.")}
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
       * Sticky scroll story (mirrors section 02): the component owns the
       * head, the brand field container, and the trail + shell inside it.
       * On ink: near-black field + black bottom breathing room. */}
      <section className="dms-section dms-lifex-section pk-lifex-ink" id="lifecycle">
        <LifecycleExplorer
          layout="sticky-visual"
          heading={dmsCopy("lifecycle.heading", "Every state has a gate. Every gate has an owner.")}
        />
      </section>

      {/* ==================== INTEGRATIONS (connector layer) ===========
       * Connective beat after the lifecycle: the controlled document does not
       * stop at Unifize's edge. Unnumbered interstitial, on ink, so it continues
       * the dark block (02-04) one section longer before the light 05. */}
      <IntegrationLayer
        data={INTEGRATIONS}
        variant="minimal"
        minimalEyebrow="Integrations"
        minimalHeading={dmsCopy("integrations.heading", "Works with the systems you already run.")}
        minimalLede={dmsCopy("integrations.lede", "Connect document control to the tools already holding your product, people, and process data.")}
        ctaHeading={dmsCopy("integrations.cta.heading", "Don’t see your system?")}
        ctaBody={dmsCopy("integrations.cta.body", "We are always adding connectors. Bring us the stack you need to keep in step.")}
        ctaLabel={dmsCopy("integrations.cta.label", "Talk to us")}
      />

      {/* ============================ 05 · WHO IT IS FOR =================
       * Three roles in one compact row. Each card shows the lifecycle span
       * that role owns and three day-to-day responsibilities. */}
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

      {/* ============================ 06 · PROOF =========================
       * Real customer films from the Webflow CMS (see PROOF_FILMS), on the
       * itm carousel shell; the attested figure keeps the lead card. */}
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
                <button type="button" className="dms-btn">{dmsCopy("close.cta", "Book a 30-minute walkthrough")}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline={dmsCopy("footer.tagline", "One governed home for every controlled document.")} note="Document Management System · UPD-2" />
    </main>
  );
}
