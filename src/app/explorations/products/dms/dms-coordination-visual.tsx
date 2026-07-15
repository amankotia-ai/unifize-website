import { Fragment } from "react";
import type { DmsCoordinationProblem } from "./dms-data";
import "./dms-coordination-visual.css";

type CoordinationVisualProps = {
  problems: DmsCoordinationProblem[];
};

function GapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v6M12 17h.01" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m7.5 12.5 3 3 6-7" />
    </svg>
  );
}

function RecordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.75 19 5.5v5.75c0 4.47-2.98 8.54-7 10-4.02-1.46-7-5.53-7-10V5.5L12 2.75Z" />
      <path d="m8.75 12 2.1 2.1 4.4-4.7" />
    </svg>
  );
}

function BeforeStep({ problem, index }: { problem: DmsCoordinationProblem; index: number }) {
  return (
    <li className="dms-ctv__before-step">
      <span className="dms-ctv__index">0{index + 1}</span>
      <strong>{problem.category}</strong>
      <span className="dms-ctv__rule" aria-hidden="true" />
      <span className="dms-ctv__metric">{problem.metric}</span>
      <small>{problem.metricLabel}</small>
    </li>
  );
}

function CoordinationGap({ labels }: { labels: DmsCoordinationProblem["tax"] }) {
  return (
    <li className="dms-ctv__gap">
      <GapIcon />
      <span>{labels[0]}</span>
      <span className="dms-ctv__gap-rule" aria-hidden="true" />
      <span>{labels[1]}</span>
    </li>
  );
}

function AfterStep({ problem, index }: { problem: DmsCoordinationProblem; index: number }) {
  return (
    <li className="dms-ctv__after-step">
      <div className="dms-ctv__after-topline">
        <span className="dms-ctv__index">0{index + 1}</span>
        <span className="dms-ctv__check"><CheckIcon /></span>
      </div>
      <span className="dms-ctv__after-category">{problem.category}</span>
      <strong>{problem.outcome}</strong>
    </li>
  );
}

export function DmsCoordinationVisual({ problems }: CoordinationVisualProps) {
  return (
    <div className="dms-ctv">
      <div className="dms-ctv__stage">
        <header className="dms-ctv__narration" id="dms-ctax-title">
          <span className="dms-eyebrow">The deeper problem</span>
          <h2 className="dms-h2">Shorten the path from question to proof.</h2>
          <p>Work moves faster, accountability stays visible, and the evidence is already audit-ready.</p>
        </header>

        <span className="dms-sr-only">
          Before Unifize, four document-management steps are separated by coordination work: searching every
          location, comparing copies, finding owners, and reconciling evidence. With Unifize, the same stages remain
          connected to one governed record. The problem metrics retain their original units and are not plotted on a
          shared numeric scale.
        </span>

        <div className="dms-ctv__comparison" aria-hidden="true">
          <section className="dms-ctv__world dms-ctv__world--before">
            <header className="dms-ctv__world-label">
              <span>Before</span>
              <strong>Today</strong>
              <p>Useful work is fragmented by the coordination needed to find, verify, and reconcile it.</p>
            </header>

            <div className="dms-ctv__lane-scroll">
              <ol className="dms-ctv__before-track">
                {problems.map((problem, index) => (
                  <Fragment key={problem.visual}>
                    <BeforeStep index={index} problem={problem} />
                    {index < problems.length - 1 ? <CoordinationGap labels={problem.tax} /> : null}
                  </Fragment>
                ))}
              </ol>
            </div>
          </section>

          <div className="dms-ctv__shift">
            <span className="dms-ctv__shift-line" aria-hidden="true" />
            <span className="dms-ctv__shift-icon"><GapIcon /></span>
            <p><strong>The work stays.</strong> The coordination gaps do not.</p>
            <span className="dms-ctv__shift-line" aria-hidden="true" />
          </div>

          <section className="dms-ctv__world dms-ctv__world--after">
            <header className="dms-ctv__world-label">
              <span>After</span>
              <strong>With Unifize</strong>
              <p>Every step, owner, decision, and piece of evidence stays attached to the same record.</p>
            </header>

            <div className="dms-ctv__lane-scroll">
              <div className="dms-ctv__after-track">
                <ol className="dms-ctv__after-steps">
                  {problems.map((problem, index) => (
                    <AfterStep index={index} key={problem.visual} problem={problem} />
                  ))}
                </ol>
                <div className="dms-ctv__record-bar">
                  <span><RecordIcon />One governed record</span>
                  <span>Every handoff stays attached</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
