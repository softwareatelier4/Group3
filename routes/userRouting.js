//Student: Ilija Gjorgjiev

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/User.js");

const user = mongoose.model("User");


router.get('/', function (req, res) {
    user.find({},{password:0},
       function (err, found) {
        for (let i =0; i<found.length; i++){
            found[i] = found[i].toObject();
            found[i].links = [];
            found[i].links.push({'rel': 'self',
          'href': 'http://localhost:4000/userRouting/' + found[i]._id})
        }
        res.json(found);
    })
});

router.get("/:id", function(req,res){
  user.find({_id: req.params.id},{password:0}, function (err, found) {
      if (Object.keys(found).length === 0) {
          res.status(404).end();
      }
    else{
      found[0] = found[0].toObject();
      found[0].links = [];
      found[0].links.push({'rel': 'self',
      'href': 'http://localhost:4000/userRouting/' + found[0]._id})
      res.json(found[0]);
    }
  })
});

router.delete("/:id",function(req,res){
  user.find({_id: req.params.id},{password:0}, function(err,found){
    if(Object.keys(found).length === 0){
      res.status(404).end();
    }
    else{
      user.remove({_id: req.params.id}, function(err){
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
  let a = new user({
    userName : req.body.userName,
    email: req.body.email,
    password : req.body.password,
    firstName : req.body.firstName,
    dateCreated : req.body.dateCreated,
    lastName : req.body.lastName
  });
  a.save(function(err, saved){
    if(err){
      res.status(400).json().end();
    }
    else{
    saved = saved.toObject();
    delete saved.password;
    res.json(saved);
  }
  })
});


router.put("/:id", function(req,res){
  if(!(req.body.userName)){
    res.sendStatus(400);
  }
  else if(!(req.body.email)){
    res.sendStatus(400);
  }
  else if(!(req.body.password)){
    res.sendStatus(400);
  }
  let a = {
    userName : req.body.userName,
    email: req.body.email,
    password : req.body.password,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    dateCreated : req.body.dateCreated,
  };
  user.update({_id:req.params.id}, a, function(err,modified){
    if(err){
      res.sendStatus(400);
    }
    else{
      if(modified.n === 0){
        var newA = new user({
                    _id: req.params.id,
                    userName : req.body.userName,
                    email: req.body.email,
                    password : req.body.password,
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    dateCreated : req.body.dateCreated,
                });
        newA.save(function(err, saved){
          if(err){
            res.status(400).json().end();
            return;
          }
          saved = saved.toObject();
          delete saved.password;
          res.status(201).json(saved);
        })
      }
      else{
        res.sendStatus(404);
      }

    }
  })
});




module.exports = router;
