import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { LABORATORIES, LABORATORIES_RAILS } from "./laboratories-data";

export const metadata: Metadata = {
  title: LABORATORIES.meta.title,
  description: LABORATORIES.meta.description,
};

export default function LaboratoriesPage() {
  return <IndustryRailsPage data={LABORATORIES} rails={LABORATORIES_RAILS} />;
}
