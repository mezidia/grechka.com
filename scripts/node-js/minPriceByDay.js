'use strict';

function minPriceByDay(history) {
  const allPrices = [];
  for (let i = 0; i < history.length; i++) {
    const productPriceHistory = JSON.parse(history[i].data);
    for (const day in productPriceHistory) {
      const price = productPriceHistory[day];
      allPrices.push(price);
    }
  }
  allPrices.sort();
  console.log(allPrices);
  return true;
}

module.exports.minPriceByDay = minPriceByDay;
