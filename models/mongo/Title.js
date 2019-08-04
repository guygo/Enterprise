const mongoose=require('mongoose');

const titleSchema=mongoose.Schema({
    title:{type:String,required:true},
    fromDate:{type:Date,required:true},
    toDate:{type:Date,required:true},
    employee:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
    
});
module.exports=mongoose.model('Title',titleSchema);