import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PlaceholderProps {
  children: ReactNode;
  /** Dark variant — for cinematic full-bleed mockups. */
  dark?: boolean;
  /** aspect-ratio CSS value, e.g. "16/8". Falls back to "16/8". */
  aspect?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * M.10 — Placeholder. Diagonal-stripe surface for
 * "drop product UI here" / "drop photography here".
 * Light + dark variants.
 */
export function Placeholder({
  children,
  dark,
  aspect = "16/8",
  className,
  style,
}: PlaceholderProps) {
  return (
    <div
      className={cn("placeholder", dark && "dark", className)}
      style={{ aspectRatio: aspect, ...style }}
    >
      {children}
    </div>
  );
}
