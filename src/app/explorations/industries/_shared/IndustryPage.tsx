/* ============================================================================
 * IndustryPage — the industry template, rendered from one `IndustryData` object.
 *
 * A faithful generalisation of the Medical Devices instance
 * (/explorations/industry-template-modern). Same section arc, same Unifize
 * enterprise design system (the DMS language): flat editorial dark hero / close
 * / footer with hairlines, light neutral-grey middle, near-black INK block for
 * the three ingress sections, mono chapter eyebrows, one blue accent.
 *
 * Reuses the reference route's furniture verbatim so the design system stays
 * single-source: SiteHeader (shared nav), ItmMotion, Eyebrow / ShellFrame /
 * SeverityIcon primitives, itm.css. The four interactive pieces come from the
 * prop-driven _shared/industry-interactive kit.
 *
 * The ONE structural divergence from the reference page: the proof section is an
 * honest "evidence standard" band (the proof these buyers demand, from the
 * canonical Proof Requirement field) rather than a customer-story carousel —
 * these segments have no shippable named references yet, so nothing is invented.
 * ========================================================================== */

import Link from "next/link";
import { ChatShell } from "@/components/organisms";
import { SiteHeader } from "../../industry-template-modern/site-header";
import { SiteFooter } from "../../_shared/site-footer";
import { ItmMotion } from "../../industry-template-modern/itm-motion";
import { Eyebrow, ShellFrame, SeverityIcon } from "../../industry-template-modern/itm-primitives";
import { IngressNav, PersonaExplorer, ModuleIndex, CostLedger } from "./industry-interactive";
import type { IndustryData } from "./types";
import "../../industry-template-modern/itm.css";
import "./industry-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

/* Restrained outline icons for the validation answer cards (Section I). */
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

export function IndustryPage({ data }: { data: IndustryData }) {
  const d = data;
  return (
    <main className="itm">
      <ItmMotion />
      <SiteHeader />

      {/* ============================ A · HERO ============================= */}
      <section className="itm-section itm-section--dark itm-hero" aria-label={d.name}>
        <div className="itm-hero__glow" aria-hidden="true" />
        <div className="itm-wrap itm-wrap--wide itm-hero__inner">
          <div className="itm-hero__copy">
            <div className="itm-hero__crumb itm-meta">
              <span className="itm-dot itm-dot--accent" aria-hidden="true" />
              <Link href="/platform#industries">Industries</Link>
              <span className="itm-hero__crumb-sep" aria-hidden="true">/</span>
              <span>{d.hero.crumb}</span>
            </div>
            <h1 className="itm-hero__title">
              {d.hero.titleLead} <span className="itm-hero__turn">{d.hero.titleTurn}</span>
            </h1>
            <p className="itm-lede itm-hero__sub">{d.hero.sub}</p>
            <ul className="itm-hero__stds" aria-label="Regulatory frame">
              {d.hero.chips.map((s) => <li key={s} className="itm-hero__std">{s}</li>)}
            </ul>
            <div className="itm-hero__ctas">
              <BookDemoButton className="itm-btn" source="hero">Book a demo →</BookDemoButton>
              <Link href="/explorations/platform" className="itm-btn itm-btn-ghost">See the platform</Link>
            </div>
          </div>
        </div>

        <div className="itm-hero__stage" aria-hidden="true">
          <div className="itm-hero__shot"><img src="/hero-product.png" alt="" /></div>
        </div>

        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-trust" aria-label="Regulatory frame">
            <div className="itm-trust__who">
              <span className="itm-trust__lab">{d.hero.trustLabel}</span>
              <div className="itm-trust__names">
                {d.hero.chips.map((c, i) => (
                  <span key={c} style={{ display: "contents" }}>
                    {i > 0 ? <span className="itm-trust__sep" aria-hidden="true" /> : null}
                    <span className="itm-trust__name">{c}</span>
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
            <h2 className="itm-h2">{d.difference.heading}</h2>
            <p className="itm-lede">{d.difference.lede}</p>
          </div>

          <div className="itm-diff__grid">
            <aside className="itm-trail" aria-label="How the decision moves" data-reveal>
              <span className="itm-trail__lab">{d.difference.trailLabel}</span>
              <ol className="itm-trail__steps">
                {d.difference.trail.map((s, i) => (
                  <li className={"itm-trail__step" + (i === d.difference.trail.length - 1 ? " is-sealed" : "")} key={s.t}>
                    <span className="itm-trail__node" aria-hidden="true" />
                    <span className="itm-trail__t">{s.t}</span>
                    <span className="itm-trail__meta">{s.who} <span className="itm-data">· {s.when}</span></span>
                  </li>
                ))}
              </ol>
              <p className="itm-trail__foot">{d.difference.trailFoot}</p>
            </aside>

            <div className="itm-thread" data-reveal>
              <div className="itm-thread__live">
                <ShellFrame url={d.difference.shellUrl}>
                  <ChatShell variant={d.difference.chatVariant} />
                </ShellFrame>
              </div>
              <div className="itm-thread__mobile" aria-hidden="true">
                <span className="itm-thread__mobile-lab">{d.difference.mobileLabel}</span>
                <span className="itm-thread__mobile-id">{d.difference.mobileId}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INGRESS · three ways in (sticky sub-nav group) ======== */}
      <div className="itm-ingress">
        <IngressNav industryName={d.name} hints={d.ingress} />

        {/* D · PERSONAS */}
        <section className="itm-section itm-section--dark" id="by-role">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={2}>By your role</Eyebrow>
              <h2 className="itm-h2">{d.personas.heading}</h2>
              <p className="itm-lede">{d.personas.lede}</p>
            </div>
            <PersonaExplorer personas={d.personas.cards} />
          </div>
        </section>

        {/* E · MODULE INDEX */}
        <section className="itm-section itm-section--dark" id="modules">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={3}>Coverage</Eyebrow>
              <h2 className="itm-h2">{d.coverage.heading}</h2>
              <p className="itm-lede">{d.coverage.lede}</p>
            </div>
            <ModuleIndex domains={d.coverage.domains} standardFilters={d.coverage.standardFilters} />
          </div>
        </section>

        {/* F · TRIGGER BAND */}
        <section className="itm-section itm-section--dark itm-trigs-sec" id="whats-breaking">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={4}>What&rsquo;s breaking</Eyebrow>
              <h2 className="itm-h2">{d.triggers.heading}</h2>
              <p className="itm-lede">{d.triggers.lede}</p>
            </div>
            <div className="itm-trigs" data-reveal>
              {d.triggers.rows.map((t) => {
                const sev = t.severity === "Urgent" ? " is-urgent" : " is-high";
                const inner = (
                  <>
                    <div className="itm-trig__top">
                      <span className="itm-trig__sev">
                        <span className="itm-trig__sev-ic" aria-hidden="true"><SeverityIcon severity={t.severity} /></span>
                        {t.severity}
                      </span>
                    </div>
                    <p className="itm-trig__name">{t.name}</p>
                    <span className="itm-trig__clock">{t.clock}</span>
                    <div className="itm-trig__foot">
                      <span className="itm-trig__route">
                        <span className="itm-trig__mod">{t.routesTo}</span>
                        <span className="itm-trig__owner">{t.owner}</span>
                      </span>
                      <span className="itm-trig__go">{t.href ? "Open the workflow →" : " "}</span>
                    </div>
                  </>
                );
                return t.href ? (
                  <Link key={t.name} href={t.href} className={"itm-trig itm-trig--live" + sev} aria-label={`Open the page for: ${t.name}`}>{inner}</Link>
                ) : (
                  <div key={t.name} className={"itm-trig" + sev}>{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ============================ G · COEXISTENCE ===================== */}
      <section className="itm-section itm-section--short">
        <div className="itm-wrap">
          <div className="itm-coexist">
            <div className="itm-coexist__head" data-reveal>
              <Eyebrow n={5}>Coexistence</Eyebrow>
              <h2 className="itm-h2">{d.coexistence.heading}</h2>
              <div className="itm-sor">
                {d.coexistence.systemsOfRecord.map((s) => <span key={s} className="itm-chip">{s}</span>)}
              </div>
              <p className="itm-body">{d.coexistence.body}</p>
            </div>

            <div
              className="itm-diagram"
              role="img"
              aria-label={`Diagram: Unifize sits as a coordination layer over your ${d.coexistence.systemsOfRecord.join(", ")}, which stay in place as your systems of record.`}
              data-reveal
            >
              <div className="itm-diagram__unifize"><b>Unifize</b><span>Coordination layer</span></div>
              <div className="itm-diagram__sors" aria-hidden="true">
                {d.coexistence.systemsOfRecord.map((s) => (
                  <div key={s} className="itm-diagram__sor"><b>{s}</b><span>System of record</span></div>
                ))}
              </div>
              <p className="itm-diagram__cap">{d.coexistence.diagramCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ H · COST LEDGER ==================== */}
      <section className="itm-section itm-section--alt itm-cost-sec" id="cost">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={6}>Cost of inaction</Eyebrow>
            <h2 className="itm-h2">{d.cost.heading}</h2>
          </div>
          <CostLedger
            events={d.cost.events}
            consequences={d.cost.consequences}
            economics={d.cost.economics}
            stakesMeta={d.cost.stakesMeta}
          />
        </div>
      </section>

      {/* ============================ I · VALIDATED-STATE ================ */}
      <section className="itm-section itm-section--short" id="validated">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={7}>{d.validated.eyebrow}</Eyebrow>
            <h2 className="itm-h2">{d.validated.headline}</h2>
          </div>
          <ul className="itm-valgrid" data-reveal>
            {d.validated.points.map((pt) => (
              <li key={pt.label} className="itm-valcard">
                <span className="itm-valcard__icon" aria-hidden="true">{VAL_ICONS[pt.icon]}</span>
                <h3>{pt.label}</h3>
                <p>{pt.body}</p>
              </li>
            ))}
          </ul>
          <div className="itm-valcta">
            <button type="button" className="itm-btn itm-btn-ghost">{d.validated.cta}</button>
          </div>
        </div>
      </section>

      {/* ============= J · PROOF (evidence-standard band, honest) ========= */}
      <section className="itm-section itm-section--alt itm-evid" id="proof" aria-label="Proof">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={8}>Proof</Eyebrow>
            <h2 className="itm-h2">{d.proof.heading}</h2>
            <p className="itm-lede">{d.proof.lede}</p>
          </div>
          <ol className="itm-evid__grid" data-reveal>
            {d.proof.points.map((p, i) => (
              <li key={p} className="itm-evid__item">
                <span className="itm-evid__idx itm-data" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p className="itm-evid__body">{p}</p>
              </li>
            ))}
          </ol>
          <p className="itm-evid__note"><span className="itm-dot" aria-hidden="true" />{d.proof.maturityNote}</p>
        </div>
      </section>

      {/* ============================ K · CLOSE ========================== */}
      <section className="itm-section itm-section--dark itm-close" aria-labelledby="itm-close-h">
        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-close__grid" data-reveal>
            <div className="itm-close__lead">
              <span className="itm-close__eyebrow">{d.close.eyebrow}</span>
              <h2 className="itm-close__h" id="itm-close-h">{d.close.heading}</h2>
            </div>
            <div className="itm-close__side">
              <p className="itm-lede">{d.close.lede}</p>
              <div className="itm-close__cta">
                <BookDemoButton className="itm-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/explorations/platform" className="itm-btn itm-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- site footer */}
      <SiteFooter tagline="The decision trace for regulated operations." note={`Industry template · ${d.name} instance`} />
    </main>
  );
}
