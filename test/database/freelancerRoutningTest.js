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
let Freelancer = mongoose.model("Freelancer")
let newFreelancerData={
  firstName: "peter",
  lastName:"asdf",
  email:"fuckIlija@gmail.com",
  location:"lugano",
  job:"carpenter",
  telephoneNum:"123",
  description:"i am a bad carpenter",
  website:"xd.com",
  skypeAcc:"asfd"
}

describe("freelancer db test",function(){
  it("should add valid user",function(done){
    request(app)
    .post("freelancer")
    .set("content-type", "application/json")
    .send(newFreelancerData)
    .expect(201)
    .end(function(err,res){
      done()
    })
  })
  describe("Test full text search", function(){
    before(utils.dropDb);
    after(utils.dropDb)
    it("should find stuff", function(done){
      request(app)
      .get("freelancer/query?words=carpenter,lugano")
      .send()
      .expect(201)
      .end(function(err,res){
        done()
      })
    })
  })
})

// utils.dropDb()
