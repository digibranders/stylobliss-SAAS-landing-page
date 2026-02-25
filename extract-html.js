const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const routes = [
    '/',
    '/salons',
    '/faq',
    '/tutorials',
    '/blog',
    '/contact',
    '/demo',
    '/pricing',
    '/why',
    '/login',
    '/trial'
];

async function extract() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (const route of routes) {
        console.log(`Extracting http://localhost:3001${route} ...`);
        await page.goto(`http://localhost:3001${route}`, { waitUntil: 'networkidle0' });

        // Wait for the main app to render
        await page.waitForSelector('#root > div', { timeout: 10000 }).catch(() => { });

        // Get the outer HTML of the entire document
        let html = await page.evaluate(() => {
            // Clean up dynamic vite injected scripts
            const scripts = document.querySelectorAll('script[type="module"]');
            scripts.forEach(s => {
                if (s.src.includes('@vite/client') || s.src.includes('main.tsx')) {
                    s.remove();
                }
            });
            return document.documentElement.outerHTML;
        });

        // We will append our own main.js script
        html = '<!DOCTYPE html>\n<html lang="en">' + html.replace('</head>', '<link rel="stylesheet" href="/styles/globals.css">\n<link rel="stylesheet" href="/styles/index.css">\n</head>').replace('</body>', '<script src="/scripts/main.js"></script>\n</body>') + '</html>';

        const dir = route === '/' ? path.join(__dirname, 'static-site') : path.join(__dirname, 'static-site', route.substring(1));
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(path.join(dir, 'index.html'), html);
        console.log(`Saved to ${path.join(dir, 'index.html')}`);
    }

    await browser.close();
    console.log('Extraction complete!');
}

extract().catch(e => {
    console.error(e);
    process.exit(1);
});
