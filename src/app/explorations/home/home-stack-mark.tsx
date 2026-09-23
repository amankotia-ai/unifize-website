/* ----------------------------------------------------------------------------
 * home-stack-mark.tsx - a small mark above the product-suite head: three
 * plain slabs on the same isometric axis as the platform page's exploded
 * stack, nothing drawn on them (22 Sep 2026: the run of centred type from
 * the customer band into the suite had "very little break in visual
 * pacing"; the first cut borrowed the whole platform drawing and was ruled
 * "much simpler, smaller, more minimal"). The top slab carries the accent;
 * the two under it are the layer every product runs on. Server module, no
 * state, no dependencies.
 * -------------------------------------------------------------------------- */

const ISO = 0.8660254;
const SIZE = 40; /* half-side of each slab in iso space */
const RADIUS = 5;
const DEPTH = 5;
const CX = 80;
const STEP = 20; /* vertical pitch between slabs */
const TOP_Y = 46;

/* the rounded square's outline, sampled around each corner so the extruded
 * sides stay flush with the face at the corners (as the platform drawing
 * does it) */
const CORNERS: [number, number, number][] = [
  [SIZE - RADIUS, -SIZE + RADIUS, -90],
  [SIZE - RADIUS, SIZE - RADIUS, 0],
  [-SIZE + RADIUS, SIZE - RADIUS, 90],
  [-SIZE + RADIUS, -SIZE + RADIUS, 180],
];
const OUTLINE = CORNERS.flatMap(([x, y, start]) =>
  Array.from({ length: 9 }, (_, i) => {
    const angle = ((start + (i * 90) / 8) * Math.PI) / 180;
    return [x + RADIUS * Math.cos(angle), y + RADIUS * Math.sin(angle)] as const;
  }),
);

function project(cy: number) {
  return OUTLINE.map(([x, y]) => [CX + (x - y) * ISO, cy + (x + y) * 0.5] as const);
}

function contour(points: readonly (readonly [number, number])[], drop = 0) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${(y + drop).toFixed(2)}`).join(" ") + "Z";
}

function Slab({ cy, top }: { cy: number; top?: boolean }) {
  const points = project(cy);
  /* the visible extrusion: the lower half of the outline, dropped by DEPTH */
  const lower = points.filter(([, y]) => y >= cy - 0.5);
  const side =
    contour(lower) .replace(/Z$/, "") +
    " " +
    [...lower].reverse().map(([x, y]) => `L${x.toFixed(2)},${(y + DEPTH).toFixed(2)}`).join(" ") +
    "Z";
  return (
    <g className={"hm-stackmark__slab" + (top ? " hm-stackmark__slab--top" : "")}>
      <path className="hm-stackmark__side" d={side} />
      <path className="hm-stackmark__face" d={contour(points)} />
    </g>
  );
}

export function HomeStackMark() {
  return (
    <svg className="hm-stackmark" viewBox="0 0 160 136" role="img" aria-label="Three stacked layers: the platform under every product">
      {/* back to front */}
      <Slab cy={TOP_Y + STEP * 2} />
      <Slab cy={TOP_Y + STEP} />
      <Slab cy={TOP_Y} top />
    </svg>
  );
}
