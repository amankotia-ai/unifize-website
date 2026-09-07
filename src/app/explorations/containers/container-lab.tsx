"use client";

/* ============================================================================
 * container-lab.tsx - ten container BACKGROUNDS for the product visual
 * engine, chosen to be things no other product site is using. The mock is
 * untouched (the engine's own window, one radius, one shadow); only the
 * field behind it changes:
 *
 *   01 guilloche   banknote engraving: spirograph curves in one ink
 *   02 flowfield   generative ink trails following a noise field
 *   03 caustics    water light on a pale floor (WebGL)
 *   04 silk        fine horizontal threads displaced by slow noise
 *   05 echo        the mock's own outline rippling outward
 *   06 blinds      afternoon light through blinds, sliding slowly
 *   07 turing      a reaction-diffusion pattern growing live
 *   08 foil        holographic security foil, muted
 *   09 papercut    layered paper strata with real shadow
 *   10 botanical   the blurred shadow of leaves on a warm wall
 *
 * One container per variant. The engine's blue plate is neutralised in
 * containers.css. Loops pause off screen and freeze under reduced motion.
 * ========================================================================== */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";
import { Eyebrow } from "../products/dms/dms-primitives";
import { HOME_HERO_QUALITY_CONFIG, HOME_HERO_DOCUMENT_CONFIG } from "../home/home-arcade";
import { PLATFORM_DASHBOARD_CONFIG } from "../platform/platform-arcade";

type SceneKey = "quality" | "document" | "dashboard";

const SCENES: { key: SceneKey; label: string; config: ArcadeStepConfig }[] = [
  { key: "quality", label: "Quality event", config: HOME_HERO_QUALITY_CONFIG },
  { key: "document", label: "Controlled document", config: HOME_HERO_DOCUMENT_CONFIG },
  { key: "dashboard", label: "Dashboard", config: PLATFORM_DASHBOARD_CONFIG },
];

/* ---------------------------------------------------------------- helpers */
function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/* generated SVG/canvas fields mount after hydration */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise2(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fitCanvas(canvas: HTMLCanvasElement, maxDpr = 1.5) {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  const changed = canvas.width !== w || canvas.height !== h;
  if (changed) {
    canvas.width = w;
    canvas.height = h;
  }
  return { dpr, changed };
}

/* rAF loop while on screen; a single frame under reduced motion */
function useLoop(ref: React.RefObject<HTMLElement | null>, frame: (t: number) => void) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reducedMotion()) {
      frame(0);
      return;
    }
    let raf = 0;
    let running = false;
    const start = performance.now();
    const tick = () => {
      frame((performance.now() - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.05 });
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ============================================================ 01 · guilloche
 * Hypotrochoids, the spirograph family banknotes are engraved with. */
function guilloche(R: number, r: number, d: number, turns: number, cx: number, cy: number) {
  const pts: string[] = [];
  const n = 2400;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2 * turns;
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
    pts.push(`${(cx + x).toFixed(1)},${(cy + y).toFixed(1)}`);
  }
  return "M" + pts.join("L");
}
const GUILLOCHE = [
  { R: 520, r: 121, d: 240, turns: 121 },
  { R: 470, r: 89, d: 190, turns: 89 },
  { R: 600, r: 151, d: 330, turns: 151 },
];
function GuillocheField() {
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <svg className="cx-fill" viewBox="0 0 1400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="cx-guilloche">
        {GUILLOCHE.map((g, i) => (
          <path key={i} d={guilloche(g.R, g.r, g.d, g.turns, 700, 360)} />
        ))}
      </g>
    </svg>
  );
}

/* ============================================================ 02 · flowfield
 * Ink particles stepped through a noise vector field, drawn once. */
function FlowField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const draw = () => {
      const { dpr } = fitCanvas(canvas, 1.5);
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.9 * dpr;
      ctx.lineCap = "round";
      const rand = lcg(7);
      for (let p = 0; p < 1400; p++) {
        let x = rand() * w, y = rand() * h;
        ctx.strokeStyle = `rgba(36, 44, 68, ${0.08 + rand() * 0.14})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let s = 0; s < 90; s++) {
          const a = noise2(x / (260 * dpr), y / (260 * dpr)) * Math.PI * 4;
          x += Math.cos(a) * 2.2 * dpr;
          y += Math.sin(a) * 2.2 * dpr;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);
  return <canvas ref={ref} className="cx-fill" aria-hidden="true" />;
}

/* ============================================================= 03 · caustics
 * Water light on a pale floor. Raw WebGL, no library. */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
const CAUSTIC_FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_t;
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 q = uv * vec2(u_res.x / u_res.y, 1.0) * 1.15;
  vec2 p = mod(q * 6.28318, 6.28318) - 250.0;
  float t = u_t * 0.35 + 23.0;
  vec2 i = p; float c = 1.0; float inten = 0.005;
  for (int n = 0; n < 5; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 5.0; c = 1.17 - pow(c, 1.4);
  float v = clamp(pow(abs(c), 8.0), 0.0, 1.0);
  vec3 base = vec3(0.83, 0.885, 0.9);
  vec3 tint = vec3(0.62, 0.84, 0.88);
  vec3 col = mix(base, tint, clamp(v * 1.6, 0.0, 1.0) * 0.5);
  col = mix(col, vec3(1.0), clamp(v * 1.4, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}`;
function CausticsField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const gl = useRef<{ ctx: WebGLRenderingContext; res: WebGLUniformLocation | null; time: WebGLUniformLocation | null } | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power", preserveDrawingBuffer: true });
    if (!ctx) return;
    const compile = (type: number, src: string) => {
      const s = ctx.createShader(type)!;
      ctx.shaderSource(s, src);
      ctx.compileShader(s);
      return s;
    };
    const prog = ctx.createProgram()!;
    ctx.attachShader(prog, compile(ctx.VERTEX_SHADER, VERT));
    ctx.attachShader(prog, compile(ctx.FRAGMENT_SHADER, CAUSTIC_FRAG));
    ctx.linkProgram(prog);
    if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) console.warn("caustics shader", ctx.getProgramInfoLog(prog));
    ctx.useProgram(prog);
    const buf = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), ctx.STATIC_DRAW);
    const loc = ctx.getAttribLocation(prog, "p");
    ctx.enableVertexAttribArray(loc);
    ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0);
    gl.current = { ctx, res: ctx.getUniformLocation(prog, "u_res"), time: ctx.getUniformLocation(prog, "u_t") };
    return () => {
      ctx.getExtension("WEBGL_lose_context")?.loseContext();
      gl.current = null;
    };
  }, []);
  useLoop(ref, (t) => {
    const canvas = ref.current;
    const g = gl.current;
    if (!canvas || !g) return;
    fitCanvas(canvas, 1);
    g.ctx.viewport(0, 0, canvas.width, canvas.height);
    g.ctx.uniform2f(g.res, canvas.width, canvas.height);
    g.ctx.uniform1f(g.time, t);
    g.ctx.drawArrays(g.ctx.TRIANGLE_STRIP, 0, 4);
  });
  return <canvas ref={ref} className="cx-fill" aria-hidden="true" />;
}

/* ================================================================= 04 · silk
 * Fine horizontal threads, each displaced by slow noise. */
function SilkField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useLoop(ref, (t) => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { dpr } = fitCanvas(canvas, 1.5);
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1 * dpr;
    ctx.strokeStyle = "rgba(38, 46, 72, 0.22)";
    const rows = 72;
    const step = 12 * dpr;
    for (let r = 0; r <= rows; r++) {
      const y0 = (r / rows) * h;
      ctx.beginPath();
      for (let x = -step; x <= w + step; x += step) {
        const n = noise2(x / (520 * dpr) + t * 0.05, r * 0.09 + t * 0.02);
        const y = y0 + (n - 0.5) * 120 * dpr;
        if (x === -step) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });
  return <canvas ref={ref} className="cx-fill" aria-hidden="true" />;
}

/* ================================================================= 05 · echo */
function EchoField() {
  return (
    <div className="cx-echo" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <i key={k} style={{ "--k": k } as CSSProperties} />
      ))}
    </div>
  );
}

/* =============================================================== 07 · turing
 * Gray-Scott reaction-diffusion on a small grid, upscaled by the browser. */
const RD_W = 220;
const RD_H = 110;
function TuringField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const sim = useRef<{ a: Float32Array; b: Float32Array; na: Float32Array; nb: Float32Array; img: ImageData; warm: boolean } | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = RD_W;
    canvas.height = RD_H;
    const n = RD_W * RD_H;
    const a = new Float32Array(n).fill(1);
    const b = new Float32Array(n);
    const rand = lcg(3);
    for (let s = 0; s < 26; s++) {
      const cx = Math.floor(rand() * RD_W), cy = Math.floor(rand() * RD_H);
      for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) {
        const xx = (cx + x + RD_W) % RD_W, yy = (cy + y + RD_H) % RD_H;
        b[yy * RD_W + xx] = 1;
      }
    }
    sim.current = { a, b, na: new Float32Array(n), nb: new Float32Array(n), img: ctx.createImageData(RD_W, RD_H), warm: false };
  }, []);

  const step = (s: NonNullable<typeof sim.current>, iters: number) => {
    const { a, b, na, nb } = s;
    const f = 0.055, k = 0.062, dA = 1, dB = 0.5;
    for (let it = 0; it < iters; it++) {
      for (let y = 0; y < RD_H; y++) {
        const yu = ((y - 1 + RD_H) % RD_H) * RD_W, yd = ((y + 1) % RD_H) * RD_W, yc = y * RD_W;
        for (let x = 0; x < RD_W; x++) {
          const xl = (x - 1 + RD_W) % RD_W, xr = (x + 1) % RD_W;
          const i = yc + x;
          const la = 0.2 * (a[yc + xl] + a[yc + xr] + a[yu + x] + a[yd + x]) + 0.05 * (a[yu + xl] + a[yu + xr] + a[yd + xl] + a[yd + xr]) - a[i];
          const lb = 0.2 * (b[yc + xl] + b[yc + xr] + b[yu + x] + b[yd + x]) + 0.05 * (b[yu + xl] + b[yu + xr] + b[yd + xl] + b[yd + xr]) - b[i];
          const abb = a[i] * b[i] * b[i];
          na[i] = a[i] + (dA * la - abb + f * (1 - a[i]));
          nb[i] = b[i] + (dB * lb + abb - (k + f) * b[i]);
        }
      }
      a.set(na);
      b.set(nb);
    }
  };

  useLoop(ref, () => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    const s = sim.current;
    if (!canvas || !ctx || !s) return;
    if (!s.warm) {
      step(s, 900);
      s.warm = true;
    } else {
      step(s, 3);
    }
    const d = s.img.data;
    for (let i = 0; i < RD_W * RD_H; i++) {
      const v = Math.max(0, Math.min(1, (s.b[i] - 0.12) * 3.2));
      d[i * 4] = 40; d[i * 4 + 1] = 48; d[i * 4 + 2] = 72; d[i * 4 + 3] = Math.round(v * 150);
    }
    ctx.putImageData(s.img, 0, 0);
  });
  return <canvas ref={ref} className="cx-fill cx-turing" aria-hidden="true" />;
}

/* ============================================================= 09 · papercut */
const PAPER_TONES = ["#f7f2ea", "#f0e8dc", "#e8ddcd", "#e0d2bf", "#d8c7b1", "#cfbba3", "#c6ae95"];
function wave(yb: number, amp: number, phase: number) {
  const segs = 5;
  const w = 1400 / segs;
  let d = `M-20 ${yb}`;
  for (let s = 0; s < segs + 1; s++) {
    const x0 = s * w - 20;
    const dir = (s + phase) % 2 === 0 ? 1 : -1;
    d += ` C${x0 + w * 0.35} ${yb + amp * dir} ${x0 + w * 0.65} ${yb - amp * dir} ${x0 + w} ${yb}`;
  }
  return d + " L1440 800 L-20 800 Z";
}
function PapercutField() {
  return (
    <svg className="cx-fill" viewBox="0 0 1400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {PAPER_TONES.map((tone, j) => (
        <path key={j} className="cx-paper" d={wave(20 + j * 104, 26 + (j % 3) * 10, j)} fill={tone} />
      ))}
    </svg>
  );
}

/* ============================================================ 10 · botanical */
const LEAF = "M0 0 C 26 -34, 78 -34, 108 0 C 78 34, 26 34, 0 0 Z";
const LEAVES = [
  { x: 0, y: 0, r: -28, s: 1.5 }, { x: 60, y: -110, r: -62, s: 1.25 }, { x: 140, y: -170, r: -20, s: 1.1 },
  { x: -40, y: -160, r: -110, s: 1.2 }, { x: 210, y: -240, r: -48, s: 1.0 }, { x: 40, y: -270, r: -84, s: 0.95 },
  { x: 160, y: -330, r: -14, s: 0.85 }, { x: -90, y: -290, r: -130, s: 0.9 },
];
function BotanicalField() {
  return (
    <svg className="cx-fill" viewBox="0 0 1400 720" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <filter id="cx-leafblur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <g className="cx-botanical" filter="url(#cx-leafblur)">
        <g transform="translate(1180 760)">
          <path d="M0 0 C -40 -140, -60 -260, -120 -420" className="cx-botanical__stem" />
          <path d="M-60 -260 C -20 -330, 20 -360, 90 -420" className="cx-botanical__stem" />
          {LEAVES.map((l, i) => (
            <path key={i} d={LEAF} transform={`translate(${l.x - 60} ${l.y - 40}) rotate(${l.r}) scale(${l.s})`} />
          ))}
        </g>
        <g transform="translate(120 780) scale(-1 1)">
          <path d="M0 0 C -30 -120, -40 -220, -90 -360" className="cx-botanical__stem" />
          {LEAVES.slice(0, 5).map((l, i) => (
            <path key={i} d={LEAF} transform={`translate(${l.x - 70} ${l.y - 20}) rotate(${l.r + 10}) scale(${l.s * 0.9})`} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------- the roster */
type Variant = { key: string; name: string; idea: string };
const VARIANTS: Variant[] = [
  { key: "guilloche", name: "Guilloché", idea: "Banknote engraving. Three spirograph curves in one ink, fine enough to read as a surface." },
  { key: "flowfield", name: "Flow field", idea: "Fourteen hundred ink trails stepped through a noise field, drawn once." },
  { key: "caustics", name: "Caustics", idea: "Water light moving on a pale floor. Live, in WebGL." },
  { key: "silk", name: "Silk", idea: "Seventy fine threads, each displaced by slow noise, so the surface breathes." },
  { key: "echo", name: "Echo", idea: "The record's own outline rippling outward and fading." },
  { key: "blinds", name: "Blinds", idea: "Afternoon light through blinds on a warm wall, sliding slowly." },
  { key: "turing", name: "Turing", idea: "A reaction-diffusion pattern, computed live, growing like coral." },
  { key: "foil", name: "Foil", idea: "Holographic security foil, muted almost to silver, turning slowly." },
  { key: "papercut", name: "Paper cut", idea: "Seven strata of cut paper, each casting a real shadow on the one below." },
  { key: "botanical", name: "Botanical", idea: "The blurred shadow of leaves on a warm wall, swaying." },
];

function Field({ k }: { k: string }) {
  switch (k) {
    case "guilloche": return <GuillocheField />;
    case "flowfield": return <FlowField />;
    case "caustics": return <CausticsField />;
    case "silk": return <SilkField />;
    case "echo": return <EchoField />;
    case "blinds": return (<><i className="cx-blinds__wall" /><i className="cx-blinds__light" /><i className="cx-grain" /></>);
    case "turing": return <TuringField />;
    case "foil": return (<><i className="cx-foil" /><i className="cx-foil__stripes" /><i className="cx-foil__veil" /></>);
    case "papercut": return <PapercutField />;
    case "botanical": return (<><i className="cx-botanical__wall" /><BotanicalField /><i className="cx-grain" /></>);
    default: return null;
  }
}

/* ----------------------------------------------------------------- the lab */
export function ContainerLab() {
  const [scene, setScene] = useState<SceneKey>("quality");
  const config = SCENES.find((s) => s.key === scene)!.config;

  return (
    <>
      <section className="dms-section cx-head" aria-label="Container lab">
        <div className="dms-wrap">
          <Eyebrow>Product visual engine · container lab</Eyebrow>
          <h1 className="dms-h2 cx-head__title">Ten fields behind the record.</h1>
          <p className="dms-lede cx-head__lede">
            The mock is untouched. Only the surface behind it changes, and none of these are surfaces you will find on
            another product site.
          </p>
          <div className="cx-seg" role="tablist" aria-label="Scene">
            {SCENES.map((s) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={scene === s.key}
                className={`cx-seg__btn${scene === s.key ? " is-active" : ""}`}
                onClick={() => setScene(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {VARIANTS.map((v, i) => (
        <section key={v.key} className="cx-row" id={v.key} aria-label={`${v.name} container`}>
          <div className="dms-wrap">
            <p className="cx-row__label">
              <span className="dms-data">{String(i + 1).padStart(2, "0")}</span>
              <b>{v.name}</b>
              <span>{v.idea}</span>
            </p>
            <div className={`cx-vis cx-vis--${v.key}`}>
              <div className="cx-field" aria-hidden="true"><Field k={v.key} /></div>
              <div className="cx-mock">
                <ArcadeStepScene config={config} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
