const { Pool } = require('pg')
pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
module.exports = {
  query: (query) => pool.query(query)
}