var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

var Department = require("../models/Departments");
var department = new  Department();

router.get('/',async (req,res)=>{
  
  data=await department.getDepartments();
  console.log(data);
  res.send(data.rows);  
  
});
router.post('/',async (req,res)=>{
  
  await department.addDepartment(['hasa']); 
  
  res.send('done');  
  
});
module.exports = router;
