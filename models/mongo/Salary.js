const mongoose=require('mongoose');

const salarySchema=mongoose.Schema({
    salary:{type:Number,required:true},
    fromDate:{type:Date,required:true},
    toDate:{type:Date,required:true},
    employee:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
    
});
salarySchema.index({ fromDate: 1, employee: 1 }, { unique: true })
module.exports=mongoose.model('Salary',salarySchema);