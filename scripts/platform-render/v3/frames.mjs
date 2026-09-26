/* frames.mjs - render exact frames of a v3 film scene through the cached
 * headless Chrome over CDP (no Playwright in the repo; Node 20 has no global
 * WebSocket, so next's bundled ws).
 *
 *   node frames.mjs SCENE.html OUT_DIR board 0.25,1.3,2.1     storyboard stills
 *   node frames.mjs SCENE.html OUT_DIR flat  seq:0:5:30       texture sequence
 *
 * board: 1600x720 viewport (the 20:9 hero box) at 2x, JPEG.
 * flat:  the 1360x660 window alone at --scale (default 4), PNG.
 *
 * Other films: --win=WxH (the scene's window, default 1360x660),
 * --vp=WxH (the board viewport, default 1600x720), --query=a=1&b=2 (extra
 * URL parameters, e.g. step=2 for a scene that holds several films).
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "../../..");
const WS = createRequire(path.join(REPO, "package.json"))("next/dist/compiled/ws");
const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const [scene, out, mode = "board", times = "0"] = process.argv.slice(2);
const scaleArg = process.argv.find(a => a.startsWith("--scale="));
const SCALE = scaleArg ? +scaleArg.split("=")[1] : 4;
const dsfArg = process.argv.find(a => a.startsWith("--dsf="));
const BOARD_DSF = dsfArg ? +dsfArg.split("=")[1] : 2;
const dims = (name, def) => { const a = process.argv.find(x => x.startsWith(`--${name}=`)); return a ? a.split("=")[1].split("x").map(Number) : def; };
const [WIN_W, WIN_H] = dims("win", [1360, 660]);
const [VP_W, VP_H] = dims("vp", [1600, 720]);
const qArg = process.argv.find(a => a.startsWith("--query="));
const QUERY = qArg ? `&${qArg.slice(8)}` : "";
const SEQ = times.startsWith("seq:");
mkdirSync(out, { recursive: true });

let list;
if (times.startsWith("seq:")) {
  const [, a, b, fps] = times.split(":").map(Number);
  list = [];
  for (let f = 0; a + f / fps < b - 1e-9; f++) list.push(a + f / fps);
} else list = times.split(",").map(Number);

const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(CHROME, ["--headless", `--remote-debugging-port=${port}`, "--hide-scrollbars", "--force-color-profile=srgb", "--allow-file-access-from-files", "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const sig of ["exit", "SIGINT", "SIGTERM"]) process.on(sig, () => { try { chrome.kill(); } catch {} });
process.on("uncaughtException", e => { console.error(e); try { chrome.kill(); } catch {} process.exit(1); });
process.on("unhandledRejection", e => { console.error(e); try { chrome.kill(); } catch {} process.exit(1); });

let target;
for (let i = 0; i < 60 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === "page"); } catch {}
}
const ws = new WS(target.webSocketDebuggerUrl);
await new Promise(r => ws.on("open", r));
let id = 0;
const pending = new Map();
ws.on("message", m => { const d = JSON.parse(m); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

const flat = mode === "flat";
await send("Emulation.setDeviceMetricsOverride", flat
  ? { width: WIN_W, height: WIN_H, deviceScaleFactor: SCALE, mobile: false }
  : { width: VP_W, height: VP_H, deviceScaleFactor: BOARD_DSF, mobile: false });
await send("Page.enable");
await send("Page.navigate", { url: `${pathToFileURL(path.resolve(scene)).href}?mode=${mode}${QUERY}` });
await sleep(1200);
await evaluate("document.fonts.ready.then(() => document.fonts.size)");

for (const [i, t] of list.entries()) {
  await evaluate(`(seek(${t}), new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))`);
  const shot = await send("Page.captureScreenshot", flat
    ? { format: "png", clip: { x: 0, y: 0, width: WIN_W, height: WIN_H, scale: 1 }, captureBeyondViewport: false }
    : SEQ ? { format: "png" } : { format: "jpeg", quality: 92 });
  const name = flat || SEQ ? `f${String(i).padStart(4, "0")}.png` : `t${t.toFixed(2)}.jpg`;
  writeFileSync(path.join(out, name), Buffer.from(shot.result.data, "base64"));
  if (!SEQ || i % 30 === 0) console.log(name);
}
if (flat) {
  /* the camera the scene defines, sampled at every rendered frame, so Blender
   * films exactly the move the storyboard shows (window px: centre + width) */
  const cams = await evaluate(`JSON.stringify(${JSON.stringify(list)}.map(t => camAt(t)))`);
  writeFileSync(path.join(out, "camera.json"), JSON.stringify({ window: [WIN_W, WIN_H], scale: SCALE, times: list, cam: JSON.parse(cams) }));
  console.log("camera.json");
}
/* --geo=sel|sel prints where elements sit in window px (for camera keys and
 * pointer targets); selectors that match nothing are skipped */
const geoArg = process.argv.find(a => a.startsWith("--geo="));
if (geoArg) {
  const GEO = geoArg.slice(6).split("|");
  const geo = await evaluate(`JSON.stringify(Object.fromEntries(${JSON.stringify(GEO)}.filter(s => document.querySelector(s)).map(s => { const r = document.querySelector(s).getBoundingClientRect(); const c = document.querySelector("#cam").getBoundingClientRect(); const k = c.width / ${WIN_W}; return [s, [(r.x - c.x) / k, (r.y - c.y) / k, r.width / k, r.height / k].map(v => Math.round(v))]; })))`);
  console.log("geometry (window px, x y w h):", geo);
}
ws.close();
chrome.kill();
