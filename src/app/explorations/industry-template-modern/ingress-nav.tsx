"use client";

/* ----------------------------------------------------------------------------
 * IngressNav (modern skin) — the "three ways in" as a sticky sub-nav. Pins
 * directly under the main header for the duration of the three ingress
 * sections (By your role · What we cover · What's breaking) and scroll-spies
 * the active one. Logic is identical to the champion; only the class names
 * (itm-subnav*) and the sans label differ. Sticks at --itm-header-h.
 * -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";

const TABS = [
  { id: "by-role", label: "By your role", hint: "Quality, Ops, RA, NPI" },
  { id: "modules", label: "What we cover", hint: "CAPA, change, supplier" },
  { id: "whats-breaking", label: "What's breaking", hint: "483s, MDR, line holds" },
] as const;

export function IngressNav() {
  const [active, setActive] = useState<string>(TABS[0].id);

  useEffect(() => {
    const sections = TABS
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el != null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActive(id);
  };

  return (
    <div className="itm-subnav">
      <div className="itm-wrap itm-wrap--wide itm-subnav__inner">
        <span className="itm-subnav__lab">Three ways in</span>
        <nav className="itm-subnav__tabs" aria-label="Explore Unifize for medical devices">
          {TABS.map((t, i) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={(e) => go(e, t.id)}
              className={"itm-subnav__tab" + (active === t.id ? " is-active" : "")}
              aria-current={active === t.id ? "true" : undefined}
            >
              <span className="itm-subnav__tab-idx itm-data" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="itm-subnav__tab-l">{t.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
