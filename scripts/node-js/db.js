'use strict';

const sqlite3 = require('sqlite3').verbose();

// Open database in memory
const connect = (path) => {
  const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
    return db;
  });
};

// Close the database connection
const close = (db) => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  // ** Maybe we can return True here ** //
};

// Get all rows from table
const getAll = (db, table, row) => {
  let sql = `SELECT ? FROM ?`;
 
  db.all(sql, [table, row], (err, rows) => {
    if (err) {
      throw err;
    }
    return rows;
  });
};

export default {
  connect,
  close,
  getAll,
}
