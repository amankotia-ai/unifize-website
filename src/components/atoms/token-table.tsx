import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * F.09 — Token-row table. Three-column grid: key · value · end.
 * `end` can be a colour swatch, a font sample, or anything inline.
 */

export interface TokenRowProps {
  k: ReactNode;
  v: ReactNode;
  end?: ReactNode;
  /** Render the `end` cell as a 30×14 colour swatch using this background. */
  swatch?: string;
}

export function TokenRow({ k, v, end, swatch }: TokenRowProps) {
  const endCell = swatch ? (
    <span
      className="end swatch"
      style={{ background: swatch, border: "1px solid var(--n-200)" }}
    />
  ) : end !== undefined ? (
    <span className="end">{end}</span>
  ) : (
    <span />
  );
  return (
    <div className="row">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      {endCell}
    </div>
  );
}

export interface TokenTableProps {
  rows: TokenRowProps[];
  className?: string;
}

export function TokenTable({ rows, className }: TokenTableProps) {
  return (
    <div className={cn("tk", className)}>
      {rows.map((r, i) => (
        <TokenRow key={i} {...r} />
      ))}
    </div>
  );
}
