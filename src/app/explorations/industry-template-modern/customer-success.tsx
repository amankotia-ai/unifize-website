"use client";

/* ============================================================================
 * Customer success — a horizontal, scrollable carousel of photo cards with a
 * brand overlay, a headline stat, a quote and an attribution (Webflow-style).
 * This is also the page's PROOF section (folded in): the first three cards are
 * REAL, driven by canonical MD_PROOF data — the customer-attested 41% result
 * and the named customers (Recovery Force, Harmonic Bionics). Cards 4-6 are
 * clearly-marked SAMPLE stories (fictional brands, Unsplash portraits) to fill
 * the layout; replace them with real, verified stories before shipping. Photos
 * on the real cards are placeholder stock too, pending real customer imagery.
 * ========================================================================== */

import { useRef } from "react";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { Eyebrow } from "./itm-primitives";

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=1200&q=70`;

type CSCard = {
  brand: string;
  img: string;
  quote: string;
  stat?: string;
  statLabel?: string;
  name?: string;
  title?: string;
  note?: string; // shown instead of name/title (e.g. attribution, sector)
};

const CS_CARDS: CSCard[] = [
  // --- REAL (from canonical MD_PROOF) ---
  {
    brand: "Customer-attested",
    stat: `${MD_PROOF.stat.pct}%`,
    statLabel: `lower ${MD_PROOF.stat.metric}`,
    quote: `${usd(MD_PROOF.stat.recovered)} recovered in year one, against a signed ${usd(MD_PROOF.stat.baseline)} baseline.`,
    note: "From one signed, verifiable customer baseline",
    img: U("photo-1497366754035-f200968a6e72"),
  },
  {
    brand: MD_PROOF.customers[0].name,
    quote: MD_PROOF.customers[0].desc,
    note: "Class I/II wearable medical devices",
    img: U("photo-1522071820081-009f0129c71c"),
  },
  {
    brand: MD_PROOF.customers[1].name,
    quote: MD_PROOF.customers[1].desc,
    note: "Surgical robotics",
    img: U("photo-1552664730-d307ca884978"),
  },
  // --- SAMPLE / PLACEHOLDER (replace with real stories) ---
  {
    brand: "Aveline Devices",
    stat: "9 days",
    statLabel: "from change request to sealed record",
    quote: "A change used to take weeks of chasing approvals. Now it moves on one thread and seals itself under Part 11.",
    name: "Marco Reyes",
    title: "Head of Regulatory Affairs",
    img: U("photo-1560250097-0b93528c311a"),
  },
  {
    brand: "Corevance",
    stat: "$2.4M",
    statLabel: "in avoided rework, per year",
    quote: "We pulled the coordination headcount out of our COGS. The decision trace does that work now.",
    name: "Priya Nair",
    title: "Chief Operating Officer",
    img: U("photo-1573496359142-b8d87734a5a2"),
  },
  {
    brand: "Steriva",
    stat: "3x",
    statLabel: "faster audit preparation",
    quote: "Audit prep stopped being a fire drill. Everything the investigator asked for was already on the record.",
    name: "James Okafor",
    title: "Quality Director",
    img: U("photo-1568602471122-7832951cc4c5"),
  },
];

export function CustomerSuccess() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".itm-cs__card");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="itm-section itm-section--alt itm-cs" id="proof" aria-label="Customer success">
      <div className="itm-wrap itm-wrap--wide itm-cs__head">
        <div className="itm-head-block">
          <Eyebrow n={8}>Proof</Eyebrow>
          <h2 className="itm-h2">Results, honestly stated, from device teams in your class.</h2>
        </div>
        <div className="itm-cs__nav">
          <button type="button" className="itm-cs__arrow" aria-label="Previous stories" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" className="itm-cs__arrow" aria-label="Next stories" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="itm-wrap itm-wrap--wide">
        <div className="itm-cs__track" ref={trackRef}>
          {CS_CARDS.map((c) => (
            <article key={c.brand} className="itm-cs__card">
              <img className="itm-cs__photo" src={c.img} alt="" loading="lazy" />
              <div className="itm-cs__overlay" aria-hidden="true" />
              <span className="itm-cs__brand">{c.brand}</span>
              <div className="itm-cs__body">
                {c.stat ? (
                  <>
                    <span className="itm-cs__stat">{c.stat}</span>
                    <span className="itm-cs__stat-lab">{c.statLabel}</span>
                  </>
                ) : null}
                <p className="itm-cs__quote">&ldquo;{c.quote}&rdquo;</p>
                <div className="itm-cs__foot">
                  <span className="itm-cs__person">
                    {c.name ? (
                      <>
                        <span className="itm-cs__name">{c.name}</span>
                        <span className="itm-cs__title">{c.title}</span>
                      </>
                    ) : (
                      <span className="itm-cs__title">{c.note}</span>
                    )}
                  </span>
                  <a className="itm-cs__go" href="#" aria-label={`Read the ${c.brand} story`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="itm-cs__disc">Named references and the customer-attested figure are shown separately; the figure is anonymized. Cards 4-6 are sample stories, pending real case studies.</p>
      </div>
    </section>
  );
}
