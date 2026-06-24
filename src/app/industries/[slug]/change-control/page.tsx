/* ------------------------------------------------------------
 * Change Control × Industry — re-parent of the domains-v2 page.
 *
 * 2026-06-03 call with Ben: "We will not ever have a quality page.
 * We will have a medical device quality page … you're doing a change
 * control process, which is a very specific workflow within quality
 * management for a medical device company. Re-parent the URL."
 *
 * This route lives at /industries/<slug>/change-control
 * (today: /industries/medical-devices/change-control).
 *
 * What changed vs /domains-v2/<slug> — ABOVE the flow only:
 *   - Breadcrumb: Industries / <Industry> / Change control
 *     (was Platform / By domain)
 *   - Hero: "Change control for <Industry>" with quality-management
 *     eyebrow (was generic domain title + tier/owner eyebrow)
 *   - NEW standards strip between hero and §01 — ISO 13485,
 *     21 CFR 820, Part 11 ("they scroll down and they see the
 *     standards … and they go: we get it")
 *
 * §01 onward follows src/app/domains-v2/[slug]/page.tsx — the flow
 * Ben approved on 2026-06-03 — with one deliberate divergence
 * (2026-06-05): JourneySteps is unmounted; the ProcessStraighten
 * canvas sits directly under the §01 section head.
 * The Part 11 badge on the approval step inside the flow itself is
 * deferred (flow untouched per 2026-06-04 instruction).
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "../../../home/site-header";
import { Button, MatrixGrid, type CellState } from "@/components/atoms";
import {
  CompressionStoryV2,
  AIReadStory,
  MoneyShot,
  ProcessStraighten,
  CoexistenceLayer,
  type CoexistenceContext,
} from "@/components/workflow";
import { DashboardShell } from "@/components/organisms";
import {
  getIndustry,
  listIndustrySlugs,
} from "@/lib/platform-data/industries";
import { getWorkflow } from "@/lib/platform-data/workflows";
import "./change-control.css";

/* ------------------------------------------------------------
 * Matrix glyph — same pixel-art language as the homepage glyphs,
 * portrait 13 × 17 for the hero column.
 *
 * Δ — the symbol of change, drawn as a cascade: the change enters
 * at the apex (lit), propagates outward along the ghost edges —
 * documents, approvals, training, suppliers — and lands as the
 * full-width lit baseline: every affected record updated. Same
 * full-baseline motif as the homepage comb glyph.
 * ------------------------------------------------------------ */
const MATRIX_CHANGE_CONTROL: CellState[] = [
  "off","off","off","off","off","off","off","off","off","off","off","off","off",
  // the change is raised
  "off","off","off","off","off","off","on","off","off","off","off","off","off",
  // it propagates — the delta's ghost edges
  "off","off","off","off","off","off","low","off","off","off","off","off","off",
  "off","off","off","off","off","low","off","low","off","off","off","off","off",
  "off","off","off","off","off","low","off","low","off","off","off","off","off",
  "off","off","off","off","low","off","off","off","low","off","off","off","off",
  "off","off","off","off","low","off","off","off","low","off","off","off","off",
  "off","off","off","low","off","off","off","off","off","low","off","off","off",
  "off","off","off","low","off","off","off","off","off","low","off","off","off",
  "off","off","low","off","off","off","off","off","off","off","low","off","off",
  "off","off","low","off","off","off","off","off","off","off","low","off","off",
  "off","low","off","off","off","off","off","off","off","off","off","low","off",
  "off","low","off","off","off","off","off","off","off","off","off","low","off",
  "low","off","off","off","off","off","off","off","off","off","off","off","low",
  // every affected record, updated
  "on","on","on","on","on","on","on","on","on","on","on","on","on",
  "off","off","off","off","off","off","off","off","off","off","off","off","off",
  "off","off","off","off","off","off","off","off","off","off","off","off","off",
];

/* Standards the change-control workflow answers to, per industry.
 * Actual standards and regulations only (no methodologies or record
 * types) — each with what it demands of this specific workflow. */
interface StandardRef {
  id: string;
  issuer: string;
  /** issuer mark in /public/standards — rendered greyscale at 20px;
   *  falls back to the mono issuer text when absent */
  logo?: string;
  note: string;
}
const CHANGE_CONTROL_STANDARDS: Record<string, StandardRef[]> = {
  "medical-devices": [
    {
      id: "21 CFR 820",
      issuer: "FDA",
      logo: "/standards/fda.png",
      note: "Quality System Regulation: document, design, and production change controls.",
    },
    {
      id: "21 CFR Part 11",
      issuer: "FDA",
      logo: "/standards/fda.png",
      note: "Electronic records and signatures: every approval in this workflow is a compliant e-signature.",
    },
    {
      id: "ISO 13485",
      issuer: "ISO",
      logo: "/standards/iso.png",
      note: "Medical device QMS: controlled, traceable change records across the system.",
    },
    {
      id: "ISO 14971",
      issuer: "ISO",
      logo: "/standards/iso.png",
      note: "Risk management: change impact assessed against device risk before approval.",
    },
    {
      id: "EU MDR",
      issuer: "EU",
      logo: "/standards/eu-mdr.png",
      note: "Regulation 2017/745: technical documentation kept current as changes land.",
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
    title: `Change control for ${industry.title} · Unifize`,
    description: `The change control workflow for ${industry.title}, from initiation through training cascade to close-out, with the decision trace intact at every step.`,
  };
}

export default async function IndustryChangeControlPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const changeControl = getWorkflow("change-control")!;
  const standards =
    CHANGE_CONTROL_STANDARDS[slug] ??
    industry.standards
      .slice(0, 6)
      .map((id): StandardRef => ({ id, issuer: "", note: "" }));

  // §02.5 coexistence context — the per-page contextualization of the canonical
  // concept map (PLT-2). The verbatim scaffold lives in CoexistenceLayer; this
  // is only the part that varies by record type + industry. Stage count and
  // module name are derived from `changeControl` inside the component.
  const coexistence: CoexistenceContext = {
    recordLabel: "change control",
    recordNoun: "change",
    industryLabel: "medical-device",
    standards: ["ISO 13485", "21 CFR 820"],
    approval: "21 CFR Part 11 e-signature",
    systemsOfRecord: ["QMS", "ERP", "PLM", "LIMS"],
    evidence: ["Impact assessment", "Validation", "Training sign-off"],
    // Concrete AI Assist on a change control — each maps to a PLT-2 §6 area:
    // capture → pre-fill/linking, execution → missing-evidence detection,
    // measurement → "what's blocked and why".
    aiAssist: [
      "Pre-fills the change request",
      "Flags missing evidence",
      "Surfaces what's blocking close-out",
    ],
  };

  return (
    <main>
      <SiteHeader />

      {/* HERO — industry-anchored (2026-06-03: not "Quality", not generic).
          The reader is a quality manager at a device company; the page names
          their workflow, their industry, and their standards before asking
          anything of them. */}
      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="cc-hero-grid">
            <div className="cc-hero-copy">
              <div className="detail-breadcrumb">
                <Link href="/platform#industries">Industries</Link>
                <span className="sep">/</span>
                <Link href={`/industries/${industry.slug}`}>
                  {industry.title}
                </Link>
                <span className="sep">/</span>
                <span>Change control</span>
              </div>
              <h1>
                <span className="cc-hero-line">Change control for</span>
                <br />
                <span className="cc-hero-line">{industry.title}</span>
              </h1>
              <p className="sub">
                One change request touches documents, approvals, training, and
                the device record. This is that journey, initiation through
                training cascade and close-out, with the decision trace intact
                at every step.
              </p>
              <div className="hero-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Button variant="dark-ghost" size="lg">
                  See the platform
                </Button>
              </div>
            </div>
            {/* Homepage matrix language: revision A (ghost) → revision B (lit). */}
            <div className="cc-hero-visual" aria-hidden="true">
              <MatrixGrid cols={13} rows={17} cells={MATRIX_CHANGE_CONTROL} />
            </div>
          </div>
        </div>
      </header>

      {/* STANDARDS MARQUEE — page context before the flow. Ben 2026-06-03:
          "they scroll down and they see … the standards. They've got 13485,
          they've got 820 … and they go, okay, wow — we get it."
          Compressed 2026-06-08 from the 5-card grid Ben flagged as "taking up
          a bit too much space … a marquee, a small bar moving left to right."
          Kept as its own band so the scroll-reveal beat survives; each
          standard's demand note moves to the chip tooltip. The track auto-
          scrolls, pauses on hover, and freezes (static rail) under
          prefers-reduced-motion. Part 11 is named here; the badge on the
          approval step inside the flow is a deferred follow-up. */}
      <section className="section white cc-std-section">
        <div className="section-inner">
          <div className="cc-std-bar">
            <span className="section-eyebrow cc-std-eyebrow">
              Standards this workflow answers to
            </span>
            <div
              className="cc-std-marquee"
              role="list"
              aria-label="Standards this change control workflow answers to"
            >
              <div className="cc-std-track">
                {[0, 1].map((copy) => (
                  <div
                    className="cc-std-grp"
                    key={copy}
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {standards.map((s) => (
                      <span
                        key={`${copy}-${s.id}`}
                        className="cc-std-chip"
                        role={copy === 0 ? "listitem" : undefined}
                        title={s.note || undefined}
                      >
                        {s.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className="cc-std-chip-logo" src={s.logo} alt={s.issuer} />
                        ) : s.issuer ? (
                          <span className="cc-std-chip-iss">{s.issuer}</span>
                        ) : null}
                        <span className="cc-std-chip-id">{s.id}</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         EVERYTHING BELOW IS VERBATIM FROM /domains-v2/[slug]/page.tsx
         (the flow approved on the 2026-06-03 call). Keep in sync.
         ============================================================ */}

      {/* §01+§02 · Familiar → Worth — ONE sticky canvas (Change Control).
          The map straightens, converts to slabs of real work, the red
          coordination tax fills the gaps, the whole stream compresses to the
          Unifize bar — and then, in the SAME scroll, the canvas resolves into
          the before/after ledger: hours saved and what that's worth. §02 used
          to be a separate band restating this final state; it's now the climax
          of this one section (the standalone CompressionMoneyShot is unmounted,
          file preserved per convention).
          2026-06-05 (diverges from domains-v2): the JourneySteps lead-in
          ("the 8 named steps") is unmounted on this page — the flow canvas
          now sits directly under the section head (cc-flow-section trims
          the dead band between head and canvas). */}
      <section className="section white cc-flow-section">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">01 · Familiar</span>
            <h2 className="section-title">
              How the work actually moves through your company.
            </h2>
            <p className="wf-lede">
              One Change Control journey from initiation to close.
            </p>
          </div>
        </div>
        <ProcessStraighten workflow={changeControl} />
      </section>

      {/* §02.5 · COEXISTENCE — the canonical concept map (PLT-2) rendered as a
          reusable template: CoexistenceLayer holds the verbatim scaffold; this
          page supplies `workflow` + a small `context` (record type, systems,
          standards, evidence). Every generated page renders the same structure,
          contextualized to its record. 2026-06-09. */}
      <CoexistenceLayer workflow={changeControl} context={coexistence} />

      {/* §03 · DRILL — sticky scroll on one step: the journey timeline runs down
          the left while the Unifize product evolves on the right, scrubbed to
          scroll (Ben 2026-06-01: "this is what's going to be key"). */}
      {/* chatVariant: the embedded product replays CC-2148, the change-control
          record — not the CAPA thread (2026-06-05: one story per page). */}
      <CompressionStoryV2 workflow={changeControl} stepId="s3" chatVariant="change-control" />

      {/* §04 · THE AI READ — the same governed thread, replayed and tagged by
          AI: each message/timestamp/ownership change scored value-add or wait,
          landing on "this record · 80% value-add / 20% non-value-add" (Ben
          2026-06-02: "the whole AI piece … is so important"). Product on the
          left, AI verdict rail on the right; stays at record level — the
          org-level roll-up is the §05 zoom-out. Feature isn't built: this is a
          product visual that tells the story. */}
      <AIReadStory variant="change-control" />

      {/* §05 · ZOOM-OUT CLOSE — the same compression across the whole QMS,
          compounding on AI, read off a live dashboard. */}
      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">05 · Zoom out</span>
              <h2 className="section-title close-title">
                The same read, across every record you run.
              </h2>
              <p className="close-sub">
                What the AI just did on one record, it does on all of them: tagging
                value-add against wait across the whole QMS. Leadership sees where the
                time goes, which processes carry the most wait, and how much of it is
                recoverable.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Button variant="dark-ghost" size="lg">
                  See the platform
                </Button>
              </div>
            </div>
            <div className="close-visual">
              {/* Crop the dashboard into a fixed-height viewport: it's sized
                  wider than the column so the right edge bleeds off and is cut
                  off, anchored top-left so the header stays visible, and the
                  frame is vertically centered against the copy. Inline so it
                  hot-reloads (overrides the base scale in globals .dshell). */}
              <div style={{ position: "relative", height: 600, width: 880, overflow: "hidden" }}>
                <DashboardShell
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 1500,
                    margin: 0,
                    transform: "scale(0.6)",
                    transformOrigin: "top left",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §06 · MONEY SHOT — the dashboard's recovered time costed out to one
          figure. Ben 2026-06-02: "a final screen which is a money shot …
          how much is this worth to your organization? … this is how we sell it." */}
      <MoneyShot />

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
