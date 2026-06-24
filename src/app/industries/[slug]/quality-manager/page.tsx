/* ------------------------------------------------------------
 * /industries/<slug>/quality-manager — the persona page.
 *
 * Industry-anchored per Ben 2026-06-03 ("we will never have a
 * quality page, we will have a medical device quality page"):
 * this is the Quality Manager AT a medical device company, not a
 * generic buyer page. Linked from the industry page's persona card.
 *
 * Content source of truth: the "Quality governance" persona
 * (PES-3) in the Notion Buyer Personas DB
 * (https://app.notion.com/p/2f0860e6b45e800eac32e781b5931bf6):
 * who they are, the six ways coordination tax shows up in their
 * world, the two-clocks frame, discovery quotes, and "what they
 * need to act" (a number for the CFO → the CT calculator).
 *
 * Structure mirrors the change-control page (2026-06-05 decision):
 * dark hero with matrix glyph → standards strip → recognition
 * section → two clocks → workflow doors → dark close band.
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "../../../home/site-header";
import { Button, MatrixGrid, type CellState } from "@/components/atoms";
import {
  getIndustry,
  listIndustrySlugs,
} from "@/lib/platform-data/industries";
import "./quality-manager.css";

/* ------------------------------------------------------------
 * Matrix glyph — homepage pixel language, portrait 13 × 17.
 * The release signature: the Quality Manager's checkmark, drawn
 * as a lit stroke with its ghost beneath (the record it commits).
 * ------------------------------------------------------------ */
const QM_GLYPH: CellState[] = (() => {
  const grid: CellState[] = Array<CellState>(13 * 17).fill("off");
  const stroke: [number, number][] = [
    [2, 8], [3, 9], [4, 10], [5, 11],
    [6, 10], [7, 9], [8, 8], [9, 7], [10, 6], [11, 5],
  ];
  for (const [c, r] of stroke) grid[(r + 1) * 13 + c] = "low";
  for (const [c, r] of stroke) grid[r * 13 + c] = "on";
  return grid;
})();

/* The six ways coordination tax shows up in this persona's world —
 * PES-3 "How coordination tax shows up", condensed to card length. */
interface TaxCard {
  num: string;
  title: string;
  blurb: string;
}
const QM_TAX: TaxCard[] = [
  {
    num: "01",
    title: "Evidence chasing",
    blurb:
      "The investigation is done, but the proof lives in five systems, three email threads, and a shared drive. Assembling it takes as long as the work.",
  },
  {
    num: "02",
    title: "Review rework",
    blurb:
      "A reviewer opens the package, finds three items missing, and sends it back. Two days to re-assemble. The cycle repeats two or three times per CAPA.",
  },
  {
    num: "03",
    title: "Status meetings",
    blurb:
      "The weekly quality review exists to ask one question: where are we on this? No system can answer it in real time.",
  },
  {
    num: "04",
    title: "Parallel trackers",
    blurb:
      "The Excel tracker runs beside the QMS because the QMS holds the final record, not who owes what right now.",
  },
  {
    num: "05",
    title: "Audit scramble",
    blurb:
      "Three weeks before every audit, the team drops everything to rebuild evidence packets. The work was done. Proving it takes weeks.",
  },
  {
    num: "06",
    title: "Recurrence",
    blurb:
      "The same nonconformance returns because the corrective action never reached the SOP, the training record, and the supplier notification.",
  },
];

/* Standards, voiced to the persona (same notes as the industry page). */
interface StandardRef {
  id: string;
  issuer: string;
  note: string;
}
const QM_STANDARDS: Record<string, StandardRef[]> = {
  "medical-devices": [
    {
      id: "21 CFR 820",
      issuer: "FDA",
      note: "Quality System Regulation: the frame your QMS is audited against.",
    },
    {
      id: "21 CFR Part 11",
      issuer: "FDA",
      note: "Electronic records and signatures. Every approval you sign, compliant by default.",
    },
    {
      id: "ISO 13485",
      issuer: "ISO",
      note: "Medical device QMS, covering your design, production, and post-market processes.",
    },
    {
      id: "ISO 14971",
      issuer: "ISO",
      note: "Risk management across your device lifecycle. Every change is assessed against it.",
    },
    {
      id: "EU MDR",
      issuer: "EU",
      note: "Regulation 2017/745. Your technical documentation, kept current as changes land.",
    },
    {
      id: "21 CFR 803",
      issuer: "FDA",
      note: "Medical Device Reporting: hard 30-day clocks on adverse events; EU vigilance runs 15.",
    },
  ],
};

/* Workflow doors, voiced to the persona. Live = page exists. */
interface WorkflowDoor {
  key: string;
  mod: string;
  name: string;
  blurb: string;
  href?: string;
}
const QM_WORKFLOWS: Record<string, WorkflowDoor[]> = {
  "medical-devices": [
    {
      key: "change-control",
      mod: "Change control",
      name: "Change control",
      blurb:
        "One change request through review, Part 11 sign-off, and the training cascade it triggers. Every affected record updated, the decision trace intact.",
      href: "/industries/medical-devices/change-control",
    },
    {
      key: "capa",
      mod: "Quality",
      name: "CAPA",
      blurb:
        "From nonconformance to verified effectiveness. The investigation and evidence assembly that today run through email and meetings, held in one accountable thread.",
    },
    {
      key: "audit",
      mod: "Quality",
      name: "Audit",
      blurb:
        "Internal or external, the evidence surfaces in clicks. Findings route into CAPA with ownership attached, so nothing waits on the report to close.",
    },
    {
      key: "sop",
      mod: "Documents",
      name: "SOP revision",
      blurb:
        "A controlled document from draft to effective: review, e-signature, publish, and the training obligations that follow, all on one record.",
    },
  ],
};

export function generateStaticParams() {
  return listIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry not found" };
  return {
    title: `Quality Manager · ${industry.title} · Unifize`,
    description: `For the Quality Manager at a ${industry.title.toLowerCase()} company: accountable for compliance outcomes without owning the coordination that produces them.`,
  };
}

export default async function QualityManagerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  /* persona pages exist only where the content has been built */
  const standards = QM_STANDARDS[slug];
  const workflows = QM_WORKFLOWS[slug];
  if (!industry || !standards || !workflows) notFound();

  return (
    <main>
      <SiteHeader />

      {/* HERO — the persona, named in their industry. The sub is PES-3's
          structural tension: accountable for outcomes without owning the
          coordination that produces them. */}
      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="qm-hero-grid">
            <div className="qm-hero-copy">
              <div className="detail-breadcrumb">
                <Link href="/platform#industries">Industries</Link>
                <span className="sep">/</span>
                <Link href={`/industries/${industry.slug}`}>
                  {industry.title}
                </Link>
                <span className="sep">/</span>
                <span>Quality Manager</span>
              </div>
              {/* hardcoded industry phrasing is safe: the content gate above
                  means this page only renders for medical-devices today */}
              <h1>
                <span className="qm-hero-line">For the Quality Manager</span>
                <br />
                <span className="qm-hero-line">at a medical device company</span>
              </h1>
              <p className="sub">
                You own the QMS, the CAPA process, audit readiness, and release
                authority. The coordination that produces those outcomes runs
                through email, meetings, and trackers you do not control. That
                gap has a name, and a number.
              </p>
              <div className="hero-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Link
                  href="/coordination-tax-calculator"
                  className="btn btn-dark-ghost btn-lg"
                >
                  See your number
                </Link>
              </div>
            </div>
            <div className="qm-hero-visual" aria-hidden="true">
              <MatrixGrid cols={13} rows={17} cells={QM_GLYPH} />
            </div>
          </div>
        </div>
      </header>

      {/* STANDARDS — the frame this persona answers to, before we ask
          anything of them (the change-control page's pattern). */}
      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">The frame you answer to</span>
            <p className="detail-aside-blurb">
              Each of these demands proof of how the work happened. The trail
              should be built as the work happens, not reconstructed in the
              three weeks before an audit.
            </p>
          </div>
          <div className="detail-body">
            <div className="qm-std-grid">
              {standards.map((s) => (
                <div key={s.id} className="qm-std-card">
                  <span className="iss">{s.issuer}</span>
                  <span className="id">{s.id}</span>
                  <p className="note">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECOGNITION — the six ways coordination tax shows up in this
          persona's world (PES-3), led by a verbatim discovery quote. */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Where your week goes</span>
            <h2 className="section-title">Sound familiar?</h2>
            <p className="qm-quote">
              &ldquo;We spend more time assembling evidence than doing the
              actual investigation.&rdquo;
              <span className="qm-quote-attr">
                What quality leaders tell us in discovery
              </span>
            </p>
          </div>
          <div className="link-grid">
            {QM_TAX.map((t) => (
              <div key={t.num} className="link-card">
                <span className="link-card-eyebrow">{t.num}</span>
                <h3 className="link-card-title">{t.title}</h3>
                <p className="link-card-blurb">{t.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE TWO CLOCKS — why the QMS can't see it (PES-3 concept #3),
          and the coexistence boundary this persona needs to hear. */}
      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">Why the QMS can&apos;t see it</span>
          </div>
          <div className="detail-body">
            <p className="detail-prose">
              Your QMS captures what is officially true: the approved CAPA, the
              released document, the signed record. The work that produces that
              record happens in email, meetings, and Excel. Those are two
              different clocks, and the gap between them is where evidence gets
              lost and decisions become untraceable.
            </p>
            <p className="detail-prose">
              Unifize closes the gap by turning each cross-functional event
              into an accountable thread, so proof is generated as the work
              happens, not reconstructed under pressure. Your QMS stays the
              system of record. Unifize coexists with it and captures the
              execution around it.
            </p>
          </div>
        </div>
      </section>

      {/* WORKFLOWS — the doors into the platform, change control first
          (the journey page that exists). */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Your workflows</span>
            <h2 className="section-title">
              The work your team runs every week, governed end to end.
            </h2>
            <p className="wf-lede">
              Walk change control first: one change, every affected record,
              and the decision trace intact at every step.
            </p>
          </div>
          <div className="qm-wf-grid">
            {workflows.map((w) => {
              const body = (
                <>
                  <span className="mod">{w.mod}</span>
                  <h3 className="name">{w.name}</h3>
                  <p className="sum">{w.blurb}</p>
                  <span className="cta">
                    {w.href ? "Walk the journey →" : "Coming next"}
                  </span>
                </>
              );
              return w.href ? (
                <Link key={w.key} href={w.href} className="qm-wf-card">
                  {body}
                </Link>
              ) : (
                <div key={w.key} className="qm-wf-card ghost">
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSE — what this persona needs to act (PES-3): a number they
          can take to their CFO. The calculator is that number. */}
      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">The number</span>
              <h2 className="section-title close-title">
                A number you can take to your CFO.
              </h2>
              <p className="close-sub">
                The coordination tax estimate translates a busy quality team
                into dollars per year, concentrated in the workflow families
                that cost the most. Without the number you can describe the
                pain. With it, you can get budget.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Link
                  href="/coordination-tax-calculator"
                  className="btn btn-dark-ghost btn-lg"
                >
                  See your number
                </Link>
              </div>
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
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Explore</span>
            <Link href="/platform#industries">By industry</Link>
            <Link href="/platform#domains">By domain</Link>
            <Link href="/platform#buyer">By buyer</Link>
          </div>
          <div>
            <span className="lab">Problem</span>
            <Link href="/#thesis">Coordination tax</Link>
            <Link href="/#seam">The seam</Link>
            <Link href="/#how">The governed layer</Link>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base">
        <span>© Unifize 2026</span>
      </div>
    </footer>
  );
}
