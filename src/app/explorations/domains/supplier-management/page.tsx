import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { SUPPLIER_MANAGEMENT_DATA } from "./supplier-management-data";

export const metadata: Metadata = {
  title: SUPPLIER_MANAGEMENT_DATA.meta.title,
  description: SUPPLIER_MANAGEMENT_DATA.meta.description,
};

export default function SupplierManagementDomainPage() {
  return <SolutionPage data={SUPPLIER_MANAGEMENT_DATA} />;
}
