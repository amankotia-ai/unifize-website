import type { Metadata } from "next";
import { DomainPage } from "../_shared/DomainPage";
import { POST_MARKET_DATA } from "./post-market-and-recall-data";

export const metadata: Metadata = {
  title: POST_MARKET_DATA.meta.title,
  description: POST_MARKET_DATA.meta.description,
};

export default function PostMarketAndRecallDomainPage() {
  return <DomainPage data={POST_MARKET_DATA} />;
}
