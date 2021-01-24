'use strict';

export default class ProductCell {
  constructor(data, id) {
    this.prodName = data.prodName;
    this.prodImgURL = data.prodImgURL;
    this.prodURL = data.prodURL;
    this.price = data.price;
    this.priceSegment = data.priceSegment;
    this.weight = data.weight;
    this.description = data.description;
    this.elementID = id;
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
        weight: ${this.weight}<br>
        description: ${this.description}<br>
        </div>
        <a class="buy-btn" target="_blank" href="${this.prodURL}">${this.price}grn</a>
      </div>
    </div>
  `
  }
}