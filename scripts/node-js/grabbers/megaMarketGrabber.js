'use strict';

const cheerio = require('cheerio');
const request = require('request');

const GToKG = require('../GToKG').GToKG;
const Database = require('../Database').Database;
const config = require('../config.json');
const dbVar = config.development.database;
const database = new Database(dbVar);

grab('https://megamarket.zakaz.ua/uk/categories/pulses-and-grain-megamarket/genus_species=buckwheat/?sort=price_asc');
const brands = [];

function grab(site) {
  request(site, async (error, response, html) => {
    if (error || response.statusCode !== 200) return;
    const $ = cheerio.load(html);
    $('.jsx-2105045955').each((i, el) => {
      if ($(el).find('.collapse-panel__label').text() !== 'Торгова марка') return;
      $(el).find('.jsx-4009329735').each(async (t, item) => {
        const title = $(item).text();
        const brand = title.match(/[^\d]+/gm)[0];
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

    //get first ten products
    $('.product-tile').each(async (i, el) => {
      if (i >= 10) return;
      const title = $(el).find('.product-tile__title').text();
      const link = $(el).attr('href');
      const img = $(el).find('img').attr('src');
      const price = $(el).find('.Price__value_caption').text();
      const weight = $(el).find('.product-tile__weight').text();
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
        productURL: 'https://megamarket.zakaz.ua' + link,
        productImgURL: img,
        description: null,
      }
      await database.updateDB('Product', product).catch(err => {
        console.log(err);
      });
    });
  });
}
