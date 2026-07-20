"use client";

/* Interactive layer for the Ledger noir DMS direction.
 * One motion system for the page (NoirMotion: Lenis + reveals), plus four
 * self-contained instruments: the problem spotlight, the condensed
 * coordination-tax scene (pinned), the module explorer, and the lifecycle
 * line. CSS defaults are the finished states; JS only animates from hidden
 * when motion is allowed. */

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Lenis from "lenis";
import type { DmsCoordinationProblem } from "../dms-data";
import { TrailMock, ChangeMock, TrainingMock } from "./noir-mocks";

/* ------------------------------------------------------------ page motion */
export function NoirMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from(".dn-hero [data-rise]", {
        yPercent: 108,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.1,
      });
      gsap.utils.toArray<HTMLElement>("[data-nreveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 26,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

/* ------------------------------------------------------ problem spotlight */
export function ProblemSpotlight({ items }: { items: DmsCoordinationProblem[] }) {
  const [active, setActive] = useState(0);
  const p = items[active];
  return (
    <div className="dn-spot" data-nreveal>
      <div className="dn-spot__rail" role="tablist" aria-label="Daily symptoms">
        {items.map((item, i) => (
          <button
            key={item.category}
            role="tab"
            aria-selected={i === active}
            id={`dn-spot-tab-${i}`}
            aria-controls="dn-spot-stage"
            className="dn-spot__item"
            onClick={() => setActive(i)}
          >
            <span className="dn-spot__idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="dn-spot__cat">{item.category}</span>
            <span className="dn-spot__metric">{item.metric}</span>
          </button>
        ))}
      </div>
      <div
        className="dn-spot__stage"
        id="dn-spot-stage"
        role="tabpanel"
        aria-labelledby={`dn-spot-tab-${active}`}
        key={p.category}
      >
        <blockquote className="dn-spot__quote">&ldquo;{p.quote}&rdquo;</blockquote>
        <p className="dn-spot__detail dn-dim">{p.detail}</p>
        <div className="dn-spot__meta">
          <div>
            <span className="dn-spot__lab">The work</span>
            <span>{p.work}</span>
          </div>
          <div>
            <span className="dn-spot__lab">The tax</span>
            <span>{p.tax.join(" · ")}</span>
          </div>
          <div>
            <span className="dn-spot__lab">Reading</span>
            <span><strong>{p.metric}</strong> {p.metricLabel.toLowerCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------- condensed coordination tax
 * The explainer's detour scene, shortened for a product page: straight line
 * drawn, detour inflates through the four stations, meter counts, thesis
 * holds. No beat captions; the problem section above already narrated them. */
const DETOUR_D =
  "M 80 420 C 150 415 200 230 260 230 C 320 230 420 130 480 130 C 540 130 650 150 710 150 C 770 150 880 260 940 260 C 1000 260 1080 418 1120 420";

const STATIONS = [
  { label: "SEARCH", x: 260, y: 230, f: 0.2 },
  { label: "COMPARE", x: 480, y: 130, f: 0.41 },
  { label: "CHASE", x: 710, y: 150, f: 0.59 },
  { label: "RECONCILE", x: 940, y: 260, f: 0.78 },
];

export function TaxScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const detourRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const touchesRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const detour = detourRef.current!;
      const L = detour.getTotalLength();
      detour.style.strokeDasharray = `${L}`;
      const ghost = ghostRef.current!;
      const GL = 1040;
      ghost.style.strokeDasharray = `${GL}`;

      const stations = gsap.utils.toArray<SVGGElement>(".dn-st");
      stations.forEach((el) => el.classList.remove("is-lit"));
      gsap.set(detour, { strokeDashoffset: L });
      gsap.set(ghost, { strokeDashoffset: GL });
      gsap.set(dotRef.current, { opacity: 0 });
      gsap.set(".dn-thesis", { opacity: 0, y: 14 });

      /* draw spans units 6..80 of a 96-unit timeline */
      const DRAW0 = 6 / 96, DRAW1 = 80 / 96;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
          onUpdate: (st) => {
            const p = gsap.utils.clamp(0, 1, (st.progress - DRAW0) / (DRAW1 - DRAW0));
            stations.forEach((el, i) => el.classList.toggle("is-lit", p >= STATIONS[i].f));
            if (touchesRef.current) touchesRef.current.textContent = String(Math.round(23 * p)).padStart(2, "0");
            if (daysRef.current) daysRef.current.textContent = (11 * p).toFixed(1);
          },
        },
      });

      tl.to(ghost, { strokeDashoffset: 0, duration: 8 }, 0);
      tl.to(dotRef.current, { opacity: 1, duration: 2 }, 4);
      tl.to(detour, { strokeDashoffset: 0, duration: 74 }, 6);
      tl.to(dotRef.current, {
        duration: 74,
        motionPath: { path: detour, align: detour, alignOrigin: [0.5, 0.5] },
      }, 6);
      tl.to(".dn-thesis", { opacity: 1, y: 0, duration: 8, ease: "power2.out" }, 74);
      tl.to({}, { duration: 14 }, 82);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={stageRef} className="dn-scene" aria-label="One change travelling through search, compare, chase and reconcile instead of a straight line.">
      <svg className="dn-scene__svg" viewBox="0 0 1200 520" fill="none" aria-hidden="true">
        <line ref={ghostRef} className="dn-work" x1="80" y1="420" x2="1120" y2="420" />
        <path ref={detourRef} className="dn-detour" d={DETOUR_D} />
        {STATIONS.map((s) => (
          <g key={s.label} className="dn-st is-lit" transform={`translate(${s.x} ${s.y})`}>
            <circle r="6" />
            <text y="-18" textAnchor="middle">{s.label}</text>
          </g>
        ))}
        <g className="dn-end" transform="translate(80 420)">
          <circle r="5" />
          <text y="34" textAnchor="middle">CHANGE</text>
        </g>
        <g className="dn-end" transform="translate(1120 420)">
          <circle r="5" />
          <text y="34" textAnchor="middle">EVIDENCE</text>
        </g>
        <circle ref={dotRef} className="dn-scenedot" cx="80" cy="420" r="5" />
      </svg>
      <div className="dn-scene__meter" aria-hidden="true">
        <span className="dn-dim">One change, observed</span>
        <strong><span ref={touchesRef}>23</span> touches</strong>
        <strong><span ref={daysRef}>11.0</span> days</strong>
      </div>
      <p className="dn-thesis">
        The straight line was the work.<br />
        The rest of the journey is the tax.
      </p>
    </div>
  );
}

/* -------------------------------------------------------- module explorer */
type ModuleData = {
  key: string;
  name: string;
  promise: string;
  blurb: string;
  points: string[];
  standards: string[];
};

const MODULE_MOCKS: Record<string, () => ReactNode> = {
  "document-control": TrailMock,
  "change-control": ChangeMock,
  "training-management": TrainingMock,
};

export function ModuleExplorer({ modules }: { modules: ModuleData[] }) {
  const [active, setActive] = useState(0);
  const m = modules[active];
  const Mock = MODULE_MOCKS[m.key] ?? TrailMock;
  return (
    <div className="dn-modx" data-nreveal>
      <div className="dn-modx__tabs" role="tablist" aria-label="Bundled modules">
        {modules.map((mod, i) => (
          <button
            key={mod.key}
            role="tab"
            aria-selected={i === active}
            id={`dn-modx-tab-${i}`}
            aria-controls="dn-modx-panel"
            onClick={() => setActive(i)}
          >
            <span className="dn-spot__idx">{String(i + 1).padStart(2, "0")}</span>
            {mod.name}
          </button>
        ))}
      </div>
      <div className="dn-modx__panel" id="dn-modx-panel" role="tabpanel" aria-labelledby={`dn-modx-tab-${active}`} key={m.key}>
        <div className="dn-modx__copy">
          <h3 className="dn-modx__promise">{m.promise}</h3>
          <p className="dn-dim">{m.blurb}</p>
          <ul className="dn-modx__points">
            {m.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <p className="dn-modx__standards dn-dim">{m.standards.join(" · ")}</p>
        </div>
        <div className="dn-modx__mock">
          <Mock />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- lifecycle line
 * The explainer's resolution motif, applied to the product: six states as
 * stations on one governed line. */
type Stage = { state: string; gate: string; detail: string; visual: string };

export function LifecycleLine({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(3); /* Effective: the state that matters */
  const s = stages[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => Math.min(a + 1, stages.length - 1));
    if (e.key === "ArrowLeft") setActive((a) => Math.max(a - 1, 0));
  };

  return (
    <div className="dn-life" data-nreveal>
      <div className="dn-life__line" role="tablist" aria-label="Document lifecycle states" onKeyDown={onKey}>
        {stages.map((stage, i) => (
          <button
            key={stage.state}
            role="tab"
            aria-selected={i === active}
            id={`dn-life-tab-${i}`}
            aria-controls="dn-life-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            <span className="dn-life__dot" aria-hidden="true" />
            <span className="dn-life__state">{stage.state}</span>
          </button>
        ))}
      </div>
      <div className="dn-life__panel" id="dn-life-panel" role="tabpanel" aria-labelledby={`dn-life-tab-${active}`} key={s.state}>
        <p className="dn-life__gate">{s.gate}</p>
        <p className="dn-life__detail">{s.detail}</p>
        <p className="dn-life__visual dn-dim">{s.visual}</p>
      </div>
    </div>
  );
}
