'use strict';

const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  date: Date,
  price: Number,
});

module.exports = mongoose.model('History', historySchema);
