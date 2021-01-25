'use strict';

import FilterCheckbox from "./filterCheckbox_class.js";
import HtmlManager from "./hmtlManager_class.js";

export default class TagFilter extends FilterCheckbox {
  _setRuleCb() {
    return () => {
      const tag = this.htmlElement.value;
      const reverse = this._isReverse();
      console.log(reverse);
      new HtmlManager().sortByField(tag, reverse);

    }
    
  }
  
  _isReverse() {
    return document.getElementById('checkbox-6').checked;
  }

  constructor(id) {
    super(id);
  }

}

