'use strict';

const mongoose = require('mongoose');
const Category = require('./models/category');

mongoose.connect(
  `mongodb+srv://admin:FvFdIuMyOs1052hK@grechkacom.dwpvy.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// const category = new Category({
//   _categoryid: new mongoose.Types.ObjectId(),
//   categoryType: 'ketchups',
// });
// category
//   .save()
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => console.error(err));
