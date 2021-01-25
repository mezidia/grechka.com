'use strict';

import HtmlManager from "./modules/hmtlManager_class.js";
import WeigthFilter from "./modules/weigthFilter_class.js";
import TagFilter from "./modules/tagFilter_class.js";

const html = new HtmlManager();

const prod = {
  'prodName': 'prodName',
  'prodImgURL': 'https://img2.zakaz.ua/20200922.1600686893.ad72436478c_2020-09-22_Auchan_Alexey/20200922.1600686893.SNCPSG10.obj.0.1.jpg.oe.jpg.pf.jpg.150nowm.jpg.150x.jpg',
  'prodURL': 'prodURL',
  'price': 100,
  'description': 'description',
  'weight': 1300,
}

const prod1 = {
  'prodName': 'prodName',
  'prodImgURL': 'prodImgURL',
  'prodURL': 'prodURL',
  'price': 50,
  'description': 'description',
  'weight': 1100,
}

const prod2 = {
  'prodName': 'prodName',
  'prodImgURL': 'prodImgURL',
  'prodURL': 'prodURL',
  'price': 175,
  'description': 'description',
  'weight': 1200,
}

console.log(document.getElementsByClassName('filter-checkbox'));
const checkboxes = document.getElementsByClassName('filter-checkbox');


for (const checkbox of checkboxes) {
  checkbox.onclick = (event) => {
    console.log(event.target);
    if (event.target.type === 'checkbox') {
      if(event.target.name === 'weight') {
        html.filter(new WeigthFilter(event.target.id));
      } else if (event.target.name === 'revert') {
        const radioBtn = html.getActiveRadioSort();
        html.filter(new TagFilter(radioBtn.id));
      }
    } else if (event.target.type === 'radio') {
      html.filter(new TagFilter(event.target.id));
    }
  };
}

html.clearProducts();

html.addProduct(prod);
html.addProduct(prod1);
html.addProduct(prod2);

html.sortByField('price');

const openNav = () => {
  document.getElementById('overlay').style.width = '100%';
}

const closeNav = () => {
  goBack();
  document.getElementById('overlay').style.width = '0';
}

const graphRef = () => {
  document.getElementById('graph_ref').style.display = 'none';
  document.getElementById('filter_ref').style.display = 'none';
  document.getElementById('secondary-graphic').style.display = 'block';
}

const filterRef = () => {
  document.getElementById('graph_ref').style.display = 'none';
  document.getElementById('filter_ref').style.display = 'none';
  document.getElementById('secondary-filters').style.display = 'block';
}

const goBack = () => {
  document.getElementById('secondary-graphic').style.display = 'none';
  document.getElementById('secondary-filters').style.display = 'none'
  document.getElementById('graph_ref').style.display = 'block';
  document.getElementById('filter_ref').style.display = 'block';
}

const handleClick = evt => ({
  graph_ref: graphRef,
  filter_ref: filterRef,
  backbtn: goBack,
  openbtn: openNav,
  closebtn: closeNav
})[evt.target.id]

document.addEventListener('click', evt => {
  if (handleClick(evt) === undefined) {
    return;
  } else {
    handleClick(evt)();
  }
});

