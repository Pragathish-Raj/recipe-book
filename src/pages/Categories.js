import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data.data);
      } catch (err) {
        setError("Failed to fetch categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-xl">Loading categories...</div>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/categories/${category}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 capitalize">
                {category}
              </h3>
              <p className="text-gray-600">Browse {category} recipes</p>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No categories found. Add some recipes first!
        </div>
      )}
    </div>
  );
};

export default Categories;
