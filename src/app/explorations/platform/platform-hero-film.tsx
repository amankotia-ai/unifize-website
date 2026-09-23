"use client";

/* ----------------------------------------------------------------------------
 * platform-hero-film.tsx - the platform hero as a pre-rendered film (23 Sep
 * 2026, Linear-style hero): CC-2148 followed across the six screens in one
 * take, rendered in Blender from the real arcade screens (see
 * scripts/platform-render/). The video sits flush on the hero charcoal; its
 * edges already fade to #1f2126, and a CSS mask guarantees it on crops.
 *
 * The rail under it is the PlatformJourney rail, same markup and classes,
 * but it DRIVES the film: each step is a 5 s chapter of the 30 s loop, the
 * active step follows the playhead, the timer bar is the chapter's progress,
 * and a click seeks to the chapter. Paused while off screen. Under
 * prefers-reduced-motion nothing plays: the film holds each chapter's key
 * frame and the rail steps between them.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { PlatformJourneyStep } from "./platform-interactive";

const pad = (n: number) => String(n).padStart(2, "0");

/* seconds per rail step, and where in a chapter its key beat sits (the
 * piece fully lifted), for the reduced-motion stills */
const CHAPTER_S = 5;
const KEY_BEAT_S = 2.6;

export function PlatformHeroFilm({
  steps,
  sources,
  poster,
  label,
  description,
}: {
  steps: PlatformJourneyStep[];
  sources: { src: string; type: string }[];
  poster: string;
  label: string;
  /* what the film shows, for assistive tech (the video has no audio) */
  description: string;
}) {
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
        setChapters(Math.min(steps.length, Math.round(video.duration / CHAPTER_S)));
      }
    };
    measure();
    video.addEventListener("loadedmetadata", measure);
    const reduced = typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStill(true);
      video.pause();
      const hold = () => { video.currentTime = KEY_BEAT_S; };
      if (video.readyState >= 1) hold();
      else video.addEventListener("loadedmetadata", hold, { once: true });
      return;
    }

    let raf = 0;
    const tick = () => {
      const t = video.currentTime;
      const chapter = Math.min(steps.length - 1, Math.floor(t / CHAPTER_S));
      if (chapter !== activeRef.current) {
        activeRef.current = chapter;
        setActive(chapter);
      }
      const bar = timerRefs.current[chapter];
      if (bar) bar.style.transform = `scaleX(${((t % CHAPTER_S) / CHAPTER_S).toFixed(4)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* play only while the hero is on screen */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      video.removeEventListener("loadedmetadata", measure);
    };
  }, [steps.length]);

  const select = (index: number) => {
    if (index >= chapters) return;
    const video = videoRef.current;
    activeRef.current = index;
    setActive(index);
    if (!video) return;
    if (still) {
      video.currentTime = index * CHAPTER_S + KEY_BEAT_S;
      return;
    }
    video.currentTime = index * CHAPTER_S + 0.01;
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
