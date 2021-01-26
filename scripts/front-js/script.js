'use strict';

import HtmlManager from "./modules/hmtlManager_class.js";
import WeigthFilter from "./modules/weigthFilter_class.js";
import SortFilter from "./modules/sortFilter_class.js";

const html = new HtmlManager();
html.clearProducts();

// filters ini
const checkboxes = document.getElementsByClassName('filter-checkbox');

for (const checkbox of checkboxes) {
  checkbox.onclick = (event) => {
    console.log(event.target);
    if (event.target.type === 'checkbox') {
      if(event.target.name === 'weight') {
        html.filter(new WeigthFilter(event.target.id));
      } else if (event.target.name === 'revert') {
        const radioBtn = html.getActiveRadioSort();
        html.filter(new SortFilter(radioBtn.id));
      }
    } else if (event.target.type === 'radio') {
      html.filter(new SortFilter(event.target.id));
    }
  };
}
//when "GET" gets information from server
function loadData(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.response);
    }
  };
  xhr.open(method, url, true);
  xhr.responseType = 'text';
  if (method === 'POST') {
    xhr.send(data);
  } else {
    xhr.send();
  }
}

function getProductsData() {
  const sendOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch('/getProdData', sendOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(product => {
        html.addProduct(product);
      });
      html.sortByField('price');
    })
    .catch(err => console.log(err));
}
getProductsData();

function getGraphicData() {
  const sendOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch('/getGraphicData', sendOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
}
getGraphicData();

const handleClick = evt => ({
  'submitPriceLimit-btn': html.submitPriceForm,
  graph_ref: html.graphRef,
  filter_ref: html.filterRef,
  backbtn: html.goBack,
  openbtn: html.openNav,
  closebtn: html.closeNav
})[evt.target.id];

document.addEventListener('click', evt => {
  if (handleClick(evt) === undefined) {
    return;
  } else {
    handleClick(evt)();
  }
});

