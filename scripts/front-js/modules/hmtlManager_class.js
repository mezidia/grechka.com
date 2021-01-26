'use strict';

import ProductCell from "./productCell_class.js";
import ProductsStorage from "./poductsStorage_class.js";
<<<<<<< HEAD
import loadChart from './chart.js'
=======
import TagFilterCell from "./tagFilterCell_class.js";

>>>>>>> cd48a6186d534c4766ce693996938569ba1ffba5

export default class HtmlManager {
  _overlay = document.getElementById('overlay');
  _graphRef = document.getElementById('graph_ref');
  _filterRef = document.getElementById('filter_ref');
  _secondaryGraphic = document.getElementById('main-graphic');
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
    let [from, to] = this.getPriceFormLimits();
    const reg = /^\d+$/;
    if (!reg.test(from) || !reg.test(to)) return;
    //convert to numbers
    from = +from;
    to = +to;
    if (from >= to) return;
    const filter = {
      'ruleCb': (product) => {
        const price = +product.price;
        if (price >= to || price <= from) {
          return true;
        } else return false;
      },
      'isChecked': () => {
        return this._priceFormSubmit.textContent === 'Підтвердити' ? false : true;
      },
      'id': this._priceFormSubmit.id,

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

  setUpTagFilters(tagField) {
    const filterCell = document.getElementById(tagField);
    const fields = this._storage.getAllValsOfProdField(tagField);
    for (const val of fields) {
      const tagFilterCell = new TagFilterCell(tagField, val);
      filterCell.innerHTML += tagFilterCell.getElmentHtml();
      console.log(document.getElementById(tagFilterCell.elementID));
    }
  }

  updateProducts = () => {
    this.clearProducts();
    const sendOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    this.loader();
    return fetch('/getProdData', sendOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.closeLoader();
        data.forEach(product => {
          this.addProduct(product);
        });
        this.sortByField('price');
        this.setUpTagFilters('manufacturer');
      })
      .catch(err => console.log(err));
  }

  filter(filter) {
    const ruleCb = filter.ruleCb;
    const products = this._storage.getProducts();
    for (const product of products) {
      if (ruleCb(product)) {
        if (filter.isChecked()) {
          product.addFilterBlock(filter.id);
          console.log('add');
        } else {
          product.removeFilterBlock(filter.id);
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
    this._secondaryGraphic.style = '';
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
  
  loader = () => {
    this._productsPlaceHolder.innerHTML = '<div class="lds-hourglass"></div>'
  }

  closeLoader = () => {
    this._productsPlaceHolder.innerHTML = '';
  }

  drawGraphic = () => {
    const sendOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch('/getGraphicData', sendOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const xy = {
          'x': [],
          'y': [],
        };
        for (const day of data) {
          xy.y.push(day.price);
          const x = day.date.join('-');
          xy.x.push(x);
        }
        loadChart(xy.x, xy.y);
      })
      .catch(err => console.log(err));
  }

}
