const mongoose = require('mongoose');
const UserSchema = require('./User');
const ReviewSchema = require('./Review');
const ObjectId = mongoose.Schema.Types.ObjectId;



const freelancerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName : { type: String, required: true},
    email   : { type: String},
    dateCreated : { type: Date, required: true, default: Date.now },
    ownerId : { type: ObjectId, ref: "User"},
    location : {type : String, required : true},
    latitude : {type: String, required: true},
    longitude: {type: String, required: true},
    // streetNum : {type : Number, required : true},
    // street : {type : String, required : true},
    // country : {type : String, required : true},
    job : {type : String, required : true},
    telephoneNum : {type: Number, required: true},
    skypeAcc: {type: String},
    linkedin: {type: String},
    facebook: {type: String},
    github: {type: String},
    website: {type: String},
    description: {type: String, default: ""},
    pictureGallery : {type: [String], default: []},
    review : {type : [ReviewSchema], default : []},
    verified: {type : Boolean, required : true, default: false},
    ownerId:{type:ObjectId}
  }
);

mongoose.model('Freelancer', freelancerSchema);
