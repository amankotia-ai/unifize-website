/* ============================================================================
 * TriggerPage - shared server component that renders a Unifize TRIGGER page in
 * the DMS product-page design system (see ../../products/dms). A trigger page
 * addresses one recognizable, high-stakes moment - a Form 483, an MDR deadline,
 * a recall scope, a line stop - the way a product page addresses a system: the
 * statutory clock that just started, what breaks in a manual response, the
 * governed response run on one thread, the record you're left with, who owns it,
 * and the related moments next to it.
 *
 * It reuses the DMS stylesheet + the shared product kit (FlowExplorer,
 * FaqAccordion, primitives, line-work glyphs), adding only a small `.tg-*` layer
 * for the statutory clock and the related-triggers register. Driven entirely by
 * a data object, so each trigger is a thin route file.
 *
 * Copy is grounded in the canonical Notion source-of-truth (Trigger Events +
 * Medical Devices industry). Only framing is authored; every factual claim
 * traces to a canonical record (see each -data file's comments).
 * ========================================================================== */
import Link from "next/link";
import { DmsHeader } from "../../products/dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsMotion } from "../../products/dms/dms-motion";
import { Eyebrow, HatchFrame } from "../../products/dms/dms-primitives";
import { CapGlyph, SeverityIcon } from "../../products/dms/dms-linework";
import { FlowExplorer, FaqAccordion, type FlowStep } from "../../products/_shared/product-interactive";
import "../../products/dms/dms.css";
import "../../products/_shared/product-kit.css";
import "./trigger-kit.css";

const SEV_CLASS: Record<string, string> = { Critical: "is-critical", High: "is-high", Medium: "is-medium" };

export type EscalationStep = { time: string; title: string; note: string; tone?: "trigger" | "ok" | "bad" };
export type Capability = { title: string; body: string; glyph: string };
export type Pain = { title: string; body: string; severity: "Critical" | "High" | "Medium" };
export type Standard = { name: string; geo: string; body: string };
export type RelatedTrigger = { name: string; clock: string; severity: "Urgent" | "High"; owner: string; href?: string };

export type TriggerPageData = {
  slug: string;
  crumb: { industry: { label: string; href: string }; section: string; trigger: string };
  metaTitle: string;
  metaDescription: string;

  /** the statutory / operational clock this moment starts. `value` is the big
   * countdown; `sub` is the citation + stake line under it. */
  clock: { severity: "Urgent" | "High"; label: string; value: string; sub?: string };

  hero: {
    headline: React.ReactNode;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: { label: string; href: string };
    mock: React.ReactNode;
    mockUrl: string;
  };

  /* the escalation ladder - what the clock is counting down to (line-work) */
  escalation: { eyebrowN: number; heading: string; lede: string; steps: EscalationStep[] };

  /* what breaks in a manual response, ranked as failure modes (pains) */
  breaks: { eyebrowN: number; heading: string; items: Pain[] };

  /* the governed response, run on one thread (flow, brand field + ChatShell) */
  response: {
    eyebrowN: number;
    heading: string;
    trailLabel: string;
    steps: FlowStep[];
    chat: { variant: "capa" | "change-control"; points: number[] };
    mobileNote?: { label: string; id: string };
  };

  /* what you're left with when it closes (capabilities ledger) */
  record: { eyebrowN: number; heading: string; items: Capability[] };

  /* who owns the response - a cross-link into the owning persona page */
  owner: { eyebrowN: number; heading: string; item: { name: string; tag: string; owns: string; href?: string } };

  /* the moments next to this one - a register into the other trigger pages */
  related: { eyebrowN: number; heading: string; lede?: string; items: RelatedTrigger[] };

  compliance: { eyebrowN: number; heading: string; standards: Standard[]; industries: string[] };

  faq: { eyebrowN: number; heading: string; lede?: React.ReactNode; items: { q: string; a: string }[] };

  close: {
    eyebrow: string;
    heading: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: { label: string; href: string };
  };

  footer: { tagline: string; baseRight: string; nav: { label: string; links: { label: string; href: string }[] }[] };
};

function Arrow() {
  return (
    <svg className="tg-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="square" d="M5 10h9M10 5.5 14.5 10 10 14.5" />
    </svg>
  );
}

export function TriggerPage({ data }: { data: TriggerPageData }) {
  const sev = data.clock.severity.toLowerCase();
  /* the escalation splits into the lead-up sequence and the two fork outcomes */
  const escSeq = data.escalation.steps.filter((s) => s.tone !== "ok" && s.tone !== "bad");
  const escOuts = data.escalation.steps.filter((s) => s.tone === "ok" || s.tone === "bad");
  return (
    <main className="dms">
      <DmsMotion />
      <DmsHeader />

      {/* ============================ HERO ============================
       * Trigger hero: a copy + artifact split (mirrors the persona hero). The
       * clock line, headline, lede, and CTAs stack in the left column; the
       * Form 483 - the document that just landed, NOT a product screen - sits in
       * the fold on the right. The standards band closes the hero full-width. */}
      <section className={"dms-section dms-hero tg-hero tg-hero--" + sev} aria-label={data.crumb.trigger}>
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__crumb tg-hero__crumb">
            <Link href={data.crumb.industry.href}>{data.crumb.industry.label}</Link>
            <span className="dms-hero__crumb-sep" aria-hidden="true">/</span>
            <span>{data.crumb.section}</span>
            <span className="dms-hero__crumb-sep" aria-hidden="true">/</span>
            <span>{data.crumb.trigger}</span>
          </div>

          <div className="tg-hero__grid">
            <div className="tg-hero__lead">
              <div className="tg-clockline" role="img"
                aria-label={`${data.clock.label}: ${data.clock.value}. Severity ${data.clock.severity}.`}>
                <span className="tg-clockline__dot" aria-hidden="true" />
                <span className="tg-clockline__val">{data.clock.value}</span>
              </div>
              <h1 className="dms-hero__title">{data.hero.headline}</h1>
              <p className="dms-lede dms-hero__sub">{data.hero.lede}</p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn">{data.hero.ctaPrimary} &rarr;</button>
                <a href={data.hero.ctaSecondary.href} className="dms-btn dms-btn-ghost">{data.hero.ctaSecondary.label}</a>
              </div>
            </div>
            <div className="tg-hero__panel">
              {data.hero.mock}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 01 · ESCALATION LADDER ==========
       * The stakes of a trigger are a time-and-consequence path, not three
       * feature cards - so this is a line-work ladder: the event, the response
       * window, then the fork (respond and it closes, or miss it and it
       * escalates). Semantic colour on the fork; the trigger node is the one
       * key marker. */}
      <section className="dms-section dms-problem" id="stakes">
        <div className="dms-wrap">
          <div className="dms-head dms-head--center" data-reveal>
            <Eyebrow n={data.escalation.eyebrowN}>What the clock counts down to</Eyebrow>
            <h2 className="dms-h2">{data.escalation.heading}</h2>
            <p className="dms-lede">{data.escalation.lede}</p>
          </div>
          <div className="tg-fork" data-reveal>
            {/* the lead-up: a centred vertical sequence */}
            <ol className="tg-fork__seq">
              {escSeq.flatMap((s, i) => [
                ...(i > 0 ? [<li className="tg-fork__conn" aria-hidden="true" key={s.title + "-c"} />] : []),
                <li className={"tg-fork__step" + (s.tone ? " tg-fork__step--" + s.tone : "")} key={s.title}>
                  <span className="tg-fork__node" aria-hidden="true" />
                  <span className="tg-fork__time dms-data">{s.time}</span>
                  <span className="tg-fork__title">{s.title}</span>
                </li>,
              ])}
            </ol>
            {/* the split */}
            <svg className="tg-fork__bracket" viewBox="0 0 200 46" preserveAspectRatio="none" aria-hidden="true">
              <path d="M100 0 V20 M48 20 H152 M48 20 V46 M152 20 V46" fill="none" stroke="currentColor"
                strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            {/* the two ways it ends */}
            <ol className="tg-fork__outs">
              {escOuts.map((s) => (
                <li className={"tg-fork__out tg-fork__out--" + (s.tone ?? "")} key={s.title}>
                  <span className="tg-fork__node" aria-hidden="true" />
                  <span className="tg-fork__time dms-data">{s.time}</span>
                  <span className="tg-fork__title">{s.title}</span>
                  <p className="tg-fork__note">{s.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================ 02 · WHAT BREAKS ================= */}
      <section className="dms-section dms-section--alt">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.breaks.eyebrowN}>The manual response</Eyebrow>
            <h2 className="dms-h2">{data.breaks.heading}</h2>
          </div>
          <ol className="dms-pains">
            {data.breaks.items.map((pn) => (
              <li className={"dms-pain " + SEV_CLASS[pn.severity]} key={pn.title} data-reveal>
                <div className="dms-pain__sig">
                  <SeverityIcon severity={pn.severity} />
                  <span className="dms-pain__sev">{pn.severity}</span>
                </div>
                <h3 className="dms-pain__title">{pn.title}</h3>
                <p className="dms-pain__body">{pn.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 03 · THE RESPONSE =============== */}
      <section className="dms-section dms-lifex-section tg-lifex-ink" id="response">
        <FlowExplorer
          eyebrowN={data.response.eyebrowN}
          heading={data.response.heading}
          trailLabel={data.response.trailLabel}
          steps={data.response.steps}
          chat={data.response.chat}
          mobileNote={data.response.mobileNote}
        />
      </section>

      {/* ============================ 04 · WHAT YOU'RE LEFT WITH ====== */}
      <section className="dms-section dms-section--dark tg-record-ink" id="record">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={data.record.eyebrowN}>The record</Eyebrow>
            <h2 className="dms-h2">{data.record.heading}</h2>
          </header>
          <ol className="dms-caps">
            {data.record.items.map((c) => (
              <li className="dms-cap" key={c.title} data-reveal>
                <CapGlyph name={c.glyph} />
                <h3 className="dms-cap__title">{c.title}</h3>
                <p className="dms-cap__body">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 05 · WHO OWNS IT ================ */}
      <section className="dms-section" id="owner">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.owner.eyebrowN}>Who owns the response</Eyebrow>
            <h2 className="dms-h2">{data.owner.heading}</h2>
          </div>
          <div className="tg-owner-wrap" data-reveal>
            {(() => {
              const o = data.owner.item;
              const inner = (
                <>
                  <div className="tg-owner__head">
                    <span className="tg-owner__tag">{o.tag}</span>
                    <h3 className="tg-owner__name">{o.name}</h3>
                  </div>
                  <p className="tg-owner__owns">{o.owns}</p>
                  {o.href ? <span className="tg-owner__cta">View the role <Arrow /></span> : null}
                </>
              );
              return o.href ? (
                <Link className="tg-owner tg-owner--link" href={o.href}>{inner}</Link>
              ) : (
                <article className="tg-owner">{inner}</article>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ============================ 06 · RELATED TRIGGERS =========== */}
      <section className="dms-section dms-section--alt" id="related">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.related.eyebrowN}>Related moments</Eyebrow>
            <h2 className="dms-h2">{data.related.heading}</h2>
            {data.related.lede ? <p className="dms-lede">{data.related.lede}</p> : null}
          </div>
          <ul className="tg-related" data-reveal>
            <li className="tg-related__head" aria-hidden="true">
              <span>Trigger</span>
              <span className="tg-related__clockcol">Clock</span>
              <span className="tg-related__ownercol">Owner</span>
              <span />
            </li>
            {data.related.items.map((t) => {
              const inner = (
                <>
                  <span className="tg-related__name">
                    <span className={"tg-related__dot tg-related__dot--" + t.severity.toLowerCase()} aria-hidden="true" />
                    {t.name}
                  </span>
                  <span className="tg-related__clock">{t.clock}</span>
                  <span className="tg-related__owner">{t.owner}</span>
                  {t.href ? <Arrow /> : <span className="tg-related__soon">Soon</span>}
                </>
              );
              return (
                <li className="tg-related__row" key={t.name}>
                  {t.href ? (
                    <Link className="tg-related__link" href={t.href}>{inner}</Link>
                  ) : (
                    <span className="tg-related__link tg-related__link--static">{inner}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============================ 07 · COMPLIANCE ================= */}
      <section className="dms-section" id="compliance">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.compliance.eyebrowN}>Compliance frame</Eyebrow>
            <h2 className="dms-h2">{data.compliance.heading}</h2>
          </div>
          <div data-reveal>
            <HatchFrame>
              <ul className="dms-stds">
                {data.compliance.standards.map((s) => (
                  <li className="dms-std" key={s.name}>
                    <span className="dms-std__geo">{s.geo}</span>
                    <span className="dms-std__name">{s.name}</span>
                    <p className="dms-std__body">{s.body}</p>
                  </li>
                ))}
              </ul>
              <div className="dms-frame">
                <div className="dms-frame__inds">
                  <span className="dms-persona__lab">Validated across</span>
                  <div className="dms-inds">
                    {data.compliance.industries.map((n) => <span key={n} className="dms-ind">{n}</span>)}
                  </div>
                </div>
              </div>
            </HatchFrame>
          </div>
        </div>
      </section>

      {/* ============================ 08 · FAQ ======================== */}
      <section className="dms-section dms-section--alt" id="faq">
        <div className="dms-wrap dms-faq-grid">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.faq.eyebrowN}>FAQ</Eyebrow>
            <h2 className="dms-h2">{data.faq.heading}</h2>
            {data.faq.lede ? <p className="dms-lede">{data.faq.lede}</p> : null}
          </div>
          <div data-reveal>
            <FaqAccordion faqs={data.faq.items} />
          </div>
        </div>
      </section>

      {/* ============================ CLOSE =========================== */}
      <section className="dms-section dms-section--dark dms-close" aria-labelledby={`${data.slug}-close-h`}>
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">{data.close.eyebrow}</span>
              <h2 className="dms-close__h" id={`${data.slug}-close-h`}>{data.close.heading}</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">{data.close.lede}</p>
              <div className="dms-close__cta">
                <button type="button" className="dms-btn">{data.close.ctaPrimary}</button>
                <a href={data.close.ctaSecondary.href} className="dms-btn dms-btn-ghost">{data.close.ctaSecondary.label}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline={data.footer.tagline} note={data.footer.baseRight} />
    </main>
  );
}
