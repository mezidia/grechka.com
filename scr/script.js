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
const checkboxes = document.getElementsByClassName('filter-checkbox');

for (const checkbox of checkboxes) {
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

const graphRef = () => {
  document.getElementById('graph-ref').style.display = 'none';
  document.getElementById('filter-ref').style.display = 'none';
  document.getElementById('secondary-graphic').style.display = 'block';
}

const goBack = () => {
  document.getElementById('secondary-graphic').style.display = 'none';
  // document.getElementById('secondary-filters').style.display = 'none'
  document.getElementById('graph-ref').style.display = 'block';
  document.getElementById('filter-ref').style.display = 'block';
}

document.addEventListener('click', (evt) => (({
  backbtn: goBack,
  openbtn: openNav,
  closebtn: closeNav
})[evt.target.id] || function(){})());
