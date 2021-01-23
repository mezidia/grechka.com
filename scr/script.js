'use strict';

import FilterCheckbox from "./modules/filterCheckbox_class.js";
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
  'weight': '1300',
}

console.log(document.getElementsByClassName('filter-checkbox'));
const checkboxs = document.getElementsByClassName('filter-checkbox');

for (const checkbox of checkboxs) {
  checkbox.onclick = (event) => {
    console.log(event.target);
    console.log(new FilterCheckbox(event.target.id).rule);
    html.filter(new FilterCheckbox(event.target.id).rule);
  };
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
