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
 *   file      cosmetics: the per-SKU safety substantiation file a retailer
 *             audit asks for, one supplier COA missing, requested and
 *             received across the supplier boundary, the file complete
 *   trace     food: the lot genealogy, a supplier's notice on one ingredient
 *             lot traced forward through the runs to every finished lot,
 *             each held, the reporting decision put on the record
 *   identity  supplements: the incoming identity test, the lot's fingerprint
 *             drawn over the reference, an unmatched band held and the lot
 *             rejected, the replacement lot matching and released
 *   eightd    automotive: a warranty return run through the eight
 *             disciplines, containment across every place the suspect stock
 *             sits, the control plan updated, the 8D closed with the OEM
 *   fai       aerospace: an AS9102 first article, the three forms, the
 *             ballooned drawing measured characteristic by characteristic,
 *             one key characteristic out, through MRB, re-measured, signed
 *   fat       machinery: the customer-witnessed FAT protocol on the build's
 *             milestone track, the qualification documents short, a punch
 *             item raised and closed, the machine accepted and on to ship
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

export type FileHero = Chips &
  Head & {
    kind: "file";
    stages: { assemble: string; gap: string; review: string; released: string };
    /** the evidence the file holds, one tile each, with the function behind it */
    tiles: { name: string; fn: string }[];
    /** the tile that is missing, what it says while open and once closed */
    gap: { tile: number; label: string; closed: string };
    /** the exchange that closes it, across the supplier boundary */
    request: { org: string; text: string; ext?: boolean }[];
  };

export type TraceHero = Chips &
  Head & {
    kind: "trace";
    stages: { notice: string; trace: string; decide: string; released: string };
    /** the genealogy, one column per level; every node after the first
     *  level names its parent in the level before (`from`) */
    levels: { cap: string; nodes: { name: string; sub: string; done: string; from?: number }[] }[];
    /** what the flag on the source lot says */
    flag: string;
    /** the reporting decision recorded once the scope is bound */
    decision: { label: string; idle: string; done: string };
  };

export type IdentityHero = Chips &
  Head & {
    kind: "identity";
    stages: { testing: string; mismatch: string; retest: string; released: string };
    /** the chart's caption and the two lines' names */
    method: string;
    legend: { reference: string; sample: string };
    /** the reference fingerprint as bands (x and width 0..1, height 0..1) */
    bands: { x: number; h: number; w: number }[];
    /** the band the first lot carries that the reference does not */
    extra: { x: number; h: number; w: number; label: string };
    /** what happens once it is flagged (the first wakes the cascade) */
    steps: { label: string; meta: string }[];
    /** the replacement lot's line under the chart */
    lots: { first: string; second: string; match: string };
  };

export type EightDHero = Chips &
  Head & {
    kind: "eightd";
    stages: { opened: string; contain: string; solve: string; released: string };
    /** the disciplines in order, D1 to D8 */
    disciplines: { code: string; label: string }[];
    /** the discipline that opens the containment panel, and where the
     *  suspect stock sits (each contained one tick after the last) */
    containment: { at: number; cap: string; sites: { name: string; off: string; on: string }[] };
    /** the discipline that wakes the cascade chip */
    cascadeAt: number;
    /** the customer's copy, submitted when the last discipline closes */
    response: { label: string; idle: string; done: string };
  };

export type FaiHero = Chips &
  Head & {
    kind: "fai";
    stages: { forms: string; measure: string; mrb: string; released: string };
    /** the AS9102 forms, in order; the last closes with the characteristics */
    forms: { code: string; label: string }[];
    /** the form that wakes the cascade chip when it closes */
    cascadeForm: number;
    /** the ballooned characteristic that measures out (1-based, of six), and
     *  what its balloon tag says out and back in */
    fail: { balloon: number; out: string; back: string };
    /** what happens to it before it is re-measured */
    steps: { label: string; meta: string }[];
  };

export type FatHero = Chips &
  Head & {
    kind: "fat";
    stages: { run: string; punch: string; witness: string; released: string };
    /** the build's milestones; `at` is the one being accepted */
    milestones: string[];
    at: number;
    /** the protocol's tests, in order */
    tests: { name: string; ref: string }[];
    /** the test that comes up short, and what its result says */
    fail: { row: number; out: string; back: string };
    /** the punch item that closes it */
    punch: { label: string; meta: string }[];
    /** the two sides of the witness column */
    witness: string;
  };

export type HeroTraceData = ChangeHero | BatchHero | SponsorsHero | ControlHero | FormulaHero | FileHero | TraceHero | IdentityHero | EightDHero | FaiHero | FatHero;

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

function fileBeats(d: FileHero) {
  const flagAt = 2;
  const doneAt: number[] = [];
  let k = flagAt + 1;
  d.tiles.forEach((_, i) => {
    if (i !== d.gap.tile) doneAt[i] = k++;
  });
  /* the other tiles fill while the request is out; its answer closes the gap */
  const resolveAt = k;
  doneAt[d.gap.tile] = resolveAt;
  const last = d.request.length - 1;
  const reqAt = d.request.map((_, i) => (i === last ? resolveAt : flagAt + i * 2));
  const signAt = resolveAt + 2;
  const releaseAt = signAt + 2;
  return { flagAt, reqAt, doneAt, resolveAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: resolveAt + 1 };
}

function traceBeats(d: TraceHero) {
  const flagAt = 2;
  let k = flagAt + 1;
  /* level 0 is the flagged source; the rest light up one node per tick */
  const nodeAt = d.levels.map((l, li) => l.nodes.map(() => (li === 0 ? flagAt : k++)));
  const decisionAt = k++;
  const signAt = k++;
  const releaseAt = k + 1;
  const last = nodeAt[nodeAt.length - 1];
  return { flagAt, nodeAt, decisionAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: last[last.length - 1] };
}

function identityBeats(d: IdentityHero) {
  const drawFrom = 1;
  const DRAW = 4;
  const flagAt = drawFrom + DRAW;
  const stepAt = d.steps.map((_, i) => flagAt + 1 + i);
  const redrawFrom = flagAt + d.steps.length + 1;
  const matchAt = redrawFrom + 2;
  const signAt = matchAt + 1;
  const releaseAt = signAt + 2;
  return { drawFrom, DRAW, flagAt, stepAt, redrawFrom, matchAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: stepAt[0] };
}

function eightdBeats(d: EightDHero) {
  const openAt = 1;
  const dAt: number[] = [];
  const siteAt: number[] = [];
  let k = openAt + 1;
  /* containment opens when its discipline starts and closes only once every
   * place the stock sits is contained */
  let panelAt = 0;
  d.disciplines.forEach((_, i) => {
    if (i === d.containment.at) {
      panelAt = k;
      d.containment.sites.forEach(() => siteAt.push(k++));
    }
    dAt[i] = k++;
  });
  const responseAt = dAt[dAt.length - 1];
  const signAt = responseAt + 1;
  const releaseAt = signAt + 2;
  return { openAt, dAt, siteAt, panelAt, responseAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: dAt[d.cascadeAt] };
}

/* the drawing's six balloons: where each sits, and the feature its leader
 * points at (a machined L-bracket, 400 x 170) */
const FAI_BALLOONS = [
  { x: 110, y: 24, tx: 62, ty: 62 },
  { x: 150, y: 70, tx: 118, ty: 118 },
  { x: 232, y: 70, tx: 202, ty: 118 },
  { x: 340, y: 88, tx: 306, ty: 118 },
  { x: 334, y: 156, tx: 300, ty: 148 },
  { x: 16, y: 20, tx: 24, ty: 52 },
];

function faiBeats(d: FaiHero) {
  const formAt = d.forms.map((_, i) => 2 + i);
  const last = d.forms.length - 1;
  let k = formAt[last - 1] + 1;
  const balloonAt: number[] = [];
  const stepAt: number[] = [];
  let flagAt = 0;
  let backAt = 0;
  FAI_BALLOONS.forEach((_, i) => {
    balloonAt[i] = k++;
    if (i === d.fail.balloon - 1) {
      flagAt = balloonAt[i];
      d.steps.forEach(() => stepAt.push(k++));
      backAt = stepAt[stepAt.length - 1];
    }
  });
  formAt[last] = k - 1;
  const signAt = k;
  const releaseAt = signAt + 2;
  return { formAt, balloonAt, stepAt, flagAt, backAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: formAt[d.cascadeForm] };
}

function fatBeats(d: FatHero) {
  let k = 2;
  const testAt: number[] = [];
  const punchAt: number[] = [];
  let flagAt = 0;
  let backAt = 0;
  d.tests.forEach((_, i) => {
    testAt[i] = k++;
    if (i === d.fail.row) {
      flagAt = testAt[i];
      d.punch.forEach(() => punchAt.push(k++));
      backAt = punchAt[punchAt.length - 1];
    }
  });
  const signAt = k;
  const releaseAt = signAt + 2;
  return { testAt, punchAt, flagAt, backAt, signAt, releaseAt, end: releaseAt + HOLD, cascadeAt: releaseAt };
}

function beatsOf(d: HeroTraceData): Beats {
  if (d.kind === "fat") return fatBeats(d);
  if (d.kind === "fai") return faiBeats(d);
  if (d.kind === "eightd") return eightdBeats(d);
  if (d.kind === "identity") return identityBeats(d);
  if (d.kind === "trace") return traceBeats(d);
  if (d.kind === "file") return fileBeats(d);
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

/* ------------------------------------------ file (cosmetics) */
function FileCard({ d, t }: { d: FileHero; t: number }) {
  const b = fileBeats(d);
  const released = t >= b.releaseAt;
  const open = t >= b.flagAt && t < b.resolveAt;
  const phase = released ? "released" : t >= b.signAt ? "signed" : t >= b.resolveAt ? "review" : open ? "exception" : "assess";
  const stage = released ? d.stages.released : t >= b.resolveAt ? d.stages.review : open ? d.stages.gap : d.stages.assemble;
  const n = d.tiles.length;
  const inFile = d.tiles.filter((_, i) => t >= b.doneAt[i]).length;
  return (
    <article className="mdt-card mdt-card--file" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mdt-card__label">
        <span>Evidence</span>
        <span className="mdt-card__count">
          {inFile} of {n} in file
        </span>
      </div>
      <div className="mhk-meter">
        {d.tiles.map((tile, i) => (
          <span
            key={tile.name}
            className={t >= b.doneAt[i] ? "is-on" : i === d.gap.tile && open ? "is-flag" : undefined}
          />
        ))}
      </div>
      <ul className="mhk-grid">
        {d.tiles.map((tile, i) => {
          const done = t >= b.doneAt[i];
          const flagged = i === d.gap.tile && open;
          return (
            <li key={tile.name} className={"mhk-tile" + (done ? " is-on" : "") + (flagged ? " is-flag" : "")}>
              <span className="mhk-tile__top">
                <span className="mdt-row__tick">{done ? <Check /> : null}</span>
                <small>{tile.fn}</small>
              </span>
              <b>{tile.name}</b>
              <span className="mhk-tile__state">
                {flagged ? d.gap.label : done ? (i === d.gap.tile ? d.gap.closed : "In file") : "Pending"}
              </span>
            </li>
          );
        })}
      </ul>

      <ol className={"mhk-req" + (t >= b.flagAt ? " is-open" : "")}>
        {d.request.map((m, i) => (
          <li key={m.text} className={(t >= b.reqAt[i] ? "is-on" : "") + (m.ext ? " is-ext" : "")}>
            <span className="mhk-req__org">{m.org}</span>
            <span className="mhk-req__text">{m.text}</span>
          </li>
        ))}
      </ol>

      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* ------------------------------------------------- trace (food processing) */
const TG = { w: 400, h: 176, colW: 116, nodeH: 42 };

function TraceCard({ d, t }: { d: TraceHero; t: number }) {
  const b = traceBeats(d);
  const released = t >= b.releaseAt;
  const phase = released ? "released" : t >= b.signAt ? "signed" : t >= b.decisionAt ? "review" : t >= b.flagAt ? "exception" : "assess";
  const stage = released
    ? d.stages.released
    : t >= b.decisionAt
      ? d.stages.decide
      : t >= b.nodeAt[1]?.[0]
        ? d.stages.trace
        : d.stages.notice;
  const cols = d.levels.length;
  const gap = (TG.w - cols * TG.colW) / (cols - 1);
  const xOf = (li: number) => li * (TG.colW + gap);
  const yOf = (li: number, ni: number) => (TG.h * (ni + 0.5)) / d.levels[li].nodes.length;
  const lastLevel = d.levels[cols - 1];
  const bound = lastLevel.nodes.filter((_, i) => t >= b.nodeAt[cols - 1][i]).length;
  return (
    <article className="mdt-card mdt-card--trace" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mdt-card__label mht-caps">
        {d.levels.map((l) => (
          <span key={l.cap}>{l.cap}</span>
        ))}
      </div>
      <svg className="mht-graph" viewBox={`0 0 ${TG.w} ${TG.h}`}>
        {d.levels.slice(1).map((l, li) =>
          l.nodes.map((n, ni) => {
            const x0 = xOf(li) + TG.colW;
            const y0 = yOf(li, n.from ?? 0);
            const x1 = xOf(li + 1);
            const y1 = yOf(li + 1, ni);
            const mx = (x0 + x1) / 2;
            return (
              <path
                key={n.name + ni}
                className={t >= b.nodeAt[li + 1][ni] ? "is-on" : undefined}
                d={`M${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`}
              />
            );
          }),
        )}
        {d.levels.map((l, li) =>
          l.nodes.map((n, ni) => {
            const on = t >= b.nodeAt[li][ni];
            const src = li === 0;
            const cls = "mht-node" + (on ? (src ? (released ? " is-done" : " is-flag") : " is-on") : "");
            const x = xOf(li);
            const y = yOf(li, ni) - TG.nodeH / 2;
            return (
              <g key={n.name + ni} className={cls}>
                <rect x={x} y={y} width={TG.colW} height={TG.nodeH} />
                <text className="mht-node__name" x={x + 10} y={y + 17}>{n.name}</text>
                <text className="mht-node__sub" x={x + 10} y={y + 32}>
                  {src ? (on ? (released ? n.done : d.flag) : n.sub) : on ? n.done : n.sub}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      <div className="mht-scope">
        <span>Scope bound</span>
        <b>
          {bound} of {lastLevel.nodes.length} {lastLevel.cap.toLowerCase()}
        </b>
      </div>
      <div className={"mht-decision" + (t >= b.decisionAt ? " is-on" : "")}>
        <span className="mdt-row__tick">{t >= b.decisionAt ? <Check /> : null}</span>
        <b>{d.decision.label}</b>
        <small>{t >= b.decisionAt ? d.decision.done : d.decision.idle}</small>
      </div>
      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* ------------------------------------------- identity (supplements) */
const SP = { w: 400, h: 132, base: 116, top: 10, n: 120 };

function spectrum(bands: { x: number; h: number; w: number }[]) {
  const pts: string[] = [];
  for (let i = 0; i <= SP.n; i++) {
    const x = i / SP.n;
    const y = bands.reduce((a, b) => a + b.h * Math.exp(-(((x - b.x) / b.w) ** 2)), 0.03);
    pts.push(`${(x * SP.w).toFixed(1)},${(SP.base - Math.min(1, y) * (SP.base - SP.top)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function IdentityCard({ d, t }: { d: IdentityHero; t: number }) {
  const b = identityBeats(d);
  const released = t >= b.releaseAt;
  const second = t >= b.redrawFrom;
  const flagged = t >= b.flagAt && !second;
  const phase = released ? "released" : t >= b.signAt ? "signed" : t >= b.matchAt ? "review" : t >= b.flagAt ? "exception" : "assess";
  const stage = released ? d.stages.released : second ? d.stages.retest : t >= b.flagAt ? d.stages.mismatch : d.stages.testing;
  /* how much of the sample line is drawn: the first lot over DRAW ticks,
   * the replacement over two */
  const drawn = second
    ? Math.min(1, (t - b.redrawFrom + 1) / 2)
    : Math.max(0, Math.min(1, (t - b.drawFrom + 1) / b.DRAW));
  const ref = spectrum(d.bands);
  const sample = spectrum(second ? d.bands : [...d.bands, d.extra]);
  const ex = d.extra.x * SP.w;
  const exW = d.extra.w * SP.w * 2.4;
  return (
    <article className="mdt-card mdt-card--identity" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mdt-card__label">
        <span>{d.method}</span>
        <span className="mhi-legend">
          <i className="is-ref" />
          {d.legend.reference}
          <i className="is-sample" />
          {d.legend.sample}
        </span>
      </div>
      <div className="mhi-chart">
        <svg viewBox={`0 0 ${SP.w} ${SP.h}`}>
          <defs>
            <clipPath id="mhi-clip">
              <rect key={second ? "b" : "a"} x="0" y="0" height={SP.h} width={SP.w * drawn} style={{ transition: "width 780ms linear" }} />
            </clipPath>
          </defs>
          <line className="mhi-axis" x1="0" x2={SP.w} y1={SP.base} y2={SP.base} />
          {flagged ? (
            <g className="mhi-band">
              <rect x={ex - exW / 2} y={SP.top - 4} width={exW} height={SP.base - SP.top + 4} />
              <text x={ex} y={SP.h - 2}>{d.extra.label}</text>
            </g>
          ) : null}
          <polyline className="mhi-ref" points={ref} />
          <polyline
            className={"mhi-sample" + (flagged ? " is-flag" : "") + (t >= b.matchAt ? " is-match" : "")}
            points={sample}
            clipPath="url(#mhi-clip)"
          />
        </svg>
      </div>

      <ul className={"mhc-steps mhi-steps" + (t >= b.flagAt ? " is-open" : "")}>
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
        <li className={"mhc-steps__eff" + (t >= b.matchAt ? " is-on" : "")}>
          <span className="mdt-row__tick">{t >= b.matchAt ? <Check /> : null}</span>
          <b>{d.lots.second}</b>
          <small>{t >= b.matchAt ? d.lots.match : second ? "Testing" : "Awaiting"}</small>
        </li>
      </ul>

      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* ----------------------------------------------- eightd (automotive) */
function EightDCard({ d, t }: { d: EightDHero; t: number }) {
  const b = eightdBeats(d);
  const released = t >= b.releaseAt;
  const n = d.disciplines.length;
  const done = d.disciplines.filter((_, i) => t >= b.dAt[i]).length;
  /* the discipline being worked is the one after the last closed */
  const current = released || done >= n ? null : done;
  const panelOpen = t >= b.panelAt;
  const solving = done > d.containment.at;
  const phase = released ? "released" : t >= b.signAt ? "signed" : solving ? "review" : t >= b.openAt ? "exception" : "assess";
  const stage = released ? d.stages.released : solving ? d.stages.solve : panelOpen ? d.stages.contain : d.stages.opened;
  return (
    <article className="mdt-card mdt-card--eightd" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <div className="mdt-card__label">
        <span>Eight disciplines</span>
        <span className="mdt-card__count">
          {done} of {n} closed
        </span>
      </div>
      <ol className="mh8-ladder">
        {d.disciplines.map((x, i) => {
          const on = t >= b.dAt[i];
          const now = i === current;
          return (
            <li key={x.code} className={(on ? "is-on" : "") + (now ? " is-now" : "")}>
              {x.code}
            </li>
          );
        })}
      </ol>
      <p className="mh8-now">
        {current != null ? (
          <>
            <b>{d.disciplines[current].code}</b> {d.disciplines[current].label}
          </>
        ) : (
          <>
            <Check /> All disciplines closed
          </>
        )}
      </p>

      <div className={"mh8-contain" + (panelOpen ? " is-open" : "")}>
        <span className="mh8-contain__cap">{d.containment.cap}</span>
        <ul>
          {d.containment.sites.map((site, i) => {
            const on = t >= b.siteAt[i];
            return (
              <li key={site.name} className={on ? "is-on" : panelOpen ? "is-flag" : undefined}>
                <b>{site.name}</b>
                <small>
                  {on ? <Check /> : null}
                  {on ? site.on : site.off}
                </small>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={"mht-decision" + (t >= b.responseAt ? " is-on" : "")}>
        <span className="mdt-row__tick">{t >= b.responseAt ? <Check /> : null}</span>
        <b>{d.response.label}</b>
        <small>{t >= b.responseAt ? d.response.done : d.response.idle}</small>
      </div>
      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* ---------------------------------------------------- fai (aerospace) */
function FaiCard({ d, t }: { d: FaiHero; t: number }) {
  const b = faiBeats(d);
  const released = t >= b.releaseAt;
  const fi = d.fail.balloon - 1;
  const out = t >= b.flagAt && t < b.backAt;
  const measured = FAI_BALLOONS.filter((_, i) => t >= b.balloonAt[i]).length;
  const phase = released ? "released" : t >= b.signAt ? "signed" : out ? "exception" : measured === FAI_BALLOONS.length ? "review" : "assess";
  const stage = released ? d.stages.released : out ? d.stages.mrb : t >= b.balloonAt[0] ? d.stages.measure : d.stages.forms;
  return (
    <article className="mdt-card mdt-card--fai" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <ol className="mhq-forms">
        {d.forms.map((f, i) => {
          const on = t >= b.formAt[i];
          return (
            <li key={f.code} className={on ? "is-on" : undefined}>
              <span className="mdt-row__tick">{on ? <Check /> : null}</span>
              <span>
                <b>{f.code}</b>
                <small>{f.label}</small>
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mdt-card__label">
        <span>Ballooned drawing</span>
        <span className="mdt-card__count">
          {measured} of {FAI_BALLOONS.length} measured
        </span>
      </div>
      <div className="mhq-drawing">
        <svg viewBox="0 0 400 170">
          {/* the part: an L-bracket, flange left, three holes */}
          <path className="mhq-part" d="M24 26 H62 V104 H306 V148 H24 Z" />
          <circle className="mhq-part" cx="43" cy="62" r="8" />
          <circle className="mhq-part" cx="118" cy="126" r="7" />
          <circle className="mhq-part" cx="202" cy="126" r="7" />
          <path className="mhq-center" d="M118 112 V140 M104 126 H132 M202 112 V140 M188 126 H216 M43 48 V76 M29 62 H57" />
          {/* dimensions */}
          <path className="mhq-dim" d="M24 160 H306 M24 155 V165 M306 155 V165" />
          <path className="mhq-dim" d="M318 104 H330 M318 148 H330 M326 104 V148" />
          {FAI_BALLOONS.map((p, i) => {
            const on = t >= b.balloonAt[i];
            const isOut = i === fi && out;
            const cls = "mhq-balloon" + (isOut ? " is-flag" : on ? " is-on" : "");
            return (
              <g key={i} className={cls}>
                <line x1={p.x} y1={p.y} x2={p.tx} y2={p.ty} />
                <circle cx={p.x} cy={p.y} r="10" />
                <text x={p.x} y={p.y + 3.5}>{i + 1}</text>
              </g>
            );
          })}
          {t >= b.flagAt ? (
            <g className={"mhq-tag" + (out ? " is-flag" : " is-back")}>
              <rect x={FAI_BALLOONS[fi].x - 48} y={FAI_BALLOONS[fi].y - 38} width="96" height="17" />
              <text x={FAI_BALLOONS[fi].x} y={FAI_BALLOONS[fi].y - 26}>{out ? d.fail.out : d.fail.back}</text>
            </g>
          ) : null}
        </svg>
      </div>
      <ul className={"mhc-steps" + (t >= b.flagAt ? " is-open" : "")}>
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
      <CardFoot d={d} phase={phase} released={released} />
    </article>
  );
}

/* ------------------------------------------------- fat (machinery) */
function FatCard({ d, t }: { d: FatHero; t: number }) {
  const b = fatBeats(d);
  const released = t >= b.releaseAt;
  const out = t >= b.flagAt && t < b.backAt;
  const run = d.tests.filter((_, i) => t >= b.testAt[i]).length;
  const phase = released ? "released" : t >= b.signAt ? "signed" : out ? "exception" : run === d.tests.length ? "review" : "assess";
  const stage = released ? d.stages.released : t >= b.signAt ? d.stages.witness : out ? d.stages.punch : d.stages.run;
  const now = released ? d.at + 1 : d.at;
  return (
    <article className="mdt-card mdt-card--fat" aria-hidden="true">
      <CardHead d={d} phase={phase} stage={stage} />
      <ol className="mhm-track">
        {d.milestones.map((m, i) => (
          <li key={m} className={i < now ? "is-done" : i === now ? "is-now" : undefined}>
            <i>{i < now ? <Check /> : null}</i>
            <span>{m}</span>
          </li>
        ))}
      </ol>
      <table className="mhm-proto">
        <thead>
          <tr>
            <th>{d.milestones[d.at]} protocol</th>
            <th>Result</th>
            <th>{d.witness}</th>
          </tr>
        </thead>
        <tbody>
          {d.tests.map((x, i) => {
            const ran = t >= b.testAt[i];
            const isOut = i === d.fail.row && out;
            const passed = ran && !isOut;
            return (
              <tr key={x.name} className={isOut ? "is-flag" : passed ? "is-on" : undefined}>
                <td>
                  <b>{x.name}</b>
                  <small>{x.ref}</small>
                </td>
                <td className="mhm-proto__res">
                  {isOut ? d.fail.out : passed ? (i === d.fail.row ? d.fail.back : "Pass") : "Pending"}
                </td>
                <td className="mhm-proto__wit">
                  <span className="mdt-row__tick">{passed ? <Check /> : null}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className={"mhc-steps" + (t >= b.flagAt ? " is-open" : "")}>
        {d.punch.map((s, i) => {
          const on = t >= b.punchAt[i];
          return (
            <li key={s.label} className={on ? "is-on" : undefined}>
              <span className="mdt-row__tick">{on ? <Check /> : null}</span>
              <b>{s.label}</b>
              <small>{s.meta}</small>
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
    let done = false;
    const start = () => {
      if (timer || done) return;
      // play once, then hold on the finished record (no loop)
      timer = window.setInterval(
        () =>
          setT((v) => {
            if (v + 1 >= T_END - 1) {
              done = true;
              stop();
              return T_END - 1;
            }
            return v + 1;
          }),
        TICK,
      );
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
  else if (d.kind === "file") card = <FileCard d={d} t={t} />;
  else if (d.kind === "trace") card = <TraceCard d={d} t={t} />;
  else if (d.kind === "identity") card = <IdentityCard d={d} t={t} />;
  else if (d.kind === "eightd") card = <EightDCard d={d} t={t} />;
  else if (d.kind === "fai") card = <FaiCard d={d} t={t} />;
  else if (d.kind === "fat") card = <FatCard d={d} t={t} />;
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
