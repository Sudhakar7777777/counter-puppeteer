const puppeteer = require('puppeteer')

const main = async () => {
	const browser = await puppeteer.launch({
		args: ['--start-maximized'],
		headless: false,
		defaultViewport: null
	})
	const page = await browser.newPage()
	await page.goto('https://www.vudu.com/content/movies/uxrow/New-Rentals/53')

	// await page.waitForSelector("._32R-2");
	// await page._frameManager._mainFrame.waitForNavigation();
	// await page.waitForNavigation({ waitUntil: 'networkidle0' })
	// await page.waitForNavigation({ waitUntil: 'networkidle0' })
	// await page.waitForNavigation()
	await page.waitFor(10000);
	// await page.waitFor(60000);

	// Get scroll width and height of the rendered page and set viewport
	// const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
	// const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
	// console.log('Setting viewport: ' + bodyWidth + ':' + bodyHeight);
	// console.log('test:' + page.viewport())
	// console.log('Setting viewport2: ' + page.viewport().width + ':' + page.viewport().height);

	await page.setViewport({ width: 0, height: 0 }); //1920:1200

	//#reactApp > div > div > div > div.nr-page-body > div > div._3WIR9._1d-Xl > div > div > div > div
	//#reactApp > div > div > div > div.nr-page-body > div > div._3WIR9._1d-Xl
	////*[@id="reactApp"]/div/div/div/div[2]/div/div[2]

	// Take the screenshot
	await page.screenshot({ path: 'vudu-new-movies.png', fullPage: true })
	// await page.waitFor(600000);

	// const movies = await page.$eval("._3WIR9", e => e.innerHTML);
	// console.log('movies:' + movies.scrollHeight + ':' + movies.scrollWidth)

	await browser.close()
}

main()
