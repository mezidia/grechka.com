'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: String,
  categoryId: mongoose.Schema.Types.ObjectId,
  manufacturerId: mongoose.Schema.Types.ObjectId,
  weight: Number,
  price: Number,
  priceSegment: String,
  productURL: String,
  productImgURL: String,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
