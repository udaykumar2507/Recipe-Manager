const express = require('express');
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Add Recipe
router.post('/', authMiddleware, async (req, res) => {
  const { name, ingredients, steps, prepTime, cookTime, category, isFavorite, imageUrl } = req.body;

  try {
    const newRecipe = new Recipe({
      userId: req.user.id,
      name,
      ingredients,
      steps,
      prepTime,
      cookTime,
      category,
      isFavorite,
      imageUrl,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Recipes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit Recipe
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Recipe
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json('Recipe deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
