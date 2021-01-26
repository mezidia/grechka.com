'use strict';

import FilterCheckbox from "./filterCheckbox_class.js";

export default class TagFilter extends FilterCheckbox {
  _setRuleCb() {
   return (product) => {
      const tagStr = this.htmlElement.name;
      const splitedStr = tagStr.split(' ');
      const tag = splitedStr[1];
      const val = this.htmlElement.value;
      if (!product[tag]) return false;
      if (product[tag] === val) {
        return true;
      } else {
        return false;
      }
   };
  }

  isChecked() {
    return this.htmlElement.checked;
  }

  constructor(id) {
    super(id);
  }

}
