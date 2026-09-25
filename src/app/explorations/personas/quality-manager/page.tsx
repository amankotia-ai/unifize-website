/* ============================================================================
 * The Quality Manager role page (PPS-2), on the rails (25 Sep 2026).
 * Served at /personas/quality-manager; reached from the "Who it is for"
 * roster on the DMS and QMS product pages, not from the nav.
 * ========================================================================== */
import type { Metadata } from "next";
import { pageMetadata } from "@/app/explorations/_shared/seo";
import { PersonaRailsPage } from "../_shared/PersonaRailsPage";
import { QUALITY_MANAGER_DATA } from "./quality-manager-data";

export const metadata: Metadata = pageMetadata(QUALITY_MANAGER_DATA.path);

export default function QualityManagerPage() {
  return <PersonaRailsPage data={QUALITY_MANAGER_DATA} />;
}
