
'use strict'

var should = require("should")
var app = require("../../app")
var request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const ObjectId = mongoose.Types.ObjectId
let utils = require("../../utils.js")
require("../../models/User.js");
require("../../models/Freelancer.js")
require("../../models/Review.js")
let Review = mongoose.model("Review")
let newData={
  "reviewText":"LEL",
 "reviewRating":"2",
 "user":"58caba5b97aa1a1b665b5c0f",
 "freelancer":"58cab9a297aa1a1b665b5c0c"
}
const id = ObjectId();
