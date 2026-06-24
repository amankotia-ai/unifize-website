import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SwatchProps extends HTMLAttributes<HTMLDivElement> {
  /** CSS color value used to fill the chip (hex / rgb / var()). */
  color: string;
  /** Token name as it appears in the system (e.g. "u-primary"). */
  name: ReactNode;
  /** Hex string shown on the second line (e.g. "#0052FF"). */
  hex: ReactNode;
  /** Short usage hint (e.g. "Hero / Footer"). */
  use: ReactNode;
  /** Draw a 1px hairline inside the chip — for #FFFFFF and other near-white swatches. */
  hairline?: boolean;
}

export function Swatch({
  color,
  name,
  hex,
  use,
  hairline,
  className,
  ...rest
}: SwatchProps) {
  return (
    <div className={cn("sw", className)} {...rest}>
      <div
        className={cn("c", hairline && "c-hairline")}
        style={{ background: color }}
      />
      <div className="m">
        <div className="n">{name}</div>
        <div className="h">{hex}</div>
        <div className="v">{use}</div>
      </div>
    </div>
  );
}
