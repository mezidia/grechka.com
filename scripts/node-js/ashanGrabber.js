'use strict';

const cheerio = require('cheerio');
const request = require('request');

let n = 0;

grab('https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/?sort=price_asc');

function grab(site) {
  request(site, (error, response, html) => {
    if (error || response.statusCode !== 200) return;
    const $ = cheerio.load(html);
    $('.product-tile').each((i, el) => {
      if (n === 10) return;
      const title = $(el).find('.product-tile__title').text();
      const link = $(el).attr('href');
      const img = $(el).find('img').attr('src');
      const price = $(el).find('.Price__value_caption').text();
      const weight = $(el).find('.product-tile__weight').text();
      console.log(title, 'https://auchan.zakaz.ua' + link, img, price, weight);
      n++;
    });
  });
}
