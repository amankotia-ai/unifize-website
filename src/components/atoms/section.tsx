import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * F.08 — Section composition primitives.
 *
 * Canonical body section of every marketing page:
 *   <Section> > <SectionInner> > <SectionHead eyebrow title sub />
 */

type Tone = "default" | "alt" | "white" | "beige" | "dark";
type Density = "default" | "tight" | "tall";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  density?: Density;
  children: ReactNode;
}

const toneClass: Record<Tone, string> = {
  default: "",
  alt: "alt",
  white: "white",
  beige: "beige",
  dark: "dark",
};

const densityClass: Record<Density, string> = {
  default: "",
  tight: "tight",
  tall: "tall",
};

export function Section({
  tone = "default",
  density = "default",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        "section",
        toneClass[tone],
        densityClass[density],
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export function SectionInner({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("section-inner", className)} {...rest}>
      {children}
    </div>
  );
}

export interface SectionHeadProps {
  /** Two-digit numeral pinned to the eyebrow (`"03"`, `"·"`). */
  num?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  sub?: ReactNode;
  className?: string;
}

export function SectionHead({
  num,
  eyebrow,
  title,
  sub,
  className,
}: SectionHeadProps) {
  return (
    <div className={cn("section-head", className)}>
      <div>
        {(num || eyebrow) && (
          <span className="section-eyebrow">
            {num !== undefined && <span className="num">{num}</span>}
            {eyebrow}
          </span>
        )}
        {title && <h2 className="section-title">{title}</h2>}
      </div>
      <div>{sub && <p className="section-sub">{sub}</p>}</div>
    </div>
  );
}
