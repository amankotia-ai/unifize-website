/* ============================================================================
 * INDUSTRY PAGE TEMPLATE — instanced on Medical Devices.
 * Tournament champion ("The Decision Trace") + grafts. See
 * docs/industry-page-template/07-tournament-results.md for the blueprint.
 *
 * Section map (A–K): A Hero · B Two Records · C Coexistence · D Two Doors ·
 * E Trigger band · F Personas · G Module index · H Cost ledger ·
 * I Validated-state · J Proof · K Close.
 *
 * Brand-aligned + minimal: project fonts (Geist/Inter), the unified brand
 * blue as the only accent. Altitude discipline: every block names + teases,
 * then routes. No module mechanics, no persona day-in-the-life.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  MD_PROOF,
  MD_COEXISTENCE,
} from "@/lib/platform-data/medical-devices-canonical";
import { TRIGGERS, VALIDATED } from "./industry-data";
import { ModuleIndex } from "./module-index";
import { PersonaExplorer } from "./persona-explorer";
import { CostLedger } from "./cost-ledger";
import { IngressNav } from "./ingress-nav";
import { ChatShell } from "@/components/organisms";
import "./industry-template.css";

export const metadata: Metadata = {
  title: "Medical Devices · Unifize",
  description:
    "Your QMS records that a document was approved. It cannot reconstruct why. Unifize rebuilds the decision trace across every function it touched. The industry template, instanced on Medical Devices.",
};

const usd = (n: number) => "$" + n.toLocaleString("en-US");

const HERO_CHIPS = ["21 CFR 820", "ISO 13485", "ISO 14971", "EU MDR 2017/745", "21 CFR Part 11"];

/* An illustrative decision trace, clearly diagrammatic (never a faked screen).
 * source: MD_ROOT_CAUSE.secondary thesis. */
const TRACE_NODES = [
  "Risk reassessment opened",
  "R&D, QA and Manufacturing weigh in",
  "Evidence each function saw",
  "Decided against revision B",
  "Propagated to the DHR",
  "Training cascade triggered",
];

/* Big solid icons for the validation answer cards (Section I), keyed by
 * VALIDATED.points[].icon. Heroicons solid paths, inline so there is no
 * icon-library dependency. */
const VAL_ICONS = {
  stack: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.718-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.678 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
    </svg>
  ),
};

/* B · the decision trail beside the live chat surface. Mirrors the CC-2148
 * change-control thread beat for beat (raise, impact bound, review, Part 11
 * approval, seal), so the trail and the chat are one story at two zoom levels. */
const BFLOW = [
  { t: "Change raised", who: "Lisa Martin", when: "T+0" },
  { t: "Impact assessment bound", who: "Unifize", when: "T+0" },
  { t: "Cross-functional review", who: "Rupa Kapoor", when: "T+5d" },
  { t: "Approved · Part 11 e-signature", who: "Priya Ramesh · VP", when: "T+9d" },
  { t: "Record sealed · 21 CFR 820.40", who: "Unifize", when: "T+9d" },
];

export default function IndustryTemplatePage() {
  return (
    <main className="it">
      {/* ----------------------------------------------------- site header */}
      <header className="it-head">
        <div className="it-head-inner">
          <a className="it-brand" href="/">
            <img src="/logo_dark.svg" alt="Unifize" className="it-brand-logo" />
          </a>
          <nav className="it-nav">
            <a href="#thesis">The difference</a>
            <a href="#by-role">By role</a>
            <a href="#whats-breaking">Triggers</a>
            <a href="#modules">Coverage</a>
            <a href="#proof">Proof</a>
          </nav>
          <button type="button" className="it-btn it-btn-sm">Book a demo</button>
        </div>
      </header>

      {/* ============================ A · HERO ============================= */}
      <section className="it-hero">
        {/* product shot — floats on the dark hero (transparent PNG) and bleeds
            off the right; its receding edge tucks behind the headline. */}
        <img
          className="it-hero-shot"
          src="/hero-product.png"
          alt="Unifize in use: a training cycle-times dashboard above a live records table of owners, status and departments"
        />
        <div className="it-wrap it-hero-grid">
          <div className="it-hero-copy">
            <div className="it-crumb">
              <span className="it-dot" aria-hidden="true" />
              <Link href="/platform#industries">Industries</Link>
              <span className="sep">/</span>
              <span>Medical devices</span>
            </div>
            <h1 className="it-hero-title">
              Your QMS remembers that it was approved. <span className="it-hero-not">Not why.</span>
            </h1>
            <p className="it-hero-sub">
              Built for Class II &amp; III device OEMs and CDMOs, where every change, every CAPA, and
              every complaint has to stay traceable across functions.
            </p>
            <ul className="it-frame" aria-label="Regulatory frame">
              {HERO_CHIPS.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <div className="it-ctas">
              <button type="button" className="it-btn">Book a demo →</button>
              <Link href="/platform" className="it-btn it-btn-ghost">See the platform</Link>
            </div>
          </div>
        </div>
      </section>

      {/* trust strip */}
      <div className="it-trust">
        <div className="it-wrap it-trust-inner">
          <span className="it-trust-lab">Trusted by FDA-regulated device teams</span>
          <span className="it-trust-names">
            {MD_PROOF.customers.map((c) => <b key={c.name}>{c.name}</b>)}
          </span>
          <span className="it-trust-facts">
            <span>21 CFR Part 11 e-signatures</span>
            <span>Coexists with your QMS</span>
            <span>Customer-attested results</span>
          </span>
        </div>
      </div>

      {/* ============================ B · TWO RECORDS ===================== */}
      <section className="it-section it-tall" id="thesis">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The difference</span>
            <h2 className="it-h2">The decision lives in the thread, not the status field.</h2>
            <p className="it-lede">
              Incumbents track document status. Unifize reconstructs the decision trace across every
              function a change touched.
            </p>
          </div>

          <div className="it-bgrid">
            {/* LEFT — the trail: how the decision moves */}
            <aside className="it-bflow" aria-label="How the decision moves">
              <span className="it-bflow-lab">How the decision moves</span>
              <ol className="it-bflow-steps">
                {BFLOW.map((s) => (
                  <li className="it-bflow-step" key={s.t}>
                    <span className="it-bflow-dot" aria-hidden="true" />
                    <span className="it-bflow-t">{s.t}</span>
                    <span className="it-bflow-meta">{s.who} · {s.when}</span>
                  </li>
                ))}
              </ol>
              <p className="it-bflow-foot">The same change, sealed as a 21 CFR Part 11 audit trail. The thread is the trace.</p>
            </aside>

            {/* RIGHT — the chat surface: the real governed thread where it happened */}
            <div className="it-bchat">
              <ChatShell variant="change-control" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ INGRESS · three ways in, as a sticky sub-nav ===========
       * The old "Three ways in" doors section is gone; this group carries a
       * sticky sub-nav that pins under the header while you are anywhere in the
       * three ingress sections, and scroll-spies the active one. */}
      <div className="it-ingress">
        <IngressNav />

        {/* PERSONAS */}
        <section className="it-section it-section-alt" id="by-role">
          <div className="it-wrap">
            <div className="it-head-block">
              <span className="it-eyebrow">By your role</span>
              <h2 className="it-h2">When the investigator is in the room, someone reconstructs it.</h2>
              <p className="it-lede">The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at audit.</p>
            </div>
            <PersonaExplorer />
          </div>
        </section>

        {/* MODULE INDEX */}
        <section className="it-section" id="modules">
          <div className="it-wrap">
            <div className="it-head-block">
              <span className="it-eyebrow">Coverage</span>
              <h2 className="it-h2">Nine domains. In each one, the same question: can you replay the decision?</h2>
              <p className="it-lede">Filter by the regulation you are audited against to see which controls evidence it.</p>
            </div>
            <ModuleIndex />
          </div>
        </section>

        {/* TRIGGER BAND */}
        <section className="it-section it-panel-warm" id="whats-breaking">
          <div className="it-wrap">
            <div className="it-head-block">
              <span className="it-eyebrow">What's breaking</span>
              <h2 className="it-h2">The moments that start a clock you don't control.</h2>
              <p className="it-rail">Statutory deadlines, not customer outcomes. Each one routes to the process that answers it and the team that owns the response.</p>
            </div>
            <div className="it-trigs">
              {TRIGGERS.map((t) => {
                const sev = t.severity === "Urgent" ? " is-urgent" : " is-high";
                const inner = (
                  <>
                    <div className="it-trig-top">
                      <span className="it-trig-clock">{t.clock}</span>
                      <span className={"it-trig-sev" + sev}>{t.severity}</span>
                    </div>
                    <p className="it-trig-name">{t.name}</p>
                    <div className="it-trig-foot">
                      <span className="it-trig-mod">{t.routesTo}</span>
                      <span className="it-trig-owner">{t.owner}</span>
                      {t.href ? <span className="it-trig-go">Open the workflow →</span> : null}
                    </div>
                  </>
                );
                return t.href ? (
                  <Link key={t.name} href={t.href} className="it-trig is-live">{inner}</Link>
                ) : (
                  <div key={t.name} className="it-trig">{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ============================ C · COEXISTENCE (moved down) ========= */}
      <section className="it-section it-short it-section-alt">
        <div className="it-wrap">
          <div className="it-coexist-grid">
            <div>
              <span className="it-eyebrow">Coexistence</span>
              <h2 className="it-h3">It sits on the stack you have already validated.</h2>
            </div>
            <div className="it-coexist-body">
              <div className="it-sor">
                {MD_COEXISTENCE.systemsOfRecord.map((s) => <span key={s} className="it-chip">{s}</span>)}
              </div>
              <p>
                Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the
                decision trace goes missing. It does not displace your QMS, and approvals are {MD_COEXISTENCE.approval}.
                No rip-and-replace, no revalidation of what already works.
              </p>
            </div>
          </div>
          <div className="it-ph it-ph-wide it-coexist-ph" role="img" aria-label="Diagram placeholder">
            <span className="it-ph-label"><b>Diagram</b><span>Unifize as the coordination layer over your QMS, ERP, PLM and LIMS</span></span>
          </div>
        </div>
      </section>

      {/* ============================ H · COST LEDGER ==================== */}
      <section className="it-section it-section-alt" id="cost">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Cost of inaction</span>
            <h2 className="it-h2">The cost is real. It just never lands on a line you can see.</h2>
          </div>

          <CostLedger />
        </div>
      </section>

      {/* ============================ I · VALIDATED-STATE ================ */}
      <section className="it-section it-short" id="validated">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">{VALIDATED.eyebrow}</span>
            <h2 className="it-h2">{VALIDATED.headline}</h2>
          </div>
          <div className="it-val">
            {VALIDATED.points.map((pt) => (
              <div key={pt.label} className="it-val-card">
                <span className="it-val-icon" aria-hidden="true">{VAL_ICONS[pt.icon]}</span>
                <h3>{pt.label}</h3>
                <p>{pt.body}</p>
              </div>
            ))}
          </div>
          <button type="button" className="it-btn it-btn-ghost it-val-cta">{VALIDATED.cta}</button>
        </div>
      </section>

      {/* ============================ J · PROOF ========================== */}
      <section className="it-section it-section-alt" id="proof">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Proof</span>
            <h2 className="it-h2">One result, honestly stated, from a device company in your class.</h2>
          </div>
          <div className="it-ph it-ph-wide it-proof-ph" role="img" aria-label="Product dashboard placeholder">
            <span className="it-ph-label"><b>Product screenshot</b><span>Coordination-cost dashboard, year-one recovery against baseline</span></span>
          </div>
          <div className="it-proof">
            <div className="it-proof-stat">
              <span className="it-proof-pretag">{MD_PROOF.stat.attribution}</span>
              <span className="it-proof-pct">{MD_PROOF.stat.pct}%</span>
              <p className="it-proof-ctx">
                lower {MD_PROOF.stat.metric}. <b>{usd(MD_PROOF.stat.recovered)} recovered</b> in year one,
                against a signed {usd(MD_PROOF.stat.baseline)} baseline.
              </p>
              <span className="it-proof-attr">From one signed, verifiable customer baseline.</span>
            </div>
            <div className="it-proof-side">
              <span className="it-proof-side-lab">Regulated device teams on Unifize</span>
              <ul className="it-proof-names">
                {MD_PROOF.customers.map((c) => (
                  <li key={c.name}><b>{c.name}</b><span>{c.desc}</span></li>
                ))}
              </ul>
              <span className="it-proof-disc">Named references are shown separately from the figure above, which is anonymized and customer-attested.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ K · CLOSE ========================== */}
      <section className="it-section is-dark it-close">
        <div className="it-wrap">
          <div className="it-close-inner">
            <h2 className="it-close-h">Incumbents track documents. Unifize reconstructs the decision.</h2>
            <p className="it-close-sub">Pick a decision you could not replay at the last audit. We will reconstruct it live.</p>
            <button type="button" className="it-btn it-close-btn">Book a 30-minute walkthrough</button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- site footer */}
      <footer className="it-foot">
        <div className="it-wrap it-foot-inner">
          <div className="it-foot-brand">
            <strong>Unifize</strong>
            <span>The decision trace for regulated operations.</span>
          </div>
          <div className="it-foot-cols">
            <div>
              <span className="it-foot-lab">Industries</span>
              <Link href="/industries/medical-devices">Medical devices</Link>
              <Link href="/platform#industries">Pharmaceuticals</Link>
              <Link href="/platform#industries">Aerospace</Link>
            </div>
            <div>
              <span className="it-foot-lab">Coverage</span>
              <Link href="/industries/medical-devices/change-control">Change control</Link>
              <a href="#modules">All modules</a>
              <a href="#by-role">By role</a>
            </div>
          </div>
        </div>
        <div className="it-foot-base"><span>© Unifize 2026 · Industry template, Medical Devices instance</span></div>
      </footer>
    </main>
  );
}
