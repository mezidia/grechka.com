'use strict';
const fs = require('fs');

class FileManager {

  //this function asyncronously reads file
  readFileInfo(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) console.log('err in readFileInfo: ' + err);
        try {
          resolve(data);
        } catch (err) {
          reject(err.message);
        }
      });
    });
  }

  //handling rejections in readFileInfo
  async readFile(file) {
    try {
      const data = await this.readFileInfo(file);
      return data;
    } catch (err) {
      console.log('this error occured in readFile => ' + err);
      return false;
    }
  }

}

module.exports = { FileManager };
