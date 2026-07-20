/* ============================================================================
 * DEEPER PROBLEM - standalone exploration of the DMS coordination-tax section.
 * One section, nothing else: a five-beat scroll story that follows a single
 * change to SOP-014 through the off-record channels, collects the four
 * symptom readings from the problem section above it, shows the second-order
 * compounding, then replays the same scene on the governed record.
 * Intended to slot into /explorations/products/dms after the problem
 * spotlight, replacing the current before/after coordination visual.
 * ========================================================================== */
import type { Metadata } from "next";
import { DeeperProblemTableau } from "./deeper-problem-story";
import "../../../industry-template-modern/itm.css";
import "../dms.css";
import "../dms-redesign.css";
import "./deeper-problem.css";

export const metadata: Metadata = {
  title: "The deeper problem · DMS section exploration",
  description:
    "Follow one change through your system: where the work goes, what it costs, and what it costs later.",
};

export default function DeeperProblemPage() {
  return (
    <main className="dms dms--redesign">
      <DeeperProblemTableau />
    </main>
  );
}
