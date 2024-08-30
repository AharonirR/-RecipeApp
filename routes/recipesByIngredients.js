const express = require('express');
const router = express.Router();
const { searchRecipesByIngredients } = require('../controllers/recipesByIngredientsController');

// נתיב לחיפוש מתכונים לפי רכיבים
router.get('/search-by-ingredients', searchRecipesByIngredients);

module.exports = router;
