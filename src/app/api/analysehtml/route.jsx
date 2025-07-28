import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {
  try {
    const { html } = await request.json();

    if (!html) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }


    console.log("Launching browser...");
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
       timeout: 60000, // 60 seconds
      protocolTimeout: 60000 // <-- ADD THIS!
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });


    await page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js'
    });


    const axeLoaded = await page.evaluate(() => typeof window.axe !== 'undefined');
    if (!axeLoaded) {
      throw new Error("axe-core script injection failed");
    }

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
