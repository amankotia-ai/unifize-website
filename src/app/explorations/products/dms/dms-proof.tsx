"use client";

/* ============================================================================
 * dms-proof.tsx - the PROOF section as a customer film rail. Replaces the
 * shared industry-template-modern CustomerSuccess (sample stories) with the
 * REAL customer videos from the Webflow CMS (PROOF_FILMS in dms-data.ts).
 * The lead card keeps the one signed, customer-attested figure (MD_PROOF).
 * Type sits on a solid panel below the poster, never over the photograph;
 * each film card links to the full story on unifize.com.
 * ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { Eyebrow } from "./dms-primitives";
import { PROOF_FILMS } from "./dms-data";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export function DmsProofFilms() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [railState, setRailState] = useState({ atStart: true, atEnd: false });

  const updateRailState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const atStart = el.scrollLeft <= 2;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setRailState((current) =>
      current.atStart === atStart && current.atEnd === atEnd
        ? current
        : { atStart, atEnd },
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

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".dms-film"));
    const scrollInset = Number.parseFloat(
      getComputedStyle(el).scrollPaddingInlineStart,
    ) || 0;
    const positions = cards.map(
      (card) => card.offsetLeft - el.offsetLeft - scrollInset,
    );
    const current = el.scrollLeft;
    const target = dir > 0
      ? positions.find((position) => position > current + 8)
      : [...positions].reverse().find((position) => position < current - 8);

    el.scrollTo({
      left: target ?? (dir > 0 ? el.scrollWidth : 0),
      behavior: "smooth",
    });
  };

  return (
    <section className="dms-section dms-films" id="proof" aria-labelledby="dms-proof-title">
      <div className="dms-wrap">
        <header className="dms-films__head">
          <div className="dms-head">
            <Eyebrow n={6}>Customer proof</Eyebrow>
            <h2 className="dms-h2" id="dms-proof-title">Results, honestly stated, from quality teams like yours.</h2>
            <p className="dms-lede">Short, candid accounts of document control, training, and change management from the people doing the work.</p>
          </div>

          <div className="dms-films__controls">
            <span className="dms-films__count">{String(PROOF_FILMS.length).padStart(2, "0")} customer films</span>
            <div className="dms-films__nav" aria-label="Customer film navigation">
              <button
                type="button"
                className="dms-films__arrow"
                aria-label="Previous films"
                aria-controls="dms-film-track"
                disabled={railState.atStart}
                onClick={() => scroll(-1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                className="dms-films__arrow"
                aria-label="Next films"
                aria-controls="dms-film-track"
                disabled={railState.atEnd}
                onClick={() => scroll(1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </header>

        <div
          className="dms-films__track"
          id="dms-film-track"
          ref={trackRef}
          onScroll={updateRailState}
        >
          {/* the one signed number, kept apart from the films */}
          <article className="dms-film dms-film--stat">
            <span className="dms-film__brand">Customer-attested result</span>
            <div className="dms-film__result">
              <span className="dms-film__stat dms-data">{MD_PROOF.stat.pct}%</span>
              <span className="dms-film__stat-lab">lower {MD_PROOF.stat.metric}</span>
            </div>
            <p className="dms-film__quote">
              {usd(MD_PROOF.stat.recovered)} recovered in year one, against a signed {usd(MD_PROOF.stat.baseline)} baseline.
            </p>
            <span className="dms-film__meta">Signed, verifiable customer baseline</span>
          </article>

          {PROOF_FILMS.map((f) => (
            <a
              key={f.wistia}
              className="dms-film"
              href={f.url}
              target="_blank"
              rel="noreferrer"
              data-wistia={f.wistia}
              aria-label={`Watch: ${f.title} — ${f.person}, ${f.company} (${f.duration})`}
            >
              <span className="dms-film__media">
                <img className="dms-film__poster" src={f.poster} alt="" loading="lazy" />
                <span className="dms-film__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.5 5.8v12.4c0 .62.68 1 1.2.68l9.9-6.2a.8.8 0 000-1.36l-9.9-6.2a.8.8 0 00-1.2.68z" /></svg>
                </span>
                <span className="dms-film__dur dms-data">{f.duration}</span>
              </span>
              <div className="dms-film__body">
                <span className="dms-film__tags">{f.modules.join(" · ")}</span>
                <h3 className="dms-film__title">{f.title}</h3>
                <div className="dms-film__foot">
                  <div className="dms-film__who">
                    <span className="dms-film__name">{f.person}</span>
                    <span className="dms-film__meta">{f.role ? `${f.role} · ` : ""}{f.company}</span>
                  </div>
                  <span className="dms-film__go" aria-hidden="true">
                    <span>Watch film</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
