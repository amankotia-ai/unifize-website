"use client";

/* ----------------------------------------------------------------------------
 * The problem section, spotlight composition: an index rail of the four
 * symptoms on the left, one symptom on stage at a time on the right - the
 * illustration gets real room, and its scene assembles element by element
 * whenever it takes the stage. The tour starts when the section is properly
 * on screen and advances every few seconds; hovering pauses it, choosing a
 * symptom stops it. Below 1100px the rail disappears and the four panels
 * stack, each building as it enters the viewport.
 * Fail-safe: scenes are only hidden once the component has confirmed motion
 * is allowed (JS running, no reduced-motion) - otherwise everything renders
 * static and complete.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type DmsProblemIllustrationKind = "retrieval" | "versions" | "drift" | "audit";

export type DmsProblemItem = {
  visual: DmsProblemIllustrationKind;
  category: string;
  title: string;
  quote: string;
  detail: string;
  metric: string;
  metricLabel: string;
};

/* one build step inside a scene: --i drives the animation delay. `pop` scales
 * in (key elements), `pulse` blinks twice after landing (status badges). */
function S({ i, pop, pulse, children }: { i: number; pop?: boolean; pulse?: boolean; children: ReactNode }) {
  return (
    <g
      className={"dsb-s" + (pop ? " dsb-pop" : "") + (pulse ? " dsb-pulse" : "")}
      style={{ "--i": i } as CSSProperties}
    >
      {children}
    </g>
  );
}

/* The scenes are drawn at 640x320 - close to 1:1 with the stage they render
 * on - so hairlines stay hairlines and type stays crisp. Shared vocabulary:
 * white cards with header strips, one blue key element per scene (with a
 * layered shadow offset), dashed connectors, pills and marks for state. */
export function DmsProblemIllustration({ kind }: { kind: DmsProblemIllustrationKind }) {
  return (
    <div className="dms-problem-visual" aria-hidden="true">
      {kind === "retrieval" ? (
        <svg viewBox="0 0 640 320" fill="none">
          <S i={0}>
            <rect className="dms-problem-diagram__node" x="56" y="30" width="156" height="96" rx="4" />
            <rect className="dms-problem-diagram__strip" x="56" y="30" width="156" height="26" rx="4" />
            <path className="dms-problem-diagram__hairline" d="M56 56h156" />
            <text className="dms-problem-diagram__label" x="70" y="48">Drive</text>
            <path className="dms-problem-diagram__line" d="M70 78h84M70 94h60" />
            <rect className="dms-problem-diagram__pill" x="140" y="101" width="58" height="17" rx="8.5" />
            <text className="dms-problem-diagram__pill-text" x="149" y="113">2 copies</text>
          </S>
          <S i={1}>
            <rect className="dms-problem-diagram__node" x="242" y="30" width="156" height="96" rx="4" />
            <rect className="dms-problem-diagram__strip" x="242" y="30" width="156" height="26" rx="4" />
            <path className="dms-problem-diagram__hairline" d="M242 56h156" />
            <text className="dms-problem-diagram__label" x="256" y="48">QMS</text>
            <path className="dms-problem-diagram__line" d="M256 78h84M256 94h60" />
            <rect className="dms-problem-diagram__pill" x="332" y="101" width="52" height="17" rx="8.5" />
            <text className="dms-problem-diagram__pill-text" x="341" y="113">1 copy</text>
          </S>
          <S i={2}>
            <rect className="dms-problem-diagram__node" x="428" y="30" width="156" height="96" rx="4" />
            <rect className="dms-problem-diagram__strip" x="428" y="30" width="156" height="26" rx="4" />
            <path className="dms-problem-diagram__hairline" d="M428 56h156" />
            <text className="dms-problem-diagram__label" x="442" y="48">Email</text>
            <path className="dms-problem-diagram__line" d="M442 78h84M442 94h60" />
            <rect className="dms-problem-diagram__pill" x="512" y="101" width="58" height="17" rx="8.5" />
            <text className="dms-problem-diagram__pill-text" x="521" y="113">2 copies</text>
          </S>
          <S i={3}>
            <path className="dms-problem-diagram__connector" d="M134 126v56M320 126v56M506 126v56M134 182h372M320 182v22" />
          </S>
          <S i={4} pop>
            <rect className="dms-problem-diagram__shadow" x="222" y="212" width="212" height="76" rx="4" />
            <rect className="dms-problem-diagram__node-key" x="214" y="204" width="212" height="76" rx="4" />
            <text className="dms-problem-diagram__text-on-key" x="232" y="234">SOP-118</text>
            <text className="dms-problem-diagram__meta-on-key" x="232" y="256">5 possible results</text>
          </S>
          <S i={5} pop>
            <circle className="dms-problem-diagram__key-line" cx="486" cy="242" r="26" />
            <path className="dms-problem-diagram__key-line" d="m504 262 20 20" />
          </S>
        </svg>
      ) : null}

      {kind === "versions" ? (
        <svg viewBox="0 0 640 320" fill="none">
          <S i={0}>
            <rect className="dms-problem-diagram__node-soft" x="66" y="132" width="210" height="140" rx="4" />
            <text className="dms-problem-diagram__label" x="82" y="156">v1</text>
            <path className="dms-problem-diagram__line-soft" d="M82 176h120M82 192h96" />
          </S>
          <S i={1}>
            <rect className="dms-problem-diagram__node" x="94" y="104" width="210" height="140" rx="4" />
            <text className="dms-problem-diagram__label" x="110" y="128">v2</text>
            <path className="dms-problem-diagram__line" d="M110 148h120M110 164h96" />
          </S>
          <S i={2} pop>
            <rect className="dms-problem-diagram__shadow" x="130" y="84" width="210" height="140" rx="4" />
            <rect className="dms-problem-diagram__node-key" x="122" y="76" width="210" height="140" rx="4" />
            <text className="dms-problem-diagram__text-on-key" x="138" y="102">SOP-118 · v3</text>
            <rect className="dms-problem-diagram__pill-on-key" x="138" y="114" width="78" height="18" rx="9" />
            <text className="dms-problem-diagram__meta-on-key" x="150" y="127">EFFECTIVE</text>
            <path className="dms-problem-diagram__line-on-key" d="M138 156h110M138 172h80" />
          </S>
          <S i={3}>
            <path className="dms-problem-diagram__connector" d="M344 158h56" />
            <path className="dms-problem-diagram__connector-arrow" d="m394 151 8 7-8 7" />
          </S>
          <S i={4}>
            <rect className="dms-problem-diagram__node" x="416" y="110" width="170" height="120" rx="4" />
            <rect className="dms-problem-diagram__strip" x="416" y="110" width="170" height="26" rx="4" />
            <path className="dms-problem-diagram__hairline" d="M416 136h170" />
            <text className="dms-problem-diagram__meta" x="428" y="127">POINT OF USE</text>
            <text className="dms-problem-diagram__label" x="428" y="160">Floor copy</text>
            <text className="dms-problem-diagram__meta" x="428" y="180">Printed from v1</text>
          </S>
          <S i={5} pulse>
            <rect className="dms-problem-diagram__badge" x="428" y="192" width="84" height="22" rx="11" />
            <text className="dms-problem-diagram__badge-text" x="445" y="207">? Current</text>
          </S>
        </svg>
      ) : null}

      {kind === "drift" ? (
        <svg viewBox="0 0 640 320" fill="none">
          <S i={0}>
            <rect className="dms-problem-diagram__node" x="70" y="54" width="210" height="200" rx="4" />
            <rect className="dms-problem-diagram__node-key" x="70" y="54" width="210" height="44" rx="4" />
            <text className="dms-problem-diagram__text-on-key" x="86" y="73">SOP-118</text>
            <text className="dms-problem-diagram__meta-on-key" x="86" y="89">REV C · EFFECTIVE 2021</text>
            <path className="dms-problem-diagram__line" d="M86 126h130M86 142h100M86 158h116M86 174h84" />
            <text className="dms-problem-diagram__meta" x="86" y="222">Last reviewed 2021</text>
          </S>
          <S i={1}>
            <path className="dms-problem-diagram__connector" d="M292 150h44" />
            <path className="dms-problem-diagram__connector-arrow" d="m328 143 8 7-8 7" />
          </S>
          <S i={2}>
            <rect className="dms-problem-diagram__node" x="360" y="54" width="210" height="200" rx="4" />
            <rect className="dms-problem-diagram__strip" x="360" y="54" width="210" height="26" rx="4" />
            <path className="dms-problem-diagram__hairline" d="M360 80h210" />
            <text className="dms-problem-diagram__meta" x="374" y="71">ACTUAL PROCESS</text>
            <path className="dms-problem-diagram__line" d="M376 106h116M376 146h104" />
            <path className="dms-problem-diagram__line" d="M394 127h94M394 167h80" />
            <text className="dms-problem-diagram__meta" x="376" y="206">Changed twice since</text>
          </S>
          <S i={3} pop>
            <rect className="dms-problem-diagram__mark" x="376" y="120" width="10" height="10" rx="2" />
            <rect className="dms-problem-diagram__mark" x="376" y="160" width="10" height="10" rx="2" />
          </S>
          <S i={4} pulse>
            <rect className="dms-problem-diagram__badge" x="376" y="220" width="110" height="22" rx="11" />
            <text className="dms-problem-diagram__badge-text" x="388" y="235">Review overdue</text>
          </S>
        </svg>
      ) : null}

      {kind === "audit" ? (
        <svg viewBox="0 0 640 320" fill="none">
          <S i={0}>
            <rect className="dms-problem-diagram__node" x="58" y="42" width="190" height="64" rx="4" />
            <text className="dms-problem-diagram__label" x="74" y="70">Revision history</text>
            <path className="dms-problem-diagram__line-soft" d="M74 86h100" />
          </S>
          <S i={1}>
            <rect className="dms-problem-diagram__node" x="58" y="128" width="190" height="64" rx="4" />
            <text className="dms-problem-diagram__label" x="74" y="156">Approvals</text>
            <path className="dms-problem-diagram__line-soft" d="M74 172h100" />
          </S>
          <S i={2}>
            <rect className="dms-problem-diagram__node" x="58" y="214" width="190" height="64" rx="4" />
            <text className="dms-problem-diagram__label" x="74" y="242">Training proof</text>
            <path className="dms-problem-diagram__line-soft" d="M74 258h100" />
          </S>
          <S i={3}>
            <path className="dms-problem-diagram__connector" d="M248 74h92v50h90M248 160h122v20h60M248 246h92v-10h90" />
          </S>
          <S i={4} pop>
            <rect className="dms-problem-diagram__shadow" x="438" y="44" width="170" height="248" rx="4" />
            <rect className="dms-problem-diagram__node" x="430" y="36" width="170" height="248" rx="4" />
            <rect className="dms-problem-diagram__node-key" x="430" y="36" width="170" height="40" rx="4" />
            <text className="dms-problem-diagram__text-on-key" x="446" y="61">Audit record</text>
          </S>
          <S i={5}>
            <text className="dms-problem-diagram__meta" x="446" y="98">MANUAL ASSEMBLY</text>
            <text className="dms-problem-diagram__meta" x="446" y="120">Revisions</text>
            <path className="dms-problem-diagram__line" d="M446 132h130" />
            <text className="dms-problem-diagram__meta" x="446" y="176">Approvals</text>
            <path className="dms-problem-diagram__line" d="M446 188h130" />
            <text className="dms-problem-diagram__meta" x="446" y="232">Training</text>
            <path className="dms-problem-diagram__line" d="M446 244h130" />
          </S>
          <S i={6} pulse>
            <rect className="dms-problem-diagram__badge" x="446" y="256" width="84" height="22" rx="11" />
            <text className="dms-problem-diagram__badge-text" x="464" y="271">2–3 days</text>
          </S>
        </svg>
      ) : null}
    </div>
  );
}

/* how long each symptom holds the stage during the auto tour */
const TOUR_MS = 4500;
const STACKED_MQ = "(max-width: 1100px)";

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export function DmsProblemSpotlight({ items }: { items: DmsProblemItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const autoRef = useRef<number | null>(null);
  const hoverRef = useRef(false);
  const [active, setActive] = useState(0);
  /* remount counter for the active panel's SVG - a bump replays the build */
  const [tick, setTick] = useState(0);
  const [run, setRun] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const [live, setLive] = useState<boolean[]>(() => items.map(() => false));

  const stopAuto = () => {
    if (autoRef.current !== null) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOk(true);

    /* stacked layout (no rail): each panel builds as it enters the view. */
    if (window.matchMedia(STACKED_MQ).matches) {
      const wake = (i: number) =>
        setLive((prev) => (prev[i] ? prev : prev.map((v, k) => (k === i ? true : v))));
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const i = panelRefs.current.indexOf(entry.target as HTMLElement);
            if (i >= 0) wake(i);
            io.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
      );
      panelRefs.current.forEach((n) => n && io.observe(n));
      /* fallback for environments where the observer never fires */
      const onScroll = () => {
        panelRefs.current.forEach((n, i) => {
          if (n && n.getBoundingClientRect().top < window.innerHeight * 0.88) wake(i);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
      };
    }

    /* rail layout: when the section is properly on screen (top above ~62% of
     * the viewport), build the first scene and start the tour. Hovering
     * holds the current symptom; choosing one ends the tour. */
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setRun(true);
      setTick((t) => t + 1);
      autoRef.current = window.setInterval(() => {
        if (hoverRef.current) return;
        setTick((t) => t + 1);
        setActive((a) => (a + 1) % items.length);
      }, TOUR_MS);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -38% 0px", threshold: 0.01 },
    );
    io.observe(el);
    /* fallback (same spirit as DmsMotion): trigger by measured position even
     * if the observer never fires. */
    const arrived = () => el.getBoundingClientRect().top < window.innerHeight * 0.62;
    const onScroll = () => {
      if (started) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      if (arrived()) start();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (arrived()) start();
    /* if the viewport later crosses into the stacked layout (rotation,
     * window resize), every panel becomes visible - build them all. */
    const mq = window.matchMedia(STACKED_MQ);
    const onMq = () => {
      if (mq.matches) setLive(items.map(() => true));
    };
    mq.addEventListener("change", onMq);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
      stopAuto();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (i: number) => {
    stopAuto();
    if (i !== active) setActive(i);
    setTick((t) => t + 1);
  };

  return (
    <div
      className={"dms-spot" + (motionOk ? " is-motion" : "") + (run ? " is-run" : "")}
      ref={ref}
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
    >
      {/* symptom ledger: same grammar as the module ledger (mono index,
       * dashed row rules); the open row reveals its quote and metric. */}
      <ul className="dms-spot__list" role="tablist" aria-orientation="vertical" aria-label="The four symptoms">
        {items.map((p, i) => (
          <li className="dms-spot__row" key={p.quote}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              className={"dms-spot__it" + (i === active ? " is-active" : "")}
              onClick={() => select(i)}
            >
              <span className="dms-spot__idx dms-data" aria-hidden="true">{pad(i + 1)}</span>
              <span className="dms-spot__meta">
                <span className="dms-spot__name">{p.title}</span>
                <span className="dms-spot__fold">
                  <span className="dms-spot__fold-in">
                    <span className="dms-spot__quote">“{p.quote}”</span>
                    <span className="dms-spot__metric">
                      <strong>{p.metric}</strong>
                      <span>{p.metricLabel}</span>
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* the stage carries only the visual; copy blocks render on the
       * stacked layout, where the ledger is hidden. */}
      <div className="dms-spot__stagewrap">
        {items.map((p, i) => (
          <article
            key={p.quote}
            className={
              "dms-spot__panel" + (i === active ? " is-active" : "") + (live[i] ? " is-live" : "")
            }
            ref={(n) => {
              panelRefs.current[i] = n;
            }}
          >
            <div className="dms-spot__scene" onClick={() => motionOk && select(i)}>
              {/* the key remounts the SVG so taking the stage replays the build */}
              <DmsProblemIllustration kind={p.visual} key={i === active ? `t${tick}` : "idle"} />
            </div>
            <div className="dms-spot__copy">
              <blockquote className="dms-spot__quote-m">“{p.quote}”</blockquote>
              <p className="dms-spot__detail">{p.detail}</p>
              <p className="dms-spot__metric dms-spot__metric--panel">
                <span>{p.metricLabel}</span>
                <strong>{p.metric}</strong>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
