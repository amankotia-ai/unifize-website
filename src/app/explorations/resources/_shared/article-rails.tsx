"use client";
/* ----------------------------------------------------------------------------
 * article-rails.tsx - the two interactive pieces of the blog article on the
 * rails (24 Sep 2026, after luthor.ai's article page):
 *   ArticleToc   the sticky contents list; the heading in view is marked
 *                with the blue square of the rails eyebrow (never a coloured
 *                edge, per the one-sided-border rule).
 *   ShareRow     LinkedIn / X share links and a copy-link button.
 * -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      // the last heading whose top has crossed a line a third down the screen
      const line = window.innerHeight * 0.32;
      let current = items[0]?.id ?? "";
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="ar-toc" aria-label="Contents">
      <span className="ar-label">Contents</span>
      <ol className="ar-toc__list">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={"ar-toc__link" + (it.id === active ? " is-active" : "")}
              aria-current={it.id === active ? "location" : undefined}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the link is still in the address bar */
    }
  };

  return (
    <div className="ar-share">
      <span className="ar-label">Share</span>
      <a className="ar-share__btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M3.6 5.6H1.2V14h2.4V5.6ZM2.4 1.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM14.8 9.3c0-2.3-1.2-3.9-3.4-3.9-1.1 0-1.9.6-2.2 1.2V5.6H6.8V14h2.4V9.8c0-1.1.2-2.2 1.6-2.2 1.3 0 1.4 1.3 1.4 2.3V14h2.4V9.3Z" /></svg>
      </a>
      <a className="ar-share__btn" href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M12.2 1.5h2.2L9.6 7l5.6 7.5h-4.4L7.4 9.9l-3.9 4.6H1.3l5.1-5.9L1 1.5h4.5l3.1 4.1 3.6-4.1Zm-.8 11.7h1.2L4.8 2.7H3.5l7.9 10.5Z" /></svg>
      </a>
      <button type="button" className="ar-share__btn" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.6" d="m3 8.5 3.2 3L13 4.5" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.4" d="M5.5 5.5V2.5h8v8h-3M2.5 5.5h8v8h-8z" /></svg>
        )}
      </button>
      <span className="ar-share__note" aria-live="polite">{copied ? "Link copied" : ""}</span>
    </div>
  );
}
