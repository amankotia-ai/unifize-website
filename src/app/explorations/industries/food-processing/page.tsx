import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { FOOD_PROCESSING } from "./food-processing-data";

export const metadata: Metadata = {
  title: FOOD_PROCESSING.meta.title,
  description: FOOD_PROCESSING.meta.description,
};

export default function FoodProcessingPage() {
  return <IndustryPage data={FOOD_PROCESSING} />;
}
