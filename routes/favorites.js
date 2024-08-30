const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoritesController');

// הוספת מתכון למועדפים
router.post('/', addFavorite);

// קבלת רשימת המועדפים של המשתמש
router.get('/', getFavorites);

// הסרת מתכון מרשימת המועדפים
router.delete('/:recipeId', removeFavorite);

module.exports = router;
