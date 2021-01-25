'use strict';

//function for converting weight to kg
function GToKG(weight) {
  if (weight === null) return null;
  else if (weight.includes('кг')) return weight.substring(0, weight.length - 3).match(/\d+/gm)[0];
  else return weight.substring(0, weight.length - 2).match(/\d+/gm)[0]/1000;
}

module.exports.GToKG = GToKG;
