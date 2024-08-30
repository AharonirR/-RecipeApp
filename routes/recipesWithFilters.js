const express = require('express');
const router = express.Router();
const { searchRecipesWithFilters } = require('../controllers/recipesWithFiltersController');

// נתיב לחיפוש מתכונים עם סינון מתקדם
router.get('/search-with-filters', searchRecipesWithFilters);

module.exports = router;
