/*DIOR WEBSITE */
'use strict'

const cheerio = require('cheerio');
const request = require('request');
const Sequelize = require('sequelize');

const msg = require('./Postgresql-orm.js');

const scrapeController = {

	getData: (req, res, next) => {
		console.log("i'm in getData");

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
		console.log("I'm in updatetable");

		msg.Company.create ({ companyname: 'Dior', mainurl: 'http://www.dior.com/beauty/en_us/home.html' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[0], visible: 't' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[1], visible: 't' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[2], visible: 't' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[3], visible: 't' }).then(function(company){});
	  next();
	},
	queryTable: (req, res, next) => {
		console.log("im in queryT");

		msg.Product.findAll({
			attributes: ['productname'],
		})
		.then(function(products,req){
			 let array = [];
				products.forEach( value => {
					array.push(value.dataValues.productname);
				});
				console.log("this is array", array);
		})
	}
};
module.exports = scrapeController;