/* ============================================================================
 * MES - Manufacturing Execution System. PRODUCT page.
 * Built the way the DMS page is built (see ../dms/page.tsx): same editorial
 * system (numbered chapters, hairline ledgers, mono indices, big display
 * type), same section arc (problem spotlight → coordination tax → modules →
 * capabilities → lifecycle → integrations → owners → proof → compliance →
 * FAQ → close), driven by MES content. Product visuals are coded prototypes
 * (mes-mocks) awaiting real screenshots. Content is sourced from the Unifize
 * Products database (Notion): MES (UPD-5).
 *
 * 23 Sep 2026, the rails port: the page moved onto the same template as the
 * DMS page (../dms/page.tsx, 22 Sep rails wave): two hairline rails down the
 * content column, hatched divider bands between sections, the arcade hero on
 * a wash with the glyph step rail on top, a light middle (sticky module rail,
 * capabilities, lifecycle, integrations, owners), the homepage reel of
 * customer stills for proof, and the charcoal close + footer. The page carries
 * the DMS scope classes (`dms--stylized dms--rails dms-page`) so
 * stylized.css and dms-rails.css apply as-is; mes-rails.css holds the few
 * MES-only differences. Section content, data and arcade journeys are MES.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { ProductAudience } from "../_shared/ProductAudience";
import { MES_ARCADE_FLOW_CONFIGS, MES_HERO_STEPS, MES_MODULE_ARCADE_CONFIGS } from "./mes-arcade";
import { HeroArcade } from "../_shared/arcade/hero-arcade";
import {
  PRODUCT,
  MES_PROBLEMS,
  MES_FLOWS,
  MODULES,
  LIFECYCLE,
  INTEGRATIONS,
  INTEGRATIONS_MINIMAL_LEDE,
  CAPABILITIES,
  AUDIENCE,
  STANDARDS,
  INDUSTRIES,
  FAQS,
} from "./mes-data";
import { DmsHeader } from "../dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { NAV } from "../../_shared/nav-data";
import { StylizedCoordinationTax } from "../dms/stylized/stylized-ctax";
import { MES_CTAX_SCENES, MES_CTAX_AFTER_NOTES, MES_CTAX_COPY } from "./mes-ctax";
import { IntegrationLayer } from "../dms/dms-integrations";
import { PRODUCT_INTEGRATION_LOGOS } from "../_shared/integrations-catalog";
import { Eyebrow } from "../dms/dms-primitives";
import { CapGlyph } from "../dms/dms-linework";
import { DmsIndustryIcon } from "../dms/dms-industry-icons";
import {
  MesWorkOrder,
  MesTraveller,
  MesInspection,
  MesControlPlan,
  MesBatchRecord,
} from "./mes-mocks";
import { MesProblemSpotlight } from "./mes-problem-visuals";
import { mesCopy } from "./mes-copy";
import { MesProofReel } from "./mes-proof";
import { LifecycleExplorer, FaqAccordion } from "../dms/dms-interactive";
import { ModuleRail } from "../dms/dms-modules-rail";
import { HatchBand } from "../../_shared/page-rails";
import "../../industry-template-modern/itm.css";
import "../dms/dms.css";
import "../_shared/product-kit.css";
import "../dms/dms-redesign.css";
import "../dms/stylized/stylized.css";
import "./mes.css";
import "../../_shared/page-rails.css";
import "../dms/dms-rails.css";
import "./mes-rails.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

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
    <main className="dms dms--redesign dms--consistent-eyebrows dms--stylized dms--rails dms-page mes">
      <DmsHeader />

      {/* ============================ HERO =============================
        * Dark grey ground: the centred head, then the arcade window on the
        * wash running rail to rail with the glyph step rail on top. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed" aria-label="Manufacturing Execution System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/platform">
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
                <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  Take Coordination Tax Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The establishing shot is the arcade itself: one app window walking
          * WO-9021 from the no-code builder that configures its traveller,
          * through the release queue and the live floor dashboard, to the
          * sealed lot. The wrap bleeds so the wash runs rail to rail. */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade hm-bleed">
          <HeroArcade steps={MES_HERO_STEPS} rail="top" />
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
        * Same charcoal, inside the rails, straight under the arcade. */}
      <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label="Industries served">
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

      {/* the first hatched divider: the dark-to-light break */}
      <HatchBand />

      {/* ============================ THE PROBLEM ======================= */}
      <section className="dms-section dms-problems hm-railed" id="problem" aria-labelledby="mes-problems-title">
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

      <HatchBand />

      {/* ==================== THE COORDINATION TAX =====================
       * The four daily symptoms roll up into one measurable root cause, read
       * as a BEFORE / AFTER ledger with a drawn scene per stage. */}
      <StylizedCoordinationTax
        problems={MES_PROBLEMS}
        scenes={MES_CTAX_SCENES}
        afterNotes={MES_CTAX_AFTER_NOTES}
        copy={MES_CTAX_COPY}
        className="hm-railed"
      />

      <HatchBand />

      {/* ============================ 02 · MODULES BUNDLED ===============
       * Sticky rail ledger: module names pin on the left while the five
       * rows pass, each with its arcade scene on a wash between the rails. */}
      <section className="dms-section dms-modx-section hm-railed" id="modules">
        <ModuleRail
          modules={MODULES}
          heading="Five disciplines, one shop floor."
          lede="The work order, the traveller, the inspection, and the batch record stay connected from release to a sealed, traceable lot."
          arcadeConfigsByModule={MES_MODULE_ARCADE_CONFIGS}
          ariaLabel="MES modules"
        />
      </section>

      <HatchBand />

      {/* ============================ 03 · CAPABILITIES ==================
       * Composition: header rail left, hairline cell ledger right. */}
      <section className="dms-section dms-caps-section hm-railed" id="capabilities">
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

      <HatchBand />

      {/* ============================ 04 · LIFECYCLE =====================
       * The lot's path from released work order to sealed record. On the
       * rails the section is light (the dark lifex classes are dropped so
       * the header samples it as light). */}
      <section className="dms-section dms-lifex-section--rails hm-railed" id="lifecycle">
        {/* Same treatment as the DMS page: sticky story layout, no map chip;
          * the flow chips are arcade journeys on the persistent camera. */}
        <LifecycleExplorer
          layout="sticky-visual"
          mapChip={false}
          stageByStation
          steps={LIFECYCLE}
          heading="From a released work order to a sealed batch record."
          trailLabel="How a lot moves"
          ariaLabel="Lot lifecycle"
          liveLabel="Lot L-2271, staged by lifecycle state"
          flows={MES_FLOWS}
          arcadeConfigsByFlow={MES_ARCADE_FLOW_CONFIGS}
          flowsLabel="Follow the work through the lifecycle."
          showFlowOutcomes={false}
          stageMocks={[
            <MesWorkOrder key="released" />,
            <MesTraveller key="in-process" />,
            <MesInspection key="inspection" />,
            <MesControlPlan key="fai" />,
            <MesBatchRecord key="sealed" />,
          ]}
          stageFrame={false}
          stageUrl="app.unifize.com / mes / lot L-2271"
          mobileLabel="Batch record"
          mobileId="L-2271 · released → executed → inspected → FAI → sealed"
          idPrefix="mes-life"
        />
      </section>

      <HatchBand />

      {/* ==================== INTEGRATIONS (connector layer) =========== */}
      <IntegrationLayer
        data={INTEGRATIONS}
        variant="minimal"
        tone="light"
        className="hm-railed"
        minimalEyebrow="Integrations"
        minimalLede={INTEGRATIONS_MINIMAL_LEDE}
        logos={PRODUCT_INTEGRATION_LOGOS.mes}
      />

      <HatchBand />

      {/* ============================ 05 · WHO IT IS FOR =================
       * Same treatment as the DMS stylized page: one card per persona on the
       * MES row (UPD-5) in Notion, portrait + lifecycle span + three daily
       * lines. Membership follows the Target Personas relation on sync. */}
      <ProductAudience
        idPrefix="mes"
        heading={mesCopy("audience.heading", AUDIENCE.heading)}
        lede={mesCopy("audience.lede", AUDIENCE.lede)}
        personas={AUDIENCE.personas}
      />

      <HatchBand />

      {/* ============================ 06 · PROOF =========================
        * The homepage's reel of customer stills, on the bookends' charcoal,
        * with the MES roster (mes-proof.tsx). */}
      <MesProofReel />

      <HatchBand />

      {/* ============================ 07 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-compliance hm-railed" id="compliance" aria-labelledby="mes-compliance-title">
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

      <HatchBand />

      {/* ============================ 08 · FAQ =========================== */}
      <section className="dms-section dms-section--alt dms-faq-section hm-railed" id="faq">
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

      {/* the last light-to-dark break: the FAQ hands to the close block */}
      <HatchBand />

      {/* ============================ CLOSE =============================
        * On the hero's charcoal so the page opens and closes on the same
        * ground; the rails run through it and on through the footer. */}
      <section className="dms-section dms-section--dark dms-close hm-close--rails hm-railed" id="demo" aria-labelledby="mes-close-h">
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
              <Eyebrow>Ready when you are</Eyebrow>
              <h2 className="dms-close__h" id="mes-close-h">Bring the batch record you rebuild by hand.</h2>
              <p className="dms-lede">We will run a lot live, from a released work order to a sealed, traceable record, signed at every step.</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer
        * the footer closes the page on the same charcoal as the close */}
      <SiteFooter tagline="One governed record for every lot on the floor." note="Manufacturing Execution System · UPD-5" />
    </main>
  );
}
