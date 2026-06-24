import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Depth = "deep" | "med" | "light";

export interface DomainTileProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "title"> {
  /** Two-digit number (e.g. "01"). */
  num: ReactNode;
  title: ReactNode;
  description: ReactNode;
  persona: ReactNode;
  /** Maturity label shown right of persona (e.g. "Deep"). */
  matur: ReactNode;
  /** Visual weight by play-coverage depth. */
  depth?: Depth;
}

/**
 * M.05 — Domain tile. Used on home + Domains pages.
 * Weighted by play coverage:
 *   deep    — filled, brand-blue top rule
 *   med     — default white
 *   light   — muted, dashed border (hypothesis)
 */
export function DomainTile({
  num,
  title,
  description,
  persona,
  matur,
  depth = "med",
  className,
  ...rest
}: DomainTileProps) {
  return (
    <a className={cn("domain", depth, className)} {...rest}>
      <div className="num">{num}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="persona">
        <span>{persona}</span>
        <span className="matur">{matur}</span>
      </div>
    </a>
  );
}
