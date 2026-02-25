const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:8082', { waitUntil: 'networkidle0' });
    
    const carouselInfo = await page.evaluate(() => {
        const wrapper = document.querySelector('.carousel-outer-wrapper');
        const track = document.querySelector('.carousel-track');
        return JSON.stringify({
            wrapperExists: !!wrapper,
            wrapperHeight: wrapper ? wrapper.getBoundingClientRect().height : null,
            trackExists: !!track,
            trackChildren: track ? track.children.length : null,
            trackHeight: track ? track.getBoundingClientRect().height : null
        }, null, 2);
    });
    
    console.log("CAROUSEL EVAL:\n" + carouselInfo);
    await browser.close();
})();
