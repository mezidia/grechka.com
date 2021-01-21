'use strict';

const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
  _historyid: mongoose.Schema.Types.ObjectId,
  productId: {type: Schema.Types.ObjectId, ref: 'Product'},
  date: Number,
  price: Number,
});

module.exports = mongoose.model('History', historySchema);
