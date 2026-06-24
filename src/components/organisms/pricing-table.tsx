"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/button";
import { Chip } from "@/components/atoms/chip";
import { PricingTier } from "@/components/molecules/pricing-tier";

export type Billing = "monthly" | "annual";

export interface PricingTierData {
  name: ReactNode;
  /** Per-month price for monthly billing, in USD. Use null for "Talk to us" tiers. */
  monthly: number | null;
  /** Per-month price when billed annually. Use null to fall back to monthly. */
  annual?: number | null;
  /** Display string when there is no numeric price (e.g. "Talk to us"). */
  customPrice?: ReactNode;
  description: ReactNode;
  features: ReactNode[];
  cta: ReactNode;
  featured?: boolean;
  /** Chip rendered in the featured tier's header row. */
  chip?: ReactNode;
}

export interface PricingTableProps {
  tiers: PricingTierData[];
  /** Default to the annual view to nudge the higher-LTV plan. */
  defaultBilling?: Billing;
  /** Optional savings tag, shown next to the annual toggle (e.g. "Save 20%"). */
  annualSavingsTag?: ReactNode;
  className?: string;
}

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/**
 * O.13 — Pricing table. 3-tier with monthly / annual toggle.
 * Featured tier (middle by convention) gets the brand chip and tinted bg.
 */
export function PricingTable({
  tiers,
  defaultBilling = "monthly",
  annualSavingsTag,
  className,
}: PricingTableProps) {
  const [billing, setBilling] = useState<Billing>(defaultBilling);

  return (
    <div className={cn(className)}>
      <div className="pricing-header">
        <div />
        <div className="pricing-toggle" role="tablist" aria-label="Billing cadence">
          <button
            type="button"
            role="tab"
            aria-selected={billing === "monthly"}
            className={cn(billing === "monthly" && "is-on")}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={billing === "annual"}
            className={cn(billing === "annual" && "is-on")}
            onClick={() => setBilling("annual")}
          >
            Annual
            {annualSavingsTag && (
              <span className="save-tag">{annualSavingsTag}</span>
            )}
          </button>
        </div>
      </div>

      <div className="pricing">
        {tiers.map((t, i) => {
          const value =
            t.monthly === null
              ? null
              : billing === "annual"
                ? (t.annual ?? t.monthly)
                : t.monthly;

          const price =
            value === null ? (
              <span style={{ fontSize: 32, lineHeight: 1.1 }}>
                {t.customPrice ?? "Talk to us"}
              </span>
            ) : (
              <>
                {formatPrice(value)}
                <small>/mo</small>
              </>
            );

          return (
            <PricingTier
              key={i}
              featured={t.featured}
              chip={t.chip}
              name={t.name}
              price={price}
              description={t.description}
              cta={t.cta}
              features={t.features}
            />
          );
        })}
      </div>
    </div>
  );
}

/** Convenience preset that matches the design source's Team / Business / Enterprise specimen. */
export function DefaultPricingTable() {
  return (
    <PricingTable
      defaultBilling="monthly"
      annualSavingsTag="Save 20%"
      tiers={[
        {
          name: "Team",
          monthly: 1200,
          annual: 960,
          description: "For quality teams getting off spreadsheets.",
          features: ["Unlimited users", "Up to 50 records/mo"],
          cta: (
            <Button variant="light-ghost" arrow>
              Start trial
            </Button>
          ),
        },
        {
          name: "Business",
          monthly: 4800,
          annual: 3840,
          description: "For mid-market quality programs.",
          features: ["Unlimited records", "21 CFR Part 11"],
          cta: <Button arrow>Book a demo</Button>,
          featured: true,
          chip: <Chip tone="brand">Most popular</Chip>,
        },
        {
          name: "Enterprise",
          monthly: null,
          customPrice: "Talk to us",
          description: "For multi-site, regulated submissions.",
          features: ["Single-tenant / VPC", "SAML SSO + SCIM"],
          cta: (
            <Button variant="light-ghost" arrow>
              Contact sales
            </Button>
          ),
        },
      ]}
    />
  );
}
