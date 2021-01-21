'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  _categoryid: mongoose.Schema.Types.ObjectId,
  categoryType: String,
});

module.exports = mongoose.model('Category', categorySchema);
