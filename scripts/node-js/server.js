'use strict';

const http = require('http');
const FileManager = require('./fileManager').FileManager;
const fileManager = new FileManager();

//types of request extensions
const mime = {
  'html': 'text/html',
  'js': 'application/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'ico': 'image/x-icon',
  '/date': 'text/plain',
};

class Server {
  constructor(port) {
    const server = http.createServer();
    server.listen(port, () => {
      console.log('Server running on port...');
    });
    server.on('request', this.handleRequest);
  }

  //function for handling requests
  async handleRequest(req, res) {
    const url = req.url;
    let name = url;
    const method = req.method;
    let extention = url.split('.')[1];
    if (method === 'GET') {
      if (url === '/') {
        extention = 'html';
        name = '/main.html';
      }
      const typeAns = mime[extention];
      let data = await fileManager.readFile('.' + name);
      if (!data) {
        console.log('no such file => ' + name);
        //handle if no page
        const pageNotFound = await fileManager.readFile('./scripts/html/noPageFound.html');
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(pageNotFound);
      } else if (typeof data === 'number') {
        console.log('error occured => ' + name);
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      } else {
        res.writeHead(200, { 'Content-Type': `${typeAns}; charset=utf-8` });
        res.write(data);
      }
      res.end();
    } else if (method === 'POST') {
      console.log('POST');
    }
  }
}

module.exports = { Server };
