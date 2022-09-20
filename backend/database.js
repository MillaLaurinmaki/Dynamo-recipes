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

async function readRecipes() {
  const res = await pool.query(`SELECT * FROM recipes;`);
  console.log(res.rows);
}

async function readRecipe(id) {
  const res = await pool.query(`SELECT * FROM recipes WHERE id = $1;`, [id]);
  console.log(res.rows[0]);
}
async function updateRecipe(id) {
  const res = await pool.query(`SELECT * FROM recipes;`);
  console.log(res.rows);
}
async function createRecipes(
  author,
  date,
  header,
  recipe,
  imgurl,
  favourite,
) {
  await pool.query(
    `INSERT INTO recipes(id, author, date, header, recipe, imgurl, favourite) VALUES ($1, $2, $3, $4, $5, $6);`[ 
      author,
      date,
      header,
      recipe,
      imgurl,
      favourite, ]
  );
  return;
}

async function deleteRecipe(id) {
await pool.query(`DELETE FROM recipes WHERE id = $1;` [id]);
return (res.rows);
}


async function main() {
  console.log(await readRecipes());
  // await deleteRecipe();
  // await updateRecipe()
  await createRecipes();
  // await readRecipe()
}
main();

module.exports{
  readRecipes,
  readRecipe,
  createRecipes, 
  updateRecipe,
  deleteRecipe,
}