import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { CUSTOMER_MANAGEMENT_DATA } from "./customer-management-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/customer-management");

export default function CustomerManagementDomainPage() {
  return <SolutionPage data={CUSTOMER_MANAGEMENT_DATA} rails compact />;
}
