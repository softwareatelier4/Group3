'use strict'
let mongoose = require("mongoose")
module.exports.dropDb=function(done){
  let collections = Object.keys(mongoose.connection.models)
  let counter = 0;
  collections.forEach(function(name){
    mongoose.models[name].remove({},function(err){
      if(++counter == collections.length){
        done()
      }
    })
  })
  // mongoose.connection.collections['users'].drop(function(err){
  //   done();
  // })
}
