const puppeteer = require('puppeteer')

const fbSign = async (page) => {
	console.log('Starting new session')
	let SECRET_EMAIL = 'funny@email.com'
	let SECRET_PASSWORD = 'pass'
	// const page = await browser.newPage()
	await page.goto('https://facebook.com', { waitUntil: 'networkidle2' })
	await page.waitForSelector('._featuredLogin__formContainer')
	await page.type('input#email', SECRET_EMAIL)
	await page.type('input#pass', SECRET_PASSWORD)
	await page.click('button[name="login"]')
	console.log('FB click done')
}

const screenshotPDF = async (page) => {
	// const page = await browser.newPage()
	await page.goto('https://www.vudu.com/content/movies/uxrow/4K-UHD/74?offset=1200', { waitUntil: 'networkidle2' })
	await page.waitFor(10000);
	await page.pdf({ path: 'vudu-4k-movies.pdf', format: 'A4' })
}


async function autoScroll(page) {
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			var totalHeight = 0;
			var distance = 400;
			var timer = setInterval(() => {
				var scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}

const screenshotPNG = async (page) => {
	// const page = await browser.newPage()
	await page.goto('https://www.vudu.com/content/movies/uxrow/New-Rentals/53', { waitUntil: 'networkidle2' })

	await autoScroll(page);
	// await page.waitForSelector('._2CCgL');        // wait for the selector to load

	await page.screenshot({ path: 'vudu-new-movies.png', fullPage: true });

	// // Get the "viewport" of the page, as reported by the page.
	// const dimensions = await page.evaluate(() => {
	// 	return {
	// 		width: document.documentElement.clientWidth,
	// 		height: document.documentElement.clientHeight,
	// 		deviceScaleFactor: window.devicePixelRatio
	// 	};
	// });
	// console.log('Dimensions:', dimensions);

	// const movies = await page.$eval("._2CCgL")
	// const elem_dimensions = await movies.evaluate(() => {
	// 	return {
	// 		width: document.documentElement.clientWidth,
	// 		height: document.documentElement.clientHeight,
	// 		deviceScaleFactor: window.devicePixelRatio
	// 	};
	// });
	// console.log('Dimensions:', elem_dimensions);
}

const main = async () => {
	const browser = await puppeteer.launch({
		args: ['--start-maximized'],
		headless: false,
		defaultViewport: null
	})
	const page = await browser.newPage()

	try {
		await screenshotPNG(page);
		// await screenshotPDF(page);
		// await fbSign(page);
	} catch (err) {
		console.log("SCRIPT ERROR: (" + err.name + " - " + err.message + ")");
		console.log(err);
	}

	//clean up
	await browser.close()
}

main()
