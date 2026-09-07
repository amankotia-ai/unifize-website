/* ============================================================================
 * ABOUT US. Three plain sections after the kit hero: the journey, what the
 * product is, where we are (an interactive map driven by the office rows,
 * about-map.tsx). Then the close. No other figures, no employee list (Raj,
 * website sync of 2 Sep 2026), no investor logos, no headcount.
 *
 * Copy is front-end authored from Ben's foundational doc "Who We're Building
 * For" (Notion PBD-6) and Positioning Strategy v3.8. Office addresses were
 * confirmed on 2 Sep 2026; whether the London and Milton DE addresses from
 * the old site still apply is with Raj.
 * Inherits the live kit: dark bookends, porcelain working sections, sentence
 * case, no em dashes, no eyebrows, no stat tiles.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { DmsMotion } from "../products/dms/dms-motion";
import { SiteFooter } from "../_shared/site-footer";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { AboutMap, type Office } from "./about-map";
import { AboutFigure, ProductGrid, type ProductTile } from "./about-figure";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "../products/dms/dms-redesign.css";
import "./about-kit.css";

export const metadata: Metadata = {
  title: "About Unifize",
  description:
    "Unifize was founded in 2018 by two operators who ran regulated manufacturing across four countries and paid the coordination tax at every handoff. Built in Palo Alto and Bengaluru.",
};

const JOURNEY = [
  {
    title: "Two operators, one problem",
    body: [
      "Ben Merton spent fifteen years running a manufacturing business that supplied life sciences, with plants in the United States, China, South Korea and India, under ISO 13485 and ISO 9001.",
      "Lakshman Thatai led operations in food processing, medical devices and consumer goods across the United States, China and India. Same world: distributed teams, real regulatory stakes, and the daily work of getting different people to build products together across sites, suppliers and time zones.",
    ],
  },
  {
    title: "The floor was lean. The handoffs were not.",
    body: [
      "Both had applied lean and TPM to their factory floors with real discipline, and it paid off. But the work between teams, the change, the investigation, the evidence for the audit, still ran on email, meetings and spreadsheets at every site.",
      "Product launches ran long. Investigations stalled waiting for a decision buried in a thread nobody could find. Audit prep meant days of rebuilding evidence from inboxes and shared drives. The waste had moved off the floor and into the handoffs. That is the coordination tax.",
    ],
  },
  {
    title: "Since 2018",
    body: [
      "They founded Unifize to give cross-functional work a place to live end to end, alongside the systems companies already run. Not a consultancy, not self-serve software: practitioners who built a platform.",
      "We configure Unifize to your process with our team in the room, prove value on one process in ninety days, then expand. The company is built in Palo Alto and Bengaluru for regulated manufacturers in medical devices, pharmaceuticals, food, supplements, chemicals, automotive, aerospace and industrial machinery.",
    ],
  },
];

const PRODUCTS: ProductTile[] = [
  { code: "QMS", name: "Quality management", href: "/explorations/products/qms", body: "Non-conformance, CAPA, audits and supplier quality." },
  { code: "DMS", name: "Document management", href: "/explorations/products/dms", body: "Document control, change control and training." },
  { code: "PLM", name: "Product lifecycle", href: "/explorations/products/plm", body: "Specifications, design controls, FMEA and control plans." },
  { code: "MES", name: "Manufacturing execution", href: "/explorations/products/mes", body: "Work orders, travellers, FAI and batch records." },
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
    <main className="dms dms--redesign pf-page dms--about">
      <DmsHeader />
      <DmsMotion />

      {/* ------------------------------------------------------------ hero */}
      <section className="dms-section dms-hero" aria-label="About Unifize">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">Built by operators.</span>
                <span className="dms-hero__line dms-hero__turn">For regulated industries.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">
                Unifize was founded in 2018 by two people who ran regulated manufacturing across four
                countries and paid the coordination tax at every handoff. This is the short version: where
                we came from, what we make, and where to find us.
              </p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="about-hero">Book a demo &rarr;</BookDemoButton>
                <Link href="/explorations/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- journey */}
      <section className="dms-section ab-section" id="journey" aria-labelledby="ab-journey-h">
        <div className="dms-wrap">
          <header className="pf-centered-head ab-head">
            <h2 className="dms-h2" id="ab-journey-h">The journey</h2>
            <p className="dms-lede">Why two operators started a software company.</p>
          </header>
          <ol className="ab-journey">
            {JOURNEY.map((step) => (
              <li key={step.title} className="ab-journey__step">
                <h3 className="dms-h3">{step.title}</h3>
                <div className="ab-journey__body">
                  {step.body.map((p) => <p key={p} className="dms-body">{p}</p>)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- product */}
      <section className="dms-section dms-section--alt ab-section" id="product" aria-labelledby="ab-product-h">
        <div className="dms-wrap">
          <header className="pf-centered-head ab-head">
            <h2 className="dms-h2" id="ab-product-h">What Unifize is</h2>
            <p className="dms-lede">
              One platform for the cross-functional work that runs through every regulated company:
              change control, CAPA, deviations, supplier decisions, audit evidence. Your systems of record
              keep the record. Unifize holds the work that produces it, on one accountable thread per
              event, with a 21 CFR Part 11 signature on every approval.
            </p>
          </header>
          <div className="ab-product">
            <AboutFigure />
            <p className="ab-product__kicker">Four products on that one platform. Start with one, add the rest when ready.</p>
            <ProductGrid products={PRODUCTS} />
            <p className="ab-product__foot">
              <Link href="/explorations/platform">How the platform fits your architecture &rarr;</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- locations
        * the office rows drive the map: overview of both, click to fly in */}
      <section className="dms-section ab-section" id="locations" aria-labelledby="ab-locations-h">
        <div className="dms-wrap">
          <AboutMap
            offices={OFFICES}
            head={
              <>
                <h2 className="dms-h2" id="ab-locations-h">Where we are</h2>
                <p className="dms-lede">Two offices, one team. Pick one to see the street.</p>
              </>
            }
          />
        </div>
      </section>

      {/* ----------------------------------------------------------- close */}
      <section className="dms-section dms-section--dark dms-close" id="demo" aria-labelledby="ab-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid ab-close__grid">
            <div className="dms-close__lead">
              <h2 className="dms-close__h" id="ab-close-h">Bring the process that hurts most.</h2>
              <p className="dms-lede">
                We configure Unifize to that process with our team in the room, prove value on it in
                ninety days, then expand.
              </p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="about-close">Book a demo</BookDemoButton>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">Take the assessment</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Practitioners who built a platform." />
    </main>
  );
}
