import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  httpCredentials: { username: "vision", password: "Vision123!" },
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();
await page.goto("https://vision-web-ds.vercel.app/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// collect all internal links (router-links render as <a href="/...">)
const links = await page.$$eval("a[href^='/'], a[href^='#/']", as =>
  [...new Set(as.map(a => a.getAttribute("href")))]
);
console.log("LINKS:", JSON.stringify(links, null, 1));

// nav structure text for orientation
const navText = await page.evaluate(() => {
  const nav = document.querySelector("nav, .v-navigation-drawer, aside");
  return nav ? nav.innerText.slice(0, 1200) : "(no nav found)";
});
console.log("NAV:\n" + navText);

await page.screenshot({ path: "/tmp/vds-home.png", fullPage: false });
await browser.close();
