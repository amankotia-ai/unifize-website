"use client";

/* ----------------------------------------------------------------------------
 * home-interactive.tsx - the homepage hero's product switcher.
 *
 * HeroMockSwitcher: one shell frame, four worlds. Round 1 of the panel test
 * showed a single quality-events mock polarizes by role; round 2 showed three
 * quality-side artifacts still read as "quality's tool" to ops and
 * engineering. The four views now cast one artifact per audience: quality
 * event, engineering change order, holds & release, controlled document.
 * Auto-advances gently until the visitor interacts (click stops it for good,
 * hovering pauses it); honors prefers-reduced-motion by not auto-advancing.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ShellFrame } from "../products/dms/dms-primitives";
import { MockDocumentWorkspace, MockEcoThread, MockOpsHolds, MockQualityConversation } from "./home-mocks";

const VIEWS = [
  { key: "quality", label: "Quality event", url: "app.unifize.com / quality-events / QE-2210", mock: <MockQualityConversation /> },
  { key: "eco", label: "Change order", url: "app.unifize.com / threads / ECO-1187", mock: <MockEcoThread /> },
  { key: "ops", label: "Holds & release", url: "app.unifize.com / operations / holds", mock: <MockOpsHolds /> },
  { key: "document", label: "Controlled document", url: "app.unifize.com / documents / SOP-118", mock: <MockDocumentWorkspace /> },
];

const ADVANCE_MS = 5000;

export function HeroMockSwitcher() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  /* auto-advance only when motion is welcome, and only until first interaction */
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setAutoplay(true);
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return;
    timer.current = window.setTimeout(() => setActive((i) => (i + 1) % VIEWS.length), ADVANCE_MS);
    return () => { if (timer.current !== null) window.clearTimeout(timer.current); };
  }, [autoplay, paused, active]);

  const pick = (i: number) => {
    setAutoplay(false);
    setActive(i);
  };

  const view = VIEWS[active];
  return (
    <div
      className="hm-heromock"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hm-heromock__tabs" role="tablist" aria-label="See the product">
        {VIEWS.map((v, i) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={"hm-heromock__tab" + (i === active ? " is-active" : "")}
            onClick={() => pick(i)}
          >
            {v.label}
            {autoplay && !paused && i === active ? <span className="hm-heromock__timer" aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
      <div key={view.key} className="hm-heromock__stage">
        <ShellFrame url={view.url}>{view.mock}</ShellFrame>
      </div>
    </div>
  );
}

const LAYER_STEPS = [
  {
    label: "Capture the event",
    title: "The work can start anywhere.",
    body: "An email, a quality record, or a change request opens one governed thread. Context comes with it—IDs, files, owners, and history.",
    outcome: "No re-keying. No lost context.",
  },
  {
    label: "Coordinate the work",
    title: "Every handoff has an owner.",
    body: "Decisions, actions, and due dates live beside the conversation. AI drafts the follow-up and nudges the right person; people remain accountable.",
    outcome: "The waiting becomes visible.",
  },
  {
    label: "Prove completion",
    title: "Evidence closes with the work.",
    body: "Approvals, signatures, and supporting files are checked in context. The thread cannot quietly close with a gap in the record.",
    outcome: "Complete at sign-off—not at audit prep.",
  },
  {
    label: "Write back",
    title: "Your systems stay authoritative.",
    body: "The approved outcome writes back to QMS, ERP, or PLM. Unifize keeps the cross-functional trail; your systems of record keep the final state.",
    outcome: "One outcome, reflected everywhere.",
  },
];

function StoryIcon({ type }: { type: "mail" | "record" | "change" }) {
  if (type === "mail") return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 5.2h15v10h-15zM3 6l7 5 7-5" /></svg>;
  if (type === "record") return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2.5h8l3 3v12H5zM13 2.5v4h3M8 10h5M8 13h5" /></svg>;
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5v4M10 13.5v4M2.5 10h4M13.5 10h4M5.3 5.3l2.8 2.8M11.9 11.9l2.8 2.8M14.7 5.3l-2.8 2.8" /></svg>;
}

function GovernedThreadVisual({ step }: { step: number }) {
  return (
    <div className={`hm-layerapp is-step-${step}`} aria-live="polite">
      <div className="hm-layerapp__topbar">
        <span className="hm-layerapp__brand"><i>U</i> Governed thread</span>
        <span className="hm-layerapp__ref">QE-2210</span>
        <span className="hm-layerapp__state">{step < 2 ? "IN PROGRESS" : step === 2 ? "READY TO CLOSE" : "COMPLETE"}</span>
      </div>

      <div className="hm-layerapp__canvas">
        <aside className="hm-layerapp__sources" aria-label="Connected sources">
          <span className="hm-layerapp__rail-label">Event source</span>
          <div className="hm-layerapp__source is-mail"><StoryIcon type="mail" /><span><b>Email</b><small>Supplier alert</small></span><em>New</em></div>
          <div className="hm-layerapp__source is-record"><StoryIcon type="record" /><span><b>QMS</b><small>NC-1092</small></span></div>
          <div className="hm-layerapp__source is-change"><StoryIcon type="change" /><span><b>PLM</b><small>Part 220-B</small></span></div>
          <div className="hm-layerapp__source-line"><i /><span>Context connected</span></div>
        </aside>

        <section className="hm-layerapp__thread" aria-label="Governed thread detail">
          <div className="hm-layerapp__threadhead">
            <span><small>QUALITY EVENT</small><b>Recurring torque non-conformance</b></span>
            <div className="hm-layerapp__people"><i>PM</i><i>LC</i><i>AD</i><span>+2</span></div>
          </div>

          <div className="hm-layerapp__timeline">
            <article className="hm-layerapp__event is-capture">
              <span className="hm-layerapp__eventicon">01</span>
              <div><small>EVENT CAPTURED · 09:14</small><b>Incoming inspection failed on lot 220-B</b><p>Supplier email, QMS record, and part history attached to this thread.</p>
                <div className="hm-layerapp__files"><span>inspection.pdf</span><span>NC-1092</span><span>Part 220-B</span></div>
              </div>
            </article>
            <article className="hm-layerapp__event is-coordinate">
              <span className="hm-layerapp__eventicon">02</span>
              <div><small>COORDINATION · 10:02</small><b>Containment and disposition assigned</b><p><strong>Priya Mehta</strong> owns quality approval. Supplier response is due tomorrow.</p>
                <div className="hm-layerapp__actions"><span><i>✓</i>Contain stock</span><span><i />Approve disposition</span></div>
              </div>
            </article>
            <article className="hm-layerapp__event is-prove">
              <span className="hm-layerapp__eventicon">03</span>
              <div><small>EVIDENCE &amp; APPROVAL · 14:36</small><b>Completion packet is ready</b><p>Required evidence is present and the final decision has two attributable approvals.</p>
                <div className="hm-layerapp__proof"><span><b>4/4</b>Evidence</span><span><b>2/2</b>Approvals</span><span><b>100%</b>Traceable</span></div>
              </div>
            </article>
            <article className="hm-layerapp__event is-writeback">
              <span className="hm-layerapp__eventicon">04</span>
              <div><small>WRITE-BACK · 14:38</small><b>Approved outcome synchronized</b><p>The QMS record is closed and PLM carries the approved disposition.</p>
                <div className="hm-layerapp__sync"><span><i>✓</i>QMS · Closed</span><span><i>✓</i>PLM · Updated</span></div>
              </div>
            </article>
          </div>
        </section>

        <aside className="hm-layerapp__insight" aria-label="Thread health">
          <span className="hm-layerapp__rail-label">Thread health</span>
          <div className="hm-layerapp__score" style={{ "--score": `${25 + step * 25}%` } as CSSProperties}><span><b>{25 + step * 25}%</b><small>complete</small></span></div>
          <dl>
            <div><dt>Owner</dt><dd>{step === 0 ? "Assigning…" : "Priya Mehta"}</dd></div>
            <div><dt>Waiting</dt><dd>{step < 2 ? "Supplier" : "None"}</dd></div>
            <div><dt>Evidence</dt><dd>{step < 2 ? `${step + 1} of 4` : "4 of 4"}</dd></div>
          </dl>
          <div className="hm-layerapp__ai"><span>AI</span><p>{step === 0 ? "Context summarized" : step === 1 ? "Follow-up drafted" : step === 2 ? "Closure checked" : "Record reconciled"}</p><i>Done</i></div>
        </aside>
      </div>
    </div>
  );
}

export function GovernedLayerStory() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const ratios = useRef<number[]>([]);
  const manualUntil = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = stepRefs.current.indexOf(entry.target as HTMLButtonElement);
        if (index >= 0) ratios.current[index] = entry.intersectionRatio;
      });
      const best = ratios.current.reduce(
        (winner, ratio, index, all) => ratio > (all[winner] ?? 0) ? index : winner,
        0,
      );
      if (Date.now() > manualUntil.current && (ratios.current[best] ?? 0) > 0.08) setActive(best);
    }, { rootMargin: "-12% 0px -12% 0px", threshold: [0.08, 0.25, 0.5, 0.75] });
    stepRefs.current.forEach((node) => { if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  const select = (index: number) => {
    manualUntil.current = Date.now() + 1000;
    setActive(index);
  };

  return (
    <div className="hm-layerstory">
      <div className="hm-layerstory__visual">
        <div className="hm-layerstory__progress" aria-label={`Step ${active + 1} of ${LAYER_STEPS.length}`}>
          {LAYER_STEPS.map((item, index) => (
            <button key={item.label} type="button" className={index === active ? "is-active" : ""} onClick={() => select(index)} aria-label={`Show step ${index + 1}: ${item.label}`}><span>{String(index + 1).padStart(2, "0")}</span></button>
          ))}
        </div>
        <div className="hm-layerstory__frame">
          <div className="hm-layerstory__framebar"><i /><i /><i /><span>app.unifize.com / threads / QE-2210</span></div>
          <GovernedThreadVisual step={active} />
        </div>
      </div>

      <div className="hm-layerstory__steps" aria-label="How Unifize works">
        {LAYER_STEPS.map((item, index) => (
          <button
            key={item.label}
            ref={(node) => { stepRefs.current[index] = node; }}
            type="button"
            className={`hm-layerstep${index === active ? " is-active" : ""}`}
            onClick={() => select(index)}
            aria-current={index === active ? "step" : undefined}
          >
            <span className="hm-layerstep__index">{String(index + 1).padStart(2, "0")}</span>
            <span className="hm-layerstep__copy">
              <span className="hm-layerstep__label">{item.label}</span>
              <strong>{item.title}</strong>
              <span className="hm-layerstep__body">{item.body}</span>
              <span className="hm-layerstep__outcome"><i>✓</i>{item.outcome}</span>
            </span>
          </button>
        ))}
        <Link href="/explorations/platform" className="dms-btn dms-btn-ghost hm-layerstory__cta">Explore the platform &rarr;</Link>
      </div>
    </div>
  );
}
