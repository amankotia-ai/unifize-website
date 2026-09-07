import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { POST_MARKET_DATA } from "./post-market-and-recall-data";

export const metadata: Metadata = {
  title: POST_MARKET_DATA.meta.title,
  description: POST_MARKET_DATA.meta.description,
};

export default function PostMarketAndRecallDomainPage() {
  return <SolutionPage data={POST_MARKET_DATA} />;
}
