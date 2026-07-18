// Production-artifact audit: drive every route of the served static export,
// collecting console errors/warnings, uncaught page errors, and failed
// network requests — the "errors galore" a real visitor could hit.
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:8899";
const routes = [
  "/",
  "/one-shot-generator/",
  "/one-shot-generator/?s=k3v9pq&t=haunting&l=5&p=4&d=hard&tb=3h",
  "/one-shot-generator/?s=aa1&t=mystery&l=11&p=6&d=deadly&tb=4h",
  "/character-creator/",
  "/character-creator/?pregen=vessa-marchmain&level=5&role=Face",
  "/character-vault/",
  "/pregen-library/",
  "/definitely-not-a-page/",
];

const browser = await chromium.launch();
const page = await browser.newPage();

const findings = [];
page.on("console", (msg) => {
  // The deliberate bad-route probe legitimately logs a 404 for its own document.
  if (page.url().includes("definitely-not-a-page")) return;
  if (msg.type() === "error" || msg.type() === "warning") {
    findings.push({ route: page.url(), kind: `console.${msg.type()}`, detail: msg.text().slice(0, 300) });
  }
});
page.on("pageerror", (err) => {
  findings.push({ route: page.url(), kind: "pageerror", detail: String(err).slice(0, 300) });
});
page.on("response", (res) => {
  // 404 on the deliberate bad route is expected for the document itself.
  if (res.status() >= 400 && !res.url().includes("definitely-not-a-page")) {
    findings.push({ route: page.url(), kind: `http ${res.status()}`, detail: res.url() });
  }
});

for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(600);
  // Exercise the app a little: click primary interactions where present.
  if (route === "/") {
    const forge = page.getByRole("button", { name: /forge another/i });
    if (await forge.count()) {
      await forge.click();
      await page.waitForTimeout(500);
    }
  }
  if (route.includes("s=k3v9pq")) {
    const reroll = page.getByRole("button", { name: /re-roll villain/i });
    if (await reroll.count()) {
      await reroll.click();
      await page.waitForTimeout(400);
    }
    const player = page.getByRole("checkbox");
    if (await player.count()) {
      await player.first().check();
      await page.waitForTimeout(300);
    }
  }
}

await browser.close();

if (findings.length === 0) {
  console.log("CLEAN: no console errors/warnings, no page errors, no failed requests across", routes.length, "routes");
} else {
  console.log(`FOUND ${findings.length} issue(s):`);
  for (const f of findings) console.log(`- [${f.kind}] ${f.detail}\n    at ${f.route}`);
  process.exitCode = 1;
}
