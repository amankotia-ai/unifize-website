import type { Metadata } from "next";
import { DomainPage } from "../_shared/DomainPage";
import { REGULATORY_AFFAIRS_DATA } from "./regulatory-affairs-data";

export const metadata: Metadata = {
  title: REGULATORY_AFFAIRS_DATA.meta.title,
  description: REGULATORY_AFFAIRS_DATA.meta.description,
};

export default function RegulatoryAffairsDomainPage() {
  return <DomainPage data={REGULATORY_AFFAIRS_DATA} />;
}
