import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface StatItem {
  k: ReactNode;
  v: ReactNode;
  vs?: ReactNode;
}

export interface StatBlockProps {
  items: StatItem[];
  className?: string;
}

/**
 * M.03 — Stat block. Mono label · big display number · supporting line.
 * 4-up row separated by hairlines. Works on light + dark surfaces.
 */
export function StatBlock({ items, className }: StatBlockProps) {
  return (
    <div className={cn("stats", className)}>
      {items.map((s, i) => (
        <div className="stat" key={i}>
          <div className="k">{s.k}</div>
          <div className="v">{s.v}</div>
          {s.vs && <div className="vs">{s.vs}</div>}
        </div>
      ))}
    </div>
  );
}
