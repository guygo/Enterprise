const { Pool } = require('pg');

function Salaries() {
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
  }
  
  Salaries.prototype.getEmployeesSalarie = async function getEmployeesSalarie() {
    const queryText = {text:'SELECT first_name last_name salary from Employees full outer JOIN Salaries on Employees.emp_no=Salaries.emp_no'};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  Salaries.prototype.getEmploySalarieByid = async function getEmploySalarieByid(id) {
    const queryText = {text:'SELECT first_name last_name salary from Employees RIGHT JOIN Salaries on Employees.emp_no=Salaries.emp_no WHERE Employees.emp_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
   
  };
  
  async function ExecuteQuery(pool,query)
  {
    res =await pool.query(query);
    return res;
  }
  Salaries.prototype.addSalary = async function addSalary(values) {
    try {
    const queryText = {text:'INSERT INTO Salaries(emp_no,Salary,from_date,to_date) VALUES((SELECT employees.emp_no FROM employees WHERE first_name=$1 limit 1),$2,$3,$4) RETURNING *',values: values};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  
  
  module.exports = Salaries;