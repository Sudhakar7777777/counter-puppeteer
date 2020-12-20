const puppeteer = require('puppeteer')

const main = async () => {
	const browser = await puppeteer.launch({
		args: ['--start-maximized'],
		headless: false,
		defaultViewport: null
	})
	const page = await browser.newPage()
	await page.setViewport({
		width: 1920,
		height: 1080,
		deviceScaleFactor: 1,
	})
	await page.goto('https://www.vudu.com/content/movies/uxrow/New-Rentals/53')

	// await page.waitForNavigation({ waitUntil: 'networkidle0' })
	// await page.waitForNavigation()
	await page.waitFor(10000);

	await page.waitForSelector('._2CCgL');        // wait for the selector to load
	// const movies = await page.$eval("._3WIR9", e => e.innerHTML);

	// Take the screenshot
	await page.screenshot({ path: 'vudu-new-movies.png', fullPage: true });
	// await page.screenshot({ path: 'vudu-new-movies.jpeg', fullPage: true, type: 'jpeg', quality: 90 });

	await browser.close()
}

main()
