/* ----------------------------------------------------------------------------
 * PLATFORM · 04 measured - the fall.
 * The section's claim is a comparison: your closure time against your own
 * baseline, week by week. So the figure IS the comparison, drawn in the
 * problem section's linework idiom translated to ink: the dashed baseline
 * you start on, the staircase falling away from it across one quarter, and
 * the reclaimed gap labeled. (The problem section's accrual staircase climbs;
 * this one falls. Same grammar, opposite direction.) Three companion ledgers
 * carry the other clocks the lede promises: open threads, waiting share,
 * evidence completeness. Every number matches the fictional Engineering
 * Industries reports the arcade world renders - nothing invented beyond it.
 * Server module, no state; draw-in keys off the shared DmsMotion reveal.
 * -------------------------------------------------------------------------- */
import type { ReactNode } from "react";

/* twelve weeks on the platform: median closure, in days (34d -> 11d) */
const FALL_WEEKS = [34, 32, 31, 28, 26, 23, 21, 18, 15, 13, 12, 11];

/* canvas geometry: 720x400 · floor at 340 · the 34-day baseline at 64 */
const LEFT = 30;
const RIGHT = 694;
const FLOOR = 340;
const BASE_Y = 64;
const fx = (week: number) => 48 + week * 57.5;
const fy = (days: number) => FLOOR - days * ((FLOOR - BASE_Y) / 34);

/* the staircase: a plateau per week, drops at the midpoints (accrual grammar) */
const FALL_PATH = FALL_WEEKS.map((days, i) => {
  const isLast = i === FALL_WEEKS.length - 1;
  const plateauEnd = isLast ? RIGHT : (fx(i) + fx(i + 1)) / 2;
  const enter = i === 0 ? `M ${LEFT} ${fy(days).toFixed(1)}` : `V ${fy(days).toFixed(1)}`;
  return `${enter} H ${plateauEnd.toFixed(1)}`;
}).join(" ");

/* 24 open threads across six teams, as the reports page counts them */
const THREAD_TEAMS = [
  { code: "QA", threads: 6 },
  { code: "ENG", threads: 4 },
  { code: "PRD", threads: 5 },
  { code: "SUP", threads: 3 },
  { code: "REG", threads: 4 },
  { code: "OPS", threads: 2 },
];

function MeasureTile({
  tag,
  value,
  label,
  children,
}: {
  tag: string;
  value: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <article className="pf-kpi" data-reveal>
      <header className="pf-meas__head">
        <small className="pf-meas__tag">{tag}</small>
        <span className="pf-meas__v dms-data">{value}</span>
        <span className="pf-meas__l">{label}</span>
      </header>
      <div className="pf-kpi__fig" aria-hidden="true">{children}</div>
    </article>
  );
}

export function PlatformMeasured() {
  const lastWeek = FALL_WEEKS.length - 1;
  return (
    <div className="pf-meas">
      {/* the fall: median closure vs your own baseline, week by week */}
      <figure className="pf-fall" data-reveal>
        <figcaption className="pf-meas__head">
          <small className="pf-meas__tag">Median closure</small>
          <span className="pf-meas__v dms-data">11 days</span>
          <span className="pf-meas__l">
            to close a cross-functional thread, down from the 34-day baseline you started on.
          </span>
        </figcaption>
        <div className="pf-fall__fig" aria-hidden="true">
          <svg className="pf-fall__svg" viewBox="0 0 720 400" width="100%">
            <text className="pf-fall__baselab" x={LEFT} y={50}>Baseline · 34 days</text>
            <line className="pf-fall__base" x1={LEFT} y1={BASE_Y} x2={RIGHT} y2={BASE_Y} />
            <path className="pf-fall__path" d={FALL_PATH} pathLength={1} />
            {FALL_WEEKS.map((days, i) => (
              <g className={"pf-fall__wk" + (i === lastWeek ? " is-key" : "")} key={i}>
                <rect className="pf-fall__pt" x={fx(i) - 3.5} y={fy(days) - 3.5} width={7} height={7} />
                <text className="pf-fall__lab" x={fx(i)} y={362} textAnchor="middle">
                  W{i + 1}
                </text>
              </g>
            ))}
            {/* the reclaimed gap: baseline down to where the quarter ends */}
            <line
              className="pf-fall__delta"
              x1={fx(lastWeek)} y1={BASE_Y + 8}
              x2={fx(lastWeek)} y2={fy(11) - 8}
            />
            <text className="pf-fall__deltalab" x={fx(lastWeek) - 16} y={148} textAnchor="end">
              23 days back
            </text>
            <text className="pf-fall__deltasub" x={fx(lastWeek) - 16} y={166} textAnchor="end">
              on every thread
            </text>
            <text className="pf-fall__now" x={fx(lastWeek)} y={fy(11) + 24} textAnchor="middle">
              11d
            </text>
            <line className="pf-fall__floor" x1={LEFT} y1={FLOOR} x2={RIGHT} y2={FLOOR} />
          </svg>
        </div>
        <p className="pf-meas__cap">
          One quarter at Engineering Industries · read off each thread&rsquo;s own clock · no export, no
          reconciliation
        </p>
      </figure>

      {/* the other clocks the lede promises, one ledger each */}
      <div className="pf-meas__side">
        <MeasureTile tag="Open threads" value="24" label="open across six teams, each on its own clock">
          <div className="pf-th__grid">
            {THREAD_TEAMS.map((team) => (
              <div className="pf-th__team" key={team.code}>
                <span className="pf-th__stack">
                  {Array.from({ length: team.threads }, (_, i) => <i key={i} />)}
                </span>
                <small>{team.code}</small>
              </div>
            ))}
          </div>
        </MeasureTile>

        <MeasureTile tag="Waiting" value="9%" label="of open time spent waiting on someone">
          <div className="pf-wait">
            <div className="pf-wait__track">
              <i className="pf-wait__seg" />
            </div>
            <div className="pf-wait__rule">
              <span>0</span>
              <span>50</span>
              <span>100%</span>
            </div>
          </div>
        </MeasureTile>

        <MeasureTile tag="Evidence" value="98%" label="complete at the moment of sign-off">
          <div className="pf-tally">
            {Array.from({ length: 50 }, (_, i) => (
              <i key={i} className={i === 44 ? "is-open" : undefined} />
            ))}
          </div>
        </MeasureTile>
      </div>
    </div>
  );
}
