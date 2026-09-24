import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { INDUSTRIAL_MACHINERY, INDUSTRIAL_MACHINERY_RAILS } from "./industrial-machinery-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/industrial-machinery");

export default function IndustrialMachineryPage() {
  return <IndustryRailsPage data={INDUSTRIAL_MACHINERY} rails={INDUSTRIAL_MACHINERY_RAILS} />;
}
