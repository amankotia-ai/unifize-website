import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FeatureCardProps {
  /** Inline SVG / icon rendered inside the 28px icon frame. */
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * M.01 — Feature card. Icon + heading + 2-line description.
 * Composes 3-up.
 */
export function FeatureCard({ icon, title, children, className }: FeatureCardProps) {
  return (
    <div className={cn("feature", className)}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
