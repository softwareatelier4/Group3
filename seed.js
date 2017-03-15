'use strict'
const config = require("./config.js")
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(config.mongoUrl+config.mongoDbName)
// console.log(mongoose.connection)
require("./models/User.js")
const User = mongoose.model("User");
//drop db
function dropDatabase(done){
  mongoose.connection.collections['users'].drop(function(err){
    done();
  })
}

function closeConnection(){
  mongoose.connection.close( function(err){

  })}

function seed(){
  let data = require("./test/seedData.js")
  let userData = data[0].data
  let users=[]

  for(let i = 0; i< userData.length; i++){
    const newUser = new User(userData[i])
    users.push(newUser)
  }
  let counter=0;
  users.forEach((item)=> item.save((err,data) => {
    if(++counter == users.length){
      closeConnection()
    }
  }))
}
dropDatabase(seed)
// seed()
