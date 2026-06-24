import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "../../home/site-header";
import { Button, Eyebrow, MatrixGrid, type CellState } from "@/components/atoms";
import { IngressDrift } from "@/components/organisms";
import {
  getIndustry,
  listIndustrySlugs,
} from "@/lib/platform-data/industries";
import { getWorkflow } from "@/lib/platform-data/workflows";
import "./industry.css";

/* ------------------------------------------------------------
 * Matrix glyph — homepage pixel language, portrait 13 × 17.
 * Medical Devices: the cross, lit in brand blue.
 * ------------------------------------------------------------ */
const INDUSTRY_GLYPH: Record<string, CellState[]> = {
  "medical-devices": [
    "off","off","off","off","off","off","off","off","off","off","off","off","off",
    "off","off","off","off","off","off","off","off","off","off","off","off","off",
    "off","off","off","off","off","off","off","off","off","off","off","off","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","on","on","on","on","on","on","on","on","on","on","on","off",
    "off","on","on","on","on","on","on","on","on","on","on","on","off",
    "off","on","on","on","on","on","on","on","on","on","on","on","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","off","off","off","off","on","on","on","off","off","off","off","off",
    "off","off","off","off","off","off","off","off","off","off","off","off","off",
    "off","off","off","off","off","off","off","off","off","off","off","off","off",
    "off","off","off","off","off","off","off","off","off","off","off","off","off",
  ],
};

/* Workflows we go deep on, per industry. Live = page exists.
 * Blurbs are buyer-facing; the technical graph summary in
 * workflows.ts stays on the canvas where it belongs. */
interface WorkflowDoor {
  key: string;
  name: string;
  blurb: string;
  href?: string;
}
const INDUSTRY_WORKFLOWS: Record<string, WorkflowDoor[]> = {
  "medical-devices": [
    {
      key: "change-control",
      name: "Change control",
      blurb:
        "One change request, routed through review, Part 11 sign-off, and the training cascade it triggers. Every affected record updated, with the decision trace intact.",
      href: "/industries/medical-devices/change-control",
    },
    {
      key: "capa",
      name: "CAPA",
      blurb:
        "From nonconformance to verified effectiveness. The investigation, root cause, and evidence assembly that today run through email and meetings, held in one governed thread.",
    },
    {
      key: "audit",
      name: "Audit",
      blurb:
        "Internal or external, the evidence surfaces in clicks. Findings route into CAPA with ownership attached, so nothing waits on the report to close.",
    },
    {
      key: "sop",
      name: "SOP revision",
      blurb:
        "A controlled document moves from draft to effective: review, e-signature, publish, and the training obligations that follow, all on one record.",
    },
  ],
};

/* Actual standards and regulations only — each with what it means
 * for this industry (same card system as the workflow pages). */
interface StandardRef {
  id: string;
  issuer: string;
  note: string;
}
const INDUSTRY_STANDARDS: Record<string, StandardRef[]> = {
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

/* Persona pages that exist, per industry — cards link only where a
 * page has been built (the old unconditional /buyers/* hrefs 404d). */
const PERSONA_PAGES: Record<string, Record<string, string>> = {
  "medical-devices": {
    "quality-manager": "/industries/medical-devices/quality-manager",
  },
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
    title: `${industry.title} · Unifize for ${industry.vertical}`,
    description: industry.promise,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const glyph = INDUSTRY_GLYPH[slug];
  const workflows = INDUSTRY_WORKFLOWS[slug] ?? [];
  const standards = INDUSTRY_STANDARDS[slug];

  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className={glyph ? "ind-hero-grid" : undefined}>
            <div>
              <div className="detail-breadcrumb">
                <Link href="/platform#industries">Industries</Link>
                <span className="sep">/</span>
                <span>{industry.title}</span>
              </div>
              <Eyebrow dot>{industry.vertical}</Eyebrow>
              <h1>{industry.title}</h1>
              <p className="sub">{industry.promise}</p>
              {industry.frame ? (
                <ul className="ind-frame" aria-label="Regulatory frame">
                  {industry.frame.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              ) : null}
              <div className="hero-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Button variant="dark-ghost" size="lg">
                  See the platform
                </Button>
              </div>
            </div>
            {glyph ? (
              <div className="ind-hero-visual" aria-hidden="true">
                <MatrixGrid cols={13} rows={17} cells={glyph} />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {industry.fearAnchor ? (
        <section className="section white" id="stakes">
          <div className="section-inner ind-stakes">
            <div className="ind-stakes-head">
              <span className="section-eyebrow">
                <span className="dot" /> {industry.fearAnchor.eyebrow}
              </span>
              <h2 className="ind-stakes-title">{industry.fearAnchor.headline}</h2>
            </div>
            <div className="ind-stakes-cards">
              <div className="ind-stakes-card primary">
                <span className="ind-stakes-tag">The finding</span>
                <p>{industry.fearAnchor.primary}</p>
              </div>
              <div className="ind-stakes-card">
                <span className="ind-stakes-tag">The recall</span>
                <p>{industry.fearAnchor.secondary}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <IngressDrift
        id="where-it-shows-up"
        eyebrow={`Where it shows up in ${industry.title}`}
        lede={`You'll recognize these: a workflow, the person who owns it, the moment it goes sideways. None of them were designed to live in the seam between your systems.`}
        stations={industry.driftStations}
        coda={{
          eyebrow: `Start where it hurts most`,
          claim: {
            setup: `It is not a ${industry.title.toLowerCase()} problem.`,
            punch: (
              <>
                It is a <em>coordination</em> problem.
              </>
            ),
          },
          closer: (
            <>
              Wherever regulated work meets the device record,
              <span className="drift-coda-closer-em">
                {" "}
                coordination tax accumulates.
              </span>
            </>
          ),
        }}
      />

      {industry.coordinationSurface ? (
        <section className="section alt" id="coordination-surface">
          <div className="section-inner">
            <div className="ind-surface-head">
              <div className="ind-surface-head-copy">
                <span className="section-eyebrow">
                  {industry.coordinationSurface.eyebrow}
                </span>
                <h2 className="section-title">
                  {industry.coordinationSurface.headline}
                </h2>
                <p className="wf-lede">{industry.coordinationSurface.lede}</p>
              </div>
              <div className="ind-surface-meter" aria-hidden="true">
                <div className="ind-surface-dots">
                  {Array.from({
                    length: industry.coordinationSurface.total,
                  }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        "ind-surface-dot" +
                        (i < industry.coordinationSurface!.covered ? " on" : "")
                      }
                    />
                  ))}
                </div>
                <span className="ind-surface-meter-lab">
                  {industry.coordinationSurface.covered} of{" "}
                  {industry.coordinationSurface.total} coordination domains in play
                </span>
              </div>
            </div>
            <div className="ind-surface-grid">
              {industry.coordinationSurface.motions.map((m) => (
                <div
                  key={m.title}
                  className={"ind-surface-cell " + m.status}
                >
                  <span className="ind-surface-cell-mark" aria-hidden="true" />
                  <h3 className="ind-surface-cell-title">{m.title}</h3>
                  <p className="ind-surface-cell-body">{m.body}</p>
                </div>
              ))}
            </div>
            <div className="ind-surface-legend" aria-hidden="true">
              <span className="ind-surface-legend-item established">
                <span className="ind-surface-cell-mark" /> Established proof
              </span>
              <span className="ind-surface-legend-item emerging">
                <span className="ind-surface-cell-mark" /> Emerging surface
              </span>
            </div>
          </div>
        </section>
      ) : null}

      {workflows.length > 0 ? (
        <section className="section white" id="workflows">
          <div className="section-inner">
            <div className="section-head stack">
              <span className="section-eyebrow">Your workflows</span>
              <h2 className="section-title">
                The work you run every week, governed end to end.
              </h2>
              <p className="wf-lede">
                These are your journeys: the steps, approvals, evidence, and
                training cascades you already live with. Walk change control
                first. One change, every affected record, nothing lost on the
                way.
              </p>
            </div>
            <div className="ind-wf-grid">
              {workflows.map((w) => {
                const wf = getWorkflow(w.key);
                const body = (
                  <>
                    {wf ? <span className="mod">{wf.module}</span> : null}
                    <h3 className="name">{w.name}</h3>
                    <p className="sum">{w.blurb}</p>
                    <span className="cta">
                      {w.href ? "Walk the journey →" : "Coming next"}
                    </span>
                  </>
                );
                return w.href ? (
                  <Link key={w.key} href={w.href} className="ind-wf-card">
                    {body}
                  </Link>
                ) : (
                  <div key={w.key} className="ind-wf-card ghost">
                    {body}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section alt">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Who this is for</span>
            <h2 className="section-title">
              Built for the people who carry the record.
            </h2>
          </div>
          {/* Product personas from the Industries source of truth. Cards link
              where a persona page exists (2026-06-05: quality-manager built,
              industry-anchored per Ben's specificity rule); the rest stay
              static until their pages land. */}
          <div className="link-grid">
            {industry.personas.map((p) => {
              const href = PERSONA_PAGES[slug]?.[p.slug];
              const body = (
                <>
                  <span className="link-card-eyebrow">Role</span>
                  <h3 className="link-card-title">{p.title}</h3>
                  {p.blurb ? <p className="link-card-blurb">{p.blurb}</p> : null}
                </>
              );
              return href ? (
                <Link key={p.slug} href={href} className="link-card">
                  {body}
                </Link>
              ) : (
                <div key={p.slug} className="link-card">
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {industry.qmsContrast ? (
        <section className="section white" id="qms">
          <div className="section-inner">
            <div className="section-head stack">
              <span className="section-eyebrow">
                {industry.qmsContrast.eyebrow}
              </span>
              <h2 className="section-title">{industry.qmsContrast.headline}</h2>
            </div>
            <div className="ind-contrast">
              <div className="ind-contrast-col qms">
                <span className="ind-contrast-lab">
                  {industry.qmsContrast.qms.label}
                </span>
                <p className="ind-contrast-body">
                  {industry.qmsContrast.qms.body}
                </p>
                <div className="ind-contrast-systems">
                  <span className="ind-contrast-systems-lab">Sits alongside</span>
                  <div className="ind-contrast-chips">
                    {industry.qmsContrast.systems.map((s) => (
                      <span key={s} className="ind-contrast-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ind-contrast-arrow" aria-hidden="true">
                →
              </div>
              <div className="ind-contrast-col unifize">
                <span className="ind-contrast-lab">
                  {industry.qmsContrast.unifize.label}
                </span>
                <p className="ind-contrast-body">
                  {industry.qmsContrast.unifize.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="section white">
          <div className="section-inner detail-inner">
            <div className="detail-aside">
              <span className="section-eyebrow">What you most need to avoid</span>
            </div>
            <div className="detail-body">
              <p className="detail-lede">{industry.failureEvent}</p>
            </div>
          </div>
        </section>
      )}

      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">Standards we speak</span>
            <p className="detail-aside-blurb">
              The regulatory frame you operate inside, and what each one
              demands of the way your work runs.
            </p>
          </div>
          <div className="detail-body">
            {standards ? (
              <div className="ind-std-grid">
                {standards.map((s) => (
                  <div key={s.id} className="ind-std-card">
                    <span className="iss">{s.issuer}</span>
                    <span className="id">{s.id}</span>
                    <p className="note">{s.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="standards-chips">
                {industry.standards.map((s) => (
                  <span key={s} className="standards-chip">
                    {s}
                  </span>
                ))}
              </div>
            )}
            {industry.vocabulary ? (
              <div className="ind-vocab">
                <span className="ind-vocab-lab">
                  And the language it all runs in
                </span>
                <div className="ind-vocab-chips">
                  {industry.vocabulary.map((v) => (
                    <span key={v} className="ind-vocab-chip">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">What this looks like in your week</span>
          </div>
          <div className="detail-body">
            {industry.weekNarrative.map((para, i) => (
              <p key={i} className="detail-prose">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {industry.proof ? (
        <section className="section alt" id="proof">
          <div className="section-inner">
            <div className="section-head stack">
              <span className="section-eyebrow">{industry.proof.eyebrow}</span>
              <h2 className="section-title">{industry.proof.headline}</h2>
              <p className="wf-lede">{industry.proof.lede}</p>
            </div>
            <div className="ind-proof-grid">
              {industry.proof.points.map((p, i) => (
                <div key={p.label} className="ind-proof-card">
                  <span className="ind-proof-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="ind-proof-title">{p.label}</h3>
                  <p className="ind-proof-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {industry.channels && industry.channels.length > 0 ? (
        <section className="section white">
          <div className="section-inner detail-inner">
            <div className="detail-aside">
              <span className="section-eyebrow">Where you'll find us</span>
              <p className="detail-aside-blurb">
                The conferences and communities you already attend. Come say
                hello.
              </p>
            </div>
            <div className="detail-body">
              <ul className="channel-list">
                {industry.channels.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">{industry.title}</span>
              <h2 className="section-title close-title">
                See Unifize wired for your stack.
              </h2>
              <p className="close-sub">
                A 30-minute walkthrough with our team: your standards, your
                workflows, your existing systems.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Link href="/platform" className="btn btn-dark-ghost btn-lg">
                  Back to platform
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
