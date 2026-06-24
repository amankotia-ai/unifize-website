"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/atoms/chip";

export interface SurfaceTabsPanel {
  label: ReactNode;
  /** Rule statement (h3). */
  rule: ReactNode;
  /** Supporting paragraph. */
  body: ReactNode;
  /** Chip labels rendered under the body. */
  chips?: ReactNode[];
  /** Label above the chips. Defaults to "Coverage". */
  chipsLabel?: ReactNode;
  /** Violation example (right column). */
  violation: {
    /** Mono uppercase head label (e.g. "Rule detected"). */
    head?: ReactNode;
    /** Inline JSX or string. Use <strong> to mark the offending phrase. */
    body: ReactNode;
    /** Footer line. */
    foot: ReactNode;
    /** Optional suggested rewrite shown above the footer. */
    suggestion?: {
      label?: ReactNode;
      body: ReactNode;
    };
  };
}

export interface SurfaceTabsProps {
  /** Section eyebrow numeral (e.g. "05"). */
  num?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  panels: SurfaceTabsPanel[];
  className?: string;
}

const AlertIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M6 1.5v5M6 9v1.5" />
    <circle cx="6" cy="6" r="5" />
  </svg>
);

/**
 * O.21 — Surface tabs. Full-section tabbed module: eyebrow + title +
 * tab strip + two-column panel (rule statement · violation example).
 * Light surface only — dark + tabs reads as a dashboard, not marketing.
 */
export function SurfaceTabs({
  num,
  eyebrow,
  title,
  panels,
  className,
}: SurfaceTabsProps) {
  const [active, setActive] = useState(0);
  const panel = panels[active];

  return (
    <div className={cn("surface-tabs", className)}>
      <div className="stbs-head">
        {(num || eyebrow) && (
          <span className="section-eyebrow">
            {num !== undefined && <span className="num">{num}</span>}
            {eyebrow}
          </span>
        )}
        {title && <h2 className="section-title">{title}</h2>}
      </div>

      <div className="tabs">
        {panels.map((p, i) => (
          <button
            key={i}
            type="button"
            className={cn("tab", i === active && "is-on")}
            onClick={() => setActive(i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {panel && (
        <div className="stbs-grid">
          <div className="stbs-rule">
            <h3>{panel.rule}</h3>
            <p>{panel.body}</p>
            {panel.chips && (
              <div className="stbs-coverage">
                <span className="coverage-label">
                  {panel.chipsLabel ?? "Coverage"}
                </span>
                <div className="chips">
                  {panel.chips.map((c, i) => (
                    <Chip key={i}>{c}</Chip>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="violation-card">
            <div className="head">
              {AlertIcon}
              {panel.violation.head ?? "Rule detected"}
            </div>
            <p className="quote">{panel.violation.body}</p>
            {panel.violation.suggestion && (
              <div className="suggestion">
                <span className="suggestion-label">
                  {panel.violation.suggestion.label ?? "Suggested rewrite"}
                </span>
                <p>{panel.violation.suggestion.body}</p>
              </div>
            )}
            <div className="foot">{panel.violation.foot}</div>
          </div>
        </div>
      )}
    </div>
  );
}
