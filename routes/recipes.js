const express = require('express');
const router = express.Router();
const { searchRecipesByIngredients, searchRecipesWithFilters } = require('../controllers/recipesController');

// נתיבים עבור חיפוש מתכונים
router.get('/search-by-ingredients', searchRecipesByIngredients); // חיפוש לפי רכיבים
router.get('/search-with-filters', searchRecipesWithFilters); // חיפוש עם סינון מתקדם

module.exports = router;
