
const bcrypt = require("bcryptjs");

const mongoose=require('mongoose');
const User = require("./models/mongo/user");
mongoose
  .connect(
    'mongodb://localhost:27017/Enterprise'
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
bcrypt.hash("admin", 10).then(hash => {
    const user = new User({
      email: "guy@gmail.com",
      password: hash
    });
    user
      .save()
      .then(result => {
      console.log('created'); 
      })
      .catch(err => {
        console.log(err); 
      });
  });





