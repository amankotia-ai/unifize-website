"use client";

import * as React from "react";

/* ============================================================
   ChatShell — Unifize chat app shell as a product visual.
   Animated: conversation builds, checklist evolves in lockstep,
   completion lands on "Closed Apr 27 · 24/24 governed".
   ============================================================ */

type Msg =
  | { kind: "day"; label: string }
  | { kind: "sys"; text: string }
  | {
      kind: "msg";
      initials: string;
      name: string;
      time: string;
      text: React.ReactNode;
    }
  | {
      kind: "bot";
      title: string;
      section: string;
      badge: string;
      items: { label: string; value: string }[];
    };

/* ------------------------------------------------------------
 * Scripts — the same shell can replay different records. Both scripts
 * MUST keep the same shape (8 entries; bot cards with 3 items at
 * indices 3 and 7; checklist section totals 4/6/3/5/4/2 = 24) so the
 * shared TIMELINE and scene math drive either one.
 *   capa            — the original CAPA-2148 thread (homepage default)
 *   change-control  — CC-2148, mirrors the 8-step flow on
 *                     /industries/<slug>/change-control (2026-06-05:
 *                     that page must stay one change-control story)
 * ------------------------------------------------------------ */
export type ChatVariant = "capa" | "change-control";

interface ChatScript {
  recordId: string;
  threadTitle: string;
  messages: Msg[];
  checkHead: string;
  checkTitle: string;
  /** six checklist section titles (totals stay 4/6/3/5/4/2) */
  secTitles: [string, string, string, string, string, string];
  /** the expanded section's five line items */
  expandedItems: { label: string; value: string }[];
}

const CAPA_SCRIPT: ChatScript = {
  recordId: "CAPA-2148",
  threadTitle: "Decision trace: assembly defect investigation",
  messages: [
    { kind: "day", label: "Apr 18" },
    {
      kind: "sys",
      text: "Lisa Martin opened CAPA-2148 · linked to NC-25, PLM ECO-441",
    },
    {
      kind: "msg",
      initials: "LM",
      name: "Lisa Martin",
      time: "T+0",
      text: "Signal opened: assembly defect detected in final inspection. Hold issued on the 12 affected units.",
    },
    {
      kind: "bot",
      title: "Evidence attached",
      section: "Inspection · torque logs · photos",
      badge: "BOUND",
      items: [
        { label: "Torque tool calibration log", value: "TT-204" },
        { label: "Inspection photos · 8 files", value: "62 KB" },
        { label: "Lot trace · incoming material", value: "LOT-271" },
      ],
    },
    {
      kind: "msg",
      initials: "RK",
      name: "Rupa Kapoor",
      time: "T+5d",
      text: "Cross-functional review complete. Traceability points to secondary supplier, likely contributing factor.",
    },
    { kind: "day", label: "Apr 27" },
    {
      kind: "msg",
      initials: "VQ",
      name: "Priya Ramesh · VP Quality",
      time: "T+9d",
      text: "Disposition committed: scrap the 12 units, retrain Line 2 operators, open SCAR with supplier.",
    },
    {
      kind: "bot",
      title: "Record updated",
      section: "QMS · CAPA-2148 · PLM · ECO-441",
      badge: "GOVERNED",
      items: [
        { label: "QMS · CAPA-2148 closed", value: "Effective" },
        { label: "PLM · ECO-441 linked", value: "Rev B" },
        { label: "Audit trail sealed", value: "21 CFR 820.30(i)" },
      ],
    },
  ],
  checkHead: "CAR-41 · Checklist",
  checkTitle: "Corrective action request",
  secTitles: [
    "Inputs",
    "Basic information",
    "Disposition action",
    "Corrective Action Request",
    "Verification & validation",
    "Approvals",
  ],
  expandedItems: [
    { label: "Update Process Control Plan", value: "Daniel" },
    { label: "Retrain Line 2 operators", value: "Lisa" },
    { label: "Supplier SCAR raised", value: "SC-104" },
    { label: "Revise inspection criteria", value: "Pending" },
    { label: "Incoming spec update", value: "Pending" },
  ],
};

/* Change control — Owner raises the change, cross-functional review,
 * Part 11 approval, publish + retire, training cascade, close out.
 * Roles per the change-control canon: Owner / reviewers / Approver. */
const CHANGE_CONTROL_SCRIPT: ChatScript = {
  recordId: "CC-2148",
  threadTitle: "Decision trace: sterilization SOP change",
  messages: [
    { kind: "day", label: "Apr 18" },
    {
      kind: "sys",
      text: "Lisa Martin opened CC-2148 · linked to SOP-118 Rev C, PLM ECO-441",
    },
    {
      kind: "msg",
      initials: "LM",
      name: "Lisa Martin",
      time: "T+0",
      text: "Change raised: update the sterilization hold time in SOP-118 after the supplier material change. Rationale captured; affected documents scoped.",
    },
    {
      kind: "bot",
      title: "Impact assessment bound",
      section: "Documents · risk · training scope",
      badge: "BOUND",
      items: [
        { label: "SOP-118 · Sterilization", value: "Rev C → D" },
        { label: "Risk file reviewed · ISO 14971", value: "RA-067" },
        { label: "Training impact · Line 2", value: "2 roles" },
      ],
    },
    {
      kind: "msg",
      initials: "RK",
      name: "Rupa Kapoor",
      time: "T+5d",
      text: "Cross-functional review complete. Engineering and Manufacturing approved the redline; the hold-time tolerance comment is resolved inline.",
    },
    { kind: "day", label: "Apr 27" },
    {
      kind: "msg",
      initials: "VQ",
      name: "Priya Ramesh · VP Quality",
      time: "T+9d",
      text: "Approved with Part 11 e-signature. Publish Rev D, retire Rev C, and trigger the training cascade for Line 2.",
    },
    {
      kind: "bot",
      title: "Record updated",
      section: "QMS · CC-2148 · PLM · ECO-441",
      badge: "GOVERNED",
      items: [
        { label: "SOP-118 Rev D live · Rev C retired", value: "Doc control" },
        { label: "Training cascade · Line 2", value: "14/14" },
        { label: "Audit trail sealed", value: "21 CFR 820.40" },
      ],
    },
  ],
  checkHead: "CC-2148 · Checklist",
  checkTitle: "Change control record",
  secTitles: [
    "Change request",
    "Impact assessment",
    "Document redline",
    "Training cascade",
    "Verification of change",
    "Approvals",
  ],
  expandedItems: [
    { label: "Update work instruction · WI-12", value: "Daniel" },
    { label: "Retrain Line 2 operators", value: "Lisa" },
    { label: "Quiz · revised hold time", value: "QZ-09" },
    { label: "Signed acknowledgements", value: "12/12" },
    { label: "Bind training records", value: "Pending" },
  ],
};

const SCRIPTS: Record<ChatVariant, ChatScript> = {
  capa: CAPA_SCRIPT,
  "change-control": CHANGE_CONTROL_SCRIPT,
};

type Scene = {
  visibleCount: number;
  evidenceChecked: number;
  recordChecked: number;
  inputsDone: number;
  basicDone: number;
  dispDone: number;
  carDone: number;
  verifDone: number;
  apprDone: number;
  carOpen: boolean;
};

const INITIAL: Scene = {
  visibleCount: 0,
  evidenceChecked: 0,
  recordChecked: 0,
  inputsDone: 0,
  basicDone: 0,
  dispDone: 0,
  carDone: 0,
  verifDone: 0,
  apprDone: 0,
  carOpen: false,
};

const FINAL: Scene = {
  // both scripts are 8 entries by contract (see ChatScript note above)
  visibleCount: CAPA_SCRIPT.messages.length,
  evidenceChecked: 3,
  recordChecked: 3,
  inputsDone: 4,
  basicDone: 6,
  dispDone: 3,
  carDone: 5,
  verifDone: 4,
  apprDone: 2,
  carOpen: true,
};

type Frame = { at: number; patch: Partial<Scene> };

function tickFrames<K extends keyof Scene>(
  startAt: number,
  key: K,
  from: number,
  to: number,
  gap = 90
): Frame[] {
  const out: Frame[] = [];
  for (let i = 0; i < to - from; i++) {
    out.push({
      at: startAt + i * gap,
      patch: { [key]: from + i + 1 } as unknown as Partial<Scene>,
    });
  }
  return out;
}

const TIMELINE: Frame[] = [
  { at: 500, patch: { visibleCount: 1 } }, // Day "Apr 18"
  { at: 900, patch: { visibleCount: 2 } }, // System: Lisa opened CAPA-2148
  { at: 1500, patch: { visibleCount: 3 } }, // Lisa's message
  ...tickFrames(2000, "inputsDone", 0, 4),
  ...tickFrames(2400, "basicDone", 0, 6),
  { at: 3100, patch: { visibleCount: 4 } }, // Bot card "Evidence attached"
  ...tickFrames(3400, "evidenceChecked", 0, 3, 180),
  ...tickFrames(4000, "dispDone", 0, 3),
  { at: 4600, patch: { visibleCount: 5 } }, // Rupa Kapoor message
  { at: 5100, patch: { carOpen: true } },
  ...tickFrames(5300, "carDone", 0, 3, 230),
  { at: 6300, patch: { visibleCount: 6 } }, // Day "Apr 27"
  { at: 6800, patch: { visibleCount: 7 } }, // Priya · VP Quality
  ...tickFrames(7400, "carDone", 3, 5, 230),
  ...tickFrames(8000, "verifDone", 0, 4),
  ...tickFrames(8400, "apprDone", 0, 2),
  { at: 9000, patch: { visibleCount: 8 } }, // Bot card "Record updated"
  ...tickFrames(9300, "recordChecked", 0, 3, 180),
];

const TIMELINE_END = TIMELINE.reduce((m, f) => Math.max(m, f.at), 0);
const TIMELINE_SORTED = [...TIMELINE].sort((a, b) => a.at - b.at);

/** Scene at a normalized scroll progress (0..1). Applies every timeline patch
 *  whose timestamp has been reached — the scrubbed equivalent of the auto-play
 *  timer, so the same conversation can be driven by a parent's scroll position. */
function sceneFromProgress(p: number): Scene {
  const t = (p < 0 ? 0 : p > 1 ? 1 : p) * TIMELINE_END;
  let s: Scene = INITIAL;
  for (const f of TIMELINE_SORTED) {
    if (f.at > t) break;
    s = { ...s, ...f.patch };
  }
  return s;
}

export interface ChatShellProps {
  /** When set (0..1), the conversation is scrubbed to this scroll progress
   *  instead of auto-playing on a timer. Omit for standalone auto-play. */
  progress?: number;
  /** Which record the shell replays. Defaults to the CAPA thread. */
  variant?: ChatVariant;
}

export function ChatShell({ progress, variant = "capa" }: ChatShellProps = {}) {
  const script = SCRIPTS[variant];
  const controlled = progress != null;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const [autoScene, setAutoScene] = React.useState<Scene>(INITIAL);
  const scene = controlled ? sceneFromProgress(progress) : autoScene;
  const [active, setActive] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (controlled) return; // scrubbed by parent scroll — no auto-fire
    const node = rootRef.current;
    if (!node) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      setActive(true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const onScroll = () => {
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Fire when at least ~20% of the chat sits inside the viewport
      const visiblePx =
        Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      if (visiblePx > Math.min(r.height, vh) * 0.2) fire();
    };

    // Initial check (handle the case where the shell is already in view)
    onScroll();
    if (fired) return;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [controlled]);

  React.useEffect(() => {
    if (controlled || !active) return;

    if (reducedMotion) {
      setAutoScene(FINAL);
      return;
    }

    let cancelled = false;
    const ids: number[] = [];

    for (const f of TIMELINE) {
      const id = window.setTimeout(() => {
        if (!cancelled) setAutoScene((s) => ({ ...s, ...f.patch }));
      }, f.at);
      ids.push(id);
    }

    return () => {
      cancelled = true;
      ids.forEach((id) => clearTimeout(id));
    };
  }, [active, reducedMotion, controlled]);

  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [
    scene.visibleCount,
    scene.evidenceChecked,
    scene.recordChecked,
    scene.carOpen,
    reducedMotion,
  ]);

  const total = 24;
  const checked =
    scene.inputsDone +
    scene.basicDone +
    scene.dispDone +
    scene.carDone +
    scene.verifDone +
    scene.apprDone;
  const progressPct = (checked / total) * 100;
  const isComplete = checked === total;

  // Scene keys keep their CAPA-era names (inputsDone, carDone …) — they're
  // internal counters; the customer-facing titles come from the script.
  const sections: Section[] = [
    sec(script.secTitles[0], scene.inputsDone, 4),
    sec(script.secTitles[1], scene.basicDone, 6),
    sec(script.secTitles[2], scene.dispDone, 3),
    {
      title: script.secTitles[3],
      state:
        scene.carDone === 5
          ? ("done" as const)
          : scene.carOpen || scene.carDone > 0
            ? ("active" as const)
            : ("pend" as const),
      n: scene.carDone,
      total: 5,
      open: scene.carOpen,
      items: script.expandedItems.map((it, i) => ({
        done: i < scene.carDone,
        label: it.label,
        value: it.value,
      })),
    },
    sec(script.secTitles[4], scene.verifDone, 4),
    sec(script.secTitles[5], scene.apprDone, 2),
  ];

  return (
    <div
      ref={rootRef}
      className={"cshell" + (isComplete ? " is-complete" : "")}
      role="img"
      aria-label="Unifize chat, accountable thread with decision trace"
    >
      <div className="cshell-top">
        <span className="cshell-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="cshell-frame-brand">
          <img src="/logo_dark.svg" alt="Unifize" />
        </span>
        <span className="cshell-live">
          <span className="cshell-live-dot" />
          Live
        </span>
      </div>

      <div className="cshell-body">
        {/* Nav rail */}
        <aside className="cshell-nav">
          <span className="cshell-nav-logo">U</span>
          <span className="cshell-nav-item" title="Home">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 8L9 3.5 15 8v6.5a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V8z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="cshell-nav-item is-on" title="Conversations">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 5a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H7l-4 3V5z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="cshell-nav-item" title="Documents">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M5 2.5h5.5L14 6v8.5a1 1 0 01-1 1H5a1 1 0 01-1-1v-11a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M10 2.5V6h4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          <span className="cshell-nav-item" title="Dashboard">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect
                x="3"
                y="3"
                width="5.5"
                height="5.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="9.5"
                y="3"
                width="5.5"
                height="5.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="3"
                y="9.5"
                width="5.5"
                height="5.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="9.5"
                y="9.5"
                width="5.5"
                height="5.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>
        </aside>

        {/* Thread (the conversation list column is intentionally omitted) */}
        <section className="cshell-thread">
          <div className="cshell-thread-head">
            <div className="cshell-id-row">
              <span className="cshell-badge cshell-badge-info">
                <span className="cshell-pulse" />
                GOVERNED
              </span>
              <span className="cshell-nc">{script.recordId}</span>
              <span className="cshell-nc cshell-nc-dim">·</span>
              <span className="cshell-nc">
                Opened Apr 18
                {isComplete ? " · Closed Apr 27" : ""}
              </span>
            </div>
            <h3 className="cshell-thread-title">
              {script.threadTitle}
            </h3>
            <div className="cshell-thread-meta">
              <div className="cshell-meta-chip">
                <span className="cshell-meta-k">Owner</span>
                <span className="cshell-meta-v">
                  <span className="cshell-av-sm">LM</span>
                  Lisa Martin
                </span>
              </div>
              <div className="cshell-meta-chip">
                <span className="cshell-meta-k">Participants</span>
                <span className="cshell-meta-v cshell-meta-stack">
                  <span className="cshell-av-sm">RK</span>
                  <span className="cshell-av-sm">DS</span>
                  <span className="cshell-av-sm">VQ</span>
                  <span className="cshell-av-sm cshell-av-more">+2</span>
                </span>
              </div>
              <div className="cshell-meta-chip">
                <span className="cshell-meta-k">Bound to</span>
                <span className="cshell-meta-v">QMS · PLM</span>
              </div>
            </div>
          </div>

          <div className="cshell-thread-body" ref={bodyRef}>
            <div className="cshell-thread-body-inner">
              {script.messages.slice(0, scene.visibleCount).map((m, i) => (
                <MessageRow
                  key={i}
                  m={m}
                  checkedItems={
                    i === 3
                      ? scene.evidenceChecked
                      : i === 7
                        ? scene.recordChecked
                        : m.kind === "bot"
                          ? m.items.length
                          : 0
                  }
                />
              ))}
            </div>
          </div>

          <div className="cshell-composer">
            <div className="cshell-composer-box">
              <span className="cshell-composer-input">
                Reply to {script.recordId}…
              </span>
              <div className="cshell-composer-tools">
                <span className="cshell-tool" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 7l-5 5a3 3 0 01-4-4l6-6a2 2 0 013 3l-6 6a1 1 0 01-1-1l5-5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="cshell-tool" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M10.5 8v1a1.8 1.8 0 003.5 0V8a6 6 0 10-2.5 4.8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="cshell-tool" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2l1.5 4L13 7.5 9.5 9 8 13 6.5 9 3 7.5 6.5 6z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="cshell-composer-spacer" />
                <span className="cshell-send">Send ↩</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right rail — checklist (audit-ready closure) */}
        <aside
          className={
            "cshell-check-rail" + (isComplete ? " is-complete" : "")
          }
        >
          <div className="cshell-check-head">
            <div className="cshell-eyebrow">
              <span>{script.checkHead}</span>
              <span className="cshell-eyebrow-ver">v4.2</span>
            </div>
            <h4 className="cshell-check-title">{script.checkTitle}</h4>
          </div>
          <div className="cshell-check-prog">
            <div className="cshell-check-prog-row">
              <span>Completion</span>
              <span className="cshell-check-frac" key={checked}>
                {checked}/{total}
              </span>
            </div>
            <div className="cshell-progbar">
              <div
                className="cshell-progbar-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <div className="cshell-check-body">
            {sections.map((s, i) => (
              <div
                className={"cshell-sec" + (s.open ? " is-open" : "")}
                key={i}
              >
                <div className="cshell-sec-head">
                  <span
                    className={"cshell-sec-dot cshell-sec-dot-" + s.state}
                  />
                  <span
                    className={
                      "cshell-sec-t" + (s.state === "done" ? " is-done" : "")
                    }
                  >
                    {s.title}
                  </span>
                  <span className="cshell-sec-frac">
                    {s.n}/{s.total}
                  </span>
                </div>
                {s.open && s.items && (
                  <div className="cshell-sec-items">
                    {s.items.map((it, j) => (
                      <div
                        className={
                          "cshell-sec-item" + (it.done ? " is-done" : "")
                        }
                        key={j}
                      >
                        <span
                          className="cshell-check"
                          data-on={it.done ? "1" : "0"}
                        />
                        <span className="cshell-sec-item-l">{it.label}</span>
                        <span className="cshell-sec-item-v">{it.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

type Section = {
  title: string;
  state: "done" | "active" | "pend";
  n: number;
  total: number;
  open?: boolean;
  items?: { done: boolean; label: string; value: string }[];
};

function sec(title: string, done: number, total: number): Section {
  const state: "done" | "active" | "pend" =
    done === 0 ? "pend" : done >= total ? "done" : "active";
  return { title, state, n: done, total };
}

function MessageRow({
  m,
  checkedItems,
}: {
  m: Msg;
  checkedItems: number;
}) {
  if (m.kind === "day") {
    return (
      <div className="cshell-day cshell-anim-enter">
        <span className="cshell-day-line" />
        <span className="cshell-day-label">{m.label}</span>
        <span className="cshell-day-line" />
      </div>
    );
  }
  if (m.kind === "sys") {
    return (
      <div className="cshell-sys cshell-anim-enter">· {m.text}</div>
    );
  }
  if (m.kind === "msg") {
    return (
      <div className="cshell-msg cshell-anim-enter">
        <div className="cshell-av">{m.initials}</div>
        <div className="cshell-msg-body">
          <div className="cshell-msg-name-row">
            <span className="cshell-msg-name">{m.name}</span>
            <span className="cshell-msg-time">{m.time}</span>
          </div>
          <div className="cshell-msg-text">{m.text}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="cshell-msg cshell-anim-enter">
      <div className="cshell-av cshell-av-bot">U</div>
      <div className="cshell-msg-body">
        <div className="cshell-msg-name-row">
          <span className="cshell-msg-name cshell-msg-name-bot">
            Unifize Assistant
          </span>
          <span className="cshell-msg-time">auto-trace</span>
        </div>
        <div className="cshell-bot-card">
          <div className="cshell-bot-head">
            <div>
              <div className="cshell-bot-t">{m.title}</div>
              <div className="cshell-bot-title">{m.section}</div>
            </div>
            <span className="cshell-badge cshell-badge-info">
              <span className="cshell-pulse" />
              {m.badge}
            </span>
          </div>
          <div className="cshell-bot-body">
            {m.items.slice(0, checkedItems).map((it, j) => (
              <div
                className="cshell-bot-row is-done cshell-anim-row"
                key={j}
              >
                <span className="cshell-check" data-on="1" />
                <span className="cshell-bot-k">{it.label}</span>
                <span className="cshell-bot-v">{it.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
