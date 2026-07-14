"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { DmsCoordinationProblem } from "./dms-data";
import "./dms-coordination-visual.css";

type CoordinationVisualProps = {
  problems: DmsCoordinationProblem[];
};

const BEATS = [
  {
    title: "Move controlled work forward without the coordination drag.",
    body: "One accountable path from request to effective document keeps productive work moving.",
  },
  {
    title: "Give every critical document a clear owner and trusted state.",
    body: "Teams can act on the current record without stopping to verify what is real.",
  },
  {
    title: "Recover the time lost between people, systems, and decisions.",
    body: "Search, comparison, follow-up, and reconciliation stop consuming the working day.",
  },
  {
    title: "Turn paid capacity back into productive work.",
    body: "More time goes to productive work instead of administrative recovery.",
  },
  {
    title: "Keep every handoff connected to one governed record.",
    body: "Owners, approvals, evidence, and decisions stay together from start to finish.",
  },
  {
    title: "Shorten the path from question to proof.",
    body: "Work moves faster, accountability stays visible, and the evidence is already audit-ready.",
  },
] as const;

const TAX_GAPS = [
  ["Search every location", "Verify the latest copy"],
  ["Compare competing copies", "Confirm the effective date"],
  ["Find the owner", "Chase and reconcile evidence"],
] as const;

function BeatNarration({ activeBeat }: { activeBeat: number }) {
  const beat = BEATS[activeBeat];

  return (
    <header className="dms-ctv__narration" id="dms-ctax-title">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="dms-ctv__beat"
          exit={{ opacity: 0, y: -6 }}
          initial={{ opacity: 0, y: 6 }}
          key={beat.title}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <span className="dms-eyebrow">The deeper problem</span>
          <h2 className="dms-h2">{beat.title}</h2>
          <p>{beat.body}</p>
        </motion.div>
      </AnimatePresence>
    </header>
  );
}

function ProblemStep({
  problem,
  index,
  progress,
  staticMode,
}: {
  problem: DmsCoordinationProblem;
  index: number;
  progress: MotionValue<number>;
  staticMode: boolean;
}) {
  const reveal = useTransform(
    progress,
    [0, 0.06 + index * 0.025, 0.24 + index * 0.025, 1],
    [0, 0, 1, 1],
  );

  return (
    <div className="dms-ctv__segment dms-ctv__segment--step">
      <motion.span
        className="dms-ctv__segment-fill"
        style={{ scaleX: staticMode ? 1 : reveal }}
      />
      <motion.span
        className="dms-ctv__step-copy"
        style={{ opacity: staticMode ? 1 : reveal }}
      >
        <span>0{index + 1}</span>
        <strong>{problem.category}</strong>
        <small>{problem.metric}</small>
      </motion.span>
    </div>
  );
}

function TaxGap({
  labels,
  index,
  progress,
  staticMode,
}: {
  labels: readonly [string, string];
  index: number;
  progress: MotionValue<number>;
  staticMode: boolean;
}) {
  const reveal = useTransform(
    progress,
    [0, 0.25 + index * 0.025, 0.48 + index * 0.025, 1],
    [0, 0, 1, 1],
  );

  return (
    <div className="dms-ctv__segment dms-ctv__segment--tax">
      <motion.span
        className="dms-ctv__segment-fill"
        style={{ scaleX: staticMode ? 1 : reveal }}
      />
      <motion.span
        className="dms-ctv__tax-copy"
        style={{ opacity: staticMode ? 1 : reveal }}
      >
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </motion.span>
    </div>
  );
}

export function DmsCoordinationVisual({ problems }: CoordinationVisualProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [isWide, setIsWide] = useState(true);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const impactReveal = useTransform(scrollYProgress, [0, 0.44, 0.5, 0.6, 0.68, 1], [0, 0, 1, 1, 0, 0]);
  const unifizeReveal = useTransform(scrollYProgress, [0, 0.62, 0.74, 1], [0, 0, 1, 1]);
  const unifizeY = useTransform(scrollYProgress, [0, 0.62, 0.74, 1], [-96, -96, 0, 0]);
  const duplicateFade = useTransform(scrollYProgress, [0, 0.79, 0.87, 1], [1, 1, 0, 0]);
  const blueReveal = useTransform(scrollYProgress, [0, 0.8, 0.88, 1], [0, 0, 1, 1]);
  const compression = useTransform(scrollYProgress, [0, 0.86, 0.97, 1], [1.852, 1.852, 1, 1]);
  const resultReveal = useTransform(scrollYProgress, [0, 0.91, 0.99, 1], [0, 0, 1, 1]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 901px)");
    const update = () => setIsWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const staticMode = Boolean(reducedMotion) || !isWide;

  useEffect(() => {
    if (staticMode) setActiveBeat(BEATS.length - 1);
  }, [staticMode]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (staticMode) return;
    const nextBeat = latest < 0.16 ? 0 : latest < 0.31 ? 1 : latest < 0.48 ? 2 : latest < 0.63 ? 3 : latest < 0.8 ? 4 : 5;
    setActiveBeat((current) => (current === nextBeat ? current : nextBeat));
  });

  return (
    <div className="dms-ctv" ref={storyRef}>
      <div className="dms-ctv__sticky">
        <div className="dms-ctv__stage">
          <span className="dms-sr-only">
            A qualitative timeline shows four DMS problem steps as gray blocks that produce controlled output.
            Red coordination time between them consumes paid capacity and extends cycle time without advancing the
            record. A second Unifize timeline keeps the same four steps and compresses the space between them. The
            problem metrics retain their original units and are not plotted on a shared numeric scale.
          </span>

          <BeatNarration activeBeat={activeBeat} />

          <div className="dms-ctv__chart-scroll">
            <div className="dms-ctv__chart" aria-hidden="true">
              <div className="dms-ctv__row dms-ctv__row--today">
                <span className="dms-ctv__row-label">Today</span>
                <div className="dms-ctv__track dms-ctv__track--today">
                  {problems.map((problem, index) => (
                    <div className="dms-ctv__sequence" key={problem.visual}>
                      <ProblemStep
                        index={index}
                        problem={problem}
                        progress={scrollYProgress}
                        staticMode={staticMode}
                      />
                      {index < problems.length - 1 ? (
                        <TaxGap
                          index={index}
                          labels={TAX_GAPS[index]}
                          progress={scrollYProgress}
                          staticMode={staticMode}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="dms-ctv__lower">
                <motion.p
                  className="dms-ctv__impact-copy"
                  style={{ opacity: staticMode ? 0 : impactReveal }}
                >
                  Paid capacity returns to productive work.
                </motion.p>

                <motion.div
                  className="dms-ctv__row dms-ctv__row--unifize"
                  style={{
                    opacity: staticMode ? 1 : unifizeReveal,
                    y: staticMode ? 0 : unifizeY,
                  }}
                >
                  <span className="dms-ctv__row-label">Unifize</span>
                  <div className="dms-ctv__unifize-track" aria-hidden="true">
                    <motion.div
                      className="dms-ctv__duplicate"
                      style={{ opacity: staticMode ? 0 : duplicateFade }}
                    >
                      {problems.map((problem, index) => (
                        <div className="dms-ctv__duplicate-sequence" key={problem.visual}>
                          <span className="dms-ctv__duplicate-step" />
                          {index < problems.length - 1 ? <span className="dms-ctv__duplicate-tax" /> : null}
                        </div>
                      ))}
                    </motion.div>
                    <motion.div
                      className="dms-ctv__compressed"
                      style={{
                        opacity: staticMode ? 1 : blueReveal,
                        scaleX: staticMode ? 1 : compression,
                      }}
                    >
                      {problems.map((problem) => <span key={problem.visual} />)}
                    </motion.div>
                    <motion.div className="dms-ctv__compressed-labels" style={{ opacity: staticMode ? 1 : resultReveal }}>
                      {problems.map((problem, index) => <span key={problem.visual}>0{index + 1}</span>)}
                    </motion.div>
                    <motion.span
                      className="dms-ctv__result"
                      style={{ opacity: staticMode ? 1 : resultReveal }}
                    >
                      One governed record
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
