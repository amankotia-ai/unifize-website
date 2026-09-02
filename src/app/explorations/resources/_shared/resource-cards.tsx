/* ============================================================================
 * resource-cards.tsx - pure presentational card components shared by the
 * server pages (related rails) and the client libraries (filtered grids).
 * The card grammar mirrors unifize.com's resource collections: a media plate
 * on top (video poster / category tile / headline metric), then title,
 * excerpt, and a quiet meta foot. Styled by resources-kit.css on DMS tokens.
 * ========================================================================== */
import Link from "next/link";
import type { Post, CaseStudy } from "./resources-data";
import type { CustomerVideo } from "./customer-videos";

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
export function VideoCard({ v }: { v: CustomerVideo }) {
  const byline = [v.role, v.company].filter(Boolean).join(", ") || v.industry || "Customer story";
  return (
    <Link href={`/explorations/resources/testimonials/${v.slug}`} className="rs-card rs-vcard">
      <div className="rs-plate">
        {v.thumb
          ? <img className="rs-plate__img rs-plate__img--center" src={v.thumb} alt="" loading="lazy" />
          : <span className="rs-plate__ghost" aria-hidden="true">{initialsOf(v.company ?? v.person)}</span>}
        <PlayGlyph className="rs-plate__play" />
        <span className="rs-plate__dur">{v.duration}</span>
      </div>
      <div className="rs-card__body">
        <h3 className="rs-card__title">{v.name}</h3>
        <p className="rs-card__dek">{v.description}</p>
        <p className="rs-card__by">
          <span className="rs-card__name">{v.person}</span>
          <span className="rs-card__role">{byline}</span>
        </p>
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
        <p className="rs-card__by">
          <span className="rs-card__name">{p.author.name}</span>
          <span className="rs-card__role">{p.dateLabel} · {p.readMins} min read</span>
        </p>
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
