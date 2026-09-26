/* ui_reference.mjs - the local visual reference for the film UI: renders a
 * film scene at chosen moments and saves each screen or component as an
 * image, straight from the same scene the storyboards and Blender textures
 * come from. Re-run it whenever the UI in the scene changes.
 *
 *   node ui_reference.mjs SCENE.html SPEC.json OUT_DIR
 *
 * SPEC.json: [{ "name": "home", "t": 1.4 }                       whole window
 *             { "name": "sidebar", "t": 2.4, "sel": ".nav",       one component
 *               "pad": 8, "scale": 2 }]
 * t is film time in seconds; sel is a CSS selector (first match); pad is
 * window px around it; scale is the pixel density (1 = window px).
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "../../../..");
const WS = createRequire(path.join(REPO, "package.json"))("next/dist/compiled/ws");
const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const [scene, specPath, out] = process.argv.slice(2);
const spec = JSON.parse(readFileSync(specPath, "utf8"));
mkdirSync(out, { recursive: true });

const port = 9800 + Math.floor(Math.random() * 150);
const chrome = spawn(CHROME, ["--headless", `--remote-debugging-port=${port}`, "--hide-scrollbars", "--force-color-profile=srgb", "--allow-file-access-from-files", "about:blank"], { stdio: "ignore" });
const kill = () => { try { chrome.kill(); } catch {} };
process.on("exit", kill);
process.on("uncaughtException", e => { console.error(e); kill(); process.exit(1); });
process.on("unhandledRejection", e => { console.error(e); kill(); process.exit(1); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
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

let scale = 0;
for (const [i, item] of spec.entries()) {
  const s = item.scale || 1;
  if (s !== scale) {
    scale = s;
    await send("Emulation.setDeviceMetricsOverride", { width: 1360, height: 660, deviceScaleFactor: scale, mobile: false });
    await send("Page.navigate", { url: `${pathToFileURL(path.resolve(scene)).href}?mode=flat` });
    await sleep(1200);
    await evaluate("document.fonts.ready.then(() => true)");
  }
  await evaluate(`(seek(${item.t}), new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))`);
  let clip = { x: 0, y: 0, width: 1360, height: 660 };
  if (item.sel) {
    const r = await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(item.sel)}); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; })()`);
    if (!r) { console.log(`skip ${item.name}: nothing matches ${item.sel}`); continue; }
    const p = item.pad ?? 8;
    const x = Math.max(0, r.x - p), y = Math.max(0, r.y - p);
    clip = { x, y, width: Math.min(1360, r.x + r.w + p) - x, height: Math.min(660, r.y + r.h + p) - y };
  }
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 90, clip: { ...clip, scale: 1 } });
  const name = `${String(i + 1).padStart(2, "0")}-${item.name}.jpg`;
  writeFileSync(path.join(out, name), Buffer.from(shot.result.data, "base64"));
  console.log(name);
}
ws.close();
kill();
