'use strict';

const sqlite3 = require('sqlite3').verbose();

class DB{
  constructor (path) {
    // Open database in memory
    this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
      return db;
    });
  }

  // Close the database connection
  close (db) {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
    // ** Maybe we can return True here ** //
  };

  // Get all rows from table
  getAll (db, table, row) {
    let sql = `SELECT ? FROM ?`;
  
    db.all(sql, [table, row], (err, rows) => {
      if (err) {
        throw err;
      }
      return rows;
    });
  };

  // Get first row only
  getFirst (db, table, rowToGet, valueToSearch,value) {
    let sql = `SELECT ? FROM ? WHERE ? = ?`;

    db.get(sql, [rowToGet, table, valueToSearch, value], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      return row;
    });
  };
}

export default DB;
