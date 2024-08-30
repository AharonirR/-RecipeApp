const db = require('../models');

// פונקציה להוספת פריט לרשימת הקניות
const addItem = async (req, res) => {
  const { userId, itemName } = req.body;

  const query = `
    INSERT INTO shopping_lists (user_id, item_name)
    VALUES ($1, $2) RETURNING *;
  `;

  try {
    const result = await db.query(query, [userId, itemName]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

// פונקציה לקבלת רשימת הקניות של המשתמש
const getShoppingList = async (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT * FROM shopping_lists WHERE user_id = $1;
  `;

  try {
    const result = await db.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    res.status(500).json({ error: 'Failed to fetch shopping list' });
  }
};

// פונקציה לעדכון סטטוס של פריט ברשימת הקניות
const updateItemStatus = async (req, res) => {
  const { id } = req.params;
  const { isPurchased } = req.body;

  const query = `
    UPDATE shopping_lists
    SET is_purchased = $1
    WHERE id = $2 RETURNING *;
  `;

  try {
    const result = await db.query(query, [isPurchased, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating item status:', error);
    res.status(500).json({ error: 'Failed to update item status' });
  }
};

// פונקציה להסרת פריט מרשימת הקניות
const removeItem = async (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM shopping_lists WHERE id = $1 RETURNING *;
  `;

  try {
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

module.exports = { addItem, getShoppingList, updateItemStatus, removeItem };
