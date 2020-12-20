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
	// await page.waitFor(10000);
	// await page.waitFor(60000);

	// Get scroll width and height of the rendered page and set viewport
	// const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
	// const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
	// console.log('Setting viewport: ' + bodyWidth + ':' + bodyHeight);
	// console.log('test:' + page.viewport())
	// console.log('Setting viewport2: ' + page.viewport().width + ':' + page.viewport().height);

	await page.waitForSelector('._2CCgL');          // wait for the selector to load
	await page.waitFor(10000);
	const element = await page.$('._2CCgL');        // declare a variable with an ElementHandle
	const box = await element.boundingBox();
	console.log('box:' + box);
	const x = box['x'];                                // coordinate x
	const y = box['y'];                                // coordinate y
	const w = box['width'];                            // area width
	const h = box['height'];
	console.log('boxes:' + x + ':' + y + ':' + w + ':' + h)
	await element.screenshot({ path: 'vudu-new-movies.jpeg', fullPage: true, type: 'jpeg', quality: 90 });

	//#reactApp > div > div > div > div.nr-page-body > div > div._3WIR9._1d-Xl > div > div > div > div
	//#reactApp > div > div > div > div.nr-page-body > div > div._3WIR9._1d-Xl
	////*[@id="reactApp"]/div/div/div/div[2]/div/div[2]

	// Take the screenshot
	// await page.screenshot({ path: 'vudu-new-movies.png', fullPage: true })
	// await page.waitFor(600000);

	// const movies = await page.$eval("._3WIR9", e => e.innerHTML);
	// console.log('movies:' + movies.scrollHeight + ':' + movies.scrollWidth)

	await browser.close()
}

main()
