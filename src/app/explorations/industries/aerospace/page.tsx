import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { AEROSPACE, AEROSPACE_RAILS } from "./aerospace-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/aerospace");

export default function AerospacePage() {
  return <IndustryRailsPage data={AEROSPACE} rails={AEROSPACE_RAILS} />;
}
