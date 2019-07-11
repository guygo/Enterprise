const { Pool } = require('pg');

function Employee() {
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
  }
  
  Employee.prototype.getEmployees = async function getEmployees() {
    const queryText = {text:'SELECT hire_date,first_name,last_name,birth_date from employees'};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  Employee.prototype.getEmployeesByName = async function getEmployeesByName(name) {
    const queryText = {text:'SELECT * from employees WHERE first_name=$1',values:name};
    return await ExecuteQuery(this.pool,queryText);
   
  };
  Employee.prototype.getEmployeeById = async function getEmployeeById(id) {
    const queryText = {text:'SELECT * from employees WHERE emp_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  async function ExecuteQuery(pool,query)
  {
    res =await pool.query(query);
    return res;
  }
  Employee.prototype.addEmployee = async function addEmployee(values) {
    try {
    const queryText = {text:'INSERT INTO employees(birth_date,first_name,last_name,gender,hire_date) VALUES($1,$2,$3,$4,$5) RETURNING *',values: values};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  Employee.prototype.deleteEmployee = async function deleteEmployee(id) {
    try {
    const queryText = {text:'DELETE FROM employees WHERE emp_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  
  module.exports = Employee;