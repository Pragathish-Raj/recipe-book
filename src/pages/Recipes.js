import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Recipes.css";

const Recipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        let url = "http://localhost:5000/api/recipes";

        // If category is provided, filter by category
        if (category) {
          url = `http://localhost:5000/api/categories/${category}`;
        }

        const response = await axios.get(url);
        setRecipes(category ? response.data.data : response.data);
      } catch (err) {
        setError("Failed to fetch recipes");
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-xl">Loading recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="recipes-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`
            : "All Recipes"}
        </h1>

        {category && (
          <Link
            to="/recipes"
            className="inline-block mb-6 text-blue-600 hover:text-blue-800"
          >
            ← Back to all recipes
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe._id}
              to={`/recipes/${recipe._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow recipe-card"
            >
              <div className="recipe-image">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = require("../assets/no-image.png");
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <p className="text-gray-600 mb-2">{recipe.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                  <span className="capitalize">{recipe.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No recipes found{category ? ` in ${category} category` : ""}.
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
