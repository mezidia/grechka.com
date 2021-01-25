'use strict';

import FilterCheckbox from "./filterCheckbox_class.js";
import ProductsStorage from "./poductsStorage_class.js";

export default class tagFilter extends FilterCheckbox {
  _setRuleCb() {
    const prodStorage = new ProductsStorage();
    
  }
  
  constructor(id, tag) {
    super(id);

  }

}

