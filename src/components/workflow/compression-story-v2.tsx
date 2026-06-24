"use client";

/* ------------------------------------------------------------
 * CompressionStoryV2 — §03 drill (2026-06-01 call rework).
 *
 * Ben: "this is what's going to be key — we have to focus on this bit."
 *
 * The drill now pins a two-column stage: the Change Control journey
 * timeline runs down the LEFT and advances as you scroll, while the
 * Unifize product (ChatShell) evolves on the RIGHT, scrubbed to the
 * SAME scroll progress — not an auto-trigger animation. As you move
 * through the timeline on the left, the work on the right turns into
 * one governed thread (chat on the left of the product, checklist on
 * the right, exactly as Ben described).
 *
 * Cut on 2026-06-01 ("let's just simplify this"): the Reality + Cost
 * text beats (the "first two steps"), the orbiting tool-artefacts, and
 * the hand-built record card. The product itself carries the story.
 *
 * Mechanic: one tall section drives a 0..1 scroll progress (rAF-
 * throttled); the sticky stage is pinned to the viewport. Below the
 * desktop breakpoint the stage un-pins and ChatShell falls back to its
 * standalone auto-play. Reduced motion resolves straight to the end.
 * ------------------------------------------------------------ */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Workflow } from "@/lib/platform-data/workflows";
import { ChatShell } from "@/components/organisms";

export interface CompressionStoryV2Props {
  workflow: Workflow;
  stepId?: string;
  className?: string;
  /** Which record ChatShell replays (defaults to the CAPA thread). */
  chatVariant?: "capa" | "change-control";
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export function CompressionStoryV2({ workflow, className, chatVariant }: CompressionStoryV2Props) {
  const steps = workflow.nodes.filter((n) => n.kind === "step");

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isWide, setIsWide] = useState(true);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Desktop-only pin/scrub; narrow screens stack and let ChatShell auto-play.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const apply = () => setIsWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // scroll → progress (rAF-throttled), pinned-stage style.
  useEffect(() => {
    if (!isWide) return;
    if (reducedRef.current) {
      setProgress(1);
      return;
    }
    let raf = 0;
    let last = 0;
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp01(total > 0 ? -rect.top / total : 0);
      setProgress(p);
    };
    const onScroll = () => {
      const now = performance.now();
      if (raf || now - last < 12) return;
      last = now;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isWide]);

  // Map progress → the active step on the left timeline. The first ~8% and
  // last ~8% of the scroll are "settle" room so the ends aren't abrupt.
  const n = Math.max(1, steps.length);
  const eased = clamp01((progress - 0.06) / 0.88);
  const activeIdx = Math.min(n - 1, Math.floor(eased * n));
  const chatProgress = isWide ? eased : undefined;

  return (
    <section ref={sectionRef} className={cn("cs2", className)} data-progress={progress.toFixed(2)}>
      <div className="cs2-sticky">
        <div className="section-inner cs2-inner">
          {/* LEFT — the journey timeline, advancing as you scroll */}
          <aside className="cs2-rail">
            <div className="cs2-rail-head">
              <span className="section-eyebrow">03 · See how</span>
              <h2 className="cs2-title">One step, the way it actually runs inside Unifize.</h2>
              <p className="cs2-lede">
                Same Change Control journey. Scroll the timeline: on the right, the
                swarm becomes one governed thread, every message, approval and
                signature bound to the record.
              </p>
            </div>

            <ol className="cs2-steps">
              {steps.map((s, i) => {
                const state = i < activeIdx ? "done" : i === activeIdx ? "on" : "pend";
                const idx = s.kind === "step" ? s.index : i + 1;
                const role = s.kind === "step" ? s.role : undefined;
                return (
                  <li key={s.id} className={cn("cs2-step", `is-${state}`)}>
                    <span className="cs2-step-dot" aria-hidden />
                    <span className="cs2-step-idx">{String(idx).padStart(2, "0")}</span>
                    <span className="cs2-step-body">
                      <span className="cs2-step-name">{s.name}</span>
                      {role && <span className="cs2-step-role">{role}</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* RIGHT — the Unifize product, evolving in lockstep */}
          <div className="cs2-product">
            <ChatShell progress={chatProgress} variant={chatVariant} />
          </div>
        </div>
      </div>
    </section>
  );
}
