var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Department = require("../models/Departments");
var department = new  Department();

router.get('/',async (req,res)=>{
  
  data=await department.getDepartments();
  console.log(data);
  res.send(data.rows);  
  
});
router.post('/',jsonParser,async (req,res)=>{
  
  await department.addDepartment(req.body.values); 
  
  res.send('done');  
  
});
module.exports = router;
