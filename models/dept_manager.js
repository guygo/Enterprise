const { Pool } = require('pg');

function Dept_Manager() {
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
  }
  
  Dept_Manager.prototype.getDeptManager = async function getDeptManager() {
    const queryText = {text:'SELECT * from Employees,departments,dept_manager WHERE Employees.emp_no=Dept_Manager.emp_no AND Departments.dept_no=Dept_Manager.dept_no'};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  Dept_Manager.prototype.getDeptManagerByid = async function getDeptManagerByid(id) {
    const queryText = {text:'SELECT * from Employees,departments,dept_manager WHERE Employees.emp_no=Dept_Manager.emp_no AND Departments.dept_no=Dept_Manager.dept_no AND Employees.emp_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
   
  };
  
  async function ExecuteQuery(pool,query)
  {
    res =await pool.query(query);
    return res;
  }
  Dept_Manager.prototype.addManager = async function addManager(values) {
    try {
    const queryText = {text:'INSERT INTO Dept_Manager(dept_no,emp_no,from_date,to_date) VALUES($1,$2,$3,$4) RETURNING *',values: values};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  
  
  module.exports = Dept_Manager;