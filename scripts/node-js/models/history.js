'use strict';

const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  data: String
});

module.exports = mongoose.model('History', historySchema);
