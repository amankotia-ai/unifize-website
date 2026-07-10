/* ============================================================================
 * /explorations/resources/blog/[slug] - a single article. Compact masthead
 * (category, title, dek, byline), a constrained prose column with a drop-cap
 * lead and ruled section heads, a filed-under line, an author card, and related.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter, pad2 } from "../../_shared/resource-chrome";
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

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function Avatar({ author, cls }: { author: Author; cls: string }) {
  return author.img ? <img className={cls} src={author.img} alt="" /> : <span className={cls + " " + cls + "--mono"} aria-hidden="true">{initials(author.name)}</span>;
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
      <ResourceMast
        trail={[{ label: "Blog", href: "/explorations/resources/blog" }, { label: p.category }]}
        kicker={p.category}
        title={p.title}
        desc={p.dek}
        compact
      >
        <div className="rs-byline">
          <Avatar author={p.author} cls="rs-byline__ava" />
          <span className="rs-byline__who">
            <span className="rs-byline__name">{p.author.name}</span>
            <span className="rs-byline__role">{p.author.role}</span>
          </span>
          <span className="rs-byline__sep" aria-hidden="true" />
          <span className="rs-byline__meta">{p.dateLabel} · {p.readMins} min read</span>
        </div>
      </ResourceMast>

      {/* article */}
      <section className="dms-section rs-block">
        <div className="dms-wrap rs-article">
          <div data-reveal>
            <Blocks body={p.body} />
            <div className="rs-filed">
              <span className="rs-filed__lab">Filed under</span>
              <span className="rs-tag rs-tag--mod">{p.category}</span>
            </div>
            <div className="rs-author">
              <Avatar author={p.author} cls="rs-author__ava" />
              <div>
                <div className="rs-author__name">{p.author.name}</div>
                <div className="rs-author__role">{p.author.role} at Unifize</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap">
          <div className="rs-blocklabel"><span className="rs-blocklabel__t">More field notes</span></div>
          <ol className="rs-related" data-reveal>
            {relatedAll.map((o, i) => (
              <li className="rs-related__row" key={o.slug}>
                <Link href={`/explorations/resources/blog/${o.slug}`} className="rs-related__link">
                  <span className="rs-related__idx dms-data">{pad2(i + 1)}</span>
                  <h3 className="rs-related__title">{o.title}</h3>
                  <span className="rs-related__meta">{o.category} · {o.readMins} min</span>
                  <svg className="rs-related__arrow" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path strokeLinecap="square" d="m8 4 6 6-6 6" /></svg>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ResourceCTA heading="Reading about it is one thing. Watch it work." ctaSecondary={{ label: "Watch customer stories", href: "/explorations/resources/testimonials" }} />
      <ResourceFooter />
    </ResourceShell>
  );
}
