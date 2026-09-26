"use client";

/* ----------------------------------------------------------------------------
 * tax-cell-film.tsx - the tax cell on /platform 01 as a 10 s film (27 Sep
 * 2026): one non-conformance's 75 real steps (Notion VS-2) turn over into the
 * order they happen, the 54 coordination steps regroup by kind, then pour
 * back into 54 of 75. No product UI, only the figure's own vocabulary. Scene
 * and direction log: scripts/product-films/ctax-cell/.
 *
 * The video is the figure's content box (head, grid, legend); the cell's
 * padding stays page CSS. Its first and last frames are the static figure.
 * It plays ONCE, the first time the cell comes into view (Abhishek, 27 Sep:
 * "do not make it loop"), then a small replay button appears under the
 * bottom-right square. Whether the film shows at all is CSS (from 1200px,
 * with motion allowed; platform-rails.css), so there is no swap on hydration.
 * The homepage tax cell plays the same film from 1280px (27 Sep 2026,
 * home-rails.css).
 *
 * The files are served immutable for a year (next.config.ts), so a new cut
 * ships under the next version; never overwrite a published one.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";

/* v1 (27 Sep 2026): 10.0 s at 30 fps, 1860 x 900 (the 620 x 300 content
 * box at 3x), x264 CRF 22, 0.61 MB; cut as a loop.
 * v2 (27 Sep 2026, "higher frame rate ... a little more time in each
 * state"): 60 fps, the loop's end hold moved into the states (figure 0.8 s,
 * in order 1.4 s, by kind 3.4 s), settles at 9.85 s, CRF 22, 0.73 MB.
 * v1 stays in public/ until v2 is signed off. */
const VERSION = "v2";
const SRC = `/explorations/platform/tax-film-${VERSION}.mp4`;
const POSTER = `/explorations/platform/tax-film-poster-${VERSION}.jpg`;
/* the grid has settled back into 54 of 75 (the rest is a still hold) */
const SETTLED = 9.8;

/* the same query as the CSS that shows the film on /platform; the homepage
 * tax cell is narrower, so it passes its own (home-rails.css) */
const FILM_QUERY = "(min-width: 1200px) and (prefers-reduced-motion: no-preference)";

export function TaxCellFilm({ query: filmQuery = FILM_QUERY }: { query?: string } = {}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia(filmQuery);
    let visible = false;
    let started = false;

    const finish = () => setDone(true);
    const onTime = () => {
      if (video.currentTime >= SETTLED) setDone(true);
    };

    /* the first play starts on view; after that it only pauses and resumes
     * a play that is still running, it never starts one by itself */
    const sync = () => {
      const running = started && !video.ended && video.currentTime < video.duration;
      if (visible && query.matches && (!started || running)) {
        started = true;
        video.preload = "auto";
        video.play().catch(finish);   /* autoplay blocked: offer the button as play */
      } else video.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    query.addEventListener("change", sync);
    video.addEventListener("ended", finish);
    video.addEventListener("timeupdate", onTime);
    return () => {
      io.disconnect();
      query.removeEventListener("change", sync);
      video.removeEventListener("ended", finish);
      video.removeEventListener("timeupdate", onTime);
    };
  }, [filmQuery]);

  const replay = () => {
    const video = ref.current;
    if (!video) return;
    setDone(false);
    video.currentTime = 0;
    video.play().catch(() => setDone(true));
  };

  return (
    <div className={"pf-taxfilm" + (done ? " is-done" : "")}>
      <video
        ref={ref}
        className="pf-taxfilm__video"
        src={SRC}
        poster={POSTER}
        muted
        playsInline
        preload="none"
        aria-label="The 75 steps of one non-conformance turn over into the order they happen, with the work scattered through the coordination. The 54 coordination steps regroup by kind: chasing and waiting 13, meetings and rebuilding context 13, notifying and handing off 11, writing it up and redoing it 10, re-keying between systems 7. They settle back into 54 of 75."
      />
      <button
        type="button"
        className="pf-taxfilm__replay"
        onClick={replay}
        tabIndex={done ? 0 : -1}
        aria-hidden={!done}
        aria-label="Replay"
        title="Replay"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3.2 6.4A5 5 0 1 1 3 9.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <path d="M2.6 2.9v3.9h3.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </button>
    </div>
  );
}
