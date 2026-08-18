/* ============================================================================
 * HOMEPAGE - recognition and routing, revised after the synthetic-audience
 * panel test (2026-07-13, marketing/audiences/*). Panel-driven changes:
 *   - Hero: short tension headline + one-sentence sub (the old descriptor
 *     headline was flagged by the whole panel; the concrete nouns that DID
 *     the retention work moved into the sub). Scroll cue drives to 01.
 *   - Hero mock is a 4-view switcher (quality event / change order / holds /
 *     controlled document): the single quality-events mock polarized by role.
 *     2026-08-09: the bespoke mocks were replaced by the shared stylized-
 *     arcade system (home-arcade.ts) so the homepage, product pages, and
 *     platform page stage one continuous product world.
 *   - Intent chips under the CTAs route search-intent visitors on screen 1.
 *   - Trust strip shows named companies (sample regime, one source of truth
 *     with the Resources testimonials data) instead of placeholder bars.
 *   - 02 swaps the macro-stat wall (dismissed by 6/6 as "industry numbers")
 *     for the per-thread measurement mock: the mechanism, in your numbers.
 *     2026-08-09: 03's bespoke governed-thread mock became the platform
 *     page's persistent-camera journey (PlatformJourney + home-arcade.ts):
 *     NC-204 followed capture -> coordinate -> prove -> write back.
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
import { Eyebrow } from "../products/dms/dms-primitives";
import { HeroArcadeSwitcher } from "./home-interactive";
import { PlatformJourney } from "../platform/platform-interactive";
import {
  HOME_HERO_QUALITY_CONFIG,
  HOME_HERO_CHANGE_CONFIG,
  HOME_HERO_OPS_CONFIG,
  HOME_HERO_DOCUMENT_CONFIG,
  HOME_JOURNEY_CONFIGS,
} from "./home-arcade";
import { TESTIMONIALS } from "../resources/_shared/resources-data";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "../products/dms/dms-redesign.css";
import "./home-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "The AI-powered platform for cross-functional work in regulated industries",
  description:
    "Unifize connects the decisions, evidence, and completion your teams scatter across email, meetings, and spreadsheets, so every CAPA, change order, design review, and supplier approval closes faster and closes proven.",
};

/* the hero visual: one arcade app window, four worlds - pick yours. One
 * artifact per audience, per the panel's role-coverage finding. */
const HERO_VIEWS = [
  { key: "quality", label: "Quality event", config: HOME_HERO_QUALITY_CONFIG },
  { key: "change", label: "Change order", config: HOME_HERO_CHANGE_CONFIG },
  { key: "ops", label: "Holds & release", config: HOME_HERO_OPS_CONFIG },
  { key: "document", label: "Controlled document", config: HOME_HERO_DOCUMENT_CONFIG },
];

/* 03 - the mechanism journey rail: one claim per pose, the scene proves it */
const MECHANISM_STEPS = [
  { title: "Capture", body: "The event opens one governed thread with its context attached: the reading, the part, the work order. Nothing is re-keyed." },
  { title: "Coordinate", body: "Every handoff gets an owner and a clock everyone can see. The waiting becomes visible." },
  { title: "Prove", body: "Evidence and approvals close with the work, so the record is complete at sign-off, not at audit prep." },
  { title: "Write back", body: "The approved outcome writes back. Unifize keeps the cross-functional trail; your systems of record stay authoritative." },
  { title: "Measure", body: "Every thread carries its own clock. You watch the coordination tax fall, week by week, against your own baseline." },
];

/* Four primary solution doors. The homepage recognizes the symptom; the L2
 * solution page carries the full problem architecture and proof. */
const SYMPTOMS = [
  {
    domain: "Quality",
    visual: "cycle",
    claim: "CAPAs take 90 days to close.",
    note: "The investigation is a week of work. The other eleven are spent chasing sign-offs, evidence, and owners.",
    href: "/explorations/domains/quality",
  },
  {
    domain: "Operations",
    visual: "wip",
    claim: "WIP ages while dispositions wait in inboxes.",
    note: "QA calls, engineering decisions, and lab results arrive by escalation, with no trail of who committed to what.",
    href: "/explorations/domains/operations",
  },
  {
    domain: "Supplier Management",
    visual: "handoffs",
    claim: "Supplier approvals live in email threads.",
    note: "Qualification evidence, PPAP reviews, and SCARs scatter across mailboxes at the organisational boundary.",
    href: "/explorations/domains/supplier-management",
  },
  {
    domain: "Product Development",
    visual: "trace",
    claim: "The design history is assembled after the fact.",
    note: "Decisions made in reviews and threads get reconstructed into the DHF weeks later, under deadline.",
    href: "/explorations/domains/product-development",
  },
];

const PRIMARY_SOLUTIONS = [
  { name: "Quality", meta: "CAPA · NC · Audits", href: "/explorations/domains/quality" },
  { name: "Supplier Management", meta: "PPAP · SCARs", href: "/explorations/domains/supplier-management" },
  { name: "Operations", meta: "Holds · Dispositions", href: "/explorations/domains/operations" },
  { name: "Product Development", meta: "ECOs · Design history", href: "/explorations/domains/product-development" },
];

const PRODUCTS = [
  {
    code: "QMS",
    name: "Quality management",
    body: "CAPA, audits, nonconformances, and change control on one governed quality record.",
    outcome: "Close the finding. Keep the decision.",
    href: "/explorations/products/qms",
  },
  {
    code: "DMS",
    name: "Document management",
    body: "Controlled documents, versioning, training, and e-signatures from draft to obsolete.",
    outcome: "One current version, everywhere.",
    href: "/explorations/products/dms",
  },
  {
    code: "MES",
    name: "Manufacturing execution",
    body: "Electronic batch records and shop-floor execution with evidence captured as work happens.",
    outcome: "The record builds with the shift.",
    href: "/explorations/products/mes",
  },
  {
    code: "PLM",
    name: "Product lifecycle",
    body: "Requirements, design controls, BOMs, and change orders on one traceable product record.",
    outcome: "Keep the trace from input to release.",
    href: "/explorations/products/plm",
  },
];

const INDUSTRY_GROUPS = [
  {
    name: "Life sciences",
    body: "Decision trails that stand up to inspectors, sponsors, and assessors.",
    industries: [
      { name: "Medical Devices", standard: "FDA 820 · ISO 13485", href: "/explorations/industry-template-modern" },
      { name: "Pharmaceuticals", standard: "cGMP · Annex 11", href: "/explorations/industries/pharmaceuticals" },
      { name: "Contract Research Orgs", standard: "GCP · ICH E6", href: "/explorations/industries/cro" },
      { name: "Laboratories", standard: "ISO/IEC 17025", href: "/explorations/industries/laboratories" },
    ],
  },
  {
    name: "Process & consumer",
    body: "Controlled changes and evidence across formulation, production, and release.",
    industries: [
      { name: "Chemicals", standard: "REACH · GHS", href: "/explorations/industries/chemicals" },
      { name: "Cosmetics", standard: "MoCRA · ISO 22716", href: "/explorations/industries/cosmetics" },
      { name: "Food Processing", standard: "FSMA · GFSI", href: "/explorations/industries/food-processing" },
      { name: "Nutritional Supplements", standard: "21 CFR 111", href: "/explorations/industries/nutritional-supplements" },
    ],
  },
  {
    name: "Discrete manufacturing",
    body: "Configuration, supplier, and production decisions with the rationale intact.",
    industries: [
      { name: "Automotive", standard: "IATF 16949", href: "/explorations/industries/automotive" },
      { name: "Aerospace", standard: "AS9100 · NADCAP", href: "/explorations/industries/aerospace" },
      { name: "Industrial Machinery", standard: "ISO 9001 · CE", href: "/explorations/industries/industrial-machinery" },
    ],
  },
];

const ENTRY_PATHS = [
  {
    label: "By solution",
    glyph: "solution",
    title: "I need to improve a process.",
    body: "Start with the cross-functional work that is slow, unclear, or difficult to prove.",
    links: PRIMARY_SOLUTIONS,
    href: "#solutions",
    cta: "Explore solutions",
  },
  {
    label: "By product",
    glyph: "product",
    title: "I am evaluating a system.",
    body: "Start with the governed record your team needs to run and keep current.",
    links: PRODUCTS.map((product) => ({ name: product.name, meta: product.code, href: product.href })),
    href: "#products",
    cta: "Explore products",
  },
  {
    label: "By industry",
    glyph: "industry",
    title: "Show me my regulated world.",
    body: "Start with your standards, validated stack, and the moments that begin the clock.",
    links: [
      INDUSTRY_GROUPS[0].industries[0],
      INDUSTRY_GROUPS[0].industries[1],
      INDUSTRY_GROUPS[2].industries[1],
    ].map((industry) => ({ name: industry.name, meta: industry.standard, href: industry.href })),
    href: "#industries",
    cta: "Explore industries",
  },
];

/* 06 - proof: three attributed stories from the canonical testimonials data
 * (same records the Resources area renders; sample regime until real
 * customer footage lands). Quality, operations-at-CDMO, and engineering
 * voices, per the panel's role-coverage finding. */
const PROOF_SLUGS = [
  "corvent-medical-capa",
  "aldale-therapeutics-batch-release",
  "northpin-aerospace-eco",
] as const;
const PROOF_CONTEXT = {
  "corvent-medical-capa": [
    { label: "Medical Devices", href: "/explorations/industry-template-modern" },
    { label: "Quality", href: "/explorations/domains/quality" },
    { label: "QMS", href: "/explorations/products/qms" },
  ],
  "aldale-therapeutics-batch-release": [
    { label: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
    { label: "Operations", href: "/explorations/domains/operations" },
    { label: "MES", href: "/explorations/products/mes" },
  ],
  "northpin-aerospace-eco": [
    { label: "Aerospace", href: "/explorations/industries/aerospace" },
    { label: "Product Development", href: "/explorations/domains/product-development" },
    { label: "PLM", href: "/explorations/products/plm" },
  ],
};
const PROOF = PROOF_SLUGS.map((slug) => ({
  story: TESTIMONIALS.find((testimonial) => testimonial.slug === slug)!,
  context: PROOF_CONTEXT[slug],
})).filter(({ story }) => Boolean(story));

const RESOURCE_PATHS = [
  {
    label: "Customer stories",
    body: "Hear the change in the words of the people who ran it.",
    href: "/explorations/resources/testimonials",
  },
  {
    label: "Case studies",
    body: "See the backlog, the intervention, and the measured result.",
    href: "/explorations/resources/case-studies",
  },
  {
    label: "Blog",
    body: "Field notes for quality, operations, and product leaders.",
    href: "/explorations/resources/blog",
  },
];

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

/* 04 - each product card leads with its governed record's signature shape, in
 * the same linework register as the symptom cards; the fiction stays the one
 * Engineering Industries universe the arcade scenes journey through. */
function ProductVisual({ code }: { code: string }) {
  if (code === "QMS") {
    return (
      <div className="hm-prodviz hm-prodviz--qms" aria-hidden="true">
        <div className="hm-prodviz__node"><i>NC-204</i><span>Coating out of spec</span><em>Contained</em></div>
        <div className="hm-prodviz__node"><i>CAPA-612</i><span>Nozzle wear corrected</span><em>Actioned</em></div>
        <div className="hm-prodviz__seal"><b>✓</b><span>Closed · decision on the record</span></div>
      </div>
    );
  }
  if (code === "DMS") {
    return (
      <div className="hm-prodviz hm-prodviz--dms" aria-hidden="true">
        <div className="hm-prodviz__rev is-old"><i>REV C</i><span>Superseded</span></div>
        <div className="hm-prodviz__rev is-new"><i>REV D</i><span>Effective</span><b>✓</b></div>
        <div className="hm-prodviz__where"><small>At point of use</small><span>Line 2</span><span>Lab</span><span>Receiving</span></div>
      </div>
    );
  }
  if (code === "MES") {
    return (
      <div className="hm-prodviz hm-prodviz--mes" aria-hidden="true">
        <div className="hm-prodviz__route">
          <i className="is-done" /><i className="is-done" /><i className="is-live" /><i /><i /><i /><i /><i />
          <span>Step 3 of 8 · Coating</span>
        </div>
        <div className="hm-prodviz__read"><i>09:12</i><span>Thickness · 41.2 µm</span><b>✓</b></div>
        <div className="hm-prodviz__read"><i>10:05</i><span>Visual · pass</span><b>✓</b></div>
        <div className="hm-prodviz__read is-pending"><i>--:--</i><span>Torque check</span></div>
      </div>
    );
  }
  return (
    <div className="hm-prodviz hm-prodviz--plm" aria-hidden="true">
      <div className="hm-prodviz__chain">
        <span><i>REQ-118</i><small>Requirement</small></span>
        <span><i>DSN-42</i><small>Design</small></span>
        <span><i>ECO-1187</i><small>Change</small></span>
        <span className="is-release"><i>REL 2.4</i><small>Release</small></span>
      </div>
      <p className="hm-prodviz__foot"><b>✓</b>Trace intact · input to release</p>
    </div>
  );
}

/* 01 - the three ways in, drawn: converging process lanes, the product mark's
 * module squares, a certificate. One stroke, one weight. */
function EntryGlyph({ type }: { type: string }) {
  if (type === "solution") {
    return (
      <svg className="hm-entry__glyph" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 5.5h5M3.5 12h5.5M3.5 18.5h5M8.5 5.5c4.5 0 3.5 6.5 8 6.5M8.5 18.5c4.5 0 3.5-6.5 8-6.5M14 12h6.5M17.5 9l3 3-3 3" />
      </svg>
    );
  }
  if (type === "product") {
    return (
      <svg className="hm-entry__glyph" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" />
        <rect x="13.5" y="3.5" width="7" height="7" />
        <rect x="8.5" y="13.5" width="7" height="7" />
      </svg>
    );
  }
  return (
    <svg className="hm-entry__glyph" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="3" width="16" height="13.5" />
      <path d="M7.5 7h9M7.5 10h9M7.5 13h5" />
      <circle cx="15.5" cy="16.5" r="2.6" />
      <path d="M14.2 18.8L13.4 22l2.1-1.3 2.1 1.3-.8-3.2" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--home">
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
                <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
              <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                Take Coordination Tax Assessment
              </Link>
              </div>
            </div>
          </div>
        </div>

        {/* the hero visual: one arcade window, four worlds - pick yours */}
        <div className="dms-wrap dms-hero__frame dms-hero__product-demo hm-hero-demo">
          <HeroArcadeSwitcher views={HERO_VIEWS} />
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
       * Named companies (canonical sample records shared with Resources;
       * swaps to real logos from the same data when footage clears). */}
      <section className="dms-section dms-section--dark dms-trust" aria-label="Customers">
        <div className="dms-wrap dms-trust__inner">
          <div className="hm-wordmarks" role="list" aria-label="Customer companies">
            {TRUST_COMPANIES.map((c) => (
              <span key={c} role="listitem" className="hm-wordmark">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 01 · PRIMARY ROUTER ===============
       * The homepage is L1. This section hands visitors directly to the L2
       * taxonomy that matches the way they arrived. */}
      <section className="dms-section hm-entry-section" id="doors">
        <div className="dms-wrap">
          <div className="hm-entry__head" data-reveal>
            <Eyebrow n={1}>Choose your way in</Eyebrow>
            <h2 className="dms-h2">Start with what brought you here.</h2>
            <p className="dms-lede">
              Improve the work, evaluate the system, or see Unifize in your regulated world. Every path leads to
              the same governed decision trail.
            </p>
          </div>

          <div className="hm-entry-grid" data-reveal>
            {ENTRY_PATHS.map((path, index) => (
              <article className="hm-entry" key={path.label}>
                <div className="hm-entry__intro">
                  <EntryGlyph type={path.glyph} />
                  <span className="hm-entry__index dms-data">{String(index + 1).padStart(2, "0")}</span>
                  <span className="hm-entry__label">{path.label}</span>
                  <h3>{path.title}</h3>
                  <p>{path.body}</p>
                </div>
                <ul className="hm-entry__links">
                  {path.links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <span>{item.name}</span>
                        <small>{item.meta}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="hm-entry__all" href={path.href}>
                  {path.cta} <span aria-hidden="true">&darr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 02 · RECOGNITION ==================
       * Four primary solutions, framed in the buyer's words. */}
      <section className="dms-section dms-section--alt hm-recognition hm-recognition--reframed" id="solutions">
        <div className="dms-wrap">
          <div className="hm-recognition__head" data-reveal>
            <div>
              <Eyebrow n={2}>Where the day goes</Eyebrow>
              <h2 className="dms-h2">Where regulated work slows down.</h2>
            </div>
            <p className="dms-lede">
              The symptoms look different across teams. The pattern underneath is the same: work waits wherever
              ownership, evidence, and decisions cross a system boundary.
            </p>
          </div>

          <ul className="hm-symptoms" data-reveal>
            {SYMPTOMS.map((symptom) => (
              <li className="hm-symptom" key={symptom.domain}>
                <Link className="hm-symptom__link" href={symptom.href}>
                  <SymptomVisual type={symptom.visual} />
                  <span className="hm-symptom__body">
                    <span className="hm-symptom__domain">{symptom.domain}</span>
                    <span className="hm-symptom__claim">{symptom.claim}</span>
                    <span className="hm-symptom__note">{symptom.note}</span>
                    <span className="hm-symptom__cta">
                      Explore solution <span aria-hidden="true">&rarr;</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hm-section-tail" data-reveal>
            <p>Quality, governance, operations, and supply chain all run on the same decision model.</p>
            <Link href="/explorations/domains">See every solution &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ============================ 03 · ONE MECHANISM ================ */}
      <section className="dms-section dms-section--dark hm-mechanism" id="platform">
        <div className="dms-wrap">
          <div className="hm-mechanism__head" data-reveal>
            <div>
              <Eyebrow n={3}>One problem, one mechanism</Eyebrow>
              <h2 className="dms-h2">Turn hidden waiting into a governed decision trail.</h2>
            </div>
            <div className="hm-mechanism__copy">
              <p className="dms-lede">
                The coordination tax is the time lost holding cross-functional work together when no system owns it
                end to end. Unifize makes that waiting visible, accountable, and recoverable.
              </p>
              <div className="hm-mechanism__ctas">
                <Link href="/explorations/platform" className="dms-btn">Explore the platform &rarr;</Link>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  Measure your coordination tax
                </Link>
              </div>
            </div>
          </div>
          {/* the argument, shown: NC-204 followed end to end on the same
            * persistent camera the platform and product pages journey on */}
          <div className="pf-page hm-journey" data-reveal>
            <PlatformJourney steps={MECHANISM_STEPS} configs={HOME_JOURNEY_CONFIGS} />
          </div>
        </div>
      </section>

      {/* ============================ 04 · PRODUCTS ===================== */}
      <section className="dms-section hm-products-section" id="products">
        <div className="dms-wrap">
          <div className="hm-split-head" data-reveal>
            <div>
              <Eyebrow n={4}>The product suite</Eyebrow>
              <h2 className="dms-h2">One platform. Four governed records.</h2>
            </div>
            <p className="dms-lede">
              Start with the system your team needs. Every product runs on the same layer, alongside the systems
              you already trust.
            </p>
          </div>
          <ul className="hm-products" data-reveal>
            {PRODUCTS.map((product) => (
              <li key={product.code}>
                <Link className="hm-product" href={product.href}>
                  <span className="hm-product__code dms-data">{product.code}</span>
                  <ProductVisual code={product.code} />
                  <h3>{product.name}</h3>
                  <p>{product.body}</p>
                  <strong>{product.outcome}</strong>
                  <span className="hm-product__cta">Explore {product.code} <span aria-hidden="true">&rarr;</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 05 · INDUSTRIES =================== */}
      <section className="dms-section dms-section--alt hm-industries-section" id="industries">
        <div className="dms-wrap">
          <div className="hm-split-head" data-reveal>
            <div>
              <Eyebrow n={5}>Your regulated world</Eyebrow>
              <h2 className="dms-h2">Built for the standards—and the moments—that govern you.</h2>
            </div>
            <p className="dms-lede">
              Find the version of Unifize grounded in your systems, regulatory frame, and the decisions your teams
              must be able to replay.
            </p>
          </div>
          <div className="hm-industry-groups" data-reveal>
            {INDUSTRY_GROUPS.map((group) => (
              <article className="hm-industry-group" key={group.name}>
                <div className="hm-industry-group__head">
                  <h3>{group.name}</h3>
                  <p>{group.body}</p>
                </div>
                <ul>
                  {group.industries.map((industry) => (
                    <li key={industry.name}>
                      <Link href={industry.href}>
                        <span>{industry.name}</span>
                        <small>{industry.standard}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="hm-section-tail" data-reveal>
            <p>E-signatures, attributable approvals, and a complete audit trail on every governed thread.</p>
            <Link href="/explorations/platform#compliance">How Unifize stays audit-ready &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ============================ 06 · PROOF & RESOURCES ============ */}
      <section className="dms-section hm-proof-section" id="proof">
        <div className="dms-wrap">
          <div className="hm-split-head" data-reveal>
            <div>
              <Eyebrow n={6}>Proof in context</Eyebrow>
              <h2 className="dms-h2">From the people who stopped paying the coordination tax.</h2>
            </div>
            <p className="dms-lede">
              Follow the proof by industry, by solution, or by the governed system that changed the work.
            </p>
          </div>
          <ul className="hm-proof" data-reveal>
            {PROOF.map(({ story, context }) => (
              <li className="hm-proof__card" key={story.slug}>
                <div className="hm-proof__context" aria-label="Related pages">
                  {context.map((item) => <Link href={item.href} key={item.label}>{item.label}</Link>)}
                </div>
                <div className="hm-proof__stat">
                  <span className="hm-proof__value dms-data">{story.metrics[0].value}</span>
                  <span className="hm-proof__vlab">{story.metrics[0].label}</span>
                </div>
                <blockquote className="hm-proof__q">&ldquo;{story.quote}&rdquo;</blockquote>
                <div className="hm-proof__who">
                  <span className="hm-proof__name">{story.person}</span>
                  <span className="hm-proof__role">{story.role} · {story.company}</span>
                  <span className="hm-proof__kind">{story.companyKind}</span>
                </div>
                <Link className="hm-proof__link" href={`/explorations/resources/testimonials/${story.slug}`}>
                  Watch the story &rarr;
                </Link>
              </li>
            ))}
          </ul>
          <div className="hm-resources" data-reveal>
            <div className="hm-resources__intro">
              <span>Keep exploring</span>
              <h3>Evidence for the next conversation.</h3>
            </div>
            <div className="hm-resources__links">
              {RESOURCE_PATHS.map((resource) => (
                <Link href={resource.href} key={resource.label}>
                  <span><strong>{resource.label}</strong><small>{resource.body}</small></span>
                  <i aria-hidden="true">&rarr;</i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close hm-close" id="demo" aria-labelledby="hm-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__convergence" aria-hidden="true">
              <div className="dms-close__mark">
                <svg viewBox="0 2.2 21 22" fill="none">
                  <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                  <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                </svg>
              </div>
            </div>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="hm-close-h">Bring the process that hurts most.</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">
                We will run it end to end on Unifize, live, and show you where the time is going.
              </p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">Take the assessment</Link>
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
