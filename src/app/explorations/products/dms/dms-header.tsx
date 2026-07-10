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

type Theme = "dark" | "alt" | "light";
type IconName =
  | "qms" | "dms" | "mes" | "plm"
  | "flask" | "droplet" | "cube"
  | "stories" | "case" | "blog"
  | "shield" | "ledger" | "truck";
type NavLink = { label: string; href: string; desc?: string; code?: string; icon?: IconName };
type NavCol = { heading: string; icon: IconName; items: NavLink[] };
type NavFoot = { title: string; desc: string; href: string; cta: string };
type NavItem = {
  label: string;
  href?: string;
  menu?: "products" | "industries" | "resources";
  items?: NavLink[];
  cols?: NavCol[];
  foot?: NavFoot;
};

/* section classes whose surface is dark - the header goes light over these */
const DARK_SURFACES = ["dms-hero", "dms-section--dark", "dms-lifex-section", "dms-proof-section", "dms-footer"];

/* line-work glyphs (24-grid, 1.6 stroke) matching the system's data marks */
const ICONS: Record<IconName, React.ReactNode> = {
  qms: (<><path d="M12 3.2l6.8 2.6v4.8c0 4.3-2.9 7.4-6.8 8.7-3.9-1.3-6.8-4.4-6.8-8.7V5.8z" /><path d="M8.9 11.8l2.1 2.1 4.1-4.3" /></>),
  dms: (<><path d="M6.5 3.2h6.5l4.5 4.5V20.8H6.5z" /><path d="M13 3.2v4.5h4.5" /><path d="M9 12.5h6M9 15.5h6" /></>),
  mes: (<><circle cx="12" cy="12" r="3.1" /><path d="M12 4.2v2M12 17.8v2M4.2 12h2M17.8 12h2M6.5 6.5l1.4 1.4M16.1 16.1l1.4 1.4M17.5 6.5l-1.4 1.4M7.9 16.1l-1.4 1.4" /></>),
  plm: (<><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" /><path d="M19.8 4.5v4h-4" /></>),
  flask: (<><path d="M9.5 3.2h5M10.6 3.2v5.3L6 17a2 2 0 0 0 1.8 2.9h8.4A2 2 0 0 0 18 17l-4.6-8.5V3.2" /><path d="M8 14.6h8" /></>),
  droplet: (<path d="M12 3.4c2.8 3.6 5 6.2 5 9a5 5 0 0 1-10 0c0-2.8 2.2-5.4 5-9z" />),
  cube: (<><path d="M12 3.4l7.4 4.2v8.8L12 20.6 4.6 16.4V7.6z" /><path d="M12 11.8v8.8M4.6 7.6L12 11.8l7.4-4.2" /></>),
  stories: (<><rect x="3.5" y="5.5" width="17" height="13" /><path d="M10 9.6l4.4 2.4L10 14.4z" /></>),
  case: (<><path d="M4 19.5h16" /><path d="M7 19.5v-5.5M12 19.5V8M17 19.5v-3.5" /></>),
  blog: (<><path d="M4.6 19.4l1-3.8L15.5 5.7l2.8 2.8L8.4 18.4z" /><path d="M13.6 7.6l2.8 2.8" /></>),
  shield: (<><path d="M12 3.2l6.8 2.6v4.8c0 4.3-2.9 7.4-6.8 8.7-3.9-1.3-6.8-4.4-6.8-8.7V5.8z" /><path d="M8.9 11.8l2.1 2.1 4.1-4.3" /></>),
  ledger: (<><rect x="5" y="3.6" width="14" height="16.8" /><path d="M9 3.6V2.8h6v0.8" /><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" /></>),
  truck: (<><path d="M3 6.5h11v9H3z" /><path d="M14 9.5h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17.5" cy="17.5" r="1.6" /></>),
};

function Glyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const ARROW = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h11M11 5.5l4.5 4.5-4.5 4.5" /></svg>
);

const NAV: NavItem[] = [
  { label: "Platform", href: "/platform" },
  {
    label: "Products",
    menu: "products",
    items: [
      { code: "QMS", label: "Quality management", href: "/explorations/products/qms", desc: "CAPA, audits, NCs and change control on one governed thread.", icon: "qms" },
      { code: "DMS", label: "Document management", href: "/explorations/products/dms", desc: "Controlled documents, versioning and e-signatures, always audit-ready.", icon: "dms" },
      { code: "MES", label: "Manufacturing execution", href: "/explorations/products/mes", desc: "Electronic batch records and shop-floor execution, paperless.", icon: "mes" },
      { code: "PLM", label: "Product lifecycle", href: "/explorations/products/plm", desc: "Specs, BOMs and design history from concept to launch.", icon: "plm" },
    ],
    foot: { title: "One connected platform", desc: "Quality, documents and production on a single record.", href: "/platform", cta: "Explore platform" },
  },
  {
    label: "Solutions",
    menu: "domains",
    cols: [
      {
        heading: "Quality & Compliance", icon: "shield", items: [
          { label: "Quality", href: "/explorations/domains/quality", desc: "NCs, CAPA and audits on one quality record." },
          { label: "Compliance", href: "/explorations/domains/compliance", desc: "Stay inspection-ready against every standard." },
          { label: "Regulatory Affairs", href: "/explorations/domains/regulatory-affairs", desc: "Submissions, registrations and regulatory change." },
          { label: "Supplier Quality", href: "/explorations/domains/supplier-quality", desc: "SCARs, approvals and supplier performance." },
          { label: "Post-Market & Recall", href: "/explorations/domains/post-market-and-recall", desc: "Complaints, adverse events and recalls, closed." },
        ],
      },
      {
        heading: "Governance & Control", icon: "ledger", items: [
          { label: "Change Control", href: "/explorations/domains/change-control", desc: "Every change proposed, reviewed and approved." },
          { label: "Document & Records Control", href: "/explorations/domains/document-and-records-control", desc: "Controlled documents and records, audit-ready." },
          { label: "Periodic Review & Data Governance", href: "/explorations/domains/periodic-review-and-data-governance", desc: "Scheduled reviews and defensible data integrity." },
          { label: "Training & Competency", href: "/explorations/domains/training-and-competency", desc: "Role-based training tied to controlled documents." },
          { label: "System & Data Integration Governance", href: "/explorations/domains/system-and-data-integration-governance", desc: "Govern the systems and the data between them." },
        ],
      },
      {
        heading: "Operations & Supply Chain", icon: "truck", items: [
          { label: "Operations", href: "/explorations/domains/operations", desc: "Run the shop floor without paper or handoffs." },
          { label: "Supply Chain & Planning", href: "/explorations/domains/supply-chain-and-planning", desc: "Plan and keep supply aligned to demand." },
          { label: "Procurement & Sourcing", href: "/explorations/domains/procurement-and-sourcing", desc: "Source and buy against quality requirements." },
          { label: "Customer Management", href: "/explorations/domains/customer-management", desc: "Orders, complaints and commitments, connected." },
          { label: "New Product Development", href: "/explorations/domains/new-product-development", desc: "Concept to launch with the design history intact." },
        ],
      },
    ],
    foot: { title: "The Problem, end to end", desc: "See how the solutions connect into one system of record.", href: "/explorations/domains", cta: "All solutions" },
  },
  {
    label: "Industries",
    menu: "industries",
    cols: [
      {
        heading: "Life sciences", icon: "flask", items: [
          { label: "Medical Devices", href: "/explorations/industry-template-modern", desc: "Class II & III OEMs and CDMOs" },
          { label: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals", desc: "Commercial sponsors and CDMOs" },
          { label: "Contract Research Orgs", href: "/explorations/industries/cro", desc: "GCP clinical trial services" },
          { label: "Laboratories", href: "/explorations/industries/laboratories", desc: "ISO/IEC 17025 testing & calibration" },
        ],
      },
      {
        heading: "Process & consumer", icon: "droplet", items: [
          { label: "Chemicals", href: "/explorations/industries/chemicals", desc: "Specialty and pharma-supply" },
          { label: "Cosmetics", href: "/explorations/industries/cosmetics", desc: "Personal care under MoCRA" },
          { label: "Food Processing", href: "/explorations/industries/food-processing", desc: "FSMA and GFSI manufacturers" },
          { label: "Nutritional Supplements", href: "/explorations/industries/nutritional-supplements", desc: "21 CFR Part 111 makers" },
        ],
      },
      {
        heading: "Discrete manufacturing", icon: "cube", items: [
          { label: "Automotive", href: "/explorations/industries/automotive", desc: "IATF 16949 tiers and suppliers" },
          { label: "Aerospace", href: "/explorations/industries/aerospace", desc: "AS9100 and NADCAP suppliers" },
          { label: "Industrial Machinery", href: "/explorations/industries/industrial-machinery", desc: "Build-to-order OEMs" },
        ],
      },
    ],
    foot: { title: "See a complete industry page", desc: "Tour how Unifize maps to one industry end to end.", href: "/explorations/industry-template-modern", cta: "Take the tour" },
  },
  { label: "About us", href: "/about" },
  {
    label: "Resources",
    menu: "resources",
    items: [
      { label: "Customer stories", href: "/explorations/resources/testimonials", desc: "Video stories by company, industry and module.", icon: "stories" },
      { label: "Case studies", href: "/explorations/resources/case-studies", desc: "The backlog, the change, the numbers.", icon: "case" },
      { label: "Blog", href: "/explorations/resources/blog", desc: "Field notes on running quality.", icon: "blog" },
    ],
    foot: { title: "The full library", desc: "Every story, study and field note in one place.", href: "/explorations/resources", cta: "All resources" },
  },
];

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
    const probeY = 70; /* just below the 68px sticky header */
    const detect = () => {
      const x = Math.max(0, Math.min(window.innerWidth - 1, Math.round(window.innerWidth / 2)));
      const el = document.elementFromPoint(x, probeY);
      const surface = el?.closest(".dms-section, .dms-footer") as HTMLElement | null;
      if (!surface) return;
      const cl = surface.classList;
      const next: Theme = DARK_SURFACES.some((c) => cl.contains(c))
        ? "dark"
        : cl.contains("dms-section--alt")
          ? "alt"
          : "light";
      /* transparent over the hero; frosted (surface-tinted) over everything else */
      setFrosted(!cl.contains("dms-hero"));
      setTheme((prev) => (prev === next ? prev : next));
    };

    let raf: number | null = null;
    const onScroll = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(detect);
    };
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
        <a className="dms-header__brand" href="/">
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
