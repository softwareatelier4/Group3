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

const freelancerRouter= require('./routes/freelancerRoutes.js')
app.use('/freelancer', freelancerRouter)

const reviewRouter= require('./routes/reviewRoutes.js')
app.use('/review', reviewRouter)


app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;
