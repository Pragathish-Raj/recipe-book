import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { recipeAPI, categoryAPI } from "../utils/api";
import "../styles/Home.css";
import noImage from "../assets/no-image.png";

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [recipesRes, categoriesRes] = await Promise.all([
        recipeAPI.getAll({ limit: 6 }),
        categoryAPI.getAll(),
      ]);

      console.log("Recipes API Response:", recipesRes.data);
      console.log("Categories API Response:", categoriesRes.data);

      // Handle recipes data - check different possible response structures
      let recipesData = [];
      if (recipesRes.data.recipes) {
        recipesData = recipesRes.data.recipes;
      } else if (recipesRes.data.data) {
        recipesData = recipesRes.data.data;
      } else if (Array.isArray(recipesRes.data)) {
        recipesData = recipesRes.data;
      }

      // Handle categories data - check different possible response structures
      let categoriesData = [];
      if (categoriesRes.data.categories) {
        categoriesData = categoriesRes.data.categories;
      } else if (categoriesRes.data.data) {
        categoriesData = categoriesRes.data.data;
      } else if (Array.isArray(categoriesRes.data)) {
        categoriesData = categoriesRes.data;
      }

      setFeaturedRecipes(recipesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching home data:", error);
      setError(
        "Failed to load data. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading delicious recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to RecipeBook</h1>
          <p>
            Discover amazing recipes from around the world. Cook like a
            professional chef with our easy-to-follow recipes.
          </p>
          <div className="hero-buttons">
            <Link to="/recipes" className="btn btn-primary">
              Explore Recipes
            </Link>
            <Link to="/add-recipe" className="btn btn-secondary">
              Share Your Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Recipe Categories</h2>
          <p className="section-subtitle">Browse recipes by category</p>
          <div className="categories-grid">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category, index) => (
                <Link
                  key={category._id || category.name || `category-${index}`}
                  to={`/categories/${category.name || category}`}
                  className="category-card"
                >
                  <div className="category-icon">
                    {getCategoryIcon(category.name || category)}
                  </div>
                  <h3>
                    {(category.name || category).charAt(0).toUpperCase() +
                      (category.name || category).slice(1)}
                  </h3>
                  <p>{category.recipeCount || 0} recipes</p>
                </Link>
              ))
            ) : (
              <div className="no-categories">
                <p>
                  No categories found. Please check if categories are
                  initialized.
                </p>
                <Link to="/add-recipe" className="btn btn-primary">
                  Add First Recipe
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="featured-recipes">
        <div className="container">
          <h2>Featured Recipes</h2>
          <p className="section-subtitle">Try these popular recipes</p>
          <div className="recipes-grid">
            {Array.isArray(featuredRecipes) && featuredRecipes.length > 0 ? (
              featuredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id || `recipe-${recipe.title}`}
                  recipe={recipe}
                />
              ))
            ) : (
              <div className="no-recipes">
                <p>No recipes yet. Be the first to add one!</p>
                <Link to="/add-recipe" className="btn btn-primary">
                  Add First Recipe
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Recipe Card Component
const RecipeCard = ({ recipe }) => {
  // Safe image URL handling
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return noImage;
    }
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    // For local images
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  // Safe description handling
  const getDescription = (desc) => {
    if (!desc) return "No description available";
    return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
  };

  // Safe time calculation
  const getTotalTime = () => {
    const prepTime = recipe.prepTime || 0;
    const cookTime = recipe.cookTime || 0;
    return prepTime + cookTime;
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img
          src={getImageUrl(recipe.image)}
          alt={recipe.title || "Recipe"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImage;
          }}
        />
        <div className="recipe-overlay">
          <span className="category-tag">
            {recipe.category
              ? recipe.category.charAt(0).toUpperCase() +
                recipe.category.slice(1)
              : "Uncategorized"}
          </span>
        </div>
      </div>
      <div className="recipe-info">
        <h3>{recipe.title || "Untitled Recipe"}</h3>
        <p className="recipe-description">
          {getDescription(recipe.description)}
        </p>
        <div className="recipe-meta">
          <span>⏱️ {getTotalTime()} mins</span>
          <span>👥 {recipe.servings || 0} servings</span>
          <span className={`difficulty ${recipe.difficulty || "easy"}`}>
            {recipe.difficulty
              ? recipe.difficulty.charAt(0).toUpperCase() +
                recipe.difficulty.slice(1)
              : "Easy"}
          </span>
        </div>
        <div className="recipe-actions">
          <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper function for category icons
const getCategoryIcon = (category) => {
  const icons = {
    indian: "🍛",
    chinese: "🥡",
    italian: "🍝",
    mexican: "🌮",
    thai: "🍜",
    american: "🍔",
    mediterranean: "🥗",
    japanese: "🍣",
    french: "🥐",
    vegetarian: "🥦",
    other: "🍽️",
  };

  if (typeof category === "string") {
    return icons[category.toLowerCase()] || "🍽️";
  }
  return "🍽️";
};

export default Home;
