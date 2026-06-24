import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "ok" | "brand";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  children: ReactNode;
}
export function Chip({ tone = "default", className, children, ...rest }: ChipProps) {
  return (
    <span
      className={cn("chip", tone === "ok" && "ok", tone === "brand" && "brand", className)}
      {...rest}
    >
      {children}
    </span>
  );
}

export interface ChipKVProps extends HTMLAttributes<HTMLSpanElement> {
  k: ReactNode;
  v: ReactNode;
}
export function ChipKV({ k, v, className, ...rest }: ChipKVProps) {
  return (
    <span className={cn("chip kv", className)} {...rest}>
      <span className="k">{k}</span>
      <span className="v">{v}</span>
    </span>
  );
}
