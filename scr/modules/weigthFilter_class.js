'use strict';

import FilterCheckbox from "./filterCheckbox_class.js";

export default class WeigthFilter extends FilterCheckbox {
  _setRuleCb() {
   let ruleCb = undefined;
   const ruleString = this.htmlElement.value;
   const splitedStr = ruleString.split(' ');
   const firstSymbol = splitedStr[0][0];
   if (splitedStr[1]) {
     const lowerLimit = splitedStr[0];
     const upperLimit = splitedStr[1];
      ruleCb = (product) => {
        const weight = +product.weight;
        if (weight >= lowerLimit && weight <= upperLimit) {
          return true;
        } else return false;
      };
    } else if (firstSymbol === '+') {
      ruleCb = (product) => {
        const weight = +product.weight;
        if (weight > +splitedStr[0]) {
          return true;
        } else return false;
      };
    } else {
      ruleCb = (product) => {
        const weight = +product.weight;
        if (weight < Math.abs(+splitedStr[0])) {
          return true;
        } else return false;
      };
    }
   return ruleCb;
  }
  
  constructor(id) {
    super(id);
  }

}
