const { Pool } = require('pg');
const pool = new Pool({
    connectionString: "postgres://postgres:1234@127.0.0.1:5432/Enterprise"
  });

async function all(table)
{
    
    query={text:"SELECT * FROM "+table};
   
    res =await pool.query(query);
    return res.rows;

}

async function ByCols(table,types,id)
{
args=[];
index=1;
types.forEach(function(value){
    args.push(value+"=$"+index);
    index=index+1;
});

query={text:"SELECT * FROM "+table+" WHERE "+args.join(" OR "),values:id};
console.log(query);
    res =await pool.query(query);
    console.log(res.rows);
    return res.rows;

}
ByCols("employees",["first_name","last_name"],["T_601","yossi"]);
