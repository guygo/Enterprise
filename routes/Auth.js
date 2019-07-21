const express = require('express');
const router = express.Router();
const User = require("../models/User");
const UserMethod=new User();
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken");

router.post('/login',async (req,res,next)=>{
   try
    {   
        const user=await UserMethod.getUserByEmail([req.body.email]);
        if(!user)
        {
            return res.status(401).json({
                message:"user not found"
            });
        }
        if(bcrypt.compare(req.body.password,user.user_password))
        {
            const token=jwt.sign({email:user.email},
            'fngsndfgneas24e3tw4435312121bdfnbmsnFFF',
            {expiresIn:'1h'})
            return  res.status(200).json({token:token,expiresIn:3600});
        }
        else
        {
            console.log('wrong password '+user.user_password);
            return res.status(401).json({
                message:"Auth failed"
            });
        }
    }catch(err){
        console.log(err);
        return res.status(401).json({
        message:"Auth failed"
        });
    }

});
module.exports = router;