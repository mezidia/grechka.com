'use strict';

const cheerio = require('cheerio');
const request = require('request');

let n = 0;

grab('https://rozetka.com.ua/ua/krupy/c4628397/sort=cheap;vid-225787=grechka/');

function grab(site) {
  request(site, (error, response, html) => {
    if (error || response.statusCode !== 200) return;
    const $ = cheerio.load(html);
    $('.goods-tile').each((i, el) => {
      if (n === 10) return;
      const title = $(el).find('.goods-tile__title').text();
      const link = $(el).find('.goods-tile__picture').attr('href');
      const img = $(el).find('.lazy_img_hover').attr('src');
      const price = $(el).find('.goods-tile__price-value').text();
      console.log(title, link, img, price);
      n++;
    });
  });
}
