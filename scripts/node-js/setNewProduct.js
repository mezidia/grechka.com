'use strict';

function setNewProduct(product, category = 'невідома', manufacturer = 'невідомий') {
  return {
    'productName': product.productName,
    'weight': product.weight,
    'price': product.price,
    'productURL': product.productURL,
    'productImgURL': product.productImgURL,
    'manufacturer': manufacturer,
    'category': category,
  };
}

module.exports.setNewProduct = setNewProduct;
