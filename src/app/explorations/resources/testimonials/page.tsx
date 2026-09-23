/* ============================================================================
 * /explorations/resources/testimonials - CUSTOMER STORIES.
 *
 * 22 Sep 2026, the rails wave: the page moved onto the grammar the homepage,
 * the platform page and DMS now share (_shared/page-rails.css - two hairline
 * rails down the content column, hatched divider bands between sections,
 * blue-square eyebrows, split heads, cell ledgers drawn rail to rail, soft
 * washes with grain under the artifacts, and one charcoal for the bookends).
 * The old flat white mast over a mile of identical cards is gone:
 *
 *   HERO      charcoal, one centred head, and the establishing shot in the slot
 *             the other pages give the arcade window: a drifting contact sheet
 *             of the real stills, rail to rail, straight on the charcoal.
 *   01 CUSTOMERS  a ledger of the customers on film; picking one filters 02.
 *   02 LIBRARY    the sticky "Filter by" toolbar over every story as a
 *             hairline cell, revealed a page at a time.
 *   KEEP EXPLORING  the dark rows that hand to case studies and the blog.
 *   CLOSE + FOOTER  back on the hero's charcoal, closing on the wordmark.
 *
 * Content is the real Website Customer Videos mirror (customer-videos.ts,
 * Notion NDB-379). Nothing here counts the site's own inventory.
 * Items live at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../../products/dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { Eyebrow } from "../../products/dms/dms-primitives";
import { HatchBand } from "../../_shared/page-rails";
import { StoriesReel } from "../_shared/stories-reel";
import { StoriesBrowser } from "../_shared/stories-browser";
import { CUSTOMER_VIDEOS } from "../_shared/customer-videos";
import { RESOURCE_FOOTER } from "../_shared/resources-data";
import { BookDemoButton } from "@/components/organisms/book-demo";
import "../../products/dms/dms.css";
import "../../products/dms/dms-redesign.css";
import "../_shared/resources-kit.css";
import "../../_shared/page-rails.css";
import "../_shared/stories-rails.css";

export const metadata: Metadata = {
  title: "Customer stories — Unifize",
  description:
    "Customer stories and product walkthroughs from teams running quality, documents, product, and manufacturing on Unifize.",
};

/* the two doors off this page, on the dark rows grammar the homepage closes
 * its resources band with */
const KEEP_EXPLORING = [
  {
    key: "case",
    label: "Case studies",
    line: "The same teams, with the numbers and the timeline around the change.",
    cta: "Read the case studies",
    href: "/explorations/resources/case-studies",
  },
  {
    key: "blog",
    label: "Field notes",
    line: "What we learn building for quality, operations, and product leaders.",
    cta: "Read the blog",
    href: "/explorations/resources/blog",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--rails rs cs-page">
      <DmsHeader />

      {/* ============================ HERO =============================
        * Charcoal ground, the whole head centred on one column and no CTA of
        * its own (Abhishek, 23 Sep): the page's offer is the stories, and
        * they start one scroll down. Under it the contact sheet runs rail to
        * rail, the establishing shot the other pages give the arcade window. */}
      <section className="dms-section dms-hero dms-hero--rails cs-hero hm-railed" aria-label="Customer stories">
        <div className="dms-wrap dms-hero__inner">
          <div className="cs-hero__head">
            <Eyebrow>Customer stories</Eyebrow>
            <h1 className="dms-hero__title">
              <span className="dms-hero__line">Hear it from the people</span>
              <span className="dms-hero__line dms-hero__turn">who do the work.</span>
            </h1>
            <p className="dms-lede dms-hero__sub">
              Quality directors, engineers, and operators on what changed after Unifize, recorded in their own
              voice and named.
            </p>
          </div>
        </div>

        <div className="dms-wrap dms-hero__frame cs-hero__frame hm-bleed">
          <StoriesReel videos={CUSTOMER_VIDEOS} />
        </div>
      </section>

      <HatchBand />

      {/* ==================== 01 CUSTOMERS + 02 LIBRARY =================
        * One client island: the ledger above is a door into the library
        * below, so both live in stories-browser.tsx with the filter state. */}
      <StoriesBrowser videos={CUSTOMER_VIDEOS} />

      <HatchBand />

      {/* ============================ KEEP EXPLORING ====================
        * Dark rows, then dark hatch into the close: the page goes back to the
        * hero's ground for its last two sections. */}
      <section className="dms-section dms-section--dark cs-keep hm-railed" aria-labelledby="cs-keep-h">
        <div className="dms-wrap">
          <div className="cs-keep__intro">
            <Eyebrow>Keep exploring</Eyebrow>
            <h2 className="dms-h2" id="cs-keep-h">The evidence behind the films.</h2>
            <p className="dms-lede">
              A story tells you it worked. The case studies and the field notes tell you how, and what it took.
            </p>
          </div>
          <div className="cs-keep__rows">
            {KEEP_EXPLORING.map((row) => (
              <Link className="cs-keeprow" href={row.href} key={row.key}>
                <span className={"cs-keeprow__wash cs-keeprow__wash--" + row.key} aria-hidden="true">
                  <i />
                </span>
                <span className="cs-keeprow__col">
                  <b>{row.label}</b>
                  <span>{row.line}</span>
                </span>
                <span className="cs-keeprow__go">
                  {row.cta}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--dark" />

      {/* ============================ CLOSE ============================= */}
      <section
        className="dms-section dms-section--dark dms-close hm-close--rails cs-close hm-railed"
        id="demo"
        aria-labelledby="cs-close-h"
      >
        <div className="dms-wrap">
          <div className="dms-close__grid">
            <div className="dms-close__convergence" aria-hidden="true">
              <div className="dms-close__mark">
                <svg viewBox="0 2.2 21 22" fill="none">
                  <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                  <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                </svg>
              </div>
            </div>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="cs-close-h">Every one of these started with a backlog.</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">
                Bring the process that hurts most. We will run it on Unifize, live, and you can tell the next
                story.
              </p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/explorations/resources/case-studies" className="dms-btn dms-btn-ghost">
                  Read the case studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline={RESOURCE_FOOTER.tagline} note={RESOURCE_FOOTER.baseRight} />
    </main>
  );
}
