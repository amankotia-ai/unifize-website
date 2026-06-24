import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Maturity = "validated" | "emerging" | "advocacy" | "hypothesis";

export interface MaturityPillProps extends HTMLAttributes<HTMLSpanElement> {
  level: Maturity;
  children?: ReactNode;
}

const label: Record<Maturity, string> = {
  validated: "Validated",
  emerging: "Emerging",
  advocacy: "Advocacy",
  hypothesis: "Hypothesis",
};

export function MaturityPill({
  level,
  className,
  children,
  ...rest
}: MaturityPillProps) {
  return (
    <span className={cn("matur-pill", level, className)} {...rest}>
      {children ?? label[level]}
    </span>
  );
}
