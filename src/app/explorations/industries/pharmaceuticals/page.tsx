import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { PHARMACEUTICALS } from "./pharmaceuticals-data";

export const metadata: Metadata = {
  title: PHARMACEUTICALS.meta.title,
  description: PHARMACEUTICALS.meta.description,
};

export default function PharmaceuticalsPage() {
  return <IndustryPage data={PHARMACEUTICALS} />;
}
