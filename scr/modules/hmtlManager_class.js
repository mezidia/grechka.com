'use strict';

import ProductCell from "./productCell_class.js";


export default class HtmlManager {
  _productsPlaceHolder = document.getElementById('productsPlaceholder-wraper');
  _products = [];
  constructor() {
    if (!HtmlManager._instance) {
      HtmlManager._instance = this;
    }
    return HtmlManager._instance;
  }

  clearProducts() {
    _products = [];
    this._productsPlaceHolder.innerHTML = '';
  }

  addProduct(prodData) {
    const productID = this._products.length;
    const product = new ProductCell(prodData, productID);
    this._productsPlaceHolder.innerHTML += product.getElmentHtml();
    const htmlElement = document.getElementById(productID);
    product.htmlElement = htmlElement;
    this._products.push(product);
    console.log(product);
  }

  filter(ruleCB) {
    for (const product of this._products) {
      console.log(product);
      if (ruleCB(product.weight)) {
        product.htmlElement.style.display = 'none';
      }
    }
  }


}



