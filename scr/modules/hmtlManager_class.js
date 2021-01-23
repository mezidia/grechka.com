'use strict';

import ProductCell from "./productCell_class.js";


export default class HtmlManager {
  _productsPlaceHolder = document.getElementById('productsPlaceholder-wraper');
  constructor() {
    if (!HtmlManager._instance) {
      HtmlManager._instance = this;
    }
    return HtmlManager._instance;
  }

  clearProducts() {
    this._productsPlaceHolder.innerHTML = '';
  }

  addProduct(prodData) {
    console.log(prodData);
    this._productsPlaceHolder.innerHTML += new ProductCell(prodData).getElmenHtml();
  }
}



