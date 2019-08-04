const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    gender:{type:String,required:true},
    birthDate:{type:Date,required:true},
    hireDate:{type:Date,required:true},
    imgUrl:{type:String,required:true},
   
});
module.exports=mongoose.model('Employee',employeeSchema);