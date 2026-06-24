import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ProportionTone = "on" | "mid" | "warn" | "err";

export interface ProportionSegment {
  label: ReactNode;
  /** Number of cells (or %, if total = 100). */
  value: number;
  /** Visual tone. */
  tone: ProportionTone;
  /** Optional one-line caption shown under the value. */
  caption?: ReactNode;
}

export interface MatrixProportionProps extends HTMLAttributes<HTMLDivElement> {
  segments: ProportionSegment[];
  /** Total cells in the grid; default 100. */
  total?: number;
  /** Columns in the cell grid; default 20 (giving 5 rows at total=100). */
  cols?: number;
  /** Suffix shown after each value ("%", "items", etc.). */
  unit?: ReactNode;
}

/**
 * M.23 — Matrix proportion.
 *
 * N-cell grid broken into colored segments, with a legend that lists each
 * segment's share. Reads as a parts-of-whole — "where do CAPAs end up?",
 * "what blocks closure?" — without the false precision of a pie chart.
 */
export function MatrixProportion({
  segments,
  total = 100,
  cols = 20,
  unit = "%",
  className,
  style,
  ...rest
}: MatrixProportionProps) {
  // Build the flat cell array by drawing each segment's count, in order.
  const cells: ProportionTone[] = [];
  for (const seg of segments) {
    const count = Math.max(0, Math.min(total - cells.length, Math.round(seg.value)));
    for (let i = 0; i < count; i++) cells.push(seg.tone);
  }
  // Pad with "off" so we always render exactly `total` cells.
  while (cells.length < total) cells.push("on");
  const remaining = total - cells.filter(Boolean).length;
  void remaining;

  return (
    <div
      className={cn("mprop", className)}
      style={style}
      {...rest}
    >
      <div
        className="mprop-grid"
        style={{ "--mprop-cols": cols } as React.CSSProperties}
        role="img"
        aria-label={`Proportion grid · ${total} cells`}
      >
        {Array.from({ length: total }).map((_, i) => {
          const tone = cells[i];
          // If we exceeded segment totals, leave as off (default n-100).
          const isOverflow =
            i >= segments.reduce((s, seg) => s + Math.round(seg.value), 0);
          return (
            <span
              key={i}
              className={cn("cell", !isOverflow && tone)}
            />
          );
        })}
      </div>
      <div className="mprop-legend">
        {segments.map((seg, i) => (
          <div key={i} className="item">
            <span className={cn("sw-cell", seg.tone)} />
            <span className="lab">{seg.label}</span>
            <span className="v">
              {seg.value}
              <span
                style={{
                  fontSize: 12,
                  color: "var(--n-500)",
                  marginLeft: 2,
                  fontFamily: "var(--u-mono)",
                  letterSpacing: "0.05em",
                }}
              >
                {unit}
              </span>
            </span>
            {seg.caption ? <span className="desc">{seg.caption}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
