'use strict'

const express = require('express');
// const data = require('./helloModel.js');
const app = express();
const scraperController = require('./scraper');

// app.get('/mock', (req, res) => {
// 	//creates schema object and saves to database
// 	console.log("HI");
// 	data.create({
// 		title: 'mockMakeup',
// 		liquid: true,
// 		price: 5,
// 	});
// });

//request("http://www.sitepoint.com").pipe(fs.createWriteStream("jspro.htm"));  ==> wil write the source code into the file - jspro.htm


//allowing cross-origin resource sharing: allows API to respond to requests from anywhere
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
})

//
app.get('/', scraperController.getData);


app.listen(3000, (err) => {
	if(err) console.log("error connecting to Port 3000");
	console.log('Connected on Port 3000!!!');
});

module.exports = app;