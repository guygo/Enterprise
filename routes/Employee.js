const express = require('express');
const router = express.Router();

const multer = require("multer");

const Employee = require("../models/Employee");
const Salary = require("../models/salaries");
const employee = new  Employee();
const Salarie=new Salary();
const Authorization=require('../middleware/check_auth');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "../enterprise/public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.get('/',Authorization,async (req,res)=>{
  
  data=await employee.getEmployees();
  
  res.send(data.rows);  
  
});
router.get('/:id',Authorization,async (req,res)=>{
  
 try{
  data=await employee.getEmployeeById([req.params.id]);
 
  if(typeof data.rows === 'undefined' || data.rows.length <= 0)
  {
    
      res.send({message:'not found'});
      
  }
  else
  {
    res.send(data.rows[0]); 
  }
}catch (error) {
  console.error(`readFile failed: ${error}`);
  return false;
   
}
  
  
});
router.get('/salary/:id',Authorization,async (req,res)=>{

  data=await Salarie.getEmployees();
  
  res.send(data.rows);  
  
});
router.post('/salary/:id',Authorization,async (req,res)=>{
  
  await Salarie.addSalary( Array(req.params.id).concat(req.body.values)); 
  
  res.send('done');  
  
});
router.put('/:id',Authorization,multer({ storage: storage }).single("image"),async (req,res)=>{
  
  
  
   if(req.file)
   {
    const body=req.body;
  
    const url=req.protocol+'://'+req.get("host");
    success=await employee.updateEmployee(req.params.id,{
      first_name:body.first_name,
      last_name:body.last_name,
      gender:body.gender,
      hire_date:body.hire_date,
    birth_date:body.birth_date,
      image_url:url+"/images/"+req.file.filename
    });
   
   }
   else{
    const body=req.body;
    success=await employee.updateEmployee(req.params.id,{
      first_name:body.first_name,
      last_name:body.last_name,
      gender:body.gender,
      hire_date:body.hire_date,
      birth_date:body.birth_date,
      image_url:body.imageUrl
    });
 
   }
  if(success){
    res.status(201).json({message:'done'});  
  }
   else
   {
    res.status(401).json({message:'fail'});
   }
});
router.post('/',Authorization,multer({ storage: storage }).single("image"),async (req,res)=>{
  
  const body=req.body;
  
  const url=req.protocol+'://'+req.get("host");
  success=await employee.addEmployee({
    first_name:body.first_name,
    last_name:body.last_name,
    gender:body.gender,
    hire_date:body.hire_date,
    birth_date:body.birth_date,
    image_url:url+"/images/"+req.file.filename
  });
if(success){
  res.status(201).json({message:'done',url:url+"/images/"+req.file.filename});  
}
 else
 {
  res.status(401).json({message:'fail'});
 }
  
});
module.exports = router;
