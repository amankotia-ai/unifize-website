/* ----------------------------------------------------------------------------
 * platform-gap.tsx - the Gap explainer for section 01 of the platform page.
 *
 * One scene, two worlds: the record the system keeps (left, a closed CAPA
 * card) and the work that actually produced it (right, five lanes:
 * discussions, decisions, evidence, reviews & handoffs, approvals), joined
 * by a dashed spine and a return loop back to the record. The lanes reveal
 * in sequence. Brand blue is spent once, on the decision chip; green is the
 * semantic completion color on checks and states.
 *
 * Fiction and cast match the hero workspace mocks (QE-2210 torque drift,
 * Priya Mehta / Daniel Cho / Maya Ito); avatars are the same initials style.
 * Server component, no state; styled by platform-kit.css (pf-gapd namespace).
 * -------------------------------------------------------------------------- */

/* line-work lane glyphs: 24-grid, square caps, currentColor */
const LANE_ICONS: Record<string, React.ReactNode> = {
  discussions: (
    <>
      <path d="M3.5 4.5h13v9H9l-3.5 3v-3h-2z" />
      <path d="M20.5 9.5v9h-2v2.5l-3-2.5H10" />
    </>
  ),
  decisions: (
    <>
      <path d="M12 3.5v17M8 20.5h8" />
      <path d="M5.5 6.5h13" />
      <path d="M5.5 6.5 3 12.5h5l-2.5-6zM18.5 6.5 16 12.5h5l-2.5-6z" />
    </>
  ),
  evidence: (
    <path d="M8 12.5l6.2-6.2a3 3 0 0 1 4.2 4.2l-7.4 7.4a4.7 4.7 0 0 1-6.6-6.6L11.6 4" />
  ),
  reviews: (
    <>
      <circle cx="8" cy="8" r="3" />
      <path d="M3 20a5 5 0 0 1 10 0" />
      <path d="M15 8h6M18 5l3 3-3 3" />
    </>
  ),
  approvals: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.5 2.8 2.8L16.5 9" />
    </>
  ),
};

function LaneIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      {LANE_ICONS[name]}
    </svg>
  );
}

/* initials avatars, same treatment as the hero workspace mocks */
const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2);

function Ava({ name, tone }: { name: string; tone: number }) {
  return <span className={"pf-gapd__ava pf-gapd__ava--" + (tone % 4)} aria-hidden="true">{initials(name)}</span>;
}

const CAST = ["Priya Mehta", "Daniel Cho", "Maya Ito", "Ana Duarte"];

function Avas({ of }: { of: number[] }) {
  return (
    <span className="pf-gapd__avas" aria-hidden="true">
      {of.map((i) => <Ava key={i} name={CAST[i]} tone={i} />)}
    </span>
  );
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="square" aria-hidden="true">
    <path d="m6 12.5 4 4L18.5 8" />
  </svg>
);

const ARROW = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" aria-hidden="true">
    <path d="M3 10h13M12 5.5 16.5 10 12 14.5" />
  </svg>
);

export function GapDiagram() {
  return (
    <div
      className="pf-gapd"
      data-reveal
      role="img"
      aria-label="Diagram: the system records CAPA-2210 as approved and closed with a final report attached. What actually moved the work forward, and what the record never captures: the discussions that found the cause, the decision to revise the inspection step, the evidence attached along the way, three reviews handed across functions, and the approvals. All of it happened outside the record; the record keeps one status and a PDF."
    >
      <div className="pf-gapd__grid" aria-hidden="true">
        {/* ---- left: the record the system keeps ---- */}
        <div className="pf-gapd__record">
          <span className="pf-gapd__lab">What the system records</span>
          <article className="pf-gapd__doc">
            <header className="pf-gapd__doc-head">
              <span className="pf-gapd__doc-ref dms-data">CAPA-2210</span>
              <span className="pf-gapd__doc-title">Recurring torque non-conformance</span>
            </header>
            <dl className="pf-gapd__doc-rows">
              <div className="pf-gapd__doc-row"><dt>Status</dt><dd><span className="pf-gapd__state">Approved</span></dd></div>
              <div className="pf-gapd__doc-row"><dt>Owner</dt><dd>Quality</dd></div>
              <div className="pf-gapd__doc-row"><dt>Closed</dt><dd>12 Jun</dd></div>
            </dl>
            <div className="pf-gapd__doc-file">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="square" aria-hidden="true">
                <path d="M6.5 3.2h6.5l4.5 4.5V20.8H6.5z" /><path d="M13 3.2v4.5h4.5" />
              </svg>
              capa-2210-final.pdf
            </div>
          </article>
        </div>

        {/* ---- right: the work that produced it ---- */}
        <div className="pf-gapd__work">
          <span className="pf-gapd__lab">What actually moved the work forward</span>
          <ol className="pf-gapd__lanes">
            <li className="pf-gapd__lane">
              <span className="pf-gapd__lane-id"><LaneIcon name="discussions" />Discussions</span>
              <span className="pf-gapd__lane-flow">
                <span className="pf-gapd__chip"><Avas of={[0]} />Why is torque drifting on Line 2?<span className="pf-gapd__time dms-data">9:12</span></span>
                <Avas of={[1, 2, 3]} />
                <span className="pf-gapd__chip"><Avas of={[2]} />Can Production confirm the fixture change?<span className="pf-gapd__time dms-data">11:03</span></span>
              </span>
            </li>
            <li className="pf-gapd__lane">
              <span className="pf-gapd__lane-id"><LaneIcon name="decisions" />Decisions</span>
              <span className="pf-gapd__lane-flow">
                <span className="pf-gapd__chip pf-gapd__chip--key"><b>Decision:</b>&nbsp;revise the incoming inspection step<span className="pf-gapd__time dms-data">11:18</span></span>
                <Avas of={[0, 1]} />
              </span>
            </li>
            <li className="pf-gapd__lane">
              <span className="pf-gapd__lane-id"><LaneIcon name="evidence" />Evidence</span>
              <span className="pf-gapd__lane-flow">
                <span className="pf-gapd__chip"><Avas of={[1]} />Evidence attached<span className="pf-gapd__time dms-data">11:42</span></span>
                <span className="pf-gapd__chip pf-gapd__chip--file dms-data">test-results.csv</span>
                <span className="pf-gapd__chip pf-gapd__chip--file dms-data">line2-photos.zip</span>
                <span className="pf-gapd__chip pf-gapd__chip--file dms-data">+2</span>
              </span>
            </li>
            <li className="pf-gapd__lane">
              <span className="pf-gapd__lane-id"><LaneIcon name="reviews" />Reviews &amp; handoffs</span>
              <span className="pf-gapd__lane-flow">
                <span className="pf-gapd__chip"><Avas of={[0]} />Quality review<span className="pf-gapd__done">Completed</span></span>
                <span className="pf-gapd__arrow">{ARROW}</span>
                <span className="pf-gapd__chip"><Avas of={[1]} />Engineering review<span className="pf-gapd__done">Completed</span></span>
                <span className="pf-gapd__arrow">{ARROW}</span>
                <span className="pf-gapd__chip"><Avas of={[2]} />Production review<span className="pf-gapd__done">Completed</span></span>
              </span>
            </li>
            <li className="pf-gapd__lane">
              <span className="pf-gapd__lane-id"><LaneIcon name="approvals" />Approvals</span>
              <span className="pf-gapd__lane-flow">
                <span className="pf-gapd__check">{CHECK}</span>
                <span className="pf-gapd__check">{CHECK}</span>
                <span className="pf-gapd__check">{CHECK}</span>
                <span className="pf-gapd__chip"><Avas of={[3]} />Approved after effectiveness review<span className="pf-gapd__time dms-data">2:47 PM</span></span>
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* the return loop: all of it collapses back into one closed record */}
      <div className="pf-gapd__loop" aria-hidden="true">
        <svg viewBox="0 0 100 26" preserveAspectRatio="none">
          <path d="M99 1v14a4 4 0 0 1-4 4H6" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M11 14l-6 5 6 5" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="pf-gapd__loop-lab">All the record keeps of it: one status and a PDF</span>
      </div>
    </div>
  );
}

export function GapBanner() {
  return (
    <div className="pf-gapd__banner" data-reveal>
      <p className="pf-gapd__banner-tx">
        <b>Unifize captures the full path to the outcome,</b> so nothing important is lost between the work and
        the record.
      </p>
      <a className="pf-gapd__banner-cta" href="#platform">See how it works {ARROW}</a>
    </div>
  );
}
