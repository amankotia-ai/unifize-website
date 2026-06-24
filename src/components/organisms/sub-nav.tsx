"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SubNavItem {
  label: ReactNode;
  id?: string;
}

export interface SubNavProps {
  items: SubNavItem[];
  /** Default active index (uncontrolled). */
  defaultIndex?: number;
  /** Controlled mode. */
  value?: number;
  onChange?: (index: number) => void;
  /** Adds `position: sticky; top: 0`. Off by default since this lives inside a showcase canvas. */
  sticky?: boolean;
  className?: string;
}

/**
 * O.04 — Sub-nav. Horizontal section TOC under the hero,
 * with active-state on click. Optional sticky behaviour.
 */
export function SubNav({
  items,
  defaultIndex = 0,
  value,
  onChange,
  sticky,
  className,
}: SubNavProps) {
  const [internal, setInternal] = useState(defaultIndex);
  const active = value ?? internal;

  return (
    <nav className={cn("subnav", sticky && "sticky", className)}>
      <div className="subnav-inner">
        {items.map((it, i) => (
          <button
            key={it.id ?? i}
            type="button"
            className={cn("snav-link", i === active && "is-on")}
            onClick={() => {
              setInternal(i);
              onChange?.(i);
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
