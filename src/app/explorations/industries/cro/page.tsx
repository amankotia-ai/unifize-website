import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { CRO, CRO_RAILS } from "./cro-data";

export const metadata: Metadata = {
  title: CRO.meta.title,
  description: CRO.meta.description,
};

export default function CroPage() {
  return <IndustryRailsPage data={CRO} rails={CRO_RAILS} />;
}
