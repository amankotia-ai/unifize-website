/* ============================================================================
 * DMS - Document Management System. PRODUCT page.
 * Design language borrowed from the industry-template-modern exploration
 * (Geist display, Inter body, Unifize blue, dark hero/close, dashed dividers,
 * restrained reveal motion). Editorial system: numbered chapters, hairline
 * ledgers and registers instead of card grids, mono indices, big display type.
 * Product visuals are explicit placeholders (DmsPlaceholder) awaiting real
 * screenshots. Content is sourced from the Unifize Products database (Notion):
 * DMS (UPD-2).
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import {
  PRODUCT,
  DMS_PROBLEMS,
  INTEGRATIONS,
  CAPABILITIES,
  AUDIENCE,
  STANDARDS,
} from "./dms-data";
import { DmsHeader } from "./dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { NAV } from "../../_shared/nav-data";
import { CoordinationTax } from "./dms-coordination";
import { IntegrationLayer } from "./dms-integrations";
import { Eyebrow, ShellFrame } from "./dms-primitives";
import { CapGlyph } from "./dms-linework";
import { MockDocRegister } from "./dms-mocks";
import { DmsProblemSpotlight } from "./dms-problem-visuals";
import { DmsHeroVideo } from "./dms-hero-video";
import { DmsIndustryIcon } from "./dms-industry-icons";
import { DmsProofFilms } from "./dms-proof";
import {
  ModuleExplorer,
  LifecycleExplorer,
  FaqAccordion,
} from "./dms-interactive";
import "../../industry-template-modern/itm.css";
import "./dms.css";
import "./dms-redesign.css";

export const metadata: Metadata = {
  title: "Document Management System · Unifize",
  description:
    "DMS bundles Document Control, Change Control, and Training into one governed record. Controlled documents from draft to obsolete, with 21 CFR Part 11 e-signature where required.",
};

const DMS_TRUST_INDUSTRY_NAMES = new Set([
  "Medical Devices",
  "Pharmaceuticals",
  "Laboratories",
  "Cosmetics",
  "Food Processing",
  "Aerospace",
]);

const DMS_TRUST_INDUSTRIES =
  NAV.find((item) => item.label === "Industries")?.cols
    ?.flatMap((column) => column.items.map((item) => item.label))
    .filter((label) => DMS_TRUST_INDUSTRY_NAMES.has(label)) ?? [];

export default function DmsProductPage() {
  return (
    <main className="dms dms--redesign">
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label="Document Management System">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/explorations/platform">
                <span className="dms-hero__product-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path className="dms-hero__product-sheet" d="M7 3.75h7.4L18 7.35v12.9H7V3.75Z" />
                    <path className="dms-hero__product-detail" d="M14 3.75v4h4M9.75 12h5.5M9.75 15.5h5.5" />
                  </svg>
                </span>
                <span>Document Management System</span>
              </Link>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">One current version.</span>
                <span className="dms-hero__line dms-hero__turn">Everywhere you look.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{PRODUCT.description}</p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn">Book a demo &rarr;</button>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  Take Coordination Tax Assessment
                </Link>
              </div>
            </div>
          </div>

          <div className="dms-hero__frame dms-hero__product-demo">
            <div className="dms-hero__stage">
              <DmsHeroVideo>
                <ShellFrame url="app.unifize.com / documents">
                  <MockDocRegister />
                </ShellFrame>
              </DmsHeroVideo>
            </div>
          </div>

        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="dms-section dms-trust" aria-label="Industries served">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">One controlled record across regulated operations</p>
          <ul className="dms-trust__logos" aria-label="Representative industries">
            {DMS_TRUST_INDUSTRIES.map((industry) => (
              <li key={industry} className="dms-trust__mark">
                <DmsIndustryIcon industry={industry} />
                <span>{industry}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ THE PROBLEM ======================= */}
      <section className="dms-section dms-problems" id="problem" aria-labelledby="dms-problems-title">
        <div className="dms-wrap dms-problems__inner">
          <header className="dms-problems__intro">
            <div className="dms-problems__head">
              <Eyebrow>The problem</Eyebrow>
              <h2 className="dms-h2" id="dms-problems-title">
                You have the document. Nobody can find it when it matters.
              </h2>
            </div>
            <p className="dms-lede">
              Quality teams spend up to a third of their week hunting for controlled documents across shared drives,
              QMS folders, and email threads.
            </p>
          </header>

          {/* Spotlight: index rail left, one symptom on stage at a time. */}
          <DmsProblemSpotlight items={DMS_PROBLEMS} />

          <div className="dms-problems__bridge">
            <p><strong>Four symptoms, one root cause.</strong> The work isn’t the bottleneck; the coordination around it is.</p>
          </div>
        </div>
      </section>

      {/* ==================== THE COORDINATION TAX =====================
       * The four daily symptoms roll up into one measurable root cause. */}
      <CoordinationTax variant="revision" problems={DMS_PROBLEMS} />

      {/* ============================ 02 · MODULES BUNDLED ===============
       * The Unifize product story begins after the problem is fully framed. */}
      <section className="dms-section dms-section--dark dms-modx-section pk-modx-ink" id="modules">
        <ModuleExplorer />
      </section>

      {/* ============================ 03 · CAPABILITIES ==================
       * Composition: sticky header rail left, indexed ledger right. On ink. */}
      <section className="dms-section dms-section--dark pk-caps-ink" id="capabilities">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={3}>Capabilities</Eyebrow>
            <h2 className="dms-h2">The controls a regulated library runs on.</h2>
          </header>
          <ol className="dms-caps">
            {CAPABILITIES.map((c) => (
              <li className="dms-cap" key={c.title} data-reveal>
                <CapGlyph name={c.glyph} />
                <h3 className="dms-cap__title">{c.title}</h3>
                <p className="dms-cap__body">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 04 · LIFECYCLE =====================
       * Sticky scroll story (mirrors section 02): the component owns the
       * head, the brand field container, and the trail + shell inside it.
       * On ink: near-black field + black bottom breathing room. */}
      <section className="dms-section dms-lifex-section pk-lifex-ink" id="lifecycle">
        <LifecycleExplorer />
      </section>

      {/* ==================== INTEGRATIONS (connector layer) ===========
       * Connective beat after the lifecycle: the controlled document does not
       * stop at Unifize's edge. Unnumbered interstitial, on ink, so it continues
       * the dark block (02-04) one section longer before the light 05. */}
      <IntegrationLayer data={INTEGRATIONS} variant="minimal" />

      {/* ============================ 05 · WHO IT IS FOR =================
       * The two canonical DMS target personas (Notion: PPS-5, PPS-6) own the
       * record day to day; the Quality Manager (PPS-2) is the approving seat.
       * Question-led cards: each role is one audit question answered. */}
      <section className="dms-section dms-audience" id="who" aria-labelledby="dms-audience-title">
        <div className="dms-wrap">
          <header className="dms-audience__head" data-reveal>
            <Eyebrow n={5}>Who it is for</Eyebrow>
            <h2 className="dms-h2" id="dms-audience-title">For the teams that keep every document current.</h2>
            <p className="dms-lede">{AUDIENCE.lede}</p>
          </header>

          <div className="dms-audience__owners">
            {AUDIENCE.owners.map((owner) => (
              <article className="dms-owner" key={owner.role} data-reveal>
                <img className="dms-owner__photo" src={owner.img} alt="" loading="lazy" />
                <div className="dms-owner__body">
                  <div className="dms-owner__kicker">
                    <h3 className="dms-owner__role">{owner.role}</h3>
                    <span className="dms-owner__owns">{owner.owns}</span>
                  </div>
                  <p className="dms-owner__aka">Also answers to {owner.aka}</p>
                  <p className="dms-owner__q">“{owner.question}”</p>
                  <div className="dms-owner__work">
                    <span className="dms-owner__lab">Day to day</span>
                    <ol className="dms-owner__daily">
                      {owner.daily.map((d, i) => (
                        <li key={d}><span aria-hidden="true">0{i + 1}</span>{d}</li>
                      ))}
                    </ol>
                  </div>
                  <span className="dms-owner__soon">Full persona page · soon</span>
                </div>
              </article>
            ))}
          </div>

          <aside className="dms-audience__approver" data-reveal aria-label="The approving seat">
            <div className="dms-apr__main">
              <div className="dms-owner__kicker">
                <h3 className="dms-owner__role">{AUDIENCE.approver.role}</h3>
                <span className="dms-owner__owns">{AUDIENCE.approver.owns}</span>
              </div>
              <p className="dms-owner__aka">Also answers to {AUDIENCE.approver.aka}</p>
              <p className="dms-owner__q">“{AUDIENCE.approver.question}”</p>
              <Link className="dms-audience__link" href={AUDIENCE.approver.href}>
                <span>{AUDIENCE.approver.linkLabel}</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="dms-apr__side">
              <span className="dms-owner__lab">Day to day</span>
              <ol className="dms-owner__daily">
                {AUDIENCE.approver.daily.map((d, i) => (
                  <li key={d}><span aria-hidden="true">0{i + 1}</span>{d}</li>
                ))}
              </ol>
            </div>
          </aside>

          <p className="dms-audience__readside" data-reveal>
            <strong>Everyone else on the floor?</strong> They see one thing: the current effective version, at the point of use.
          </p>
        </div>
      </section>

      {/* ============================ 06 · PROOF =========================
       * Real customer films from the Webflow CMS (see PROOF_FILMS), on the
       * itm carousel shell; the attested figure keeps the lead card. */}
      <div className="itm dms-proof-reference">
        <DmsProofFilms />
      </div>

      {/* ============================ 07 · COMPLIANCE + INDUSTRIES ======= */}
      <section className="dms-section dms-section--alt dms-compliance" id="compliance" aria-labelledby="dms-compliance-title">
        <div className="dms-wrap">
          <header className="dms-compliance__head" data-reveal>
            <div className="dms-head">
              <Eyebrow n={7}>Compliance frame</Eyebrow>
              <h2 className="dms-h2" id="dms-compliance-title">One lifecycle. Every standard.</h2>
            </div>
            <p className="dms-lede">Control the record once, then prove it against whatever governs your operation.</p>
          </header>

          <div className="dms-compliance__body" data-reveal>
            <ul className="dms-compliance__standards">
              {STANDARDS.map((s) => (
                <li className="dms-compliance__standard" key={s.name}>
                  <span className="dms-std__issuer" aria-hidden="true">{s.issuer}</span>
                  <div className="dms-std__details">
                    <span className="dms-std__name">{s.name}</span>
                    <span className="dms-std__geo">{s.geo}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="dms-compliance__industries" data-reveal>
            <span className="dms-persona__lab">Validated across</span>
            <ul className="dms-inds" aria-label="Validated industries">
              {DMS_TRUST_INDUSTRIES.map((industry) => (
                <li key={industry} className="dms-ind">
                  <DmsIndustryIcon industry={industry} />
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================ 08 · FAQ =========================== */}
      <section className="dms-section dms-section--alt" id="faq">
        <div className="dms-wrap dms-faq-grid">
          <div className="dms-head" data-reveal>
            <Eyebrow n={8}>FAQ</Eyebrow>
            <h2 className="dms-h2">The questions procurement and QA ask first.</h2>
            <p className="dms-lede">
              Anything else, <a href="#dms-close-h">bring it to the walkthrough</a>.
            </p>
          </div>
          <div data-reveal>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close" id="demo" aria-labelledby="dms-close-h">
        <svg className="dms-close__circuit" viewBox="0 0 1600 760" fill="none" aria-hidden="true">
          <path d="M138 0v128h150v106h222v-92h188V0M510 234v146h-96v166H228v214M698 142h192v84h224v-96h348V0M890 226v154h170v154h212v226M1114 226h164v126h184v198h138" />
          <path d="M0 466h228M1272 534h328M288 128h92M414 546h-88M1060 380h94M1462 130h138" />
          <rect x="675" y="42" width="250" height="100" />
          <rect x="510" y="338" width="180" height="84" />
          <rect x="1128" y="550" width="144" height="92" />
          <circle cx="288" cy="128" r="8" />
          <circle cx="510" cy="234" r="8" />
          <circle cx="890" cy="226" r="8" />
          <circle cx="1060" cy="380" r="8" />
          <circle cx="1272" cy="534" r="8" />
          <circle cx="1462" cy="130" r="8" />
          <path d="M676 78h-38v30h38M924 78h38v30h-38M546 338v-34h34v34M620 422v36h34v-36M1164 550v-34h32v34M1204 642v34h32v-34" />
        </svg>
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__mark" aria-hidden="true">
              <svg viewBox="0 2.2 21 22" fill="none">
                <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
              </svg>
            </div>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="dms-close-h">Bring the SOP you could not find the current version of.</h2>
              <p className="dms-lede">We will run it through the lifecycle live, from draft to Part 11 approval.</p>
              <div className="dms-close__cta">
                <button type="button" className="dms-btn">Book a 30-minute walkthrough</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline="One governed home for every controlled document." note="Document Management System · UPD-2" />
    </main>
  );
}
