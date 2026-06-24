import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "../../home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import { IngressDrift } from "@/components/organisms";
import { getBuyer, listBuyerSlugs } from "@/lib/platform-data/buyers";

export function generateStaticParams() {
  return listBuyerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const buyer = getBuyer(slug);
  if (!buyer) return { title: "Buyer not found" };
  return {
    title: `${buyer.title} — Unifize`,
    description: buyer.promise,
  };
}

export default async function BuyerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const buyer = getBuyer(slug);
  if (!buyer) notFound();

  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="detail-breadcrumb">
            <Link href="/platform">Platform</Link>
            <span className="sep">/</span>
            <span>By buyer</span>
          </div>
          <Eyebrow dot>{buyer.typicalTitles}</Eyebrow>
          <h1>{buyer.title}</h1>
          <p className="sub">{buyer.promise}</p>
          <div className="hero-ctas">
            <Button arrow size="lg">
              Book a demo
            </Button>
            <Button variant="dark-ghost" size="lg">
              See the platform
            </Button>
          </div>
        </div>
      </header>

      <IngressDrift
        id="where-it-shows-up"
        eyebrow={`Where ${buyer.title}s meet Unifize`}
        lede={`Your primary entry into the platform — and the domains around it where the same cross-functional work plays out across your week.`}
        stations={buyer.driftStations}
        coda={{
          eyebrow: `Across your week`,
          claim: {
            setup: `It is not a tooling problem.`,
            punch: (
              <>
                It is a <em>coordination</em> problem.
              </>
            ),
          },
          closer: (
            <>
              Whichever door you walked through,
              <span className="drift-coda-closer-em">
                {" "}
                the same governed layer sits underneath.
              </span>
            </>
          ),
        }}
      />

      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Industries where you operate</span>
            <h2 className="section-title">
              Where {buyer.title}s tend to find Unifize first.
            </h2>
          </div>
          <div className="link-grid">
            {buyer.industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="link-card">
                <span className="link-card-eyebrow">Industry</span>
                <h3 className="link-card-title">{i.title}</h3>
                {i.blurb ? <p className="link-card-blurb">{i.blurb}</p> : null}
                <span className="link-card-cta">
                  Open <span className="arr">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">Your week</span>
          </div>
          <div className="detail-body">
            {buyer.weekNarrative.map((para, i) => (
              <p key={i} className="detail-prose">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">Sound familiar?</span>
            <p className="detail-aside-blurb">
              The recognitions we hear most from {buyer.title}s.
            </p>
          </div>
          <div className="detail-body">
            <ul className="recognition-list">
              {buyer.recognitions.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">What changes</span>
            <p className="detail-aside-blurb">
              The outcomes {buyer.title}s see after Unifize is in place.
            </p>
          </div>
          <div className="detail-body">
            <ul className="outcome-list">
              {buyer.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">{buyer.title}</span>
              <h2 className="section-title close-title">
                See Unifize in your week.
              </h2>
              <p className="close-sub">
                A 30-minute walkthrough — your domain, your industry, your team's
                cadence.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Link href="/platform" className="btn btn-dark-ghost btn-lg">
                  Back to platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer surface dark">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Unifize</strong>
          <span>People. Process. AI. Outcomes.</span>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Explore</span>
            <Link href="/platform#industries">By industry</Link>
            <Link href="/platform#domains">By domain</Link>
            <Link href="/platform#buyer">By buyer</Link>
          </div>
          <div>
            <span className="lab">Problem</span>
            <Link href="/#thesis">Coordination tax</Link>
            <Link href="/#seam">The seam</Link>
            <Link href="/#how">The governed layer</Link>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base">
        <span>© Unifize 2026</span>
      </div>
    </footer>
  );
}
