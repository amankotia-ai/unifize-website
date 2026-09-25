import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { CHANGE_CONTROL_DATA } from "./change-control-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/change-control");

export default function ChangeControlDomainPage() {
  return <SolutionPage data={CHANGE_CONTROL_DATA} rails compact />;
}
