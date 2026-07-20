"use client";

/* ============================================================================
 * mes-problem-visuals.tsx - the MES problem spotlight. Same composition and
 * ILLUSTRATION language as the DMS spotlight (dms-problem-visuals.tsx): line-
 * work SVG scenes on the shared `.dms-gfx*` vocabulary (dms-redesign.css),
 * staggered in with motion. One scene per failure mode:
 *   retrieval - paper travellers transcribed days later into the batch record
 *   versions  - the run drifts on undetected; the failure surfaces at final
 *   drift     - a recall traced by hand through paper; one lot has no trail
 *   audit     - a deviation noted in a traveller margin that never lands
 * ========================================================================== */

import { Tabs } from "@base-ui/react/tabs";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DmsCoordinationProblem } from "../dms/dms-data";

type ProblemKind = DmsCoordinationProblem["visual"];

type GraphicProps = {
  play: boolean;
  staticMode: boolean;
};

const graphicSequence = {
  hidden: {},
  show: { transition: { delayChildren: 0.02, staggerChildren: 0.04 } },
} satisfies Variants;

const graphicItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
} satisfies Variants;

const graphicFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
} satisfies Variants;

const graphicPop = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
} satisfies Variants;

const graphicDraw = {
  hidden: { opacity: 0, pathLength: 0 },
  show: { opacity: 1, pathLength: 1, transition: { duration: 0.18, ease: "easeOut" } },
} satisfies Variants;

function GraphicCanvas({
  children,
  play,
  staticMode,
}: GraphicProps & { children: ReactNode }) {
  return (
    <div className="dms-gfx" aria-hidden="true">
      <motion.svg
        animate={staticMode ? undefined : play ? "show" : "hidden"}
        initial={staticMode ? false : "hidden"}
        preserveAspectRatio="xMidYMid meet"
        variants={graphicSequence}
        viewBox="0 0 720 480"
      >
        <rect className="dms-gfx__field" x="0" y="0" width="720" height="480" />
        {children}
      </motion.svg>
    </div>
  );
}

/* Paper travellers scattered on the floor, transcribed days later into the
 * batch record; the gap only surfaces once the dossier is assembled. */
function RecordRebuiltGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="524" cy="240" r="150" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M186 126C270 152 330 178 428 206" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M218 242C300 241 350 240 428 240" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M186 362C270 338 330 312 428 274" variants={graphicDraw} />

      <g transform="translate(100 76) rotate(-5 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">OP 10 · DONE</text>
        </motion.g>
      </g>
      <g transform="translate(136 196) rotate(3 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">OP 20 · DONE</text>
        </motion.g>
      </g>
      <g transform="translate(100 318) rotate(-4 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h33" />
          <rect className="dms-gfx-dossier__missing" x="8" y="56" width="60" height="22" rx="4" />
          <text className="dms-gfx-dossier__missing-label" x="38" y="70" textAnchor="middle">NO INITIALS</text>
        </motion.g>
      </g>

      <motion.path className="dms-gfx-drift__measure" d="M300 100h116M300 95v10M416 95v10" variants={graphicDraw} />
      <motion.text className="dms-gfx-drift__measure-label" x="302" y="86" variants={graphicFade}>TRANSCRIBED DAYS LATER</motion.text>

      <motion.g className="dms-gfx-dossier" variants={graphicPop}>
        <rect className="dms-gfx-dossier__shadow" x="444" y="113" width="190" height="266" rx="8" />
        <rect x="436" y="105" width="190" height="266" rx="8" />
        <rect className="dms-gfx-dossier__spine" x="436" y="105" width="28" height="266" rx="8" />
        <text className="dms-gfx-dossier__eyebrow" x="488" y="149">AFTER THE RUN</text>
        <text className="dms-gfx-dossier__title" x="488" y="188">BATCH RECORD</text>
        <path d="M489 219h97M489 241h76M489 263h91" />
        <rect className="dms-gfx-dossier__missing" x="488" y="296" width="112" height="38" rx="6" />
        <text className="dms-gfx-dossier__missing-label" x="544" y="319" textAnchor="middle">OP 30 · NO SIGNATURE</text>
      </motion.g>
    </GraphicCanvas>
  );
}

/* The run drifts away from the checked plan mid-line; nothing on the line
 * catches it, so the failure surfaces only at final inspection. */
function HoldAtFinalGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.path className="dms-gfx-drift__gap" d="M305 220H620V281C480 265 400 252 305 231Z" variants={graphicFade} />

      <motion.path className="dms-gfx-drift__document" d="M115 220H620" variants={graphicDraw} />
      <motion.path className="dms-gfx-drift__process" d="M115 220C200 220 250 220 315 234C400 254 470 266 620 282" variants={graphicDraw} />

      <motion.g className="dms-gfx-drift__origin" variants={graphicPop}>
        <circle cx="115" cy="220" r="40" />
        <path d="M102 200h21l8 8v32h-29zM123 200v8h8M109 219h15M109 228h15" />
        <text x="115" y="282" textAnchor="middle">WO-3391</text>
        <text x="115" y="297" textAnchor="middle">RELEASED</text>
      </motion.g>

      <motion.g className="dms-gfx-drift__node" variants={graphicItem}>
        <circle cx="315" cy="234" r="16" />
        <text x="315" y="276" textAnchor="middle">OP 30 · FAILURE BEGINS</text>
      </motion.g>
      <motion.g className="dms-gfx-drift__node" variants={graphicItem}>
        <circle cx="466" cy="261" r="16" />
        <text x="466" y="302" textAnchor="middle">VALUE STILL ADDED</text>
      </motion.g>
      <motion.g className="dms-gfx-drift__node dms-gfx-drift__node--end" variants={graphicPop}>
        <circle cx="620" cy="282" r="26" />
        <text x="620" y="338" textAnchor="middle">CAUGHT AT FINAL</text>
      </motion.g>

      <motion.g className="dms-gfx-drift__frozen" variants={graphicItem}>
        <circle cx="620" cy="188" r="26" />
        <path d="m609 177 22 22M631 177l-22 22" />
        <text x="620" y="141" textAnchor="middle">NO CHECK</text>
        <text x="620" y="156" textAnchor="middle">ON THE LINE</text>
      </motion.g>

      <motion.path className="dms-gfx-drift__measure" d="M355 220v26M348 220h14M348 246h14" variants={graphicDraw} />
      <motion.text className="dms-gfx-drift__measure-label" x="369" y="238" variants={graphicFade}>UNDETECTED</motion.text>
    </GraphicCanvas>
  );
}

/* The recall traced by hand: the lens hunts through floor, warehouse, and
 * filing room; two travellers turn up, one lot has no trail at all. */
function LotTraceGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="500" cy="240" r="154" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M144 112C244 112 331 151 421 205" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M144 240C252 240 333 240 407 240" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M144 368C244 368 331 330 421 275" variants={graphicDraw} />

      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="112" r="32" />
        <path d="M97 124v-9l6-4v4l6-4v4l8-5v14H97zM101 120h3M107 120h3" />
        <text x="110" y="160" textAnchor="middle">FLOOR</text>
      </motion.g>
      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="240" r="32" />
        <path d="M98 232h24v17H98zM98 232l4-6h16l4 6M110 232v17" />
        <text x="110" y="288" textAnchor="middle">WAREHOUSE</text>
      </motion.g>
      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="368" r="32" />
        <path d="M97 358h10l3 4h13v16H97zM97 366h26" />
        <text x="110" y="416" textAnchor="middle">FILING ROOM</text>
      </motion.g>

      <g transform="translate(235 73) rotate(-5 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">LOT-2266 ✓</text>
        </motion.g>
      </g>
      <g transform="translate(230 312) rotate(-4 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">LOT-2274 ✓</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-question" variants={graphicPop}>
        <circle cx="304" cy="240" r="44" />
        <text x="304" y="256" textAnchor="middle">?</text>
        <text className="dms-gfx-question__label" x="304" y="305" textAnchor="middle">LOT-2271 · NO TRAIL</text>
      </motion.g>

      <motion.g className="dms-gfx-lens" variants={graphicPop}>
        <circle cx="500" cy="240" r="88" />
        <path d="m562 302 50 50" />
        <rect x="438" y="206" width="124" height="68" rx="6" />
        <text x="500" y="235" textAnchor="middle">TRACE RESIN R-88</text>
        <text x="500" y="255" textAnchor="middle">GENEALOGY INCOMPLETE</text>
      </motion.g>
    </GraphicCanvas>
  );
}

/* The operator's note in the traveller margin: it never becomes a record, so
 * the quality queue stays empty while the failure repeats. */
function DeviationLostGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="560" cy="240" r="130" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M302 240C360 240 420 240 512 240" variants={graphicDraw} />

      <g transform="translate(112 118) rotate(-3 90 119)">
        <motion.g className="dms-gfx-version dms-gfx-version--mid" variants={graphicFade}>
          <rect width="180" height="238" rx="8" />
          <text className="dms-gfx-version__eyebrow" x="20" y="34">TRAVELLER · OP 30</text>
          <text className="dms-gfx-version__number" x="20" y="94">SHIFT 2</text>
          <path d="M21 122h99M21 141h129" />
          <rect className="dms-gfx-dossier__missing" x="20" y="162" width="140" height="40" rx="6" />
          <text className="dms-gfx-dossier__missing-label" x="90" y="186" textAnchor="middle">"TORQUE DRIFTING?"</text>
          <text className="dms-gfx-version__state" x="20" y="226">NOTED IN THE MARGIN</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-drift__frozen" variants={graphicPop}>
        <circle cx="404" cy="240" r="26" />
        <path d="m393 229 22 22M415 229l-22 22" />
        <text x="404" y="186" textAnchor="middle">NEVER</text>
        <text x="404" y="201" textAnchor="middle">RAISED</text>
      </motion.g>

      <motion.g className="dms-gfx-drift__origin" variants={graphicPop}>
        <circle cx="560" cy="240" r="40" />
        <path d="M544 232v17h32v-17M544 240h10l5 5h6l5-5h6" />
        <text x="560" y="302" textAnchor="middle">QUALITY QUEUE</text>
        <text x="560" y="317" textAnchor="middle">SHIFT 2 · 00 OPEN</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function ProblemGraphic({ kind, play, staticMode }: GraphicProps & { kind: ProblemKind }) {
  if (kind === "versions") return <HoldAtFinalGraphic play={play} staticMode={staticMode} />;
  if (kind === "drift") return <LotTraceGraphic play={play} staticMode={staticMode} />;
  if (kind === "audit") return <DeviationLostGraphic play={play} staticMode={staticMode} />;
  return <RecordRebuiltGraphic play={play} staticMode={staticMode} />;
}

const pad = (value: number) => String(value).padStart(2, "0");

export function MesProblemSpotlight({ items }: { items: DmsCoordinationProblem[] }) {
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
      <Tabs.List activateOnFocus className="dms-spot__list" aria-label="Manufacturing execution failure modes">
        {items.map((problem, index) => {
          const selected = active === problem.visual;
          return (
            <Tabs.Tab
              className={cn("dms-spot__it", selected && "is-active")}
              key={problem.visual}
              value={problem.visual}
            >
              <span className="dms-spot__idx" aria-hidden="true">{pad(index + 1)}</span>
              <span className="dms-spot__name">{problem.title}</span>
            </Tabs.Tab>
          );
        })}
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
                <ProblemGraphic
                  kind={problem.visual}
                  play={play && active === problem.visual}
                  staticMode={staticMode}
                />
              </div>
            </div>
          </Tabs.Panel>
        ))}
      </div>
    </Tabs.Root>
  );
}
