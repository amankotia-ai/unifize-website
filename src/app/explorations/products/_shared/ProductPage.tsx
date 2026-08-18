/* ============================================================================
 * ProductPage - shared server component that renders a Unifize product page in
 * the DMS design system (see ../dms). It reuses the DMS stylesheet and the
 * generic DMS components (header, motion, primitives, line-work glyphs) and is
 * driven entirely by a data object, so QMS / PLM / MES are thin route files.
 * The DMS page itself is left untouched; this is a parallel, data-driven build.
 * Copy is sourced from the Unifize Products database (Notion) per product.
 * ========================================================================== */
import Link from "next/link";
import { DmsHeader } from "../dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsMotion } from "../dms/dms-motion";
import { CoordinationTax, type CoordinationLeak } from "../dms/dms-coordination";
import { IntegrationLayer, type IntegrationData } from "../dms/dms-integrations";
import { Eyebrow, ShellFrame, StagePanel, HatchFrame, pad } from "../dms/dms-primitives";
import { CapGlyph, SolidGlyph, SeverityIcon } from "../dms/dms-linework";
import {
  ModuleScrollStory,
  ModuleLedger,
  FlowExplorer,
  ProofCarousel,
  FaqAccordion,
  type ModuleDatum,
  type FlowStep,
  type Testimonial,
} from "./product-interactive";
import "../dms/dms.css";
import "./product-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

const SEV_CLASS: Record<string, string> = { Critical: "is-critical", High: "is-high", Medium: "is-medium" };

export type Feature = { title: string; body: string; glyph: string };
export type Capability = { title: string; body: string; glyph: string };
export type Owner = { name: string; tier: string; aka: string; summary: string; daily: string[]; img?: string };
export type Pain = { title: string; body: string; severity: "Critical" | "High" | "Medium" };
export type Standard = { name: string; geo: string; body: string };

export type ProductPageData = {
  slug: string;
  crumbLabel: string;
  metaTitle: string;
  metaDescription: string;

  hero: {
    headline: React.ReactNode;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: { label: string; href: string };
    standards: string[];
    mock: React.ReactNode;
  };

  /** the product-specific parts of the shared "coordination tax" frame: this
   * product's tax `leaks` (left column) and the `summary` line (how it collapses
   * the tax). The headline, lede, and governed thread are constants in
   * ../dms/dms-coordination. */
  coordinationTax: { leaks: CoordinationLeak[]; summary: React.ReactNode };

  positioning: { eyebrowN: number; heading: string; lede: string; features: Feature[] };

  modules: {
    mode: "scroll" | "ledger";
    eyebrowN: number;
    heading: string;
    lede?: string;
    items: ModuleDatum[];
    mocks: Record<string, React.ReactNode>;
    urlBase: string;
    /** run this section on the dark "ink" palette (near-black block). Both the
     * ledger (pk-modv-ink) and scroll (pk-modx-ink) modes are styled for ink. */
    tone?: "alt" | "dark";
  };

  capabilities: { eyebrowN: number; heading: string; items: Capability[]; tone?: "alt" | "dark" };

  flow: {
    eyebrowN: number;
    heading: string;
    trailLabel: string;
    steps: FlowStep[];
    chat?: { variant: "capa" | "change-control"; points: number[] };
    stageMocks?: React.ReactNode[];
    mobileNote?: { label: string; id: string };
    /** run the lifecycle field on ink (near-black) instead of brand blue, and
     * give the full-bleed section real bottom breathing room. */
    tone?: "dark";
  };

  /** the connector section after the lifecycle - Unifize as the coordination
   * layer over the systems of record this product's buyers already run. Always
   * on ink, continuing the dark block the lifecycle ends on. */
  integrations: IntegrationData;

  owners: { eyebrowN: number; heading: string; items: Owner[] };

  /* optional since the bespoke pages render Customer proof from the Website
   * Customer Videos mirror instead (see products/_shared/proof-films.tsx) */
  proof?: { eyebrowN: number; kicker: string; testimonials: Testimonial[] };

  pains: { eyebrowN: number; heading: string; items: Pain[] };

  compliance: { eyebrowN: number; heading: string; standards: Standard[]; industries: string[] };

  faq: { eyebrowN: number; heading: string; lede?: React.ReactNode; items: { q: string; a: string }[] };

  close: {
    eyebrow: string;
    heading: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: { label: string; href: string };
  };

  footer: { tagline: string; baseRight: string; nav: { label: string; links: { label: string; href: string }[] }[] };
};

export function ProductPage({ data }: { data: ProductPageData }) {
  return (
    <main className="dms">
      <DmsMotion />
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label={data.crumbLabel}>
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <div className="dms-hero__crumb">
                <Link href="/explorations/platform">Products</Link>
                <span className="dms-hero__crumb-sep" aria-hidden="true">/</span>
                <span>{data.crumbLabel}</span>
              </div>
              <h1 className="dms-hero__title">{data.hero.headline}</h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{data.hero.lede}</p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">{data.hero.ctaPrimary} &rarr;</BookDemoButton>
                <a href={data.hero.ctaSecondary.href} className="dms-btn dms-btn-ghost">{data.hero.ctaSecondary.label}</a>
              </div>
            </div>
          </div>
          <ul className="dms-hero__stds" aria-label="Standards supported">
            {data.hero.standards.map((s) => (
              <li key={s} className="dms-hero__std">{s}</li>
            ))}
          </ul>
        </div>

        <div className="dms-wrap dms-hero__frame">
          <ShellFrame url={`app.unifize.com / ${data.slug}`}>{data.hero.mock}</ShellFrame>
        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-trust" aria-label="Customers">
        <div className="dms-wrap dms-trust__inner">
          <div className="dms-trust__logos" role="img" aria-label="Customer logos, placeholders">
            {[128, 96, 150, 108, 136, 92].map((w, i) => (
              <span key={i} className="dms-trust__mark" style={{ width: w }} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== THE COORDINATION TAX =====================
       * Thesis interstitial before the numbered walkthrough: the shared
       * category premise, resolved with this product's collapse line. */}
      <CoordinationTax leaks={data.coordinationTax.leaks} summary={data.coordinationTax.summary} />

      {/* ============================ 01 · POSITIONING ================== */}
      <section className="dms-section dms-problem">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.positioning.eyebrowN}>The problem</Eyebrow>
            <h2 className="dms-h2">{data.positioning.heading}</h2>
            <p className="dms-lede">{data.positioning.lede}</p>
          </div>
          <ul className="dms-problem__feats" data-reveal style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
            {data.positioning.features.map((f) => (
              <li className="dms-pf" key={f.title}>
                <SolidGlyph name={f.glyph} className="dms-pf__glyph" />
                <h3 className="dms-pf__title">{f.title}</h3>
                <p className="dms-pf__body">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 02 · MODULES =====================
       * The scroll story handles its own vertical rhythm via the sticky, so it
       * keeps `dms-modx-section` (padding-block:0). The stationary ledger needs
       * the standard section padding instead - so it drops that class and reads
       * as a normal section. `tone:"dark"` runs the whole block on ink. */}
      <section
        className={
          "dms-section " +
          (data.modules.tone === "dark"
            ? "dms-section--dark " + (data.modules.mode === "scroll" ? "pk-modx-ink" : "pk-modv-ink")
            : "dms-section--alt") +
          (data.modules.mode === "scroll" ? " dms-modx-section" : "")
        }
        id="modules"
      >
        {data.modules.mode === "scroll" ? (
          <ModuleScrollStory
            eyebrowN={data.modules.eyebrowN}
            heading={data.modules.heading}
            modules={data.modules.items}
            mocks={data.modules.mocks}
            urlBase={data.modules.urlBase}
          />
        ) : (
          <ModuleLedger
            eyebrowN={data.modules.eyebrowN}
            heading={data.modules.heading}
            lede={data.modules.lede}
            modules={data.modules.items}
            mocks={data.modules.mocks}
            urlBase={data.modules.urlBase}
          />
        )}
      </section>

      {/* ============================ 03 · CAPABILITIES ================
       * `tone:"dark"` runs the capability ledger on ink, mirroring the trigger
       * page's record section (dms-section--dark + re-pointed ledger tokens). */}
      <section
        className={
          "dms-section " +
          (data.capabilities.tone === "dark" ? "dms-section--dark pk-caps-ink" : "dms-section--alt")
        }
        id="capabilities"
      >
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={data.capabilities.eyebrowN}>Capabilities</Eyebrow>
            <h2 className="dms-h2">{data.capabilities.heading}</h2>
          </header>
          <ol className="dms-caps">
            {data.capabilities.items.map((c) => (
              <li className="dms-cap" key={c.title} data-reveal>
                <CapGlyph name={c.glyph} />
                <h3 className="dms-cap__title">{c.title}</h3>
                <p className="dms-cap__body">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 04 · FLOW ========================
       * `tone:"dark"` runs the lifecycle field on ink and adds bottom breathing
       * room to the otherwise padding-less full-bleed section. */}
      <section
        className={"dms-section dms-lifex-section" + (data.flow.tone === "dark" ? " pk-lifex-ink" : "")}
        id="lifecycle"
      >
        <FlowExplorer
          eyebrowN={data.flow.eyebrowN}
          heading={data.flow.heading}
          trailLabel={data.flow.trailLabel}
          steps={data.flow.steps}
          chat={data.flow.chat}
          stageMocks={data.flow.stageMocks}
          mobileNote={data.flow.mobileNote}
        />
      </section>

      {/* ==================== INTEGRATIONS (connector layer) ===========
       * Connective beat after the lifecycle: the governed record does not stop
       * at Unifize's edge. Unnumbered interstitial (like the coordination tax),
       * on ink, so it continues the dark block without disturbing the 05-09
       * chapter numbering. */}
      <IntegrationLayer data={data.integrations} />

      {/* ============================ 05 · WHO OWNS IT ================= */}
      <section className="dms-section" id="who">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.owners.eyebrowN}>Who owns it</Eyebrow>
            <h2 className="dms-h2">{data.owners.heading}</h2>
          </div>
          {/* When personas carry portraits, use the DMS photo layout (2-up grid,
           * overlapping content panel) so 4 roles read as a 2x2 register instead
           * of a single crowded row. Photo-less products fall back to the raised
           * `.pk-owner` cards. */}
          {data.owners.items.some((p) => p.img) ? (
            <div className="dms-personas pk-personas">
              {data.owners.items.map((p) => (
                <article className="dms-persona" key={p.name} data-reveal>
                  <img className="dms-persona__photo" src={p.img} alt="" loading="lazy" />
                  <div className="dms-persona__body">
                    <span className="dms-persona__tier">{p.tier}</span>
                    <h3 className="dms-persona__name">{p.name}</h3>
                    {p.aka ? <span className="pk-owner__aka">{p.aka}</span> : null}
                    <p className="dms-persona__summary">{p.summary}</p>
                    <ol className="dms-persona__daily">
                      {p.daily.map((d, j) => (
                        <li key={d}><span className="dms-persona__num dms-data" aria-hidden="true">{pad(j + 1)}</span>{d}</li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="pk-owners">
              {data.owners.items.map((p) => (
                <article className="pk-owner" key={p.name} data-reveal>
                  <div className="pk-owner__head">
                    <span className="dms-persona__tier">{p.tier}</span>
                    <h3 className="dms-persona__name" style={{ margin: 0 }}>{p.name}</h3>
                    <span className="pk-owner__aka">{p.aka}</span>
                  </div>
                  <p className="pk-owner__summary">{p.summary}</p>
                  <ol className="pk-owner__daily">
                    {p.daily.map((d, j) => (
                      <li key={d}><span className="dms-persona__num dms-data" aria-hidden="true">{pad(j + 1)}</span>{d}</li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================ 06 · PROOF (carousel) =========== */}
      {data.proof && (
        <section className="dms-section dms-proof-section" aria-label="Customer proof">
          <ProofCarousel
            eyebrowN={data.proof.eyebrowN}
            kicker={data.proof.kicker}
            testimonials={data.proof.testimonials}
          />
        </section>
      )}

      {/* ============================ 07 · WHAT IT CLOSES ============== */}
      <section className="dms-section dms-section--alt">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.pains.eyebrowN}>What it closes</Eyebrow>
            <h2 className="dms-h2">{data.pains.heading}</h2>
          </div>
          <ol className="dms-pains">
            {data.pains.items.map((pn) => (
              <li className={"dms-pain " + SEV_CLASS[pn.severity]} key={pn.title} data-reveal>
                <div className="dms-pain__sig">
                  <SeverityIcon severity={pn.severity} />
                  <span className="dms-pain__sev">{pn.severity}</span>
                </div>
                <h3 className="dms-pain__title">{pn.title}</h3>
                <p className="dms-pain__body">{pn.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 08 · COMPLIANCE + INDUSTRIES ===== */}
      <section className="dms-section" id="compliance">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.compliance.eyebrowN}>Compliance frame</Eyebrow>
            <h2 className="dms-h2">{data.compliance.heading}</h2>
          </div>
          <div data-reveal>
            <HatchFrame>
              <ul className="dms-stds">
                {data.compliance.standards.map((s) => (
                  <li className="dms-std" key={s.name}>
                    <span className="dms-std__geo">{s.geo}</span>
                    <span className="dms-std__name">{s.name}</span>
                    <p className="dms-std__body">{s.body}</p>
                  </li>
                ))}
              </ul>
              <div className="dms-frame">
                <div className="dms-frame__inds">
                  <span className="dms-persona__lab">Validated across</span>
                  <div className="dms-inds">
                    {data.compliance.industries.map((n) => <span key={n} className="dms-ind">{n}</span>)}
                  </div>
                </div>
              </div>
            </HatchFrame>
          </div>
        </div>
      </section>

      {/* ============================ 09 · FAQ ========================= */}
      <section className="dms-section dms-section--alt" id="faq">
        <div className="dms-wrap dms-faq-grid">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.faq.eyebrowN}>FAQ</Eyebrow>
            <h2 className="dms-h2">{data.faq.heading}</h2>
            {data.faq.lede ? <p className="dms-lede">{data.faq.lede}</p> : null}
          </div>
          <div data-reveal>
            <FaqAccordion faqs={data.faq.items} />
          </div>
        </div>
      </section>

      {/* ============================ CLOSE ============================ */}
      <section className="dms-section dms-section--dark dms-close" aria-labelledby={`${data.slug}-close-h`}>
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">{data.close.eyebrow}</span>
              <h2 className="dms-close__h" id={`${data.slug}-close-h`}>{data.close.heading}</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">{data.close.lede}</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">{data.close.ctaPrimary}</BookDemoButton>
                <a href={data.close.ctaSecondary.href} className="dms-btn dms-btn-ghost">{data.close.ctaSecondary.label}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline={data.footer.tagline} note={data.footer.baseRight} />
    </main>
  );
}
