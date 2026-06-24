import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/* ============================================================
   F.11 · Matrix illustration primitives
   Three flat motifs. No isometric depth.
   ============================================================ */

export interface MatrixDotsProps extends HTMLAttributes<HTMLDivElement> {
  /** Pixel height of the dot-grid panel. */
  height?: number;
  /** Use the dark variant explicitly (otherwise inherits from surface). */
  dark?: boolean;
}
export function MatrixDots({
  height = 140,
  dark,
  className,
  style,
  ...rest
}: MatrixDotsProps) {
  return (
    <div
      role="img"
      aria-label="Dot-grid texture"
      className={cn("matrix-dots", dark && "dark", className)}
      style={{ height, ...style }}
      {...rest}
    />
  );
}

export type CellState = "off" | "low" | "mid" | "on";

export interface MatrixGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns; default 14 mirrors the design source. */
  cols?: number;
  /** Number of rows; default 5. */
  rows?: number;
  /**
   * Optional explicit cells (length = cols × rows). When omitted the
   * primitive uses the deterministic activation pattern from the source —
   * sparse-by-design, ≤15% on-cells, with a few mid (n-300) cells for
   * partial state.
   */
  cells?: CellState[];
}

/** Deterministic, sparse activation map. Mirrors the F.11 reference cell-for-cell. */
const DEFAULT_PATTERN: CellState[] = [
  // row 1
  "off","off","on","off","mid","off","on","off","off","mid","off","on","off","off",
  // row 2
  "mid","off","off","on","off","off","off","on","mid","off","off","off","on","off",
  // row 3
  "off","on","off","off","off","on","off","off","off","off","on","mid","off","off",
  // row 4
  "off","off","mid","off","on","off","off","mid","off","on","off","off","off","on",
  // row 5
  "on","off","off","off","off","off","on","off","off","off","mid","off","off","off",
];

export function MatrixGrid({
  cols = 14,
  rows = 5,
  cells,
  className,
  style,
  ...rest
}: MatrixGridProps) {
  const data = cells ?? DEFAULT_PATTERN.slice(0, cols * rows);
  return (
    <div
      role="img"
      aria-label="Sparse activation matrix"
      className={cn("matrix-grid", className)}
      style={
        {
          "--matrix-cols": cols,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {data.map((state, i) => (
        <span
          key={i}
          className={cn(
            "cell",
            state === "on" && "on",
            state === "mid" && "mid",
            state === "low" && "low",
          )}
        />
      ))}
    </div>
  );
}

/* ============================================================
   MatrixColumn — vertical bar primitive
   Stacked cells, filled from the bottom. Composed by bar charts
   and other column-style information displays.
   ============================================================ */

export interface MatrixColumnProps extends HTMLAttributes<HTMLDivElement> {
  /** Total cells in the column; default 10. */
  cells?: number;
  /** Cells filled from the bottom. Clamped to [0, cells]. */
  filled: number;
  /** Tone of the filled cells. */
  tone?: "on" | "mid";
}

export function MatrixColumn({
  cells = 10,
  filled,
  tone = "on",
  className,
  ...rest
}: MatrixColumnProps) {
  const filledClamped = Math.max(0, Math.min(cells, Math.round(filled)));
  return (
    <div
      role="img"
      aria-label={`${filledClamped} of ${cells}`}
      className={cn("mcol", className)}
      {...rest}
    >
      {Array.from({ length: cells }).map((_, i) => {
        const fromBottom = cells - 1 - i;
        const on = fromBottom < filledClamped;
        return (
          <span key={i} className={cn("cell", on && tone)} />
        );
      })}
    </div>
  );
}

export interface MatrixDividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Total dot count; default 28. */
  count?: number;
  /** Indices that should render as the brand-blue accent. */
  activeIndices?: number[];
}
export function MatrixDivider({
  count = 28,
  activeIndices = [2, 6, 11, 16, 21, 25],
  className,
  ...rest
}: MatrixDividerProps) {
  const active = new Set(activeIndices);
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("matrix-divider", className)}
      {...rest}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={cn("dot", active.has(i) && "on")} />
      ))}
    </div>
  );
}
