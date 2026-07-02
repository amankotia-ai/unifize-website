"use client";

/* ----------------------------------------------------------------------------
 * dms-interactive.tsx - the interactive layer of the DMS product page.
 *   DmsPlaceholder     - labeled frame where a real product visual will land.
 *   DriftToggle        - "Without DMS / With DMS" typographic comparison.
 *   ModuleExplorer     - numbered editorial tab list with a visual panel.
 *   LifecycleExplorer  - node-rail lifecycle diagram with a detail panel.
 *   FaqAccordion       - one-open-at-a-time FAQ.
 * Design: editorial, hairline-based, no card boxes - big Geist type, mono
 * indices, dashed rules. All state is local and degrades to a sensible
 * default without JS (first tab, Effective state, first FAQ open).
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { ChatShell } from "@/components/organisms";
import { MODULES, LIFECYCLE, FAQS } from "./dms-data";

/* ============================================================ placeholder */

export function DmsPlaceholder({ label, hint, tall = false }: { label: string; hint?: string; tall?: boolean }) {
  return (
    <div className={"dms-ph" + (tall ? " dms-ph--tall" : "")} role="img" aria-label={label}>
      <span className="dms-ph__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </span>
      <span className="dms-ph__label">{label}</span>
      {hint && <span className="dms-ph__hint">{hint}</span>}
    </div>
  );
}

/* ============================================================ shared bits */

const Check = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" /></svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

/* ============================================================ drift toggle */

const DRIFT_BEFORE = [
  { loc: "Controlled system", ver: "v3.2", note: "Approved, current", cls: "" },
  { loc: "Working file share", ver: "v3.1", note: "A local edit", cls: " is-stale" },
  { loc: "Laminated at the station", ver: "v2.8", note: "Last reprint", cls: " is-old" },
];
const DRIFT_AFTER = [
  { loc: "Controlled system", ver: "v3.2", note: "Effective, watermarked", cls: " is-live" },
  { loc: "Working file share", ver: "v3.1", note: "Copy retrieved", cls: " is-retired" },
  { loc: "Laminated at the station", ver: "v2.8", note: "Copy retrieved", cls: " is-retired" },
];

export function DriftToggle() {
  const [after, setAfter] = useState(false);
  const cols = after ? DRIFT_AFTER : DRIFT_BEFORE;

  return (
    <div className="dms-driftx">
      <div className="dms-seg" role="tablist" aria-label="Before and after DMS">
        <button type="button" role="tab" aria-selected={!after} className={"dms-seg__btn" + (!after ? " is-active" : "")} onClick={() => setAfter(false)}>
          Without DMS
        </button>
        <button type="button" role="tab" aria-selected={after} className={"dms-seg__btn" + (after ? " is-active" : "")} onClick={() => setAfter(true)}>
          With DMS
        </button>
      </div>

      <div
        className="dms-driftx__cols"
        key={after ? "after" : "before"}
        role="img"
        aria-label={after
          ? "With DMS: one effective revision 3.2, stray copies retrieved."
          : "Version drift: controlled system 3.2, file share 3.1, shop floor 2.8."}
      >
        {cols.map((c) => (
          <div className={"dms-driftx__col" + c.cls} key={c.loc}>
            <span className="dms-driftx__loc">{c.loc}</span>
            <span className="dms-driftx__ver dms-data">{c.ver}</span>
            <span className="dms-driftx__note">{c.note}</span>
          </div>
        ))}
      </div>

      <p className="dms-driftx__verdict" key={after ? "va" : "vb"}>
        {after ? (
          <><span className="dms-driftx__vic is-ok" aria-hidden="true"><Check /></span><b>One effective revision</b>, everywhere you look. Stray copies retrieved.</>
        ) : (
          <><span className="dms-driftx__vic is-warn" aria-hidden="true">!</span><b>Three answers</b> to &ldquo;is this the latest?&rdquo; The finding writes itself.</>
        )}
      </p>
    </div>
  );
}

/* ============================================================ module tabs */

export function ModuleExplorer() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];

  return (
    <div className="dms-modx">
      <div className="dms-modx__list" role="tablist" aria-label="Bundled modules" aria-orientation="vertical">
        {MODULES.map((mod, i) => (
          <div className={"dms-modx__item" + (i === active ? " is-active" : "")} key={mod.key}>
            <h3 className="dms-modx__h">
              <button
                type="button"
                role="tab"
                id={`dms-modtab-${mod.key}`}
                aria-selected={i === active}
                aria-controls={`dms-modbody-${mod.key}`}
                className="dms-modx__trigger"
                onClick={() => setActive(i)}
              >
                <span className="dms-modx__idx">{pad(i + 1)}</span>
                <span className="dms-modx__name">{mod.name}</span>
                <svg className="dms-modx__arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 10a1 1 0 0 1 1-1h11.6l-3.9-3.9a1 1 0 1 1 1.4-1.4l5.6 5.6a1 1 0 0 1 0 1.4l-5.6 5.6a1 1 0 0 1-1.4-1.4l3.9-3.9H3a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                </svg>
              </button>
            </h3>
            <div className="dms-modx__body" id={`dms-modbody-${mod.key}`} role="tabpanel" aria-labelledby={`dms-modtab-${mod.key}`} aria-hidden={i !== active}>
              <div className="dms-modx__body-inner">
                <span className="dms-modx__promise">{mod.promise}</span>
                <p className="dms-modx__desc">{mod.blurb}</p>
                <ul className="dms-modx__points">
                  {mod.points.map((p) => (
                    <li key={p}><span className="dms-modx__pt-ic" aria-hidden="true"><Check /></span>{p}</li>
                  ))}
                </ul>
                <p className="dms-modx__stds" aria-label="Standards">{mod.standards.join("  ·  ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dms-modx__panel" key={"v-" + m.key} aria-hidden="true">
        <div className="dms-appframe dms-appframe--panel">
          <div className="dms-appframe__bar">
            <span className="dms-dot" /><span className="dms-dot" /><span className="dms-dot" />
            <span className="dms-appframe__url">app.unifize.com / {m.key.replace(/-/g, " ")}</span>
          </div>
          <DmsPlaceholder label={`Product visual · ${m.visual}`} hint="Screenshot placeholder · 16:10" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================ lifecycle
 * The industry-template-modern "difference" pattern, scroll-driven: the trail
 * and the live chat shell sit inside a sticky viewport while a tall scroll
 * region drives the progression. Scrolling advances the lifecycle state and
 * scrubs the CC-2148 thread to the moment that state is decided. Clicking a
 * step smooth-scrolls to its segment. */

/* Scrub points into the ChatShell timeline (0..1) per lifecycle state:
 * Draft → change raised; In Review → cross-functional review; In Approval →
 * Part 11 signature; Effective → record card lands; Superseded → "Rev D live,
 * Rev C retired" row ticks; Obsolete → audit trail sealed. */
const LIFE_PROGRESS = [0.17, 0.49, 0.72, 0.94, 0.97, 1];
const N_STATES = LIFE_PROGRESS.length;
const SCROLL_MQ = "(min-width: 941px)";

/* piecewise-linear map: scroll fraction (0..1) → shell timeline progress,
 * anchoring each state's chat moment to the middle of its scroll segment */
function shellProgressAt(s: number): number {
  const pts: [number, number][] = [
    [0, 0],
    ...LIFE_PROGRESS.map((p, i) => [(i + 0.5) / N_STATES, p] as [number, number]),
    [1, 1],
  ];
  for (let i = 1; i < pts.length; i++) {
    if (s <= pts[i][0]) {
      const [s0, p0] = pts[i - 1];
      const [s1, p1] = pts[i];
      return p0 + (p1 - p0) * ((s - s0) / (s1 - s0));
    }
  }
  return 1;
}

export function LifecycleExplorer() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!window.matchMedia(SCROLL_MQ).matches) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const s = Math.min(1, Math.max(0, -rect.top / total));
      setActive(Math.min(N_STATES - 1, Math.floor(s * N_STATES)));
      setProgress(shellProgressAt(s));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onStep = (i: number) => {
    const el = wrapRef.current;
    if (el && window.matchMedia(SCROLL_MQ).matches) {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      window.scrollTo({
        top: window.scrollY + rect.top + ((i + 0.5) / N_STATES) * total,
        behavior: "smooth",
      });
    } else {
      setActive(i);
      setProgress(LIFE_PROGRESS[i]);
    }
  };

  return (
    <div className="dms-lifex-scroll" ref={wrapRef}>
      <div className="dms-lifex-sticky">
        <div className="dms-lifex">
          <aside className="dms-lifex__trail">
            <span className="dms-lifex__lab">How a revision moves</span>
            <ol className="dms-lifex__steps" role="tablist" aria-label="Controlled document lifecycle" aria-orientation="vertical">
              {LIFECYCLE.map((st, i) => (
                <li
                  className={
                    "dms-lifex__step" +
                    (i === active ? " is-active" : "") +
                    (i < active ? " is-past" : "")
                  }
                  key={st.state}
                >
                  <button
                    type="button"
                    role="tab"
                    id={`dms-lifetab-${i}`}
                    aria-selected={i === active}
                    aria-controls={`dms-lifedetail-${i}`}
                    className="dms-lifex__btn"
                    onClick={() => onStep(i)}
                  >
                    <span className="dms-lifex__node" aria-hidden="true" />
                    <span className="dms-lifex__t">{st.state}</span>
                    <span className="dms-lifex__meta">{st.gate}</span>
                  </button>
                  <div className="dms-lifex__detail" id={`dms-lifedetail-${i}`} role="tabpanel" aria-labelledby={`dms-lifetab-${i}`} aria-hidden={i !== active}>
                    <div className="dms-lifex__detail-inner"><p>{st.detail}</p></div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="dms-lifex__foot">
              SOP-118 Rev C to Rev D, sealed as a 21 CFR Part 11 audit trail. The thread is the record.
            </p>
          </aside>

          <div className="dms-lifex__live" aria-label="Change-control thread CC-2148, scrubbed by scroll">
            <ChatShell variant="change-control" progress={progress} />
          </div>

          <div className="dms-lifex__mobile" aria-hidden="true">
            <span className="dms-lifex__mobile-lab">Change-control thread</span>
            <span className="dms-lifex__mobile-id">CC-2148 · raise → review → Part 11 approval → effective → seal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ FAQ */

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="dms-faq">
      {FAQS.map((f, i) => (
        <div className={"dms-faq__item" + (open === i ? " is-open" : "")} key={f.q}>
          <h3 className="dms-faq__h">
            <button
              type="button"
              className="dms-faq__q"
              aria-expanded={open === i}
              aria-controls={`dms-faq-a-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <svg className="dms-faq__ic" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" clipRule="evenodd" />
              </svg>
            </button>
          </h3>
          <div className="dms-faq__a" id={`dms-faq-a-${i}`} role="region" aria-hidden={open !== i}>
            <div className="dms-faq__a-inner"><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
