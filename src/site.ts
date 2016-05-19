'use strict';

import app from './app';
import * as debugModule from 'debug';
import * as http from 'http';

const debug = debugModule('express:server');
const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.set('port', port);

var server = http.createServer(app);
server.listen(port, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall != 'listen') {
    throw error;
  }
  
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}