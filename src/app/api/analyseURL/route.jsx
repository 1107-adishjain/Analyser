
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {url} = await request.json();
        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        let validatedUrl;
    try {
      validatedUrl = new URL(url);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox'],
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
        });

        const page = await browser.newPage();

        await page.goto(validatedUrl.href, { waitUntil: 'domcontentloaded' });

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
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
    }
}
