import type { Metadata } from "next";
import { SolutionPage } from "../_shared/SolutionPage";
import { SUPPLY_CHAIN_AND_PLANNING_DATA } from "./supply-chain-and-planning-data";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/domains/supply-chain-and-planning");

export default function SupplyChainAndPlanningDomainPage() {
  return <SolutionPage data={SUPPLY_CHAIN_AND_PLANNING_DATA} rails compact />;
}
