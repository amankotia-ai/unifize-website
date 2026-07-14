/* ============================================================================
 * HOMEPAGE - recognition and routing, revised after the synthetic-audience
 * panel test (2026-07-13, marketing/audiences/*). Panel-driven changes:
 *   - Hero: short tension headline + one-sentence sub (the old descriptor
 *     headline was flagged by the whole panel; the concrete nouns that DID
 *     the retention work moved into the sub). Scroll cue drives to 01.
 *   - Hero mock is a 3-view switcher (quality event / change order /
 *     controlled document): the single quality-events mock polarized by role.
 *   - Intent chips under the CTAs route search-intent visitors on screen 1.
 *   - Trust strip shows named companies (sample regime, one source of truth
 *     with the Resources testimonials data) instead of placeholder bars.
 *   - 02 swaps the macro-stat wall (dismissed by 6/6 as "industry numbers")
 *     for the per-thread measurement mock: the mechanism, in your numbers.
 *   - 04 carries the layer-vs-suite line (provisional wording pending Ben)
 *     and a Product Development door (panel-caught gap).
 *   - Proof is a static, attributed three-up wired to the testimonials data
 *     (quality + ops-CDMO + engineering voices), replacing the carousel.
 *   - 06 is the compliance certificate wall (canonical standards copy shared
 *     with the platform page): first-touch reassurance, late in the page,
 *     that the standard governing the visitor is already handled.
 * Flow still follows the third-scroll rule from the 2026-07-09 call: hook,
 * parity, THEN the coordination tax named at scroll three.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { DmsMotion } from "../products/dms/dms-motion";
import { Eyebrow, HatchFrame, ShellFrame, StagePanel } from "../products/dms/dms-primitives";
import { GovernedLayerStory, HeroMockSwitcher } from "./home-interactive";
import { CoordinationTaxDashboard } from "./home-mocks";
import { TESTIMONIALS } from "../resources/_shared/resources-data";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "./home-kit.css";

export const metadata: Metadata = {
  title: "The AI-powered platform for cross-functional work in regulated industries",
  description:
    "Unifize connects the decisions, evidence, and completion your teams scatter across email, meetings, and spreadsheets, so every CAPA, change order, design review, and supplier approval closes faster and closes proven.",
};

/* screen-1 routing for search-intent visitors */
const INTENTS = [
  { label: "Close CAPAs", href: "/explorations/products/qms" },
  { label: "Control documents", href: "/explorations/products/dms" },
  { label: "Manage engineering changes", href: "/explorations/products/plm" },
  { label: "Release production", href: "/explorations/products/mes" },
  { label: "Explore all solutions", href: "/explorations/domains" },
];

/* 01 - representative symptoms, in the buyer's words. One per scan-grid domain
 * (Domains DB, Homepage Scan Grid Eligible = yes); each routes to its
 * solutions door. */
const SYMPTOMS = [
  {
    domain: "Quality",
    visual: "cycle",
    claim: "CAPAs take 90 days to close.",
    note: "The investigation is a week of work. The other eleven are spent chasing sign-offs, evidence, and owners.",
    href: "/explorations/domains/quality",
  },
  {
    domain: "Documents & Records",
    visual: "revisions",
    claim: "The current version depends on where you look.",
    note: "The same SOP lives in a folder, a share, and an inbox, each at a different revision.",
    href: "/explorations/domains/document-and-records-control",
  },
  {
    domain: "Operations",
    visual: "wip",
    claim: "WIP ages while dispositions wait in inboxes.",
    note: "QA calls, engineering decisions, and lab results arrive by escalation, with no trail of who committed to what.",
    href: "/explorations/domains/operations",
  },
  {
    domain: "Supplier Quality",
    visual: "handoffs",
    claim: "Supplier approvals live in email threads.",
    note: "Qualification evidence, PPAP reviews, and SCARs scatter across mailboxes at the organisational boundary.",
    href: "/explorations/domains/supplier-quality",
  },
  {
    domain: "Product Development",
    visual: "trace",
    claim: "The design history is assembled after the fact.",
    note: "Decisions made in reviews and threads get reconstructed into the DHF weeks later, under deadline.",
    href: "/explorations/domains/new-product-development",
  },
  {
    domain: "Regulatory Affairs",
    visual: "audit",
    claim: "Audit prep consumes the team for weeks.",
    note: "Evidence that should fall out of the work gets rebuilt by hand every time an auditor asks.",
    href: "/explorations/domains/regulatory-affairs",
  },
];

/* 04 - the three doors, mirroring the nav */
const DOOR_INDUSTRIES = [
  { name: "Medical Devices", meta: "FDA 820 · ISO 13485", href: "/explorations/industry-template-modern" },
  { name: "Pharmaceuticals", meta: "cGMP · Annex 11", href: "/explorations/industries/pharmaceuticals" },
  { name: "Laboratories", meta: "ISO/IEC 17025", href: "/explorations/industries/laboratories" },
  { name: "Chemicals", meta: "REACH · GHS", href: "/explorations/industries/chemicals" },
  { name: "Aerospace", meta: "AS9100 · NADCAP", href: "/explorations/industries/aerospace" },
];
const DOOR_PRODUCTS = [
  { name: "Quality management", meta: "QMS", href: "/explorations/products/qms" },
  { name: "Document management", meta: "DMS", href: "/explorations/products/dms" },
  { name: "Product lifecycle", meta: "PLM", href: "/explorations/products/plm" },
  { name: "Manufacturing execution", meta: "MES", href: "/explorations/products/mes" },
];
const DOOR_DOMAINS = [
  { name: "Quality", meta: "CAPA · NC · Audits", href: "/explorations/domains/quality" },
  { name: "Document & Records Control", meta: "SOPs · Versions", href: "/explorations/domains/document-and-records-control" },
  { name: "Operations", meta: "Holds · Dispositions", href: "/explorations/domains/operations" },
  { name: "Supplier Quality", meta: "PPAP · SCARs", href: "/explorations/domains/supplier-quality" },
  { name: "Product Development", meta: "ECOs · Design history", href: "/explorations/domains/new-product-development" },
  { name: "Regulatory Affairs", meta: "Submissions · Audits", href: "/explorations/domains/regulatory-affairs" },
];

/* 06 - compliance: the certificate wall, first-touch reassurance that the
 * standard governing the visitor is already handled. Canonical copy shared
 * verbatim with the platform page (which carries the mechanics) and the DMS
 * page. Names carry the credibility. */
const STANDARDS = [
  { name: "21 CFR Part 11", geo: "FDA · US", body: "Trustworthy electronic records and signatures." },
  { name: "EU Annex 11", geo: "EC · EU", body: "Computerised systems in GxP environments." },
  { name: "ISO 9001", geo: "ISO · Global", body: "Quality management system requirements." },
  { name: "ISO 13485", geo: "ISO · Global", body: "QMS for medical devices." },
  { name: "21 CFR Part 820", geo: "FDA · US", body: "Quality System Regulation for device cGMP." },
  { name: "EU GMP", geo: "EC · EU", body: "GMP for medicinal products." },
  { name: "IATF 16949", geo: "IATF · Global", body: "Automotive QMS, PPAP and APQP records." },
  { name: "AS9100", geo: "IAQG · Global", body: "Aerospace QMS, configuration and change control." },
  { name: "ISO/IEC 17025", geo: "ISO · Global", body: "Competence of testing and calibration laboratories." },
  { name: "FSMA", geo: "FDA · US", body: "Preventive controls for human food." },
];
const VALIDATED_ACROSS = [
  "Medical Devices", "Pharmaceuticals", "In Vitro Diagnostics", "Laboratories", "Chemicals",
  "Cosmetics", "Food Processing", "Nutritional Supplements", "Automotive", "Aerospace", "Industrial Machinery",
];

/* 05 - proof: three attributed stories from the canonical testimonials data
 * (same records the Resources area renders; sample regime until real
 * customer footage lands). Quality, operations-at-CDMO, and engineering
 * voices, per the panel's role-coverage finding. */
const PROOF_SLUGS = [
  "corvent-medical-capa",
  "aldale-therapeutics-batch-release",
  "northpin-aerospace-eco",
  "veremark-devices-doc-control",
];
const PROOF = PROOF_SLUGS.map((s) => TESTIMONIALS.find((t) => t.slug === s)!).filter(Boolean);

/* trust strip: named companies from the same testimonials source */
const TRUST_COMPANIES = [...new Set(TESTIMONIALS.map((t) => t.company))].slice(0, 6);

function SymptomVisual({ type }: { type: string }) {
  if (type === "cycle") {
    return (
      <div className="hm-cardviz hm-cardviz--cycle" aria-hidden="true">
        <div className="hm-cardviz__metric"><b>90</b><span>days to closure</span></div>
        <div className="hm-cardviz__cyclebar"><i /><i /></div>
        <div className="hm-cardviz__legend"><span>Investigation</span><span>Waiting on handoffs</span></div>
      </div>
    );
  }
  if (type === "revisions") {
    return (
      <div className="hm-cardviz hm-cardviz--revisions" aria-hidden="true">
        <div className="hm-cardviz__sheet is-back"><span>REV B</span><i /><i /></div>
        <div className="hm-cardviz__sheet is-mid"><span>REV C</span><i /><i /></div>
        <div className="hm-cardviz__sheet is-front"><span>REV D</span><b>?</b><i /><i /></div>
        <small>Which one is current?</small>
      </div>
    );
  }
  if (type === "wip") {
    return (
      <div className="hm-cardviz hm-cardviz--wip" aria-hidden="true">
        <div className="hm-cardviz__wiphead"><span>WIP hold queue</span><span>Age</span></div>
        <div><span><i />Batch 220-B</span><b>2d</b></div>
        <div><span><i />Line 2 containment</span><b>1d</b></div>
        <div><span><i />Incoming lot 5541</span><b>6h</b></div>
      </div>
    );
  }
  if (type === "handoffs") {
    return (
      <div className="hm-cardviz hm-cardviz--handoffs" aria-hidden="true">
        <div className="hm-cardviz__handoffnode"><i>QA</i><span>Qualification</span></div>
        <div className="hm-cardviz__mail"><b>12</b><span>email replies</span></div>
        <div className="hm-cardviz__handoffnode"><i>SU</i><span>Supplier</span></div>
        <div className="hm-cardviz__handoffline"><i /><i /><i /><i /><i /></div>
      </div>
    );
  }
  if (type === "trace") {
    return (
      <div className="hm-cardviz hm-cardviz--trace" aria-hidden="true">
        <div><i>01</i><span>Design review</span></div>
        <b>→</b>
        <div className="is-gap"><i>?</i><span>Decision trail</span></div>
        <b>→</b>
        <div><i>03</i><span>DHF</span></div>
      </div>
    );
  }
  return (
    <div className="hm-cardviz hm-cardviz--audit" aria-hidden="true">
      <div className="hm-cardviz__evidence"><span>PDF</span><span>CSV</span><span>DOC</span><span>MSG</span></div>
      <b>→</b>
      <div className="hm-cardviz__packet"><i /><i /><i /><span>Audit packet</span></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="dms">
      <DmsMotion />
      <DmsHeader />

      {/* ============================ HERO =============================
       * Short tension headline; the concrete nouns carry the sub. The
       * coordination tax is NOT named here (third-scroll rule). */}
      <section className="dms-section dms-hero" aria-label="Unifize">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <h1 className="dms-hero__title">
                Work that crosses teams falls <span className="dms-hero__turn">between systems.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">
                Unifize closes the gap between your systems and your teams, so CAPAs, change orders, and design
                reviews close faster, and close proven.
              </p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn">Book a demo &rarr;</button>
                <Link href="/explorations/platform" className="dms-btn dms-btn-ghost">Explore the platform</Link>
              </div>
            </div>
          </div>
          <div className="hm-intents hm-intents--band" aria-label="Choose what you want to improve">
            <span className="hm-intents__lab">I want to</span>
            {INTENTS.map((x) => (
              <Link key={x.label} className="hm-intents__link" href={x.href}>{x.label}</Link>
            ))}
          </div>
          <a className="hm-scrollcue" href="#symptoms">
            See where the time goes
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden="true"><path d="M10 4v11M5.5 10.5 10 15l4.5-4.5" /></svg>
          </a>
        </div>

        {/* the hero visual: one shell, three worlds - pick yours */}
        <div className="dms-wrap dms-hero__frame">
          <HeroMockSwitcher />
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
       * Named companies (canonical sample records shared with Resources;
       * swaps to real logos from the same data when footage clears). */}
      <section className="dms-section dms-trust" aria-label="Customers">
        <div className="dms-wrap dms-trust__inner">
          <div className="hm-wordmarks" role="list" aria-label="Customer companies">
            {TRUST_COMPANIES.map((c) => (
              <span key={c} role="listitem" className="hm-wordmark">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 01 · RECOGNITION ==================
       * Parity before differentiation: representative symptoms in the buyer's own
       * words, each a door into its solutions page. */}
      <section className="dms-section hm-recognition" id="symptoms">
        <div className="dms-wrap">
          <div className="hm-recognition__head" data-reveal>
            <div>
              <Eyebrow n={1}>Where the day goes</Eyebrow>
              <h2 className="dms-h2">Where regulated work slows down.</h2>
            </div>
            <p className="dms-lede">
              The symptoms look different across teams. The pattern underneath is the same: work waits wherever
              ownership, evidence, and decisions cross a system boundary.
            </p>
          </div>

          <ul className="hm-symptoms" data-reveal>
            {SYMPTOMS.map((s) => (
              <li className="hm-symptom" key={s.domain}>
                <Link className="hm-symptom__link" href={s.href}>
                  <SymptomVisual type={s.visual} />
                  <span className="hm-symptom__body">
                    <span className="hm-symptom__domain">{s.domain}</span>
                    <span className="hm-symptom__claim">{s.claim}</span>
                    <span className="hm-symptom__note">{s.note}</span>
                    <span className="hm-symptom__cta">Explore solution <span aria-hidden="true">&rarr;</span></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 02 · THE DEEPER PROBLEM ===========
       * The third scroll: the pattern gets its name, and the mechanism
       * replaces the macro statistics. Your numbers, not industry numbers. */}
      <section className="dms-section dms-section--alt" id="tax">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={2}>The deeper problem</Eyebrow>
            <h2 className="dms-h2">Every one of those has the same root. We call it the coordination tax.</h2>
            <p className="dms-lede">
              The hidden cost of holding cross-functional work together when no system owns it end to end. You will
              not find it in an industry report: it shows up in your own numbers, on your own threads, measured
              every week.
            </p>
          </div>

          <div className="hm-mech" data-reveal>
            <StagePanel className="dms-stage--brand">
              <ShellFrame url="app.unifize.com / insights / coordination-tax" panel>
                <CoordinationTaxDashboard />
              </ShellFrame>
            </StagePanel>
          </div>

          <div className="hm-thesis-cta" data-reveal>
            <Link href="/explorations/platform" className="dms-btn dms-btn-ghost">Read the full thesis &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ============================ 03 · THE SHIFT ==================== */}
      <section className="dms-section dms-section--dark" id="shift">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={3}>The shift</Eyebrow>
            <h2 className="dms-h2">Stop paying it. Start measuring it.</h2>
            <p className="dms-lede">
              See how one cross-functional event becomes an accountable thread, without replacing the systems and
              channels your teams already use.
            </p>
          </div>
          <GovernedLayerStory />
        </div>
      </section>

      {/* ============================ 04 · THE DOORS ==================== */}
      <section className="dms-section" id="doors">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={4}>Find your way in</Eyebrow>
            <h2 className="dms-h2">Start where it hurts.</h2>
          </div>
          <div className="hm-doors" data-reveal>
            <div className="hm-door">
              <span className="hm-door__lab">By industry</span>
              <ul className="hm-door__rows">
                {DOOR_INDUSTRIES.map((d) => (
                  <li key={d.name}>
                    <Link className="hm-door__row" href={d.href}>
                      <span className="hm-door__name">{d.name}</span>
                      <span className="hm-door__meta">{d.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="hm-door__all" href="/explorations/industry-template-modern">All industries &rarr;</Link>
            </div>
            <div className="hm-door">
              <span className="hm-door__lab">By product</span>
              <ul className="hm-door__rows">
                {DOOR_PRODUCTS.map((d) => (
                  <li key={d.name}>
                    <Link className="hm-door__row" href={d.href}>
                      <span className="hm-door__name">{d.name}</span>
                      <span className="hm-door__meta">{d.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* committed coexistence line, mirroring section 03 verbatim */}
              <p className="hm-door__note">
                Every product runs on the same governed layer, alongside the systems you already run. Nothing is
                ripped out and replaced.
              </p>
              <Link className="hm-door__all" href="/explorations/platform">The platform underneath &rarr;</Link>
            </div>
            <div className="hm-door">
              <span className="hm-door__lab">By solution</span>
              <ul className="hm-door__rows">
                {DOOR_DOMAINS.map((d) => (
                  <li key={d.name}>
                    <Link className="hm-door__row" href={d.href}>
                      <span className="hm-door__name">{d.name}</span>
                      <span className="hm-door__meta">{d.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="hm-door__all" href="/explorations/domains">All solutions &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 05 · PROOF ========================
       * Static, attributed, role-diverse: quality (devices), operations
       * (pharma CDMO), engineering (diagnostics). Each links to its story. */}
      <section className="dms-section dms-section--alt" id="proof">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={5}>Proof</Eyebrow>
            <h2 className="dms-h2">From the people who stopped paying it.</h2>
          </div>
          <ul className="hm-proof" data-reveal>
            {PROOF.map((t) => (
              <li className="hm-proof__card" key={t.slug}>
                <div className="hm-proof__stat">
                  <span className="hm-proof__value dms-data">{t.metrics[0].value}</span>
                  <span className="hm-proof__vlab">{t.metrics[0].label}</span>
                </div>
                <blockquote className="hm-proof__q">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="hm-proof__who">
                  <span className="hm-proof__name">{t.person}</span>
                  <span className="hm-proof__role">{t.role} · {t.company}</span>
                  <span className="hm-proof__kind">{t.companyKind}</span>
                </div>
                <Link className="hm-proof__link" href={`/explorations/resources/testimonials/${t.slug}`}>
                  Watch the story &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 06 · COMPLIANCE ===================
       * The certificate wall: the visitor finds the standard that governs
       * them by name and knows the requirement is taken care of. The
       * platform page carries the how; this section is the reassurance. */}
      <section className="dms-section" id="compliance">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={6}>Compliance</Eyebrow>
            <h2 className="dms-h2">Built for the standards you answer to.</h2>
            <p className="dms-lede">
              E-signatures with meaning, a complete audit trail, and evidence captured as the work happens, on
              every thread. If one of these governs you, the requirements are already taken care of.
            </p>
          </div>
          <div data-reveal>
            <HatchFrame>
              <ul className="dms-stds">
                {STANDARDS.map((s) => (
                  <li className="dms-std" key={s.name}>
                    <span className="dms-std__geo">{s.geo}</span>
                    <span className="dms-std__name">{s.name}</span>
                    <p className="dms-std__body">{s.body}</p>
                  </li>
                ))}
              </ul>
              <div className="dms-frame">
                <div className="dms-frame__inds">
                  <span className="dms-persona__lab">Validated across</span>
                  <div className="dms-inds">
                    {VALIDATED_ACROSS.map((n) => <span key={n} className="dms-ind">{n}</span>)}
                  </div>
                </div>
              </div>
            </HatchFrame>
          </div>
          <div className="hm-stds-cta" data-reveal>
            <Link href="/explorations/platform#compliance" className="dms-btn dms-btn-ghost">
              How every thread stays audit-ready &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close" aria-labelledby="hm-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="hm-close-h">Bring the process that hurts most.</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">
                We will run it end to end on Unifize, live, and show you where the time is going.
              </p>
              <div className="dms-close__cta">
                <button type="button" className="dms-btn">Book a 30-minute walkthrough</button>
                <Link href="/explorations/platform" className="dms-btn dms-btn-ghost">Explore the platform</Link>
              </div>
              <Link className="hm-it-link" href="/explorations/platform#platform">
                For IT: how it fits your architecture &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter />
    </main>
  );
}
