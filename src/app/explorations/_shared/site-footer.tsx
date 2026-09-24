/* ----------------------------------------------------------------------------
 * SiteFooter - the shared site footer. The whole information architecture:
 * Solutions (all 15), Industries (all 11), then Products, Resources and
 * Company - derived from the same NAV source the headers render, so footer
 * and dropdowns never drift.
 *
 * Layout (24 Sep 2026, "bands", picked over the flat column grid, which
 * had dropped the nav's subgroups and wrapped most labels in skinny
 * columns): one ruled row per menu, label on the left, three labelled
 * subgroups on the right, so a 15-item list reads as three short ones.
 * No cards, no blurbs, no CTAs - every page already closes on a CTA band
 * right above this.
 * Server component; kit-agnostic (own .sft namespace over the global tokens),
 * so it drops into both the itm and dms page shells.
 *
 * Per-page flavor stays: `tagline` under the logo and `note` on the base
 * line are props, defaulting to the platform line.
 * -------------------------------------------------------------------------- */

import type { ReactNode } from "react";
import Link from "next/link";
import { NAV, type NavItem } from "./nav-data";
import "./site-footer.css";

type L = { label: string; href: string };
type Group = { heading: string; links: L[] };

const byMenu = (menu: NavItem["menu"]) => NAV.find((n) => n.menu === menu)!;
const pick = (x: L): L => ({ label: x.label, href: x.href });

/* a nav subgroup (Quality & Compliance, Life sciences...) as a labelled list */
function Sub({ g }: { g: Group }) {
  return (
    <div className="sft__sub">
      <span className="sft__subhead">{g.heading}</span>
      <ul className="sft__list">
        {g.links.map((l) => (
          <li key={l.label}><Link className="sft__link" href={l.href}>{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

/* one ruled row: the menu label on the left, its subgroups on the right */
function Band({ label, children }: { label: string; children: ReactNode }) {
  return (
    <nav className="sft__band" aria-label={label}>
      <div className="sft__head">
        <span className="sft__lab">{label}</span>
      </div>
      <div className="sft__subs">{children}</div>
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
  const groups = (menu: NavItem["menu"]): Group[] =>
    byMenu(menu).cols!.map((c) => ({ heading: c.heading, links: c.items.map(pick) }));
  const products = [...byMenu("products").items!.map(pick), { label: "The platform", href: "/platform" }];
  const resources = [...byMenu("resources").items!.map(pick), { label: "All resources", href: "/resources" }];
  const company = [{ label: "About us", href: "/about" }, { label: "Book a demo", href: "#demo" }];

  return (
    <footer className="sft">
      <div className="sft__wrap">
        <div className="sft__brand">
          <img className="sft__logo" src="/logo_light.svg" alt="Unifize" />
          <span className="sft__tag">{tagline}</span>
        </div>
        <Band label="Solutions">
          {groups("domains").map((g) => <Sub g={g} key={g.heading} />)}
        </Band>
        <Band label="Industries">
          {groups("industries").map((g) => <Sub g={g} key={g.heading} />)}
        </Band>
        <Band label="Unifize">
          <Sub g={{ heading: "Products", links: products }} />
          <Sub g={{ heading: "Resources", links: resources }} />
          <Sub g={{ heading: "Company", links: company }} />
        </Band>
        <div className="sft__base">
          <span>© Unifize 2026</span>
          <span>{note}</span>
        </div>
        {/* the giant edge-to-edge wordmark under the base line was removed
          * from every footer on 23 Sep 2026 (Abhishek: "remove this big
          * bottom logo from all footers") */}
      </div>
    </footer>
  );
}
