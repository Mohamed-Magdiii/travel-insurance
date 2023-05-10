const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const http = require('http');

const { dbMongo, logger, keys } = require('./common');
// const routeParser = require('./parse-routes');
const { apiErrorHandler } = require('./utils');

const addCRMRoutes = require('./crm/routes');
const addCPRoutes = require('./cp/routes');
// require('./watcher')();
const seedservice = require('./services/seed.service');
const parseRouter = require('./parse-routes');

const app = express();
dbMongo();
app.use(morgan('combined', { stream: logger.stream }));

app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use('/images', express.static('uploads', {}));
express.static.mime.define({
  png: [''],
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

app.use(cors());
app.use(express.json());

addCRMRoutes(app);
addCPRoutes(app);

parseRouter(app);

seedservice();

app.use((req, res, next) => {
  next(createError(404));
});

app.use(apiErrorHandler);

app.set('port', keys.port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${keys.port}`
    : `Port ${keys.port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  logger.info(`Listenign on ${keys.port} `, bind);
};

server.listen(keys.port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = server;
