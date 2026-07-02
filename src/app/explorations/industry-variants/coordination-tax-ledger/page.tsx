/* ============================================================================
 * 01 · THE COORDINATION TAX LEDGER  - economics-first.
 * The page is a financial statement: a P&L of inaction. The invisible cost of
 * coordination is made visible, attributed to named line items, then resolved
 * by routing to the module/persona that owns the leak.
 * For the COO / economic buyer (the signer) and the CFO-minded skeptic.
 *
 * Spine: A headline tax · B liabilities · C unit-cost ledger · D why it accrues
 *  · E where it lands (MODULE INGRESS) · F who signs (PERSONA INGRESS) · G the
 *  one audited recovery · H why incumbents can't close · I reconcile / demo.
 * Shares the .it tokens (see _base.css); re-skinned to "statement-grade" via
 * the .v-ledger root class. All figures canonical; no invented numbers.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  MD_ECONOMICS,
  MD_CONSEQUENCES,
  MD_WORKFLOW_VARIANTS,
  MD_ROOT_CAUSE,
  MD_PROOF,
} from "@/lib/platform-data/medical-devices-canonical";
import { ModuleIndex } from "../../industry-template/module-index";
import { PersonaExplorer } from "../../industry-template/persona-explorer";
import { VariantSwitcher, VariantHeader, TrustStrip, VariantFooter, usd, usdM } from "../_shared";
import "../_base.css";
import "./ledger.css";

export const metadata: Metadata = {
  title: "The Coordination Tax Ledger · Medical Devices · Unifize",
  description:
    "Coordination is costing the medical-device segment $75.2M to $808.1M a year. A statement of where it hides, what it accrues, and the module that owns each leak.",
};

const NAV = [
  { href: "#liabilities", label: "Liabilities" },
  { href: "#ledger", label: "The ledger" },
  { href: "#accounts", label: "Where it lands" },
  { href: "#signatories", label: "Who signs" },
  { href: "#recovery", label: "Recovery" },
];

/* The five canonical consequence types, rendered as a liabilities schedule.
 * The AMOUNT column is empty by design - that is the argument. */
const LIABILITIES: { item: string; accrues: string }[] = [
  { item: "Cycle Time", accrues: "Long cycle times; delayed time to market" },
  { item: "Cost of Poor Quality", accrues: "Coordination headcount embedded in COGS" },
  { item: "Working Capital", accrues: "Trapped cash; quarantine holds" },
  { item: "Compliance Drag", accrues: "Overdue controls; slow audit and customer proof; lagging post-market signal" },
  { item: "Revenue Risk", accrues: "Quality escapes and warranty; expanded recall scope; lost market access" },
];

/* General-ledger framing of the three canonical workflow variants. Each posts
 * to the owning module. Only Change Control has a live module page today. */
const POSTS_TO: Record<string, { label: string; href?: string }> = {
  capa: { label: "CAPA & Effectiveness" },
  "change-control": { label: "Change Control", href: "/industries/medical-devices/change-control" },
  audit: { label: "Document & Records Control" },
};

export default function CoordinationTaxLedgerPage() {
  return (
    <main className="it v-ledger">
      <VariantSwitcher current="coordination-tax-ledger" />
      <VariantHeader nav={NAV} />

      {/* ============================ A · LEDGER HERO ===================== */}
      <section className="it-hero">
        <div className="it-wrap it-hero-grid">
          <div className="it-hero-copy">
            <div className="it-crumb">
              <span className="it-dot" aria-hidden="true" />
              <Link href="/platform#industries">Industries</Link>
              <span className="sep">/</span>
              <span>Medical devices · Annual statement of coordination</span>
            </div>
            <h1 className="it-hero-title">Coordination is costing the medical-device segment</h1>
            <div className="lg-hero-range">
              {usdM(MD_ECONOMICS.annualTaxLow)}<span className="lg-dash">to</span>{usdM(MD_ECONOMICS.annualTaxHigh)} <span className="lg-dash">/ yr</span>
            </div>
            <p className="it-hero-sub">
              That is the annual coordination tax. Here is where it is hiding. Unifize reconstructs the
              decision trace your QMS cannot, without ripping it out.
            </p>
            <div className="it-ctas">
              <a href="#accounts" className="it-btn">Find your line item ↓</a>
              <a href="#reconcile" className="it-btn it-btn-ghost">Book a demo</a>
            </div>
          </div>

          <aside className="lg-stat-rail" aria-label="Segment statement metadata">
            <span className="lg-stat-rail-lab">Segment tax / yr</span>
            <span className="lg-stat-big">{usdM(MD_ECONOMICS.annualTaxLow)}–{usdM(MD_ECONOMICS.annualTaxHigh)}</span>
            <ul className="lg-stat-rows">
              <li><span className="lg-k">Companies</span><span className="lg-v">{MD_ECONOMICS.companies}</span></li>
              <li><span className="lg-k">Employees</span><span className="lg-v">{(MD_ECONOMICS.employees / 1_000_000).toFixed(3)}M</span></li>
              <li><span className="lg-k">TAM</span><span className="lg-v">≈ {usdM(MD_ECONOMICS.tamLow)}</span></li>
              <li><span className="lg-k">Wage band</span><span className="lg-v">${MD_ECONOMICS.wageLow}–${MD_ECONOMICS.wageHigh}/hr</span></li>
            </ul>
            <p className="lg-hero-audit">
              <b>Audited against</b>
              21 CFR 820 · 21 CFR Part 11 · ISO 13485 · ISO 14971 · EU MDR 2017/745 · 21 CFR 803
              <br />19 standards in frame.
            </p>
          </aside>
        </div>
      </section>

      <TrustStrip />

      {/* ============================ B · LIABILITIES ==================== */}
      <section className="it-section it-tall" id="liabilities">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Statement of liabilities · recurring, unquantified by design</span>
            <h2 className="it-h2">The cost you cannot see on any system you own.</h2>
            <p className="it-lede">Five accounts the coordination tax posts to. None of them show up on your GL.</p>
          </div>

          <div className="lg-liab-table">
            <div className="lg-liab-head">
              <span>Line item</span>
              <span>What accrues</span>
              <span className="lg-liab-amt">Amount</span>
            </div>
            {LIABILITIES.map((l) => (
              <div className="lg-liab-row" key={l.item}>
                <span className="lg-liab-item">{l.item}</span>
                <span className="lg-liab-acc">{l.accrues}</span>
                <span className="lg-liab-amt">
                  <span className="lg-liab-dash" role="img" aria-label="no recorded amount" />
                  <span className="lg-liab-tag">recurring</span>
                </span>
              </div>
            ))}
          </div>
          <p className="lg-liab-cap">
            <strong>The dash is the point.</strong> These never hit a line item, so no one is
            accountable for them. The next section is where we start putting numbers on it.
          </p>
        </div>
      </section>

      {/* ============================ C · THE GENERAL LEDGER ============= */}
      <section className="it-section it-section-alt" id="ledger">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Unit cost of coordination · per instance, wage band ${MD_ECONOMICS.wageLow}–${MD_ECONOMICS.wageHigh}/hr</span>
            <h2 className="it-h2">The general ledger: cost per coordination event.</h2>
            <p className="it-lede">Three workflows where the tax is actually metered. Each posts to a module.</p>
          </div>

          <div className="lg-gl">
            {MD_WORKFLOW_VARIANTS.map((v) => {
              const post = POSTS_TO[v.key];
              return (
                <div className="lg-gl-card" key={v.key}>
                  <h3 className="lg-gl-name">{v.name}</h3>
                  <div className="lg-gl-amt">{usd(v.costLow)}–{usd(v.costHigh)}</div>
                  <span className="lg-gl-unit">per instance</span>
                  <ul className="lg-gl-meta">
                    <li><span>Decisions</span><b>{v.decisions}{v.intensity ? " · " + v.intensity : ""}</b></li>
                    <li><span>Touchpoints</span><b>{v.touchpoints}</b></li>
                    <li><span>Cycle at risk</span><b>{v.cycle}</b></li>
                  </ul>
                  <p className="lg-gl-note">{v.note}</p>
                  {post.href ? (
                    <Link href={post.href} className="lg-gl-post">
                      <span className="lg-live-dot" aria-hidden="true" />Posts to {post.label} →
                    </Link>
                  ) : (
                    <span className="lg-gl-post is-stub">Posts to {post.label}</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="lg-gl-cap">These are unit costs, not annual totals. Multiply by your volume to estimate.</p>
        </div>
      </section>

      {/* ============================ D · ACCOUNTING NOTE =============== */}
      <section className="it-section it-short" id="note">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Note 1 to the statement</span>
            <h2 className="it-h2">Why the tax accrues.</h2>
          </div>
          <div className="lg-note">
            <div className="lg-note-card">
              <span className="lg-note-num">01</span>
              <h3 className="lg-note-name">{MD_ROOT_CAUSE.primary.name}</h3>
              <p className="lg-note-body">{MD_ROOT_CAUSE.primary.body}</p>
              <span className="lg-note-trace">Every line item above traces here.</span>
            </div>
            <div className="lg-note-card">
              <span className="lg-note-num">02</span>
              <h3 className="lg-note-name">{MD_ROOT_CAUSE.secondary.name}</h3>
              <p className="lg-note-body">{MD_ROOT_CAUSE.secondary.body}</p>
              <span className="lg-note-trace">A compliance liability, not an inconvenience.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ E · CHART OF ACCOUNTS (MODULE) ==== */}
      <section className="it-section it-section-alt" id="accounts">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The ledger of accounts · 9 of 12 coordination domains</span>
            <h2 className="it-h2">Where the tax lands. Pick the account that is bleeding.</h2>
            <p className="it-lede">Every account is a domain. Every line is a module, a door into the platform.</p>
          </div>
          <ModuleIndex />
        </div>
      </section>

      {/* ============================ F · AUTHORIZED SIGNATORIES (PERSONA) */}
      <section className="it-section" id="signatories">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Authorized signatories</span>
            <h2 className="it-h2">Every account has an owner. Enter by the role that owns the budget.</h2>
          </div>
          <PersonaExplorer />
        </div>
      </section>

      {/* ============================ G · THE ONE AUDITED RECOVERY ====== */}
      <section className="it-section it-section-alt" id="recovery">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Reconciled · customer-attested</span>
            <h2 className="it-h2">The one number on this page that has been signed off.</h2>
          </div>
          <div className="lg-recovery">
            <div className="lg-rec-fig">
              <span className="lg-rec-pretag">{MD_PROOF.stat.attribution}</span>
              <span className="lg-rec-amt">{usd(MD_PROOF.stat.recovered)}<span className="lg-rec-pct"> / yr · ≈{MD_PROOF.stat.pct}%</span></span>
              <p className="lg-rec-ctx">
                recovered against a signed <b>{usd(MD_PROOF.stat.baseline)}</b> baseline, in year one, on{" "}
                {MD_PROOF.stat.metric}.
              </p>
              <span className="lg-rec-attr">The cost you could not see (above), made visible and recoverable.</span>
            </div>
            <div className="lg-rec-side">
              <div className="it-ph it-ph-wide lg-rec-ph" role="img" aria-label="Product dashboard placeholder">
                <span className="it-ph-label"><b>Product screenshot</b><span>Coordination-cost dashboard, year-one recovery against baseline</span></span>
              </div>
              <ul className="lg-rec-names">
                {MD_PROOF.customers.map((c) => (
                  <li key={c.name}><b>{c.name}</b><span>{c.desc}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ H · WHY INCUMBENTS CAN'T CLOSE ==== */}
      <section className="it-section it-short" id="incumbents">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The structural difference</span>
            <h2 className="it-h2">Why the incumbents cannot close the gap.</h2>
          </div>
          <div className="lg-compete">
            <div className="lg-compete-col">
              <span className="lg-compete-lab">Tracks document status</span>
              <ul className="lg-compete-list">
                <li><b>MasterControl</b>Strong document control; weak cross-functional coordination.</li>
                <li><b>Veeva Vault Quality</b>Pharma-focused.</li>
                <li><b>ETQ Reliance</b>Mid-market QMS.</li>
                <li><b>Greenlight Guru</b>Device-specific, smaller companies.</li>
              </ul>
            </div>
            <div className="lg-compete-col is-us">
              <span className="lg-compete-lab">Reconstructs the decision</span>
              <p className="lg-compete-us-body">
                Unifize reconstructs the cross-functional decision trace, sitting on top of the QMS,
                PLM and MES you already validated. No rip-and-replace, no revalidation of what works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ I · THE RECONCILIATION (close) ==== */}
      <section className="it-section is-dark it-close" id="reconcile">
        <div className="it-wrap">
          <div className="it-close-inner">
            <h2 className="it-close-h">Put a number on your coordination tax.</h2>
            <p className="it-close-sub">A 30-minute walkthrough against your standards, workflows, and systems. The reconciliation that turns the segment range into your own number.</p>
            <button type="button" className="it-btn it-close-btn">Book a demo →</button>
          </div>
        </div>
      </section>

      <VariantFooter />
    </main>
  );
}
