const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

const initializeDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/recipe-book"
    );
    console.log("Connected to MongoDB");

    const defaultCategories = [
      { name: "indian", description: "Traditional Indian cuisine" },
      { name: "chinese", description: "Authentic Chinese dishes" },
      { name: "italian", description: "Classic Italian recipes" },
      { name: "mexican", description: "Spicy Mexican food" },
      { name: "thai", description: "Flavorful Thai cuisine" },
      { name: "american", description: "American comfort food" },
      { name: "mediterranean", description: "Healthy Mediterranean dishes" },
      { name: "japanese", description: "Traditional Japanese cuisine" },
      { name: "french", description: "Elegant French cooking" },
      { name: "other", description: "Other international cuisines" },
    ];

    for (const categoryData of defaultCategories) {
      await Category.findOneAndUpdate(
        { name: categoryData.name },
        categoryData,
        { upsert: true, new: true }
      );
      console.log(`✅ Category "${categoryData.name}" initialized`);
    }

    console.log("🎉 All default categories initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
};

initializeDatabase();
