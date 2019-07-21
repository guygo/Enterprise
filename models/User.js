const db = require('../db/dbqueries');
const bcrypt=require('bcryptjs');
function User() {}
User.prototype.getUserByEmail=async function(email)
{
 const query={text:"SELECT * FROM users WHERE email=$1",values:email}
 const{rows}=await db.query(query)
 return rows[0];

}
User.prototype.InsertUser=function(values)
{
 bcrypt.hash(values[1],12).then(hash=>{ 
     values[1]=hash;
     console.log('here'+hash); 
     db.query({text:'INSERT INTO users(email,user_password) VALUES($1,$2)',values: values})
  }).catch(err=>{
      console.log(err);
  }); 

}
module.exports=User;