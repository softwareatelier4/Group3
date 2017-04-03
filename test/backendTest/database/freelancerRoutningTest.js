'use strict'
var should = require("should")
var app = require("../../../app")
var request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const ObjectId = mongoose.Types.ObjectId
let utils = require("../../../utils.js")
require("../../../models/User.js");
require("../../../models/Freelancer.js")
let Freelancer = mongoose.model("Freelancer")
const id = ObjectId();
let newFreelancerData={
  "firstName": "peter",
  "lastName":"asdf",
  "email":"Ilija@gmail.com",
  "location":"lugano",
  "latitude" : "89876567",
  "longitude" : "5345610",
  "streetNum" : "9",
  "street" : "Via bossi",
  "country":"Italy",
  "job":"carpenter",
  "telephoneNum":"123",
  "skypeAcc":"asfd",
  "description":"i am a bad carpenter",
  "_id": id.toString()
}


describe("freelancer db test POST",function(){

  it("should add valid user",function(done){
    request(app)
    .post("/freelancer")
    .set("content-type", "application/json")
    .send(newFreelancerData)
    .expect(201)
    .end(function(err,res){
      if(err){
        done(err)
      }else{
        done()
      }

    })
  })
  it("should not add freelancer to db if the data is invalid", function(done){
    var freelancerData = {
      "firstName" : "Seth",
      "lastName" : "MacFarlane",
    }
    request(app)
    .post("/freelancer")
    .set("content-type", "application/json")
    .send(freelancerData)
    .expect(400)
    .end(function(err,res){
      if(err){
        done(err)
      }else{
        done()
      }

    })
  })

  describe("Test full text search", function(){
    it("should find stuff", function(done){
      request(app)
      .get("/freelancer/query?words=carpenter,lugano&city=")
      .send()
      .expect(200)
      .end(function(err,res){
        if(err){
          done(err)
        }else{
          done()
        }
      })
    })
  })
})

// describe('PUT /freelancer/:freelancerid', function(){ //we dont have a put method anymore
//
//   it('should update an existing freelancer', function(done){
//     var freelancerData =  {
//
//       "firstName" : "Seth",
//       "lastName" : "MacFarlane",
//       "email" : "hello",
//       "password" : "peg"
//     };
//
//
//     request(app)
//       .put('/freelancer/' + id)
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .send(freelancerData)
//       .expect(204)
//       .end(function(err, res){
//         var body = res.body;
//         body.should.be.empty;
//
//         //check if freelancer was updated
//         request(app)
//           .get('/freelancer/' + id)
//           .set('Accept', 'application/json')
//           .expect(200)
//           .end(function(err, res){
//             if(err){
//               done(err)
//             }else{
//               done()
//             }
//         });
//
//       });
//   });
// })

describe('GET /freelancer', function(){

    it('should list all the freelancers with correct data', function(done){
      request(app)
        .get('/userRo')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if(err){
            done(err)
          }else{
            done()
          }
        });
    });
  });

  describe('GET /freelancer/:freelancerid', function(){


    it('should list the freelancer with correct data', function(done){
      request(app)
        .get('/freelancer/' + id)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if(err){
            done(err)
          }else{
            done()
          }
                });
    });
    it('should respond with a 404 if the user does not exist', function(done){
        request(app)
          .get('/freelancer/' +"dsadsadsadas")
          .set('Accept', 'application/json')
          .expect(404, done);
      });
  })

  describe('DELETE /freelancer/:freelancerid', function(){
    after(utils.dropDb)


    it('should delete an existing freelancer', function(done){
      request(app)
        .del('/freelancer/' + id)
        .set('Accept', 'application/json')
        .expect(204)
        .end(function(err, res){
          if(err){
            done(err)
          }else{
            done()
          }
          });
    });

    it('should not list the previous resource', function(done){
      request(app)
        .get('/freelancer/' + id)
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 for a previously deleted resource', function(done){
      request(app)
        .delete('/freelancer/' + id)
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 if the user does not exist', function(done){
      request(app)
        .delete('/freelancer/'+'dsadasdsads')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

// utils.dropDb()
