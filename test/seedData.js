'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

let sharedId= ObjectId()
let sharedId2 = ObjectId()

var users = {
  name : 'User',
  data : [
    {
      "_id"          : ObjectId(),
      "firstName"    : "Masiar",
      "lastName"     : "Babazadeh",
      "userName"     : "masiar",
      "email"        : "masiar.babazadeh@usi.ch",
      "password"     : "ciao",
      "freelancers":  [sharedId,sharedId2],
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
    "_id":sharedId,
    "firstName": "Masiar",
    "lastName":"Babazadeh",
    "email":"peter_s@gmail.com",
    "location":"Lugano",
    "latitude": "46.0058",
    "longitude": "8.9475",
    "job":"Carpenter",
    "telephoneNum":"123",
    "description":"i am a bad carpenter",
    "website":"xd.com",
    "skypeAcc":"asfd",
    "country":"Switzerland",
    "streetNum":"12",
    "street":"via Buffi",
    "facebook" :"https:\/\/www.facebook.com/gianmarco.palazzi19",
    "verified" : "false",
    "available":"true"
},
{
  "_id":sharedId2,
  "firstName": "Masiar",
  "lastName":"Babazadeh",
  "email":"peter_s@gmail.com",
  "location":"Lugano",
  "latitude": "46.0058",
  "longitude": "8.9475",
  "job":"Janitor",
  "telephoneNum":"123",
  "description":"i am also a janitor",
  "website":"xd.com",
  "skypeAcc":"asfd",
  "country":"Switzerland",
  "streetNum":"12",
  "street":"via Buffi",
  "facebook" :"https:\/\/www.facebook.com/gianmarco.palazzi19",
  "verified" : "false",
  "available":"true"
},
{
  "_id":ObjectId(),
  "firstName": "Bob",
  "lastName":"Andrews",
  "email":"Bob@gmail.com",
  "location":"Mendrisio",
  "latitude": "45.8667",
  "longitude": "8.9833",
  "job":"Carpenter",
  "telephoneNum":"123",
  "description":"i am an amazing carpenter",
  "website":"xd.com",
  "skypeAcc":"asfd",
  "country":"Switzerland",
  "streetNum":"12",
  "street":"via Buffi",
  "facebook" :"https:\/\/www.facebook.com/gianmarco.palazzi19",
  "verified" : "false",
  "available":"true"
},
{
  "_id":ObjectId(),
  "firstName": "Justus",
  "lastName":"Jonas",
  "email":"Justus@gmail.com",
  "location":"Lugano",
  "latitude": "46.0058",
  "longitude": "8.9475",
  "job":"Janitor",
  "telephoneNum":"123",
  "description":"i am one of the best janitors ever",
  "website":"xd.com",
  "skypeAcc":"asfd",
  "country":"Switzerland",
  "streetNum":"12",
  "street":"via Buffi",
  "facebook" :"https:\/\/www.facebook.com/gianmarco.palazzi19",
  "verified" : "false",
  "available":"true"
},
{
  "_id":ObjectId(),
  "firstName": "Peter",
  "lastName":"Parker",
  "email":"Peter_p@gmail.com",
  "location":"Bellinzona",
  "latitude": "46.2",
  "longitude": "9.0167",
  "job":"Carpenter",
  "telephoneNum":"123",
  "description":"i am a bad carpenter",
  "website":"www.shaw.com",
  "skypeAcc":"peter_shaw",
  "facebook" :"https:\/\/www.facebook.com/gianmarco.palazzi19",

  "country":"Switzerland",
  "streetNum":"12",
  "street":"via Buffi",
  "verified" : "false",
  "available":"true"
},
{
  "_id":ObjectId(),
  "firstName": "Milano",
  "lastName":"Parker",
  "email":"Peter_p@gmail.com",
  "location":"Bellinzona",
  "latitude": "46.2",
  "longitude": "9.0167",
  "job":"Carpenter",
  "telephoneNum":"123",
  "description":"i am a bad carpenter",
  "website":"xd.com",
  "skypeAcc":"asfd",
  "country":"Switzerland",
  "streetNum":"12",
  "street":"via Buffi",
  "facebook" :"https:\/\/www.facebook.com/gianmarco.palazzi19",
  "verified" : "false",
},
{
  "_id":ObjectId(),
  "firstName": "Peter",
  "lastName":"Parker",
  "email":"Peter_p@gmail.com",
  "location":"Milano",
  "latitude": "46.2",
  "longitude": "9.0167",
  "job":"Carpenter",
  "telephoneNum":"123",
  "description":"i am a bad carpenter",
  "website":"xd.com",
  "skypeAcc":"asfd",
  "country":"Switzerland",
  "streetNum":"12",
  "street":"via Buffi",
  "facebook" :"https:\/\/www.facebook.com/gianmarco.palazzi19",
  "verified" : "true",
}
]
}

var admins = {
  name : 'Admin',
  data : [
    {
      "userName" : "admin",
      "password" : "admin",
      "email" : "admin@usi.ch",
    }
  ]
}

var seedData = [];
seedData.push(freelancers);
seedData.push(users);

seedData.push(admins);

module.exports = seedData;
