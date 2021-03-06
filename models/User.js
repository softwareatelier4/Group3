/** @module users/User
* The User Model
* Schema:
* _id           ObjectId           Unique identifier of the user
* userName      String             Username of the user
* email         String             Email address of the user
* password      String             Password for the user account
* firstName     String             First name of the user. Default: username
* lastName      String             Last name of the user. Default: username
* dateCreated   Date               Date the user was created.  Default: Date.now()
* freelancers   FreelancerSchema   Freelancer profiles claimed by user.
*/


'use strict';

const mongoose = require('mongoose');
const FreelancerSchema = require('./Freelancer');

/** @constructor
* @param {Object} definition
*/
const userSchema = new mongoose.Schema(
  {
    userName : { type: String, required: true },
    firstName: { type: String, required: true },
    lastName : { type: String, required: true},
    password : { type: String, required: true },
    email   : { type: String, required: true },
    dateCreated : { type: Date, required: true, default: Date.now },
    location : {type: String},
    freelancers : [{ type: mongoose.Schema.Types.ObjectId, ref:"Freelancer"}],
    profilePicture : {type: String},
    emailVerification : {type: Boolean, default : false}
  }
);

//register model
mongoose.model('User', userSchema);
