import type { Metadata } from "next";
import { DmsHeader } from "../dms-header";
import { DmsHeroSection } from "../dms-hero-visuals";
import "../../../industry-template-modern/itm.css";
import "../dms.css";
import "../dms-redesign.css";

export const metadata: Metadata = {
  title: "DMS Hero Study · Record with satellites · Unifize",
  robots: { index: false },
};

export default function DmsHeroSatellitesPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows">
      <DmsHeader />
      <DmsHeroSection variant="record-satellites" />
    </main>
  );
}
