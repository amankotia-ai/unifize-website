/* ============================================================================
 * ProductAudience - "Who it is for" on the product-page rails.
 *
 * One roster ledger rail to rail: a caption row names the three columns once
 * (role, the lifecycle span it owns, day to day), then one hairline row per
 * persona. The span is drawn as two status pills joined by an arrow, so the
 * section's single point reads at a glance: every role owns a stretch of the
 * same record. Works for three personas (DMS) and for eight (QMS).
 * ========================================================================== */
import Link from "next/link";
import { Eyebrow } from "../dms/dms-primitives";
import type { AudiencePersona } from "./product-audience";

type Props = {
  idPrefix: string;
  heading: string;
  lede: string;
  personas: Pick<AudiencePersona, "role" | "owns" | "daily" | "img" | "href">[];
};

function OwnsSpan({ owns }: { owns: string }) {
  const [from, to] = owns.split("→").map((part) => part.trim());
  if (!to) return <span className="pa-span__solo">{owns}</span>;
  return (
    <span className="pa-span" aria-label={`Owns ${from} to ${to}`}>
      <span className="pa-span__state">{from}</span>
      <svg className="pa-span__arrow" viewBox="0 0 32 10" aria-hidden="true">
        <path d="M0 5h30M26 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <span className="pa-span__state pa-span__state--to">{to}</span>
    </span>
  );
}

export function ProductAudience({ idPrefix, heading, lede, personas }: Props) {
  const titleId = `${idPrefix}-audience-title`;
  return (
    <section className="dms-section dms-audience pa-section hm-railed" id="who" aria-labelledby={titleId}>
      <div className="dms-wrap">
        <header className="dms-audience__head" data-reveal>
          <div className="dms-head">
            <Eyebrow n={5}>Who it is for</Eyebrow>
            <h2 className="dms-h2" id={titleId}>{heading}</h2>
          </div>
          <p className="dms-lede">{lede}</p>
        </header>

        <div className="pa-roster">
          <div className="pa-row pa-row--caption" aria-hidden="true">
            <span>Role</span>
            <span>Owns in the lifecycle</span>
            <span>Day to day</span>
          </div>

          {personas.map((persona) => (
            <article className="pa-row" key={persona.role} data-reveal>
              <div className="pa-who">
                <img className="pa-who__photo" src={persona.img} alt="" loading="lazy" />
                <h3 className="pa-who__role">
                  {persona.href ? (
                    <Link href={persona.href}>
                      {persona.role}
                      <span className="pa-who__go" aria-hidden="true">↗</span>
                    </Link>
                  ) : persona.role}
                </h3>
              </div>

              <div className="pa-owns">
                <span className="pa-mlabel">Owns</span>
                {persona.owns ? <OwnsSpan owns={persona.owns} /> : null}
              </div>

              <ul className="pa-daily" aria-label={`${persona.role} day to day`}>
                {persona.daily.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
