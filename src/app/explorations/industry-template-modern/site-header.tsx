"use client";

/* ----------------------------------------------------------------------------
 * SiteHeader (modern skin) — sticky, scroll-aware site header with the real
 * top-level nav: Platform · Products · Industries · About us · Resources.
 * Products and Industries are hover/focus dropdowns (CSS-driven, so no gap/
 * flicker issues). The mobile sheet lists everything, grouped. Placeholder
 * hrefs (#) where a real route doesn't exist yet.
 * -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";

type NavLink = { label: string; href: string; desc?: string };
type NavItem = { label: string; href?: string; items?: NavLink[] };

const NAV: NavItem[] = [
  { label: "Platform", href: "/platform" },
  {
    label: "Products",
    items: [
      { label: "QMS", href: "#", desc: "Quality management" },
      { label: "DMS", href: "/explorations/products/dms", desc: "Document management" },
      { label: "MES", href: "#", desc: "Manufacturing execution" },
      { label: "PLM", href: "#", desc: "Product lifecycle" },
    ],
  },
  {
    label: "Industries",
    items: [
      { label: "Medical Devices", href: "/explorations/industry-template-modern", desc: "Class II & III OEMs and CDMOs" },
      { label: "Pharmaceuticals", href: "#" },
      { label: "Aerospace & Defense", href: "#" },
      { label: "Automotive", href: "#" },
      { label: "Food & Beverage", href: "#" },
      { label: "Semiconductor", href: "#" },
    ],
  },
  { label: "About us", href: "/about" },
  { label: "Resources", href: "/resources" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 88);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={"itm-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="itm-wrap itm-wrap--wide itm-header__inner">
        <a className="itm-header__brand" href="/">
          <img className="itm-header__logo itm-header__logo--light" src="/logo_light.svg" alt="Unifize" />
          <img className="itm-header__logo itm-header__logo--dark" src="/logo_dark.svg" alt="" aria-hidden="true" />
        </a>

        <nav className="itm-header__nav" aria-label="Primary">
          {NAV.map((item) =>
            item.items ? (
              <div key={item.label} className="itm-header__dd">
                <button type="button" className="itm-header__link itm-header__dd-trigger" aria-haspopup="true">
                  {item.label}
                  <svg className="itm-header__chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" /></svg>
                </button>
                <div className="itm-header__pop" role="menu">
                  {item.items.map((sub) => (
                    <a key={sub.label} href={sub.href} role="menuitem" className="itm-header__pop-item">
                      <span className="itm-header__pop-label">{sub.label}</span>
                      {sub.desc ? <span className="itm-header__pop-desc">{sub.desc}</span> : null}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className="itm-header__link">{item.label}</a>
            ),
          )}
          <button type="button" className="itm-btn itm-btn-sm itm-header__cta">Book a demo</button>
        </nav>

        <button
          type="button"
          className="itm-header__menu"
          aria-expanded={menuOpen}
          aria-controls="itm-menu-sheet"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="itm-header__menu-bar" aria-hidden="true" />
          <span className="itm-header__menu-bar" aria-hidden="true" />
        </button>
      </div>

      <div id="itm-menu-sheet" className={"itm-header__sheet" + (menuOpen ? " is-open" : "")} hidden={!menuOpen}>
        <nav className="itm-header__sheet-nav" aria-label="Primary mobile">
          {NAV.map((item) =>
            item.items ? (
              <div key={item.label} className="itm-header__sheet-group">
                <span className="itm-header__sheet-grouplab">{item.label}</span>
                {item.items.map((sub) => (
                  <a key={sub.label} href={sub.href} onClick={() => setMenuOpen(false)}>{sub.label}</a>
                ))}
              </div>
            ) : (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ),
          )}
        </nav>
        <button type="button" className="itm-btn itm-header__sheet-cta">Book a demo</button>
      </div>
    </header>
  );
}
