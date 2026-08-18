/* ============================================================================
 * DMS · STYLIZED · MODULES LAB - a sandbox page holding only the modules
 * section, rebuilt as option 2 from the Aug 5 review: the three module tabs
 * are camera poses on ONE persistent record, so "Three modules. One
 * continuous record." is demonstrated by the camera physically moving between
 * the controlled document, the linked change, and the training cascade.
 * Includes a light/dark toggle for the section (Ben's variable-control check:
 * the dark skin is a class + variable overrides, no component changes).
 * ========================================================================== */
import type { Metadata } from "next";
import { ModulesLab } from "./modules-lab";
import "../../../../industry-template-modern/itm.css";
import "../../dms.css";
import "../../dms-redesign.css";
import "../stylized.css";
import "./modules-lab.css";

export const metadata: Metadata = {
  title: "DMS Modules · Record Camera Lab · Unifize",
  description: "Modules-section exploration: three module tabs as camera poses on one persistent Unifize record, with a light/dark toggle.",
  robots: { index: false },
};

export default function DmsStylizedModulesPage() {
  return (
    <main className="dms dms--redesign dms--stylized stx-mlab-page">
      <ModulesLab />
    </main>
  );
}
