const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Recipe = require("./models/Recipe"); // Add this line

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/recipebook",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  // Check if database is empty and add sample data
  try {
    const recipeCount = await Recipe.countDocuments();
    console.log(`Current recipes in database: ${recipeCount}`);

    if (recipeCount === 0) {
      console.log("Database is empty. Adding sample recipes...");
      await addSampleRecipes();
    }
  } catch (error) {
    console.error("Error checking database:", error);
  }
});

// Function to add sample recipes
const addSampleRecipes = async () => {
  try {
    const sampleRecipes = [
      {
        title: "Butter Chicken",
        description:
          "Creamy and delicious Indian butter chicken with aromatic spices",
        category: "indian",
        cuisine: "Indian",
        prepTime: 20,
        cookTime: 40,
        servings: 4,
        difficulty: "medium",
        ingredients: [
          { name: "Chicken breast", quantity: "500", unit: "grams" },
          { name: "Butter", quantity: "4", unit: "tablespoons" },
          { name: "Heavy cream", quantity: "1", unit: "cup" },
          { name: "Tomato puree", quantity: "2", unit: "cups" },
          { name: "Garam masala", quantity: "2", unit: "teaspoons" },
          { name: "Garlic", quantity: "4", unit: "cloves" },
          { name: "Ginger", quantity: "1", unit: "tablespoon" },
        ],
        instructions: [
          {
            step: 1,
            description:
              "Marinate chicken with yogurt and spices for 30 minutes",
          },
          {
            step: 2,
            description: "Heat butter in a pan and sauté garlic and ginger",
          },
          { step: 3, description: "Add tomato puree and cook for 10 minutes" },
          {
            step: 4,
            description: "Add marinated chicken and cook for 15 minutes",
          },
          { step: 5, description: "Stir in cream and simmer for 5 minutes" },
          {
            step: 6,
            description: "Garnish with fresh cilantro and serve with naan",
          },
        ],
        image:
          "https://images.pexels.com/photos/29685054/pexels-photo-29685054/free-photo-of-delicious-indian-butter-chicken-in-copper-pan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        tags: ["indian", "chicken", "creamy", "spicy"],
        author: "Chef Sharma",
      },
      {
        title: "Palak Paneer",
        description: "Creamy spinach curry with soft paneer cheese",
        category: "vegetarian",
        cuisine: "Indian",
        prepTime: 15,
        cookTime: 25,
        servings: 4,
        difficulty: "easy",
        ingredients: [
          { name: "Paneer", quantity: "400", unit: "grams" },
          { name: "Fresh spinach", quantity: "500", unit: "grams" },
          { name: "Onion", quantity: "1", unit: "large" },
          { name: "Tomatoes", quantity: "2", unit: "medium" },
          { name: "Ginger-garlic paste", quantity: "1", unit: "tablespoon" },
          { name: "Green chilies", quantity: "2", unit: "pieces" },
          { name: "Heavy cream", quantity: "1/4", unit: "cup" },
          { name: "Garam masala", quantity: "1", unit: "teaspoon" },
        ],
        instructions: [
          {
            step: 1,
            description:
              "Blanch spinach in hot water for 2 minutes, then blend into puree",
          },
          {
            step: 2,
            description: "Heat oil and sauté cumin seeds until fragrant",
          },
          {
            step: 3,
            description: "Add chopped onions and cook until golden brown",
          },
          {
            step: 4,
            description:
              "Add ginger-garlic paste and green chilies, cook for 1 minute",
          },
          { step: 5, description: "Add chopped tomatoes and cook until soft" },
          {
            step: 6,
            description: "Add spinach puree and cook for 5-7 minutes",
          },
          {
            step: 7,
            description:
              "Add paneer cubes, garam masala, and simmer for 5 minutes",
          },
          { step: 8, description: "Finish with heavy cream and serve hot" },
        ],
        image:
          "https://images.pexels.com/photos/10345736/pexels-photo-10345736.jpeg?_gl=1*zrd985*_ga*OTI2MTA4MzU0LjE3NDQwMDAxMTM.*_ga_8JE65Q40S6*czE3NTk4MzY4ODIkbzE2JGcxJHQxNzU5ODM3NzA0JGozMCRsMCRoMA..",
        tags: ["vegetarian", "spinach", "paneer", "healthy"],
        author: "Chef Patel",
      },
      {
        title: "Chole Bhature",
        description: "Spicy chickpea curry with fluffy fried bread",
        category: "indian",
        cuisine: "Indian",
        prepTime: 30,
        cookTime: 40,
        servings: 4,
        difficulty: "medium",
        ingredients: [
          { name: "Chickpeas", quantity: "2", unit: "cups" },
          { name: "All-purpose flour", quantity: "3", unit: "cups" },
          { name: "Onions", quantity: "2", unit: "large" },
          { name: "Tomatoes", quantity: "3", unit: "medium" },
          { name: "Ginger", quantity: "1", unit: "inch" },
          { name: "Garlic", quantity: "6", unit: "cloves" },
          { name: "Chole masala", quantity: "2", unit: "tablespoons" },
          { name: "Yogurt", quantity: "1/2", unit: "cup" },
        ],
        instructions: [
          {
            step: 1,
            description:
              "Soak chickpeas overnight and pressure cook until soft",
          },
          {
            step: 2,
            description: "Prepare dough for bhature with flour and yogurt",
          },
          {
            step: 3,
            description: "Sauté onions, ginger, and garlic until golden brown",
          },
          {
            step: 4,
            description: "Add tomatoes and spices, cook until oil separates",
          },
          {
            step: 5,
            description: "Add cooked chickpeas and simmer for 15 minutes",
          },
          {
            step: 6,
            description: "Roll bhature and deep fry until puffed and golden",
          },
          {
            step: 7,
            description: "Garnish chole with fresh coriander and serve hot",
          },
        ],
        image:
          "https://t3.ftcdn.net/jpg/16/45/73/24/240_F_1645732460_9OYHQIkaQWjF9ZBVKvOizzjJS9zJhgQ8.jpg",
        tags: ["indian", "vegetarian", "spicy", "streetfood"],
        author: "Chef Sharma",
      },
      {
        title: "Chicken Biryani",
        description: "Fragrant rice dish layered with spiced chicken and herbs",
        category: "indian",
        cuisine: "Indian",
        prepTime: 45,
        cookTime: 60,
        servings: 6,
        difficulty: "hard",
        ingredients: [
          { name: "Basmati rice", quantity: "3", unit: "cups" },
          { name: "Chicken", quantity: "1", unit: "kg" },
          { name: "Onions", quantity: "4", unit: "large" },
          { name: "Yogurt", quantity: "1", unit: "cup" },
          { name: "Biryani masala", quantity: "3", unit: "tablespoons" },
          { name: "Saffron", quantity: "1", unit: "pinch" },
          { name: "Mint leaves", quantity: "1", unit: "cup" },
          { name: "Ghee", quantity: "4", unit: "tablespoons" },
        ],
        instructions: [
          {
            step: 1,
            description: "Wash and soak basmati rice for 30 minutes",
          },
          {
            step: 2,
            description: "Marinate chicken with yogurt and spices for 2 hours",
          },
          {
            step: 3,
            description: "Thinly slice and fry onions until golden brown",
          },
          {
            step: 4,
            description: "Partially cook rice with whole spices",
          },
          {
            step: 5,
            description: "Layer rice and chicken in heavy-bottomed pot",
          },
          {
            step: 6,
            description:
              "Add saffron milk, fried onions, and ghee between layers",
          },
          {
            step: 7,
            description: "Cook on low heat (dum) for 25 minutes",
          },
          {
            step: 8,
            description: "Let it rest for 10 minutes before serving with raita",
          },
        ],
        image:
          "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg",
        tags: ["biryani", "chicken", "fragrant", "festive"],
        author: "Chef Khan",
      },
      {
        title: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato filling",
        category: "south indian",
        cuisine: "Indian",
        prepTime: 8,
        cookTime: 15,
        servings: 4,
        difficulty: "medium",
        ingredients: [
          { name: "Rice", quantity: "2", unit: "cups" },
          { name: "Urad dal", quantity: "1/2", unit: "cup" },
          { name: "Potatoes", quantity: "4", unit: "medium" },
          { name: "Onions", quantity: "2", unit: "large" },
          { name: "Mustard seeds", quantity: "1", unit: "teaspoon" },
          { name: "Curry leaves", quantity: "10", unit: "leaves" },
          { name: "Turmeric powder", quantity: "1/2", unit: "teaspoon" },
          { name: "Oil", quantity: "3", unit: "tablespoons" },
        ],
        instructions: [
          {
            step: 1,
            description:
              "Soak rice and dal for 6 hours, grind to smooth batter",
          },
          {
            step: 2,
            description: "Ferment batter overnight until fluffy",
          },
          {
            step: 3,
            description: "Boil and mash potatoes for the filling",
          },
          {
            step: 4,
            description: "Temper mustard seeds and curry leaves in oil",
          },
          {
            step: 5,
            description: "Add onions and spices, then mix with mashed potatoes",
          },
          {
            step: 6,
            description: "Spread batter on hot tawa to make thin dosa",
          },
          {
            step: 7,
            description: "Place potato filling and fold dosa",
          },
          {
            step: 8,
            description: "Serve hot with coconut chutney and sambar",
          },
        ],
        image:
          "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
        tags: ["dosa", "south indian", "breakfast", "vegetarian"],
        author: "Chef Iyer",
      },
      {
        _id: {
          $oid: "68e51745d8b101685d900294",
        },
        title: "Margherita Pizza",
        description:
          "Classic Italian pizza with fresh tomatoes, mozzarella, and basil",
        category: "italian",
        cuisine: "Italian",
        prepTime: 20,
        cookTime: 15,
        servings: 2,
        difficulty: "medium",
        ingredients: [
          {
            name: "Pizza dough",
            quantity: "1",
            unit: "ball",
            _id: {
              $oid: "68e51745d8b101685d900295",
            },
          },
          {
            name: "San Marzano tomatoes",
            quantity: "400",
            unit: "grams",
            _id: {
              $oid: "68e51745d8b101685d900296",
            },
          },
          {
            name: "Fresh mozzarella",
            quantity: "200",
            unit: "grams",
            _id: {
              $oid: "68e51745d8b101685d900297",
            },
          },
          {
            name: "Fresh basil",
            quantity: "10",
            unit: "leaves",
            _id: {
              $oid: "68e51745d8b101685d900298",
            },
          },
          {
            name: "Extra virgin olive oil",
            quantity: "2",
            unit: "tablespoons",
            _id: {
              $oid: "68e51745d8b101685d900299",
            },
          },
          {
            name: "Salt",
            quantity: "1",
            unit: "teaspoon",
            _id: {
              $oid: "68e51745d8b101685d90029a",
            },
          },
        ],
        instructions: [
          {
            step: 1,
            description: "Preheat pizza stone in oven at 250°C for 30 minutes",
            _id: {
              $oid: "68e51745d8b101685d90029b",
            },
          },
          {
            step: 2,
            description: "Roll out pizza dough into thin circle",
            _id: {
              $oid: "68e51745d8b101685d90029c",
            },
          },
          {
            step: 3,
            description: "Crush tomatoes and spread over dough as sauce",
            _id: {
              $oid: "68e51745d8b101685d90029d",
            },
          },
          {
            step: 4,
            description: "Tear mozzarella and distribute evenly",
            _id: {
              $oid: "68e51745d8b101685d90029e",
            },
          },
          {
            step: 5,
            description: "Bake for 12-15 minutes until crust is golden",
            _id: {
              $oid: "68e51745d8b101685d90029f",
            },
          },
          {
            step: 6,
            description: "Add fresh basil leaves and drizzle with olive oil",
            _id: {
              $oid: "68e51745d8b101685d9002a0",
            },
          },
        ],
        image:
          "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg",
        tags: ["pizza", "italian", "vegetarian", "classic"],
        author: "Chef Giovanni",
        createdAt: {
          $date: "2025-10-07T10:20:00.000Z",
        },
        updatedAt: {
          $date: "2025-10-07T10:20:00.000Z",
        },
        __v: 0,
      },
      {
        _id: {
          $oid: "68e51812d8b101685d9002a1",
        },
        title: "Chicken Teriyaki",
        description:
          "Grilled chicken glazed with sweet and savory teriyaki sauce",
        category: "japanese",
        cuisine: "Japanese",
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: "easy",
        ingredients: [
          {
            name: "Chicken thighs",
            quantity: "600",
            unit: "grams",
            _id: {
              $oid: "68e51812d8b101685d9002a2",
            },
          },
          {
            name: "Soy sauce",
            quantity: "1/2",
            unit: "cup",
            _id: {
              $oid: "68e51812d8b101685d9002a3",
            },
          },
          {
            name: "Mirin",
            quantity: "1/4",
            unit: "cup",
            _id: {
              $oid: "68e51812d8b101685d9002a4",
            },
          },
          {
            name: "Sugar",
            quantity: "2",
            unit: "tablespoons",
            _id: {
              $oid: "68e51812d8b101685d9002a5",
            },
          },
          {
            name: "Ginger",
            quantity: "1",
            unit: "tablespoon",
            _id: {
              $oid: "68e51812d8b101685d9002a6",
            },
          },
          {
            name: "Garlic",
            quantity: "3",
            unit: "cloves",
            _id: {
              $oid: "68e51812d8b101685d9002a7",
            },
          },
          {
            name: "Sesame oil",
            quantity: "1",
            unit: "teaspoon",
            _id: {
              $oid: "68e51812d8b101685d9002a8",
            },
          },
        ],
        instructions: [
          {
            step: 1,
            description:
              "Mix soy sauce, mirin, sugar, ginger, and garlic for teriyaki sauce",
            _id: {
              $oid: "68e51812d8b101685d9002a9",
            },
          },
          {
            step: 2,
            description: "Pat chicken thighs dry and score the skin side",
            _id: {
              $oid: "68e51812d8b101685d9002aa",
            },
          },
          {
            step: 3,
            description:
              "Cook chicken skin-side down in pan until golden and crispy",
            _id: {
              $oid: "68e51812d8b101685d9002ab",
            },
          },
          {
            step: 4,
            description: "Flip chicken and pour teriyaki sauce into the pan",
            _id: {
              $oid: "68e51812d8b101685d9002ac",
            },
          },
          {
            step: 5,
            description: "Simmer until sauce thickens and glazes the chicken",
            _id: {
              $oid: "68e51812d8b101685d9002ad",
            },
          },
          {
            step: 6,
            description: "Garnish with sesame seeds and sliced green onions",
            _id: {
              $oid: "68e51812d8b101685d9002ae",
            },
          },
        ],
        image:
          "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
        tags: ["japanese", "chicken", "teriyaki", "sweet", "savory"],
        author: "Chef Tanaka",
        createdAt: {
          $date: "2025-10-07T10:25:00.000Z",
        },
        updatedAt: {
          $date: "2025-10-07T10:25:00.000Z",
        },
        __v: 0,
      },
      {
        _id: {
          $oid: "68e518c3d8b101685d9002af",
        },
        title: "Tacos al Pastor",
        description: "Mexican street tacos with marinated pork and pineapple",
        category: "mexican",
        cuisine: "Mexican",
        prepTime: 30,
        cookTime: 25,
        servings: 4,
        difficulty: "medium",
        ingredients: [
          {
            name: "Pork shoulder",
            quantity: "800",
            unit: "grams",
            _id: {
              $oid: "68e518c3d8b101685d9002b0",
            },
          },
          {
            name: "Achiote paste",
            quantity: "3",
            unit: "tablespoons",
            _id: {
              $oid: "68e518c3d8b101685d9002b1",
            },
          },
          {
            name: "Pineapple",
            quantity: "1",
            unit: "medium",
            _id: {
              $oid: "68e518c3d8b101685d9002b2",
            },
          },
          {
            name: "Corn tortillas",
            quantity: "12",
            unit: "pieces",
            _id: {
              $oid: "68e518c3d8b101685d9002b3",
            },
          },
          {
            name: "White onion",
            quantity: "1",
            unit: "large",
            _id: {
              $oid: "68e518c3d8b101685d9002b4",
            },
          },
          {
            name: "Cilantro",
            quantity: "1",
            unit: "bunch",
            _id: {
              $oid: "68e518c3d8b101685d9002b5",
            },
          },
          {
            name: "Lime",
            quantity: "2",
            unit: "pieces",
            _id: {
              $oid: "68e518c3d8b101685d9002b6",
            },
          },
        ],
        instructions: [
          {
            step: 1,
            description:
              "Marinate pork with achiote paste and spices for 4 hours",
            _id: {
              $oid: "68e518c3d8b101685d9002b7",
            },
          },
          {
            step: 2,
            description:
              "Grill or pan-fry pork until cooked through and slightly charred",
            _id: {
              $oid: "68e518c3d8b101685d9002b8",
            },
          },
          {
            step: 3,
            description: "Grill pineapple slices until caramelized",
            _id: {
              $oid: "68e518c3d8b101685d9002b9",
            },
          },
          {
            step: 4,
            description: "Warm corn tortillas on comal or skillet",
            _id: {
              $oid: "68e518c3d8b101685d9002ba",
            },
          },
          {
            step: 5,
            description: "Chop pork and pineapple into small pieces",
            _id: {
              $oid: "68e518c3d8b101685d9002bb",
            },
          },
          {
            step: 6,
            description:
              "Assemble tacos with pork, pineapple, onion, and cilantro",
            _id: {
              $oid: "68e518c3d8b101685d9002bc",
            },
          },
          {
            step: 7,
            description: "Serve with lime wedges and salsa",
            _id: {
              $oid: "68e518c3d8b101685d9002bd",
            },
          },
        ],
        image:
          "https://t4.ftcdn.net/jpg/16/53/29/51/240_F_1653295124_f2xj204ZOtgOG7mX7DG5HSmvAwgakRWE.jpg",
        tags: ["mexican", "tacos", "pork", "streetfood", "spicy"],
        author: "Chef Garcia",
        createdAt: {
          $date: "2025-10-07T10:30:00.000Z",
        },
        updatedAt: {
          $date: "2025-10-07T10:30:00.000Z",
        },
        __v: 0,
      },
    ];

    await Recipe.insertMany(sampleRecipes);
    console.log("Sample recipes added successfully!");

    // Verify addition
    const newCount = await Recipe.countDocuments();
    console.log(`Total recipes now: ${newCount}`);
  } catch (error) {
    console.error("Error adding sample recipes:", error);
  }
};

// Routes
app.use("/api/recipes", require("./routes/recipes"));

// Test route to check database status
app.get("/api/check-db", async (req, res) => {
  try {
    const recipeCount = await Recipe.countDocuments();
    const recipes = await Recipe.find().limit(5);

    res.json({
      status: "success",
      database: "connected",
      totalRecipes: recipeCount,
      sampleRecipes: recipes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Recipe Book API",
    checkDatabase: "Visit /api/check-db to see database status",
    allRecipes: "Visit /api/recipes to see all recipes",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Routes
app.use("/api/recipes", require("./routes/recipes"));
app.use("/api/categories", require("./routes/categories")); // Add this line

// Home route
app.get("/", (req, res) => {
  res.json({ 
    message: "Recipe Book API",
    availableEndpoints: {
      recipes: "/api/recipes",
      categories: "/api/categories",
      recipesByCategory: "/api/categories/:category"
    }
  });
});