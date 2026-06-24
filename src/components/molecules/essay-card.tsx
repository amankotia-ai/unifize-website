import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EssayCardProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "title"> {
  /** Top meta line, e.g. "Essay · 12 min". */
  kind: ReactNode;
  /** Right-aligned meta on the same row, e.g. "May 2026". */
  date: ReactNode;
  title: ReactNode;
  standfirst: ReactNode;
  /** Defaults to "Read essay". */
  cta?: ReactNode;
}

/**
 * M.11 — Essay card. 2px black top rule + mono meta + display heading
 * + 2-line standfirst + read-more affordance. Thought-leadership signal.
 */
export function EssayCard({
  kind,
  date,
  title,
  standfirst,
  cta = "Read essay",
  className,
  ...rest
}: EssayCardProps) {
  return (
    <a className={cn("essay", className)} {...rest}>
      <div className="meta">
        <span>{kind}</span>
        <span>{date}</span>
      </div>
      <h3>{title}</h3>
      <p>{standfirst}</p>
      <span className="read">
        {cta} <span className="arr">→</span>
      </span>
    </a>
  );
}
