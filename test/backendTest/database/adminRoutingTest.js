'use strict'
var should = require("should")
var app = require("../../../app")
var request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const ObjectId = mongoose.Types.ObjectId
let utils = require("../../../utils.js")
require("../../../models/Admin.js");
require("../../../models/Freelancer.js")
let Admin = mongoose.model("Admin")
const id = ObjectId();
let newAdminData={
    "userName" : "admin",
    "password" : "admin",
    "email" : "admin@usi.ch",
}
let unsuccesfulData = {};

describe("Testing if this guy is an real Admin", function(){
  it("should check if the guy logining in is an Admin succesfully", function(done){
    request(app)
    .get("/userRouting/adminlogin")
    .query(newAdminData)
    .expect(200)
    .end(function(err, res){
      if(err){
        done(err);
      }
      else{
        done(err);
      }
    })
  })
  it("should check if the guy logining in is an Admin unsuccesfully", function(done){
    request(app)
    .get("/userRouting/adminlogin")
    .query(unsuccesfulData)
    .expect(404)
    .end(function(err, res){
      if(err){
        done(err);
      }
      else{
        done(err);
      }
    })
  })
});
