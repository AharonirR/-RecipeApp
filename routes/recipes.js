const express = require('express');
const router = express.Router();
const { searchRecipesByIngredients } = require('../controllers/recipesController');

router.get('/search', searchRecipesByIngredients);

module.exports = router;
