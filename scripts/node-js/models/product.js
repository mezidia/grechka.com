'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: String,
  categoryId: mongoose.Schema.Types.ObjectId,
  ManufacturerId: mongoose.Schema.Types.ObjectId,
  weight: Number,
  packageId: mongoose.Schema.Types.ObjectId,
  priceSegment: String,
  productURL: String,
  productImgURL: String,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
