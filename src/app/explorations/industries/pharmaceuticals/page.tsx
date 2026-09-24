import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { PHARMACEUTICALS, PHARMACEUTICALS_RAILS } from "./pharmaceuticals-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/pharmaceuticals");

export default function PharmaceuticalsPage() {
  return <IndustryRailsPage data={PHARMACEUTICALS} rails={PHARMACEUTICALS_RAILS} />;
}
