const express = require('express');
const router = express.Router();

const multer = require("multer");

const Employee = require("../models/mongo/Employee");
const Salary = require("../models/mongo/Salary");
const Title = require("../models/mongo/Title");
//const employee = new  Employee();
//const Salarie=new Salary();
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
  
  data=await Employee.find({}).exec();
  console.log(JSON.stringify(data));
  res.send(data);  
  
});
router.get('/:id',Authorization,async (req,res)=>{
  
 try{
  data=await Employee.findById(req.params.id).exec();
  console.log(JSON.stringify(data));
  if(typeof data === 'undefined' || data.length <= 0)
  {
    
      res.send({message:'not found'});
      
  }
  else
  {
    res.send(data); 
  }
}catch (error) {
  console.error(`readFile failed: ${error}`);
  res.send({message:'not found'});
  return false;
   
}
  
  
});

router.get('/salary/:id',Authorization,async (req,res)=>{

  data=await Salarie.getEmploySalarieByid(req.params.id);
  
  res.send(data.rows);  
  
});
router.post('/:id/salary',Authorization,async (req,res)=>{
  try{
  salary=new Salary({
    salary:req.body.salary,
    fromDate:req.body.fromDate,
    toDate:req.body.toDate,
    employee:req.params.id
  });
 
  message=await salary.save(); 
  
  res.status(201).json({message:'done'});    
}catch(err){ res.status(401).json({message:'error'});;console.log(err);}
});
router.post('/:id/title',Authorization,async (req,res)=>{
  try{
  title=new Title({
    title:req.body.title,
    fromDate:req.body.fromDate,
    toDate:req.body.toDate,
    employee:req.params.id
  });
 
  message=await title.save(); 
  
  res.status(201).json({message:'done'});    
}catch(err){ res.status(401).json({message:'error'});;console.log(err);}
});
router.put('/:id',Authorization,multer({ storage: storage }).single("image"),async (req,res)=>{
   if(req.file)
   {
    const body=req.body;
  
    const url=req.protocol+'://'+req.get("host");
    const employee =new Employee({
      _id:req.params.id,
      firstName:body.first_name,
      lastName:body.last_name,
      gender:body.gender,
      hireDate:body.hire_date,
      birthDate:body.birth_date,
      imgUrl:url+"/images/"+req.file.filename
  
      });
      res=await Employee.updateOne({_id:req.params.id},employee).exec();
      if(res){
        res.status(201).json({message:'done'});  
      }
       else
       {
        res.status(401).json({message:'fail'});
       }
     
   }
   else{
    const body=req.body;
    const employee =new Employee({
    _id:req.params.id,
    firstName:body.first_name,
    lastName:body.last_name,
    gender:body.gender,
    hireDate:body.hire_date,
    birthDate:body.birth_date,
    imgUrl:body.imageUrl

    });
    res=await Employee.updateOne({_id:req.params.id},employee).exec();
    if(res){
      res.status(201).json({message:'done'});  
    }
     else
     {
      res.status(401).json({message:'fail'});
     }
   }
 
});


router.post('/',Authorization,multer({ storage: storage }).single("image"),async (req,res)=>{
  
  const body=req.body;
  
  const url=req.protocol+'://'+req.get("host");
  const employee =new Employee({
    
    firstName:body.first_name,
    lastName:body.last_name,
    gender:body.gender,
    hireDate:body.hire_date,
    birthDate:body.birth_date,
    imgUrl:url+"/images/"+req.file.filename

    });
    emp=await employee.save();
   
if(res){
  res.status(201).json({message:'done',url:url+"/images/"+req.file.filename,id:emp._id});  
}
 else
 {
  res.status(401).json({message:'fail'});
 }
  
});
module.exports = router;
