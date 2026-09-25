import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { POST_MARKET_DATA } from "./post-market-and-recall-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/solution/post-market-and-recall");

export default function PostMarketAndRecallDomainPage() {
  return <SolutionPage data={POST_MARKET_DATA} rails compact />;
}
