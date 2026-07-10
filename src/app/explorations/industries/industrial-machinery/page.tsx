import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { INDUSTRIAL_MACHINERY } from "./industrial-machinery-data";

export const metadata: Metadata = {
  title: INDUSTRIAL_MACHINERY.meta.title,
  description: INDUSTRIAL_MACHINERY.meta.description,
};

export default function IndustrialMachineryPage() {
  return <IndustryPage data={INDUSTRIAL_MACHINERY} />;
}
