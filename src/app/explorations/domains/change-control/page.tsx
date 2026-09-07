import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { CHANGE_CONTROL_DATA } from "./change-control-data";

export const metadata: Metadata = {
  title: CHANGE_CONTROL_DATA.meta.title,
  description: CHANGE_CONTROL_DATA.meta.description,
};

export default function ChangeControlDomainPage() {
  return <SolutionPage data={CHANGE_CONTROL_DATA} />;
}
