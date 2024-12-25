import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/recipes", {
          headers: { Authorization: `${token}` },
        });
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        toast.error("Failed to fetch recipes");
      } finally {
        setLoading(false); // Turn off loading when the request finishes
      }
    };
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/recipes/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      toast.success("Recipe deleted successfully!");
    } catch (err) {
      console.error("Error deleting recipe:", err);
      toast.error("Failed to delete recipe");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Or a spinner
  }

  return (
    <div className="recipe-list-page">
      <h1>Your Recipes</h1>
      <div className="recipe-list-page__list">
        {recipes.length === 0 ? (
          <p>You haven't added any recipes yet.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-list-page__card">
              <img src={recipe.imageUrl} alt={recipe.name} className="recipe-list-page__image" />
              <div className="recipe-list-page__info">
                <h3>{recipe.name}</h3>
                <p><strong>Category:</strong> {recipe.category}</p>
                <p><strong>Ingredients:</strong> {recipe.ingredients} mins</p>
                <p><strong>Cooking Time:</strong> {recipe.cookTime} mins</p>
                <button onClick={() => deleteRecipe(recipe._id)} className="recipe-list-page__delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;
