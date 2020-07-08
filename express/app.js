const createError = require('http-errors');
const express = require('express');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const graphRouter = require('./routes/graph');
const graphHelpRouter = require('./routes/graphHelp');

var app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// dem routes
app.use('/graph/help', graphHelpRouter);
app.use('/graph', graphRouter);
app.use('/', indexRouter);

// netlify lambda routes
app.use('/.netlify/functions/app/graph/help', graphHelpRouter);
app.use('/.netlify/functions/app/graph', graphRouter);
app.use('/.netlify/functions/app',  indexRouter);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('You fucked up hommie');
});

module.exports = app;
module.exports.handler = serverless(app);