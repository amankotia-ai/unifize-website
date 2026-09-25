import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { OPERATIONS_DATA } from "./operations-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/operations");

export default function OperationsDomainPage() {
  return <SolutionPage data={OPERATIONS_DATA} rails compact />;
}
