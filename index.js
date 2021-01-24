'use strict';

const Database = require('./scripts/node-js/dbFuncs').Database;
const database = new Database();

const Server = require('./scripts/node-js/server').Server;

//creating server
const server = new Server(process.env.PORT || 8888); 

//handling rejections in promises
process.on('unhandledRejection', error => {
  console.log('rejection: ', error);
});

process.on('rejectionHandled', promise => {
  console.log('rejection handled: ' + promise);
});