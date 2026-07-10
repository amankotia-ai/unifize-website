/* ============================================================================
 * PLM - Product Lifecycle Management. PRODUCT page.
 * Renders the shared ProductPage in the DMS design system, driven by PLM_DATA
 * (sourced from the Unifize Products database in Notion).
 * ========================================================================== */
import type { Metadata } from "next";
import { ProductPage } from "../_shared/ProductPage";
import { PLM_DATA } from "./plm-data";

export const metadata: Metadata = {
  title: PLM_DATA.metaTitle,
  description: PLM_DATA.metaDescription,
};

export default function PlmProductPage() {
  return <ProductPage data={PLM_DATA} />;
}
