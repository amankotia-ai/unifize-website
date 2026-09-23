import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { PHARMACEUTICALS, PHARMACEUTICALS_RAILS } from "./pharmaceuticals-data";

export const metadata: Metadata = {
  title: PHARMACEUTICALS.meta.title,
  description: PHARMACEUTICALS.meta.description,
};

export default function PharmaceuticalsPage() {
  return <IndustryRailsPage data={PHARMACEUTICALS} rails={PHARMACEUTICALS_RAILS} />;
}
