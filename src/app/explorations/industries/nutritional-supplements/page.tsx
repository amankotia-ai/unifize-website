import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { NUTRITIONAL_SUPPLEMENTS } from "./nutritional-supplements-data";

export const metadata: Metadata = {
  title: NUTRITIONAL_SUPPLEMENTS.meta.title,
  description: NUTRITIONAL_SUPPLEMENTS.meta.description,
};

export default function NutritionalSupplementsPage() {
  return <IndustryPage data={NUTRITIONAL_SUPPLEMENTS} />;
}
