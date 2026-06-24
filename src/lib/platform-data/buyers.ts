import type { BuyerPageData } from "./types";

export const BUYERS: Record<string, BuyerPageData> = {
  "operations-leader": {
    slug: "operations-leader",
    title: "Operations Leader",
    typicalTitles:
      "COO · VP Operations · Plant Manager · General Manager · Site Director",
    promise:
      "You're accountable for output, stability, and delivery — across a site, a business unit, or a company.",
    weekNarrative: [
      "Your week starts with the shipments that didn't go out. By Tuesday it's the hold that's still open. By Thursday it's the supplier issue that nobody's owned end-to-end. The decisions that move the floor aren't the slow ones — they're the ones with no clear record of who decided what, with what evidence, and why.",
      "You don't want a new system. You want the work that's already happening — the calls, the threads, the dispositions — to leave a trail you can stand behind. Unifize turns daily firefighting into a repeatable record without adding ceremony.",
    ],
    recognitions: [
      "You can't tell at a glance which production holds are aging past their window",
      "Shortage allocation calls happen, decisions get made, and no one captures why",
      "The same supplier issue resurfaces because the previous closure didn't stick",
      "Audit prep eats two weeks of your quality team every cycle",
      "Cross-site execution is repeatable on paper but inconsistent in practice",
    ],
    driftStations: [
      {
        num: "01",
        title: "Quality",
        trigger:
          "The largest accumulator of coordination tax — and your most visible audit surface. CAPAs, deviations, MRB, and audit findings.",
        metric: "Primary entry",
        persona: "Owned with your VP Quality",
        anchor: "You enter through Quality.",
        weight: "deep",
        href: "/domains/quality",
      },
      {
        num: "02",
        title: "Supplier Management",
        trigger:
          "Supplier-caused line stops, incoming-inspection backlogs, SCAR aging, and the SCAR-to-PO governance that crosses Quality and Procurement.",
        metric: "Cross-functional",
        persona: "Owned with your CPO / SQ Director",
        anchor: "Then in Supplier Management.",
        weight: "deep",
        href: "/domains/supplier-management",
      },
      {
        num: "03",
        title: "Product Development",
        trigger:
          "Design transfer and NPI programs that determine whether next quarter's launch ships on time — and whether the cut-in is clean.",
        metric: "Launch-readiness",
        persona: "Owned with your VP R&D",
        anchor: "And in Product Development.",
        weight: "light",
        href: "/domains/product-development",
      },
    ],
    industries: [
      {
        slug: "medical-devices",
        title: "Medical Devices",
        blurb: "Where regulated coordination is most dense.",
      },
      {
        slug: "pharmaceuticals",
        title: "Pharmaceuticals",
        blurb: "Where the cost of a missed deviation is permanent.",
      },
      {
        slug: "aerospace",
        title: "Aerospace",
        blurb: "Where a single special-process finding revokes accreditation.",
      },
      {
        slug: "automotive",
        title: "Automotive",
        blurb: "Where the customer scorecard governs the business.",
      },
    ],
    outcomes: [
      "Production holds close on cycle, with a trail you can point to",
      "Audit prep stops being a sprint — the trail is built as the work happens",
      "Repeat issues fall off as effectiveness checks actually close",
      "Cross-site execution gets measurably more consistent",
    ],
  },
};

export function getBuyer(slug: string): BuyerPageData | undefined {
  return BUYERS[slug];
}

export function listBuyerSlugs(): string[] {
  return Object.keys(BUYERS);
}
