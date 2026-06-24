import type { IndustryPageData } from "./types";

export const INDUSTRIES: Record<string, IndustryPageData> = {
  "medical-devices": {
    slug: "medical-devices",
    title: "Medical Devices",
    vertical: "Life Sciences",
    promise:
      "Built for Class II & III device OEMs and CDMOs, where every change, every CAPA, and every complaint has to stay traceable across functions.",
    failureEvent:
      "An FDA Warning Letter, or worse a consent decree, pointing to a gap in your design-history file, a CAPA that never closed, or a change that didn't propagate to every affected record.",
    standards: [
      "21 CFR 820",
      "ISO 13485",
      "ISO 14971",
      "DHF",
      "DHR",
      "DMR",
      "Design Controls",
      "510(k)",
      "PMA",
      "MDR",
      "UDI",
      "EU MDR",
    ],
    weekNarrative: [
      "Your DHF, DMR, and CAPA work has to stay traceable across R&D, QA, manufacturing, and supply chain, without slowing the team down. Design transfer is one of the highest-density coordination events in your year. Every design change should propagate to every affected record, every training file, and every supplier.",
      "Most of that work today lives across Outlook, Teams, shared drives, and a handful of spreadsheets. Unifize sits inside the quality team's day-to-day and binds the conversation to the device record, so the audit trail is built as the work happens, not reconstructed the week before an FDA visit.",
    ],
    driftStations: [
      {
        num: "01",
        title: "Quality",
        trigger:
          "A CAPA opens. Five owners hold five pieces of the same thread before the record exists.",
        metric: "6 owners · 1 thread",
        persona: "VP Quality / QA Director",
        anchor: "It begins in Quality.",
        weight: "deep",
        /* 2026-06-05: points at the workflows drill-down on this page
         * (was /domains/quality, the superseded v1 domain route). */
        href: "#workflows",
      },
      {
        num: "02",
        title: "Product Development",
        trigger:
          "Design transfer touches six teams and a calendar of meetings. The DHF is spread across nine folders and three drives.",
        metric: "6 functions · 9 weeks to close",
        persona: "VP R&D / NPI Program Director",
        anchor: "Then in Product Development.",
        weight: "deep",
        href: "/domains/product-development",
      },
      {
        num: "03",
        title: "Supplier Management",
        trigger:
          "A supplier deviation arrives. The SCAR cycle starts in email and ages there. PPAP submissions move across spreadsheets.",
        metric: "60% of SCARs · zero QMS trace",
        persona: "Supplier Quality Director",
        anchor: "And in Supplier Management.",
        weight: "deep",
        href: "/domains/supplier-management",
      },
      {
        num: "04",
        title: "Regulatory Affairs",
        trigger:
          "A submission window opens. MDR clocks tick in 30-day and 15-day cycles. Label variants live in spreadsheets keyed by country.",
        metric: "30+ owners · hours of latency",
        persona: "Head of Regulatory Affairs",
        anchor: "In Regulatory Affairs.",
        weight: "light",
        href: "/domains/regulatory-affairs",
      },
      {
        num: "05",
        title: "Post-Market and Recall",
        trigger:
          "Complaints trend upward. A recall coordinates hold, returns, customer notifications, and regulatory filings in parallel.",
        metric: "47 complaints · zero narrative",
        persona: "VP Quality / Chief Medical Officer",
        anchor: "And it does not stop in Post-Market.",
        weight: "light",
        href: "/domains/post-market-and-recall",
      },
    ],
    /* Product Personas — source of truth: Notion Industries record
     * (IND-28) → Product Personas relation, PPS-1..4 (2026-06-05). */
    personas: [
      {
        slug: "capa-investigator",
        title: "CAPA Investigator",
        blurb:
          "You own the investigation end to end. The deliverable is a defensible, audit-ready record, but the day disappears into status-chasing and reconciliation.",
      },
      {
        slug: "quality-manager",
        title: "Quality Manager",
        blurb:
          "Dozens of decisions pending across CAPAs, change controls, and deviations, and every one of them has to be visible and defensible when the auditor asks.",
      },
      {
        slug: "document-approver",
        title: "Document Approver",
        blurb:
          "Your signature is the commit point. It has to mean you engaged: re-authenticated, timestamped, defensible. Not a rubber stamp on a PDF.",
      },
      {
        slug: "audit-lead",
        title: "Audit Lead",
        blurb:
          "You audit a scope against a standard. On good days the evidence surfaces in clicks. On bad ones, it's a reconstruction project.",
      },
    ],
    channels: [
      "MD&M West (Anaheim) / East (New York)",
      "OMTEC — orthopedic device manufacturing",
      "AdvaMed MedTech Conference",
      "AAMI Exchange",
      "RAPS Regulatory Convergence",
      "FDA / Xavier University Regulatory Conference",
    ],

    /* Regulatory frame pills shown under the hero promise — device class
     * and the standards a Class II/III OEM is audited against (IND-28). */
    frame: [
      "Class II & III",
      "21 CFR 820",
      "ISO 13485",
      "ISO 14971",
      "EU MDR 2017/745",
      "21 CFR Part 11",
    ],

    /* Primary Fear Anchor (IND-28), rewritten POV. */
    fearAnchor: {
      eyebrow: "What's at stake",
      headline: "Your auditor won't ask what you decided. They'll ask how — and when.",
      primary:
        "An FDA Warning Letter, a 483 observation, or a consent decree citing a broken trace: design inputs that no longer tie to outputs, a CAPA closed without effectiveness evidence, a device history record that can't be reconstructed on request.",
      secondary:
        "Or the failure that ships — a design change that never propagated to every affected record, every training file, and every supplier — surfacing months later as a recall.",
    },

    /* Coordination surface — Opportunity field (IND-28): covered across
     * 9 of 12 coordination domains. Distinct from the 5 domain ingress
     * stations above; this is the breadth story. */
    coordinationSurface: {
      eyebrow: "The coordination surface",
      headline: "Land in Quality. The same record runs next door.",
      lede: "A Class II or III manufacturer runs the same traceable record across nine of the twelve coordination domains Unifize covers. One non-conformance pulls in suppliers, manufacturing, document control, and training — and every handoff is where the trace breaks. You start where audit pressure lands first, then expand on the same records, with no second system to reconcile.",
      covered: 9,
      total: 12,
      motions: [
        {
          title: "Design transfer & DHF",
          body: "The highest-density coordination event in your year — qualification, validation, training, and DHF completeness across R&D, manufacturing engineering, QA, and supply chain, at once.",
          status: "established",
        },
        {
          title: "CAPA & effectiveness",
          body: "Investigation, root cause, and effectiveness evidence held in one governed thread, so a closed CAPA doesn't quietly reopen under a new number three months later.",
          status: "established",
        },
        {
          title: "Supplier quality",
          body: "PPAP, MRB disposition, and SCAR cycles that today age in email, bound to the part and the supplier they apply to.",
          status: "established",
        },
        {
          title: "Change control & ECO",
          body: "One change, routed through review and Part 11 sign-off, propagated to every affected record and the training cascade it triggers.",
          status: "established",
        },
        {
          title: "Training & competency",
          body: "Every procedure change triggers a training cascade. Completion tracked against the effective date — because the gap between the two is an audit target.",
          status: "emerging",
        },
        {
          title: "MDR & vigilance",
          body: "Hard 30-day FDA and 15-day EU clocks, with the awareness date and any non-reporting rationale captured where the decision is made.",
          status: "emerging",
        },
        {
          title: "Document & records control",
          body: "Review cycles, training linkage, and periodic review — among the top FDA findings whenever a version in use can't be tied to its approval.",
          status: "emerging",
        },
        {
          title: "Multi-market label governance",
          body: "Twenty-plus country variants, each with its own approval status and effective date, off the spreadsheet and onto a controlled record.",
          status: "emerging",
        },
        {
          title: "Recall & FSCA",
          body: "The highest-coordination event there is — hold, customer notifications, returns, and multi-authority filings running in parallel under one trace.",
          status: "emerging",
        },
      ],
    },

    /* Regulatory Vocabulary (IND-28) — the language the page speaks. */
    vocabulary: [
      "DHF",
      "DHR",
      "DMR",
      "Design Controls",
      "Design V&V",
      "510(k)",
      "PMA",
      "ISO 14971",
      "Risk management file",
      "Traceability matrix",
      "ECO",
      "Design review",
      "NCR",
      "Complaint handling",
      "UDI",
      "IQ / OQ / PQ",
      "Process validation",
      "Batch record",
      "Lot history record",
      "MDR reporting",
    ],

    /* Competitive Landscape (IND-28), rewritten to position Unifize as the
     * adjacent coordination layer — not a QMS rip-and-replace. */
    qmsContrast: {
      eyebrow: "Where your QMS stops",
      headline: "Your QMS records the outcome. It doesn't hold how you got there.",
      systems: ["MasterControl", "Veeva Vault", "ETQ Reliance", "Greenlight Guru", "Arena"],
      qms: {
        label: "Your system of record",
        body: "A document-centric QMS tracks the closed CAPA, the approved ECO, the effective SOP — the status of a record. The reasoning, the alternatives weighed, and the approver chain that produced it land in email and meetings.",
      },
      unifize: {
        label: "The coordination layer",
        body: "Unifize sits beside your validated QMS and reconstructs the decision trace across functions as the work happens. The disposition lands in your QMS bound to the thread that produced it — so you never displace the system you're audited on.",
      },
    },

    /* Proof Requirement (IND-28) — the evidence bar this segment holds. No
     * invented metrics: we state the standard, not fabricated numbers. */
    proof: {
      eyebrow: "The proof we bring",
      headline: "Proof from a device maker like you — not a logo wall.",
      lede: "Buyers in this segment hold a high evidence bar, and they should. A Class II capital-equipment team won't accept proof from a single-use disposable shop until they see the same DHF and V&V coordination problem, solved.",
      points: [
        {
          label: "Same class, same frame",
          body: "Evidence from a company of comparable device classification and regulatory environment — because the coordination problem has to be structurally yours.",
        },
        {
          label: "Quantified, not vibes",
          body: "Measured reductions in audit-preparation time, CAPA closure cycle, and engineering-change cycle time — the minimum standard we hold ourselves to.",
        },
        {
          label: "Named, not anonymous",
          body: "A case study with a named company and a real workflow, preferred over an anonymized metric on a slide.",
        },
      ],
    },
  },
};

export function getIndustry(slug: string): IndustryPageData | undefined {
  return INDUSTRIES[slug];
}

export function listIndustrySlugs(): string[] {
  return Object.keys(INDUSTRIES);
}
