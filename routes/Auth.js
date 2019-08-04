const express = require('express');
const router = express.Router();
const User = require("../models/mongo/User");

const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken");

router.post("/login", (req, res, next) => {
    let fetchedUser;
    console.log(JSON.stringify(req.body));
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "fngsndfgneas24e3tw4435312121bdfnbmsnFFF",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn:3600
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Auth failed"
        });
      });
  });
  

module.exports = router;