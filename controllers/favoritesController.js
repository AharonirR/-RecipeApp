const db = require('../models');

// פונקציה להוספת מתכון לרשימת המועדפים
const addFavorite = async (req, res) => {
  const { userId, recipeId } = req.body;

  const query = `
    INSERT INTO favorites (user_id, recipe_id)
    VALUES ($1, $2) RETURNING *;
  `;

  try {
    const result = await db.query(query, [userId, recipeId]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

// פונקציה לקבלת רשימת המועדפים של המשתמש
const getFavorites = async (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT recipes.* FROM recipes
    JOIN favorites ON recipes.id = favorites.recipe_id
    WHERE favorites.user_id = $1;
  `;

  try {
    const result = await db.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

// פונקציה להסרת מתכון מרשימת המועדפים
const removeFavorite = async (req, res) => {
  const { userId } = req.query;
  const { recipeId } = req.params;

  const query = `
    DELETE FROM favorites
    WHERE user_id = $1 AND recipe_id = $2 RETURNING *;
  `;

  try {
    const result = await db.query(query, [userId, recipeId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
