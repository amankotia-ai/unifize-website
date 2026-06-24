import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "dark-ghost" | "light-ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  light: "btn-light",
  "dark-ghost": "btn-dark-ghost",
  "light-ghost": "btn-light-ghost",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", arrow, className, children, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn("btn", variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
      {arrow ? <span className="arr">→</span> : null}
    </button>
  ),
);
Button.displayName = "Button";
