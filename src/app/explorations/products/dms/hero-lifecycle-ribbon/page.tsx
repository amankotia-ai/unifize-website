import type { Metadata } from "next";
import { DmsHeader } from "../dms-header";
import { DmsHeroSection } from "../dms-hero-visuals";
import "../../../industry-template-modern/itm.css";
import "../dms.css";
import "../dms-redesign.css";

export const metadata: Metadata = {
  title: "DMS Hero Study · Lifecycle ribbon · Unifize",
  robots: { index: false },
};

export default function DmsHeroLifecycleRibbonPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows">
      <DmsHeader />
      <DmsHeroSection variant="lifecycle-ribbon" />
    </main>
  );
}
