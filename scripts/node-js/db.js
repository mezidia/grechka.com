'use strict';

const sqlite3 = require('sqlite3').verbose();

class DB{
  // Open database in memory
  constructor (path) {
    this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });
  }

  // Get all rows from table
  // Vars: sql - str, parameters - array
  // Example: `SELECT DISTINCT Name FROM playlists ORDER BY Name`;
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
  // Example: `SELECT PlaylistId id, Name name FROM playlists WHERE PlaylistId  = ?`;
  getFirst (sql, parameters) {
    this.db.get(sql, parameters, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      return row;
    });
  };

  // Insert data to table
  // Vars: sql - str, parameters - array
  // Example: 'INSERT INTO table VALUES ' + data;
  insert (sql, parameters) {
    this.run(db, sql, parameters);
  };

  // Update data in table
  // Vars: sql - str, parameters - array
  // Example: `UPDATE langs SET name = ? WHERE name = ?`;
  update (sql, parameters) {
    this.run(db, sql, parameters);
  };

  // Delete data from table
  // Vars: sql - str, parameters - array
  // Example: `DELETE FROM table WHERE rowid=?`
  delete (sql, parameters) {
    this.run(db, sql, parameters);
  };

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

  // Common function
  run(db, sql, parameters) {
    db.run(sql, parameters, (err) => {
      if (err) {
        return console.error(err.message);
      }
      return true;
    });
  };
};

export default DB;
