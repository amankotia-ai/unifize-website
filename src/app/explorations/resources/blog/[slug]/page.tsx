/* ============================================================================
 * /explorations/resources/blog/[slug] - a single article on the rails.
 *
 * 24 Sep 2026: rebuilt on the page-rails grammar, laid out after the
 * luthor.ai article page (Abhishek: "designed using our rails and design
 * system but inspired by the finish and layout of this page"):
 *   hero      charcoal bookend, the head left-aligned on one reading measure:
 *             topic eyebrow, title, standfirst, mono byline, share row;
 *   body      one railed section, two columns: a sticky aside (contents with
 *             the heading in view marked, then an article-details card) and
 *             the prose column, with one "put it into practice" panel set
 *             into the article near its middle, never against a boxed block;
 *   related   "Keep reading", three posts as a rail-to-rail cell ledger;
 *   close     the shared RailsClose, then the footer.
 *
 * Content is the Post records in resources-data.ts, unchanged. Styles live
 * in ../../_shared/article-rails.css, scoped with `ar-page`.
 * ========================================================================== */
import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DmsHeader } from "../../../products/dms/dms-header";
import { DmsMotion } from "../../../products/dms/dms-motion";
import { SiteFooter } from "../../../_shared/site-footer";
import { Eyebrow } from "../../../products/dms/dms-primitives";
import { HatchBand } from "../../../_shared/page-rails";
import { RailsClose } from "../../../_shared/rails-close";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { ArticleToc, ShareRow, type TocItem } from "../../_shared/article-rails";
import { POSTS, RESOURCE_FOOTER, getPost, type Block, type Post } from "../../_shared/resources-data";
import { SITE_URL, pageMetadata } from "@/app/explorations/_shared/seo";
import "../../../products/dms/dms.css";
import "../../../products/dms/dms-redesign.css";
import "../../../_shared/page-rails.css";
import "../../_shared/article-rails.css";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(`/resources/blog/${slug}`);
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/* one id per h2, deduped, so the contents list and the anchors agree */
function headingIds(body: Block[]) {
  const seen = new Map<string, number>();
  const ids: (string | null)[] = body.map((b) => {
    if (b.kind !== "h2") return null;
    const base = slugify(b.text) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  });
  return ids;
}

function PracticePanel({ p }: { p: Post }) {
  return (
    <aside className="ar-practice" aria-label="Put it into practice">
      <span className="ar-practice__eyebrow">Put it into practice</span>
      <p className="ar-practice__h">See this run on your own process, not a slide.</p>
      <p className="ar-practice__sub">
        Bring the {p.category === "Compliance" ? "audit trail" : "workflow"} that hurts most. We will build it on Unifize, live, in a 30-minute walkthrough.
      </p>
      <BookDemoButton className="dms-btn" source="blog-inline">Book a demo &rarr;</BookDemoButton>
    </aside>
  );
}

function Prose({ p, ids }: { p: Post; ids: (string | null)[] }) {
  // the practice panel goes in a gap nearest 45% of the way down whose
  // neighbours are both plain text, so it never stacks on a quote or callout
  // and never splits a heading from its first paragraph or a lead-in from
  // its list
  const boxed = (b?: Block) => b?.kind === "quote" || b?.kind === "callout";
  const target = p.body.length * 0.45;
  let panelAt = -1;
  for (let i = 1; i < p.body.length; i++) {
    if (boxed(p.body[i - 1]) || boxed(p.body[i]) || p.body[i - 1].kind === "h2" || p.body[i].kind === "list") continue;
    if (panelAt < 0 || Math.abs(i - target) < Math.abs(panelAt - target)) panelAt = i;
  }

  return (
    <div className="ar-prose">
      {p.body.map((b, i) => {
        let el: React.ReactNode;
        switch (b.kind) {
          case "h2":
            el = <h2 id={ids[i] ?? undefined}>{b.text}</h2>;
            break;
          case "quote":
            el = (
              <blockquote>
                <p>{b.text}</p>
                {b.cite ? <cite>{b.cite}</cite> : null}
              </blockquote>
            );
            break;
          case "list":
            el = <ul>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
            break;
          case "callout":
            el = (
              <div className="ar-callout">
                <span className="ar-callout__lab">{b.label}</span>
                <p>{b.text}</p>
              </div>
            );
            break;
          default:
            el = <p>{b.text}</p>;
        }
        return (
          <Fragment key={i}>
            {i === panelAt ? <PracticePanel p={p} /> : null}
            {el}
          </Fragment>
        );
      })}
    </div>
  );
}

function RelatedCell({ o }: { o: Post }) {
  return (
    <Link href={`/resources/blog/${o.slug}`} className="ar-cell">
      <span className="ar-cell__plate" aria-hidden="true">
        <span className="ar-cell__cat">{o.category}</span>
        <span className="ar-cell__dek">{o.dek}</span>
      </span>
      <span className="ar-cell__body">
        <span className="ar-cell__title">{o.title}</span>
        <span className="ar-cell__meta">{o.author.name} · {o.dateLabel} · {o.readMins} min read</span>
      </span>
    </Link>
  );
}

export default async function BlogItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const ids = headingIds(p.body);
  const toc: TocItem[] = p.body.flatMap((b, i) => (b.kind === "h2" ? [{ id: ids[i] as string, text: b.text }] : []));

  const sameTopic = POSTS.filter((o) => o.slug !== p.slug && o.category === p.category);
  const fill = POSTS.filter((o) => o.slug !== p.slug && !sameTopic.includes(o));
  const related = [...sameTopic, ...fill].slice(0, 3);

  const url = `${SITE_URL}/resources/blog/${p.slug}`;

  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--rails ar-page">
      <DmsHeader />
      <DmsMotion />

      {/* ------------------------------------------------------------ hero
        * Luthor's article head on our charcoal: everything left on one
        * reading measure, the byline and share row set in mono. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed ar-hero" aria-labelledby="ar-h1">
        <div className="dms-wrap dms-hero__inner">
          <div className="ar-hero__head">
            <Link href="/resources/blog" className="ar-hero__topic">
              <Eyebrow>{p.category}</Eyebrow>
            </Link>
            <h1 className="dms-hero__title ar-hero__title" id="ar-h1">
              <span className="dms-hero__line">{p.title}</span>
            </h1>
            <p className="dms-hero__sub ar-hero__dek">{p.dek}</p>
            <p className="ar-hero__byline">
              <span>{p.author.name}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={p.date}>{p.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{p.readMins} min read</span>
            </p>
            <ShareRow url={url} title={p.title} />
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------------------------ body */}
      <section className="dms-section hm-railed ar-body" aria-label="Article">
        <div className="dms-wrap">
          <div className="ar-grid">
            <aside className="ar-aside">
              <div className="ar-aside__stick">
                <ArticleToc items={toc} />
                <div className="ar-details">
                  <span className="ar-label">Article details</span>
                  <dl className="ar-details__list">
                    <div>
                      <dt>Written by</dt>
                      <dd>
                        <span className="ar-details__name">{p.author.name}</span>
                        <span className="ar-details__role">{p.author.role}</span>
                      </dd>
                    </div>
                    <div>
                      <dt>Topic</dt>
                      <dd><Link href="/resources/blog">{p.category}</Link></dd>
                    </div>
                    <div>
                      <dt>Published</dt>
                      <dd><time dateTime={p.date}>{p.dateLabel}</time></dd>
                    </div>
                    <div>
                      <dt>Reading time</dt>
                      <dd>{p.readMins} minutes</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>

            <article className="ar-article" aria-labelledby="ar-h1">
              <Prose p={p} ids={ids} />
            </article>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* --------------------------------------------------------- related */}
      <section className="dms-section hm-railed ar-related" aria-labelledby="ar-rel-h">
        <div className="dms-wrap">
          <header className="ar-head" data-reveal>
            <div className="ar-head__lead">
              <Eyebrow>Keep reading</Eyebrow>
              <h2 className="dms-h2" id="ar-rel-h">More from the practice.</h2>
            </div>
            <Link href="/resources/blog" className="dms-btn dms-btn-ghost ar-head__all">View all posts</Link>
          </header>
        </div>
        <div className="dms-wrap hm-bleed">
          <ul className="ar-ledger">
            {related.map((o) => (
              <li className="ar-ledger__cell" key={o.slug}>
                <RelatedCell o={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HatchBand />

      <RailsClose
        id="ar-close-h"
        eyebrow="Quality on Unifize"
        heading="Reading about it is one thing. Watch it work."
        lede="Bring the process this post describes. We will run it on Unifize, live, on your own work, in a 30-minute walkthrough."
        secondary={{ label: "Customer stories", href: "/resources/testimonials" }}
        source="blog-close"
      />

      <SiteFooter tagline={RESOURCE_FOOTER.tagline} note={RESOURCE_FOOTER.baseRight} />
    </main>
  );
}
