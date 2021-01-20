'use strict';

const sqlite3 = require('sqlite3').verbose();

const connect = (path) => {
  // open database in memory
  const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
    return db;
  });
};

const close = (db) => {
  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  // ** Maybe we can return True here ** //
};

export default {
  connect,
  close,
}
