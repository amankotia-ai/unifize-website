/* ============================================================================
 * resource-chrome.tsx - shared server furniture for the Resources area,
 * following the structure of unifize.com's resource pages restated in the
 * DMS design language: a light centered masthead on a soft accent wash
 * (crumb, kicker, title, standfirst), an icon badge for the split hero,
 * a section head, a light closing CTA band, and the footer.
 * Pure server components rendered inside `<main className="dms dms--redesign rs">`.
 * ========================================================================== */
import Link from "next/link";
import { RESOURCE_FOOTER, type ModuleTag } from "./resources-data";
import { SiteFooter } from "../../_shared/site-footer";
import { BookDemoButton } from "@/components/organisms/book-demo";

/* ------------------------------------------------------------- masthead
 * The live site's collection opener: a centered title over a light wash,
 * a short standfirst, nothing else. Crumbs stay for the exploration area. */
export function ResourceMast({
  trail,
  title,
  desc,
  compact,
  children,
}: {
  trail: { label: string; href?: string }[];
  title: React.ReactNode;
  desc?: React.ReactNode;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={"dms-section rs-mast" + (compact ? " rs-mast--compact" : "")}>
      <div className="dms-wrap rs-mast__inner">
        <nav className="rs-crumb" aria-label="Breadcrumb">
          <Link href="/explorations/resources">Resources</Link>
          {trail.map((t) => (
            <span key={t.label} className="rs-crumb__seg">
              <span aria-hidden="true">/</span>
              {t.href ? <Link href={t.href}>{t.label}</Link> : <span>{t.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="rs-mast__title">{title}</h1>
        {desc ? <p className="rs-mast__standfirst">{desc}</p> : null}
        {children}
      </div>
    </section>
  );
}

/* icon badge - the square tint tile that opens the video library hero */
export function IconBadge({ kind }: { kind: "video" | "pen" | "chart" | "stack" }) {
  return (
    <span className="rs-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        {kind === "video" ? (
          <>
            <rect x="2.5" y="6" width="13" height="12" rx="0" />
            <path d="M15.5 10.5 21.5 7v10l-6-3.5" />
          </>
        ) : kind === "pen" ? (
          <>
            <path d="M4 20h16" />
            <path d="m6 16 9.5-9.5a2.1 2.1 0 0 1 3 3L9 19l-4 1 1-4Z" />
          </>
        ) : kind === "chart" ? (
          <>
            <path d="M4 4v16h16" />
            <path d="M8 15v-4M12 15V7m4 8v-6" />
          </>
        ) : (
          <>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 13 9 5 9-5" />
          </>
        )}
      </svg>
    </span>
  );
}

/* section head - "All videos" style heading + short intro over a grid */
export function SectionHead({ title, desc, id }: { title: string; desc?: string; id?: string }) {
  return (
    <div className="rs-sechead" id={id}>
      <h2 className="rs-sechead__title">{title}</h2>
      {desc ? <p className="rs-sechead__desc">{desc}</p> : null}
    </div>
  );
}

/* tag chips (modules, industry) */
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

/* light closing CTA band - the live site's "Ready to see it in action?" close */
export function ResourceCTA({
  heading,
  sub,
  ctaPrimary = "Book a demo",
  ctaSecondary,
}: {
  heading: string;
  sub?: string;
  ctaPrimary?: string;
  ctaSecondary?: { label: string; href: string };
}) {
  return (
    <section className="dms-section dms-section--alt rs-cta">
      <div className="dms-wrap rs-cta__inner">
        <h2 className="rs-cta__h">{heading}</h2>
        {sub ? <p className="rs-cta__sub">{sub}</p> : null}
        <div className="rs-cta__actions">
          <BookDemoButton className="dms-btn" source="close">{ctaPrimary}</BookDemoButton>
          {ctaSecondary ? <a href={ctaSecondary.href} className="dms-btn dms-btn-ghost">{ctaSecondary.label}</a> : null}
        </div>
      </div>
    </section>
  );
}

/* footer - the shared mega footer with the resources tagline */
export function ResourceFooter() {
  return <SiteFooter tagline={RESOURCE_FOOTER.tagline} note={RESOURCE_FOOTER.baseRight} />;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
