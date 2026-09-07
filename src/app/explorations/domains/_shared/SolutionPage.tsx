/* ============================================================================
 * SolutionPage - the Solutions (domain) template, rebuilt on the shared DMS
 * design system as a blend of the homepage, the platform page and the
 * product pages. Rendered from the same `DomainPageData` object the ITM
 * template (DomainPage.tsx) consumed, so every domain data file works
 * unchanged.
 *
 * What is borrowed from where:
 *   homepage  - the centered dark hero over one arcade window, the attested
 *               trust strip, split section heads, raised registry cards,
 *               section tails with one exit, the convergence-mark close.
 *   platform  - centered heads on dark sections, the persistent-camera
 *               journey (PlatformJourney), the brand-blue field diagram for
 *               coexistence, the hairline dark ledger for the trigger board.
 *   products  - the hero step rail (HeroArcade), the trust-strip industries,
 *               the numbered pain register (dms-pain), the shared customer
 *               film rail (ProofFilmRail), the owners register, the close.
 *
 * Flow (and the 2026-09-01 critique findings it answers):
 *   hero        problem-led title, the work-inside chips, ONE proof line
 *               above the fold (P1: proof arrived at 84% depth)
 *   trust       where this solution runs, as live industry links
 *   subnav      sticky, from the top of the page, with its own CTA
 *               (P1: 17-screen CTA desert; sub-nav appeared at 40% depth)
 *   01 work     the workstreams, clustered (the parity beat)
 *   02 leak     the old world staged + the pain register + the honest cost;
 *               the coordination tax named here, once
 *   03 journey  the domain's own record followed end to end, with an
 *               inline CTA at the conviction peak
 *   04 modules  the ledger by product (single catalog: 01 is the work, 04 is
 *               the software that runs it; nothing listed twice)
 *   05 coexist  the three-path answer, early (P1: replace-vs-coexist read
 *               both ways; now answered per situation before the proof)
 *   06 proof    the shared film rail (named references render only in the
 *               no-film fallback; the growth chain was cut 2026-09-02)
 *   07 industry the L1 fan-out
 *   08 roles    the owners register (P0: the ITM persona explorer shipped
 *               with no CSS; this one is styled in the DMS kit)
 *   09 urgent   the trigger board
 *   close
 *
 * Distill pass (2026-09-02, /impeccable distill + layout): the page ran to
 * 17 screens at 1440 with four text-heavy registers. Cut, not hidden: the
 * per-workstream lines in 01 (names only; the cluster line carries them),
 * the display-size pain rows in 02 (a compact ledger), the module blurbs
 * in 04 (the product pages own them), the industry one-liners in 07, and
 * the titles / cares / worries rows in 08. The sub-nav lists six stops.
 * ========================================================================== */

import Link from "next/link";
import { ChatShell } from "@/components/organisms";
import { DmsHeader } from "../../products/dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsMotion } from "../../products/dms/dms-motion";
import { Eyebrow, ShellFrame, pad } from "../../products/dms/dms-primitives";
import { SeverityIcon } from "../../products/dms/dms-linework";
import { HeroArcade } from "../../products/_shared/arcade/hero-arcade";
import type { ArcadeStepConfig } from "../../products/_shared/arcade/arcade";
import { PlatformJourney } from "../../platform/platform-interactive";
import { ProofFilmRail } from "../../products/_shared/proof-films";
import { filmsForModules } from "../../products/_shared/customer-films";
import { SolutionSubnav, SolutionCoexist, CoexistDiagram } from "./solution-interactive";
import { IndustryIcon } from "./industry-icons";
import type { DomainPageData, LeakScene, WorkGlyph } from "./types";
import "../../products/dms/dms.css";
import "../../products/dms/dms-redesign.css";
import "../../platform/platform-kit.css";
import "./solution-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

/* Outline glyphs for the workstream clusters (heroicons-style, 1.5 stroke),
 * the same family the homepage's entry cards draw. */
const WORK_ICONS: Record<WorkGlyph, React.ReactNode> = {
  loop: <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />,
  pulse: <path d="M2.75 12h3.5l2.5-5.5 4.5 11 2.5-5.5h5.5" />,
  box: <path d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />,
  doc: <path d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />,
  chat: <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />,
  scale: <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />,
};

const ARROW = (
  <svg className="sk-arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15M13 6.5l5.5 5.5-5.5 5.5" />
  </svg>
);

/* the old-world artifact's row states (homepage symptom-scene grammar) */
const SCENE_ICONS: Record<LeakScene["rows"][number]["state"], React.ReactNode> = {
  done: <svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" /><path d="m4.4 7.2 1.9 1.9 3.4-4" /></svg>,
  wait: <svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" /><path d="M7 4v3.4l2.2 1.4" /></svg>,
  idle: <svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5.6" /></svg>,
};

function LeakSceneCard({ scene }: { scene: LeakScene }) {
  return (
    <figure className="sk-scene">
      <div className="sk-scene__ui" aria-hidden="true">
        <div className="sk-scene__bar">
          <span className="sk-scene__kicker">{scene.kicker}</span>
          <span className="sk-scene__chip">{scene.chip}</span>
        </div>
        <div className="sk-scene__title">{scene.title}</div>
        <ul className="sk-scene__rows">
          {scene.rows.map((row) => (
            <li key={row.label} className={"is-" + row.state}>
              <span className="sk-scene__ico">{SCENE_ICONS[row.state]}</span>
              <span>{row.label}</span>
              <span className={"sk-scene__age" + (row.warn ? " is-warn" : "")}>{row.age}</span>
            </li>
          ))}
        </ul>
        {scene.float ? (
          <div className="sk-scene__float">
            <span className="sk-scene__kicker">{scene.float.kicker}</span>
            <span>{scene.float.note}</span>
          </div>
        ) : null}
      </div>
      <figcaption className="sk-scene__cap">
        <span className="dms-dot dms-dot--accent" aria-hidden="true" />
        {scene.caption}
      </figcaption>
    </figure>
  );
}

/* the hero rail wants a one-word label per pose; the arcade steps carry one
 * as `ghost`, the trail title is the fallback */
function heroSteps(trail: { t: string }[], steps: ArcadeStepConfig[]) {
  const n = Math.min(trail.length, steps.length);
  return Array.from({ length: n }, (_, i) => ({
    label: (steps[i] as { ghost?: string }).ghost ?? trail[i].t,
    config: steps[i],
  }));
}

export function SolutionPage({ data }: { data: DomainPageData }) {
  const d = data;
  const arcade = d.flow.arcade;
  const trailCount = arcade ? Math.min(d.flow.trail.length, arcade.steps.length) : d.flow.trail.length;

  /* real customer films whose Notion Module tags intersect the domain's;
   * governance (Live + Web Use Approved) is enforced in the adapter */
  const proofFilms = d.proof?.filmTags ? filmsForModules(d.proof.filmTags, { limit: 8 }) : [];
  const proofLead = d.proof
    ? {
        label: d.proof.attested.label,
        stat: d.proof.attested.stat,
        statLabel: d.proof.attested.statLabel,
        body: d.proof.attested.body,
        footnote: d.proof.attested.note,
      }
    : null;

  /* six stops, not nine: the reader picks a beat, not a table of contents */
  const subnavTabs = [
    { id: "work", label: "The work" },
    { id: "leaks", label: "The leak" },
    { id: "journey", label: "The journey" },
    { id: "modules", label: "Modules" },
    ...(d.proof ? [{ id: "proof", label: "Proof" }] : []),
    { id: "by-industry", label: "Industries" },
  ];

  const urgentLevels = ["Urgent", "High"] as const;

  return (
    <main className="dms dms--redesign dms--consistent-eyebrows pf-page sk-page">
      <DmsHeader />
      <DmsMotion />

      {/* ============================ HERO =============================
       * Problem-led, on the shared dark hero: title, lede, CTAs, then the
       * work-inside chips and the one signed figure. The product shot is the
       * arcade walking the domain's own record, with the product page's
       * step rail under it. */}
      <section className="dms-section dms-hero" aria-label={d.name}>
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/explorations/home#solutions">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path className="sk-hero__glyph" d="M3.5 5.5h5M3.5 12h5.5M3.5 18.5h5M8.5 5.5c4.5 0 3.5 6.5 8 6.5M8.5 18.5c4.5 0 3.5-6.5 8-6.5M14 12h6.5M17.5 9l3 3-3 3" />
                  </svg>
                </span>
                <span>Solutions · {d.hero.crumb}</span>
              </Link>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">{d.hero.titleLead}</span>
                <span className="dms-hero__line dms-hero__turn">{d.hero.titleTurn}</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{d.hero.sub}</p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                <a href="#journey" className="dms-btn dms-btn-ghost">Watch the record close</a>
              </div>
            </div>
          </div>

          {/* two quiet lines under the CTAs: the work inside, as one mono
            * line; the one signed figure, as one sentence with the number
            * carrying the weight */}
          <div className="sk-hero__meta">
            <p className="sk-hero__chips" aria-label="The work inside">
              {d.hero.chips.map((c, i) => (
                <span key={c}>
                  {i > 0 ? <i aria-hidden="true">·</i> : null}
                  {c}
                </span>
              ))}
            </p>
            {d.proof ? (
              <a className="sk-hero__proof" href="#proof">
                <b>{d.proof.attested.stat}</b> {d.proof.attested.statLabel}, {d.proof.attested.label.toLowerCase()}
                <span aria-hidden="true">&darr;</span>
              </a>
            ) : null}
          </div>

          {arcade ? (
            <div className="dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade">
              <HeroArcade steps={heroSteps(d.flow.trail, arcade.steps)} />
            </div>
          ) : (
            <div className="dms-hero__frame dms-hero__product-demo sk-hero__static">
              <div className="dms-hero__stage">
                <ShellFrame url={d.flow.shellUrl}>
                  <ChatShell variant={d.flow.chatVariant} />
                </ShellFrame>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
       * Buyer-meaningful: the industries this solution runs in, as live
       * links, in the product page's industries-strip idiom. */}
      <section className="dms-section dms-section--dark dms-trust" aria-label="Industries this solution runs in">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">{d.hero.runsIn.label}</p>
          <ul className="dms-trust__logos">
            {d.hero.runsIn.links.map((c) => (
              <li key={c.name}>
                <Link href={c.href} className="dms-trust__mark">
                  <span className="dms-trust__icon" aria-hidden="true"><IndustryIcon name={c.name} /></span>
                  <span>{c.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <a href={d.hero.runsIn.more.href} className="sk-trust__more">{d.hero.runsIn.more.label}</a>
            </li>
          </ul>
        </div>
      </section>

      {/* ============================ SUB-NAV ========================== */}
      <SolutionSubnav
        domainName={d.name}
        tabs={subnavTabs}
        cta={<BookDemoButton className="dms-btn dms-btn-sm" source="subnav">Book a demo</BookDemoButton>}
      />

      {/* ============================ 01 · THE WORK INSIDE =============
       * The parity beat as the homepage's entry cards: one card per buyer-
       * vocabulary cluster, its workstreams listed, one exit per card. */}
      <section className="dms-section" id="work" aria-labelledby="sk-work-title">
        <div className="dms-wrap">
          <div className="sk-split" data-reveal>
            <div>
              <Eyebrow n={1}>The work inside</Eyebrow>
              <h2 className="dms-h2" id="sk-work-title">{d.work.heading}</h2>
            </div>
            <p className="dms-lede">{d.work.lede}</p>
          </div>

          <div className="sk-work" data-reveal>
            {d.work.groups.map((g, gi) => (
              <article className="sk-work__card" key={g.name}>
                <div className="sk-work__intro">
                  <svg className="sk-work__glyph" viewBox="0 0 24 24" aria-hidden="true">{WORK_ICONS[g.glyph]}</svg>
                  <span className="sk-work__idx dms-data">{pad(gi + 1)}</span>
                  <h3 className="sk-work__name">{g.name}</h3>
                  <p className="sk-work__line">{g.line}</p>
                </div>
                {/* names only: the cluster line says what they share, the
                  * module ledger and the product pages carry the detail */}
                <ul className="sk-work__items">
                  {g.items.map((w) => (
                    <li className="sk-work__item" key={w.name}>
                      {w.href ? (
                        <Link href={w.href} className="sk-work__item-name">{w.name}</Link>
                      ) : (
                        <span className="sk-work__item-name">{w.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {g.runsIn ? (
                  <Link className="sk-work__go" href={g.runsIn.href}>{g.runsIn.label}</Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 02 · WHERE IT LEAKS ==============
       * The head shares its row with the old world, staged; then the
       * product page's pain register; then the honest cost band. The
       * coordination tax is named here, once, in the buyer's words. */}
      <section className="dms-section dms-section--alt" id="leaks" aria-labelledby="sk-leaks-title">
        <div className="dms-wrap">
          <div className={"sk-lk" + (d.leaks.scene ? "" : " sk-lk--solo")} data-reveal>
            <div className="dms-head">
              <Eyebrow n={2}>Where it leaks</Eyebrow>
              <h2 className="dms-h2" id="sk-leaks-title">{d.leaks.heading}</h2>
              <p className="dms-lede">{d.leaks.lede}</p>
            </div>
            {d.leaks.scene ? <LeakSceneCard scene={d.leaks.scene} /> : null}
          </div>

          {/* the register as a compact ledger: severity, where it leaks, the
            * failure named, the body at reading size; one screen for all */}
          <ol className="sk-pains" data-reveal>
            {d.leaks.pains.map((p, i) => (
              <li className="sk-pain" key={p.name}>
                <span className="sk-pain__idx dms-data" aria-hidden="true">{pad(i + 1)}</span>
                <div className="sk-pain__sig">
                  <span className="sk-pain__sev"><SeverityIcon severity={p.severity} />{p.severity}</span>
                  <span className="sk-pain__surface">{p.surface}</span>
                </div>
                <h3 className="sk-pain__title">{p.name}</h3>
                <p className="sk-pain__body">{p.body}</p>
              </li>
            ))}
          </ol>

          {d.leaks.tax ? (
            <p className="sk-tax" data-reveal>
              <span className="sk-tax__lab">{d.leaks.tax.label}</span>
              <span className="sk-tax__val">{d.leaks.tax.value}</span>
            </p>
          ) : null}

          <div className="sk-tail" data-reveal>
            <p>That waiting is the coordination tax. Put a number on yours before the walkthrough.</p>
            <Link href="/coordination-tax-calculator">Measure your coordination tax &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ============================ 03 · THE JOURNEY =================
       * The platform page's persistent camera, on the domain's own record:
       * the trail is the rail, the arcade proves each step. One CTA at the
       * conviction peak. */}
      <section className="dms-section dms-section--dark" id="journey" aria-labelledby="sk-journey-title">
        <div className="dms-wrap">
          <header className="pf-centered-head" data-reveal>
            <Eyebrow n={3}>The difference</Eyebrow>
            <h2 className="dms-h2" id="sk-journey-title">{d.flow.heading}</h2>
            <p className="dms-lede">{d.flow.lede}</p>
          </header>

          {arcade ? (
            <div style={{ "--sk-steps": trailCount } as React.CSSProperties} data-reveal>
              <PlatformJourney
                steps={d.flow.trail.slice(0, trailCount).map((s) => ({ title: s.t, body: `${s.who} · ${s.when}` }))}
                configs={arcade.steps.slice(0, trailCount)}
              />
            </div>
          ) : (
            <div className="sk-journey__static" data-reveal>
              <aside aria-label={d.flow.trailLabel}>
                <span className="sk-trail__lab">{d.flow.trailLabel}</span>
                <ol className="sk-trail">
                  {d.flow.trail.map((s) => (
                    <li className="sk-trail__step" key={s.t}>
                      <span className="sk-trail__t">{s.t}</span>
                      <span className="sk-trail__meta">{s.who} · {s.when}</span>
                    </li>
                  ))}
                </ol>
              </aside>
              <ShellFrame url={d.flow.shellUrl}>
                <ChatShell variant={d.flow.chatVariant} />
              </ShellFrame>
            </div>
          )}

          <div className="sk-journey__tail" data-reveal>
            <p>{d.flow.trailFoot}</p>
            <div className="sk-journey__ctas">
              <BookDemoButton className="dms-btn" source="journey">Run it on your record &rarr;</BookDemoButton>
              <a href="#modules" className="dms-btn dms-btn-ghost">See the modules</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 04 · THE MODULES =================
       * One ledger, grouped by the product that ships each module. */}
      <section className="dms-section" id="modules" aria-labelledby="sk-modules-title">
        <div className="dms-wrap">
          <div className="sk-split" data-reveal>
            <div>
              <Eyebrow n={4}>The modules</Eyebrow>
              <h2 className="dms-h2" id="sk-modules-title">{d.coverage.heading}</h2>
            </div>
            <p className="dms-lede">{d.coverage.lede}</p>
          </div>

          {/* one band per product: the product on the left, its modules as a
            * grid of cells on the right (name + the standards it evidences,
            * as plain mono text). A product still in development says so
            * once, in its head, instead of a badge on every cell. */}
          <div className="sk-mods" data-reveal>
            {d.coverage.groups.map((g) => {
              const door = g.modules.find((m) => m.href)?.href;
              const allSoon = g.modules.every((m) => !m.href && m.soon);
              const status = allSoon ? g.modules[0]?.soon : null;
              return (
                <section className={"sk-mods__group" + (allSoon ? " is-soon" : "")} key={g.slug} aria-label={g.name}>
                  <header className="sk-mods__head">
                    <span className="sk-mods__tier">{g.tier === "Primary" ? "Anchored here" : "Reaches into"}</span>
                    <h3 className="sk-mods__product">{g.name}</h3>
                    <p className="sk-mods__promise">{g.promise}</p>
                    {door ? (
                      <Link className="sk-mods__go" href={door}>Explore the product &rarr;</Link>
                    ) : status ? (
                      <span className="sk-mods__status">{status}</span>
                    ) : null}
                  </header>
                  <ul className="sk-mods__cells">
                    {g.modules.map((m) => {
                      const soon = !m.href && m.soon && !allSoon ? m.soon : null;
                      const inner = (
                        <>
                          <span className="sk-mods__name">{m.name}</span>
                          {(m.standards ?? []).length ? (
                            <span className="sk-mods__stds" aria-label="Standards evidenced">{(m.standards ?? []).join(" · ")}</span>
                          ) : null}
                          {soon ? <span className="sk-mods__stds">{soon}</span> : null}
                          {m.href ? ARROW : null}
                        </>
                      );
                      return (
                        <li key={m.name}>
                          {m.href ? (
                            <Link href={m.href} className="sk-mods__cell" aria-label={`${m.name}: open the product page`}>{inner}</Link>
                          ) : (
                            <div className="sk-mods__cell">{inner}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <div className="sk-tail" data-reveal>
            <p>Every module runs on the same governed record, next to the systems you already trust.</p>
            <Link href="/explorations/platform#stack">How the platform is put together &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ============================ 05 · COEXISTENCE =================
       * With `paths`: the three-path answer behind the "where is yours
       * today?" selector. Without: the single-story diagram on the field. */}
      {d.coexistence ? (
        <section className="dms-section dms-section--alt" id="coexistence" aria-labelledby="sk-coex-title">
          <div className="dms-wrap">
            <header className="pf-centered-head" data-reveal>
              <Eyebrow n={5}>Coexistence</Eyebrow>
              <h2 className="dms-h2" id="sk-coex-title">{d.coexistence.heading}</h2>
              {d.coexistence.paths?.length ? null : <p className="dms-lede">{d.coexistence.body}</p>}
            </header>

            {d.coexistence.paths?.length ? (
              <div data-reveal>
                <SolutionCoexist
                  selectorLabel={d.coexistence.selectorLabel ?? "Where is your system today?"}
                  paths={d.coexistence.paths}
                />
              </div>
            ) : (
              <div className="sk-cx" data-reveal>
                <CoexistDiagram
                  role="Coordination layer"
                  chips={["One governed thread", "Evidence bound to decisions", "Attributable e-signatures"]}
                  boxes={d.coexistence.systemsOfRecord.map((s) => ({ name: s, note: "System of record", kind: "sor" as const }))}
                  caption={d.coexistence.diagramCaption}
                  ariaLabel={`Diagram: Unifize sits as a coordination layer over your ${d.coexistence.systemsOfRecord.join(", ")}, which stay in place as your systems of record.`}
                />
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* ============================ 06 · PROOF =======================
       * The shared customer film rail (the product and home pages' proof),
       * led by the one signed figure; the named references follow. */}
      {d.proof ? (
        proofFilms.length ? (
          <ProofFilmRail
            idPrefix="sk"
            eyebrowN={6}
            heading={d.proof.heading}
            lede={d.proof.lede}
            countNoun="customer films"
            films={proofFilms}
            lead={proofLead}
          />
        ) : (
          <section className="dms-section" id="proof" aria-labelledby="sk-proof-title">
            <div className="dms-wrap">
              <div className="sk-split" data-reveal>
                <div>
                  <Eyebrow n={6}>Customer proof</Eyebrow>
                  <h2 className="dms-h2" id="sk-proof-title">{d.proof.heading}</h2>
                </div>
                <p className="dms-lede">{d.proof.lede}</p>
              </div>
              <div className="sk-refs" style={{ marginTop: "clamp(44px, 5vw, 68px)" }} data-reveal>
                <div className="sk-att">
                  <span className="sk-att__lab">{d.proof.attested.label}</span>
                  <span className="sk-att__stat dms-data">{d.proof.attested.stat}</span>
                  <span className="sk-att__statlab">{d.proof.attested.statLabel}</span>
                  <p className="sk-att__body">{d.proof.attested.body}</p>
                  <span className="sk-att__note">{d.proof.attested.note}</span>
                </div>
                {d.proof.references.map((c) => (
                  <article className="sk-ref" key={c.name}>
                    <span className="sk-ref__tag">{c.tag}</span>
                    <h3 className="sk-ref__name">{c.name}</h3>
                    <p className="sk-ref__desc">{c.desc}</p>
                    {c.link ? <Link href={c.link.href} className="sk-ref__go">{c.link.label}</Link> : null}
                  </article>
                ))}
              </div>
              <div className="sk-tail" data-reveal>
                <p>Every story on the record, by company, industry and module.</p>
                <Link href={d.proof.foot.href}>{d.proof.foot.label} &rarr;</Link>
              </div>
            </div>
          </section>
        )
      ) : null}

      {/* ============================ 07 · FOR YOUR INDUSTRY ===========
       * The L1 fan-out in the homepage's industry-registry grammar. */}
      <section className="dms-section dms-section--alt" id="by-industry" aria-labelledby="sk-inds-title">
        <div className="dms-wrap">
          <div className="sk-split" data-reveal>
            <div>
              <Eyebrow n={7}>For your industry</Eyebrow>
              <h2 className="dms-h2" id="sk-inds-title">{d.industries.heading}</h2>
            </div>
            <p className="dms-lede">{d.industries.lede}</p>
          </div>
          <ul className="sk-inds" data-reveal>
            {d.industries.rows.map((row) => (
              <li key={row.name}>
                <Link href={row.href} className="sk-ind" aria-label={`${d.name} for ${row.name}: ${row.line}`}>
                  <span className="sk-ind__tile" aria-hidden="true"><IndustryIcon name={row.name} /></span>
                  <span className="sk-ind__name">{row.name}</span>
                  {ARROW}
                  <span className="sk-ind__chips" aria-label="Regulatory frame">
                    {row.chips.map((c) => <span key={c} className="sk-ind__chip">{c}</span>)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 08 · BY YOUR ROLE ================
       * The product page's owners register, one raised card per seat. */}
      <section className="dms-section" id="by-role" aria-labelledby="sk-roles-title">
        <div className="dms-wrap">
          <div className="sk-split" data-reveal>
            <div>
              <Eyebrow n={8}>By your role</Eyebrow>
              <h2 className="dms-h2" id="sk-roles-title">{d.personas.heading}</h2>
            </div>
            <p className="dms-lede">{d.personas.lede}</p>
          </div>
          <div className="sk-roles" data-reveal>
            {d.personas.cards.map((p) => (
              <article className={"sk-role" + (p.primary ? " is-primary" : "")} key={p.key}>
                <span className="sk-role__stake">{p.stake}</span>
                <h3 className="sk-role__name">{p.name}</h3>
                <p className="sk-role__value">{p.value}</p>
                {p.href ? <Link href={p.href} className="sk-role__go">See the role page &rarr;</Link> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 09 · WHEN IT'S URGENT ============
       * The trigger board on the platform's dark ledger: severity by shape
       * and label, the clock in mono, the module and owner it routes to. */}
      <section className="dms-section dms-section--dark" id="urgent" aria-labelledby="sk-urgent-title">
        <div className="dms-wrap">
          <header className="pf-centered-head" data-reveal>
            <Eyebrow n={9}>When it&rsquo;s urgent</Eyebrow>
            <h2 className="dms-h2" id="sk-urgent-title">{d.triggers.heading}</h2>
            <p className="dms-lede">{d.triggers.lede}</p>
          </header>
          <div className="sk-trigs" data-reveal>
            {urgentLevels.flatMap((level) =>
              d.triggers.rows
                .filter((t) => t.severity === level)
                .map((t) => {
                  const inner = (
                    <>
                      <span className="sk-trig__sig">
                        <SeverityIcon severity={level === "Urgent" ? "Critical" : "High"} />
                        {level}
                      </span>
                      <h3 className="sk-trig__name">{t.name}</h3>
                      <span className="sk-trig__clock">{t.clock}</span>
                      <div className="sk-trig__foot">
                        <span className="sk-trig__mod">Routes to {t.routesTo}</span>
                        <span className="sk-trig__owner">{t.owner}</span>
                        {t.href ? <span className="sk-trig__go">Open the trigger page →</span> : null}
                      </div>
                    </>
                  );
                  return t.href ? (
                    <Link key={t.name} href={t.href} className="sk-trig" aria-label={`Open the page for: ${t.name}`}>{inner}</Link>
                  ) : (
                    <div key={t.name} className="sk-trig">{inner}</div>
                  );
                }),
            )}
          </div>
        </div>
      </section>

      {/* ============ COMPLIANCE & TRUST (fact-gated; see types.ts) ====== */}
      {d.trust ? (
        <section className="dms-section" id="trust" aria-labelledby="sk-trust-title">
          <div className="dms-wrap">
            <div className="sk-split" data-reveal>
              <div>
                <Eyebrow>Compliance &amp; trust</Eyebrow>
                <h2 className="dms-h2" id="sk-trust-title">{d.trust.heading}</h2>
              </div>
              <p className="dms-lede">{d.trust.lede}</p>
            </div>
            <ul className="sk-pts" data-reveal>
              {d.trust.points.map((p) => (
                <li className="sk-pt" key={p.title}>
                  <h3 className="sk-pt__t">{p.title}</h3>
                  <p className="sk-pt__b">{p.body}</p>
                </li>
              ))}
            </ul>
            {d.trust.foot ? <p className="sk-note"><span className="dms-dot" aria-hidden="true" />{d.trust.foot}</p> : null}
          </div>
        </section>
      ) : null}

      {/* ============ BUILD THE CASE (fact-gated; see types.ts) ========== */}
      {d.caseKit ? (
        <section className="dms-section dms-section--alt" id="case" aria-labelledby="sk-case-title">
          <div className="dms-wrap">
            <div className="sk-split" data-reveal>
              <div>
                <Eyebrow>Build the case</Eyebrow>
                <h2 className="dms-h2" id="sk-case-title">{d.caseKit.heading}</h2>
              </div>
              <p className="dms-lede">{d.caseKit.lede}</p>
            </div>
            <ul className="sk-pts" data-reveal>
              {d.caseKit.items.map((it) => (
                <li className="sk-pt" key={it.title}>
                  <h3 className="sk-pt__t">{it.title}</h3>
                  <p className="sk-pt__b">{it.body}</p>
                  {it.href ? <Link href={it.href} className="sk-pt__go">{it.cta ?? "Open →"}</Link> : null}
                </li>
              ))}
            </ul>
            {d.caseKit.note ? <p className="sk-note"><span className="dms-dot" aria-hidden="true" />{d.caseKit.note}</p> : null}
          </div>
        </section>
      ) : null}

      {/* ============================ CLOSE ============================ */}
      <section className="dms-section dms-section--dark dms-close" id="demo" aria-labelledby="sk-close-h">
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
              <span className="dms-close__eyebrow">{d.close.eyebrow}</span>
              <h2 className="dms-close__h" id="sk-close-h">{d.close.heading}</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">{d.close.lede}</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/explorations/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline="The decision trace for regulated operations." />
    </main>
  );
}
