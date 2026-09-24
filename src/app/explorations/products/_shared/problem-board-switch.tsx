"use client";

/* The board's Today / With Unifize switch. It only flips data-world on the
 * enclosing .pb section; the CSS crossfades artifacts, washes and ledger
 * emphasis from there. */
import { useRef, useState } from "react";

const WORLDS = [
  { key: "before", label: "Today" },
  { key: "after", label: "With Unifize" },
] as const;

export function ProblemBoardSwitch() {
  const ref = useRef<HTMLDivElement>(null);
  const [world, setWorld] = useState<"before" | "after">("before");

  const pick = (next: "before" | "after") => {
    setWorld(next);
    const section = ref.current?.closest<HTMLElement>(".pb");
    if (section) section.dataset.world = next;
  };

  return (
    <div className="pb-switch" ref={ref} role="group" aria-label="Show the four loops" data-world={world}>
      <span className="pb-switch__thumb" aria-hidden="true" />
      {WORLDS.map((w) => (
        <button
          key={w.key}
          type="button"
          className="pb-switch__btn"
          aria-pressed={world === w.key}
          onClick={() => pick(w.key)}
        >
          <svg className={"pb-switch__ico is-" + w.key} viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="6.6" />
            {w.key === "before" ? <path d="M8 4.8v3.6M8 11h.01" /> : <path d="m5.2 8.2 1.9 1.9 3.7-4.1" />}
          </svg>
          {w.label}
        </button>
      ))}
    </div>
  );
}
