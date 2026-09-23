"use client";
/* ============================================================================
 * 01 · CHOOSE YOUR WAY IN · sticky rail ledger, light.
 * The homepage's three ways in (by solution, by product, by industry) as
 * the DMS page's module rail: way-in names pin top left while three rows
 * pass, each row text on the left and a flat colour field on the right that
 * bleeds to the viewport edge, with an arcade pose sitting on the field.
 * Same grammar as products/dms/dms-modules-rail.tsx, on the light surface
 * (Sep 2026, after the three-card grid read as dull).
 * ========================================================================== */
import Link from "next/link";
import type { ReactNode } from "react";
import { useStickyRail } from "../products/dms/dms-modules-rail";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";
import { PLATFORM_BUILDER_CONFIG } from "../platform/platform-arcade";
import { HOME_WAY_SOLUTION_CONFIG } from "./home-arcade";
import { TRACE_STEPS as MD_TRACE_STEPS } from "../industry-template-modern/itm-arcade";
import "../products/dms/dms-modules-rail.css";
import "./home-ways-rail.css";

export type WayIn = {
  key: string;
  label: string;
  title: string;
  body: string;
  links: { name: string; meta: string; href: string; icon?: ReactNode }[];
  href: string;
  cta: string;
};

/* Each way in poses the arcade window on a moment the hero and the suite do
 * not already stage (no chat thread four times over). Resolved here, on the
 * client, because the industry pose lives in a client module the server
 * page cannot read as data:
 *   solution - the home queue, tiled by the process areas the row links to
 *   product  - the process builder: the system, configured not coded
 *   industry - the impact assessment bound on a device change: the regulated
 *              world's evidence chain (ISO 14971 risk file, training scope) */
const WAY_CONFIGS: Record<string, ArcadeStepConfig> = {
  solution: HOME_WAY_SOLUTION_CONFIG,
  product: PLATFORM_BUILDER_CONFIG,
  industry: MD_TRACE_STEPS[1].config,
};

/* the three way-in glyphs at rail size: one stroke, one weight */
function RailIcon({ wayKey }: { wayKey: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (wayKey === "solution") {
    return (
      <svg {...common}>
        <path d="M3.5 5.5h5M3.5 12h5.5M3.5 18.5h5M8.5 5.5c4.5 0 3.5 6.5 8 6.5M8.5 18.5c4.5 0 3.5-6.5 8-6.5M14 12h6.5M17.5 9l3 3-3 3" />
      </svg>
    );
  }
  if (wayKey === "product") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="7" height="7" />
        <rect x="13.5" y="3.5" width="7" height="7" />
        <rect x="8.5" y="13.5" width="7" height="7" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="4" y="3" width="16" height="13.5" />
      <path d="M7.5 7h9M7.5 10h9M7.5 13h5" />
      <circle cx="15.5" cy="16.5" r="2.6" />
      <path d="M14.2 18.8L13.4 22l2.1-1.3 2.1 1.3-.8-3.2" />
    </svg>
  );
}

/* Faint tiles on the colour field so it reads as a surface; positions
 * differ per row so the three do not rhyme. */
const TILES: Record<string, Array<[number, number, number]>> = {
  solution: [[3, 8, 1], [11, 8, 1], [3, 32, 1], [11, 32, 2], [3, 56, 3], [3, 80, 1]],
  product: [[3, 8, 3], [3, 32, 1], [11, 32, 1], [19, 32, 1], [3, 56, 2], [3, 80, 3]],
  industry: [[3, 8, 1], [11, 8, 2], [3, 32, 3], [3, 56, 1], [11, 56, 1], [3, 80, 2]],
};

export function HomeWaysRail({ ways }: { ways: WayIn[] }) {
  const { active, rowRefs, railRef, jumpTo } = useStickyRail(ways.length);
  const configFor = (key: string) => WAY_CONFIGS[key] ?? WAY_CONFIGS.solution;

  return (
    <div className="dms-mrail dms-mrail--light hm-ways">
      <div className="dms-mrail__ledger">
        <div className="dms-mrail__railcol">
          <nav className="dms-mrail__rail" aria-label="Ways in">
            <ul ref={railRef}>
              {ways.map((way, i) => (
                <li key={way.key}>
                  <button
                    type="button"
                    className={"dms-mrail__link" + (i === active ? " is-active" : "")}
                    aria-current={i === active ? "true" : undefined}
                    onClick={() => jumpTo(i)}
                  >
                    <RailIcon wayKey={way.key} />
                    <span>{way.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="dms-mrail__rows">
          {ways.map((way, i) => (
            <section
              key={way.key}
              className="dms-mrail__row"
              data-row={i}
              data-way={way.key}
              data-focus={configFor(way.key).focus}
              id={`way-${way.key}`}
              ref={(el) => { rowRefs.current[i] = el; }}
              aria-labelledby={`way-${way.key}-title`}
            >
              <div className="dms-mrail__text">
                <span className="dms-mrail__eyebrow">
                  <span className="dms-data">{String(i + 1).padStart(2, "0")}</span> {way.label}
                </span>
                <h3 className="dms-mrail__title" id={`way-${way.key}-title`}>{way.title}</h3>
                <p className="dms-mrail__blurb">{way.body}</p>
                <ul className="hm-ways__links">
                  {way.links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        {item.icon ? <span className="hm-ways__glyph" aria-hidden="true">{item.icon}</span> : null}
                        <span className="hm-ways__name">{item.name}</span>
                        <small>{item.meta}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="hm-ways__all" href={way.href}>
                  {way.cta} <span aria-hidden="true">&darr;</span>
                </Link>
              </div>
              <div className="dms-mrail__stage" aria-hidden="true">
                <div className="dms-mrail__tiles">
                  {(TILES[way.key] ?? TILES.solution).map(([x, y, w], t) => (
                    <i key={t} style={{ left: `${x}%`, top: `${y}%`, width: `calc(${w} * var(--tile) + ${w - 1} * var(--tile-gap))` }} />
                  ))}
                </div>
                <div className="dms-mrail__scene">
                  <ArcadeStepScene config={configFor(way.key)} />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
