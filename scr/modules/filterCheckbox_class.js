'use strict';

export default class FilterCheckbox {
  #setRule() {
   let ruleCB = undefined;
   const ruleString = this.htmlElement.value;
   const splitedStr = ruleString.split(' ');
   const firstSymbol = splitedStr[0][0];
   console.log(splitedStr);
   if (splitedStr[1]) {
     const lowerLimit = splitedStr[0];
     const upperLimit = splitedStr[1];
      ruleCB = (val) => {
        console.log(lowerLimit, val, upperLimit)
        if (+val >= lowerLimit && +val <= upperLimit) {
          return true;
        } else return false;
      };
    } else if (firstSymbol === '+') {
      ruleCB = (val) => {
        if (val > +splitedStr[0]) {
          return true;
        } else return false;
      };
    } else {
      ruleCB = (val) => {
        console.log(Math.abs(+splitedStr[0]));
        console.log(val);
        if (val < Math.abs(+splitedStr[0])) {
          return true;
        } else return false;
      };
    }
   return ruleCB;
  }
  
  constructor(id) {
    this.htmlElement = document.getElementById(id);
    this.filterBy = this.htmlElement.name;
    this.rule = this.#setRule();
  }

}