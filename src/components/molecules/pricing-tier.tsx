import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PricingTierProps {
  name: ReactNode;
  /** Big display price. Pass JSX for mixed units (e.g. <>$1,200<small>/mo</small></>). */
  price: ReactNode;
  description: ReactNode;
  /** Feature lines — each rendered with a leading checkmark. */
  features: ReactNode[];
  /** CTA button (already styled). */
  cta: ReactNode;
  /** Featured tier gets a tinted background and the optional header chip. */
  featured?: boolean;
  /** Optional chip shown in the featured-tier header row (e.g. <Chip tone="brand">Most popular</Chip>). */
  chip?: ReactNode;
  className?: string;
}

const CheckIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8l3 3 7-7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * M.09 — Pricing tier. Composes into the .pricing 3-column grid.
 * Name · price · description · CTA · feature list.
 * Featured variant gets a tinted background + optional header chip.
 */
export function PricingTier({
  name,
  price,
  description,
  features,
  cta,
  featured,
  chip,
  className,
}: PricingTierProps) {
  return (
    <div className={cn("tier", featured && "featured", className)}>
      {featured && chip ? (
        <div className="featured-row">
          <div className="name">{name}</div>
          {chip}
        </div>
      ) : (
        <div className="name">{name}</div>
      )}
      <div className="price">{price}</div>
      <p className="desc">{description}</p>
      <div className="cta">{cta}</div>
      <ul className="feat">
        {features.map((f, i) => (
          <li key={i}>
            {CheckIcon}
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
