import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { PROCUREMENT_AND_SOURCING_DATA } from "./procurement-and-sourcing-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/domains/procurement-and-sourcing");

export default function ProcurementAndSourcingDomainPage() {
  return <SolutionPage data={PROCUREMENT_AND_SOURCING_DATA} rails compact />;
}
