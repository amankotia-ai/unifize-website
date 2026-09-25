import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { COMPLIANCE_DATA } from "./compliance-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/compliance");

export default function ComplianceDomainPage() {
  return <SolutionPage data={COMPLIANCE_DATA} rails compact />;
}
