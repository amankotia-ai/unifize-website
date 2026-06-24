"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TestimonialFollowUp {
  /** Mono uppercase label (e.g. "DTC issuer · AUM"). */
  lab: ReactNode;
  quote: ReactNode;
  who: ReactNode;
}

export interface TestimonialSlide {
  /** Customer wordmark (rendered with letter-spacing). */
  brand: ReactNode;
  quote: ReactNode;
  name: ReactNode;
  role: ReactNode;
  /** Optional caption for the photo cell. Defaults to "Customer portrait · 4:5". */
  photoLabel?: ReactNode;
  followUps?: [TestimonialFollowUp, TestimonialFollowUp];
}

export interface TestimonialCarouselProps {
  /** Section eyebrow numeral (e.g. "08"). */
  num?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  slides: TestimonialSlide[];
  /** Surface tone. Defaults to "beige" (warm customer band). */
  tone?: "beige" | "dark";
  className?: string;
}

const ChevronLeft = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 3 5 7 9 11" />
  </svg>
);

const ChevronRight = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="5 3 9 7 5 11" />
  </svg>
);

/**
 * O.24 — Testimonial · photo. Carousel with prev/next arrows.
 * Lead quote + photo cell, plus two follow-up quotes below.
 * Beige surface — trust + warmth read together (F.10).
 */
export function TestimonialCarousel({
  num,
  eyebrow,
  title,
  slides,
  tone = "beige",
  className,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const count = slides.length;

  return (
    <div className={cn("testi-band", tone === "dark" && "dark", className)}>
      <div className="testi-head">
        <div>
          {(num || eyebrow) && (
            <span className="section-eyebrow">
              {num !== undefined && <span className="num">{num}</span>}
              {eyebrow}
            </span>
          )}
          {title && <h2 className="section-title">{title}</h2>}
        </div>
        <div className="testi-arrows">
          <button
            type="button"
            aria-label="Previous customer"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            disabled={count < 2}
          >
            {ChevronLeft}
          </button>
          <button
            type="button"
            aria-label="Next customer"
            onClick={() => setIndex((i) => (i + 1) % count)}
            disabled={count < 2}
          >
            {ChevronRight}
          </button>
        </div>
      </div>

      {slide && (
        <>
          <div className="testi-lead">
            <div className="body">
              <div className="brand">{slide.brand}</div>
              <blockquote>{slide.quote}</blockquote>
              <div className="who-name">{slide.name}</div>
              <div className="who-role">{slide.role}</div>
            </div>
            <div className="photo matrix-dots">
              <span className="placeholder-label">
                {slide.photoLabel ?? "Customer portrait · 4:5"}
              </span>
            </div>
          </div>

          {slide.followUps && (
            <div className="testi-follow">
              {slide.followUps.map((f, i) => (
                <div className="card" key={i}>
                  <p className="lab">{f.lab}</p>
                  <blockquote>{f.quote}</blockquote>
                  <div className="who">{f.who}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
