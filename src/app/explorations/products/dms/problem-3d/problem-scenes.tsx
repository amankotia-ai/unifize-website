"use client";

/* ----------------------------------------------------------------------------
 * problem-scenes.tsx - the four DMS problem symptoms as studio-grade 3D
 * scenes (react-three-fiber). Documents are real objects: their faces are
 * canvas-rendered with the page's own fonts, so the type lives ON the paper.
 * Lighting is a procedural lightformer studio; the lens is physical glass.
 *
 * Each scene's entrance acts out its own idea instead of a generic lift:
 *   retrieval - the lens arrives, then the copies fly in along the routes
 *   versions  - one aligned stack splits into three competing copies
 *   drift     - both lines draw themselves and the gap opens between them
 *   audit     - evidence flies in from everywhere but only reaches orbit
 * Reduced motion renders everything settled and still.
 * -------------------------------------------------------------------------- */

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Billboard,
  Edges,
  Environment,
  Float,
  Html,
  Lightformer,
  Line,
  RoundedBox,
} from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";
import type { DmsProblemIllustrationKind } from "../dms-problem-visuals";

/* dms-problems tokens, resolved from oklch to hex for WebGL */
const C = {
  accent: "#1c72d6",
  accentDeep: "#0a3fd6",
  accentGlow: "#79a7ff",
  surface: "#fdfdff",
  blueSoft: "#d5e5ff",
  line: "#969faf",
  lineSoft: "#c4cede",
  ink: "#232936",
  inkSoft: "#4c5464",
  bar: "#e2e8f2",
};

type SceneProps = { staticMode: boolean };

const v3 = (p: [number, number, number]) => new THREE.Vector3(...p);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c = 1.2;
  const x = t - 1;
  return 1 + (c + 1) * x * x * x + c * x * x;
};

/* ---- canvas textures ----------------------------------------------------
 * Faces are drawn with the page's real font stacks. Textures are cached at
 * module level and redrawn once webfonts finish loading. */

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

let FONTS: { sans: string; display: string; mono: string } | null = null;
function fonts() {
  if (!FONTS) {
    const read = (name: string, fallback: string) => {
      if (typeof window === "undefined") return fallback;
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return value || fallback;
    };
    FONTS = {
      sans: read("--u-font", "Inter, sans-serif"),
      display: read("--u-display", "Inter, sans-serif"),
      mono: read("--u-mono", "ui-monospace, monospace"),
    };
  }
  return FONTS;
}

function setTracking(ctx: CanvasRenderingContext2D, px: number) {
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${px}px`;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const c = ctx as CanvasRenderingContext2D & {
    roundRect?: (x: number, y: number, w: number, h: number, r: number) => void;
  };
  ctx.beginPath();
  if (c.roundRect) c.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

const texCache = new Map<string, THREE.CanvasTexture>();
const texRegistry: { tex: THREE.CanvasTexture; draw: DrawFn }[] = [];
let fontsHooked = false;

function canvasTexture(key: string, w: number, h: number, draw: DrawFn) {
  const cached = texCache.get(key);
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  texCache.set(key, tex);
  texRegistry.push({ tex, draw });
  if (!fontsHooked && typeof document !== "undefined" && document.fonts) {
    fontsHooked = true;
    document.fonts.ready.then(() => {
      for (const entry of texRegistry) {
        const c = entry.tex.image as HTMLCanvasElement;
        const cx = c.getContext("2d");
        if (!cx) continue;
        cx.clearRect(0, 0, c.width, c.height);
        entry.draw(cx, c.width, c.height);
        entry.tex.needsUpdate = true;
      }
    });
  }
  return tex;
}

/* one printed text bar */
function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = C.bar;
  rrect(ctx, x, y, w, h, h / 2);
  ctx.fill();
}

type Stamp = { text: string; kind: "accent" | "muted" | "dashed" };
type DocSpec = {
  eyebrow?: string;
  title?: string;
  code?: string;
  lines?: number[];
  stamp?: Stamp;
  check?: string;
  tint?: number;
};

function drawDoc(spec: DocSpec): DrawFn {
  return (ctx, W, H) => {
    const f = fonts();
    const P = Math.round(W * 0.115);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    if (spec.check) {
      /* evidence card: blue check disc, caps label, two bars */
      const r = W * 0.062;
      const cy = H * 0.32;
      ctx.fillStyle = C.accent;
      ctx.beginPath();
      ctx.arc(P + r, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = W * 0.02;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(P + r * 0.52, cy + r * 0.02);
      ctx.lineTo(P + r * 0.9, cy + r * 0.42);
      ctx.lineTo(P + r * 1.52, cy - r * 0.38);
      ctx.stroke();
      ctx.fillStyle = C.inkSoft;
      ctx.font = `640 ${W * 0.056}px ${f.mono}`;
      setTracking(ctx, W * 0.007);
      ctx.fillText(spec.check, P + r * 2 + W * 0.05, cy + W * 0.021);
      setTracking(ctx, 0);
      const ly = H * 0.64;
      bar(ctx, P, ly, (W - 2 * P) * 0.92, W * 0.021);
      bar(ctx, P, ly + W * 0.08, (W - 2 * P) * 0.6, W * 0.021);
    } else {
      let y = P + W * 0.02;
      if (spec.eyebrow) {
        ctx.fillStyle = C.accent;
        ctx.font = `620 ${W * 0.042}px ${f.mono}`;
        setTracking(ctx, W * 0.007);
        ctx.fillText(spec.eyebrow, P, y + W * 0.042);
        setTracking(ctx, 0);
      }
      if (spec.code) {
        ctx.fillStyle = "#98a1b3";
        ctx.font = `500 ${W * 0.042}px ${f.mono}`;
        ctx.textAlign = "right";
        ctx.fillText(spec.code, W - P, y + W * 0.042);
        ctx.textAlign = "left";
      }
      if (spec.eyebrow || spec.code) y += W * 0.135;
      if (spec.title) {
        ctx.fillStyle = C.ink;
        ctx.font = `620 ${W * 0.1}px ${f.display}`;
        ctx.fillText(spec.title, P, y + W * 0.06);
        y += W * 0.16;
      }
      ctx.fillStyle = "#eef1f7";
      ctx.fillRect(P, y, W - 2 * P, Math.max(2, W * 0.004));
      y += W * 0.078;
      for (const frac of spec.lines ?? []) {
        bar(ctx, P, y, (W - 2 * P) * frac, W * 0.021);
        y += W * 0.07;
      }
      if (spec.stamp) {
        const sh = W * 0.135;
        const pad = W * 0.052;
        ctx.font = `650 ${W * 0.047}px ${f.mono}`;
        setTracking(ctx, W * 0.006);
        const tw = ctx.measureText(spec.stamp.text).width;
        const sx = P;
        const sy = H - P - sh;
        const sw = tw + pad * 2;
        rrect(ctx, sx, sy, sw, sh, W * 0.014);
        if (spec.stamp.kind === "accent") {
          ctx.fillStyle = C.accent;
          ctx.fill();
          ctx.fillStyle = "#ffffff";
        } else if (spec.stamp.kind === "dashed") {
          ctx.fillStyle = "rgba(0, 82, 255, 0.05)";
          ctx.fill();
          ctx.strokeStyle = C.accent;
          ctx.lineWidth = W * 0.0075;
          ctx.setLineDash([W * 0.022, W * 0.015]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = C.accent;
        } else {
          ctx.fillStyle = "#eef2f8";
          ctx.fill();
          ctx.fillStyle = "#5b6373";
        }
        ctx.fillText(spec.stamp.text, sx + pad, sy + sh * 0.65);
        setTracking(ctx, 0);
      }
    }

    if (spec.tint) {
      ctx.fillStyle = `rgba(226, 231, 240, ${spec.tint})`;
      ctx.fillRect(0, 0, W, H);
    }
  };
}

/* soft radial halo, replaces flat SVG circles */
const drawHalo: DrawFn = (ctx, W, H) => {
  const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
  g.addColorStop(0, "rgba(213, 229, 255, 0.85)");
  g.addColorStop(0.55, "rgba(213, 229, 255, 0.38)");
  g.addColorStop(1, "rgba(213, 229, 255, 0)");
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
};

/* a source system as a printed chip: thin-stroke glyph plus its name, drawn
 * together on the card face so the label can never detach from its object */
function drawSource(kind: "drive" | "qms" | "email", label: string): DrawFn {
  return (ctx, W, H) => {
    const f = fonts();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    const S = H * 0.44;
    ctx.lineWidth = S * 0.085;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#414b5e";
    ctx.save();
    ctx.translate(W * 0.1, (H - S) / 2);
    if (kind === "drive") {
      ctx.beginPath();
      ctx.moveTo(S * 0.06, S * 0.32);
      ctx.quadraticCurveTo(S * 0.06, S * 0.22, S * 0.16, S * 0.22);
      ctx.lineTo(S * 0.38, S * 0.22);
      ctx.lineTo(S * 0.48, S * 0.36);
      ctx.lineTo(S * 0.84, S * 0.36);
      ctx.quadraticCurveTo(S * 0.94, S * 0.36, S * 0.94, S * 0.46);
      ctx.lineTo(S * 0.94, S * 0.7);
      ctx.quadraticCurveTo(S * 0.94, S * 0.8, S * 0.84, S * 0.8);
      ctx.lineTo(S * 0.16, S * 0.8);
      ctx.quadraticCurveTo(S * 0.06, S * 0.8, S * 0.06, S * 0.7);
      ctx.closePath();
      ctx.stroke();
    } else if (kind === "qms") {
      ctx.beginPath();
      ctx.moveTo(S * 0.5, S * 0.08);
      ctx.lineTo(S * 0.86, S * 0.22);
      ctx.lineTo(S * 0.86, S * 0.5);
      ctx.quadraticCurveTo(S * 0.86, S * 0.74, S * 0.5, S * 0.92);
      ctx.quadraticCurveTo(S * 0.14, S * 0.74, S * 0.14, S * 0.5);
      ctx.lineTo(S * 0.14, S * 0.22);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = C.accent;
      ctx.beginPath();
      ctx.moveTo(S * 0.36, S * 0.47);
      ctx.lineTo(S * 0.46, S * 0.58);
      ctx.lineTo(S * 0.66, S * 0.36);
      ctx.stroke();
    } else {
      rrect(ctx, S * 0.08, S * 0.22, S * 0.84, S * 0.58, S * 0.07);
      ctx.stroke();
      ctx.strokeStyle = C.accent;
      ctx.beginPath();
      ctx.moveTo(S * 0.17, S * 0.3);
      ctx.lineTo(S * 0.5, S * 0.55);
      ctx.lineTo(S * 0.83, S * 0.3);
      ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle = C.inkSoft;
    ctx.font = `640 ${H * 0.21}px ${f.mono}`;
    setTracking(ctx, H * 0.028);
    ctx.textBaseline = "middle";
    ctx.fillText(label, W * 0.44, H * 0.55);
    setTracking(ctx, 0);
    ctx.textBaseline = "alphabetic";
  };
}

const drawQuestion: DrawFn = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = C.accent;
  ctx.font = `760 ${W * 0.82}px ${fonts().display}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("?", W / 2, H * 0.54);
};

const drawRibbon: DrawFn = (ctx, W, H) => {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "rgba(0, 82, 255, 0.15)");
  g.addColorStop(1, "rgba(0, 82, 255, 0.02)");
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
};

/* ---- object primitives -------------------------------------------------- */

/* a printed document: white slab whose front face is the drawn spec */
const paperSideMat = new THREE.MeshStandardMaterial({ color: "#e9eef7", envMapIntensity: 0.35, roughness: 0.76 });
const paperBackMat = new THREE.MeshStandardMaterial({ color: "#f7f9fd", envMapIntensity: 0.25, roughness: 0.84 });
const frontMatCache = new Map<string, THREE.MeshStandardMaterial>();

function DocSheet({
  w = 1.1,
  h = 1.5,
  texKey,
  spec,
}: {
  w?: number;
  h?: number;
  texKey: string;
  spec: DocSpec;
}) {
  const materials = useMemo(() => {
    let front = frontMatCache.get(texKey);
    if (!front) {
      const tex = canvasTexture(texKey, 512, Math.round((512 * h) / w), drawDoc(spec));
      front = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.72, envMapIntensity: 0.5 });
      frontMatCache.set(texKey, front);
    }
    return [paperSideMat, paperSideMat, paperSideMat, paperSideMat, front, paperBackMat];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texKey]);
  return (
    <mesh material={materials}>
      <boxGeometry args={[w, h, 0.035]} />
      <Edges scale={1.002} threshold={12}>
        <lineBasicMaterial color="#8792a3" opacity={0.2} toneMapped={false} transparent />
      </Edges>
    </mesh>
  );
}

function Halo({ size = 3.4, position }: { size?: number; position: [number, number, number] }) {
  const tex = useMemo(() => canvasTexture("halo", 256, 256, drawHalo), []);
  return (
    <mesh position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial depthWrite={false} map={tex} toneMapped={false} transparent />
    </mesh>
  );
}

/* a source system as a flat printed card, same family as the documents */
function SourceCard({ kind, label }: { kind: "drive" | "qms" | "email"; label: string }) {
  const materials = useMemo(() => {
    const key = `src-${kind}`;
    let front = frontMatCache.get(key);
    if (!front) {
      const tex = canvasTexture(key, 512, 293, drawSource(kind, label));
      front = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, envMapIntensity: 0.52 });
      frontMatCache.set(key, front);
    }
    return [paperSideMat, paperSideMat, paperSideMat, paperSideMat, front, paperBackMat];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);
  return (
    <mesh material={materials}>
      <boxGeometry args={[1.05, 0.6, 0.07]} />
      <Edges scale={1.002} threshold={12}>
        <lineBasicMaterial color="#7f8a9c" opacity={0.22} toneMapped={false} transparent />
      </Edges>
      <mesh position={[-0.5, 0, 0.042]}>
        <boxGeometry args={[0.035, 0.42, 0.012]} />
        <meshBasicMaterial color={C.accent} toneMapped={false} />
      </mesh>
    </mesh>
  );
}

/* a quiet expanding ring used to mark decisions and process changes */
function SignalRing({
  delay = 0,
  position,
  size = 0.28,
  staticMode,
}: {
  delay?: number;
  position: [number, number, number];
  size?: number;
  staticMode: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const start = useRef<number | null>(null);
  useFrame(({ clock }) => {
    const ring = ref.current;
    const material = materialRef.current;
    if (!ring || !material) return;
    if (staticMode) {
      ring.scale.setScalar(1.1);
      material.opacity = 0.2;
      return;
    }
    if (start.current === null) start.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - start.current - delay;
    ring.visible = elapsed >= 0;
    if (elapsed < 0) return;
    const phase = (elapsed % 2.8) / 2.8;
    ring.scale.setScalar(0.82 + easeOutCubic(phase) * 0.75);
    material.opacity = 0.24 * (1 - phase);
  });
  return (
    <mesh position={position} ref={ref} visible={staticMode}>
      <ringGeometry args={[size, size + 0.025, 72]} />
      <meshBasicMaterial
        color={C.accentGlow}
        depthWrite={false}
        opacity={staticMode ? 0.2 : 0}
        ref={materialRef}
        side={THREE.DoubleSide}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
}

/* minimal caption; type stays in the design system via problem-3d.css */
function Chip({
  children,
  className,
  delay = 0,
  position,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  position: [number, number, number];
}) {
  return (
    <Html center distanceFactor={8} position={position} zIndexRange={[20, 0]}>
      <span
        className={"dms3d-chip" + (className ? " " + className : "")}
        style={{ "--d": `${delay}s` } as React.CSSProperties}
      >
        {children}
      </span>
    </Html>
  );
}

/* ---- motion helpers ------------------------------------------------------ */

/* choreographed entrance: the group travels from an offset pose (position /
 * rotation deltas, start scale) to its authored place. Wrap the final layout;
 * `from` describes where it comes from. */
function Enter({
  delay = 0,
  duration = 0.6,
  ease = easeOutCubic,
  from,
  staticMode,
  children,
}: {
  delay?: number;
  duration?: number;
  ease?: (t: number) => number;
  from?: { position?: [number, number, number]; rotation?: [number, number, number]; scale?: number };
  staticMode: boolean;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  const fp = from?.position ?? [0, 0, 0];
  const fr = from?.rotation ?? [0, 0, 0];
  const fs = from?.scale ?? 1;
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    if (staticMode) {
      g.position.set(0, 0, 0);
      g.rotation.set(0, 0, 0);
      g.scale.setScalar(1);
      g.visible = true;
      return;
    }
    if (start.current === null) start.current = clock.elapsedTime;
    const raw = (clock.elapsedTime - start.current - delay) / duration;
    const e = ease(clamp01(raw));
    g.visible = raw > 0;
    const k = 1 - e;
    g.position.set(fp[0] * k, fp[1] * k, fp[2] * k);
    g.rotation.set(fr[0] * k, fr[1] * k, fr[2] * k);
    g.scale.setScalar(fs + (1 - fs) * e);
  });
  return (
    <group ref={ref} visible={staticMode}>
      {children}
    </group>
  );
}

/* idle float unless reduced motion is on */
function Drifting({
  staticMode,
  intensity = 1,
  children,
}: {
  staticMode: boolean;
  intensity?: number;
  children: ReactNode;
}) {
  if (staticMode) return <group>{children}</group>;
  return (
    <Float
      floatIntensity={0.32 * intensity}
      floatingRange={[-0.045 * intensity, 0.045 * intensity]}
      rotationIntensity={0.12 * intensity}
      speed={1.05}
    >
      {children}
    </Float>
  );
}

/* dashed route that fades in and keeps flowing toward its destination */
function FlowRoute({
  from,
  mid,
  to,
  delay = 0,
  staticMode,
}: {
  from: [number, number, number];
  mid: [number, number, number];
  to: [number, number, number];
  delay?: number;
  staticMode: boolean;
}) {
  const ref = useRef<Line2>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const start = useRef<number | null>(null);
  const curve = useMemo(
    () => new THREE.QuadraticBezierCurve3(v3(from), v3(mid), v3(to)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const pts = useMemo(() => curve.getPoints(40), [curve]);
  useFrame(({ clock }, dt) => {
    const line = ref.current;
    const pulse = pulseRef.current;
    const pulseMaterial = pulseMaterialRef.current;
    if (!line || !pulse || !pulseMaterial) return;
    const mat = line.material;
    if (staticMode) {
      mat.opacity = 0.65;
      pulse.position.copy(curve.getPointAt(0.82));
      pulse.visible = true;
      pulseMaterial.opacity = 0.82;
      return;
    }
    if (start.current === null) start.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - start.current - delay;
    mat.opacity = 0.65 * easeOutCubic(clamp01(elapsed / 0.5));
    mat.dashOffset -= dt * 0.16;
    pulse.visible = elapsed >= 0;
    if (elapsed < 0) return;
    const phase = (elapsed * 0.34) % 1;
    pulse.position.copy(curve.getPointAt(phase));
    pulseMaterial.opacity = 0.5 + Math.sin(phase * Math.PI) * 0.5;
  });
  return (
    <group>
      <Line
        color={C.line}
        dashSize={0.085}
        dashed
        gapSize={0.13}
        lineWidth={1}
        opacity={0}
        points={pts}
        ref={ref}
        transparent
      />
      <mesh ref={pulseRef} visible={staticMode}>
        <sphereGeometry args={[0.052, 20, 20]} />
        <meshBasicMaterial
          color={C.accent}
          opacity={staticMode ? 0.82 : 0}
          ref={pulseMaterialRef}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}

/* dashed line that only fades in (no flow), for the orbit ring */
function FadeDashLine({
  points,
  delay = 0,
  staticMode,
}: {
  points: THREE.Vector3[];
  delay?: number;
  staticMode: boolean;
}) {
  const ref = useRef<Line2>(null);
  const start = useRef<number | null>(null);
  useFrame(({ clock }, dt) => {
    const line = ref.current;
    if (!line) return;
    if (staticMode) {
      line.material.opacity = 0.55;
      return;
    }
    if (start.current === null) start.current = clock.elapsedTime;
    line.material.opacity =
      0.55 * easeOutCubic(clamp01((clock.elapsedTime - start.current - delay) / 0.6));
    line.material.dashOffset -= dt * 0.035;
  });
  return (
    <Line
      color={C.line}
      dashSize={0.1}
      dashed
      gapSize={0.15}
      lineWidth={1}
      opacity={0}
      points={points}
      ref={ref}
      transparent
    />
  );
}

/* draws an indexed geometry progressively along its length (tube, ribbon) */
function DrawGeometry({
  geometry,
  delay = 0,
  duration = 1,
  staticMode,
  children,
}: {
  geometry: THREE.BufferGeometry;
  delay?: number;
  duration?: number;
  staticMode: boolean;
  children: ReactNode;
}) {
  const start = useRef<number | null>(null);
  const total = geometry.index ? geometry.index.count : 0;
  useFrame(({ clock }) => {
    if (staticMode) {
      geometry.setDrawRange(0, Infinity);
      return;
    }
    if (start.current === null) start.current = clock.elapsedTime;
    const t = easeOutCubic(clamp01((clock.elapsedTime - start.current - delay) / duration));
    geometry.setDrawRange(0, Math.floor((t * total) / 3) * 3);
  });
  return <mesh geometry={geometry}>{children}</mesh>;
}

/* slow idle sway only; the camera never reacts to the pointer */
function CameraRig({ staticMode }: SceneProps) {
  useFrame((state) => {
    if (staticMode) return;
    const t = state.clock.elapsedTime;
    const tx = Math.sin(t * 0.15) * 0.1;
    const ty = 0.42 + Math.cos(t * 0.12) * 0.055;
    state.camera.position.x += (tx - state.camera.position.x) * 0.04;
    state.camera.position.y += (ty - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* procedural studio: soft key above, cool bounce left, white rim right */
function StudioEnv() {
  return (
    <Environment frames={1} resolution={256}>
      <Lightformer color="#ffffff" intensity={2} position={[0, 4, 4]} rotation={[-Math.PI / 2.7, 0, 0]} scale={[10, 6, 1]} />
      <Lightformer color="#deecff" intensity={1.2} position={[-6, 1, 2]} rotation={[0, Math.PI / 3.2, 0]} scale={[6, 8, 1]} />
      <Lightformer color="#ffffff" intensity={0.9} position={[6, 0, 1]} rotation={[0, -Math.PI / 3, 0]} scale={[5, 7, 1]} />
    </Environment>
  );
}

/* ---- 01 · retrieval: one query, five places ----------------------------- *
 * Entrance: the sources are already there, the lens arrives to ask, and the
 * copies fly back along the routes into the glass - the search happening. */

function RetrievalScene({ staticMode }: SceneProps) {
  return (
    <group position={[0, 0.12, 0]}>
      <FlowRoute delay={0.55} from={[-2.38, 1.15, 0]} mid={[-0.7, 0.95, 0.2]} staticMode={staticMode} to={[0.75, 0.3, 0.2]} />
      <FlowRoute delay={0.62} from={[-2.38, 0, 0]} mid={[-0.8, 0, 0.2]} staticMode={staticMode} to={[0.7, 0.02, 0.2]} />
      <FlowRoute delay={0.69} from={[-2.38, -1.15, 0]} mid={[-0.7, -0.95, 0.2]} staticMode={staticMode} to={[0.75, -0.26, 0.2]} />

      {([
        { kind: "drive", label: "DRIVE" },
        { kind: "qms", label: "QMS" },
        { kind: "email", label: "EMAIL" },
      ] as const).map((src, i) => (
        <Enter delay={i * 0.08} duration={0.5} from={{ position: [0, -0.35, 0], scale: 0.95 }} key={src.kind} staticMode={staticMode}>
          <Drifting intensity={0.6} staticMode={staticMode}>
            <group position={[-3.0, 1.15 - i * 1.15, 0]} rotation={[0, 0.16, 0]}>
              <SourceCard kind={src.kind} label={src.label} />
            </group>
          </Drifting>
        </Enter>
      ))}

      {/* the lens: one query, and every place answers with its own copy */}
      <group position={[1.85, 0, 0.35]}>
        <Drifting intensity={0.55} staticMode={staticMode}>
          {/* the glass arrives first, empty */}
          <Enter delay={0.12} duration={0.6} ease={easeOutBack} from={{ rotation: [0, 0, -0.45], scale: 0.55 }} staticMode={staticMode}>
            <Halo position={[0, 0.05, -1.1]} size={4} />
            <SignalRing delay={0.5} position={[0, 0.04, -0.86]} size={1.13} staticMode={staticMode} />
            <group rotation={[0, 0, -0.08]}>
              <mesh>
                <torusGeometry args={[1, 0.078, 24, 96]} />
                <meshStandardMaterial color={C.accentDeep} envMapIntensity={1.3} metalness={0.35} roughness={0.2} />
              </mesh>
              <mesh>
                <torusGeometry args={[0.9, 0.014, 16, 96]} />
                <meshBasicMaterial color={C.accentGlow} opacity={0.72} toneMapped={false} transparent />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.93, 0.93, 0.05, 64]} />
                <meshPhysicalMaterial
                  attenuationColor={C.blueSoft}
                  attenuationDistance={1.35}
                  clearcoat={1}
                  clearcoatRoughness={0.08}
                  envMapIntensity={1}
                  ior={1.5}
                  roughness={0.06}
                  thickness={0.35}
                  transmission={0.96}
                />
              </mesh>
              <mesh position={[0.9, -0.9, 0]} rotation={[0, 0, Math.PI / 4]}>
                <capsuleGeometry args={[0.075, 0.76, 8, 20]} />
                <meshStandardMaterial color={C.accentDeep} envMapIntensity={1.3} metalness={0.35} roughness={0.2} />
              </mesh>
            </group>
          </Enter>

          {/* then the copies fly in along the routes, one per source */}
          <Enter delay={0.75} duration={0.7} from={{ position: [-2.5, 0.75, -0.1], rotation: [0, 0.4, 0.2], scale: 0.9 }} staticMode={staticMode}>
            <group position={[-0.62, 0.12, -0.56]} rotation={[0.02, 0.22, 0.12]}>
              <DocSheet h={1.26} spec={{ title: "SOP-014", lines: [0.8, 0.55, 0.68], tint: 0.35 }} texKey="ret-copy-a" w={0.94} />
            </group>
          </Enter>
          <Enter delay={0.9} duration={0.7} from={{ position: [-2.6, -0.75, -0.1], rotation: [0, 0.4, -0.2], scale: 0.9 }} staticMode={staticMode}>
            <group position={[0.58, -0.1, -0.5]} rotation={[0, -0.18, -0.11]}>
              <DocSheet h={1.26} spec={{ title: "SOP-014", lines: [0.8, 0.55, 0.68], tint: 0.45 }} texKey="ret-copy-b" w={0.94} />
            </group>
          </Enter>
          <Enter delay={1.05} duration={0.7} from={{ position: [-2.7, 0, -0.05], rotation: [0, 0.45, 0], scale: 0.9 }} staticMode={staticMode}>
            <group position={[-0.02, 0, -0.42]} rotation={[0, -0.04, 0.015]}>
              <DocSheet
                h={1.42}
                spec={{
                  eyebrow: "CONTROLLED SOP",
                  title: "SOP-014",
                  lines: [0.85, 0.62, 0.74],
                  stamp: { text: "3 RESULTS", kind: "dashed" },
                }}
                texKey="ret-lens"
                w={1.06}
              />
            </group>
          </Enter>

          <Chip delay={0.45} position={[0, 1.55, 0]}>ONE CONTROLLED SOP</Chip>
          <Chip delay={1.55} position={[-0.2, -1.62, 0]}>MULTIPLE RESULTS</Chip>
        </Drifting>
      </group>
    </group>
  );
}

/* ---- 02 · versions: three copies claim to be current -------------------- *
 * Entrance: one aligned stack appears - a single document - then splits
 * into three competing copies; only then does the point of use ask. */

function VersionsScene({ staticMode }: SceneProps) {
  const questionTex = useMemo(() => canvasTexture("question", 256, 320, drawQuestion), []);
  return (
    <group position={[0, 0.12, 0]}>
      <FlowRoute delay={1.35} from={[0.9, 0.4, 0.3]} mid={[1.75, 0.5, 0.3]} staticMode={staticMode} to={[2.35, 0.25, 0.3]} />
      <FlowRoute delay={1.45} from={[0.85, -0.4, 0.3]} mid={[1.75, -0.45, 0.3]} staticMode={staticMode} to={[2.35, -0.1, 0.3]} />

      {/* the stack materializes as one document, then fans apart */}
      <Enter delay={0} duration={0.45} from={{ position: [0, -0.3, 0], scale: 0.92 }} staticMode={staticMode}>
        {[
          {
            key: "ver-30",
            pos: [-2.2, -0.12, -0.8] as const,
            rot: [0.02, 0.36, 0.1] as const,
            split: { position: [1.3, 0.12, 0.41] as const, rotation: [-0.01, -0.31, -0.1] as const },
            spec: { eyebrow: "CONTROLLED SOP", title: "v3.0", code: "2024", lines: [0.85, 0.6, 0.72], stamp: { text: "FLOOR COPY", kind: "muted" as const }, tint: 0.45 },
          },
          {
            key: "ver-31",
            pos: [-1.05, -0.02, -0.35] as const,
            rot: [0.01, 0.18, 0.04] as const,
            split: { position: [0.15, 0.02, -0.01] as const, rotation: [0, -0.13, -0.04] as const },
            spec: { eyebrow: "CONTROLLED SOP", title: "v3.1", code: "DRAFT", lines: [0.85, 0.6, 0.72], stamp: { text: "WORKING COPY", kind: "muted" as const }, tint: 0.2 },
          },
          {
            key: "ver-32",
            pos: [0.12, -0.06, 0.15] as const,
            rot: [-0.01, -0.13, -0.055] as const,
            split: { position: [-1.02, 0.06, -0.48] as const, rotation: [0.02, 0.18, 0.055] as const },
            spec: { eyebrow: "CONTROLLED SOP", title: "v3.2", code: "CURRENT", lines: [0.85, 0.6, 0.72], stamp: { text: "EFFECTIVE", kind: "accent" as const } },
          },
        ].map((doc, i) => (
          <Enter
            delay={0.5}
            duration={0.85}
            from={{ position: [...doc.split.position], rotation: [...doc.split.rotation] }}
            key={doc.key}
            staticMode={staticMode}
          >
            <Drifting intensity={0.55 + i * 0.2} staticMode={staticMode}>
              <group position={[...doc.pos]} rotation={[...doc.rot]}>
                <DocSheet h={1.9} spec={doc.spec} texKey={doc.key} w={1.42} />
                {doc.key === "ver-32" ? (
                  <mesh position={[-0.685, 0, 0.048]}>
                    <boxGeometry args={[0.035, 1.64, 0.016]} />
                    <meshBasicMaterial color={C.accent} toneMapped={false} />
                  </mesh>
                ) : null}
              </group>
            </Drifting>
          </Enter>
        ))}
      </Enter>

      {/* the point of use only sees a question */}
      <Enter delay={1.1} duration={0.55} ease={easeOutBack} from={{ position: [0.4, 0, 0], scale: 0.8 }} staticMode={staticMode}>
        <Drifting intensity={0.6} staticMode={staticMode}>
          <group position={[2.6, 0.05, 0.15]}>
            <Halo position={[0, 0, -0.7]} size={2.9} />
            <SignalRing delay={1.3} position={[0, 0, -0.5]} size={0.74} staticMode={staticMode} />
            <RoundedBox args={[1.12, 1.42, 0.14]} radius={0.06} smoothness={4}>
              <meshPhysicalMaterial
                attenuationColor={C.blueSoft}
                attenuationDistance={1.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
                envMapIntensity={1}
                ior={1.5}
                roughness={0.08}
                thickness={0.4}
                transmission={0.94}
              />
              <Edges scale={1.004} threshold={12}>
                <lineBasicMaterial color={C.accent} opacity={0.26} toneMapped={false} transparent />
              </Edges>
            </RoundedBox>
            <mesh position={[0, 0.02, 0.09]}>
              <planeGeometry args={[0.72, 0.9]} />
              <meshBasicMaterial depthWrite={false} map={questionTex} toneMapped={false} transparent />
            </mesh>
            <Chip delay={1.55} position={[0, -1.18, 0]}>POINT OF USE</Chip>
          </group>
        </Drifting>
      </Enter>
    </group>
  );
}

/* ---- 03 · drift: the document freezes, the process keeps moving --------- *
 * Entrance: nothing is pre-placed. Both lines draw themselves left to
 * right; the gap ribbon opens between them as they separate, and each
 * change pops exactly when the process line reaches it. */

const DRIFT_CURVE_POINTS: [number, number, number][] = [
  [-2.6, 0.42, 0],
  [-1.1, 0.28, 0.1],
  [0.25, -0.28, 0.15],
  [1.6, -0.82, 0.1],
  [2.95, -1.05, 0],
];

function DriftScene({ staticMode }: SceneProps) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(DRIFT_CURVE_POINTS.map(v3)), []);
  const docLineGeom = useMemo(
    () => new THREE.TubeGeometry(new THREE.LineCurve3(v3([-2.55, 0.85, 0]), v3([2.7, 0.85, 0])), 40, 0.028, 10, false),
    [],
  );
  const processGeom = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.032, 12, false), [curve]);
  const processGlowGeom = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.075, 12, false), [curve]);
  const gapGeom = useMemo(() => {
    const pts = curve.getPoints(60);
    const pos = new Float32Array(pts.length * 2 * 3);
    const uv = new Float32Array(pts.length * 2 * 2);
    pts.forEach((p, i) => {
      pos.set([p.x, 0.85, p.z], i * 6);
      pos.set([p.x, p.y, p.z], i * 6 + 3);
      uv.set([i / (pts.length - 1), 1], i * 4);
      uv.set([i / (pts.length - 1), 0], i * 4 + 2);
    });
    const idx: number[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geom.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geom.setIndex(idx);
    geom.computeVertexNormals();
    return geom;
  }, [curve]);
  const ribbonTex = useMemo(() => canvasTexture("ribbon", 8, 256, drawRibbon), []);
  const nodeA = useMemo(() => curve.getPoint(0.46), [curve]);
  const nodeB = useMemo(() => curve.getPoint(0.74), [curve]);

  /* the process line draws over [0.25s, 1.55s]; changes pop as it passes */
  return (
    <group position={[0, 0.18, 0]}>
      {/* the document is issued... */}
      <Enter delay={0} duration={0.5} from={{ position: [0, -0.35, 0], scale: 0.94 }} staticMode={staticMode}>
        <Drifting intensity={0.5} staticMode={staticMode}>
          <group position={[-3.1, 0.72, 0.2]} rotation={[0, 0.32, 0.03]}>
            <DocSheet
              h={1.05}
              spec={{ eyebrow: "ISSUED 2021", title: "SOP-014", lines: [0.85, 0.6, 0.7] }}
              texKey="drift-issued"
              w={0.8}
            />
          </group>
        </Drifting>
      </Enter>

      {/* ...then both lines draw themselves and the gap opens between them */}
      <DrawGeometry delay={0.3} duration={0.9} geometry={docLineGeom} staticMode={staticMode}>
        <meshStandardMaterial color={C.inkSoft} roughness={0.5} />
      </DrawGeometry>
      <DrawGeometry delay={0.3} duration={1.25} geometry={processGlowGeom} staticMode={staticMode}>
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={C.accentGlow}
          depthWrite={false}
          opacity={0.16}
          toneMapped={false}
          transparent
        />
      </DrawGeometry>
      <DrawGeometry delay={0.3} duration={1.25} geometry={processGeom} staticMode={staticMode}>
        <meshStandardMaterial color={C.accent} envMapIntensity={1.1} metalness={0.2} roughness={0.28} />
      </DrawGeometry>
      <DrawGeometry delay={0.42} duration={1.25} geometry={gapGeom} staticMode={staticMode}>
        <meshBasicMaterial depthWrite={false} map={ribbonTex} side={THREE.DoubleSide} toneMapped={false} transparent />
      </DrawGeometry>

      {[
        { p: nodeA, label: "PROCESS CHANGE", delay: 0.82 },
        { p: nodeB, label: "CHANGES AGAIN", delay: 1.17 },
      ].map(({ p, label, delay }) => (
        <Enter delay={delay} duration={0.45} ease={easeOutBack} from={{ scale: 0.001 }} key={label} staticMode={staticMode}>
          <group position={[p.x, p.y, p.z]}>
            <SignalRing delay={delay + 0.16} position={[0, 0, -0.08]} size={0.19} staticMode={staticMode} />
            <mesh>
              <sphereGeometry args={[0.095, 32, 32]} />
              <meshStandardMaterial color={C.accent} envMapIntensity={1.2} metalness={0.25} roughness={0.2} />
            </mesh>
            <Chip delay={delay + 0.18} position={[0, -0.4, 0]}>{label}</Chip>
          </group>
        </Enter>
      ))}

      {/* where each line actually ends */}
      <Enter delay={1.15} duration={0.5} from={{ position: [0, 0.3, 0], scale: 0.9 }} staticMode={staticMode}>
        <Drifting intensity={0.5} staticMode={staticMode}>
          <group position={[3.15, 1, 0.15]} rotation={[0, -0.24, -0.02]}>
            <DocSheet
              h={0.98}
              spec={{ title: "SOP-014", lines: [0.8, 0.55], stamp: { text: "NO REVIEW", kind: "dashed" }, tint: 0.45 }}
              texKey="drift-frozen"
              w={0.74}
            />
          </group>
        </Drifting>
      </Enter>
      <Enter delay={1.5} duration={0.5} ease={easeOutBack} from={{ scale: 0.001 }} staticMode={staticMode}>
        <group position={[2.95, -1.05, 0]}>
          <SignalRing delay={1.7} position={[0, 0, -0.08]} size={0.34} staticMode={staticMode} />
          <mesh>
            <sphereGeometry args={[0.17, 32, 32]} />
            <meshStandardMaterial color={C.accent} envMapIntensity={1.2} metalness={0.25} roughness={0.2} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.32, 0.016, 12, 64]} />
            <meshStandardMaterial color={C.blueSoft} roughness={0.5} />
          </mesh>
          <Chip delay={1.7} position={[0, -0.56, 0]}>ACTUAL PROCESS</Chip>
        </group>
      </Enter>

      {/* the measurement between the two lines */}
      <Enter delay={1.35} duration={0.5} from={{ scale: 0.6 }} staticMode={staticMode}>
        <group position={[-1.45, 0, 0.14]}>
          <Line
            color={C.line}
            lineWidth={1}
            opacity={0.8}
            points={[
              [0, 0.8, 0],
              [0, 0.28, 0],
            ]}
            transparent
          />
          <Line
            color={C.line}
            lineWidth={1}
            opacity={0.8}
            points={[
              [0, -0.04, 0],
              [0, -0.5, 0],
            ]}
            transparent
          />
          <Chip className="dms3d-chip--accent" delay={1.5} position={[0, 0.12, 0]}>DRIFT</Chip>
        </group>
      </Enter>
    </group>
  );
}

/* ---- 04 · audit: evidence orbits a dossier it never quite lands in ------ *
 * Entrance: the dossier lands first; the evidence flies in from scattered
 * directions but only ever reaches the orbit - gathered, never bound. */

const EVIDENCE = ["REVISION HISTORY", "APPROVALS", "TRAINING", "SIGNATURES"];

function AuditOrbit({ staticMode }: SceneProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || staticMode) return;
    ref.current.rotation.y = clock.elapsedTime * 0.13 + 0.7;
  });
  const ringPts = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 2.5, 0, Math.sin(a) * 2.5));
    }
    return pts;
  }, []);

  return (
    <group rotation={[0.32, 0, -0.04]}>
      <FadeDashLine delay={0.4} points={ringPts} staticMode={staticMode} />
      <group ref={ref} rotation={[0, 0.7, 0]}>
        {EVIDENCE.map((label, i) => {
          const a = (i / EVIDENCE.length) * Math.PI * 2;
          const x = Math.cos(a);
          const z = Math.sin(a);
          return (
            <Line
              color={C.lineSoft}
              dashSize={0.06}
              dashed
              gapSize={0.12}
              key={`spoke-${label}`}
              lineWidth={0.7}
              opacity={0.38}
              points={[
                [x * 1.05, 0, z * 1.05],
                [x * 2.32, 0, z * 2.32],
              ]}
              transparent
            />
          );
        })}
        {EVIDENCE.map((label, i) => {
          const a = (i / EVIDENCE.length) * Math.PI * 2;
          return (
            <group key={label} position={[Math.cos(a) * 2.5, 0.06 * Math.sin(a * 2), Math.sin(a) * 2.5]}>
              <mesh position={[0, 0, -0.05]}>
                <sphereGeometry args={[0.052, 18, 18]} />
                <meshBasicMaterial color={C.accent} toneMapped={false} />
              </mesh>
              <Enter
                delay={0.5 + i * 0.16}
                duration={0.75}
                from={{
                  position: [Math.cos(a) * 1.9, i % 2 ? 1.6 : -1.4, Math.sin(a) * 1.9],
                  scale: 0.82,
                }}
                staticMode={staticMode}
              >
                <Billboard>
                  <DocSheet h={0.78} spec={{ check: label }} texKey={`ev-${i}`} w={1.14} />
                </Billboard>
              </Enter>
            </group>
          );
        })}
      </group>
    </group>
  );
}

function AuditScene({ staticMode }: SceneProps) {
  const coverMats = useMemo(() => {
    const tex = canvasTexture(
      "dossier-cover",
      512,
      Math.round((512 * 2.3) / 1.7),
      drawDoc({
        eyebrow: "AUDIT RECORD",
        title: "SOP DOSSIER",
        lines: [0.85, 0.62, 0.74],
        stamp: { text: "MISSING EVIDENCE", kind: "dashed" },
      }),
    );
    const front = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, envMapIntensity: 0.5 });
    const pages = new THREE.MeshStandardMaterial({ color: "#edf2fa", envMapIntensity: 0.28, roughness: 0.82 });
    return [pages, pages, pages, pages, front, paperBackMat];
  }, []);

  return (
    <group position={[0, 0.08, 0]}>
      <Halo position={[0, 0.1, -1.3]} size={4.6} />
      <SignalRing delay={0.28} position={[0, 0.08, -0.84]} size={1.22} staticMode={staticMode} />

      {/* the dossier lands first, waiting to be filled */}
      <Enter delay={0} duration={0.55} ease={easeOutBack} from={{ position: [0, 0.4, 0], scale: 0.72 }} staticMode={staticMode}>
        <Drifting intensity={0.45} staticMode={staticMode}>
          <group rotation={[0, -0.2, 0]}>
            <mesh material={coverMats} position={[0.05, 0, 0]}>
              <boxGeometry args={[1.7, 2.3, 0.3]} />
              <Edges scale={1.002} threshold={12}>
                <lineBasicMaterial color="#7f8a9c" opacity={0.2} toneMapped={false} transparent />
              </Edges>
            </mesh>
            <mesh position={[-0.84, 0, 0]}>
              <boxGeometry args={[0.14, 2.34, 0.34]} />
              <meshStandardMaterial color={C.accent} envMapIntensity={1.1} metalness={0.2} roughness={0.3} />
            </mesh>
            {[-0.72, 0, 0.72].map((y) => (
              <mesh key={y} position={[-0.86, y, 0.2]}>
                <sphereGeometry args={[0.035, 18, 18]} />
                <meshStandardMaterial color="#dce7f8" envMapIntensity={1.2} metalness={0.55} roughness={0.25} />
              </mesh>
            ))}
          </group>
        </Drifting>
      </Enter>

      <AuditOrbit staticMode={staticMode} />
    </group>
  );
}

/* ---- stage -------------------------------------------------------------- */

const SCENES: Record<DmsProblemIllustrationKind, (props: SceneProps) => ReactNode> = {
  retrieval: RetrievalScene,
  versions: VersionsScene,
  drift: DriftScene,
  audit: AuditScene,
  /* nearest-fit stand-ins until bespoke scenes exist for the new cards:
   * change reuses the diverging-lines story, training the orbiting evidence */
  change: DriftScene,
  training: AuditScene,
};

export function ProblemStage3D({
  kind,
  staticMode,
}: {
  kind: DmsProblemIllustrationKind;
  staticMode: boolean;
}) {
  const Scene = SCENES[kind];
  return (
    <Canvas
      camera={{ position: [0, 0.42, 8.3], fov: 30 }}
      dpr={[1, 2]}
      flat
      frameloop={staticMode ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.68} />
      <hemisphereLight color="#ffffff" groundColor={C.blueSoft} intensity={0.62} />
      <directionalLight
        intensity={2.15}
        position={[4, 7, 5]}
      />
      <directionalLight color={C.blueSoft} intensity={0.82} position={[-6, 2, 4]} />
      <directionalLight color="#ffffff" intensity={0.46} position={[5, -1, 3]} />
      <StudioEnv />
      <CameraRig staticMode={staticMode} />
      {/* remount per symptom so each scene replays its entrance */}
      <group key={kind}>
        <Scene staticMode={staticMode} />
      </group>
    </Canvas>
  );
}
