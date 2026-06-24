import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DotMatrixBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase label on the left ("Content coverage"). */
  label: ReactNode;
  /** Display-font value on the right ("100"). */
  value: ReactNode;
  /** Suffix rendered smaller next to the value ("%", "×"). */
  suffix?: ReactNode;
  /** Total cells in the track. Default 40 — matches the source. */
  cells?: number;
  /** How many of those cells are filled, from the left. */
  filled: number;
}

export function DotMatrixBar({
  label,
  value,
  suffix,
  cells = 40,
  filled,
  className,
  style,
  ...rest
}: DotMatrixBarProps) {
  const filledClamped = Math.max(0, Math.min(cells, Math.round(filled)));
  return (
    <div
      className={cn("dmbar", className)}
      style={
        {
          "--dm-cells": cells,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <span className="dmlab">{label}</span>
      <div className="dmtrack" role="img" aria-label={`${filledClamped} of ${cells}`}>
        {Array.from({ length: cells }).map((_, i) => (
          <span key={i} className={cn("dmcell", i < filledClamped && "on")} />
        ))}
      </div>
      <span className="dmval">
        {value}
        {suffix ? <small>{suffix}</small> : null}
      </span>
    </div>
  );
}
