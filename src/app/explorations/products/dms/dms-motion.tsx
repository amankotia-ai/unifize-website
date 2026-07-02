"use client";

/* ----------------------------------------------------------------------------
 * DmsMotion - restrained scroll-reveal layer. Flips the `.dms` root into motion
 * mode and reveals `[data-reveal]` blocks as they enter the viewport.
 *   - if JS never runs, `data-motion` is never set, so every block stays visible.
 *   - if the user prefers reduced motion, we bail out entirely (nothing hides).
 * -------------------------------------------------------------------------- */

import { useEffect } from "react";

export function DmsMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".dms");
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

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
