/*DIOR WEBSITE */
'use strict'

const cheerio = require('cheerio');
const request = require('request');
const Sequelize = require('sequelize');
const msg = require('./Postgresql-orm.js');
const ejs = require('ejs');


const scrapeController = {

	getData: (req, res, next) => {

		const url = req.query.url || 'http://www.dior.com/beauty/en_us/fragrance-beauty/makeup/face/foundation/fr-foundation-foundation.html';
		let productCategory = [];
		// let headerLogoUrl = "";
		request(url, (error, response, html) => {
			let $ = cheerio.load(html);
				$('.category-title').each((i, el) => {
					productCategory.push( $(el).text());
				});
				// headerLogoUrl = $('.header-logo a').text();
				// #header > div.diorcom-header-bar.js-header-bar > div.header-bar-content.js-header-content > h3 > a

			req.prod = productCategory;
			// req.headerLogo = headerLogoUrl;
			next();
		});
},
	updateTable: (req, res, next) => {
		// msg.sequelize.sync({ force: true }).then(() => {});

		msg.Company.create ({ companyname: 'Dior', mainurl: 'http://www.dior.com/beauty/en_us/home.html' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[0]}).then(function(company){});
	  msg.Product.create ({ productname: req.prod[1]}).then(function(company){});
	  msg.Product.create ({ productname: req.prod[2]}).then(function(company){});
	  msg.Product.create ({ productname: req.prod[3]}).then(function(company){});
	  next();
	},
	queryTable: (req, res, next) => {
			let first = req.prod[0];
			let second = req.prod[1];
			let third = req.prod[2];
			let fourth = req.prod[3];

		res.render('index.ejs', {firstDiv: first, secondDiv: second, thirdDiv: third, fourthDiv: fourth});
				// });
		}
}; // end of SCRAPECONTROLLER
module.exports = scrapeController;