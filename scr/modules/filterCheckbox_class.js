'use strict';

export default class FilterCheckbox {
  _setRuleCb() {}
  
  constructor(id) {
    this.htmlElement = document.getElementById(id);
    this.filterBy = this.htmlElement.name;
    this.ruleCb = this._setRuleCb();
  }

  isChecked() {
    return this.htmlElement.checked;
  }

}
