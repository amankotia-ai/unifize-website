import Link from "next/link";
import { TESTIMONIALS } from "../resources/_shared/resources-data";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {diagonal ? <path d="M5 15 15 5M7 5h8v8" /> : <path d="M3.5 10h13M12 5.5l4.5 4.5-4.5 4.5" />}
    </svg>
  );
}

export function HeroLink({
  children,
  href,
  muted = false,
}: {
  children: React.ReactNode;
  href: string;
  muted?: boolean;
}) {
  return (
    <Link className={`sf-hero-link${muted ? " is-muted" : ""}`} href={href}>
      {children} <Arrow />
    </Link>
  );
}

type DirectoryLink = {
  name: string;
  meta: string;
  href: string;
};

type EntryPath = {
  label: string;
  title: string;
  body: string;
  links: DirectoryLink[];
  href: string;
  cta: string;
};

const HOME_ENTRY_PATHS: EntryPath[] = [
  {
    label: "By solution",
    title: "I need to improve a process.",
    body: "Start with the cross-functional work that is slow, unclear, or difficult to prove.",
    links: [
      { name: "Quality", meta: "CAPA · NC · Audits", href: "/explorations/domains/quality" },
      { name: "Supplier Management", meta: "PPAP · SCARs", href: "/explorations/domains/supplier-management" },
      { name: "Operations", meta: "Holds · Dispositions", href: "/explorations/domains/operations" },
      { name: "Product Development", meta: "ECOs · Design history", href: "/explorations/domains/product-development" },
    ],
    href: "#sf-solutions",
    cta: "Explore solutions",
  },
  {
    label: "By product",
    title: "I am evaluating a system.",
    body: "Start with the governed record your team needs to run and keep current.",
    links: [
      { name: "Quality management", meta: "QMS", href: "/explorations/products/qms" },
      { name: "Document management", meta: "DMS", href: "/explorations/products/dms" },
      { name: "Manufacturing execution", meta: "MES", href: "/explorations/products/mes" },
      { name: "Product lifecycle", meta: "PLM", href: "/explorations/products/plm" },
    ],
    href: "#sf-products",
    cta: "Explore products",
  },
  {
    label: "By industry",
    title: "Show me my regulated world.",
    body: "Start with your standards, validated stack, and the moments that begin the clock.",
    links: [
      { name: "Medical Devices", meta: "FDA 820 · ISO 13485", href: "/explorations/industry-template-modern" },
      { name: "Pharmaceuticals", meta: "cGMP · Annex 11", href: "/explorations/industries/pharmaceuticals" },
      { name: "Aerospace", meta: "AS9100 · NADCAP", href: "/explorations/industries/aerospace" },
    ],
    href: "#sf-industries",
    cta: "Explore industries",
  },
];

const HOME_INDUSTRY_GROUPS = [
  {
    name: "Life sciences",
    body: "Decision trails that stand up to inspectors, sponsors, and assessors.",
    industries: [
      { name: "Medical Devices", meta: "FDA 820 · ISO 13485", href: "/explorations/industry-template-modern" },
      { name: "Pharmaceuticals", meta: "cGMP · Annex 11", href: "/explorations/industries/pharmaceuticals" },
      { name: "Contract Research Orgs", meta: "GCP · ICH E6", href: "/explorations/industries/cro" },
      { name: "Laboratories", meta: "ISO/IEC 17025", href: "/explorations/industries/laboratories" },
    ],
  },
  {
    name: "Process & consumer",
    body: "Controlled changes and evidence across formulation, production, and release.",
    industries: [
      { name: "Chemicals", meta: "REACH · GHS", href: "/explorations/industries/chemicals" },
      { name: "Cosmetics", meta: "MoCRA · ISO 22716", href: "/explorations/industries/cosmetics" },
      { name: "Food Processing", meta: "FSMA · GFSI", href: "/explorations/industries/food-processing" },
      { name: "Nutritional Supplements", meta: "21 CFR 111", href: "/explorations/industries/nutritional-supplements" },
    ],
  },
  {
    name: "Discrete manufacturing",
    body: "Configuration, supplier, and production decisions with the rationale intact.",
    industries: [
      { name: "Automotive", meta: "IATF 16949", href: "/explorations/industries/automotive" },
      { name: "Aerospace", meta: "AS9100 · NADCAP", href: "/explorations/industries/aerospace" },
      { name: "Industrial Machinery", meta: "ISO 9001 · CE", href: "/explorations/industries/industrial-machinery" },
    ],
  },
];

const HOME_TRUST_COMPANIES = [...new Set(TESTIMONIALS.map((testimonial) => testimonial.company))].slice(0, 6);

const HOME_SYMPTOMS = [
  {
    domain: "Quality",
    visual: "cycle" as const,
    claim: "CAPAs take 90 days to close.",
    note: "The investigation is a week of work. The other eleven are spent chasing sign-offs, evidence, and owners.",
    href: "/explorations/domains/quality",
  },
  {
    domain: "Operations",
    visual: "wip" as const,
    claim: "WIP ages while dispositions wait in inboxes.",
    note: "QA calls, engineering decisions, and lab results arrive by escalation, with no trail of who committed to what.",
    href: "/explorations/domains/operations",
  },
  {
    domain: "Supplier management",
    visual: "handoffs" as const,
    claim: "Supplier approvals live in email threads.",
    note: "Qualification evidence, PPAP reviews, and SCARs scatter across mailboxes at the organisational boundary.",
    href: "/explorations/domains/supplier-management",
  },
  {
    domain: "Product development",
    visual: "trace" as const,
    claim: "The design history is assembled after the fact.",
    note: "Decisions made in reviews and threads get reconstructed into the DHF weeks later, under deadline.",
    href: "/explorations/domains/product-development",
  },
];

const HOME_MECHANISM_STEPS = [
  { index: "01", name: "Capture", body: "Bring the event and its context together." },
  { index: "02", name: "Coordinate", body: "Give every handoff an owner and a clock." },
  { index: "03", name: "Prove", body: "Close evidence and approvals with the work." },
  { index: "04", name: "Write back", body: "Keep authoritative systems in sync." },
];

const HOME_PRODUCTS = [
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

const HOME_PROOF_CONTEXT = {
  "corvent-medical-capa": [
    { label: "Medical devices", href: "/explorations/industry-template-modern" },
    { label: "Quality", href: "/explorations/domains/quality" },
    { label: "QMS", href: "/explorations/products/qms" },
  ],
  "aldale-therapeutics-batch-release": [
    { label: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
    { label: "Operations", href: "/explorations/domains/operations" },
    { label: "MES", href: "/explorations/products/mes" },
  ],
  "northpin-aerospace-audit": [
    { label: "Aerospace", href: "/explorations/industries/aerospace" },
    { label: "Product development", href: "/explorations/domains/product-development" },
    { label: "PLM", href: "/explorations/products/plm" },
  ],
};

const HOME_PROOF = ["corvent-medical-capa", "aldale-therapeutics-batch-release", "northpin-aerospace-audit"]
  .map((slug) => TESTIMONIALS.find((testimonial) => testimonial.slug === slug))
  .filter((story): story is NonNullable<typeof story> => Boolean(story));

const HOME_RESOURCES = [
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

function DirectoryRow({ item }: { item: DirectoryLink }) {
  return (
    <li>
      <Link className="sf-directory-row" href={item.href}>
        <span>{item.name}</span>
        <small>{item.meta}</small>
        <Arrow />
      </Link>
    </li>
  );
}

function SectionEyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="sf-home-directory__eyebrow">
      <span>{index}</span>
      <i aria-hidden="true" />
      {children}
    </p>
  );
}

export function HomeTrustStrip() {
  return (
    <section className="sf-home-trust" aria-label="Customer companies">
      <div className="sf-shell sf-home-trust__inner">
        <span>Teams building proof with Unifize</span>
        <div role="list">
          {HOME_TRUST_COMPANIES.map((company) => (
            <span role="listitem" key={company}>{company}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const ENTRY_SIGNALS = [
  { index: "01", label: "Process", value: "Torque drift" },
  { index: "02", label: "Product", value: "Quality record" },
  { index: "03", label: "Industry", value: "IATF 16949" },
];

const GOVERNED_STAGES = ["Event", "Owner", "Approval", "Proof"];

function EntrySignalVisual() {
  return (
    <div
      className="sf-entry-signal"
      role="img"
      aria-label="Three starting points—a process issue, a product record, and an industry standard—converge into one governed thread from event to proof."
    >
      <div className="sf-entry-signal__top" aria-hidden="true">
        <span>Signal map</span>
        <small>Three routes · one record</small>
      </div>

      <div className="sf-entry-signal__body" aria-hidden="true">
        <div className="sf-entry-signal__origins">
          {ENTRY_SIGNALS.map((signal) => (
            <div className="sf-entry-signal__origin" key={signal.label}>
              <span>{signal.index}</span>
              <p>
                <small>{signal.label}</small>
                <b>{signal.value}</b>
              </p>
            </div>
          ))}
        </div>

        <svg className="sf-entry-signal__traces" viewBox="0 0 76 188" preserveAspectRatio="none">
          <path d="M0 28H20C33 28 31 94 48 94H76" />
          <path d="M0 94H76" />
          <path d="M0 160H20C33 160 31 94 48 94H76" />
          <circle cx="50" cy="94" r="4" />
        </svg>

        <div className="sf-entry-signal__record">
          <span>Governed thread</span>
          <h3>Torque drift on Line 2</h3>
          <ol>
            {GOVERNED_STAGES.map((stage, index) => (
              <li key={stage}>
                <i>{index + 1}</i>
                <b>{stage}</b>
              </li>
            ))}
          </ol>
          <p><span /> Decision, owner, and evidence stay together.</p>
        </div>
      </div>
    </div>
  );
}

function IndustrySignal({ type }: { type: "life" | "process" | "discrete" }) {
  if (type === "life") {
    return (
      <div className="sf-industry-signal" aria-hidden="true">
        <svg viewBox="0 0 164 112">
          <path className="is-faint" d="M20 22h124M20 56h124M20 90h124" />
          <path d="M30 22c18 0 18 34 36 34s18 34 36 34 18-34 36-34" />
          <circle cx="30" cy="22" r="7" />
          <circle cx="66" cy="56" r="7" />
          <circle cx="102" cy="90" r="7" />
          <path d="m130 53 5 5 10-12" />
        </svg>
        <span>Traceable by design</span>
      </div>
    );
  }

  if (type === "process") {
    return (
      <div className="sf-industry-signal" aria-hidden="true">
        <svg viewBox="0 0 164 112">
          <path className="is-faint" d="M18 28h128M18 56h128M18 84h128" />
          <rect x="28" y="18" width="28" height="20" rx="3" />
          <rect x="68" y="46" width="28" height="20" rx="3" />
          <rect x="108" y="74" width="28" height="20" rx="3" />
          <path d="M56 28h18v28M96 56h18v28" />
        </svg>
        <span>Controlled from batch to release</span>
      </div>
    );
  }

  return (
    <div className="sf-industry-signal" aria-hidden="true">
      <svg viewBox="0 0 164 112">
        <path className="is-faint" d="M22 24h120v64H22z" />
        <rect x="32" y="34" width="22" height="18" rx="2" />
        <rect x="71" y="34" width="22" height="18" rx="2" />
        <rect x="110" y="34" width="22" height="18" rx="2" />
        <path d="M54 43h17M93 43h17M43 52v19h78V52" />
        <circle cx="43" cy="78" r="6" />
        <circle cx="82" cy="78" r="6" />
        <circle cx="121" cy="78" r="6" />
      </svg>
      <span>Every configuration accounted for</span>
    </div>
  );
}

export function HomeEntryRouter() {
  return (
    <section className="sf-home-directory sf-home-router" aria-labelledby="sf-home-router-title">
      <div className="sf-shell sf-home-directory__inner">
        <header className="sf-home-directory__header sf-home-router__header">
          <div>
            <SectionEyebrow index="01">Choose your way in</SectionEyebrow>
            <h2 id="sf-home-router-title">Start with what brought you here.</h2>
            <p className="sf-home-router__lede">Improve the work, evaluate the system, or see Unifize in your regulated world.</p>
          </div>
          <EntrySignalVisual />
        </header>

        <div className="sf-home-router__paths">
          {HOME_ENTRY_PATHS.map((path) => (
            <article className="sf-home-router__path" key={path.label}>
              <span className="sf-home-router__label">{path.label}</span>
              <h3>{path.title}</h3>
              <p>{path.body}</p>
              <ul>
                {path.links.map((item) => <DirectoryRow item={item} key={item.name} />)}
              </ul>
              <Link className="sf-directory-pill" href={path.href}>
                {path.cta} <Arrow />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeSymptomSignal({ type }: { type: "cycle" | "wip" | "handoffs" | "trace" }) {
  if (type === "cycle") {
    return (
      <div className="sf-symptom-signal is-cycle" aria-hidden="true">
        <p><strong>90</strong><span>days to closure</span></p>
        <div className="sf-symptom-signal__bar"><i /><i /></div>
        <div className="sf-symptom-signal__legend"><span>Investigation</span><span>Waiting on handoffs</span></div>
      </div>
    );
  }

  if (type === "wip") {
    return (
      <div className="sf-symptom-signal is-wip" aria-hidden="true">
        <header><span>WIP hold queue</span><span>Age</span></header>
        <p><span><i />Batch 220-B</span><b>2d</b></p>
        <p><span><i />Line 2 containment</span><b>1d</b></p>
        <p><span><i />Incoming lot 5541</span><b>6h</b></p>
      </div>
    );
  }

  if (type === "handoffs") {
    return (
      <div className="sf-symptom-signal is-handoffs" aria-hidden="true">
        <div><i>QA</i><span>Qualification</span></div>
        <p><strong>12</strong><span>email replies</span></p>
        <div><i>SU</i><span>Supplier</span></div>
        <svg viewBox="0 0 260 30"><path d="M18 15H242" /><circle cx="55" cy="15" r="3" /><circle cx="102" cy="15" r="3" /><circle cx="151" cy="15" r="3" /><circle cx="205" cy="15" r="3" /></svg>
      </div>
    );
  }

  return (
    <div className="sf-symptom-signal is-trace" aria-hidden="true">
      <div><i>01</i><span>Design review</span></div>
      <b>→</b>
      <div className="is-gap"><i>?</i><span>Decision trail</span></div>
      <b>→</b>
      <div><i>03</i><span>DHF</span></div>
    </div>
  );
}

export function HomeRecognition() {
  return (
    <section className="sf-home-section sf-home-recognition" id="sf-solutions" aria-labelledby="sf-recognition-title">
      <div className="sf-shell sf-home-section__inner">
        <header className="sf-home-section__header">
          <div>
            <SectionEyebrow index="02">Where the day goes</SectionEyebrow>
            <h2 id="sf-recognition-title">Where regulated work slows down.</h2>
          </div>
          <p>The symptoms look different across teams. The pattern underneath is the same: work waits wherever ownership, evidence, and decisions cross a system boundary.</p>
        </header>

        <ul className="sf-home-symptoms">
          {HOME_SYMPTOMS.map((symptom) => (
            <li key={symptom.domain}>
              <Link className="sf-home-symptom" href={symptom.href}>
                <HomeSymptomSignal type={symptom.visual} />
                <span className="sf-home-symptom__copy">
                  <small>{symptom.domain}</small>
                  <strong>{symptom.claim}</strong>
                  <span>{symptom.note}</span>
                  <b>Explore solution <Arrow /></b>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="sf-home-section__footer">
          <p>Quality, operations, supplier management, and product development all run on the same decision model.</p>
          <HeroLink href="/explorations/domains" muted>See every solution</HeroLink>
        </footer>
      </div>
    </section>
  );
}

function HomeMechanismStage() {
  return (
    <div
      className="sf-mechanism-stage"
      role="img"
      aria-label="Events from existing systems converge into a governed Unifize thread, then write approved outcomes and evidence back."
    >
      <div className="sf-mechanism-stage__systems" aria-hidden="true">
        <span>Existing systems</span>
        <div><i>MES</i><p><b>Line event</b><small>Torque out of range</small></p></div>
        <div><i>QMS</i><p><b>Quality record</b><small>NC-204 opened</small></p></div>
        <div><i>ERP</i><p><b>Material hold</b><small>Lot 5541 contained</small></p></div>
      </div>

      <svg className="sf-mechanism-stage__traces" viewBox="0 0 180 260" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 46H48C82 46 68 130 116 130H180" />
        <path d="M0 130H180" />
        <path d="M0 214H48C82 214 68 130 116 130H180" />
        <circle cx="120" cy="130" r="5" />
      </svg>

      <div className="sf-mechanism-stage__thread" aria-hidden="true">
        <header><span>Governed thread</span><small>SF-204 · Active</small></header>
        <h3>Torque drift on Line 2</h3>
        <div className="sf-mechanism-stage__decision">
          <span>Decision</span>
          <p>Contain Line 2 and verify fixture calibration before release.</p>
        </div>
        <ol>
          <li><i>RM</i><span><b>Owner assigned</b><small>Riya Mehta</small></span></li>
          <li><i>✓</i><span><b>Approval complete</b><small>4 accountable approvers</small></span></li>
          <li><i>◇</i><span><b>Evidence proven</b><small>Calibration attached</small></span></li>
        </ol>
      </div>
    </div>
  );
}

export function HomeMechanism() {
  return (
    <section className="sf-home-section sf-home-mechanism" id="sf-platform" aria-labelledby="sf-mechanism-title">
      <div className="sf-shell sf-home-section__inner">
        <header className="sf-home-section__header">
          <div>
            <SectionEyebrow index="03">One problem, one mechanism</SectionEyebrow>
            <h2 id="sf-mechanism-title">Turn hidden waiting into a governed decision trail.</h2>
          </div>
          <div className="sf-home-mechanism__intro">
            <p>The coordination tax is the time lost holding cross-functional work together when no system owns it end to end. Unifize makes that waiting visible, accountable, and recoverable.</p>
            <div>
              <HeroLink href="/explorations/platform">Explore the platform</HeroLink>
              <HeroLink href="/coordination-tax-calculator" muted>Measure the tax</HeroLink>
            </div>
          </div>
        </header>

        <ol className="sf-home-mechanism__steps">
          {HOME_MECHANISM_STEPS.map((step) => (
            <li key={step.index}>
              <span>{step.index}</span>
              <b>{step.name}</b>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <HomeMechanismStage />
      </div>
    </section>
  );
}

function ProductSignal({ code }: { code: string }) {
  return (
    <div className={`sf-product-signal is-${code.toLowerCase()}`} aria-hidden="true">
      <span>{code}</span>
      <svg viewBox="0 0 230 96">
        <path className="is-rail" d="M24 48H206" />
        <circle cx="32" cy="48" r="11" />
        <rect x="76" y="35" width="28" height="26" rx="4" />
        <rect x="126" y="35" width="28" height="26" rx="4" />
        <circle cx="198" cy="48" r="11" />
        <path className="is-mark" d="m193 48 4 4 7-9" />
      </svg>
      <small>Event → governed record → effective state</small>
    </div>
  );
}

export function HomeProducts() {
  return (
    <section className="sf-home-section sf-home-products" id="sf-products" aria-labelledby="sf-products-title">
      <div className="sf-shell sf-home-section__inner">
        <header className="sf-home-section__header">
          <div>
            <SectionEyebrow index="04">The product suite</SectionEyebrow>
            <h2 id="sf-products-title">One platform. Four governed records.</h2>
          </div>
          <p>Start with the system your team needs. Every product runs on the same layer, alongside the systems you already trust.</p>
        </header>

        <ul className="sf-home-products__grid">
          {HOME_PRODUCTS.map((product) => (
            <li key={product.code}>
              <Link className="sf-home-product" href={product.href}>
                <ProductSignal code={product.code} />
                <span className="sf-home-product__copy">
                  <small>{product.code}</small>
                  <h3>{product.name}</h3>
                  <p>{product.body}</p>
                  <strong>{product.outcome}</strong>
                  <b>Explore {product.code} <Arrow /></b>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeIndustryDirectory() {
  return (
    <section className="sf-home-directory sf-home-industries" id="sf-industries" aria-labelledby="sf-industries-title">
      <div className="sf-shell sf-home-directory__inner">
        <header className="sf-home-directory__header">
          <div>
            <SectionEyebrow index="05">Your regulated world</SectionEyebrow>
            <h2 id="sf-industries-title">Built for the standards—and the moments—that govern you.</h2>
          </div>
          <p>Find the version of Unifize grounded in your systems, regulatory frame, and the decisions your teams must be able to replay.</p>
        </header>

        <div className="sf-home-industries__groups">
          {HOME_INDUSTRY_GROUPS.map((group, index) => (
            <article className="sf-home-industries__group" key={group.name}>
              <IndustrySignal type={(["life", "process", "discrete"] as const)[index]} />
              <div className="sf-home-industries__group-copy">
                <h3>{group.name}</h3>
                <p>{group.body}</p>
              </div>
              <ul>
                {group.industries.map((industry) => <DirectoryRow item={industry} key={industry.name} />)}
              </ul>
            </article>
          ))}
        </div>

        <footer className="sf-home-industries__footer">
          <p>E-signatures, attributable approvals, and a complete audit trail on every governed thread.</p>
          <Link className="sf-directory-pill is-primary" href="/explorations/home#industries">
            Explore industries <Arrow />
          </Link>
        </footer>
      </div>
    </section>
  );
}

export function HomeProof() {
  return (
    <section className="sf-home-section sf-home-proof" id="sf-proof" aria-labelledby="sf-proof-title">
      <div className="sf-shell sf-home-section__inner">
        <header className="sf-home-section__header">
          <div>
            <SectionEyebrow index="06">Proof in context</SectionEyebrow>
            <h2 id="sf-proof-title">From the people who stopped paying the coordination tax.</h2>
          </div>
          <p>Follow the proof by industry, by solution, or by the governed system that changed the work.</p>
        </header>

        <ul className="sf-home-proof__stories">
          {HOME_PROOF.map((story) => {
            const context = HOME_PROOF_CONTEXT[story.slug as keyof typeof HOME_PROOF_CONTEXT] ?? [];
            return (
              <li key={story.slug}>
                <article className="sf-proof-story">
                  <div className="sf-proof-story__context" aria-label="Related pages">
                    {context.map((item) => <Link href={item.href} key={item.label}>{item.label}</Link>)}
                  </div>
                  <p className="sf-proof-story__metric">
                    <strong>{story.metrics[0].value}</strong>
                    <span>{story.metrics[0].label}</span>
                  </p>
                  <blockquote>“{story.quote}”</blockquote>
                  <div className="sf-proof-story__who">
                    <span className="sf-proof-story__avatar" aria-hidden="true">{story.person.split(" ").map((part) => part[0]).join("")}</span>
                    <p><b>{story.person}</b><span>{story.role} · {story.company}</span><small>{story.companyKind}</small></p>
                  </div>
                  <Link className="sf-proof-story__link" href={`/explorations/resources/testimonials/${story.slug}`}>
                    Watch the story <Arrow />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="sf-home-resources">
          <div>
            <span>Keep exploring</span>
            <h3>Evidence for the next conversation.</h3>
          </div>
          <nav aria-label="Resources">
            {HOME_RESOURCES.map((resource) => (
              <Link href={resource.href} key={resource.label}>
                <span><b>{resource.label}</b><small>{resource.body}</small></span>
                <Arrow />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function HomeClose() {
  return (
    <section className="sf-home-close" id="sf-demo" aria-labelledby="sf-close-title">
      <div className="sf-shell sf-home-close__inner">
        <div>
          <span>Ready when you are</span>
          <h2 id="sf-close-title">Bring the process that hurts most.</h2>
        </div>
        <div className="sf-home-close__side">
          <p>We will run it end to end on Unifize, live, and show you where the time is going.</p>
          <div>
            <Link className="sf-close-link is-primary" href="/chat-anatomy">Book a 30-minute walkthrough <Arrow diagonal /></Link>
            <Link className="sf-close-link" href="/coordination-tax-calculator">Take the assessment <Arrow /></Link>
          </div>
          <Link className="sf-home-close__it" href="/explorations/platform#platform">For IT: how it fits your architecture <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

const DOCUMENT_STAGES = [
  { label: "Draft", tone: "blue", mark: "" },
  { label: "Review", tone: "neutral", mark: "" },
  { label: "Approved", tone: "green", mark: "✓" },
  { label: "Effective", tone: "green", mark: "" },
];

export function DocumentPreview() {
  return (
    <div
      className="sf-document"
      role="img"
      aria-label="Controlled document SOP-118 moving from draft through review and approval to its effective version."
    >
      <aside className="sf-document__summary">
        <h2>Cleaning validation of process equipment</h2>
        <div className="sf-document__reference">
          <span>SOP-118</span>
          <b>REV D</b>
        </div>
        <div className="sf-document__rule" />
        <h3>Document summary</h3>
        <p>
          Procedure for validating the cleaning of process equipment to ensure
          consistent and effective removal of residues.
        </p>
      </aside>

      <section className="sf-document__workspace">
        <div className="sf-document__stages" aria-hidden="true">
          {DOCUMENT_STAGES.map((stage) => (
            <div className={`sf-document__stage is-${stage.tone}`} key={stage.label}>
              <span>{stage.mark}</span>
              <b>{stage.label}</b>
            </div>
          ))}
        </div>

        <article className="sf-document__paper">
          <div className="sf-document__paper-meta">
            <span>SOP-118</span>
            <i />
            <span>REV D</span>
          </div>
          <h3>Cleaning validation of process equipment</h3>
          <section>
            <b>1. &nbsp;Purpose</b>
            <p>
              This procedure describes the validation of cleaning processes for
              process equipment to ensure consistent and effective removal of residues.
            </p>
          </section>
        </article>
      </section>
    </div>
  );
}

const THREAD_STAGES = [
  { label: "Event", tone: "blue", mark: "✦" },
  { label: "Decision", tone: "violet", mark: "✓" },
  { label: "Approval", tone: "violet", mark: "⌁" },
  { label: "Proven", tone: "orange", mark: "◇" },
];

const THREAD_PEOPLE = [
  { name: "Riya Mehta", role: "Process Engineer", initials: "RM", tone: "blue" },
  { name: "Alex Morgan", role: "Quality Manager", initials: "AM", tone: "violet" },
  { name: "Jordan Lee", role: "Manufacturing Lead", initials: "JL", tone: "violet" },
  { name: "Taylor Kim", role: "Reliability Engineer", initials: "TK", tone: "orange" },
];

function RailIcon({ type }: { type: "grid" | "doc" | "people" | "settings" }) {
  if (type === "grid") {
    return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="3" width="5" height="5" /><rect x="12" y="3" width="5" height="5" /><rect x="3" y="12" width="5" height="5" /><rect x="12" y="12" width="5" height="5" /></svg>;
  }
  if (type === "doc") {
    return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3.5h6l3 3V16.5H6z" /><path d="M12 3.5v3h3M3.5 7v10h8" /></svg>;
  }
  if (type === "people") {
    return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8" cy="7" r="2.5" /><path d="M3.5 16c.4-3 2-4.5 4.5-4.5s4.1 1.5 4.5 4.5M13 6.2a2.3 2.3 0 0 1 0 4.4M14 12c1.5.5 2.3 1.8 2.5 4" /></svg>;
  }
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3" /><path d="M10 2.8v2M10 15.2v2M2.8 10h2M15.2 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4" /></svg>;
}

export function ThreadPreview() {
  return (
    <div
      className="sf-thread"
      role="img"
      aria-label="A governed cross-functional thread for a torque drift event, showing the decision, approval, proof, and accountable people."
    >
      <aside className="sf-thread__rail" aria-hidden="true">
        <span className="is-active"><RailIcon type="grid" /></span>
        <span><RailIcon type="doc" /></span>
        <span><RailIcon type="people" /></span>
        <span><RailIcon type="settings" /></span>
      </aside>

      <section className="sf-thread__workspace">
        <div className="sf-thread__brand" aria-hidden="true">
          <img src="/logo_light.svg" alt="" width="82" height="19" />
        </div>
        <h2>Torque drift on Line 2</h2>

        <div className="sf-thread__flow" aria-hidden="true">
          {THREAD_STAGES.map((stage) => (
            <div className={`sf-thread__step is-${stage.tone}`} key={stage.label}>
              <span>{stage.mark}</span>
              <b>{stage.label}</b>
            </div>
          ))}
        </div>

        <div className="sf-thread__people" aria-hidden="true">
          {THREAD_PEOPLE.map((person) => (
            <div className="sf-thread__person" key={person.name}>
              <span className={`sf-thread__avatar is-${person.tone}`}>{person.initials}</span>
              <span>
                <b>{person.name}</b>
                <small>{person.role}</small>
              </span>
            </div>
          ))}
        </div>

        <div className="sf-thread__record" aria-hidden="true">
          <span>Decision record</span>
          <p>Contain Line 2 and verify fixture calibration before release.</p>
          <b>Evidence attached · 4 approvals</b>
        </div>
      </section>
    </div>
  );
}
