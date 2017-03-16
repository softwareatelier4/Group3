const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
require("../models/User.js");
require("../models/Freelancer.js");
//
//
const user = mongoose.model("User");
const freelancer = mongoose.model("Freelancer");

router.get('/query', function(req,res){
  let words = req.query.words.split(',')
  freelancer.find({},function(err,found){
    if(err){
      res.status(500).end()
    }else{
      let result=[]
      // console.log(words)
      found.forEach(function(item){
        if(check(item, words)){
          result.push(item)
        }
      })
      res.status(200).end()
    }
  })
  // console.log(req.query)
  // console.log("asdf")
})

function check(data, words){
  for(x in data){
    console.log(x)
  }
}
router.get('/', function (req, res){
    freelancer.find({},
       function (err, found) {
        res.json(found);
    })
});



router.get("/:id", function(req,res){
  freelancer.find({_id: req.params.id}, function (err, found) {
      if (Object.keys(found).length === 0) {
          res.status(404).end();
      }
    else{
      found[0] = found[0].toObject();
      res.json(found[0]);
    }
  })
});
router.delete("/:id",function(req,res){
  freelancer.find({_id: req.params.id},function(err,found){
    if(Object.keys(found).length === 0){
      res.status(404).end();
    }
    else{
      freelancer.remove({_id: req.params.id}, function(err){
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
  let a = new freelancer(req.body);
  a.save(function(err, saved){
    if(err){
      console.log(err)
      res.status(400).json().end();
    }
    else{
      res.status(201).end()
    }
  })
});

router.put("/:id", function(req,res){
  let a = req.body;
  freelancer.update({_id:req.params.id}, a, function(err,modified){
    if(err){
      res.sendStatus(400);
    }
    else{
      res.sendStatus(200);
    }
  })
});
module.exports = router;
