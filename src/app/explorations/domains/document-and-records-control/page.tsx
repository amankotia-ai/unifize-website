import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { DOCUMENT_AND_RECORDS_CONTROL_DATA } from "./document-and-records-control-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/domains/document-and-records-control");

export default function DocumentAndRecordsControlDomainPage() {
  return <SolutionPage data={DOCUMENT_AND_RECORDS_CONTROL_DATA} rails compact />;
}
