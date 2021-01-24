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

const openNav = () => {
  document.getElementById('overlay').style.width = '100%';
}

const closeNav = () => {
  document.getElementById('overlay').style.width = '0';
}


document.addEventListener('click', (evt) => ({
  openbtn: openNav,
  closebtn: closeNav
})[evt.target.id]());
