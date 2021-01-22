'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: String,
  categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},
  ManufacturerId: {type: Schema.Types.ObjectId, ref: 'Manufacturer'},
  weight: Number,
  packageId: {type: Schema.Types.ObjectId, ref: 'Package'},
  priceSegment: String,
  productURL: String,
  productImgURL: String,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
