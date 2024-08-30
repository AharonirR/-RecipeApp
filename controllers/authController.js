const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

// פונקציה להרשמת משתמש חדש
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // הצפנת הסיסמה
    const passwordHash = await bcrypt.hash(password, 10);

    // הוספת המשתמש לבסיס הנתונים
    const result = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, passwordHash]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// פונקציה להתחברות משתמש
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // שליפת המשתמש מבסיס הנתונים
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // בדיקת הסיסמה
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // יצירת JWT
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

module.exports = { registerUser, loginUser };
