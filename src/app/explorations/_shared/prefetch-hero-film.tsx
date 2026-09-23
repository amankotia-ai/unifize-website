"use client";

/* ----------------------------------------------------------------------------
 * prefetch-hero-film.tsx - warms the browser cache with the platform hero
 * film (about 10 MB) from pages that lead to the platform page, so the film
 * plays at once when the visitor gets there.
 *
 * It waits for the page's own load and for the browser to be idle, so it
 * never competes with what the visitor is looking at, and it stands down on
 * Data Saver or anything slower than a 4G-class connection. The file is
 * served immutable (next.config.ts), so the platform page's <video> is
 * answered from cache. Safari has no rel=prefetch; there it simply loads on
 * the platform page as before.
 * -------------------------------------------------------------------------- */

import { useEffect } from "react";
import { HERO_FILM } from "../platform/hero-film-assets";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

export function PrefetchHeroFilm() {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && connection.effectiveType !== "4g") return;

    let idleId = 0;
    let timer = 0;
    const add = (href: string, as: string, type?: string) => {
      if (document.head.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    };
    const warm = () => {
      add(HERO_FILM.poster, "image");
      add(HERO_FILM.src, "video", HERO_FILM.type);
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(warm, { timeout: 4000 });
      else timer = globalThis.setTimeout(warm, 2500) as unknown as number;
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timer) globalThis.clearTimeout(timer);
    };
  }, []);

  return null;
}
