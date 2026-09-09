/* ============================================================================
 * /explorations/home-glide - homepage exploration in the register of
 * glideapps.com (teardown: docs/home-glide/teardown.md), with Unifize content.
 * Visuals first: this route currently carries the hero (five rendered cutaway
 * maquettes behind a sticky industry control, one record pinned to the room
 * it happened in, connectors to the departments on it) and a review strip
 * that lays all five renders out for sign-off. Renders come from
 * scripts/facility-render/build.py. The rest of the page follows once the
 * maquettes are approved.
 * ========================================================================== */
import type { Metadata } from "next";
import { DmsHeader } from "../products/dms/dms-header";
import { GlideHero, RecordOverlay } from "./glide-hero";
import { MAQUETTES, RENDER_H, RENDER_W } from "./maquettes";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../products/dms/dms-redesign.css";
import "./home-glide.css";

export const metadata: Metadata = {
  title: "Unifize, the platform for cross-functional work in regulated industries",
  description: "Turn scattered decisions into records that run your operation.",
};

export default async function HomeGlidePage({ searchParams }: { searchParams: Promise<{ scene?: string }> }) {
  const { scene } = await searchParams;
  return (
    <main className="dms dms--redesign hg">
      <DmsHeader />
      <GlideHero initial={scene} />

      <section className="dms-section dms-section--alt hg-review" aria-labelledby="hg-review-h">
        <div className="dms-wrap">
          <span className="dms-eyebrow">Maquette review</span>
          <h2 className="dms-h2" id="hg-review-h">Five plants, one model language.</h2>
          <div className="hg-review__grid">
            {MAQUETTES.map((m) => (
              <figure key={m.key} className="hg-review__item">
                <div className="hg-review__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.caption} width={RENDER_W} height={RENDER_H} className="hg-render" loading="lazy" decoding="async" />
                  <RecordOverlay m={m} animate={false} />
                </div>
                <figcaption><span>{m.name}</span><span>{m.record.kind} · {m.record.code}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
