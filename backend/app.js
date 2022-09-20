const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const {
  createRecipes,
  readRecipes,
  updateRecipes,
  deleteRecipes,
} = require("./database");

app.use(cors());
app.use(express.json());

//---
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
