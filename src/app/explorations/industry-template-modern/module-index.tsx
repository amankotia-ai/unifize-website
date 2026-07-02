"use client";

/* ============================================================================
 * Module index (modern skin) — the MODULE INGRESS (Coverage section). An
 * interactive domain explorer: a vertical tab list of the 9 domains + a panel
 * showing the selected domain's modules, cross-filterable "by standard". Logic
 * is identical to the champion; the class names (itm-mi, itm-explorer, itm-tab,
 * itm-mod) and a11y are the only changes:
 *   - disabled (0-count) domain tabs convey their reason via aria-describedby
 *     pointing at a visually-hidden explanation (not title-only).
 * ========================================================================== */

import { useMemo, useState } from "react";
import Link from "next/link";
import { MD_DOMAIN_MAP } from "@/lib/platform-data/md-module-map";
import { STANDARD_FILTERS } from "./industry-data";

export function ModuleIndex() {
  const [standard, setStandard] = useState<string | null>(null);
  const [slug, setSlug] = useState(MD_DOMAIN_MAP[0].slug);

  const domains = useMemo(
    () =>
      MD_DOMAIN_MAP.map((d) => ({
        ...d,
        filtered: standard ? d.modules.filter((m) => (m.standards ?? []).includes(standard)) : d.modules,
      })),
    [standard],
  );

  const available = domains.filter((d) => d.filtered.length > 0);
  // keep selection valid as the filter narrows the set
  const activeSlug = available.some((d) => d.slug === slug) ? slug : (available[0]?.slug ?? slug);
  const active = domains.find((d) => d.slug === activeSlug) ?? domains[0];

  return (
    <div className="itm-mi">
      <span id="itm-mi-disabled-reason" className="itm-sr-only">
        No modules evidence the selected standard
      </span>

      <div className="itm-mi__bar">
        <div className="itm-mi__filters" role="group" aria-label="Filter modules by standard">
          <button
            type="button"
            aria-pressed={standard === null}
            className={"itm-mi__filter" + (standard === null ? " is-active" : "")}
            onClick={() => setStandard(null)}
          >
            All standards
          </button>
          {STANDARD_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={standard === s}
              className={"itm-mi__filter" + (standard === s ? " is-active" : "")}
              onClick={() => setStandard((cur) => (cur === s ? null : s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="itm-explorer">
        <div className="itm-explorer__tabs" role="group" aria-label="Coordination domains">
          {domains.map((d) => {
            const disabled = d.filtered.length === 0;
            const isActive = d.slug === active.slug;
            return (
              <button
                key={d.slug}
                type="button"
                aria-pressed={isActive}
                aria-disabled={disabled}
                aria-describedby={disabled ? "itm-mi-disabled-reason" : undefined}
                tabIndex={disabled ? -1 : undefined}
                className={"itm-tab" + (isActive ? " is-active" : "") + (disabled ? " is-disabled" : "")}
                onClick={() => { if (!disabled) setSlug(d.slug); }}
              >
                <span className="itm-tab__name">{d.name}</span>
                <span className="itm-tab__meta">
                  <span className="itm-data itm-tab__count">{d.filtered.length}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="itm-explorer__panel" role="tabpanel" key={active.slug}>
          <div className="itm-explorer__head">
            <h3>{active.name}</h3>
            <p className="itm-explorer__promise">{active.promise}</p>
          </div>
          <div className="itm-explorer__mods">
            {active.filtered.map((m) => {
              const live = Boolean(m.href);
              const inner = (
                <>
                  <div className="itm-mod__top">
                    <span className="itm-mod__name">{m.name}</span>
                    {live ? (
                      <span className="itm-mod__badge">
                        <span className="itm-dot" aria-hidden="true" />
                        Live
                      </span>
                    ) : null}
                  </div>
                  <p className="itm-mod__blurb">{m.blurb}</p>
                  {m.standards && m.standards.length > 0 ? (
                    <div className="itm-mod__std">
                      {m.standards.map((s) => (
                        <span key={s} className={"itm-chip" + (standard === s ? " is-hit" : "")}>{s}</span>
                      ))}
                    </div>
                  ) : null}
                  {live ? <span className="itm-mod__go">Open module →</span> : null}
                </>
              );
              return live ? (
                <Link key={m.name} href={m.href!} className="itm-mod is-live">{inner}</Link>
              ) : (
                <div key={m.name} className="itm-mod is-soon">{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
