import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { REGULATORY_AFFAIRS_DATA } from "./regulatory-affairs-data";

export const metadata: Metadata = {
  title: REGULATORY_AFFAIRS_DATA.meta.title,
  description: REGULATORY_AFFAIRS_DATA.meta.description,
};

export default function RegulatoryAffairsDomainPage() {
  return <SolutionPage data={REGULATORY_AFFAIRS_DATA} rails compact />;
}
