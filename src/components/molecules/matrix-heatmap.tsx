import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { CellState } from "@/components/atoms";

export interface MatrixHeatmapRow {
  label: ReactNode;
  /** One CellState per column. Length must equal cols. */
  cells: CellState[];
}

export interface MatrixHeatmapProps extends HTMLAttributes<HTMLDivElement> {
  /** Row data, top to bottom. */
  rows: MatrixHeatmapRow[];
  /** Column count — must match each row's cells length. */
  cols: number;
  /** Optional x-axis labels, length = cols. */
  colLabels?: ReactNode[];
  /** Show the legend swatches below. Default true. */
  showScale?: boolean;
}

/**
 * M.22 — Matrix heatmap.
 *
 * 2D grid where each cell has four intensity levels (off / low / mid / on).
 * Use for activity densities — day × hour, week × team, quarter × workflow —
 * where the answer is "where does the heat live?" rather than an exact value.
 */
export function MatrixHeatmap({
  rows,
  cols,
  colLabels,
  showScale = true,
  className,
  style,
  ...rest
}: MatrixHeatmapProps) {
  return (
    <div
      className={cn("mheat-wrap", className)}
      style={style}
      {...rest}
    >
      <div
        className="mheat"
        style={{ "--mheat-cols": cols } as React.CSSProperties}
      >
        <div className="rows">
          {rows.map((row, i) => (
            <span key={i} className="row-lab">
              {row.label}
            </span>
          ))}
        </div>
        <div className="grid">
          {rows.map((row, ri) => (
            <div className="row" key={ri}>
              {row.cells.map((state, ci) => (
                <span
                  key={ci}
                  className={cn(
                    "cell",
                    state === "low" && "low",
                    state === "mid" && "mid",
                    state === "on" && "on",
                  )}
                />
              ))}
            </div>
          ))}
        </div>
        {colLabels ? (
          <div className="col-labels">
            {colLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        ) : null}
      </div>
      {showScale ? (
        <div
          className="mheat-scale"
          style={{ marginTop: colLabels ? 12 : 16 }}
        >
          <span>Less</span>
          <span className="swatches">
            <span className="sw-cell off" />
            <span className="sw-cell low" />
            <span className="sw-cell mid" />
            <span className="sw-cell on" />
          </span>
          <span>More</span>
        </div>
      ) : null}
    </div>
  );
}
