'use strict';

const mongoose = require('mongoose');
const UserSchema = require('./User');
const FreelancerSchema = require('./Freelancer');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReviewSchema = new mongoose.Schema(
  {
    reviewText : { type: String, default : ""},
    reviewRating : {type: Number, min: 1, max : 5, required: true},
    user : {type : ObjectId, ref : "User", required : true},
    freelancer : {type : ObjectId, ref : "Freelancer", required : true},
    dateCreated : { type: Date, required: true, default: Date.now },
  })
