'use strict';

const mongoose = require('mongoose');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');
const History = require('./models/history');
const Product = require('./models/product');

class Database {
  constructor(port) {
    mongoose.connect(
      port,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    this.connection = mongoose.connection;
    this.schemas = [Category, Manufacturer, History, Product];

    this.connection.once('open', () => {
      console.log('MongoDB database connection established successfully');
    });

    this.connection.once('close', () => {
      console.log('MongoDB database connection closed successfully');
    });
  }

  //finds table in database based on name of table
  //input example ('Product', {productName: 'Car'}), first arg string, second arg object
  //output object
  async find(tableName, args) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      let result = null
      try {
        result = await schemas[i].findOne(args).exec();
        console.log('found ' + result);
      } catch (err) {
        console.error(err);
      }
      return result;
    }
    return null;
  }

  //creates new table in database based on name of table
  //input example ('Category', {categoryType: 'ketchup'}), first arg string, second arg object
  //returns new object
  async addNew(tableName, args) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      let result = null;
      try {
        const model = new schemas[i](args);
        result = await model.save();
        console.log('added ' + result);
        if (schemas[i].modelName === 'Product') await this.updateHistory(result._id, result.price);
      } catch (err) {
        console.error(err);
      }
      return result;
    }
    return null;
  }

  //updates table in database based on name of table
  //input example ('Product', {productName:"Car"}, {priceSegment: "High"}), first string, second object, third object
  async update(tableName, obj, data) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      let result = null;
      try {
        result = await schemas[i].updateOne(obj, {$set: data}).exec();
        if (schemas[i].modelName === 'Product') {
          const product = await this.find('Product', obj);
          await this.updateHistory(product._id, product.price);
        }
        if (schemas[i].modelName === 'History') await this.find('History', obj);
      } catch(err) {
        console.error(err);
      }
      return result;
    }
    return null;
  }

  //removes table in database based on name of table
  //input example ('Product', {productName:"Car"}), first string, second object
  async remove(tableName, args) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      let result = null;
      try {
        if (schemas[i].modelName === 'Product') {
          const product = await this.find('Product', args);
          await History.deleteOne({productId: product._id}).exec();
        }
        result = await schemas[i].deleteOne(args).exec();
        console.log('removed ' + result);
      } catch (err) {
        console.error(err);
      }
      return result;
    }
    return null;      
  }

  //should be private
  async updateHistory(id, price) {
    let history = null
    history = await this.find('History', {productId: id});
    if (history === null) {
      history = new History({productId: id,
                            data: '{}'});
      await history.save();
    }
    const date = Date.now();
    const data = JSON.parse(history.data);
    data[date] = price;
    try {
      await this.update('History', {productId: id}, {data: JSON.stringify(data)});
    } catch(err) {
      console.error(err);
    }
  }

}

module.exports = { Database };
