import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { AEROSPACE } from "./aerospace-data";

export const metadata: Metadata = {
  title: AEROSPACE.meta.title,
  description: AEROSPACE.meta.description,
};

export default function AerospacePage() {
  return <IndustryPage data={AEROSPACE} />;
}
