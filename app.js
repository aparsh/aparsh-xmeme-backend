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
const enableCORS = require('./utils/cors');

connect.then((db)=>{
  console.log('Connected to the server!!!');
},(err)=>{ console.log(err); });
var app = express();
let port = process.env.PORT || 3000;
app.listen(port, () => {  console.log('We are live on ' + port);});
enableCORS(app);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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
  res.render('error');
});

module.exports = app;
