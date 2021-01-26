'use strict';

const Database = require('./Database').Database;
const config = require('./config.json');
const dbVar = config.development.database;
const database = new Database(dbVar);

exec();

async function exec() {
  //add new category and find its id
  await database.addNew('Category', {categoryType: 'Games'});
  const gamesCategory = await database.find('Category', {categoryType: 'Games'});

  //add new manufacturer and find its id
  await database.addNew('Manufacturer', {
    companyName: 'BestGamesEver',
    country: 'Ukraine'
  });
  const gamesManufacturer = await database.find('Manufacturer', {companyName: 'BestGamesEver'});

  //add new product
  await database.addNew('Product', {
    productName: 'Doll',
    categoryId: gamesCategory._id,
    manufacturerId: gamesManufacturer._id,
    weight: 3200,
    price: 8000,
    priceSegment: 'Low',
    productURL: 'https://google.com.ua',
    productImgURL: 'https://google.com.ua/images',
    description: 'Doll black color',
  });

  //update product
  await database.update('Product', {productName: 'Doll'}, {price: 900});

  //get all history
  const product = await database.find('Product', {productName: 'Doll'});
  const productid = product._id;
  const history = await database.find('History', {productId: productid});
  console.log('all history: ' + history);

  //remove product and all its history
  await database.remove('Product', {productName: 'Doll'});
}

