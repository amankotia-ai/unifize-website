"use client";

/* ----------------------------------------------------------------------------
 * DmsHeader - sticky, scroll-aware site header with the real top-level nav:
 * Platform · Products · Industries · About us · Resources. Products, Industries
 * and Resources open rich mega-panels (CSS hover/focus, no gap flicker):
 *   - Products  → 2×2 glyph cards (code · name · blurb) + a platform footer
 *   - Industries→ 3 columns grouped by sector, each with a header glyph
 *   - Resources → a column of glyph cards + a library footer
 * The mobile sheet flattens everything, grouped. All panels float on the white
 * surface regardless of the bar's theme, so they read as overlays.
 *
 * Content-aware: the header samples whichever section sits directly beneath it
 * (elementFromPoint just below the header) and picks up that surface's palette,
 * so bg, logo, and nav swap in lock-step and it reads as a continuation of the
 * section, not a floating bar. Three themes:
 *   - dark  → hero, .dms-section--dark, the lifecycle field, proof, footer
 *   - alt   → .dms-section--alt (light grey)
 *   - light → white / default sections
 * Over the hero it stays transparent; over any other section it frosts to match.
 * -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { NAV, NavGlyph as Glyph, type NavFoot, type NavItem, type NavLink } from "../../_shared/nav-data";

type Theme = "dark" | "alt" | "light";

/* section classes whose surface is dark - the header goes light over these.
 * sft is the shared mega footer. */
const DARK_SURFACES = ["dms-hero", "dms-section--dark", "dms-lifex-section", "dms-proof-section", "dms-footer", "sft"];

const ARROW = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h11M11 5.5l4.5 4.5-4.5 4.5" /></svg>
);

/* ---- mega-panel renderers ---------------------------------------------- */

function PopCard({ x }: { x: NavLink }) {
  return (
    <a className="dms-header__card" href={x.href} role="menuitem">
      {x.icon ? <span className="dms-header__card-ic"><Glyph name={x.icon} /></span> : null}
      <span className="dms-header__card-tx">
        {x.code ? <span className="dms-header__card-code">{x.code}</span> : null}
        <span className="dms-header__card-title">{x.label}</span>
        {x.desc ? <span className="dms-header__card-desc">{x.desc}</span> : null}
      </span>
    </a>
  );
}

function PopFoot({ foot }: { foot: NavFoot }) {
  return (
    <a className="dms-header__pop-foot" href={foot.href} role="menuitem">
      <span className="dms-header__foot-tx">
        <span className="dms-header__foot-title">{foot.title}</span>
        <span className="dms-header__foot-desc">{foot.desc}</span>
      </span>
      <span className="dms-header__foot-cta">{foot.cta} {ARROW}</span>
    </a>
  );
}

function Pop({ item }: { item: NavItem }) {
  if (item.cols) {
    return (
      <div className={"dms-header__pop dms-header__pop--" + item.menu} role="menu">
        <div className="dms-header__pop-body">
          <div className="dms-header__pop-grid dms-header__pop-grid--3">
            {item.cols.map((col) => (
              <div className="dms-header__col" key={col.heading}>
                <div className="dms-header__col-h"><Glyph name={col.icon} />{col.heading}</div>
                {col.items.map((x) => (
                  <a className="dms-header__row" href={x.href} role="menuitem" key={x.label}>
                    <span className="dms-header__row-label">{x.label}</span>
                    {x.desc ? <span className="dms-header__row-desc">{x.desc}</span> : null}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        {item.foot ? <PopFoot foot={item.foot} /> : null}
      </div>
    );
  }

  const isResources = item.menu === "resources";
  return (
    <div
      className={
        "dms-header__pop " +
        (isResources ? "dms-header__pop--resources" : "dms-header__pop--products")
      }
      role="menu"
    >
      <div className="dms-header__pop-body">
        <div className={"dms-header__pop-grid " + (isResources ? "dms-header__pop-grid--1" : "dms-header__pop-grid--2")}>
          {item.items!.map((x) => <PopCard x={x} key={x.label} />)}
        </div>
      </div>
      {item.foot ? <PopFoot foot={item.foot} /> : null}
    </div>
  );
}

export function DmsHeader() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [frosted, setFrosted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const detect = () => {
      const bar = document.querySelector<HTMLElement>(".dms-header");
      const probeY = Math.max(0, Math.min(window.innerHeight - 1, Math.ceil(bar?.getBoundingClientRect().bottom ?? 72) + 1));
      const x = Math.max(0, Math.min(window.innerWidth - 1, Math.round(window.innerWidth / 2)));
      const el = document.elementFromPoint(x, probeY);
      const overProductFrame = Boolean(el?.closest(".dms-appframe"));
      const surface = el?.closest(".dms-section, .dms-footer, .sft") as HTMLElement | null;
      if (!surface) return;
      const cl = surface.classList;
      const next: Theme = overProductFrame
        ? "light"
        : DARK_SURFACES.some((c) => cl.contains(c))
        ? "dark"
        : cl.contains("dms-section--alt")
          ? "alt"
          : "light";
      /* transparent over the hero; frosted (surface-tinted) over everything else */
      setFrosted(overProductFrame || !cl.contains("dms-hero"));
      setTheme((prev) => (prev === next ? prev : next));
    };

    let raf: number | null = null;
    const settle = window.setTimeout(detect, 120);
    const onScroll = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(detect);
    };
    detect();
    requestAnimationFrame(detect);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  /* placePops: keep each mega-panel centred under its trigger but clamped to the
   * viewport. The nav is right-aligned, so a 600-840px panel centred under a
   * right-side trigger would spill off-screen; this pins `left` in px within the
   * [gutter, vw - gutter] band. Reveal stays CSS-only (hover/focus), so no
   * flicker; we only adjust horizontal position, on mount and on resize. */
  useEffect(() => {
    const place = () => {
      const vw = window.innerWidth;
      if (!vw) return;
      const gutter = 16;
      document.querySelectorAll<HTMLElement>(".dms-header__dd").forEach((dd) => {
        const pop = dd.querySelector<HTMLElement>(".dms-header__pop");
        if (!pop) return;
        const w = pop.offsetWidth;
        if (!w) return;
        const tr = dd.getBoundingClientRect();
        const wanted = tr.left + tr.width / 2 - w / 2;
        const left = Math.max(gutter, Math.min(wanted, vw - gutter - w));
        pop.style.left = `${left - tr.left}px`;
        pop.style.setProperty("--dms-pop-x", "0px");
      });
    };
    place();
    requestAnimationFrame(place);
    const t = window.setTimeout(place, 250);
    /* webfont swap shifts trigger widths — re-place once glyph metrics are final */
    document.fonts?.ready.then(place).catch(() => {});
    window.addEventListener("resize", place);
    return () => { window.clearTimeout(t); window.removeEventListener("resize", place); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={"dms-header is-" + theme + (frosted ? " is-frosted" : "")}>
      <div className="dms-wrap dms-header__inner">
        <a className="dms-header__brand" href="/explorations/home">
          <img className="dms-header__logo dms-header__logo--light" src="/logo_light.svg" alt="Unifize" />
          <img className="dms-header__logo dms-header__logo--dark" src="/logo_dark.svg" alt="" aria-hidden="true" />
        </a>

        <nav className="dms-header__nav" aria-label="Primary">
          {NAV.map((item) =>
            item.menu ? (
              <div key={item.label} className="dms-header__dd">
                <button type="button" className="dms-header__link dms-header__dd-trigger" aria-haspopup="true">
                  {item.label}
                  <svg className="dms-header__chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" /></svg>
                </button>
                <Pop item={item} />
              </div>
            ) : (
              <a key={item.label} href={item.href} className="dms-header__link">{item.label}</a>
            ),
          )}
          <button type="button" className="dms-btn dms-btn-sm dms-header__cta">Book a demo</button>
        </nav>

        <button
          type="button"
          className="dms-header__menu"
          aria-expanded={menuOpen}
          aria-controls="dms-menu-sheet"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="dms-header__menu-bar" aria-hidden="true" />
          <span className="dms-header__menu-bar" aria-hidden="true" />
        </button>
      </div>

      <div id="dms-menu-sheet" className={"dms-header__sheet" + (menuOpen ? " is-open" : "")} hidden={!menuOpen}>
        <nav className="dms-header__sheet-nav" aria-label="Primary mobile">
          {NAV.map((item) =>
            item.menu ? (
              <div key={item.label} className="dms-header__sheet-group">
                <span className="dms-header__sheet-grouplab">{item.label}</span>
                {(item.cols ? item.cols.flatMap((c) => c.items) : item.items ?? []).map((sub) => (
                  <a key={sub.label} href={sub.href} onClick={() => setMenuOpen(false)}>{sub.label}</a>
                ))}
                {item.foot ? <a href={item.foot.href} onClick={() => setMenuOpen(false)}>{item.foot.cta}</a> : null}
              </div>
            ) : (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ),
          )}
        </nav>
        <button type="button" className="dms-btn dms-header__sheet-cta">Book a demo</button>
      </div>
    </header>
  );
}
