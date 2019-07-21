const { Pool } = require('pg');
const myjsonparser=require('../service/JsonParser')
function Employee() {
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
  }
  

  Employee.prototype.getEmployees = async function() {
    const queryText = {text:'SELECT emp_no,hire_date,first_name,last_name,birth_date from employees'};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  Employee.prototype.getEmployeesByName = async function(name) {
    const queryText = {text:'SELECT * from employees WHERE first_name=$1',values:name};
    return await ExecuteQuery(this.pool,queryText);
   
  };
  Employee.prototype.getEmployeeById = async function(values) {
    try {
   
    const queryText = {text:'SELECT * from employees WHERE emp_no=$1',values: values};
    
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
      console.error(`readFile failed: ${error}`);
      return false;
       
    }
  };
  async function ExecuteQuery(pool,query)
  {
    res =await pool.query(query);
    return res;
  }
  Employee.prototype.updateEmployee = async function(id,jsondata) {
    try {
      var json=new myjsonparser(jsondata);
      if(json.length<=0)
      {
        return false;
      }
      const cols=['birth_date','first_name','last_name','gender','hire_date','image_url'];
      
      var values=json.getValues(cols);
      values[0]=new Date(values[0]).toISOString().slice(0, 10);
      values[4]=new Date(values[4]).toISOString().slice(0, 10);
     
    var set=[]; 
    for(i=0;i<cols.length;i++)
     {
      set.push(cols[i] + '=$' +(i+1));
     }
    const queryText = {text:'UPDATE employees SET '+set.join(', ')+' WHERE emp_no='+id,values: values};
   
    await ExecuteQuery(this.pool,queryText);
    return true;
  }
  catch (error) {
    console.error(`readFile failed: ${error}`);
    return false;
     
  }
}
  Employee.prototype.addEmployee = async function addEmployee(jsondata) {
    try {
      
      var json=new myjsonparser(jsondata);
      if(json.length<=0)
      {
        return false;
      }
      var values=json.getValues(['birth_date','first_name','last_name','gender','hire_date','image_url']);
      
      values[0]=new Date(values[0]).toISOString().slice(0, 10);
      values[4]=new Date(values[4]).toISOString().slice(0, 10);
    const queryText = {text:'INSERT INTO employees(birth_date,first_name,last_name,gender,hire_date,image_url) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',values: values};
    await ExecuteQuery(this.pool,queryText);
    return true;
  }
    catch (error) {
      console.error(`readFile failed: ${error}`);
      return false;
       
    }
  };
  Employee.prototype.deleteEmployee = async function(id) {
    try {
    const queryText = {text:'DELETE FROM employees WHERE emp_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  
  module.exports = Employee;
  