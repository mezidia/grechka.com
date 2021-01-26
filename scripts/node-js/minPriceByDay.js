'use strict';

function minPriceByDay(history) {
  const res = [];
  const dates = Object.keys(JSON.parse(history[0].data));
  for (let i = 0; i < dates.length; i++) {
    const dateStr = JSON.parse(dates[i]);
    const dateJS = new Date(+dateStr);
    const dateArr = [
      dateJS.getFullYear(),
      dateJS.getUTCMonth() + 1, //fix zero index gap
      dateJS.getUTCDate()
    ];
    const dayCostArr = [];
    for (const product of history) {
      const parsedProductData = JSON.parse(product.data);
      const productDates = Object.keys(parsedProductData);
      const productPriceByDay = parsedProductData[productDates[i]];
      dayCostArr.push(productPriceByDay);
    }
    dayCostArr.sort((a, b) => a - b);
    const minPriceByDay = dayCostArr[0];

    res.push({
      'price': minPriceByDay,
      'date': dateArr,
    });
  }
  console.log(res);
  return res;
}

module.exports.minPriceByDay = minPriceByDay;
