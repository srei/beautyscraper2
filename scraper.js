/*DIOR WEBSITE */
'use strict'

const cheerio = require('cheerio');
const request = require('request');
const Sequelize = require('sequelize');
const $ = require('jquery');

const msg = require('./Postgresql-orm.js');

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
		msg.Company.create ({ companyname: 'Dior', mainurl: 'http://www.dior.com/beauty/en_us/home.html' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[0], visible: 't' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[1], visible: 't' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[2], visible: 't' }).then(function(company){});
	  msg.Product.create ({ productname: req.prod[3], visible: 't' }).then(function(company){});
	  next();
	},
	queryTable: (req, res, next) => {
		msg.Product.findAll({
			attributes: ['productname'],
		})
		.then(function(products){
			 let array = [];
				products.forEach( value => {
					array.push(value.dataValues.productname);
				});
				$('#CompanyName').append(`"<div>${array[0]}</div>"`);
			  $('#CompanyName').append(`"<div>${array[1]}</div>"`);
			  $('#CompanyName').append(`"<div>${array[2]}</div>"`);
			  $('#CompanyName').append(`"<div>${array[3]}</div>"`);
			});
	}
};
module.exports = scrapeController;