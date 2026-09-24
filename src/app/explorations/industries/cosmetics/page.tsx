import type { Metadata } from "next";
import { IndustryRailsPage } from "../_shared/IndustryRailsPage";
import { COSMETICS, COSMETICS_RAILS } from "./cosmetics-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/industries/cosmetics");

export default function CosmeticsPage() {
  return <IndustryRailsPage data={COSMETICS} rails={COSMETICS_RAILS} />;
}
