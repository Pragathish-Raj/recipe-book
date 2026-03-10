const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  unit: String,
});

const instructionSchema = new mongoose.Schema({
  step: Number,
  description: String,
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: String,
    cuisine: String,
    prepTime: Number,
    cookTime: Number,
    servings: Number,
    difficulty: String,
    ingredients: [ingredientSchema],
    instructions: [instructionSchema],
    image: String,
    tags: [String],
    author: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
