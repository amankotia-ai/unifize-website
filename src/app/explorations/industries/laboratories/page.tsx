import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { LABORATORIES, LABORATORIES_RAILS } from "./laboratories-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/laboratories");

export default function LaboratoriesPage() {
  return <IndustryRailsPage data={LABORATORIES} rails={LABORATORIES_RAILS} />;
}
