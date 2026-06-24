import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface OfferCardProps {
  /** Top label (e.g. "Starter"). */
  name: ReactNode;
  /** Big headline. Pass <PriceLine /> here for a structured price. */
  headline: ReactNode;
  description: ReactNode;
  /** Block CTA (use <BlockButton />). */
  cta: ReactNode;
  /** Optional footer micro-copy (e.g. "2,000 actions included."). */
  foot?: ReactNode;
  /** Optional children rendered above the CTA (e.g. <OptList />). */
  children?: ReactNode;
  /** Featured variant — white surface + 2px brand-blue border. */
  outline?: boolean;
  /** Optional ribbon overlapping the top edge (only valid with outline). */
  ribbon?: ReactNode;
  className?: string;
}

/**
 * M.13 — Offer card. Detached, soft-radius pricing card.
 *   default          — warm n-50 fill, hairline border
 *   outline          — featured: white surface, 2px brand border
 *   outline + ribbon — featured with floating top-edge ribbon
 */
export function OfferCard({
  name,
  headline,
  description,
  cta,
  foot,
  children,
  outline,
  ribbon,
  className,
}: OfferCardProps) {
  return (
    <div className={cn("offer", outline && "outline", className)}>
      {ribbon && <span className="offer-ribbon">{ribbon}</span>}
      <p className="offer-name">{name}</p>
      {typeof headline === "string" ? (
        <h3 className="offer-headline">{headline}</h3>
      ) : (
        headline
      )}
      <p className="offer-desc">{description}</p>
      {children}
      {foot && <div className="offer-foot">{foot}</div>}
      <div className="offer-cta">{cta}</div>
    </div>
  );
}

/* ----- supporting primitives ----- */

export interface PriceLineProps {
  /** e.g. "Starts at". */
  prefix?: ReactNode;
  /** Big amount, e.g. "$50". */
  amount: ReactNode;
  /** Separator, defaults to "/". Pass null/empty to hide. */
  separator?: ReactNode;
  /** e.g. "month". */
  suffix?: ReactNode;
  className?: string;
}

/** Mixed-weight price headline. Used inside an <OfferCard>. */
export function PriceLine({
  prefix,
  amount,
  separator = "/",
  suffix,
  className,
}: PriceLineProps) {
  return (
    <p className={cn("price-line", className)}>
      {prefix && <span className="pre">{prefix}</span>}
      <span className="amt">{amount}</span>
      {separator && <span className="sep">{separator}</span>}
      {suffix && <span className="suf">{suffix}</span>}
    </p>
  );
}

export interface OptListItem {
  label: ReactNode;
  selected?: boolean;
}

export interface OptListProps {
  items: OptListItem[];
  /** If provided, makes options interactive — selection is single-choice. */
  value?: number;
  onChange?: (index: number) => void;
  className?: string;
}

/** Rounded checkbox option list. Used inside an <OfferCard>. */
export function OptList({ items, value, onChange, className }: OptListProps) {
  return (
    <ul className={cn("opt-list", className)}>
      {items.map((item, i) => {
        const isOn = value === undefined ? !!item.selected : value === i;
        const interactive = onChange !== undefined;
        return (
          <li key={i}>
            {interactive ? (
              <button
                type="button"
                className={cn("opt", isOn && "is-on")}
                onClick={() => onChange?.(i)}
              >
                <span className="box">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 8.5 6.5 12 13 4.5" />
                  </svg>
                </span>
                {item.label}
              </button>
            ) : (
              <span className={cn("opt", isOn && "is-on")}>
                <span className="box">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 8.5 6.5 12 13 4.5" />
                  </svg>
                </span>
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export interface BlockButtonProps {
  children: ReactNode;
  /** "charcoal" (default) or "primary". */
  variant?: "charcoal" | "primary";
  className?: string;
  onClick?: () => void;
}

/** Full-width pill CTA — only used inside an offer card. */
export function BlockButton({
  children,
  variant = "charcoal",
  className,
  onClick,
}: BlockButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "btn btn-block",
        variant === "primary" ? "btn-primary" : "btn-charcoal",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
