/* shot.mjs - screenshot a local HTML file (the chart mocks) through the
 * cached headless Chrome over CDP, the same way frames.mjs does.
 *
 *   node shot.mjs PAGE.html OUT.png [--vp=2376x748] [--dsf=2]
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "../../..");
const WS = createRequire(path.join(REPO, "package.json"))("next/dist/compiled/ws");
const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const [page, out] = process.argv.slice(2);
const arg = (k, d) => (process.argv.find(a => a.startsWith(`--${k}=`)) || `=${d}`).split("=")[1];
const [VW, VH] = arg("vp", "2376x748").split("x").map(Number);
const DSF = +arg("dsf", "2");
const PORT = 9400 + Math.floor(Math.random() * 400);

const chrome = spawn(CHROME, ["--headless", `--remote-debugging-port=${PORT}`, "--allow-file-access-from-files", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
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

await send("Emulation.setDeviceMetricsOverride", { width: VW, height: VH, deviceScaleFactor: DSF, mobile: false });
await send("Page.enable");
await send("Page.navigate", { url: pathToFileURL(path.resolve(page)).href });
await sleep(1500);
await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => 1)", awaitPromise: true });
await sleep(300);
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
writeFileSync(out, Buffer.from(shot.data, "base64"));
ws.close();
chrome.kill();
console.log("shot", out);
