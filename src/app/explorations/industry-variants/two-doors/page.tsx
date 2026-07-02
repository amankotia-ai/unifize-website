/* ============================================================================
 * 06 · THE TWO DOORS, ingress-first.
 * The page is organized BY its two entry paths. The two doors, "enter by your
 * role" (persona ingress) and "enter by what is breaking" (problem-domain to
 * module), are the centerpiece, not a buried section. The rest of the page is
 * the threshold that earns the choice.
 *
 * The doors appear twice, deliberately: the chooser (C), then the expansions
 * (D persona ingress / E module ingress). The cross-router trigger band (F)
 * is the one place both doors visibly converge.
 *
 * Spine: A hero + two-door promise · B the threshold · C the two doors (chooser)
 *  · D Door A expanded (PERSONA INGRESS) · E Door B expanded (MODULE INGRESS)
 *  · F why-now triggers (cross-router) · G the structural why · H proof
 *  · I why Unifize · J close.
 * Shares the .it tokens (see _base.css); re-skinned to "threshold + doorway"
 * via the .v-doors root class. All figures canonical; no invented numbers.
 * ========================================================================== */
import type { Metadata } from "next";
import {
  MD_ECONOMICS,
  MD_ROOT_CAUSE,
  MD_PROOF,
  MD_COMPETITORS,
} from "@/lib/platform-data/medical-devices-canonical";
import { MD_DOMAIN_MAP } from "@/lib/platform-data/md-module-map";
import { ModuleIndex } from "../../industry-template/module-index";
import { PersonaExplorer } from "../../industry-template/persona-explorer";
import { TRIGGERS } from "../../industry-template/industry-data";
import { VariantSwitcher, VariantHeader, TrustStrip, VariantFooter, usdM } from "../_shared";
import "../_base.css";
import "./two-doors.css";

/* Counts are computed, not typed, so the hero/chooser stay honest if the map
 * changes. domains = number of featured domains; modules = sum across them. */
const DOMAIN_COUNT = MD_DOMAIN_MAP.length;
const MODULE_COUNT = MD_DOMAIN_MAP.reduce((n, d) => n + d.modules.length, 0);

export const metadata: Metadata = {
  title: "The Two Doors · Medical Devices · Unifize",
  description:
    "Two ways in, one operating truth for medical devices. Enter by your role, or enter by what is breaking. Unifize routes you to the persona or the module that owns it.",
};

const NAV = [
  { href: "#by-role", label: "By role" },
  { href: "#by-problem", label: "By problem" },
  { href: "#why-now", label: "Why now" },
  { href: "#proof", label: "Proof" },
];

/* The lead 6 of the 19 framed standards, as a quiet regulatory frame. These are
 * frame-only chips (no destination), establishing device fluency before the
 * choice. Kept as a local list to keep the hero an altitude-correct preview. */
const REG_FRAME = ["21 CFR 820", "21 CFR Part 11", "ISO 13485", "ISO 14971", "EU MDR", "21 CFR 803"];

/* Door A / Door B teaser chips: previews of the ingress targets, not links.
 * The whole panel is the click target. */
const DOOR_A_CHIPS = ["VP Quality", "COO / VP Ops", "Head of RA", "Validation Lead", "R&D"];
const DOOR_B_CHIPS = ["CAPA", "Change Control", "Production Hold", "Recall", "Supplier", "DHF"];

export default function TwoDoorsPage() {
  return (
    <main className="it v-doors">
      <VariantSwitcher current="two-doors" />
      <VariantHeader nav={NAV} />

      {/* ============================ A · HERO + TWO-DOOR PROMISE ========= */}
      <section className="it-hero">
        <div className="it-wrap">
          <div className="td-hero-inner">
            <div className="td-eyebrow">
              <span className="it-dot" aria-hidden="true" />
              Medical Devices
            </div>
            <h1 className="td-h1">Two ways in. One operating truth for medical devices.</h1>
            <p className="td-hero-sub">
              Whether you own the audit outcome or you own the schedule, the coordination tax lands
              on you. Enter by your <b>role</b>, or enter by what is <b>breaking</b>.
            </p>
            <div className="td-hero-number">
              <span className="td-num">{DOMAIN_COUNT} of the 12 domains</span>
              <span className="td-num-cap">covered, where coordination tax accumulates.</span>
            </div>
            <ul className="td-regframe" aria-label="Regulatory frame">
              {REG_FRAME.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <a href="#the-doors" className="td-scrollcue">choose your way in ↓</a>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ============================ B · THE THRESHOLD ================== */}
      <section className="it-section it-short" id="threshold">
        <div className="it-wrap">
          <div className="td-threshold">
            <p className="td-stakes">
              Long cycle times, audit findings that age, recall scope that expands, cash trapped in
              quarantine: every one of these is <b>coordination failing across functions</b>, not a
              single team failing.
            </p>
            <div className="td-scale">
              <span className="td-scale-lab">The size of the problem the two doors lead into</span>
              <span className="td-scale-val">
                {usdM(MD_ECONOMICS.annualTaxLow)}<span className="td-to">to</span>{usdM(MD_ECONOMICS.annualTaxHigh)}
              </span>
              <span className="td-scale-meta">a year in estimated coordination tax across the segment.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ C · THE TWO DOORS (chooser) ======== */}
      <section className="it-section" id="the-doors">
        <div className="it-wrap">
          <div className="it-head-block it-center">
            <span className="it-eyebrow">Choose your way in</span>
            <h2 className="it-h2">Two doors. The same operating truth on the other side.</h2>
          </div>

          <div className="td-doors">
            {/* Door A, by your role (warm clay). Mirrors Door B exactly. */}
            <a
              href="#by-role"
              className="td-door is-a"
              aria-label="Enter by your role: see the five buyer roles and the decisions that land on each desk"
            >
              <span className="td-door-arch" aria-hidden="true" />
              <span className="td-door-tag">By your role</span>
              <h3 className="td-door-label">I own the outcome.</h3>
              <p className="td-door-sub">
                Find your seat. We will show you the decisions that land on your desk and where they
                are slipping.
              </p>
              <ul className="td-door-chips">
                {DOOR_A_CHIPS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <span className="td-door-foot">5 roles →</span>
            </a>

            <div className="td-seam" aria-hidden="true" />

            {/* Door B, by what is breaking (cool slate). Mirrors Door A exactly. */}
            <a
              href="#by-problem"
              className="td-door is-b"
              aria-label={`Enter by what is breaking: route to one of ${DOMAIN_COUNT} domains and ${MODULE_COUNT} modules`}
            >
              <span className="td-door-arch" aria-hidden="true" />
              <span className="td-door-tag">By what is breaking</span>
              <h3 className="td-door-label">Something is breaking.</h3>
              <p className="td-door-sub">
                Start from the failure. We will route you to the domain, and the module, that governs
                it.
              </p>
              <ul className="td-door-chips">
                {DOOR_B_CHIPS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <span className="td-door-foot">{DOMAIN_COUNT} domains · {MODULE_COUNT} modules →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================ D · DOOR A EXPANDED (PERSONA) ====== */}
      <section className="it-section it-section-alt" id="by-role">
        <div className="it-wrap">
          <div className="it-head-block">
            <div className="td-expand-head">
              <span className="td-expand-marker is-a" aria-hidden="true" />
              <span className="td-expand-tag">Door A · persona ingress</span>
            </div>
            <h2 className="it-h2">By your role. Find your seat.</h2>
            <p className="it-lede">
              Each role owns a slice of the trace. Pick the seat that is yours, and see the decisions
              that land on your desk.
            </p>
          </div>
          <PersonaExplorer />
        </div>
      </section>

      {/* ============================ E · DOOR B EXPANDED (MODULE) ======= */}
      <section className="it-section" id="by-problem">
        <div className="it-wrap">
          <div className="it-head-block">
            <div className="td-expand-head">
              <span className="td-expand-marker is-b" aria-hidden="true" />
              <span className="td-expand-tag">Door B · module ingress</span>
            </div>
            <h2 className="it-h2">By what is breaking. Where Unifize comes in.</h2>
            <p className="it-lede">
              Every account is a domain. Every line is a module, a door into the platform. Start from
              the failure and we route you to the one that governs it.
            </p>
          </div>
          <ModuleIndex />
        </div>
      </section>

      {/* ============================ F · WHY-NOW TRIGGERS (cross-router) = */}
      <section className="it-section it-section-alt it-short" id="why-now">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Why now</span>
            <h2 className="it-h2">The moments that send you through a door.</h2>
            <p className="it-lede">
              Each one routes to both a module that governs it and the role that owns the response.
              This is the one place the two doors visibly converge.
            </p>
          </div>

          <div className="td-trigs">
            {TRIGGERS.map((t) => {
              const live = Boolean(t.href);
              const inner = (
                <>
                  <span className="td-trig-clock">
                    <span
                      className={"td-trig-tick" + (t.severity === "Urgent" ? " is-urgent" : "")}
                      aria-hidden="true"
                    />
                    {t.clock}
                  </span>
                  <p className="td-trig-name">{t.name}</p>
                  <div className="td-trig-route">
                    <span className="td-trig-mod">
                      {live ? <span className="td-live-dot" aria-hidden="true" /> : null}
                      {t.routesTo}
                    </span>
                    <span className="td-trig-owner">Owner: {t.owner}</span>
                  </div>
                </>
              );
              return live ? (
                <a key={t.name} href={t.href} className="td-trig is-live">{inner}</a>
              ) : (
                <div key={t.name} className="td-trig">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ G · THE STRUCTURAL WHY ============= */}
      <section className="it-section it-short" id="why">
        <div className="it-wrap">
          <div className="td-why">
            <p className="td-why-lead">Two doors, one cause.</p>
            <div className="td-why-cause">
              <div className="td-why-row">
                <span className="td-why-num">01</span>
                <div>
                  <span className="td-why-name">{MD_ROOT_CAUSE.primary.name}.</span>
                  <p className="td-why-body">{MD_ROOT_CAUSE.primary.body}</p>
                </div>
              </div>
              <div className="td-why-row">
                <span className="td-why-num">02</span>
                <div>
                  <span className="td-why-name">{MD_ROOT_CAUSE.secondary.name}.</span>
                  <p className="td-why-body">{MD_ROOT_CAUSE.secondary.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ H · PROOF ========================== */}
      <section className="it-section it-section-alt" id="proof">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Reconciled · customer-attested</span>
            <h2 className="it-h2">The one number on this page that has been signed off.</h2>
          </div>

          <div className="td-proof">
            <div className="td-proof-fig">
              <span className="td-proof-pretag">{MD_PROOF.stat.attribution}</span>
              <span className="td-proof-amt">
                ${MD_PROOF.stat.recovered.toLocaleString("en-US")}
                <span className="td-proof-pct"> / yr · ≈{MD_PROOF.stat.pct}%</span>
              </span>
              <p className="td-proof-ctx">
                recovered against a signed <b>${MD_PROOF.stat.baseline.toLocaleString("en-US")}</b>{" "}
                baseline, in year one, on {MD_PROOF.stat.metric}.
              </p>
              <span className="td-proof-attr">
                Whichever door you came in, this is what is on the other side.
              </span>
            </div>

            <div className="td-proof-side">
              <div className="it-ph it-ph-wide" role="img" aria-label="Product screen placeholder">
                <span className="it-ph-label">
                  <b>Product screen</b>
                  <span>Coordination-cost dashboard, year-one recovery against baseline. Coming with the packaged prototype.</span>
                </span>
              </div>
              <ul className="td-proof-names">
                {MD_PROOF.customers.map((c) => (
                  <li key={c.name}>
                    <b>{c.name}</b>
                    <span>{c.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ I · WHY UNIFIZE ==================== */}
      <section className="it-section it-short" id="why-unifize">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The structural difference</span>
            <h2 className="it-h2">Both doors end where incumbents cannot reach.</h2>
          </div>

          <div className="td-compete">
            <div className="td-compete-col">
              <span className="td-compete-lab">Tracks document status</span>
              <ul className="td-compete-list">
                {MD_COMPETITORS.incumbents.map((c) => (
                  <li key={c.name}>
                    <b>{c.name}</b>
                    {c.note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="td-compete-col is-us">
              <span className="td-compete-lab">Reconstructs the decision</span>
              <p className="td-compete-us-body">{MD_COMPETITORS.differentiator}</p>
              <p className="td-coexist">
                Coexists with the QMS, PLM, and MES you already validated. No rip-and-replace, no
                revalidation of what works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ J · CLOSE ========================== */}
      <section className="it-section is-dark it-close" id="close">
        <div className="it-wrap">
          <div className="it-close-inner">
            <h2 className="it-close-h">Still deciding which door?</h2>
            <p className="it-close-sub">
              Book a 30-minute walkthrough and we will start from whichever one is on fire.
            </p>
            <button type="button" className="it-btn it-close-btn">Book a walkthrough →</button>
            <p className="td-close-alt"><a href="#the-doors">or pick a door above</a></p>
          </div>
        </div>
      </section>

      <VariantFooter />
    </main>
  );
}
