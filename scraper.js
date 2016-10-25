/*DIOR WEBSITE */

'use strict'

const cheerio = require('cheerio');
const request = require('request');

const scrapeController = {
	getData: (req, res, next) => {
		//req.query.url obtains the parsed version of the URL
		const url = req.query.url || 'http://www.dior.com/beauty/en_us/fragrance-beauty/makeup/face/foundation/fr-foundation-foundation.html';

	request(url, (error, response, html) => {
		let $ = cheerio.load(html);
		const superResult = [];
		const productCategory = [];
		//beginning of scraping
			$('.category-title').each((i, el) => {
				productCategory[i] = $(el).text();
			});

		console.log('this is productCategory', productCategory);
	});//end of request
	}// end of getData
}; // end of scrapeController







/* DATA BEING SCRAPED:
- Broad Category (i.e. what it is)
- Specific Name of Product
- each shade nume + picture

 */
module.exports = scrapeController;


/*example for image
function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html)
  // get all img tags and loop over them
  var imageURLs = []
  parsedHTML('a').map(function(i, link) {
    var href = $(link).attr('href')
    if (!href.match('.png')) return
    imageURLs.push(domain + href)
  })
}

*/