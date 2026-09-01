/* ============================================================================
 * resource-chrome.tsx - shared server furniture for the Resources area in the
 * customer-story grammar: a flat left-aligned display masthead with a muted
 * standfirst set to the right (two-tone title), a dark quote band of customer
 * proof cards that closes every collection page, a band-head row (display
 * heading + explore link), the light closing CTA, and the footer.
 * Pure server components rendered inside `<main className="dms dms--redesign rs">`.
 * ========================================================================== */
import Link from "next/link";
import { RESOURCE_FOOTER, TESTIMONIALS, type Testimonial } from "./resources-data";
import { SiteFooter } from "../../_shared/site-footer";
import { BookDemoButton } from "@/components/organisms/book-demo";

/* ------------------------------------------------------------- breadcrumb */
export function Crumb({ trail, dark, center }: { trail: { label: string; href?: string }[]; dark?: boolean; center?: boolean }) {
  return (
    <nav className={"rs-crumb" + (dark ? " rs-crumb--dark" : "") + (center ? " rs-crumb--center" : "")} aria-label="Breadcrumb">
      <Link href="/explorations/resources">Resources</Link>
      {trail.map((t) => (
        <span key={t.label} className="rs-crumb__seg">
          <span aria-hidden="true">/</span>
          {t.href ? <Link href={t.href}>{t.label}</Link> : <span>{t.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------- masthead
 * The collection opener: a big left-aligned display title (with an optional
 * muted second tone) and a short muted standfirst on the right, flat on the
 * page surface. */
export function CollectionMast({
  trail,
  title,
  dim,
  desc,
}: {
  trail: { label: string; href?: string }[];
  title: React.ReactNode;
  /** muted continuation of the title, rendered on its own line */
  dim?: React.ReactNode;
  desc?: React.ReactNode;
}) {
  return (
    <section className="dms-section rs-cmast">
      <div className="dms-wrap rs-cmast__inner">
        <Crumb trail={trail} />
        <div className="rs-cmast__row">
          <h1 className="rs-cmast__title">
            {title}
            {dim ? <span className="rs-cmast__dim">{dim}</span> : null}
          </h1>
          {desc ? <p className="rs-cmast__desc">{desc}</p> : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- band head
 * A grid section's header row: display heading left, explore link right. */
export function BandHead({ title, link }: { title: string; link?: { label: string; href: string } }) {
  return (
    <div className="rs-relrow">
      <h2 className="rs-relhead">{title}</h2>
      {link ? <Link className="rs-relall" href={link.href}>{link.label} &rarr;</Link> : null}
    </div>
  );
}

/* ------------------------------------------------------------- quote band
 * The dark customer-proof band that closes every collection page: a display
 * heading, then three quote cards (spoken quote, person, company fact, a
 * watch link into the story). Static, server-rendered. */
export function QuoteBand({
  heading = "Teams run their quality on Unifize.",
  items,
}: {
  heading?: string;
  items?: Testimonial[];
}) {
  const list = (items ?? [...TESTIMONIALS.filter((t) => t.featured), ...TESTIMONIALS.filter((t) => !t.featured)]).slice(0, 3);
  return (
    <section className="dms-section dms-section--dark rs-qband">
      <div className="dms-wrap">
        <div className="rs-qband__head">
          <h2 className="rs-qband__h">{heading}</h2>
          <Link className="rs-qband__all" href="/explorations/resources/testimonials">All customer stories &rarr;</Link>
        </div>
        <div className="rs-qband__grid">
          {list.map((t) => (
            <Link href={`/explorations/resources/testimonials/${t.slug}`} className="rs-qcell" key={t.slug}>
              <blockquote className="rs-qcell__q">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="rs-qcell__who">
                <span className="rs-qcell__name">{t.person}</span>
                <span className="rs-qcell__role">{t.role}, {t.company}</span>
              </div>
              <div className="rs-qcell__foot">
                <span className="rs-qcell__fact">{t.companyKind} · {t.size}</span>
                <span className="rs-qcell__go">Watch · {t.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- closing CTA */
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

/* ------------------------------------------------------------- footer */
export function ResourceFooter() {
  return <SiteFooter tagline={RESOURCE_FOOTER.tagline} note={RESOURCE_FOOTER.baseRight} />;
}
