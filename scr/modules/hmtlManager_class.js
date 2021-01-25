'use strict';

import ProductCell from "./productCell_class.js";
import ProductsStorage from "./poductsStorage_class.js";


export default class HtmlManager {
  _productsPlaceHolder = document.getElementById('productsPlaceholder-wraper');
  _storage = new ProductsStorage();
  constructor() {
    if (!HtmlManager._instance) {
      HtmlManager._instance = this;
    }
    return HtmlManager._instance;
  }

  _updateDOMlinks() {
    const products = this._storage.getProducts();
    for (const product of products) {
      product.initializeDomElementVal();
    }
  }

  clearProducts() {
    this._storage.clearStorage();
    this._productsPlaceHolder.innerHTML = '';
  }

  addProduct(prodData) {
    const productID = this._storage.getNextID();
    const product = new ProductCell(prodData, productID);
    this._productsPlaceHolder.innerHTML += product.getElmentHtml();
    product.initializeDomElementVal();
    this._storage.storageProduct(product);
    this._updateDOMlinks();
  }

  filter(filter) {
    const ruleCb = filter.ruleCb;
    const products = this._storage.getProducts();
    for (const product of products) {
      if (ruleCb(product)) {
        if (filter.isChecked()) {
          product.addFilterBlock();
          console.log('add');
        }  else product.removeFilterBlock(); console.log('remove');
      }
      product.show();
    }
  }

  sortByField(field) {
   this._storage.sortByField(field);
   const products = this._storage.getProducts();
   console.log(products);
   products.forEach((prod, i) => {
    prod.domElement.style.order = i;
  });
  }

}



