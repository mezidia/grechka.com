'use strict';

const mongoose = require('mongoose');

class DB{
  // Open database in memory
  constructor (path) {
    mongoose.connect(
      `mongodb+srv://admin:${process.env.MONGO_PW}@grechkacom.dwpvy.mongodb.net/grechkaCom?retryWrites=true&w=majority`, 
      {
        useMongoClient: true
      }
    );
  };
};

module.exports = { DB };
