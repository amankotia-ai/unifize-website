/* ============================================================================
 * 04 · THE MIRROR. Recognition-first.
 * The page inverts the usual order: it opens not with a claim but with the
 * buyer's own sentence, verbatim. Symptom, symptom, symptom, then "here's the
 * name for that", then "here's what it's costing", then "here's the door."
 * Recognition is the on-ramp; the two ingress systems land on a reader who is
 * already leaning in.
 *
 * Spine: A mirror hero · B the verbatim wall · C the turn (name the cause)
 *  · D what it's costing · E why now · F the two doors (the fork) · G by your
 *  problem (MODULE INGRESS) · H by your role (PERSONA INGRESS) · I proof · J why
 *  Unifize · K close.
 * Shares the .it tokens (see _base.css); re-skinned to a lab-notebook register
 * via the .v-mirror root class: a serif/sans split (their voice vs our system),
 * a notebook left-rule, two dark bands as the only tonal hinges, and one
 * clinical-teal accent reserved for ingress. All figures canonical.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  MD_ROOT_CAUSE,
  MD_CONSEQUENCES,
  MD_TRIGGERS,
  MD_STANDARDS,
  MD_PROOF,
  MD_COMPETITORS,
} from "@/lib/platform-data/medical-devices-canonical";
import { ModuleIndex } from "../../industry-template/module-index";
import { PersonaExplorer } from "../../industry-template/persona-explorer";
import { VariantSwitcher, VariantHeader, TrustStrip, VariantFooter } from "../_shared";
import "../_base.css";
import "./mirror.css";

export const metadata: Metadata = {
  title: "The Mirror · Medical Devices · Unifize",
  description:
    "We spend more time coordinating the work than doing the work. That sentence shows up in every device quality team we talk to. It has a name, and two doors out.",
};

const NAV = [
  { href: "#doors", label: "Two ways in" },
  { href: "#problem", label: "By problem" },
  { href: "#role", label: "By role" },
  { href: "#proof", label: "Proof" },
];

/* The six canonical buyer-voice symptoms (the verbatim wall). The sixth echoes
 * the hero, bookending the recognition. From the MD Symptoms inventory. */
const SYMPTOMS: string[] = [
  "When auditors ask for the full record we spend days pulling it together.",
  "We can't reconstruct what we knew and who decided what at the time.",
  "Changes get made but half the people are still on the old version.",
  "Everything sits in someone's queue for days before it moves.",
  "We can't tell if a CAPA actually fixed it or just the symptom.",
  "We spend more time coordinating the work than doing the work.",
];

/* The five canonical consequence groups, rendered as named columns, words only.
 * No dollar figure appears anywhere here, by design. */

export default function TheMirrorPage() {
  return (
    <main className="it v-mirror">
      <VariantSwitcher current="the-mirror" />
      <VariantHeader nav={NAV} />

      {/* ============================ A · THE MIRROR HERO ================= */}
      {/* LIGHT, no image. The restraint is the credibility signal. */}
      <section className="mir-hero">
        <div className="it-wrap">
          <div className="mir-crumb">
            <span className="it-dot" aria-hidden="true" />
            <Link href="/platform#industries">Industries</Link>
            <span className="sep">/</span>
            <span>Medical devices</span>
          </div>

          <h1 className="mir-lead">
            <span className="mir-hung" aria-hidden="true">&ldquo;</span>
            We spend more time coordinating the work than doing the work.&rdquo;
          </h1>

          <p className="mir-hero-sub">
            That sentence shows up in every device quality team we talk to: VP Quality, Plant
            Manager, Head of RA. It is not a discipline problem and it is not your QMS failing. It is
            one structural gap, and it has a name. Read the six lines below. If three of them are your
            week, you are in the right place.
          </p>

          <ul className="mir-frame">
            {MD_STANDARDS.slice(0, 5).map((s) => (
              <li key={s.id}>{s.id}</li>
            ))}
          </ul>

          <div className="it-ctas">
            <a href="#doors" className="it-btn">Find your way in ↓</a>
            <a href="#demo" className="it-btn it-btn-ghost">Book a demo</a>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ============================ B · THE VERBATIM WALL ============== */}
      {/* white. Six hung-quote serif tiles, a list of things people said. */}
      <section className="it-section it-tall">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">In your words</span>
            <h2 className="it-h2">If you have said one of these, read on.</h2>
          </div>
          <ul className="mir-wall">
            {SYMPTOMS.map((s) => (
              <li className="mir-tile" key={s}>
                <p className="mir-quote">
                  <span className="mir-hung" aria-hidden="true">&ldquo;</span>
                  {s}&rdquo;
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ C · THE TURN ====================== */}
      {/* DARK, the first tonal hinge. Everything before = their world. */}
      <section className="it-section is-dark">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">What you just felt has a name</span>
          </div>
          <h2 className="mir-turn-name">{MD_ROOT_CAUSE.primary.name}.</h2>
          <p className="mir-turn-body">{MD_ROOT_CAUSE.primary.body}</p>
          <p className="mir-turn-coda">
            The QMS holds what is officially true. The work that produces it lives in a second system
            your QMS never sees. That gap is the tax.
          </p>
        </div>
      </section>

      {/* ============================ D · WHAT IT'S COSTING ============= */}
      {/* white. Named consequence columns, words only, zero dollars. */}
      <section className="it-section it-tall">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Left alone, the gap compounds</span>
            <h2 className="it-h2">What it is costing you.</h2>
          </div>
          <div className="mir-cost">
            {MD_CONSEQUENCES.map((c) => (
              <div className="mir-cost-col" key={c.type}>
                <h3 className="mir-cost-name">{c.type}</h3>
                <ul className="mir-cost-items">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mir-cost-fine">
            Costs stated as consequences, not estimates. Your number is yours to run.
          </p>
        </div>
      </section>

      {/* ============================ E · WHY NOW ====================== */}
      {/* alt, a persona-ingress warmup. Trigger chips, names only. */}
      <section className="it-section it-section-alt it-short">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The week teams reach for a better way</span>
            <h2 className="it-h2">Why now.</h2>
          </div>
          <div className="mir-trigs">
            {MD_TRIGGERS.map((t) => (
              <span className="mir-trig" key={t}>
                <span className="mir-trig-dot" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <p className="mir-bridge">
            Recognize the week you are in? These land on a person. <a href="#role">Meet them below.</a>
          </p>
        </div>
      </section>

      {/* ============================ F · THE TWO DOORS ================= */}
      {/* DARK, full-bleed, the fork: the spine. The accent's home. */}
      <section className="it-section is-dark" id="doors">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">You have seen yourself. Now pick a door.</span>
            <h2 className="it-h2">Two ways in. Same platform underneath.</h2>
          </div>
          <div className="mir-doors">
            <div className="mir-door">
              <span className="mir-door-lab">Door 1 · By your problem</span>
              <p className="mir-door-line">&ldquo;I know what is broken.&rdquo;</p>
              <p className="mir-door-tease">
                Nine coordination domains, each a door into the module that owns it.
              </p>
              <a href="#problem" className="mir-door-go">Open the map ↓</a>
            </div>
            <div className="mir-door">
              <span className="mir-door-lab">Door 2 · By your role</span>
              <p className="mir-door-line">&ldquo;I know who I am.&rdquo;</p>
              <p className="mir-door-tease">
                The people who own the work: Quality, Operations, Regulatory Affairs.
              </p>
              <a href="#role" className="mir-door-go">Find your role ↓</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ G · BY YOUR PROBLEM (MODULE) ====== */}
      {/* alt. MODULE INGRESS: the reused domain explorer. Name + tease only. */}
      <section className="it-section it-section-alt" id="problem">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Where Unifize comes in</span>
            <h2 className="it-h2">Nine domains. Every door is a module.</h2>
          </div>
          <ModuleIndex />
        </div>
      </section>

      {/* ============================ H · BY YOUR ROLE (PERSONA) ======== */}
      {/* white. PERSONA INGRESS: the reused role explorer. */}
      <section className="it-section" id="role">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Who it is for</span>
            <h2 className="it-h2">The people who own the work.</h2>
          </div>
          <PersonaExplorer />
        </div>
      </section>

      {/* ============================ I · PROOF ======================== */}
      {/* alt. Recognition closing the loop into social proof. */}
      <section className="it-section it-section-alt" id="proof">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">Proof</span>
            <h2 className="it-h2">A device company in your regulatory class did this.</h2>
          </div>
          <div className="mir-proof">
            <div className="mir-proof-fig">
              <span className="mir-proof-pretag">{MD_PROOF.stat.attribution}</span>
              <span className="mir-proof-pct">{MD_PROOF.stat.pct}%</span>
              <p className="mir-proof-ctx">
                lower {MD_PROOF.stat.metric}. <b>${MD_PROOF.stat.recovered.toLocaleString("en-US")}</b>{" "}
                recovered in year one against a signed{" "}
                <b>${MD_PROOF.stat.baseline.toLocaleString("en-US")}</b> baseline.
              </p>
              <span className="mir-proof-attr">The cost you could not see (above), made visible and recoverable.</span>
            </div>
            <div className="mir-proof-side">
              <div className="it-ph it-ph-wide" role="img" aria-label="Product dashboard placeholder">
                <span className="it-ph-label">
                  <b>Product screenshot</b>
                  <span>Coordination-cost dashboard, year-one recovery against baseline</span>
                </span>
              </div>
              <ul className="mir-proof-names">
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

      {/* ============================ J · WHY UNIFIZE ================== */}
      {/* white. Incumbents track documents; Unifize reconstructs the decision. */}
      <section className="it-section it-short">
        <div className="it-wrap">
          <div className="it-head-block">
            <span className="it-eyebrow">The structural difference</span>
            <h2 className="it-h2">Incumbents track documents. Unifize reconstructs the decision.</h2>
          </div>
          <div className="mir-compete">
            <div className="mir-compete-col">
              <span className="mir-compete-lab">Tracks document status</span>
              <ul className="mir-compete-list">
                {MD_COMPETITORS.incumbents.map((c) => (
                  <li key={c.name}>
                    <b>{c.name}</b>
                    {c.note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mir-compete-col is-us">
              <span className="mir-compete-lab">Reconstructs the decision</span>
              <p className="mir-compete-us-body">{MD_COMPETITORS.differentiator}</p>
              <p className="mir-compete-coexist">Coexists with your QMS, no rip-and-replace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ K · CLOSE ======================== */}
      {/* DARK, the third ink band, the close. */}
      <section className="it-section is-dark it-close" id="demo">
        <div className="it-wrap">
          <div className="it-close-inner">
            <h2 className="it-close-h">See Unifize wired for your stack.</h2>
            <p className="it-close-sub">
              A 30-minute walkthrough: your standards, your workflows, your systems.
            </p>
            <div className="it-ctas">
              <button type="button" className="it-btn it-close-btn">Book a demo →</button>
              <Link href="/platform" className="it-btn it-btn-ghost">See the platform</Link>
            </div>
          </div>
        </div>
      </section>

      <VariantFooter />
    </main>
  );
}
