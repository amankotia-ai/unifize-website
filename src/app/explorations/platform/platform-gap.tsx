"use client";

/* ----------------------------------------------------------------------------
 * platform-gap.tsx - 02 · the gap, shown on ONE process.
 *
 * 9 Sep 2026 review (Lakshman): the old three-zone coexistence diagram
 * carried two messages at once and only worked with a presenter talking over
 * it. The message that matters here is one: your system of record is
 * detached from where the work happens. So: take one quality defect and run
 * it through the sequence, today and on Unifize, side by side. "That would
 * be a killer visual."
 *
 *   Today       six tools, one defect hopping between them. Realistic, not
 *               theatrical: every hop is a step from the Notion reference
 *               value stream VS-2 (non-conformance to CAPA closure): ERP
 *               re-keying (1.9-1.10), email notification (1.5), the context
 *               rebuild meeting and its minutes (3.1-3.10), the concession
 *               decision (4.2-4.4), the Excel tracker (8.6). The document
 *               revision hop is Lakshman's own example from the call.
 *   On Unifize  the product itself: NC-204 on the arcade engine's persistent
 *               camera (platform-gap-arcade.ts), one pose per moment, so the
 *               right pane pans and zooms to where each step actually
 *               happens on the record instead of listing it.
 *
 * 22 Sep 2026: the stepper moved ABOVE the panels as a segmented control.
 * Welded under the panels it read as a third row of content; standing on
 * its own, it reads as the thing that drives both panes. Auto-advances
 * while in view until the visitor takes over; respects
 * prefers-reduced-motion. "Your systems stay" is its own section
 * (platform-coexistence.tsx).
 * Later on 22 Sep (rails pass, Abhishek: "not very clear what the user is
 * expected to take away, too many decorative text elements"): the tab
 * indices, the node numbers and the narration kickers are gone; each pane
 * leads with its name and its verdict in one readable line, and the
 * narration under each pane is the sentence alone.
 * 25 Sep ("design these headers better"): the verdict is the pane's heading
 * and the name a square-marked eyebrow; the shared premise ("One defect,")
 * is set quiet so the two outcomes carry the contrast.
 * -------------------------------------------------------------------------- */
import { useEffect, useRef, useState } from "react";
import { TILE_ICONS } from "./platform-coexistence";
import { GAP_CONFIGS } from "./platform-gap-arcade";
import { ArcadeStepScene } from "../products/_shared/arcade/arcade";
import { RibbonField } from "../products/_shared/arcade/ribbon-field";
import { cn } from "@/lib/cn";

type GapStep = {
  name: string;
  /* the tool the defect lands in today, and where it sits on the map (%) */
  tool: { label: string; icon: keyof typeof TILE_ICONS; x: number; y: number };
  today: string;
  unifize: { actor: string; line: string };
};

const STEPS: GapStep[] = [
  {
    name: "Defect logged",
    tool: { label: "ERP", icon: "ERP", x: 14, y: 20 },
    today: "Logged against the work order in the ERP. Part and lot details are re-keyed into the quality form by hand.",
    unifize: { actor: "Line 2", line: "Raised from the line. Part, work order, and photos attach themselves from the ERP and the phone." },
  },
  {
    name: "Quality notified",
    tool: { label: "Email", icon: "Email", x: 84, y: 22 },
    today: "The supervisor emails quality. The thread forks on the first reply-all.",
    unifize: { actor: "Automator", line: "Quality, production, and engineering are on the record from the first minute, with the evidence." },
  },
  {
    name: "Root cause",
    tool: { label: "Meetings", icon: "Meetings", x: 18, y: 80 },
    today: "A meeting is scheduled to rebuild the context. Minutes go out by email and the replies trickle in.",
    unifize: { actor: "Unifize AI · beta", line: "Each Why is proposed from the last one and the evidence in the thread. The investigator picks the one that fits." },
  },
  {
    name: "Disposition",
    tool: { label: "Teams", icon: "Teams", x: 86, y: 78 },
    today: "Engineering agrees the concession in a Teams chat that nobody can find at audit.",
    unifize: { actor: "D. Fontaine", line: "The concession and the disposition are signed with Part 11 signatures, on the record." },
  },
  {
    name: "Procedure updated",
    tool: { label: "Documents", icon: "SharePoint", x: 50, y: 44 },
    today: "The work instruction is revised in the document system, with no link back to the defect that caused it.",
    unifize: { actor: "J. Rivera", line: "The revision is raised from this record as a change control and lands in the checklist as a linked record." },
  },
  {
    name: "Closure",
    tool: { label: "Excel tracker", icon: "Excel", x: 50, y: 90 },
    today: "The tracker is updated by hand. The why now lives in six places.",
    unifize: { actor: "J. Rivera", line: "Closed, with its owners, decisions, and evidence in one place. The record's history is the tracker." },
  },
];

const ADVANCE_MS = 5200;

/* the visible cut of the app window (the engine's 54 rail + 270 inbox are
 * clipped away, leaving the 826-wide record) and the margin kept around it */
const WINDOW_W = 826;
const WINDOW_H = 560;
const MARGIN = 22;
const ZOOM_MAX = 0.92;
/* phones: below this the window is illegible, so the container clips its
 * edges instead and the camera aims at the thread column (CSS) */
const ZOOM_MIN = 0.52;

export function PlatformGap() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const inView = useRef(false);
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    if (!auto) return;
    if (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      setActive(STEPS.length - 1); /* the finished picture, both sides complete */
      return;
    }
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => { inView.current = entry.isIntersecting; },
      { threshold: 0.4 },
    );
    observer.observe(host);
    const timer = window.setInterval(() => {
      if (inView.current && !document.hidden) setActive((activeRef.current + 1) % STEPS.length);
    }, ADVANCE_MS);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [auto]);

  /* the camera zoom follows the stage width, so the whole record window stays
   * in frame with margin at every pane size (the framing rule, measured
   * rather than guessed per breakpoint) */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fit = () => {
      const pad = parseFloat(getComputedStyle(stage).getPropertyValue("--rf-pad")) || 0;
      const room = stage.clientWidth - pad * 2 - MARGIN * 2;
      const zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, room / WINDOW_W));
      stage.style.setProperty("--pf-gap-zoom", zoom.toFixed(3));
      stage.style.setProperty("--pf-gap-window-h", `${Math.round(WINDOW_H * zoom + MARGIN * 2)}px`);
      stage.classList.toggle("is-clipped", room / WINDOW_W < ZOOM_MIN);
    };
    fit();
    /* the camera only eases between poses once the first fit has landed, so
     * the load does not animate from the stylesheet's fallback zoom */
    requestAnimationFrame(() => stage.classList.add("is-fit"));
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /* on narrow screens the control scrolls; keep the live step in view */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    const button = track.children[active] as HTMLElement | undefined;
    button?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const select = (index: number) => { setAuto(false); setActive(index); };
  const step = STEPS[active];
  const config = GAP_CONFIGS[Math.min(active, GAP_CONFIGS.length - 1)];

  return (
    <div className="pf-gap" ref={hostRef} data-reveal>
      {/* the control: one defect, six moments, both panes follow */}
      <div className="pf-gap__control">
        <div className="pf-gap__track" ref={trackRef} role="tablist" aria-label="One quality defect, step by step">
          {STEPS.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="pf-gap-panels"
              className={cn("pf-gap__step", i === active && "is-active", i < active && "is-done")}
              onClick={() => select(i)}
            >
              <span className="pf-gap__step-name">{s.name}</span>
              {auto && i === active ? (
                <i className="pf-gap__timer" style={{ animationDuration: `${ADVANCE_MS}ms` }} aria-hidden="true" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="pf-gap__panels" id="pf-gap-panels" role="tabpanel">
        {/* ------------------------------------------------------- today */}
        <section className="pf-gap__panel pf-gap__panel--today" aria-label="Today">
          <header className="pf-gap__head">
            <span className="pf-gap__lab">Today</span>
            <h3 className="pf-gap__sub"><span className="pf-gap__premise">One defect,</span> six tools, nothing linked.</h3>
          </header>
          <div className="pf-gap__map" aria-hidden="true">
            <svg className="pf-gap__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
              {STEPS.slice(1).map((s, i) => {
                const from = STEPS[i].tool;
                const state = i + 1 <= active ? "is-done" : "is-todo";
                return (
                  <line
                    key={s.name}
                    className={cn("pf-gap__wire", state, i + 1 === active && "is-live")}
                    x1={from.x} y1={from.y} x2={s.tool.x} y2={s.tool.y}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
            {STEPS.map((s, i) => (
              <span
                key={s.name}
                className={cn("pf-gap__node", i < active && "is-done", i === active && "is-active")}
                style={{ left: `${s.tool.x}%`, top: `${s.tool.y}%` }}
              >
                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d={TILE_ICONS[s.tool.icon]} /></svg>
                {s.tool.label}
              </span>
            ))}
          </div>
          <p className="pf-gap__say" aria-live="polite">{step.today}</p>
        </section>

        {/* -------------------------------------------------- on unifize */}
        <section className="pf-gap__panel pf-gap__panel--after" aria-label="On Unifize">
          <header className="pf-gap__head">
            <span className="pf-gap__lab">On Unifize</span>
            <h3 className="pf-gap__sub"><span className="pf-gap__premise">One defect,</span> one record, everything attached.</h3>
          </header>
          {/* ONE scene, config swapped in place: the camera pans between poses */}
          <div className="pf-gap__stage rf rf--twin" ref={stageRef}>
            <RibbonField composition="twin" />
            <ArcadeStepScene config={config} />
          </div>
          <p className="pf-gap__say pf-gap__say--after" aria-live="polite">{step.unifize.line}</p>
        </section>
      </div>
    </div>
  );
}
