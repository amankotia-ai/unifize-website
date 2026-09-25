/* ============================================================================
 * ABOUT US. 24 Sep 2026: the "anatomy of an optimized About page" format
 * (one H1 that defines the entity, then the H2s an answer engine asks).
 *
 * Third pass the same day (Abhishek: "on every section you're trying to do
 * too much ... forcefit things into one"): each section says ONE thing in
 * ONE form, from one source. No outcomes mixed into product lines, no
 * third column, no chips, no charts, no logo strip in the hero.
 *   hero       what Unifize is
 *   01 does    the four products
 *   02 differ  your eQMS vs Unifize, four rows
 *   03 who     the industries
 *   04 team    the two founders
 *   05 where   the office map
 *   06 how     four steps
 *   07 FAQ
 * Section heads are stacked (eyebrow, H2, one line under it), not the
 * split head (Abhishek, 24 Sep 2026).
 * Raj's rules: founders only, no em dashes, no counts. No jump-link rows.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { DmsMotion } from "../products/dms/dms-motion";
import { SiteFooter } from "../_shared/site-footer";
import { HatchBand } from "../_shared/page-rails";
import { Eyebrow } from "../products/dms/dms-primitives";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { RailsClose } from "../_shared/rails-close";
import { PRODUCT_GLYPHS } from "../platform/platform-stack-cards";
import { AboutMap } from "./about-map";
import { COMPARE, ENTITY, FAQ, FOUNDERS, INDUSTRIES, OFFICES, PRODUCTS, STEPS, aboutJsonLd } from "./about-data";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "../products/dms/dms-redesign.css";
import "../_shared/page-rails.css";
import "../platform/platform-rails.css";
import "./about-kit.css";
import { SITE_URL, pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/about");

export default function AboutPage() {
  return (
    <main className="dms dms--redesign pf-page dms--about dms--rails">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd(SITE_URL)) }}
      />
      <DmsHeader />
      <DmsMotion />

      {/* ------------------------------------------------------------ hero */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed ab-hero" aria-labelledby="ab-h1">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Eyebrow>About Unifize</Eyebrow>
              <h1 className="dms-hero__title" id="ab-h1">
                <span className="dms-hero__line">Built by operators.</span>
                <span className="dms-hero__line dms-hero__turn">For regulated industries.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">{ENTITY.short}</p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="about-hero">Book a demo &rarr;</BookDemoButton>
                <Link href="/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------------ 01 the four products */}
      <section className="dms-section ab-section hm-railed" id="what" aria-labelledby="ab-what-h">
        <div className="dms-wrap">
          <header className="ab-head" data-reveal>
            <div>
              <Eyebrow>What we do</Eyebrow>
              <h2 className="dms-h2" id="ab-what-h">What Unifize does</h2>
            </div>
            <p className="dms-lede">Four products on one platform. Start with one, add the rest when ready.</p>
          </header>
          <ul className="ab-cells ab-cells--4" data-reveal>
            {PRODUCTS.map((p) => (
              <li key={p.code}>
                <Link href={p.href} className="ab-prod">
                  <span className="ab-prod__glyph" aria-hidden="true">
                    <svg viewBox="0 0 20 20"><path fillRule="evenodd" d={PRODUCT_GLYPHS[p.code]} /></svg>
                  </span>
                  <span className="ab-prod__code">{p.code}</span>
                  <h3 className="ab-prod__name">{p.name}</h3>
                  <p className="ab-prod__line">{p.line}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ---------------------------------------------- 02 eQMS vs Unifize */}
      <section className="dms-section dms-section--alt ab-section hm-railed" id="different" aria-labelledby="ab-diff-h">
        <div className="dms-wrap">
          <header className="ab-head" data-reveal>
            <div>
              <Eyebrow>Why it's different</Eyebrow>
              <h2 className="dms-h2" id="ab-diff-h">What makes Unifize different</h2>
            </div>
            <p className="dms-lede">Your eQMS keeps the record. Unifize holds the work that produces it.</p>
          </header>
          <table className="ab-vs" data-reveal>
            <caption className="ab-sr">Your eQMS compared with Unifize</caption>
            <thead>
              <tr>
                <td />
                <th scope="col">Your eQMS</th>
                <th scope="col" className="ab-vs__us">Unifize</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.eqms}</td>
                  <td className="ab-vs__us">{r.unifize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------------- 03 the industries */}
      <section className="dms-section ab-section hm-railed" id="who" aria-labelledby="ab-who-h">
        <div className="dms-wrap">
          <header className="ab-head" data-reveal>
            <div>
              <Eyebrow>Who uses it</Eyebrow>
              <h2 className="dms-h2" id="ab-who-h">Who uses Unifize</h2>
            </div>
            <p className="dms-lede">Manufacturers in regulated industries.</p>
          </header>
          <ul className="ab-inds" data-reveal>
            {INDUSTRIES.map((x) => (
              <li key={x.href}>
                <Link href={x.href}>
                  <span>{x.name}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HatchBand />

      {/* ---------------------------------------------------- 04 the founders */}
      <section className="dms-section ab-section hm-railed" id="team" aria-labelledby="ab-team-h">
        <div className="dms-wrap">
          <header className="ab-head" data-reveal>
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="dms-h2" id="ab-team-h">The team behind Unifize</h2>
            </div>
            <p className="dms-lede">Founded in 2018 by two operators who ran regulated manufacturing.</p>
          </header>
          <ul className="ab-cells ab-cells--2" data-reveal>
            {FOUNDERS.map((f) => (
              <li key={f.name} className="ab-founder">
                <span className="ab-founder__mono" aria-hidden="true">{f.initials}</span>
                <div>
                  <h3 className="ab-founder__name">{f.name}</h3>
                  <span className="ab-founder__role">{f.role}</span>
                  <p className="ab-founder__bio">{f.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------------------ 05 locations */}
      <section className="dms-section dms-section--alt ab-section hm-railed" id="locations" aria-labelledby="ab-locations-h">
        <div className="dms-wrap">
          <AboutMap
            offices={OFFICES}
            head={
              <>
                <div>
                  <Eyebrow>Where we are</Eyebrow>
                  <h2 className="dms-h2" id="ab-locations-h">Palo Alto and Bengaluru</h2>
                </div>
                <p className="dms-lede">Pick an office to see the street.</p>
              </>
            }
          />
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ---------------------------------------------------- 06 four steps */}
      <section className="dms-section ab-section hm-railed" id="how" aria-labelledby="ab-how-h">
        <div className="dms-wrap">
          <header className="ab-head" data-reveal>
            <div>
              <Eyebrow>How we work</Eyebrow>
              <h2 className="dms-h2" id="ab-how-h">How Unifize works</h2>
            </div>
            <p className="dms-lede">One process first, proven in ninety days. Then the next.</p>
          </header>
          <ol className="ab-cells ab-cells--4" data-reveal>
            {STEPS.map((s, i) => (
              <li key={s.title} className="ab-step">
                <span className="ab-step__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ab-step__title">{s.title}</h3>
                <p className="ab-step__body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------------------------ 07 FAQ */}
      <section className="dms-section dms-section--alt ab-section hm-railed" id="faq" aria-labelledby="ab-faq-h">
        <div className="dms-wrap">
          <header className="ab-head" data-reveal>
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="dms-h2" id="ab-faq-h">Frequently asked questions</h2>
            </div>
          </header>
          <div className="ab-faq" data-reveal>
            {FAQ.map((f, i) => (
              <details key={f.q} className="ab-faq__item" open={i === 0}>
                <summary>
                  <h3 className="ab-faq__q">{f.q}</h3>
                  <span className="ab-faq__icon" aria-hidden="true" />
                </summary>
                <p className="dms-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      <RailsClose
        id="ab-close-h"
        eyebrow="Work with us"
        heading="Practitioners. Not a consultancy."
        lede="Bring the process where the coordination tax is highest and we will run it with you, live, in a 30-minute walkthrough."
        secondary={{ label: "See the platform", href: "/platform" }}
        source="about-close"
      />

      <SiteFooter tagline="Practitioners who built a platform." />
    </main>
  );
}
