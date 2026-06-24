import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DeltaTone = "up" | "flat";

export interface StatWithDeltaProps {
  lab: ReactNode;
  /** Big display number, e.g. "12,680". */
  value: ReactNode;
  /** Optional inline delta string, e.g. "↑ 18× YoY". */
  delta?: ReactNode;
  /** Tone: "up" = brand blue (movement), "flat" = muted (no change). */
  deltaTone?: DeltaTone;
  className?: string;
}

/**
 * M.15 — Stat with delta. Big-number stat that carries a
 * direction-of-change indicator. Single, dramatic, inline with chart
 * context — different from M.03 stat block, which is a 4-up row.
 */
export function StatWithDelta({
  lab,
  value,
  delta,
  deltaTone = "up",
  className,
}: StatWithDeltaProps) {
  return (
    <div className={cn("stat-d", className)}>
      <span className="lab">{lab}</span>
      <span className="v">
        {value}
        {delta && <span className={cn("delta", deltaTone)}>{delta}</span>}
      </span>
    </div>
  );
}
