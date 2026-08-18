import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "screenshots");
const base = "http://localhost:8080";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1.5,
  locale: "el-GR",
});
const page = await context.newPage();

await page.goto(`${base}/wp-login.php`, { waitUntil: "networkidle" });
const user = process.env.WP_USER || "admin";
const pass = process.env.WP_PASS || "";
if (!pass) {
  console.error("Set WP_USER and WP_PASS env vars before running.");
  process.exit(1);
}
await page.fill("#user_login", user);
await page.fill("#user_pass", pass);
await page.click("#wp-submit");
await page.waitForURL(/wp-admin/, { timeout: 30000 });

async function dismissNotices() {
  // Collapse WPGraphQL telemetry / update banners if present
  await page.evaluate(() => {
    document.querySelectorAll(".notice, .update-nag").forEach((el) => {
      if (el.textContent?.includes("WPGraphQL") || el.textContent?.includes("WordPress")) {
        el.style.display = "none";
      }
    });
  });
}

async function shotBox(adminPath, selector, name) {
  await page.goto(`${base}/wp-admin/${adminPath}`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(900);
  await dismissNotices();
  const box = page.locator(selector).first();
  await box.waitFor({ state: "visible", timeout: 15000 });
  await box.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await box.screenshot({ path: path.join(out, `${name}.png`) });
  console.log("box", name);
}

await shotBox("post.php?post=8&action=edit", "#acf-group_aria_home", "03b-home-acf-box");
await shotBox("post.php?post=10&action=edit", "#acf-group_aria_about", "04b-about-acf-box");
await shotBox("post.php?post=11&action=edit", "#acf-group_aria_contact", "05b-contact-acf-box");
await shotBox("post.php?post=6&action=edit", "#acf-group_aria_service", "07b-service-acf-box");
await shotBox("post.php?post=12&action=edit", "#acf-group_aria_campaign", "09b-campaign-acf-box");
await shotBox("post.php?post=13&action=edit", "#acf-group_aria_theme", "10b-theme-acf-box");

// Cleaner list views without tall notices
await page.goto(`${base}/wp-admin/edit.php?post_type=page`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(600);
await dismissNotices();
await page.screenshot({ path: path.join(out, "02b-pages-list-clean.png") });
console.log("clean pages");

await page.goto(`${base}/wp-admin/edit.php?post_type=service`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(600);
await dismissNotices();
await page.screenshot({ path: path.join(out, "06b-services-list-clean.png") });
console.log("clean services");

await page.goto(`${base}/wp-admin/edit.php?post_type=campaign`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(600);
await dismissNotices();
await page.screenshot({ path: path.join(out, "08b-campaigns-list-clean.png") });
console.log("clean campaigns");

await page.goto(`${base}/wp-admin/index.php`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(600);
await dismissNotices();
await page.locator("#adminmenu").screenshot({ path: path.join(out, "01b-admin-menu.png") });
console.log("menu");

await browser.close();
console.log("done");
