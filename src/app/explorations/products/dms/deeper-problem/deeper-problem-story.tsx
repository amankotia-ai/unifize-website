/* Two focused sections: visualize the coordination tax, then show the answer. */

import { Eyebrow } from "../dms-primitives";

function CoordinationTaxDetour() {
  return (
    <>
      <svg
        className="dp-tax-gfx"
        viewBox="0 0 1200 500"
        role="img"
        aria-labelledby="dp-tax-gfx-title"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="dp-tax-gfx-title">
          The work follows a short direct path, while email, meetings, spreadsheets, searching, comparing, chasing,
          and reconciling create a much longer manual detour called the coordination tax.
        </title>

        <path
          className="dp-tax-gfx__tax-field"
          d="M110 142H1090C1025 142 1025 335 900 372C770 410 738 288 620 276C500 264 470 363 350 363C230 363 210 142 110 142Z"
        />
        <path className="dp-tax-gfx__work-line" d="M110 142H1090" />
        <path
          className="dp-tax-gfx__detour-line"
          d="M110 142C210 142 230 363 350 363C470 363 500 264 620 276C738 288 770 410 900 372C1025 335 1025 142 1090 142"
        />

        <text className="dp-tax-gfx__overline" x="110" y="63">THE WORK</text>
        <text className="dp-tax-gfx__tax-title" x="600" y="205" textAnchor="middle">THE COORDINATION TAX</text>
        <text className="dp-tax-gfx__tax-sub" x="600" y="229" textAnchor="middle">
          HOURS · HEADCOUNT · DELAY · REWORK
        </text>

        <g className="dp-tax-gfx__step">
          <circle cx="110" cy="142" r="17" />
          <text x="110" y="111" textAnchor="middle">CHANGE</text>
        </g>
        <g className="dp-tax-gfx__step">
          <circle cx="430" cy="142" r="10" />
          <text x="430" y="111" textAnchor="middle">DOCUMENT</text>
        </g>
        <g className="dp-tax-gfx__step">
          <circle cx="750" cy="142" r="10" />
          <text x="750" y="111" textAnchor="middle">APPROVAL</text>
        </g>
        <g className="dp-tax-gfx__step">
          <circle cx="1090" cy="142" r="17" />
          <text x="1090" y="111" textAnchor="middle">EVIDENCE</text>
        </g>

        <g className="dp-tax-gfx__paper" transform="translate(226 218) rotate(-6 37 45)">
          <rect width="74" height="90" />
          <path d="M12 22h39M12 35h48M12 48h31" />
          <text x="12" y="73">WHY?</text>
        </g>
        <g className="dp-tax-gfx__paper" transform="translate(518 326) rotate(4 37 45)">
          <rect width="74" height="90" />
          <path d="M12 22h39M12 35h48M12 48h31" />
          <text x="12" y="73">LATEST?</text>
        </g>
        <g className="dp-tax-gfx__paper" transform="translate(804 235) rotate(-4 42 45)">
          <rect width="84" height="90" />
          <path d="M12 22h45M12 35h56M12 48h36" />
          <text x="12" y="73">SIGNED?</text>
        </g>

        <g className="dp-tax-gfx__channel">
          <circle cx="350" cy="363" r="36" />
          <path d="m337 354 13 10 13-10M337 354h26v19h-26z" />
          <text x="350" y="423" textAnchor="middle">EMAIL</text>
        </g>
        <g className="dp-tax-gfx__channel">
          <circle cx="620" cy="276" r="36" />
          <path d="M606 262h28v28h-28zM606 271h28M615 262v28M624 262v28" />
          <text x="620" y="336" textAnchor="middle">SPREADSHEETS</text>
        </g>
        <g className="dp-tax-gfx__channel">
          <circle cx="900" cy="372" r="36" />
          <path d="M886 361h28v18h-14l-8 7v-7h-6zM893 368h14" />
          <text x="900" y="432" textAnchor="middle">MEETINGS</text>
        </g>

        <g className="dp-tax-gfx__verb" transform="translate(145 223)">
          <rect width="76" height="26" />
          <text x="38" y="17" textAnchor="middle">SEARCH</text>
        </g>
        <g className="dp-tax-gfx__verb" transform="translate(404 306)">
          <rect width="82" height="26" />
          <text x="41" y="17" textAnchor="middle">COMPARE</text>
        </g>
        <g className="dp-tax-gfx__verb" transform="translate(690 330)">
          <rect width="68" height="26" />
          <text x="34" y="17" textAnchor="middle">CHASE</text>
        </g>
        <g className="dp-tax-gfx__verb" transform="translate(960 248)">
          <rect width="94" height="26" />
          <text x="47" y="17" textAnchor="middle">RECONCILE</text>
        </g>

        <text className="dp-tax-gfx__detour-label" x="110" y="462">WORK AROUND THE WORK</text>
      </svg>

      <div className="dp-tax-mobile" aria-hidden="true">
        <div className="dp-tax-mobile__work">
          <span>The work</span>
          <strong>Change → Document → Approval → Evidence</strong>
        </div>
        <div className="dp-tax-mobile__detour">
          <span>The coordination tax</span>
          <ol>
            <li><strong>Search</strong><small>Email</small></li>
            <li><strong>Compare</strong><small>Spreadsheets</small></li>
            <li><strong>Chase</strong><small>Meetings</small></li>
            <li><strong>Reconcile</strong><small>Rebuild the record</small></li>
          </ol>
        </div>
      </div>
    </>
  );
}

export function DeeperProblemTableau() {
  return (
    <>
      <section className="dms-section dp-section dp-tax-section" id="coordination" aria-labelledby="dp-tax-title">
        <div className="dms-wrap">
          <header className="dp-tax__head">
            <Eyebrow n={2}>The coordination tax</Eyebrow>
            <h2 className="dms-h2" id="dp-tax-title">A document moves. Its context does not.</h2>
            <p className="dms-lede">
              Finding the change, checking the version, chasing decisions, and rebuilding evidence is work around
              the work. That is the coordination tax.
            </p>
          </header>

          <figure className="dp-tax__detour">
            <CoordinationTaxDetour />
          </figure>
        </div>
      </section>

      <section
        className="dms-section dp-section dp-answer-section"
        id="unifize-answer"
        aria-labelledby="dp-answer-title"
      >
        <div className="dms-wrap">
          <header className="dp-answer__head">
            <Eyebrow n={3}>How Unifize addresses it</Eyebrow>
            <h2 className="dms-h2" id="dp-answer-title">The context moves with the work.</h2>
            <p className="dms-lede">
              Change, effective version, approvals, and evidence stay on one governed record—the record your
              existing tools write into, not another silo.
            </p>
          </header>

          <figure className="dp-record" aria-labelledby="dp-record-title">
            <header className="dp-record__head">
              <div>
                <span>Governed change record</span>
                <strong id="dp-record-title">CC-2148</strong>
              </div>
              <p>Update cleaning validation for new equipment</p>
            </header>

            <dl className="dp-record__anatomy">
              <div>
                <dt>Effective document</dt>
                <dd><strong>SOP-118 · Rev D</strong><span>Released 02 Jul 2026</span></dd>
              </div>
              <div>
                <dt>Approval</dt>
                <dd><strong>QA + Engineering</strong><span>Signer, meaning, timestamp</span></dd>
              </div>
              <div>
                <dt>Evidence</dt>
                <dd><strong>Part 11 record</strong><span>Retained with Rev D</span></dd>
              </div>
            </dl>

            <figcaption>One shared thread from change through audit.</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
