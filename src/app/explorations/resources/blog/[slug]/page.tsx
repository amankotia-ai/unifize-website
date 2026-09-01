/* ============================================================================
 * /explorations/resources/blog/[slug] - a single article in the article
 * grammar: a centered display title with a date/read/author meta row, a
 * full-width category plate where the hero image would sit, a centered prose
 * column, a quiet author strip, then related posts.
 * ========================================================================== */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { Crumb, BandHead, ResourceCTA, ResourceFooter } from "../../_shared/resource-chrome";
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
      {/* centered article mast + full-width category plate */}
      <section className="dms-section rs-artmast">
        <div className="dms-wrap rs-artmast__inner">
          <Crumb trail={[{ label: "Blog", href: "/explorations/resources/blog" }]} center />
          <span className="rs-tag rs-tag--mod">{p.category}</span>
          <h1 className="rs-artmast__title">{p.title}</h1>
          <p className="rs-artmast__meta">{p.dateLabel} · {p.readMins} min read · {p.author.name}</p>
        </div>
        <div className="dms-wrap">
          <div className="rs-artplate" aria-hidden="true">
            <span className="rs-artplate__cat">{p.category}</span>
            <span className="rs-artplate__dek">{p.dek}</span>
          </div>
        </div>
      </section>

      {/* centered article column + author strip */}
      <section className="dms-section rs-block rs-artbodywrap">
        <div className="dms-wrap">
          <div className="rs-artbody" data-reveal>
            <Blocks body={p.body} />
            <div className="rs-artauthor">
              <Avatar author={p.author} cls="rs-author__ava" />
              <div className="rs-artauthor__who">
                <span className="rs-artauthor__name">{p.author.name}</span>
                <span className="rs-artauthor__role">{p.author.role}, Unifize · writes about the practice of quality in regulated manufacturing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap">
          <BandHead title="More from the blog" link={{ label: "View all", href: "/explorations/resources/blog" }} />
          <div className="rs-grid rs-grid--3" data-reveal>
            {relatedAll.map((o) => <PostCard key={o.slug} p={o} />)}
          </div>
        </div>
      </section>

      <ResourceCTA
        heading="Reading about it is one thing. Watch it work."
        sub="Book a demo and see connected collaboration on your own processes."
        ctaSecondary={{ label: "Watch customer stories", href: "/explorations/resources/testimonials" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
