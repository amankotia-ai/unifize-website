"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms";

type Theme = "dark" | "light" | "alt";

/**
 * Sticky site header that picks up the surface color of whichever
 * section is currently directly beneath it. Three states:
 *   - dark  → hero, .section.dark, .close-band, .site-footer
 *   - alt   → .section.alt
 *   - light → .section.white (and default)
 *
 * Bg, text, and logo swap in lock-step so the header reads as a
 * continuation of the surface, not a floating element.
 */
export function SiteHeader() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const headerBand = 72;

    const detect = () => {
      const probeY = headerBand + 1;
      const x = Math.min(
        window.innerWidth - 1,
        Math.max(0, window.innerWidth / 2),
      );
      const el = document.elementFromPoint(x, probeY);
      if (!el) return;
      const surface = el.closest(
        ".section, .mast, .site-footer, .close-band, .platform-subnav",
      ) as HTMLElement | null;
      if (!surface) return;
      const list = surface.classList;
      const next: Theme =
        list.contains("dark") ||
        list.contains("close-band") ||
        list.contains("mast")
          ? "dark"
          : list.contains("alt")
            ? "alt"
            : "light";
      setTheme((prev) => (prev === next ? prev : next));
    };

    let frameId: number | null = null;
    const onScroll = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(detect);
    };

    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <div className={`site-header is-${theme}`}>
      <div className="site-header-inner">
        <a className="brand" href="/">
          <img
            src={isDark ? "/logo_light.svg" : "/logo_dark.svg"}
            alt="Unifize"
            className="brand-logo"
          />
        </a>
        <nav className="site-nav">
          <a href="#thesis">The Problem</a>
          <a href="#domains">Your World</a>
          <a href="#industries">By Industry</a>
          <a href="#how">How It Works</a>
          <a href="#proof">Proof</a>
        </nav>
        <div className="site-header-cta">
          <Button size="sm" arrow>
            Book a demo
          </Button>
        </div>
      </div>
    </div>
  );
}
