import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { CHEMICALS, CHEMICALS_RAILS } from "./chemicals-data";

export const metadata: Metadata = {
  title: CHEMICALS.meta.title,
  description: CHEMICALS.meta.description,
};

export default function ChemicalsPage() {
  return <IndustryRailsPage data={CHEMICALS} rails={CHEMICALS_RAILS} />;
}
