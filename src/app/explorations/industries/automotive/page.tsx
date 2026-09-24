import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { AUTOMOTIVE, AUTOMOTIVE_RAILS } from "./automotive-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/automotive");

export default function AutomotivePage() {
  return <IndustryRailsPage data={AUTOMOTIVE} rails={AUTOMOTIVE_RAILS} />;
}
