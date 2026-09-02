import type { Metadata } from "next";
import { SiteHeader } from "../home/site-header";
import { Button, Eyebrow, type CellState } from "@/components/atoms";
import { DashboardShell } from "@/components/organisms";
import { PlatformExplorer, type ExploreSection } from "./platform-explorer";

/* ------------------------------------------------------------
 * Section glyphs: 14 cols × 7 rows pixel-art icons that signal
 * the shape of each ingress point.
 * ------------------------------------------------------------ */

// Factory skyline: three buildings of varying heights with a chimney.
const GLYPH_INDUSTRY: CellState[] = [
  "off","off","on","off","off","off","off","off","off","off","off","off","off","off",
  "off","on","on","on","off","off","off","off","off","off","off","on","off","off",
  "off","on","on","on","off","off","off","on","on","off","off","on","on","on",
  "off","on","on","on","off","off","on","on","on","off","off","on","on","on",
  "off","on","on","on","off","off","on","on","on","off","off","on","on","on",
  "off","on","on","on","off","off","on","on","on","off","off","on","on","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
];

// 2×2 quadrant grid: four named domains, each its own enclosure.
const GLYPH_DOMAIN: CellState[] = [
  "on","on","on","on","on","on","off","off","on","on","on","on","on","on",
  "on","off","off","off","off","on","off","off","on","off","off","off","off","on",
  "on","off","off","off","off","on","off","off","on","off","off","off","off","on",
  "on","on","on","on","on","on","off","off","on","on","on","on","on","on",
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
  "on","on","on","on","on","on","off","off","on","on","on","on","on","on",
  "on","off","off","off","off","on","off","off","on","off","off","off","off","on",
];

// Person silhouette: head, shoulders, body.
const GLYPH_BUYER: CellState[] = [
  "off","off","off","off","off","on","on","on","on","off","off","off","off","off",
  "off","off","off","off","on","on","on","on","on","on","off","off","off","off",
  "off","off","off","off","on","on","on","on","on","on","off","off","off","off",
  "off","off","off","off","off","on","on","on","on","off","off","off","off","off",
  "off","off","off","on","on","on","on","on","on","on","on","off","off","off",
  "off","off","on","on","on","on","on","on","on","on","on","on","off","off",
  "off","on","on","on","on","on","on","on","on","on","on","on","on","off",
];

export const metadata: Metadata = {
  title: "Explore the platform by industry, domain, or buyer",
  description:
    "Three doors into Unifize: the industry you operate in, the domain you own, or the buyer you are.",
};

const SECTIONS: ExploreSection[] = [
  {
    id: "industries",
    num: "01",
    eyebrow: "By industry",
    title: "By industry",
    blurb:
      "Where coordination tax lands depends on your regulation, your supply chain, and the failure you can't afford.",
    pattern: GLYPH_INDUSTRY,
    items: [
      {
        num: "01",
        title: "Medical Devices",
        href: "/industries/medical-devices",
        description:
          "Class II and III device OEMs and CDMOs.",
        longDescription:
          "DHF, DMR, CAPA, and design changes have to stay traceable across R&D, QA, manufacturing, and supply chain. Unifize binds the conversation to the device record, so the audit trail builds itself as the work happens.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "21 CFR 820 | ISO 13485 | ISO 14971 | DHF | DHR | DMR | Design Controls | 510(k) | UDI",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "02",
        title: "Pharmaceuticals",
        description:
          "Drug substance and product manufacturers, plus CDMOs and CMOs.",
        longDescription:
          "Deviations, CAPAs, change control, and batch-record review run under 21 CFR 211, ICH Q10, and Annex 11. Unifize keeps every cross-functional decision bound to the regulated record, through to APR and label changes.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "21 CFR Part 210/211 | 21 CFR Part 11 | ICH Q7 / Q9 / Q10 | EU GMP Annex 1 / 11 | APR / PQR",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "03",
        title: "Aerospace",
        description:
          "Airframe, propulsion, and component makers under AS9100.",
        longDescription:
          "Configuration management drives most audit findings, and a NADCAP special-process issue can cost accreditation in 90 days. Unifize binds FAI, ECO, and CDRL work to one defensible trail.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "AS9100 | AS9120 | NADCAP | FAA Part 21 / 145 | FAI (AS9102) | AS6081 | OASIS",
          },
        ],
        meta: "Manufacturing",
      },
      {
        num: "04",
        title: "Industrial Machinery",
        description:
          "Capital equipment makers serving pharma, food, and semiconductor.",
        longDescription:
          "Your customer's compliance bar becomes yours. CE technical files, FAT/SAT packets, and ECOs live across emails and drives today. Unifize puts them in one thread you can ship with the machine.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "CE marking | Machinery Directive 2006/42/EC | ISO 12100 | ISO 13849 | IEC 62443 | 21 CFR Part 11 | IQ / OQ / PQ | FAT / SAT",
          },
        ],
        meta: "Manufacturing",
      },
      {
        num: "05",
        title: "Laboratories",
        description:
          "Clinical, environmental, and QC labs under ISO/IEC 17025.",
        longDescription:
          "Your LIMS handles results, not document control or corrective action. Unifize covers method deviations, non-conformances, and analyst competency, so accreditation surveillance stops being a scramble.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "ISO/IEC 17025 | 21 CFR Part 11 | 21 CFR Part 58 (GLP) | CLIA | CAP | ALCOA+ | A2LA / ANAB / UKAS",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "06",
        title: "Automotive",
        description:
          "OEMs and Tier 1/2 suppliers under IATF 16949.",
        longDescription:
          "PPAP crosses every function, customer-specific requirements stack on top, and 8D never stops. Unifize gives all of it one home, so the customer scorecard doesn't slip.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "IATF 16949 | PPAP | APQP | FMEA | Control Plan | 8D | IMDS | Layered process audit",
          },
        ],
        meta: "Manufacturing",
      },
      {
        num: "07",
        title: "Cosmetics",
        description:
          "Personal-care brands and contract manufacturers under MoCRA.",
        longDescription:
          "MoCRA added facility registration, adverse-event reporting, and safety substantiation. EU rules add a PIF per SKU. Unifize keeps safety files, supplier COAs, and adverse events tied to each SKU.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "MoCRA | 21 CFR Part 700 / 740 | 21 CFR Part 330 (OTC overlap) | ISO 22716 | EU CR 1223/2009 | PIF | AER / SAER",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "08",
        title: "Food Processing",
        description:
          "Food manufacturers under FSMA and GFSI certification.",
        longDescription:
          "HACCP, allergen control, supplier COAs, and corrective actions are high-frequency and weakly tooled in the mid-market. Unifize starts with corrective action and carries through to the GFSI audit.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "FSMA | HACCP | 21 CFR Part 117 (PCHF) | SQF | BRCGS | FSSC 22000 | GFSI | Allergen control",
          },
        ],
        meta: "Food Production",
      },
      {
        num: "09",
        title: "Nutritional Supplements",
        description:
          "Supplement brands and co-manufacturers under 21 CFR Part 111.",
        longDescription:
          "FDA 483s here almost always cite weak document control or CAPA. Unifize gives the brand owner and the co-manufacturer one thread, with trails NSF and USP will accept.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "21 CFR Part 111 | DSHEA | NDI notification | MMR / BPR | NSF supplement | USP Verified | Informed Sport",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "10",
        title: "Chemicals",
        description:
          "Specialty chemical makers serving pharma, food, and industrial markets.",
        longDescription:
          "Supplying pharma brings GMP scrutiny. REACH, TSCA, and process safety add more. Unifize is where change control, supplier qualification, and incident investigation share one trail.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "ICH Q7 | 21 CFR Part 211 | REACH | TSCA | GHS / CLP | OSHA PSM | EPA RMP | DMF | FCN / GRAS",
          },
        ],
        meta: "Manufacturing",
      },
    ],
  },
  {
    id: "domains",
    num: "02",
    eyebrow: "By domain",
    title: "By domain",
    blurb:
      "Each domain has its own owner and workflow. None were built for the seam between systems. Unifize was.",
    pattern: GLYPH_DOMAIN,
    items: [
      {
        num: "01",
        title: "Quality",
        href: "/domains/quality",
        description:
          "CAPAs, deviations, MRB, audit findings.",
        longDescription:
          "Who decided what, when, and on what evidence usually lives in email. Unifize makes the conversation the audit trail, binding the disposition to the record at the moment of decision.",
        meta: "Typically owned by VP Quality / QA Director",
      },
      {
        num: "02",
        title: "Operations",
        description:
          "WIP aging, production holds, schedule instability, MRB backlog.",
        longDescription:
          "Dispositions, engineering calls, and lab results get chased across email all day. Unifize gives every decision a trace and an owner, so the floor never loses a shift to a missing approval.",
        meta: "Typically owned by VP Operations / Plant Manager",
      },
      {
        num: "03",
        title: "Product Development",
        description:
          "Idea to launch, and every change after.",
        longDescription:
          "DHF and design transfer, CMC and tech transfer, stage gates and PPAP: the structure is the same. Unifize keeps gate decisions, exit criteria, and impact assessments in one defensible place.",
        meta: "Typically owned by VP R&D / VP Engineering",
      },
      {
        num: "04",
        title: "Supplier Management",
        description:
          "Supplier qualification, PPAP/APQP, supplier CAPA, incoming inspection.",
        longDescription:
          "A supplier issue starts in email and ages there while Procurement, Supplier Quality, and QA each hold a piece. Unifize gives the supplier one governed channel and your team one queue.",
        meta: "Typically owned by CPO / Supplier Quality Director",
      },
      {
        num: "05",
        title: "Document and Records Control",
        description:
          "Procedure review, approval, controlled distribution, obsolescence.",
        longDescription:
          "Audit findings come from a document in use that can't be tied to an approval record. Unifize handles review, version integrity, and controlled distribution, then fires the training cascade when a procedure changes.",
        meta: "Typically owned by VP Quality / Doc Control Lead",
      },
      {
        num: "06",
        title: "Regulatory Affairs",
        description:
          "MDR/vigilance reporting, submission prep, multi-market label approval.",
        longDescription:
          "A 30-day MDR clock, a 15-day EU clock, and hundreds of label variants, each on its own timeline. Unifize keeps submissions, label changes, and vigilance commitments on one timeline you can defend.",
        meta: "Typically owned by Head of Regulatory Affairs",
      },
      {
        num: "07",
        title: "Change Control",
        description:
          "ECO/ECR sign-off, DHF evidence packaging, controlled distribution.",
        longDescription:
          "Approvals happen in email threads, and design reviews leave no record of why. Unifize captures the impact assessments, accepted conditions, and cut-in plan, so the change record is whole at audit time.",
        meta: "Typically owned by VP Engineering / Head of R&D",
      },
      {
        num: "08",
        title: "Training and Competency",
        description:
          "Training cascades from change control, SOP releases, audit findings.",
        longDescription:
          "Every SOP change should fire a training cascade, but the document system and the training system don't talk. Unifize closes the loop: releasing the SOP starts the cascade and tracks completion.",
        meta: "Typically owned by VP Quality / Head of Training",
      },
      {
        num: "09",
        title: "Customer Management",
        description:
          "RFQ response, bid evaluation, quote management, contract review.",
        longDescription:
          "Bid rationale, qualification context, and approval threads live in email until a dispute or rebid arrives. Unifize keeps the customer thread governed, so the next RFQ inherits the qualification, not the chaos.",
        meta: "Typically owned by VP Sales / Commercial Director",
      },
      {
        num: "10",
        title: "Supply Chain and Planning",
        description:
          "Shortage allocation, PO changes, expedite decisions, supply disruption.",
        longDescription:
          "Three lines compete for the last component. The call happens, the decision sticks, and nobody captures why. Unifize gives the commit point a structure, so the rationale outlives the call.",
        meta: "Typically owned by VP Supply Chain / CPO",
      },
      {
        num: "11",
        title: "Post-Market and Recall",
        description:
          "Complaint investigation, MDR/vigilance reporting, recall scope, FSCA execution.",
        longDescription:
          "A recall runs manufacturing holds, customer notices, returns, and regulatory filings in parallel, all under hard deadlines. Unifize is the one place those workflows share state.",
        meta: "Typically owned by VP Quality / Chief Medical Officer",
      },
      {
        num: "12",
        title: "Periodic Review and Data Governance",
        description:
          "APR, PQR, and data-integrity governance.",
        longDescription:
          "APR and PQR assembly pulls data from production, QA, complaints, stability, and regulatory on a hard deadline. Unifize keeps the evidence indexed and assembly-ready, year over year.",
        meta: "Typically owned by VP Quality / Head of Regulatory Affairs",
      },
      {
        num: "13",
        title: "Procurement and Sourcing",
        description:
          "Sourcing decisions, supplier selection, bid evaluation, commercial governance.",
        longDescription:
          "Award rationale and alternate-qualification context live in email and spreadsheets, and the CPO and Supplier Quality see different parts. Unifize keeps them aligned on one decision record.",
        meta: "Typically owned by CPO / Head of Procurement",
      },
      {
        num: "14",
        title: "Compliance",
        description:
          "CSV validation, data integrity, EHS, regulatory change.",
        longDescription:
          "Compliance often runs as its own governance layer beside the QMS, with its own audit cycle. Unifize gives the Compliance and Validation team a governed thread without forcing them onto the QMS.",
        meta: "Typically owned by Director of Quality Compliance / Validation Manager",
      },
    ],
  },
  {
    id: "buyer",
    num: "03",
    eyebrow: "By buyer",
    title: "By buyer persona",
    blurb:
      "Built for the people accountable for cross-functional execution, and for the auditors and customers who hold them to it.",
    pattern: GLYPH_BUYER,
    items: [
      {
        num: "01",
        title: "Operations Leader",
        href: "/buyers/operations-leader",
        description:
          "COO, VP Operations, Plant Manager, Site Director.",
        longDescription:
          "You're accountable for output, stability, and delivery across a site or company. Unifize turns daily firefighting into a repeatable record without slowing the floor down.",
      },
      {
        num: "02",
        title: "Quality governance",
        description:
          "VP Quality, Quality Director, QA Manager, RAQA Director.",
        longDescription:
          "You own release confidence, audit outcomes, and recurrence. Unifize gives you defensibility by default, so audit prep stops being a sprint.",
      },
      {
        num: "03",
        title: "Regulatory affairs governance",
        description:
          "Head of Regulatory Affairs, VP Regulatory, RA Director.",
        longDescription:
          "You're on the clock for submissions, label currency, and vigilance across markets. Unifize keeps the commitments, evidence chains, and label versions on one timeline.",
      },
      {
        num: "04",
        title: "Compliance & validation",
        description:
          "Validation Manager, CSV Lead, Director of Quality Compliance.",
        longDescription:
          "You keep validated systems defensible without becoming a bottleneck. Unifize captures controlled execution and audit-readiness as a byproduct of the work.",
      },
      {
        num: "05",
        title: "Supplier quality governance",
        description:
          "Supplier Quality Director, SQ Manager, Lead SQE.",
        longDescription:
          "You want zero supplier-caused line stops and clean audits on supplier oversight. Unifize turns the supplier exchange into a governed channel with closure trails the auditor accepts.",
      },
      {
        num: "06",
        title: "Engineering change governance",
        description:
          "VP Engineering, Director of Engineering, NPI Manager, R&D Director.",
        longDescription:
          "You move change through faster without losing control. Unifize keeps the ECO conversation, impact reviews, and cut-in decisions in one thread that survives launch.",
      },
      {
        num: "07",
        title: "Innovation and NPI execution",
        description:
          "VP R&D, Head of NPI, Product Development Director, Design Transfer Lead.",
        longDescription:
          "You ship on time without skipping readiness. Unifize keeps validation, evidence packaging, and design-transfer decisions indexed against the design record.",
      },
      {
        num: "08",
        title: "Manufacturing engineering execution",
        description:
          "Manufacturing Engineering Manager, Process Engineering Manager, IE Manager.",
        longDescription:
          "You keep processes stable while methods change. Unifize handles SOP-cascade adoption at the point of use, so revisions don't cause variation.",
      },
      {
        num: "09",
        title: "Lab operations and release testing",
        description:
          "Lab Manager, QC Manager, LIMS Owner, Quality Control Director.",
        longDescription:
          "Release moves at the speed of evidence completeness. Unifize tightens the loop between the lab decision, the deviation, and the disposition.",
      },
      {
        num: "10",
        title: "Supply chain execution",
        description:
          "VP Supply Chain, Planning Manager, Materials Manager, Logistics Manager.",
        longDescription:
          "You keep materials and finished goods moving while disruption hits. Unifize keeps allocation, expedite, and recovery decisions in one place, with explicit owners.",
      },
      {
        num: "11",
        title: "Procurement decisioning",
        description:
          "CPO, Head of Procurement, Category Manager, Purchasing Manager.",
        longDescription:
          "You want sourcing outcomes Finance will recognise and a compliance posture you can defend. Unifize is where Procurement, Quality, and Engineering converge on one auditable award.",
      },
      {
        num: "12",
        title: "Customer service and field quality",
        description:
          "VP Customer Success, Service Ops Director, Field Quality Manager.",
        longDescription:
          "You're closing complaints faster with less warranty drag. Unifize gives the field, the lab, and the QMS one shared thread for triage and closure.",
      },
      {
        num: "13",
        title: "EHS governance",
        description:
          "EHS Manager, Director of EHS, Safety Manager.",
        longDescription:
          "You own incident-closure discipline and compliance evidence. Unifize keeps the investigation, controls, and effectiveness checks tied to the incident, so recurrence stops climbing.",
      },
      {
        num: "14",
        title: "Finance governance",
        description:
          "CFO, VP Finance, Plant Controller, FP&A Director.",
        longDescription:
          "You protect margin and cash with proof discipline. Unifize attaches the operational decision trail to the saving, so Finance can recognise it.",
      },
      {
        num: "15",
        title: "IT risk & enablement",
        description:
          "CIO, IT Director, Enterprise Architect, CISO, ERP Director.",
        longDescription:
          "You enable the business without adding risk. Unifize is a defensible, validated layer that sits between QMS, ERP, and PLM without expanding shadow IT.",
      },
      {
        num: "16",
        title: "Regulated systems governance",
        description:
          "Director of Quality Systems, Head of Digital Quality, VP IT.",
        longDescription:
          "You're eliminating fragmentation across QMS, ERP, PLM, and MES while staying defensible under Part 11 and Annex 11. Unifize gives the cross-system decision trail one home.",
      },
      {
        num: "17",
        title: "Digital transformation & AI governance",
        description:
          "Head of Digital Transformation, CDO, VP Digital.",
        longDescription:
          "You're building AI capability on regulated data without losing defensibility. Unifize is the structured operational substrate that makes AI outputs auditable under GxP and Part 11.",
      },
      {
        num: "18",
        title: "Leader",
        description:
          "CEO, President, Managing Director.",
        longDescription:
          "You see catastrophic risk, customer trust, and the cost of execution surprises. Unifize makes operational performance auditable across sites and AI investment legible.",
      },
    ],
  },
];

export default function PlatformPage() {
  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero platform-hero">
        <div className="mast-inner">
          <Eyebrow dot>Explore the platform</Eyebrow>
          <h1>
            Three doors.
            <br />
            <em>One governed layer.</em>
          </h1>
          <p className="sub">
            Enter by <strong>industry</strong>, by <strong>domain</strong>, or
            by <strong>buyer</strong>. All three lead to the same governed
            layer.
          </p>
          <div className="hero-ctas">
            <Button arrow size="lg">
              Book a demo
            </Button>
            <Button variant="dark-ghost" size="lg">
              Read the thesis
            </Button>
          </div>
        </div>
      </header>

      <PlatformExplorer sections={SECTIONS} />

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">The governed layer</span>
              <h2 className="section-title close-title">
                Same layer underneath. Different door in.
              </h2>
              <p className="close-sub">
                Whichever door you came in, the work lives in one place, bound
                to the record at the moment of decision. No audit-prep sprint.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Button variant="dark-ghost" size="lg">
                  Back to the homepage
                </Button>
              </div>
            </div>
            <div className="close-visual">
              <DashboardShell />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer surface dark">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Unifize</strong>
          <span>People. Process. AI. Outcomes.</span>
          <span className="site-footer-desc">
            The governed layer for regulated processes.
          </span>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Explore</span>
            <a href="/platform#industries">By industry</a>
            <a href="/platform#domains">By domain</a>
            <a href="/platform#buyer">By buyer</a>
          </div>
          <div>
            <span className="lab">Problem</span>
            <a href="/#thesis">Coordination tax</a>
            <a href="/#domains">The 15 domains</a>
            <a href="/#seam">The seam</a>
          </div>
          <div>
            <span className="lab">By industry</span>
            <a href="/platform#industries">Medical Devices</a>
            <a href="/platform#industries">Pharmaceuticals</a>
            <a href="/platform#industries">Aerospace</a>
            <a href="/platform#industries">Industrial Machinery</a>
          </div>
          <div>
            <span className="lab">How it works</span>
            <a href="/#how">Overview</a>
            <a href="/#benefits">What changes</a>
            <a href="/#proof">Proof</a>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base">
        <span>© Unifize 2026</span>
        <span>v0.7 · Platform exploration</span>
      </div>
    </footer>
  );
}
