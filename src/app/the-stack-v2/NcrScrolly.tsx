"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: "03.1",
    name: "Raise & classify",
    text: "A failed inspection, a floor defect, or a customer complaint opens the NC. Severity is set and the owner is named on the record from the first moment — not left in an inbox.",
    src: "/stack-fragments/chat-state-1-open.html",
  },
  {
    n: "03.2",
    name: "Contain",
    text: "Containment — quarantine, line stop, hold tag, supplier notification — is recorded before investigation begins, not added retrospectively.",
    src: "/stack-fragments/chat-state-2-grow.html",
  },
  {
    n: "03.3",
    name: "Disposition",
    text: "The disposition decision — use-as-is, rework, scrap, return to supplier — lands on the record with its rationale. It's the first thing an auditor asks for.",
    src: "/stack-fragments/chat-state-3-commit.html",
  },
  {
    n: "03.4",
    name: "Link the corrective action",
    text: "The NC drives a corrective action, bound both ways. When the CAR validates and closes, the NC closes with it — one chain of records, not three reconstructed email threads.",
    src: "/stack-fragments/chat-state-4-close.html",
  },
];

// Structural styles are inline (not in globals.css) on purpose: this project's
// dev server doesn't hot-reload the global stylesheet reliably, but it does
// reload component JS — so inline keeps the layout dependable while iterating.
export default function NcrScrolly() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Panel height tracks the active screen's real content height (same-origin
  // fragments), so short states don't leave dead space and tall ones aren't cut.
  const cap = typeof window !== "undefined" ? Math.round(window.innerHeight * 0.86) : 760;
  const frameHeight = isMobile ? "58vh" : `${Math.min(heights[active] ?? 620, cap)}px`;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(240px, 0.5fr) 1.5fr",
        columnGap: "clamp(24px, 3vw, 48px)",
        alignItems: "start",
      }}
    >
      {/* Pinned record (right on desktop, top on mobile) */}
      <div
        style={{
          gridColumn: 1,
          gridRow: 1,
          position: "sticky",
          top: isMobile ? 56 : 72,
          alignSelf: "start",
          ...(isMobile ? {} : { gridColumnStart: 2 }),
        }}
      >
        {/* progress, above the card so it never overlaps content */}
        <div
          aria-hidden
          style={{ display: "flex", gap: 6, marginBottom: 10, paddingLeft: 2 }}
        >
          {STEPS.map((s, i) => (
            <span
              key={s.n}
              style={{
                width: active === i ? 18 : 7,
                height: 7,
                transition: "width 280ms ease, background 280ms ease",
                border: `1px solid ${active === i ? "var(--u-primary)" : "var(--stk-ink-3)"}`,
                background: active === i ? "var(--u-primary)" : "transparent",
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "relative",
            height: frameHeight,
            transition: "height 360ms ease",
            border: "1px solid var(--stk-rule)",
            background: "var(--n-0)",
            overflow: "hidden",
          }}
        >
          {STEPS.map((s, i) => (
            <iframe
              key={s.n}
              src={s.src}
              title={s.name}
              onLoad={(e) => {
                try {
                  const h = e.currentTarget.contentDocument?.body?.scrollHeight;
                  if (h) setHeights((p) => (p[i] === h + 4 ? p : { ...p, [i]: h + 4 }));
                } catch {
                  /* cross-origin or not ready — keep fallback height */
                }
              }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
                opacity: active === i ? 1 : 0,
                transition: "opacity 420ms ease",
                pointerEvents: active === i ? "auto" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrolling step text (left on desktop, below on mobile) */}
      <div style={{ gridColumn: 1, gridRow: isMobile ? 2 : 1, display: "flex", flexDirection: "column" }}>
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            data-idx={i}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            style={{
              padding: isMobile ? "clamp(32px, 12vh, 90px) 0" : "clamp(48px, 20vh, 200px) 0",
              display: "grid",
              rowGap: 10,
              opacity: active === i ? 1 : 0.34,
              transition: "opacity 320ms ease",
            }}
          >
            <span className="stk-sub-num">{s.n}</span>
            <h3
              style={{
                fontFamily: "var(--stk-sans)",
                fontSize: "clamp(20px, 2vw, 28px)",
                lineHeight: 1.12,
                letterSpacing: "-0.018em",
                fontWeight: 400,
                color: "var(--stk-ink)",
                margin: 0,
              }}
            >
              {s.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--u-font)",
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--stk-ink-2)",
                margin: 0,
                maxWidth: "46ch",
              }}
            >
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
