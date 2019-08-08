const express = require('express');
const router = express.Router();
const Calendar=require('../models/mongo/calendarEvent')
router.post('/',async (req,res)=>{
    console.log(req.body[0].date);
    data=await Calendar.insertMany(req.body,function(err){
        console.log(err);
    });
   
    
    res.send('sucess');  
    
  });
  module.exports = router;