'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  categoryType: String,
});

module.exports = mongoose.model('Category', categorySchema);
