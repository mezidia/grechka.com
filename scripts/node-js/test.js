'use strict';

const mongoose = require('mongoose');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');
const Package = require('./models/package');
const Cost = require('./models/cost');
const History = require('./models/history');
const Product = require('./models/product');

mongoose.connect(
  `mongodb+srv://mezgoodle:${process.env.MONGO_PW}@grechkacom.dwpvy.mongodb.net/database?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.once('close', () => {
  console.log('MongoDB database connection closed successfully');
});

const category = new Category({
  categoryType: 'ketchups',
});
category
  .save()
  .then(result => {
    console.log('Add category: ');
    console.log(result);
  })
  .catch(err => console.error(err));

const manufacturer = new Manufacturer({
  companyName: 'ATB',
  country: 'Ukraine'
});
manufacturer
  .save()
  .then(result => {
    console.log('Add manufacturer: ');
    console.log(result);
    console.log();
  })
  .catch(err => console.error(err));

const packageObj = new Package({
  packageType: 'Box',
});
packageObj
  .save()
  .then(result => {
    console.log('Add package: ');
    console.log(result);
    console.log();
  })
  .catch(err => console.error(err));

Category.findOne({categoryType: "ketchups"})
  .exec()
  .then(category => {
    console.log(`Founded category with id: ${category._id}`);
    Manufacturer.findOne({companyName: "ATB"})
      .exec()
      .then(manufacturer => {
        console.log(`Founded manufacturer with id: ${manufacturer._id}`);
        Package.findOne({packageType: "Box"})
          .exec()
          .then(packageObj => {
            console.log(`Founded package with id: ${packageObj._id}`);

            const product = new Product({
              productName: 'Car',
              categoryId: category._id,
              manufacturerId: manufacturer._id,
              weight: 3200,
              packageId: packageObj._id,
              priceSegment: 'Low',
              productURL: 'https://google.com.ua',
              productImgURL: 'https://google.com.ua/images',
              description: 'Renault Logan black color',
            });
            product
              .save()
              .then(result => {
                console.log('Add product: ');
                console.log(result);
                console.log();
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
          })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

Product.findOne({productName: 'Car'})
  .exec()
  .then(product => {
    console.log(`Founded product with id: ${product._id}`);

    const cost = new Cost({
      productId: product._id,
      price: 9000000,
      date: new Date(),
    })
    cost
      .save()
      .then(result => {
        console.log('Add cost: ');
        console.log(result);
        console.log();
      })
      .catch(err => console.error(err))

    const history = new History({
      productId: product._id,
      price: 9000000,
      date: new Date(),
    })
    history
      .save()
      .then(result => {
        console.log('Add history: ');
        console.log(result);
        console.log();
      })
      .catch(err => console.error(err))
  })
  .catch(err => console.error(err))

Product.remove({productName:"Car"})
  .exec()
  .then(result => {
    console.log('Product deleted: ')
    console.log(result)
  })
  .catch(err => console.error(err));

Product.updateOne({productName:"Car"}, { $set: {priceSegment: "High"} })
  .exec()
  .then(result => {
    console.log('Product updated')
    console.log(result)
  })
  .catch(err => console.error(err))
