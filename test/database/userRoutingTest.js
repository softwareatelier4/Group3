var should = require("should")
var app = require("../../app")
var request = require('supertest');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

require("../../models/User.js");

const User = mongoose.model("User");
const id = ObjectId();
describe("Testing Create on userRouting ", function(){
  describe("POST/users",function(){
    it("should add user to db if the data is valid", function(done){
      var newUserData = {
        "_id":id,
        "firstName" : "Seth",
        "lastName" : "MacFarlane",
        "userName" : "seth",
        "email" : "seth.macfarlane@gmail.com",
        "password" : "peg"
      }
      request(app)
      .post("/userRouting")
      .set("content-type", "application/json")
      .send(newUserData)
      .expect(201)
      .end(function(err,res){
        done();
      })
    })
    it("should not add user to db if the data is invalid", function(done){
      var newUserData = {
        "firstName" : "Seth",
        "lastName" : "MacFarlane",
      }
      request(app)
      .post("/userRouting")
      .set("content-type", "application/json")
      .send(newUserData)
      .expect(400)
      .end(function(err,res){
        done();
      })
    })
  })
  describe('PUT /users/:userid', function(){

    it('should update an existing user', function(done){
      var newUserData =  {

        "firstName" : "Seth",
        "lastName" : "MacFarlane",
        "userName" : "seth",
        "email" : "hello",
        "password" : "peg"
      };

      request(app)
        .put('/userRouting/' + id)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newUserData)
        .expect(204)
        .end(function(err, res){
          var body = res.body;
          body.should.be.empty;

          //check if user was updated
          request(app)
            .get('/userRouting/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              done();
            });

        });
    });
})

})
