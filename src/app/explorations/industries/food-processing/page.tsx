import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { FOOD_PROCESSING, FOOD_PROCESSING_RAILS } from "./food-processing-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/food-processing");

export default function FoodProcessingPage() {
  return <IndustryRailsPage data={FOOD_PROCESSING} rails={FOOD_PROCESSING_RAILS} />;
}
