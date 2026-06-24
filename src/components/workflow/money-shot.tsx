"use client";

/* ------------------------------------------------------------
 * MoneyShot — §06, the closing "money shot" (2026-06-02 call with Ben).
 *
 * Ben: "we need to be able to have a final screen which is a money shot,
 * which is the one that says, okay, how much is this worth to your
 * organization? … how does this connect to money? … this is how we sell it."
 *
 * Reworked per 2026-06-03 call:
 * 1) Range per record, not an aggregate — Ben: "instead of 3.1, because you
 *    don't know how big the organization is … between $1,200 and $2,400 per
 *    non conformance." He said "nonconformance" loosely; the unit is the
 *    page's record — here, the change order.
 * 2) Metrics beyond money — "75% reduction in cycle times … 75% reduction
 *    in effort" (approvals) + "improvement in cost of poor quality".
 * 3) Customer outlinks for social proof (Abhishek's add, Ben approved the
 *    journey) — NEEDS real case-study URLs + verified figures.
 * 4) CTAs: Book a demo + "See your numbers" → the coordination tax
 *    calculator ("Perfect … exactly right").
 * ------------------------------------------------------------ */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/atoms";
import "./money-shot.css";

// $ saved per record (Ben 2026-06-03, verbatim range)
const LOW = 1200;
const HIGH = 2400;

export interface MoneyShotProps {
  className?: string;
  /** the page's record type — "change order", "nonconformance", "CAPA" … */
  unit?: string;
}

export function MoneyShot({ className, unit = "change order" }: MoneyShotProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [t, setT] = useState(0); // 0→1 count-up progress

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setT(1);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1300;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setT(1 - Math.pow(1 - p, 3)); // easeOutCubic
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

  return (
    <section ref={ref} className={["money-shot", className].filter(Boolean).join(" ")}>
      <div className="section-inner">
        <div className="ms-inner">
          <span className="ms-eyebrow">06 · What it’s worth</span>
          <h2 className="ms-q">So what’s it worth to your organization?</h2>

          {/* THE ANSWER — figure, unit, and the basis that produces it, read
              as one block. Basis anchors to §02's readout (123 h → 43 h ≈
              80 h removed); $15–$30 loaded rate is the assumption that makes
              Ben's range true (needs his real basis). */}
          <div
            className="ms-figure-wrap"
            role="img"
            aria-label={`$${fmt(LOW)} to $${fmt(HIGH)} recovered per ${unit}`}
          >
            <div className="ms-figure">
              ${fmt(LOW * t)}<span className="ms-figure-dash">–</span>${fmt(HIGH * t)}
            </div>
            <div className="ms-unit">recovered per {unit}</div>
            <div className="ms-basis" aria-hidden="true">
              ≈80 hours of waiting removed × $15–$30 per loaded hour
            </div>
          </div>

          {/* THE OTHER READS — secondary by design, one quiet strip (Ben
              2026-06-03: cycle times, approval effort, COPQ — directional
              "something like that" figures, to be hardened with customer
              data). */}
          <div className="ms-stats">
            <div className="ms-stat">
              <b>75%</b>
              <span>faster cycles</span>
            </div>
            <div className="ms-stat">
              <b>75%</b>
              <span>less approval effort</span>
            </div>
            <div className="ms-stat">
              <b>75%</b>
              <span>lower cost of poor quality</span>
            </div>
          </div>

          {/* THE BACKING — proof attached to the claims, just above the ask.
              TODO(needs-Ben): real case-study URLs + verified figures. */}
          <div className="ms-proof">
            <span className="ms-proof-k">In the field:</span>
            <a href="/proof" className="ms-proof-link">Biovation Labs →</a>
            <a href="/proof" className="ms-proof-link">Harmonic Bionics →</a>
          </div>

          <div className="ms-cta">
            <Button arrow size="lg">
              Book a demo
            </Button>
            {/* the coordination tax calculator (Ben 2026-06-03: "see your
                numbers" → the CT calculator; built 2026-06-05) */}
            <Link href="/coordination-tax-calculator" className="btn btn-dark-ghost btn-lg">
              See your numbers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
