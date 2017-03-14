'use strict'
var config = require('./config');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//Connect to db
var mongoose   = require('mongoose');
mongoose.connect(config.mongoUrl + config.mongoDbName);

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/userRouting');
 app.use('/userRouting', usersRouter);

module.exports = app;
