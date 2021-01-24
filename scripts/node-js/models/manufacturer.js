'use strict';

const mongoose = require('mongoose');

const manufacturerSchema = mongoose.Schema({
  companyName: String,
  country: String,
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
