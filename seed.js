const config = require("./config.js")
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl+config.mongoDbName)

require("./models/User.js")
const User = mongoose.model("User");

let data = require("./test/seedData.js")
let userData = data[0].data
let users=[]
console.log(userData)
for(let i = 0; i< userData.length; i++){
  const newUser = new User(userData[i])
  users.push(newUser)
}

users.forEach((item)=> item.save((err,data) => {
  console.log("done")
}))
