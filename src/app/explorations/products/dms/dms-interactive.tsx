"use client";

/* ----------------------------------------------------------------------------
 * dms-interactive.tsx - the interactive layer of the DMS product page.
 *   ModuleExplorer     - module accordion with a staged prototype per module.
 *   LifecycleExplorer  - node-rail lifecycle diagram with a detail panel.
 *   FaqAccordion       - one-open-at-a-time FAQ.
 * Design: editorial, hairline-based - big Geist type, mono indices, staged
 * prototype mocks on gradient-noise fields. All state is local and degrades
 * to a sensible default without JS (first module, Effective state, first
 * FAQ open).
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { ChatShell } from "@/components/organisms";
import { MODULES, LIFECYCLE, FAQS, TESTIMONIALS } from "./dms-data";
import { Eyebrow, ShellFrame, StagePanel } from "./dms-primitives";
import { MockChangeOrder, MockRevisionTrail, MockTrainingMatrix } from "./dms-mocks";

/* ============================================================ shared bits */

const pad = (n: number) => String(n).padStart(2, "0");

/* ============================================================ module story
 * Sticky scroll: three modules, one per viewport-height of scroll. The
 * brand-blue field stages the active module's prototype; the module row
 * beneath tracks left to right. Clicking a module scrolls to its
 * segment. Below 900px: static, tap to switch. */

const MODULE_MOCKS: Record<string, React.ReactNode> = {
  "document-control": <MockRevisionTrail />,
  "change-control": <MockChangeOrder />,
  "training-management": <MockTrainingMatrix />,
};

const MODX_MQ = "(min-width: 901px)";

export function ModuleExplorer() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const n = MODULES.length;

  useEffect(() => {
    const onScroll = () => {
      if (!window.matchMedia(MODX_MQ).matches) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const s = Math.min(1, Math.max(0, -rect.top / total));
      setActive(Math.min(n - 1, Math.floor(s * n)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  const onStep = (i: number) => {
    const el = wrapRef.current;
    if (el && window.matchMedia(MODX_MQ).matches) {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      window.scrollTo({
        top: window.scrollY + rect.top + ((i + 0.5) / n) * total,
        behavior: "smooth",
      });
    } else {
      setActive(i);
    }
  };

  const m = MODULES[active];

  return (
    <div className="dms-modx-scroll" ref={wrapRef}>
      <div className="dms-modx-sticky">
        <div className="dms-wrap dms-modx">
          <div className="dms-modx__head">
            <Eyebrow n={2}>What is bundled</Eyebrow>
            <h2 className="dms-h2">Three modules, one record.</h2>
          </div>
          <StagePanel className="dms-stage--brand dms-modx__stage">
            <div className="dms-modx__card" key={m.key}>
              <ShellFrame panel url={`app.unifize.com / ${m.key.replace(/-/g, " ")}`}>
                {MODULE_MOCKS[m.key]}
              </ShellFrame>
            </div>
          </StagePanel>
          <div className="dms-modx__row">
            {MODULES.map((mod, i) => (
              <button
                type="button"
                key={mod.key}
                className={"dms-modx__it" + (i === active ? " is-active" : "")}
                aria-pressed={i === active}
                onClick={() => onStep(i)}
              >
                <span className="dms-modx__idx dms-data">{pad(i + 1)}</span>
                <span className="dms-modx__name">{mod.name}</span>
                <p className="dms-modx__blurb">{mod.blurb}</p>
              </button>
            ))}
          </div>
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

/* ============================================================ proof carousel
 * Full-bleed customer photo per story; head top-left, quote bottom-left,
 * forward/back controls bottom-right. Photos crossfade; the quote block
 * re-rises on change. */

export function ProofCarousel() {
  const [i, setI] = useState(0);
  const n = TESTIMONIALS.length;
  const t = TESTIMONIALS[i];
  const go = (d: number) => setI((prev) => (prev + d + n) % n);

  return (
    <>
      {TESTIMONIALS.map((s, j) => (
        <img
          key={s.img}
          className={"dms-proof-section__photo" + (j === i ? " is-on" : "")}
          src={s.img}
          alt=""
        />
      ))}
      <div className="dms-wrap dms-proof">
        <header className="dms-proof__head">
          <Eyebrow n={6}>Proof</Eyebrow>
          <span className="dms-proof__kicker">What quality teams say</span>
        </header>
        <figure className="dms-proof__fig">
          <blockquote className="dms-proof__q" key={"q-" + i}>&ldquo;{t.quote}&rdquo;</blockquote>
          <div className="dms-proof__bar">
            <figcaption className="dms-proof__who" key={"who-" + i}>
              <span className="dms-proof__name">{t.name}</span>
              <span className="dms-proof__role">{t.title}</span>
            </figcaption>
            <div className="dms-proof__nav">
              <span className="dms-proof__count dms-data" aria-live="polite">{pad(i + 1)}&thinsp;/&thinsp;{pad(n)}</span>
              <button type="button" className="dms-proof__btn" aria-label="Previous story" onClick={() => go(-1)}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="square" d="m12 4-6 6 6 6" />
                </svg>
              </button>
              <button type="button" className="dms-proof__btn" aria-label="Next story" onClick={() => go(1)}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="square" d="m8 4 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </figure>
      </div>
    </>
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
