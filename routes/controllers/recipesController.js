const db = require('../models'); // מודל שמחובר לבסיס הנתונים

// פונקציה לחיפוש מתכונים לפי רכיבים
const searchRecipesByIngredients = async (req, res) => {
  const { ingredients } = req.query;

  // בניית שאילתה לבדיקת התאמה של כל רכיב במערך הרכיבים
  const query = `
    SELECT * FROM recipes 
    WHERE ingredients @> $1::text[];
  `;
  
  try {
    const result = await db.query(query, [ingredients]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

module.exports = { searchRecipesByIngredients };
