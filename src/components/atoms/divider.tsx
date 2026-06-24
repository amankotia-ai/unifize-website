import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "hairline" | "dashed" | "editorial";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  variant?: Variant;
}

export function Divider({ variant = "hairline", className, ...rest }: DividerProps) {
  return (
    <hr
      className={cn(
        "divider",
        variant === "dashed" && "dashed",
        variant === "editorial" && "editorial",
        className,
      )}
      {...rest}
    />
  );
}
