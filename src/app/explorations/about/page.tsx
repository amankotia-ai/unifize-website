/* ============================================================================
 * ABOUT US. Three plain sections after the hero: the journey, what the
 * product is, where we are (an interactive map driven by the office rows,
 * about-map.tsx). Then the close. No other figures, no employee list (Raj,
 * website sync of 2 Sep 2026), no investor logos, no headcount.
 *
 * 23 Sep 2026: moved onto the rails grammar the homepage, platform, DMS,
 * solutions and industry pages share (_shared/page-rails.css): charcoal
 * hero and close, split heads, rail-to-rail cells, hatch bands between
 * sections, the figure on a wash with the frosted plate. Page-local rules
 * live in about-kit.css; the split head and the close cell grid come from
 * platform-rails.css (this page is a pf-page too).
 *
 * Copy is front-end authored from Ben's foundational doc "Who We're Building
 * For" (Notion PBD-6) and Positioning Strategy v3.8. Office addresses were
 * confirmed on 2 Sep 2026; whether the London and Milton DE addresses from
 * the old site still apply is with Raj.
 * Sentence case, no em dashes, no stat tiles.
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
import { AboutMap, type Office } from "./about-map";
import { AboutFigure, ProductGrid, type ProductTile } from "./about-figure";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "../products/dms/dms-redesign.css";
import "../_shared/page-rails.css";
import "../platform/platform-rails.css";
import "./about-kit.css";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/about");

const JOURNEY = [
  {
    label: "Before Unifize",
    title: "Two operators, one problem",
    body: [
      "Ben Merton spent fifteen years running a manufacturing business that supplied life sciences, with plants in the United States, China, South Korea and India, under ISO 13485 and ISO 9001.",
      "Lakshman Thatai led operations in food processing, medical devices and consumer goods across the United States, China and India. Same world: distributed teams, real regulatory stakes, and the daily work of getting different people to build products together across sites, suppliers and time zones.",
    ],
  },
  {
    label: "On the floor",
    title: "The floor was lean. The handoffs were not.",
    body: [
      "Both had applied lean and TPM to their factory floors with real discipline, and it paid off. But the work between teams, the change, the investigation, the evidence for the audit, still ran on email, meetings and spreadsheets at every site.",
      "Product launches ran long. Investigations stalled waiting for a decision buried in a thread nobody could find. Audit prep meant days of rebuilding evidence from inboxes and shared drives.",
    ],
    tax: "The waste had moved off the floor and into the handoffs. That is the coordination tax.",
  },
  {
    label: "2018 onward",
    title: "Since 2018",
    body: [
      "They founded Unifize to give cross-functional work a place to live end to end, alongside the systems companies already run. Not a consultancy, not self-serve software: practitioners who built a platform.",
      "We configure Unifize to your process with our team in the room, prove value on one process in ninety days, then expand. The company is built in Palo Alto and Bengaluru for regulated manufacturers in medical devices, pharmaceuticals, food, supplements, chemicals, automotive, aerospace and industrial machinery.",
    ],
  },
];

/* the hero's floor: the page's three sections as doors */
const CHAPTERS = [
  { href: "#journey", label: "The journey", line: "Two operators who paid the coordination tax." },
  { href: "#product", label: "What Unifize is", line: "One platform for the work between your systems." },
  { href: "#locations", label: "Where we are", line: "Palo Alto and Bengaluru, one team." },
];

const PRODUCTS: ProductTile[] = [
  { code: "QMS", name: "Quality management", href: "/products/qms", body: "Non-conformance, CAPA, audits and supplier quality." },
  { code: "DMS", name: "Document management", href: "/products/dms", body: "Document control, change control and training." },
  { code: "PLM", name: "Product lifecycle", href: "/products/plm", body: "Specifications, design controls, FMEA and control plans." },
  { code: "MES", name: "Manufacturing execution", href: "/products/mes", body: "Work orders, travellers, FAI and batch records." },
];

/* coordinates: 430 Cambridge Avenue geocoded to the building; the Bengaluru
 * pin is 6th Cross Road, Old Binnamangala, since the plot number is not in
 * OpenStreetMap (both via Nominatim, 7 Sep 2026) */
const OFFICES: Office[] = [
  {
    key: "palo-alto",
    city: "Palo Alto",
    country: "United States",
    lines: ["430 Cambridge Avenue", "Palo Alto, CA 94306"],
    lat: 37.4270176,
    lng: -122.1460579,
  },
  {
    key: "bengaluru",
    city: "Bengaluru",
    country: "India",
    lines: ["#267, 1st Floor, 6th Cross, 1st Stage", "Binnamangala, Indiranagar", "Bengaluru 560038"],
    lat: 12.980404,
    lng: 77.6401323,
  },
];

export default function AboutPage() {
  return (
    <main className="dms dms--redesign pf-page dms--about dms--rails">
      <DmsHeader />
      <DmsMotion />

      {/* ------------------------------------------------------------ hero
        * the charcoal bookend: claim left, sub and asks right, the page's
        * three sections welded to the floor as cells */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed ab-hero" aria-label="About Unifize">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Eyebrow>About Unifize</Eyebrow>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">Built by operators.</span>
                <span className="dms-hero__line dms-hero__turn">For regulated industries.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">
                Unifize was founded in 2018 by two people who ran regulated manufacturing across four
                countries and paid the coordination tax at every handoff. Where we came from, what we
                make, and where to find us.
              </p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="about-hero">Book a demo &rarr;</BookDemoButton>
                <Link href="/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
        <nav className="dms-wrap hm-bleed" aria-label="On this page">
          <div className="ab-chapters">
            {CHAPTERS.map((c) => (
              <a key={c.href} href={c.href} className="ab-chapters__cell">
                <span className="ab-chapters__label">{c.label}</span>
                <span className="ab-chapters__line">{c.line}</span>
              </a>
            ))}
          </div>
        </nav>
      </section>

      <HatchBand />

      {/* --------------------------------------------------------- journey
        * three beats as cells rail to rail; the middle one names the tax */}
      <section className="dms-section ab-section hm-railed" id="journey" aria-labelledby="ab-journey-h">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>The journey</Eyebrow>
              <h2 className="dms-h2" id="ab-journey-h">Why two operators started a software company.</h2>
            </div>
            <p className="dms-lede">
              They fixed the factory floor. The work between teams was still running on email,
              meetings and spreadsheets.
            </p>
          </header>
          <ol className="ab-journey" data-reveal>
            {JOURNEY.map((step) => (
              <li key={step.title} className="ab-journey__step">
                <span className="ab-cell-label">{step.label}</span>
                <h3 className="dms-h3">{step.title}</h3>
                <div className="ab-journey__body">
                  {step.body.map((p) => <p key={p} className="dms-body">{p}</p>)}
                </div>
                {step.tax && <p className="ab-journey__tax">{step.tax}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* --------------------------------------------------------- product
        * the figure on the sky wash, then the four products as cells */}
      <section className="dms-section dms-section--alt ab-section hm-railed" id="product" aria-labelledby="ab-product-h">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>What Unifize is</Eyebrow>
              <h2 className="dms-h2" id="ab-product-h">One platform for the work between your systems.</h2>
            </div>
            <p className="dms-lede">
              Change control, CAPA, deviations, supplier decisions, audit evidence. Your systems of
              record keep the record. Unifize holds the work that produces it, on one accountable thread
              per event, with a 21 CFR Part 11 signature on every approval.
            </p>
          </header>
        </div>
        <div className="dms-wrap hm-bleed" data-reveal>
          <div className="ab-stage">
            <AboutFigure />
          </div>
        </div>
        <div className="dms-wrap">
          <div className="ab-prod-head">
            <span className="ab-cell-label">The products, on one platform</span>
            <span className="ab-prod-head__note">Start with one, add the rest when ready.</span>
          </div>
          <ProductGrid products={PRODUCTS} />
          <p className="ab-product__foot">
            <Link href="/platform">How the platform fits your architecture &rarr;</Link>
          </p>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------------------- locations
        * the office rows drive the map: overview of both, click to fly in */}
      <section className="dms-section ab-section hm-railed" id="locations" aria-labelledby="ab-locations-h">
        <div className="dms-wrap">
          <AboutMap
            offices={OFFICES}
            head={
              <>
                <div>
                  <Eyebrow>Where we are</Eyebrow>
                  <h2 className="dms-h2" id="ab-locations-h">Two offices, one team.</h2>
                </div>
                <p className="dms-lede">Palo Alto and Bengaluru. Pick one to see the street.</p>
              </>
            }
          />
        </div>
      </section>

      <HatchBand />

      {/* ----------------------------------------------------------- close
        * the platform page's close grid: the ask left, how we start right */}
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
