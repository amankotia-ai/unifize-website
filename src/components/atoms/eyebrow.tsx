import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  num?: string;
  dot?: boolean;
  children: ReactNode;
}
export function Eyebrow({ num, dot, className, children, ...rest }: EyebrowProps) {
  return (
    <span className={cn("eyebrow", className)} {...rest}>
      {num ? <span className="num">{num}</span> : null}
      {dot ? <span className="dot" /> : null}
      {children}
    </span>
  );
}
