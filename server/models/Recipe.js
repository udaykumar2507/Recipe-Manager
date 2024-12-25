const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: String, required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  category: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Recipes', RecipeSchema);