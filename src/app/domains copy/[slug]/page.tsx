import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "../../home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import { WorkflowCanvas, WorkflowKey, ValueStreamMap } from "@/components/workflow";
import { getDomain, listDomainSlugs } from "@/lib/platform-data/domains";
import { WORKFLOW_SHOWCASE } from "@/lib/platform-data/workflows";

export function generateStaticParams() {
  return listDomainSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const domain = getDomain(slug);
  if (!domain) return { title: "Domain not found" };
  return {
    title: `${domain.title} — Unifize`,
    description: domain.promise,
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = getDomain(slug);
  if (!domain) notFound();

  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="detail-breadcrumb">
            <Link href="/platform">Platform</Link>
            <span className="sep">/</span>
            <span>By domain</span>
          </div>
          <Eyebrow dot>{domain.tier} tier · {domain.owner}</Eyebrow>
          <h1>{domain.title}</h1>
          <p className="sub">{domain.promise}</p>
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

      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">How the work actually flows</span>
            <h2 className="section-title">
              One process language, three journeys.
            </h2>
            <p className="wf-lede">
              The same visual vocabulary — steps, decision forks, rework loops and
              cross-module handoffs — drawn from the Journey Steps source of truth.
              Read it from simple to complex.
            </p>
          </div>
          <WorkflowKey />
          <div className="wf-stack">
            {WORKFLOW_SHOWCASE.map((wf) => (
              <WorkflowCanvas key={wf.id} workflow={wf} showLegend={false} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">The work behind the journey</span>
            <h2 className="section-title">
              The value stream — where the time actually goes.
            </h2>
            <p className="wf-lede">
              One journey step is many steps of work. This is the NC/CAPA value stream:
              the same process measured as minutes and cost per record, with the wait
              between steps — the coordination tax — made visible, and the roadmap that
              compresses it.
            </p>
          </div>
          <ValueStreamMap />
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
