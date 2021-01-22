'use strict';

const mongoose = require('mongoose');

const costSchema = mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  price: Number,
  date: Date,
});

module.exports = mongoose.model('Cost', costSchema);
