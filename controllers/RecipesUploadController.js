const db = require('../models');

// פונקציה להעלאת מתכון אישי
const uploadRecipe = async (req, res) => {
  const { userId, name, ingredients, instructions, imageUrl, prepTime, difficulty, cuisine } = req.body;

  const query = `
    INSERT INTO recipes (user_id, name, ingredients, instructions, image_url, prep_time, difficulty, cuisine)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
  `;

  try {
    const result = await db.query(query, [userId, name, ingredients, instructions, imageUrl, prepTime, difficulty, cuisine]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading recipe:', error);
    res.status(500).json({ error: 'Failed to upload recipe' });
  }
};

module.exports = { uploadRecipe };
