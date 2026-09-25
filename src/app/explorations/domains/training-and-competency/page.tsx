import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { TRAINING_AND_COMPETENCY_DATA } from "./training-and-competency-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/training-and-competency");

export default function TrainingAndCompetencyDomainPage() {
  return <SolutionPage data={TRAINING_AND_COMPETENCY_DATA} rails compact />;
}
