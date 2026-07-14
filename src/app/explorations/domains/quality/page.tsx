import type { Metadata } from "next";
import { DomainPage } from "../_shared/DomainPage";
import { QUALITY_DATA } from "./quality-data";

export const metadata: Metadata = {
  title: QUALITY_DATA.meta.title,
  description: QUALITY_DATA.meta.description,
};

export default function QualityDomainPage() {
  return <DomainPage data={QUALITY_DATA} />;
}
