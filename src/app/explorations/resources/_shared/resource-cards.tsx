/* ============================================================================
 * resource-cards.tsx - pure presentational card components shared by the
 * server pages (related rails) and the client libraries (filtered grids).
 * The card grammar mirrors unifize.com's resource collections: a media plate
 * on top (video poster / category tile / headline metric), then title,
 * excerpt, and a quiet meta foot. Styled by resources-kit.css on DMS tokens.
 * ========================================================================== */
import Link from "next/link";
import type { Testimonial, Post, CaseStudy } from "./resources-data";

export const initialsOf = (name: string) =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export function PlayGlyph({ className }: { className?: string }) {
  return (
    <span className={"rs-play" + (className ? " " + className : "")} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none"><path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" /></svg>
    </span>
  );
}

/* ------------------------------------------------------------------ video */
export function VideoCard({ t }: { t: Testimonial }) {
  return (
    <Link href={`/explorations/resources/testimonials/${t.slug}`} className="rs-card rs-vcard">
      <div className="rs-plate">
        {t.poster
          ? <img className="rs-plate__img" src={t.poster} alt="" loading="lazy" />
          : <span className="rs-plate__ghost" aria-hidden="true">{initialsOf(t.company)}</span>}
        <PlayGlyph className="rs-plate__play" />
        <span className="rs-plate__dur">{t.duration}</span>
        <span className="rs-plate__sample">Sample</span>
      </div>
      <div className="rs-card__body">
        <h3 className="rs-card__title">{t.headline}</h3>
        <p className="rs-card__dek">{t.quote}</p>
        <p className="rs-card__meta">{t.person} · {t.role}, {t.company}</p>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------- post */
export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/explorations/resources/blog/${p.slug}`} className="rs-card rs-postcard">
      <div className="rs-plate rs-plate--post">
        <span className="rs-plate__cat">{p.category}</span>
        <span className="rs-plate__mins">{p.readMins} min</span>
      </div>
      <div className="rs-card__body">
        <h3 className="rs-card__title">{p.title}</h3>
        <p className="rs-card__dek">{p.dek}</p>
        <p className="rs-card__meta">{p.dateLabel} · {p.author.name}</p>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------- case study */
export function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <Link href={`/explorations/resources/case-studies/${c.slug}`} className="rs-card rs-casecard">
      <div className="rs-plate rs-plate--case">
        <span className="rs-plate__val">{c.metrics[0].value}</span>
        <span className="rs-plate__vlab">{c.metrics[0].label}</span>
      </div>
      <div className="rs-card__body">
        <h3 className="rs-card__title">{c.headline}</h3>
        <p className="rs-card__dek">{c.summary}</p>
        <p className="rs-card__meta">{c.company} · {c.industry}</p>
      </div>
    </Link>
  );
}
