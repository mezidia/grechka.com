'use strict';

const Database = require('./Database').Database;
const port = `mongodb+srv://mezgoodle:${process.env.MONGO_PW}@grechkacom.dwpvy.mongodb.net/database?retryWrites=true&w=majority`;
const database = new Database(port);

//add new category and find its id
database.addNew('Category', {categoryType: 'Games'});
const gamesCategory = database.find('Category', {categoryType: 'Games'});

//add new manufacturer and find its id
database.addNew('Manufacturer', {
    companyName: 'BestGamesEver',
    country: 'Ukraine'
  });
const gamesManufacturer = database.find('Manufacturer', {companyName: 'BestGamesEver'});

//add new product
database.addNew('Product', {
    productName: 'Car',
    categoryId: gamesCategory._id,
    manufacturerId: gamesManufacturer._id,
    weight: 3200,
    price: 300000,
    priceSegment: 'Low',
    productURL: 'https://google.com.ua',
    productImgURL: 'https://google.com.ua/images',
    description: 'Renault Logan black color',
  });

//update product
database.update('Product', {productName: 'Car'}, {price: 100000000});

//get all history
const product = database.find('Product', {productName: 'Car'});
const productid = product._id;
const history = database.find('History', {productId: productid});
console.log(history);


//remove product
database.remove('Product', {productName: 'Car'});
