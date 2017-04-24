'use strict';

const mongoose = require('mongoose');
const UserSchema = require('./User');
const FreelancerSchema = require('./Freelancer');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReviewSchema = new mongoose.Schema(
  {
    user : {type : ObjectId, ref : "User", required : false},
    freelancer : {type : ObjectId, ref : "Freelancer", required : true},
    reviewText : { type: String, default : ""},
    reviewImg : {type:String, required: false},
    reviewRatingOverall : {type: Number, min: 1, max : 5, required: true},
    reviewRatingPrice : {type: Number, min: 1, max : 5, required: true},
    reviewRatingQuality : {type: Number, min: 1, max : 5, required: true},
    replys:{type:[String],required:false},
    dateCreated : { type: Date, required: true, default: Date.now },
  })



  //register model
  mongoose.model('Review', ReviewSchema);
