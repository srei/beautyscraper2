/*DIOR WEBSITE */
'use strict'

const cheerio = require('cheerio');
const request = require('request');
const Sequelize = require('sequelize');
const msg = require('./Postgresql-orm.js');
const ejs = require('ejs');
const image = require('image-scraper');


const scrapeController = {

	getData: (req, res, next) => {
		const url = req.query.url || 'http://www.dior.com/beauty/en_us/fragrance-beauty/makeup/face/foundation/fr-foundation-foundation.html';

		let productCategory = [];
		request(url, (error, response, html) => {
			let $ = cheerio.load(html);
			$('.category-title').each((i, el) => {
				productCategory.push( $(el).text());
			});
			req.prod = productCategory;
			next();
		});
},

	updateTable: (req, res, next) => {

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
	}
};

module.exports = scrapeController;