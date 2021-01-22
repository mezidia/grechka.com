'use strict';

const cheerio = require('cheerio');
const request = require('request');

grab('https://megamarket.zakaz.ua/uk/categories/pulses-and-grain-megamarket/genus_species=buckwheat/?sort=price_asc');
const brands = [];

function grab(site) {
  request(site, (error, response, html) => {
    if (error || response.statusCode !== 200) return;
    const $ = cheerio.load(html);
    $('.jsx-2105045955').each((i, el) => {
      if ($(el).find('.collapse-panel__label').text() !== 'Торгова марка') return;
      $(el).find('.jsx-4009329735').each((t, item) => {
        const title = $(item).text();
        const brand = title.match(/[^\d]+/gm)[0];
        brands.push(brand.trim());
      });
    });
    $('.product-tile').each((i, el) => {
      if (i >= 10) return;
      const title = $(el).find('.product-tile__title').text();
      const link = $(el).attr('href');
      const img = $(el).find('img').attr('src');
      const price = $(el).find('.Price__value_caption').text();
      const weight = $(el).find('.product-tile__weight').text();
      let manufacturer = null;
      for (let i = 0; i < brands.length; i++) {
        const isB = title.toLowerCase().includes(brands[i].toLowerCase());
        if (isB) manufacturer = brands[i];
      }
      console.log(i, title, 'https://megamarket.zakaz.ua' + link, img, price, weight, manufacturer);
    });
  });
}
