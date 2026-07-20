"use client";

import { Tabs } from "@base-ui/react/tabs";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

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

function RetrievalGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="500" cy="240" r="154" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M144 112C244 112 331 151 421 205" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M144 240C252 240 333 240 407 240" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M144 368C244 368 331 330 421 275" variants={graphicDraw} />

      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="112" r="32" />
        <path d="M99 100h17l7 7v18H99zM116 100v7h7" />
        <text x="110" y="160" textAnchor="middle">DRIVE</text>
      </motion.g>
      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="240" r="32" />
        <path d="M99 228h17l7 7v18H99zM116 228v7h7" />
        <text x="110" y="288" textAnchor="middle">QMS</text>
      </motion.g>
      <motion.g className="dms-gfx-source" variants={graphicItem}>
        <circle cx="110" cy="368" r="32" />
        <path d="m97 360 13 10 13-10M97 360h26v19H97z" />
        <text x="110" y="416" textAnchor="middle">EMAIL</text>
      </motion.g>

      <g transform="translate(235 73) rotate(-5 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">SIGNED</text>
        </motion.g>
      </g>
      <g transform="translate(270 192) rotate(3 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">FINAL</text>
        </motion.g>
      </g>
      <g transform="translate(230 312) rotate(-4 38 48)">
        <motion.g className="dms-gfx-paper" variants={graphicItem}>
          <rect width="76" height="96" rx="6" />
          <path d="M13 23h40M13 37h49M13 51h33" />
          <text x="13" y="80">OLD COPY</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-lens" variants={graphicPop}>
        <circle cx="500" cy="240" r="88" />
        <path d="m562 302 50 50" />
        <rect x="438" y="206" width="124" height="68" rx="6" />
        <text x="500" y="235" textAnchor="middle">CONTROLLED SOP</text>
        <text x="500" y="255" textAnchor="middle">MULTIPLE RESULTS</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function VersionsGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="350" cy="240" r="178" variants={graphicPop} />
      <motion.path className="dms-gfx__route" d="M282 238C396 222 454 218 526 231" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M354 245C430 245 476 246 524 250" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M430 270C471 276 494 272 527 268" variants={graphicDraw} />

      <g transform="translate(105 146) rotate(-10 90 119)">
        <motion.g className="dms-gfx-version dms-gfx-version--old" variants={graphicFade}>
          <rect width="180" height="238" rx="8" />
          <text className="dms-gfx-version__eyebrow" x="20" y="34">CONTROLLED SOP</text>
          <text className="dms-gfx-version__number" x="20" y="94">PRINTED</text>
          <path d="M21 122h99M21 141h129M21 160h89M21 193h116" />
          <text className="dms-gfx-version__state" x="20" y="218">FLOOR COPY</text>
        </motion.g>
      </g>
      <g transform="translate(176 106) rotate(-2 90 119)">
        <motion.g className="dms-gfx-version dms-gfx-version--mid" variants={graphicFade}>
          <rect width="180" height="238" rx="8" />
          <text className="dms-gfx-version__eyebrow" x="20" y="34">CONTROLLED SOP</text>
          <text className="dms-gfx-version__number" x="20" y="94">SHARED</text>
          <path d="M21 122h99M21 141h129M21 160h89M21 193h116" />
          <text className="dms-gfx-version__state" x="20" y="218">WORKING COPY</text>
        </motion.g>
      </g>
      <g transform="translate(250 132) rotate(6 90 119)">
        <motion.g className="dms-gfx-version dms-gfx-version--key" variants={graphicPop}>
          <rect width="180" height="238" rx="8" />
          <text className="dms-gfx-version__eyebrow" x="20" y="34">CONTROLLED SOP</text>
          <text className="dms-gfx-version__number" x="20" y="94">CURRENT</text>
          <path d="M21 122h99M21 141h129M21 160h89M21 193h116" />
          <rect className="dms-gfx-version__stamp" x="20" y="196" width="82" height="23" rx="11" />
          <text className="dms-gfx-version__state" x="61" y="212" textAnchor="middle">EFFECTIVE</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-question" variants={graphicPop}>
        <circle cx="586" cy="250" r="54" />
        <text x="586" y="269" textAnchor="middle">?</text>
        <text className="dms-gfx-question__label" x="586" y="328" textAnchor="middle">POINT OF USE</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function DriftGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.path className="dms-gfx-drift__gap" d="M155 190H620V340C560 340 520 340 470 325C410 306 380 282 315 260C250 238 215 238 155 238Z" variants={graphicFade} />

      <motion.path className="dms-gfx-drift__document" d="M115 190H620" variants={graphicDraw} />
      <motion.path className="dms-gfx-drift__process" d="M115 238C215 238 250 238 315 260C380 282 410 306 470 325C520 340 560 340 620 340" variants={graphicDraw} />

      <motion.g className="dms-gfx-drift__origin" variants={graphicPop}>
        <circle cx="115" cy="214" r="40" />
        <path d="M102 194h21l8 8v32h-29zM123 194v8h8M109 213h15M109 222h15" />
        <text x="115" y="276" textAnchor="middle">ISSUED</text>
      </motion.g>

      <motion.g className="dms-gfx-drift__node" variants={graphicItem}>
        <circle cx="315" cy="260" r="16" />
        <text x="315" y="300" textAnchor="middle">PROCESS CHANGE</text>
      </motion.g>
      <motion.g className="dms-gfx-drift__node" variants={graphicItem}>
        <circle cx="470" cy="325" r="16" />
        <text x="470" y="366" textAnchor="middle">CHANGES AGAIN</text>
      </motion.g>
      <motion.g className="dms-gfx-drift__node dms-gfx-drift__node--end" variants={graphicPop}>
        <circle cx="620" cy="340" r="26" />
        <text x="620" y="396" textAnchor="middle">ACTUAL PROCESS</text>
      </motion.g>

      <motion.g className="dms-gfx-drift__frozen" variants={graphicItem}>
        <circle cx="620" cy="190" r="26" />
        <path d="m609 179 22 22M631 179l-22 22" />
        <text x="620" y="143" textAnchor="middle">DOCUMENT</text>
        <text x="620" y="158" textAnchor="middle">NO REVIEW</text>
      </motion.g>

      <motion.path className="dms-gfx-drift__measure" d="M198 190v53M191 190h14M191 243h14" variants={graphicDraw} />
      <motion.text className="dms-gfx-drift__measure-label" x="214" y="220" variants={graphicFade}>DRIFT</motion.text>
    </GraphicCanvas>
  );
}

function AuditGraphic(props: GraphicProps) {
  return (
    <GraphicCanvas {...props}>
      <motion.circle className="dms-gfx__halo" cx="360" cy="240" r="172" variants={graphicPop} />

      <motion.path className="dms-gfx__route" d="M204 138C238 154 258 177 274 205" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M516 138C482 154 462 177 446 205" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M204 346C238 330 258 307 274 281" variants={graphicDraw} />
      <motion.path className="dms-gfx__route" d="M516 346C482 330 462 307 446 281" variants={graphicDraw} />

      <g transform="translate(70 82) rotate(-5 67 50)">
        <motion.g className="dms-gfx-evidence" variants={graphicItem}>
          <rect width="135" height="100" rx="7" />
          <circle cx="27" cy="27" r="10" />
          <path className="dms-gfx-evidence__check" d="m22 27 3 3 7-8" />
          <path d="M47 23h61M47 33h44M20 57h92M20 72h72" />
          <text x="20" y="90">REVISION HISTORY</text>
        </motion.g>
      </g>
      <g transform="translate(515 82) rotate(5 67 50)">
        <motion.g className="dms-gfx-evidence" variants={graphicItem}>
          <rect width="135" height="100" rx="7" />
          <circle cx="27" cy="27" r="10" />
          <path className="dms-gfx-evidence__check" d="m22 27 3 3 7-8" />
          <path d="M47 23h61M47 33h44M20 57h92M20 72h72" />
          <text x="20" y="90">APPROVALS</text>
        </motion.g>
      </g>
      <g transform="translate(70 306) rotate(5 67 50)">
        <motion.g className="dms-gfx-evidence" variants={graphicItem}>
          <rect width="135" height="100" rx="7" />
          <circle cx="27" cy="27" r="10" />
          <path className="dms-gfx-evidence__check" d="m22 27 3 3 7-8" />
          <path d="M47 23h61M47 33h44M20 57h92M20 72h72" />
          <text x="20" y="90">SIGNATURES</text>
        </motion.g>
      </g>
      <g transform="translate(515 306) rotate(-5 67 50)">
        <motion.g className="dms-gfx-evidence" variants={graphicItem}>
          <rect width="135" height="100" rx="7" />
          <circle cx="27" cy="27" r="10" />
          <path className="dms-gfx-evidence__check" d="m22 27 3 3 7-8" />
          <path d="M47 23h61M47 33h44M20 57h92M20 72h72" />
          <text x="20" y="90">TRAINING</text>
        </motion.g>
      </g>

      <motion.g className="dms-gfx-dossier" variants={graphicPop}>
        <rect className="dms-gfx-dossier__shadow" x="274" y="113" width="190" height="266" rx="8" />
        <rect x="266" y="105" width="190" height="266" rx="8" />
        <rect className="dms-gfx-dossier__spine" x="266" y="105" width="28" height="266" rx="8" />
        <text className="dms-gfx-dossier__eyebrow" x="318" y="149">AUDIT RECORD</text>
        <text className="dms-gfx-dossier__title" x="318" y="188">SOP DOSSIER</text>
        <path d="M319 219h97M319 241h76M319 263h91" />
        <rect className="dms-gfx-dossier__missing" x="318" y="296" width="102" height="38" rx="6" />
        <text className="dms-gfx-dossier__missing-label" x="369" y="319" textAnchor="middle">MISSING EVIDENCE</text>
      </motion.g>
    </GraphicCanvas>
  );
}

function ProblemGraphic({ kind, play, staticMode }: GraphicProps & { kind: DmsProblemIllustrationKind }) {
  if (kind === "versions") return <VersionsGraphic play={play} staticMode={staticMode} />;
  if (kind === "drift") return <DriftGraphic play={play} staticMode={staticMode} />;
  if (kind === "audit") return <AuditGraphic play={play} staticMode={staticMode} />;
  return <RetrievalGraphic play={play} staticMode={staticMode} />;
}

const pad = (value: number) => String(value).padStart(2, "0");

export function DmsProblemSpotlight({ items }: { items: DmsProblemItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25, once: true });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<DmsProblemIllustrationKind>(items[0]?.visual ?? "retrieval");
  const staticMode = Boolean(reducedMotion);
  const play = staticMode || inView;

  return (
    <Tabs.Root
      className="dms-spot"
      onValueChange={(value) => {
        if (typeof value === "string") setActive(value as DmsProblemIllustrationKind);
      }}
      orientation="horizontal"
      ref={rootRef}
      value={active}
    >
      <Tabs.List activateOnFocus className="dms-spot__list" aria-label="The four document control symptoms">
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
