"use client";

/* The whole cinematic. Three chapters, one motion system:
 * 01 Name it - pinned scroll scene: a straight line inflates into a detour.
 * 02 Measure it - live path arithmetic: people x systems -> paths.
 * 03 Remove it - drag the tangle onto one governed record.
 * GSAP ScrollTrigger + Lenis; canvases redraw from tiny state objects.
 * CSS defaults are the FINISHED states, so no-JS and reduced-motion users
 * see complete scenes; timelines only animate from hidden when motion is on. */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Lenis from "lenis";

/* ---------------------------------------------------------------- chapter 1
 * The detour scene. One change should travel the straight line; instead it
 * climbs through four stations. Fractions are approximate path positions. */
const DETOUR_D =
  "M 80 420 C 150 415 200 230 260 230 C 320 230 420 130 480 130 C 540 130 650 150 710 150 C 770 150 880 260 940 260 C 1000 260 1080 418 1120 420";

const STATIONS = [
  { label: "SEARCH", x: 260, y: 230, f: 0.2 },
  { label: "COMPARE", x: 480, y: 130, f: 0.41 },
  { label: "CHASE", x: 710, y: 150, f: 0.59 },
  { label: "RECONCILE", x: 940, y: 260, f: 0.78 },
];

const BEATS = [
  <>One change. It should be a straight line from start to done.</>,
  <>First you <em>search</em>. Where is the current copy?</>,
  <>Then you <em>compare</em>. Three versions claim to be real.</>,
  <>Then you <em>chase</em>. The approval lives in someone&rsquo;s inbox.</>,
  <>Then you <em>reconcile</em>. The story gets rebuilt for the record.</>,
];

/* Real readings from document control teams, via the DMS research. */
const LEDGER = [
  { verb: "Search", metric: "40 min", note: "to find one SOP while the auditor waits" },
  { verb: "Compare", metric: "3+", note: "versions live on the floor at the same time" },
  { verb: "Chase", metric: "1 in 4", note: "procedures already past their review date" },
  { verb: "Reconcile", metric: "2–3 days", note: "to assemble one audit record" },
];

const STATIONS_ON_RECORD = ["Change", "Document", "Decisions", "Signatures", "Evidence"];

const paths = (p: number, s: number) => (p * (p - 1)) / 2 * s;

/* deterministic strand shapes for chapter 3 (stable art direction) */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fitCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { clientWidth: w, clientHeight: h } = canvas;
  if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
  if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

/* chapter 2: nodes on a circle, every pair connected, systems fork each path */
function drawNetwork(canvas: HTMLCanvasElement, pf: number, s: number) {
  const { ctx, w, h } = fitCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const R = Math.min(w, h) / 2 - 28;
  const nFull = Math.floor(pf);
  const frac = pf - nFull;
  const n = frac > 0.02 ? nFull + 1 : nFull;
  const pos: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / n;
    pos.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  const alpha = (i: number) => (i === n - 1 && frac > 0.02 ? frac : 1);

  /* the paths are the tax: accent hairlines, forked once per extra system */
  const base = Math.max(0.09, 0.5 - pf * 0.013 - s * 0.02);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = base * alpha(i) * alpha(j);
      const [x1, y1] = pos[i], [x2, y2] = pos[j];
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const dx = x2 - x1, dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const px = -dy / len, py = dx / len;
      for (let k = 0; k < s; k++) {
        const off = (k - (s - 1) / 2) * 7;
        ctx.strokeStyle = `rgba(86, 137, 255, ${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(mx + px * off, my + py * off, x2, y2);
        ctx.stroke();
      }
    }
  }
  /* the people stay calm and white */
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = `rgba(242, 241, 236, ${alpha(i)})`;
    ctx.beginPath();
    ctx.arc(pos[i][0], pos[i][1], 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* chapter 3: fourteen frayed routes between the same two anchors; t pulls
 * them onto one line. Stations live in the DOM, aligned to the same inset. */
const STRANDS = (() => {
  const rnd = mulberry32(20260717);
  return Array.from({ length: 14 }, (_, i) => ({
    a: (rnd() * 2 - 1) * (i % 2 ? 1 : -1),
    b: (rnd() * 2 - 1) * (i % 2 ? -1 : 1),
    alpha: 0.28 + rnd() * 0.3,
  }));
})();

function drawStrands(canvas: HTMLCanvasElement, t: number) {
  const { ctx, w, h } = fitCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  const x1 = w * 0.06, x2 = w * 0.94, cy = h / 2;
  const spread = h * 0.44 * (1 - t);
  if (t < 0.985) {
    for (const s of STRANDS) {
      ctx.strokeStyle = `rgba(16, 17, 20, ${s.alpha * (1 - t * 0.55)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, cy);
      ctx.bezierCurveTo(w * 0.33, cy + s.a * spread, w * 0.66, cy + s.b * spread, x2, cy);
      ctx.stroke();
    }
  }
  /* the governed record: one line, gaining weight as routes converge */
  ctx.strokeStyle = `rgba(16, 17, 20, ${0.25 + t * 0.75})`;
  ctx.lineWidth = 1 + t * 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, cy);
  ctx.lineTo(x2, cy);
  ctx.stroke();
  /* anchors, then stations rising onto the line */
  const stationA = Math.max(0, (t - 0.72) / 0.28);
  for (let i = 0; i < 5; i++) {
    const x = x1 + ((x2 - x1) * i) / 4;
    ctx.fillStyle = `rgba(16, 17, 20, ${i === 0 || i === 4 ? 1 : stationA})`;
    ctx.beginPath();
    ctx.arc(x, cy, i === 0 || i === 4 ? 5 : 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CtaxStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detourRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const touchesRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLSpanElement>(null);
  const netCanvasRef = useRef<HTMLCanvasElement>(null);
  const pathsRef = useRef<HTMLSpanElement>(null);
  const peopleOutRef = useRef<HTMLSpanElement>(null);
  const peopleRef = useRef<HTMLInputElement>(null);
  const systemsRef = useRef<HTMLDivElement>(null);
  const strandCanvasRef = useRef<HTMLCanvasElement>(null);
  const alignRef = useRef<HTMLInputElement>(null);
  const detoursRef = useRef<HTMLSpanElement>(null);
  const refundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current!;

    /* ------------------------------------------------ shared canvas state */
    const net = { p: reduced ? 12 : 2, s: 1 };
    const rope = { t: reduced ? 1 : 0 };
    let userAligned = false;

    const renderNet = () => {
      if (!netCanvasRef.current) return;
      drawNetwork(netCanvasRef.current, net.p, net.s);
      const count = Math.round(paths(net.p, net.s));
      if (pathsRef.current) pathsRef.current.textContent = String(count);
      if (peopleOutRef.current) peopleOutRef.current.textContent = String(Math.round(net.p));
      if (peopleRef.current) peopleRef.current.value = String(Math.round(net.p));
    };
    const renderRope = () => {
      if (!strandCanvasRef.current) return;
      drawStrands(strandCanvasRef.current, rope.t);
      if (detoursRef.current) detoursRef.current.textContent = String(Math.round(14 * (1 - rope.t)));
      refundRef.current?.style.setProperty("--t", String(rope.t));
    };

    /* markup defaults describe the finished, no-JS states; when motion is on,
     * the rope begins tangled, so the align control must agree */
    if (alignRef.current) alignRef.current.value = String(Math.round(rope.t * 100));

    const ro = new ResizeObserver(() => { renderNet(); renderRope(); });
    if (netCanvasRef.current) ro.observe(netCanvasRef.current);
    if (strandCanvasRef.current) ro.observe(strandCanvasRef.current);
    renderNet();
    renderRope();

    /* ------------------------------------------------------- interactions */
    const onPeople = () => {
      gsap.to(net, { p: Number(peopleRef.current!.value), duration: 0.45, ease: "power2.out", onUpdate: renderNet, overwrite: "auto" });
    };
    peopleRef.current?.addEventListener("input", onPeople);

    const sysButtons = Array.from(systemsRef.current?.querySelectorAll("button") ?? []);
    const onSystem = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      sysButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      gsap.to(net, { s: Number(btn.dataset.s), duration: 0.45, ease: "power2.out", onUpdate: renderNet, overwrite: "auto" });
    };
    sysButtons.forEach((b) => b.addEventListener("click", onSystem));

    const onAlign = () => {
      userAligned = true;
      gsap.to(rope, { t: Number(alignRef.current!.value) / 100, duration: 0.4, ease: "power2.out", onUpdate: renderRope, overwrite: "auto" });
    };
    alignRef.current?.addEventListener("input", onAlign);

    /* ------------------------------------------------------- motion system */
    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;
    const ctx = gsap.context(() => {
      if (reduced) return;

      lenis = new Lenis({ lerp: 0.12 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      /* hero: quiet staggered arrival */
      gsap.from(".ctax-hero [data-rise]", {
        yPercent: 108,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.15,
      });

      /* chapter 1: the pinned detour scene */
      const detour = detourRef.current!;
      const L = detour.getTotalLength();
      detour.style.strokeDasharray = `${L}`;
      const ghost = ghostRef.current!;
      const GL = 1040;
      ghost.style.strokeDasharray = `${GL}`;

      /* stations wait dim on the road ahead, then light as the dot passes */
      const stations = gsap.utils.toArray<SVGGElement>(".ctax-st");
      stations.forEach((el) => el.classList.remove("is-lit"));
      gsap.set(detour, { strokeDashoffset: L });
      gsap.set(ghost, { strokeDashoffset: GL });
      gsap.set(dotRef.current, { opacity: 0 });
      gsap.set(".ctax-beat", { opacity: 0, y: 14 });
      gsap.set(".ctax-thesis", { opacity: 0, y: 14 });

      /* the draw spans timeline units 8..88 of a 104-unit timeline */
      const DRAW0 = 8 / 104, DRAW1 = 88 / 104;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=340%",
          pin: true,
          scrub: 1,
          onUpdate: (st) => {
            const p = gsap.utils.clamp(0, 1, (st.progress - DRAW0) / (DRAW1 - DRAW0));
            stations.forEach((el, i) => {
              el.classList.toggle("is-lit", p >= STATIONS[i].f);
            });
            if (touchesRef.current) touchesRef.current.textContent = String(Math.round(23 * p)).padStart(2, "0");
            if (daysRef.current) daysRef.current.textContent = (11 * p).toFixed(1);
          },
        },
      });

      /* the work: a straight line, drawn first and left standing */
      tl.to(ghost, { strokeDashoffset: 0, duration: 10 }, 0);
      tl.to(dotRef.current, { opacity: 1, duration: 2 }, 6);
      /* the detour inflates over the long middle */
      tl.to(detour, { strokeDashoffset: 0, duration: 80 }, 8);
      tl.to(dotRef.current, {
        duration: 80,
        motionPath: { path: detour, align: detour, alignOrigin: [0.5, 0.5] },
      }, 8);

      /* beats: one voice at a time, bottom left */
      const beats = gsap.utils.toArray<HTMLElement>(".ctax-beat");
      const windows = [[1, 16], [17, 32], [33, 48], [49, 64], [65, 77]];
      beats.forEach((el, i) => {
        const [a, b] = windows[i];
        tl.to(el, { opacity: 1, y: 0, duration: 3, ease: "power2.out" }, a);
        tl.to(el, { opacity: 0, y: -10, duration: 3, ease: "power2.in" }, b);
      });
      /* the payoff gets a long, quiet hold before the pin releases */
      tl.to(".ctax-thesis", { opacity: 1, y: 0, duration: 8, ease: "power2.out" }, 80);
      tl.to({}, { duration: 16 }, 88);

      /* ledger rows surface one by one */
      gsap.from(".ctax-ledger__row", {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".ctax-ledger", start: "top 72%" },
      });

      /* chapter 2 demos itself once, then hands over the controls */
      ScrollTrigger.create({
        trigger: ".ctax-compound__stage",
        start: "top 62%",
        once: true,
        onEnter: () => gsap.to(net, { p: 12, duration: 2.4, ease: "power3.inOut", onUpdate: renderNet }),
      });

      gsap.from(".ctax-compound__head [data-rise]", {
        opacity: 0, y: 26, duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".ctax-compound__head", start: "top 75%" },
      });

      /* chapter 3: if the reader never pulls the handle, resolve it for them */
      gsap.from(".ctax-refund__head [data-rise]", {
        opacity: 0, y: 26, duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".ctax-refund__head", start: "top 75%" },
      });
      ScrollTrigger.create({
        trigger: ".ctax-close",
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (userAligned) return;
          gsap.to(rope, { t: 1, duration: 1.8, ease: "power3.inOut", onUpdate: () => {
            renderRope();
            if (alignRef.current) alignRef.current.value = String(Math.round(rope.t * 100));
          } });
        },
      });
      gsap.from(".ctax-close [data-rise]", {
        opacity: 0, y: 30, duration: 1, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".ctax-close", start: "top 70%" },
      });
    }, root);

    return () => {
      ctx.revert();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      ro.disconnect();
      peopleRef.current?.removeEventListener("input", onPeople);
      alignRef.current?.removeEventListener("input", onAlign);
      sysButtons.forEach((b) => b.removeEventListener("click", onSystem));
    };
  }, []);

  return (
    <div ref={rootRef} className="ctax-root">
      {/* ============================================= chapter 01 · name it */}
      <header className="ctax-hero">
        <div className="ctax-hero__bar">
          <Link href="/explorations/home" className="ctax-mark">Unifize</Link>
          <span className="ctax-dim">An explainer in three parts</span>
        </div>
        <div className="ctax-hero__center">
          <p className="ctax-kicker"><span data-rise>01 · Name it</span></p>
          <h1 className="ctax-h1">
            <span className="ctax-clip"><span data-rise>The Coordination</span></span>
            <span className="ctax-clip"><span data-rise>Tax<i className="ctax-stop">.</i></span></span>
          </h1>
          <p className="ctax-hero__sub">
            <span data-rise>
              The hours your best people spend moving work between people and
              systems. Never budgeted. Missing from every ledger. Paid every day.
            </span>
          </p>
        </div>
        <div className="ctax-hero__cue" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </header>

      <section className="ctax-scene" aria-label="One change travelling through search, compare, chase and reconcile instead of a straight line.">
        <div ref={stageRef} className="ctax-stage">
          <svg className="ctax-svg" viewBox="0 0 1200 520" fill="none" aria-hidden="true">
            {/* the work: straight from start to done */}
            <line ref={ghostRef} className="ctax-work" x1="80" y1="420" x2="1120" y2="420" />
            {/* the tax: the journey it actually takes */}
            <path ref={detourRef} className="ctax-detour" d={DETOUR_D} />
            {STATIONS.map((s) => (
              <g key={s.label} className="ctax-st is-lit" transform={`translate(${s.x} ${s.y})`}>
                <circle r="6" />
                <text y="-18" textAnchor="middle">{s.label}</text>
              </g>
            ))}
            <g className="ctax-end" transform="translate(80 420)">
              <circle r="5" />
              <text y="34" textAnchor="middle">START</text>
            </g>
            <g className="ctax-end" transform="translate(1120 420)">
              <circle r="5" />
              <text y="34" textAnchor="middle">DONE</text>
            </g>
            <circle ref={dotRef} className="ctax-dot" cx="80" cy="420" r="5" />
          </svg>

          <div className="ctax-meter" aria-hidden="true">
            <span className="ctax-dim">One change, observed</span>
            <strong><span ref={touchesRef}>23</span> touches</strong>
            <strong><span ref={daysRef}>11.0</span> days</strong>
          </div>

          <div className="ctax-beats" aria-hidden="true">
            {BEATS.map((b, i) => (
              <p key={i} className="ctax-beat">{b}</p>
            ))}
          </div>

          <p className="ctax-thesis">
            The straight line was the work.<br />
            The rest of the journey is the tax.
          </p>
        </div>
      </section>

      <section className="ctax-ledger" aria-label="What the detours cost, measured.">
        <p className="ctax-kicker">What the detours cost, measured</p>
        <div className="ctax-ledger__rows">
          {LEDGER.map((r) => (
            <div key={r.verb} className="ctax-ledger__row">
              <span className="ctax-ledger__verb">{r.verb}</span>
              <strong className="ctax-ledger__metric">{r.metric}</strong>
              <span className="ctax-ledger__note">{r.note}</span>
            </div>
          ))}
        </div>
        <p className="ctax-dim ctax-ledger__src">Field readings from document control teams, before Unifize.</p>
      </section>

      {/* ========================================== chapter 02 · measure it */}
      <section className="ctax-compound" aria-label="Coordination compounds with people and systems.">
        <header className="ctax-compound__head">
          <p className="ctax-kicker"><span data-rise>02 · Measure it</span></p>
          <h2 className="ctax-h2"><span data-rise>It compounds<i className="ctax-stop">.</i></span></h2>
          <p className="ctax-lede">
            <span data-rise>
              Coordination is not a headcount problem. It is a paths problem.
              Every person added must stay aligned with everyone already in the
              loop, and every system keeps its own copy of the truth.
            </span>
          </p>
        </header>

        <div className="ctax-compound__stage">
          <canvas ref={netCanvasRef} className="ctax-net" aria-hidden="true" />
          <div className="ctax-panel">
            <div className="ctax-panel__reading">
              <span className="ctax-num"><span ref={pathsRef}>66</span></span>
              <span className="ctax-dim">paths to keep aligned</span>
            </div>

            <label className="ctax-control">
              <span className="ctax-control__label">
                People in the loop <strong><span ref={peopleOutRef}>12</span></strong>
              </span>
              <input ref={peopleRef} type="range" min={2} max={24} defaultValue={12} step={1} aria-label="People in the loop" />
            </label>

            <div className="ctax-control">
              <span className="ctax-control__label">Places the truth lives</span>
              <div ref={systemsRef} className="ctax-seg" role="group" aria-label="Number of systems">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" data-s={s} aria-pressed={s === 1}>{s}</button>
                ))}
              </div>
            </div>

            <p className="ctax-formula" aria-hidden="true">paths = p (p - 1) / 2 &times; systems</p>
            <p className="ctax-panel__note">
              Twelve people across five systems is 330 paths.
              No one owns them. Everyone pays for them.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================== chapter 03 · remove it */}
      <section className="ctax-refund" aria-label="Unifize moves the context with the work: one record, no detours.">
        <div ref={refundRef} className="ctax-refund__inner">
          <header className="ctax-refund__head">
            <p className="ctax-kicker"><span data-rise>03 · Remove it</span></p>
            <h2 className="ctax-h2"><span data-rise>One record. No detours<i className="ctax-stop">.</i></span></h2>
            <p className="ctax-lede">
              <span data-rise>
                Unifize moves the context with the work. The change, the current
                version, the decisions, and the evidence travel together on one
                governed record. Nothing to search for. Nothing to compare.
                No one to chase. Nothing left to reconcile.
              </span>
            </p>
          </header>

          <figure className="ctax-rope">
            <div className="ctax-rope__meter">
              <span className="ctax-dim">Routes the work can take</span>
              <strong><span ref={detoursRef}>0</span></strong>
            </div>
            <canvas ref={strandCanvasRef} className="ctax-rope__canvas" aria-hidden="true" />
            <figcaption className="ctax-rope__stations" aria-hidden="true">
              {STATIONS_ON_RECORD.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </figcaption>
          </figure>

          <label className="ctax-align">
            <span className="ctax-control__label">Pull the work onto one record</span>
            <input ref={alignRef} type="range" min={0} max={100} defaultValue={100} step={1} aria-label="Pull the work onto one record" />
          </label>
        </div>

        <div className="ctax-close">
          <h2 className="ctax-h1 ctax-close__title">
            <span className="ctax-clip"><span data-rise>Stop paying it<i className="ctax-stop">.</i></span></span>
          </h2>
          <p className="ctax-lede ctax-close__lede">
            <span data-rise>
              The tax never appears on an invoice, so nobody cancels it.
              Unifize makes it visible, measurable, and then gone.
            </span>
          </p>
          <div data-rise>
            <Link href="/explorations/products/dms" className="ctax-cta">
              See it removed in the DMS <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <footer className="ctax-foot">
          <span>Unifize · The governed layer for regulated processes</span>
          <span className="ctax-dim">The Coordination Tax · 2026</span>
        </footer>
      </section>
    </div>
  );
}
