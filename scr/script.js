'use strict';

import HtmlManager from "./modules/hmtlManager_class.js";

const html = new HtmlManager(1);

console.log(html);

//html.clearProducts();

const prod = {
  'prodName': 'prodName',
  'prodImgURL': 'prodImgURL',
  'prodURL': 'prodURL',
  'price': 'price',
  'description': 'description',
}

html.addProduct(prod);
