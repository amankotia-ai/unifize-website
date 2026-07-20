"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eyebrow } from "../dms/dms-primitives";

export type QmsProofStory = {
  quote: string;
  name: string;
  title: string;
  img: string;
};

export function QmsProofStories({ stories }: { stories: QmsProofStory[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [railState, setRailState] = useState({ atStart: true, atEnd: false });

  const updateRailState = useCallback(() => {
    const element = trackRef.current;
    if (!element) return;

    const atStart = element.scrollLeft <= 2;
    const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
    setRailState((current) =>
      current.atStart === atStart && current.atEnd === atEnd ? current : { atStart, atEnd },
    );
  }, []);

  useEffect(() => {
    const element = trackRef.current;
    if (!element) return;

    updateRailState();
    const observer = new ResizeObserver(updateRailState);
    observer.observe(element);
    return () => observer.disconnect();
  }, [updateRailState]);

  const scroll = (direction: number) => {
    const element = trackRef.current;
    if (!element) return;

    const cards = Array.from(element.querySelectorAll<HTMLElement>(".qms-story"));
    const positions = cards.map((card) => card.offsetLeft - element.offsetLeft);
    const current = element.scrollLeft;
    const target = direction > 0
      ? positions.find((position) => position > current + 8)
      : [...positions].reverse().find((position) => position < current - 8);

    element.scrollTo({
      left: target ?? (direction > 0 ? element.scrollWidth : 0),
      behavior: "smooth",
    });
  };

  return (
    <section className="dms-section dms-films qms-stories" id="proof" aria-labelledby="qms-proof-title">
      <div className="dms-wrap">
        <header className="dms-films__head">
          <div className="dms-head">
            <Eyebrow n={6}>Customer proof</Eyebrow>
            <h2 className="dms-h2" id="qms-proof-title">What quality teams say when the proof stays on the record.</h2>
            <p className="dms-lede">Quality events, supplier signals, and CAPA effectiveness become one trace instead of a trail of follow-up.</p>
          </div>

          <div className="dms-films__controls">
            <span className="dms-films__count">{String(stories.length).padStart(2, "0")} quality stories</span>
            <div className="dms-films__nav" aria-label="Quality story navigation">
              <button
                type="button"
                className="dms-films__arrow"
                aria-label="Previous stories"
                aria-controls="qms-story-track"
                disabled={railState.atStart}
                onClick={() => scroll(-1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                className="dms-films__arrow"
                aria-label="Next stories"
                aria-controls="qms-story-track"
                disabled={railState.atEnd}
                onClick={() => scroll(1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </header>

        <div className="dms-films__track" id="qms-story-track" ref={trackRef} onScroll={updateRailState}>
          {stories.map((story) => (
            <article className="dms-film qms-story" key={`${story.name}-${story.quote}`}>
              <span className="dms-film__media">
                <img className="dms-film__poster" src={story.img} alt="" loading="lazy" />
              </span>
              <div className="dms-film__body">
                <span className="dms-film__tags">Quality management</span>
                <blockquote className="dms-film__title qms-story__quote">“{story.quote}”</blockquote>
                <footer className="dms-film__foot">
                  <div className="dms-film__who">
                    <span className="dms-film__name">{story.name}</span>
                    <span className="dms-film__meta">{story.title}</span>
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
