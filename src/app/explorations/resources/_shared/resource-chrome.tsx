/* ============================================================================
 * resource-chrome.tsx - shared server furniture for the Resources catalog
 * ("The Record"): an editorial masthead (kicker + oversized title + standfirst
 * + a big catalog-count numeral + a facet rule), a dark full-stop CTA, the
 * footer, and small tag / mono / play helpers. Pure server components in the
 * locked Unifize system. Rendered inside `<main className="dms">`.
 * ========================================================================== */
import Link from "next/link";
import { RESOURCE_FOOTER, type ModuleTag } from "./resources-data";
import { SiteFooter } from "../../_shared/site-footer";

/* -------------------------------------------------------------- masthead */
export function ResourceMast({
  trail,
  kicker,
  title,
  desc,
  bignum,
  facets,
  compact,
  children,
}: {
  trail: { label: string; href?: string }[];
  kicker?: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  bignum?: { value: string; label: string };
  facets?: { n: string; label: string }[];
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={"dms-section rs-mast" + (compact ? " rs-mast--compact" : "")}>
      <div className="dms-wrap">
        <nav className="rs-mast__crumb" aria-label="Breadcrumb">
          <Link href="/explorations/resources">Resources</Link>
          {trail.map((t) => (
            <span key={t.label} className="rs-mast__crumb-seg">
              <span aria-hidden="true">/</span>
              {t.href ? <Link href={t.href}>{t.label}</Link> : <span>{t.label}</span>}
            </span>
          ))}
        </nav>
        <div className="rs-mast__grid">
          <div className="rs-mast__lead">
            {kicker ? <span className="rs-mast__kicker">{kicker}</span> : null}
            <h1 className="rs-mast__title">{title}</h1>
            {desc ? <p className="rs-mast__standfirst">{desc}</p> : null}
            {children}
          </div>
          {bignum && !compact ? (
            <div className="rs-mast__aside" aria-hidden="true">
              <span className="rs-mast__bignum">{bignum.value}</span>
              <span className="rs-mast__bignum-l">{bignum.label}</span>
            </div>
          ) : null}
        </div>
        {facets && facets.length ? (
          <div className="rs-mast__facets">
            {facets.map((f) => (
              <span className="rs-mast__facet" key={f.label}><b>{f.n}</b> {f.label}</span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* mono tag chips (modules, industry) */
export function TagRow({ modules, industry, className }: { modules?: ModuleTag[]; industry?: string; className?: string }) {
  return (
    <ul className={"rs-tags" + (className ? " " + className : "")}>
      {industry ? <li className="rs-tag rs-tag--ind">{industry}</li> : null}
      {modules?.map((m) => (
        <li key={m} className="rs-tag rs-tag--mod">{m}</li>
      ))}
    </ul>
  );
}

/* dark full-stop CTA (one calm band, not a marketing close) */
export function ResourceCTA({
  heading,
  ctaPrimary = "Book a demo",
  ctaSecondary,
}: {
  heading: string;
  ctaPrimary?: string;
  ctaSecondary?: { label: string; href: string };
}) {
  return (
    <section className="dms-section rs-cta dms-section--dark">
      <div className="dms-wrap rs-cta__inner">
        <p className="rs-cta__h">{heading}</p>
        <div className="rs-cta__actions">
          {ctaSecondary ? <a href={ctaSecondary.href} className="dms-btn dms-btn-ghost">{ctaSecondary.label}</a> : null}
          <button type="button" className="dms-btn">{ctaPrimary}</button>
        </div>
      </div>
    </section>
  );
}

/* footer - the shared mega footer with the resources tagline */
export function ResourceFooter() {
  return <SiteFooter tagline={RESOURCE_FOOTER.tagline} note={RESOURCE_FOOTER.baseRight} />;
}

export function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/* play glyph for server-rendered plates (client tiles use their own copy) */
export function PlayGlyph({ className }: { className?: string }) {
  return (
    <span className={"rs-play" + (className ? " " + className : "")} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none"><path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" /></svg>
    </span>
  );
}
