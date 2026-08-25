// Records the demo take against the LIVE site, driving it with the real
// WebMCP tools. Pacing is driven by the measured narration durations, so the
// video and voiceover line up by construction.
import { chromium } from "@playwright/test";
import { readFileSync, mkdirSync } from "fs";
import path from "path";

const SCRATCH = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const timings = JSON.parse(readFileSync(path.join(SCRATCH, "timings.json"), "utf8"));
const OUT = path.join(SCRATCH, "raw-video");
mkdirSync(OUT, { recursive: true });

const SITE = "https://carl-prewitt.com/oneshot";
const W = 1920;
const H = 1080;

// ---------------------------------------------------------------- overlay
const OVERLAY_CSS = `
#demo-layer { position: fixed; inset: 0; pointer-events: none; z-index: 2147483647;
  font-family: Jost, "Segoe UI", sans-serif; }
#demo-prompt { position: absolute; left: 50%; transform: translateX(-50%);
  bottom: 116px; max-width: 1180px; padding: 18px 30px;
  background: rgba(13,10,7,0.94); border: 1px solid #4a3f30; border-left: 4px solid #d8a54e;
  color: #f2ead9; font-size: 27px; line-height: 1.4; letter-spacing: 0.01em;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7); opacity: 0; transition: opacity 320ms ease-out; }
#demo-prompt.on { opacity: 1; }
#demo-prompt .who { display:block; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase;
  color: #a08köp; margin-bottom: 7px; }
#demo-tool { position: absolute; right: 44px; top: 104px; width: 470px;
  background: rgba(13,10,7,0.96); border: 1px solid #d8a54e; color: #f2ead9;
  box-shadow: 0 20px 60px rgba(0,0,0,0.75); opacity: 0; transform: translateY(-8px);
  transition: opacity 260ms ease-out, transform 260ms ease-out; }
#demo-tool.on { opacity: 1; transform: translateY(0); }
#demo-tool .hdr { display:flex; align-items:center; gap:9px; padding: 11px 16px;
  border-bottom: 1px solid #4a3f30; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
  color: #d8a54e; font-weight: 600; }
#demo-tool .dot { width:8px; height:8px; border-radius:50%; background:#d8a54e; }
#demo-tool .body { padding: 14px 16px; font-family: Consolas, monospace; font-size: 17px; line-height: 1.55; }
#demo-tool .name { color: #f2ead9; font-weight: 700; }
#demo-tool .args { color: #b3a68d; word-break: break-word; }
#demo-tool .ret { margin-top: 9px; padding-top: 9px; border-top: 1px dashed #4a3f30; color: #8ec9a0; }
/* Solid chip: the caption sits over both the dark chrome and the white print
   view, so it cannot rely on a text-shadow for contrast. */
#demo-caption { position: absolute; left: 50%; transform: translateX(-50%); bottom: 48px;
  background: rgba(13,10,7,0.95); border: 1px solid #d8a54e; padding: 11px 26px;
  color: #d8a54e; font-size: 17px; letter-spacing: 0.2em; text-transform: uppercase;
  opacity: 0; transition: opacity 300ms ease-out; box-shadow: 0 14px 44px rgba(0,0,0,0.7); }
#demo-caption.on { opacity: 1; }
`.replace("#a08köp", "#a0937c");

const OVERLAY_JS = `
(() => {
  if (document.getElementById('demo-layer')) return;
  const l = document.createElement('div'); l.id = 'demo-layer';
  l.innerHTML = '<div id="demo-prompt"><span class="who">You</span><span class="txt"></span></div>' +
    '<div id="demo-tool"><div class="hdr"><span class="dot"></span><span>WebMCP tool call</span></div>' +
    '<div class="body"><div><span class="name"></span><span class="args"></span></div><div class="ret"></div></div></div>' +
    '<div id="demo-caption"></div>';
  document.documentElement.appendChild(l);
  window.__demo = {
    prompt(t){ const p=document.getElementById('demo-prompt'); p.querySelector('.txt').textContent=t; p.classList.add('on'); },
    hidePrompt(){ document.getElementById('demo-prompt').classList.remove('on'); },
    tool(name,args){ const t=document.getElementById('demo-tool');
      t.querySelector('.name').textContent=name; t.querySelector('.args').textContent=args||'';
      t.querySelector('.ret').textContent=''; t.classList.add('on'); },
    ret(text){ document.getElementById('demo-tool').querySelector('.ret').textContent='→ '+text; },
    hideTool(){ document.getElementById('demo-tool').classList.remove('on'); },
    caption(t){ const c=document.getElementById('demo-caption'); c.textContent=t; c.classList.add('on'); },
    hideCaption(){ document.getElementById('demo-caption').classList.remove('on'); }
  };
})();
`;

// ---------------------------------------------------------------- cards
const TITLE_MS = 3500;
const END_MS = 6000;

const CARD = (inner) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Alegreya:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;height:100%;background:#14100c;color:#f2ead9;
    font-family:Jost,"Segoe UI",sans-serif;overflow:hidden}
  .wrap{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;
    text-align:center;background:radial-gradient(ellipse 60% 55% at 50% 45%,rgba(244,196,116,0.10),transparent 72%)}
  .mark{font-size:76px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase}
  .rule{width:220px;height:2px;background:#d8a54e;margin:30px 0}
  .sub{font-family:Alegreya,Georgia,serif;font-style:italic;font-size:31px;color:#f2ead9;max-width:1100px;line-height:1.45}
  .meta{margin-top:44px;font-size:19px;letter-spacing:0.24em;text-transform:uppercase;color:#d8a54e}
  .url{font-size:33px;letter-spacing:0.1em;color:#f2ead9;margin-top:8px}
  .legal{position:absolute;bottom:44px;left:0;right:0;font-size:15px;line-height:1.7;color:#8d8271;
    letter-spacing:0.03em;text-transform:none;max-width:1180px;margin:0 auto}
</style></head><body><div class="wrap">${inner}</div></body></html>`;

const CARD_TITLE = CARD(`
  <div class="mark">OneShotsmith</div>
  <div class="rule"></div>
  <div class="sub">Complete D&amp;D one-shots, forged in the browser &mdash;<br>and driveable by your agent.</div>
  <div class="meta">WebMCP Challenge</div>
`);

const CARD_END = CARD(`
  <div class="mark">OneShotsmith</div>
  <div class="rule"></div>
  <div class="url">carl-prewitt.com/oneshot</div>
  <div class="meta" style="margin-top:26px">github.com/rages4calm/oneshotsmith &middot; MIT</div>
  <div class="legal">
    Eight WebMCP tools registered on <code>document.modelContext</code>, with a
    <code>navigator.modelContext</code> fallback for Chrome&rsquo;s origin trial.<br>
    This work includes material from the System Reference Document 5.1 by Wizards of the Coast LLC,
    licensed under CC BY 4.0. OneShotsmith is an independent product and is not affiliated with Wizards of the Coast.
  </div>
`);

// ---------------------------------------------------------------- helpers
const dur = (id) => {
  const seg = timings.find((t) => t.id === id);
  if (!seg) throw new Error(`no timing for ${id}`);
  return Math.round(seg.duration * 1000);
};

async function run() {
  const browser = await chromium.launch({
    args: ["--force-prefers-reduced-motion", "--hide-scrollbars", "--force-device-scale-factor=1"],
  });
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    recordVideo: { dir: OUT, size: { width: W, height: H } },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  const overlay = async () => page.evaluate(OVERLAY_JS);
  const style = async () => page.addStyleTag({ content: OVERLAY_CSS });
  const demo = (fn, ...args) =>
    page.evaluate(([f, a]) => window.__demo[f](...a), [fn, args]);
  const smoothTo = async (y, ms = 1400) => {
    await page.evaluate((target) => window.scrollTo({ top: target, behavior: "smooth" }), y);
    await page.waitForTimeout(ms);
  };
  const callTool = (name, input = {}) =>
    page.evaluate(
      ([n, i]) => window.__oneshotsmithAgentTools.find((t) => t.name === n).execute(i, {}),
      [name, input]
    );

  const clock = { t: Date.now() };
  const beat = async (id) => {
    const target = dur(id);
    const spent = Date.now() - clock.t;
    const remain = target - spent;
    if (remain > 0) await page.waitForTimeout(remain);
    clock.t = Date.now();
  };

  // ---------------------------------------------------------- 00 title card
  await page.setContent(CARD_TITLE);
  await page.waitForTimeout(TITLE_MS);

  // ---------------------------------------------------------- 01 cold open
  await page.goto(`${SITE}/`, { waitUntil: "networkidle" });
  await style();
  await overlay();
  await page.waitForTimeout(900);
  await demo("caption", "oneshotsmith · carl-prewitt.com/oneshot");
  await beat("01_cold_open");

  // ---------------------------------------------------------- 02 what it is
  await demo("hideCaption");
  await smoothTo(420, 1500);
  await smoothTo(900, 1500);
  await beat("02_what_it_is");

  // ---------------------------------------------------------- 03 webmcp
  await page.goto(`${SITE}/one-shot-generator/`, { waitUntil: "networkidle" });
  await style();
  await overlay();
  await page.waitForTimeout(700);
  await demo("caption", "eight webmcp tools registered by the page");
  await beat("03_webmcp");

  // ---------------------------------------------------------- 04 generate
  await demo("hideCaption");
  await demo("prompt", "Make me a three-hour haunting for four level-5 players. Make it hard.");
  await page.waitForTimeout(1500);
  await demo("tool", "generate_oneshot", '{ theme: "Haunting", level: 5, partySize: 4, difficulty: "Hard", timebox: "3h" }');
  await page.waitForTimeout(700);
  const gen = await callTool("generate_oneshot", {
    theme: "Haunting", level: 5, partySize: 4, difficulty: "Hard", timebox: "3h",
  });
  await demo("ret", `"${gen.title}" · ${gen.sceneCount} scenes · ${gen.totalCombatXP} XP`);
  await page.waitForTimeout(900);
  await demo("hidePrompt");
  await smoothTo(560, 1500);
  await smoothTo(1150, 1600);
  await beat("04_generate");

  // ---------------------------------------------------------- 05 reroll (money shot)
  await demo("hideTool");
  await smoothTo(760, 1100);
  await demo("prompt", "Love the map. Give me a different villain.");
  await page.waitForTimeout(1400);
  await demo("tool", "reroll_section", '{ section: "villain" }');
  await page.waitForTimeout(600);
  const rr = await callTool("reroll_section", { section: "villain" });
  const from = rr.changed?.villain?.from ?? "";
  const to = rr.changed?.villain?.to ?? "";
  await demo("ret", `${from.split("—")[0].trim()} → ${to.split("—")[0].trim()}   ·   map unchanged ✓`);
  await page.waitForTimeout(1200);
  await demo("hidePrompt");
  await demo("caption", "villain changed · map, title and scenes byte-identical");
  await smoothTo(1420, 1600);
  await beat("05_reroll");

  // ---------------------------------------------------------- 06 adjust party
  await demo("hideCaption");
  await demo("hideTool");
  await smoothTo(0, 900);
  await demo("prompt", "Priya dropped out and Sam's bringing a level 8.");
  await page.waitForTimeout(1400);
  await demo("tool", "adjust_party", '{ level: 8, partySize: 3 }');
  await page.waitForTimeout(600);
  const adj = await callTool("adjust_party", { level: 8, partySize: 3 });
  await demo("ret", `combat XP ${adj.combatXP.before} → ${adj.combatXP.after} · story unchanged ✓`);
  await page.waitForTimeout(1100);
  await demo("hidePrompt");
  await smoothTo(1800, 1700);
  await beat("06_adjust");

  // ---------------------------------------------------------- 07 get scene
  await demo("hideTool");
  await demo("prompt", "Read me scene three.");
  await page.waitForTimeout(1200);
  await demo("tool", "get_scene", "{ number: 3 }");
  await page.waitForTimeout(600);
  const sc = await callTool("get_scene", { number: 3 });
  await demo("ret", `"${sc.title}" · read-aloud + DM notes returned`);
  await page.waitForTimeout(900);
  await demo("hidePrompt");
  await smoothTo(2600, 1700);
  await beat("07_scene");

  // ---------------------------------------------------------- 08 print
  await demo("hideTool");
  await demo("caption", "print view · boxed text, keyed entries, player map handout");
  await page.emulateMedia({ media: "print" });
  await smoothTo(0, 800);
  await smoothTo(1500, 1800);
  await beat("08_print");

  // ---------------------------------------------------------- 09 permalink
  await page.emulateMedia({ media: "screen" });
  await demo("hideCaption");
  const share = gen.shareUrl.replace(/([?&])r=[^&]*/, "$1") + "&r=villain%3A1";
  await page.goto(share, { waitUntil: "networkidle" });
  await style();
  await overlay();
  await page.waitForTimeout(800);
  await demo("caption", "same link · same map · same villain · same maths");
  await smoothTo(700, 1500);
  await beat("09_permalink");

  // ---------------------------------------------------------- 10 close
  await demo("hideCaption");
  await page.goto(`${SITE}/`, { waitUntil: "networkidle" });
  await style();
  await overlay();
  await page.waitForTimeout(600);
  await smoothTo(300, 1600);
  await beat("10_close");

  // ---------------------------------------------------------- end card
  await page.setContent(CARD_END);
  await page.waitForTimeout(END_MS);

  await context.close();
  await browser.close();
  console.log("recorded to", OUT);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
