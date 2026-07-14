/* ============================================================================
 * PersonaPage - shared server component that renders a Unifize INDUSTRY PERSONA
 * page in the DMS product-page design system (see ../../products/dms). It is the
 * role-facing counterpart to the product ProductPage: where a product page sells
 * a system, a persona page addresses one buyer/operator role in an industry -
 * the seat they sit in, what breaks there, the decision trace they reconstruct,
 * and the workflows and people around them.
 *
 * It reuses the DMS stylesheet + the shared product kit (FlowExplorer,
 * FaqAccordion, primitives, line-work glyphs) and is driven entirely by a data
 * object, so each role is a thin route file. The DMS + product pages are left
 * untouched; this is a parallel, data-driven build.
 *
 * Copy is grounded in the canonical Notion source-of-truth (Buyer Personas /
 * Product Personas + Medical Devices industry). Only framing is authored; every
 * factual claim traces to a canonical record (see each -data file's comments).
 * ========================================================================== */
import Link from "next/link";
import { DmsHeader } from "../../products/dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsMotion } from "../../products/dms/dms-motion";
import { Eyebrow, ShellFrame } from "../../products/dms/dms-primitives";
import { CapGlyph, SeverityIcon } from "../../products/dms/dms-linework";
import { FlowExplorer, FaqAccordion, type FlowStep } from "../../products/_shared/product-interactive";
import "../../products/dms/dms.css";
import "../../products/_shared/product-kit.css";
import "./persona-kit.css";

const SEV_CLASS: Record<string, string> = { Critical: "is-critical", High: "is-high", Medium: "is-medium" };

export type Capability = { title: string; body: string; glyph: string };
export type Pain = { title: string; body: string; severity: "Critical" | "High" | "Medium" };
/* one field of the record, shown in both panels. `record` absent => the record
 * left it blank (rendered as an unfilled form-line); `trace`/`evidence` fill the
 * decision-trace panel; `sig` adds a Part 11 check; `key` accents the row. */
export type GapField = { k: string; record?: string; trace?: string; evidence?: string[]; sig?: boolean; key?: boolean };
export type OwnedWorkflow = { name: string; product: string; body: string; href: string };
export type AdjacentPersona = { name: string; tag: string; owns: string; href?: string };

export type PersonaPageData = {
  slug: string;
  crumb: { industry: { label: string; href: string }; role: string };
  metaTitle: string;
  metaDescription: string;

  hero: {
    /** the buyer tier marker (e.g. "Primary buyer"). */
    tier: string;
    headline: React.ReactNode;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: { label: string; href: string };
    /** the role's title variants, shown as the "also known as" hero band. */
    roster: string[];
    mock: React.ReactNode;
    mockUrl: string;
  };

  /* the gap in the seat - what the system of record can NOT tell you. Shown as
   * the SAME record twice: a bare record panel (fields left blank) vs the
   * decision-trace panel (fields filled), so the gap is visible, not described. */
  gap: {
    eyebrowN: number;
    heading: string;
    lede: string;
    recordId: string;
    record: { lab: string; badge: string };
    resolved: { lab: string; badge: string };
    fields: GapField[];
  };

  /* what breaks for you - the role's worries, ranked as failure modes (pains) */
  breaks: { eyebrowN: number; heading: string; items: Pain[] };

  /* the decision trace this role reconstructs (flow, brand field + ChatShell) */
  trace: {
    eyebrowN: number;
    heading: string;
    trailLabel: string;
    steps: FlowStep[];
    chat: { variant: "capa" | "change-control"; points: number[] };
    mobileNote?: { label: string; id: string };
  };

  /* what you get, framed to the seat (capabilities ledger) */
  gets: { eyebrowN: number; heading: string; items: Capability[] };

  /* the workflows this role owns - an ingress register into the product pages */
  owns: { eyebrowN: number; heading: string; lede?: string; items: OwnedWorkflow[] };

  /* the people this role works the problem with - adjacent persona cross-links */
  people: { eyebrowN: number; heading: string; items: AdjacentPersona[] };

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

/* small inline arrow for register links */
function Arrow() {
  return (
    <svg className="pn-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="square" d="M5 10h9M10 5.5 14.5 10 10 14.5" />
    </svg>
  );
}

/* Part 11 sign-off check, shown on the decision-trace record panel */
function Check() {
  return (
    <svg className="pn-rec__check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function PersonaPage({ data }: { data: PersonaPageData }) {
  return (
    <main className="dms">
      <DmsMotion />
      <DmsHeader />

      {/* ============================ HERO ============================
       * Persona hero: an identity + live-queue split. The role's caseload
       * prototype sits IN the fold beside the copy (not full-width below, as
       * the product hero does), under a tier marker, with an "also known as"
       * title-roster band closing the hero. You see the person and their desk
       * at once. */}
      <section className="dms-section dms-hero pn-hero" aria-label={data.crumb.role}>
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__crumb pn-hero__crumb">
            <Link href={data.crumb.industry.href}>{data.crumb.industry.label}</Link>
            <span className="dms-hero__crumb-sep" aria-hidden="true">/</span>
            <span>{data.crumb.role}</span>
          </div>

          <div className="pn-hero__grid">
            <div className="pn-hero__lead">
              <span className="pn-hero__tier">{data.hero.tier}</span>
              <h1 className="dms-hero__title pn-hero__title">{data.hero.headline}</h1>
              <p className="dms-lede dms-hero__sub pn-hero__lede">{data.hero.lede}</p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn">{data.hero.ctaPrimary} &rarr;</button>
                <a href={data.hero.ctaSecondary.href} className="dms-btn dms-btn-ghost">{data.hero.ctaSecondary.label}</a>
              </div>
            </div>
            <div className="pn-hero__panel">
              <span className="pn-hero__panel-lab" aria-hidden="true">What you're on the hook to answer</span>
              {data.hero.mock}
            </div>
          </div>

          <div className="pn-hero__roster">
            <span className="pn-hero__roster-lab">Also known as</span>
            <ul className="pn-hero__roster-list">
              {data.hero.roster.map((t) => (
                <li key={t} className="pn-hero__roster-it">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================ 01 · THE GAP ====================
       * What the system of record can NOT tell you - shown, not described. The
       * SAME CAPA rendered as two product panels: the bare record (its fields
       * left as blank, unfilled form-lines) beside the decision trace (the same
       * fields filled with evidence, a Part 11 sign-off, and one accent row).
       * The empty panel next to the full one is the argument. */}
      <section className="dms-section" id="gap">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.gap.eyebrowN}>The gap</Eyebrow>
            <h2 className="dms-h2">{data.gap.heading}</h2>
            <p className="dms-lede">{data.gap.lede}</p>
          </div>
          <div className="pn-gap" data-reveal>
            {/* the bare record */}
            <figure className="pn-reccol">
              <figcaption className="pn-reccol__cap pn-reccol__cap--record">{data.gap.record.lab}</figcaption>
              <ShellFrame url={`app.unifize.com / quality / ${data.gap.recordId}`}>
                <div className="pn-rec" role="img" aria-label={`The system of record for ${data.gap.recordId}: state ${data.gap.record.badge}; the context, evidence, and approvals are not captured.`}>
                  <div className="pn-rec__head">
                    <span className="pn-rec__id">{data.gap.recordId}</span>
                    <span className="pn-rec__badge pn-rec__badge--muted">{data.gap.record.badge}</span>
                  </div>
                  <ul className="pn-rec__rows">
                    {data.gap.fields.map((f) => (
                      <li className="pn-rec__row" key={f.k}>
                        <span className="pn-rec__k">{f.k}</span>
                        {f.record ? (
                          <span className="pn-rec__v is-muted">{f.record}</span>
                        ) : (
                          <span className="pn-rec__blank" aria-hidden="true" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </ShellFrame>
            </figure>

            {/* the decision trace */}
            <figure className="pn-reccol">
              <figcaption className="pn-reccol__cap pn-reccol__cap--trace">{data.gap.resolved.lab}</figcaption>
              <ShellFrame url={`app.unifize.com / quality / ${data.gap.recordId}`}>
                <div className="pn-rec" role="img" aria-label={`The decision trace for ${data.gap.recordId}: ${data.gap.resolved.badge}, with context, evidence, approvals, and audit-readiness all captured.`}>
                  <div className="pn-rec__head">
                    <span className="pn-rec__id">{data.gap.recordId}</span>
                    <span className="pn-rec__badge pn-rec__badge--accent">{data.gap.resolved.badge}</span>
                  </div>
                  <ul className="pn-rec__rows">
                    {data.gap.fields.map((f) => (
                      <li className={"pn-rec__row" + (f.key ? " is-key" : "")} key={f.k}>
                        <span className="pn-rec__k">{f.k}</span>
                        {f.evidence ? (
                          <span className="pn-rec__chips">
                            {f.evidence.map((e) => <span className="pn-rec__chip" key={e}>{e}</span>)}
                          </span>
                        ) : (
                          <span className="pn-rec__v">{f.trace}{f.sig ? <Check /> : null}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </ShellFrame>
            </figure>
          </div>
        </div>
      </section>

      {/* ============================ 02 · WHAT BREAKS ================= */}
      <section className="dms-section dms-section--alt">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.breaks.eyebrowN}>What breaks</Eyebrow>
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

      {/* ============================ 03 · THE TRACE ================== */}
      <section className="dms-section dms-lifex-section" id="trace">
        <FlowExplorer
          eyebrowN={data.trace.eyebrowN}
          heading={data.trace.heading}
          trailLabel={data.trace.trailLabel}
          steps={data.trace.steps}
          chat={data.trace.chat}
          mobileNote={data.trace.mobileNote}
        />
      </section>

      {/* ============================ 04 · WHAT YOU GET =============== */}
      <section className="dms-section" id="capabilities">
        <div className="dms-wrap dms-caps-grid">
          <header className="dms-caps__rail" data-reveal>
            <Eyebrow n={data.gets.eyebrowN}>What you get</Eyebrow>
            <h2 className="dms-h2">{data.gets.heading}</h2>
          </header>
          <ol className="dms-caps">
            {data.gets.items.map((c) => (
              <li className="dms-cap" key={c.title} data-reveal>
                <CapGlyph name={c.glyph} />
                <h3 className="dms-cap__title">{c.title}</h3>
                <p className="dms-cap__body">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ 05 · WORKFLOWS YOU OWN ========== */}
      <section className="dms-section dms-section--alt" id="workflows">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.owns.eyebrowN}>What you own</Eyebrow>
            <h2 className="dms-h2">{data.owns.heading}</h2>
            {data.owns.lede ? <p className="dms-lede">{data.owns.lede}</p> : null}
          </div>
          <ul className="pn-reg" data-reveal>
            {data.owns.items.map((w) => (
              <li className="pn-reg__row" key={w.name}>
                <Link className="pn-reg__link" href={w.href}>
                  <span className="pn-reg__tag">{w.product}</span>
                  <span className="pn-reg__meta">
                    <span className="pn-reg__name">{w.name}</span>
                    <span className="pn-reg__body">{w.body}</span>
                  </span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 06 · WHO YOU WORK WITH ========== */}
      <section className="dms-section" id="people">
        <div className="dms-wrap">
          <div className="dms-head" data-reveal>
            <Eyebrow n={data.people.eyebrowN}>Who you work with</Eyebrow>
            <h2 className="dms-h2">{data.people.heading}</h2>
          </div>
          <div className="pn-people" data-reveal>
            {data.people.items.map((p) => {
              const inner = (
                <>
                  <div className="pn-person__head">
                    <span className="pn-person__tag">{p.tag}</span>
                    <h3 className="pn-person__name">{p.name}</h3>
                  </div>
                  <p className="pn-person__owns">{p.owns}</p>
                  {p.href ? (
                    <span className="pn-person__cta">View role <Arrow /></span>
                  ) : (
                    <span className="pn-person__soon">Profile coming soon</span>
                  )}
                </>
              );
              return p.href ? (
                <Link className="pn-person pn-person--link" href={p.href} key={p.name}>{inner}</Link>
              ) : (
                <article className="pn-person" key={p.name}>{inner}</article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ 07 · FAQ ======================== */}
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
