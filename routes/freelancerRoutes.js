'use strict'
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
const formidable = require("formidable");
const fs = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const multer = require("multer")
var path = require('path');
var upload = multer({ dest: './public/img/' }).single("file")
var upload2 = multer({dest:'./public/files'});
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require("../models/User.js");
require("../models/Freelancer.js");
require("../models/Review.js")
var transport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: "paolofalcionix@gmail.com",
    pass: "BirbaLea2014"
  }
}))

//
//
const user = mongoose.model("User");
const freelancer = mongoose.model("Freelancer");
const review = mongoose.model("Review")
const textSearchFields = ["firstName","lastName","email","location","street","country","job","description"]

router.get("/unverified", function(req,res){
  console.log("here")
  freelancer.find().lean().exec(function(err,found){
    res.json(found);
  })
})

router.get("/verify-email/:id", function(req,res,next){
  let id = req.params.id;
  console.log("fuck alex");
  freelancer.update({_id:id},{emailVerification:true},function(err,modified){
    if(err){
      res.status(400).end()
    }else{
      res.sendFile(path.join(__dirname, '../public/verification.html'));
    }
  })
})

router.put("/verify/:id", function(req,res){
  freelancer.update({_id:req.params.id},{verified:true},function(err,modified){
    if(err){
      console.log(err)
      res.status(400).end()
    }else{
      freelancer.find({_id: req.params.id},function(err,found){
        if(err || Object.keys(found).length === 0){
          res.status(404).end();
        }
        else{
          var mail = {
            from: "paolofalcionix@gmail.com",
            to: found[0].email,
            subject: "Freelancer Profile Verification Approved",
            text: "Your creation request was approved and the profile was verified."
          }
          transport.sendMail(mail, function(error, response){
            if(error){
              console.log(error);
            }else{
              console.log("Message sent: " + response.message);
            }
            transport.close();
          })
        }})
      res.status(201).end()
    }
  })
})
router.post("/claim/:id",upload2.array('files'),function(req,res){

  let p="/files/"
  let o ={}
  o.cv =p+ req.files[0].filename
  o.identification=p+ req.files[1].filename
  if(req.files.length ==3){
    o.optionalFile= p+req.files[2].filename
  }
  freelancer.update({_id:req.params.id},o,function(err,modified){
    if(err){
      res.status(400).end()
    }else{
      user.update({_id:req.body.userId}, {$push:{freelancers:req.params.id}}, function(err, modified){
        if(err){
          res.status(400).end()
        }else{
          res.status(201).end()
        }
      })
    }
  })
})

router.get("/emergency", function(req,res){
  if(req.query.job==undefined){
    res.status(400).end()
    return
  }
  let job = req.query.job
  freelancer.find({job:{ "$regex": job, "$options": "i" },available:true}).lean().exec(function(err, found){
    if(err){
      res.status(400).end()
    }else{
      res.json(found)
    }
  })
})

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
      addAveragesToTheResultAndSend(result,req,res)

    }
  })
})
function addAveragesToTheResultAndSend(a,req,res){
  let counter = 0
  if(a.length==0){
    res.json([])
    return
  }
  a.forEach(function(item){

    review.find({freelancer:item._id}).lean().exec(function(err,found){
      let overall = 0
      let price = 0
      let quality = 0
      let n = found.length
      found.forEach(function(rev){
        overall+= rev.reviewRatingOverall
        price+=rev.reviewRatingPrice
        quality+=rev.reviewRatingQuality
      })

      item.overall = Math.round(overall/n)||5
      item.price = Math.round(price/n)||5
      item.quality = Math.round(quality/n)||5
      if(++counter == a.length){
        res.json(a).end()
      }
    })
  })
}
// returns true if all words are contained in data
function check(data, words, searchFields){
  for(let i = 0; i<words.length;i++){
    let word = words[i]
    let flag = false
    for(let j = 0; j< searchFields.length; j++){
      if(data[searchFields[j]]){
        if(data[searchFields[j]].toLowerCase().indexOf(word) !== -1){
          flag = true
        }
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

      if (Object.keys(found).length === 0 ) {
        res.status(404).end();
      }
      else{
        found[0] = found[0].toObject();
        addAveragesToOneResultAndSend(found[0],req,res)
      }
    })
  });


  function addAveragesToOneResultAndSend(a,req,res){
    review.find({freelancer:a._id}).lean().exec(function(err,found){
      let overall = 0
      let price = 0
      let quality = 0
      let n = found.length
      found.forEach(function(rev){
        overall+= rev.reviewRatingOverall
        price+=rev.reviewRatingPrice
        quality+=rev.reviewRatingQuality
      })

      a.overall = Math.round(overall/n)||5
      a.price = Math.round(price/n)||5
      a.quality = Math.round(quality/n)||5
      res.json(a);
    })
  }

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
            if(req.body.deny){
              var mail = {
                from: "paolofalcionix@gmail.com",
                to: found[0].email,
                subject: "Freelancer Profile Verification Denied",
                text: "Your creation request was denied and the profile was deleted."
              }
              transport.sendMail(mail, function(error, response){
                if(error){
                  console.log(error);
                }else{
                  console.log("Message sent: " + response.message);
                }
                transport.close();
              })
            }
            else{
              var mail = {
                from: "paolofalcionix@gmail.com",
                to: found[0].email,
                subject: "Freelancer Profile Deleted",
                text: "Your freelancer profile was deleted. In case you want more information contact the admin."
              }
              transport.sendMail(mail, function(error, response){
                if(error){
                  console.log(error);
                }else{
                  console.log("Message sent: " + response.message);
                }
                transport.close();
              })
            }
            res.sendStatus(204);
          }
        })
      }
    })
  });

  router.post("/userCreatesFreelancer", upload2.array('files'),function(req,res)
  {
    let a = new freelancer(req.body);
    //get the user data for the name and firstname
    a.verified=false;

    a.save(function(err,saved)
    {
      if(err)
      {
        console.log(err)
        res.status(400).end();
        return;
      }
      var mail = {
        from: "paolofalcionix@gmail.com",
        to: req.body.email,
        subject: "Freelancer Profile JOB ADVISOR",
        text: "A freelancer profile has been created with your email on JOB ADVISOR \n Link:"+"http://localhost:4000/profile/"+saved._id
      }
      transport.sendMail(mail, function(error, response){
        if(error){
          console.log(error);
        }else{
          console.log("Message sent: " + response.message);
        }
        transport.close();
      });
      res.status(201).json({newId:saved._id})
    })
  });


  router.post("/", upload2.array('files'),function(req,res){
    let a = new freelancer(req.body);
    //get the user data for the name and firstname
    console.log(req.body)
    user.findById(req.body.userId).lean().exec( function(err, found){
      if(found == null){
        res.status(400).end()
      }
      console.log(found)
      a.firstName=found.firstName
      a.lastName= found.lastName
      a.verified=false
      let p="/files/"
      a.cv =p+ req.files[0].filename
      a.identification=p+ req.files[1].filename
      if(req.files.length ==3){
        a.optionalFile= p+req.files[2].filename
      }
      a.save(function(err,saved){
        if(err){
          res.status(400).end();
        }else{
          var mail = {
            from: "paolofalcionix@gmail.com",
            to: req.body.email,
            subject: "Verify your email",
            text: "Click on this link to verify your email: http://localhost:4000/freelancer/verify-email/"+saved._id,
          }
          transport.sendMail(mail, function(error, response){
            if(error){
              console.log(error);
            }else{
              console.log("Message sent: " + response.message);
            }
            transport.close();
          });
          user.update({_id:req.body.userId},{$push:{freelancers:saved._id}},function(err){
            if(err){
              res.status(400).end()
            }else{
              console.log(req.body.userId)
              res.status(201).json({newId:saved._id})
            }
          })
        }
      })
    })
  });



  router.post("/update/:id",upload2.array('files'), function(req,res){
    let b = false;
    freelancer.find({_id: req.params.id}, function (err, found){
      if (Object.keys(found).length === 0 ) {
        res.status(404).end();
      }
      else{
        found[0] = found[0].toObject();
        if(found[0].email !== req.body.email)
        {
          b = true;
          req.body.emailVerification=false;
          console.log("emails are different");
        }
        else{
          console.log("the email stayed the same");
        }
      }
    })
    freelancer.update({_id:req.params.id},req.body, function(err,modified){
      if(err){
        res.status(400).end()
      }else{
        if(b){
          var mail = {
            from: "paolofalcionix@gmail.com",
            to: req.body.email,
            subject: "Verify your new email",
            text: "Click on this link to verify your new email: http://localhost:4000/freelancer/verify-email/"+req.params.id,
          }
          transport.sendMail(mail, function(error, response){
            if(error){
              console.log(error);
            }else{
              console.log("Message sent: " + response.message);
            }
            transport.close();
          });
        }
        res.status(201).json()
      }
    })
  })

  router.post("/:id",function(req,res){
    upload(req,res,function(err){
      if(err){

        console.log(err)
        res.status(400).end()
      }else{
        if(req.file== undefined){
          res.status(400).end()
          return;
        }
        let href = "/img/"+req.file.filename
        freelancer.update({_id:req.params.id}, {$push:{pictureGallery:href}}, function(err,modified){
          if(err){
            console.log(err)
            res.status(400).end()
          }else{
            res.status(201).json({src:href})
          }

        })

      }
    })
  });
let timeOutMap={}
function timeoutFreelancer(id){
  return function(){
    freelancer.update({_id:id},{available:false},function(err,modified){
      if(err){
        console.log(err)
      }
    })
  }
}
let timeOutInMilliseconds=30000//30 s
  router.post("/setAvailable/:id", function(req, res){
    console.log(req.query.available)
    let id =req.params.id;
    if(req.query.available=="true"){
      freelancer.update({_id:id},{available:true},function(err,modified){
        if(err){
          res.status(400).end()
        }else{
          if(timeOutMap[id]!=undefined){
            clearTimeout(timeOutMap[id])
          }
          timeOutMap[id]=setTimeout(timeoutFreelancer(id),30000)
          res.status(200).end()
        }
      })
    }else{
      freelancer.update({_id:req.params.id},{available:false},function(err,modified){
        if(err){
          res.status(400).end()
        }else{
          if(timeOutMap[id]!=undefined){
            clearTimeout(timeOutMap[id])
          }
          res.status(200).end()
        }
      })
    }

  })

  // router.delete("/verify-email", function(req,res){
  //   user.update({_id:req.body.id},{emailVerification:true},function(err,modified){
  //     if(err){
  //       console.log(err)
  //       res.status(400).end()
  //     }else{
  //       res.status(201).end()
  //     }
  //   })


  module.exports = router;
