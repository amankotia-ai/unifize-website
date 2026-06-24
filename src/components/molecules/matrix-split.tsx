import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ProportionSegment, ProportionTone } from "./matrix-proportion";

export interface SplitDataset {
  /** Label shown above this dataset's grid ("Before Unifize · Q3 2024"). */
  label: ReactNode;
  /** Segments (same tones as the paired dataset, in the same order). */
  segments: ProportionSegment[];
  /** Short marker shown alongside the label ("A" / "B" / "01" / "02"). */
  marker?: ReactNode;
}

export interface MatrixSplitProps extends HTMLAttributes<HTMLDivElement> {
  /** The "before" / baseline dataset. */
  before: SplitDataset;
  /** The "after" / comparison dataset. */
  after: SplitDataset;
  /** Total cells per grid. Default 100. */
  total?: number;
  /** Columns in each grid. Default 20 (gives 5 rows). */
  cols?: number;
  /** Value suffix shown next to each segment value. */
  unit?: ReactNode;
}

/**
 * M.25 — Matrix split.
 *
 * Two proportions of the same shape, stacked. Same legend categories, same
 * total, different distributions. Use for before / after, cohort A / cohort B,
 * or any "watch this number move" story.
 */
export function MatrixSplit({
  before,
  after,
  total = 100,
  cols = 20,
  unit = "%",
  className,
  style,
  ...rest
}: MatrixSplitProps) {
  const datasets = [before, after] as const;

  function renderGrid(ds: SplitDataset) {
    const cells: (ProportionTone | null)[] = [];
    for (const seg of ds.segments) {
      const n = Math.max(0, Math.min(total - cells.length, Math.round(seg.value)));
      for (let i = 0; i < n; i++) cells.push(seg.tone);
    }
    while (cells.length < total) cells.push(null);
    return (
      <div
        className="msplit-grid"
        style={{ "--msplit-cols": cols } as React.CSSProperties}
        role="img"
        aria-label={`${total} cells`}
      >
        {cells.map((tone, i) => (
          <span key={i} className={cn("cell", tone)} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("msplit", className)} style={style} {...rest}>
      {datasets.map((ds, i) => (
        <div className="msplit-block" key={i}>
          <div className="msplit-head">
            <span className="marker">{ds.marker ?? (i === 0 ? "A" : "B")}</span>
            <span className="lab">{ds.label}</span>
          </div>
          {renderGrid(ds)}
        </div>
      ))}
      <div className="msplit-legend">
        {before.segments.map((seg, i) => {
          const afterSeg = after.segments[i];
          return (
            <div key={i} className="item">
              <span className={cn("sw-cell", seg.tone)} />
              <span className="lab">{seg.label}</span>
              <span className="v muted">
                {seg.value}
                {unit ? <small>{unit}</small> : null}
              </span>
              <span className="arr">→</span>
              <span className="v live">
                {afterSeg?.value ?? "—"}
                {unit ? <small>{unit}</small> : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
