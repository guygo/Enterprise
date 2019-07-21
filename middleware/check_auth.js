const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>
{
   
    try{
      
        const token = req.headers.authorization.split(" ")[1];
     
        jwt.verify(token,'fngsndfgneas24e3tw4435312121bdfnbmsnFFF');
        next(); 
    }catch(err){
        res.status(401).json({message:"unvalid token"});
    }
};