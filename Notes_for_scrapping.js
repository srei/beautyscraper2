'use strict';

const cheerio = require('cheerio');
const request = require('request');


const scrapeController = {
  getData: (req, res, next) => {
    const url = req.query.url || 'http://boards.4chan.org/mu/';

    request(url, (error, response, html) => {
      let $ = cheerio.load(html);
      const a  = `http://boards.4chan.org`;

      const superResult = [];

      const allLinks = [];
      $('.boardList a').each((i, el) => {
        allLinks.push(a + $(el).attr('href'));
      });

      const superPromise = allLinks.map(url => {
        return new Promise((resolve, reject) => {
          request(url, (error, response, html) => {
            let $ = cheerio.load(html);

            const threads = [];
            $('.thread').each(function () {
              const text = $(this).find('.postMessage').text();
              const id = $(this).find('.postMessage').attr('id');

              threads.push({ id, text });
            });
            console.log(threads);
            superResult.push(threads);
            resolve('');
          });
        });
      });

      Promise.all(superPromise).then(() => res.send(superResult));
      // $('.thread').each(function () {
      //   const text = $(this).find('.postMessage').text();
      //   const id = $(this).find('.postMessage').attr('id');
      //
      //   threads.push({ id, text });
      // });
    });
  }
};

module.exports = scrapeController;


______
'use strict';

const cheerio = require('cheerio');
const request = require('request');

const cache = {};

const scrapeController = {
  getData: (req, res, next) => {
    const url = req.query.url || 'http://boards.4chan.org/mu/';

    new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (cache[url]) resolve(cache[url]);
        else {
          let $ = cheerio.load(html);

          const threads = [];
          $('.thread').each(function () {
            const text = $(this).find('.postMessage').text();
            const id = $(this).find('.postMessage').attr('id');

            threads.push({ id, text });
          });

          cache[url] = threads;
          resolve(threads);
        }
      });
    }).then(threads => {
      request('http://www.imdb.com/chart/top', (error, response, html) => {
        let $ = cheerio.load(html);

        const newThreads = [];

        $('tr').each(function() {
          const img = $(this).find('img').attr('src');
          const title = $(this).find('a').text();
          const rating = $(this).find('strong').text();

          newThreads.push({ title, rating, img });
        });

        res.header("Content-Type", "application/json");
        res.send([threads, newThreads]);
      })
    });


  }
};

module.exports = scrapeController;
____
SERVER:

'use strict';

const express = require('express');
const app = express();
const scraperController = require('./scraper');
const scraperController2 = require('./scraper2');

// first sample route
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', scraperController.getData);

app.get('/super', scraperController2.getData);

app.get('/cats', scraperController.getData);

app.listen(3000);

module.exports = app;