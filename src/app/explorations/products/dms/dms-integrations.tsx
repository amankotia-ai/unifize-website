/* ----------------------------------------------------------------------------
 * dms-integrations.tsx - "Integrations" section that sits after the lifecycle.
 * The lifecycle shows a governed record moving through its states inside
 * Unifize; this beat shows the record does not stop at Unifize's edge.
 *
 * The default composition is a feature-led systems matrix for shared product
 * pages. The DMS redesign uses the minimal variant: a quiet logo grid followed
 * by one CTA block, so this reads as a connective beat rather than a second
 * platform chapter.
 *
 * Runs on ink (near-black), continuing the dark block the lifecycle ends on.
 * Product-specific (from data): heading, lede, the `record` it keeps in sync,
 * and the `hubSystems` that orbit. The value props, facts, and CTA are
 * platform-level and shared across all four product pages. Used by the
 * standalone DMS page and the data-driven ProductPage.
 *
 * NOTE: the systems are REPRESENTATIVE of the stack Unifize coexists with,
 * not a certified connector list. Verify against the real connector catalogue
 * before shipping. Server component, no state.
 * -------------------------------------------------------------------------- */
import { Eyebrow } from "./dms-primitives";
import { Glyph } from "./dms-linework";

export type IntegrationData = {
  heading: string;
  lede: string;
  /** the thing Unifize keeps in sync with the stack, named in this product's
   * world (e.g. "the controlled document"). Shown on the hub caption. */
  record: string;
  /** the systems of record that orbit the hub. Kept short (single tokens) so
   * the tiles read cleanly; 6-8 is the comfortable range. */
  hubSystems: string[];
};

/* the 2x2 value props - platform-level and true of every Unifize product, so
 * they are shared here (the product-specific story is in the heading/lede and
 * the orbiting systems). */
const FEATURES: { glyph: string; title: string; body: string }[] = [
  { glyph: "sync", title: "Two-way sync", body: "Master data and records move in both directions, so Unifize and your systems of record never drift apart." },
  { glyph: "trace", title: "No rip-and-replace", body: "Unifize sits over the stack you already run and lands value without displacing your ERP, PLM, or MES." },
  { glyph: "signature", title: "Governed by design", body: "Every synced change keeps its owner and e-signature, 21 CFR Part 11 where the record requires it." },
  { glyph: "access", title: "Open and extensible", body: "A documented REST API and webhooks let any system act on a state change the moment it happens." },
];

/* the bottom strip - three platform facts. Deliberately non-numeric: the page
 * cut fabricated metrics elsewhere, so these stay qualitative. */
const FACTS: { glyph: string; stat: string; sub: string }[] = [
  { glyph: "access", stat: "Open REST API", sub: "Build the connection you need." },
  { glyph: "shield", stat: "Enterprise identity", sub: "SSO and SCIM, encrypted in transit." },
  { glyph: "versions", stat: "Always current", sub: "One record, every system in step." },
];

const LOGO_INTEGRATIONS = [
  { name: "SAP", logo: "https://api.iconify.design/logos:sap.svg" },
  { name: "Oracle", logo: "https://api.iconify.design/logos:oracle.svg" },
  { name: "NetSuite", logo: "https://api.iconify.design/cib:oracle-netsuite.svg?color=%232D5B86" },
  { name: "Okta", logo: "https://api.iconify.design/logos:okta.svg" },
  { name: "SharePoint", logo: "https://api.iconify.design/streamline-logos:microsoft-sharepoint-logo-block.svg?color=%230078D4" },
  { name: "Microsoft Teams", logo: "https://api.iconify.design/logos:microsoft-teams.svg" },
  { name: "Google Drive", logo: "https://api.iconify.design/logos:google-drive.svg" },
] as const;

function IntegrationHub({ systems, record }: { systems: string[]; record: string }) {
  return (
    <div className="dms-intg__hub" data-reveal>
      <div className="dms-intg__network" role="img" aria-label={`Unifize syncing ${record} both ways with ${systems.join(", ")}.`}>
        <div className="dms-intg__systems">
          {systems.map((system) => <span className="dms-intg__system" key={system}>{system}</span>)}
        </div>
        <div className="dms-intg__core">
          <img src="/logo_light.svg" alt="" aria-hidden="true" />
          <span>Governed integration layer</span>
        </div>
      </div>
      <p className="dms-intg__hub-cap">
        Two-way sync. Unifize keeps {record} and your systems of record in step.
      </p>
    </div>
  );
}

export function IntegrationLayer({
  data,
  variant = "full",
  minimalLede = "Connect document control to the tools already holding your product, people, and process data.",
  minimalEyebrow,
}: {
  data: IntegrationData;
  variant?: "full" | "minimal";
  /** the one product-specific line of the minimal variant; defaults to the
   * DMS copy so the standalone DMS page is unchanged. */
  minimalLede?: string;
  /** Optional section label for product pages that treat the minimal connector
   * layer as a named beat in the page hierarchy. */
  minimalEyebrow?: React.ReactNode;
}) {
  if (variant === "minimal") {
    return (
      <section className="dms-section dms-section--dark dms-intg dms-intg--minimal" id="integrations" aria-labelledby="dms-integrations-title">
        <div className="dms-wrap">
          <header className="dms-intg__minimal-head" data-reveal>
            {minimalEyebrow ? <Eyebrow>{minimalEyebrow}</Eyebrow> : null}
            <h2 className="dms-h2" id="dms-integrations-title">Works with the systems you already run.</h2>
            <p className="dms-lede">{minimalLede}</p>
          </header>

          <div className="dms-intg__logo-grid" data-reveal>
            {LOGO_INTEGRATIONS.map((integration) => (
              <div className="dms-intg__logo-card" key={integration.name}>
                <img src={integration.logo} alt={`${integration.name} logo`} />
                <span>{integration.name}</span>
              </div>
            ))}

            <div className="dms-intg__minimal-cta">
              <div>
                <h3>Don&rsquo;t see your system?</h3>
                <p>We are always adding connectors. Bring us the stack you need to keep in step.</p>
              </div>
              <button type="button">Talk to us &rarr;</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dms-section dms-section--dark dms-intg" id="integrations" aria-label="Integrations">
      <div className="dms-wrap">
        <div className="dms-intg__top">
          {/* left - copy, value-prop grid, CTA */}
          <div className="dms-intg__copy">
            <div className="dms-head" data-reveal>
              <Eyebrow>Integrations</Eyebrow>
              <h2 className="dms-h2">{data.heading}</h2>
              <p className="dms-lede">{data.lede}</p>
            </div>

            <ul className="dms-intg__feats" data-reveal>
              {FEATURES.map((f) => (
                <li className="dms-intg__feat" key={f.title}>
                  <span className="dms-intg__feat-ico">
                    <Glyph name={f.glyph} className="dms-intg__feat-glyph" />
                  </span>
                  <div className="dms-intg__feat-body">
                    <h3 className="dms-intg__feat-title">{f.title}</h3>
                    <p className="dms-intg__feat-text">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="dms-intg__cta" data-reveal>
              <button type="button" className="dms-btn dms-btn-ghost">See it connect to your stack &rarr;</button>
            </div>
          </div>

          {/* right - the radial hub */}
          <IntegrationHub systems={data.hubSystems} record={data.record} />
        </div>

        {/* bottom - platform facts */}
        <ul className="dms-intg__stats" data-reveal>
          {FACTS.map((s) => (
            <li className="dms-intg__stat" key={s.stat}>
              <Glyph name={s.glyph} className="dms-intg__stat-glyph" />
              <span className="dms-intg__stat-main">
                <span className="dms-intg__stat-v">{s.stat}</span>
                <span className="dms-intg__stat-sub">{s.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
