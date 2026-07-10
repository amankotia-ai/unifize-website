/* ============================================================================
 * Quality leadership - the Medical Devices Quality Manager PERSONA page.
 * Renders the shared PersonaPage in the DMS product-page design system, driven
 * by QUALITY_MANAGER_DATA (grounded in the canonical Notion source-of-truth).
 * ========================================================================== */
import type { Metadata } from "next";
import { PersonaPage } from "../_shared/PersonaPage";
import { QUALITY_MANAGER_DATA } from "./quality-manager-data";

export const metadata: Metadata = {
  title: QUALITY_MANAGER_DATA.metaTitle,
  description: QUALITY_MANAGER_DATA.metaDescription,
};

export default function QualityManagerPersonaPage() {
  return <PersonaPage data={QUALITY_MANAGER_DATA} />;
}
