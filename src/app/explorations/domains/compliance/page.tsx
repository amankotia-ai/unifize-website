import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { COMPLIANCE_DATA } from "./compliance-data";

export const metadata: Metadata = {
  title: COMPLIANCE_DATA.meta.title,
  description: COMPLIANCE_DATA.meta.description,
};

export default function ComplianceDomainPage() {
  return <SolutionPage data={COMPLIANCE_DATA} />;
}
