'use strict';

import FilterCheckbox from "./modules/filterCheckbox_class.js";
import HtmlManager from "./modules/hmtlManager_class.js";

const html = new HtmlManager(1);



console.log(html);

html.clearProducts();

const prod = {
  'prodName': 'prodName',
  'prodImgURL': 'prodImgURL',
  'prodURL': 'prodURL',
  'price': 'price',
  'description': 'description',
  'weight': '1300',
}

const prod1 = {
  'prodName': 'prodName',
  'prodImgURL': 'prodImgURL',
  'prodURL': 'prodURL',
  'price': 'price',
  'description': 'description',
  'weight': '1100',
}

const prod2 = {
  'prodName': 'prodName',
  'prodImgURL': 'prodImgURL',
  'prodURL': 'prodURL',
  'price': 'price',
  'description': 'description',
  'weight': '1200',
}

console.log(document.getElementsByClassName('filter-checkbox'));
const checkboxes = document.getElementsByClassName('filter-checkbox');

for (const checkbox of checkboxes) {
  checkbox.onclick = (event) => {
    console.log(event.target);
    console.log(new FilterCheckbox(event.target.id).rule);
    html.filter(new FilterCheckbox(event.target.id).rule);
  };
}

html.addProduct(prod);
html.addProduct(prod1);
html.addProduct(prod2);

html.sortByField('weight');

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
