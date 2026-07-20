/* ============================================================================
 * MES - Manufacturing Execution System. PRODUCT page.
 * Built the way the DMS page is built (see ../dms/page.tsx): same editorial
 * system (numbered chapters, hairline ledgers, mono indices, big display
 * type), same section arc (problem spotlight → coordination tax → modules →
 * capabilities → lifecycle → integrations → owners → proof → compliance →
 * FAQ → close), driven by MES content. Product visuals are coded prototypes
 * (mes-mocks) awaiting real screenshots. Content is sourced from the Unifize
 * Products database (Notion): MES (UPD-5).
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  PRODUCT,
  MES_PROBLEMS,
  MODULES,
  MODULE_POINT_ICONS,
  LIFECYCLE,
  INTEGRATIONS,
  INTEGRATIONS_MINIMAL_LEDE,
  CAPABILITIES,
  AUDIENCE,
  STANDARDS,
  INDUSTRIES,
  PROOF_STORIES,
  FAQS,
} from "./mes-data";
import { DmsHeader } from "../dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { NAV } from "../../_shared/nav-data";
import { CoordinationTax } from "../dms/dms-coordination";
import { IntegrationLayer } from "../dms/dms-integrations";
import { Eyebrow, ShellFrame } from "../dms/dms-primitives";
import { CapGlyph } from "../dms/dms-linework";
import { DmsIndustryIcon } from "../dms/dms-industry-icons";
import {
  MesWorkOrder,
  MesTraveller,
  MesInspection,
  MesControlPlan,
  MesBatchRecord,
  MES_MODULE_MOCKS,
} from "./mes-mocks";
import { MesProblemSpotlight } from "./mes-problem-visuals";
import { MesProofStories } from "./mes-proof";
import {
  ModuleExplorer,
  LifecycleExplorer,
  FaqAccordion,
} from "../dms/dms-interactive";
import "../../industry-template-modern/itm.css";
import "../dms/dms.css";
import "../_shared/product-kit.css";
import "../dms/dms-redesign.css";
import "./mes.css";

export const metadata: Metadata = {
  title: "Manufacturing Execution System · Unifize",
  description:
    "MES runs work orders, electronic travellers, inspection, and batch records on one system, so every operation is signed, evidenced, and traceable by lot.",
};

/* the trust strip and compliance band share the icon set; the strip shows a
 * REPRESENTATIVE set of regulated manufacturers, the compliance band keeps the
 * honest Notion-verified list (INDUSTRIES). */
const MES_TRUST_INDUSTRY_NAMES = new Set([
  "Medical Devices",
  "Pharmaceuticals",
  "Automotive",
  "Aerospace",
  "Food Processing",
  "Cosmetics",
]);

const MES_TRUST_INDUSTRIES =
  NAV.find((item) => item.label === "Industries")?.cols
    ?.flatMap((column) => column.items.map((item) => item.label))
    .filter((label) => MES_TRUST_INDUSTRY_NAMES.has(label)) ?? [];

export default function MesProductPage() {
  return (
    <main className="dms dms--redesign mes">
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label="Manufacturing Execution System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/explorations/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M4.25 20.25V9.9l4.9-3.15V9.9l4.9-3.15V9.9l5.7-3.6v13.95H4.25Z" />
                    <path className="dms-hero__product-detail" d="M7.4 16.4h2.2M11.4 16.4h2.2M15.4 16.4h2.2" />
                  </svg>
                </span>
                <span>Manufacturing Execution System</span>
              </Link>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">What happened on the floor.</span>
                <span className="dms-hero__line dms-hero__turn">A record, not a memory.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{PRODUCT.description}</p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn">Book a demo &rarr;</button>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  Take Coordination Tax Assessment
                </Link>
              </div>
            </div>
          </div>

          <div className="dms-hero__frame dms-hero__product-demo">
            <div className="dms-hero__stage">
              <ShellFrame url="app.unifize.com / work orders">
                <MesWorkOrder />
              </ShellFrame>
            </div>
          </div>

        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-section--dark dms-trust" aria-label="Industries served">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">One governed record across regulated production</p>
          <ul className="dms-trust__logos" aria-label="Representative industries">
            {MES_TRUST_INDUSTRIES.map((industry) => (
              <li key={industry} className="dms-trust__mark">
                <DmsIndustryIcon industry={industry} />
                <span>{industry}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ THE PROBLEM ======================= */}
      <section className="dms-section dms-problems" id="problem" aria-labelledby="mes-problems-title">
        <div className="dms-wrap dms-problems__inner">
          <header className="dms-problems__intro">
            <div className="dms-problems__head">
              <Eyebrow n={1}>The problem</Eyebrow>
              <h2 className="dms-h2" id="mes-problems-title">
                Paper travellers can&rsquo;t prove what happened on the line.
              </h2>
            </div>
            <p className="dms-lede">
              When step completion, evidence, and signatures live on paper, the batch record is a reconstruction,
              and every question about the run becomes an investigation.
            </p>
          </header>

          {/* Spotlight: index rail left, one symptom on stage at a time. */}
          <MesProblemSpotlight items={MES_PROBLEMS} />

          <div className="dms-problems__bridge">
            <p><strong>Four symptoms, one root cause.</strong> The work isn&rsquo;t the bottleneck; the coordination around it is.</p>
          </div>
        </div>
      </section>

      {/* ==================== THE COORDINATION TAX =====================
       * The four daily symptoms roll up into one measurable root cause. */}
      <CoordinationTax variant="revision" problems={MES_PROBLEMS} />

      {/* ============================ 02 · MODULES BUNDLED ===============
       * The Unifize product story begins after the problem is fully framed. */}
      <section className="dms-section dms-section--dark dms-modx-section pk-modx-ink" id="modules">
        <ModuleExplorer
          modules={MODULES}
          mocks={MES_MODULE_MOCKS}
          heading="Five disciplines, one shop floor."
          lede="The work order, the traveller, the inspection, and the batch record stay connected from release to a sealed, traceable lot."
          ariaLabel="MES modules"
          urlBase="mes"
          pointIcons={MODULE_POINT_ICONS}
        />
      </section>

      {/* ============================ 03 · CAPABILITIES ==================
       * Composition: sticky header rail left, indexed ledger right. On ink. */}
      <section className="dms-section dms-section--dark pk-caps-ink" id="capabilities">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={3}>Capabilities</Eyebrow>
            <h2 className="dms-h2">The controls a shop floor runs on.</h2>
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
       * The lot's path from released work order to sealed record. The live
       * panel stages the product prototype for the active step. On ink. */}
      <section className="dms-section dms-lifex-section pk-lifex-ink" id="lifecycle">
        <LifecycleExplorer
          steps={LIFECYCLE}
          heading="From a released work order to a sealed batch record."
          trailLabel="How a lot moves"
          ariaLabel="Lot lifecycle"
          liveLabel="Lot L-2271, staged by lifecycle state"
          stageMocks={[
            <MesWorkOrder key="released" />,
            <MesTraveller key="in-process" />,
            <MesInspection key="inspection" />,
            <MesControlPlan key="fai" />,
            <MesBatchRecord key="sealed" />,
          ]}
          stageUrl="app.unifize.com / mes / lot L-2271"
          mobileLabel="Batch record"
          mobileId="L-2271 · released → executed → inspected → FAI → sealed"
          idPrefix="mes-life"
        />
      </section>

      {/* ==================== INTEGRATIONS (connector layer) ===========
       * Connective beat after the lifecycle: the batch record does not stop
       * at Unifize's edge. Unnumbered interstitial, on ink, so it continues
       * the dark block (02-04) one section longer before the light 05. */}
      <IntegrationLayer data={INTEGRATIONS} variant="minimal" minimalLede={INTEGRATIONS_MINIMAL_LEDE} />

      {/* ============================ 05 · WHO IT IS FOR =================
       * Three roles in one compact row. Each card shows the lifecycle span
       * that role owns and three day-to-day responsibilities. */}
      <section className="dms-section dms-audience" id="who" aria-labelledby="mes-audience-title">
        <div className="dms-wrap">
          <header className="dms-audience__head" data-reveal>
            <Eyebrow n={5}>Who it is for</Eyebrow>
            <h2 className="dms-h2" id="mes-audience-title">For the people who run the shift.</h2>
            <p className="dms-lede">{AUDIENCE.lede}</p>
          </header>

          <div className="dms-audience__personas">
            {AUDIENCE.personas.map((persona, index) => (
              <article className="dms-owner" key={persona.role} data-reveal>
                <header className="dms-owner__identity">
                  <div className="dms-owner__portrait" aria-hidden="true">
                    <img className="dms-owner__photo" src={persona.img} alt="" loading="lazy" />
                  </div>
                  <div className="dms-owner__identity-copy">
                    <span className="dms-owner__idx">
                      Persona {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="dms-owner__role">
                      {persona.href ? (
                        <Link href={persona.href}>
                          {persona.role}<span aria-hidden="true">↗</span>
                        </Link>
                      ) : persona.role}
                    </h3>
                  </div>
                </header>

                <dl className="dms-owner__scope">
                  <dt>Lifecycle ownership</dt>
                  <dd>{persona.owns}</dd>
                </dl>

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
       * Story rail on the film-rail shell. Sample stories for now; swap for
       * real MES customer films (see mes-proof.tsx note). */}
      <MesProofStories stories={PROOF_STORIES} />

      {/* ============================ 07 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-section--alt dms-compliance" id="compliance" aria-labelledby="mes-compliance-title">
        <div className="dms-wrap">
          <header className="dms-compliance__head" data-reveal>
            <div className="dms-head">
              <Eyebrow n={7}>Compliance frame</Eyebrow>
              <h2 className="dms-h2" id="mes-compliance-title">One governed shop floor. Every standard.</h2>
            </div>
            <p className="dms-lede">Sign the operation once, then prove it against whatever governs your production.</p>
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
              {INDUSTRIES.map((industry) => (
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
            <h2 className="dms-h2">The questions operations and quality ask first.</h2>
            <p className="dms-lede">
              Anything else, <a href="#mes-close-h">bring it to the walkthrough</a>.
            </p>
          </div>
          <div data-reveal>
            <FaqAccordion faqs={FAQS} idPrefix="mes-faq" />
          </div>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close" id="demo" aria-labelledby="mes-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__convergence" aria-hidden="true">
              <svg className="dms-close__flow" viewBox="0 0 1200 320" fill="none">
                <defs>
                  <path id="mes-flow-outer-left" d="M120 0C120 130 190 224 330 270C420 300 498 296 554 280" />
                  <path id="mes-flow-inner-left" d="M360 0C360 126 380 206 438 244C480 272 520 268 554 252" />
                  <path id="mes-flow-top-left" d="M520 0C520 120 520 186 564 228" />
                  <path id="mes-flow-top-center" d="M600 0V228" />
                  <path id="mes-flow-top-right" d="M680 0C680 120 680 186 636 228" />
                  <path id="mes-flow-inner-right" d="M840 0C840 126 820 206 762 244C720 272 680 268 646 252" />
                  <path id="mes-flow-outer-right" d="M1080 0C1080 130 1010 224 870 270C780 300 702 296 646 280" />
                </defs>
                <g className="dms-close__flow-lines">
                  <use href="#mes-flow-outer-left" />
                  <use href="#mes-flow-inner-left" />
                  <use href="#mes-flow-top-left" />
                  <use href="#mes-flow-top-center" />
                  <use href="#mes-flow-top-right" />
                  <use href="#mes-flow-inner-right" />
                  <use href="#mes-flow-outer-right" />
                </g>
                <g className="dms-close__flow-signals">
                  <use className="dms-close__flow-signal dms-close__flow-signal--1" href="#mes-flow-outer-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--2" href="#mes-flow-inner-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--3" href="#mes-flow-top-left" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--4" href="#mes-flow-top-center" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--5" href="#mes-flow-top-right" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--6" href="#mes-flow-inner-right" />
                  <use className="dms-close__flow-signal dms-close__flow-signal--7" href="#mes-flow-outer-right" />
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
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="mes-close-h">Bring the batch record you rebuild by hand.</h2>
              <p className="dms-lede">We will run a lot live, from a released work order to a sealed, traceable record, signed at every step.</p>
              <div className="dms-close__cta">
                <button type="button" className="dms-btn">Book a 30-minute walkthrough</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline="One governed record for every lot on the floor." note="Manufacturing Execution System · UPD-5" />
    </main>
  );
}
