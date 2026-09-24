import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { REGULATORY_AFFAIRS_DATA } from "./regulatory-affairs-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/domains/regulatory-affairs");

export default function RegulatoryAffairsDomainPage() {
  return <SolutionPage data={REGULATORY_AFFAIRS_DATA} rails compact />;
}
