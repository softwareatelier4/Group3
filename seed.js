'use strict'
const config = require("./config.js")
const mongoose = require('mongoose')
const utils = require('./utils.js')
mongoose.Promise = require('bluebird')
mongoose.connect(config.mongoUrl+config.mongoDbName)
require("./models/User.js")
require("./models/Freelancer.js")
require("./models/Admin.js")

//drop db
function dropDatabase(done){
  utils.dropDb(seed)
}

// global to check if all models have finished
let global_counter = 0;
let number_of_models=0;
function closeConnection(){
  mongoose.connection.close( function(err){

  })}

function seed(){
  let data = require("./test/seedData.js")
  number_of_models=data.length
  data.forEach(function(item){
    seedModel(item)
  })
}

function seedModel(d){
  const Model = mongoose.model(d.name)
  let data=[]
  for(let i = 0; i < d.data.length; i++){
    data.push(new Model(d.data[i]))
  }
  let counter=0;
  data.forEach((item)=> item.save((err,data) => {
    // console.log(this.length)
    if(++counter == d.data.length){
      console.log(`finsihed ${d.name}`)
      checkIfFinished()
    }
  }))
}
function checkIfFinished(){
  if(++global_counter==2){
    closeConnection()
  }
}
dropDatabase(seed)
// seed()
