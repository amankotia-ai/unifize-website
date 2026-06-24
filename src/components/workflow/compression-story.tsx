"use client";

/* ------------------------------------------------------------
 * CompressionStory — the four-beat story underneath the canvas.
 *
 * Beat 1 lives on the WorkflowCanvas above this component. This
 * component carries Beats 2, 3 and 4 as a sticky-scroll section:
 * a single Journey Step Card pinned on the right transforms
 * through three states as the reader scrolls past three text
 * stanzas on the left.
 *
 *   Beat 2 — Reality       active / wait split visualised
 *                          12 tool artefacts orbiting the card
 *   Beat 3 — Cost          dollars appear; the swarm gets priced
 *                          per-cycle, annual, commercial-scale
 *   Beat 4 — Reduction     wait collapses; artefacts absorb into
 *                          an accountable thread inside the card
 *
 * Mechanic: IntersectionObserver flips beat as each stanza
 * intersects the viewport middle band; CSS transitions handle the
 * card transformation. prefers-reduced-motion snaps instead.
 * ------------------------------------------------------------ */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ValueStreamStep, Workflow } from "@/lib/platform-data/workflows";

export interface CompressionStoryProps {
  /** Journey to anchor the story on. Use Change Control for v1. */
  workflow: Workflow;
  /** Step id to spotlight as the protagonist card. Default "s3" (cross-functional review on CC). */
  stepId?: string;
  /** Loaded blended labour rate used for cost calculations ($/hr). */
  ratePerHour?: number;
  /** Instances per year used for the annual cost extrapolation. */
  instancesPerYear?: number;
  /** Annual cost today across all DMS + adjacent QMS coordination. */
  annualTodayUsd?: number;
  /** Annual cost at full commercial scale (24–36 months post-FDA). */
  annualScaleUsd?: number;
  className?: string;
}

type Beat = 2 | 3 | 4;

const fmt = (n: number) => n.toLocaleString();
const fmtUsd = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;

/** The 12 tool artefacts that orbit then absorb. Six tools, twice each. */
const ARTEFACTS: { tool: string; label: string }[] = [
  { tool: "outlook", label: "Outlook thread" },
  { tool: "teams", label: "Teams chat" },
  { tool: "zoom", label: "Zoom huddle" },
  { tool: "slack", label: "Slack DM" },
  { tool: "sharepoint", label: "SharePoint doc" },
  { tool: "excel", label: "Excel tracker" },
  { tool: "outlook", label: "Reply-all chain" },
  { tool: "teams", label: "Teams huddle" },
  { tool: "zoom", label: "Status call" },
  { tool: "slack", label: "Channel thread" },
  { tool: "sharepoint", label: "Shared folder" },
  { tool: "excel", label: "Hand-off log" },
];

/** Stylised glyphs — recognisable shapes, not literal brand logos. */
function ToolIcon({ tool }: { tool: string }) {
  switch (tool) {
    case "outlook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 6.5 12 13l10-6.5" />
        </svg>
      );
    case "teams":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M4 4h12v10a2 2 0 0 1-2 2H8l-4 4V4z" />
          <circle cx="18" cy="9" r="3" />
        </svg>
      );
    case "zoom":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect x="2" y="7" width="14" height="10" rx="2" />
          <path d="M16 11l6-3v8l-6-3z" />
        </svg>
      );
    case "slack":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M9 4h2v9H9zM13 11h2v9h-2z" />
          <path d="M4 9h9v2H4zM11 13h9v2h-9z" />
        </svg>
      );
    case "sharepoint":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M15 3v4h4" />
          <path d="M9 11h7M9 14h7M9 17h5" strokeWidth="1.2" />
        </svg>
      );
    case "excel":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M3 9h18M3 14h18M9 4v16M15 4v16" strokeWidth="1.2" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * 12 positions arranged in a ring around the card. Values are
 * percentages of the card-wrap (NOT of the pill's own size), so they
 * scale with the container. Pills are then centered on their anchor
 * via translate(-50%,-50%) — see .cs-artefact CSS.
 *
 *      0    1    2
 *  11           3
 *  10  [CARD]   4
 *   9           5
 *      8    7    6
 */
const ARTEFACT_POSITIONS: { top: number; left: number; rot: number }[] = [
  { top: 6,  left: 18, rot: -8 },
  { top: 2,  left: 50, rot: 3 },
  { top: 6,  left: 82, rot: 7 },
  { top: 26, left: 96, rot: -4 },
  { top: 50, left: 99, rot: 4 },
  { top: 74, left: 96, rot: -6 },
  { top: 94, left: 82, rot: 8 },
  { top: 98, left: 50, rot: -3 },
  { top: 94, left: 18, rot: 6 },
  { top: 74, left: 4,  rot: -8 },
  { top: 50, left: 1,  rot: 5 },
  { top: 26, left: 4,  rot: -6 },
];

interface StepTotals {
  active: number;
  wait: number;
  total: number;
  uniActive: number;
  uniWait: number;
  uniTotal: number;
  aiTotal: number;
}

function computeTotals(valueStream: ValueStreamStep[] | undefined): StepTotals {
  const vs = valueStream ?? [];
  const active = vs.filter(v => v.classification !== "WAIT").reduce((a, b) => a + b.currentMin, 0);
  const wait = vs.filter(v => v.classification === "WAIT").reduce((a, b) => a + b.currentMin, 0);
  const uniActive = vs.filter(v => v.classification !== "WAIT").reduce((a, b) => a + b.unifizeMin, 0);
  const uniWait = vs.filter(v => v.classification === "WAIT").reduce((a, b) => a + b.unifizeMin, 0);
  const aiTotal = vs.reduce((a, b) => a + (b.aiMin ?? b.unifizeMin), 0);
  return {
    active, wait, total: active + wait,
    uniActive, uniWait, uniTotal: uniActive + uniWait,
    aiTotal,
  };
}

function workflowTotalCost(workflow: Workflow, ratePerHour: number) {
  let cur = 0; let uni = 0;
  for (const n of workflow.nodes) {
    if (n.kind !== "step" || !n.valueStream) continue;
    for (const v of n.valueStream) {
      cur += v.currentMin;
      uni += v.unifizeMin;
    }
  }
  return {
    currentMin: cur,
    unifizeMin: uni,
    currentUsd: Math.round((cur / 60) * ratePerHour),
    unifizeUsd: Math.round((uni / 60) * ratePerHour),
  };
}

export function CompressionStory({
  workflow,
  stepId = "s3",
  ratePerHour = 60,
  instancesPerYear = 100,
  annualTodayUsd = 2_000_000,
  annualScaleUsd = 6_400_000,
  className,
}: CompressionStoryProps) {
  const step = workflow.nodes.find(n => n.kind === "step" && n.id === stepId);
  if (!step || step.kind !== "step") return null;
  const t = computeTotals(step.valueStream);

  // Whole-cycle baseline: $2,400 / 123.5 hr / 68% wait — derived, not hard-coded.
  const cycle = workflowTotalCost(workflow, ratePerHour);

  // Per-step costs:
  const stepCurrentUsd = Math.round((t.total / 60) * ratePerHour);
  const stepUnifizeUsd = Math.round((t.uniTotal / 60) * ratePerHour);

  const annualCycleUsd = cycle.currentUsd * instancesPerYear;

  // ---- Beat detection ----
  // rAF-driven; tracks which stanza is closest to the viewport's vertical
  // centre, updates state only when the active stanza changes. Smoother
  // than IntersectionObserver for centred-content scenarios because there
  // is no detection dead-zone — every scroll frame picks a winner.
  const [beat, setBeat] = useState<Beat>(2);
  const stanzaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const beatRef = useRef<Beat>(2);

  useEffect(() => {
    let raf = 0;
    let lastTick = 0;
    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      // Bail when the section is fully off-screen — saves work on long pages.
      const sb = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (sb.bottom < 0 || sb.top > vh) return;

      const centre = vh / 2;
      let bestBeat: Beat = beatRef.current;
      let bestDist = Infinity;
      for (let i = 0; i < 3; i++) {
        const el = stanzaRefs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const mid = (r.top + r.bottom) / 2;
        const d = Math.abs(mid - centre);
        if (d < bestDist) {
          bestDist = d;
          bestBeat = (i + 2) as Beat;
        }
      }
      if (bestBeat !== beatRef.current) {
        beatRef.current = bestBeat;
        setBeat(bestBeat);
      }
    };
    const onScroll = () => {
      // Throttle to one rAF; on a 60Hz display this caps at 60 ticks/sec.
      // Add a 16ms floor so back-to-back scroll events don't queue multiple frames.
      const now = performance.now();
      if (raf || now - lastTick < 12) return;
      lastTick = now;
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
  }, []);

  // ---- Render ----
  const stepIndex = step.index ?? 0;
  const stepIdx = `S${String(stepIndex).padStart(2, "0")}`;
  const waitPctOfStep = t.total > 0 ? Math.round((t.wait / t.total) * 100) : 0;
  const compressionPct = stepCurrentUsd
    ? Math.round((1 - stepUnifizeUsd / stepCurrentUsd) * 100)
    : 0;

  // Bar widths — wait dominates in Beats 2/3, collapses in Beat 4.
  const activeMax = Math.max(t.active, t.uniActive, 1);
  const waitMax = Math.max(t.wait, 1);
  const totalForBar = activeMax + waitMax; // visual scale, not literal minutes
  const activeRatio = activeMax / totalForBar; // 0..1
  // In Beat 4 the bar uses uniWait instead of wait
  const beat4WaitRatio = Math.max(0.02, t.uniWait / totalForBar);

  return (
    <section
      ref={sectionRef}
      className={cn("cs", `cs-beat-${beat}`, className)}
      data-beat={beat}
    >
      <div className="cs-inner">
        <div className="cs-stack">
          {/* ---- Stanza for Beat 2 ---- */}
          <div
            className="cs-stanza"
            data-beat="2"
            ref={(el) => { stanzaRefs.current[0] = el; }}
          >
            <span className="cs-eyebrow"><span className="num">02</span>Reality</span>
            <h2 className="cs-title">Between these steps is where the work actually lives.</h2>
            <p className="cs-prose">
              Each Journey Step looks like one thing on the diagram. In reality, it&apos;s a swarm — meetings that don&apos;t make it into the QMS, calls between Quality and Engineering, emails chasing the supplier&apos;s last batch record, calendars trying to find a slot for cross-functional review. That&apos;s where the cycle time hides.
            </p>
            <div className="cs-stat">
              <span className="cs-stat-n">{(t.active / 60).toFixed(2)}<small> hr</small></span>
              <span className="cs-stat-sep">+</span>
              <span className="cs-stat-n cs-stat-wait">{(t.wait / 60).toFixed(0)}<small> hr wait</small></span>
              <span className="cs-stat-l">{waitPctOfStep}% of this step is coordination, not work.</span>
            </div>
          </div>

          {/* ---- Stanza for Beat 3 ---- */}
          <div
            className="cs-stanza"
            data-beat="3"
            ref={(el) => { stanzaRefs.current[1] = el; }}
          >
            <span className="cs-eyebrow"><span className="num">03</span>Cost</span>
            <h2 className="cs-title">And here is what it has been costing you.</h2>
            <p className="cs-prose">
              The swarm has a price. At ${ratePerHour}/hr loaded blended labour, this <em>single</em> cross-functional review costs <b>{fmtUsd(stepCurrentUsd)}</b> to coordinate — almost entirely in the wait time around it. Multiply across the 8 steps of one change control: <b>{fmtUsd(cycle.currentUsd)}</b> per cycle. Across <b>{instancesPerYear}</b> cycles a year, that&apos;s <b>{fmtUsd(annualCycleUsd)}</b> of work between the steps in this one workflow. Across the whole QMS, today&apos;s coordination cost is ~<b>{fmtUsd(annualTodayUsd)}</b> a year — tripling to <b>{fmtUsd(annualScaleUsd)}</b> at full commercial scale.
            </p>
            <p className="cs-pull">
              When the auditor arrives, every one of those scattered conversations has to be reconstructed. Three days of pulling threads to prove what was already decided.
            </p>
            <div className="cs-stat">
              <span className="cs-stat-n">{fmtUsd(cycle.currentUsd)}<small> / cycle</small></span>
              <span className="cs-stat-sep">→</span>
              <span className="cs-stat-n">{fmtUsd(annualCycleUsd)}<small> / yr · this workflow</small></span>
              <span className="cs-stat-sep">→</span>
              <span className="cs-stat-n cs-stat-wait">{fmtUsd(annualScaleUsd)}<small> / yr · whole QMS at scale</small></span>
            </div>
          </div>

          {/* ---- Stanza for Beat 4 ---- */}
          <div
            className="cs-stanza"
            data-beat="4"
            ref={(el) => { stanzaRefs.current[2] = el; }}
          >
            <span className="cs-eyebrow"><span className="num">04</span>Reduction</span>
            <h2 className="cs-title">The journey doesn&apos;t change. What&apos;s around it does.</h2>
            <p className="cs-prose">
              Same eight steps. Same persona. Same record. What changes is that every conversation, every approval and every piece of evidence is bound to where the decision happens — so the swarm is the thread, and the thread is the record.
            </p>
            <ul className="cs-mechs">
              <li>
                <span className="cs-mechs-check" aria-hidden />
                <span><b>Wait collapses.</b> Evidence binds at the decision.</span>
              </li>
              <li>
                <span className="cs-mechs-check" aria-hidden />
                <span><b>Reconciliation collapses.</b> One operational source of truth.</span>
              </li>
              <li>
                <span className="cs-mechs-check" aria-hidden />
                <span><b>AI compresses inside.</b> Drafts, synthesises, schedules — never outside the accountable thread.</span>
              </li>
            </ul>
            <div className="cs-stat">
              <span className="cs-stat-n cs-stat-old">{fmtUsd(cycle.currentUsd)}</span>
              <span className="cs-stat-sep">→</span>
              <span className="cs-stat-n cs-stat-good">{fmtUsd(cycle.unifizeUsd)}<small> / cycle · −{Math.round((1 - cycle.unifizeUsd / cycle.currentUsd) * 100)}%</small></span>
            </div>
            <div className="cs-stat cs-stat-row2">
              <span className="cs-stat-l">Per year saved: <b>{fmtUsd(annualTodayUsd * 0.52)}</b> on today&apos;s {fmtUsd(annualTodayUsd)} base · <b>{fmtUsd(annualScaleUsd * 0.48)}</b> on the {fmtUsd(annualScaleUsd)} base at commercial scale.</span>
            </div>
          </div>
        </div>

        {/* ---- Sticky stage: the card that transforms ---- */}
        <div className="cs-stage">
          <div className="cs-stage-inner">
            <div className="cs-card-wrap">
              {/* Floating artefacts — orbit on Beat 2/3, absorb on Beat 4 */}
              <div className="cs-artefacts" aria-hidden>
                {ARTEFACTS.map((a, i) => {
                  const p = ARTEFACT_POSITIONS[i];
                  return (
                    <span
                      className={cn("cs-artefact", `cs-artefact--${a.tool}`)}
                      key={i}
                      style={{
                        "--ax": `${p.left}%`,
                        "--ay": `${p.top}%`,
                        "--ar": `${p.rot}deg`,
                        "--ai": i,
                      } as React.CSSProperties}
                    >
                      <span className="cs-artefact-icon"><ToolIcon tool={a.tool} /></span>
                      <span className="cs-artefact-label">{a.label}</span>
                      <span className="cs-artefact-cost">{fmtUsd(Math.round(((t.total / 12) / 60) * ratePerHour))}</span>
                    </span>
                  );
                })}
              </div>

              {/* The card itself — reuses .wf-step chrome */}
              <article className="cs-card wf-step">
                <span className="wf-step-rail" />
                <div className="wf-step-head">
                  <span className="wf-idx">{stepIdx}</span>
                  <div className="wf-step-name">{step.name}</div>
                  <span className="wf-gz" title="Goal Zero pending" />
                </div>
                <p className="wf-what">{step.whatHappens}</p>

                <div className="wf-step-meta">
                  <span className="wf-role">{step.role}</span>
                  <span className="wf-surf">
                    {step.mediums.map((m) => (
                      <span className={`wf-surf-dot wf-surf-dot--${m}`} key={m} />
                    ))}
                  </span>
                  <span className="wf-ct">
                    {(step.ct ?? []).map((c) => <b key={c}>{c}</b>)}
                  </span>
                </div>

                {/* Cycle-time bar — same in B2/B3, collapses in B4 */}
                <div className="cs-card-bar">
                  <div className="cs-bar-track">
                    <span
                      className="cs-bar-active"
                      style={{ width: `${activeRatio * 100}%` }}
                    />
                    <span
                      className={cn("cs-bar-wait", beat === 4 && "cs-bar-wait--compressed")}
                      style={{ width: beat === 4 ? `${beat4WaitRatio * 100}%` : `${(1 - activeRatio) * 100}%` }}
                    />
                  </div>
                  <div className="cs-bar-meta">
                    <span className="cs-bar-meta-active">{fmt(beat === 4 ? t.uniActive : t.active)} min active</span>
                    <span className={cn("cs-bar-meta-wait", beat === 4 && "cs-bar-meta-wait--collapsed")}>
                      {fmt(beat === 4 ? t.uniWait : t.wait)} min wait
                    </span>
                  </div>
                </div>

                {/* Cost stamp — fades in on Beat 3 (step cost), reveals
                    the compression on Beat 4. Step-scoped, clearly labelled. */}
                <div className="cs-cost">
                  <span className="cs-cost-label">step cost</span>
                  <span className="cs-cost-current">{fmtUsd(stepCurrentUsd)}</span>
                  <span className="cs-cost-arrow" aria-hidden>→</span>
                  <span className="cs-cost-new">{fmtUsd(stepUnifizeUsd)}</span>
                  <span className="cs-cost-pct">−{compressionPct}%</span>
                </div>

                {/* Governed thread — appears on Beat 4 inside the card */}
                <div className="cs-thread" aria-hidden>
                  <div className="cs-thread-head">
                    <span className="cs-thread-head-dot" />
                    <span>One accountable thread</span>
                    <span className="cs-thread-head-id">{workflow.id} · {stepIdx}</span>
                  </div>

                  <ol className="cs-thread-trail">
                    <li className="cs-thread-pt">
                      <span className="cs-thread-marker" data-kind="start" />
                      <div className="cs-thread-content">
                        <header>
                          <span className="cs-thread-time">09:14</span>
                          <span className="cs-thread-who">Owner</span>
                          <span className="cs-thread-action">raises change</span>
                        </header>
                        <p>Rationale and scope captured in-thread. Linked to <span className="cs-thread-link">NC-2741</span>.</p>
                      </div>
                    </li>
                    <li className="cs-thread-pt">
                      <span className="cs-thread-marker" />
                      <div className="cs-thread-content">
                        <header>
                          <span className="cs-thread-time">09:21</span>
                          <span className="cs-thread-who">Owner</span>
                          <span className="cs-thread-action">routes for review</span>
                        </header>
                        <p>Approvers assigned per the Approval Matrix — Engineering and Manufacturing. Async, scoped to this step.</p>
                      </div>
                    </li>
                    <li className="cs-thread-pt">
                      <span className="cs-thread-marker" data-kind="sign" />
                      <div className="cs-thread-content">
                        <header>
                          <span className="cs-thread-time">10:02</span>
                          <span className="cs-thread-who">Approver · Engineering</span>
                          <span className="cs-thread-action">signs off</span>
                        </header>
                        <p>Hold-test data attached <span className="cs-thread-link">·  hold-test.pdf</span></p>
                        <span className="cs-thread-tag">21 CFR Part 11 signature</span>
                      </div>
                    </li>
                    <li className="cs-thread-pt">
                      <span className="cs-thread-marker" data-kind="sign" />
                      <div className="cs-thread-content">
                        <header>
                          <span className="cs-thread-time">10:11</span>
                          <span className="cs-thread-who">Approver · Manufacturing</span>
                          <span className="cs-thread-action">signs off</span>
                        </header>
                        <p>Linked to <span className="cs-thread-link">DHR-2026-Q2</span>. No outstanding actions.</p>
                        <span className="cs-thread-tag">21 CFR Part 11 signature</span>
                      </div>
                    </li>
                    <li className="cs-thread-pt">
                      <span className="cs-thread-marker" data-kind="close" />
                      <div className="cs-thread-content">
                        <header>
                          <span className="cs-thread-time">10:17</span>
                          <span className="cs-thread-who">Owner</span>
                          <span className="cs-thread-action">closes</span>
                        </header>
                        <p>Revision live. Retraining queued for affected role groups.</p>
                        <span className="cs-thread-tag cs-thread-tag--ok">closed · provable</span>
                      </div>
                    </li>
                  </ol>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
