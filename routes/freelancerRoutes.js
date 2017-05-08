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
var upload = multer({ dest: './public/img/' }).single("file")
var upload2 = multer({dest:'./public/files'});
require("../models/User.js");
require("../models/Freelancer.js");
require("../models/Review.js")

//
//
const user = mongoose.model("User");
const freelancer = mongoose.model("Freelancer");
const review = mongoose.model("Review")
const textSearchFields = ["firstName","lastName","email","location","street","country","job","description"]

router.get("/unverified", function(req,res){
  console.log("here")
  freelancer.find({verified:false}).lean().exec(function(err,found){
    res.json(found);
  })
})

router.put("/verify/:id", function(req,res){

  freelancer.update({_id:req.params.id},{verified:true},function(err,modified){
    if(err){
      console.log(err)
      res.status(400).end()
    }else{
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
                  res.sendStatus(204);
                }
              })
    }
  })
});

router.post("/", upload2.array('files'),function(req,res){
  let a = new freelancer(req.body);
  //get the user data for the name and firstname
  // console.log(req.body)
  user.findById(req.body.userId).lean().exec( function(er, found){
    // console.log(found)
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
        console.log(err)
        res.status(400).end();
      }else{
        console.log(saved._id)
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
  console.log(req.params.id)
  freelancer.update({_id:req.params.id},req.body, function(err,modified){
    if(err){
      console.log(err)
      res.status(400).end()
    }else{
      console.log(modified)
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


module.exports = router;
