import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { CRO } from "./cro-data";

export const metadata: Metadata = {
  title: CRO.meta.title,
  description: CRO.meta.description,
};

export default function CroPage() {
  return <IndustryPage data={CRO} />;
}
