"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

export type DriftStationWeight = "deep" | "light";

export interface DriftStation {
  num: string;
  title: string;
  /** The "what this looks like" description shown in the station body. */
  trigger: string;
  /** Optional metric line (e.g. "6 owners · 1 thread"). */
  metric?: string;
  /** Optional persona / vertical label shown with the marker. */
  persona?: string;
  /** Rotating headline in the sticky aside (e.g. "It begins in Quality."). */
  anchor: string;
  weight: DriftStationWeight;
  /** Destination URL. */
  href: string;
  /** Optional explicit cell indices to light when this station activates. */
  cells?: number[];
}

export interface IngressDriftProps {
  id?: string;
  eyebrow: string;
  lede: string;
  stations: DriftStation[];
  coda?: {
    eyebrow: string;
    claim: { setup: ReactNode; punch: ReactNode };
    closer: ReactNode;
  };
}

const MATRIX_COLS = 14;
const MATRIX_ROWS = 7;
const MATRIX_CELLS = MATRIX_COLS * MATRIX_ROWS;

/**
 * Reused from the homepage DomainDrift. When a station doesn't supply its own
 * `cells`, we fall back to the same curated cluster sequence so the matrix
 * accumulates as a believable "coordination map" rather than a progress bar.
 */
const DEFAULT_CELL_PATTERNS: number[][] = [
  [0, 1, 14, 15, 28, 29, 42],
  [4, 5, 6, 19, 20, 33],
  [10, 11, 12, 13, 25, 27],
  [16, 30, 31, 44, 45],
  [32, 46, 47, 60, 61],
  [34, 35, 48, 49, 62],
  [37, 38, 51, 52, 65],
  [40, 41, 54, 55, 68, 69],
  [56, 57, 70, 71, 84],
  [58, 72, 85, 86],
  [59, 73, 74, 87],
  [63, 64, 75, 88],
  [66, 67, 76, 77, 89, 90],
  [78, 79, 92, 93],
  [80, 81, 82, 83, 94, 95, 96, 97],
];

const litThrough = (stations: DriftStation[], index: number): Set<number> => {
  const set = new Set<number>();
  for (let i = 0; i <= index; i++) {
    const station = stations[i];
    if (!station) continue;
    const cells = station.cells ?? DEFAULT_CELL_PATTERNS[i] ?? [];
    for (const cell of cells) {
      set.add(cell);
    }
  }
  return set;
};

export function IngressDrift({
  id,
  eyebrow,
  lede,
  stations,
  coda,
}: IngressDriftProps) {
  const [active, setActive] = useState(0);
  const stationsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.idx ?? "0"))
          .sort((a, b) => a - b);
        if (visible.length > 0) {
          setActive(visible[0]);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of stationsRef.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const lit = litThrough(stations, active);

  return (
    <section className="section beige drift-section" id={id}>
      <div className="drift">
        <aside className="drift-anchor">
          <span className="section-eyebrow">
            <span className="dot" /> {eyebrow}
          </span>

          <h2 className="drift-claim">
            {stations.map((s, i) => (
              <span
                key={s.num}
                className={
                  "drift-claim-line" + (i === active ? " is-active" : "")
                }
                aria-hidden={i !== active}
              >
                {s.anchor}
              </span>
            ))}
          </h2>

          <p className="drift-lede">{lede}</p>

          <div className="drift-matrix" aria-hidden="true">
            <div
              className="drift-matrix-grid"
              style={{
                gridTemplateColumns: `repeat(${MATRIX_COLS}, 1fr)`,
              }}
            >
              {Array.from({ length: MATRIX_CELLS }).map((_, i) => (
                <span
                  key={i}
                  className={"cell" + (lit.has(i) ? " on" : "")}
                />
              ))}
            </div>
            <div className="drift-matrix-foot">
              <span className="drift-matrix-label">Coordination map</span>
              <span className="drift-matrix-spark">
                <span
                  className="drift-matrix-fill"
                  style={{
                    transform: `scaleX(${(lit.size / MATRIX_CELLS).toFixed(3)})`,
                  }}
                />
              </span>
            </div>
          </div>
        </aside>

        <ol className="drift-reel">
          {stations.map((s, i) => (
            <li
              key={s.num}
              data-idx={i}
              ref={(el) => {
                stationsRef.current[i] = el;
              }}
              className={
                "drift-station " +
                s.weight +
                (i === active ? " is-active" : "") +
                (i < active ? " is-past" : "")
              }
            >
              <Link
                href={s.href}
                className="drift-station-cover"
                aria-label={`Open ${s.title}`}
              />
              <div className="drift-station-spine">
                <span className="drift-station-num">{s.num}</span>
                <span className="drift-station-rule" />
              </div>
              <div className="drift-station-body">
                <h3 className="drift-station-title">
                  {s.title}
                  <span className="drift-station-arr" aria-hidden="true">
                    →
                  </span>
                </h3>
                <p className="drift-station-trigger">{s.trigger}</p>
                {s.metric ? (
                  <p
                    className="drift-station-metric"
                    aria-label="Coordination cost"
                  >
                    {s.metric}
                  </p>
                ) : null}
                {s.persona ? (
                  <p className="drift-station-persona">
                    <span className="drift-station-persona-mark" />
                    {s.persona}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {coda ? (
        <div className="drift-coda">
          <div className="drift-coda-inner">
            <span className="drift-coda-eyebrow">
              <span className="drift-coda-eyebrow-dot" /> {coda.eyebrow}
            </span>

            <p className="drift-coda-claim">
              <span className="drift-coda-claim-setup">{coda.claim.setup}</span>
              <span className="drift-coda-claim-punch">{coda.claim.punch}</span>
            </p>

            <div className="drift-coda-rule" />

            <p className="drift-coda-closer">{coda.closer}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
