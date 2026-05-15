import puppeteer from "puppeteer";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function captureScreenshot(url: string): Promise<string | null> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });
    
    const screenshotDir = join(process.cwd(), "public", "screenshots");
    await mkdir(screenshotDir, { recursive: true });
    
    const filename = `${Date.now()}-${url.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}.png`;
    const filepath = join(screenshotDir, filename);
    
    await page.screenshot({ path: filepath, type: "png" });
    await browser.close();
    
    return `/screenshots/${filename}`;
  } catch (error) {
    console.error("Screenshot capture failed:", error);
    if (browser) await browser.close();
    return null;
  }
}
