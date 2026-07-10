/* ============================================================================
 * QMS - Quality Management System. PRODUCT page.
 * Renders the shared ProductPage in the DMS design system, driven by QMS_DATA
 * (sourced from the Unifize Products database in Notion). See ../_shared and
 * ../dms for the design system this reuses.
 * ========================================================================== */
import type { Metadata } from "next";
import { ProductPage } from "../_shared/ProductPage";
import { QMS_DATA } from "./qms-data";

export const metadata: Metadata = {
  title: QMS_DATA.metaTitle,
  description: QMS_DATA.metaDescription,
};

export default function QmsProductPage() {
  return <ProductPage data={QMS_DATA} />;
}
