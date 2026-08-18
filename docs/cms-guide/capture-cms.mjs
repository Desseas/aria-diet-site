import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "screenshots");
const base = "http://localhost:8080";
const user = process.env.WP_USER || "admin";
const pass = process.env.WP_PASS || "";
if (!pass) {
  console.error("Set WP_USER and WP_PASS env vars before running.");
  process.exit(1);
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
  locale: "el-GR",
});
const page = await context.newPage();

async function shot(name, fullPage = false) {
  await page.waitForTimeout(350);
  await page.screenshot({
    path: path.join(out, `${name}.png`),
    fullPage,
  });
  console.log("shot", name);
}

async function gotoAdmin(pathSuffix) {
  await page.goto(`${base}/wp-admin/${pathSuffix}`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(500);
}

// Login
await page.goto(`${base}/wp-login.php`, { waitUntil: "networkidle" });
await page.fill("#user_login", user);
await page.fill("#user_pass", pass);
await page.click("#wp-submit");
await page.waitForURL(/wp-admin/, { timeout: 30000 });
await page.waitForTimeout(800);

// 01 — Dashboard with left menu
await gotoAdmin("index.php");
await shot("01-dashboard-menu");

// 02 — Pages list
await gotoAdmin("edit.php?post_type=page");
await shot("02-pages-list");

// 03 — Home edit (classic/block) — focus ACF box if present
await gotoAdmin("post.php?post=8&action=edit");
await page.waitForTimeout(1000);
// Prefer scrolling to Homepage ACF group
const homeBox = page.locator("#acf-group_aria_home, .acf-postbox").first();
if (await homeBox.count()) {
  await homeBox.scrollIntoViewIfNeeded();
}
await shot("03-home-fields", true);

// 04 — About
await gotoAdmin("post.php?post=10&action=edit");
await page.waitForTimeout(800);
const aboutBox = page.locator("#acf-group_aria_about, .acf-postbox").first();
if (await aboutBox.count()) await aboutBox.scrollIntoViewIfNeeded();
await shot("04-about-fields", true);

// 05 — Contact
await gotoAdmin("post.php?post=11&action=edit");
await page.waitForTimeout(800);
const contactBox = page.locator("#acf-group_aria_contact, .acf-postbox").first();
if (await contactBox.count()) await contactBox.scrollIntoViewIfNeeded();
await shot("05-contact-fields", true);

// 06 — Services list
await gotoAdmin("edit.php?post_type=service");
await shot("06-services-list");

// 07 — Service edit
await gotoAdmin("post.php?post=6&action=edit");
await page.waitForTimeout(800);
const serviceBox = page.locator("#acf-group_aria_service, .acf-postbox").first();
if (await serviceBox.count()) await serviceBox.scrollIntoViewIfNeeded();
await shot("07-service-fields", true);

// 08 — Campaigns list
await gotoAdmin("edit.php?post_type=campaign");
await shot("08-campaigns-list");

// 09 — Campaign edit
await gotoAdmin("post.php?post=12&action=edit");
await page.waitForTimeout(800);
const campaignBox = page.locator("#acf-group_aria_campaign, .acf-postbox").first();
if (await campaignBox.count()) await campaignBox.scrollIntoViewIfNeeded();
await shot("09-campaign-fields", true);

// 10 — Site Theme colors
await gotoAdmin("post.php?post=13&action=edit");
await page.waitForTimeout(800);
const themeBox = page.locator("#acf-group_aria_theme, .acf-postbox").first();
if (await themeBox.count()) await themeBox.scrollIntoViewIfNeeded();
await shot("10-site-theme-colors", true);

// 11 — Reading settings (front page)
await gotoAdmin("options-reading.php");
await shot("11-reading-settings");

await browser.close();
console.log("done");
