import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { QUALITY_DATA } from "./quality-data";

export const metadata: Metadata = {
  title: QUALITY_DATA.meta.title,
  description: QUALITY_DATA.meta.description,
};

export default function QualityDomainPage() {
  return <SolutionPage data={QUALITY_DATA} rails compact />;
}
