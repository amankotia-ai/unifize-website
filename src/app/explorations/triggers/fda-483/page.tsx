/* ============================================================================
 * FDA Form 483 issued - the Medical Devices Form 483 TRIGGER page.
 * Renders the shared TriggerPage in the DMS product-page design system, driven
 * by FDA_483_DATA (grounded in the canonical Notion source-of-truth).
 * ========================================================================== */
import type { Metadata } from "next";
import { TriggerPage } from "../_shared/TriggerPage";
import { FDA_483_DATA } from "./fda-483-data";

export const metadata: Metadata = {
  title: FDA_483_DATA.metaTitle,
  description: FDA_483_DATA.metaDescription,
};

export default function Fda483TriggerPage() {
  return <TriggerPage data={FDA_483_DATA} />;
}
