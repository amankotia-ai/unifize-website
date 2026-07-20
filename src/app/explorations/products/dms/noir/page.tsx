/* ============================================================================
 * DMS · LEDGER NOIR - a new direction for the DMS product page in the
 * coordination-tax explainer's brand language (see ../../../coordination-tax).
 * Near-black instrument stage, hairline strokes, one accent reserved for the
 * tax, Schibsted Grotesk + Fragment Mono, accent full-stop motif. The page
 * inverts to paper at Proof: the world after the tax is removed.
 * All content comes from ../dms-data (Notion: DMS, UPD-2). The condensed
 * coordination-tax scene sits after the problem section, and the lifecycle
 * reuses the explainer's "stations on one line" motif for the six states.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  PRODUCT,
  DMS_PROBLEMS,
  MODULES,
  LIFECYCLE,
  INTEGRATIONS,
  CAPABILITIES,
  AUDIENCE,
  STANDARDS,
  INDUSTRIES,
  PROOF_FILMS,
  FAQS,
} from "../dms-data";
import { RegisterMock } from "./noir-mocks";
import {
  NoirMotion,
  ProblemSpotlight,
  TaxScene,
  ModuleExplorer,
  LifecycleLine,
} from "./noir-client";
import "./noir.css";

export const metadata: Metadata = {
  title: "DMS · Ledger noir direction",
  description:
    "Document Control, Change Control, and Training on one governed record. The DMS page in the coordination-tax brand language.",
};

export default function DmsNoirPage() {
  return (
    <main className="dnoir">
      <NoirMotion />

      {/* ------------------------------------------------------- top bar */}
      <div className="dn-bar">
        <Link href="/explorations/home" className="dn-bar__mark">Unifize</Link>
        <span className="dn-bar__meta dn-dim">Document Management System · UPD-2</span>
        <a href="#demo" className="dn-bar__cta">Book a demo</a>
      </div>

      {/* ---------------------------------------------------------- hero */}
      <header className="dn-hero">
        <div className="dn-hero__copy">
          <p className="dn-kicker"><span data-rise>The governed library</span></p>
          <h1 className="dn-h1">
            <span className="dn-clip"><span data-rise>One current version<i className="dn-stop">.</i></span></span>
            <span className="dn-clip"><span data-rise>Everywhere you look<i className="dn-stop">.</i></span></span>
          </h1>
          <p className="dn-hero__sub"><span data-rise>{PRODUCT.description}</span></p>
          <div className="dn-hero__ctas" data-rise>
            <a href="#demo" className="dn-cta">Book a demo <span aria-hidden="true">&rarr;</span></a>
            <Link href="/explorations/coordination-tax" className="dn-cta-ghost">
              What is the coordination tax?
            </Link>
          </div>
        </div>

        {/* the product as an instrument readout, in the page's own idiom */}
        <figure className="dn-hero__register" data-rise>
          <figcaption className="dn-shell">
            <span>app.unifize.com / documents</span>
            <span className="dn-dim">Live register</span>
          </figcaption>
          <RegisterMock />
        </figure>
      </header>

      {/* --------------------------------------------------- trust strip */}
      <section className="dn-trust" aria-label="Industries served">
        <p className="dn-dim">One controlled record across regulated operations</p>
        <ul>
          {INDUSTRIES.map((industry) => (
            <li key={industry}>{industry}</li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ 01 · the problem */}
      <section className="dn-section" id="problem" aria-labelledby="dn-problem-title">
        <header className="dn-head" data-nreveal>
          <p className="dn-kicker">01 · The problem</p>
          <h2 className="dn-h2" id="dn-problem-title">
            You have the document. Nobody can find it when it matters<i className="dn-stop">.</i>
          </h2>
          <p className="dn-lede">
            Quality teams spend up to a third of their week hunting for controlled
            documents across shared drives, QMS folders, and email threads.
          </p>
        </header>
        <ProblemSpotlight items={DMS_PROBLEMS} />
      </section>

      {/* ------------------------------------- 02 · the coordination tax
       * The four daily symptoms roll up into one measurable root cause.
       * Condensed from /explorations/coordination-tax. */}
      <section className="dn-section dn-tax" id="coordination-tax" aria-labelledby="dn-tax-title">
        <header className="dn-head" data-nreveal>
          <p className="dn-kicker">02 · The coordination tax</p>
          <h2 className="dn-h2" id="dn-tax-title">Four symptoms. One root cause<i className="dn-stop">.</i></h2>
          <p className="dn-lede">
            Finding the change, checking the version, chasing decisions, and
            rebuilding evidence is work around the work. That is the
            coordination tax.
          </p>
        </header>

        <TaxScene />

        <div className="dn-tax__ledger" data-nreveal>
          {DMS_PROBLEMS.map((p, i) => (
            <div key={p.category} className="dn-tax__row">
              <span className="dn-tax__verb">{["Search", "Compare", "Chase", "Reconcile"][i]}</span>
              <span className="dn-tax__title dn-dim">{p.title}</span>
              <strong className="dn-tax__metric">{p.metric}</strong>
            </div>
          ))}
          <p className="dn-tax__src dn-dim">
            Field readings from document control teams, before Unifize.
            <Link href="/explorations/coordination-tax"> Read the full explainer &rarr;</Link>
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- 03 · modules */}
      <section className="dn-section" id="modules" aria-labelledby="dn-modules-title">
        <header className="dn-head" data-nreveal>
          <p className="dn-kicker">03 · The answer</p>
          <h2 className="dn-h2" id="dn-modules-title">Three modules. One governed record<i className="dn-stop">.</i></h2>
          <p className="dn-lede">
            The change order drives the revision, and the revision drives the
            training assignment. Nothing is retyped between tools, so the
            context moves with the work.
          </p>
        </header>
        <ModuleExplorer modules={MODULES} />
      </section>

      {/* ------------------------------------------------ 04 · lifecycle */}
      <section className="dn-section" id="lifecycle" aria-labelledby="dn-lifecycle-title">
        <header className="dn-head" data-nreveal>
          <p className="dn-kicker">04 · The lifecycle</p>
          <h2 className="dn-h2" id="dn-lifecycle-title">Six states. Zero ambiguity<i className="dn-stop">.</i></h2>
          <p className="dn-lede">
            Every controlled document rides one line from draft to obsolete.
            At any moment, exactly one revision is effective, and everyone can
            see which.
          </p>
        </header>
        <LifecycleLine stages={LIFECYCLE} />
      </section>

      {/* --------------------------------------------- 05 · capabilities */}
      <section className="dn-section" id="capabilities" aria-labelledby="dn-caps-title">
        <header className="dn-head" data-nreveal>
          <p className="dn-kicker">05 · Capabilities</p>
          <h2 className="dn-h2" id="dn-caps-title">The controls a regulated library runs on<i className="dn-stop">.</i></h2>
        </header>
        <ol className="dn-caps">
          {CAPABILITIES.map((c, i) => (
            <li key={c.title} className="dn-cap" data-nreveal>
              <span className="dn-cap__idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p className="dn-dim">{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------- integrations interstitial */}
      <section className="dn-section dn-integ" aria-labelledby="dn-integ-title">
        <div className="dn-integ__grid">
          <header data-nreveal>
            <p className="dn-kicker">The connector layer</p>
            <h2 className="dn-h2" id="dn-integ-title">{INTEGRATIONS.heading}</h2>
            <p className="dn-lede">{INTEGRATIONS.lede}</p>
          </header>
          <figure className="dn-integ__diagram" data-nreveal aria-label="Systems connected to the controlled document">
            <div className="dn-integ__hub">The controlled document</div>
            <ul className="dn-integ__systems">
              {INTEGRATIONS.hubSystems.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </figure>
        </div>
      </section>

      {/* ------------------------------------------------ 06 · who it is for */}
      <section className="dn-section" id="who" aria-labelledby="dn-who-title">
        <header className="dn-head" data-nreveal>
          <p className="dn-kicker">06 · Who it is for</p>
          <h2 className="dn-h2" id="dn-who-title">The teams that keep every document current<i className="dn-stop">.</i></h2>
          <p className="dn-lede">{AUDIENCE.lede}</p>
        </header>
        <div className="dn-personas">
          {AUDIENCE.personas.map((p, i) => (
            <article key={p.role} className="dn-persona" data-nreveal>
              <span className="dn-cap__idx">Persona {String(i + 1).padStart(2, "0")}</span>
              <h3>
                {p.href ? (
                  <Link href={p.href}>{p.role} <span aria-hidden="true">&#8599;</span></Link>
                ) : (
                  p.role
                )}
              </h3>
              <p className="dn-persona__owns">{p.owns}</p>
              <ul>
                {p.daily.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ============================== PAPER: the world after the tax */}
      <div className="dn-paper">
        {/* ------------------------------------------------- 07 · proof */}
        <section className="dn-section" id="proof" aria-labelledby="dn-proof-title">
          <header className="dn-head" data-nreveal>
            <p className="dn-kicker">07 · Proof</p>
            <h2 className="dn-h2" id="dn-proof-title">Teams that stopped paying it<i className="dn-stop">.</i></h2>
            <p className="dn-lede">
              Real customers, on film, on the record. Every claim on this page
              has a person attached to it.
            </p>
          </header>
          <div className="dn-films" data-nreveal>
            {PROOF_FILMS.slice(0, 8).map((f) => (
              <a key={f.wistia} className="dn-film" href={f.url} target="_blank" rel="noreferrer">
                <span className="dn-film__poster">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.poster} alt="" loading="lazy" />
                  <span className="dn-film__dur">{f.duration}</span>
                </span>
                <span className="dn-film__title">{f.title}</span>
                <span className="dn-film__who dn-dim">
                  {f.person}{f.role ? `, ${f.role}` : ""} · {f.company}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* -------------------------------------------- 08 · compliance */}
        <section className="dn-section" id="compliance" aria-labelledby="dn-compliance-title">
          <header className="dn-head" data-nreveal>
            <p className="dn-kicker">08 · Compliance frame</p>
            <h2 className="dn-h2" id="dn-compliance-title">One lifecycle. Every standard<i className="dn-stop">.</i></h2>
            <p className="dn-lede">
              Control the record once, then prove it against whatever governs
              your operation.
            </p>
          </header>
          <div className="dn-standards" data-nreveal>
            {STANDARDS.map((s) => (
              <div key={s.name} className="dn-standard">
                <strong>{s.name}</strong>
                <span className="dn-standard__geo">{s.geo}</span>
                <span className="dn-dim">{s.body}</span>
              </div>
            ))}
          </div>
          <p className="dn-validated dn-dim" data-nreveal>
            Validated across {INDUSTRIES.join(" · ")}
          </p>
        </section>

        {/* --------------------------------------------------- 09 · faq */}
        <section className="dn-section dn-faq" id="faq" aria-labelledby="dn-faq-title">
          <header className="dn-head" data-nreveal>
            <p className="dn-kicker">09 · FAQ</p>
            <h2 className="dn-h2" id="dn-faq-title">What procurement and QA ask first<i className="dn-stop">.</i></h2>
          </header>
          <div className="dn-faq__list" data-nreveal>
            {FAQS.map((f) => (
              <details key={f.q} className="dn-qa">
                <summary>
                  {f.q}
                  <span className="dn-qa__mark" aria-hidden="true" />
                </summary>
                <p className="dn-dim">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- close */}
        <section className="dn-close" id="demo">
          <h2 className="dn-h1">
            <span className="dn-clip"><span data-nreveal>Bring the SOP you</span></span>
            <span className="dn-clip"><span data-nreveal>could not find<i className="dn-stop">.</i></span></span>
          </h2>
          <p className="dn-lede" data-nreveal>
            We will run it through the lifecycle live, from draft to Part 11
            approval. Thirty minutes, your document.
          </p>
          <div data-nreveal>
            <a className="dn-cta dn-cta--big" href="mailto:hello@unifize.com?subject=DMS%20walkthrough">
              Book a 30-minute walkthrough <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        <footer className="dn-foot">
          <span>Unifize · One governed home for every controlled document</span>
          <span className="dn-dim">Document Management System · UPD-2</span>
        </footer>
      </div>
    </main>
  );
}
