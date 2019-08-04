const express = require('express');
const router = express.Router();
const Calendar=require('../models/mongo/calendarEvent')
router.post('/',async (req,res)=>{
    const calendar=new Calendar({
        title:req.body.tile,
        description:req.body.description,
        date:req.body.date
    });

    data=calendar.save();
    console.log(JSON.stringify(data));
    res.send(data);  
    
  });
  module.exports = router;