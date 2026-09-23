import { chromium } from "playwright-core";
// usage: node capture.mjs OUT_DIR  (dev server on :3001; needs playwright-core)
const out = process.argv[2];
const browser = await chromium.launch({ executablePath: process.env.HOME+"/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell", headless: true });
const page = await browser.newPage({ viewport:{width:1600,height:1000}, deviceScaleFactor:5 });
await page.goto("http://localhost:3001/explorations/platform?hero=arcade",{waitUntil:"networkidle"});
await page.waitForTimeout(6000);
await page.addStyleTag({content:"nextjs-portal{display:none!important}"}).catch(()=>{});
let steps = page.locator('.pf-hero-demo .pf-journey__step');
// the six rail screens, plus the seal screen after signing (dialog gone)
const names = ["home","inbox","checklist","seal","builder","dashboard","seal_after"];
const railIndex = [0,1,2,3,4,5,3];
for (let i=0;i<names.length;i++){
  steps = page.locator('.pf-hero-demo .pf-journey__step'); await steps.nth(railIndex[i]).click();
  await page.waitForTimeout(2500);
  const b = await page.evaluate((NAME)=>{
    const cam=document.querySelector('.pf-hero-demo .stx-arc__camera');
    let p=cam.parentElement; while(p && p!==document.documentElement){ const cs=getComputedStyle(p); if(cs.transform!=='none'||cs.filter!=='none'||cs.clipPath!=='none'||cs.contain!=='none'||cs.backdropFilter!=='none'){p.style.setProperty('transform','none','important');p.style.setProperty('filter','none','important');p.style.setProperty('clip-path','none','important');p.style.setProperty('contain','none','important');p.style.setProperty('backdrop-filter','none','important');} p=p.parentElement; }
    for (const el of [cam, ...cam.querySelectorAll('*')]) { el.style.setProperty('transition','none','important'); el.style.setProperty('animation','none','important'); }
    cam.style.setProperty('clip-path','none','important');
    if (NAME === 'seal_after') cam.querySelectorAll('.stx-arc__signwrap').forEach(el=>el.style.setProperty('display','none','important'));
    cam.style.setProperty('transform','none','important');
    cam.style.setProperty('position','fixed','important');
    cam.style.setProperty('left','0','important'); cam.style.setProperty('top','0','important');
    cam.style.setProperty('z-index','2147483000','important');
    for (const el of document.querySelectorAll('body *')) { if (el===cam||cam.contains(el)||el.contains(cam)) continue; const pos=getComputedStyle(el).position; if(pos==='fixed'||pos==='sticky') el.style.setProperty('display','none','important'); }
    window.scrollTo(0,0);
    const r=cam.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height};
  }, names[i]);
  await page.waitForTimeout(500);
  await page.screenshot({path:`${out}/${names[i]}.png`, clip:b});
  console.log(names[i], JSON.stringify(b));
  await page.reload({waitUntil:"networkidle"}); await page.waitForTimeout(4000);
}
await browser.close();
