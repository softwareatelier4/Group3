'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;



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

var seedData = [];
seedData.push(users);

module.exports = seedData;
