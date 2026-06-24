"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  label: ReactNode;
  /** Panel content shown when this tab is active. */
  content: ReactNode;
}

export interface TabbedModuleProps {
  items: TabItem[];
  /** Default index for uncontrolled use. */
  defaultIndex?: number;
  /** Controlled mode — set value + onChange. */
  value?: number;
  onChange?: (index: number) => void;
  className?: string;
}

/**
 * M.17 — Tabbed module. Horizontal mono-uppercase tab strip with
 * underline-on-active. Compresses parallel ideas into one section.
 */
export function TabbedModule({
  items,
  defaultIndex = 0,
  value,
  onChange,
  className,
}: TabbedModuleProps) {
  const [internal, setInternal] = useState(defaultIndex);
  const active = value ?? internal;

  return (
    <div className={cn(className)}>
      <div className="tabs">
        {items.map((tab, i) => (
          <button
            key={i}
            type="button"
            className={cn("tab", i === active && "is-on")}
            onClick={() => {
              setInternal(i);
              onChange?.(i);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {items[active]?.content}
    </div>
  );
}
