import type { Metadata } from "next";
import { DomainPage } from "../_shared/DomainPage";
import { CHANGE_CONTROL_DATA } from "./change-control-data";

export const metadata: Metadata = {
  title: CHANGE_CONTROL_DATA.meta.title,
  description: CHANGE_CONTROL_DATA.meta.description,
};

export default function ChangeControlDomainPage() {
  return <DomainPage data={CHANGE_CONTROL_DATA} />;
}
