const { Pool } = require('pg');

function Department() {
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
  }
  
  Department.prototype.getDepartments = async function getDepartments() {
    const queryText = {text:'SELECT * from departments'};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  Department.prototype.getDepartmentByName = async function getDepartmentByName(name) {
    const queryText = {text:'SELECT * from departments WHERE dept_name=$1',values:name};
    return await ExecuteQuery(this.pool,queryText);
   
  };
  Department.prototype.getDepartmentById = async function getDepartmentById(id) {
    const queryText = {text:'SELECT * from departments WHERE dept_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  async function ExecuteQuery(pool,query)
  {
    res =await pool.query(query);
    return res;
  }
  Department.prototype.addDepartment = async function addDepartment(values) {
    try {
    const queryText = {text:'INSERT INTO Departments(dept_name) VALUES($1) RETURNING *',values: values};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  Department.prototype.deleteDepartment = async function deleteDepartment(id) {
    try {
    const queryText = {text:'DELETE FROM Departments WHERE dept_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  
  module.exports = Department;