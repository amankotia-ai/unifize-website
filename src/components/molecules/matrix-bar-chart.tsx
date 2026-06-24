import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MatrixColumn } from "@/components/atoms";

export interface MatrixBarChartDatum {
  label: ReactNode;
  /** Cells filled from the bottom for this column. */
  value: number;
  /** Render this column muted (n-300) instead of brand blue. */
  muted?: boolean;
}

export interface MatrixBarChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Bars to render, left to right. */
  data: MatrixBarChartDatum[];
  /** Total cells per column; default 10. */
  cells?: number;
  /** Chart height in px (excluding axis); default 160. */
  height?: number;
  /** Optional annotation: y position 0–cells, label rendered at the right. */
  annotation?: {
    y: number;
    label: ReactNode;
  };
  /** Caption shown below x-axis labels. */
  caption?: ReactNode;
}

/**
 * M.21 — Matrix bar chart.
 *
 * A row of MatrixColumn bars with x-axis labels and an optional threshold
 * annotation. Use for time-series with a fixed cadence (months, quarters,
 * cohorts) where the data is best read in discrete cells rather than as a
 * smooth curve.
 */
export function MatrixBarChart({
  data,
  cells = 10,
  height = 160,
  annotation,
  caption,
  className,
  style,
  ...rest
}: MatrixBarChartProps) {
  const cols = data.length;
  // Annotation line position: invert (top is 0 in CSS).
  const annotY = annotation
    ? `${((cells - annotation.y) / cells) * 100}%`
    : null;

  return (
    <div
      className={cn("mbar-chart", className)}
      style={
        {
          "--mbar-cols": cols,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <div className="bars-wrap" style={{ height }}>
        <div className="bars" style={{ height: "100%" }}>
          {data.map((d, i) => (
            <MatrixColumn
              key={i}
              cells={cells}
              filled={d.value}
              tone={d.muted ? "mid" : "on"}
            />
          ))}
        </div>
        {annotation && annotY ? (
          <div className="annot" style={{ top: annotY }}>
            <span className="annot-label">{annotation.label}</span>
          </div>
        ) : null}
      </div>
      <div className="labels">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
      {caption ? <div className="axis-label">{caption}</div> : null}
    </div>
  );
}
