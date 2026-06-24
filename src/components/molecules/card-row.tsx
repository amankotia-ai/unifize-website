import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CardRowProps {
  /** Optional mono uppercase label (e.g. "01 — Visible"). */
  lab?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * M.02 — Card row. Detached label + heading + paragraph inside a card.
 * Used for diagnostics and walkthroughs.
 */
export function CardRow({ lab, title, children, className }: CardRowProps) {
  return (
    <div className={cn("card", className)}>
      {lab && <p className="lab">{lab}</p>}
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
