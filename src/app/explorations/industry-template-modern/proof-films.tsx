"use client";

/* ============================================================================
 * proof-films.tsx — section 08 · PROOF as a customer film rail, in the DMS
 * proof layout (see products/dms/dms-proof.tsx). Replaces the CustomerSuccess
 * carousel (three real cards + three SAMPLE stories) with the REAL Medical
 * Devices customer videos from the Notion "Website Customer Videos" DB
 * (MD_PROOF_FILMS in industry-data.ts). The lead card keeps the one signed,
 * customer-attested figure (MD_PROOF). Type sits on a solid panel below the
 * poster, never over the photograph; each film card links to the full story
 * on unifize.com.
 * ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { Eyebrow } from "./itm-primitives";
import { MD_PROOF_FILMS } from "./industry-data";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export function ProofFilms() {
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

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".itm-film"));
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
    <section className="itm-section itm-films" id="proof" aria-labelledby="itm-proof-title">
      <div className="itm-wrap">
        <header className="itm-films__head" data-reveal>
          <div className="itm-head-block">
            <Eyebrow n={7}>Proof</Eyebrow>
            <h2 className="itm-h2" id="itm-proof-title">Results, honestly stated, from device teams in your class.</h2>
            <p className="itm-lede">
              Short, candid accounts of change control, traceability, and audit readiness from the
              quality and engineering people doing the work at FDA-regulated device companies.
            </p>
          </div>

          <div className="itm-films__controls">
            <span className="itm-films__count itm-data">{String(MD_PROOF_FILMS.length).padStart(2, "0")} customer films</span>
            <div className="itm-films__nav" aria-label="Customer film navigation">
              <button
                type="button"
                className="itm-films__arrow"
                aria-label="Previous films"
                aria-controls="itm-film-track"
                disabled={railState.atStart}
                onClick={() => scroll(-1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                className="itm-films__arrow"
                aria-label="Next films"
                aria-controls="itm-film-track"
                disabled={railState.atEnd}
                onClick={() => scroll(1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </header>

        <div
          className="itm-films__track"
          id="itm-film-track"
          ref={trackRef}
          onScroll={updateRailState}
        >
          {/* the one signed number, kept apart from the films */}
          <article className="itm-film itm-film--stat">
            <span className="itm-film__brand">Customer-attested result</span>
            <div className="itm-film__result">
              <span className="itm-film__stat itm-data">{MD_PROOF.stat.pct}%</span>
              <span className="itm-film__stat-lab">lower {MD_PROOF.stat.metric}</span>
            </div>
            <p className="itm-film__quote">
              {usd(MD_PROOF.stat.recovered)} recovered in year one, against a signed {usd(MD_PROOF.stat.baseline)} baseline.
            </p>
            <span className="itm-film__meta">Signed, verifiable customer baseline</span>
          </article>

          {MD_PROOF_FILMS.map((f) => (
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
                <span className="itm-film__tags">{f.modules.join(" · ")}</span>
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
    </section>
  );
}
