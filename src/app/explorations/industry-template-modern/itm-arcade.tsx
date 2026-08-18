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

import { useEffect, useRef, useState } from "react";
import {
  ArcadeStepScene,
  type ArcadeFlowWorld,
  type ArcadeStepConfig,
} from "../products/_shared/arcade/arcade";

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
  config: ArcadeStepConfig;
};

export const TRACE_STEPS: TraceStep[] = [
  {
    t: "Change raised",
    who: "Lisa Martin",
    when: "T+0",
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

/* SECTION B - a pinned scroll story with a TIGHT trail: the whole block
 * (trail + arcade) pins while an invisible runway below it carries the
 * scroll; scroll progress maps directly to the active step, so the timeline
 * keeps its natural spacing and the camera still walks all five poses.
 * Clicking a step scrolls to its stretch of the runway. On stacked layouts
 * (≤1024px) there is no pin; the scene quietly auto-advances until the
 * reader takes over. */
const DESKTOP_PIN = "(min-width: 1025px)";

export function DecisionTraceArcade() {
  const [active, setActive] = useState(0);
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
  };

  return (
    <div ref={wrapRef} className="itm-tracepin">
      <div className="itm-tracepin__inner">
        <div className="itm-diff__grid itm-diff__grid--arcade">
          <aside className="itm-trail itm-trail--live" aria-label="How the decision moves">
            <span className="itm-trail__lab">How the decision moves</span>
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
                    <span className="itm-trail__t">{step.t}</span>
                    <span className="itm-trail__meta">
                      {step.who} <span className="itm-data">· {step.when}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="itm-trail__foot">
              The same change, sealed as a 21 CFR Part 11 audit trail. The record is the trace.
            </p>
          </aside>

          <div className="itm-arcstage itm-arcstage--sticky" id="itm-trace-stage" aria-live="polite">
            <ItmArcadeScene config={TRACE_STEPS[active].config} />
          </div>
        </div>
      </div>
    </div>
  );
}
