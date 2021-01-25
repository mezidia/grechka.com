'use strict';

import ProductCell from "./productCell_class.js";
import ProductsStorage from "./poductsStorage_class.js";


export default class HtmlManager {
  _overlay = document.getElementById('overlay');
  _graphRef = document.getElementById('graph_ref');
  _filterRef = document.getElementById('filter_ref');
  _secondaryGraphic = document.getElementById('secondary-graphic');
  _secondaryFilters = document.getElementById('secondary-filters');
  _productsPlaceHolder = document.getElementById('productsPlaceholder-wraper');
  _sortRadioBtn = document.getElementsByName('sort');
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

  synchronize = (mainToSecondary) => {
    const checkboxes = document.getElementsByClassName('filter-checkbox');
    const mainCheckboxes = [...checkboxes].filter(checkbox => checkbox.id.split('-')[1].length == 1);
    const secondaryCheckboxes = [...checkboxes].filter(checkbox => checkbox.id.split('-')[1].length == 2);
    for (let i = 0; i < mainCheckboxes.length; ++i) {
      if(mainToSecondary) {
        secondaryCheckboxes[i].checked = mainCheckboxes[i].checked;
      } else {
        mainCheckboxes[i].checked = secondaryCheckboxes[i].checked;
      }
    }
  }

  goBack = () => {
    this._secondaryFilters.style.display = 'none';
    this._secondaryGraphic.style.display = 'none';
    this._graphRef.style.display = 'block';
    this._filterRef.style.display = 'block';
    this.synchronize(false);
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
    this.synchronize(true);
  }
  
  filterRef = () => {
    this._graphRef.style.display = 'none';
    this._filterRef.style.display = 'none';
    this._secondaryFilters.style.display = 'block';
    this.synchronize(true);
  }
  
}
