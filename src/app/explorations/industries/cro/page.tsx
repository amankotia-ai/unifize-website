import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { CRO, CRO_RAILS } from "./cro-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/cro");

export default function CroPage() {
  return <IndustryRailsPage data={CRO} rails={CRO_RAILS} />;
}
