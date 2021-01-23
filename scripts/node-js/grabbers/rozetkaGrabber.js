'use strict';

const cheerio = require('cheerio');
const request = require('request');

grab('https://rozetka.com.ua/ua/krupy/c4628397/sort=cheap;vid-225787=grechka/');
const brands = [];

function grab(site) {
  request(site, (error, response, html) => {
    if (error || response.statusCode !== 200) return;
    const $ = cheerio.load(html);
    $('.sidebar-block').each((i, el) => {
      if ($(el).attr('data-filter-name') !== 'producer') return;
      $(el).find('a').each((t, item) => {
        const title = $(item).text();
        const index = title.lastIndexOf('(');
        const brand = title.slice(0, index);
        brands.push(brand.trim());
      });
    });
    $('.goods-tile').each((i, el) => {
      if (i >= 10) return;
      const title = $(el).find('.goods-tile__title').text();
      const link = $(el).find('.goods-tile__picture').attr('href');
      const img = $(el).find('.lazy_img_hover').attr('src');
      const price = $(el).find('.goods-tile__price-value').text();
      let weight = title.match(/(\d\,\d+|\d+) к?г/gm);
      if (weight) weight = weight[0];
      let manufacturer = null;
      for (let i = 0; i < brands.length; i++) {
        const isB = title.toLowerCase().includes(brands[i].toLowerCase());
        if (isB) manufacturer = brands[i];
      }
      console.log(i, title, link, img, price, weight, manufacturer);
    });
  });
}
