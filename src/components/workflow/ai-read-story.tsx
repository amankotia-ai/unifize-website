"use client";

/* ------------------------------------------------------------
 * AIReadStory — §04 "The AI read" (2026-06-02 call with Ben).
 *
 * Ben: "the whole AI piece … is so important … AI interprets this
 * discussion, uses the timestamps, uses the ownership changes, and now
 * comes back and says … this record is 80% value addition, 20% non value
 * addition." The feature isn't built yet — this is a PRODUCT VISUAL that
 * tells the story by REPLAYING the CAPA-2148 thread the viewer just watched
 * assemble in §03, and letting an "AI read" tag each event value-add / wait.
 *
 * Stays at ONE record (the org-level roll-up is the §05 zoom-out). Brings the
 * mechanism to life:
 *   · a reading-head SCAN sweeps down the product (left) on scroll;
 *   · the rail (right) is a stream SPINE whose dots snap green/red as each
 *     event is classified — the "data stream … series of events";
 *   · the active row reveals the SIGNALS the AI used (timestamp Δ, owner change);
 *   · the tally fills and LOCKS on the record's 80 / 20 verdict at settle.
 *
 * One tall section drives a 0..1 scroll progress (rAF-throttled); the sticky
 * stage is pinned and the SAME progress scrubs ChatShell, so the thread and
 * the read advance in lockstep. Below the desktop breakpoint the stage
 * un-pins, ChatShell auto-plays and every verdict shows. Reduced motion
 * resolves straight to the end.
 * ------------------------------------------------------------ */

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ChatShell } from "@/components/organisms";
import "./ai-read-story.css";

type Verdict = "va" | "nva";

interface Read {
  id: string;
  who: string; // actor, or the ownership handoff on a wait
  when: string; // T+0, T+5d, or a gap range
  verdict: Verdict;
  weight: number; // minutes — drives the honest tally
  headline: string; // what the AI saw
  signals: string[]; // the evidence the AI used — revealed on the active row
}

/* The AI read — mirrors the thread inside ChatShell, per variant
 * (Lisa T+0 → bound → Rupa T+5d → Priya/VP T+9d → sealed). The two
 * idle handoffs are the non-value-add wait; their signals are the timestamp
 * gap + ownership change. Weights are tuned so value-add totals 80% / wait 20%. */
const READ_SETS: Record<"capa" | "change-control", { recordId: string; reads: Read[] }> = {
  capa: {
    recordId: "CAPA-2148",
    reads: [
      { id: "open", who: "Lisa Martin", when: "T+0", verdict: "va", weight: 55, headline: "Signal opened · hold on 12 units", signals: ["decision logged"] },
      { id: "evidence", who: "Unifize", when: "T+0", verdict: "va", weight: 35, headline: "Evidence bound automatically", signals: ["auto-trace"] },
      { id: "wait1", who: "Lisa → Rupa", when: "T+0 → T+5d", verdict: "nva", weight: 30, headline: "5 days idle · awaiting review", signals: ["+5d idle", "owner changed"] },
      { id: "rca", who: "Rupa Kapoor", when: "T+5d", verdict: "va", weight: 50, headline: "Root cause traced to supplier", signals: ["cross-functional"] },
      { id: "wait2", who: "Rupa → Priya", when: "T+5d → T+9d", verdict: "nva", weight: 30, headline: "4 days idle · awaiting sign-off", signals: ["+4d idle", "owner changed"] },
      { id: "disposition", who: "Priya Ramesh · VP", when: "T+9d", verdict: "va", weight: 60, headline: "Disposition committed · scrap + SCAR", signals: ["approval"] },
      { id: "seal", who: "Unifize", when: "T+9d", verdict: "va", weight: 40, headline: "Record sealed · 21 CFR 820.30(i)", signals: ["auto-trace"] },
    ],
  },
  /* CC-2148 — the change-control record on /industries/<slug>/change-control
   * (2026-06-05: the page stays one change-control story end to end). */
  "change-control": {
    recordId: "CC-2148",
    reads: [
      { id: "open", who: "Lisa Martin", when: "T+0", verdict: "va", weight: 55, headline: "Change raised · SOP-118 hold time", signals: ["decision logged"] },
      { id: "evidence", who: "Unifize", when: "T+0", verdict: "va", weight: 35, headline: "Impact assessment bound automatically", signals: ["auto-trace"] },
      { id: "wait1", who: "Lisa → Rupa", when: "T+0 → T+5d", verdict: "nva", weight: 30, headline: "5 days idle · awaiting review", signals: ["+5d idle", "owner changed"] },
      { id: "review", who: "Rupa Kapoor", when: "T+5d", verdict: "va", weight: 50, headline: "Cross-functional review · redline agreed", signals: ["cross-functional"] },
      { id: "wait2", who: "Rupa → Priya", when: "T+5d → T+9d", verdict: "nva", weight: 30, headline: "4 days idle · awaiting approval", signals: ["+4d idle", "owner changed"] },
      { id: "approval", who: "Priya Ramesh · VP", when: "T+9d", verdict: "va", weight: 60, headline: "Approved · Part 11 e-signature, Rev D live", signals: ["approval"] },
      { id: "seal", who: "Unifize", when: "T+9d", verdict: "va", weight: 40, headline: "Record sealed · 21 CFR 820.40", signals: ["auto-trace"] },
    ],
  },
};

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export interface AIReadStoryProps {
  className?: string;
  /** Which record the read replays — must match the ChatShell variant. */
  variant?: "capa" | "change-control";
}

export function AIReadStory({ className, variant = "capa" }: AIReadStoryProps) {
  const { recordId, reads: READS } = READ_SETS[variant];
  const TOTAL = READS.reduce((a, r) => a + r.weight, 0); // 300
  const VA_PCT = Math.round(
    (READS.filter((r) => r.verdict === "va").reduce((a, r) => a + r.weight, 0) / TOTAL) * 100,
  ); // 80
  const NVA_PCT = 100 - VA_PCT; // 20
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

  // scroll → progress (rAF-throttled), pinned-stage style (mirrors cs2).
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

  const stacked = !isWide;
  // ~6% settle room at each end so the read doesn't start/finish abruptly.
  const eased = clamp01((progress - 0.06) / 0.88);
  const revealed = stacked ? READS.length : Math.round(eased * READS.length);
  const activeIdx = Math.min(READS.length - 1, Math.max(0, revealed - 1));
  const chatProgress = stacked ? undefined : eased;
  const settled = revealed >= READS.length;

  // Cumulative tally — the bar fills as a share of the FULL cycle (monotonic,
  // no jitter), landing on VA_PCT / NVA_PCT. The verdict NUMBER only locks in
  // once every event has been read (settle), so it never bounces mid-scroll.
  const tally = useMemo(() => {
    let va = 0;
    let nva = 0;
    for (let i = 0; i < revealed; i++) {
      if (READS[i].verdict === "va") va += READS[i].weight;
      else nva += READS[i].weight;
    }
    return { vaWidth: (va / TOTAL) * 100, nvaWidth: (nva / TOTAL) * 100 };
  }, [revealed, READS, TOTAL]);

  return (
    <section
      ref={sectionRef}
      className={cn("air", className)}
      data-progress={progress.toFixed(2)}
    >
      <div className="air-sticky">
        <div className="section-inner air-inner">
          {/* LEFT — the product, with the AI reading-head sweeping down it */}
          <div className="air-product">
            {!stacked && (
              <span className="air-scan" style={{ top: `${eased * 100}%` }} aria-hidden />
            )}
            <ChatShell progress={chatProgress} variant={variant} />
          </div>

          {/* RIGHT — the AI read: a stream of events, classified in sequence */}
          <aside className="air-rail">
            <div className="air-rail-head">
              <span className="section-eyebrow">04 · The AI read</span>
              <h2 className="air-title">The same thread, now read by AI.</h2>
              <p className="air-lede">
                Unifize AI reads the thread as a stream of events (every message,
                timestamp and ownership change) and tags each one value-add or wait.
              </p>
            </div>

            <ol className="air-reads">
              {READS.map((r, i) => {
                const isPend = i >= revealed;
                const isOn = !stacked && !isPend && i === activeIdx;
                return (
                  <li
                    key={r.id}
                    className={cn(
                      "air-read",
                      r.verdict === "va" ? "is-va" : "is-nva",
                      isOn && "is-on",
                      isPend && "is-pend",
                    )}
                  >
                    <span className="air-read-dot" aria-hidden />
                    <span className="air-read-body">
                      <span className="air-read-line">
                        <span className="air-read-head">{r.headline}</span>
                        <span className="air-read-tag">
                          {r.verdict === "va" ? "Value-add" : "Wait"}
                        </span>
                      </span>
                      <span className="air-read-detail">
                        <span className="air-read-meta">
                          {r.who} · {r.when}
                        </span>
                        <span className="air-read-chips">
                          {r.signals.map((s) => (
                            <span className="air-chip" key={s}>
                              {s}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* The VA/NVA through-line bar — fills monotonically, LOCKS on 80/20. */}
            <div className={cn("air-tally", settled && "is-settled")}>
              <div
                className="air-tally-track"
                role="img"
                aria-label={
                  settled
                    ? `This record: ${VA_PCT}% value-add, ${NVA_PCT}% non-value-add`
                    : "Classifying record"
                }
              >
                <span className="air-seg air-seg--va" style={{ width: `${tally.vaWidth}%` }} />
                <span className="air-seg air-seg--nva" style={{ width: `${tally.nvaWidth}%` }} />
              </div>
              {settled ? (
                <div className="air-tally-read is-verdict">
                  <span className="air-tally-rec">AI verdict · {recordId}</span>
                  <span className="air-tally-split">
                    <b className="air-va">{VA_PCT}%</b> value-add ·{" "}
                    <b className="air-nva">{NVA_PCT}%</b> non-value-add
                  </span>
                </div>
              ) : (
                <div className="air-tally-read">
                  <span className="air-tally-rec">{recordId}</span>
                  <span className="air-tally-status">
                    {revealed === 0
                      ? "reading thread…"
                      : `classifying ${revealed}/${READS.length}`}
                  </span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
