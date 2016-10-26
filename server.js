'use strict'

const express = require('express');
const app = express();
const scraperController = require('./scraper');
const path = require('path');
const ejs = require('ejs');

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


// app.use('/', express.static(path.join(__dirname + '/html')));

app.get('/', scraperController.getData, scraperController.updateTable, scraperController.queryTable);

// app.get('/displayPage', scraperController.updateTable);

// app.get('/display', )



app.listen(3000, (err) => {
	if(err) console.log("error connecting to Port 3000");
	console.log('Connected 3000');
});

module.exports = app;