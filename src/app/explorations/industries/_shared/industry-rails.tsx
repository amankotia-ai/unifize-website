"use client";

/* ============================================================================
 * industry-rails.tsx - the one interactive piece of IndustryRailsPage (23 Sep
 * 2026): section 01's decision trail on the rails.
 *
 * The Medical Devices page drives a full arcade record with its trail. The
 * other industries have no arcade world of their own, and the shared chat
 * shell is scripted in device language, so here the trail drives a thread
 * built only from the industry's own trail data: each step lands on the
 * record as an event, who and when, the active one on the blue wash, the
 * last one sealing it. Same trail cell and wash stage as MD (md-rails.css
 * `.md-diff`); the thread card is industry-rails.css.
 * ========================================================================== */
import { useEffect, useRef, useState } from "react";

type Step = { t: string; who: string; when: string };

/* a regulation reference never breaks across lines */
const keepRefs = (t: string) =>
  t.replace(/\b(Part|CFR|\d+) (?=\d|CFR)/g, "$1 ").replace(/ ·/g, " ·");

export function TraceThread({
  label,
  steps,
  foot,
  kicker,
  title,
}: {
  label: string;
  steps: Step[];
  foot: string;
  kicker: string;
  title: string;
}) {
  const [active, setActive] = useState(steps.length - 1);
  const [engaged, setEngaged] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  /* walks itself until the reader takes over; paused off screen */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || engaged) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = () => {
      if (timer) return;
      timer = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 2600);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.35 });
    io.observe(root);
    return () => {
      io.disconnect();
      stop();
    };
  }, [engaged, steps.length]);

  const last = steps.length - 1;
  const sealed = active === last;

  return (
    <div ref={rootRef} className="itm-diff__grid itm-diff__grid--arcade">
      <aside className="itm-trail itm-trail--live" aria-label={label}>
        <div className="itm-trail__head">
          <span className="itm-trail__lab">{label}</span>
          <span className="itm-trail__meter" aria-hidden="true">
            {steps.map((s, i) => (
              <i key={s.t} className={i <= active ? "is-on" : undefined} />
            ))}
          </span>
        </div>
        <ol className="itm-trail__steps">
          {steps.map((s, i) => (
            <li
              key={s.t}
              className={
                "itm-trail__step" +
                (i === active ? " is-active" : "") +
                (i < active ? " is-past" : "") +
                (i === last ? " is-sealed" : "")
              }
            >
              <button
                type="button"
                className="itm-trail__btn"
                aria-pressed={i === active}
                onClick={() => {
                  setEngaged(true);
                  setActive(i);
                }}
              >
                <span className="itm-trail__node" aria-hidden="true" />
                <span className="itm-trail__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="itm-trail__body">
                  <span className="itm-trail__t">{keepRefs(s.t)}</span>
                  <span className="itm-trail__meta">
                    {s.who} <span className="itm-data">· {s.when}</span>
                  </span>
                </span>
                <span className="itm-trail__state" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
        <p className="itm-trail__foot">{foot}</p>
      </aside>

      <div className="itm-arcstage" aria-live="polite">
        <article className="irt-thread">
          <header className="irt-thread__head">
            <span className="irt-thread__kicker">{kicker}</span>
            <span className={"irt-thread__state" + (sealed ? " is-sealed" : "")}>
              <i />
              {sealed ? "Sealed" : "Open"}
            </span>
          </header>
          <h3 className="irt-thread__title">{title}</h3>
          <ol className="irt-thread__events">
            {steps.map((s, i) => (
              <li
                key={s.t}
                className={
                  "irt-ev" + (i === active ? " is-active" : "") + (i < active ? " is-past" : "") + (i > active ? " is-next" : "")
                }
              >
                <span className="irt-ev__node" aria-hidden="true">
                  {i <= active ? (
                    <svg viewBox="0 0 16 16">
                      <path d="M3.5 8.4 6.6 11.4 12.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
                <span className="irt-ev__body">
                  <b>{keepRefs(s.t)}</b>
                  <small>
                    {s.who} · {s.when}
                  </small>
                </span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </div>
  );
}
