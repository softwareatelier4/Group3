let config = require('./config');
let express = require('express');
let logger = require('morgan');
let  path = require('path');
let bodyParser = require('body-parser');
let app = express();

//Connect to db
var mongoose   = require('mongoose');
mongoose.connect(config.mongoUrl + config.mongoDbName);

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
