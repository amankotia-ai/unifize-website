"use client";

/* ----------------------------------------------------------------------------
 * DmsHeader - sticky, scroll-aware header for the DMS product page.
 *   State A (over the dark hero): transparent, light logo, light nav.
 *   State B (scrolled past 88px): frosted surface, dark logo, ink nav.
 * Both logos render and cross-fade off `is-scrolled` so there is no src swap.
 * -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";

const NAV = [
  { href: "#modules", label: "What is bundled" },
  { href: "#lifecycle", label: "Lifecycle" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#who", label: "Who owns it" },
  { href: "#compliance", label: "Compliance" },
];

export function DmsHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 88);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"dms-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="dms-wrap dms-header__inner">
        <a className="dms-header__brand" href="/">
          <img className="dms-header__logo dms-header__logo--light" src="/logo_light.svg" alt="Unifize" />
          <img className="dms-header__logo dms-header__logo--dark" src="/logo_dark.svg" alt="" aria-hidden="true" />
        </a>
        <nav className="dms-header__nav" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="dms-header__link">{n.label}</a>
          ))}
          <button type="button" className="dms-btn dms-btn-sm">Book a demo</button>
        </nav>
      </div>
    </header>
  );
}
