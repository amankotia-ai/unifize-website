type DmsIndustryIconProps = {
  industry: string;
};

/* Filled silhouettes keep this compact trust strip legible at small sizes. */
const INDUSTRY_ICON_PATHS: Record<string, React.ReactNode> = {
  "Medical Devices": (
    <path d="M9.25 2h5.5v7.25H22v5.5h-7.25V22h-5.5v-7.25H2v-5.5h7.25V2Z" />
  ),
  Pharmaceuticals: (
    <rect x="7" y="1" width="10" height="22" rx="5" transform="rotate(45 12 12)" />
  ),
  Laboratories: (
    <path d="M8 2h8v2h-1v5.15l5.53 9.58A2.18 2.18 0 0 1 18.64 22H5.36a2.18 2.18 0 0 1-1.89-3.27L9 9.15V4H8V2Zm.07 14-2.02 3.5h11.9L15.93 16H8.07Z" fillRule="evenodd" clipRule="evenodd" />
  ),
  Cosmetics: (
    <path d="M10.25 2h3.5A2.25 2.25 0 0 1 16 4.25V11H8V5.75C8 3.68 9.01 2 10.25 2ZM7 12h10v3H7v-3Zm-1 4h12v6H6v-6Z" />
  ),
  "Food Processing": (
    <path d="M3 22V10l6-4v4l6-4v4l6-4v16H3Zm3-7v3h3v-3H6Zm6 0v3h3v-3h-3Zm6 0v3h1v-3h-1Z" fillRule="evenodd" clipRule="evenodd" />
  ),
  Aerospace: (
    <path d="m21.5 14.1-7.5-6V4a2 2 0 1 0-4 0v4.1l-7.5 6v2.4l7.5-3.4V19l-2 1.5V22l4-1 4 1v-1.5L14 19v-5.9l7.5 3.4v-2.4Z" />
  ),
  Automotive: (
    <path d="M5.4 5.5h13.2l2.2 6.1c.75.38 1.2 1.17 1.2 2.05V19h-2v2h-3v-2H7v2H4v-2H2v-5.35c0-.88.45-1.67 1.2-2.05l2.2-6.1ZM6.8 8l-1.2 3.3h12.8L17.2 8H6.8ZM6 14a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm12 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" fillRule="evenodd" clipRule="evenodd" />
  ),
};

export function DmsIndustryIcon({ industry }: DmsIndustryIconProps) {
  const icon = INDUSTRY_ICON_PATHS[industry];

  if (!icon) return null;

  return (
    <svg
      className="dms-trust__icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {icon}
    </svg>
  );
}
