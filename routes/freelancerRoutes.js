'use strict'
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
const textSearchFields = ["firstName","lastName","email","location","street","country","job","description"]

router.get('/query', function(req,res){
  let words = req.query.words.split(',')
  let location= [req.query.city.toLowerCase()]
  for(let i = 0; i<words.length; i++){//set everyting to lowercase
    words[i]= words[i].toLowerCase()
  }
  freelancer.find({},{dateCreated:0,__v:0}).lean().exec(function(err,found){
    if(err){
      res.status(500).end()
    }else{
      let result=[]
      found.forEach(function(item){
        if(check(item, words,textSearchFields)){
          if(check(item, location, ["location"])){
            result.push(item)
          }

        }
      })
      res.json(result).end()
    }
  })
})

// returns true if all words are contained in data
function check(data, words, searchFields){
  for(let i = 0; i<words.length;i++){
    let word = words[i]
    let flag = false
    for(let j = 0; j< searchFields.length; j++){
        if(data[searchFields[j]].toLowerCase().indexOf(word) !== -1){
          flag = true
        }
    }
    if(!flag){
      return false
    }
  }
  return true
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
    if(err || Object.keys(found).length === 0){
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
