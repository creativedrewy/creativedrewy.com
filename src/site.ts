'use strict';

/**
 * Module dependencies
 */
import app from './app';
import * as debugModule from 'debug';
import * as http from 'http';

const debug = debugModule('express:server');

const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const serverIpAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port,on all network interfaces.
 */
server.listen(port, serverIpAddress);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall != 'listen') {
    throw error;
  }
  
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
  //handle specific listen errors with friendly messages
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
  
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}