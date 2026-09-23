/* ============================================================================
 * IndustryRailsPage - an industry page on the rails (23 Sep 2026).
 *
 * The Medical Devices page (/industries/medical-devices) moved
 * onto the design standard the homepage, platform and DMS pages share, with
 * a Luthor-style hero visual. This renders the same page for any industry
 * from its IndustryData (the Notion-backed kit data) plus its IndustryRails
 * layer (hero record, one artifact per seat and per coverage cell, the
 * three moments that lead the board).
 *
 * The shell and every section class are the MD page's (`md-page` on <main>,
 * md-rails.css loaded last), so the two stay one design. Three honest
 * divergences, all because Notion has no data for them in these segments:
 *  - trust strip: the regulatory frame, not customer names (no named
 *    references at these proof-maturity stages);
 *  - cost: the per-company tax from the Industries row, then the named
 *    coordination events with what is at risk, no per-event dollars;
 *  - proof: the evidence standard these buyers hold (Proof Requirement) and
 *    the honest proof-maturity note, not a customer reel (the Customer
 *    Videos DB has no approved films for these industries).
 * ========================================================================== */
import Link from "next/link";
import type { CSSProperties } from "react";
import { DmsHeader } from "../../products/dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { HatchBand } from "../../_shared/page-rails";
import { Eyebrow } from "../../products/dms/dms-primitives";
import { UrgentBoard, type UrgentRow } from "../../_shared/urgent-board";
import { IndustryHeroTrace } from "../../_shared/industry-hero-trace";
import { WorkArtifact } from "../../domains/_shared/solution-work-viz";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { TraceThread } from "./industry-rails";
import type { IndustryData, IndustryRails, RailsCell } from "./types";
import "../../domains/_shared/solution-rails.css";
import "../../domains/_shared/solution-viz.css";
import "../../industry-template-modern/itm.css";
import "../../products/dms/dms.css";
import "../../products/dms/dms-redesign.css";
import "../../_shared/page-rails.css";
import "../../products/dms/dms-rails.css";
import "../../industry-template-modern/md-rails.css";
import "./industry-rails.css";

const usdM = (n: number) =>
  "$" + (n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "M";

/* Restrained outline icons for the validation cells, keyed by
 * ValidatedPoint.icon (Heroicons outline paths, as on the MD page). */
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

/* the split head every railed section opens with (the MD page's) */
function SplitHead({ n, eyebrow, title, lede, id }: { n: number; eyebrow: string; title: string; lede?: string; id?: string }) {
  return (
    <header className="md-head">
      <div className="md-head__lead">
        <Eyebrow n={n}>{eyebrow}</Eyebrow>
        <h2 className="dms-h2" id={id}>{title}</h2>
      </div>
      {lede ? <p className="dms-lede">{lede}</p> : null}
    </header>
  );
}

/* the way-in cells (sk-wk, solution-rails.css), as ways-in.tsx draws them */
type Cell = RailsCell & { name: string; line: string; items?: string[] };

function Cells({ cells, compact }: { cells: Cell[]; compact?: boolean }) {
  return (
    <div
      className={"sk-wk md-wk" + (compact ? " md-wk--roles" : "")}
      style={{ "--sk-work-n": cells.length } as CSSProperties}
      data-reveal
    >
      {cells.map((c) => (
        <article className="sk-wk__cell" key={c.name}>
          <div className={"sk-wk__wash sk-wk__wash--" + c.viz.wash} aria-hidden="true">
            <WorkArtifact viz={c.viz} />
          </div>
          <div className="sk-wk__intro">
            <h3>{c.name}</h3>
            <p>{c.line}</p>
          </div>
          {c.items ? (
            <ul className="sk-wk__items">
              {c.items.map((it) => (
                <li key={it}><span>{it}</span></li>
              ))}
            </ul>
          ) : null}
          {c.go ? (
            <Link className="sk-wk__go" href={c.go.href}>{c.go.label}</Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function IndustryRailsPage({ data, rails }: { data: IndustryData; rails: IndustryRails }) {
  const d = data;
  const r = rails;

  /* 02 · each seat: the persona card's name, the first clause of its value
   * line (what the seat gets, before the ", so" that explains it), and
   * its artifact */
  const roleCells: Cell[] = d.personas.cards
    .filter((p) => r.roles[p.key])
    .map((p) => ({ name: p.name, line: p.value.split(", so ")[0].replace(/\.$/, "") + ".", ...r.roles[p.key] }));

  /* 03 · each coverage cell: the domain's live modules (never "soon") */
  const coverCells: Cell[] = r.coverage.cells.map((c) => {
    const dom = d.coverage.domains.find((x) => x.slug === c.domain);
    return {
      name: dom?.name ?? c.domain,
      line: c.line,
      items: dom?.modules.filter((m) => !m.soon).map((m) => m.name),
      viz: c.viz,
      go: c.go,
    };
  });

  /* 05 · the lead moments, in the order the rails layer names them */
  const lead: UrgentRow[] = r.lead.flatMap((l) => {
    const row = d.triggers.rows.find((t) => t.name === l.name);
    return row ? [{ ...row, viz: l.viz, detail: l.detail, clock: l.clock ?? row.clock }] : [];
  });

  const econ = d.cost.economics;
  const hasTax = econ.annualTaxLow != null && econ.annualTaxHigh != null;

  return (
    <main className="itm dms dms--redesign dms--consistent-eyebrows dms--rails dms-page md-page irt-page">
      <DmsHeader />

      {/* ============================ HERO =============================
        * Two panes between the rails: the copy on the charcoal, the
        * industry's record on the moving wash with its use-case chips. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed md-hero--split" aria-label={d.name}>
        <div className="dms-wrap hm-bleed md-hero2">
          <div className="md-hero2__copy">
            <Eyebrow>Industries · {d.hero.crumb}</Eyebrow>
            <h1 className="dms-hero__title">
              <span className="dms-hero__line">{d.hero.titleLead}</span>
              <span className="dms-hero__line dms-hero__turn">{d.hero.titleTurn}</span>
            </h1>
            <p className="dms-lede dms-hero__sub">{d.hero.sub}</p>
            <div className="dms-hero__ctas">
              <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
              <Link href="/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
            </div>
          </div>
          <div className="md-hero2__visual">
            <IndustryHeroTrace data={r.hero} />
          </div>
        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label="Regulatory frame">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">{r.trust.label}</p>
          <ul className="dms-trust__logos irt-trust__marks" aria-label="Regulatory frame">
            {r.trust.marks.map((m) => (
              <li key={m} className="dms-trust__mark">{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <HatchBand />

      {/* ============================ 01 · THE DIFFERENCE =============== */}
      <section className="dms-section md-sec md-diff hm-railed" id="thesis">
        <div className="dms-wrap">
          <SplitHead n={1} eyebrow="The difference" title={d.difference.heading} lede={d.difference.lede} />
          <TraceThread
            label={d.difference.trailLabel}
            steps={d.difference.trail}
            foot={d.difference.trailFoot}
            kicker={d.difference.mobileLabel}
            title={r.thread.title}
          />
        </div>
      </section>

      <HatchBand />

      {/* 02 · BY YOUR ROLE */}
      <section className="dms-section md-sec md-roles hm-railed" id="by-role">
        <div className="dms-wrap">
          <SplitHead n={2} eyebrow="By your role" title={d.personas.heading} lede={d.personas.lede} />
          <Cells cells={roleCells} compact />
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* 03 · COVERAGE */}
      <section className="dms-section dms-section--alt md-sec md-cov hm-railed" id="modules">
        <div className="dms-wrap">
          <SplitHead n={3} eyebrow="Coverage" title={r.coverage.title} lede={r.coverage.lede} />
          <Cells cells={coverCells} />
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* 04 · VALIDATED STATE */}
      <section className="dms-section md-sec md-val hm-railed" id="validated">
        <div className="dms-wrap">
          <SplitHead n={4} eyebrow={d.validated.eyebrow} title={d.validated.headline} />
          <ul className="md-val__grid">
            {d.validated.points.map((pt) => (
              <li key={pt.label} className="md-val__cell">
                <span className="md-val__icon" aria-hidden="true">{VAL_ICONS[pt.icon]}</span>
                <h3>{pt.label}</h3>
                <p>{pt.body}</p>
              </li>
            ))}
          </ul>
          <div className="md-val__cta">
            <BookDemoButton className="md-textlink" source="validated">{d.validated.cta} &rarr;</BookDemoButton>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* 05 · WHAT'S BREAKING */}
      <section className="dms-section dms-section--dark md-sec md-trigs md-trigs--dark hm-railed" id="whats-breaking">
        <div className="dms-wrap">
          <SplitHead n={5} eyebrow="What's breaking" title={d.triggers.heading} lede={d.triggers.lede} />
          <UrgentBoard rows={lead} />
        </div>
      </section>

      <HatchBand className="hm-hatch--dark" />

      {/* 06 · COST OF INACTION: the per-company tax (Notion Industries row),
        * then the named coordination events, each with what is at risk */}
      <section className="dms-section dms-section--dark md-sec md-cost md-cost--dark hm-railed" id="cost">
        <div className="dms-wrap">
          <SplitHead n={6} eyebrow="Cost of inaction" title={d.cost.heading} />
          <div className={"md-tax" + (hasTax ? "" : " irt-tax--bill-only")}>
            {hasTax ? (
              <div className="md-tax__stat">
                <span className="md-tax__lab">Coordination tax, per company per year</span>
                <p className="md-tax__val">
                  <b>{usdM(econ.annualTaxLow! / econ.companies)}</b>
                  <span>to</span>
                  <b>{usdM(econ.annualTaxHigh! / econ.companies)}</b>
                </p>
                <p className="md-tax__meta">
                  Paid in chasing, handoffs and rework, one coordination event at a time. No budget line
                  carries it, so nobody owns it. {d.cost.stakesMeta}.
                </p>
              </div>
            ) : null}
            <div className="md-tax__wash">
              <div className="md-tax__bill irt-bill">
                <header>
                  <span>Coordination event</span>
                  <span>What&rsquo;s at risk</span>
                </header>
                <ul>
                  {d.cost.events.map((v) => (
                    <li key={v.name}>
                      <span className="md-tax__ev">
                        <b>{v.name}</b>
                        <small>{v.owner}</small>
                      </span>
                      <span className="md-tax__amt irt-bill__risk">{v.atRisk}</span>
                    </li>
                  ))}
                </ul>
                <footer>Every instance, every team. None of it on a budget line.</footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--dark" />

      {/* 07 · PROOF: the evidence standard, stated honestly */}
      <section className="dms-section dms-section--dark md-sec irt-evid hm-railed" id="proof">
        <div className="dms-wrap">
          <SplitHead n={7} eyebrow="Proof" title={d.proof.heading} lede={d.proof.lede} />
          <ol className="irt-evid__grid">
            {d.proof.points.map((p, i) => (
              <li key={p} className="irt-evid__cell">
                <span className="irt-evid__n">{String(i + 1).padStart(2, "0")}</span>
                <p>{p}</p>
              </li>
            ))}
          </ol>
          <p className="irt-evid__note">
            <span className="irt-evid__dot" aria-hidden="true" />
            {d.proof.maturityNote}
          </p>
        </div>
      </section>

      <HatchBand className="hm-hatch--dark" />

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close hm-close--rails hm-railed" id="demo" aria-labelledby="irt-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid">
            <div className="dms-close__convergence" aria-hidden="true">
              <div className="dms-close__mark">
                <svg viewBox="0 2.2 21 22" fill="none">
                  <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                  <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                </svg>
              </div>
            </div>
            <div className="dms-close__lead">
              <Eyebrow>{d.close.eyebrow}</Eyebrow>
              <h2 className="dms-close__h" id="irt-close-h">{d.close.heading}</h2>
              <p className="dms-lede">{d.close.lede}</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline="The decision trace for regulated operations." note={`Industries · ${d.name}`} />
    </main>
  );
}
