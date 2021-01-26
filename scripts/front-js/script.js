'use strict';

import HtmlManager from "./modules/hmtlManager_class.js";
import WeigthFilter from "./modules/weigthFilter_class.js";
import SortFilter from "./modules/sortFilter_class.js";
import loadChart from "./modules/chart.js";
import TagFilter from "./modules/tagFilter_class.js";

const html = new HtmlManager();
html.clearProducts();

// filters ini
const checkboxes = document.getElementsByClassName('filter-checkbox');

for (const checkbox of checkboxes) {
  checkbox.onclick = (event) => {
    console.log(event.target);
    if (event.target.type === 'checkbox') {
      const name = event.target.name.split(' ')[0];
      if(name === 'weight') {
        html.filter(new WeigthFilter(event.target.id));
      } else if (name === 'revert') {
        const radioBtn = html.getActiveRadioSort();
        html.filter(new SortFilter(radioBtn.id));
      } else if (name === 'tag') {
        html.filter(new TagFilter(event.target.id));
      }
    } else if (event.target.type === 'radio') {
      html.filter(new SortFilter(event.target.id));
    }
  };
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
  html.drawGraphic();
}

