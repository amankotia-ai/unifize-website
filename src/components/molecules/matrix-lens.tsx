import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ProportionSegment, ProportionTone } from "./matrix-proportion";

export interface LensBand {
  /** Band label, sits on the left ("By industry"). */
  label: ReactNode;
  /** Segments — must sum to total (or less). */
  segments: ProportionSegment[];
}

export interface MatrixLensProps extends HTMLAttributes<HTMLDivElement> {
  /** One band per cut of the same total. */
  bands: LensBand[];
  /** Cells in each band's strip. Default 50. */
  cols?: number;
  /** Suffix for the inline segment values. */
  unit?: ReactNode;
}

/**
 * M.26 — Matrix lens.
 *
 * Multiple horizontal bands, each a different cut of the same dataset. Use
 * when the same total can be sliced multiple ways — by industry, by workflow,
 * by maturity — and you want all three answers visible at once.
 */
export function MatrixLens({
  bands,
  cols = 50,
  unit = "%",
  className,
  style,
  ...rest
}: MatrixLensProps) {
  function renderCells(segments: ProportionSegment[]) {
    const cells: (ProportionTone | null)[] = [];
    for (const seg of segments) {
      const n = Math.max(0, Math.min(cols - cells.length, Math.round((seg.value / 100) * cols)));
      for (let i = 0; i < n; i++) cells.push(seg.tone);
    }
    while (cells.length < cols) cells.push(null);
    return cells;
  }

  return (
    <div className={cn("mlens", className)} style={style} {...rest}>
      {bands.map((band, bi) => {
        const cells = renderCells(band.segments);
        return (
          <div className="mlens-band" key={bi}>
            <div className="lab">{band.label}</div>
            <div className="mlens-strip">
              <div
                className="mlens-cells"
                style={{ "--mlens-cols": cols } as React.CSSProperties}
                role="img"
                aria-label={`${band.segments.length} segment band`}
              >
                {cells.map((tone, i) => (
                  <span key={i} className={cn("cell", tone)} />
                ))}
              </div>
              <div className="mlens-meta">
                {band.segments.map((seg, i) => (
                  <span className="seg" key={i}>
                    <span className={cn("dot", seg.tone)} />
                    {seg.label}{" "}
                    <span className="v">
                      {seg.value}
                      {unit}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
