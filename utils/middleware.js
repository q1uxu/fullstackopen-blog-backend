const morgan = require('morgan');
const logger = require('./logger');

morgan.token('body', request => {
  return JSON.stringify(request.body);
});

const requestLogger = morgan((tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens['response-time'](request, response) + 'ms',
    tokens.body(request, response),
  ].join(' ');
});

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response,) => {
  logger.error(error.message);
  return response.status(400).json({ error: error.message });
};

const middleware = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
};


module.exports = middleware;