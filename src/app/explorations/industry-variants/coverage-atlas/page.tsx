/* ============================================================================
 * 03 · THE COVERAGE ATLAS, breadth-first. The map is the page.
 * Inverts the narrative arc: the Domains x Modules map opens at full breadth,
 * because the scanning buyer's first question is "do they cover my problem
 * area, and where do I click?" All 9 of the 12 coordination domains render at
 * once as a static coverage grid (NOT the two-pane explorer, which hides 8
 * behind a click and undercuts the breadth claim). Tier is encoded by
 * elevation/weight: 4 Primary pillars on a faint raised plane, 5 Secondary
 * doors flat on the paper. For any function leader scanning for coverage.
 *
 * Spine: A atlas hero (dark) · B the atlas (light, the centrepiece) · C two
 *  ways in (PERSONA INGRESS) · D why now (triggers) · E the structural why
 *  · F what it costs · G proof · H why Unifize · I close (dark).
 * Shares the .it tokens (see _base.css); re-skinned to "precision survey map"
 * via the .v-atlas root class. All figures canonical; no invented numbers;
 * only Change Control is a live module page.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  MD_ECONOMICS,
  MD_CONSEQUENCES,
  MD_ROOT_CAUSE,
  MD_TRIGGERS,
  MD_PROOF,
  MD_COMPETITORS,
} from "@/lib/platform-data/medical-devices-canonical";
import { MD_DOMAIN_MAP } from "@/lib/platform-data/md-module-map";
import { PersonaExplorer } from "../../industry-template/persona-explorer";
import { VariantSwitcher, VariantHeader, TrustStrip, VariantFooter, usdM } from "../_shared";
import "../_base.css";
import "./atlas.css";

export const metadata: Metadata = {
  title: "The Coverage Atlas · Medical Devices · Unifize",
  description:
    "Every place the coordination tax lands in a device operation, and the door out of each one. Nine of the twelve coordination domains that run a Class II/III manufacturer, plotted on one map.",
};

const NAV = [
  { href: "#atlas", label: "The map" },
  { href: "#two-ways-in", label: "By role" },
  { href: "#proof", label: "Proof" },
];

/* The six lead standards, verbatim from MD_STANDARDS, the "one frame". */
const FRAME = ["21 CFR 820", "21 CFR Part 11", "ISO 13485", "ISO 14971", "EU MDR 2017/745", "21 CFR 803"];

/* Split the canonical 9 domains into the two tier bands the map plots.
 * Order is preserved from MD_DOMAIN_MAP (Primary pillars first). */
const PRIMARY = MD_DOMAIN_MAP.filter((d) => d.tier === "Primary");
const SECONDARY = MD_DOMAIN_MAP.filter((d) => d.tier === "Secondary");

export default function CoverageAtlasPage() {
  return (
    <main className="it v-atlas">
      <VariantSwitcher current="coverage-atlas" />
      <VariantHeader nav={NAV} />

      {/* ============================ A · ATLAS HERO ===================== */}
      {/* Short, ~1/3 viewport. Not a separate illustrated band, but the legend
          and on-ramp for the map directly beneath it. */}
      <section className="it-hero">
        <div className="it-wrap">
          <div className="it-hero-copy">
            <span className="at-hero-eyebrow">
              <span className="it-dot" aria-hidden="true" />
              Medical Devices · Coverage Atlas
            </span>
            <h1 className="at-hero-title">
              Every place the coordination tax lands in a device operation, and the door out of each one.
            </h1>
            <p className="at-hero-sub">
              <b>Nine of the twelve coordination domains</b> that run a Class II/III manufacturer.
            </p>
            <p className="at-hero-coexist">
              Audited against your standards. Coexists with your QMS, ERP and PLM. No rip-and-replace.
            </p>

            {/* the one frame */}
            <ul className="at-frame" aria-label="Regulatory frame">
              {FRAME.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            {/* the one number, set small as a caption to the breadth claim */}
            <p className="at-hero-econ">
              Segment coordination tax <b>{usdM(MD_ECONOMICS.annualTaxLow)} to {usdM(MD_ECONOMICS.annualTaxHigh)} / yr</b>{" "}
              across {MD_ECONOMICS.companies} companies, {(MD_ECONOMICS.employees / 1_000_000).toFixed(3)}M employees.
            </p>

            {/* the dual on-ramp: the page's two doors */}
            <div className="at-onramp">
              <a href="#atlas"><span aria-hidden="true">↓</span> Find your area on the map</a>
              <a href="#two-ways-in"><span aria-hidden="true">→</span> Or enter by your role</a>
            </div>

            <div className="it-ctas">
              <button type="button" className="it-btn">Book a demo</button>
              <Link href="/platform" className="it-btn it-btn-ghost">See the platform</Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ============================ B · THE ATLAS (centrepiece) ======== */}
      <section className="it-section" id="atlas">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The coverage atlas · Domains × Modules</span>
            <h2 className="it-h2">The whole territory, on one map.</h2>
            <p className="at-atlas-note">
              Nine of twelve coordination domains. The three not shown are not where the device coordination
              tax concentrates. Each region carries its owner, its module count, and a one-line promise; each
              door inside is a route into the platform.
            </p>
          </div>

          {/* PRIMARY PILLARS: raised plane, larger regions, plotted first */}
          <div className="at-tierlab">Primary pillars</div>
          <div className="at-grid at-grid-primary">
            {PRIMARY.map((d) => (
              <Region key={d.slug} domain={d} tier="primary" />
            ))}
          </div>

          {/* ADJACENT DOORS: flat on the paper, denser, still on-screen */}
          <div className="at-tierlab">Adjacent doors (secondary)</div>
          <div className="at-grid at-grid-secondary">
            {SECONDARY.map((d) => (
              <Region key={d.slug} domain={d} tier="secondary" />
            ))}
          </div>

          <p className="at-atlas-foot">
            <b>Nine of twelve coordination domains.</b> The three not shown are not where the device
            coordination tax concentrates. Only Change Control has a live page today; every other door points
            at the module page that ships next.
          </p>
        </div>
      </section>

      {/* ============================ C · TWO WAYS IN (PERSONA INGRESS) == */}
      <section className="it-section it-section-alt" id="two-ways-in">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Two ways in</span>
            <h2 className="it-h2">The map shows what is broken. These show who owns it.</h2>
          </div>
          <PersonaExplorer />
          <p className="at-also">
            <b>Also serves:</b> Engineering-change governance · Supplier-quality governance · Innovation / NPI execution.
          </p>
        </div>
      </section>

      {/* ============================ D · WHY NOW (triggers) ============= */}
      <section className="it-section">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Why now</span>
            <h2 className="it-h2">The events that light up regions of the map.</h2>
          </div>
          <div className="at-trigs">
            {MD_TRIGGERS.map((t) => (
              <span className="at-trig" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ E · THE STRUCTURAL WHY ============= */}
      <section className="it-section it-section-alt it-short">
        <div className="it-wrap">
          <div className="at-why">
            <p>
              <b>{MD_ROOT_CAUSE.primary.name}.</b> The system of record is separate from the system of
              coordination, so every domain on the map runs cross-functional work on email, meetings and
              spreadsheets. The records that result capture what was decided, not the reasoning and evidence at
              the time, the <em>missing decision trace</em> that turns an audit into an archaeology dig.
            </p>
          </div>
        </div>
      </section>

      {/* ============================ F · WHAT IT COSTS (no $) =========== */}
      <section className="it-section">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">What it costs · qualitative by design</span>
            <h2 className="it-h2">What the leak costs in every region of the map.</h2>
          </div>
          <div className="at-cost">
            {MD_CONSEQUENCES.map((c) => (
              <div className="at-cost-tile" key={c.type}>
                <h3 className="at-cost-name">{c.type}</h3>
                <ul className="at-cost-list">
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ G · PROOF ========================== */}
      <section className="it-section it-section-alt" id="proof">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Proof · customer-attested</span>
            <h2 className="it-h2">One audited recovery, on the segment's largest leak.</h2>
          </div>
          <div className="at-proof">
            <div className="at-proof-fig">
              <span className="at-proof-pretag">{MD_PROOF.stat.attribution}</span>
              <span className="at-proof-pct at-mono">
                {MD_PROOF.stat.pct}%<small> recovered</small>
              </span>
              <p className="at-proof-ctx">
                A medical-device manufacturer recovered <b>${MD_PROOF.stat.recovered.toLocaleString("en-US")} a year</b>,
                about {MD_PROOF.stat.pct}%, against a signed <b>${MD_PROOF.stat.baseline.toLocaleString("en-US")}</b>{" "}
                baseline, in the first year, on {MD_PROOF.stat.metric}.
              </p>
              <span className="at-proof-attr">Customer-attested. Anonymized at the customer's request.</span>
            </div>
            <div className="at-proof-side">
              <div className="it-ph it-ph-wide" role="img" aria-label="Product dashboard placeholder">
                <span className="it-ph-label">
                  <b>Product screenshot</b>
                  <span>Coverage dashboard, year-one recovery against baseline</span>
                </span>
              </div>
              <ul className="at-proof-names">
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

      {/* ============================ H · WHY UNIFIZE ==================== */}
      <section className="it-section it-short">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Why Unifize</span>
            <h2 className="it-h2">Coverage of the map is only half the story.</h2>
          </div>
          <div className="at-diff">
            <p>
              Incumbents track document status. <em>Unifize reconstructs the decision trace across functions.</em>
            </p>
          </div>
          <div className="at-incumbents" aria-label="Incumbents in frame">
            {MD_COMPETITORS.incumbents.map((c) => (
              <span className="at-incumbent" key={c.name}>{c.name}</span>
            ))}
          </div>
          <p className="at-coexist">
            <b>Coexists with your QMS, ERP, PLM.</b> Sits on top of the systems you already validated, no rip-and-replace.
          </p>
        </div>
      </section>

      {/* ============================ I · CLOSE (dark) =================== */}
      <section className="it-section is-dark it-close">
        <div className="it-wrap">
          <div className="it-close-inner">
            <h2 className="it-close-h">You have seen the whole territory.</h2>
            <p className="it-close-sub">
              Book 30 minutes and we will walk your standards, your workflows, your systems.
            </p>
            <button type="button" className="it-btn it-close-btn">Book a demo →</button>
            <a href="#atlas" className="at-backmap"><span aria-hidden="true">↑</span> Back to the map</a>
          </div>
        </div>
      </section>

      <VariantFooter />
    </main>
  );
}

/* ----------------------------------------------------------------------------
 * A single domain region on the atlas. Tier drives elevation/weight, not hue:
 * Primary pillars sit on a faint raised plane; Secondary doors sit flat on the
 * paper. Each module door routes out. Only the one with an `href` (Change
 * Control) renders a live "Open the page →"; the rest render an honest,
 * non-live "Module page →" affordance, never a dead link styled live.
 * -------------------------------------------------------------------------- */
function Region({
  domain,
  tier,
}: {
  domain: (typeof MD_DOMAIN_MAP)[number];
  tier: "primary" | "secondary";
}) {
  return (
    <div className={"at-region is-" + tier}>
      <div className="at-region-head">
        <div className="at-region-top">
          <h3 className="at-region-name">{domain.name}</h3>
          <span className="at-region-count at-mono">{domain.modules.length}</span>
        </div>
        <span className="at-region-owner">{domain.owner}</span>
        <p className="at-region-promise">{domain.promise}</p>
      </div>
      <div className="at-mods">
        {domain.modules.map((m) => (
          <div className="at-mod" key={m.name}>
            <h4 className="at-mod-name">{m.name}</h4>
            <p className="at-mod-blurb">{m.blurb}</p>
            {m.standards && m.standards.length > 0 && (
              <div className="at-mod-std">
                {m.standards.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            )}
            {m.href ? (
              <Link href={m.href} className="at-mod-go">
                <span className="at-live-dot" aria-hidden="true" />Open the page →
              </Link>
            ) : (
              <span className="at-mod-go">Module page →</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
