const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Employee = require("../models/Employee");
const Salary = require("../models/salaries");
const employee = new  Employee();
const Salarie=new Salary();
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
  console.log(req.body);
  await employee.addEmployee(req.body); 
 res.status(201).json({message:'done'});  
  
});
module.exports = router;
