const express = require('express');
const router = express.Router();
const { getRecipeById } = require('../controllers/recipesController');

// נתיב לקבלת מתכון לפי מזהה (ID)
router.get('/:id', getRecipeById);

module.exports = router;
