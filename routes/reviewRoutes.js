'use strict'
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
require("../models/Review.js");

const review = mongoose.model("Review");


router.get('/', function (req, res){
    review.find({},
       function (err, found) {
        res.json(found);
    })
});
router.get("/freelancer/:id", function(req, res){
  if(req.params.id == undefined){
    res.status(404).end();
    return;
  }
  review.find({freelancer:req.params.id}).lean().exec(function(err,found){
    res.json(found);
  })
})
router.get("/:id", function(req,res){

  review.find({_id: req.params.id}, function (err, found) {
      if(err){
        res.status(404).end();
        return;
      }
      if (Object.keys(found).length === 0) {
        console.log("here")
          res.status(404).end();
      }
    else{
      found[0] = found[0].toObject();
      found[0].links = [];
      found[0].links.push({'rel': 'self',
      'href': 'http://localhost:4000/reviewRoutes/' + found[0]._id})
      res.json(found[0]);
    }
  })
});



router.delete("/:id",function(req,res){
  review.find({_id: req.params.id}, function(err,found){
    if(err || Object.keys(found).length === 0){
      res.status(404).end();
    }
    else{
      review.remove({_id: req.params.id}, function(err){
                if(err){
                  res.status(404).json().end();
                }
                else{
                  res.sendStatus(204);
                }
              })
    }
  })
});

router.post("/", function(req,res){
  let a = new review(req.body);
  a.save(function(err, saved){
    if(err){
      res.status(400).json().end();
    }
    else{
    saved = saved.toObject();
    res.json(saved);
  }
  })
});


router.put("/:id", function(req,res){
  let a = req.body;
  review.update({_id:req.params.id}, a, function(err,modified){
    if(err){
      res.sendStatus(400);
    }
    else{
      res.sendStatus(200);
    }
  })
});




module.exports = router;
