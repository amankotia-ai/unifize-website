/* ============================================================================
 * stylized-ctax.tsx - the coordination-tax section for /products/dms/stylized:
 * a per-stage comparison ledger. One row per stage; each row pairs the stage
 * as it is paid for today (scene + metric + the coordination it costs) with
 * the same stage on one governed record (scene + outcome), so the flip is
 * read side by side instead of two bands apart. The shared revision visual
 * (dms-coordination-visual) stays as it is for DMS, QMS, PLM and MES; this
 * is the stylized page's own.
 *
 * Scenes reuse the problem section's graphic language (dms-gfx-*): a quiet
 * halo, white cards with line detail, small-caps tags, one accent per frame.
 * Status is carried by filled badges with a white ring (never a bare outline
 * floating in space), and every badge is anchored to the thing it judges.
 * BEFORE frames break the chain (dashed links, warn badges); AFTER frames
 * close it (solid links, sealed marks). Stage names, metrics and outcomes are
 * the page's own DMS_PROBLEMS data; only the AFTER note is authored here.
 * ========================================================================== */
import { Eyebrow } from "../dms-primitives";
import type { DmsCoordinationProblem } from "../dms-data";
import "./stylized-ctax.css";

/* what the record does instead, per stage - the AFTER caption under the outcome */
const AFTER_NOTES: Record<string, string> = {
  audit: "All evidence captured and attached in one place.",
  versions: "Always one source of truth.",
  change: "Automatically notified. Effective everywhere.",
  training: "Automatically assigned. Automatically tracked.",
};

/* ------------------------------------------------------------------ glyphs */

function Person({ x, y, scale = 1, tone }: { x: number; y: number; scale?: number; tone?: "quiet" }) {
  return (
    <g className={"sctx-person" + (tone ? " is-quiet" : "")} transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-8" r="6.8" />
      <path d="M-11.5 10.5c0-6.4 5.1-10.9 11.5-10.9s11.5 4.5 11.5 10.9Z" />
    </g>
  );
}

/* a filled status badge with a white ring, so it reads over any furniture */
function Badge({
  x,
  y,
  kind,
  scale = 1,
}: {
  x: number;
  y: number;
  kind: "ok" | "err" | "key" | "clip";
  scale?: number;
}) {
  const path =
    kind === "err"
      ? "M-3 -3 3 3M3 -3 -3 3"
      : kind === "clip"
        ? "M2.6 -3.4 -2.4 1.6a2.3 2.3 0 0 0 3.2 3.2l4.6-4.6a3.9 3.9 0 0 0-5.5-5.5L-4.4 -.4"
        : "m-3.6 .4 2.5 2.5 4.7-5.4";
  return (
    <g className={"sctx-badge is-" + kind} transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r="8.5" />
      <path d={path} />
    </g>
  );
}

/* a source-app tile (mail, sheet, doc, chat) for the scatter scenes */
function Tile({ x, y, children, rotate = 0 }: { x: number; y: number; children: React.ReactNode; rotate?: number }) {
  return (
    <g className="sctx-tile" transform={`translate(${x} ${y}) rotate(${rotate} 20 20)`}>
      <rect width="40" height="40" rx="6" />
      <g transform="translate(10 10)">{children}</g>
    </g>
  );
}

/* a document card; children draw its face */
function Card({
  x,
  y,
  w = 46,
  h = 58,
  rotate = 0,
  tone,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  rotate?: number;
  tone?: "key" | "stale" | "accent";
  children?: React.ReactNode;
}) {
  return (
    <g
      className={"sctx-card" + (tone ? " is-" + tone : "")}
      transform={`translate(${x} ${y}) rotate(${rotate} ${w / 2} ${h / 2})`}
    >
      <rect width={w} height={h} rx="4" />
      {children}
    </g>
  );
}

/* --------------------------------------------------------------- the scenes
 * One 168 box per cell, halo r72 about (84,84). The furniture fills the halo;
 * BEFORE and AFTER share it so the eye reads the change, not a new picture. */

function SceneAuditBefore() {
  return (
    <>
      <path className="sctx-scatter" d="M50 54 78 78M118 50 92 76M52 118 78 92M118 116 92 92" />
      <Tile rotate={-4} x={24} y={26}>
        <path className="sctx-glyph" d="M0 3.5h20v13.5H0zM0 3.5 10 11l10-7.5" />
      </Tile>
      <Tile rotate={3} x={102} y={22}>
        <rect className="sctx-glyph-fill is-sheet" height="20" rx="2" width="20" />
        <path className="sctx-glyph is-onfill" d="M3.5 7h13M3.5 11h13M3.5 15h13M8.5 3.5v15" />
      </Tile>
      <Tile rotate={4} x={26} y={102}>
        <path className="sctx-glyph" d="M2.5 0h10L17.5 5v15h-15zM12.5 0v5h5M6 10h8M6 14h6" />
      </Tile>
      <Tile rotate={-3} x={102} y={100}>
        <path className="sctx-glyph" d="M0 2.5h20v12.5H4l-4 4.5zM5 8.75h.01M9.5 8.75h.01M14 8.75h.01" />
      </Tile>
      <Badge kind="err" x={84} y={84} />
    </>
  );
}

function SceneAuditAfter() {
  return (
    <>
      {/* the scattered exports, already gathered behind the record */}
      <Card h={46} rotate={-8} tone="stale" w={36} x={30} y={50}>
        <path className="sctx-cardline" d="M8 12h20M8 19h20M8 26h13" />
      </Card>
      <Card h={46} rotate={7} tone="stale" w={36} x={102} y={48}>
        <path className="sctx-cardline" d="M8 12h20M8 19h20M8 26h13" />
      </Card>
      <Card h={68} tone="key" w={54} x={57} y={44}>
        <rect className="sctx-spine" height={68} width={5} />
        <path className="sctx-check" d="m14 15.5 3 3 5.6-6.4M14 30l3 3 5.6-6.4M14 44.5l3 3 5.6-6.4" />
        <path className="sctx-cardline" d="M30 17h16M30 31.5h16M30 46h10" />
      </Card>
      <Badge kind="clip" x={110} y={110} />
    </>
  );
}

function SceneVersionsBefore() {
  return (
    <>
      {/* three copies, each claiming to be current; the stack fans down-right */}
      <Card h={58} rotate={-5} tone="stale" w={46} x={28} y={30}>
        <text className="sctx-vnum" x={8} y={20}>v2.8</text>
        <path className="sctx-cardline" d="M8 30h30M8 38h30M8 46h18" />
      </Card>
      <Card h={58} rotate={0} tone="stale" w={46} x={56} y={50}>
        <text className="sctx-vnum" x={8} y={20}>v3.1</text>
        <path className="sctx-cardline" d="M8 30h30M8 38h30M8 46h18" />
      </Card>
      <Card h={58} rotate={4} w={46} x={84} y={70}>
        <text className="sctx-vnum is-warn" x={8} y={20}>v3.2</text>
        <path className="sctx-cardline" d="M8 30h30M8 38h30M8 46h18" />
      </Card>
      <Badge kind="err" x={132} y={66} />
    </>
  );
}

function SceneVersionsAfter() {
  return (
    <>
      {/* the ONE effective version: the accent-filled key card, the same move
        * the problem section makes for the true revision */}
      <Card h={70} tone="accent" w={56} x={56} y={44}>
        <text className="sctx-vnum is-oncolor" x={9} y={22}>v3.2</text>
        <path className="sctx-cardline" d="M9 32h38M9 41h38M9 50h22" />
        <g className="sctx-pill is-inverse" transform="translate(9 56)">
          <rect height="13" rx="2" width="38" />
          <text x={19} y={9.2}>CURRENT</text>
        </g>
      </Card>
      <Badge kind="ok" x={112} y={48} />
    </>
  );
}

function SceneChangeBefore() {
  return (
    <>
      <path className="sctx-arc is-broken" d="M70 58C56 66 46 80 42 96M98 58c14 8 24 22 28 38" />
      <Person scale={1.08} x={84} y={44} />
      <Person tone="quiet" x={42} y={112} />
      <Person tone="quiet" x={126} y={112} />
      {/* the effective date, unknown on the floor */}
      <g className="sctx-cal" transform="translate(67 68)">
        <rect height="30" rx="4" width="34" />
        <path d="M0 10.5h34M9 0v6.5M25 0v6.5" />
        <text x={17} y={25}>?</text>
      </g>
      <Badge kind="err" scale={0.92} x={106} y={94} />
    </>
  );
}

function SceneChangeAfter() {
  return (
    <>
      <path className="sctx-arc" d="M70 56C56 64 45 80 42 98M98 56c14 8 25 24 28 42M56 116h56" />
      <Person scale={1.08} x={84} y={44} />
      <Person x={42} y={112} />
      <Person x={126} y={112} />
      <Badge kind="key" scale={1.1} x={84} y={86} />
    </>
  );
}

function SceneTrainingBefore() {
  return (
    <>
      <Person scale={1.05} x={84} y={38} />
      <path className="sctx-arc is-broken" d="M84 54v12M42 66h84M42 66v14M84 66v14M126 66v14" />
      <Person tone="quiet" x={42} y={102} />
      <Person tone="quiet" x={84} y={102} />
      <Person tone="quiet" x={126} y={102} />
      <Badge kind="ok" scale={0.8} x={52} y={114} />
      <Badge kind="ok" scale={0.8} x={94} y={114} />
      <Badge kind="err" scale={0.8} x={136} y={114} />
    </>
  );
}

function SceneTrainingAfter() {
  return (
    <>
      <Person scale={1.05} x={84} y={38} />
      <path className="sctx-arc" d="M84 54v12M38 66h92M38 66v14M69 66v14M99 66v14M130 66v14" />
      <Person x={38} y={102} />
      <Person x={69} y={102} />
      <Person x={99} y={102} />
      <Person x={130} y={102} />
      <Badge kind="ok" scale={0.78} x={48} y={114} />
      <Badge kind="ok" scale={0.78} x={79} y={114} />
      <Badge kind="ok" scale={0.78} x={109} y={114} />
      <Badge kind="ok" scale={0.78} x={140} y={114} />
    </>
  );
}

const SCENES: Record<string, { before: React.ReactNode; after: React.ReactNode }> = {
  audit: { before: <SceneAuditBefore />, after: <SceneAuditAfter /> },
  versions: { before: <SceneVersionsBefore />, after: <SceneVersionsAfter /> },
  change: { before: <SceneChangeBefore />, after: <SceneChangeAfter /> },
  training: { before: <SceneTrainingBefore />, after: <SceneTrainingAfter /> },
};

function Scene({ visual, world }: { visual: string; world: "before" | "after" }) {
  const scene = SCENES[visual];
  return (
    <span className={"sctx-fig is-" + world} aria-hidden="true">
      <svg viewBox="0 0 168 168">{scene ? scene[world] : null}</svg>
    </span>
  );
}

/* -------------------------------------------------------- flip + legend */

/* the seam of each row: churn (dashed, warn) handed over to flow (solid,
 * accent, arrowhead) - the coordination gap closing, drawn once per stage */
function FlipArrow() {
  return (
    <span className="sctx-flip" aria-hidden="true">
      <svg viewBox="0 0 56 20">
        <path className="sctx-flip__tail" d="M4 10h18" />
        <path className="sctx-flip__lead" d="M26 10h20" />
        <path className="sctx-flip__head" d="m42 5.4 6 4.6-6 4.6" />
      </svg>
    </span>
  );
}

function LegendIcon({ kind }: { kind: "handoff-manual" | "rework" | "handoff-auto" | "sealed" }) {
  return (
    <svg className={"sctx-legend__i is-" + kind} viewBox="0 0 24 24" aria-hidden="true">
      {kind === "handoff-manual" ? (
        <>
          <circle className="i-fill" cx="12" cy="12" r="9" />
          <path className="i-line" d="M12 7.4v5.4M12 16.6h.01" />
        </>
      ) : null}
      {kind === "rework" ? (
        <>
          <circle className="i-ring" cx="12" cy="12" r="8.4" />
          <path className="i-head" d="M20.4 8.6v3.4H17" />
        </>
      ) : null}
      {kind === "handoff-auto" ? (
        <>
          <circle className="i-fill" cx="12" cy="12" r="9" />
          <path className="i-line" d="m8.2 12.3 2.7 2.7 5-5.7" />
        </>
      ) : null}
      {kind === "sealed" ? (
        <>
          <path className="i-shield" d="M12 3.2 19 6v5.4c0 4.3-2.9 8.2-7 9.6-4.1-1.4-7-5.3-7-9.6V6l7-2.8Z" />
          <path className="i-line" d="m8.7 11.9 2.4 2.4 4.4-5" />
        </>
      ) : null}
    </svg>
  );
}

/* ------------------------------------------------------------------ section */

export function StylizedCoordinationTax({ problems }: { problems: DmsCoordinationProblem[] }) {
  return (
    <section className="dms-section sctx" id="coordination" aria-labelledby="sctx-title">
      <div className="dms-wrap">
        <header className="sctx__head" data-reveal>
          <Eyebrow>The cost of fragmentation</Eyebrow>
          <h2 className="dms-h2" id="sctx-title">The coordination tax sits between question and proof.</h2>
          <p className="dms-lede">Work moves faster, accountability stays visible, and the evidence is already audit-ready.</p>
        </header>

        <p className="dms-sr-only">
          Four stages of regulated document work, each compared side by side. Today each stage is separated
          from the next by coordination work: assembling evidence takes days of senior time, three copies claim
          to be current, change effectivity reaches the floor months after approval, and retraining lands weeks
          late. On one governed record the same four stages stay connected: evidence is already bound, one
          version is effective, effectivity reaches the line, and training is assigned on release. The metrics
          keep their original units and are not plotted on a shared scale.
        </p>

        <div className="sctx__frame" data-reveal>
          {/* ------------------------------------------------- world header */}
          <div className="sctx__header" aria-hidden="true">
            <div className="sctx__header-stage">
              <span>The same four stages, paid for twice</span>
            </div>
            <div className="sctx__header-world">
              <span className="sctx__world-kicker">Before</span>
              <strong className="sctx__world-name">Today</strong>
              <p className="sctx__world-note">Useful work is fragmented by the coordination needed to find, verify, and reconcile it.</p>
              <ul className="sctx-legend">
                <li><LegendIcon kind="handoff-manual" />Manual handoffs</li>
                <li><LegendIcon kind="rework" />Rework and delays</li>
              </ul>
            </div>
            <div className="sctx__header-flip" />
            <div className="sctx__header-world is-after">
              <span className="sctx__world-kicker">After</span>
              <strong className="sctx__world-name">With Unifize</strong>
              <p className="sctx__world-note">Every step, owner, decision, and piece of evidence stays attached to the same record.</p>
              <ul className="sctx-legend">
                <li><LegendIcon kind="handoff-auto" />Automated handoffs</li>
                <li><LegendIcon kind="sealed" />Audit-ready by design</li>
              </ul>
            </div>
          </div>

          {/* ------------------------------------------------- stage rows */}
          <ol className="sctx__rows" aria-hidden="true">
            {problems.map((problem, index) => (
              <li className="sctx__row" key={problem.visual}>
                <div className="sctx__row-stage">
                  <span className="sctx__n">{String(index + 1).padStart(2, "0")}</span>
                  <strong className="sctx__stage">{problem.category}</strong>
                  <span className="sctx__row-work">{problem.work}</span>
                </div>

                <div className="sctx__cell sctx__cell--before">
                  <Scene visual={problem.visual} world="before" />
                  <div className="sctx__cell-copy">
                    <strong className="sctx__metric">{problem.metric}</strong>
                    <span className="sctx__metric-label">{problem.metricLabel}</span>
                    <ul className="sctx__taxlist">
                      {problem.tax.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="sctx__row-flip">
                  <FlipArrow />
                </div>

                <div className="sctx__cell sctx__cell--after">
                  <Scene visual={problem.visual} world="after" />
                  <div className="sctx__cell-copy">
                    <strong className="sctx__outcome">{problem.outcome}</strong>
                    <span className="sctx__after-note">{AFTER_NOTES[problem.visual]}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* ------------------------------------------------- close */}
          <p className="sctx__coda"><strong>The work stays.</strong> The coordination gaps do not.</p>
          <div className="sctx__record">
            <span>
              <LegendIcon kind="sealed" />
              One governed record
            </span>
            <i aria-hidden="true" />
            <span>Every handoff stays attached</span>
          </div>
        </div>
      </div>
    </section>
  );
}
