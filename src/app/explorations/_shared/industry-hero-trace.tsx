"use client";

/* ============================================================================
 * industry-hero-trace.tsx - the industry hero visual, data-driven (23 Sep
 * 2026). First built for Medical Devices after luthor.ai/solutions/
 * marketing-teams ("keeping the gradient container, one key visual for the
 * industry and how Unifize helps them ... one key element that is animated
 * and some decorative elements that highlight the industry specific use
 * cases").
 *
 * Abhishek, same day, on the fan-out: "the hero visuals all look the same".
 * So the key element is one of several precise mini-UIs, each drawn from
 * the moment its industry's Notion row leads with, never a relabelled copy:
 *   change    MD: one change carried to every record it touches
 *   batch     pharma: the executed batch record under review, an OOS
 *             exception opening a deviation, the QP release stamp
 *   sponsors  CROs: the multi-sponsor board, a deviation in one sponsor's
 *             study, that sponsor's audit seeing only its own evidence
 *   control   labs: the QC control chart, a 1-3s breach opening the
 *             nonconformance, the points back in control
 *   formula   chemicals: the formulation's composition, one component's
 *             supplier changing, the change fanning out to the SDS, the
 *             REACH dossier and the customer notice
 * Around it the four quiet chips (regulatory frame, a cascade that wakes on
 * its moment, a statutory clock, the sealed trace that wakes on release),
 * placed per kind so the compositions differ too.
 *
 * Renders `.dms-heroarc__stage`, so the moving wash (light ground, blue and
 * peach blobs) comes from dms-rails.css unchanged. Styles:
 * industry-hero-trace.css.
 * ========================================================================== */
import { useEffect, useRef, useState, type ReactNode } from "react";
import "./industry-hero-trace.css";

/* ------------------------------------------------------------------ data */
type Chips = {
  frame: { cap: string; items: string[] };
  /** wakes on the key element's cascade moment; `big` shows a figure */
  cascade: { cap: string; off: string; on: string; note: string; big?: { off: string; on: string } };
  /** `day`/`span` draw a ring with the day in it; without them, a clock */
  clock: { cap: string; line: string; day?: number; span?: number };
  seal: { cap: string; off: string; on: string };
  /** the one-sentence description for screen readers */
  aria: string;
};

type Head = { id: string; title: string; from: string; sign: { idle: string; done: string }; approvers: { initials?: string[]; label: string } };

export type HeroTraceRow = { rec: string; ref: string; fn: string; done: string };

export type ChangeHero = Chips &
  Head & {
    kind?: "change";
    stages: { assess: string; review: string; signing: string; released: string };
    rows: HeroTraceRow[];
    /** the row whose binding wakes the cascade chip */
    cascadeRow: number;
  };

export type BatchHero = Chips &
  Head & {
    kind: "batch";
    stages: { review: string; exception: string; investigation: string; qp: string; released: string };
    /** the batch record's sections, in review order */
    rows: { label: string; ref: string }[];
    /** the section that throws the exception, and what it shows */
    exception: { row: number; label: string; closed: string };
    /** the deviation that opens beside it, step by step (the last wakes the cascade) */
    deviation: { head: string; steps: { label: string; meta: string }[] };
    stamp: { main: string; sub: string };
  };

export type SponsorsHero = Chips &
  Head & {
    kind: "sponsors";
    stages: { open: string; investigation: string; audit: string; released: string };
    sponsors: { name: string; studies: string[] }[];
    /** where the deviation lands */
    hit: { sponsor: number; study: number; label: string };
    steps: { label: string; meta: string }[];
    /** the step that wakes the cascade chip */
    cascadeStep: number;
    request: string;
    locked: string;
    packet: string;
  };

export type ControlHero = Chips &
  Head & {
    kind: "control";
    stages: { run: string; breach: string; action: string; released: string };
    /** results in standard deviations from the mean, one per tick */
    points: number[];
    /** index of the result that breaks the rule */
    breach: number;
    rule: string;
    steps: { label: string; meta: string }[];
    cascadeStep: number;
    effective: string;
  };

export type FormulaHero = Chips &
  Head & {
    kind: "formula";
    stages: { detect: string; impact: string; review: string; released: string };
    /** the composition, shares in percent (illustrative, summing to 100) */
    parts: { name: string; share: number }[];
    /** the component that changes, and what the flag says */
    changed: { part: number; note: string };
    /** the documents the change reaches, in order; `ghs` draws the hazard
     *  diamond, `dossier` a bound register, `notice` an envelope */
    outputs: { doc: string; glyph: "ghs" | "dossier" | "notice"; before: string; after: string }[];
    /** the output that wakes the cascade chip */
    cascadeOutput: number;
  };

export type HeroTraceData = ChangeHero | BatchHero | SponsorsHero | ControlHero | FormulaHero;

/* ------------------------------------------------------------ the clocks
 * Every kind runs on the same tick; each lays out its own beats and says
 * when the cascade wakes and when the record is released. */
const TICK = 820;
const HOLD = 5;

type Beats = { end: number; cascadeAt: number; releaseAt: number };

function changeBeats(d: ChangeHero) {
  const first = 2;
  const review = first + d.rows.length + 1;
  const sign = review + 2;
  const release = sign + 2;
  return { first, review, sign, release, end: release + HOLD, cascadeAt: first + d.cascadeRow, releaseAt: release };
}

function batchBeats(d: BatchHero) {
  let k = 2;
  const reviewedAt: number[] = [];
  for (let i = 0; i < d.exception.row; i++) reviewedAt[i] = k++;
  const flagAt = k++;
  const devAt = d.deviation.steps.map(() => k++);
  const resolveAt = k++;
  reviewedAt[d.exception.row] = resolveAt;
  for (let i = d.exception.row + 1; i < d.rows.length; i++) reviewedAt[i] = k++;
  const qpAt = k++;
  const signAt = k++;
  k++;
  const releaseAt = k;
  return { reviewedAt, flagAt, devAt, resolveAt, qpAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: devAt[devAt.length - 1] };
}

function sponsorsBeats(d: SponsorsHero) {
  const hitAt = 2;
  const stepAt = d.steps.map((_, i) => hitAt + 1 + i);
  const requestAt = hitAt + d.steps.length + 1;
  const lockAt = requestAt + 1;
  const packetAt = lockAt + 1;
  const signAt = packetAt + 1;
  const releaseAt = signAt + 2;
  return { hitAt, stepAt, requestAt, lockAt, packetAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: stepAt[d.cascadeStep] };
}

function controlBeats(d: ControlHero) {
  const shownAt: number[] = [];
  let k = 0;
  for (let i = 0; i <= d.breach; i++) shownAt[i] = k++;
  const stepAt = d.steps.map(() => k++);
  for (let i = d.breach + 1; i < d.points.length; i++) shownAt[i] = k++;
  const effectiveAt = k++;
  const signAt = k++;
  const releaseAt = k + 1;
  return { shownAt, stepAt, effectiveAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: stepAt[d.cascadeStep] };
}

function formulaBeats(d: FormulaHero) {
  const flagAt = 2;
  const outAt = d.outputs.map((_, i) => flagAt + 1 + i);
  const reviewAt = flagAt + d.outputs.length + 1;
  const signAt = reviewAt + 2;
  const releaseAt = signAt + 2;
  return { flagAt, outAt, reviewAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: outAt[d.cascadeOutput] };
}

function beatsOf(d: HeroTraceData): Beats {
  if (d.kind === "formula") return formulaBeats(d);
  if (d.kind === "batch") return batchBeats(d);
  if (d.kind === "sponsors") return sponsorsBeats(d);
  if (d.kind === "control") return controlBeats(d);
  return changeBeats(d);
}

/* ---------------------------------------------------------------- pieces */
function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.4 6.6 11.4 12.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CardHead({ d, phase, stage }: { d: Head; phase: string; stage: string }) {
  return (
    <>
      <header className="mdt-card__head">
        <span className="mdt-card__id">{d.id}</span>
        <span className={`mdt-card__stage is-${phase}`}>
          <i />
          <span key={stage}>{stage}</span>
        </span>
      </header>
      <h3 className="mdt-card__title">{d.title}</h3>
      <p className="mdt-card__from">{d.from}</p>
    </>
  );
}

function CardFoot({ d, phase, released }: { d: Head; phase: string; released: boolean }) {
  return (
    <footer className="mdt-card__foot">
      <span className="mdt-card__who">
        {d.approvers.initials?.map((a) => (
          <span className="mdt-av" key={a}>{a}</span>
        ))}
        <span className={"mdt-card__whotext" + (d.approvers.initials?.length ? "" : " is-bare")}>{d.approvers.label}</span>
      </span>
      <span className={`mdt-sign is-${phase}`}>
        {released ? (
          <>
            <Check /> {d.sign.done}
          </>
        ) : (
          d.sign.idle
        )}
      </span>
    </footer>
  );
}

/* ---------------------------------------------- change (medical devices) */
function ChangeCard({ d, t }: { d: ChangeHero; t: number }) {
  const b = changeBeats(d);
  const n = d.rows.length;
  const bound = Math.max(0, Math.min(n, t - b.first + 1));
  const phase = t >= b.release ? "released" : t >= b.sign ? "signed" : t >= b.review ? "review" : "assess";
  const stage = { released: d.stages.released, signed: d.stages.signing, review: d.stages.review, assess: d.stages.assess }[phase];
  return (
    <article className="mdt-card" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mdt-card__label">
        <span>Affected records</span>
        <span className="mdt-card__count">
          {bound} of {n} linked
        </span>
      </div>
      <div className="mdt-card__bar">
        <span style={{ transform: `scaleX(${bound / n})` }} />
      </div>
      <ul className="mdt-rows">
        {d.rows.map((r, i) => {
          const on = i < bound;
          const live = i === bound - 1 && phase === "assess";
          return (
            <li key={r.rec} className={`mdt-row${on ? " is-on" : ""}${live ? " is-live" : ""}`}>
              <span className="mdt-row__tick">{on ? <Check /> : null}</span>
              <span className="mdt-row__text">
                <b>{r.rec}</b>
                <span>{r.ref}</span>
              </span>
              <span className="mdt-row__fn">{r.fn}</span>
              <span className="mdt-row__state">{on ? r.done : "Open"}</span>
            </li>
          );
        })}
      </ul>
      <CardFoot d={d} phase={phase} released={phase === "released"} />
    </article>
  );
}

/* ------------------------------------------------------ batch (pharma) */
function BatchCard({ d, t }: { d: BatchHero; t: number }) {
  const b = batchBeats(d);
  const released = t >= b.releaseAt;
  const phase = released
    ? "released"
    : t >= b.signAt
      ? "signed"
      : t >= b.qpAt
        ? "review"
        : t >= b.flagAt && t < b.resolveAt
          ? "exception"
          : "assess";
  const stage = released
    ? d.stages.released
    : t >= b.qpAt
      ? d.stages.qp
      : t >= b.devAt[0] && t < b.resolveAt
        ? d.stages.investigation
        : t >= b.flagAt && t < b.resolveAt
          ? d.stages.exception
          : d.stages.review;
  const devOpen = t >= b.flagAt;
  return (
    <article className="mdt-card mdt-card--batch" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <ol className="mhb-rows">
        {d.rows.map((r, i) => {
          const isEx = i === d.exception.row;
          const flagged = isEx && t >= b.flagAt && t < b.resolveAt;
          const done = t >= b.reviewedAt[i];
          return (
            <li key={r.label} className={"mhb-row" + (done ? " is-on" : "") + (flagged ? " is-flag" : "")}>
              <span className="mhb-row__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="mhb-row__text">
                <b>{r.label}</b>
                <span>{r.ref}</span>
              </span>
              <span className="mhb-row__state">
                {flagged ? (
                  <>
                    <i className="mhb-dot" />
                    {d.exception.label}
                  </>
                ) : done ? (
                  <>
                    <Check />
                    {isEx ? d.exception.closed : "Reviewed"}
                  </>
                ) : (
                  "Pending"
                )}
              </span>
            </li>
          );
        })}
      </ol>

      <div className={"mhb-dev" + (devOpen ? " is-open" : "")}>
        <div className="mhb-dev__inner">
          <span className="mhb-dev__head">{d.deviation.head}</span>
          <ul>
            {d.deviation.steps.map((s, i) => {
              const on = t >= b.devAt[i];
              return (
                <li key={s.label} className={on ? "is-on" : undefined}>
                  <span className="mdt-row__tick">{on ? <Check /> : null}</span>
                  <b>{s.label}</b>
                  <small>{s.meta}</small>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <CardFoot d={d} phase={phase} released={released} />

      <div className={"mhb-stamp" + (released ? " is-on" : "")}>
        <b>{d.stamp.main}</b>
        <small>{d.stamp.sub}</small>
      </div>
    </article>
  );
}

/* ------------------------------------------------------ sponsors (CROs) */
function SponsorsCard({ d, t }: { d: SponsorsHero; t: number }) {
  const b = sponsorsBeats(d);
  const released = t >= b.releaseAt;
  const phase = released ? "released" : t >= b.signAt ? "signed" : t >= b.requestAt ? "review" : t >= b.hitAt ? "exception" : "assess";
  const stage = released
    ? d.stages.released
    : t >= b.requestAt
      ? d.stages.audit
      : t >= b.stepAt[0]
        ? d.stages.investigation
        : d.stages.open;
  const hit = t >= b.hitAt;
  const locked = t >= b.lockAt;
  return (
    <article className="mdt-card mdt-card--sponsors" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mhs-board">
        {d.sponsors.map((s, si) => {
          const mine = si === d.hit.sponsor;
          return (
            <div key={s.name} className={"mhs-col" + (mine && locked ? " is-mine" : "") + (!mine && locked ? " is-locked" : "")}>
              <span className="mhs-col__name">
                {s.name}
                {!mine && locked ? <Lock /> : null}
              </span>
              {s.studies.map((st, i) => {
                const isHit = mine && i === d.hit.study;
                return (
                  <span key={st} className={"mhs-study" + (isHit && hit ? (released ? " is-done" : " is-hit") : "")}>
                    <i />
                    {st}
                  </span>
                );
              })}
              {!mine ? <span className="mhs-col__lock">{d.locked}</span> : null}
            </div>
          );
        })}
      </div>

      <div className={"mhs-case" + (hit ? " is-open" : "")}>
        <span className="mhs-case__head">{d.hit.label}</span>
        <ul>
          {d.steps.map((s, i) => {
            const on = t >= b.stepAt[i];
            return (
              <li key={s.label} className={on ? "is-on" : undefined}>
                <span className="mdt-row__tick">{on ? <Check /> : null}</span>
                <b>{s.label}</b>
                <small>{s.meta}</small>
              </li>
            );
          })}
        </ul>
        <div className={"mhs-req" + (t >= b.requestAt ? " is-on" : "")}>
          <span className="mhs-req__msg">{d.request}</span>
          <span className={"mhs-req__packet" + (t >= b.packetAt ? " is-on" : "")}>
            <Check />
            {d.packet}
          </span>
        </div>
      </div>

      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* ------------------------------------------------------ control (labs) */
const CH = { w: 360, h: 150, x0: 34, x1: 348, mid: 75, sd: 20 };
const yOf = (sd: number) => CH.mid - sd * CH.sd;

function ControlCard({ d, t }: { d: ControlHero; t: number }) {
  const b = controlBeats(d);
  const released = t >= b.releaseAt;
  const breached = t >= b.shownAt[d.breach];
  const phase = released
    ? "released"
    : t >= b.signAt
      ? "signed"
      : t >= b.effectiveAt
        ? "review"
        : breached
          ? "exception"
          : "assess";
  const stage = released ? d.stages.released : t >= b.stepAt[0] ? d.stages.action : breached ? d.stages.breach : d.stages.run;
  const n = d.points.length;
  const xOf = (i: number) => CH.x0 + ((CH.x1 - CH.x0) * i) / (n - 1);
  const shown = d.points.map((_, i) => t >= b.shownAt[i]);
  const path = d.points
    .map((p, i) => (shown[i] ? `${xOf(i).toFixed(1)},${yOf(p).toFixed(1)}` : null))
    .filter(Boolean)
    .join(" ");
  const lines: { sd: number; lab: string; cls: string }[] = [
    { sd: 3, lab: "+3s", cls: "is-limit" },
    { sd: 2, lab: "+2s", cls: "is-warn" },
    { sd: 0, lab: "Mean", cls: "is-mid" },
    { sd: -2, lab: "-2s", cls: "is-warn" },
    { sd: -3, lab: "-3s", cls: "is-limit" },
  ];
  const bx = xOf(d.breach);
  const by = yOf(d.points[d.breach]);
  return (
    <article className="mdt-card mdt-card--control" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mhc-chart">
        <svg viewBox={`0 0 ${CH.w} ${CH.h}`}>
          {lines.map((l) => (
            <g key={l.lab} className={"mhc-line " + l.cls}>
              <line x1={CH.x0 - 4} x2={CH.x1 + 6} y1={yOf(l.sd)} y2={yOf(l.sd)} />
              <text x={0} y={yOf(l.sd) + 3}>{l.lab}</text>
            </g>
          ))}
          <polyline className="mhc-path" points={path} />
          {d.points.map((p, i) =>
            shown[i] ? (
              <circle
                key={i}
                className={"mhc-pt" + (i === d.breach ? " is-breach" : "") + (i > d.breach ? " is-after" : "")}
                cx={xOf(i)}
                cy={yOf(p)}
                r={i === d.breach ? 4.2 : 3}
              />
            ) : null,
          )}
          {breached ? (
            <g className={"mhc-flag" + (released ? " is-closed" : "")}>
              <circle cx={bx} cy={by} r={9} />
              <rect x={bx - 58} y={by - 9} width={42} height={16} />
              <text x={bx - 37} y={by + 3}>{d.rule}</text>
            </g>
          ) : null}
        </svg>
      </div>

      <ul className={"mhc-steps" + (breached ? " is-open" : "")}>
        {d.steps.map((s, i) => {
          const on = t >= b.stepAt[i];
          return (
            <li key={s.label} className={on ? "is-on" : undefined}>
              <span className="mdt-row__tick">{on ? <Check /> : null}</span>
              <b>{s.label}</b>
              <small>{s.meta}</small>
            </li>
          );
        })}
        <li className={"mhc-steps__eff" + (t >= b.effectiveAt ? " is-on" : "")}>
          <span className="mdt-row__tick">{t >= b.effectiveAt ? <Check /> : null}</span>
          <b>{d.effective}</b>
          <small>{t >= b.effectiveAt ? "In control" : "Next results"}</small>
        </li>
      </ul>

      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* -------------------------------------------------- formula (chemicals) */
function DocGlyph({ kind }: { kind: "ghs" | "dossier" | "notice" }) {
  if (kind === "ghs")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mhf-glyph mhf-glyph--ghs">
        <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
        <path d="M12 8.2v5.2M12 15.6v.4" />
      </svg>
    );
  if (kind === "dossier")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mhf-glyph">
        <rect x="5" y="3.5" width="14" height="17" />
        <path d="M8.5 3.5v17M11 8h5M11 11h5M11 14h3" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mhf-glyph">
      <rect x="3.5" y="6" width="17" height="12" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

function FormulaCard({ d, t }: { d: FormulaHero; t: number }) {
  const b = formulaBeats(d);
  const released = t >= b.releaseAt;
  const flagged = t >= b.flagAt;
  const phase = released ? "released" : t >= b.signAt ? "signed" : t >= b.reviewAt ? "review" : flagged ? "exception" : "assess";
  const stage = released ? d.stages.released : t >= b.reviewAt ? d.stages.review : t >= b.outAt[0] ? d.stages.impact : d.stages.detect;
  /* where the changed segment's centre sits, for the fan's origin */
  const before = d.parts.slice(0, d.changed.part).reduce((a, p) => a + p.share, 0);
  const cx = before + d.parts[d.changed.part].share / 2;
  const n = d.outputs.length;
  return (
    <article className="mdt-card mdt-card--formula" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mdt-card__label">
        <span>Composition</span>
        <span className={"mhf-flagnote" + (flagged ? " is-on" : "")}>{d.changed.note}</span>
      </div>
      <div className="mhf-bar">
        {d.parts.map((p, i) => (
          <span
            key={p.name}
            className={"mhf-seg mhf-seg--" + i + (i === d.changed.part && flagged ? (released ? " is-done" : " is-flag") : "")}
            style={{ flexBasis: p.share + "%" }}
          />
        ))}
      </div>
      <ul className="mhf-legend">
        {d.parts.map((p, i) => (
          <li key={p.name} className={i === d.changed.part && flagged ? "is-flag" : undefined}>
            <i className={"mhf-seg--" + i} />
            {p.name}
            <small>{p.share}%</small>
          </li>
        ))}
      </ul>

      {/* the fan: from the changed component down to each document */}
      <svg className="mhf-fan" viewBox="0 0 100 40" preserveAspectRatio="none">
        {d.outputs.map((o, i) => {
          const x = ((i + 0.5) / n) * 100;
          const on = t >= b.outAt[i];
          return <path key={o.doc} className={on ? "is-on" : undefined} d={`M${cx} 0 C ${cx} 22, ${x} 18, ${x} 40`} />;
        })}
      </svg>

      <ul className="mhf-docs">
        {d.outputs.map((o, i) => {
          const on = t >= b.outAt[i];
          return (
            <li key={o.doc} className={"mhf-doc" + (on ? " is-on" : "")}>
              <DocGlyph kind={o.glyph} />
              <b>{o.doc}</b>
              <small>
                {on ? <Check /> : null}
                {on ? o.after : o.before}
              </small>
            </li>
          );
        })}
      </ul>

      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* ------------------------------------------------------------ the shell */
export function IndustryHeroTrace({ data }: { data: HeroTraceData }) {
  const d = data;
  const beats = beatsOf(d);
  const T_END = beats.end;

  const rootRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(T_END - 1); // SSR / reduced motion: the finished record

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = () => {
      if (timer) return;
      timer = window.setInterval(() => setT((v) => (v + 1) % T_END), TICK);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    setT(0);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(root);
    return () => {
      io.disconnect();
      stop();
    };
  }, [T_END]);

  const cascadeOn = t >= beats.cascadeAt;
  const released = t >= beats.releaseAt;
  const ring = d.clock.day != null && d.clock.span ? d.clock.day / d.clock.span : null;
  const kind = d.kind ?? "change";

  let card: ReactNode;
  if (d.kind === "formula") card = <FormulaCard d={d} t={t} />;
  else if (d.kind === "batch") card = <BatchCard d={d} t={t} />;
  else if (d.kind === "sponsors") card = <SponsorsCard d={d} t={t} />;
  else if (d.kind === "control") card = <ControlCard d={d} t={t} />;
  else card = <ChangeCard d={d} t={t} />;

  return (
    <div className="dms-heroarc__stage mdt" ref={rootRef}>
      <div className="mdt__grain" aria-hidden="true" />
      <div className={`mdt__scene mdt__scene--${kind}`} role="img" aria-label={d.aria}>
        {/* ------------------------------------------------ the key element */}
        {card}

        {/* -------------------------------------------- the use-case chips */}
        <div className="mdt-chip mdt-chip--frame" aria-hidden="true">
          <span className="mdt-chip__cap">{d.frame.cap}</span>
          {d.frame.items.map((s) => (
            <span className="mdt-toggle" key={s}>
              <i />
              {s}
            </span>
          ))}
        </div>

        <div className={`mdt-chip mdt-chip--train${cascadeOn ? " is-on" : ""}`} aria-hidden="true">
          <span className="mdt-chip__cap">{d.cascade.cap}</span>
          {d.cascade.big ? (
            <span className="mdt-chip__big">
              {cascadeOn ? d.cascade.big.on : d.cascade.big.off}
              <small> {cascadeOn ? d.cascade.on : d.cascade.off}</small>
            </span>
          ) : (
            <span className="mdt-chip__state">
              <span className="mdt-chip__dot" />
              {cascadeOn ? d.cascade.on : d.cascade.off}
            </span>
          )}
          <span className="mdt-chip__note">{d.cascade.note}</span>
        </div>

        <div className="mdt-chip mdt-chip--mdr" aria-hidden="true">
          <span className="mdt-ring">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" />
              {ring != null ? (
                <circle cx="18" cy="18" r="15" className="mdt-ring__arc" style={{ strokeDashoffset: 94.25 * (1 - ring) }} />
              ) : null}
            </svg>
            {ring != null ? (
              <b>{d.clock.day}</b>
            ) : (
              <svg className="mdt-ring__glyph" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 4.5V8l2.4 1.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className="mdt-chip__stack">
            <span className="mdt-chip__cap">{d.clock.cap}</span>
            <span className="mdt-chip__line">{d.clock.line}</span>
          </span>
        </div>

        <div className={`mdt-chip mdt-chip--seal${released ? " is-on" : ""}`} aria-hidden="true">
          <span className="mdt-seal">
            <Check />
          </span>
          <span className="mdt-chip__stack">
            <span className="mdt-chip__cap">{d.seal.cap}</span>
            <span className="mdt-chip__line">{released ? d.seal.on : d.seal.off}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
