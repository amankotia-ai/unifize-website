"use client";

/* ----------------------------------------------------------------------------
 * ItmMotion — the page's restrained scroll-reveal layer. It flips the `.itm`
 * root into motion mode (`data-motion`) and reveals `[data-reveal]` blocks as
 * they enter the viewport. Guardrails:
 *   - if JS never runs, `data-motion` is never set, so every block is visible
 *     (the reveal styles only apply under `.itm[data-motion]`).
 *   - if the user prefers reduced motion, we bail out entirely (nothing hides).
 * The hero itself animates via CSS keyframes, independent of this component.
 * -------------------------------------------------------------------------- */

import { useEffect } from "react";

export function ItmMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".itm");
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    root.setAttribute("data-motion", "");

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    // reveal anything already in view on load without waiting for a scroll
    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
