'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

let sharedId= ObjectId()


var users = {
  name : 'User',
  data : [
    {
      "_id"          : sharedId,
      "firstName"    : "Masiar",
      "lastName"     : "Babazadeh",
      "userName"     : "masiar",
      "email"        : "masiar.babazadeh@usi.ch",
      "password"     : "ciao",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
    },

    {
      "_id"          : ObjectId(),
      "firstName"    : "Robert",
      "lastName"     : "Sapolsky",
      "userName"     : "rob",
      "email"        : "sapolsky@stanford.edu",
      "password"     : "baboon",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
    },

    {
      "_id"          : ObjectId(),
      "firstName"    : "Vasileios",
      "lastName"     : "Triglianos",
      "userName"     : "vassilis",
      "email"        : "vasileios.triglianos@usi.ch",
      "password"     : "ciao",
      "dateCreated"  : "Sat Sep 27 2014 10:28:21 GMT+0200 (CEST)",
    }
  ]
}

var freelancers={
  name:"Freelancer",
  data:[
  {
    "_id":ObjectId(),
    "firstName": "Peter",
    "lastName":"Shaw",
    "email":"peter_s@gmail.com",
    "location":"Lugano",
    "job":"Carpenter",
    "telephoneNum":"123",
    "description":"i am a bad carpenter",
    "website":"xd.com",
    "skypeAcc":"asfd",
    "ownerId":sharedId
},
{
  "_id":ObjectId(),
  "firstName": "Bob",
  "lastName":"Andrews",
  "email":"Bob@gmail.com",
  "location":"Mendrisio",
  "job":"Carpenter",
  "telephoneNum":"123",
  "description":"i am an amazing carpenter",
  "website":"xd.com",
  "skypeAcc":"asfd",
},
{
  "_id":ObjectId(),
  "firstName": "Justus",
  "lastName":"Jonas",
  "email":"Justus@gmail.com",
  "location":"Lugano",
  "job":"Janitor",
  "telephoneNum":"123",
  "description":"i am one of the best janitors ever",
  "website":"xd.com",
  "skypeAcc":"asfd",
},
{
  "_id":ObjectId(),
  "firstName": "Peter",
  "lastName":"Parker",
  "email":"Peter_p@gmail.com",
  "location":"Bellinzona",
  "job":"Carpenter",
  "telephoneNum":"123",
  "description":"i am a bad carpenter",
  "website":"xd.com",
  "skypeAcc":"asfd",
}]
}

var seedData = [];
seedData.push(users);
seedData.push(freelancers)

module.exports = seedData;
