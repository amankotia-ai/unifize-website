/* ----------------------------------------------------------------------------
 * SiteFooter - the shared site footer. The whole information architecture,
 * mapped flat and quiet: Products (4 + platform), Solutions (all 15),
 * Industries (all 11), Resources (3 + library), Company - derived from the
 * same NAV source the headers render, so footer and dropdowns never drift.
 * One hairline-topped column grid in the locked dark-editorial system: mono
 * column labels, plain links, dashed base rule. No cards, no blurbs, no CTAs -
 * every page already closes on a CTA band right above this.
 * Server component; kit-agnostic (own .sft namespace over the global tokens),
 * so it drops into both the itm and dms page shells.
 *
 * Per-page flavor stays: `tagline` under the logo and `note` on the base
 * line are props, defaulting to the platform line.
 * -------------------------------------------------------------------------- */

import Link from "next/link";
import { NAV, type NavItem } from "./nav-data";
import "./site-footer.css";

const byMenu = (menu: NavItem["menu"]) => NAV.find((n) => n.menu === menu)!;

function Col({ label, links, wide }: { label: string; links: { label: string; href: string }[]; wide?: boolean }) {
  return (
    <nav className={"sft__col" + (wide ? " sft__col--wide" : "")} aria-label={label}>
      <span className="sft__lab">{label}</span>
      <div className="sft__links">
        {links.map((l) => (
          <Link className="sft__link" href={l.href} key={l.label}>{l.label}</Link>
        ))}
      </div>
    </nav>
  );
}

export function SiteFooter({
  tagline = "The governed interface for cross-functional work.",
  note = "People · Process · AI · Outcomes",
}: {
  tagline?: string;
  note?: string;
}) {
  const products = [
    ...byMenu("products").items!.map((p) => ({ label: p.label, href: p.href })),
    { label: "The platform", href: "/explorations/platform" },
  ];
  const solutions = [
    ...byMenu("domains").cols!.flatMap((c) => c.items.map((x) => ({ label: x.label, href: x.href }))),
    { label: "All solutions", href: "/explorations/domains" },
  ];
  const industries = byMenu("industries").cols!.flatMap((c) => c.items.map((x) => ({ label: x.label, href: x.href })));
  const resources = [
    ...byMenu("resources").items!.map((r) => ({ label: r.label, href: r.href })),
    { label: "All resources", href: "/explorations/resources" },
  ];

  return (
    <footer className="sft">
      <div className="sft__wrap">
        <div className="sft__grid">
          <div className="sft__brand">
            <img className="sft__logo" src="/logo_light.svg" alt="Unifize" />
            <span className="sft__tag">{tagline}</span>
          </div>
          <Col label="Products" links={products} />
          <Col label="Solutions" links={solutions} wide />
          <Col label="Industries" links={industries} />
          <div className="sft__col">
            <Col label="Resources" links={resources} />
            <Col label="Company" links={[{ label: "About us", href: "/about" }, { label: "Book a demo", href: "#demo" }]} />
          </div>
        </div>
        <div className="sft__base">
          <span>© Unifize 2026</span>
          <span>{note}</span>
        </div>
      </div>
    </footer>
  );
}
