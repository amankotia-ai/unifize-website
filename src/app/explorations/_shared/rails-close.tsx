/* ----------------------------------------------------------------------------
 * rails-close.tsx - the one closing CTA every railed page ends on (24 Sep
 * 2026, from the quality solution page): the convergence mark, a
 * "<subject> on Unifize" eyebrow, a two-beat claim, a lede that names what
 * to bring, and two buttons. Only the copy changes page to page.
 *
 * Needs `dms--redesign dms--rails` on <main> (page-rails.css draws the
 * charcoal ground, the rails and the eyebrow); rails-close.css pins the
 * layout so page kits cannot drift it.
 * -------------------------------------------------------------------------- */

import Link from "next/link";
import { BookDemoButton } from "@/components/organisms/book-demo";
import "./rails-close.css";

export type RailsCloseProps = {
  /** heading id, unique on the page */
  id: string;
  eyebrow: string;
  heading: string;
  lede: string;
  /** the ghost button: a sibling page or an anchor on this one */
  secondary: { label: string; href: string };
  primaryLabel?: string;
  /** analytics source for the demo modal */
  source?: string;
};

export function RailsClose({
  id,
  eyebrow,
  heading,
  lede,
  secondary,
  primaryLabel = "Book a 30-minute walkthrough",
  source = "close",
}: RailsCloseProps) {
  const ghost = secondary.href.startsWith("#") ? (
    <a href={secondary.href} className="dms-btn dms-btn-ghost">{secondary.label}</a>
  ) : (
    <Link href={secondary.href} className="dms-btn dms-btn-ghost">{secondary.label}</Link>
  );

  return (
    <section className="dms-section dms-section--dark dms-close hm-close--rails hm-railed rc-close" id="demo" aria-labelledby={id}>
      <div className="dms-wrap">
        <div className="dms-close__grid" data-reveal>
          <div className="dms-close__convergence" aria-hidden="true">
            <div className="dms-close__mark">
              <svg viewBox="0 2.2 21 22" fill="none">
                <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
              </svg>
            </div>
          </div>
          <div className="dms-close__lead">
            <span className="dms-close__eyebrow">{eyebrow}</span>
            <h2 className="dms-close__h" id={id}>{heading}</h2>
          </div>
          <div className="dms-close__side">
            <p className="dms-lede">{lede}</p>
            <div className="dms-close__cta">
              <BookDemoButton className="dms-btn" source={source}>{primaryLabel}</BookDemoButton>
              {ghost}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
