import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Size = 28 | 32 | 36 | 44 | 56;

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  initials: string;
}

const fontFor: Record<Size, string> = {
  28: "11px",
  32: "12px",
  36: "13px",
  44: "15px",
  56: "18px",
};

export function Avatar({
  size = 32,
  initials,
  className,
  style,
  ...rest
}: AvatarProps) {
  return (
    <div
      className={cn("av", className)}
      style={{
        width: size,
        height: size,
        fontSize: fontFor[size],
        ...style,
      }}
      aria-label={initials}
      {...rest}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}
