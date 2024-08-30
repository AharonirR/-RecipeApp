const db = require('../models');

// פונקציה לחיפוש מתכונים עם סינון מתקדם
const searchRecipesWithFilters = async (req, res) => {
  const { ingredients, maxPrepTime, difficulty, cuisine } = req.query;

  let query = `
    SELECT * FROM recipes WHERE TRUE
  `;

  const queryParams = [];

  if (ingredients) {
    query += ` AND ingredients @> $${queryParams.length + 1}::text[]`;
    queryParams.push(ingredients);
  }

  if (maxPrepTime) {
    query += ` AND prep_time <= $${queryParams.length + 1}`;
    queryParams.push(maxPrepTime);
  }

  if (difficulty) {
    query += ` AND difficulty = $${queryParams.length + 1}`;
    queryParams.push(difficulty);
  }

  if (cuisine) {
    query += ` AND cuisine = $${queryParams.length + 1}`;
    queryParams.push(cuisine);
  }

  try {
    const result = await db.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

module.exports = { searchRecipesWithFilters };
