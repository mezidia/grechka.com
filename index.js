'use strict';

//grabbers

//const rozetka = require('./scripts/node-js/novusGrabber');
//const ashan = require('./scripts/node-js/ashanGrabber');
//const novus = require('./scripts/node-js/novusGrabber');
//const megaMarket = require('./scripts/node-js/megaMarketGrabber');

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

