/* ----------------------------------------------------------------------------
 * PLATFORM · 01 the problem - the evidence band.
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
  children,
}: {
  tag: string;
  value: string;
  label: string;
  source: string;
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
      <p className="pf-evi__src">{source}</p>
    </article>
  );
}

export function PlatformEvidence() {
  return (
    <div className="pf-stats">
      {/* 30% - part-of-whole ledger bar */}
      <EvidenceTile
        tag="R&D"
        value="30%"
        label="of R&D spend leaks into duplication and rework"
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
        tag="Recalls"
        value="3,200"
        label="US product recalls a year, at up to $10M per event"
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
        tag="Operations"
        value="$1.5T"
        label="lost annually to stalled production and operational bottlenecks"
        source="Source · Institute for Supply Management"
      >
        <div className="pf-accrual">
          <svg viewBox="0 0 320 192" width="100%" className="pf-accrual__svg">
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
