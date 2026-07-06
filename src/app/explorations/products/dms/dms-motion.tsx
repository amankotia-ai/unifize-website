"use client";

/* ----------------------------------------------------------------------------
 * DmsMotion - restrained scroll-reveal layer, fail-safe by construction:
 * an element is hidden ONLY after it is registered with the observer, and
 * only if it sits outside the viewport. Anything the observer never sees
 * stays visible. Rescans on DOM changes so remounted content keeps
 * revealing (dev HMR, client re-renders).
 *   - if JS never runs, nothing hides.
 *   - if the user prefers reduced motion, we bail out entirely.
 * -------------------------------------------------------------------------- */

import { useEffect } from "react";

export function DmsMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".dms");
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    root.setAttribute("data-motion", "");

    const pending = new Set<HTMLElement>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    const reveal = (el: HTMLElement) => {
      el.classList.add("is-in");
      pending.delete(el);
      io.unobserve(el);
    };

    const seen = new WeakSet<Element>();
    const scan = () => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("is-in");
          return;
        }
        el.classList.add("dms-will-reveal");
        pending.add(el);
        io.observe(el);
      });
    };

    /* scroll fallback: reveal by measured position even if the observer
     * never fires (broken emulation, exotic embeds). Cheap: the pending
     * set only shrinks. */
    let ticking = false;
    const check = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of Array.from(pending)) {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
