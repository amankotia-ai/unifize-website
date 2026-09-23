/* ----------------------------------------------------------------------------
 * home-entry-marks.tsx - three small isometric drawings, one above each of
 * the router cards in 01 (22 Sep 2026). Same axis and the same face / side /
 * accent recipe as the product-suite stack mark (home-stack-mark.tsx), so the
 * page keeps one drawing hand. Each one is a scene, not an icon:
 *
 *   solution  - a process on a plate: a step forks into two parallel steps
 *               and joins again at the step that closes it (accent)
 *   product   - a system on a plate: four modules of different heights, the
 *               one under evaluation raised and accented
 *   industry  - a plant on a plate: a hall under a sawtooth roof, a loading
 *               door, and a storage tank beside it
 *
 * Everything is projected from one iso world (x down-right, y down-left, z
 * up) and painted back to front. No text, no gradients. Server module.
 * -------------------------------------------------------------------------- */

const ISO = 0.8660254;

type Pt = readonly [number, number];
type Box = { x: [number, number]; y: [number, number]; z: [number, number] };
type Frame = { ox: number; oy: number };

function project(x: number, y: number, z: number, f: Frame): Pt {
  return [f.ox + (x - y) * ISO, f.oy + (x + y) * 0.5 - z];
}

function poly(points: Pt[], close = true) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ") + (close ? "Z" : "");
}

/* one box: the y=y1 face (front-left), the x=x1 face (front-right), the top */
function IsoBox({ box, f, accent, className }: { box: Box; f: Frame; accent?: boolean; className?: string }) {
  const [x0, x1] = box.x;
  const [y0, y1] = box.y;
  const [z0, z1] = box.z;
  const p = (x: number, y: number, z: number) => project(x, y, z, f);
  return (
    <g className={["hm-isomark__box", accent ? "hm-isomark__box--accent" : "", className ?? ""].join(" ").trim()}>
      <path className="hm-isomark__side" d={poly([p(x0, y1, z0), p(x1, y1, z0), p(x1, y1, z1), p(x0, y1, z1)])} />
      <path className="hm-isomark__side hm-isomark__side--r" d={poly([p(x1, y0, z0), p(x1, y1, z0), p(x1, y1, z1), p(x1, y0, z1)])} />
      <path className="hm-isomark__face" d={poly([p(x0, y0, z1), p(x1, y0, z1), p(x1, y1, z1), p(x0, y1, z1)])} />
    </g>
  );
}

/* the ground plate every scene stands on, with its cast shadow */
function Plate({ box, f }: { box: Box; f: Frame }) {
  const [x0, x1] = box.x;
  const [y0, y1] = box.y;
  const z = box.z[0];
  const p = (x: number, y: number) => project(x, y, z, f);
  return (
    <>
      <path className="hm-isomark__shadow" d={poly([p(x0, y0), p(x1, y0), p(x1, y1), p(x0, y1)])} />
      <IsoBox box={box} f={f} />
    </>
  );
}

/* a route drawn on the plate: a polyline in the ground plane */
function Route({ points, f, z = 0 }: { points: [number, number][]; f: Frame; z?: number }) {
  return <path className="hm-isomark__route" d={poly(points.map(([x, y]) => project(x, y, z, f)), false)} />;
}

const VIEW = "0 0 132 96";

/* ------------------------------------------------------------------ solution */
export function EntryMarkSolution() {
  const f = { ox: 66, oy: 44 };
  const T = 12; /* tile side */
  const tile = (x: number, y: number, z = 4): Box => ({ x: [x, x + T], y: [y, y + T], z: [0, z] });
  /* a fork and a join: A -> (B | C) -> D */
  const A = tile(-2, 6);
  const B = tile(22, -10);
  const C = tile(22, 22);
  const D = tile(46, 6, 7);
  const mid = (t: Box): [number, number] => [(t.x[0] + t.x[1]) / 2, (t.y[0] + t.y[1]) / 2];
  const [ax, ay] = mid(A);
  const [bx, by] = mid(B);
  const [cx, cy] = mid(C);
  const [dx, dy] = mid(D);
  const k1 = (A.x[1] + B.x[0]) / 2;
  const k2 = (B.x[1] + D.x[0]) / 2;
  return (
    <svg className="hm-isomark" viewBox={VIEW} aria-hidden="true">
      <Plate box={{ x: [-12, 68], y: [-20, 44], z: [-4, 0] }} f={f} />
      <Route points={[[ax, ay], [k1, ay], [k1, by], [bx, by], [k2, by], [k2, dy], [dx, dy]]} f={f} />
      <Route points={[[ax, ay], [k1, ay], [k1, cy], [cx, cy], [k2, cy], [k2, dy], [dx, dy]]} f={f} />
      <IsoBox box={B} f={f} />
      <IsoBox box={A} f={f} />
      <IsoBox box={C} f={f} />
      <IsoBox box={D} f={f} accent />
    </svg>
  );
}

/* ------------------------------------------------------------------- product */
export function EntryMarkProduct() {
  const f = { ox: 66, oy: 42 };
  const M = 18; /* module footprint */
  const G = 5; /* gap */
  const mod = (i: number, j: number, h: number): Box => ({
    x: [i * (M + G), i * (M + G) + M],
    y: [j * (M + G), j * (M + G) + M],
    z: [0, h],
  });
  return (
    <svg className="hm-isomark" viewBox={VIEW} aria-hidden="true">
      <Plate box={{ x: [-8, 2 * M + G + 8], y: [-8, 2 * M + G + 8], z: [-4, 0] }} f={f} />
      <IsoBox box={mod(0, 0, 10)} f={f} />
      <IsoBox box={mod(1, 0, 20)} f={f} accent />
      <IsoBox box={mod(0, 1, 15)} f={f} />
      <IsoBox box={mod(1, 1, 7)} f={f} />
    </svg>
  );
}

/* ------------------------------------------------------------------ industry */
function Hall({ f }: { f: Frame }) {
  const x0 = 0, x1 = 40, y0 = 8, y1 = 34;
  const z0 = 0, z1 = 12, rh = 7;
  const xm = (x0 + x1) / 2;
  const p = (x: number, y: number, z: number) => project(x, y, z, f);
  const gable = poly([p(x0, y1, z0), p(x1, y1, z0), p(x1, y1, z1), p(xm, y1, z1 + rh), p(xm, y1, z1), p(x0, y1, z1 + rh)]);
  const right = poly([p(x1, y0, z0), p(x1, y1, z0), p(x1, y1, z1), p(x1, y0, z1)]);
  const slopeA = poly([p(x0, y0, z1 + rh), p(xm, y0, z1), p(xm, y1, z1), p(x0, y1, z1 + rh)]);
  const slopeB = poly([p(xm, y0, z1 + rh), p(x1, y0, z1), p(x1, y1, z1), p(xm, y1, z1 + rh)]);
  /* the loading door on the end wall */
  const door = poly([p(6, y1, z0), p(15, y1, z0), p(15, y1, 7.5), p(6, y1, 7.5)]);
  return (
    <g className="hm-isomark__box">
      <path className="hm-isomark__side" d={gable} />
      <path className="hm-isomark__side hm-isomark__side--r" d={right} />
      <path className="hm-isomark__door" d={door} />
      <g className="hm-isomark__box--accent">
        <path className="hm-isomark__face" d={slopeA} />
        <path className="hm-isomark__face" d={slopeB} />
      </g>
    </g>
  );
}

function Tank({ cx, cy, r, h, f }: { cx: number; cy: number; r: number; h: number; f: Frame }) {
  const rx = r * Math.SQRT2 * ISO;
  const ry = r * Math.SQRT2 * 0.5;
  const [px, base] = project(cx, cy, 0, f);
  const top = base - h;
  const body = `M${(px - rx).toFixed(2)},${top.toFixed(2)} L${(px - rx).toFixed(2)},${base.toFixed(2)} A${rx.toFixed(2)},${ry.toFixed(2)} 0 0 0 ${(px + rx).toFixed(2)},${base.toFixed(2)} L${(px + rx).toFixed(2)},${top.toFixed(2)}Z`;
  return (
    <g className="hm-isomark__box">
      <path className="hm-isomark__side" d={body} />
      <ellipse className="hm-isomark__face" cx={px} cy={top} rx={rx} ry={ry} />
    </g>
  );
}

export function EntryMarkIndustry() {
  const f = { ox: 60, oy: 40 };
  return (
    <svg className="hm-isomark" viewBox={VIEW} aria-hidden="true">
      <Plate box={{ x: [-8, 62], y: [-2, 44], z: [-4, 0] }} f={f} />
      <Hall f={f} />
      <Tank cx={52} cy={20} r={5.5} h={19} f={f} />
    </svg>
  );
}

export const ENTRY_MARKS = {
  solution: <EntryMarkSolution />,
  product: <EntryMarkProduct />,
  industry: <EntryMarkIndustry />,
} as const;
