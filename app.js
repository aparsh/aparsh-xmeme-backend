/**
 * xMEME-Backend
 * created By - aparsh
 * February 2021
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var config = require('./global/config');
const mongoose = require('mongoose');
const url=config.mongoUrl;
const connect = mongoose.connect(url);
const endpoints = require('./endpoints');
const memeRouter = require("./modules/meme/router");
const allowCrossDomain = require('./utils/cors');
const expressValidator = require('express-validator');

connect.then((db)=>{
  console.log('Connected to the server!!!');
},(err)=>{ console.log(err); });
var app = express();
let port = process.env.PORT || 5000;
app.listen(port, () => {  console.log('We are live on ' + port);});
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
endpoints.initialise(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
