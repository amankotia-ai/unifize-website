import type { Metadata } from "next";
import { DomainPage } from "../_shared/DomainPage";
import { COMPLIANCE_DATA } from "./compliance-data";

export const metadata: Metadata = {
  title: COMPLIANCE_DATA.meta.title,
  description: COMPLIANCE_DATA.meta.description,
};

export default function ComplianceDomainPage() {
  return <DomainPage data={COMPLIANCE_DATA} />;
}
