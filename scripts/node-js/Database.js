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
    for (const i = 0; i < schemas.length; i++) {
      if (schemas[i].name !== tableName) continue;
      let result = null
      try {
        result = await schemas[i].findOne(args).exec();
        console.log('found ' + result.toJSON());
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
    for (const i = 0; i < schemas.length; i++) {
      if (schemas[i].name !== tableName) continue;
      let result = null;
      try {
        const model = new schemas[i](args);
        result = await model.save();
        console.log('saved ' + result.toJSON());
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
    for (const i = 0; i < schemas.length; i++) {
      if (schemas[i].name !== tableName) continue;
      this.updateCost(obj, data.price)
      let result = null;
      try {
        result = await schemas[i].updateOne(obj, {$set: data}).exec();
        if (schemas[i].name === 'Product') this.updateHistory(result._id, result.price);
        console.log('updated  ' + result);
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
    for (const i = 0; i < schemas.length; i++) {
      if (schemas[i].name !== tableName) continue;
      let result = null;
      try {
        result = await schemas[i].remove(args).exec();
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
    history = this.find('History', {productId: id});
    if (!history) {
      history = new History({productId: id});
    }
    const newDate = new Date();
    history[newDate] = price;
    try {
      await history.save();
      console.log('history updated');
    } catch(err) {
      console.error(err);
    }
  }

}

module.exports = { Database };
