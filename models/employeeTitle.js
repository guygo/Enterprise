const { Pool } = require('pg');

function EmployTitle() {
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
  }
  
  EmployTitle.prototype.getEmployeesWithTitle = async function getEmployeesWithTitle() {
    const queryText = {text:'SELECT * from Employees INNER JOIN Titles on Employees.emp_no=Titles.emp_no'};
    return await ExecuteQuery(this.pool,queryText);
    
  };
  EmployTitle.prototype.getEmployTitleByid = async function getEmployTitleByid(id) {
    const queryText = {text:'SELECT * from Employees INNER JOIN Titles on Employees.emp_no=Titles.emp_no WHERE Employees.emp_no=$1',values:id};
    return await ExecuteQuery(this.pool,queryText);
   
  };
  
  async function ExecuteQuery(pool,query)
  {
    res =await pool.query(query);
    return res;
  }
  EmployTitle.prototype.addTitle = async function addTitle(values) {
    try {
    const queryText = {text:'INSERT INTO Titles(emp_no,title,from_date,to_date) VALUES($1,$2,$3,$4) RETURNING *',values: values};
    return await ExecuteQuery(this.pool,queryText);
    }
    catch (error) {
        console.error(`readFile failed: ${error}`);
    }
  };
  
  
  module.exports = EmployTitle;