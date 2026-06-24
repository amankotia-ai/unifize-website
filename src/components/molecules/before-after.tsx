import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

const CircleMinus = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M5.5 8h5" />
  </svg>
);

const CircleCheck = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="6.5" />
    <polyline points="5 8 7 10 11 6" />
  </svg>
);

export interface BeforeAfterProps {
  /** Label for the "before" column. Defaults to "Before". */
  beforeLabel?: ReactNode;
  beforeItems: ReactNode[];
  /** Label for the "after" column. Defaults to "With Unifize". */
  afterLabel?: ReactNode;
  afterItems: ReactNode[];
  className?: string;
}

/**
 * M.18 — Before / After. Two-column comparison.
 * Before: grey rule + circle-minus bullets.
 * After: brand-blue rule + circle-check bullets.
 * The After column should always be at least as long as Before.
 */
export function BeforeAfter({
  beforeLabel = "Before",
  beforeItems,
  afterLabel = "With Unifize",
  afterItems,
  className,
}: BeforeAfterProps) {
  return (
    <div className={cn("bna", className)}>
      <div className="col">
        <div className="col-lab">{beforeLabel}</div>
        <ul>
          {beforeItems.map((it, i) => (
            <li key={i}>
              {CircleMinus}
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col after">
        <div className="col-lab">{afterLabel}</div>
        <ul>
          {afterItems.map((it, i) => (
            <li key={i}>
              {CircleCheck}
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
