import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/atoms/avatar";

export interface PullQuoteProps {
  /** Optional row of chips/pills above the quote (e.g. maturity pill + chip). */
  meta?: ReactNode;
  quote: ReactNode;
  /** Avatar initials (e.g. "PR"). */
  initials: string;
  name: ReactNode;
  role: ReactNode;
  className?: string;
}

/**
 * M.04 — Pull quote. Geist 500 quote · avatar + attribution.
 * Optional meta row above for chip + maturity pill. Inherits dark styling
 * from `.surface.dark` parents.
 */
export function PullQuote({
  meta,
  quote,
  initials,
  name,
  role,
  className,
}: PullQuoteProps) {
  return (
    <div className={cn(className)}>
      {meta && (
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>{meta}</div>
      )}
      <p className="quote">&ldquo;{quote}&rdquo;</p>
      <div className="quote-by">
        <Avatar size={36} initials={initials} />
        <div>
          <div className="name">{name}</div>
          <div className="role">{role}</div>
        </div>
      </div>
    </div>
  );
}
