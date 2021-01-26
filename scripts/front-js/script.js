'use strict';

import HtmlManager from "./modules/hmtlManager_class.js";
import WeigthFilter from "./modules/weigthFilter_class.js";
import SortFilter from "./modules/sortFilter_class.js";
import loadChart from "./modules/chart.js";

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

function drowGraphic() {
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
      const xy = {
        'x': [],
        'y': [],
      };
      for (const day of data) {
        xy.x.push(day.price);
        const y = day.date.join('-');
        xy.y.push(y);
      }
      console.log(xy);
      loadChart(xy.x, xy.y);
    })
    .catch(err => console.log(err));
}

const handleClick = evt => ({
  'search': html.updateProducts,
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

window.onload = () => {
  html.updateProducts();
  drowGraphic();
}

