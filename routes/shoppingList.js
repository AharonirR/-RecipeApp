const express = require('express');
const router = express.Router();
const {
  addItem,
  getShoppingList,
  updateItemStatus,
  removeItem
} = require('../controllers/shoppingListController');

// הוספת פריט לרשימת הקניות
router.post('/', addItem);

// קבלת רשימת הקניות של המשתמש
router.get('/', getShoppingList);

// עדכון סטטוס של פריט ברשימת הקניות
router.put('/:id', updateItemStatus);

// הסרת פריט מרשימת הקניות
router.delete('/:id', removeItem);

module.exports = router;
