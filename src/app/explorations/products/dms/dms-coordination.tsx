/* ----------------------------------------------------------------------------
 * dms-coordination.tsx - "The coordination tax" thesis interstitial that sits
 * between the hero/trust strip and section 01. It frames the category-level
 * premise every Unifize product answers: regulated work stalls in the gaps
 * between people, documents, and systems, and each gap is a tax.
 *
 * What is shared across all four product pages: the headline, the lede, and the
 * right-hand "governed thread" (the platform promise). What is product-specific:
 * the left-hand `leaks` (this product's tax, named in its own world) and the
 * `summary` line (how this product collapses it). Shared by the DMS page and the
 * data-driven ProductPage.
 *
 * Composition: two worlds on one asymmetry. Left, the tax as a register of
 * disconnected surfaces (where the day leaks); right, the answer as one
 * connected governed thread on a single raised panel. Line-work only; brand
 * blue is spent solely on the sealed terminal node. Server component, no state.
 * -------------------------------------------------------------------------- */
import { Eyebrow } from "./dms-primitives";

/* one line-item of the tax: the surface it is paid on, the leak, the cost. */
export type CoordinationLeak = { surface: string; name: string; note: string };

/* the answer, as one governed thread - the platform promise, shared across
 * products. The last node is the single blue key marker. */
const NODES = [
  { name: "One record", note: "The document, the task, and the conversation live in one place." },
  { name: "A named owner", note: "Every step has an owner and a due date, never an inbox." },
  { name: "Decided in the open", note: "The call and the reason are captured where the work happens." },
  { name: "Proven, then sealed", note: "Evidence is bound and the trail closes itself." },
];

export function CoordinationTax({
  leaks,
  summary,
}: {
  leaks: CoordinationLeak[];
  summary: React.ReactNode;
}) {
  return (
    <section className="dms-section dms-section--alt dms-ctax" aria-label="The coordination tax">
      <div className="dms-wrap">
        <div className="dms-head" data-reveal>
          <Eyebrow>The coordination tax</Eyebrow>
          <h2 className="dms-h2">The work is rarely the bottleneck. The coordination is.</h2>
          <p className="dms-lede">
            In a regulated operation, a task seldom stalls because it is hard. It stalls in the gaps between people,
            documents, and systems: an approval waiting in an inbox, a version no one can vouch for, the same fact
            keyed into three tools that now disagree. Every gap is a tax, paid in time and in the ability to prove the
            work was done right.
          </p>
        </div>

        <div className="dms-ctax__grid" data-reveal>
          {/* left - this product's tax, itemised as disconnected surfaces */}
          <div className="dms-ctax__cost">
            <span className="dms-ctax__lab">Where the day goes</span>
            <ul className="dms-ctax__leaks">
              {leaks.map((l) => (
                <li className="dms-ctax__leak" key={l.name}>
                  <span className="dms-ctax__surface">{l.surface}</span>
                  <span className="dms-ctax__leak-main">
                    <span className="dms-ctax__leak-name">{l.name}</span>
                    <span className="dms-ctax__leak-note">{l.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* right - the answer, as one connected governed thread */}
          <div className="dms-ctax__fix">
            <span className="dms-ctax__lab dms-ctax__lab--fix">With Unifize</span>
            <ol className="dms-ctax__thread">
              {NODES.map((nd, i) => {
                const isKey = i === NODES.length - 1;
                return (
                  <li className={"dms-ctax__node" + (isKey ? " is-key" : "")} key={nd.name}>
                    <span className="dms-ctax__mark" aria-hidden="true">
                      <svg className="dms-ctax__tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="square">
                        <path d="M5 12.5 10 17.5 19 7" />
                      </svg>
                    </span>
                    <span className="dms-ctax__node-main">
                      <span className="dms-ctax__node-name">{nd.name}</span>
                      <span className="dms-ctax__node-note">{nd.note}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="dms-ctax__sum">{summary}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
