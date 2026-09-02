"use client";

/* ============================================================================
 * domain-proof-films.tsx — section 09's customer film rail, generalised from
 * the Medical Devices flagship (industry-template-modern/proof-films.tsx)
 * so every domain page shows the REAL films whose Notion Module tags match
 * the domain (products/_shared/customer-films.ts applies the governance:
 * Status Live + Web Use Approved, or the card never renders).
 *
 * The rail leads with the one signed, customer-attested figure the domain
 * data already carries (proof.attested), kept apart from the films; the
 * films follow in the itm-film card language, all CSS from itm.css. The
 * section head (Eyebrow / heading / lede) stays in DomainPage — this is the
 * rail only: count, arrows, track.
 * ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import type { CustomerFilm } from "../../products/_shared/customer-films";

export type FilmRailLead = {
  label: string;
  stat: string;
  statLabel: string;
  body: string;
  note: string;
};

export function DomainFilmRail({ lead, films }: { lead: FilmRailLead; films: CustomerFilm[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [railState, setRailState] = useState({ atStart: true, atEnd: false });

  const updateRailState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const atStart = el.scrollLeft <= 2;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setRailState((current) =>
      current.atStart === atStart && current.atEnd === atEnd ? current : { atStart, atEnd },
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateRailState();
    const observer = new ResizeObserver(updateRailState);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateRailState]);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".itm-film"));
    const scrollInset = Number.parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
    const positions = cards.map((card) => card.offsetLeft - el.offsetLeft - scrollInset);
    const current = el.scrollLeft;
    const target = dir > 0
      ? positions.find((position) => position > current + 8)
      : [...positions].reverse().find((position) => position < current - 8);

    el.scrollTo({ left: target ?? (dir > 0 ? el.scrollWidth : 0), behavior: "smooth" });
  };

  return (
    <div className="dk-films">
      <div className="dk-films__controls">
        {/* label only — the no-inventory-counts rule bans the film tally */}
        <span className="itm-films__count itm-data">Customer films</span>
        <div className="itm-films__nav" aria-label="Customer film navigation">
          <button
            type="button"
            className="itm-films__arrow"
            aria-label="Previous films"
            aria-controls="dk-film-track"
            disabled={railState.atStart}
            onClick={() => scroll(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            className="itm-films__arrow"
            aria-label="Next films"
            aria-controls="dk-film-track"
            disabled={railState.atEnd}
            onClick={() => scroll(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="itm-films__track" id="dk-film-track" ref={trackRef} onScroll={updateRailState}>
        {/* the one signed number, kept apart from the films */}
        <article className="itm-film itm-film--stat">
          <span className="itm-film__brand">{lead.label}</span>
          <div className="itm-film__result">
            <span className="itm-film__stat itm-data">{lead.stat}</span>
            <span className="itm-film__stat-lab">{lead.statLabel}</span>
          </div>
          <p className="itm-film__quote">{lead.body}</p>
          <span className="itm-film__meta">{lead.note}</span>
        </article>

        {films.map((f) => (
          <a
            key={f.wistia}
            className="itm-film"
            href={f.url}
            target="_blank"
            rel="noreferrer"
            data-wistia={f.wistia}
            aria-label={`Watch: ${f.title}, by ${f.person}${f.company ? `, ${f.company}` : ""} (${f.duration})`}
          >
            <span className="itm-film__media">
              <img className="itm-film__poster" src={f.poster} alt="" loading="lazy" />
              <span className="itm-film__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.5 5.8v12.4c0 .62.68 1 1.2.68l9.9-6.2a.8.8 0 000-1.36l-9.9-6.2a.8.8 0 00-1.2.68z" /></svg>
              </span>
              <span className="itm-film__dur itm-data">{f.duration}</span>
            </span>
            <div className="itm-film__body">
              <span className="itm-film__tags">{f.tags.slice(0, 3).join(" · ")}</span>
              <h3 className="itm-film__title">{f.title}</h3>
              <div className="itm-film__foot">
                <div className="itm-film__who">
                  <span className="itm-film__name">{f.person}</span>
                  {f.role || f.company ? (
                    <span className="itm-film__meta">{f.role ? `${f.role} · ` : ""}{f.company}</span>
                  ) : null}
                </div>
                <span className="itm-film__go" aria-hidden="true">
                  <span>Watch film</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
