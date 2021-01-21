'use strict';

const mongoose = require('mongoose');

const costSchema = mongoose.Schema({
  _priceid: mongoose.Schema.Types.ObjectId,
  productId: {type: Schema.Types.ObjectId, ref: 'Product'},
  price: Number,
  date: Date,
});

module.exports = mongoose.model('Cost', costSchema);
