"use client";

/* ----------------------------------------------------------------------------
 * home-interactive.tsx - the homepage's two product stages.
 *
 * HeroArcadeSwitcher: one arcade app window, four worlds. Round 1 of the
 * panel test showed a single quality-events mock polarizes by role; round 2
 * showed three quality-side artifacts still read as "quality's tool" to ops
 * and engineering. The four views keep that finding - one artifact per
 * audience - but the visual is now the shared stylized-arcade system the
 * product and platform pages journey on (2026-08-09 port): quality event,
 * change order, holds & release, controlled document, each a different pose
 * of the same app window. Auto-advances gently until the visitor interacts
 * (click stops it for good, hovering pauses it); honors
 * prefers-reduced-motion by not auto-advancing. The mechanism journey in 03
 * reuses the platform page's PlatformJourney directly.
 *
 * ProductSuiteShowcase: section 04 in the platform journey's stage-and-rail
 * idiom - one product window on the blue stage, four governed records on the
 * rail, each posed in its own product's world.
 *
 * Both stages keep ONE arcade window mounted and let a config change PAN the
 * camera - arcade.css already transitions the transform, the panel
 * opacities, and the target highlight (2026-09-01; the old keyed remounts
 * hard-cut and replayed the entry animation on every tab, reading as a page
 * load). Worlds change wholesale between tabs - a different record,
 * different people - so the swap hides under a short interior dip
 * (usePannedConfig): the panels dim, the config swaps at the bottom of the
 * dip, and the pan carries the new record in. Reduced motion swaps
 * instantly, matching the disabled camera transition.
 *
 * Hero films (26 Sep 2026): a view can carry a film, a short video of its
 * workflow performed in the window, filmed still in the window's own place
 * (scripts/product-films/home-hero). From 768px up the film covers the
 * window's rectangle with its own plate and grain; the wash around it is
 * the stage's CSS, untouched. The tabs follow the film: it plays once,
 * holds its finished result 1.5 s, then the next tab starts. A picked tab
 * plays and holds its result; picking it again replays it. Under reduced
 * motion, or when autoplay is refused, the film holds its finished frame.
 * Phones keep the arcade (the hero's phone frame is the thread column).
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";
import { RibbonField } from "../products/_shared/arcade/ribbon-field";
import { PlatformJourney, type PlatformJourneyStep } from "../platform/platform-interactive";
import { NavGlyph, type IconName } from "../_shared/nav-data";
import type { HomeHeroFilm } from "./hero-film-assets";

export type HeroArcadeView = {
  key: string;
  label: string;
  /* a solid glyph from the nav set in place of the tab number (22 Sep 2026) */
  icon?: IconName;
  config: ArcadeStepConfig;
  /* the view's workflow as a film, shown in place of the window from 768px */
  film?: HomeHeroFilm;
};

/* the record-swap dip: dim-out finishes on the 160ms panel transition in
 * arcade.css before the new world lands */
const SWAP_DIP_MS = 170;

function usePannedConfig(target: ArcadeStepConfig) {
  const [shown, setShown] = useState(target);
  const [dipped, setDipped] = useState(false);
  useEffect(() => {
    if (shown === target) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    setDipped(true);
    const timer = window.setTimeout(() => {
      setShown(target);
      setDipped(false);
    }, SWAP_DIP_MS);
    return () => window.clearTimeout(timer);
  }, [target, shown]);
  return { shown, dipped };
}

const ADVANCE_MS = 6400;
/* how long a finished film holds its result before the next tab */
const FILM_HOLD_MS = 1500;
/* films play from tablet up; phones keep the arcade's thread-column frame */
const FILM_MEDIA = "(min-width: 768px)";

type FilmPhase = "waiting" | "playing" | "ended" | "still";

/* One hero film, mounted while its tab is active (so every visit plays it
 * from the top). It reports its phase so the tabs can follow it, and plays
 * only while on screen. */
function HeroFilm({
  film,
  onPhase,
}: {
  film: HomeHeroFilm;
  onPhase: (phase: FilmPhase, left?: number) => void;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const report = useRef(onPhase);
  useEffect(() => { report.current = onPhase; });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    /* the finished workflow, when the film can't play */
    const hold = () => {
      const seek = () => { video.currentTime = film.keyBeat; };
      if (video.readyState >= 1) seek();
      else video.addEventListener("loadedmetadata", seek, { once: true });
      report.current("still");
    };
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      hold();
      return;
    }
    report.current("waiting");
    const onPlaying = () => report.current("playing", Math.max(0, (video.duration || film.keyBeat) - video.currentTime));
    const onEnded = () => report.current("ended");
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnded);
    const play = () => video.play().catch((error: unknown) => {
      if ((error as { name?: string })?.name === "NotAllowedError") hold();
    });
    /* play only while the hero is on screen */
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!video.ended) play(); }
      else video.pause();
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
    };
  }, [film]);

  return (
    <div className="hm-heromock__film">
      <video
        ref={ref}
        className="hm-heromock__video"
        src={film.src}
        poster={film.poster}
        muted
        playsInline
        preload="auto"
        aria-label={film.description}
      />
    </div>
  );
}

export function HeroArcadeSwitcher({ views }: { views: HeroArcadeView[] }) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  /* films: whether this viewport shows them, the active film's phase, how
   * much of it was left when it started playing (the timer bar's length),
   * and a counter that remounts the film to replay it */
  const [filmMedia, setFilmMedia] = useState(false);
  const [phase, setPhase] = useState<FilmPhase>("waiting");
  const [left, setLeft] = useState(0);
  const [run, setRun] = useState(0);

  /* auto-advance only when motion is welcome, and only until first interaction */
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setAutoplay(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.(FILM_MEDIA);
    if (!mq) return;
    const sync = () => setFilmMedia(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const view = views[active];
  const film = filmMedia ? view.film : undefined;

  /* a view with a film advances once the film has ended and held its
   * result; the others (and a film held as a still) on the fixed beat. A
   * newly mounted film reports "waiting" in its own effect, which runs
   * before this one's rerun, so a phase left over from the last visit
   * never advances the new one. */
  useEffect(() => {
    if (!autoplay || paused) return;
    let ms = ADVANCE_MS;
    if (film && phase !== "still") {
      if (phase !== "ended") return;
      ms = FILM_HOLD_MS;
    }
    timer.current = window.setTimeout(() => setActive((i) => (i + 1) % views.length), ms);
    return () => { if (timer.current !== null) window.clearTimeout(timer.current); };
  }, [autoplay, paused, active, views.length, film, phase]);

  const pick = (i: number) => {
    setAutoplay(false);
    if (i === active && views[i].film) setRun((n) => n + 1);   /* again: replay */
    setActive(i);
  };

  const onPhase = (next: FilmPhase, remaining?: number) => {
    setPhase(next);
    if (next === "playing" && remaining !== undefined) setLeft(remaining);
  };

  /* the tab's timer bar: the film's remaining time plus the hold, from the
   * moment it plays (one continuous run through the hold) */
  const timerMs = !film || phase === "still"
    ? ADVANCE_MS
    : phase === "playing" || phase === "ended"
      ? left * 1000 + FILM_HOLD_MS
      : null;

  const scene = usePannedConfig(view.config);
  return (
    <div
      className="hm-heromock"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hm-heromock__tabs" role="tablist" aria-label="See the product">
        {views.map((v, i) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={"hm-heromock__tab" + (i === active ? " is-active" : "")}
            onClick={() => pick(i)}
          >
            {v.icon ? <span className="hm-heromock__ico" aria-hidden="true"><NavGlyph name={v.icon} /></span> : null}
            {v.label}
            {autoplay && !paused && i === active && timerMs !== null ? (
              <span
                key={`${active}-${run}-${film ? "film" : "arcade"}`}
                className="hm-heromock__timer"
                style={{ animationDuration: `${timerMs}ms` }}
                aria-hidden="true"
              />
            ) : null}
          </button>
        ))}
      </div>
      {/* one persistent window: the camera pans between worlds, the interior
        * dips for the record swap. A view's film covers it in place. */}
      <div className={cn("hm-heromock__stage rf rf--fan rf--plate", film && "has-film")}>
        <RibbonField composition="fan" />
        <div className={cn("hm-heromock__scene", scene.dipped && "is-dipped")} aria-hidden={film ? true : undefined}>
          <ArcadeStepScene config={scene.shown} />
        </div>
        {film ? <HeroFilm key={`${view.key}-${run}`} film={film} onPhase={onPhase} /> : null}
      </div>
    </div>
  );
}

/* ================================================== MECHANISM RECORD TOGGLE
 * Section 03's journey, runnable on more than one record (2026-09-01 panel:
 * the mechanism shown only on NC-204 pattern-matched to "quality's tool").
 * The journey stays MOUNTED across a record switch: the same step index
 * re-poses on the other record's world, so switching proves the claim - one
 * mechanism, any record - with the camera pan instead of a reload. */

export type MechanismRecordJourney = {
  key: string;
  label: string;
  meta: string;
  steps: PlatformJourneyStep[];
  configs: ArcadeStepConfig[];
};

export function MechanismJourney({ records }: { records: MechanismRecordJourney[] }) {
  const [active, setActive] = useState(0);
  const record = records[active];
  return (
    <div className="hm-journeyrec">
      <div className="hm-journeyrec__bar" role="tablist" aria-label="Follow the mechanism on a record">
        <span className="hm-journeyrec__label">Follow it on</span>
        {records.map((r, index) => (
          <button
            key={r.key}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={cn("hm-journeyrec__pick", index === active && "is-active")}
            onClick={() => setActive(index)}
          >
            <span className="dms-data">{r.meta}</span>
            {r.label}
          </button>
        ))}
      </div>
      <PlatformJourney
        steps={record.steps}
        configs={record.configs}
        stageClassName="rf rf--twin"
        stageField={<RibbonField composition="twin" />}
      />
    </div>
  );
}

/* ===================================================== PRODUCT SUITE STAGE */

export type ProductSuiteItem = {
  code: string;
  /* the product's own pictogram, shared with the nav's Products menu */
  icon: IconName;
  name: string;
  body: string;
  outcome: string;
  href: string;
  config: ArcadeStepConfig;
};

const SUITE_ADVANCE_MS = 7200;

export function ProductSuiteShowcase({ items }: { items: ProductSuiteItem[] }) {
  const [active, setActive] = useState(0);
  /* auto-play stops for good the moment the visitor takes over */
  const [auto, setAuto] = useState(true);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const inView = useRef(false);
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    if (!auto) return;
    if (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      return;
    }
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => { inView.current = entry.isIntersecting; },
      { threshold: 0.35 },
    );
    observer.observe(host);

    const timer = window.setInterval(() => {
      if (inView.current && !document.hidden) {
        setActive((activeRef.current + 1) % items.length);
      }
    }, SUITE_ADVANCE_MS);

    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [auto, items.length]);

  const select = (index: number) => {
    setAuto(false);
    setActive(index);
  };

  const item = items[Math.min(active, items.length - 1)];
  const scene = usePannedConfig(item.config);
  return (
    <div className="hm-suite" ref={hostRef}>
      <div className="hm-suite__stage rf rf--arch" id="hm-suite-stage" role="tabpanel" aria-live="polite">
        {/* one persistent window: the camera pans between product worlds, the
          * interior dips for the record swap */}
        <RibbonField composition="arch" />
        <div className={cn("hm-suite__scene", scene.dipped && "is-dipped")}>
          <ArcadeStepScene config={scene.shown} />
        </div>
      </div>

      <div className="hm-suite__rail" role="tablist" aria-label="The product suite">
        {items.map((product, index) => (
          <div className={cn("hm-suite__cell", index === active && "is-active")} key={product.code}>
            <button
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="hm-suite-stage"
              className="hm-suite__pick"
              onClick={() => select(index)}
            >
              <span className="hm-suite__head">
                <span className="hm-suite__glyph" data-glyph={product.icon} aria-hidden="true"><NavGlyph name={product.icon} /></span>
                <span className="hm-suite__name">{product.name}</span>
              </span>
              <span className="hm-suite__body">{product.body}</span>
              <strong className="hm-suite__outcome">{product.outcome}</strong>
              {auto && index === active ? (
                <span className="hm-suite__timer" aria-hidden="true">
                  <i style={{ animationDuration: `${SUITE_ADVANCE_MS}ms` }} />
                </span>
              ) : null}
            </button>
            <Link className="hm-suite__link" href={product.href}>
              Explore {product.code} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
