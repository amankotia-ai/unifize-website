/* ============================================================================
 * /explorations/resources/blog/[slug] - a single article, structured like the
 * live blog item: a full-width banner plate with the title, a date/read-time
 * meta row, the article beside a sticky author card, then related posts.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { ResourceCTA, ResourceFooter } from "../../_shared/resource-chrome";
import { PostCard, initialsOf } from "../../_shared/resource-cards";
import { POSTS, getPost, type Block, type Author } from "../../_shared/resources-data";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Blog — Unifize" };
  return { title: `${p.title} — Unifize`, description: p.dek };
}

function Avatar({ author, cls }: { author: Author; cls: string }) {
  return author.img ? <img className={cls} src={author.img} alt="" /> : <span className={cls + " " + cls + "--mono"} aria-hidden="true">{initialsOf(author.name)}</span>;
}

function Blocks({ body }: { body: Block[] }) {
  return (
    <div className="rs-prose">
      {body.map((b, i) => {
        switch (b.kind) {
          case "h2": return <h2 key={i}>{b.text}</h2>;
          case "quote": return <blockquote key={i}><p>&ldquo;{b.text}&rdquo;</p>{b.cite ? <cite>{b.cite}</cite> : null}</blockquote>;
          case "list": return <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
          case "callout": return <div className="rs-callout" key={i}><span className="rs-callout__lab">{b.label}</span><p>{b.text}</p></div>;
          default: return <p key={i}>{b.text}</p>;
        }
      })}
    </div>
  );
}

export default async function BlogItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const related = POSTS.filter((o) => o.slug !== p.slug && o.category === p.category);
  const fill = POSTS.filter((o) => o.slug !== p.slug && !related.includes(o));
  const relatedAll = [...related, ...fill].slice(0, 3);

  return (
    <ResourceShell>
      {/* banner */}
      <section className="dms-section rs-bannerwrap">
        <div className="dms-wrap">
          <div className="rs-banner">
            <nav className="rs-crumb" aria-label="Breadcrumb">
              <Link href="/explorations/resources">Resources</Link>
              <span className="rs-crumb__seg"><span aria-hidden="true">/</span><Link href="/explorations/resources/blog">Blog</Link></span>
            </nav>
            <h1 className="rs-banner__title">{p.title}</h1>
            <p className="rs-banner__desc">{p.dek}</p>
          </div>
          <div className="rs-metarow">
            <span className="rs-metarow__it">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true"><rect x="3" y="4.5" width="14" height="12" /><path d="M3 8.5h14M7 2.5v4m6-4v4" /></svg>
              {p.dateLabel}
            </span>
            <span className="rs-metarow__it">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true"><circle cx="10" cy="10" r="7" /><path strokeLinecap="round" d="M10 6v4.5l3 1.5" /></svg>
              {p.readMins} min read
            </span>
            <ul className="rs-tags"><li className="rs-tag rs-tag--mod">{p.category}</li></ul>
          </div>
        </div>
      </section>

      {/* article + author sidebar */}
      <section className="dms-section rs-block">
        <div className="dms-wrap rs-article">
          <div className="rs-article__main" data-reveal>
            <Blocks body={p.body} />
          </div>
          <aside className="rs-article__aside" data-reveal>
            <div className="rs-author">
              <span className="rs-author__lab">Author</span>
              <div className="rs-author__head">
                <Avatar author={p.author} cls="rs-author__ava" />
                <div>
                  <div className="rs-author__name">{p.author.name}</div>
                  <div className="rs-author__role">{p.author.role}, Unifize</div>
                </div>
              </div>
              <p className="rs-author__bio">
                {p.author.name} writes about the practice of quality in regulated
                manufacturing and helps build Unifize.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap">
          <h2 className="rs-relhead">More from the blog</h2>
          <div className="rs-grid rs-grid--3" data-reveal>
            {relatedAll.map((o) => <PostCard key={o.slug} p={o} />)}
          </div>
        </div>
      </section>

      <ResourceCTA
        heading="Reading about it is one thing. Watch it work."
        sub="Book a demo and see connected collaboration on your own processes."
        ctaSecondary={{ label: "Watch customer videos", href: "/explorations/resources/testimonials" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
