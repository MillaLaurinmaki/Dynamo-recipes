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
  return res.rows;
}

async function readRecipe(id) {
  const res = await pool.query(`SELECT * FROM recipes WHERE id = $1;`, [id]);
  return res.rows[0];
}
async function updateRecipe(id, recipes) {
  await pool.query(
    `UPDATE recipes SET author = $1, date = $2, header = $3, recipe = $4,
  "imageUrl" = $5, "isFavorite" = $6 WHERE id = $7`,
    [
      recipes.author,
      recipes.date,
      recipes.header,
      recipes.recipe,
      recipes.imageUrl,
      recipes.isFavorite,
      id,
    ]
  );
}
async function createRecipes(recipes) {
  await pool.query(
    `INSERT INTO recipes(author, date, header, recipe, "imageUrl", "isFavorite") VALUES ($1, $2, $3, $4, $5, $6);`,
    [
      recipes.author,
      recipes.date,
      recipes.header,
      recipes.recipe,
      recipes.imageUrl,
      recipes.isFavorite,
    ]
  );
  return;
}

async function deleteRecipe(id) {
  await pool.query(`DELETE FROM recipes WHERE id = $1;`, [id]);
  return;
}

async function searchRecipes(search) {
  const res = await pool.query(
    "SELECT * FROM recipes WHERE recipes.header LIKE $1 OR recipes.header LIKE $2 OR recipes.header LIKE $3",
    [
      `%${search}%`,
      `%${search.charAt(0).toUpperCase() + search.slice(1)}%`,
      `%${search.toLowerCase()}%`,
    ]
  );
  return res.rows;
}

async function readFavoriteRecipes() {
  const res = await pool.query(
    `SELECT * FROM recipes WHERE "isFavorite" = true`
  );
  return res.rows;
}

// async function favoriteToggle(id) {
//   // console.log(recipes.isFavorite);
//   const res = await pool.query(
//     `SELECT "isFavorite" from recipes WHERE id = $1`,
//     [id]
//   );
//   const resValues = Object.values(res.rows[0]);
//   console.log(resValues[0]);
//   if (test[0] === false) {
//     await pool.query(`UPDATE recipes set "isFavorite" = true WHERE id = $1;`, [
//       id,
//     ]);
//     return;
//   } else {
//     await pool.query(`UPDATE recipes set "isFavorite" = false WHERE id = $1;`, [
//       id,
//     ]);
//     return;
//   }
// }

async function favoriteToggle(id, recipe) {
  // console.log(recipe.isFavorite);
  if (recipe.isFavorite === true) {
    await pool.query(`UPDATE recipes set "isFavorite" = true WHERE id = $1;`, [
      id,
    ]);
    return;
  } else {
    await pool.query(`UPDATE recipes set "isFavorite" = false WHERE id = $1;`, [
      id,
    ]);
    return;
  }
}

// async function main() {
//   console.log(await readRecipes());
//   // await deleteRecipe();
//   // await updateRecipe()
//   await createRecipes();
//   // await readRecipe()
// }
// main();

module.exports = {
  readRecipes,
  readRecipe,
  createRecipes,
  updateRecipe,
  deleteRecipe,
  favoriteToggle,
  searchRecipes,
  readFavoriteRecipes,
};
