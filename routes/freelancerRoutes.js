const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/User.js");
require("../models/Freelancer.js");
//
//
const userModel = mongoose.model("User");
const freelancerModel = mongoose.model("Freelancer");


router.get('/', function (req, res){
    freelancer.find({},
       function (err, found) {
        res.json(found);
    })
});


// router.get("/:id", function(req,res){
//   freelancer.find({_id: req.params.id}, function (err, found) {
//       if (Object.keys(found).length === 0) {
//           res.status(404).end();
//       }
//     else{
//       found[0] = found[0].toObject();
//       found[0].links = [];
//       found[0].links.push({'rel': 'self',
//       'href': 'http://localhost:4000/freelancerRouting/' + found[0]._id})
//       res.json(found[0]);
//     }
//   })
// });
//
//
// router.delete("/:id",function(req,res){
//   freelancer.find({_id: req.params.id},function(err,found){
//     if(Object.keys(found).length === 0){
//       res.status(404).end();
//     }
//     else{
//       freelancer.remove({_id: req.params.id}, function(err){
//                 if(err){
//                   res.status(404).json().end();
//                 }
//                 else{
//                   res.sendStatus(204);
//                 }
//               })
//     }
//   })
// });
//
router.post("/", function(req,res){
  console.log(req.body);
  let a = new freelancerModel(req.body);
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
module.exports = router;
