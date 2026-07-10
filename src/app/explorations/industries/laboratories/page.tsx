import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { LABORATORIES } from "./laboratories-data";

export const metadata: Metadata = {
  title: LABORATORIES.meta.title,
  description: LABORATORIES.meta.description,
};

export default function LaboratoriesPage() {
  return <IndustryPage data={LABORATORIES} />;
}
