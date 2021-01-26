'use strict';

export default class ProductCell {
  constructor(data, id) {
    this.prodName = data.productName;
    this.prodImgURL = data.productImgURL;
    this.prodURL = data.productURL;
    this.price = data.price;
    this.priceSegment = data.priceSegment;
    this.weight = data.weight * 1000;
    this.description = data.description;
    this.elementID = id;
    this.allowByNfilters = {};
    this.domElement = undefined;
  }

  _isShowAloowed() {
    const valArr = Object.values(this.allowByNfilters);
    if (valArr.includes(false)) return false;
    return true;
  }

  show() {
    if (this._isShowAloowed()) {
      this.domElement.style.display = 'flex';
    } else {
      this.domElement.style.display = 'none';
    }
  }

  initializeDomElementVal() {
    this.domElement = document.getElementById(this.elementID);
    if (this.domElement) return true;
    return 'dom element wans\'t inserted';
  }

  addFilterBlock(id) {
    this.allowByNfilters[id] = true;
  }

  removeFilterBlock(id) {
    this.allowByNfilters[id] = false;
  }

  getElmentHtml() {
    return `
    <div class="productsholder-cell"  id="${this.elementID}">
      <img class="product-img" 
      src="${this.prodImgURL}"
      alt="product-img"
      >
      <div class="productCell-grid">
        <div class="product-name">${this.prodName}</div> 
        <div class="product-description">
        weight: ${this.weight} гр<br>
        description: ${this.description}<br>
        </div>
        <a class="buy-btn" target="_blank" href="${this.prodURL}">${this.price} грн</a>
      </div>
    </div>
  `;
  }
}