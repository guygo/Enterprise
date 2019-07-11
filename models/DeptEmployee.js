const { Pool } = require('pg');

function DeptEmployee() {
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
  }
  
  DeptEmployee.prototype.getDeptEmployee = async function getDeptEmployee() {
    const queryText = {text:'SELECT * from Employees,departments,dept_manager WHERE Employees.emp_no=Dept_emp.emp_no AND Departments.dept_no=Dept_emp.dept_no'};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  DeptEmployee.prototype.getDeptEmployeeByid = async function getDeptEmployeeByid(id) {
    const queryText = {text:'SELECT * from Employees,departments,Dept_emp WHERE Employees.emp_no=Dept_emp.emp_no AND Departments.dept_no=Dept_emp.dept_no AND Employees.emp_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
   
  };
  
  async function ExecuteQuery(pool,query)
  {
    res =await pool.query(query);
    return res;
  }
  DeptEmployee.prototype.addDeptEmployee = async function addDeptEmployee(values) {
    try {
    const queryText = {text:'INSERT INTO Dept_emp(dept_no,emp_no,from_date,to_date) VALUES($1,$2,$3,$4) RETURNING *',values: values};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  
  
  module.exports = DeptEmployee;