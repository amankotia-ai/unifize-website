import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { COSMETICS } from "./cosmetics-data";

export const metadata: Metadata = {
  title: COSMETICS.meta.title,
  description: COSMETICS.meta.description,
};

export default function CosmeticsPage() {
  return <IndustryPage data={COSMETICS} />;
}
