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
var mailer = require('nodemailer');
var transporter = mailer.createTransport({
service: 'Gmail',
auth: {
    user: 'paolofalcionix@gmail.com',
    pass: 'BirbaLea2014'
}
});
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



router.post("/smtp", function(req,res){
//   mailer.SMTP = {
//     host: 'gmail.com',
//     port: 587,
//     use_authentication: true,
//     user: 'paolofalcionix@gmail.com',
//     pass: 'BirbaLea2014'
// };
// upload2.array("file",3);
// upload2(req,res,function(err){
//   console.log("enter error");
//   if(err){
//
//     console.log(err)
//     res.status(400).end()
//   }else{
//     if(req.file== undefined){
//       res.status(400).end()
//       return;
//     }
//     let href = "/img/"+req.file.filename
//     freelancer.update({_id:req.params.id}, {$push:{pictureGallery:href}}, function(err,modified){
//       if(err){
//         console.log(err)
//         res.status(400).end()
//       }else{
//         res.status(201).json({src:href})
//       }
//
//     })
//
//   }
// })
transporter.sendMail({
from: 'paolofalcionix@gmail.com',
  to: 'ilijagjorgjiev03@gmail.com',
  subject: 'Become Freelancer!',
  text: 'Become Freelancer!',
  attachments: [{filename: "/Users/ilijagjorgjiev/Desktop/damiano.jpg"}]
});
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
  console.log("asdf")
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
  console.log(req.files)
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

  // a.save(function(err, saved){
  //   if(err){
  //     res.status(400).json().end();
  //   }
  //   else{
  //     res.status(201).end()
  //   }
  // })
});

router.post("/update/:id", function(req,res){
  console.log(req.body)
  freelancer.update({ownerId:req.params.id},{$set: {description:req.body.description, location:req.body.location}}, function(err,modified){
    if(err){
      console.log(err)
      res.status(400).end()
    }else{
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


  // let a = req.body;
  // let form = new formidable.IncomingForm();
  //   form.on('fileBegin', function (name, file){
  //       file.path = __dirname + '/public/img' + file.name;
  //   });
  //
  //   form.on('file', function (name, file){
  //       console.log('Uploaded ' + file.name);
  //   });
		// form.parse(req, (err,fields,files)=>{
		// 	if(err){
    //     console.log(a)
    //     res.status(400).end();
    //     return;
    //   }
		// 	fs.rename(files.file.path,"../public/img/"+files.file.name,(err)=>{
		// 		console.log(err);
		// 		return;
		// 	})


  // let form = new formidable.IncomingForm();
  //
  // form.parse(req.body, function(err, fields, files) {
  //   //let fileName = files.file.name;
  //   console.log(fields);
  // });
  // freelancer.update({_id:req.params.id}, a, function(err,modified){
  //   if(err){
  //     res.sendStatus(400);
  //   }
  //   else{
  //     res.sendStatus(204);
  //   }
  // })
});
module.exports = router;
