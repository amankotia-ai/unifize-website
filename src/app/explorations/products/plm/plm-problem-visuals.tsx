"use client";

/* ============================================================================
 * plm-problem-visuals.tsx - the PLM problem spotlight. Same composition and
 * ILLUSTRATION language as the DMS spotlight (dms-problem-visuals.tsx): line-
 * work SVG scenes on the shared `.dms-gfx*` vocabulary (dms-redesign.css),
 * staggered in with motion. One scene per failure mode:
 *   retrieval - the trace scattered across tools; the lens finds no chain
 *   versions  - an ECO whose blast radius is a question mark
 *   drift     - a requirement severed from the test that would close it
 *   audit     - an FMEA score that never reaches the control plan
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

/* The trace scattered across tools: requirements, CAD, and the test rig each
 * hold a piece; the lens goes looking for the chain and cannot assemble it. */
function TraceGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="500" cy="240" r="154" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M144 112C244 112 331 151 421 205" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M144 240C252 240 333 240 407 240" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M144 368C244 368 331 330 421 275" variants={graphicDraw} />

      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="112" r="32" />
        <path d="M99 100h17l7 7v18H99zM116 100v7h7" />
        <text x="110" y="160" textAnchor="middle">REQS</text>
      </motion.g>
      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="240" r="32" />
        <path d="M99 228h17l7 7v18H99zM116 228v7h7" />
        <text x="110" y="288" textAnchor="middle">CAD</text>
      </motion.g>
      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="368" r="32" />
        <path d="m97 360 13 10 13-10M97 360h26v19H97z" />
        <text x="110" y="416" textAnchor="middle">TEST RIG</text>
      </motion.g>

      <g transform="translate(235 73) rotate(-5 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">DI-07 INPUT</text>
        </motion.g>
      </g>
      <g transform="translate(270 192) rotate(3 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">DO-14 OUTPUT</text>
        </motion.g>
      </g>
      <g transform="translate(230 312) rotate(-4 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">VT-24 RESULT</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-lens" variants={graphicPop}>
        <circle cx="500" cy="240" r="88" />
        <path d="m562 302 50 50" />
        <rect x="438" y="206" width="124" height="68" rx="6" />
        <text x="500" y="235" textAnchor="middle">TRACE FOR DI-07</text>
        <text x="500" y="255" textAnchor="middle">CHAIN INCOMPLETE</text>
      </motion.g>
    </GraphicCanvas>
  );
}

/* The engineering change with an unknown blast radius: one relation is on the
 * record, the rest of what it touches is a question mark. */
function BlastRadiusGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="545" cy="300" r="128" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M300 170C365 140 405 112 468 98" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M300 225C375 240 425 262 484 284" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M300 260C370 300 415 330 478 344" variants={graphicDraw} />

      <g transform="translate(110 116)">
        <motion.g className="dms-gfx-version dms-gfx-version--key" variants={graphicPop}>
          <rect width="180" height="238" rx="8" />
          <text className="dms-gfx-version__eyebrow" x="20" y="34">ENGINEERING CHANGE</text>
          <text className="dms-gfx-version__number" x="20" y="94">ECO-441</text>
          <path d="M21 122h99M21 141h129M21 160h89" />
          <rect className="dms-gfx-version__stamp" x="20" y="180" width="94" height="23" rx="11" />
          <text className="dms-gfx-version__state" x="67" y="196" textAnchor="middle">IN APPROVAL</text>
          <text className="dms-gfx-version__state" x="20" y="222">WALL 2.4 → 2.2 MM</text>
        </motion.g>
      </g>

      <g transform="translate(455 52) rotate(4 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">SPEC-4471</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-question" variants={graphicPop}>
        <circle cx="545" cy="300" r="54" />
        <text x="545" y="319" textAnchor="middle">?</text>
        <text className="dms-gfx-question__label" x="545" y="382" textAnchor="middle">PFMEA · CONTROL PLAN</text>
        <text className="dms-gfx-question__label" x="545" y="397" textAnchor="middle">WHAT ELSE IT TOUCHES</text>
      </motion.g>
    </GraphicCanvas>
  );
}

/* The requirement severed from its proof: the results exist on the right, but
 * nothing points back, so the requirement never closes. */
function UnverifiedGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="345" cy="240" r="110" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M162 198C222 172 262 192 314 226" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M164 214C224 216 262 226 312 238" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M162 230C222 258 262 276 314 254" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M480 122C444 152 414 184 376 222" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M480 358C444 328 414 296 376 258" variants={graphicDraw} />

      <motion.g className="dms-gfx-drift__origin" variants={graphicPop}>
        <circle cx="115" cy="214" r="40" />
        <path d="M102 194h21l8 8v32h-29zM123 194v8h8M109 213h15M109 222h15" />
        <text x="115" y="276" textAnchor="middle">DI-07</text>
        <text x="115" y="292" textAnchor="middle">GRIP FORCE ≥ 22 N</text>
      </motion.g>

      <motion.g className="dms-gfx-drift__frozen" variants={graphicPop}>
        <circle cx="345" cy="240" r="26" />
        <path d="m334 229 22 22M356 229l-22 22" />
        <text x="345" y="186" textAnchor="middle">NO LINKED</text>
        <text x="345" y="201" textAnchor="middle">RESULT</text>
      </motion.g>

      <g transform="translate(495 58) rotate(-3 67 50)">
        <motion.g className="dms-gfx-evidence" variants={graphicItem}>
          <rect width="135" height="100" rx="7" />
          <circle cx="27" cy="27" r="10" />
          <path className="dms-gfx-evidence__check" d="m22 27 3 3 7-8" />
          <path d="M47 23h61M47 33h44M20 57h92M20 72h72" />
          <text x="20" y="90">VT-19 · DROP TEST</text>
        </motion.g>
      </g>
      <g transform="translate(510 190)">
        <motion.g className="dms-gfx-evidence" variants={graphicItem}>
          <rect width="135" height="100" rx="7" />
          <circle cx="27" cy="27" r="10" />
          <path className="dms-gfx-evidence__check" d="m22 27 3 3 7-8" />
          <path d="M47 23h61M47 33h44M20 57h92M20 72h72" />
          <text x="20" y="90">VT-24 · FORCE RIG</text>
        </motion.g>
      </g>
      <g transform="translate(495 322) rotate(3 67 50)">
        <motion.g className="dms-gfx-evidence" variants={graphicItem}>
          <rect width="135" height="100" rx="7" />
          <circle cx="27" cy="27" r="10" />
          <path className="dms-gfx-evidence__check" d="m22 27 3 3 7-8" />
          <path d="M47 23h61M47 33h44M20 57h92M20 72h72" />
          <text x="20" y="90">VT-27 · AUTOCLAVE</text>
        </motion.g>
      </g>
    </GraphicCanvas>
  );
}

/* The FMEA scored in a workshop: the highest RPN never crosses to the control
 * plan dossier, so the riskiest mode ships with no control against it. */
function DetachedFmeaGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="520" cy="240" r="150" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M270 238C300 238 320 239 341 240" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M424 240C412 240 404 240 398 240" variants={graphicDraw} />

      <g transform="translate(85 120)">
        <motion.g className="dms-gfx-version dms-gfx-version--mid" variants={graphicFade}>
          <rect width="180" height="238" rx="8" />
          <text className="dms-gfx-version__eyebrow" x="20" y="34">PROCESS FMEA</text>
          <text className="dms-gfx-version__number" x="20" y="94">RPN 140</text>
          <path d="M21 122h99M21 141h129M21 160h89M21 193h116" />
          <text className="dms-gfx-version__state" x="20" y="218">SCORED IN A WORKSHOP</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-drift__frozen" variants={graphicPop}>
        <circle cx="370" cy="240" r="26" />
        <path d="m359 229 22 22M381 229l-22 22" />
        <text x="370" y="186" textAnchor="middle">NEVER REACHES</text>
        <text x="370" y="201" textAnchor="middle">THE PLAN</text>
      </motion.g>

      <motion.g className="dms-gfx-dossier" variants={graphicPop}>
        <rect className="dms-gfx-dossier__shadow" x="434" y="113" width="190" height="266" rx="8" />
        <rect x="426" y="105" width="190" height="266" rx="8" />
        <rect className="dms-gfx-dossier__spine" x="426" y="105" width="28" height="266" rx="8" />
        <text className="dms-gfx-dossier__eyebrow" x="478" y="149">CONTROL PLAN</text>
        <text className="dms-gfx-dossier__title" x="478" y="188">CP-118</text>
        <path d="M479 219h97M479 241h76M479 263h91" />
        <rect className="dms-gfx-dossier__missing" x="478" y="296" width="102" height="38" rx="6" />
        <text className="dms-gfx-dossier__missing-label" x="529" y="319" textAnchor="middle">RPN 140 · NO CONTROL</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function ProblemGraphic({ kind, play, staticMode }: GraphicProps & { kind: ProblemKind }) {
  if (kind === "versions") return <BlastRadiusGraphic play={play} staticMode={staticMode} />;
  if (kind === "drift") return <UnverifiedGraphic play={play} staticMode={staticMode} />;
  if (kind === "audit") return <DetachedFmeaGraphic play={play} staticMode={staticMode} />;
  return <TraceGraphic play={play} staticMode={staticMode} />;
}

const pad = (value: number) => String(value).padStart(2, "0");

export function PlmProblemSpotlight({ items }: { items: DmsCoordinationProblem[] }) {
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
      <Tabs.List activateOnFocus className="dms-spot__list" aria-label="Product lifecycle failure modes">
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
