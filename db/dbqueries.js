const { Pool } = require('pg')
pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
async function Execute(query)
  {
    
    try{
    res =await pool.query(query);
    return res.rows;
    }catch(err){console.error(`readFile failed: ${err}`); return [];}
  
  }
 
  module.exports = {
    ExecuteQuery: Execute
}


