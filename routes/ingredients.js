const express = require('express');
const router = express.Router();
const { addIngredient } = require('../controllers/ingredientsController');

// נתיב להעלאת רכיב חדש
router.post('/', addIngredient);

module.exports = router;
