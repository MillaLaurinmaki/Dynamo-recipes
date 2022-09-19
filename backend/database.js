const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});

async function readRecipes(recipes) {
  const res = await pool.query(`SELECT * FROM recipes WHERE`);
  return res.rows;
}
