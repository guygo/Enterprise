var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Employee = require("../models/Employee");
var Salary = require("../models/salaries");
var employee = new  Employee();
var Salarie=new Salary();
router.get('/',async (req,res)=>{

  data=await employee.getEmployees();
  console.log(data);
  res.send(data.rows);  
  
});
router.get('/salary/:id',async (req,res)=>{

  data=await Salarie.getEmployees();
  console.log(data);
  res.send(data.rows);  
  
});
router.post('/salary/:id',jsonParser,async (req,res)=>{
  
  await Salarie.addSalary( Array(req.params.id).concat(req.body.values)); 
  
  res.send('done');  
  
});
router.post('/',jsonParser,async (req,res)=>{
  
  await employee.addEmployee(req.body.values); 
  
  res.send('done');  
  
});
module.exports = router;
