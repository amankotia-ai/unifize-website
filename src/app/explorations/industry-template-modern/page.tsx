/* ============================================================================
 * INDUSTRY PAGE TEMPLATE — MODERN SKIN (Medical Devices instance).
 * Direction: refined dark-tech, PRODUCT-LED (Linear/Vercel flagship energy),
 * within Unifize's brand (Geist display + Inter body, JetBrains mono on data
 * only, Unifize blue as the single accent). Same content + data as the champion
 * ("The Decision Trace"), verbatim; new, more ambitious visual system.
 * Craft = depth, scale, real product framing, restrained motion. Altitude
 * discipline preserved; labeled placeholders stay placeholders.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  MD_PROOF,
  MD_COEXISTENCE,
} from "@/lib/platform-data/medical-devices-canonical";
import { TRIGGERS, VALIDATED } from "./industry-data";
import { SiteHeader } from "./site-header";
import { IngressNav } from "./ingress-nav";
import { PersonaExplorer } from "./persona-explorer";
import { ModuleIndex } from "./module-index";
import { CostLedger } from "./cost-ledger";
import { CustomerSuccess } from "./customer-success";
import { ItmMotion } from "./itm-motion";
import { ChatShell } from "@/components/organisms";
import "./itm.css";

export const metadata: Metadata = {
  title: "Medical Devices · Unifize",
  description:
    "Your QMS records that a document was approved. It cannot reconstruct why. Unifize rebuilds the decision trace across every function it touched. The industry template, instanced on Medical Devices.",
};

const HERO_CHIPS = ["21 CFR 820", "ISO 13485", "ISO 14971", "EU MDR 2017/745", "21 CFR Part 11"];

/* B · the decision trail beside the live chat surface. Mirrors the CC-2148
 * change-control thread beat for beat. Timestamps (T+N) are the only mono here. */
const BFLOW = [
  { t: "Change raised", who: "Lisa Martin", when: "T+0" },
  { t: "Impact assessment bound", who: "Unifize", when: "T+0" },
  { t: "Cross-functional review", who: "Rupa Kapoor", when: "T+5d" },
  { t: "Approved · Part 11 e-signature", who: "Priya Ramesh · VP", when: "T+9d" },
  { t: "Record sealed · 21 CFR 820.40", who: "Unifize", when: "T+9d" },
];

/* Restrained OUTLINE icons for the validation answer cards (Section I),
 * keyed by VALIDATED.points[].icon. Heroicons outline paths, inline. */
const VAL_ICONS: Record<string, React.ReactNode> = {
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  ),
};

export default function IndustryTemplateModernPage() {
  return (
    <main className="itm">
      <ItmMotion />
      <SiteHeader />

      {/* ============================ A · HERO ============================= */}
      <section className="itm-section itm-section--dark itm-hero" aria-label="Medical devices">
        <div className="itm-hero__glow" aria-hidden="true" />

        <div className="itm-wrap itm-wrap--wide itm-hero__inner">
          <div className="itm-hero__copy">
            <div className="itm-hero__crumb itm-meta">
              <span className="itm-dot itm-dot--accent" aria-hidden="true" />
              <Link href="/platform#industries">Industries</Link>
              <span className="itm-hero__crumb-sep" aria-hidden="true">/</span>
              <span>Medical devices</span>
            </div>
            <h1 className="itm-hero__title">
              Your QMS remembers that it was approved. <span className="itm-hero__turn">Not why.</span>
            </h1>
            <p className="itm-lede itm-hero__sub">
              Built for Class II &amp; III device OEMs and CDMOs, where every change, every CAPA, and
              every complaint has to stay traceable across functions.
            </p>
            <ul className="itm-hero__stds" aria-label="Regulatory frame">
              {HERO_CHIPS.map((s) => (
                <li key={s} className="itm-hero__std">{s}</li>
              ))}
            </ul>
            <div className="itm-hero__ctas">
              <button type="button" className="itm-btn">Book a demo →</button>
              <Link href="/platform" className="itm-btn itm-btn-ghost">See the platform</Link>
            </div>
          </div>
        </div>

        {/* product screen — decorative, sits free (no container/frame) */}
        <div className="itm-hero__stage" aria-hidden="true">
          <div className="itm-hero__shot">
            <img src="/hero-product.png" alt="" />
          </div>
        </div>

        {/* trust strip — dashed top divider (1 of 2) */}
        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-trust" aria-label="Customers and compliance">
            <div className="itm-trust__who">
              <span className="itm-trust__lab">Trusted by FDA-regulated device teams</span>
              <div className="itm-trust__names">
                {MD_PROOF.customers.map((c, i) => (
                  <span key={c.name} style={{ display: "contents" }}>
                    {i > 0 ? <span className="itm-trust__sep" aria-hidden="true" /> : null}
                    <span className="itm-trust__name">{c.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ B · THE DIFFERENCE ================== */}
      <section className="itm-section itm-section--tall" id="thesis">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <span className="itm-eyebrow">The difference</span>
            <h2 className="itm-h2">The decision lives in the thread, not the status field.</h2>
            <p className="itm-lede">
              Incumbents track document status. Unifize reconstructs the decision trace across every
              function a change touched.
            </p>
          </div>

          <div className="itm-diff__grid">
            <aside className="itm-trail" aria-label="How the decision moves" data-reveal>
              <span className="itm-trail__lab">How the decision moves</span>
              <ol className="itm-trail__steps">
                {BFLOW.map((s, i) => (
                  <li className={"itm-trail__step" + (i === BFLOW.length - 1 ? " is-sealed" : "")} key={s.t}>
                    <span className="itm-trail__node" aria-hidden="true" />
                    <span className="itm-trail__t">{s.t}</span>
                    <span className="itm-trail__meta">{s.who} <span className="itm-data">· {s.when}</span></span>
                  </li>
                ))}
              </ol>
              <p className="itm-trail__foot">The same change, sealed as a 21 CFR Part 11 audit trail. The thread is the trace.</p>
            </aside>

            <div className="itm-thread" data-reveal>
              {/* real product screen — rendered free, no wrapping container */}
              <div className="itm-thread__live">
                <ChatShell variant="change-control" />
              </div>
              <Link
                href="/industries/medical-devices/change-control"
                className="itm-thread__mobile"
                aria-label="View the full change-control thread CC-2148"
              >
                <span className="itm-thread__mobile-lab">Change-control thread</span>
                <span className="itm-thread__mobile-id">CC-2148 · raise → impact → review → Part 11 approval → seal</span>
                <span className="itm-thread__mobile-go">View full thread →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INGRESS · three ways in (sticky sub-nav group) ======== */}
      <div className="itm-ingress">
        <IngressNav />

        {/* D · PERSONAS */}
        <section className="itm-section" id="by-role">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <span className="itm-eyebrow">By your role</span>
              <h2 className="itm-h2">When the investigator is in the room, someone reconstructs it.</h2>
              <p className="itm-lede">The reconstruction always lands on someone. Find your seat, and see what you own when the trace has to hold up at audit.</p>
            </div>
            <PersonaExplorer />
          </div>
        </section>

        {/* E · MODULE INDEX */}
        <section className="itm-section itm-section--alt" id="modules">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <span className="itm-eyebrow">Coverage</span>
              <h2 className="itm-h2">Nine domains. In each one, the same question: can you replay the decision?</h2>
              <p className="itm-lede">Filter by the regulation you are audited against to see which controls evidence it.</p>
            </div>
            <ModuleIndex />
          </div>
        </section>

        {/* F · TRIGGER BAND */}
        <section className="itm-section itm-section--alt itm-trigs-sec" id="whats-breaking">
          <div className="itm-wrap">
            <div className="itm-head-block" data-reveal>
              <span className="itm-eyebrow">What's breaking</span>
              <h2 className="itm-h2">The moments that start a clock you don't control.</h2>
              <p className="itm-lede">Statutory deadlines, not customer outcomes. Each one routes to the process that answers it and the team that owns the response.</p>
            </div>
            <div className="itm-trigs">
              {TRIGGERS.map((t) => {
                const sev = t.severity === "Urgent" ? " is-urgent" : " is-high";
                const inner = (
                  <>
                    <div className="itm-trig__top">
                      <span className="itm-trig__clock">{t.clock}</span>
                      <span className={"itm-trig__sev" + sev}>
                        <span className="itm-dot" aria-hidden="true" />
                        {t.severity}
                      </span>
                    </div>
                    <p className="itm-trig__name">{t.name}</p>
                    <div className="itm-trig__foot">
                      <span className="itm-trig__mod">{t.routesTo}</span>
                      <span className="itm-trig__owner">{t.owner}</span>
                      {t.href ? <span className="itm-trig__go">Open the workflow →</span> : null}
                    </div>
                  </>
                );
                return t.href ? (
                  <Link
                    key={t.name}
                    href={t.href}
                    className="itm-trig itm-trig--live"
                    aria-label={`Open the change control workflow: ${t.name}`}
                  >{inner}</Link>
                ) : (
                  <div key={t.name} className="itm-trig">{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ============================ G · COEXISTENCE ===================== */}
      <section className="itm-section itm-section--short">
        <div className="itm-wrap">
          <div className="itm-coexist">
            <div className="itm-coexist__head" data-reveal>
              <span className="itm-eyebrow">Coexistence</span>
              <h2 className="itm-h3">It sits on the stack you have already validated.</h2>
              <div className="itm-sor">
                {MD_COEXISTENCE.systemsOfRecord.map((s) => <span key={s} className="itm-chip">{s}</span>)}
              </div>
              <p className="itm-body">
                Unifize replaces the ungoverned channels (email, meetings, spreadsheets) where the
                decision trace goes missing. It does not displace your QMS, and approvals are {MD_COEXISTENCE.approval}.
                No rip-and-replace, no revalidation of what already works.
              </p>
            </div>

            <div
              className="itm-diagram"
              role="img"
              aria-label="Diagram: Unifize sits as a coordination layer over your QMS, ERP, PLM and LIMS, which stay in place as your systems of record."
              data-reveal
            >
              <div className="itm-diagram__unifize">
                <b>Unifize</b>
                <span>Coordination layer</span>
              </div>
              <div className="itm-diagram__sors" aria-hidden="true">
                {MD_COEXISTENCE.systemsOfRecord.map((s) => (
                  <div key={s} className="itm-diagram__sor">
                    <b>{s}</b>
                    <span>System of record</span>
                  </div>
                ))}
              </div>
              <p className="itm-diagram__cap">Unifize as the coordination layer over your QMS, ERP, PLM and LIMS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ H · COST LEDGER ==================== */}
      <section className="itm-section itm-section--alt itm-cost-sec" id="cost">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <span className="itm-eyebrow">Cost of inaction</span>
            <h2 className="itm-h2">The cost is real. It just never lands on a line you can see.</h2>
          </div>
          <CostLedger />
        </div>
      </section>

      {/* ============================ I · VALIDATED-STATE ================ */}
      <section className="itm-section itm-section--short" id="validated">
        <div className="itm-wrap">
          <div className="itm-head-block" data-reveal>
            <span className="itm-eyebrow">{VALIDATED.eyebrow}</span>
            <h2 className="itm-h2">{VALIDATED.headline}</h2>
          </div>
          <ul className="itm-valgrid">
            {VALIDATED.points.map((pt) => (
              <li key={pt.label} className="itm-card itm-card--hover itm-valcard" data-reveal>
                <span className="itm-valcard__icon" aria-hidden="true">{VAL_ICONS[pt.icon]}</span>
                <h3 className="itm-h3">{pt.label}</h3>
                <p className="itm-body-sm">{pt.body}</p>
              </li>
            ))}
          </ul>
          <div className="itm-valcta">
            <button type="button" className="itm-btn itm-btn-ghost">{VALIDATED.cta}</button>
          </div>
        </div>
      </section>

      {/* ============= J · PROOF (folded into the customer-success carousel) */}
      <CustomerSuccess />

      {/* ============================ K · CLOSE ========================== */}
      <section className="itm-section itm-section--tall itm-section--dark itm-close" aria-labelledby="itm-close-h">
        <div className="itm-close__glow" aria-hidden="true" />
        <div className="itm-wrap">
          <div className="itm-head-block itm-head-block--center" data-reveal>
            <h2 className="itm-h2" id="itm-close-h">Incumbents track documents. Unifize reconstructs the decision.</h2>
            <p className="itm-lede">Pick a decision you could not replay at the last audit. We will reconstruct it live.</p>
            <div className="itm-close__cta">
              <button type="button" className="itm-btn">Book a 30-minute walkthrough</button>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- site footer */}
      <footer className="itm-section--dark itm-footer">
        <div className="itm-wrap itm-wrap--wide itm-footer__grid">
          <div className="itm-footer__brand">
            <img className="itm-footer__logo" src="/logo_light.svg" alt="Unifize" />
            <span className="itm-footer__tag">The decision trace for regulated operations.</span>
          </div>
          <nav className="itm-footer__col" aria-label="Industries">
            <span className="itm-footer__lab">Industries</span>
            <Link href="/industries/medical-devices" aria-current="page">Medical devices</Link>
            <Link href="/platform#industries">Pharmaceuticals</Link>
            <Link href="/platform#industries">Aerospace</Link>
          </nav>
          <nav className="itm-footer__col" aria-label="Coverage">
            <span className="itm-footer__lab">Coverage</span>
            <Link href="/industries/medical-devices/change-control">Change control</Link>
            <a href="#modules">All modules</a>
            <a href="#by-role">By role</a>
          </nav>
        </div>
        <div className="itm-wrap itm-wrap--wide">
          <div className="itm-footer__base">
            <span>© Unifize 2026 · Industry template, Medical Devices instance</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
