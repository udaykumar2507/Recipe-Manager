import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    steps: "",
    prepTime: "",
    cookTime: "",
    category: "",
    imageUrl: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/recipes", form, {
      headers: { Authorization: `${token}` },  
    });
    toast.success("Recipe added successfully!");
    setForm({
      name: "",
      ingredients: "",
      steps: "",
      prepTime: "",
      cookTime: "",
      category: "",
      imageUrl: "",
    });
  } catch (err) {
    toast.error("Failed to add recipe");
  }
};

  const handleNavigateToRecipeList = () => {
    navigate("/recipes");
  };

  return (
    <div className="container recipe-form-container">
      <h1>Add a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Recipe name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          placeholder="e.g., Sugar, Flour, Eggs"
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value.split(",").map(ingredient => ingredient.trim()) })}
          required
        />
        <label>Steps:</label>
        <textarea
          placeholder="Describe the steps"
          value={form.steps}
          onChange={(e) => setForm({ ...form, steps: e.target.value })}
          required
        />
        <label>Preparation Time (mins):</label>
        <input
          type="number"
          placeholder="Preparation time in minutes"
          value={form.prepTime}
          onChange={(e) => setForm({ ...form, prepTime: e.target.value })}
          required
        />
        <label>Cook Time (mins):</label>
        <input
          type="number"
          placeholder="Cook time in minutes"
          value={form.cookTime}
          onChange={(e) => setForm({ ...form, cookTime: e.target.value })}
          required
        />
        <label>Category:</label>
        <input
          type="text"
          placeholder="e.g., Dessert, Main Course"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <button type="submit">Add Recipe</button>
      </form>

      
    </div>
  );
};

export default RecipeForm;
