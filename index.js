'use strict';

const rozetka = require('./scripts/node-js/grabbers/rozetkaGrabber');
const ashan = require('./scripts/node-js/grabbers/ashanGrabber');
const novus = require('./scripts/node-js/grabbers/novusGrabber');
const megaMarket = require('./scripts/node-js/grabbers/megaMarketGrabber');
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

