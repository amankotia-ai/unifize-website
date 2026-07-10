import type { Metadata } from "next";
import { IndustryPage } from "../_shared/IndustryPage";
import { AUTOMOTIVE } from "./automotive-data";

export const metadata: Metadata = {
  title: AUTOMOTIVE.meta.title,
  description: AUTOMOTIVE.meta.description,
};

export default function AutomotivePage() {
  return <IndustryPage data={AUTOMOTIVE} />;
}
