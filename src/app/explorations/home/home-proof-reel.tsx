"use client";

/* ============================================================================
 * home-proof-reel.tsx - the homepage Customer proof as a reel of stills.
 * A dark band on the bookends' charcoal: the claim and prev/next arrows in
 * the head, then one row of customer stills at their native 16:9, scrolling
 * inside the rails, clipped at each rail. Under each still a caption row: the company
 * on the left, the one fact that customer attests on the right. Nothing
 * plays inside the section; a still is a link to the customer's story page.
 * Nothing counts the inventory.
 * ========================================================================== */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Eyebrow } from "../products/dms/dms-primitives";
import type { CustomerFilm, ProofLead } from "../products/_shared/customer-films";
import "./home-proof.css";

export type ProofStill = CustomerFilm & {
  /* the one thing this customer attests, in a few words */
  fact: string;
};

const Arrow = ({ dir }: { dir: "prev" | "next" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
    {dir === "prev" ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
    )}
  </svg>
);

export function HomeProofReel({
  eyebrowN = 6,
  heading,
  lede,
  stills,
  allHref,
  lead,
}: {
  eyebrowN?: number;
  heading: string;
  lede: string;
  stills: ProofStill[];
  allHref?: string;
  /* optional: one customer-attested figure leading the reel as a brand-blue
   * cell at the stills' own 16:9 (the answer wears the blue). The Solutions
   * pages pass it; the homepage, DMS and platform reels do not. */
  lead?: ProofLead | null;
}) {
  const uid = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const targetRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    /* the smooth scroll has landed (or the user scrolled by hand):
     * the next arrow press starts from the real position again */
    if (targetRef.current !== null && Math.abs(el.scrollLeft - targetRef.current) < 2) {
      targetRef.current = null;
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  /* quick successive clicks step from the last target, not from wherever
   * the smooth scroll happens to be mid-flight */
  const step = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".hm-reel__item");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const by = (first?.offsetWidth ?? el.clientWidth * 0.6) + gap;
    const max = el.scrollWidth - el.clientWidth;
    const from = targetRef.current ?? el.scrollLeft;
    const next = Math.max(0, Math.min(max, Math.round(from / by) * by + dir * by));
    targetRef.current = next;
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  if (stills.length === 0) return null;

  return (
    <section
      className="dms-section dms-section--dark hm-proof hm-proof--reel hm-railed"
      id="proof"
      aria-labelledby={`${uid}-title`}
    >
      <div className="dms-wrap">
        <header className="hm-reel__head">
          <div className="dms-head">
            <Eyebrow n={eyebrowN}>Customer proof</Eyebrow>
            <h2 className="dms-h2" id={`${uid}-title`}>{heading}</h2>
            <p className="dms-lede">{lede}</p>
          </div>
          <div className="hm-reel__nav" role="group" aria-label="Scroll the customer stills">
            <button
              type="button"
              className="hm-reel__arrow"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous customers"
            >
              <Arrow dir="prev" />
            </button>
            <button
              type="button"
              className="hm-reel__arrow"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Next customers"
            >
              <Arrow dir="next" />
            </button>
          </div>
        </header>
      </div>

      {/* the reel scrolls between the rails; the first still aligns with the head */}
      <ul className="hm-reel__track" ref={trackRef} aria-label="Customers on film">
        {lead ? (
          <li className="hm-reel__item hm-reel__item--lead">
            <div className="hm-reel__card">
              <span className="hm-reel__lead">
                <span className="hm-reel__lead-lab">{lead.label}</span>
                <span className="hm-reel__lead-stat">{lead.stat}</span>
                <span className="hm-reel__lead-statlab">{lead.statLabel}</span>
              </span>
              <span className="hm-reel__caption">
                <span className="hm-reel__who">
                  {lead.who ? <strong>{lead.who}</strong> : null}
                  <small>{lead.body}</small>
                </span>
                <span className="hm-reel__fact">{lead.footnote}</span>
              </span>
            </div>
          </li>
        ) : null}
        {stills.map((s) => {
          const who = [s.person, s.role].filter(Boolean).join(", ");
          return (
            <li className="hm-reel__item" key={s.wistia}>
              <a
                className="hm-reel__card"
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.title}. ${who}${s.company ? `, ${s.company}` : ""}. Opens the customer story.`}
              >
                <span className="hm-reel__still">
                  <img src={s.poster} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="hm-reel__caption">
                  <span className="hm-reel__who">
                    <strong>{s.company ?? s.person}</strong>
                    <small>{s.company ? who : s.industry}</small>
                  </span>
                  <span className="hm-reel__fact">{s.fact}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {allHref && (
        <div className="dms-wrap">
          <div className="hm-reel__foot">
            <a className="hm-reel__all" href={allHref}>
              <span>All customer stories</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
