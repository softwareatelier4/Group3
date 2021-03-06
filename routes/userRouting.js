'use strict'
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require("../models/User.js");
require("../models/Admin.js");
var transport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: "paolofalcionix@gmail.com",
    pass: "BirbaLea2014"
  }
}))

const user = mongoose.model("User");


//for android app login
router.post('/login',function(req,res){

  user.findOne({userName:req.body.userName,password:req.body.password}).lean().populate("freelancers").exec(function(err,found){
    if(found == null){
      res.status(404).json(found);
      res.end();
    }
    else{
      console.log("entered");
      res.status(200).json(found);
      res.end();
    }
  })
})


router.get("/xd", function(req,res){
  user.findOne({userName:req.query.userName}).lean().exec(function(err,found){
    if(found == null){
      let a = new user(req.query);
      a.save(function(err, saved){
        if(err){
          res.json({'error' : 'Fill all the fields'}).end();
        }
        else{
          //var htmlToSend = '<head></head><body><input type="button" onclick="window.location="localhost:4000/verify-email"></button></body>'
          var mail = {
            from: "paolofalcionix@gmail.com",
            to: req.query.email,
            subject: "Verify your email",
            text: "Click on this link to verify your email: http://localhost:4000/verify-email",
          }
          transport.sendMail(mail, function(error, response){
            if(error){
              console.log(error);
            }else{
              console.log("Message sent: " + response.message);
            }

            transport.close();
          });
          saved = saved.toObject();
          delete saved.password;
          res.status(200).json(saved).end();
        }
      })
    }
    else{
      res.json({'error' : 'The username already exists'});
    }
  })
});

router.put("/verify-email", function(req,res){
  user.update({_id:req.body.id},{emailVerification:true},function(err,modified){
    if(err){
      console.log(err)
      res.status(400).end()
    }else{
      res.status(201).end()
    }
  })
  // let id = req.body.id;
  //   user.update({_id : id}, {$set : {"emailVerification" : true}});
  //   user.find({_id : id}, function(err,found){
  //     console.log(found);
  //     })

  // res.sendStatus(200);
});

const admin = mongoose.model("Admin");


router.get('/', function (req, res){
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

  router.get('/login',function(req,res){
    user.findOne({userName:req.query.userName,password:req.query.password}).lean().exec(function(err,found){
      if(found == null){
        res.status(404).json(found);
        res.end();
      }
      else{
        console.log("entered");
        res.status(200).json(found);
        res.end();
      }
    })
  })
  router.get('/adminlogin',function(req,res){
    admin.findOne({userName:req.query.userName,password:req.query.password}).lean().exec(function(err,found){
      console.log("entered");
      if(found == null){
        res.status(404).json(found);
        res.end();
      }
      else{
        console.log("entered");
        res.status(200).json(found);
        res.end();
      }
    })
  })

  router.get("/:id", function(req,res){
    user.find({_id: req.params.id},{password:0}, function (err, found) {
      console.log(req.params.id)
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

  router.get("/my-profile/:id", function(req,res){
    user.findOne({_id: req.params.id},{password:0}).lean().populate("freelancers").exec(function(err,found){
      if(found == null){
        res.status(404).json(found)
      }
      else{
        res.status(200).json(found)
      }

    })
  });



  router.delete("/:id",function(req,res){
    user.find({_id: req.params.id},{password:0}, function(err,found){
      if(err || Object.keys(found).length === 0){
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



  router.put("/:id", function(req,res){
    let a = req.body;
    user.update({_id:req.params.id}, a, function(err,modified){
      if(err){
        res.sendStatus(400);
      }
      else{
        res.sendStatus(200);
      }
    })
  });





  module.exports = router;
