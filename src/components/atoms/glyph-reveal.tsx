import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface GlyphRevealProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "prefix"> {
  prefix: ReactNode;
  scram: string;
  suffix?: ReactNode;
}

export function GlyphReveal({
  prefix,
  scram,
  suffix = ".",
  className,
  ...rest
}: GlyphRevealProps) {
  return (
    <p className={cn("glyph", className)} {...rest}>
      {prefix} <span className="scram">{scram}</span>
      {suffix}
    </p>
  );
}
