/* ============================================================================
 * PersonaRailsPage - a role page on the rails (25 Sep 2026, the Quality
 * Manager first).
 *
 * Reached from the "Who it is for" roster on the product pages, not the nav.
 * Two scopes on one page:
 *   - the hero is the homepage's hero, text left-aligned (Abhishek, 25 Sep:
 *     "make it like the homepage but with text left aligned"): it sits in a
 *     `dms--home` wrapper so home-kit.css and home-rails.css style it
 *     exactly as the homepage's, the tabs over the window being the moments
 *     of one of the role's own flows, the first tab its home screen;
 *   - everything after it is the Solutions template's sibling, in an
 *     `sk-page` wrapper (solution-rails.css), so the two stay one design.
 * The role's own story, in five beats:
 *
 *   hero     the decision arriving with its evidence: the role's home screen,
 *            then the record, the signature, the handoff
 *   strip    the titles the seat goes by (Notion)
 *   01       the roles this persona holds on the record (Product Roles)
 *   02       where it breaks (Pain Points), the old world beside it
 *   03       the difference: another of the role's flows, walked step by step
 *   04       peers on film (Website Customer Videos)
 *   close    + footer
 *
 * Data: persona-source.ts resolves every Notion id the page names against
 * the mirrors; anything Notion stops backing is held back, not rendered.
 * ========================================================================== */
import Link from "next/link";
import type { CSSProperties } from "react";
import { DmsHeader } from "../../products/dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsMotion } from "../../products/dms/dms-motion";
import { Eyebrow } from "../../products/dms/dms-primitives";
import { HatchBand } from "../../_shared/page-rails";
import { PlatformJourney } from "../../platform/platform-interactive";
import { HomeProofReel, type ProofStill } from "../../home/home-proof-reel";
import { attestedLead, filmByWistia } from "../../products/_shared/customer-films";
import { WorkArtifact } from "../../domains/_shared/solution-work-viz";
import { JOURNEY_ICONS } from "../../domains/_shared/SolutionPage";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { RailsClose } from "../../_shared/rails-close";
import { Words } from "../../_shared/split-words";
import { PM_REVEAL_PAGE } from "../../_shared/page-motion-reveal";
import { HeroArcadeSwitcher } from "../../home/home-interactive";
import { personaFacts, personaFlow, personaPains, personaRoles } from "./persona-source";
import type { HistoryScene, PersonaRailsData } from "./types";
import "../../products/dms/dms.css";
import "../../products/dms/dms-redesign.css";
import "../../platform/platform-kit.css";
import "../../domains/_shared/solution-kit.css";
/* the homepage's hero styles: every rule is scoped to `.dms--home`, which
 * only the hero's wrapper carries on this page */
import "../../home/home-kit.css";
import "../../_shared/page-rails.css";
import "../../home/home-rails.css";
import "../../domains/_shared/solution-rails.css";
import "../../domains/_shared/solution-viz.css";
import "./persona-rails.css";
/* the page-in timeline and scroll choreography, loaded last */
import "../../_shared/page-motion.css";

/* the split head every light section opens with (the Solutions rails head) */
function SplitHead({ eyebrow, id, title, lede }: { eyebrow: string; id: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className={"sk-split" + (lede ? "" : " sk-split--solo")} data-reveal>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="dms-h2" id={id}>{title}</h2>
      </div>
      {lede ? <p className="dms-lede">{lede}</p> : null}
    </div>
  );
}

/* 02 · the old world: the legacy system's search for one defect, each past
 * case closed on its own, the auditor's question landing on top. The frame
 * is the Solutions leak widget's (sk-ib); the window is this page's. */
function HistoryFigure({ scene }: { scene: HistoryScene }) {
  return (
    <figure className="sk-ib pn-hist" aria-label={`${scene.kicker}: ${scene.meta}. ${scene.caption}`}>
      <div className="sk-ib__stage" aria-hidden="true">
        <div className="sk-ib__win pn-hist__win">
          <div className="sk-ib__bar">
            <span className="sk-ib__kicker">{scene.kicker}</span>
            <span className="sk-ib__meta">{scene.meta}</span>
          </div>
          <div className="pn-hist__query">
            <svg viewBox="0 0 16 16"><path d="M7 2.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM10.3 10.3l3.2 3.2" /></svg>
            <span>{scene.query}</span>
          </div>
          <ul className="pn-hist__rows">
            {scene.rows.map((row) => (
              <li key={row.id}>
                <span className="pn-hist__id">{row.id}</span>
                <span className="pn-hist__when">{row.when}</span>
                <span className="pn-hist__title">{row.title}</span>
                <span className="pn-hist__meta">
                  <span className="pn-hist__capa">
                    <b>{row.capa}</b>
                    <i className={"pn-hist__state is-" + row.state.toLowerCase()}>{row.state}</i>
                  </span>
                  <span className={"pn-hist__note" + (row.warn ? " is-warn" : "")}>{row.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {scene.float ? (
          <div className="sk-ib__float">
            <span className="sk-ib__kicker">{scene.float.kicker}</span>
            <span>{scene.float.note}</span>
          </div>
        ) : null}
      </div>
      <figcaption className="sk-ib__cap">{scene.caption}</figcaption>
    </figure>
  );
}

export function PersonaRailsPage({ data }: { data: PersonaRailsData }) {
  const d = data;
  const persona = personaFacts(d.personaId);

  /* the hero loops one of the persona's own flows; held back with it */
  const heroFlow = personaFlow(persona, d.hero.flowId);

  /* 01 · each group keeps only the roles Notion still says this persona holds */
  const held = personaRoles(persona);
  const groups = d.seat.groups
    .map((g) => ({
      ...g,
      roles: g.roles.filter((name) => {
        if (held.has(name)) return true;
        console.warn(`GAP    persona ${persona.id}: role "${name}" is not held in the roles mirror. Held back.`);
        return false;
      }),
    }))
    .filter((g) => g.roles.length > 0);

  /* 02 · the picked pains, in the page's order */
  const pains = personaPains(persona, d.breaks.picks);

  /* 03 · the walked flow: only steps the flow has, in the page's order */
  const journeyFlow = personaFlow(persona, d.journey.flowId);
  const journeySteps = journeyFlow
    ? d.journey.steps.filter((s) => journeyFlow.steps.some((fs) => fs.index === s.index) && d.journey.configs[s.index])
    : [];

  /* 04 · governance applied in the adapter: unapproved films drop out */
  const stills: ProofStill[] = d.proof.stills.flatMap((s) => {
    const film = filmByWistia(s.wistia);
    return film ? [{ ...film, fact: s.fact }] : [];
  });
  const leadSpec = d.proof.lead;
  const lead = leadSpec
    ? attestedLead(leadSpec.wistia, {
        stat: leadSpec.stat,
        statLabel: leadSpec.statLabel,
        body: (film) => [film.role, film.company].filter(Boolean).join(", "),
      })
    : null;
  const leadFilm = leadSpec ? filmByWistia(leadSpec.wistia) : null;

  const heroActions = (
    <div className="dms-hero__ctas">
      <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
      <a href={d.hero.secondary.href} className="dms-btn dms-btn-ghost">{d.hero.secondary.label}</a>
    </div>
  );

  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--rails pm">
      <DmsHeader />
      <DmsMotion selector={PM_REVEAL_PAGE} />

      {/* ============================ HERO =============================
        * The homepage's hero, text left-aligned: the head on the charcoal,
        * then the tabs over one product window on the moving wash. The tabs
        * are the moments of one of the role's own flows, the first its home
        * screen, so the page opens where the role's day does. */}
      <div className="dms--redesign dms--home dms--rails pm pn-hero-home">
        <section className="dms-section dms-hero dms-hero--rails hm-railed" aria-label={persona.name}>
          <div className="dms-wrap dms-hero__inner">
            <div className="dms-hero__grid">
              <div className="dms-hero__left">
                <Eyebrow>Roles · {persona.name}</Eyebrow>
                <h1 className="dms-hero__title">
                  {/* split into words for the page-in stagger (page-motion.css) */}
                  <span className="dms-hero__line"><Words text={d.hero.titleLead} /></span>
                  <span className="dms-hero__line dms-hero__turn">
                    <Words text={d.hero.titleTurn} from={d.hero.titleLead.split(" ").length} />
                  </span>
                </h1>
              </div>
              <div className="dms-hero__right">
                <p className="dms-lede dms-hero__sub">{d.hero.sub}</p>
                {heroActions}
              </div>
            </div>
          </div>

          {heroFlow ? (
            <div className="dms-wrap dms-hero__frame dms-hero__product-demo hm-hero-demo hm-bleed">
              <HeroArcadeSwitcher
                views={d.hero.steps.map((step, i) => ({ key: `step-${i}`, label: step.label, icon: step.icon, config: step.config }))}
              />
            </div>
          ) : null}
        </section>
      </div>

      <div className="dms--redesign pf-page sk-page pn-page dms--rails pm">
        {/* ============================ TITLES STRIP ======================
          * The seat under the names it goes by, from the persona's Notion row. */}
        {persona.titles.length ? (
          <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label={d.titlesLabel}>
            <div className="dms-wrap dms-trust__inner">
              <p className="dms-trust__label">{d.titlesLabel}</p>
              <ul className="dms-trust__logos pn-titles">
                {persona.titles.map((t) => (
                  <li key={t} className="dms-trust__mark">{t}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <HatchBand />

        {/* ============================ 01 · THE SEAT ====================
          * The roles this persona holds on the record, grouped by what the
          * role does; each role links to the product module it works in. */}
        {groups.length ? (
          <>
            <section className="dms-section sk-work-section pn-seat-section hm-railed" id="seat" aria-labelledby="pn-seat-title">
              <div className="dms-wrap">
                <SplitHead eyebrow="The seat" id="pn-seat-title" title={d.seat.heading} lede={d.seat.lede} />
                <div className="sk-wk" style={{ "--sk-work-n": groups.length } as CSSProperties} data-reveal data-stagger>
                  {groups.map((g) => (
                    <article className="sk-wk__cell" key={g.name}>
                      <div className={"sk-wk__wash sk-wk__wash--" + g.viz.wash} aria-hidden="true">
                        <WorkArtifact viz={g.viz} />
                      </div>
                      <div className="sk-wk__intro">
                        <h3>{g.name}</h3>
                        <p>{g.line}</p>
                      </div>
                      <ul className="sk-wk__items pn-roles" aria-label={`${g.name}: the roles`}>
                        {g.roles.map((name) => {
                          const link = d.seat.links[name];
                          return (
                            <li key={name}>
                              {link ? (
                                <Link href={link.href}>
                                  <span className="pn-role">
                                    <span>{name}</span>
                                    <small>{link.product} · {link.module}</small>
                                  </span>
                                  <i aria-hidden="true">&rarr;</i>
                                </Link>
                              ) : (
                                <span>{name}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <HatchBand />
          </>
        ) : null}

        {/* ============================ 02 · WHERE IT BREAKS ==============
          * One message: the head with the picked pains as a plain list, the
          * old world beside it on the paper wash, the cost as one line. */}
        <section className="dms-section sk-leaks-section hm-railed" id="breaks" aria-labelledby="pn-breaks-title">
          <div className="dms-wrap">
            <div className="sk-lk" data-reveal>
              <div className="dms-head">
                <Eyebrow>Where it breaks</Eyebrow>
                <h2 className="dms-h2" id="pn-breaks-title">
                  {/* one sentence per line, so the measure never strands a word */}
                  {d.breaks.heading.split(/(?<=[.!?])\s+/).map((line) => (
                    <span className="sk-h2-line" key={line}>{line} </span>
                  ))}
                </h2>
                <p className="dms-lede">{d.breaks.lede}</p>
                {pains.length ? (
                  <ol className="sk-lkx">
                    {pains.map((p) => (
                      <li key={p.id}>
                        <b>{p.title}</b>
                        <span>{p.short}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
              <HistoryFigure scene={d.breaks.scene} />
            </div>

            <div className="sk-tail sk-tail--tax" data-reveal>
              <p>{d.breaks.tail}</p>
              <Link href="/coordination-tax-calculator">Measure your coordination tax &rarr;</Link>
            </div>
          </div>
        </section>

        <HatchBand />

        {/* ============================ 03 · THE DIFFERENCE ===============
          * One of the role's flows walked end to end: the steps are the
          * rail, the product window proves each one. */}
        {journeyFlow && journeySteps.length ? (
          <>
            <section className="dms-section sk-journey-section hm-railed" id="difference" aria-labelledby="pn-journey-title">
              <div className="dms-wrap">
                <SplitHead eyebrow="The difference" id="pn-journey-title" title={d.journey.heading} lede={d.journey.lede} />
                <div style={{ "--sk-steps": journeySteps.length } as CSSProperties} data-reveal>
                  <PlatformJourney
                    label={journeyFlow.name}
                    steps={journeySteps.map((s) => ({ title: s.title, body: s.body, icon: JOURNEY_ICONS[s.icon] }))}
                    configs={journeySteps.map((s) => d.journey.configs[s.index])}
                  />
                </div>
              </div>
            </section>

            <HatchBand />
          </>
        ) : null}

        {/* ============================ 04 · PEERS ON FILM ================ */}
        {stills.length ? (
          <HomeProofReel
            heading={d.proof.heading}
            lede={d.proof.lede}
            stills={stills}
            lead={lead && leadFilm ? { ...lead, who: leadFilm.person } : null}
          />
        ) : null}

        {stills.length ? <HatchBand className="hm-hatch--dark" /> : null}

        {/* ============================ CLOSE ============================ */}
        <RailsClose
          id="pn-close-h"
          eyebrow={d.close.eyebrow}
          heading={d.close.heading}
          lede={d.close.lede}
          secondary={d.close.secondary}
        />

        <SiteFooter tagline={d.footer.tagline} note={d.footer.note} />
      </div>
    </main>
  );
}
