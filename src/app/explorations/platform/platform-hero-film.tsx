"use client";

/* ----------------------------------------------------------------------------
 * platform-hero-film.tsx - the platform hero as a pre-rendered film (23 Sep
 * 2026, Linear-style hero): CC-2148 followed across the six screens in one
 * take, rendered in Blender from the real arcade screens (see
 * scripts/platform-render/). The video sits flush on the hero charcoal; its
 * edges already fade to #1f2126, and a CSS mask guarantees it on crops.
 *
 * The rail under it is the PlatformJourney rail, same markup and classes,
 * but it DRIVES the film: each step is a chapter of the loop (5 s each in
 * v2; v3 chapters run to their own length, given as start times), the
 * active step follows the playhead, the timer bar is the chapter's progress,
 * and a click seeks to the chapter. Paused while off screen. Under
 * prefers-reduced-motion nothing plays: the film holds each chapter's key
 * frame and the rail steps between them.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { PlatformJourneyStep } from "./platform-interactive";

const pad = (n: number) => String(n).padStart(2, "0");

/* seconds per rail step when no chapter starts are given (the v2 film) */
const CHAPTER_S = 5;

export function PlatformHeroFilm({
  steps,
  sources,
  poster,
  chapterStarts,
  keyBeats,
  label,
  description,
}: {
  steps: PlatformJourneyStep[];
  sources: { src: string; type: string }[];
  poster: string;
  /* where each rail step starts in the film, seconds; defaults to 5 s each */
  chapterStarts?: readonly number[];
  /* per chapter, seconds in of the still shown when the film does not play
   * (reduced motion, autoplay blocked); defaults to 2.6 s each */
  keyBeats?: readonly number[];
  label: string;
  /* what the film shows, for assistive tech (the video has no audio) */
  description: string;
}) {
  const starts = chapterStarts ?? steps.map((_, i) => i * CHAPTER_S);
  const startsKey = starts.join(",");
  const beatsKey = (keyBeats ?? []).join(",");
  const beatAt = (index: number) => (starts[index] ?? 0) + (keyBeats?.[index] ?? 2.6);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  /* how many chapters the loaded film actually holds; steps past it are
   * disabled (a partial render, e.g. the 15 s test cut, stays usable) */
  const [chapters, setChapters] = useState(steps.length);
  const activeRef = useRef(0);

  /* the playhead drives the rail: active chapter + its progress bar, read
   * each frame without re-rendering the rail */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const measure = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setChapters(Math.min(steps.length, starts.filter((s) => s < video.duration - 0.25).length));
      }
    };
    measure();
    video.addEventListener("loadedmetadata", measure);
    const reduced = typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStill(true);
      video.pause();
      const hold = () => { video.currentTime = beatAt(0); };
      if (video.readyState >= 1) hold();
      else video.addEventListener("loadedmetadata", hold, { once: true });
      return;
    }

    let raf = 0;
    const tick = () => {
      const t = video.currentTime;
      let chapter = 0;
      while (chapter < starts.length - 1 && t >= starts[chapter + 1]) chapter++;
      chapter = Math.min(steps.length - 1, chapter);
      if (chapter !== activeRef.current) {
        activeRef.current = chapter;
        setActive(chapter);
      }
      const bar = timerRefs.current[chapter];
      const end = starts[chapter + 1] ?? video.duration;
      const span = Math.max(0.1, (Number.isFinite(end) ? end : starts[chapter] + CHAPTER_S) - starts[chapter]);
      if (bar) bar.style.transform = `scaleX(${Math.min(1, (t - starts[chapter]) / span).toFixed(4)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* play only while the hero is on screen. If the browser refuses to
     * autoplay (iOS Low Power Mode), show the key beat instead of the film's
     * first frame, which is an empty window the home is about to load into */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((error: unknown) => {
            if ((error as { name?: string })?.name !== "NotAllowedError") return;
            if (video.currentTime < beatAt(activeRef.current)) video.currentTime = beatAt(activeRef.current);
          });
        } else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      video.removeEventListener("loadedmetadata", measure);
    };
    // starts/beats are compared by value (startsKey, beatsKey), not identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length, startsKey, beatsKey]);

  const select = (index: number) => {
    if (index >= chapters) return;
    const video = videoRef.current;
    activeRef.current = index;
    setActive(index);
    if (!video) return;
    if (still) {
      video.currentTime = beatAt(index);
      return;
    }
    video.currentTime = starts[index] + 0.01;
    video.play().catch(() => {});
  };

  return (
    <div className="pf-journey pf-journey--film">
      <div className="pf-journey__stage pf-film" id="pf-film-stage" role="tabpanel">
        <video
          ref={videoRef}
          className="pf-film__video"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={description}
        >
          {sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
        </video>
      </div>

      <div
        className="pf-journey__rail"
        role="tablist"
        aria-label={label}
        style={{ "--pf-journey-count": steps.length } as React.CSSProperties}
      >
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="pf-film-stage"
            className={cn("pf-journey__step", index === active && "is-active")}
            disabled={index >= chapters}
            onClick={() => select(index)}
          >
            <span className="pf-journey__head">
              {step.icon ? (
                <span className="pf-journey__icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20"><path fillRule="evenodd" d={step.icon} /></svg>
                </span>
              ) : (
                <span className="pf-journey__idx dms-data" aria-hidden="true">{pad(index + 1)}</span>
              )}
            </span>
            <span className="pf-journey__name">{step.title}</span>
            <span className="pf-journey__body">{step.body}</span>
            {!still && index === active ? (
              <span className="pf-journey__timer pf-film__timer" aria-hidden="true">
                <i ref={(el) => { timerRefs.current[index] = el; }} />
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
