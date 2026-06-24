import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ProportionTone } from "./matrix-proportion";

export interface FunnelStage {
  /** Stage label (left, mono uppercase). */
  label: ReactNode;
  /** Cells filled for this stage. */
  value: number;
  /** Visual tone; default "on" (brand). */
  tone?: ProportionTone;
}

export interface MatrixFunnelProps extends HTMLAttributes<HTMLDivElement> {
  /** Ordered stages, top to bottom. The first stage's value sets the total. */
  stages: FunnelStage[];
  /** Total cells per row (the denominator). Defaults to first stage's value. */
  total?: number;
  /** Visible cells per row in the grid. Default 40 (renders sharp at common widths). */
  cols?: number;
  /** Suffix shown after each value ("%", "items"). */
  unit?: ReactNode;
}

/**
 * M.24 — Matrix funnel.
 *
 * A multi-row retention chart. Each row is a stage of a process; the filled
 * cells visualize how many items make it that far. The empty cells are the
 * dropoff — the story is what falls out, stage by stage.
 */
export function MatrixFunnel({
  stages,
  total,
  cols = 40,
  unit = "%",
  className,
  style,
  ...rest
}: MatrixFunnelProps) {
  const denom = total ?? stages[0]?.value ?? cols;
  return (
    <div className={cn("mfunnel", className)} style={style} {...rest}>
      <div className="mfunnel-rows">
        {stages.map((stage, i) => {
          const filled = Math.max(0, Math.min(denom, stage.value));
          const filledCols = Math.round((filled / denom) * cols);
          const tone = stage.tone ?? "on";
          return (
            <div className="mfunnel-row" key={i}>
              <div className="meta">
                <span className="step">{(i + 1).toString().padStart(2, "0")}</span>
                <span className="lab">{stage.label}</span>
              </div>
              <div
                className="mfunnel-grid"
                style={{ "--mfunnel-cols": cols } as React.CSSProperties}
                role="img"
                aria-label={`${stage.value} of ${denom}`}
              >
                {Array.from({ length: cols }).map((_, j) => (
                  <span key={j} className={cn("cell", j < filledCols && tone)} />
                ))}
              </div>
              <div className="value">
                {stage.value}
                {unit ? <small>{unit}</small> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
