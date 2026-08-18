import type { Metadata } from "next";
import { DomainPage } from "../_shared/DomainPage";
import { SUPPLIER_MANAGEMENT_DATA } from "./supplier-management-data";

export const metadata: Metadata = {
  title: SUPPLIER_MANAGEMENT_DATA.meta.title,
  description: SUPPLIER_MANAGEMENT_DATA.meta.description,
};

export default function SupplierManagementDomainPage() {
  return <DomainPage data={SUPPLIER_MANAGEMENT_DATA} />;
}
