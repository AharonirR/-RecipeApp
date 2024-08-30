const express = require('express');
const router = express.Router();
const { uploadRecipe } = require('../controllers/RecipesUploadController');

// נתיב להעלאת מתכון אישי
router.post('/', uploadRecipe);

module.exports = router;
