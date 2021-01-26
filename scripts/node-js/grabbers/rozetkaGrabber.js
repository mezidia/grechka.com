'use strict';

const cheerio = require('cheerio');
const request = require('request');

const GToKG = require('../GToKG').GToKG;
const Database = require('../Database').Database;
const config = require('../config.json');
const dbVar = config.development.database;
const database = new Database(dbVar);

grab('https://rozetka.com.ua/ua/krupy/c4628397/sort=cheap;vid-225787=grechka/');
const brands = [];

function grab(site) {
  request(site, async (error, response, html) => {
    if (error || response.statusCode !== 200) return;
    const $ = cheerio.load(html);
    $('.sidebar-block').each((i, el) => {
      if ($(el).attr('data-filter-name') !== 'producer') return;
      $(el).find('a').each(async (t, item) => {
        const title = $(item).text();
        const index = title.lastIndexOf('(');
        const brand = title.slice(0, index);
        brands.push(brand.trim());

        //check if brand is in DB
        await database.checkDB('Manufacturer', {companyName: brand}).catch(err => {
          console.log(err);
        });
      });
    });

    //if no buckweat category add
    const productCategory = await database.checkDB('Category', {categoryType: 'buckwheat'}).catch(err => {
      console.log(err);
    });

    //get first ten items
    $('.goods-tile').each(async (i, el) => {
      if (i >= 10) return;
      const title = $(el).find('.goods-tile__title').text();
      const link = $(el).find('.goods-tile__picture').attr('href');
      const img = $(el).find('.lazy_img_hover').attr('src');
      const price = $(el).find('.goods-tile__price-value').text();
      let weight = title.match(/(\d\,\d+|\d+) к?г/gm);
      if (weight) weight = weight[0];
      let manufacturer = null;
      let manufacturerId = null;
      for (let i = 0; i < brands.length; i++) {
        const isB = title.toLowerCase().includes(brands[i].toLowerCase());
        if (!isB) continue;
        manufacturer = brands[i];
        manufacturerId = await database.find('Manufacturer', {companyName: brands[i]}).catch(err => {
          console.log('error when finding manufacturer of product' + err);
        });
        if (manufacturerId) manufacturerId = manufacturerId._id;
      }
      const product = {
        productName: title,
        categoryId: productCategory._id,
        manufacturerId: manufacturerId,
        weight: GToKG(weight),
        price: price,
        priceSegment: 'DIY',
        productURL: link,
        productImgURL: img,
        description: null,
      }
      await database.updateDB('Product', product).catch(err => {
        console.log(err);
      });
    });
  });
}
