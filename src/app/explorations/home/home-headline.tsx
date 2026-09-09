"use client";
/* ============================================================================
 * home-headline - the hero H1 as a set of review variants (2026-09-02 sync
 * with Raj: "Work that crosses teams falls between systems" reads like an
 * ERP or Slack pitch; the homepage must open regulated-industry specific,
 * ideally on CAPA cycle time; Raj liked the earlier revolving-noun concept
 * that ends on "closed faster").
 *
 * Every variant pairs with the SAME sub line in page.tsx. Variant A carries
 * the revolving record noun.
 *
 * 2026-09-09: variant D ("Regulated") is the default and the review strip is
 * no longer rendered on the page. `?hl=B` still deep-links another variant
 * for review; the per-browser localStorage pick is ignored so a stale choice
 * from the review round cannot override the default. <HeroHeadlineReview />
 * is kept (not rendered) in case another round is needed.
 * ========================================================================== */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* the record nouns that revolve in variant A: the work a regulated quality
 * team is measured on */
const ROTOR_NOUNS = ["CAPAs", "Deviations", "Change orders", "Supplier approvals", "Design reviews", "Audit findings"];
const ROTOR_MS = 2400;
/* head start the slot gets on the incoming noun (matches the width tween) */
const ROTOR_LEAD_MS = 260;

type Variant = {
  key: string;
  name: string;
  /* the accessible, static reading of the headline */
  text: string;
  lines: [ReactNode, ReactNode];
};

const VARIANTS: Variant[] = [
  {
    key: "A",
    name: "Revolving noun",
    text: "CAPAs closed faster. Closed proven.",
    lines: [
      <>
        <RotatingNoun nouns={ROTOR_NOUNS} /> closed faster.
      </>,
      <span className="dms-hero__turn">Closed proven.</span>,
    ],
  },
  {
    key: "B",
    name: "Cycle time",
    text: "Close CAPAs in weeks, not quarters.",
    lines: [<>Close CAPAs in weeks,</>, <span className="dms-hero__turn">not quarters.</span>],
  },
  {
    key: "C",
    name: "Proof at close",
    text: "Every CAPA, deviation, and change order closed faster, and proven at close.",
    lines: [
      <>Every CAPA, deviation, and change order</>,
      <span className="dms-hero__turn">closed faster, and proven at close.</span>,
    ],
  },
  {
    key: "D",
    name: "Regulated",
    text: "Regulated work, closed on time. Defensible at audit.",
    lines: [<>Regulated work, closed on time.</>, <span className="dms-hero__turn">Defensible at audit.</span>],
  },
  {
    key: "E",
    name: "The waiting",
    text: "One week of work. Eleven of waiting. Unifize removes the waiting.",
    lines: [<>One week of work. Eleven of waiting.</>, <span className="dms-hero__turn">Unifize removes the waiting.</span>],
  },
];

const STORAGE_KEY = "hm-hero-variant";
const DEFAULT_KEY = "D";

/* the default wins unless the URL asks for another variant (review only) */
function readInitialKey(): string {
  if (typeof window === "undefined") return DEFAULT_KEY;
  const fromUrl = new URLSearchParams(window.location.search).get("hl")?.toUpperCase();
  if (fromUrl && VARIANTS.some((v) => v.key === fromUrl)) return fromUrl;
  return DEFAULT_KEY;
}

/* ================================================== ROTATING NOUN
 * One slot, every noun stacked in it; the slot's width tweens to the active
 * noun so the rest of the line does not jump. Reduced motion: the first noun,
 * static. The animated copy is aria-hidden; the H1's static text lives in the
 * visually-hidden span rendered by HeroHeadline. */
function RotatingNoun({ nouns }: { nouns: string[] }) {
  /* `index` drives the slot width; `shown` follows it after the slot has had
   * time to widen, so the incoming noun is never clipped mid-tween */
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const sizerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % nouns.length), ROTOR_MS);
    return () => window.clearInterval(id);
  }, [animate, nouns.length]);

  useEffect(() => {
    if (index === shown) return;
    const id = window.setTimeout(() => setShown(index), ROTOR_LEAD_MS);
    return () => window.clearTimeout(id);
  }, [index, shown]);

  /* the sizer is the only in-flow child: it carries the INCOMING noun so the
   * slot's natural width is right before hydration and its measured width
   * leads the tween; the visible nouns are absolutely centred over it */
  const measure = useCallback(() => {
    const el = sizerRef.current;
    if (el) setWidth(el.offsetWidth);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, index, shown]);

  /* re-measure when the display font lands or the viewport changes (the
   * first paint may be in the fallback face; a resize can land before the
   * fluid font-size settles, so sample again on the next two frames) */
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      measure();
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => { raf = window.requestAnimationFrame(measure); });
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (ro) {
      if (sizerRef.current) ro.observe(sizerRef.current);
      const h1 = sizerRef.current?.closest("h1");
      if (h1) ro.observe(h1);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [measure]);

  return (
    <span className="hm-rotor" style={width ? { width } : undefined} aria-hidden="true">
      <span className="hm-rotor__sizer" ref={sizerRef}>{nouns[index]}</span>
      {nouns.map((noun, i) => {
        const state = i === shown ? "is-in" : i === (shown + nouns.length - 1) % nouns.length ? "is-out" : "";
        return (
          <span key={noun} className={"hm-rotor__noun" + (state ? " " + state : "")}>
            {noun}
          </span>
        );
      })}
    </span>
  );
}

/* ================================================== SHARED PICK
 * The H1 (left column) and the review strip (under the CTAs, right column)
 * share the chosen variant through this provider, which wraps the hero grid. */
type HeadlineState = { variant: Variant; hydrated: boolean; pick: (key: string) => void };
const HeadlineContext = createContext<HeadlineState | null>(null);

export function HeroHeadlineProvider({ children }: { children: ReactNode }) {
  const [key, setKey] = useState(DEFAULT_KEY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setKey(readInitialKey());
    setHydrated(true);
  }, []);

  const pick = useCallback((next: string) => {
    setKey(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("hl", next);
    window.history.replaceState(null, "", url.toString());
  }, []);

  const variant = VARIANTS.find((v) => v.key === key) ?? VARIANTS[0];
  return <HeadlineContext.Provider value={{ variant, hydrated, pick }}>{children}</HeadlineContext.Provider>;
}

function useHeadline(): HeadlineState {
  const ctx = useContext(HeadlineContext);
  if (!ctx) throw new Error("HeroHeadline must render inside HeroHeadlineProvider");
  return ctx;
}

/* ================================================== HERO HEADLINE */
export function HeroHeadline() {
  const { variant } = useHeadline();
  return (
    <h1 className="dms-hero__title hm-headline" data-variant={variant.key}>
      <span className="hm-visually-hidden">{variant.text}</span>
      <span className="dms-hero__line" aria-hidden="true">{variant.lines[0]}</span>
      <span className="dms-hero__line" aria-hidden="true">{variant.lines[1]}</span>
    </h1>
  );
}

/* ================================================== REVIEW STRIP
 * Not rendered since the 9 Sep pick (D); kept for a future review round. */
export function HeroHeadlineReview() {
  const { variant, hydrated, pick } = useHeadline();
  return (
    <div className={"hm-hl-review" + (hydrated ? " is-ready" : "")} data-review="hero-headline">
      <span className="hm-hl-review__label">Headline</span>
      <div className="hm-hl-review__pills" role="group" aria-label="Headline variants for review">
        {VARIANTS.map((v) => (
          <button
            key={v.key}
            type="button"
            className={"hm-hl-review__pill" + (v.key === variant.key ? " is-active" : "")}
            aria-pressed={v.key === variant.key}
            title={v.name}
            onClick={() => pick(v.key)}
          >
            {v.key}
          </button>
        ))}
      </div>
      <span className="hm-hl-review__name">{variant.name}</span>
    </div>
  );
}
