/* ============================================================================
 * INDUSTRY PAGE TEMPLATE — MODERN SKIN (Medical Devices instance).
 * Reworked onto Unifize enterprise design system v1 (the DMS language): flat
 * editorial dark hero/close/footer with hairlines (no glows), light neutral-grey
 * middle, Geist display + Inter body + JetBrains mono furniture, Unifize blue on
 * CTAs and one key marker per graphic, near-square corners, editorial registers
 * over shadowed card grids. Same content + flow as before; the skin now matches
 * /explorations/products/dms. Altitude discipline preserved; labeled placeholders
 * stay placeholders.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { TRIGGERS, VALIDATED } from "./industry-data";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "../_shared/site-footer";
import { IngressNav } from "./ingress-nav";
import { PersonaExplorer } from "./persona-explorer";
import { ModuleIndex } from "./module-index";
import { CostLedger } from "./cost-ledger";
import { ProofFilms } from "./proof-films";
import { ItmMotion } from "./itm-motion";
import { Eyebrow, SeverityIcon } from "./itm-primitives";
import { HeroArcade, DecisionTraceArcade } from "./itm-arcade";
import "./itm.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "Medical Devices · Unifize",
  description:
    "Your QMS records that a document was approved. It cannot reconstruct why. Unifize rebuilds the decision trace across every function it touched. The industry template, instanced on Medical Devices.",
};

const HERO_CHIPS = ["21 CFR 820", "ISO 13485", "ISO 14971", "EU MDR 2017/745", "21 CFR Part 11"];

/* Restrained OUTLINE icons for the validation answer cards (Section I),
 * keyed by VALIDATED.points[].icon. Heroicons outline paths, inline. */
const VAL_ICONS: Record<string, React.ReactNode> = {
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  ),
};

export default function IndustryTemplateModernPage() {
  return (
    <main className="itm">
      <ItmMotion />
      <SiteHeader />

      {/* ============================ A · HERO ============================= */}
      <section className="itm-section itm-section--dark itm-hero" aria-label="Medical devices">
        <div className="itm-hero__glow" aria-hidden="true" />

        <div className="itm-wrap itm-wrap--wide itm-hero__inner">
          <div className="itm-hero__copy">
            <div className="itm-hero__crumb itm-meta">
              <span className="itm-dot itm-dot--accent" aria-hidden="true" />
              <Link href="/platform#industries">Industries</Link>
              <span className="itm-hero__crumb-sep" aria-hidden="true">/</span>
              <span>Medical devices</span>
            </div>
            <h1 className="itm-hero__title">
              Your QMS remembers that it was approved. <span className="itm-hero__turn">Not why.</span>
            </h1>
            <p className="itm-lede itm-hero__sub">
              Built for Class II &amp; III device OEMs and CDMOs, where every change, every CAPA, and
              every complaint has to stay traceable across functions.
            </p>
            <ul className="itm-hero__stds" aria-label="Regulatory frame">
              {HERO_CHIPS.map((s) => (
                <li key={s} className="itm-hero__std">{s}</li>
              ))}
            </ul>
            <div className="itm-hero__ctas">
              <BookDemoButton className="itm-btn" source="hero">Book a demo →</BookDemoButton>
              <Link href="/explorations/platform" className="itm-btn itm-btn-ghost">See the platform</Link>
            </div>
          </div>
        </div>

        {/* product stage — decorative, sits free: the arcade engine quietly
             walking CC-2148 through raise → review → Part 11 sign → seal */}
        <div className="itm-hero__stage" aria-hidden="true">
          <div className="itm-hero__shot">
            <HeroArcade />
          </div>
        </div>

        {/* trust strip — named customers */}
        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-trust" aria-label="Customers and compliance">
            <div className="itm-trust__who">
              <span className="itm-trust__lab">Trusted by FDA-regulated device teams</span>
              <div className="itm-trust__names">
                {MD_PROOF.customers.map((c, i) => (
                  <span key={c.name} style={{ display: "contents" }}>
                    {i > 0 ? <span className="itm-trust__sep" aria-hidden="true" /> : null}
                    <span className="itm-trust__name">{c.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ B · THE DIFFERENCE ================== */}
      <section className="itm-section itm-section--tall" id="thesis">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={1}>The difference</Eyebrow>
            <h2 className="itm-h2">The decision lives in the thread, not the status field.</h2>
            <p className="itm-lede">
              Incumbents track document status. Unifize reconstructs the decision trace across every
              function a change touched.
            </p>
          </div>

          {/* the decision trail drives the arcade camera over one persistent
               CC-2148 record: each step is a pose, not a new screen */}
          <div data-reveal>
            <DecisionTraceArcade />
          </div>
        </div>
      </section>

      {/* ============ INGRESS · three ways in (sticky sub-nav group) ======== */}
      <div className="itm-ingress">
        <IngressNav />

        {/* D · PERSONAS */}
        <section className="itm-section itm-section--dark" id="by-role">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={2}>By your role</Eyebrow>
              <h2 className="itm-h2">When the investigator is in the room, someone reconstructs it.</h2>
              <p className="itm-lede">The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at audit.</p>
            </div>
            <PersonaExplorer />
          </div>
        </section>

        {/* E · MODULE INDEX */}
        <section className="itm-section itm-section--dark" id="modules">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={3}>Coverage</Eyebrow>
              <h2 className="itm-h2">Nine domains. In each one, the same question: can you replay the decision?</h2>
              <p className="itm-lede">Filter by the regulation you are audited against to see which controls evidence it.</p>
            </div>
            <ModuleIndex />
          </div>
        </section>

        {/* F · TRIGGER BAND: a status board on ink, one severity-coded
             card per statutory moment; severity leads, then the clock + routing. */}
        <section className="itm-section itm-section--dark itm-trigs-sec" id="whats-breaking">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={4}>What's breaking</Eyebrow>
              <h2 className="itm-h2">The moments that start a clock you don't control.</h2>
              <p className="itm-lede">Statutory deadlines, not customer outcomes. Each one routes to the process that answers it and the team that owns the response.</p>
            </div>
            <div className="itm-trigs-wrap">
              {(["Urgent", "High"] as const).map((level) => {
                const rows = TRIGGERS.filter((t) => t.severity === level);
                return (
                  <div key={level} className={"itm-trigs-band " + (level === "Urgent" ? "is-urgent" : "is-high")} data-reveal>
                    <div className="itm-trigs-band__head">
                      <SeverityIcon severity={level} />
                      <span className="itm-trigs-band__lab">{level}</span>
                      <span className="itm-trigs-band__n">{String(rows.length).padStart(2, "0")} moments</span>
                    </div>
                    <div className="itm-trigs">
                      {rows.map((t) => (
                        <div key={t.name} className={"itm-trig" + (level === "Urgent" ? " is-urgent" : " is-high")}>
                          <p className="itm-trig__name">{t.name}</p>
                          <span className="itm-trig__clock">{t.clock}</span>
                          <div className="itm-trig__foot">
                            <span className="itm-trig__route">
                              <span className="itm-trig__mod">{t.routesTo}</span>
                              <span className="itm-trig__owner">{t.owner}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ============================ H · COST LEDGER ==================== */}
      <section className="itm-section itm-section--alt itm-cost-sec" id="cost">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={5}>Cost of inaction</Eyebrow>
            <h2 className="itm-h2">The cost is real. It just never lands on a line you can see.</h2>
          </div>
          <CostLedger />
        </div>
      </section>

      {/* ============================ I · VALIDATED-STATE ================ */}
      <section className="itm-section itm-section--short" id="validated">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={6}>{VALIDATED.eyebrow}</Eyebrow>
            <h2 className="itm-h2">{VALIDATED.headline}</h2>
          </div>
          <ul className="itm-valgrid" data-reveal>
            {VALIDATED.points.map((pt) => (
              <li key={pt.label} className="itm-valcard">
                <span className="itm-valcard__icon" aria-hidden="true">{VAL_ICONS[pt.icon]}</span>
                <h3>{pt.label}</h3>
                <p>{pt.body}</p>
              </li>
            ))}
          </ul>
          <div className="itm-valcta">
            <button type="button" className="itm-btn itm-btn-ghost">{VALIDATED.cta}</button>
          </div>
        </div>
      </section>

      {/* ============= J · PROOF (real customer films, DMS film-rail layout) */}
      <ProofFilms />

      {/* ============================ K · CLOSE ==========================
       * Flat editorial dark, asymmetric like the hero: mono kicker + display
       * headline left, lede + CTA right, on a defining top hairline. No glow. */}
      <section className="itm-section itm-section--dark itm-close" aria-labelledby="itm-close-h">
        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-close__grid" data-reveal>
            <div className="itm-close__lead">
              <span className="itm-close__eyebrow">Ready when you are</span>
              <h2 className="itm-close__h" id="itm-close-h">Incumbents track documents. Unifize reconstructs the decision.</h2>
            </div>
            <div className="itm-close__side">
              <p className="itm-lede">Pick a decision you could not replay at the last audit. We will reconstruct it live.</p>
              <div className="itm-close__cta">
                <BookDemoButton className="itm-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/explorations/platform" className="itm-btn itm-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- site footer */}
      <SiteFooter tagline="The decision trace for regulated operations." note="Industry template · Medical Devices instance" />
    </main>
  );
}
