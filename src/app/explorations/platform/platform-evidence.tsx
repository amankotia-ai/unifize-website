/* ----------------------------------------------------------------------------
 * PLATFORM · 01 the problem - the evidence band.
 *
 * 9 Sep 2026 review (Lakshman): the three macro numbers are SECOND-ORDER
 * effects, not the coordination tax, and they read as industry trivia ("I am
 * Ford; 3,200 recalls a year is not exciting"). So the band now runs in two
 * rows:
 *   1. The tax itself, about ONE record of the reader's own kind: the steps
 *      in closing a single non-conformance, split into the work and the
 *      coordination around it. Source: Notion, The Value Model / Reference
 *      Value Streams, VS-2 "Non-Conformance - Detection to CAPA Closure"
 *      (75 steps: 21 value-adding, 54 not; ~1,163 active coordination
 *      minutes typical). The stream is Draft and modelled, and says so.
 *   2. What the tax turns into: the same three sourced numbers, under
 *      uniform outcome labels (design delays, product recalls, stalled
 *      production), the recall tile led by its per-event cost rather than
 *      the national count, each with one line tying it back to the tax.
 * DRAFT for Ben: the tie-back lines reuse claims already on the homepage
 * solution cards; nothing new is asserted.
 *
 * Original note:
 * Three sourced numbers, each carried by a small chart in the product's
 * linework idiom: hairline baselines, square markers, mono labels, one
 * accent. Every chart encodes only its sourced number (or an honest
 * per-week / per-month derivation of it) - never an invented trend.
 * Draw-in motion keys off the shared DmsMotion reveal layer.
 * -------------------------------------------------------------------------- */
import type { ReactNode } from "react";

/* one recall week: 3,200 a year ≈ 62 events, laid out Mon-Sun */
const RECALL_WEEK = [
  { day: "M", events: 8 },
  { day: "T", events: 9 },
  { day: "W", events: 10 },
  { day: "T", events: 9 },
  { day: "F", events: 8 },
  { day: "S", events: 9 },
  { day: "S", events: 9 },
];

/* $1.5T accruing across a year, read quarterly on a 320x192 canvas */
const ACCRUAL_QUARTERS = [
  { label: "Q1", x: 52, y: 120 },
  { label: "Q2", x: 124, y: 90 },
  { label: "Q3", x: 196, y: 60 },
  { label: "Q4", x: 268, y: 30, key: true },
];

function EvidenceTile({
  tag,
  value,
  label,
  source,
  link,
  children,
}: {
  tag: string;
  value: string;
  label: string;
  source: string;
  /* how the coordination tax produces this effect */
  link: string;
  children: ReactNode;
}) {
  return (
    <article className="pf-evi" data-reveal>
      <header className="pf-evi__head">
        <small className="pf-evi__tag">{tag}</small>
        <span className="pf-evi__v dms-data">{value}</span>
        <span className="pf-evi__l">{label}</span>
      </header>
      <div className="pf-evi__fig" aria-hidden="true">{children}</div>
      <p className="pf-evi__link">
        <small>How the tax gets there</small>
        {link}
      </p>
      <p className="pf-evi__src">{source}</p>
    </article>
  );
}

/* VS-2, one non-conformance end to end: 75 steps, 21 of them the work */
const NC_STEPS = 75;
const NC_VALUE_STEPS = 21;

function TaxLead() {
  return (
    <article className="pf-taxlead" data-reveal>
      <div className="pf-taxlead__claim">
        <small className="pf-evi__tag">The tax itself · one of your non-conformances</small>
        <p className="pf-taxlead__v">
          <span className="dms-data">{NC_STEPS - NC_VALUE_STEPS}</span> of {NC_STEPS} steps
        </p>
        <p className="pf-taxlead__l">
          in closing a single non-conformance are coordination, not quality work: notifying, scheduling,
          re-keying, chasing, rebuilding context. About <strong>19 hours</strong> of it per record.
        </p>
      </div>
      <div className="pf-taxlead__fig" aria-hidden="true">
        {/* the stat cell's head (rails wave): what is counted, and the total */}
        <div className="pf-taxlead__figlab">
          <span>One non-conformance, detection to CAPA closure</span>
          <b>{NC_STEPS} steps</b>
        </div>
        <div className="pf-taxlead__cells">
          {Array.from({ length: NC_STEPS }, (_, i) => (
            <i key={i} className={i < NC_VALUE_STEPS ? "is-work" : "is-tax"} />
          ))}
        </div>
        <div className="pf-leak__legend">
          <span><i className="is-keep" />The work · investigate, decide, verify · {NC_VALUE_STEPS}</span>
          <span><i className="is-leak" />The coordination tax · {NC_STEPS - NC_VALUE_STEPS}</span>
        </div>
      </div>
      {/* the source strip that sat under this row was removed on the rails
        * pass (Abhishek, 22 Sep: "remove this bit"); the stream (Notion VS-2,
        * typical case, modelled) stays cited in the file header above */}
    </article>
  );
}

export function PlatformEvidence() {
  return (
    <div className="pf-ledger">
    <TaxLead />
    <p className="pf-stats__kicker" data-reveal>
      What the tax turns into
    </p>
      {/* 30% - part-of-whole ledger bar */}
      <EvidenceTile
        tag="Design delays"
        value="30%"
        label="of your R&D spend leaks into duplication and rework"
        link="Decisions made in reviews and threads are rebuilt weeks later, so teams redo work that was already done."
        source="Source · European Commission · HBR"
      >
        <div className="pf-leak">
          <div className="pf-leak__track">
            <i className="pf-leak__seg is-leak" />
            <i className="pf-leak__seg is-keep" />
          </div>
          <div className="pf-leak__rule">
            <span>0</span>
            <span>50</span>
            <span>100%</span>
          </div>
          <div className="pf-leak__legend">
            <span><i className="is-leak" />Duplication &amp; rework · 30%</span>
            <span><i className="is-keep" />Reaches the product · 70%</span>
          </div>
        </div>
      </EvidenceTile>

      {/* 3,200 a year - one week of it, event by event */}
      <EvidenceTile
        tag="Product recalls"
        value="$10M"
        label="is what a single recall can cost. There are 3,200 a year in the US."
        link="Hold, notification, returns, and the submission run under four owners, joined by calls nobody records."
        source="Source · Sedgwick · Recall Index"
      >
        <div className="pf-week">
          <div className="pf-week__grid">
            {RECALL_WEEK.map((column, index) => (
              <div className="pf-week__day" key={`${column.day}-${index}`}>
                <span className="pf-week__stack">
                  {Array.from({ length: column.events }, (_, i) => <i key={i} />)}
                </span>
                <small>{column.day}</small>
              </div>
            ))}
          </div>
          <p className="pf-evi__cap">One week in the US · ≈62 recalls</p>
        </div>
      </EvidenceTile>

      {/* $1.5T - the year's accrual, quarter by quarter */}
      <EvidenceTile
        tag="Stalled production"
        value="$1.5T"
        label="lost annually to stalled production and operational bottlenecks"
        link="Work in progress ages while holds and dispositions wait in inboxes, with no owner and no due date."
        source="Source · Institute for Supply Management"
      >
        <div className="pf-accrual">
          {/* the viewBox is cut to the drawing (x 12..308, y 22..180) so the
              * baseline starts flush with the cell's text edge and no empty
              * canvas sits above the Q4 marker; left- and floor-aligned when
              * the slot height caps it */}
          <svg viewBox="12 22 296 158" width="100%" preserveAspectRatio="xMinYMax meet" className="pf-accrual__svg">
            {ACCRUAL_QUARTERS.map((quarter) => (
              <g className={"pf-accrual__q" + (quarter.key ? " is-key" : "")} key={quarter.label}>
                <line className="pf-accrual__stem" x1={quarter.x} y1={150} x2={quarter.x} y2={quarter.y} />
                <rect className="pf-accrual__pt" x={quarter.x - 4} y={quarter.y - 4} width="8" height="8" />
                <text className="pf-accrual__lab" x={quarter.x} y={172} textAnchor="middle">
                  {quarter.label}
                </text>
              </g>
            ))}
            <path
              className="pf-accrual__path"
              d="M16 120 H88 V90 H160 V60 H232 V30 H304"
              pathLength={1}
            />
            <line className="pf-accrual__base" x1={16} y1={150} x2={304} y2={150} />
            <line className="pf-accrual__ticks" x1={16} y1={159} x2={304} y2={159} />
          </svg>
          <p className="pf-evi__cap">Accrues at ≈$125B a month</p>
        </div>
      </EvidenceTile>
    </div>
  );
}
