"use client";

import { Tabs } from "@base-ui/react/tabs";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DmsCoordinationProblem } from "../dms/dms-data";

type ProblemKind = DmsCoordinationProblem["visual"];
type GraphicProps = { play: boolean; staticMode: boolean };

const sequence = {
  hidden: {},
  show: { transition: { delayChildren: 0.02, staggerChildren: 0.04 } },
} satisfies Variants;

const rise = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
} satisfies Variants;

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
} satisfies Variants;

const pop = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
} satisfies Variants;

function GraphicCanvas({
  children,
  label,
  play,
  staticMode,
}: GraphicProps & { children: ReactNode; label: string }) {
  return (
    <div className="dms-gfx qms-gfx" role="img" aria-label={label}>
      <motion.svg
        animate={staticMode ? undefined : play ? "show" : "hidden"}
        aria-hidden="true"
        initial={staticMode ? false : "hidden"}
        preserveAspectRatio="xMidYMid meet"
        variants={sequence}
        viewBox="0 0 720 480"
      >
        <rect className="dms-gfx__field" x="0" y="0" width="720" height="480" />
        {children}
      </motion.svg>
    </div>
  );
}

function OwnerNode({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g className="qms-gfx-owner" variants={rise}>
        <circle cx="0" cy="0" r="34" />
        <circle className="qms-gfx-owner__head" cx="0" cy="-8" r="7" />
        <path d="M-13 14c1-12 5-18 13-18s12 6 13 18" />
        <text x="0" y="56" textAnchor="middle">{label}</text>
      </motion.g>
    </g>
  );
}

function UnownedFindingGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas
      {...props}
      label="Conceptual illustration: a quality finding reaches a handoff but its paths stop before any accountable owner."
    >
      <motion.circle className="dms-gfx__halo" cx="430" cy="240" r="182" variants={pop} />

      <motion.path className="dms-gfx__route" d="M142 240H315" variants={fade} />
      <motion.path className="qms-gfx-route qms-gfx-route--broken" d="M373 228C433 176 476 135 526 121" variants={fade} />
      <motion.path className="qms-gfx-route qms-gfx-route--broken" d="M380 240H526" variants={fade} />
      <motion.path className="qms-gfx-route qms-gfx-route--broken" d="M373 252C433 304 476 345 526 359" variants={fade} />

      <motion.g className="dms-gfx-source" variants={rise}>
        <circle cx="110" cy="240" r="40" />
        <path d="M99 222h22l9 9v28H99zM121 222v9h9M106 242h17M106 250h12" />
        <text x="110" y="304" textAnchor="middle">FINDING</text>
      </motion.g>

      <motion.g className="qms-gfx-handoff" variants={pop}>
        <circle cx="350" cy="240" r="52" />
        <circle className="qms-gfx-handoff__core" cx="350" cy="240" r="25" />
        <text className="qms-gfx-handoff__question" x="350" y="249" textAnchor="middle">?</text>
        <text className="qms-gfx-handoff__label" x="350" y="315" textAnchor="middle">NEXT OWNER</text>
      </motion.g>

      <OwnerNode x={566} y={112} label="QUALITY" />
      <OwnerNode x={566} y={240} label="OPERATIONS" />
      <OwnerNode x={566} y={368} label="ENGINEERING" />

      <motion.g className="qms-gfx-clock" variants={pop}>
        <circle cx="657" cy="240" r="28" />
        <path d="M657 225v17l11 7" />
        <text x="657" y="286" textAnchor="middle">NO CLOCK</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function CapaGate({
  x,
  y,
  label,
  detail,
  missing = false,
}: {
  x: number;
  y: number;
  label: string;
  detail: string;
  missing?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        className={cn("qms-gfx-capa-gate", missing && "is-missing")}
        variants={rise}
      >
        <circle cx="0" cy="0" r="29" />
        {missing ? <path d="m-8-8 16 16M8-8-8 8" /> : <path d="m-9 0 6 6 13-14" />}
        <text className="qms-gfx-capa-gate__label" x="0" y="50" textAnchor="middle">{label}</text>
        <text className="qms-gfx-capa-gate__detail" x="0" y="66" textAnchor="middle">{detail}</text>
      </motion.g>
    </g>
  );
}

function UnprovenCapaGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas
      {...props}
      label="Conceptual illustration: the CAPA loop is stamped closed after root cause and actions, while the effectiveness gate remains open."
    >
      <motion.circle className="dms-gfx__halo" cx="360" cy="238" r="184" variants={pop} />
      <motion.path
        className="qms-gfx-loop qms-gfx-loop--base"
        d="M165 270C145 137 239 70 356 70C492 70 578 159 553 282C534 373 457 416 360 416C250 416 182 356 165 270Z"
        variants={fade}
      />
      <motion.path
        className="qms-gfx-loop qms-gfx-loop--live"
        d="M165 270C145 137 239 70 356 70C461 70 538 122 555 206"
        variants={fade}
      />

      <CapaGate x={183} y={176} label="ROOT CAUSE" detail="APPROVED" />
      <CapaGate x={360} y={91} label="ACTIONS" detail="IMPLEMENTED" />
      <CapaGate x={548} y={226} label="EFFECTIVENESS" detail="NOT CHECKED" missing />

      <motion.g className="qms-gfx-capa-gap" variants={fade}>
        <path d="M547 274C536 332 487 381 420 400" />
        <path d="M535 282h23M416 388l8 22" />
        <text x="520" y="353" textAnchor="middle">90-DAY WINDOW</text>
      </motion.g>

      <motion.g className="qms-gfx-capa-seal" variants={pop}>
        <circle cx="337" cy="257" r="88" />
        <circle cx="337" cy="257" r="72" />
        <text className="qms-gfx-capa-seal__eyebrow" x="337" y="232" textAnchor="middle">PAPERWORK</text>
        <text className="qms-gfx-capa-seal__title" x="337" y="270" textAnchor="middle">CLOSED</text>
        <text className="qms-gfx-capa-seal__meta" x="337" y="292" textAnchor="middle">FIX UNPROVEN</text>
      </motion.g>

      <motion.g className="qms-gfx-capa-reopen" variants={rise}>
        <path d="M219 369c37 35 86 48 136 43" />
        <path d="m339 399 18 13-16 15" />
        <text x="254" y="410" textAnchor="middle">REPEAT FAILURE</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function RepeatSignal({
  y,
  lot,
  delay,
}: {
  y: number;
  lot: string;
  delay: string;
}) {
  return (
    <motion.g className="qms-gfx-repeat" variants={rise}>
      <path className="qms-gfx-repeat__line" d={`M150 ${y}C248 ${y} 315 ${y - 18} 446 ${y}`} />
      <circle cx="208" cy={y} r="8" />
      <circle cx="326" cy={y - 10} r="8" />
      <circle className="qms-gfx-repeat__stop" cx="446" cy={y} r="13" />
      <text x="180" y={y - 18}>{lot}</text>
      <text className="qms-gfx-repeat__delay" x="404" y={y - 18}>{delay}</text>
    </motion.g>
  );
}

function SupplierRecurrenceGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas
      {...props}
      label="Conceptual illustration: three recurring supplier failures stop before the SCAR trail and are only gathered at the audit."
    >
      <motion.circle className="dms-gfx__halo" cx="390" cy="240" r="190" variants={pop} />

      <motion.g className="dms-gfx-source qms-gfx-factory" variants={rise}>
        <circle cx="102" cy="240" r="42" />
        <path d="M78 256v-27l16 8v-13l16 8v-13l17 9v28H78ZM87 244h8M104 244h8M120 244h4" />
        <text x="102" y="305" textAnchor="middle">SUPPLIER</text>
      </motion.g>

      <RepeatSignal y={145} lot="LOT 741" delay="FAIL" />
      <RepeatSignal y={240} lot="LOT 782" delay="FAIL" />
      <RepeatSignal y={335} lot="LOT 819" delay="FAIL" />

      <motion.g className="qms-gfx-scar-gap" variants={pop}>
        <path d="M488 102v276" />
        <rect x="456" y="205" width="64" height="70" />
        <text className="qms-gfx-scar-gap__title" x="488" y="233" textAnchor="middle">SCAR</text>
        <text className="qms-gfx-scar-gap__meta" x="488" y="253" textAnchor="middle">NO TRACE</text>
      </motion.g>

      <motion.path className="dms-gfx__route" d="M520 145C559 158 584 180 603 205M520 240H592M520 335C559 322 584 300 603 275" variants={fade} />

      <motion.g className="qms-gfx-audit-lens" variants={pop}>
        <circle cx="620" cy="240" r="72" />
        <circle cx="620" cy="240" r="52" />
        <path d="m670 291 34 34" />
        <text className="qms-gfx-audit-lens__title" x="620" y="235" textAnchor="middle">3×</text>
        <text className="qms-gfx-audit-lens__meta" x="620" y="256" textAnchor="middle">FOUND AT AUDIT</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function EvidenceFragment({
  x,
  y,
  rotate,
  label,
  missing = false,
}: {
  x: number;
  y: number;
  rotate: number;
  label: string;
  missing?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 65 45)`}>
      <motion.g className={cn("qms-gfx-evidence", missing && "is-missing")} variants={rise}>
        <rect width="130" height="90" rx="6" />
        <circle cx="25" cy="25" r="9" />
        {missing ? <path d="m20 20 10 10M30 20 20 30" /> : <path d="m20 25 3 3 7-8" />}
        <path className="qms-gfx-evidence__lines" d="M43 21h62M43 31h44M20 53h88M20 66h64" />
        <text x="20" y="81">{label}</text>
      </motion.g>
    </g>
  );
}

function ScatteredEvidenceGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas
      {...props}
      label="Conceptual illustration: an audit finding is marked closed while its response, action proof, signature, and effectiveness evidence remain scattered."
    >
      <motion.circle className="dms-gfx__halo" cx="360" cy="240" r="176" variants={pop} />
      <motion.path className="dms-gfx__route" d="M201 123C249 146 278 177 297 206M519 123C471 146 442 177 423 206M201 357C249 334 278 303 297 274M519 357C471 334 442 303 423 274" variants={fade} />

      <EvidenceFragment x={64} y={68} rotate={-6} label="RESPONSE" />
      <EvidenceFragment x={526} y={68} rotate={6} label="ACTION PROOF" />
      <EvidenceFragment x={64} y={322} rotate={5} label="SIGNATURE" />
      <EvidenceFragment x={526} y={322} rotate={-5} label="EFFECTIVENESS" missing />

      <motion.g className="qms-gfx-record-core" variants={pop}>
        <circle className="qms-gfx-record-core__shadow" cx="367" cy="247" r="106" />
        <circle cx="360" cy="240" r="106" />
        <path d="M360 164 416 186v46c0 36-24 69-56 81-32-12-56-45-56-81v-46l56-22Z" />
        <path className="qms-gfx-record-core__check" d="m334 236 18 18 36-40" />
        <text className="qms-gfx-record-core__eyebrow" x="360" y="345" textAnchor="middle">AUDIT FINDING</text>
        <text className="qms-gfx-record-core__title" x="360" y="371" textAnchor="middle">CLOSED?</text>
      </motion.g>

      <motion.g className="qms-gfx-missing-link" variants={fade}>
        <path d="M470 305 510 345" />
        <circle cx="490" cy="325" r="13" />
        <path d="m484 319 12 12M496 319l-12 12" />
      </motion.g>
    </GraphicCanvas>
  );
}

function ProblemGraphic({ kind, play, staticMode }: GraphicProps & { kind: ProblemKind }) {
  if (kind === "versions") return <UnprovenCapaGraphic play={play} staticMode={staticMode} />;
  if (kind === "drift") return <SupplierRecurrenceGraphic play={play} staticMode={staticMode} />;
  if (kind === "audit") return <ScatteredEvidenceGraphic play={play} staticMode={staticMode} />;
  return <UnownedFindingGraphic play={play} staticMode={staticMode} />;
}

const pad = (value: number) => String(value).padStart(2, "0");

export function QmsProblemSpotlight({ items }: { items: DmsCoordinationProblem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25, once: true });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<ProblemKind>(items[0]?.visual ?? "retrieval");
  const staticMode = Boolean(reducedMotion);
  const play = staticMode || inView;

  return (
    <Tabs.Root
      className="dms-spot"
      onValueChange={(value) => {
        if (typeof value === "string") setActive(value as ProblemKind);
      }}
      orientation="horizontal"
      ref={rootRef}
      value={active}
    >
      <Tabs.List activateOnFocus className="dms-spot__list" aria-label="Quality management failure modes">
        {items.map((problem, index) => (
          <Tabs.Tab
            className={cn("dms-spot__it", active === problem.visual && "is-active")}
            key={problem.visual}
            value={problem.visual}
          >
            <span className="dms-spot__idx" aria-hidden="true">{pad(index + 1)}</span>
            <span className="dms-spot__name">{problem.title}</span>
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <div className="dms-spot__stagewrap">
        {items.map((problem) => (
          <Tabs.Panel className="dms-spot__panel" key={problem.visual} value={problem.visual}>
            <div className="dms-spot__body">
              <div className="dms-spot__context">
                <span className="dms-spot__category">{problem.category}</span>
                <blockquote className="dms-spot__quote">
                  <span className="dms-spot__quote-mark" aria-hidden="true">“</span>
                  <p>{problem.quote}</p>
                </blockquote>
                <div className="dms-spot__fact">
                  <div className="dms-spot__metric">
                    <strong>{problem.metric}</strong>
                    <span>{problem.metricLabel}</span>
                  </div>
                  <p className="dms-spot__detail">{problem.detail}</p>
                </div>
              </div>
              <div className="dms-spot__scene">
                <ProblemGraphic kind={problem.visual} play={play && active === problem.visual} staticMode={staticMode} />
              </div>
            </div>
          </Tabs.Panel>
        ))}
      </div>
    </Tabs.Root>
  );
}
