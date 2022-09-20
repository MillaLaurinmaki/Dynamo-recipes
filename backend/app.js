const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const {
  createRecipes,
  readRecipes,
  readRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./database");

app.use(cors());
app.use(express.json());

app.get("/recipes", async (req, res) => {
  res.json(await readRecipes());
});

app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  res.json(await readRecipe(id));
});

app.post("/recipes", async (req, res) => {
  res.json(await createRecipes(req.body));
});

//---
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
