import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CalloutProps {
  /** Headline rendered as a small display-weight h4. */
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * M.08 — Callout. Brand-tinted card with a 3px brand-blue left accent.
 * Used to land the structural conclusion of an argument.
 */
export function Callout({ title, children, className }: CalloutProps) {
  return (
    <div className={cn("callout", className)}>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}

export interface CalloutSosProps {
  /** Small mono uppercase label above the definition. */
  lab: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * M.08 (variant) — Sourcing-of-truth callout.
 * One-line vocabulary definition used in thesis-heavy sections.
 */
export function CalloutSos({ lab, children, className }: CalloutSosProps) {
  return (
    <div className={cn("callout-sos", className)}>
      <span className="lab">{lab}</span>
      {children}
    </div>
  );
}
