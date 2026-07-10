import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { CHEMICALS } from "./chemicals-data";

export const metadata: Metadata = {
  title: CHEMICALS.meta.title,
  description: CHEMICALS.meta.description,
};

export default function ChemicalsPage() {
  return <IndustryPage data={CHEMICALS} />;
}
