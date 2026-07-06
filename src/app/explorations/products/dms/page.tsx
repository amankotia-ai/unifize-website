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
} from "./dms-data";
import { DmsHeader } from "./dms-header";
import { DmsMotion } from "./dms-motion";
import { Eyebrow, SplitHeader, ShellFrame, StagePanel, pad } from "./dms-primitives";
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

const PERSONA_ICONS: React.ReactNode[] = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
];

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

        {/* the one hero visual - coded prototype staged on the field, overlapping below */}
        <div className="dms-wrap dms-hero__frame">
          <StagePanel crop="bottom">
            <ShellFrame url="app.unifize.com / documents">
              <MockDocRegister />
            </ShellFrame>
          </StagePanel>
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
          <SplitHeader
            n={1}
            eyebrow="The problem"
            title="A document is only controlled if there is one of it."
            lede="The same SOP lives in three places at three revisions. DMS collapses them into one governed record. Toggle the two worlds."
          />
          <div data-reveal>
            <DriftToggle />
          </div>
        </div>
      </section>

      {/* ============================ 02 · MODULES BUNDLED =============== */}
      <section className="dms-section dms-section--alt" id="modules">
        <div className="dms-wrap">
          <SplitHeader
            n={2}
            eyebrow="What is bundled"
            title="Three modules, one record."
            lede="Not three tools bolted together. A change carries its evidence, drives the revision, and cascades into training."
          />
          <div data-reveal>
            <ModuleExplorer />
          </div>
        </div>
      </section>

      {/* ============================ 03 · LIFECYCLE ===================== */}
      <section className="dms-section" id="lifecycle">
        <div className="dms-wrap">
          <SplitHeader
            n={3}
            eyebrow="The lifecycle"
            title="Every state has a gate. Every gate has an owner."
            lede="Scroll through the six states a controlled document moves through. The thread on the right replays the revision that drives them, as it happens in Unifize."
          />
          <div data-reveal>
            <LifecycleExplorer />
          </div>
        </div>
      </section>

      {/* ============================ 04 · CAPABILITIES ================== */}
      <section className="dms-section dms-section--alt" id="capabilities">
        <div className="dms-wrap">
          <SplitHeader n={4} eyebrow="Capabilities" title="The controls a regulated library runs on." />
          <ol className="dms-caps">
            {CAPABILITIES.map((c, i) => (
              <li className="dms-cap" key={c.title} data-reveal>
                <span className="dms-cap__idx dms-data" aria-hidden="true">{pad(i + 1)}</span>
                <h3 className="dms-cap__title">{c.title}</h3>
                <p className="dms-cap__body">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 05 · WHO OWNS IT =================== */}
      <section className="dms-section" id="who">
        <div className="dms-wrap">
          <SplitHeader n={5} eyebrow="Who owns it" title="Built for the two people the audit finds first." />
          <div className="dms-personas">
            {PERSONAS.map((p, i) => (
              <article className="dms-persona" key={p.name} data-reveal>
                <span className="dms-persona__avatar" aria-hidden="true">{PERSONA_ICONS[i]}</span>
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
          <SplitHeader n={6} eyebrow="Proof" title="What quality teams say." />
          <figure className="dms-quote" data-reveal>
            <span className="dms-ph__tag">Customer quote · placeholder</span>
            <svg className="dms-quote__mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9.5 8.25c-2.9.6-4.75 2.6-4.75 5.9v1.6h4.5v-4.5h-2.1c.2-1.2 1-2 2.35-2.4v-.6Zm9 0c-2.9.6-4.75 2.6-4.75 5.9v1.6h4.5v-4.5h-2.1c.2-1.2 1-2 2.35-2.4v-.6Z" />
            </svg>
            <div className="dms-quote__lines" aria-label="Quote text placeholder">
              <span className="dms-skel" style={{ width: "100%" }} />
              <span className="dms-skel" style={{ width: "92%" }} />
              <span className="dms-skel" style={{ width: "58%" }} />
            </div>
            <figcaption className="dms-quote__who">
              <span className="dms-quote__avatar" aria-hidden="true" />
              <span className="dms-quote__id" aria-label="Attribution placeholder">
                <span className="dms-skel dms-skel--name" />
                <span className="dms-skel dms-skel--role" />
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============================ 07 · PAINS CLOSED ================== */}
      <section className="dms-section">
        <div className="dms-wrap">
          <SplitHeader n={7} eyebrow="What it closes" title="The four failure modes that become audit findings." />
          <ol className="dms-pains">
            {PAINS.map((pn, i) => (
              <li className="dms-pain" key={pn.title} data-reveal>
                <span className="dms-pain__code" aria-hidden="true">FM-{pad(i + 1)}</span>
                <div className="dms-pain__main">
                  <h3 className="dms-pain__title">{pn.title}</h3>
                  <p className="dms-pain__body">{pn.body}</p>
                </div>
                <span className={"dms-pain__sev " + SEV_CLASS[pn.severity]}>
                  <span className="dms-dot" aria-hidden="true" />
                  {pn.severity}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 08 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-section--alt" id="compliance">
        <div className="dms-wrap">
          <SplitHeader n={8} eyebrow="Compliance frame" title="One controlled lifecycle, whatever you are audited against." />
          <ul className="dms-stds">
            {STANDARDS.map((s) => (
              <li className="dms-std" key={s.name} data-reveal>
                <span className="dms-std__name">{s.name}</span>
                <p className="dms-std__body">{s.body}</p>
                <span className="dms-std__geo">{s.geo}</span>
              </li>
            ))}
          </ul>

          <div className="dms-frame" data-reveal>
            <div className="dms-frame__inds">
              <span className="dms-persona__lab">Validated across</span>
              <div className="dms-inds">
                {INDUSTRIES.map((n) => <span key={n} className="dms-ind">{n}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 09 · FAQ =========================== */}
      <section className="dms-section" id="faq">
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
          <div className="dms-head dms-head--center" data-reveal>
            <h2 className="dms-h2" id="dms-close-h">Bring the SOP you could not find the current version of.</h2>
            <p className="dms-lede">We will run it through the lifecycle live, from draft to Part 11 approval.</p>
            <div className="dms-close__cta">
              <button type="button" className="dms-btn">Book a 30-minute walkthrough</button>
              <a href="#modules" className="dms-btn dms-btn-ghost">See what is bundled</a>
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
