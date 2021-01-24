'use strict';

const cheerio = require('cheerio');
const request = require('request');

const Database = require('../Database').Database;
const port = `mongodb+srv://mezgoodle:cXiZf1YUZTNtMrX8@grechkacom.dwpvy.mongodb.net/database?retryWrites=true&w=majority`;
const database = new Database(port);

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
        let brandInDB = null;
        brandInDB = await database.find('Manufacturer', {companyName: brand});
        if (brandInDB === null) await database.addNew('Manufacturer', {companyName: brand});
      });
    });

    //if no buckweat category add
    let productCategory = null;
    productCategory = await database.find('Product', {categoryType: 'buckwheat'});
    if (productCategory === null) productCategory = await database.addNew('Product', {categoryType: 'buckwheat'});

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
        manufacturerId = await database.find('Manufacturer', {companyName: brands[i]});
        if (manufacturerId !== null) manufacturerId = manufacturerId._id;
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
      let productInDB = null;
      productInDB = await database.find('Product', {productName: title});
      if (productInDB === null) await database.addNew('Product', product);
      else await database.update('Product', {productName: title}, product);
      console.log(product.productName);
    });
  });
}

function GToKG(weight) {
  if (weight === null) return null;
  else if (weight.includes('кг')) return weight.substring(0, weight.length - 3).match(/\d+/gm)[0];
  else return weight.substring(0, weight.length - 2).match(/\d+/gm)[0]/1000;
}
