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
async function updateRecipe(id, recipes) {
  await pool.query(
    `UPDATE recipes SET author = $1, date = $2, header = $3, recipe = $4,
  imgurl = $5, favourite = $6 WHERE = $7`,
    [
      recipes.author,
      recipes.date,
      recipes.header,
      recipes.recipe,
      recipes.imgurl,
      recipes.favourite,
      recipes.id,
    ]
  );
}
async function createRecipes(recipes) {
  await pool.query(
    `INSERT INTO recipes(author, date, header, recipe, imgurl, favourite) VALUES ($1, $2, $3, $4, $5, $6);`,
    [
      recipes.author,
      recipes.date,
      recipes.header,
      recipes.recipe,
      recipes.imgurl,
      recipes.favourite,
    ]
  );
  return;
}

async function deleteRecipe(id) {
  await pool.query(`DELETE FROM recipes WHERE id = $1;`[id]);
  return res.rows;
}

async function main() {
  console.log(await readRecipes());
  // await deleteRecipe();
  // await updateRecipe()
  await createRecipes();
  // await readRecipe()
}
main();

module.exports = {
  readRecipes,
  readRecipe,
  createRecipes,
  updateRecipe,
  deleteRecipe,
};
