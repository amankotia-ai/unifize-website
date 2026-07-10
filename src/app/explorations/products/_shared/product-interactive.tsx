"use client";

/* ----------------------------------------------------------------------------
 * product-interactive.tsx - shared, prop-driven interactive layer for the
 * QMS / PLM / MES product pages. It generalizes the DMS interactive components
 * (dms-interactive.tsx) so the same behaviour and CSS classes can be fed any
 * product's data. Route files stay server components: these components receive
 * pre-rendered mock ELEMENTS (a { key -> node } map, or a node array), never
 * render functions, so nothing has to cross the server/client boundary as a
 * function.
 *   ModuleScrollStory - horizontal sticky-scroll module story (DMS section 02),
 *                       scales to N modules. Good for 3-5 headline modules.
 *   ModuleLedger      - stationary vertical module explorer (list + staged
 *                       prototype). Good when a product bundles many modules.
 *   FlowExplorer      - node-rail flow on the brand field with a scroll-scrubbed
 *                       stage: either a ChatShell (chat prop) or a staged mock
 *                       swapped per step (stageMocks prop).
 *   FaqAccordion      - one-open-at-a-time FAQ.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { ChatShell, type ChatShellProps } from "@/components/organisms";
import { Eyebrow, ShellFrame, StagePanel } from "../dms/dms-primitives";

const pad = (n: number) => String(n).padStart(2, "0");

export type ModuleDatum = {
  key: string;
  name: string;
  blurb: string;
  promise?: string;
  points?: string[];
  visual?: string;
  standards?: string[];
};

export type FlowStep = { state: string; gate: string; detail: string; visual?: string };

/* ============================================================ module story
 * Horizontal sticky-scroll: one module per ~viewport-height of scroll. The
 * brand-blue field stages the active module's prototype; the module row
 * beneath tracks left to right. Clicking scrolls to a module's segment.
 * Below 900px it is static, tap to switch. Height/columns scale with N via
 * the `.pk-modx-*` classes (product-kit.css) driven by the --pk-n variable. */
export function ModuleScrollStory({
  eyebrowN,
  heading,
  modules,
  mocks,
  urlBase,
}: {
  eyebrowN: number;
  heading: string;
  modules: ModuleDatum[];
  mocks: Record<string, React.ReactNode>;
  urlBase: string;
}) {
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const n = modules.length;
  const MQ = "(min-width: 901px)";

  useEffect(() => {
    const onScroll = () => {
      if (!window.matchMedia(MQ).matches) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const s = Math.min(1, Math.max(0, -rect.top / total));
      setActive(Math.min(n - 1, Math.floor(s * n)));
      setProg(s);
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
    if (el && window.matchMedia(MQ).matches) {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      window.scrollTo({ top: window.scrollY + rect.top + ((i + 0.5) / n) * total, behavior: "smooth" });
    } else {
      setActive(i);
    }
  };

  const m = modules[active];

  return (
    <div className="dms-modx-scroll pk-modx-scroll" ref={wrapRef} style={{ ["--pk-n" as string]: n }}>
      <div className="dms-modx-sticky">
        <div className="dms-wrap dms-modx">
          <div className="dms-modx__head">
            <Eyebrow n={eyebrowN}>What is bundled</Eyebrow>
            <h2 className="dms-h2">{heading}</h2>
          </div>
          <StagePanel className="dms-stage--brand dms-modx__stage">
            <div className="dms-modx__card" key={m.key}>
              <ShellFrame panel url={`app.unifize.com / ${urlBase} / ${m.key.replace(/-/g, " ")}`}>
                {mocks[m.key]}
              </ShellFrame>
            </div>
          </StagePanel>
          <div className="dms-modx__rail pk-modx__rail" aria-hidden="true">
            {modules.map((mod, i) => (
              <div className="dms-modx__rail-cell" key={mod.key}>
                <span className={"dms-modx__jn" + (prog >= i / (n - 1) - 0.02 ? " is-on" : "")} />
                {i < n - 1 && (
                  <span className="dms-modx__seg">
                    <span
                      className="dms-modx__seg-fill"
                      style={{ transform: `scaleX(${Math.min(1, Math.max(0, (prog - i / (n - 1)) * (n - 1)))})` }}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="dms-modx__row pk-modx__row">
            {modules.map((mod, i) => (
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

/* ============================================================ module ledger
 * Stationary vertical explorer for products that bundle many modules: a
 * selectable module ledger (mono index, name, blurb; dashed row rules) on the
 * left, the active module's staged prototype on the right. No forced scroll. */
export function ModuleLedger({
  eyebrowN,
  heading,
  lede,
  modules,
  mocks,
  urlBase,
}: {
  eyebrowN: number;
  heading: string;
  lede?: string;
  modules: ModuleDatum[];
  mocks: Record<string, React.ReactNode>;
  urlBase: string;
}) {
  const [active, setActive] = useState(0);
  const m = modules[active];

  return (
    <div className="dms-wrap">
      <div className="dms-head" data-reveal>
        <Eyebrow n={eyebrowN}>What is bundled</Eyebrow>
        <h2 className="dms-h2">{heading}</h2>
        {lede ? <p className="dms-lede">{lede}</p> : null}
      </div>
      <div className="pk-modv" data-reveal>
        <ul className="pk-modv__list" role="tablist" aria-label="Modules bundled" aria-orientation="vertical">
          {modules.map((mod, i) => (
            <li className="pk-modv__row" key={mod.key}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                className={"pk-modv__it" + (i === active ? " is-active" : "")}
                onClick={() => setActive(i)}
              >
                <span className="pk-modv__idx dms-data" aria-hidden="true">{pad(i + 1)}</span>
                <span className="pk-modv__meta">
                  <span className="pk-modv__name">{mod.name}</span>
                  <p className="pk-modv__blurb">{mod.blurb}</p>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="pk-modv__stagewrap">
          <StagePanel className="dms-stage--brand pk-modv__stage">
            <div className="pk-modv__card" key={m.key}>
              <ShellFrame panel url={`app.unifize.com / ${urlBase} / ${m.key.replace(/-/g, " ")}`}>
                {mocks[m.key]}
              </ShellFrame>
            </div>
          </StagePanel>
        </div>
      </div>
    </div>
  );
}

/* piecewise-linear map from a 0..1 scroll fraction to a ChatShell timeline
 * progress, anchoring each step's chat moment to the middle of its segment. */
function makeShellProgress(points: number[]) {
  const N = points.length;
  const pts: [number, number][] = [
    [0, 0],
    ...points.map((p, i) => [(i + 0.5) / N, p] as [number, number]),
    [1, 1],
  ];
  return (s: number): number => {
    for (let i = 1; i < pts.length; i++) {
      if (s <= pts[i][0]) {
        const [s0, p0] = pts[i - 1];
        const [s1, p1] = pts[i];
        return p0 + (p1 - p0) * ((s - s0) / (s1 - s0));
      }
    }
    return 1;
  };
}

/* ============================================================ flow explorer
 * The DMS lifecycle pattern, generalized: the step trail and a staged visual
 * sit inside a sticky brand field while a tall scroll region drives the
 * progression. The stage is either:
 *   chat       - a ChatShell scrubbed by scroll (points map each step to a
 *                shell-timeline position); or
 *   stageMocks - one pre-rendered node per step, swapped as the step advances.
 * Clicking a step smooth-scrolls to its segment. Height scales with N. */
export function FlowExplorer({
  eyebrowN,
  heading,
  trailLabel,
  steps,
  chat,
  stageMocks,
  mobileNote,
}: {
  eyebrowN: number;
  heading: string;
  trailLabel: string;
  steps: FlowStep[];
  chat?: { variant: ChatShellProps["variant"]; points: number[] };
  stageMocks?: React.ReactNode[];
  mobileNote?: { label: string; id: string };
}) {
  const n = steps.length;
  const [active, setActive] = useState(0);
  const [s, setS] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const MQ = "(min-width: 941px)";
  const shellProgress = chat ? makeShellProgress(chat.points) : null;

  useEffect(() => {
    const onScroll = () => {
      if (!window.matchMedia(MQ).matches) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const frac = Math.min(1, Math.max(0, -rect.top / total));
      setActive(Math.min(n - 1, Math.floor(frac * n)));
      setS(frac);
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
    if (el && window.matchMedia(MQ).matches) {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      window.scrollTo({ top: window.scrollY + rect.top + ((i + 0.5) / n) * total, behavior: "smooth" });
    } else {
      setActive(i);
      setS((i + 0.5) / n);
    }
  };

  return (
    <div className="dms-lifex-scroll pk-flow-scroll" ref={wrapRef} style={{ ["--pk-n" as string]: n }}>
      <div className="dms-lifex-sticky">
        <StagePanel className="dms-stage--brand dms-lifex__stage">
          <div className="dms-wrap dms-lifex-wrap">
            <div className="dms-lifex__head">
              <Eyebrow n={eyebrowN}>The lifecycle</Eyebrow>
              <h2 className="dms-h2">{heading}</h2>
            </div>
            <div className="dms-lifex">
              <aside className="dms-lifex__trail">
                <span className="dms-lifex__lab">{trailLabel}</span>
                <ol
                  className="dms-lifex__steps"
                  role="tablist"
                  aria-label={trailLabel}
                  aria-orientation="vertical"
                  style={{ ["--lifex-fill" as string]: n > 1 ? active / (n - 1) : 0 }}
                >
                  {steps.map((st, i) => (
                    <li
                      className={"dms-lifex__step" + (i === active ? " is-active" : "") + (i < active ? " is-past" : "")}
                      key={st.state}
                    >
                      <button
                        type="button"
                        role="tab"
                        id={`pk-lifetab-${i}`}
                        aria-selected={i === active}
                        aria-controls={`pk-lifedetail-${i}`}
                        className="dms-lifex__btn"
                        onClick={() => onStep(i)}
                      >
                        <span className="dms-lifex__node" aria-hidden="true" />
                        <span className="dms-lifex__t">{st.state}</span>
                        <span className="dms-lifex__meta">{st.gate}</span>
                      </button>
                      <div
                        className="dms-lifex__detail"
                        id={`pk-lifedetail-${i}`}
                        role="tabpanel"
                        aria-labelledby={`pk-lifetab-${i}`}
                        aria-hidden={i !== active}
                      >
                        <div className="dms-lifex__detail-inner"><p>{st.detail}</p></div>
                      </div>
                    </li>
                  ))}
                </ol>
              </aside>

              <div className="dms-lifex__live" aria-label={heading}>
                {chat && shellProgress ? (
                  <ChatShell variant={chat.variant} progress={shellProgress(s)} />
                ) : stageMocks ? (
                  <div className="pk-flow-stage" key={active}>
                    <ShellFrame panel url="app.unifize.com">
                      {stageMocks[Math.min(active, stageMocks.length - 1)]}
                    </ShellFrame>
                  </div>
                ) : null}
              </div>

              {mobileNote ? (
                <div className="dms-lifex__mobile" aria-hidden="true">
                  <span className="dms-lifex__mobile-lab">{mobileNote.label}</span>
                  <span className="dms-lifex__mobile-id">{mobileNote.id}</span>
                </div>
              ) : null}
            </div>
          </div>
        </StagePanel>
      </div>
    </div>
  );
}

/* ============================================================ proof carousel
 * Full-bleed customer photo per story; head top-left, quote bottom-left,
 * forward/back controls bottom-right. Photos crossfade; the quote block
 * re-rises on change. Prop-driven twin of the DMS ProofCarousel, reusing the
 * same `.dms-proof*` classes (dms.css) so QMS / PLM / MES read identically. */
export type Testimonial = { quote: string; name: string; title: string; img: string };

export function ProofCarousel({
  eyebrowN,
  kicker,
  testimonials,
}: {
  eyebrowN: number;
  kicker: string;
  testimonials: Testimonial[];
}) {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const t = testimonials[i];
  const go = (d: number) => setI((prev) => (prev + d + n) % n);

  return (
    <>
      {testimonials.map((s, j) => (
        <img
          key={s.img}
          className={"dms-proof-section__photo" + (j === i ? " is-on" : "")}
          src={s.img}
          alt=""
        />
      ))}
      <div className="dms-wrap dms-proof">
        <header className="dms-proof__head">
          <Eyebrow n={eyebrowN}>Proof</Eyebrow>
          <span className="dms-proof__kicker">{kicker}</span>
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
export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="dms-faq">
      {faqs.map((f, i) => (
        <div className={"dms-faq__item" + (open === i ? " is-open" : "")} key={f.q}>
          <h3 className="dms-faq__h">
            <button
              type="button"
              className="dms-faq__q"
              aria-expanded={open === i}
              aria-controls={`pk-faq-a-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <svg className="dms-faq__ic" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" clipRule="evenodd" />
              </svg>
            </button>
          </h3>
          <div className="dms-faq__a" id={`pk-faq-a-${i}`} role="region" aria-hidden={open !== i}>
            <div className="dms-faq__a-inner"><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
