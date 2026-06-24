import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TrustBadgeItem {
  /** SVG / element rendered inside the 36px brand-tinted icon frame. */
  icon: ReactNode;
  label: ReactNode;
}

export interface TrustBadgeRowProps {
  items: TrustBadgeItem[];
  className?: string;
}

/**
 * M.16 — Trust badge row. Four compliance certs side-by-side, divided
 * by hairlines. Always closes a long page; never opens one.
 */
export function TrustBadgeRow({ items, className }: TrustBadgeRowProps) {
  return (
    <div className={cn("tbadge-row", className)}>
      {items.map((b, i) => (
        <div className="tbadge" key={i}>
          <span className="icon-frame">{b.icon}</span>
          <span className="lab">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
