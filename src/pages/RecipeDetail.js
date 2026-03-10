import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import noImage from "../assets/no-image.png";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Adjust the API endpoint based on your backend
        const response = await axios.get(
          `http://localhost:5000/api/recipes/${id}`
        );
        setRecipe(response.data);
      } catch (err) {
        setError("Failed to fetch recipe");
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-xl">Loading recipe...</div>
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

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-xl">Recipe not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          style={{
            height: 280,
            width: "100%",
            overflow: "hidden",
            background: "#f8f9fa",
          }}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noImage;
            }}
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {recipe.title}
          </h1>
          <p className="text-gray-600 mb-4 text-lg">{recipe.description}</p>

          {/* Recipe Meta Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="font-semibold text-lg">{recipe.prepTime} min</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="font-semibold text-lg">{recipe.cookTime} min</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Servings</p>
              <p className="font-semibold text-lg">{recipe.servings}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="font-semibold text-lg capitalize">
                {recipe.difficulty}
              </p>
            </div>
          </div>

          {/* Cuisine & Category */}
          <div className="flex gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-500">Cuisine: </span>
              <span className="font-semibold">{recipe.cuisine}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Category: </span>
              <span className="font-semibold capitalize">
                {recipe.category}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.tags &&
              recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Ingredients Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              Ingredients
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={ingredient._id?.$oid || index}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <span className="font-medium">
                        {ingredient.quantity} {ingredient.unit}
                      </span>{" "}
                      {ingredient.name}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions &&
                recipe.instructions.map((instruction) => (
                  <li
                    key={instruction._id?.$oid || instruction.step}
                    className="flex space-x-4 p-3 hover:bg-gray-50 rounded"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      {instruction.step}
                    </span>
                    <p className="text-gray-700 pt-1">
                      {instruction.description}
                    </p>
                  </li>
                ))}
            </ol>
          </div>

          {/* Author Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              <span className="font-semibold">Recipe by:</span> {recipe.author}
            </p>
            {recipe.createdAt && (
              <p className="text-sm text-gray-500 mt-1">
                Added on:{" "}
                {new Date(recipe.createdAt.$date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
