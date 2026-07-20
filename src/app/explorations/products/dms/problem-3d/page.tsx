/* ============================================================================
 * PROBLEM 3D - standalone exploration of the DMS problem spotlight with the
 * SVG motion graphics replaced by real-time Three.js scenes (one shared
 * WebGL stage, four symptom scenes). Same section shell, copy, and tokens as
 * /explorations/products/dms; only the stage changes. Intended to be judged
 * against the SVG original before either replaces the other.
 * ========================================================================== */
import type { Metadata } from "next";
import { DMS_PROBLEMS } from "../dms-data";
import { DmsHeader } from "../dms-header";
import { Eyebrow } from "../dms-primitives";
import { DmsProblemSpotlight3D } from "./problem-spotlight-3d";
import "../../../industry-template-modern/itm.css";
import "../dms.css";
import "../dms-redesign.css";
import "./problem-3d.css";

export const metadata: Metadata = {
  title: "The problem, in 3D · DMS section exploration",
  description:
    "The four document control symptoms staged as real-time 3D scenes: retrieval, versions, drift, and evidence assembly.",
};

export default function DmsProblem3dPage() {
  return (
    <main className="dms dms--redesign">
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
              Quality teams spend up to a third of their week hunting for controlled documents across shared drives,
              QMS folders, and email threads.
            </p>
          </header>

          <DmsProblemSpotlight3D items={DMS_PROBLEMS} />

          <div className="dms-problems__bridge">
            <p><strong>Four symptoms, one root cause.</strong> The work isn&rsquo;t the bottleneck; the coordination around it is.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
