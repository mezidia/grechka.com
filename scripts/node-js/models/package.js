'use strict';

const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
  packageType: String,
});

module.exports = mongoose.model('Package', packageSchema);
