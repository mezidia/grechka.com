'use strict';

const mongoose = require('mongoose');

const manufacturerSchema = mongoose.Schema({
  _manufacturerid: mongoose.Schema.Types.ObjectId,
  companyName: String,
  country: String,
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
