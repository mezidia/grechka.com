'use strict';

function setNewProduct(product, category = 'невідома', manufacturer = 'невідомий') {
  const res = {
    'productName': product.productName,
    'weight': product.weight,
    'price': product.price,
    'productURL': product.productURL,
    'productImgURL': product.productImgURL,
    'manufacturer': manufacturer,
    'category': category,
  };
  return res;
}

module.exports.setNewProduct = setNewProduct;
