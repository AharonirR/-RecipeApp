const db = require('../models');

// פונקציה לשליפת מתכון לפי מזהה (ID)
const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT * FROM recipes WHERE id = $1;
  `;

  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
};

module.exports = { getRecipeById };
