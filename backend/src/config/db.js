const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smart_learning",
  password: "sagor",
  port: 5432,
});

module.exports = pool;