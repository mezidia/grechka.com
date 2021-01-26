'use strict';

export default class TagFilterCell {
  _getTagFilterCell(val) {
    return 'tagFilter' + val.replace(' ', '-');
  }

  constructor(field, val) {
    this.val = val;
    this.field = field;
    this.elementID = this._getTagFilterCell(this.val);
  }

  getElmentHtml() {
    return `
    <div class="filter-cell-btn">
      <input class="filter-checkbox" id="${this.elementID}" type="checkbox" name="tag ${this.field}" value="${this.val}" checked>
      <label for="${this.elementID}"></label>
      <span class="label-text">${this.val}</span>
    </div>
  `;
  }
}
