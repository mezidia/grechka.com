'use strict';

import ProductCell from "./productCell_class.js";
import ProductsStorage from "./poductsStorage_class.js";


export default class HtmlManager {
  _overlay = document.getElementById('overlay');
  _graphRef = document.getElementById('graph_ref');
  _filterRef = document.getElementById('filter_ref');
  _secondaryGraphic = document.getElementById('secondary-graphic');
  _filters = document.getElementById('main-filters');
  _productsPlaceHolder = document.getElementById('productsPlaceholder-wraper');
  _sortRadioBtn = document.getElementsByName('sort');
  _priceFormFrom = document.getElementById('priceLimit-input-from');
  _priceFormTo = document.getElementById('priceLimit-input-to');
  _priceFormSubmit = document.getElementById('submitPriceLimit-btn');
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

  submitPriceForm = () => {
    const [from, to] = this.getPriceFormLimits();
    const reg = /^\d+$/;
    if (!reg.test(from) || !reg.test(to)) return;
    if (from >= to) return;
    const filter = {
      'ruleCb': (product) => {
        const weight = +product.weight;
        if (weight >= +from && weight <= +to) {
          return false;
        } else return true;
      },
      'isChecked': () => {
        return this._priceFormSubmit.textContent === 'Підтвердити' ? true : false;
      }
    };
    this.filter(filter);
    console.log(this._priceFormSubmit.textContent);
    const btnVal = this._priceFormSubmit.textContent === 'Підтвердити' ? 'Скасувати' : 'Підтвердити';
    if (btnVal === 'Підтвердити') {
      this._priceFormFrom.readOnly = false;
      this._priceFormTo.readOnly = false;
    } else {
      this._priceFormFrom.readOnly = true;
      this._priceFormTo.readOnly = true;
    }
    this._priceFormSubmit.textContent = btnVal;

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

  getPriceFormLimits() {
    return [this._priceFormFrom.value, this._priceFormTo.value];
  }

  filter(filter) {
    const ruleCb = filter.ruleCb;
    const products = this._storage.getProducts();
    for (const product of products) {
      if (ruleCb(product)) {
        if (filter.isChecked()) {
          product.addFilterBlock();
          console.log('add');
        } else {
          product.removeFilterBlock();
          console.log('remove');
        }
      }
      product.show();
    }
  }

  getActiveRadioSort() {
    for (const radio of this._sortRadioBtn) {
      if (radio.checked) return radio;
    }
  }

  sortByField(field, reverse = false) {
   this._storage.sortByField(field, reverse);
   const products = this._storage.getProducts();
   console.log(products);
   products.forEach((prod, i) => {
    prod.domElement.style.order = i;
  });
  }

  goBack = () => {
    this._filters.style = '';
    this._secondaryGraphic.style.display = 'none';
    this._graphRef.style.display = 'block';
    this._filterRef.style.display = 'block';
    this._filters.style.position = 'relative';
  }

  openNav = () => {
    this._overlay.style.width = '100%';
  }
  
  closeNav = () => {
    this.goBack();
    this._overlay.style.width = '0';
  }
  
  graphRef = () => {
    this._graphRef.style.display = 'none';
    this._filterRef.style.display = 'none';
    this._secondaryGraphic.style.display = 'block';
  }
  
  filterRef = () => {
    this._graphRef.style.display = 'none';
    this._filterRef.style.display = 'none';
    this._filters.style.display = 'block';
    this._filters.style.position = 'absolute';
  }
  
}
