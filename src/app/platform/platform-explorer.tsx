"use client";

import { useEffect, useRef, useState } from "react";
import { MatrixGrid, type CellState } from "@/components/atoms";
import { cn } from "@/lib/cn";

export interface DetailBlock {
  label: string;
  /** When variant is "chips", body is split on "|" into individual chips. */
  body: string;
  variant?: "text" | "chips";
}

export interface ExploreItem {
  num: string;
  title: string;
  description: string;
  /** Optional paragraph shown above the detail blocks when expanded. */
  longDescription?: string;
  /** Per-item structured detail blocks rendered inside the accordion body. */
  details?: DetailBlock[];
  meta?: string;
  href?: string;
}

export interface ExploreSection {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  blurb: string;
  /** 14 × 7 pixel-art glyph rendered in the section's sticky aside. */
  pattern: CellState[];
  items: ExploreItem[];
}

interface PlatformExplorerProps {
  sections: ExploreSection[];
}

/**
 * Celonis-style platform exploration.
 * Top: horizontal section subnav (sticky under the site header).
 * Body: per-section block with a sticky left label and a right column
 *       of accordion items (title + short desc + plus icon, expands to
 *       a longer pitch and a deep-link).
 */
export function PlatformExplorer({ sections }: PlatformExplorerProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => (e.target as HTMLElement).id);
        if (visible.length > 0) {
          setActive(visible[0]);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    for (const id of Object.keys(sectionsRef.current)) {
      const el = sectionsRef.current[id];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="platform-subnav" aria-label="Platform sections">
        <div className="platform-subnav-inner">
          <span className="psnav-label">Explore</span>
          <div className="psnav-links">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn("psnav-link", active === s.id && "is-on")}
              >
                <span className="psnav-num">{s.num}</span>
                {s.eyebrow}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          ref={(el) => {
            sectionsRef.current[section.id] = el;
          }}
          className="section white explore-section"
        >
          <div className="explore-inner">
            <aside className="explore-aside">
              <div className="explore-glyph" aria-hidden="true">
                <MatrixGrid cols={14} rows={7} cells={section.pattern} />
              </div>
              <h2 className="explore-title">{section.title}</h2>
              <p className="explore-blurb">{section.blurb}</p>
            </aside>
            <div className="explore-list">
              {section.items.map((item) => (
                <ExploreAccordion key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function ExploreAccordion({ item }: { item: ExploreItem }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={cn("explore-item", open && "is-open")}>
      <button
        type="button"
        className="explore-item-row"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="explore-item-head">
          <span className="explore-item-num">{item.num}</span>
          <div className="explore-item-text">
            <h3 className="explore-item-title">{item.title}</h3>
            <p className="explore-item-desc">{item.description}</p>
          </div>
        </div>
        <span className="explore-item-plus" aria-hidden="true">
          <span className="bar h" />
          <span className="bar v" />
        </span>
      </button>
      <div className="explore-item-body" hidden={!open}>
        {item.longDescription ? (
          <p className="explore-item-long">{item.longDescription}</p>
        ) : null}
        {item.details && item.details.length > 0 ? (
          <dl className="explore-item-details">
            {item.details.map((d, i) => (
              <div
                key={`${d.label}-${i}`}
                className={cn(
                  "explore-item-detail",
                  d.variant === "chips" && "is-chips",
                )}
              >
                <dt className="explore-item-detail-label">{d.label}</dt>
                <dd className="explore-item-detail-body">
                  {d.variant === "chips" ? (
                    <span className="explore-item-detail-chips">
                      {d.body
                        .split("|")
                        .map((chip) => chip.trim())
                        .filter(Boolean)
                        .map((chip, j) => (
                          <span key={j} className="explore-item-detail-chip">
                            {chip}
                          </span>
                        ))}
                    </span>
                  ) : (
                    d.body
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="explore-item-foot">
          {item.meta ? (
            <span className="explore-item-meta">{item.meta}</span>
          ) : (
            <span />
          )}
          {item.href ? (
            <a href={item.href} className="explore-item-link">
              Open {item.title}
              <span className="arr">→</span>
            </a>
          ) : (
            <span className="explore-item-link is-stub">
              Page in progress
              <span className="arr">→</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
