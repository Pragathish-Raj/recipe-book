import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRecipe.css";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "indian",
    cuisine: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "easy",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [{ step: 1, description: "" }],
    tags: [],
    nutritionalInfo: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
    author: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index].description = value;
    setFormData((prev) => ({ ...prev, instructions: updatedInstructions }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step: prev.instructions.length + 1, description: "" },
      ],
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index),
      }));
    }
  };

  // FIXED: Improved handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.cuisine) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Prepare data for submission
      const submitData = new FormData();

      // Append simple fields
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("cuisine", formData.cuisine);
      submitData.append("prepTime", formData.prepTime.toString());
      submitData.append("cookTime", formData.cookTime.toString());
      submitData.append("servings", formData.servings.toString());
      submitData.append("difficulty", formData.difficulty);
      submitData.append("author", formData.author || "Anonymous");

      // Append arrays and objects as JSON strings
      submitData.append(
        "ingredients",
        JSON.stringify(
          formData.ingredients.filter((ing) => ing.name && ing.quantity)
        )
      );
      submitData.append(
        "instructions",
        JSON.stringify(formData.instructions.filter((inst) => inst.description))
      );
      submitData.append("tags", JSON.stringify(formData.tags));
      submitData.append(
        "nutritionalInfo",
        JSON.stringify(formData.nutritionalInfo)
      );

      // Append image if exists
      if (image) {
        submitData.append("image", image);
      }

      console.log("Submitting recipe data...");

      const response = await axios.post(
        "http://localhost:5000/api/recipes",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("Recipe added successfully:", response.data);
      alert("Recipe added successfully!");
      navigate("/recipes");
    } catch (error) {
      console.error("Error adding recipe:", error);

      // Enhanced error logging
      if (error.response) {
        // Server responded with error status
        console.error("Server error response:", error.response.data);
        console.error("Status code:", error.response.status);
        alert(
          `Error: ${error.response.data.message || "Failed to add recipe"}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert(
          "Network error: Could not connect to server. Please check if the server is running."
        );
      } else {
        // Something else happened
        console.error("Error:", error.message);
        alert("Error adding recipe. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add input validation for numbers
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Math.max(0, parseInt(value) || 0),
    }));
  };

  return (
    <div className="add-recipe">
      <center>
        <h1>Add New Recipe</h1>
      </center>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Recipe Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                minLength="2"
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="thai">Thai</option>
                <option value="american">American</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="japanese">Japanese</option>
                <option value="french">French</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cuisine *</label>
              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleInputChange}
                required
                minLength="2"
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Optional"
              />
            </div>

            <div className="form-group">
              <label>Preparation Time (minutes) *</label>
              <input
                type="number"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleNumberChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Cooking Time (minutes) *</label>
              <input
                type="number"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleNumberChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Servings *</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleNumberChange}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Difficulty *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
                minLength="10"
              />
            </div>

            <div className="form-group">
              <label>Recipe Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Ingredients</h2>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder="Ingredient name *"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Quantity *"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Unit (g, ml, tsp, etc.)"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-btn"
                disabled={formData.ingredients.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-btn">
            Add Another Ingredient
          </button>
        </div>

        <div className="form-section">
          <h2>Instructions</h2>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="instruction-row">
              <span className="step-number">Step {index + 1}</span>
              <textarea
                value={instruction.description}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder="Describe this step... *"
                required
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="remove-btn"
                disabled={formData.instructions.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addInstruction} className="add-btn">
            Add Another Step
          </button>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding Recipe..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
