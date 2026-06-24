"use client";

import { useEffect, useRef, useState } from "react";

type Weight = "deep" | "light";

interface Station {
  num: string;
  title: string;
  persona: string;
  trigger: string;
  metric: string;
  anchor: string;
  weight: Weight;
}

const STATIONS: Station[] = [
  {
    num: "01",
    title: "Quality",
    persona: "VP Quality",
    trigger:
      "A CAPA opens. Five people own different pieces of the same thread before the record exists.",
    metric: "6 owners · 1 thread",
    anchor: "It begins in Quality.",
    weight: "deep",
  },
  {
    num: "02",
    title: "Document Control",
    persona: "Doc Control",
    trigger:
      "A revision goes out for sign-off. Twelve names. One spreadsheet. Two reminders by Friday.",
    metric: "12 sign-offs · one spreadsheet",
    anchor: "Then in Document Control.",
    weight: "deep",
  },
  {
    num: "03",
    title: "Change Control",
    persona: "Director, R&D",
    trigger:
      "A part number changes. Design transfer touches six teams and a calendar of meetings.",
    metric: "6 functions · 9 weeks to close",
    anchor: "Then in Change Control.",
    weight: "deep",
  },
  {
    num: "04",
    title: "Training",
    persona: "Head of Training",
    trigger:
      "A new SOP lands. A role-based cascade fires. The auditor will ask for the trail.",
    metric: "1 cascade · zero open trace",
    anchor: "Then in Training.",
    weight: "deep",
  },
  {
    num: "05",
    title: "Supplier Quality",
    persona: "Supplier Quality",
    trigger:
      "A supplier deviation arrives. The SCAR cycle starts in email and ages there.",
    metric: "60% of SCARs · zero QMS trace",
    anchor: "And in Supplier Quality.",
    weight: "light",
  },
  {
    num: "06",
    title: "New Product Development",
    persona: "NPI PM",
    trigger:
      "A phase-gate review is due. The DHF is spread across nine folders and three drives.",
    metric: "9 folders · 3 drives",
    anchor: "And in NPD.",
    weight: "light",
  },
  {
    num: "07",
    title: "Operations",
    persona: "Ops Director",
    trigger:
      "A hold is called on the floor. Disposition needs three sign-offs by end of shift.",
    metric: "3 sign-offs · one shift",
    anchor: "On the Operations floor.",
    weight: "light",
  },
  {
    num: "08",
    title: "Customer Management",
    persona: "Customer Quality",
    trigger:
      "A complaint is logged. FAT and SAT run through the customer's QA inbox.",
    metric: "4 owners · one customer inbox",
    anchor: "In Customer Management.",
    weight: "light",
  },
  {
    num: "09",
    title: "Compliance",
    persona: "Head of Compliance",
    trigger:
      "A finding lands from the regulator. The response plan needs every committed action by name.",
    metric: "23 commitments · zero closure trail",
    anchor: "In Compliance.",
    weight: "light",
  },
  {
    num: "10",
    title: "Regulatory Affairs",
    persona: "RA Manager",
    trigger:
      "A submission window opens. Coordination is everywhere at once and timed to the hour.",
    metric: "30+ owners · hours of latency",
    anchor: "In Regulatory Affairs.",
    weight: "light",
  },
  {
    num: "11",
    title: "Periodic Review",
    persona: "Quality Director",
    trigger:
      "The annual review approaches. Last year's evidence is hard to find and harder to defend.",
    metric: "12 months back · zero index",
    anchor: "In Periodic Review.",
    weight: "light",
  },
  {
    num: "12",
    title: "Supply Chain",
    persona: "SC Director",
    trigger:
      "Material disposition sits on top of dual-sourcing decisions sitting on top of audit asks.",
    metric: "3 decisions stacked · zero owner",
    anchor: "In Supply Chain.",
    weight: "light",
  },
  {
    num: "13",
    title: "Risk",
    persona: "Risk Lead",
    trigger:
      "A post-market signal is flagged. The risk file needs an update and a sign-off and a record.",
    metric: "1 signal · 3 hops",
    anchor: "In Risk.",
    weight: "light",
  },
  {
    num: "14",
    title: "Internal Audit",
    persona: "Internal Audit",
    trigger:
      "The audit programme runs. Every finding needs a closure trace someone can stand behind.",
    metric: "1 finding · zero line of sight",
    anchor: "In Internal Audit.",
    weight: "light",
  },
  {
    num: "15",
    title: "Post-Market",
    persona: "PMS Lead",
    trigger:
      "Complaints trend upward. Vigilance needs evidence yesterday and a story for the regulator.",
    metric: "47 complaints · zero narrative",
    anchor: "And it does not stop.",
    weight: "light",
  },
];

const MATRIX_COLS = 14;
const MATRIX_ROWS = 7;
const MATRIX_CELLS = MATRIX_COLS * MATRIX_ROWS;

/**
 * Per-station cell pattern. Each station lights a cluster of cells.
 * Pre-computed deterministic indices so the matrix accumulates as a "map"
 * rather than a strict left-to-right progress bar — clusters move around
 * the grid, suggesting how the tax shows up *all over* the org.
 */
const STATION_CELL_PATTERN: number[][] = [
  // 01 — upper-left cluster
  [0, 1, 14, 15, 28, 29, 42],
  // 02 — top mid-right band
  [4, 5, 6, 19, 20, 33],
  // 03 — top-right corner
  [10, 11, 12, 13, 25, 27],
  // 04 — left edge mid
  [16, 30, 31, 44, 45],
  // 05 — middle band left
  [32, 46, 47, 60, 61],
  // 06 — middle band center
  [34, 35, 48, 49, 62],
  // 07 — middle band right
  [37, 38, 51, 52, 65],
  // 08 — right edge
  [40, 41, 54, 55, 68, 69],
  // 09 — lower-left
  [56, 57, 70, 71, 84],
  // 10 — lower-mid left
  [58, 72, 85, 86],
  // 11 — lower-mid center
  [59, 73, 74, 87],
  // 12 — lower-mid right
  [63, 64, 75, 88],
  // 13 — lower-right cluster
  [66, 67, 76, 77, 89, 90],
  // 14 — bottom row mid
  [78, 79, 92, 93],
  // 15 — bottom-right closer
  [80, 81, 82, 83, 94, 95, 96, 97],
];

const flatLitThrough = (index: number): Set<number> => {
  const set = new Set<number>();
  for (let i = 0; i <= index; i++) {
    for (const cell of STATION_CELL_PATTERN[i] ?? []) {
      set.add(cell);
    }
  }
  return set;
};

export function DomainDrift() {
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
      {
        // Activation band: middle ~10% of viewport
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );
    for (const el of stationsRef.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const lit = flatLitThrough(active);

  return (
    <section className="section beige drift-section" id="domains">
      <div className="drift">
        <aside className="drift-anchor">
          <span className="section-eyebrow">
            <span className="dot" /> Where it shows up
          </span>

          <h2 className="drift-claim">
            {STATIONS.map((s, i) => (
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

          <p className="drift-lede">
            Each is a named door — a persona, a workflow, a trigger. None
            were designed to live in the seam between systems.
          </p>

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
          {STATIONS.map((s, i) => (
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
              <div className="drift-station-spine">
                <span className="drift-station-num">{s.num}</span>
                <span className="drift-station-rule" />
              </div>
              <div className="drift-station-body">
                <h3 className="drift-station-title">{s.title}</h3>
                <p className="drift-station-trigger">{s.trigger}</p>
                <p className="drift-station-metric" aria-label="Coordination cost">
                  {s.metric}
                </p>
                <p className="drift-station-persona">
                  <span className="drift-station-persona-mark" />
                  {s.persona}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="drift-coda">
        <div className="drift-coda-inner">
          <span className="drift-coda-eyebrow">
            <span className="drift-coda-eyebrow-dot" /> The thesis
          </span>

          <p className="drift-coda-claim">
            <span className="drift-coda-claim-setup">
              It is not a feature gap.
            </span>
            <span className="drift-coda-claim-punch">
              It is a <em>coordination</em> gap.
            </span>
          </p>

          <div className="drift-coda-rule" />

          <p className="drift-coda-closer">
            Wherever cross-functional work meets a regulated record,
            <span className="drift-coda-closer-em">
              {" "}
              coordination tax accumulates.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
