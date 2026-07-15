"use client";

/* ============================================================================
 * dms-proof.tsx - the PROOF section as a customer film rail. Replaces the
 * shared industry-template-modern CustomerSuccess (sample stories) with the
 * REAL customer videos from the Webflow CMS (PROOF_FILMS in dms-data.ts).
 * The lead card keeps the one signed, customer-attested figure (MD_PROOF).
 * Type sits on a solid panel below the poster, never over the photograph;
 * each film card links to the full story on unifize.com.
 * ========================================================================== */

import { useRef } from "react";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { Eyebrow } from "./dms-primitives";
import { PROOF_FILMS } from "./dms-data";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export function DmsProofFilms() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".dms-film");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="itm-section itm-section--alt itm-cs dms-films" id="proof" aria-label="Customer proof">
      <div className="itm-wrap itm-wrap--wide itm-cs__head">
        <div className="itm-head-block">
          <Eyebrow n={6}>Customer proof</Eyebrow>
          <h2 className="itm-h2">Results, honestly stated, from quality teams like yours.</h2>
        </div>
        <div className="itm-cs__nav">
          <button type="button" className="itm-cs__arrow" aria-label="Previous films" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" className="itm-cs__arrow" aria-label="Next films" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="itm-wrap itm-wrap--wide">
        <div className="itm-cs__track" ref={trackRef}>
          {/* the one signed number, kept apart from the films */}
          <article className="dms-film dms-film--stat">
            <span className="dms-film__brand">Customer-attested</span>
            <span className="dms-film__stat dms-data">{MD_PROOF.stat.pct}%</span>
            <span className="dms-film__stat-lab">lower {MD_PROOF.stat.metric}</span>
            <p className="dms-film__quote">
              {usd(MD_PROOF.stat.recovered)} recovered in year one, against a signed {usd(MD_PROOF.stat.baseline)} baseline.
            </p>
            <span className="dms-film__meta">From one signed, verifiable customer baseline</span>
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
              <span className="dms-film__body">
                <span className="dms-film__tags">{f.modules.join(" · ")}</span>
                <span className="dms-film__title">{f.title}</span>
                <span className="dms-film__foot">
                  <span className="dms-film__who">
                    <span className="dms-film__name">{f.person}</span>
                    <span className="dms-film__meta">{f.role ? `${f.role} · ` : ""}{f.company}</span>
                  </span>
                  <span className="dms-film__go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
