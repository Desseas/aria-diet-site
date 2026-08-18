import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "cms-content-guide.html");
const pdfPath = path.join(__dirname, "cms-content-guide.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "16mm", left: "12mm", right: "12mm" },
});
await browser.close();
console.log("wrote", pdfPath);
