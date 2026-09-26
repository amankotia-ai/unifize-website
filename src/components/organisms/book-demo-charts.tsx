/* ----------------------------------------------------------------------------
 * BookDemoCharts: the Book-a-demo modal's left pane (27 Sep 2026). Three
 * published customer results on one card over the pane's wash, one after
 * another (the card stays, its content crossfades).
 *
 * Picked by the owner from mocks in scripts/product-films/demo-charts/:
 * the chart is "B" (mocks.html: one bar is the time the work used to take,
 * the brand-blue fill is the time with Unifize, the rest is the time gone)
 * and the card is "1, drafted" (mocks2.html: an engineering sheet, with
 * crosshair corners, dashed rules, mono labels, a big numeral, the removed
 * time hatched, a ruler under the bar, the customer's logo). Brand blue is
 * the --u-primary token only.
 *
 * The bar is the "before" at its LOW end (4 weeks, 3 months, 2 weeks), so
 * the gain is never overstated, and the ruler says what that end is. Figures
 * come from the unifize.com case studies
 * (src/content/webflow/export/case-studies.json); never add one that is not
 * published there, and never derive a percentage the customer did not state.
 * -------------------------------------------------------------------------- */

import type { CSSProperties } from "react";

type Result = {
  eyebrow: string;
  /** the big numeral, its small unit, and the two lines beside it */
  num: string;
  unit?: string;
  word: [string, string];
  /** the time with Unifize as a share of the bar (the before, low end) */
  share: number;
  /** ruler labels, evenly spaced from 0 to the end of the bar */
  ruler: string[];
  /** the note over the removed time */
  removed: string;
  after: string;
  before: string;
  logo: string;
  /** logos differ in weight: each gets the height that balances it */
  logoH: number;
  logoW: number;
};

const RESULTS: Result[] = [
  {
    eyebrow: "NCR closure time",
    num: "75",
    unit: "%",
    word: ["faster", "NCR closure"],
    share: 7.2 / 28, // 7.2 days of 4 weeks
    ruler: ["0", "1 wk", "2 wk", "3 wk", "4 wk"],
    removed: "75% less time",
    after: "7.2 days",
    before: "4 to 5 weeks",
    logo: "/customers/will-burt.png",
    logoH: 24,
    logoW: 38,
  },
  {
    eyebrow: "Approval cycle time",
    num: "≈2",
    word: ["weeks per", "approval"],
    share: 2 / 13, // 2 weeks of 3 months (13 weeks)
    ruler: ["0", "1 mo", "2 mo", "3 mo"],
    removed: "Down from 3 to 8 months",
    after: "About 2 weeks",
    before: "3 to 8 months",
    logo: "/customers/applechem.png",
    logoH: 16,
    logoW: 76,
  },
  {
    eyebrow: "Internal audit prep",
    num: "<30",
    word: ["minutes of", "audit prep"],
    share: 0, // half an hour of 2 weeks: a sliver
    ruler: ["0", "1 wk", "2 wk"],
    removed: "Down from weeks",
    after: "Under 30 minutes",
    before: "Weeks",
    logo: "/customers/ats.png",
    logoH: 20,
    logoW: 61,
  },
];

export function BookDemoCharts() {
  return (
    <div className="uzd-ch">
      <div className="uzd-ch__card">
        <i className="uzd-ch__cross uzd-ch__cross--tl" />
        <i className="uzd-ch__cross uzd-ch__cross--tr" />
        <i className="uzd-ch__cross uzd-ch__cross--bl" />
        <i className="uzd-ch__cross uzd-ch__cross--br" />
        {RESULTS.map((r, i) => (
          <figure
            className="uzd-ch__frame"
            key={r.eyebrow}
            style={{ "--i": i, "--share": r.share } as CSSProperties}
          >
            <div className="uzd-ch__top">
              <span className="uzd-ch__eyebrow">{r.eyebrow}</span>
              <span>Measured result</span>
            </div>

            <div className="uzd-ch__body">
              <p className="uzd-ch__hero">
                <span className="uzd-ch__num">
                  {r.num}
                  {r.unit ? <small>{r.unit}</small> : null}
                </span>
                <span className="uzd-ch__word">
                  {r.word[0]}
                  <br />
                  {r.word[1]}
                </span>
              </p>

              <div className="uzd-ch__plot">
                <div className="uzd-ch__bar">
                  <i className="uzd-ch__fill" />
                  <i className="uzd-ch__mark uzd-ch__mark--after" />
                  <i className="uzd-ch__mark uzd-ch__mark--before" />
                  <span className="uzd-ch__note">
                    <span>{r.removed}</span>
                  </span>
                </div>
                <div className="uzd-ch__ruler">
                  {r.ruler.map((t, k) => (
                    <span
                      key={t}
                      style={{ left: `${(k / (r.ruler.length - 1)) * 100}%` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="uzd-ch__legend">
                  <span>
                    <b>{r.after}</b> with Unifize
                  </span>
                  <span>
                    before: <b>{r.before}</b>
                  </span>
                </div>
              </div>
            </div>

            <figcaption className="uzd-ch__foot">
              <span>Published case study</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.logo}
                alt=""
                width={r.logoW}
                height={r.logoH}
                style={{ height: r.logoH }}
              />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
