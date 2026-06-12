// Records interaction videos of the Vision DS doc site for the portfolio.
// Usage: node scripts/vds-capture.mjs   (outputs .webm into /tmp/vds-captures)
import { chromium } from "playwright";
import { mkdirSync, renameSync, readdirSync } from "fs";

const BASE = "https://vision-web-ds.vercel.app";
const OUT = "/tmp/vds-captures";
mkdirSync(OUT, { recursive: true });

// Fake cursor so recordings read as real usage (videos don't capture the OS pointer)
const CURSOR_JS = `
  window.addEventListener("DOMContentLoaded", () => {
    const c = document.createElement("div");
    c.style.cssText = "position:fixed;width:14px;height:14px;border-radius:50%;" +
      "background:rgba(124,92,255,.85);box-shadow:0 0 14px rgba(124,92,255,.7);" +
      "pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .15s,height .15s";
    document.body.appendChild(c);
    window.addEventListener("mousemove", e => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; });
    window.addEventListener("mousedown", () => { c.style.width = "22px"; c.style.height = "22px"; });
    window.addEventListener("mouseup", () => { c.style.width = "14px"; c.style.height = "14px"; });
  });
`;

const browser = await chromium.launch();

async function clip(name, fn) {
  const ctx = await browser.newContext({
    httpCredentials: { username: process.env.VDS_USER || "vision", password: process.env.VDS_PASS || "" },
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: OUT, size: { width: 1280, height: 720 } },
  });
  const page = await ctx.newPage();
  await page.addInitScript(CURSOR_JS);
  try {
    await fn(page);
  } catch (e) {
    console.log(`  ! ${name}: ${e.message.split("\n")[0]}`);
  }
  await ctx.close(); // flushes the video file
  // playwright names videos randomly — rename the newest
  const files = readdirSync(OUT).filter(f => f.endsWith(".webm") && !f.startsWith("vds-"));
  if (files.length) renameSync(`${OUT}/${files[0]}`, `${OUT}/vds-${name}.webm`);
  console.log(`✓ ${name}`);
}

const go = (page, path) =>
  page.goto(BASE + path, { waitUntil: "networkidle" }).then(() => page.waitForTimeout(1200));

async function smoothScroll(page, steps = 10, dy = 130, pause = 180) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, dy);
    await page.waitForTimeout(pause);
  }
}

async function glide(page, x, y, ms = 450) {
  await page.mouse.move(x, y, { steps: 24 });
  await page.waitForTimeout(ms);
}

/* 1 — overview: home hero, hover the foundation cards, scroll */
await clip("overview", async (page) => {
  await go(page, "/");
  await glide(page, 640, 200);
  await smoothScroll(page, 5);
  const cards = await page.$$(".v-card, [class*=card]");
  for (const card of cards.slice(0, 4)) {
    const b = await card.boundingBox();
    if (b) await glide(page, b.x + b.width / 2, b.y + b.height / 2, 550);
  }
  await smoothScroll(page, 5);
});

/* 2 — motion foundation */
await clip("motion", async (page) => {
  await go(page, "/foundations/motion");
  await smoothScroll(page, 4);
  // poke anything that looks playable
  const triggers = await page.$$("button:visible");
  for (const t of triggers.slice(0, 5)) {
    const b = await t.boundingBox();
    if (!b) continue;
    await glide(page, b.x + b.width / 2, b.y + b.height / 2, 350);
    await t.click().catch(() => {});
    await page.waitForTimeout(900);
  }
  await smoothScroll(page, 6);
});

/* 3 — design tokens / variables */
await clip("tokens", async (page) => {
  await go(page, "/foundations/variables");
  await glide(page, 640, 300);
  await smoothScroll(page, 14, 150, 220);
});

/* 4 — interactive components montage: buttons → toggles → slider */
await clip("components", async (page) => {
  await go(page, "/buttons");
  const btns = await page.$$("main button:visible, .v-main button:visible");
  for (const b of btns.slice(0, 6)) {
    const box = await b.boundingBox();
    if (box) await glide(page, box.x + box.width / 2, box.y + box.height / 2, 320);
  }
  await go(page, "/toggle-switch");
  const toggles = await page.$$(".v-switch, [role=switch]");
  for (const t of toggles.slice(0, 4)) {
    const box = await t.boundingBox();
    if (!box) continue;
    await glide(page, box.x + box.width / 2, box.y + box.height / 2, 280);
    await t.click().catch(() => {});
    await page.waitForTimeout(450);
  }
  await go(page, "/slider");
  const slider = await page.$(".v-slider, [role=slider]");
  if (slider) {
    const b = await slider.boundingBox();
    if (b) {
      await page.mouse.move(b.x + 20, b.y + b.height / 2, { steps: 10 });
      await page.mouse.down();
      await page.mouse.move(b.x + b.width * 0.7, b.y + b.height / 2, { steps: 30 });
      await page.mouse.up();
      await page.waitForTimeout(600);
    }
  }
});

/* 5 — charts & tables */
await clip("data", async (page) => {
  await go(page, "/charts");
  await page.waitForTimeout(1500); // chart entrance animations
  await smoothScroll(page, 8, 140, 240);
  await go(page, "/tables");
  await smoothScroll(page, 6, 140, 220);
});

/* 6 — overlays: dialogs + datepicker */
await clip("overlays", async (page) => {
  await go(page, "/dialogs");
  const opener = await page.$("main button:visible, .v-main button:visible");
  if (opener) {
    const b = await opener.boundingBox();
    if (b) await glide(page, b.x + b.width / 2, b.y + b.height / 2, 400);
    await opener.click().catch(() => {});
    await page.waitForTimeout(1400);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(700);
  }
  await go(page, "/datepicker");
  const field = await page.$("main .v-field, main input, .v-main input");
  if (field) {
    const b = await field.boundingBox();
    if (b) await glide(page, b.x + b.width / 2, b.y + b.height / 2, 400);
    await field.click().catch(() => {});
    await page.waitForTimeout(1600);
  }
  await smoothScroll(page, 4);
});

await browser.close();
console.log("done →", OUT);
