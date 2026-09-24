import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { QUALITY_DATA } from "./quality-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/domains/quality");

export default function QualityDomainPage() {
  return <SolutionPage data={QUALITY_DATA} rails compact />;
}
