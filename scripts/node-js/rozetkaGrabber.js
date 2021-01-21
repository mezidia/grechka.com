'use strict';

const cheerio = require('cheerio');
const request = require('request');

let n = 0;

grab('https://rozetka.com.ua/ua/krupy/c4628397/sort=cheap;vid-225787=grechka/');
const brends = [];

function grab(site) {
  request(site, (error, response, html) => {
    if (error || response.statusCode !== 200) return;
    const $ = cheerio.load(html);
    $('.sidebar-block').each((i, el) => {
      if ($(el).attr('data-filter-name') !== 'producer') return;
      $(el).find('a').each((t, item) => {
        const title = $(item).text();
        const index = title.lastIndexOf('(');
        const brend = title.slice(0, index);
        brends.push(brend.trim());
      });
    })
    $('.goods-tile').each((i, el) => {
      if (n === 10) return;
      const title = $(el).find('.goods-tile__title').text();
      const link = $(el).find('.goods-tile__picture').attr('href');
      const img = $(el).find('.lazy_img_hover').attr('src');
      const price = $(el).find('.goods-tile__price-value').text();
      const weight = title.match(/(\d\,\d+|\d+) к?г/gm);
      let manufacturer = null;
      for (let i = 0; i < brends.length; i++) {
        const isB = title.toLowerCase().includes(brends[i].toLowerCase());
        if (isB) manufacturer = brends[i];
      }
      console.log(title, link, img, price, weight, manufacturer);
      n++;
    });
  });
}
