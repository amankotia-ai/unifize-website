/* ============================================================================
 * problem-board.tsx - the product pages' problem section, one board instead
 * of two sections (24 Sep 2026). The old page told the same four stories
 * twice: a tabbed spotlight with drawn diagrams, then the coordination-tax
 * BEFORE/AFTER ledger with drawn scenes, ~2,800px between them. The board
 * says it once, in the homepage symptom-cell grammar (home-rails.css):
 *
 *   split head (blue-square eyebrow + claim left, lede right)
 *   four cells rail to rail, hairlines by the 1px-gap trick; each cell is a
 *   wash panel holding one precise mini-UI artifact (never a drawn scene)
 *   beside the claim and ONE line under a hairline: the cost today (rust
 *   figure) or, on the switch, the outcome on the record (blue). 24 Sep
 *   review: a two-row tinted ledger read as too heavy, nothing to lead with
 *   a Today / With Unifize switch in the head flips every artifact to its
 *   governed state and the washes from paper to blue, so the before/after
 *   the ledger used to spend a whole section on lives in the same cells
 *
 * Data: the page's DmsCoordinationProblem[] (Pain Points DB) plus, per
 * problem.visual, a { before, after } artifact pair and an after-note. Both
 * lines are always in the markup, so nothing is hidden behind the
 * switch for readers or crawlers. Styles: problem-board.css (pb namespace).
 * ========================================================================== */
import type { ReactNode } from "react";
import type { DmsCoordinationProblem } from "../dms/dms-data";
import { Eyebrow } from "../dms/dms-primitives";
import { ProblemBoardSwitch } from "./problem-board-switch";

export type ProblemBoardArtifacts = Record<string, { before: ReactNode; after: ReactNode }>;

/* the figure ("Nobody", "Weeks") carries the weight and its caption
 * continues it; captions are authored capitalised, so lower them back into
 * the sentence unless they open on an acronym */
function continueSentence(value: string) {
  const t = value.trim();
  if (t.length > 1 && /[A-Z]/.test(t[1]) && t[1] === t[1].toUpperCase()) return t;
  return t.charAt(0).toLowerCase() + t.slice(1);
}

export function ProblemBoard({
  id = "problem",
  eyebrow = "The problem",
  heading,
  lede,
  problems,
  artifacts,
  afterNotes,
  coda,
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  lede: string;
  problems: DmsCoordinationProblem[];
  artifacts: ProblemBoardArtifacts;
  afterNotes: Record<string, string>;
  coda?: { strong: string; rest: string };
}) {
  const titleId = `${id}-title`;
  return (
    <section className="dms-section pb hm-railed" id={id} aria-labelledby={titleId} data-world="before">
      <div className="dms-wrap">
        <header className="pb__head" data-reveal>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="dms-h2" id={titleId}>{heading}</h2>
          </div>
          <div className="pb__aside">
            <p className="dms-lede">{lede}</p>
            <ProblemBoardSwitch />
          </div>
        </header>

        <ol className="pb__grid">
          {problems.map((p) => {
            const art = artifacts[p.visual];
            return (
              <li className="pb-cell" key={p.visual} data-reveal>
                <div className="pb-cell__wash" data-viz={p.visual} aria-hidden="true">
                  <div className="pb-cell__stage">
                    <div className="pb-cell__art is-before">{art?.before}</div>
                    <div className="pb-cell__art is-after">{art?.after}</div>
                  </div>
                </div>

                <div className="pb-cell__body">
                  <div className="pb-cell__top">
                    <span className="pb-cell__cat">
                      <i className="pb-cell__dot" aria-hidden="true" />
                      {p.category}
                    </span>
                  </div>
                  <h3 className="pb-cell__claim">{p.title}</h3>

                  {/* one line, swapped by the switch: the cost today, the
                    * outcome on the record. Both stay in the markup. */}
                  <p className="pb-cell__say">
                    <span className="pb-cell__line is-before">
                      <b>{p.metric}</b> {continueSentence(p.metricLabel)}.
                    </span>
                    <span className="pb-cell__line is-after">
                      <b>{p.outcome}.</b> {afterNotes[p.visual]}
                    </span>
                  </p>

                  {p.film ? (
                    <a className="pb-cell__film" href={p.film.url} target="_blank" rel="noreferrer">
                      <span className="pb-cell__play" aria-hidden="true">
                        <svg viewBox="0 0 10 10"><path d="M3 2.2v5.6L7.6 5z" /></svg>
                      </span>
                      <span className="pb-cell__film-text">
                        <small>How they handled it · {p.film.duration}</small>
                        <span>{p.film.company ?? p.film.person}</span>
                      </span>
                      <span className="pb-cell__film-arrow" aria-hidden="true">&rarr;</span>
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        {coda ? (
          <p className="pb__coda" data-reveal>
            <strong>{coda.strong}</strong> {coda.rest}
          </p>
        ) : null}
      </div>
    </section>
  );
}
