'use strict';

const sqlite3 = require('sqlite3').verbose();

class DB{
  constructor (path) {
    // Open database in memory
    // Create db field
    this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });
  }

  // Close the database connection
  // Vars: db - object
  close () {
    this.db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
    // ** Maybe we can return True here ** //
  };

  // Get all rows from table
  // Vars: sql - str, parameters - array
  getAll (sql, parameters) {
    this.db.all(sql, parameters, (err, rows) => {
      if (err) {
        throw err;
      }
      return rows;
    });
  };

  // Get first row only
  // Vars: sql - str, parameters - array
  getFirst (sql, parameters) {
    this.db.get(sql, parameters, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      return row;
    });
  };
}

export default DB;
