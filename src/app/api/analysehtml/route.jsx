import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {
  try {
    const { html } = await request.json();

    if (!html) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    // const fullHtml = `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //     <head><meta charset="UTF-8"><title>Test</title></head>
    //     <body>${html}</body>
    //   </html>
    // `;

    console.log("Launching browser...");
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // ✅ Inject axe-core from public CDN
    await page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js'
    });

    // ✅ Confirm axe-core is available
    const axeLoaded = await page.evaluate(() => typeof window.axe !== 'undefined');
    if (!axeLoaded) {
      throw new Error("axe-core script injection failed");
    }

    // ✅ Run axe-core
    const axeResults = await page.evaluate(async () => {
      const results = await window.axe.run();
      return {
        violations: results.violations,
        passes: results.passes,
        incomplete: results.incomplete,
        inapplicable: results.inapplicable,
        timestamp: new Date().toISOString(),
        url: window.location.href
      };
    });

    await browser.close();
    return NextResponse.json(axeResults);

  } catch (error) {
    console.error("axe-core analysis error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze the HTML content using axe-core." },
      { status: 500 }
    );
  }
}
