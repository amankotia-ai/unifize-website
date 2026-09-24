import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { CHEMICALS, CHEMICALS_RAILS } from "./chemicals-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/chemicals");

export default function ChemicalsPage() {
  return <IndustryRailsPage data={CHEMICALS} rails={CHEMICALS_RAILS} />;
}
