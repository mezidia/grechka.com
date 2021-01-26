'use strict';

export default class TagFilterCell {
  _getTagFilterCell(field) {
    return `tag-${field}`;
  }

  constructor(field) {
    this.field = field;
    this.elementID = this._getTagFilterCell(this.field);
  }

  getElmentHtml() {
    return `
    <div class="filter-cell-btn">
      <input class="filter-checkbox" id="${this.elementID}" type="checkbox" name="tag ${this.tag}" value="${this.field}" checked>
      <label for="${this.elementID}"></label>
      <span class="label-text">${this.field}</span>
    </div>
  `;
  }
}
