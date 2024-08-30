const express = require('express');
const router = express.Router();
const { searchRecipesWithFilters } = require('../controllers/recipesController');

router.get('/search', searchRecipesWithFilters);

module.exports = router;
