"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ToggleProps {
  label: ReactNode;
  defaultOn?: boolean;
  on?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
}

export function Toggle({
  label,
  defaultOn = false,
  on,
  onChange,
  className,
}: ToggleProps) {
  const controlled = on !== undefined;
  const [internal, setInternal] = useState(defaultOn);
  const value = controlled ? on : internal;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      className={cn("toggle", value && "is-on", className)}
      onClick={() => {
        const next = !value;
        if (!controlled) setInternal(next);
        onChange?.(next);
      }}
    >
      <span className="track" />
      {label}
    </button>
  );
}
