import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  MaturityPill,
  type MaturityPillProps,
} from "@/components/atoms/maturity-pill";

export interface IndustryTileProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "title"> {
  /** Top-row label (e.g. "01 · Active"). */
  num: ReactNode;
  maturity: MaturityPillProps["level"];
  title: ReactNode;
  description: ReactNode;
  /** Footer line — "6 domains in play" or "Structural only". */
  foot: ReactNode;
}

/**
 * M.06 — Industry tile. Top row: number + maturity pill.
 * Heading + paragraph. Footer: persona + open arrow.
 */
export function IndustryTile({
  num,
  maturity,
  title,
  description,
  foot,
  className,
  ...rest
}: IndustryTileProps) {
  return (
    <a className={cn("industry", className)} {...rest}>
      <div className="top">
        <span className="num">{num}</span>
        <MaturityPill level={maturity} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="foot">
        <span className="matur">{foot}</span>
        <span className="open">
          Open <span className="arr">→</span>
        </span>
      </div>
    </a>
  );
}
