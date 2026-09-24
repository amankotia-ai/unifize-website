import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { NUTRITIONAL_SUPPLEMENTS, NUTRITIONAL_SUPPLEMENTS_RAILS } from "./nutritional-supplements-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/nutritional-supplements");

export default function NutritionalSupplementsPage() {
  return <IndustryRailsPage data={NUTRITIONAL_SUPPLEMENTS} rails={NUTRITIONAL_SUPPLEMENTS_RAILS} />;
}
