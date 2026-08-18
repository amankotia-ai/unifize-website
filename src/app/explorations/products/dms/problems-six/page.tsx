/* ============================================================================
 * PROBLEMS SIX - standalone exploration of the DMS problem section at six
 * cards instead of four, answering Ben's "you've chosen four at the exclusion
 * of the others" point. Same section shell, spotlight, and tokens as
 * /explorations/products/dms; adds PP-49 on the retrieval graphic and PP-17
 * on the drift graphic (the two unused illustration kinds), and the tab rail
 * drifts to two rows of three. Judged here before it replaces the original.
 * ========================================================================== */
import type { Metadata } from "next";
import { DMS_PROBLEMS, type DmsCoordinationProblem } from "../dms-data";
import { DmsHeader } from "../dms-header";
import { Eyebrow } from "../dms-primitives";
import { DmsProblemSpotlight } from "../dms-problem-visuals";
import "../../../industry-template-modern/itm.css";
import "../dms.css";
import "../dms-redesign.css";
import "./problems-six.css";

export const metadata: Metadata = {
  title: "The problem, at six · DMS section exploration",
  description:
    "The DMS problem spotlight extended from four symptoms to six, all traced to Pain Points DB rows: audit rebuild, version drift, submissions, change effectivity, training cascade, and standard work.",
};

/* Two additions to the shipped slate, same discipline: each card traces to a
 * Pain Points DB row and quotes its attached Symptom row verbatim. */
const ADDITIONS: DmsCoordinationProblem[] = [
  {
    /* PP-49 · Critical · Change Control + Document Control */
    visual: "retrieval",
    category: "Regulatory submissions",
    title: "The submission cites a version that no longer exists",
    quote: "Changes get made but half the people are still working from the old version.",
    detail: "Submissions cite controlled documents by number and revision. When the document revises after filing, the cross-reference quietly stales: the submission says see SOP X v3, and SOP X is at v5.",
    metric: "Stale",
    metricLabel: "Cross-references after the next revision",
    work: "File the submission",
    tax: ["Chase every cited revision", "Reconcile the filing against the library"],
    outcome: "References track the revision",
  },
  {
    /* PP-17 · High · Standard Work Documentation */
    visual: "drift",
    category: "Standard work",
    title: "The line drifts from the standard, silently",
    quote: "Operators know the workarounds but none of them are documented.",
    detail: "The documented standard and the running standard diverge slowly, and nobody flags it because the line is producing. The drift surfaces when a new operator joins or an auditor walks.",
    metric: "Silent",
    metricLabel: "Until a new hire or an auditor arrives",
    work: "Run to standard",
    tax: ["Compare practice against paper", "Chase the undocumented workaround"],
    outcome: "Practice and paper reconciled",
  },
];

/* order: the document story first (audit rebuild, version drift, submissions),
 * then the propagation story (change, training, floor practice) */
const SIX_PROBLEMS: DmsCoordinationProblem[] = [
  DMS_PROBLEMS[0],
  DMS_PROBLEMS[1],
  ADDITIONS[0],
  DMS_PROBLEMS[2],
  DMS_PROBLEMS[3],
  ADDITIONS[1],
];

export default function DmsProblemsSixPage() {
  return (
    <main className="dms dms--redesign dms-probx6">
      <DmsHeader />

      <section className="dms-section dms-problems" id="problem" aria-labelledby="dms-problems-title">
        <div className="dms-wrap dms-problems__inner">
          <header className="dms-problems__intro">
            <div className="dms-problems__head">
              <Eyebrow n={1}>The problem</Eyebrow>
              <h2 className="dms-h2" id="dms-problems-title">
                You have the document. Nobody can find it when it matters.
              </h2>
            </div>
            <p className="dms-lede">
              The patterns repeat across regulated operations, from the audit pull that takes days to the
              retraining that arrives weeks late. Every one of them is coordination, not work.
            </p>
          </header>

          <DmsProblemSpotlight items={SIX_PROBLEMS} />

          <div className="dms-problems__bridge">
            <p><strong>Six symptoms, one root cause.</strong> The work isn&rsquo;t the bottleneck; the coordination around it is.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
