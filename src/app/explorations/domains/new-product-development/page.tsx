import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { NEW_PRODUCT_DEVELOPMENT_DATA } from "./new-product-development-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/new-product-development");

export default function NewProductDevelopmentDomainPage() {
  return <SolutionPage data={NEW_PRODUCT_DEVELOPMENT_DATA} rails compact />;
}
