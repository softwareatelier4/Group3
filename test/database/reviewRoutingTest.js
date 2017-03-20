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
require("../../models/Review.js")
let Review = mongoose.model("Review")
let newReviewData={reviewText:"LEL",
 reviewRating:"2",
 user:"58caba5b97aa1a1b665b5c0f",
 freelancer:"58cab9a297aa1a1b665b5c0c"
}
const id = ObjectId();

describe("review db test POST",function(){
  it("should add valid user",function(done){
    request(app)
    .post("review")
    .set("content-type", "application/json")
    .send(newReviewData)
    .expect(201)
    .end(function(err,res){
      done()
    })
  })
  it("should not add review to db if the data is invalid", function(done){
    var reviewData = {
      "reviewRating" : "2"
    }
    request(app)
    .post("/review")
    .set("content-type", "application/json")
    .send(reviewData)
    .expect(400)
    .end(function(err,res){
      done();
    })
  })

})

describe('PUT /review/:reviewid', function(){

  it('should update an existing review', function(done){
    var reviewData =  {
     "reviewText":"LAL",
     "reviewRating":"3",
     "user":"58caba5b97aa1a1b665b5c0f",
     "freelancer":"58cab9a297aa1a1b665b5c0c"
    };

    request(app)
      .put('/review/' + id)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(reviewData)
      .expect(204)
      .end(function(err, res){
        var body = res.body;
        body.should.be.empty;

        //check if review was updated
        request(app)
          .get('/review/' + id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/, 'it should respond with json' )
          .expect(200)
          .end(function(err, res){
            done();
          });

      });
  });
})

describe('GET /review', function(){

    it('should list all the reviews with correct data', function(done){
      request(app)
        .get('/userRo')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          done();
        });
    });
  });

  describe('GET /review/:reviewid', function(){


    it('should list the review with correct data', function(done){
      request(app)
        .get('/review/' + id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          done();
        });
    });
    it('should respond with a 404 if the user does not exist', function(done){
        request(app)
          .get('/review/' +"dsadsadsadas")
          .set('Accept', 'application/json')
          .expect(404, done);
      });
  })

  describe('DELETE /review/:reviewid', function(){


    it('should delete an existing review', function(done){
      request(app)
        .del('/review/' + id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(204)
        .end(function(err, res){
          done();
        });
    });

    it('should not list the previous resource', function(done){
      request(app)
        .get('/review/' + id)
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 for a previously deleted resource', function(done){
      request(app)
        .delete('/review/' + id)
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 if the user does not exist', function(done){
      request(app)
        .delete('/review/'+'dsadasdsads')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

// utils.dropDb()
