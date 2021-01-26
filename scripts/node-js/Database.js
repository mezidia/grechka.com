'use strict';

const mongoose = require('mongoose');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');
const History = require('./models/history');
const Product = require('./models/product');

class Database {
  constructor(dbVar) {
    if (Database._instance) return Database._instance;
    Database._instance = this;
    mongoose.connect(
      `mongodb+srv://mezgoodle:${dbVar}@grechkacom.dwpvy.mongodb.net/database?retryWrites=true&w=majority`,
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
    return Database._instance;
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
      } catch (err) {
        console.error(err);
      }
      if (schemas[i].modelName === 'Product') await this.updateHistory(result._id, result.price).catch(err => {
        console.log('error when updating product history' + err);
      });
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
      } catch(err) {
        console.error(err);
      }
      if (schemas[i].modelName === 'History') await this.find('History', obj).catch(err => {
        console.log('error when finding product history' + err);
      });;
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
      } catch (err) {
        console.error(err);
      }
      return result;
    }
    return null;      
  }

  //get all data by table name from db
  getAllByTableName(tableName) {
    let result = null;
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      schemas[i].find({}, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          result = res;
        }
      });
    }
    return result;
  }

  //checks if obj exists, if not, creates it
  //returns object
  async checkDB(tableName, obj) {
    let inDB = null;
    inDB = await this.find(tableName, obj).catch(err => {
      console.log('error when finding ' + tableName + err);
    });
    if (!inDB) inDB = await this.addNew(tableName, obj).catch(err => {
      console.log('error when creating ' + tableName + err);
    });
    return inDB;
  }

  //if Product exists updates it, else creates it
  async updateDB(tableName, obj) {
    if (tableName !== 'Product') return;
    let productInDB = null;
    productInDB = await this.find(tableName, {productName: obj.productName}).catch(err => {
      console.log('error when finding product in DB' + err);
    });
    if (!productInDB) await this.addNew(tableName, obj).catch(err => {
      console.log('error when creating new product ' + err);
    });
    else await this.update(tableName, {productName: obj.productName}, obj).catch(err => {
      console.log('error when updating product ' + err);
    });
    console.log('success ' + obj.productName);
  }

  //should be private
  async updateHistory(id, price) {
    let history = null
    history = await this.find('History', {productId: id}).catch(err => {
      console.log('error when finding product history' + err);
    });
    if (history === null) {
      history = new History({productId: id,
                            data: '{}'});
      await history.save().catch(err => {
        console.log('error when saving product history' + err);
      });;
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
