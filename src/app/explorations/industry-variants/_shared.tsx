/* ============================================================================
 * Industry-variant pages - shared chrome.
 *
 * The five variant pages (01 Ledger · 02 War Room · 03 Atlas · 04 Mirror ·
 * 06 Two Doors) are duplicates of /explorations/industry-template re-shaped to
 * each direction's narrative. They share the .it design tokens (see _base.css,
 * a duplicate of industry-template.css) and the canonical Medical Devices data.
 *
 * This module holds the chrome every variant reuses: the site header, the
 * trust strip, the footer, and a bake-off switcher so a reviewer can flip
 * between directions. The Decision Trace (05) is the live template itself, so
 * the switcher links it at /explorations/industry-template.
 * ========================================================================== */
import Link from "next/link";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import "./_shared.css";

export const usd = (n: number) => "$" + n.toLocaleString("en-US");
export const usdM = (n: number) =>
  "$" + (n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "M";

/* The bake-off roster. `href` is the live route for each direction. */
export const VARIANTS = [
  { num: "01", slug: "coordination-tax-ledger", title: "The Coordination Tax Ledger", tagline: "Economics-first. A P&L of inaction.", href: "/explorations/industry-variants/coordination-tax-ledger" },
  { num: "02", slug: "regulatory-war-room", title: "The Regulatory War Room", tagline: "Trigger-first. A live incident board.", href: "/explorations/industry-variants/regulatory-war-room" },
  { num: "03", slug: "coverage-atlas", title: "The Coverage Atlas", tagline: "Breadth-first. The map is the page.", href: "/explorations/industry-variants/coverage-atlas" },
  { num: "04", slug: "the-mirror", title: "The Mirror", tagline: "Recognition-first. Their words, first.", href: "/explorations/industry-variants/the-mirror" },
  { num: "05", slug: "decision-trace", title: "The Decision Trace", tagline: "Thesis-first. One claim, proven.", href: "/explorations/industry-template" },
  { num: "06", slug: "two-doors", title: "The Two Doors", tagline: "Ingress-first. Pick your way in.", href: "/explorations/industry-variants/two-doors" },
] as const;

export type VariantSlug = (typeof VARIANTS)[number]["slug"];

/* Thin top strip that lets a reviewer hop between directions. Sits above the
 * sticky header. Current direction is highlighted. */
export function VariantSwitcher({ current }: { current: VariantSlug }) {
  return (
    <div className="iv-switch">
      <div className="iv-switch-inner">
        <Link href="/explorations/industry-variants" className="iv-switch-home">Bake-off</Link>
        <nav className="iv-switch-nav" aria-label="Industry page directions">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              href={v.href}
              className={"iv-switch-tab" + (v.slug === current ? " is-active" : "")}
              aria-current={v.slug === current ? "page" : undefined}
            >
              <span className="iv-switch-num">{v.num}</span>
              <span className="iv-switch-name">{v.title.replace(/^The /, "")}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* The shared site header. `nav` is the per-variant in-page anchor set. */
export function VariantHeader({ nav }: { nav: { href: string; label: string }[] }) {
  return (
    <header className="it-head">
      <div className="it-head-inner">
        <a className="it-brand" href="/">
          <img src="/logo_dark.svg" alt="Unifize" className="it-brand-logo" />
        </a>
        <nav className="it-nav">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button type="button" className="it-btn it-btn-sm">Book a demo</button>
      </div>
    </header>
  );
}

/* The credibility strip under the hero. */
export function TrustStrip() {
  return (
    <div className="it-trust">
      <div className="it-wrap it-trust-inner">
        <span className="it-trust-lab">Trusted by FDA-regulated device teams</span>
        <span className="it-trust-names">
          {MD_PROOF.customers.map((c) => <b key={c.name}>{c.name}</b>)}
        </span>
        <span className="it-trust-facts">
          <span>21 CFR Part 11 e-signatures</span>
          <span>Coexists with your QMS</span>
          <span>Customer-attested results</span>
        </span>
      </div>
    </div>
  );
}

/* The shared dark footer. */
export function VariantFooter() {
  return (
    <footer className="it-foot">
      <div className="it-wrap it-foot-inner">
        <div className="it-foot-brand">
          <strong>Unifize</strong>
          <span>The decision trace for regulated operations.</span>
        </div>
        <div className="it-foot-cols">
          <div>
            <span className="it-foot-lab">Industries</span>
            <Link href="/industries/medical-devices">Medical devices</Link>
            <Link href="/platform#industries">Pharmaceuticals</Link>
            <Link href="/platform#industries">Aerospace</Link>
          </div>
          <div>
            <span className="it-foot-lab">Coverage</span>
            <Link href="/industries/medical-devices/change-control">Change control</Link>
            <Link href="/explorations/industry-variants">All directions</Link>
            <Link href="/explorations/industry-template">Decision Trace</Link>
          </div>
        </div>
      </div>
      <div className="it-foot-base"><span>© Unifize 2026 · Industry template bake-off · Medical Devices instance</span></div>
    </footer>
  );
}
