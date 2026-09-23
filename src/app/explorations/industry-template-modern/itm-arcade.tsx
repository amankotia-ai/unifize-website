"use client";

/* ============================================================================
 * itm-arcade.tsx - the Medical Devices page's live product layer, mounted on
 * the shared stylized-arcade engine (products/_shared/arcade): ONE persistent
 * app window and a camera that moves between poses.
 *
 * The world is the page's own canonical story - change control CC-2148, the
 * sterilization SOP change (SOP-118 Rev C → D, PLM ECO-441) that the old
 * ChatShell thread played. Names and facts mirror that script: L. Martin
 * raises it, the impact assessment binds, R. Kapoor closes the
 * cross-functional review, P. Ramesh approves with a Part 11 e-signature,
 * and the record seals under 21 CFR 820.40.
 *
 * Two mounts:
 *   HeroArcade          - the hero product shot, cycling poses on a timer.
 *   DecisionTraceArcade - section B: the decision trail drives the camera.
 * All state degrades: without JS each mount renders its first pose.
 * ========================================================================== */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArcadeStepScene,
  type ArcadeFlowWorld,
  type ArcadeStepConfig,
} from "../products/_shared/arcade/arcade";
import { HeroArcade as SharedHeroArcade, type HeroArcadeStep } from "../products/_shared/arcade/hero-arcade";

/* ------------------------------------------------------------------ world */

/* CC-2148 as its owner lives it. Sections and items never change mid-journey;
 * steps only open sections and advance completion. */
const CHANGE_WORLD: ArcadeFlowWorld = {
  team: "Device Engineering",
  recordNoun: "Change Control",
  owner: "L. Martin",
  ownerInitials: "LM",
  participants: ["LM", "RK", "+3"],
  participantsLabel: "L. Martin, R. Kapoor, and three others",
  recordKicker: "CHANGE CONTROL",
  context: {
    initials: "LM",
    name: "L. Martin",
    time: "09:06",
    message: "Opened CC-2148 for the sterilization hold time.",
    detail: "Linked to SOP-118 Rev C · PLM ECO-441",
  },
  inboxNeighbors: [
    { title: "Sterilization of packaged sets", time: "10:40", detail: "SOP-118 · affected document", kind: "Document" },
    { title: "Risk file RA-067", time: "09:12", detail: "ISO 14971 · review in scope", kind: "Review" },
    { title: "Seal integrity CAPA", time: "Yesterday", detail: "CAPA-2140 · effectiveness check due", kind: "Quality event" },
  ],
  checklistTitle: "Change Control",
  checklistSections: [
    {
      title: "CHANGE REQUEST",
      items: [
        {
          label: "Reason for change",
          kind: "field",
          value: "Supplier material change · update sterilization hold time",
          note: "Entered on the request",
        },
        { label: "Affected document", note: "SOP-118 · Sterilization · Rev C" },
        { label: "Engineering change", note: "PLM ECO-441 · linked" },
      ],
    },
    {
      title: "IMPACT ASSESSMENT",
      items: [
        { label: "Risk file reviewed", note: "RA-067 · ISO 14971" },
        { label: "Document redline", kind: "revision", from: "Rev C · effective", to: "Rev D · draft" },
        { label: "Training impact", note: "Line 2 · 2 roles" },
      ],
    },
    {
      title: "APPROVAL & RELEASE",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "R. Kapoor", state: "Approved" },
        { label: "VP Quality · Part 11", kind: "approval", signer: "P. Ramesh", state: "Signed" },
        { label: "Audit trail", note: "Sealed · 21 CFR 820.40" },
      ],
    },
  ],
};

/* the same record as its approver sees it: rail avatar, "You", and the Part 11
 * dialog all follow the viewer */
const APPROVER_WORLD: ArcadeFlowWorld = {
  ...CHANGE_WORLD,
  viewer: "P. Ramesh",
  viewerInitials: "PR",
};

/* ------------------------------------------------- the decision trace
 * Five poses, one per step of "How the decision moves". The trail copy stays
 * the page's; the camera lands where that moment actually happens. */

export type TraceStep = {
  t: string;
  who: string;
  when: string;
  /* how close the focus camera comes to the step's highlighted moment
   * (the `.is-target` the step's config marks): 1 = the whole record */
  zoom: number;
  config: ArcadeStepConfig;
};

export const TRACE_STEPS: TraceStep[] = [
  {
    t: "Change raised",
    who: "Lisa Martin",
    when: "T+0",
    zoom: 1.45,
    config: {
      source: "ITM · CC-2148 · raise",
      ghost: "Raise",
      type: "Change Control",
      id: "CC-2148",
      title: "Sterilization SOP change",
      status: "Draft",
      actor: "You",
      event: "Raised the change from SOP-118",
      eventDetail: "Rationale captured on the record · affected documents scoped",
      checklist: "CHANGE REQUEST",
      checklistItems: ["Reason for change", "Affected document", "Engineering change"],
      focus: "print",
      focusTitle: "Change request",
      focusRows: ["Supplier material change", "SOP-118 · Rev C", "PLM ECO-441"],
      focusAction: "Submit for assessment",
      ownershipNote: "One record from the first decision",
      world: CHANGE_WORLD,
      checklistOpen: "CHANGE REQUEST",
      checklistEntry: { section: "CHANGE REQUEST", item: "Reason for change" },
      checklistProgress: { "CHANGE REQUEST": 2, "IMPACT ASSESSMENT": 0, "APPROVAL & RELEASE": 0 },
      checklistFootnote: "Affected documents scoped from SOP-118",
    },
  },
  {
    t: "Impact assessment bound",
    who: "Unifize",
    when: "T+0",
    zoom: 1.25,
    config: {
      source: "ITM · CC-2148 · bind",
      ghost: "Bind",
      type: "Change Control",
      id: "CC-2148",
      title: "Sterilization SOP change",
      status: "Open",
      actor: "automator",
      event: "Bound the impact assessment to the record",
      eventDetail: "Documents, risk and training scoped in one pass",
      checklist: "IMPACT ASSESSMENT",
      checklistItems: [
        "SOP-118 · Sterilization · Rev C → D",
        "Risk file RA-067 · ISO 14971",
        "Training impact · Line 2 · 2 roles",
      ],
      focus: "trace",
      focusTitle: "Impact assessment bound",
      focusRows: ["Everything the change touches", "3 records linked"],
      focusAction: "Open evidence chain",
      ownershipNote: "Scoped by rule, not by memory",
      world: CHANGE_WORLD,
      checklistOpen: "IMPACT ASSESSMENT",
      checklistProgress: { "IMPACT ASSESSMENT": 2, "APPROVAL & RELEASE": 0 },
      related: 3,
    },
  },
  {
    t: "Cross-functional review",
    who: "Rupa Kapoor",
    when: "T+5d",
    zoom: 1.3,
    config: {
      source: "ITM · CC-2148 · review",
      ghost: "Review",
      type: "Change Control",
      id: "CC-2148",
      title: "Sterilization SOP change",
      status: "In Review",
      actor: "Unifize Assistant",
      event: "Assembled the cross-functional review",
      eventDetail: "Engineering and Manufacturing on one thread · comment resolved inline",
      checklist: "APPROVAL & RELEASE",
      checklistItems: ["Cross-functional review", "VP Quality · Part 11", "Audit trail"],
      focus: "review",
      focusTitle: "Cross-functional review",
      focusRows: [
        "Engineering · Approved",
        "Manufacturing · Approved",
        "Hold-time comment · Resolved inline",
      ],
      focusAction: "Approve redline",
      focusAlts: ["Return with comment"],
      ownershipNote: "The redline stays on the record",
      world: CHANGE_WORLD,
      checklistOpen: "APPROVAL & RELEASE",
      checklistProgress: { "APPROVAL & RELEASE": 1 },
    },
  },
  {
    t: "Approved · Part 11 e-signature",
    who: "Priya Ramesh · VP",
    when: "T+9d",
    zoom: 1.15,
    config: {
      source: "ITM · CC-2148 · sign",
      ghost: "Sign",
      type: "Change Control",
      id: "CC-2148",
      title: "Sterilization SOP change",
      status: "Needs Approval",
      actor: "You",
      event: "Re-authenticated for regulated approval",
      eventDetail: "Signer, meaning and time seal to CC-2148",
      checklist: "APPROVAL & RELEASE",
      checklistItems: ["Cross-functional review", "VP Quality · Part 11", "Audit trail"],
      focus: "signature",
      focusTitle: "Apply your signature",
      focusRows: [],
      focusAction: "Confirm and sign",
      ownershipNote: "Identity re-verified · 21 CFR Part 11",
      world: APPROVER_WORLD,
      checklistOpen: "APPROVAL & RELEASE",
      checklistProgress: { "APPROVAL & RELEASE": 1 },
      signedItems: [
        { name: "R. Kapoor", initials: "RK", role: "Cross-functional review", approvalId: "4C21B2148A90", time: "T+5d" },
      ],
    },
  },
  {
    t: "Record sealed · 21 CFR 820.40",
    who: "Unifize",
    when: "T+9d",
    zoom: 1,
    config: {
      source: "ITM · CC-2148 · seal",
      ghost: "Seal",
      type: "Change Control",
      id: "CC-2148",
      title: "Sterilization SOP change",
      status: "Approved",
      actor: "automator",
      event: "Published Rev D and sealed the trace",
      eventDetail: "Rev C retired · training cascade complete · 21 CFR 820.40",
      checklist: "APPROVAL & RELEASE",
      checklistItems: ["Cross-functional review", "VP Quality · Part 11", "Audit trail"],
      focus: "history",
      focusKicker: "DECISION TRACE",
      focusTitle: "One sealed decision trace",
      focusRows: [
        "CC-2148 · Approved · trace sealed",
        "SOP-118 Rev D live · Rev C retired",
        "Training cascade · Line 2 · 14/14",
      ],
      ownershipNote: "Reconstructable at audit",
      world: CHANGE_WORLD,
      checklistOpen: "APPROVAL & RELEASE",
      signedItems: [
        { name: "P. Ramesh", initials: "PR", role: "VP Quality", approvalId: "9E77C2148D41", time: "Now" },
      ],
      related: 3,
    },
  },
];

/* ------------------------------------------------------------- mounts */

/* the shared token-bridge wrapper: aliases the page's --itm tokens onto the
 * --dms names the arcade engine styles against (see itm.css) */
export function ItmArcadeScene({
  config,
  className,
}: {
  config: ArcadeStepConfig;
  className?: string;
}) {
  return (
    <div className={"itm-arcade" + (className ? " " + className : "")}>
      <ArcadeStepScene config={config} />
    </div>
  );
}

/* respects reduced motion + only runs while the mount is on screen */
function useAutoAdvance(
  ref: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  periodMs: number,
  advance: () => void,
) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(advance, periodMs);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [ref, enabled, periodMs, advance]);
}

/* HERO - the product shot is the arcade itself, quietly walking the CC-2148
 * journey. Starts on the bound impact assessment (the strongest establishing
 * frame), then loops the story. Decorative: the hero stage is aria-hidden. */
const HERO_ORDER = [1, 2, 3, 4, 0];

export function HeroArcade() {
  const [frame, setFrame] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useAutoAdvance(ref, true, 4600, () => setFrame((f) => (f + 1) % HERO_ORDER.length));

  return (
    <div ref={ref} className="itm-hero__arcade">
      <ItmArcadeScene config={TRACE_STEPS[HERO_ORDER[frame]].config} />
    </div>
  );
}

/* HERO ON THE RAILS (23 Sep 2026) - the page's hero now opens like the
 * home, platform and DMS heroes: the shared hero arcade (one window on the
 * moving wash, a step rail of solid glyphs above it) walking the same
 * CC-2148 journey as the decision trail below. */
const MD_HERO_STEPS: HeroArcadeStep[] = [
  { label: "Raise it", icon: "build", config: TRACE_STEPS[0].config },
  { label: "Assess it", icon: "compare", config: TRACE_STEPS[1].config },
  { label: "Review it", icon: "route", config: TRACE_STEPS[2].config },
  { label: "Sign it", icon: "sign", config: TRACE_STEPS[3].config },
  { label: "Seal it", icon: "trust", config: TRACE_STEPS[4].config },
];

export function MdHeroArcade() {
  return <SharedHeroArcade steps={MD_HERO_STEPS} rail="top" />;
}

/* SECTION B - a pinned scroll story with a TIGHT trail: the whole block
 * (trail + arcade) pins while an invisible runway below it carries the
 * scroll; scroll progress maps directly to the active step, so the timeline
 * keeps its natural spacing and the camera still walks all five poses.
 * Clicking a step scrolls to its stretch of the runway. On stacked layouts
 * (≤1024px) there is no pin; the scene quietly auto-advances until the
 * reader takes over. */
const DESKTOP_PIN = "(min-width: 1025px)";

/* a regulation reference never breaks across lines ("Part 11", "21 CFR 820.40"),
 * and a separator dot stays on the line it closes */
const keepRefs = (t: string) =>
  t.replace(/\b(Part|CFR|\d+) (?=\d|CFR)/g, "$1\u00a0").replace(/ ·/g, "\u00a0·");

/* The focus camera (Abhishek, 23 Sep: "on each step we should have panning
 * and zoom in/out to focus on the most important bit of that step", the
 * switch "seamless, not a reload", then "snappy and crisp" with the key
 * visual placed well). ONE persistent scene: the record never remounts, its
 * checklist and thread update in place. Around it a camera finds the step's
 * highlighted moment (the `.is-target` its config marks) and glides once to
 * put it at the centre of the stage at the step's zoom.
 *  - One move, no correction: the aim runs before paint with the scene's
 *    layout transitions held (`is-aiming`), so it measures the FINAL layout.
 *  - Placement: the target is centred. A zoomed window may pull in from an
 *    edge by at most EDGE_GIVE of the stage, so the target never gets shoved
 *    to a side; a window that fits (zoom 1) is centred whole. */
type Cam = { x: number; y: number; s: number };
const EDGE_GIVE = 0.14;
const PAD = 28;
const LEGIBLE = 0.62;

function useFocusCamera(active: number, zoom: number) {
  const stageRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const [cam, setCam] = useState<Cam>({ x: 0, y: 0, s: 1 });

  useLayoutEffect(() => {
    const aim = () => {
      const stage = stageRef.current;
      const focus = focusRef.current;
      if (!stage || !focus) return;
      const desktop = !!window.matchMedia?.(DESKTOP_PIN).matches;
      /* stacked: fit the whole record (1070 x 560 at scale 1) to the stage */
      let fit = 1;
      if (!desktop) {
        const sr = stage.getBoundingClientRect();
        const inset = Math.min(24, sr.width * 0.05);
        fit = Math.min((sr.width - 2 * inset) / 1070, (sr.height - 2 * inset) / 560);
        stage.style.setProperty("--md-cam-fit", fit.toFixed(4));
      } else {
        stage.style.removeProperty("--md-cam-fit");
      }
      focus.classList.add("is-aiming");
      void focus.offsetHeight;
      /* where the camera is right now, mid-glide included */
      const tf = getComputedStyle(focus).transform;
      const m = new DOMMatrixReadOnly(tf === "none" ? undefined : tf);
      const now = { x: m.e, y: m.f, s: m.a || 1 };
      const f = focus.getBoundingClientRect();
      const ox = f.left - now.x;
      const oy = f.top - now.y;
      const toLocal = (r: DOMRect) => ({
        l: (r.left - f.left) / now.s,
        t: (r.top - f.top) / now.s,
        r: (r.right - f.left) / now.s,
        b: (r.bottom - f.top) / now.s,
      });
      const camEl = focus.querySelector<HTMLElement>(".stx-arc__camera");
      const conv = focus.querySelector<HTMLElement>(".stx-arc__conversation");
      const target = focus.querySelector<HTMLElement>(".stx-arc__camera .is-target");
      const st = stage.getBoundingClientRect();
      const cr = camEl?.getBoundingClientRect();
      const t = target ? toLocal(target.getBoundingClientRect()) : null;
      focus.classList.remove("is-aiming");
      /* stacked the whole record is small, so the camera comes closer: far
       * enough that the step's moment reads (LEGIBLE of real size), never so
       * far that the moment itself stops fitting the stage */
      let s = zoom;
      /* on a phone even the overview step leans in: the whole record at
       * that size is a thumbnail nobody can read */
      if (!desktop && t && (zoom > 1.001 || fit * zoom < LEGIBLE * 0.8)) {
        const room = Math.min((st.width * 0.92) / (t.r - t.l), (st.height * 0.9) / (t.b - t.t));
        s = Math.min(Math.max(zoom, LEGIBLE / fit), room, 3);
      }
      if (!cr || !t || s <= 1.001) {
        setCam({ x: 0, y: 0, s: 1 });
        return;
      }
      /* the visible window: the clipped camera starts at the conversation */
      const left = conv ? conv.getBoundingClientRect().left : cr.left;
      const win = toLocal(new DOMRect(left, cr.top, cr.right - left, cr.height));
      /* per axis: the target as near the centre as the window allows */
      const pad = Math.min(PAD, st.width * 0.05);
      const place = (lo: number, hi: number, tLo: number, tHi: number, sLo: number, sHi: number) => {
        const size = sHi - sLo;
        const PAD = pad;
        const span = s * (hi - lo);
        const centred = sLo + size / 2 - (s * (tLo + tHi)) / 2;
        if (span <= size - 2 * PAD) {
          /* fits with a margin: slide toward the target, the window whole */
          return Math.min(Math.max(centred, sLo + PAD - s * lo), sHi - PAD - s * hi);
        }
        if (span <= size) {
          /* only just fits: whole and centred, never cropped on one side */
          return sLo + size / 2 - (s * (lo + hi)) / 2;
        }
        /* bigger than the stage: an edge may come in by EDGE_GIVE, no more */
        const give = size * EDGE_GIVE;
        let pos = centred;
        if (pos + s * lo > sLo + give) pos = sLo + give - s * lo;
        if (pos + s * hi < sHi - give) pos = sHi - give - s * hi;
        return pos;
      };
      setCam({
        x: place(win.l, win.r, t.l, t.r, st.left - ox, st.right - ox),
        y: place(win.t, win.b, t.t, t.b, st.top - oy, st.bottom - oy),
        s,
      });
    };
    aim();
    window.addEventListener("resize", aim);
    return () => window.removeEventListener("resize", aim);
  }, [active, zoom]);

  return { stageRef, focusRef, cam };
}

export function DecisionTraceArcade() {
  const [active, setActive] = useState(0);
  const { stageRef, focusRef, cam } = useFocusCamera(active, TRACE_STEPS[active].zoom);
  const [engaged, setEngaged] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* mobile/stacked fallback only: the desktop pin is scroll-driven */
  useAutoAdvance(wrapRef, !engaged, 5200, () => {
    if (window.matchMedia?.(DESKTOP_PIN).matches) return;
    setActive((a) => (a + 1) % TRACE_STEPS.length);
  });

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap || !window.matchMedia?.(DESKTOP_PIN).matches) return;
      const inner = wrap.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const runway = wrap.offsetHeight - inner.offsetHeight;
      if (runway <= 0) return;
      const stickyTop = inner.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (wrap.getBoundingClientRect().top - stickyTop) / -runway));
      setActive(Math.min(TRACE_STEPS.length - 1, Math.floor(progress * TRACE_STEPS.length)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const select = (index: number) => {
    setEngaged(true);
    const wrap = wrapRef.current;
    const inner = wrap?.firstElementChild as HTMLElement | null;
    if (wrap && inner && window.matchMedia?.(DESKTOP_PIN).matches) {
      const runway = wrap.offsetHeight - inner.offsetHeight;
      if (runway > 0) {
        /* land in the middle of the step's stretch of the runway; the scroll
         * handler pans the camera through the steps on the way there */
        const stickyTop = parseFloat(getComputedStyle(inner).top) || 100;
        const wrapTopDoc = wrap.getBoundingClientRect().top + window.scrollY;
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
          top: wrapTopDoc - stickyTop + (runway * (index + 0.5)) / TRACE_STEPS.length,
          behavior: reduce ? "auto" : "smooth",
        });
        return;
      }
    }
    setActive(index);
    /* stacked, the visual sits above the steps: a tap on a lower step
     * brings it back into view so the move is seen */
    const stage = stageRef.current;
    if (stage) {
      const r = stage.getBoundingClientRect();
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--dms-header-h")) || 72;
      if (r.top < header || r.bottom > window.innerHeight) {
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: r.top + window.scrollY - header - 12, behavior: reduce ? "auto" : "smooth" });
      }
    }
  };

  return (
    <div ref={wrapRef} className="itm-tracepin">
      <div className="itm-tracepin__inner">
        <div className="itm-diff__grid itm-diff__grid--arcade">
          <aside className="itm-trail itm-trail--live" aria-label="How the decision moves">
            <div className="itm-trail__head">
              <span className="itm-trail__lab">How the decision moves</span>
              <span className="itm-trail__meter" aria-hidden="true">
                {TRACE_STEPS.map((step, i) => (
                  <i key={step.t} className={i <= active ? "is-on" : undefined} />
                ))}
              </span>
            </div>
            <ol className="itm-trail__steps">
              {TRACE_STEPS.map((step, i) => (
                <li
                  className={
                    "itm-trail__step" +
                    (i === active ? " is-active" : "") +
                    (i < active ? " is-past" : "") +
                    (i === TRACE_STEPS.length - 1 ? " is-sealed" : "")
                  }
                  key={step.t}
                >
                  <button
                    type="button"
                    className="itm-trail__btn"
                    aria-pressed={i === active}
                    aria-controls="itm-trace-stage"
                    onClick={() => select(i)}
                  >
                    <span className="itm-trail__node" aria-hidden="true" />
                    <span className="itm-trail__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className="itm-trail__body">
                      <span className="itm-trail__t">{keepRefs(step.t)}</span>
                      <span className="itm-trail__meta">
                        {step.who} <span className="itm-data">· {step.when}</span>
                      </span>
                    </span>
                    <span className="itm-trail__state" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
            <p className="itm-trail__foot">
              The same change, sealed as a 21 CFR Part 11 audit trail. The record is the trace.
            </p>
          </aside>

          <div ref={stageRef} className="itm-arcstage itm-arcstage--sticky" id="itm-trace-stage" aria-live="polite">
            <div
              ref={focusRef}
              className="itm-focus"
              style={{ transform: `translate3d(${cam.x}px, ${cam.y}px, 0) scale(${cam.s})` }}
            >
              <ItmArcadeScene config={TRACE_STEPS[active].config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
