/* ============================================================================
 * industry-icons.tsx — the drawn industry pictogram set, shared with the
 * homepage's industry registry (home/page.tsx INDUSTRY_ICON_PATHS): solid
 * geometric silhouettes with negative-space cutouts, all on the same 24 grid
 * so a row of them reads as one drawn set. The domain template's by-industry
 * fan-out keys them by the display name each row already carries, so the
 * data files need no new field; an unknown name renders a neutral mark.
 * ========================================================================== */

import type { ReactNode } from "react";

const PATHS: Record<string, ReactNode> = {
  "medical-devices": (
    <path
      fillRule="evenodd"
      d="M12 20.8C7.1 16.7 3.4 13.4 3.4 9.3 3.4 6.1 5.7 3.9 8.4 3.9c1.4 0 2.8.7 3.6 1.8.8-1.1 2.2-1.8 3.6-1.8 2.7 0 5 2.2 5 5.4 0 4.1-3.7 7.4-8.6 11.5zM10.9 7.9h2.2v2h2v2.2h-2v2h-2.2v-2h-2V9.9h2z"
    />
  ),
  pharmaceuticals: (
    <g transform="rotate(45 12 12)">
      <path
        fillRule="evenodd"
        d="M7.2 8.6h9.6a3.4 3.4 0 0 1 0 6.8H7.2a3.4 3.4 0 0 1 0-6.8zM11.2 8.6h1.6v6.8h-1.6z"
      />
    </g>
  ),
  cro: (
    <path
      fillRule="evenodd"
      d="M9 2.8h6v1.7h4.2v16.7H4.8V4.5H9zm1.95 13.5L7.8 13.15l1.5-1.5 1.65 1.65 3.75-3.75 1.5 1.5z"
    />
  ),
  laboratories: (
    <path
      fillRule="evenodd"
      d="M9.6 2.8h4.8v1.8h-1v4.2l5 9.6c.65 1.25-.25 2.8-1.65 2.8H7.25c-1.4 0-2.3-1.55-1.65-2.8l5-9.6V4.6h-1zM12 15.4a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zm-1.8-2.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
    />
  ),
  chemicals: (
    <path
      fillRule="evenodd"
      d="M12 2.6l8.2 4.7v9.4L12 21.4l-8.2-4.7V7.3zm0 6.3a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2z"
    />
  ),
  cosmetics: <path d="M9.2 3.4l5.6 2.6v4.6H9.2zM8.2 10.6h7.6v3H8.2zM6.6 13.6h10.8v7.4H6.6z" />,
  "food-processing": (
    <path d="M13.1 6.1c.3-2.1 2-3.5 4.2-3.5-.1 2.2-1.6 3.8-4.2 3.5zM11.3 3.9h1.4c-.1 1.4 0 2.5.3 3.6h-2c.3-1.1.4-2.2.3-3.6zM8.6 6.6c1.2 0 2.4.5 3.4 1.5 1-1 2.2-1.5 3.4-1.5 2.8 0 4.7 2.3 4.7 5.2 0 3.9-2.8 8.9-5.2 8.9-.9 0-1.5-.5-2.9-.5s-2 .5-2.9.5c-2.4 0-5.2-5-5.2-8.9 0-2.9 1.9-5.2 4.7-5.2z" />
  ),
  "nutritional-supplements": (
    <path
      fillRule="evenodd"
      d="M8 2.8h8v2.9h1.6v15.5H6.4V5.7H8zm1.3 9.7h5.4a1.5 1.5 0 0 1 0 3H9.3a1.5 1.5 0 0 1 0-3z"
    />
  ),
  automotive: (
    <path
      fillRule="evenodd"
      d="M2.6 17.2v-4.6c0-.7.5-1.3 1.1-1.5l1.7-.5 1.6-3.5c.4-.9 1.3-1.5 2.3-1.5h5.4c1 0 1.9.6 2.3 1.5l1.6 3.5 1.7.5c.7.2 1.1.8 1.1 1.5v4.6zM7.7 13.1a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zm8.6 0a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8z"
    />
  ),
  aerospace: (
    <path d="M11.2 2.9c.2-.8 1.4-.8 1.6 0l1.4 4.8 7 4.2v2.7l-6.7-2-.5 4.6 2.5 1.9v2.2L12 19.9l-4.5 1.4v-2.2l2.5-1.9-.5-4.6-6.7 2v-2.7l7-4.2z" />
  ),
  "industrial-machinery": (
    <path
      fillRule="evenodd"
      d="M10.7 2.5h2.6l.5 2.2c.6.2 1.2.4 1.7.8l2.1-.9 1.8 1.8-.9 2.1c.3.5.6 1.1.8 1.7l2.2.5v2.6l-2.2.5c-.2.6-.4 1.2-.8 1.7l.9 2.1-1.8 1.8-2.1-.9c-.5.3-1.1.6-1.7.8l-.5 2.2h-2.6l-.5-2.2c-.6-.2-1.2-.4-1.7-.8l-2.1.9-1.8-1.8.9-2.1c-.3-.5-.6-1.1-.8-1.7l-2.2-.5v-2.6l2.2-.5c.2-.6.4-1.2.8-1.7l-.9-2.1 1.8-1.8 2.1.9c.5-.3 1.1-.6 1.7-.8zM12 9.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2z"
    />
  ),
};

/* display name → pictogram key, covering every name the domain fan-outs use */
const BY_NAME: Record<string, string> = {
  "Medical devices": "medical-devices",
  Pharmaceuticals: "pharmaceuticals",
  "Contract research orgs": "cro",
  Laboratories: "laboratories",
  Chemicals: "chemicals",
  Cosmetics: "cosmetics",
  "Food processing": "food-processing",
  "Nutritional supplements": "nutritional-supplements",
  Automotive: "automotive",
  Aerospace: "aerospace",
  "Industrial machinery": "industrial-machinery",
};

/* neutral mark for a name outside the drawn set (never blank) */
const FALLBACK = (
  <path
    fillRule="evenodd"
    d="M4 4h16v16H4zm3.2 3.2v9.6h9.6V7.2z"
  />
);

export function IndustryIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[BY_NAME[name] ?? ""] ?? FALLBACK}
    </svg>
  );
}
