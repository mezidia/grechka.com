'use strict';

export default class ProductCell {
  constructor(data) {
    this.prodName = data.prodName;
    this.prodImgURL = data.prodImgURL;
    this.prodURL = data.prodURL;
    this.price = data.price;
    this.description = data.description;
  }

  getElmenHtml() {
    return `
    <div class="productsholder-cell">
      <img class="product-img" 
      src="${this.prodImgURL}"
      alt="product-img"
      >
      <div class="productCell-grid">
        <div class="product-name">${this.prodName}</div> 
        <div class="product-description">${this.description}</div>
        <a class="buy-btn" target="_blank" href="${this.prodURL}">${this.price}grn</a>
      </div>
    </div>
  `
  }
}