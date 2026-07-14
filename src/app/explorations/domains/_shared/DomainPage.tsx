/* ============================================================================
 * DomainPage — the domain (Solutions) template, rendered from one
 * `DomainPageData` object.
 *
 * Internally these are Domains (the buyer problem areas from The Problem
 * Architecture); the nav packages them as SOLUTIONS. Products lead with the
 * solution — these pages lead with the problem, then fan out (the L1 ingress
 * page from the 2026-07-09 call): parity register -> pain register -> decision
 * trace -> by industry / by module / by role / by moment -> proof -> close.
 *
 * Same ITM design system as the industry template, and the furniture is
 * reused verbatim so the language stays single-source: SiteHeader, SiteFooter,
 * ItmMotion, Eyebrow / ShellFrame primitives, itm.css; PersonaExplorer and
 * ModuleIndex come from the industries interactive kit; the proof cards speak
 * the champion page's itm-cs photo language. The ink ingress block mirrors the
 * industry page's, with a fourth way in (by industry).
 * ========================================================================== */

import Link from "next/link";
import { ChatShell } from "@/components/organisms";
import { SiteHeader } from "../../industry-template-modern/site-header";
import { SiteFooter } from "../../_shared/site-footer";
import { ItmMotion } from "../../industry-template-modern/itm-motion";
import { Eyebrow, ShellFrame, SeverityIcon } from "../../industry-template-modern/itm-primitives";
import { PersonaExplorer, ModuleIndex } from "../../industries/_shared/industry-interactive";
import { DomainIngressNav, LeakRegister } from "./domain-interactive";
import type { DomainPageData, WorkGlyph } from "./types";
import "../../industry-template-modern/itm.css";
import "./domain-kit.css";

/* Outline glyphs for the six flagship workstreams (heroicons-style, 1.5
 * stroke — the same family as the validated-state cards). */
const WORK_ICONS: Record<WorkGlyph, React.ReactNode> = {
  loop: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />,
  pulse: <path strokeLinecap="round" strokeLinejoin="round" d="M2.75 12h3.5l2.5-5.5 4.5 11 2.5-5.5h5.5" />,
  box: <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />,
  doc: <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />,
  chat: <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />,
  scale: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />,
};

const ROW_ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15M13 6.5l5.5 5.5-5.5 5.5" />
  </svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

export function DomainPage({ data }: { data: DomainPageData }) {
  const d = data;
  let workIdx = 0;

  return (
    <main className="itm">
      <ItmMotion />
      <SiteHeader />

      {/* ============================ HERO (problem-led) ==================== */}
      <section className="itm-section itm-section--dark itm-hero" aria-label={d.name}>
        <div className="itm-hero__glow" aria-hidden="true" />
        <div className="itm-wrap itm-wrap--wide itm-hero__inner">
          <div className="itm-hero__copy">
            <div className="itm-hero__crumb itm-meta">
              <span className="itm-dot itm-dot--accent" aria-hidden="true" />
              <Link href="/explorations/domains">Solutions</Link>
              <span className="itm-hero__crumb-sep" aria-hidden="true">/</span>
              <span>{d.hero.crumb}</span>
            </div>
            <h1 className="itm-hero__title">
              {d.hero.titleLead} <span className="itm-hero__turn">{d.hero.titleTurn}</span>
            </h1>
            <p className="itm-lede itm-hero__sub">{d.hero.sub}</p>
            <ul className="itm-hero__stds" aria-label="The work inside">
              {d.hero.chips.map((s) => <li key={s} className="itm-hero__std">{s}</li>)}
            </ul>
            <div className="itm-hero__ctas">
              <button type="button" className="itm-btn">Book a demo →</button>
              <a href="#work" className="itm-btn itm-btn-ghost">See the work it covers</a>
            </div>
          </div>
        </div>

        <div className="itm-hero__stage" aria-hidden="true">
          <div className="itm-hero__shot"><img src="/hero-product.png" alt="" /></div>
          {d.hero.floats?.map((f) => (
            <div
              key={f.title}
              className={"itm-hero__float " + (f.kind === "seal" ? "itm-hero__float--seal" : "dk-float--clock")}
            >
              <span className="itm-hero__float-top">
                {f.kind === "seal" ? (
                  <span className="itm-hero__float-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </span>
                ) : (
                  <span className="dk-float-clockic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 1.8" /></svg>
                  </span>
                )}
                {f.title}
              </span>
              <span className="itm-hero__float-meta">{f.meta}</span>
            </div>
          ))}
        </div>

        {/* the trust-strip slot, buyer-meaningful: where this domain runs */}
        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-trust" aria-label="Industries this solution runs in">
            <div className="itm-trust__who">
              <span className="itm-trust__lab">{d.hero.runsIn.label}</span>
              <div className="itm-trust__names">
                {d.hero.runsIn.links.map((c, i) => (
                  <span key={c.name} style={{ display: "contents" }}>
                    {i > 0 ? <span className="itm-trust__sep" aria-hidden="true" /> : null}
                    <Link href={c.href} className="itm-trust__name dk-trust__link">{c.name}</Link>
                  </span>
                ))}
                <span className="itm-trust__sep" aria-hidden="true" />
                <a href={d.hero.runsIn.more.href} className="dk-trust__more">{d.hero.runsIn.more.label}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 01 · THE WORK INSIDE (parity) ================= */}
      <section className="itm-section" id="work">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={1}>The work inside</Eyebrow>
            <h2 className="itm-h2">{d.work.heading}</h2>
            <p className="itm-lede">{d.work.lede}</p>
          </div>

          <div className="dk-wgs">
            {d.work.groups.map((g) => (
              <div key={g.name} className="dk-wg" data-reveal>
                <div className="dk-wg__head">
                  <span className="dk-wg__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">{WORK_ICONS[g.glyph]}</svg>
                  </span>
                  <div className="dk-wg__text">
                    <h3 className="dk-wg__name">{g.name}</h3>
                    <p className="dk-wg__line">{g.line}</p>
                  </div>
                  {g.runsIn ? (
                    <Link href={g.runsIn.href} className="dk-wg__runsin">{g.runsIn.label}</Link>
                  ) : null}
                </div>
                <ol className="dk-wg__items">
                  {g.items.map((w) => {
                    workIdx += 1;
                    return (
                      <li key={w.name} className="dk-rest">
                        <span className="dk-rest__idx" aria-hidden="true">{pad(workIdx)}</span>
                        <div>
                          <h4 className="dk-rest__name">{w.name}</h4>
                          <p className="dk-rest__line">
                            {w.line}
                            {w.href ? <> <Link href={w.href} className="dk-work__go">{w.hrefLabel ?? "See it →"}</Link></> : null}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 02 · WHERE IT LEAKS =========================== */}
      <section className="itm-section itm-section--alt" id="leaks">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={2}>Where it leaks</Eyebrow>
            <h2 className="itm-h2">{d.leaks.heading}</h2>
            <p className="itm-lede">{d.leaks.lede}</p>
          </div>
          <div data-reveal>
            <LeakRegister pains={d.leaks.pains} note={d.leaks.note} />
          </div>
          {d.leaks.tax ? (
            <div className="dk-tax" data-reveal>
              <div className="dk-tax__text">
                <span className="dk-tax__lab">{d.leaks.tax.label}</span>
                <span className="dk-tax__meta">{d.leaks.tax.meta}</span>
              </div>
              <span className="dk-tax__val">{d.leaks.tax.value}</span>
            </div>
          ) : null}
        </div>
      </section>

      {/* ==================== 03 · THE DIFFERENCE (decision trace) ========== */}
      <section className="itm-section itm-section--tall" id="thesis">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <Eyebrow n={3}>The difference</Eyebrow>
            <h2 className="itm-h2">{d.flow.heading}</h2>
            <p className="itm-lede">{d.flow.lede}</p>
          </div>

          <div className="itm-diff__grid">
            <aside className="itm-trail" aria-label="How the decision moves" data-reveal>
              <span className="itm-trail__lab">{d.flow.trailLabel}</span>
              <ol className="itm-trail__steps">
                {d.flow.trail.map((s, i) => (
                  <li className={"itm-trail__step" + (i === d.flow.trail.length - 1 ? " is-sealed" : "")} key={s.t}>
                    <span className="itm-trail__node" aria-hidden="true" />
                    <span className="itm-trail__t">{s.t}</span>
                    <span className="itm-trail__meta">{s.who} <span className="itm-data">· {s.when}</span></span>
                  </li>
                ))}
              </ol>
              <p className="itm-trail__foot">{d.flow.trailFoot}</p>
            </aside>

            <div className="itm-thread" data-reveal>
              <div className="itm-thread__live">
                <ShellFrame url={d.flow.shellUrl}>
                  <ChatShell variant={d.flow.chatVariant} />
                </ShellFrame>
              </div>
              <div className="itm-thread__mobile" aria-hidden="true">
                <span className="itm-thread__mobile-lab">{d.flow.mobileLabel}</span>
                <span className="itm-thread__mobile-id">{d.flow.mobileId}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INGRESS · four ways in (sticky sub-nav group) ========= */}
      <div className="itm-ingress">
        <DomainIngressNav
          domainName={d.name}
          label="On this page"
          tabs={[
            { id: "by-industry", label: "For your industry" },
            { id: "modules", label: "The modules" },
            { id: "by-role", label: "By your role" },
            { id: "whats-breaking", label: "When it's urgent" },
            ...(d.proof ? [{ id: "proof", label: "The proof" }] : []),
          ]}
        />

        {/* 04 · BY INDUSTRY (the L1 fan-out) */}
        <section className="itm-section itm-section--dark" id="by-industry">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={4}>For your industry</Eyebrow>
              <h2 className="itm-h2">{d.industries.heading}</h2>
              <p className="itm-lede">{d.industries.lede}</p>
            </div>
            <ol className="dk-inds" data-reveal>
              {d.industries.rows.map((row, i) => (
                <li key={row.name}>
                  <Link href={row.href} className="dk-ind" aria-label={`${d.name} for ${row.name}`}>
                    <span className="dk-ind__idx" aria-hidden="true">{pad(i + 1)}</span>
                    <span className="dk-ind__name">{row.name}</span>
                    <span className="dk-ind__line">{row.line}</span>
                    <span className="dk-ind__chips" aria-label="Regulatory frame">
                      {row.chips.map((c) => <span key={c} className="dk-ind__chip">{c}</span>)}
                    </span>
                    <span className="dk-ind__go" aria-hidden="true">{ROW_ARROW}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="dk-inds__foot"><span className="itm-dot" aria-hidden="true" />{d.industries.foot}</p>
          </div>
        </section>

        {/* 05 · THE MODULES THAT RUN IT */}
        <section className="itm-section itm-section--dark" id="modules">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={5}>The modules</Eyebrow>
              <h2 className="itm-h2">{d.coverage.heading}</h2>
              <p className="itm-lede">{d.coverage.lede}</p>
            </div>
            <ModuleIndex domains={d.coverage.groups} standardFilters={d.coverage.standardFilters} showCounts={false} />
          </div>
        </section>

        {/* 06 · WHO OWNS IT */}
        <section className="itm-section itm-section--dark" id="by-role">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={6}>By your role</Eyebrow>
              <h2 className="itm-h2">{d.personas.heading}</h2>
              <p className="itm-lede">{d.personas.lede}</p>
            </div>
            <PersonaExplorer personas={d.personas.cards} />
          </div>
        </section>

        {/* 07 · WHEN IT TURNS URGENT */}
        <section className="itm-section itm-section--dark itm-trigs-sec" id="whats-breaking">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={7}>When it&rsquo;s urgent</Eyebrow>
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
                      <span className="itm-trig__go">{t.href ? "Open the trigger page →" : " "}</span>
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

      {/* ==================== 08 · COEXISTENCE ============================== */}
      {d.coexistence ? (
        <section className="itm-section itm-section--short" id="coexistence">
          <div className="itm-wrap">
            <div className="itm-coexist">
              <div className="itm-coexist__head" data-reveal>
                <Eyebrow n={8}>Coexistence</Eyebrow>
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
      ) : null}

      {/* ==================== 09 · PROOF (attested + named references) ====== */}
      {d.proof ? (
        <section className="itm-section itm-section--alt" id="proof" aria-label="Proof">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow n={9}>Proof</Eyebrow>
              <h2 className="itm-h2">{d.proof.heading}</h2>
              <p className="itm-lede">{d.proof.lede}</p>
            </div>
            <div className="dk-att" data-reveal>
              <div className="dk-att__panel">
                <span className="dk-att__lab">{d.proof.attested.label}</span>
                <span className="dk-att__stat itm-data">{d.proof.attested.stat}</span>
                <span className="dk-att__statlab">{d.proof.attested.statLabel}</span>
                <p className="dk-att__body">{d.proof.attested.body}</p>
                <span className="dk-att__note"><span className="itm-dot" aria-hidden="true" />{d.proof.attested.note}</span>
              </div>
              <div className="dk-att__refs">
                {d.proof.references.map((c) => (
                  <div key={c.name} className="dk-ref">
                    <span className="dk-ref__tag">{c.tag}</span>
                    <h3 className="dk-ref__name">{c.name}</h3>
                    <p className="dk-ref__desc">{c.desc}</p>
                    {c.link ? <Link href={c.link.href} className="dk-work__go">{c.link.label}</Link> : null}
                  </div>
                ))}
                <div className="dk-att__foot">
                  <Link href={d.proof.foot.href} className="itm-btn itm-btn-ghost">{d.proof.foot.label} →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ============ COMPLIANCE & TRUST (real facts only; hidden until
           engineering/compliance supply them — see types.ts) ================ */}
      {d.trust ? (
        <section className="itm-section itm-section--short" id="trust" aria-label="Compliance and trust">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow>Compliance &amp; trust</Eyebrow>
              <h2 className="itm-h2">{d.trust.heading}</h2>
              <p className="itm-lede">{d.trust.lede}</p>
            </div>
            <ul className="dk-trust" data-reveal>
              {d.trust.points.map((p) => (
                <li key={p.title} className="dk-trust__pt">
                  <h3 className="dk-trust__t">{p.title}</h3>
                  <p className="dk-trust__b">{p.body}</p>
                </li>
              ))}
            </ul>
            {d.trust.foot ? <p className="dk-lk__note"><span className="itm-dot" aria-hidden="true" />{d.trust.foot}</p> : null}
          </div>
        </section>
      ) : null}

      {/* ============ BUILD THE CASE (champion kit; hidden until the
           artifacts are real — see types.ts) ================================ */}
      {d.caseKit ? (
        <section className="itm-section itm-section--alt" id="case" aria-label="Build the internal case">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow>Build the case</Eyebrow>
              <h2 className="itm-h2">{d.caseKit.heading}</h2>
              <p className="itm-lede">{d.caseKit.lede}</p>
            </div>
            <div className="dk-kit" data-reveal>
              {d.caseKit.items.map((it) => (
                <div key={it.title} className="dk-kit__item">
                  <h3 className="dk-kit__t">{it.title}</h3>
                  <p className="dk-kit__b">{it.body}</p>
                  {it.href ? <Link href={it.href} className="dk-work__go">{it.cta ?? "Open →"}</Link> : null}
                </div>
              ))}
            </div>
            {d.caseKit.note ? <p className="dk-lk__note"><span className="itm-dot" aria-hidden="true" />{d.caseKit.note}</p> : null}
          </div>
        </section>
      ) : null}

      {/* ==================== GROWTH (land-and-expand journey) ============== */}
      {d.growth ? (
        <section className="itm-section itm-section--short" id="growth" aria-label="Where teams go next">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <Eyebrow>Where teams go next</Eyebrow>
              <h2 className="itm-h2">{d.growth.heading}</h2>
              <p className="itm-lede">{d.growth.lede}</p>
            </div>
            <ol className="dk-grow" data-reveal>
              {d.growth.steps.map((s, i) => (
                <li key={s.name} className="dk-grow__step">
                  {i > 0 ? <span className="dk-grow__arrow" aria-hidden="true">{ROW_ARROW}</span> : null}
                  {s.href ? (
                    <Link href={s.href} className="dk-grow__card dk-grow__card--live">
                      <span className="dk-grow__name">{s.name}</span>
                      <span className="dk-grow__note">{s.note}</span>
                    </Link>
                  ) : (
                    <span className="dk-grow__card">
                      <span className="dk-grow__name">{s.name}</span>
                      <span className="dk-grow__note">{s.note}</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* ==================== CLOSE ========================================= */}
      <section className="itm-section itm-section--dark itm-close" aria-labelledby="dk-close-h">
        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-close__grid" data-reveal>
            <div className="itm-close__lead">
              <span className="itm-close__eyebrow">{d.close.eyebrow}</span>
              <h2 className="itm-close__h" id="dk-close-h">{d.close.heading}</h2>
            </div>
            <div className="itm-close__side">
              <p className="itm-lede">{d.close.lede}</p>
              <div className="itm-close__cta">
                <button type="button" className="itm-btn">Book a 30-minute walkthrough</button>
                <Link href="/platform" className="itm-btn itm-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- site footer */}
      <SiteFooter tagline="The decision trace for regulated operations." note={`Solutions template · ${d.name} instance`} />
    </main>
  );
}
