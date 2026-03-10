const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get("/", async (req, res) => {
  try {
    const categories = await Recipe.distinct("category");

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// @desc    Get recipes by category
// @route   GET /api/categories/:category
// @access  Public
router.get("/:category", async (req, res) => {
  try {
    const recipes = await Recipe.find({
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
