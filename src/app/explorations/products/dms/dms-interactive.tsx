"use client";

/* ----------------------------------------------------------------------------
 * dms-interactive.tsx - the interactive layer of the DMS product page.
 *   ModuleExplorer     - module accordion with a staged prototype per module.
 *   LifecycleExplorer  - node-rail lifecycle diagram with a detail panel.
 *   FaqAccordion       - one-open-at-a-time FAQ.
 * Design: wide, quiet, and systems-led, with staged product prototypes and
 * direct tab controls. All state is local and degrades
 * to a sensible default without JS (first module, Effective state, first
 * FAQ open).
 * -------------------------------------------------------------------------- */

import { useState } from "react";
import { ChatShell } from "@/components/organisms";
import { MODULES, LIFECYCLE, FAQS } from "./dms-data";
import { Eyebrow, ShellFrame, StagePanel } from "./dms-primitives";
import { MockChangeOrder, MockRevisionTrail, MockTrainingMatrix } from "./dms-mocks";

/* ============================================================ shared bits */

const pad = (n: number) => String(n).padStart(2, "0");

const MODULE_POINT_ICONS: Record<string, string[]> = {
  "document-control": ["template", "route", "distribute", "review"],
  "change-control": ["change", "matrix", "evidence", "training"],
  "training-management": ["roles", "assign", "assessment", "report"],
};

const POINT_GLYPHS: Record<string, React.ReactNode> = {
  template: (
    <>
      <path d="M3 1.5h6.5L13 5v9.5H3V1.5Z" />
      <path className="dms-modx__icon-cut" d="M9.25 1.75v3.5h3.5M5.4 8h5.2M5.4 10.5h4" />
    </>
  ),
  route: (
    <>
      <circle cx="4" cy="3" r="2" /><circle cx="4" cy="13" r="2" /><circle cx="12" cy="8" r="2" />
      <path d="M3.25 4.8h1.5v2.45h5.4v1.5h-5.4v2.45h-1.5V4.8Z" />
    </>
  ),
  distribute: <path d="M6.25 1.5h3.5v5H13L8 11.5 3 6.5h3.25v-5ZM2 12h12v2.5H2V12Z" />,
  review: (
    <>
      <circle cx="8" cy="8" r="6.5" />
      <path className="dms-modx__icon-cut" d="M8 4.2v4.1l2.8 1.7" />
    </>
  ),
  change: (
    <>
      <path d="M2.5 1.5h7.25L13 4.75V10l-4.5 4.5h-6V1.5Z" />
      <path d="m9.2 12.7 4.45-4.45 1.1 1.1-4.45 4.45-1.8.7.7-1.8Z" />
      <path className="dms-modx__icon-cut" d="M9.5 1.8V5h3.2" />
    </>
  ),
  matrix: (
    <>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" /><rect x="9" y="1.5" width="5.5" height="5.5" />
      <rect x="1.5" y="9" width="5.5" height="5.5" /><rect x="9" y="9" width="5.5" height="5.5" />
    </>
  ),
  evidence: (
    <>
      <path d="M3 1.5h7l3 3v10H3v-13Z" />
      <path className="dms-modx__icon-cut" d="M9.7 1.8v3h3M5.5 8h5M5.5 10.5h3.5" />
      <circle cx="11.75" cy="12.25" r="2.25" />
    </>
  ),
  training: (
    <>
      <path d="m1 5 7-3.5L15 5 8 8.5 1 5Z" />
      <path d="M3.5 7.2 8 9.45l4.5-2.25v3.3c-2.7 2.2-6.3 2.2-9 0V7.2Z" />
      <rect x="13.5" y="5" width="1.3" height="5" />
    </>
  ),
  roles: (
    <>
      <circle cx="5" cy="5" r="3" /><circle cx="11.5" cy="5.5" r="2.3" />
      <path d="M.75 14.5c.2-4 1.8-6 4.25-6s4.05 2 4.25 6H.75ZM9 14.5c.1-3.1 1.2-4.8 3.1-4.8 1.85 0 2.9 1.7 3.15 4.8H9Z" />
    </>
  ),
  assign: <path d="M9.1.75 2.4 8.9h4.2l-.4 6.35 7.4-9h-4.3L9.1.75Z" />,
  assessment: (
    <>
      <circle cx="8" cy="8" r="6.5" />
      <path className="dms-modx__icon-cut" d="m4.6 8.2 2.2 2.2 4.7-4.8" />
    </>
  ),
  report: <path d="M1.5 12h2.75v2.5H1.5V12Zm3.75-5h2.75v7.5H5.25V7ZM9 9.5h2.75v5H9v-5ZM12.75 2h2.25v12.5h-2.25V2Z" />,
};

function ModulePointIcon({ name }: { name: string }) {
  return (
    <svg className="dms-modx__point-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {POINT_GLYPHS[name]}
    </svg>
  );
}

/* ============================================================ module story */

const MODULE_MOCKS: Record<string, React.ReactNode> = {
  "document-control": <MockRevisionTrail />,
  "change-control": <MockChangeOrder />,
  "training-management": <MockTrainingMatrix />,
};

export function ModuleExplorer() {
  const [active, setActive] = useState(0);

  const m = MODULES[active];

  return (
    <div className="dms-wrap dms-modx">
      <div className="dms-modx__head">
        <Eyebrow n={2}>What is bundled</Eyebrow>
        <h2 className="dms-h2">Three modules. One continuous record.</h2>
        <p className="dms-lede">The change, the controlled revision, and the training obligation stay connected from the first decision to the final signature.</p>
      </div>
      <div className="dms-modx__layout">
        <div className="dms-modx__row" role="group" aria-label="DMS modules">
          {MODULES.map((mod, i) => (
            <button
              type="button"
              key={mod.key}
              className={"dms-modx__it" + (i === active ? " is-active" : "")}
              aria-pressed={i === active}
              aria-controls="dms-module-panel"
              onClick={() => setActive(i)}
            >
              <span className="dms-modx__idx dms-data">{pad(i + 1)}</span>
              <span className="dms-modx__name">{mod.name}</span>
              <span className="dms-modx__blurb">{mod.promise}</span>
            </button>
          ))}
        </div>
        <div className="dms-modx__panel" id="dms-module-panel" aria-live="polite">
          <div className="dms-modx__copy">
            <p>{m.blurb}</p>
            <ul>
              {m.points.map((point, pointIndex) => (
                <li key={point}>
                  <ModulePointIcon name={MODULE_POINT_ICONS[m.key][pointIndex]} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <StagePanel className="dms-stage--brand dms-modx__stage">
            <div className="dms-modx__screens">
              {MODULES.map((module, moduleIndex) => (
                <div
                  className={`dms-modx__card${moduleIndex === active ? " is-active" : ""}`}
                  key={module.key}
                  aria-hidden={moduleIndex !== active}
                >
                  <ShellFrame panel url={`app.unifize.com / ${module.key.replace(/-/g, " ")}`}>
                    {MODULE_MOCKS[module.key]}
                  </ShellFrame>
                </div>
              ))}
            </div>
            <div className="dms-modx__standards" aria-label="Standards supported by this module">
              {m.standards.map((standard) => <span key={standard}>{standard}</span>)}
            </div>
          </StagePanel>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ lifecycle
 * A direct state selector keeps the full lifecycle and the corresponding
 * CC-2148 evidence visible in one frame without a scroll-jacked sequence. */

/* Scrub points into the ChatShell timeline (0..1) per lifecycle state:
 * Draft → change raised; In Review → cross-functional review; In Approval →
 * Part 11 signature; Effective → record card lands; Superseded → "Rev D live,
 * Rev C retired" row ticks; Obsolete → audit trail sealed. */
const LIFE_PROGRESS = [0.17, 0.49, 0.72, 0.94, 0.97, 1];
export function LifecycleExplorer() {
  const [active, setActive] = useState(0);
  const progress = LIFE_PROGRESS[active];

  return (
    <div className="dms-lifex-scroll">
      <StagePanel className="dms-stage--brand dms-lifex__stage">
        <div className="dms-wrap dms-lifex-wrap">
          <div className="dms-lifex__head">
            <Eyebrow n={4}>The lifecycle</Eyebrow>
            <h2 className="dms-h2">Every state has a gate. Every gate has an owner.</h2>
          </div>
          <div className="dms-lifex">
            <aside className="dms-lifex__trail">
              <span className="dms-lifex__lab">How a revision moves</span>
              <ol
                className="dms-lifex__steps"
                aria-label="Controlled document lifecycle"
              >
                {LIFECYCLE.map((st, i) => (
                  <li
                    className={
                      "dms-lifex__step" +
                      (i === active ? " is-active" : "") +
                      (i < active ? " is-past" : "")
                    }
                    key={st.state}
                  >
                    <button
                      type="button"
                      id={`dms-lifetab-${i}`}
                      aria-pressed={i === active}
                      aria-controls={`dms-lifedetail-${i}`}
                      className="dms-lifex__btn"
                      onClick={() => setActive(i)}
                    >
                      <span className="dms-lifex__node" aria-hidden="true" />
                      <span className="dms-lifex__t">{st.state}</span>
                      <span className="dms-lifex__meta">{st.gate}</span>
                    </button>
                    <div className="dms-lifex__detail" id={`dms-lifedetail-${i}`} role="region" aria-labelledby={`dms-lifetab-${i}`} aria-hidden={i !== active}>
                      <div className="dms-lifex__detail-inner"><p>{st.detail}</p></div>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="dms-lifex__live" aria-label="Change-control thread CC-2148, updated by lifecycle state">
              <ChatShell variant="change-control" progress={progress} />
            </div>

            <div className="dms-lifex__mobile" aria-hidden="true">
              <span className="dms-lifex__mobile-lab">Change-control thread</span>
              <span className="dms-lifex__mobile-id">CC-2148 · raise → review → Part 11 approval → effective → seal</span>
            </div>
          </div>
        </div>
      </StagePanel>
    </div>
  );
}

/* ============================================================ FAQ */

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="dms-faq">
      {FAQS.map((f, i) => (
        <div className={"dms-faq__item" + (open === i ? " is-open" : "")} key={f.q}>
          <h3 className="dms-faq__h">
            <button
              type="button"
              className="dms-faq__q"
              aria-expanded={open === i}
              aria-controls={`dms-faq-a-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <svg className="dms-faq__ic" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" clipRule="evenodd" />
              </svg>
            </button>
          </h3>
          <div className="dms-faq__a" id={`dms-faq-a-${i}`} role="region" aria-hidden={open !== i}>
            <div className="dms-faq__a-inner"><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
