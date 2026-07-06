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
  HERO_STANDARDS,
  CAPABILITIES,
  PERSONAS,
  PAINS,
  STANDARDS,
  INDUSTRIES,
  TESTIMONIAL,
} from "./dms-data";
import { DmsHeader } from "./dms-header";
import { DmsMotion } from "./dms-motion";
import { Eyebrow, ShellFrame, StagePanel, HatchFrame, pad } from "./dms-primitives";
import { CapGlyph } from "./dms-linework";
import { MockDocRegister } from "./dms-mocks";
import {
  DriftToggle,
  ModuleExplorer,
  LifecycleExplorer,
  FaqAccordion,
} from "./dms-interactive";
import "./dms.css";

export const metadata: Metadata = {
  title: "Document Management System · Unifize",
  description:
    "DMS bundles Document Control, Change Control, and Training into one governed record. Controlled documents from draft to obsolete, with 21 CFR Part 11 e-signature where required.",
};

const SEV_CLASS: Record<string, string> = { Critical: "is-critical", High: "is-high", Medium: "is-medium" };

export default function DmsProductPage() {
  return (
    <main className="dms">
      <DmsMotion />
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label="Document Management System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <div className="dms-hero__crumb">
                <Link href="/platform">Products</Link>
                <span className="dms-hero__crumb-sep" aria-hidden="true">/</span>
                <span>Document Management System</span>
              </div>
              <h1 className="dms-hero__title">
                The current version shouldn&rsquo;t depend on <span className="dms-hero__turn">where you look.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{PRODUCT.description}</p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn">Book a demo &rarr;</button>
                <a href="#modules" className="dms-btn dms-btn-ghost">See what is bundled</a>
              </div>
            </div>
          </div>
          <ul className="dms-hero__stds" aria-label="Standards supported">
            {HERO_STANDARDS.map((s) => (
              <li key={s} className="dms-hero__std">{s}</li>
            ))}
          </ul>
        </div>

        {/* the one hero visual - coded prototype floating on the hero, overlapping below */}
        <div className="dms-wrap dms-hero__frame">
          <ShellFrame url="app.unifize.com / documents">
            <MockDocRegister />
          </ShellFrame>
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

      {/* ============================ 01 · THE DRIFT PROBLEM ============= */}
      <section className="dms-section">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={1}>The problem</Eyebrow>
            <h2 className="dms-h2">A document is only controlled if there is one of it.</h2>
            <p className="dms-lede">
              The same SOP lives in three places at three revisions. DMS collapses them into one governed record.
              Toggle the two worlds.
            </p>
          </div>
          <div data-reveal>
            <StagePanel>
              <DriftToggle />
            </StagePanel>
          </div>
        </div>
      </section>

      {/* ============================ 02 · MODULES BUNDLED =============== */}
      <section className="dms-section dms-section--alt" id="modules">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={2}>What is bundled</Eyebrow>
            <h2 className="dms-h2">Three modules, one record.</h2>
            <p className="dms-lede">
              Not three tools bolted together. A change carries its evidence, drives the revision, and cascades into training.
            </p>
          </div>
          <div data-reveal>
            <ModuleExplorer />
          </div>
        </div>
      </section>

      {/* ============================ 03 · LIFECYCLE ===================== */}
      <section className="dms-section" id="lifecycle">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={3}>The lifecycle</Eyebrow>
            <h2 className="dms-h2">Every state has a gate. Every gate has an owner.</h2>
            <p className="dms-lede">
              Scroll through the six states a controlled document moves through. The thread on the right
              replays the revision that drives them, as it happens in Unifize.
            </p>
          </div>
          <div data-reveal>
            <LifecycleExplorer />
          </div>
        </div>
      </section>

      {/* ============================ 04 · CAPABILITIES ==================
       * Composition: sticky header rail left, indexed ledger right. */}
      <section className="dms-section dms-section--alt" id="capabilities">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={4}>Capabilities</Eyebrow>
            <h2 className="dms-h2">The controls a regulated library runs on.</h2>
          </header>
          <ol className="dms-caps">
            {CAPABILITIES.map((c, i) => (
              <li className="dms-cap" key={c.title} data-reveal>
                <CapGlyph name={c.glyph} />
                <span className="dms-cap__idx dms-data" aria-hidden="true">{pad(i + 1)}</span>
                <h3 className="dms-cap__title">{c.title}</h3>
                <p className="dms-cap__body">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 05 · WHO OWNS IT ===================
       * Composition: stacked head, then two profiles on a center hairline. */}
      <section className="dms-section" id="who">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={5}>Who owns it</Eyebrow>
            <h2 className="dms-h2">Built for the two people the audit finds first.</h2>
          </div>
          <div className="dms-personas">
            {PERSONAS.map((p) => (
              <article className="dms-persona" key={p.name} data-reveal>
                <img className="dms-persona__photo" src={p.img} alt="" loading="lazy" />
                <span className="dms-persona__tier">{p.tier}</span>
                <h3 className="dms-persona__name">{p.name}</h3>
                <p className="dms-persona__summary">{p.summary}</p>
                <ol className="dms-persona__daily">
                  {p.daily.map((d, j) => (
                    <li key={d}><span className="dms-persona__num dms-data" aria-hidden="true">{pad(j + 1)}</span>{d}</li>
                  ))}
                </ol>
                <span className="dms-persona__variants">{p.variants}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 06 · TESTIMONIAL SLOT ============== */}
      <section className="dms-section dms-section--alt" aria-label="Customer proof">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={6}>Proof</Eyebrow>
            <h2 className="dms-h2">What quality teams say.</h2>
          </div>
          <figure className="dms-proof" data-reveal>
            <div className="dms-proof__media">
              <img className="dms-proof__photo" src={TESTIMONIAL.img} alt="" loading="lazy" />
            </div>
            <div className="dms-proof__body">
              <span className="dms-ph__tag">Sample story</span>
              <blockquote className="dms-proof__q">&ldquo;{TESTIMONIAL.quote}&rdquo;</blockquote>
              <figcaption className="dms-proof__who">
                <span className="dms-proof__name">{TESTIMONIAL.name}</span>
                <span className="dms-proof__role">{TESTIMONIAL.title}</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* ============================ 07 · PAINS CLOSED ==================
       * Composition: stacked head, then a findings register with the
       * failure-mode code at display scale. Reads like the audit log it
       * prevents. */}
      <section className="dms-section">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={7}>What it closes</Eyebrow>
            <h2 className="dms-h2">The four failure modes that become audit findings.</h2>
          </div>
          <ol className="dms-pains">
            {PAINS.map((pn, i) => (
              <li className={"dms-pain " + SEV_CLASS[pn.severity]} key={pn.title} data-reveal>
                <span className="dms-pain__bar" aria-hidden="true" />
                <span className="dms-pain__meta">
                  <span className="dms-pain__code dms-data">FM-{pad(i + 1)}</span>
                  <span className="dms-pain__sev">{pn.severity}</span>
                </span>
                <h3 className="dms-pain__title">{pn.title}</h3>
                <p className="dms-pain__body">{pn.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 08 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-section--alt" id="compliance">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={8}>Compliance frame</Eyebrow>
            <h2 className="dms-h2">One controlled lifecycle, whatever you are audited against.</h2>
          </div>
          <div data-reveal>
            <HatchFrame>
              <ul className="dms-stds">
                {STANDARDS.map((s) => (
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
                    {INDUSTRIES.map((n) => <span key={n} className="dms-ind">{n}</span>)}
                  </div>
                </div>
              </div>
            </HatchFrame>
          </div>
        </div>
      </section>

      {/* ============================ 09 · FAQ =========================== */}
      <section className="dms-section dms-section--alt" id="faq">
        <div className="dms-wrap dms-faq-grid">
          <div className="dms-head" data-reveal>
            <Eyebrow n={9}>FAQ</Eyebrow>
            <h2 className="dms-h2">The questions procurement and QA ask first.</h2>
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
      <section className="dms-section dms-section--dark dms-close" aria-labelledby="dms-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <h2 className="dms-close__h" id="dms-close-h">Bring the SOP you could not find the current version of.</h2>
            <div className="dms-close__side">
              <p className="dms-lede">We will run it through the lifecycle live, from draft to Part 11 approval.</p>
              <div className="dms-close__cta">
                <button type="button" className="dms-btn">Book a 30-minute walkthrough</button>
                <a href="#modules" className="dms-btn dms-btn-ghost">See what is bundled</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="dms-footer">
        <div className="dms-wrap dms-footer__grid">
          <div className="dms-footer__brand">
            <img className="dms-footer__logo" src="/logo_light.svg" alt="Unifize" />
            <span className="dms-footer__tag">One governed home for every controlled document.</span>
          </div>
          <nav className="dms-footer__col" aria-label="Product">
            <span className="dms-footer__lab">Document Management System</span>
            <a href="#modules">What is bundled</a>
            <a href="#lifecycle">The lifecycle</a>
            <a href="#capabilities">Capabilities</a>
          </nav>
          <nav className="dms-footer__col" aria-label="More">
            <span className="dms-footer__lab">More</span>
            <a href="#who">Who owns it</a>
            <a href="#compliance">Compliance</a>
            <a href="#faq">FAQ</a>
            <Link href="/platform">All products</Link>
          </nav>
        </div>
        <div className="dms-wrap">
          <div className="dms-footer__base">
            <span>© Unifize 2026 · Products, Document Management System (UPD-2)</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
