import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { SUPPLIER_MANAGEMENT_DATA } from "./supplier-management-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/supplier-management");

export default function SupplierManagementDomainPage() {
  return <SolutionPage data={SUPPLIER_MANAGEMENT_DATA} rails compact />;
}
