const DB = require('./scripts/node-js/db').DB;

let result = []

const setter = (data) => {
  result = data;
  console.log(result);
}

const db = new DB('./products.db');
db.getAll(`SELECT * from Category WHERE CategoryName=?`, ['ketchups'], setter)
db.close();
console.log(result);
