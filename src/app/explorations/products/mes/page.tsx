/* ============================================================================
 * MES - Manufacturing Execution System. PRODUCT page.
 * Renders the shared ProductPage in the DMS design system, driven by MES_DATA
 * (sourced from the Unifize Products database in Notion).
 * ========================================================================== */
import type { Metadata } from "next";
import { ProductPage } from "../_shared/ProductPage";
import { MES_DATA } from "./mes-data";

export const metadata: Metadata = {
  title: MES_DATA.metaTitle,
  description: MES_DATA.metaDescription,
};

export default function MesProductPage() {
  return <ProductPage data={MES_DATA} />;
}
