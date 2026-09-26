/* modal_shot.mjs - open the Book-a-demo modal on a running dev server in the
 * cached headless Chrome and capture it at a few moments (for checking the
 * left pane's crossfading charts when the Browser pane is hidden).
 *
 *   node modal_shot.mjs http://localhost:3100/home OUT_PREFIX [--vp=1440x900] [--at=1.5,6.5,11.5]
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "../../..");
const WS = createRequire(path.join(REPO, "package.json"))("next/dist/compiled/ws");
const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const [url, prefix] = process.argv.slice(2);
const arg = (k, d) => (process.argv.find(a => a.startsWith(`--${k}=`)) || `=${d}`).split("=")[1];
const [VW, VH] = arg("vp", "1440x900").split("x").map(Number);
const AT = arg("at", "1.5,6.5,11.5").split(",").map(Number);
const PORT = 9400 + Math.floor(Math.random() * 400);

const chrome = spawn(CHROME, ["--headless", `--remote-debugging-port=${PORT}`, "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find(t => t.type === "page"); } catch {}
}
const ws = new WS(target.webSocketDebuggerUrl);
await new Promise(r => ws.on("open", r));
let id = 0;
const pending = new Map();
ws.on("message", m => { const d = JSON.parse(m); if (d.id && pending.has(d.id)) { pending.get(d.id)(d.result); pending.delete(d.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async expr => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }))?.result?.value;

await send("Emulation.setDeviceMetricsOverride", { width: VW, height: VH, deviceScaleFactor: 2, mobile: false });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(9000);                                  // real time: the page-in transition ignores virtual time
const clicked = await evalJs(`(() => {
  const b = [...document.querySelectorAll("button")].find(x => /Book a demo/.test(x.textContent));
  if (!b) return false; b.click(); return true; })()`);
console.log("clicked", clicked);
const t0 = Date.now();
for (const [k, t] of AT.entries()) {
  const wait = t * 1000 - (Date.now() - t0);
  if (wait > 0) await sleep(wait);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  const out = `${prefix}-${k + 1}.png`;
  writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log("shot", out);
}
ws.close();
chrome.kill();
