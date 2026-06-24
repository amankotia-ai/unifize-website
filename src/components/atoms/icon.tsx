import { type SVGAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * F.06 — Line-icon set. 14×14 nominal, drawn at 1.4 stroke.
 * Rendered inside a 20×20 SVG so the strokes have room to breathe.
 */

export type IconName =
  | "thread"
  | "commit"
  | "check"
  | "x"
  | "trace"
  | "doc"
  | "shield"
  | "clock"
  | "people"
  | "trend"
  | "search"
  | "lock"
  | "settings"
  | "bell"
  | "folder"
  | "ext";

const PATHS: Record<IconName, React.ReactElement> = {
  thread: (
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  commit: (
    <>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2 8h3M11 8h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
  check: (
    <path
      d="M3 8l3 3 7-7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  x: (
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  trace: (
    <>
      <circle cx="3" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="13" cy="8" r="1.5" fill="currentColor" />
      <path d="M4.5 8h2M9.5 8h2" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  doc: (
    <>
      <rect
        x="3"
        y="2"
        width="10"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M6 6h4M6 9h4M6 12h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
  shield: (
    <path
      d="M8 2l5 3v4c0 2.5-2 4.5-5 5-3-.5-5-2.5-5-5V5l5-3z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  clock: (
    <>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 5v3l2 1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
  people: (
    <>
      <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7l5-2.5M5.5 9l5 2.5" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  trend: (
    <>
      <path
        d="M2 13l4-4 3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6h4v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  search: (
    <>
      <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 10l3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
  lock: (
    <>
      <rect
        x="3"
        y="7"
        width="10"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5.5 7V5a2.5 2.5 0 015 0v2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </>
  ),
  settings: (
    <>
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
  bell: (
    <path
      d="M4 11V8a4 4 0 018 0v3l1 2H3l1-2zM6.5 13a1.5 1.5 0 003 0"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  folder: (
    <path
      d="M2 5a1 1 0 011-1h3l2 2h6a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1V5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  ext: (
    <path
      d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export const ICON_NAMES = Object.keys(PATHS) as IconName[];

export interface IconProps
  extends Omit<SVGAttributes<SVGSVGElement>, "name" | "children"> {
  name: IconName;
  size?: number;
}

export function Icon({
  name,
  size = 20,
  className,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(className)}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
