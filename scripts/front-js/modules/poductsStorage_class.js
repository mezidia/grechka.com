'use strict';

export default class ProductsStorage {
  _products = [];
  constructor() {
    if (!ProductsStorage._instance) {
      ProductsStorage._instance = this;
    }
    return ProductsStorage._instance;
  }

  _byField(field){
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }

  clearStorage() {
    this._products = [];
  }

  getAllValsOfProdField(field) {
    const res = [];
    for (const product of this._products) {
      res.push(product[field]);
    }
    return [...new Set(res)]; // remove dublicates
  }

  storageProduct(product) {
    this._products.push(product);
    console.log('peoduct storaged: ' + JSON.stringify(product));
  }

  getProducts() {
    return this._products;
  }

  getNextID() {
    return this._products.length;
  }

  getLastProduct() {
    return this._products[this._products.length - 1];
  }

  sortByField(field, reverse = false) {
    const res = this._products.sort(this._byField(field));
    if (reverse) res.reverse();
    return res;
  }

}
