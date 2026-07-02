/* ============================================================================
 * 02 · THE REGULATORY WAR ROOM: trigger/clock-first.
 * The page opens inside the moment a clock starts: a 483, a recall-scope call,
 * an MDR deadline, with their *statutory* clocks already running. Unifize is
 * framed as the command center where the cross-functional response gets
 * coordinated on a durable trace, then the buyer is handed to the exact module
 * and the exact role that owns that fire.
 * For the VP Quality / Head of RA in or near a firefight (and the COO who signs).
 *
 * Spine: A war-room hero · B the incident board (signature) · C the first
 *  casualty · D inside the war room · E the response surface (MODULE INGRESS)
 *  · F who runs the room (PERSONA INGRESS) · G what an improvised response costs
 *  · H the one signed result · I why Unifize · J close.
 * Shares the .it tokens (see _base.css); re-skinned to "command-center" via the
 * .v-warroom root class. Every clock is STATUTORY, never a customer outcome; the
 * one customer-attested number is quarantined to the proof block (H). All
 * figures canonical; no invented numbers; product screens are labeled slots.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  MD_ECONOMICS,
  MD_ROOT_CAUSE,
  MD_CONSEQUENCES,
  MD_PROOF,
  MD_COMPETITORS,
} from "@/lib/platform-data/medical-devices-canonical";
import { TRIGGERS } from "../../industry-template/industry-data";
import { ModuleIndex } from "../../industry-template/module-index";
import { PersonaExplorer } from "../../industry-template/persona-explorer";
import { VariantSwitcher, VariantHeader, TrustStrip, VariantFooter, usdM } from "../_shared";
import "../_base.css";
import "./war-room.css";

export const metadata: Metadata = {
  title: "The Regulatory War Room · Medical Devices · Unifize",
  description:
    "A 483 just landed and the clock started before the meeting did. The incident board for regulated device teams: every statutory clock, the module that runs the response, and the role that owns the room.",
};

const NAV = [
  { href: "#board", label: "Incident board" },
  { href: "#response", label: "Coverage" },
  { href: "#commanders", label: "By role" },
  { href: "#proof", label: "Proof" },
];

/* The three statutory clock chips for the hero. These are the *law's* windows,
 * not a claim about a Unifize customer, the single most important honesty
 * guardrail in the hero. source: MD_STANDARDS (21 CFR 803, CAPA 30-90, 483). */
const HERO_CLOCKS = [
  { code: "MDR · 21 CFR 803", window: "FDA 30-day · EU 15-day" },
  { code: "CAPA window", window: "30 to 90 days" },
  { code: "Form 483 response", window: "15 business days" },
];

/* The six lead regulatory-frame chips. source: MD_STANDARDS (19 in frame). */
const HERO_FRAME = ["21 CFR 820", "21 CFR Part 11", "ISO 13485", "ISO 14971", "EU MDR", "21 CFR 803"];

/* Three coordination-posture claims for "Inside the war room" (D). Held to
 * posture only: every line is true of all nine domains, so it can't be the
 * mechanics of any one. source: Industries → Opportunity + MD_COEXISTENCE. */
const POSTURE = [
  { n: "01", h: "One thread, every function", b: "The response runs in one place across Quality, R&D, Ops, Supplier, and RA, instead of N threads that have to be reconciled after the fact." },
  { n: "02", h: "The trace builds itself", b: "Who decided what, on what evidence, at what time, is captured as the response happens, not reconstructed under audit pressure." },
  { n: "03", h: "Coexists with your stack", b: "Sits on top of the validated QMS, PLM, and ERP you already run. No rip-and-replace, no revalidation of what works." },
];

export default function RegulatoryWarRoomPage() {
  return (
    <main className="it v-warroom">
      <VariantSwitcher current="regulatory-war-room" />
      <VariantHeader nav={NAV} />

      {/* ============================ A · WAR-ROOM HERO ================== */}
      <section className="it-hero">
        <div className="it-wrap it-hero-grid">
          <div className="it-hero-copy">
            <div className="it-crumb">
              <span className="it-dot" aria-hidden="true" />
              <Link href="/platform#industries">Industries</Link>
              <span className="sep">/</span>
              <span>Medical Devices · Regulatory Affairs &amp; Quality</span>
            </div>
            <h1 className="it-hero-title">A 483 just landed. The clock started before the meeting did.</h1>
            <p className="it-hero-sub">
              When an FDA inspection, a recall-scope call, or an MDR deadline hits, the work scatters
              across email, calls, and spreadsheets, and the trace you will be audited on is the first
              casualty. Unifize is the war room where regulated device teams run the response on one
              accountable thread.
            </p>

            <div className="wr-exposure">
              <span className="wr-exposure-lab">Segment exposure, mostly spent under deadline</span>
              <span className="wr-exposure-fig">
                {usdM(MD_ECONOMICS.annualTaxLow)}<span className="wr-to">to</span>{usdM(MD_ECONOMICS.annualTaxHigh)}<span className="wr-unit">/ yr</span>
              </span>
              <p className="wr-exposure-note">
                Estimated coordination tax across {MD_ECONOMICS.companies} US device makers. Most of it
                is spent under a clock, not on a calm Tuesday.
              </p>
            </div>

            <ul className="wr-frame" aria-label="Regulatory frame">
              {HERO_FRAME.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <span className="wr-frame-count"><b>19 standards</b> in frame.</span>

            <div className="it-ctas">
              <button type="button" className="it-btn">Book a demo →</button>
              <Link href="/platform" className="it-btn it-btn-ghost">See the platform</Link>
            </div>
          </div>

          <aside className="wr-clocks" aria-label="Statutory clocks">
            <span className="wr-clocks-lab">Statutory clocks</span>
            <ul className="wr-clock-list">
              {HERO_CLOCKS.map((c) => (
                <li className="wr-clock" key={c.code}>
                  <span className="wr-clock-top">
                    <span className="wr-tick" aria-hidden="true" />
                    <span className="wr-clock-code">{c.code}</span>
                  </span>
                  <span className="wr-clock-window">{c.window}</span>
                </li>
              ))}
            </ul>
            <p className="wr-clocks-foot">Statutory windows. Your clock depends on your finding.</p>
          </aside>
        </div>
      </section>

      <TrustStrip />

      {/* ============================ B · THE INCIDENT BOARD ============= */}
      {/* The signature section and the densest ingress surface on the page:
          each ticket carries two exits (a module and a role). Severity maps
          Urgent → Critical (amber), High → High (steel). */}
      <section className="it-section wr-board-section it-tall" id="board">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Why now · the moments a device company starts looking</span>
            <h2 className="it-h2">The incident board.</h2>
            <p className="it-lede">
              Every ticket is a moment with a real clock. Two exits per card: the module that runs the
              response, and the role that owns the room.
            </p>
          </div>

          <div className="wr-board">
            {TRIGGERS.map((t, i) => {
              const critical = t.severity === "Urgent";
              const id = "INC-" + String(i + 1).padStart(2, "0");
              return (
                <article className={"wr-ticket" + (critical ? " is-critical" : " is-high")} key={t.name}>
                  <div className="wr-ticket-top">
                    <span className={"wr-sev " + (critical ? "is-critical" : "is-high")}>
                      {critical ? "Critical" : "High"}
                    </span>
                    <span className="wr-ticket-id">{id}</span>
                  </div>
                  <div className="wr-clock-line">
                    <span className="wr-clock-glyph" aria-hidden="true" />
                    {t.clock}
                  </div>
                  <h3 className="wr-ticket-name">{t.name}</h3>
                  <div className="wr-exits">
                    <span className="wr-exit">
                      <span className="wr-exit-k">Run in</span>
                      {t.href ? (
                        <Link href={t.href} className="wr-exit-v">
                          <span className="wr-exit-live" aria-hidden="true" />{t.routesTo} →
                        </Link>
                      ) : (
                        <span className="wr-exit-v">{t.routesTo}</span>
                      )}
                    </span>
                    <span className="wr-exit">
                      <span className="wr-exit-k">Owned by</span>
                      <span className="wr-exit-v">{t.owner}</span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="wr-board-cap">
            <span className="wr-info" aria-hidden="true">ⓘ</span>
            Statutory deadlines shown, not customer outcomes. These are the moments device teams reach
            for a better way to coordinate the response.
          </p>
        </div>
      </section>

      {/* ============================ C · THE FIRST CASUALTY ============= */}
      <section className="it-section" id="casualty">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The structural why</span>
            <h2 className="it-h2">In a firefight, the trace is the first casualty.</h2>
          </div>
          <div className="wr-casualty">
            <div className="wr-cause">
              <span className="wr-cause-num">01</span>
              <h3 className="wr-cause-name">{MD_ROOT_CAUSE.primary.name}</h3>
              <p className="wr-cause-body">{MD_ROOT_CAUSE.primary.body}</p>
            </div>
            <div className="wr-cause">
              <span className="wr-cause-num">02</span>
              <h3 className="wr-cause-name">{MD_ROOT_CAUSE.secondary.name}</h3>
              <p className="wr-cause-body">{MD_ROOT_CAUSE.secondary.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ D · INSIDE THE WAR ROOM =========== */}
      {/* The one place the page describes the product, held to coordination
          posture, with a single labeled placeholder. No module mechanics. */}
      <section className="it-section is-dark" id="room">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">How it runs</span>
            <h2 className="it-h2">Inside the war room.</h2>
          </div>
          <div className="wr-posture">
            {POSTURE.map((p) => (
              <div className="wr-posture-card" key={p.n}>
                <span className="wr-posture-num">{p.n}</span>
                <h3 className="wr-posture-h">{p.h}</h3>
                <p className="wr-posture-b">{p.b}</p>
              </div>
            ))}
          </div>
          <div className="it-ph it-ph-wide" role="img" aria-label="Product screen placeholder">
            <span className="it-ph-label">
              <b>Product screen</b>
              <span>The response thread, one accountable place across every function.</span>
            </span>
          </div>
          <p style={{ marginTop: 28 }}>
            <Link href="/platform" className="wr-room-link">See how the platform coordinates work →</Link>
          </p>
        </div>
      </section>

      {/* ============================ E · THE RESPONSE SURFACE (MODULE) == */}
      <section className="it-section it-section-alt" id="response">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Where Unifize comes in · the response surface</span>
            <h2 className="it-h2">Every fire runs in one of nine domains. Each door opens its own page.</h2>
          </div>
          <ModuleIndex />
        </div>
      </section>

      {/* ============================ F · WHO RUNS THE ROOM (PERSONA) ==== */}
      <section className="it-section" id="commanders">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Who it is for</span>
            <h2 className="it-h2">Every war room has a commander. Find yours.</h2>
          </div>
          <PersonaExplorer />
        </div>
      </section>

      {/* ============================ G · WHAT IT COSTS (CONSEQUENCES) === */}
      {/* The five canonical consequence types, qualitative by design: NO dollar
          figure on any of them. The only number below the hero is the proof
          stat in H. Placed after ingress so it deepens conviction, not blocks. */}
      <section className="it-section it-section-alt it-short" id="cost">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Consequences</span>
            <h2 className="it-h2">What an improvised response costs.</h2>
          </div>
          <div className="wr-conseq">
            {MD_CONSEQUENCES.map((c) => (
              <div className="wr-conseq-card" key={c.type}>
                <h3 className="wr-conseq-type">{c.type}</h3>
                <ul className="wr-conseq-list">
                  {c.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ H · PROOF ========================== */}
      {/* The one validated number, physically and tonally quarantined from the
          board. The rule-line above is the explicit firewall between
          trigger-as-situation and proof-as-evidence. */}
      <section className="it-section" id="proof">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">{MD_PROOF.stat.attribution}</span>
            <h2 className="it-h2">The one result a customer has signed off on.</h2>
          </div>
          <p className="wr-proof-rule">
            Everything above is the problem space. Here is the one result a customer has signed off on.
          </p>
          <div className="wr-proof">
            <div className="wr-proof-fig">
              <span className="wr-proof-pretag">Lower coordination cost · year one</span>
              <span className="wr-proof-pct">{MD_PROOF.stat.pct}%</span>
              <span className="wr-proof-amt">${MD_PROOF.stat.recovered.toLocaleString("en-US")} recovered</span>
              <p className="wr-proof-ctx">
                against a signed <b>${MD_PROOF.stat.baseline.toLocaleString("en-US")}</b> baseline, in the
                first year, on {MD_PROOF.stat.metric}.
              </p>
              <span className="wr-proof-attr">{MD_PROOF.stat.attribution}</span>
            </div>
            <div className="wr-proof-side">
              <ul className="wr-proof-names">
                {MD_PROOF.customers.map((c) => (
                  <li key={c.name}><b>{c.name}</b><span>{c.desc}</span></li>
                ))}
              </ul>
              <div className="it-ph it-ph-wide" role="img" aria-label="Product dashboard placeholder">
                <span className="it-ph-label">
                  <b>Product screenshot</b>
                  <span>Coordination-cost dashboard, year-one recovery against baseline.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ I · WHY UNIFIZE =================== */}
      <section className="it-section" id="why">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The structural difference</span>
            <h2 className="it-h2">Incumbents track document status. Unifize reconstructs the decision.</h2>
          </div>
          <div className="wr-compete">
            <div className="wr-compete-col">
              <span className="wr-compete-lab">Tracks document status</span>
              <ul className="wr-compete-list">
                {MD_COMPETITORS.incumbents.map((c) => (
                  <li key={c.name}><b>{c.name}</b>{c.note}</li>
                ))}
              </ul>
            </div>
            <div className="wr-compete-col is-us">
              <span className="wr-compete-lab">Reconstructs the decision</span>
              <p className="wr-compete-us-body">
                Unifize reconstructs the cross-functional decision trace across the response, so the
                rationale and evidence at decision-time survive the audit.
              </p>
              <p className="wr-coexist">Coexists with your QMS, no rip-and-replace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ J · CLOSE ========================= */}
      <section className="it-section is-dark it-close" id="close">
        <div className="it-wrap">
          <div className="it-close-inner">
            <h2 className="it-close-h">When the next clock starts, run it here.</h2>
            <p className="it-close-sub">A 30-minute walkthrough: your standards, your triggers, your stack.</p>
            <button type="button" className="it-btn it-close-btn">Book a demo →</button>
          </div>
        </div>
      </section>

      <VariantFooter />
    </main>
  );
}
