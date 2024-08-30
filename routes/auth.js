const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// נתיב להרשמה
router.post('/register', registerUser);

// נתיב להתחברות
router.post('/login', loginUser);

module.exports = router;
