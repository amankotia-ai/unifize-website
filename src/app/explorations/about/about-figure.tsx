/* ============================================================================
 * about-figure.tsx. The one drawing in "What Unifize is": the systems of
 * record along the top (they keep the record), one accountable thread
 * beneath (Unifize holds the work that produces it), and the two flows
 * between them. The thread is the CC-2148 change control the platform page
 * tells, so the site keeps one story. Beneath the figure, the four products
 * as a small grid, each linking to its page.
 * Server component, no state. Linework idiom: hairlines, square markers,
 * mono for identifiers and times, one accent, no colored edges.
 * ========================================================================== */
import Link from "next/link";
import { TILE_ICONS } from "../platform/platform-coexistence";
import { PRODUCT_GLYPHS } from "../platform/platform-stack-cards";

const RECORD_SYSTEMS = ["ERP", "PLM", "eQMS", "MES", "LIMS"];

const THREAD = [
  { step: "Raised", what: "Supplier revision found on the line", who: "Quality", when: "Mon 09:12" },
  { step: "Decided", what: "Approve rev C, hold open shipments", who: "Engineering", when: "Tue 14:40" },
  { step: "Evidence", what: "Test report and updated SOP attached", who: "Validation", when: "Thu 11:05" },
  { step: "Signed", what: "Part 11 e-signature, thread closed", who: "D. Fontaine", when: "Day 11" },
];

export type ProductTile = { code: string; name: string; href: string; body: string };

export function AboutFigure() {
  return (
    <figure className="ab-fig" aria-label="Your systems of record keep the record. Unifize holds the work that produces it, on one thread per event.">
      {/* the systems of record: unchanged, authoritative */}
      <div className="ab-fig__band">
        <span className="ab-fig__lab">Your systems of record. They keep the record.</span>
        <ul className="ab-fig__tiles">
          {RECORD_SYSTEMS.map((s) => (
            <li className="ab-fig__tile" key={s}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d={TILE_ICONS[s]} /></svg>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* the two flows between the layers */}
      <div className="ab-fig__flows" aria-hidden="true">
        <span className="ab-fig__flow" data-dir="down"><i /><span>Context in</span></span>
        <span className="ab-fig__flow" data-dir="up"><i /><span>Record back, only what you agree</span></span>
      </div>

      {/* one accountable thread */}
      <div className="ab-fig__thread">
        <header className="ab-fig__head">
          <span className="ab-fig__id">CC-2148</span>
          <span className="ab-fig__title">Change control · supplier revision</span>
          <span className="ab-fig__chip">Closed · Part 11</span>
        </header>
        <ol className="ab-fig__rows">
          {THREAD.map((r) => (
            <li className="ab-fig__row" key={r.step}>
              <span className="ab-fig__step">{r.step}</span>
              <span className="ab-fig__what">{r.what}</span>
              <span className="ab-fig__who">{r.who}</span>
              <span className="ab-fig__when">{r.when}</span>
            </li>
          ))}
        </ol>
        <footer className="ab-fig__foot">
          <img src="/logo_dark.svg" alt="Unifize" width="658" height="152" />
          <span>holds the work that produces the record</span>
        </footer>
      </div>
    </figure>
  );
}

export function ProductGrid({ products }: { products: ProductTile[] }) {
  return (
    <ul className="ab-prod">
      {products.map((p) => (
        <li key={p.code}>
          <Link href={p.href} className="ab-prod__tile">
            <span className="ab-prod__top">
              <span className="ab-prod__glyph" aria-hidden="true">
                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d={PRODUCT_GLYPHS[p.code]} /></svg>
              </span>
              <span className="ab-prod__code">{p.code}</span>
            </span>
            <span className="ab-prod__name">{p.name}</span>
            <span className="ab-prod__body">{p.body}</span>
            <span className="ab-prod__more">See {p.code} &rarr;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
