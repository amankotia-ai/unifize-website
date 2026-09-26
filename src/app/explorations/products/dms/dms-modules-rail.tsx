"use client";
/* ============================================================================
 * 02 · MODULES · sticky rail ledger.
 * Three module rows stacked on ink. A rail of module names pins to the top
 * left while the rows pass; the active name follows the row in view and
 * clicking a name scrolls to its row. Each row is text on the left and a
 * flat colour field on the right that bleeds to the viewport edge, with the
 * module's arcade scene sitting on the field. Replaces the click-to-swap explorer for this section (Sep 2026,
 * after the voidzero.dev reference).
 * ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { MODULES } from "./dms-data";
import { Eyebrow } from "./dms-primitives";
import { ArcadeStepScene, type ArcadeStepConfig } from "../_shared/arcade/arcade";
import "./dms-modules-rail.css";

/* a sibling page (QMS) passes its own modules; `visual` is DMS-only */
type Module = Omit<(typeof MODULES)[number], "visual">;

function RailIcon({ moduleKey }: { moduleKey: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (moduleKey === "change-control") {
    return (
      <svg {...common}>
        <circle cx="4" cy="3.5" r="1.6" /><circle cx="4" cy="12.5" r="1.6" /><circle cx="12" cy="5.5" r="1.6" />
        <path d="M4 5.1v5.8M12 7.1c0 2.4-2.2 3-4.4 3.3C5.9 10.6 4.6 11 4 12" />
      </svg>
    );
  }
  /* MES modules (products/mes) */
  if (moduleKey === "work-order-management") {
    return (
      <svg {...common}>
        <path d="M4 2.5h8v12H4z" /><path d="M6.2 1.5h3.6v2H6.2z" /><path d="M6 7h4M6 9.5h4M6 12h2.5" />
      </svg>
    );
  }
  if (moduleKey === "etravellers") {
    return (
      <svg {...common}>
        <circle cx="3.5" cy="4" r="1.5" /><circle cx="12.5" cy="12" r="1.5" />
        <path d="M5 4h5.5a2 2 0 0 1 0 4h-5a2 2 0 0 0 0 4H11" />
      </svg>
    );
  }
  if (moduleKey === "fai-control-plan-execution") {
    return (
      <svg {...common}>
        <path d="M1.5 11 11 1.5l3.5 3.5L5 14.5z" /><path d="M4.5 8l1.5 1.5M6.8 5.7l1.5 1.5M9.1 3.4l1.5 1.5" />
      </svg>
    );
  }
  if (moduleKey === "inspections-forms-checklists") {
    return (
      <svg {...common}>
        <path d="m2 4 1.3 1.3L5.8 2.8M2 9.5l1.3 1.3 2.5-2.5" /><path d="M8 4h6M8 9.5h6M8 13.5h6" />
      </svg>
    );
  }
  if (moduleKey === "electronic-batch-lot-records") {
    return (
      <svg {...common}>
        <path d="M8 1.5 14 4.5 8 7.5 2 4.5z" /><path d="m2 8 6 3 6-3M2 11.5l6 3 6-3" />
      </svg>
    );
  }
  if (moduleKey === "training-management") {
    return (
      <svg {...common}>
        <path d="M1.5 6 8 3l6.5 3L8 9 1.5 6Z" /><path d="M4 7.2v3.3c0 1 1.8 2 4 2s4-1 4-2V7.2" /><path d="M14.5 6v3.5" />
      </svg>
    );
  }
  /* PLM modules */
  if (moduleKey === "product-specifications") {
    return (
      <svg {...common}>
        <path d="M8 1.5 14 5v6l-6 3.5L2 11V5z" /><path d="M8 14.5V8M8 8 2.2 4.8M8 8l5.8-3.2" />
      </svg>
    );
  }
  if (moduleKey === "product-risk-management") {
    return (
      <svg {...common}>
        <path d="M8 1.8 14.5 13.5h-13z" /><path d="M8 6.2v3.4M8 11.6v.1" />
      </svg>
    );
  }
  if (moduleKey === "design-controls-traceability") {
    return (
      <svg {...common}>
        <circle cx="3" cy="8" r="1.6" /><circle cx="8" cy="8" r="1.6" /><circle cx="13" cy="8" r="1.6" />
        <path d="M4.6 8h1.8M9.6 8h1.8" />
      </svg>
    );
  }
  if (moduleKey === "inspection-process-parameters") {
    return (
      <svg {...common}>
        <circle cx="7" cy="7" r="4.5" /><path d="m10.4 10.4 4.1 4.1M5 7h4" />
      </svg>
    );
  }
  if (moduleKey === "fmea-control-plan") {
    return (
      <svg {...common}>
        <rect x="1.5" y="2" width="13" height="12" /><path d="M1.5 6h13M1.5 10h13M6 2v12" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 1.5h5.5L13 5v9.5H4z" /><path d="M9.5 1.5V5H13" /><path d="M6 8h5M6 10.5h5" />
    </svg>
  );
}

/* the module's glyph: a page-supplied path when there is one, else the built-in set */
function ModuleGlyph({ moduleKey, iconPaths }: { moduleKey: string; iconPaths?: Record<string, string> }) {
  const d = iconPaths?.[moduleKey];
  if (!d) return <RailIcon moduleKey={moduleKey} />;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* Faint tiles on the colour field, so it reads as a surface rather than a
 * flat fill. Positions differ per module so the three rows do not rhyme. */
const TILES: Record<string, Array<[number, number, number]>> = {
  "document-control": [[3, 8, 1], [11, 8, 1], [3, 32, 1], [11, 32, 2], [3, 56, 3], [3, 80, 1]],
  "change-control": [[3, 8, 3], [3, 32, 1], [11, 32, 1], [19, 32, 1], [3, 56, 2], [3, 80, 3]],
  "training-management": [[3, 8, 1], [11, 8, 2], [3, 32, 3], [3, 56, 1], [11, 56, 1], [3, 80, 2]],
  "work-order-management": [[3, 8, 2], [3, 32, 1], [11, 32, 1], [3, 56, 3], [3, 80, 1]],
  etravellers: [[3, 8, 1], [11, 8, 1], [19, 8, 1], [3, 32, 2], [3, 56, 1], [3, 80, 3]],
  "fai-control-plan-execution": [[3, 8, 3], [3, 32, 1], [3, 56, 2], [11, 80, 1], [3, 80, 1]],
  "inspections-forms-checklists": [[3, 8, 1], [3, 32, 3], [3, 56, 1], [11, 56, 2], [3, 80, 1]],
  "electronic-batch-lot-records": [[3, 8, 2], [11, 32, 1], [3, 32, 1], [3, 56, 1], [3, 80, 2]],
};

/* Sticky-rail behaviour, shared with the homepage's way-in rail: the row
 * crossing the middle band of the viewport is active, the rail keeps the
 * active name in view when it scrolls sideways (phone), and a rail click
 * scrolls its row to the top. */
export function useStickyRail(count: number) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (!rows.length || typeof IntersectionObserver === "undefined") return;
    /* a row is "in view" when it crosses the middle band of the viewport */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.row));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rows.forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, [count]);

  /* on narrow screens the rail scrolls sideways: keep the active name in view */
  const railRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    const ul = railRef.current;
    const link = ul?.children[active]?.querySelector<HTMLElement>("button");
    if (!ul || !link || ul.scrollWidth <= ul.clientWidth) return;
    const target = link.offsetLeft - (ul.clientWidth - link.offsetWidth) / 2;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    ul.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const jumpTo = (i: number) => {
    const row = rowRefs.current[i];
    if (!row) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    row.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  };

  return { active, rowRefs, railRef, jumpTo };
}

export function ModuleRail({
  modules = MODULES,
  heading,
  lede,
  arcadeConfigsByModule,
  eyebrow = "What is bundled",
  ariaLabel = "DMS modules",
  iconPaths,
}: {
  modules?: Module[];
  heading: string;
  lede: string;
  eyebrow?: string;
  ariaLabel?: string;
  /* rail glyph per module key, as one 16-grid path (plain strings, so a
   * server page can pass them); keys without one use the built-in set */
  iconPaths?: Record<string, string>;
  /* one arcade pose per module key; the first config is the fallback */
  arcadeConfigsByModule: Record<string, ArcadeStepConfig>;
}) {
  const { active, rowRefs, railRef, jumpTo } = useStickyRail(modules.length);
  const fallbackConfig = Object.values(arcadeConfigsByModule)[0];

  return (
    <div className="dms-mrail">
      <div className="dms-wrap dms-mrail__head">
        <Eyebrow n={2}>{eyebrow}</Eyebrow>
        <h2 className="dms-h2">{heading}</h2>
        <p className="dms-lede">{lede}</p>
      </div>

      <div className="dms-mrail__ledger">
        {/* the column runs the full ledger height (it carries the divider);
          * the nav inside it is what sticks */}
        <div className="dms-mrail__railcol">
        <nav className="dms-mrail__rail" aria-label={ariaLabel}>
          <ul ref={railRef}>
            {modules.map((mod, i) => (
              <li key={mod.key}>
                <button
                  type="button"
                  className={"dms-mrail__link" + (i === active ? " is-active" : "")}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => jumpTo(i)}
                >
                  <ModuleGlyph moduleKey={mod.key} iconPaths={iconPaths} />
                  <span>{mod.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        </div>

        <div className="dms-mrail__rows">
          {modules.map((mod, i) => (
            <section
              key={mod.key}
              className="dms-mrail__row"
              data-row={i}
              data-module={mod.key}
              data-focus={(arcadeConfigsByModule[mod.key] ?? fallbackConfig).focus}
              id={`module-${mod.key}`}
              ref={(el) => { rowRefs.current[i] = el; }}
              aria-labelledby={`module-${mod.key}-title`}
            >
              <div className="dms-mrail__text">
                <span className="dms-mrail__eyebrow">
                  <ModuleGlyph moduleKey={mod.key} iconPaths={iconPaths} />
                  {mod.name}
                </span>
                <h3 className="dms-mrail__title" id={`module-${mod.key}-title`}>{mod.promise}</h3>
                <p className="dms-mrail__blurb">{mod.blurb}</p>
                <ul className="dms-mrail__points">
                  {mod.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <div className="dms-mrail__standards" aria-label="Standards supported by this module">
                  {mod.standards.map((standard) => <span key={standard}>{standard}</span>)}
                </div>
              </div>
              <div className="dms-mrail__stage" aria-hidden="true">
                <div className="dms-mrail__tiles">
                  {(TILES[mod.key] ?? TILES["document-control"]).map(([x, y, w], t) => (
                    <i key={t} style={{ left: `${x}%`, top: `${y}%`, width: `calc(${w} * var(--tile) + ${w - 1} * var(--tile-gap))` }} />
                  ))}
                </div>
                <div className="dms-mrail__scene">
                  <ArcadeStepScene config={arcadeConfigsByModule[mod.key] ?? fallbackConfig} />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
