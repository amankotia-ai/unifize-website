/* ============================================================================
 * PLATFORM - the one page on the site where the coordination tax is the
 * protagonist. Product pages establish parity and link here for the full
 * argument. The flow runs the causal chain in customer-facing order: the gap
 * (shown, not told - GapExplorer), the tax (quantified, then the bill twice),
 * the answer (animated three-zone diagram), what you get (StackExplorer),
 * why it compounds, how it is measured (coded product mock), who it is for,
 * where it lands. NO internal vocabulary on page: no schema names, no
 * sales-stage labels, no methodology terms. Copy grounded in the Positioning
 * Strategy / Platform-led messaging framework (stats are the sourced set).
 * Design system: DMS enterprise v1 (dms.css) + pf-* kit.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { DmsMotion } from "../products/dms/dms-motion";
import { Eyebrow, ShellFrame, StagePanel, HatchFrame } from "../products/dms/dms-primitives";
import { BigStat } from "../products/dms/dms-linework";
import { MockChangeOrder } from "../products/dms/dms-mocks";
import { ThreeZoneDiagram, CompoundLoop } from "./platform-visuals";
import { StackExplorer } from "./platform-interactive";
import { GapDiagram, GapBanner } from "./platform-gap";
import { MockThreadMetrics } from "./platform-mocks";
import "../products/dms/dms.css";
import "./platform-kit.css";

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "Unifize connects the decisions, evidence, and completion your teams scatter across email, meetings, and spreadsheets, and measures the time it gives you back, on every CAPA, change order, and approval.",
};

const FORCES = ["People", "Process", "AI", "Outcomes"];

/* 02 - the bill, twice: what your week loses, what your P&L loses */
const BILL_DAY = [
  { name: "The 90-day CAPA", note: "The investigation is a week of work. The rest is chasing sign-offs, evidence, and owners across tools." },
  { name: "The change order on its third loop", note: "Each function approves in its own channel, in an order nobody can see, on a clock nobody owns." },
  { name: "The two-week audit scramble", note: "Evidence that should fall out of the work gets rebuilt by hand, under deadline, every time." },
  { name: "The tracker beside the system", note: "A spreadsheet shadows every validated system, because the system cannot see the work between sign-offs." },
];
const BILL_PNL = [
  { name: "Scrap, rework, and premium freight", note: "Quality escapes compound downstream, where they are most expensive." },
  { name: "Launches that slip", note: "Products wait on approvals and evidence that no plan ever shows." },
  { name: "Experts doing detective work", note: "Your best people spend their week chasing status instead of using their judgment." },
  { name: "Findings and recalls", note: "Audit findings, warning letters, and recalls trace back to evidence nobody captured." },
  { name: "Cash stuck on hold", note: "Inventory ages on quality holds while decisions wait in inboxes." },
];

/* 07 - the compliance frame: the standards board, across every industry the
 * platform serves. Names carry the credibility (certificate-wall pattern);
 * overlapping entries reuse the DMS page's canonical copy verbatim. */
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

/* 08 - who it is for */
const SEATS = [
  {
    area: "Quality",
    name: "You run quality",
    note: "Your CAPAs take a quarter and audit prep takes the team. You want closure you can prove without rebuilding it by hand.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=1200&h=800&q=70",
    link: { label: "See a week in the role", href: "/explorations/personas/quality-manager" },
  },
  {
    area: "Operations",
    name: "You run operations",
    note: "Your lines wait on dispositions and your schedule slips on approvals. You want decisions to reach the floor as fast as they are made.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=1200&h=800&q=70",
  },
  {
    area: "IT & AI",
    name: "You own the systems",
    note: "You are asked to make AI useful in regulated work. You want it grounded in data you can trust and govern, not in inboxes.",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&crop=faces&w=1200&h=800&q=70",
  },
];

/* 08 - where it lands */
const FIT_INDUSTRIES = [
  { name: "Medical Devices", meta: "FDA 820 · ISO 13485", href: "/explorations/industry-template-modern" },
  { name: "Pharmaceuticals", meta: "cGMP · Annex 11", href: "/explorations/industries/pharmaceuticals" },
  { name: "Laboratories", meta: "ISO/IEC 17025", href: "/explorations/industries/laboratories" },
  { name: "Chemicals", meta: "REACH · GHS", href: "/explorations/industries/chemicals" },
];
const FIT_DOMAINS = [
  { name: "Quality", meta: "CAPA · NC · Audits", href: "/explorations/domains/quality" },
  { name: "Document & Records Control", meta: "SOPs · Versions", href: "/explorations/domains/document-and-records-control" },
  { name: "Operations", meta: "Holds · Dispositions", href: "/explorations/domains/operations" },
  { name: "Supplier Quality", meta: "PPAP · SCARs", href: "/explorations/domains/supplier-quality" },
];

export default function PlatformPage() {
  return (
    <main className="dms">
      <DmsMotion />
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label="The Unifize platform">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <div className="dms-hero__crumb">
                <Link href="/explorations/home">Unifize</Link>
                <span className="dms-hero__crumb-sep" aria-hidden="true">/</span>
                <span>The Platform</span>
              </div>
              <h1 className="dms-hero__title">
                Your work crosses teams. Your systems <span className="dms-hero__turn">don&rsquo;t.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">
                The hidden cost of holding cross-functional work together is the coordination tax. Unifize is the
                platform that makes it visible, measurable, and smaller every week, without replacing the systems
                you already run.
              </p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn">Book a demo &rarr;</button>
                <a href="#stack" className="dms-btn dms-btn-ghost">See what you get</a>
              </div>
            </div>
          </div>
          <ul className="pf-forces" aria-label="What the platform stands on">
            {FORCES.map((f) => <li key={f} className="pf-force">{f}</li>)}
          </ul>
        </div>

        {/* the hero object: one accountable thread, mid-flight */}
        <div className="dms-wrap dms-hero__frame">
          <ShellFrame url="app.unifize.com / threads / CC-2148">
            <MockChangeOrder />
          </ShellFrame>
        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-trust" aria-label="Customers">
        <div className="dms-wrap dms-trust__inner">
          <div className="dms-trust__logos" role="img" aria-label="Customer logos, placeholders">
            {[128, 96, 150, 108, 136, 92].map((w, i) => (
              <span key={i} className="dms-trust__mark" style={{ width: w }} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 01 · THE GAP ======================
       * Shown, not told: pick one of your systems, see the record it
       * keeps and the blank lines where the real work happened. */}
      <section className="dms-section" id="gap">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={1}>The gap</Eyebrow>
            <h2 className="dms-h2">Your systems hold the outcome. Not the work.</h2>
            <p className="dms-lede">
              The record shows what changed. It rarely shows the questions, the decisions, and the handoffs that
              made it happen: they live in email, in meetings, in spreadsheets, and they vanish when the record closes.
            </p>
          </div>
          <GapDiagram />
          <GapBanner />
        </div>
      </section>

      {/* ============================ 02 · THE TAX ======================
       * Named, defined in the same breath, and given a number. Then the
       * bill, twice: the day-to-day and the P&L. */}
      <section className="dms-section dms-section--alt" id="tax">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={2}>The hidden cost</Eyebrow>
            <h2 className="dms-h2">It has a name: the coordination tax.</h2>
            <p className="dms-lede">
              The cost of holding cross-functional work together when no system owns it end to end. You pay it in
              hours, headcount, and audit exposure, and today nothing on your stack measures it.
            </p>
          </div>

          <div className="pf-stats" data-reveal>
            <BigStat value="30%" label="of R&D spend leaks into duplication and rework" />
            <BigStat value="3,200" label="US product recalls a year, at up to $10M per event" />
            <BigStat value="$1.5T" label="lost annually to stalled production and operational bottlenecks" />
            <span className="pf-stats__src">European Commission · Harvard Business Review · Sedgwick · Institute for Supply Management</span>
          </div>

          <div className="pf-bill" data-reveal>
            <div className="pf-bill__side">
              <span className="pf-bill__lab">You feel it in the week</span>
              <ul className="pf-bill__rows">
                {BILL_DAY.map((b, i) => (
                  <li className="pf-bill__row" key={b.name}>
                    <span className="pf-bill__idx dms-data">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pf-bill__tx">
                      <span className="pf-bill__name">{b.name}</span>
                      <span className="pf-bill__note">{b.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pf-bill__side">
              <span className="pf-bill__lab">Your CFO feels it at quarter end</span>
              <ul className="pf-bill__rows">
                {BILL_PNL.map((b, i) => (
                  <li className="pf-bill__row" key={b.name}>
                    <span className="pf-bill__idx dms-data">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pf-bill__tx">
                      <span className="pf-bill__name">{b.name}</span>
                      <span className="pf-bill__note">{b.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 03 · THE ANSWER ===================
       * The placement diagram, animated: context flows in, decisions get
       * captured, write-back only where you agree. On ink. */}
      <section className="dms-section dms-section--dark" id="platform">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={3}>The platform</Eyebrow>
            <h2 className="dms-h2">One governed layer between your systems and your teams.</h2>
            <p className="dms-lede">
              Unifize turns every cross-functional event, a CAPA, a change order, a deviation, a complaint, into an
              accountable thread: one place where the decision, the evidence, the owner, and the completion stay
              connected. Your systems of record stay authoritative. Your tools stay where they are.
            </p>
          </div>
          <div data-reveal>
            <ThreeZoneDiagram />
          </div>
        </div>
      </section>

      {/* ============================ 04 · WHAT YOU GET ================= */}
      <section className="dms-section" id="stack">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={4}>What you get</Eyebrow>
            <h2 className="dms-h2">You come for a product. The platform comes with it.</h2>
            <p className="dms-lede">
              You are probably here for a QMS or a DMS, and that is exactly what you get: a product your team and
              your auditors already understand. Touch the layers to see what arrives with it.
            </p>
          </div>

          <div data-reveal>
            <StackExplorer />
          </div>

          <p className="pf-stack__foot" data-reveal>
            <b>Every product runs on the same foundation.</b> Whichever one you start with, connected threads,
            structured data, and audit-ready records arrive on day one, not as a future add-on.
          </p>
        </div>
      </section>

      {/* ============================ 05 · THE LOOP ===================== */}
      <section className="dms-section dms-section--alt" id="compound">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={5}>Why it compounds</Eyebrow>
            <h2 className="dms-h2">Every thread makes the next one faster.</h2>
            <p className="dms-lede">
              AI stalls when the data underneath it is scattered across inboxes. Here it compounds: AI drafts,
              chases, and summarizes inside the work, your people approve, and every closure makes it sharper.
            </p>
          </div>
          <div data-reveal>
            <CompoundLoop />
          </div>
        </div>
      </section>

      {/* ============================ 06 · MEASURED =====================
       * The measurement view, as the product renders it. The mock does
       * the explaining; the copy stays out of the way. */}
      <section className="dms-section dms-section--dark" id="measured">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={6}>Seen and measured</Eyebrow>
            <h2 className="dms-h2">You watch the tax fall, week by week.</h2>
            <p className="dms-lede">
              Every thread carries its own clock: how long it has been open, how long it spent waiting, how complete
              its evidence is. This is the view your Monday morning starts with.
            </p>
          </div>

          <div className="pf-measured" data-reveal>
            <StagePanel className="dms-stage--brand">
              <ShellFrame url="app.unifize.com / insights / threads" panel>
                <MockThreadMetrics />
              </ShellFrame>
            </StagePanel>
          </div>

          <div className="pf-proofsteps" data-reveal>
            <div className="pf-proofstep">
              <span className="pf-proofstep__lab">First</span>
              <span className="pf-proofstep__name">You get your hours back.</span>
              <p className="pf-proofstep__note">
                Less waiting, fewer chases, faster closure, measured on your own work against your own baseline,
                not an industry average.
              </p>
            </div>
            <div className="pf-proofstep">
              <span className="pf-proofstep__lab">Then</span>
              <span className="pf-proofstep__name">The savings show up in money.</span>
              <p className="pf-proofstep__note">
                Less scrap, less rework, less premium freight, less overtime. Every dollar claim is tied to work
                you can point at; if it cannot be traced, we do not claim it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 07 · COMPLIANCE ===================
       * The standards board, across the board: the names carry the
       * credibility; one plain sentence states what every thread carries. */}
      <section className="dms-section" id="compliance">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={7}>Compliance</Eyebrow>
            <h2 className="dms-h2">Audit-ready, whichever standard governs you.</h2>
            <p className="dms-lede">
              Every thread carries e-signatures with meaning, a complete audit trail, and its own evidence. The
              record you show an auditor is the record the work created, under any of these.
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
        </div>
      </section>

      {/* ============================ 08 · WHO IT IS FOR ================ */}
      <section className="dms-section dms-section--alt" id="who">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={8}>Who it&rsquo;s for</Eyebrow>
            <h2 className="dms-h2">Built for the people holding it together.</h2>
          </div>
          <div className="pf-seats" data-reveal>
            {SEATS.map((s) => (
              <article className="pf-seat" key={s.name}>
                <img className="pf-seat__photo" src={s.img} alt="" loading="lazy" />
                <div className="pf-seat__body">
                  <span className="pf-seat__tier">{s.area}</span>
                  <h3 className="pf-seat__name">{s.name}</h3>
                  <p className="pf-seat__note">{s.note}</p>
                  {s.link ? (
                    <Link className="pf-seat__link" href={s.link.href}>{s.link.label} &rarr;</Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 09 · WHERE IT LANDS =============== */}
      <section className="dms-section" id="fit">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={9}>Where it lands</Eyebrow>
            <h2 className="dms-h2">See it in your world.</h2>
          </div>
          <div className="pf-fit" data-reveal>
            <div className="pf-fit__col">
              <span className="pf-fit__lab">By industry</span>
              <ul className="pf-fit__rows">
                {FIT_INDUSTRIES.map((f) => (
                  <li key={f.name}>
                    <Link className="pf-fit__row" href={f.href}>
                      <span className="pf-fit__name">{f.name}</span>
                      <span className="pf-fit__meta">{f.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="pf-fit__all" href="/explorations/industry-template-modern">All industries &rarr;</Link>
            </div>
            <div className="pf-fit__col">
              <span className="pf-fit__lab">By solution</span>
              <ul className="pf-fit__rows">
                {FIT_DOMAINS.map((f) => (
                  <li key={f.name}>
                    <Link className="pf-fit__row" href={f.href}>
                      <span className="pf-fit__name">{f.name}</span>
                      <span className="pf-fit__meta">{f.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="pf-fit__all" href="/explorations/domains">All solutions &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close" aria-labelledby="pf-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="pf-close-h">Bring the process that hurts. Watch the tax fall.</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">
                We will run it end to end on one thread, live, and show you where your time is going.
              </p>
              <div className="dms-close__cta">
                <button type="button" className="dms-btn">Book a 30-minute walkthrough</button>
                <a href="#stack" className="dms-btn dms-btn-ghost">See what you get</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter note="The Unifize Platform" />
    </main>
  );
}
