'use strict'

const express = require('express');
const app = express();
const scraperController = require('./scraper');
const path = require('path');
const ejs = require('ejs');

//allowing cross-origin resource sharing: allows API to respond to requests from anywhere
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
})

app.use(express.static(__dirname + '/Static'));

app.get('/', scraperController.getData, scraperController.updateTable, scraperController.queryTable);

app.listen(3000, (err) => {
	if(err) console.log("error connecting to Port 3000");
	console.log('Connected 3000');
});

module.exports = app;