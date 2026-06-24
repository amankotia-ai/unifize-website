import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DeltaTone = "up" | "flat" | "neg";

export interface StatPillProps extends HTMLAttributes<HTMLSpanElement> {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  deltaTone?: DeltaTone;
}

export function StatPill({
  label,
  value,
  delta,
  deltaTone = "up",
  className,
  ...rest
}: StatPillProps) {
  return (
    <span className={cn("stat-pill", className)} {...rest}>
      <span className="lab">{label}</span>
      <span className="v">{value}</span>
      {delta ? (
        <span
          className={cn(
            "delta",
            deltaTone === "flat" && "flat",
            deltaTone === "neg" && "neg",
          )}
        >
          {delta}
        </span>
      ) : null}
    </span>
  );
}
