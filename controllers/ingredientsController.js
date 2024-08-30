const db = require('../models');

// פונקציה להוספת רכיב חדש
const addIngredient = async (req, res) => {
  const { name, userId } = req.body;

  // בדיקה אם הרכיב כבר קיים
  const existingIngredientQuery = 'SELECT * FROM ingredients WHERE name = $1';
  const existingIngredient = await db.query(existingIngredientQuery, [name]);

  if (existingIngredient.rows.length > 0) {
    return res.status(400).json({ error: 'Ingredient already exists' });
  }

  // הוספת הרכיב החדש לבסיס הנתונים
  const query = `
    INSERT INTO ingredients (name, created_by)
    VALUES ($1, $2) RETURNING *;
  `;

  try {
    const result = await db.query(query, [name, userId]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding ingredient:', error);
    res.status(500).json({ error: 'Failed to add ingredient' });
  }
};

module.exports = { addIngredient };
